"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import YouTube, { YouTubeProps, YouTubeEvent } from "react-youtube";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import {
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Scissors,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Music,
  Volume2,
  Edit,
} from "lucide-react";

// --- Types ---
type Question = { id: string; time: number; question: string; answer: string };
type Lesson = {
  title: string;
  youtubeLink: string;
  youtubeId: string;
  translatedAudio: boolean;
  trimStart?: number;
  trimEnd?: number;
  questions: Question[];
};
type AlertType = "success" | "error" | "info" | "warning";
type AlertState = { message: string; type: AlertType } | null;
type AudioMode = "original" | "translated" | null;


// --- Helpers ---
function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
}

function formatTime(seconds: number | null | undefined): string {
  if (seconds == null || isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

const Alert = ({
  alert,
  setAlert,
}: {
  alert: AlertState;
  setAlert: (a: AlertState) => void;
}) => {
  if (!alert) return null;
  const icons: Record<AlertType, React.ReactNode> = {
    success: <CheckCircle className="inline w-5 h-5 mr-2 text-green-600" />,
    error: <XCircle className="inline w-5 h-5 mr-2 text-red-600" />,
    info: <AlertCircle className="inline w-5 h-5 mr-2 text-blue-600" />,
    warning: <AlertCircle className="inline w-5 h-5 mr-2 text-yellow-600" />,
  };
  const colors: Record<AlertType, string> = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };
  return (
    <div
      className={`fixed left-1/2 top-4 -translate-x-1/2 z-[9999] px-4 py-2 border rounded-lg shadow-lg flex items-center gap-2 animate-slideDown ${colors[alert.type]}`}
    >
      {icons[alert.type]}
      <span>{alert.message}</span>
      <button
        onClick={() => setAlert(null)}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <XCircle size={16} />
      </button>
    </div>
  );
};
const VideoProgressBar = ({
  currentTime,
  duration,
  trimStart,
  trimEnd,
  isTrimMode,
  questions,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  trimStart: number | null;
  trimEnd?: number | null;
  isTrimMode: boolean;
  isTrimFinalized: boolean;
  questions: Question[];
  onSeek?: (time: number) => void;
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const getPct = (time: number) => (duration ? clamp((time / duration) * 100, 0, 100) : 0);

  const formatTime = (t: number | null) =>
    t == null
      ? "--:--"
      : `${Math.floor(t / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(t % 60)
          .toString()
          .padStart(2, "0")}`;

  // =====================
  // PROGRESS BAR LOGIC
  // =====================
  let fillLeft = 0;
  let fillWidth = 0;

  if (isTrimMode && trimStart != null) {
    fillLeft = getPct(trimStart);

    const limitEnd = trimEnd != null ? trimEnd : duration;
    const safeCurrent = Math.min(currentTime, limitEnd);

    fillWidth = Math.max(0, getPct(safeCurrent) - getPct(trimStart));
  } else {
    fillLeft = 0;
    fillWidth = getPct(currentTime);
  }

  function handleClick(e: React.MouseEvent) {
    if (!progressRef.current || !onSeek) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    onSeek(pct * duration);
  }

  return (
    <div className="w-full h-8 relative flex items-center">
      <div
        ref={progressRef}
        className="w-full h-3 rounded bg-gray-200 cursor-pointer relative border border-gray-300"
        onClick={handleClick}
      >
        {/* ---- Highlight Trim Range ---- */}
        {isTrimMode && trimStart != null && (
          <div
            className="absolute h-full bg-blue-200 opacity-70 pointer-events-none"
            style={{
              left: `${getPct(trimStart)}%`,
              width: `${
                trimEnd != null ? getPct(trimEnd) - getPct(trimStart) : 100 - getPct(trimStart)
              }%`,
            }}
          />
        )}

        {/* ---- Trim Labels ---- */}
        {isTrimMode && trimStart != null && (
          <div
            className="absolute -top-6 text-xs font-semibold text-blue-700 z-20"
            style={{ left: `calc(${getPct(trimStart)}% - 10px)` }}
          >
            {formatTime(trimStart)}
          </div>
        )}

        {isTrimMode && trimEnd != null && (
          <div
            className="absolute -top-6 text-xs font-semibold text-blue-700 z-20"
            style={{ left: `calc(${getPct(trimEnd)}% - 10px)` }}
          >
            {formatTime(trimEnd)}
          </div>
        )}

        {/* ---- Progress Fill ---- */}
        <div
          className="absolute h-full bg-blue-600 transition-all duration-75 ease-linear rounded-sm"
          style={{
            left: `${fillLeft}%`,
            width: `${fillWidth}%`,
          }}
        />

        {/* ---- Question Markers ---- */}
        {questions.map((q) => (
          <div
            key={q.id}
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-600 border border-white shadow hover:scale-125 transition-transform cursor-pointer z-10"
            style={{ left: `calc(${getPct(q.time)}% - 5px)` }}
            title={formatTime(q.time)}
            onClick={(e) => {
              e.stopPropagation();
             if (onSeek) {
                onSeek(q.time); 
              }
            }}
          />
        ))}
      </div>

      {/* CURRENT TIME LABEL */}
      <div className="ml-4 min-w-[60px] text-sm tabular-nums font-mono text-gray-600">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};


/**
 * === MAIN COMPONENT: Page ===
 */
export default function Page() {
  // Step state
  const [step, setStep] = useState(1);
  type YouTubePlayer = YouTubeEvent["target"];
  // Lesson state
  const [lesson, setLesson] = useState<Lesson>({
    title: "",
    youtubeLink: "",
    youtubeId: "",
    translatedAudio: false,
    questions: [],
  });

  // Audio Translation State
  const [audioMode, setAudioMode] = useState<AudioMode>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const customAudioRef = useRef<HTMLAudioElement>(null);

  // Playback & mode state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoMode, setVideoMode] = useState<"none" | "full" | "trim">("none");
  const [trimStart, setTrimStart] = useState<number | null>(null);
  const [trimEnd, setTrimEnd] = useState<number | null>(null);
  const [trimFinalized, setTrimFinalized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const [playerKey, setPlayerKey] = useState(0);

  // Q&A (add/edit)
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  const [questionTime, setQuestionTime] = useState(0);

  // Alert & Refs
  const [alert, setAlert] = useState<AlertState>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<number | null>(null);

  // New: lessonEnded flag to avoid race conditions & immediate UI updates after manual finish
  const [lessonEnded, setLessonEnded] = useState(false);

  // activeEnd helper (useful for Add Question visibility)
  const activeEnd = (videoMode === "trim" && trimFinalized && trimEnd != null)
    ? trimEnd
    : videoDuration;

  // -- Alert timeout
  useEffect(() => {
    if (alert) {
      const t = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [alert]);

  // --- Unmount cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioSrc) URL.revokeObjectURL(audioSrc);
    };
  }, [audioSrc]);

  // --- Audio File handler
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTranslatedFile(file);
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setLesson((prev) => ({ ...prev, translatedAudio: true }));
      setAlert({ message: "Audio uploaded successfully!", type: "success" });
    }
  }

  // Audio play/pause sync
  useEffect(() => {
    if (audioMode === "translated" && customAudioRef.current) {
      if (isPlaying) customAudioRef.current.play();
      else customAudioRef.current.pause();
    }
  }, [isPlaying, audioMode]);

  // -- Main timer/progress sync
  useEffect(() => {
    if (!videoLoaded || !playerRef.current) return;
    function sync() {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const t = playerRef.current.getCurrentTime();
        setCurrentTime(t);

        // Translated audio sync
        if (audioMode === "translated" && customAudioRef.current) {
          if (typeof playerRef.current.isMuted === "function" && !playerRef.current.isMuted()) {
            playerRef.current.mute();
          }
          // Keep audio synced to video, snap back if >0.18s difference
          if (Math.abs(customAudioRef.current.currentTime - t) > 0.18) {
            customAudioRef.current.currentTime = t;
          }
        }

        // Auto-update trim start while user choosing start (not finalized)
        if (trimStart != null && !trimFinalized && t < trimStart) {
          setTrimStart(t);
        }

        // Auto-stop at trim end (when finalized) AND mark lessonEnded so Finalize UI shows
        if (trimFinalized && trimEnd != null && t >= trimEnd - 0.05) {
          try { playerRef.current.pauseVideo(); } catch { }
          if (customAudioRef.current) customAudioRef.current.pause();
          setIsPlaying(false);
          setLessonEnded(true); // important: mark as ended so UI updates immediately
        }
      }
    }
    intervalRef.current = window.setInterval(sync, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoLoaded, audioMode, trimStart, trimEnd, trimFinalized]);

  // --- Reset everything
  const resetAllState = useCallback(() => {
    if (playerRef.current) { try { playerRef.current.stopVideo(); } catch { } }
    if (audioSrc) URL.revokeObjectURL(audioSrc);
    setLesson({ title: "", youtubeLink: "", youtubeId: "", translatedAudio: false, questions: [] });
    setVideoMode("none");
    setAudioMode(null);
    setTranslatedFile(null);
    setAudioSrc(null);
    setTrimStart(null);
    setTrimEnd(null);
    setTrimFinalized(false);
    setVideoLoaded(false);
    setAddingQuestion(false);
    setEditingQuestionId(null);
    setCurrentQuestion({ question: "", answer: "" });
    setCurrentTime(0);
    setIsPlaying(false);
    setVideoDuration(0);
    setPlayerKey((k) => k + 1);
    setStep(1);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setLessonEnded(false);
  }, [audioSrc]);

  // --- YouTube events
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    setVideoDuration(event.target.getDuration());
    setVideoLoaded(true);
    // Mute if translated
    if (audioMode === "translated") {
      event.target.mute();
    }
    if (videoMode === "trim" && trimEnd == null) {
      setTrimEnd(event.target.getDuration());
    }
    setAlert({ message: "Video loaded!", type: "success" });
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const state = event.data;
    if (audioMode === "translated") { event.target.mute(); }
    if (state === 1) {
      setIsPlaying(true);
      // If user resumed after manual finish, clear lessonEnded so they can add more questions
      // (we only clear if user intentionally resumes)
      if (lessonEnded) setLessonEnded(false);
    } else if (state === 2) {
      setIsPlaying(false);
    } else if (state === 0) {
      // ended
      setIsPlaying(false);
      setLessonEnded(true);
    }
  };

  // --- Controls for trim
  function handleSetStart() {
    if (!playerRef.current) return;
    const t = playerRef.current.getCurrentTime();
    setTrimStart(t);
    setTrimEnd(null);
    setAlert({ message: `Start set to ${formatTime(t)}`, type: "success" });
    try { playerRef.current.pauseVideo(); } catch { }
  }
  function handleSetEnd() {
    if (!playerRef.current) return;
    const t = playerRef.current.getCurrentTime();
    if (trimStart == null) { setAlert({ message: "Set start first", type: "error" }); return; }
    if (t <= trimStart + 0.05) { setAlert({ message: "End must be after start", type: "error" }); return; }
    setTrimEnd(t);
    setAlert({ message: `End set to ${formatTime(t)}`, type: "success" });
    try { playerRef.current.pauseVideo(); } catch { }
  }
  function applyTrim() {
    if (trimStart == null || trimEnd == null || trimEnd <= trimStart) {
      setAlert({ message: "Invalid trim range", type: "error" }); return;
    }
    setTrimFinalized(true);
    setPlayerKey((k) => k + 1);
    setAlert({ message: "Trim applied!", type: "success" });
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.seekTo(trimStart!, true);
        playerRef.current.playVideo();
      }
    }, 150);
  }

  // --- Q&A Logic: Add/Edit
  function startAddQuestion() {
    if (!videoLoaded || !playerRef.current) return;
    // do not allow when lesson already ended
    if (lessonEnded) {
      setAlert({ message: "Lesson already finished. Can't add more questions.", type: "error" });
      return;
    }
    const time = playerRef.current.getCurrentTime();
    if (videoMode === "trim" && trimFinalized) {
      if ((trimStart != null && time < trimStart) || (trimEnd != null && time > trimEnd)) {
        setAlert({ message: "Question time must be within trimmed range!", type: "error" }); return;
      }
    }
    playerRef.current.pauseVideo();
    setQuestionTime(time);
    setCurrentQuestion({ question: "", answer: "" });
    setAddingQuestion(true);
    setEditingQuestionId(null);
  }
  function adjustQuestionTime(delta: number) {
    let newTime = questionTime + delta;
    const minTime = (videoMode === "trim" && trimFinalized && trimStart != null) ? trimStart : 0;
    const maxTime = (videoMode === "trim" && trimFinalized && trimEnd != null) ? trimEnd : videoDuration;
    newTime = Math.max(minTime, Math.min(maxTime, newTime));
    setQuestionTime(newTime);
    playerRef.current?.seekTo(newTime, true);
  }
  function saveQuestion() {
    if (!currentQuestion.question.trim() || !currentQuestion.answer.trim()) {
      setAlert({ message: "Both question and answer are required!", type: "error" }); return;
    }
    if (editingQuestionId) {
      setLesson((prev) => ({
        ...prev,
        questions: prev.questions.map((q) => q.id === editingQuestionId
          ? { ...q, question: currentQuestion.question.trim(), answer: currentQuestion.answer.trim(), time: questionTime }
          : q),
      }));
      setAlert({ message: "Question updated!", type: "success" });
    } else {
      const newQ: Question = { id: uuidv4(), time: questionTime, question: currentQuestion.question.trim(), answer: currentQuestion.answer.trim() };
      setLesson(prev => ({ ...prev, questions: [...prev.questions, newQ].sort((a, b) => a.time - b.time) }));
      setAlert({ message: "Question added!", type: "success" });
    }
    setCurrentQuestion({ question: "", answer: "" });
    setAddingQuestion(false);
    setEditingQuestionId(null);
    playerRef.current?.playVideo();
  }
  function editQuestion(q: Question) {
    setAddingQuestion(true);
    setEditingQuestionId(q.id);
    setCurrentQuestion({ question: q.question, answer: q.answer });
    setQuestionTime(q.time);
    playerRef.current?.seekTo(q.time, true);
    playerRef.current?.pauseVideo();
  }
  function deleteQuestion(id: string) {
    setLesson(prev => ({ ...prev, questions: prev.questions.filter(q => q.id !== id) }));
    setAlert({ message: "Question deleted", type: "info" });
  }

  function saveLesson() {
    if (!lesson.title.trim()) {
      setAlert({ message: "Please enter a lesson title", type: "error" }); return;
    }
    if (!lesson.questions.length) {
      setAlert({ message: "Please add at least one question", type: "error" }); return;
    }
    const dataToSave: Lesson = {
      ...lesson,
      trimStart: (videoMode === "trim" && trimFinalized && trimStart != null) ? trimStart : undefined,
      trimEnd: (videoMode === "trim" && trimFinalized && trimEnd != null) ? trimEnd : undefined,
    };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" });
    const filename = `${lesson.title.trim().replace(/\s+/g, "_")}.json`;
    saveAs(blob, filename);
    setAlert({ message: "Lesson saved!", type: "success" });
    setTimeout(resetAllState, 1500);
  }

  function seekTo(time: number) {
    playerRef.current?.seekTo(time, true);
    setCurrentTime(time);
    if (audioMode === "translated" && customAudioRef.current) {
      customAudioRef.current.currentTime = time;
    }
  }

  const isAudioReady = audioMode === "original" || (audioMode === "translated" && translatedFile !== null);

  // --- UI ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full items-center justify-center pt-10 px-2 pb-20 font-sans transition-all">
      <Alert alert={alert} setAlert={setAlert} />

      {/* Stepper */}
      <div className="mb-6 flex gap-4 items-center justify-center">
        {[1, 2].map(n => (
          <div key={n} className="flex items-center gap-1">
            <div className={`w-7 h-7 rounded-full border-2 font-bold flex items-center justify-center
              ${n === step ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-400 bg-white"}`}>
              {n}
            </div>

            <span className={`text-sm ${n === step ? "text-blue-700" : "text-gray-400"} font-semibold`}>
              {n === 1 ? "Setup" : "Questions"}
            </span>

            {/* only show connector for step 1 */}
            {n === 1 && <div className="mx-2 w-8 border-t border-gray-200" />}
          </div>
        ))}
      </div>

      {/* Step view */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto bg-white p-6 rounded-xl shadow-md border transition-all">
        {/* Main (col-span-2) */}
        <div className="col-span-2 space-y-8">
          {/* STEP 1: Setup */}
          {step === 1 && (
            <>
              <h2 className="font-semibold text-2xl mb-2 text-violet-500">Lesson Setup</h2>
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium text-gray-500">Lesson Title *</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={e => setLesson({ ...lesson, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow mb-4"
                  placeholder="Eg. Photosynthesis Interactive Lesson"
                />
              </div>
              {/* YouTube Link */}
              <div>
                <label className="block mb-1 font-medium text-gray-500">YouTube URL *</label>
                <input
                  type="text"
                  value={lesson.youtubeLink}
                  onChange={e => {
                    const ytId = extractYouTubeId(e.target.value);
                    setLesson(prev => ({ ...prev, youtubeLink: e.target.value, youtubeId: ytId }));
                  }}
                  disabled={videoMode !== 'none'}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow mb-4 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Paste YouTube video link here"
                />
              </div>
              {/* Audio options */}
              {lesson.youtubeId && videoMode === "none" && (
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Audio Preference</label>
                  <div className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="audio" checked={audioMode === "original"} onChange={() => { setAudioMode("original"); setLesson(l => ({ ...l, translatedAudio: false })); }} />
                      <Volume2 className="w-5 h-5 text-blue-600" /> <span>Use Original Audio</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="audio" checked={audioMode === "translated"} onChange={() => { setAudioMode("translated"); setLesson(l => ({ ...l, translatedAudio: true })); }} />
                      <Music className="w-5 h-5 text-purple-600" /> <span>Use Translated Audio</span>
                    </label>
                  </div>

                  {/* File Upload */}
                  {audioMode === "translated" && (
                    <div className="mt-3">
                      <label className="mb-2 font-semibold text-gray-700 flex items-center">
                        <Upload className="w-5 h-5 mr-2 text-blue-600" />
                        Upload Translated Audio (MP3/WAV)
                      </label>

                      <label
                        className="cursor-pointer w-full sm:w-64 px-4 py-2 border-2 border-blue-600 text-blue-700 rounded-lg font-medium bg-white hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" /> Choose File
                        <input
                          type="file"
                          accept=".mp3,.wav,audio/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {translatedFile && (
                        <div className="mt-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-xs font-semibold flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {translatedFile.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Proceed Buttons */}
              {videoMode === "none" && lesson.youtubeId && isAudioReady && (
                <div className="flex flex-row gap-4 mt-6">
                  <button
                    onClick={() => {
                      setVideoMode("full");
                      setPlayerKey((k) => k + 1);
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold bg-white 
                   hover:border-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Use Full Video
                  </button>

                  <button
                    onClick={() => {
                      setVideoMode("trim");
                      setPlayerKey((k) => k + 1);
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold bg-white
                   hover:border-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Trim Video
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 2: Questions */}
          {step === 2 && lesson.youtubeId && videoMode !== "none" && (
            <div>
              <div className="mb-2 font-semibold text-xl text-slate-700">Video & Questions</div>
              <div className="mb-3">
                <YouTube
                  key={playerKey}
                  videoId={lesson.youtubeId}
                  opts={{
                    playerVars: {
                      start: (videoMode === "trim" && trimFinalized && trimStart != null) ? Math.floor(trimStart) : 0,
                      ...(videoMode === "trim" && trimFinalized && trimEnd != null ? { end: Math.floor(trimEnd) } : {}),
                     
                        controls: 1,           // keep basic play/pause only
                        disablekb: 1,          // disable keyboard shortcuts
                        modestbranding: 1,     // remove YouTube BIG branding
                        rel: 0,                // hide suggested videos at end
                        iv_load_policy: 3,     // hide annotations
                        fs: 0,                 // disable fullscreen icon
                        showinfo: 0,           // hide title at start
                        playsinline: 1,        // prevent iPhone fullscreen autoplay
                        autohide: 1,           // auto hide controls
                        cc_load_policy: 0,     // hide captions
                        enablejsapi: 1,        // let us control via JS
      
                      
                    },
                    width: "100%",
                    height: "400",
                  }}
                  onReady={onPlayerReady}
                  onStateChange={onStateChange}
                />
                {audioMode === "translated" && audioSrc && (
                  <audio ref={customAudioRef} src={audioSrc} className="hidden" controls />
                )}
              </div>
              <VideoProgressBar
                currentTime={currentTime}
                duration={videoDuration}
                trimStart={trimStart}
                trimEnd={trimEnd}
                isTrimMode={videoMode === "trim"}
                isTrimFinalized={trimFinalized}
                questions={lesson.questions}
                onSeek={seekTo}
              />

              {/* Trim controls */}

                               {videoMode === "trim" && !trimFinalized && (
  <div className="text-sm text-gray-600 mt-1 italic">
    Select start and end points to trim. Questions can be added after trim.
  </div>
)}

              {(videoMode === "trim" && !trimFinalized) && (

                
                <div className="flex gap-4 my-2">

 


                  <button onClick={handleSetStart}
                    className="px-3 py-2 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-shadow">
                    {trimStart == null ? "Set Start" : `Start: ${formatTime(trimStart)}`}
                  </button>
                  {trimStart != null &&
                    <button onClick={handleSetEnd}
                      className="px-3 py-2 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-shadow">
                      {trimEnd == null ? "Set End" : `End: ${formatTime(trimEnd)}`}
                    </button>
                  }
                  {trimStart != null && trimEnd != null &&
                    <button onClick={applyTrim}
                      className="px-3 py-2 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-shadow">
                      <Scissors className="w-5 h-5 mr-1 inline" />Apply Trim
                    </button>
                  }
                </div>
              )}

              {/* Add questions (only while video not ended) */}
              {videoLoaded &&
                !addingQuestion &&
                !lessonEnded && // hide after manual/auto finish
                (videoMode === "full" || (videoMode === "trim" && trimFinalized)) &&
                currentTime > 5 &&                                // avoid 0 sec
                (activeEnd - currentTime > 5) &&                  // use activeEnd (trim end or full duration)
                (
                  <button
                    onClick={startAddQuestion}
                    className="mt-4 px-4 py-2 border-2 border-blue-600 text-blue-700 rounded-lg font-medium bg-white hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="inline mr-2" /> Add Question at {formatTime(currentTime)}
                  </button>
                )}

              {/* Manual Finish Button */}
              {videoLoaded &&
                (videoMode === "full" || (videoMode === "trim" && trimFinalized)) &&
                !(
                  playerRef.current &&
                  playerRef.current.getPlayerState() === 0
                ) &&
                lesson.questions.length > 0 && !lessonEnded && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        // jump to actual end time
                        const endTime =
                          (videoMode === "trim" && trimFinalized && trimEnd != null)
                            ? trimEnd
                            : videoDuration;

                        seekTo(endTime);
                        try { playerRef.current?.pauseVideo(); } catch { }
                        setLessonEnded(true);                // immediate lock & UI update
                        setTimeout(() => setCurrentTime(endTime), 50); // update UI even if YT lagged
                      }}
                      className="w-full px-4 py-2.5 border-2 border-purple-500 hover:text-purple-700 text-purple-400 rounded-lg font-medium transition"
                    >
                      Finish Lesson Now
                    </button>
                  </div>
                )}


              {/* Finalize (Save/Discard) */}
              {videoLoaded && playerRef.current &&

                // robust end-of-video detection with small tolerance to avoid float jitter
                (() => {
                  const EPS = 0.25;
                  const playerEnded = playerRef.current.getPlayerState() === 0;
                  const reachedFullEnd = currentTime >= (videoDuration - EPS);
                  const reachedTrimEnd = (videoMode === "trim" && trimFinalized && trimEnd != null && currentTime >= (trimEnd - EPS));
                  return (
                    (playerEnded || lessonEnded || (! (videoMode === "trim" && trimFinalized) && reachedFullEnd) || reachedTrimEnd)
                    && lesson.questions.length > 0
                  );
                })() && (
                  <div className="mt-6 p-4 border border-blue-200 bg-blue-50 rounded-xl">
                    <div className="font-semi text-xl text-blue-700 mb-2">Finalize Lesson</div>
                    <div className="font-light text-md mb-4 text-gray-700">
                      Lesson: <span className="text-blue-900">{lesson.title}</span><br />
                      Questions added: <span className="text-purple-700">{lesson.questions.length}</span>
                    </div>

                    <div className="flex gap-6">
                      <button
                        onClick={saveLesson}
                        className="flex-1 px-4 py-2.5 border-2 border-green-700 text-green-700 rounded-lg font-light bg-white hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" /> Save Lesson
                      </button>

                      <button
                        onClick={resetAllState}
                        className="flex-1 px-4 py-2.5 border-2 border-red-700 text-red-700 rounded-lg font-light bg-white hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" /> Discard Lesson
                      </button>
                    </div>
                  </div>
                )}

            </div>
          )}

        </div>

        {/* RIGHT SIDE: scrollable content, help/notes/questions */}
        <div className="col-span-1 flex flex-col min-h-[450px] max-h-[520px] overflow-y-auto px-1">
          {/* Help note, only visible in Step 1 */}
          {step === 1 && (
            <div className="bg-blue-50 border-l-2 border-blue-300 rounded-lg p-4 mt-4 mb-4 text-blue-700 text-base leading-relaxed space-y-2 shadow-sm sticky top-0">
              <div className="font-semibold mb-1 text-lg">How To</div>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                <li>Add your YouTube video and choose audio (original or upload your translation).</li>
                <li>Optionally select a video segment (trim) for the lesson.</li>
                <li>In step 2, play the video and add questions at key points.</li>
                <li>Each question is linked to a timestamp; you can edit and preview placement.</li>
                <li>Once done, save the lesson file.</li>
              </ul>

            </div>
          )}
          {/* Questions, visible in Step 2 (scrollable list) */}
          {step === 2 && (
            <div className="mt-3 mb-3">
              <h3 className="text-md font-semibold text-purple-700 mb-2">Questions</h3>
              {lesson.questions.length === 0 &&
                <div className="text-gray-400 italic">No questions added yet.</div>
              }
              <div className="flex flex-col gap-2 max-h-[390px] overflow-y-auto">
                {lesson.questions.map((q, idx) => (
                  <div key={q.id} className="p-3 border border-purple-200 rounded-lg bg-white shadow-sm cursor-pointer group hover:border-purple-500 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-sm text-purple-700">Q{idx + 1}</span>
                      <span className="text-xs text-gray-400 font-mono">at {formatTime(q.time)}</span>
                      <button onClick={() => seekTo(q.time)} className="ml-auto px-1 text-blue-600 hover:text-blue-900 font-bold text-xs">Preview</button>
                      <button onClick={() => editQuestion(q)} className="px-1 text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => deleteQuestion(q.id)} className="px-1 text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="font-medium text-gray-800 mb-1">{q.question}</div>
                    <div className="text-gray-600 text-sm">Answer: {q.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Edit/Add Question Modal */}
          {addingQuestion && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2">
              <div
                className="
                  bg-white shadow-lg rounded-xl border border-blue-200 relative w-full 
                  max-w-lg p-4 sm:p-6 md:p-8
                "
              >
                {/* Title */}
                <div className="text-lg font-bold mb-3 text-purple-700 text-center">
                  {editingQuestionId ? "Edit Question" : "New Question"}
                </div>

                {/* Time Controls */}
                <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-500">Time</span>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => adjustQuestionTime(-0.5)}
                      className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 text-xs sm:text-sm"
                    >
                      -0.5s
                    </button>

                    <span className="text-blue-800 font-mono text-base sm:text-lg">
                      {formatTime(questionTime)}
                    </span>

                    <button
                      onClick={() => adjustQuestionTime(0.5)}
                      className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 text-xs sm:text-sm"
                    >
                      +0.5s
                    </button>
                  </div>
                </div>

                {/* Question Input */}
                <div className="mb-3">
                  <label className="block mb-1 font-medium text-gray-700">Question</label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) =>
                      setCurrentQuestion((q) => ({ ...q, question: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none text-sm sm:text-base"
                    rows={2}
                  />
                </div>

                {/* Answer Input */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">Answer</label>
                  <input
                    type="text"
                    value={currentQuestion.answer}
                    onChange={(e) =>
                      setCurrentQuestion((q) => ({ ...q, answer: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={saveQuestion}
                    className="
                      flex-1 px-4 py-2.5 border-2 border-green-700 bg-white text-green-700 
                      rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base
                    "
                  >
                    <Save className="w-5 h-5" /> {editingQuestionId ? "Update" : "Save"}
                  </button>

                  <button
                    onClick={() => {
                      setAddingQuestion(false);
                      setEditingQuestionId(null);
                      setCurrentQuestion({ question: "", answer: "" });
                      playerRef.current?.playVideo();
                    }}
                    className="
                      flex-1 px-4 py-2.5 border-2 border-gray-400 bg-white text-gray-700 
                      rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base
                    "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
