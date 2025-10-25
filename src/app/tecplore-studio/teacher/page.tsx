"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, Save, RotateCcw, Scissors, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { YouTubeProps } from "react-youtube";
/**
 * === IMPORTS & TYPES ===
 */
type Question = { id: string; time: number; question: string; answer: string; };
type Lesson = { title: string; youtubeLink: string; youtubeId: string; trimStart?: number; trimEnd?: number; questions: Question[]; };
type AlertType = "success" | "error" | "info" | "warning";
type AlertState = { message: string; type: AlertType } | null;

/**
 * === UTILITIES ===
 */
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}
function formatTime(seconds: number | null | undefined): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * === ALERT COMPONENT ===
 */
const Alert = ({ alert, setAlert }: { alert: AlertState; setAlert: (a: AlertState) => void }) => {
  if (!alert) return null;
  const icons = {
    success: <CheckCircle className="w-5 h-5 stroke-green-800" />,
    error: <XCircle className="w-5 h-5 stroke-red-800" />,
    info: <AlertCircle className="w-5 h-5 stroke-blue-800" />,
    warning: <AlertCircle className="w-5 h-5 stroke-yellow-800" />
  };
  const colors: Record<AlertType, string> = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800"
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md border-l-4 p-4 rounded-lg shadow-lg ${colors[alert.type]} animate-slide-in`}>
      <div className="flex items-start gap-3">
        {icons[alert.type]}
        <p className="flex-1 text-sm font-medium">{alert.message}</p>
        <button onClick={() => setAlert(null)} className="opacity-70 hover:opacity-100 transition-opacity">
          <XCircle className="w-4 h-4 stroke-gray-500" />
        </button>
      </div>
    </div>
  );
};

/**
 * === VIDEO PROGRESS BAR COMPONENT ===
 *
 * Props:
 *  - trimStart, trimEnd can be null | number to indicate unset.
 *  - onSeek and onTrimAdjust are optional; if undefined, progress bar is non-interactive for that action.
 *  - setTrimStart/setTrimEnd are optional helpers (we pass them from parent so the bar can update parent state while dragging/seeking).
 *
 * Behavior:
 *  - When trim is not finalized: user can click to seek and drag handles (if handlers provided).
 *  - When trim is finalized: bar becomes read-only (no click, no drag), but still visually shows trimmed region.
 */
const VideoProgressBar = ({
  currentTime,
  duration,
  trimStart,
  trimEnd,
  isTrimMode,
  isTrimFinalized,
  questions,
  onSeek,
  onTrimAdjust,
  setTrimStart,
  setTrimEnd
}: {
  currentTime: number;
  duration: number;
  trimStart: number | null;
  trimEnd?: number | null;
  isTrimMode: boolean;
  isTrimFinalized: boolean;
  questions: Question[];
  onSeek?: (time: number) => void;
  onTrimAdjust?: (type: "start" | "end", time: number) => void;
  setTrimStart?: (time: number) => void;
  setTrimEnd?: (time: number) => void;
}) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  // effective start/end for display & calculations
  const effectiveStart = (isTrimMode && trimStart != null) ? trimStart : 0;
  const effectiveEnd = (isTrimMode && trimEnd != null) ? trimEnd : duration;

  // avoid division by zero
  const range = Math.max(0.0001, effectiveEnd - effectiveStart);
  const progressPct = ((currentTime - effectiveStart) / range) * 100;
  const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

  // percentages relative to full duration for positioning handles/visuals
  const trimStartPct = duration > 0 && trimStart != null ? (trimStart / duration) * 100 : 0;
  const trimEndPct = duration > 0 && (trimEnd != null) ? (trimEnd / duration) * 100 : (duration > 0 ? 100 : 0);

  // Click-to-seek handler — only active if onSeek is provided and not finalized
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    if (!onSeek) return; // non-interactive if no handler
    if (isTrimFinalized) return; // read-only when finalized

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = clamp(x / rect.width, 0, 1);

    // Map click position to time within effectiveStart..effectiveEnd
    const seekTime = effectiveStart + pct * (effectiveEnd - effectiveStart);
    onSeek(seekTime);

    // If trim start/end not yet set, optionally update the "preview" start/end shown
    if (trimStart == null && setTrimStart) {
      setTrimStart(seekTime);
    } else if (trimStart != null && (trimEnd == null) && setTrimEnd) {
      setTrimEnd(seekTime);
    }
  };

  // Drag handles (only active while not finalized and if onTrimAdjust provided)
  const handleTrimDrag = (type: "start" | "end") => (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    if (!onTrimAdjust) return;
    if (isTrimFinalized) return;

    const rect = progressRef.current.getBoundingClientRect();

    function onMove(event: MouseEvent) {
      const x = event.clientX - rect.left;
      const pct = clamp(x / rect.width, 0, 1);
      const rawTime = pct * duration;
      const time = Math.max(0, Math.min(rawTime, duration));
      onTrimAdjust?.(type, Math.round(time * 10) / 10);

      // live update parent trim values if setters provided
      if (type === "start" && setTrimStart) setTrimStart(time);
      if (type === "end" && setTrimEnd) setTrimEnd(time);
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
  };

  return (
    <div className="w-full space-y-2">
      <div
        ref={progressRef}
        onClick={handleClick}
        className={`relative w-full h-3 rounded-full ${onSeek && !isTrimFinalized ? "cursor-pointer hover:h-4 transition-all" : "bg-gray-100"}`}
        style={{
          background: isTrimMode && trimStart != null
            ? // show trimmed region visually: grey before trimStart, light track across area
              `linear-gradient(to right, rgba(229,231,235,1) 0%, rgba(229,231,235,1) ${trimStartPct}%, rgba(219,234,254,0.6) ${trimStartPct}%, rgba(219,234,254,0.6) ${trimEndPct}%, rgba(229,231,235,1) ${trimEndPct}%)`
            : undefined
        }}
      >
        {/* progress fill */}
        <div
          className="absolute top-0 h-full bg-blue-600 rounded-full transition-all"
          style={{
            left: isTrimMode && trimStart != null ? `${trimStartPct}%` : "0%",
            width: (() => {
              if (!isTrimMode || trimStart == null) {
                return `${clamp(progressPct, 0, 100)}%`;
              }
              // when trim active (but not finalized) progressPct is percentage within trimmed range.
              // convert progressPct (0..100) relative to trimmed length into actual width percentage of whole duration:
              const trimmedRangePctOfDuration = ((effectiveEnd - effectiveStart) / duration) * 100;
              return `${clamp(progressPct, 0, 100) * (trimmedRangePctOfDuration / 100)}%`;
            })()
          }}
        />

        {/* question markers (only show markers that fall inside shown range) */}
        {questions.map(q => {
          const inside = q.time >= effectiveStart && q.time <= effectiveEnd;
          if (!inside) return null;
          const pctWithin = ((q.time - effectiveStart) / (effectiveEnd - effectiveStart)) * 100;
          const leftPct = (isTrimMode && trimStart != null) ? (trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)) : (q.time / duration) * 100;
          return (
            <div
              key={q.id}
              className="absolute top-0 w-1 h-full bg-purple-500 hover:w-2 transition-all"
              style={{ left: `${leftPct}%` }}
              title={`Question at ${formatTime(q.time)}`}
            />
          );
        })}

        {/* Trim handles (only shown and active when trim is set and NOT finalized) */}
        {isTrimMode && trimStart != null && !isTrimFinalized && (
          <>
            <div
              className="absolute top-0 h-full w-3 -translate-x-1/2 cursor-ew-resize"
              style={{ left: `${trimStartPct}%` }}
              onMouseDown={handleTrimDrag("start")}
              title="Drag to adjust start"
            >
              <div className="w-3 h-full rounded border-2 border-green-600 bg-white" />
            </div>
            {trimEnd != null && (
              <div
                className="absolute top-0 h-full w-3 -translate-x-1/2 cursor-ew-resize"
                style={{ left: `${trimEndPct}%` }}
                onMouseDown={handleTrimDrag("end")}
                title="Drag to adjust end"
              >
                <div className="w-3 h-full rounded border-2 border-red-600 bg-white" />
              </div>
            )}
          </>
        )}

    {/* Current time indicator */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white border-2 border-blue-600 rounded-full shadow-md"
        style={{
          left: (() => {
            if (isTrimMode && trimStart != null && trimEnd != null && !isTrimFinalized) {
              // After end is set, knob in middle of trimmed range for easier drag
              const middleTime = trimStart + (trimEnd - trimStart) / 2; 
              const pctWithin = clamp(((middleTime - effectiveStart) / (effectiveEnd - effectiveStart)) * 100, 0, 100);
              return `${trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)}%`;
            } else if (isTrimMode && trimStart != null) {
              // position relative to trimmed region
              const pctWithin = clamp(((currentTime - effectiveStart) / (effectiveEnd - effectiveStart)) * 100, 0, 100);
              return `${trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)}%`;
            }
            return `${clamp((currentTime / Math.max(0.0001, duration)) * 100, 0, 100)}%`;
          })(),
          marginLeft: '-6px' // smaller knob
        }}
      />

      </div>

      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span>{formatTime(currentTime)}</span>
        {isTrimMode && (
          <span className="text-blue-600 font-medium">
            Trim: {formatTime(trimStart)} - {trimEnd ? formatTime(trimEnd) : 'End'}
          </span>
        )}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

/**
 * === MAIN COMPONENT: TeacherModule ===
 *
 * - Keeps your UI and Q&A logic intact.
 * - Uses null for unset trimStart/trimEnd so we can detect "not set".
 * - Implemented the exact trim flow you requested.
 */
export default function TeacherModule() {
  // Lesson state
  const [lesson, setLesson] = useState<Lesson>({ title: "", youtubeLink: "", youtubeId: "", questions: [] });

  // Playback & mode state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoMode, setVideoMode] = useState<"none" | "full" | "trim">("none");
  const [trimStart, setTrimStart] = useState<number | null>(null); // null means not set
  const [trimEnd, setTrimEnd] = useState<number | null>(null);
  const [trimFinalized, setTrimFinalized] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [playerKey, setPlayerKey] = useState(0);

  // Q&A state
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  const [questionTime, setQuestionTime] = useState<number>(0);

  // Alert
  const [alert, setAlert] = useState<AlertState>(null);

  // Refs & player instance
  const playerRef = useRef<YT.Player | null>(null);
  const ytPlayerRef = useRef<YT.Player | null>(null);

  // actual YT player from onReady
  const intervalRef = useRef<number | null>(null);


// --- effects: alerts auto-clear ---
useEffect(() => {
  if (alert) {
    const t = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(t);
  }
  return () => {}; // Always return a cleanup function
}, [alert]);


  // cleanup timer
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // track playback time at interval (only when playing)
  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const t = playerRef.current.getCurrentTime();
        setCurrentTime(t);

        // If a start is set but not finalized, update start if user seeks earlier than start
        if (trimStart != null && !trimFinalized && t < trimStart) {
          // live update will not overwrite unless user clicks Set Start again, but per your request:
          // update trimStart live so start follows if user seeks before it
          setTrimStart(t);
        }

        // If trim finalized, stop at trim end (do not loop)
        if (trimFinalized && trimEnd != null && t >= trimEnd - 0.05) {
          // pause at end
          try { playerRef.current.pauseVideo(); } catch {}
          setIsPlaying(false);
        }
      }
    }, 100);
  }, [trimStart, trimEnd, trimFinalized]);

  // reset full
  const resetAllState = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.stopVideo === "function") {
      try { playerRef.current.stopVideo(); } catch {}
    }
    setLesson({ title: "", youtubeLink: "", youtubeId: "", questions: [] });
    setVideoMode("none");
    setTrimStart(null);
    setTrimEnd(null);
    setTrimFinalized(false);
    setVideoLoaded(false);
    setAddingQuestion(false);
    setCurrentQuestion({ question: "", answer: "" });
    setCurrentTime(0);
    setIsPlaying(false);
    setVideoDuration(0);
    setPlayerKey(0);
    setQuestionTime(0);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  // --- YouTube handlers ---
 const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target; // react-youtube exposes player API as event.target
    ytPlayerRef.current = event.target;
    const duration = event.target.getDuration();
    setVideoDuration(duration);
    setVideoLoaded(true);

    // if entering trim mode, initialize trimEnd to duration so UI shows end by default (but not set)
    if (videoMode === "trim" && trimEnd == null) {
      setTrimEnd(duration);
    }
    setAlert({ message: "Video loaded successfully!", type: "success" });
  };

const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    const state = event.data;
    if (state === 1) { // playing
      setIsPlaying(true);
      startTimeTracking();
    } else if (state === 2) { // paused
      setIsPlaying(false);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    } else if (state === 0) { // ended
      setIsPlaying(false);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      // show info alert only if there are questions
      if (lesson.questions.length > 0) {
        setAlert({ message: "Video ended. You can now save your lesson.", type: "info" });
      }
    }
  };

  // --- Trim flow handlers (exact flow you requested) ---
  // Set Start: capture current time and reveal Set End
  const handleSetStart = () => {
    if (!playerRef.current || typeof playerRef.current.getCurrentTime !== "function") return;
    const t = playerRef.current.getCurrentTime();
    setTrimStart(t);
    setTrimEnd(null); // reset any previously set end
    setAlert({ message: `Start set to ${formatTime(t)}`, type: "success" });
    // pause for precision
    try { playerRef.current.pauseVideo(); } catch {}
  };

  // Set End: capture current time (must be after start) and reveal Apply
  const handleSetEnd = () => {
    if (!playerRef.current || typeof playerRef.current.getCurrentTime !== "function") return;
    const t = playerRef.current.getCurrentTime();
    if (trimStart == null) {
      setAlert({ message: "Set start first", type: "error" });
      return;
    }
    if (t <= trimStart + 0.05) {
      setAlert({ message: "End must be after start", type: "error" });
      return;
    }
    setTrimEnd(t);
    setAlert({ message: `End set to ${formatTime(t)}`, type: "success" });
    try { playerRef.current.pauseVideo(); } catch {}
  };

  // Apply Trim: finalize trim and restrict player start/end on reload
  const applyTrim = () => {
    if (trimStart == null || trimEnd == null || trimEnd <= trimStart) {
      setAlert({ message: "Invalid trim range", type: "error" });
      return;
    }
    setTrimFinalized(true);
    // reload player by changing key so new ytOpts take effect (start/end)
    setPlayerKey(prev => prev + 1);
    setAlert({ message: "Trim applied! Playback will use selected range.", type: "success" });

    // seek to trimmed start and play
    setTimeout(() => {
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        try {
          playerRef.current.seekTo(trimStart, true);
          playerRef.current.playVideo();
        } catch {}
      }
    }, 150);
  };



  // Drag adjust trim live from progress bar handles (used only while not finalized)
  const handleTrimAdjust = useCallback((type: "start" | "end", time: number) => {
    if (type === "start") {
      if (trimEnd != null && time >= trimEnd - 0.5) return;
      setTrimStart(time);
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        try { playerRef.current.seekTo(time, true); } catch {}
      }
    } else {
      if (trimStart != null && time <= trimStart + 0.05) return;
      setTrimEnd(time);
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        try { playerRef.current.seekTo(time, true); } catch {}
      }
    }
  }, [trimStart, trimEnd]);

  // --- Q&A handlers ---
  const startAddQuestion = () => {
    if (!videoLoaded || !playerRef.current) return;
    const time = playerRef.current.getCurrentTime();
    if (videoMode === "trim" && trimFinalized) {
      if (trimStart != null && time < trimStart) { setAlert({ message: "Question time must be within trimmed range!", type: "error" }); return; }
      if (trimEnd != null && time > trimEnd) { setAlert({ message: "Question time must be within trimmed range!", type: "error" }); return; }
    }
    try { playerRef.current.pauseVideo(); } catch {}
    setQuestionTime(time);
    setAddingQuestion(true);
    setAlert({ message: `Adding question at ${formatTime(time)}`, type: "info" });
  };

  const adjustQuestionTime = (delta: number) => {
    let newTime = questionTime + delta;
    const minTime = (videoMode === "trim" && trimFinalized && trimStart != null) ? trimStart : 0;
    const maxTime = (videoMode === "trim" && trimFinalized && trimEnd != null) ? trimEnd : videoDuration;
    newTime = Math.max(minTime, Math.min(maxTime, newTime));
    setQuestionTime(newTime);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      try { playerRef.current.seekTo(newTime, true); } catch {}
    }
  };

  const saveQuestion = () => {
    if (!currentQuestion.question.trim() || !currentQuestion.answer.trim()) { setAlert({ message: "Both question and answer are required!", type: "error" }); return; }
    const newQ: Question = { id: uuidv4(), time: questionTime, question: currentQuestion.question.trim(), answer: currentQuestion.answer.trim() };
    setLesson(prev => ({ ...prev, questions: [...prev.questions, newQ].sort((a, b) => a.time - b.time) }));
    setCurrentQuestion({ question: "", answer: "" });
    setAddingQuestion(false);
    setAlert({ message: "Question added successfully!", type: "success" });
    try { if (playerRef.current) playerRef.current.playVideo(); } catch {}
  };

  const cancelQuestion = () => { setAddingQuestion(false); setCurrentQuestion({ question: "", answer: "" }); if (playerRef.current) try { playerRef.current.playVideo(); } catch  {} };

  const deleteQuestion = (id: string) => {
  setLesson(prev => {
    if (prev.questions.length <= 1) {
      setAlert({ message: "Atleast one question required!", type: "error" });
      return prev; // do not delete
    }
    const updatedQuestions = prev.questions.filter(q => q.id !== id);
    setAlert({ message: "Question deleted", type: "info" });
    return { ...prev, questions: updatedQuestions };
  });
};


  // --- Save Lesson ---
  const saveLesson = () => {
    if (!lesson.title.trim()) { setAlert({ message: "Please enter a lesson title", type: "error" }); return; }
    if (!lesson.youtubeId) { setAlert({ message: "Please add a YouTube video", type: "error" }); return; }
    if (lesson.questions.length === 0) { setAlert({ message: "Please add at least one question", type: "error" }); return; }

    const dataToSave: Lesson = {
      ...lesson,
      trimStart: (videoMode === "trim" && trimFinalized && trimStart != null) ? trimStart : undefined,
      trimEnd: (videoMode === "trim" && trimFinalized && trimEnd != null) ? trimEnd : undefined
    };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" });
    const filename = `${lesson.title.trim().replace(/\s+/g, "_")}.json`;
    saveAs(blob, filename);
    setAlert({ message: "Lesson saved successfully!", type: "success" });
    setTimeout(resetAllState, 1500);
  };

  // Seek helper
  const seekTo = (time: number) => {
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      try { playerRef.current.seekTo(time, true); setCurrentTime(time); } catch {}
    }
  };

  // --- YouTube options: pass start/end only when finalized ---
  const safeTrimEnd = (trimFinalized && trimEnd != null) ? Math.floor(trimEnd) : undefined;
  const safeTrimStart = (trimFinalized && trimStart != null) ? Math.floor(trimStart) : 0;

 const ytOpts: YouTubeProps['opts'] = {
    playerVars: {
      start: safeTrimStart,
      ...(safeTrimEnd ? { end: safeTrimEnd } : {}),
      controls: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,        // disable fullscreen
      disablekb: 1, // disable keyboard shortcuts
    },
    width: "100%",
    height: "100%",
  };


  /**
   * === RENDER ===
   * - Kept the original layout and styling; replaced only the trim flow & progress bar wiring.
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Alert alert={alert} setAlert={setAlert} />
    {isPlaying && null}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Video Lesson Creator</h1>
            <p className="text-sm text-gray-600 mt-1">Create interactive lessons from YouTube videos</p>
          </div>
          {videoLoaded && (
            <button onClick={resetAllState} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <RotateCcw className="w-4 h-4 stroke-gray-700" />
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Page body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: main UI */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson setup */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lesson Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                  <input type="text" placeholder="Enter lesson title" value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
                  <input type="text" placeholder="https://youtube.com/watch?v=..." value={lesson.youtubeLink} onChange={(e) => {
                    const ytId = extractYouTubeId(e.target.value);
                    setLesson(prev => ({ ...prev, youtubeLink: e.target.value, youtubeId: ytId }));
                  }} disabled={videoMode !== 'none'} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-shadow" />
                </div>

                {videoMode === "none" && lesson.youtubeId && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => { setVideoMode("full"); setPlayerKey(k => k + 1); }} className="flex-1 px-4 py-2.5 bg-white border-2 border-blue-600 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">Use Full Video</button>
                    <button onClick={() => { setVideoMode("trim"); setPlayerKey(k => k + 1); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                      <Scissors className="w-4 h-4 stroke-purple-700" /> Trim Video
                    </button>
                  </div>
                )}
              </div>
            </div>

           
           {/* Video player area */}
            {lesson.youtubeId && videoMode !== "none" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <YouTube
                    key={`${lesson.youtubeId}-${playerKey}`}
                    videoId={lesson.youtubeId}
                    opts={ytOpts}
                    onReady={onPlayerReady}
                    onStateChange={onStateChange}
                    className="w-full h-full"
                  />

                  {/* Video-ended overlay */}
                 {videoLoaded && playerRef.current && (
                  ((playerRef.current.getPlayerState() === 0) || 
                  (videoMode === "trim" && trimFinalized && currentTime >= (trimEnd ?? videoDuration))) && (
                    <div className="absolute inset-0 bg-black bg-opacity-95 flex flex-col justify-center items-center z-10 rounded-lg">
                      <span className="text-white text-lg font-semibold mb-2">Video Ended</span>
                      {lesson.questions.length === 0 && (
                        <span className="text-white text-sm text-center">
                          Prepare your questions and watch again.<br />Thanks for watching.
                        </span>
                      )}
                    </div>
                  )
                  )}
                </div>

                {/* === TRIM MODE: Progress Bar + Controls === */}
                {videoMode === "trim" && videoLoaded && playerRef.current?.getPlayerState() !== 0 && (
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <VideoProgressBar
                      currentTime={currentTime}
                      duration={videoDuration}
                      trimStart={trimStart}
                      trimEnd={trimEnd}
                      isTrimMode={true}
                      isTrimFinalized={trimFinalized}
                      questions={lesson.questions}
                      onSeek={trimStart != null && trimEnd != null && !trimFinalized ? seekTo : undefined} // allow seek only after trim defined
                      onTrimAdjust={(!trimFinalized && trimStart != null && trimEnd != null) ? handleTrimAdjust : undefined}
                      setTrimStart={setTrimStart}
                      setTrimEnd={setTrimEnd}
                    />

                    {/* Trim Controls */}
                    {!trimFinalized && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="text-sm font-semibold text-purple-900 mb-3">Trim Controls</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Step 1: Start */}
                          <button
                            onClick={handleSetStart}
                            className="px-3 py-2 bg-white border-2 border-green-600 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50"
                          >
                            {trimStart == null ? "Set Start" : `Start at ${formatTime(trimStart)}`}
                            <div className="text-xs font-normal mt-0.5">{trimStart == null ? formatTime(currentTime) : formatTime(trimStart)}</div>
                          </button>

                          {/* Step 2: End */}
                          {trimStart != null && (
                            <button
                              onClick={handleSetEnd}
                              className="px-3 py-2 bg-white border-2 border-red-600 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50"
                            >
                              {trimEnd == null ? "Set End" : `End at ${formatTime(trimEnd)}`}
                              <div className="text-xs font-normal mt-0.5">{trimEnd == null ? formatTime(currentTime) : formatTime(trimEnd)}</div>
                            </button>
                          )}

                          {/* Step 3: Apply */}
                          {trimStart != null && trimEnd != null && (
                            <button
                              onClick={applyTrim}
                              className="px-3 py-2 bg-white border-2 border-purple-700 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100"
                            >
                              Apply Trim
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

    {/* === ADD QUESTION BUTTON === */}
    {videoLoaded && !addingQuestion && playerRef.current?.getPlayerState() !== 0 && (
      <div>
        { (videoMode === "full") || (videoMode === "trim" && trimFinalized) ? (
          <button
            onClick={startAddQuestion}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-700 bg-white rounded-lg font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 stroke-blue-700" />
            Add Question at {formatTime(currentTime)}
          </button>
        ) : null }
      </div>
    )}
  </div>
)}

          </div>

          {/* Right sidebar (questions, stats, etc) - left unchanged except types corrected */}
          <div className="space-y-6">
            {/* Question Form */}
            {addingQuestion && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Question</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Time</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => adjustQuestionTime(-0.5)} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">-0.5s</button>
                      <span className="font-mono font-bold text-purple-700">{formatTime(questionTime)}</span>
                      <button onClick={() => adjustQuestionTime(0.5)} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">+0.5s</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <textarea rows={3} placeholder="Enter your question..." value={currentQuestion.question} onChange={(e) => setCurrentQuestion(q => ({ ...q, question: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <input type="text" placeholder="Enter the answer..." value={currentQuestion.answer} onChange={(e) => setCurrentQuestion(q => ({ ...q, answer: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={saveQuestion} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      <CheckCircle className="w-4 h-4" /> Save
                    </button>
                    <button onClick={cancelQuestion} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Questions list */}
            {lesson.questions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Questions ({lesson.questions.length})</h3>
                  {lesson.questions.length > 0 && videoLoaded && (
                    <button onClick={saveLesson} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      <Save className="w-4 h-4" /> Save Lesson
                    </button>
                  )}
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {lesson.questions.map((q, index) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono font-medium text-blue-600">#{index + 1} • {formatTime(q.time)}</span>
                        <button onClick={() => deleteQuestion(q.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete question">
                          <Trash2 className="w-4 h-4 stroke-red-600" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{q.question}</p>
                      <p className="text-xs text-gray-600"><span className="font-medium">Answer:</span> {q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick start guide */}
            {!videoLoaded && (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Quick Start Guide</h3>
                <ol className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2"><span className="font-bold">1.</span><span>Enter a lesson title and YouTube URL</span></li>
                  <li className="flex gap-2"><span className="font-bold">2.</span><span>Choose to use full video or trim a section</span></li>
                  <li className="flex gap-2"><span className="font-bold">3.</span><span>Play the video and add questions at key moments</span></li>
                  <li className="flex gap-2"><span className="font-bold">4.</span><span>Save your lesson as a JSON file</span></li>
                </ol>
              </div>
            )}

            {/* Stats */}
            {videoLoaded && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Lesson Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Video Duration</span><span className="font-mono font-bold text-gray-900">{formatTime(videoDuration)}</span></div>
                  {videoMode === "trim" && trimEnd != null && trimStart != null && (
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Trimmed Duration</span><span className="font-mono font-bold text-purple-700">{formatTime(trimEnd - trimStart)}</span></div>
                  )}
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Questions Added</span><span className="font-bold text-blue-600 text-lg">{lesson.questions.length}</span></div>
                  {lesson.questions.length > 0 && (
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Avg. Time Between</span><span className="font-mono font-medium text-gray-900">{formatTime(lesson.questions.length > 1 ? (lesson.questions[lesson.questions.length - 1].time - lesson.questions[0].time) / (lesson.questions.length - 1) : 0)}</span></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
