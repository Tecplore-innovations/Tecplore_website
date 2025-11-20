"use client";

import React, { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Upload, CheckCircle, Video, Music, VolumeX } from "lucide-react"; 
import { PRE_LESSONS, PreLesson } from "./pre_lessons";

// --- Constants ---
// Threshold for drift correction during active playback
const SYNC_THRESHOLD = 0.25; 
// Amount to rewind audio on resume to recover lost syllables (prevent skipping words)
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
export default function StudentPage() {
  // Lesson State
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [pendingLesson, setPendingLesson] = useState<Lesson | null>(null);
  
  // Upload State
  const [fileName, setFileName] = useState<string | null>(null);
  const [requiresAudio, setRequiresAudio] = useState(false);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [customAudioSrc, setCustomAudioSrc] = useState<string | null>(null);
  
  // Loading State for Audio
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // This ref tracks playback status instantly, avoiding React state closure issues in loops
  const isPlayingRef = useRef(false);

  // Pre-lesson State
  const [selectedPreLesson, setSelectedPreLesson] = useState<PreLesson | null>(null);
  const [preLessonLoading, setPreLessonLoading] = useState(false);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (customAudioSrc) URL.revokeObjectURL(customAudioSrc);
      isPlayingRef.current = false;
    };
  }, [customAudioSrc]);

  // --- Handlers ---

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const data: Lesson = JSON.parse(ev.target?.result as string);
        setPendingLesson(data);
        
        if (data.translatedAudio) {
          setRequiresAudio(true);
          setAudioFileName(null);
          setCustomAudioSrc(null);
          setUploadProgress(0);
          setIsUploadingAudio(false);
          if (audioInputRef.current) audioInputRef.current.value = "";
        } else {
          setRequiresAudio(false);
          setCustomAudioSrc(null);
        }

      } catch (error) {
        console.error("Error parsing lesson JSON:", error);
        setFileName(null);
        setPendingLesson(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioFileName(file.name);
    setIsUploadingAudio(true);
    setUploadProgress(0);
    setCustomAudioSrc(null); // Ensure button is disabled

    // Simulate upload progress for better UX
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setUploadProgress(100);
        
        // Small delay at 100% before "finishing"
        setTimeout(() => {
          const url = URL.createObjectURL(file);
          setCustomAudioSrc(url);
          setIsUploadingAudio(false);
        }, 500);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 150);
  };

  const handleProceedToLesson = () => {
    if (!pendingLesson) return;
    if (requiresAudio && !customAudioSrc) {
      alert("Please upload the translated audio file to proceed.");
      return;
    }
    setShowBrandVideo(true);
    setTimeout(() => {
      setLesson(pendingLesson);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPendingLesson(null);
      setCurrentQuestionIndex(null);
      setShowAnswer(false);
      setLessonEnded(false);
      setSummaryVisible(false);
      setAnsweredQuestions(new Set());
      setTriggeredQuestions(new Set());
      setIsPaused(false);
      isPlayingRef.current = false;
    });
  };

  const renderBrandVideo = () => (
    <div className="flex items-center justify-center w-full max-w-7xl mx-auto relative rounded-xl overflow-hidden shadow-2xl bg-black transition-all duration-1000">
      <video
        src="/videos/brand-intro.webm" 
        autoPlay
        muted
        playsInline
        onEnded={() => setShowBrandVideo(false)}
        className="w-full h-auto max-h-[80vh] object-contain"
      />
    </div>
  );

  // --- REFINED SYNC LOGIC ---

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
    const startTime = lesson?.trimStart ?? 0;
    
    if (lesson?.translatedAudio) {
      event.target.mute();
    }

    playerRef.current?.seekTo(startTime, true);
    playerRef.current?.playVideo();
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const state = event.data;

    if (lesson?.translatedAudio) {
      event.target.mute();
    }

    if (state === YT.PlayerState.ENDED) {
      isPlayingRef.current = false;
      stopInterval();
      customAudioRef.current?.pause();
      setCurrentQuestionIndex(null);
      setLessonEnded(true);
      setIsPaused(false);

    } else if (state === YT.PlayerState.PAUSED) {
      // 1. STRICT PAUSE
      isPlayingRef.current = false;
      setIsPaused(true);
      stopInterval();
      if (customAudioRef.current) {
          customAudioRef.current.pause();
      }

    } else if (state === YT.PlayerState.PLAYING) {
      isPlayingRef.current = true;
      setIsPaused(false);
      
      // 3. SMART RESUME with MICRO-REWIND
      if (lesson?.translatedAudio && customAudioRef.current && playerRef.current) {
         const vidTime = playerRef.current.getCurrentTime();
         
         // Fix: Rewind audio slightly (0.15s) relative to video time on resume.
         // This ensures we catch the start of the word ("Sah-") that might have 
         // been cut off by the pause reaction time.
         const syncTime = Math.max(0, vidTime - RESUME_REWIND_OFFSET);
         
         customAudioRef.current.currentTime = syncTime;
         customAudioRef.current.play().catch(e => console.log("Audio play error", e));
      }
      
      startInterval();
    
    } else if (state === YT.PlayerState.BUFFERING) {
      isPlayingRef.current = false;
      stopInterval();
      customAudioRef.current?.pause();
    }
  };

  const checkVideoTime = () => {
    // Safety checks
    if (!isPlayingRef.current || !lesson || !playerRef.current) {
        if (customAudioRef.current && !customAudioRef.current.paused) {
            customAudioRef.current.pause();
        }
        return;
    }

    // Double Safety: Check YouTube state
    const ytState = playerRef.current.getPlayerState();
    if (ytState !== YT.PlayerState.PLAYING && ytState !== YT.PlayerState.BUFFERING) {
        customAudioRef.current?.pause();
        return;
    }

    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    const endTime = lesson.trimEnd ?? duration;

    // --- 1. Sync Logic ---
    if (lesson.translatedAudio && customAudioRef.current) {
      if (!playerRef.current.isMuted()) playerRef.current.mute();

      const audioTime = customAudioRef.current.currentTime;
      // Calculate drift against the raw video time (ignoring our resume offset)
      // We want to stay close to the real video time during playback.
      const drift = Math.abs(audioTime - currentTime);

      // If drift > 0.25s, snap audio to video
      if (drift > SYNC_THRESHOLD) {
        customAudioRef.current.currentTime = currentTime;
      }

      if (customAudioRef.current.paused && isPlayingRef.current) {
        customAudioRef.current.play().catch(() => {});
      }
    }

    // --- 2. End Check ---
    if (duration && lesson.trimEnd && currentTime >= endTime - 0.5) {
      playerRef.current.pauseVideo();
      customAudioRef.current?.pause();
      isPlayingRef.current = false;
      stopInterval();
      setLessonEnded(true);
      setCurrentQuestionIndex(null);
      return;
    }

    // --- 3. Questions Check ---
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

  // --- UI Actions ---

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

  const completeLesson = () => {
    stopInterval();
    isPlayingRef.current = false;
    
    setLesson(null);
    setPendingLesson(null);
    setFileName(null);
    setAudioFileName(null);
    setCustomAudioSrc(null);
    setRequiresAudio(false);
    setLessonEnded(false);
    setSummaryVisible(false);
    setCurrentQuestionIndex(null);
    setShowAnswer(false);
    setAnsweredQuestions(new Set());
    setTriggeredQuestions(new Set());
    playerRef.current = null;
    setIsPaused(false);
    setIsUploadingAudio(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  // --- Renders ---

  const renderFileUploader = () => (
    <div className="p-8 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg max-w-2xl w-full transition duration-300">
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <h3 className="font-light text-lg mb-2 text-blue-800">How To Use!</h3>
        <p className="text-gray-600">
          Upload your lesson file (.json) to continue. If you don’t have one yet, create a lesson in Creator Mode.
        </p>
      </div>

      {!pendingLesson ? (
        <label
          htmlFor="lesson-upload"
          className="flex flex-col items-center justify-center p-6 border-2 border-blue-100 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <Upload className="w-6 h-6 text-blue-600 mb-2" />
          <span className="font-medium text-blue-600">Click to Select Lesson File (.json)</span>
          <input
            id="lesson-upload"
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Loaded Lesson: {fileName}</span>
          </div>

          {requiresAudio && (
            <div className="animate-fade-in">
              {isUploadingAudio ? (
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-medium text-purple-700">
                      <span>Uploading {audioFileName}...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                   </div>
                   <div className="w-full bg-purple-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                         className="bg-purple-600 h-2.5 rounded-full transition-all duration-200 ease-out" 
                         style={{ width: `${uploadProgress}%` }}
                      ></div>
                   </div>
                </div>
              ) : !audioFileName ? (
                 <label
                 htmlFor="audio-upload"
                 className="flex flex-col items-center justify-center p-6 border-2 border-purple-100 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
               >
                 <Music className="w-6 h-6 text-purple-600 mb-2" />
                 <span className="font-medium text-purple-600">Upload Translated Audio (.mp3/wav)</span>
                 <input
                   id="audio-upload"
                   ref={audioInputRef}
                   type="file"
                   accept="audio/*"
                   onChange={handleAudioUpload}
                   className="hidden"
                 />
               </label>
              ) : (
                <div className="p-3 bg-purple-50 text-purple-700 border border-purple-200 rounded-md flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Loaded Audio: {audioFileName}</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleProceedToLesson}
            disabled={requiresAudio && (!customAudioSrc || isUploadingAudio)}
            className={`w-full px-6 py-3 bg-transparent border-2 rounded-lg 
                      text-lg font-medium transition-all
                      ${(requiresAudio && (!customAudioSrc || isUploadingAudio)) 
                        ? "border-gray-300 text-gray-400 cursor-not-allowed" 
                        : "border-blue-400 text-blue-600 hover:border-green-600 hover:text-blue-600"}`}
          >
            {isUploadingAudio ? "Processing Audio..." : "Proceed to Lesson"}
          </button>
        </div>
      )}
    </div>
  );

  const renderLessonSummary = () => (
      <div className="p-4 sm:p-8 border rounded-xl max-w-4xl mx-auto bg-white shadow-xl flex flex-col gap-6">
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
        onClick={completeLesson}
      >
        Return Home
      </button>
    </div>
  );

  const renderQuestionModal = () => {
    if (currentQuestionIndex === null || !lesson || !lesson.questions[currentQuestionIndex]) return null;
    const questionData = lesson.questions[currentQuestionIndex];

    return (
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-20">
        <div className="bg-white rounded-xl p-6 question-modal shadow-2xl flex flex-col gap-5 relative z-30 border-t-4 border-blue-600 overflow-y-auto">
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
            <div className="flex flex-col gap-4">
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

  const renderLessonCompletedScreen = () => (
    <div className="absolute inset-0 bg-black/95 flex flex-col justify-center items-center p-6 z-20 text-center">
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

  const renderVideoPlayer = () => (
    <div className="relative flex flex-col gap-4 w-full max-w-7xl mx-auto landscape-container">
      <div className="video-wrapper rounded-xl overflow-hidden shadow-2xl bg-black relative" style={{ height: "80vh", maxHeight: "80vh" }}>
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
           <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white flex items-center gap-2 backdrop-blur-md z-10 pointer-events-none">
             <VolumeX className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-medium text-white">Translated Audio</span>
           </div>
        )}

        {isPaused && currentQuestionIndex === null && !lessonEnded && (
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none flex items-center justify-center">
            <span className="text-white text-4xl font-light opacity-75">Paused</span>
          </div>
        )}

        {lessonEnded && renderLessonCompletedScreen()}
        {renderQuestionModal()}
      </div>
      <h1 className="text-2xl font-light text-gray-800 text-center sm:text-left">{lesson?.title}</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col gap-8 items-center">
      {!lesson && !summaryVisible && (
        <>
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-6xl rounded-xl overflow-hidden">
              <img src="/photos/studio_banner.avif" alt="Banner" className="w-full h-auto object-contain rounded-xl" />
            </div>
          </div>

          <div className="w-full flex justify-center">{renderFileUploader()}</div>

          <div className="mt-8 w-full max-w-6xl px-2 sm:px-4">
            <h3 className="font-semibold text-lg mb-8 text-blue-800 text-center">Start with a Ready-Made Lesson</h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {PRE_LESSONS.map((preLesson) => (
                <div
                  key={preLesson.id}
                  className={`relative flex-none w-56 bg-white rounded-2xl overflow-hidden shadow-md border transition cursor-pointer
                    ${selectedPreLesson?.id === preLesson.id ? "border-blue-500 shadow-lg" : "border-gray-200"} 
                    hover:shadow-lg`}
                  onClick={() => setSelectedPreLesson(preLesson)}
                >
                  {preLesson.isTranslated && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1 shadow-md">
                      <Music className="w-3 h-3" /> Translated
                    </div>
                  )}
                  <div className="w-full aspect-[4/3]">
                    <img src={preLesson.thumbnail} alt={preLesson.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex flex-col h-[150px]">
                    <h4 className="font-semibold text-base mb-2 leading-tight line-clamp-2">{preLesson.title}</h4>
                    <div className="text-gray-600 text-sm mb-3 flex-grow overflow-hidden">
                      <p className="line-clamp-3">{preLesson.description}</p>
                    </div>
                    <button
                      className={`w-full px-3 py-2 rounded transition font-medium text-sm mt-auto
                      ${selectedPreLesson?.id === preLesson.id ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (selectedPreLesson?.id !== preLesson.id) {
                          setSelectedPreLesson(preLesson);
                          return;
                        }
                        setPreLessonLoading(true);
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

                          setShowBrandVideo(true);
                          setTimeout(() => {
                            setLesson(data);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setPendingLesson(null);
                            setCurrentQuestionIndex(null);
                            setShowAnswer(false);
                            setLessonEnded(false);
                            setSummaryVisible(false);
                            setAnsweredQuestions(new Set());
                            setTriggeredQuestions(new Set());
                            setIsPaused(false);
                            isPlayingRef.current = false;
                            setSelectedPreLesson(null);
                          }, 0);

                        } catch (err) {
                          console.error(err);
                          alert("Error loading lesson resources.");
                        } finally {
                          setPreLessonLoading(false);
                        }
                      }}
                      disabled={preLessonLoading}
                    >
                      {preLessonLoading && selectedPreLesson?.id === preLesson.id ? "Loading..." : "Start Lesson"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {lesson && !summaryVisible && (
        <>
          {showBrandVideo ? renderBrandVideo() : renderVideoPlayer()}
        </>
      )}

      {summaryVisible && lesson && renderLessonSummary()}
    </div>
  );
}