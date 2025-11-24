"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { CheckCircle, Video, VolumeX, ArrowLeft } from "lucide-react";
import { PRE_LESSONS, PreLesson } from "../shared_resources/pre_lessons";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// --- Constants ---
const SYNC_THRESHOLD = 0.25;
const RESUME_REWIND_OFFSET = 0.15;

// --- Types ---
type Question = {
  id: string;
  time: number;
  question: string;
  answer: string;
};

type Lesson = {
  title: string;
  youtubeLink: string;
  youtubeId: string;
  translatedAudio: boolean;
  trimStart: number;
  trimEnd?: number;
  questions: Question[];
};

// --- Main Component ---
function StudentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonFromURL = searchParams.get("lesson");

  // Lesson State
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [customAudioSrc, setCustomAudioSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Playback State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lessonEnded, setLessonEnded] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [triggeredQuestions, setTriggeredQuestions] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [showBrandVideo, setShowBrandVideo] = useState(true);

  // Refs
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  // Progress Bar State
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [playerDuration, setPlayerDuration] = useState(0);
  const [playerTime, setPlayerTime] = useState(0);

  // --- INITIALIZATION ---

  useEffect(() => {
    // 1. Check if URL param exists (Pre-made lesson)
    if (lessonFromURL) {
      const found = PRE_LESSONS.find((l) => l.id === lessonFromURL);
      if (found) {
        loadPreLesson(found);
      } else {
        setError("Lesson not found in library.");
      }
      return;
    }

    // 2. Check Session Storage (Uploaded from Home)
    const storedLessonData = sessionStorage.getItem("tecplore_lesson_data");
    const storedAudioUrl = sessionStorage.getItem("tecplore_audio_url");

    if (storedLessonData) {
        try {
            const parsed: Lesson = JSON.parse(storedLessonData);
            setLesson(parsed);
            if (storedAudioUrl) {
                setCustomAudioSrc(storedAudioUrl);
            }
            setShowBrandVideo(true);
        } catch (e) {
            console.error(e);
            setError("Failed to load lesson data. Please try uploading again.");
        }
    } else {
        // No data found
        setError("No lesson data found. Please return to the Studio to upload a lesson.");
    }

  }, [lessonFromURL]);


  async function loadPreLesson(preLesson: PreLesson) {
    try {
      const res = await fetch(preLesson.jsonFile);
      if (!res.ok) throw new Error("Failed to load lesson JSON");
      const data: Lesson = await res.json();

      if (preLesson.isTranslated && preLesson.audioFile) {
        const audioRes = await fetch(preLesson.audioFile);
        if (!audioRes.ok) throw new Error("Failed to load audio file");
        const blob = await audioRes.blob();
        const audioUrl = URL.createObjectURL(blob);
        setCustomAudioSrc(audioUrl);
      } else {
        setCustomAudioSrc(null);
      }

      setLesson(data);
      setShowBrandVideo(true);
    } catch (e) {
      console.error(e);
      setError("Error loading lesson resources.");
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Only revoke if it was a blob we created here (optional safety)
      isPlayingRef.current = false;
    };
  }, []);

  const formatTimeShort = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // --- LOGIC: Sync & Playback ---

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(checkVideoTime, 200);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    const dur = event.target.getDuration();
    setPlayerDuration(dur);
    setPlayerTime(lesson?.trimStart ?? 0);

    const startTime = lesson?.trimStart ?? 0;
    if (lesson?.translatedAudio) {
      event.target.mute();
    }
    playerRef.current?.seekTo(startTime, true);
    playerRef.current?.playVideo();
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const state = event.data;
    if (lesson?.translatedAudio) event.target.mute();

    if (state === YT.PlayerState.ENDED) {
      isPlayingRef.current = false;
      stopInterval();
      customAudioRef.current?.pause();
      setCurrentQuestionIndex(null);
      setLessonEnded(true);
      setIsPaused(false);
    } else if (state === YT.PlayerState.PAUSED) {
      isPlayingRef.current = false;
      setIsPaused(true);
      stopInterval();
      customAudioRef.current?.pause();
    } else if (state === YT.PlayerState.PLAYING) {
      isPlayingRef.current = true;
      setIsPaused(false);
      if (lesson?.translatedAudio && customAudioRef.current && playerRef.current) {
        const vidTime = playerRef.current.getCurrentTime();
        const syncTime = Math.max(0, vidTime - RESUME_REWIND_OFFSET);
        customAudioRef.current.currentTime = syncTime;
        customAudioRef.current.play().catch((e) => console.log("Audio play error", e));
      }
      startInterval();
    } else if (state === YT.PlayerState.BUFFERING) {
      isPlayingRef.current = false;
      stopInterval();
      customAudioRef.current?.pause();
    }
  };

  const checkVideoTime = () => {
    if (!isPlayingRef.current || !lesson || !playerRef.current) {
      if (customAudioRef.current && !customAudioRef.current.paused) {
        customAudioRef.current.pause();
      }
      return;
    }

    const ytState = playerRef.current.getPlayerState();
    if (ytState !== YT.PlayerState.PLAYING && ytState !== YT.PlayerState.BUFFERING) {
      customAudioRef.current?.pause();
      return;
    }

    const currentTime = playerRef.current.getCurrentTime();
    setPlayerTime(currentTime);

    const duration = playerRef.current.getDuration();
    const endTime = lesson.trimEnd ?? duration;

    // 1. Audio Sync
    if (lesson.translatedAudio && customAudioRef.current) {
      if (!playerRef.current.isMuted()) playerRef.current.mute();
      const audioTime = customAudioRef.current.currentTime;
      const drift = Math.abs(audioTime - currentTime);
      if (drift > SYNC_THRESHOLD) {
        customAudioRef.current.currentTime = currentTime;
      }
      if (customAudioRef.current.paused && isPlayingRef.current) {
        customAudioRef.current.play().catch(() => {});
      }
    }

    // 2. End Check
    if (duration && lesson.trimEnd && currentTime >= endTime - 0.5) {
      playerRef.current.pauseVideo();
      customAudioRef.current?.pause();
      isPlayingRef.current = false;
      stopInterval();
      setLessonEnded(true);
      setCurrentQuestionIndex(null);
      return;
    }

    // 3. Questions Check
    for (let i = 0; i < lesson.questions.length; i++) {
      if (
        !answeredQuestions.has(i) &&
        !triggeredQuestions.has(i) &&
        currentTime >= lesson.questions[i].time
      ) {
        playerRef.current.pauseVideo();
        customAudioRef.current?.pause();
        isPlayingRef.current = false;
        stopInterval();

        setCurrentQuestionIndex(i);
        setShowAnswer(false);
        setTriggeredQuestions((prev) => new Set(prev).add(i));
        return;
      }
    }
  };

  const revealAnswer = () => setShowAnswer(true);

  const okAnswer = () => {
    if (currentQuestionIndex !== null) {
      setAnsweredQuestions((prev) => new Set([...prev, currentQuestionIndex]));
      setTriggeredQuestions((prev) => {
        const copy = new Set(prev);
        copy.delete(currentQuestionIndex);
        return copy;
      });
    }
    setCurrentQuestionIndex(null);
    setShowAnswer(false);
    playerRef.current?.playVideo();
  };

  const viewSummary = () => {
    setLessonEnded(false);
    setSummaryVisible(true);
  };

  const exitLesson = () => {
     // Clear storage and go home
     sessionStorage.removeItem("tecplore_lesson_data");
     sessionStorage.removeItem("tecplore_audio_url");
     router.push("/tecplore-studio");
  };

  // --- Interaction Handlers ---

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lesson || !playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const duration = playerRef.current.getDuration() || playerDuration;
    
    let t = pct * duration;
    if (lesson.trimStart != null) t = Math.max(t, lesson.trimStart);
    if (lesson.trimEnd != null) t = Math.min(t, lesson.trimEnd);

    playerRef.current.seekTo(t, true);
    playerRef.current.playVideo();
  };

  const handleSeekToQuestion = (index: number, qTime: number) => {
    if (!lesson || !playerRef.current) return;

    setAnsweredQuestions((prev) => {
      const copy = new Set(prev);
      copy.delete(index);
      return copy;
    });

    setTriggeredQuestions((prev) => {
      const copy = new Set(prev);
      copy.delete(index);
      return copy;
    });

    setCurrentQuestionIndex(null);
    setShowAnswer(false);

    const offset = 1; 
    const target = Math.max(lesson.trimStart ?? 0, qTime - offset);
    
    playerRef.current.seekTo(target, true);
    playerRef.current.playVideo();
  };

  // --- Sub-Components (Renders) ---

  const renderBrandVideo = () => (
    <div className="flex items-center justify-center w-full max-w-7xl mx-auto relative rounded-xl overflow-hidden shadow-2xl bg-black transition-all duration-1000">
      <video
        src="/videos/brand-intro.webm"
        autoPlay
        playsInline
        onEnded={() => setShowBrandVideo(false)}
        className="w-full h-auto max-h-[80vh] object-contain"
      />
    </div>
  );

  const renderLessonCompletedScreen = () => (
    <div className="absolute inset-0 bg-black/95 flex flex-col justify-center items-center p-6 z-20 text-center animate-fade-in">
      <div className="text-white">
        <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
        <h3 className="font-light text-4xl text-white mb-6">Lesson Completed!</h3>
        <button
          className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg font-light hover:bg-white hover:text-black transition shadow-sm text-lg"
          onClick={viewSummary}
        >
          View Summary
        </button>
      </div>
    </div>
  );

  const renderQuestionModal = () => {
    if (currentQuestionIndex === null || !lesson || !lesson.questions[currentQuestionIndex]) return null;
    const questionData = lesson.questions[currentQuestionIndex];

    return (
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-20 animate-fade-in">
        <div className="bg-white rounded-xl p-6 question-modal shadow-2xl flex flex-col gap-5 relative z-30 border-t-4 border-blue-600 overflow-y-auto max-h-[60vh] w-full max-w-lg">
          <h3 className="font-light text-1xl text-blue-600">Question</h3>
          <p className="text-gray-800 text-lg border-b pb-3">{questionData.question}</p>

          {!showAnswer ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition shadow-md self-start"
              onClick={revealAnswer}
            >
              Show Answer
            </button>
          ) : (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="p-4 bg-gray-100 border-l-4 border-green-500 rounded">
                <p className="text-gray-800 font-medium">Answer:</p>
                <p className="text-gray-700 mt-1">{questionData.answer}</p>
              </div>
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-light hover:bg-green-700 transition shadow-md self-start"
                onClick={okAnswer}
              >
                Continue lesson
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLessonSummary = () => (
    <div className="p-4 sm:p-8 border rounded-xl max-w-4xl w-full mx-auto bg-white shadow-xl flex flex-col gap-6 animate-fade-in">
      <h2 className="font-medium text-3xl text-gray-800 border-b pb-3 flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-400" />
          Lesson Summary
        </div>
        <span className="text-blue-400 text-lg font-normal mt-1">{lesson?.title}</span>
      </h2>

      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
        {lesson?.questions.map((q, i) => (
          <div
            key={q.id}
            className={`border-l-4 p-4 rounded-r-lg shadow-sm ${
              answeredQuestions.has(i) ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <p className="font-medium text-lg text-gray-800 mb-1">
              Q{i + 1} ({q.time.toFixed(2)}s): {q.question}
            </p>
            <p className="text-gray-600 ml-2 border-l pl-3">
              <span className="font-medium text-gray-700">Answer:</span> {q.answer}
            </p>
          </div>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg font-light hover:bg-blue-600 transition shadow-md self-end"
        onClick={exitLesson}
      >
        Return Home
      </button>
    </div>
  );

  const renderVideoPlayer = () => {
    const duration = playerDuration;
    const currentTime = playerTime;
    
    return (
      <div className="relative flex flex-col gap-4 w-full max-w-7xl mx-auto">
        
        {/* PLAYER WRAPPER */}
        <div
          className="video-wrapper rounded-xl overflow-hidden shadow-2xl bg-black relative"
          style={{ height: "80vh", maxHeight: "80vh" }}
        >
          <YouTube
            videoId={lesson!.youtubeId}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                start: lesson!.trimStart ?? 0,
                end: lesson!.trimEnd,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                cc_load_policy: 0,
                autohide: 1,
              },
            }}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
            className="w-full h-full"
          />

          {lesson?.translatedAudio && customAudioSrc && (
            <audio ref={customAudioRef} src={customAudioSrc} preload="auto" />
          )}

          {lesson?.translatedAudio && !isPaused && !lessonEnded && (
            <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white flex items-center gap-2 backdrop-blur-md z-10 pointer-events-none animate-fade-in">
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-white">Translated Audio</span>
            </div>
          )}

          {isPaused && currentQuestionIndex === null && !lessonEnded && (
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none flex items-center justify-center animate-fade-in">
              <span className="text-white text-4xl font-light opacity-75">Paused</span>
            </div>
          )}

          {lessonEnded && renderLessonCompletedScreen()}
          {renderQuestionModal()}
        </div>

        {/* TIMELINE CONTROLS */}
        <div className="flex flex-col gap-2 w-full select-none mt-2">
          <div className="flex justify-between px-1">
             <h1 className="text-xl font-light text-gray-800 truncate max-w-2xl">
              {lesson?.title}
            </h1>
            <button
              type="button"
              onClick={() => setShowProgressBar((v) => !v)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 transition-transform font-medium text-xs sm:text-sm"
            >
              {showProgressBar ? "🙈 Hide Timeline" : "👁 Show Timeline"}
            </button>
          </div>

          {showProgressBar && duration > 0 && (
            <div className="relative w-full h-5 flex items-center animate-fade-in">
              <div
                className="w-full h-2 bg-gray-200 border border-gray-300 rounded relative cursor-pointer group"
                onClick={handleProgressBarClick}
              >
                <div
                  className="absolute h-full bg-blue-600 rounded-sm pointer-events-none"
                  style={{
                    left: `${(lesson!.trimStart / duration) * 100}%`,
                    width: lesson!.trimStart != null
                      ? `${((currentTime - lesson!.trimStart) / duration) * 100}%`
                      : `${(currentTime / duration) * 100}%`,
                  }}
                />
                {lesson!.questions.map((q, idx) => {
                  const qPct = (q.time / duration) * 100;
                  return (
                    <div
                      key={q.id}
                      style={{ left: `calc(${qPct}% - 6px)` }}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 border border-white rounded-full shadow transition-transform hover:scale-150 cursor-pointer z-10"
                      title={`Go to Question ${idx + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSeekToQuestion(idx, q.time);
                      }}
                    />
                  );
                })}
              </div>
              <div className="ml-3 text-gray-600 text-sm font-mono min-w-[50px]">
                {formatTimeShort(currentTime)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Main Render ---

  // 1. Error State
  if (error) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h2 className="text-2xl text-red-500 font-light">{error}</h2>
            <Link href="/tecplore-studio" className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4" /> Back to Studio
            </Link>
        </div>
    );
  }

  // 2. Loading State
  if (!lesson) {
     return <div className="flex h-screen items-center justify-center text-blue-600 animate-pulse">Loading Classroom...</div>;
  }

  // 3. Summary State
  if (summaryVisible) {
      return <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">{renderLessonSummary()}</div>;
  }

  // 4. Playback State
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center">
      {showBrandVideo ? renderBrandVideo() : renderVideoPlayer()}
    </div>
  );
}

export default function StudentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <StudentContent />
    </Suspense>
  );
}