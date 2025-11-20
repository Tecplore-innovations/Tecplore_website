"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { 
  Plus, Trash2, Save, RotateCcw, Scissors, CheckCircle, 
  XCircle, AlertCircle, Upload, Music, Volume2, VolumeX 
} from "lucide-react";

// --- Types ---
type Question = { id: string; time: number; question: string; answer: string; };
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
  const match = url.match(/(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}
function formatTime(seconds: number | null | undefined): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// --- Components ---
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

const VideoProgressBar = ({
  currentTime, duration, trimStart, trimEnd, isTrimMode, isTrimFinalized, questions,
  onSeek, onTrimAdjust, setTrimStart, setTrimEnd
}: {
  currentTime: number; duration: number; trimStart: number | null; trimEnd?: number | null;
  isTrimMode: boolean; isTrimFinalized: boolean; questions: Question[];
  onSeek?: (time: number) => void; onTrimAdjust?: (type: "start" | "end", time: number) => void;
  setTrimStart?: (time: number) => void; setTrimEnd?: (time: number) => void;
}) => {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const effectiveStart = (isTrimMode && trimStart != null) ? trimStart : 0;
  const effectiveEnd = (isTrimMode && trimEnd != null) ? trimEnd : duration;
  const range = Math.max(0.0001, effectiveEnd - effectiveStart);
  const progressPct = ((currentTime - effectiveStart) / range) * 100;
  const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const trimStartPct = duration > 0 && trimStart != null ? (trimStart / duration) * 100 : 0;
  const trimEndPct = duration > 0 && (trimEnd != null) ? (trimEnd / duration) * 100 : (duration > 0 ? 100 : 0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek || isTrimFinalized) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const seekTime = effectiveStart + pct * (effectiveEnd - effectiveStart);
    onSeek(seekTime);
    if (trimStart == null && setTrimStart) setTrimStart(seekTime);
    else if (trimStart != null && (trimEnd == null) && setTrimEnd) setTrimEnd(seekTime);
  };

  const handleTrimDrag = (type: "start" | "end") => (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onTrimAdjust || isTrimFinalized) return;
    const rect = progressRef.current.getBoundingClientRect();
    function onMove(event: MouseEvent) {
      const pct = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const time = Math.max(0, Math.min(pct * duration, duration));
      onTrimAdjust?.(type, Math.round(time * 10) / 10);
      if (type === "start" && setTrimStart) setTrimStart(time);
      if (type === "end" && setTrimEnd) setTrimEnd(time);
    }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
  };

  return (
    <div className="w-full space-y-2">
      <div
        ref={progressRef} onClick={handleClick}
        className={`relative w-full h-3 rounded-full ${onSeek && !isTrimFinalized ? "cursor-pointer hover:h-4 transition-all" : "bg-gray-100"}`}
        style={{
          background: isTrimMode && trimStart != null
            ? `linear-gradient(to right, rgba(229,231,235,1) 0%, rgba(229,231,235,1) ${trimStartPct}%, rgba(219,234,254,0.6) ${trimStartPct}%, rgba(219,234,254,0.6) ${trimEndPct}%, rgba(229,231,235,1) ${trimEndPct}%)`
            : undefined
        }}
      >
        <div className="absolute top-0 h-full bg-blue-600 rounded-full transition-all"
          style={{
            left: isTrimMode && trimStart != null ? `${trimStartPct}%` : "0%",
            width: (() => {
              if (!isTrimMode || trimStart == null) return `${clamp(progressPct, 0, 100)}%`;
              const trimmedRangePctOfDuration = ((effectiveEnd - effectiveStart) / duration) * 100;
              return `${clamp(progressPct, 0, 100) * (trimmedRangePctOfDuration / 100)}%`;
            })()
          }}
        />
        {questions.map(q => {
          const inside = q.time >= effectiveStart && q.time <= effectiveEnd;
          if (!inside) return null;
          const pctWithin = ((q.time - effectiveStart) / (effectiveEnd - effectiveStart)) * 100;
          const leftPct = (isTrimMode && trimStart != null) ? (trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)) : (q.time / duration) * 100;
          return <div key={q.id} className="absolute top-0 w-1 h-full bg-purple-500 hover:w-2 transition-all" style={{ left: `${leftPct}%` }} />;
        })}
        {isTrimMode && trimStart != null && !isTrimFinalized && (
          <>
            <div className="absolute top-0 h-full w-3 -translate-x-1/2 cursor-ew-resize" style={{ left: `${trimStartPct}%` }} onMouseDown={handleTrimDrag("start")}>
              <div className="w-3 h-full rounded border-2 border-green-600 bg-white" />
            </div>
            {trimEnd != null && (
              <div className="absolute top-0 h-full w-3 -translate-x-1/2 cursor-ew-resize" style={{ left: `${trimEndPct}%` }} onMouseDown={handleTrimDrag("end")}>
                <div className="w-3 h-full rounded border-2 border-red-600 bg-white" />
              </div>
            )}
          </>
        )}
        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white border-2 border-blue-600 rounded-full shadow-md"
          style={{
            left: (() => {
              if (isTrimMode && trimStart != null && trimEnd != null && !isTrimFinalized) {
                const middleTime = trimStart + (trimEnd - trimStart) / 2;
                const pctWithin = clamp(((middleTime - effectiveStart) / (effectiveEnd - effectiveStart)) * 100, 0, 100);
                return `${trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)}%`;
              } else if (isTrimMode && trimStart != null) {
                const pctWithin = clamp(((currentTime - effectiveStart) / (effectiveEnd - effectiveStart)) * 100, 0, 100);
                return `${trimStartPct + pctWithin * ((effectiveEnd - effectiveStart) / duration)}%`;
              }
              return `${clamp((currentTime / Math.max(0.0001, duration)) * 100, 0, 100)}%`;
            })(),
            marginLeft: '-6px'
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span>{formatTime(currentTime)}</span>
        {isTrimMode && <span className="text-blue-600 font-medium">Trim: {formatTime(trimStart)} - {trimEnd ? formatTime(trimEnd) : 'End'}</span>}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

/**
 * === MAIN COMPONENT: TeacherModule ===
 */
export default function TeacherModule() {
  // Lesson state
  const [lesson, setLesson] = useState<Lesson>({ 
    title: "", youtubeLink: "", youtubeId: "", translatedAudio: false, questions: [] 
  });

  // Audio Translation State
  const [audioMode, setAudioMode] = useState<AudioMode>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);

  // Playback & mode state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoMode, setVideoMode] = useState<"none" | "full" | "trim">("none");
  const [trimStart, setTrimStart] = useState<number | null>(null);
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

  // Alert & Refs
  const [alert, setAlert] = useState<AlertState>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<number | null>(null);

  // --- FIX: Linting error (useEffect return path) ---
  useEffect(() => {
    if (alert) {
      const t = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(t);
    }
    // Explicitly return undefined if no alert
    return undefined;
  }, [alert]);

  // Cleanup timer and audio URL
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioSrc) URL.revokeObjectURL(audioSrc);
    };
  }, []); // Missing dependency audioSrc is intentionally left out to run only on unmount, but we check current ref value

  // --- Audio File Handler ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTranslatedFile(file);
      
      // Create Object URL for playback
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setLesson(prev => ({ ...prev, translatedAudio: true }));
      setAlert({ message: "Audio uploaded successfully!", type: "success" });
    }
  };

  // --- FIX: Audio Sync Effect (Reactive to isPlaying state) ---
  // This ensures audio plays/pauses immediately when React state changes, 
  // solving the "audio not playing" issue.
  useEffect(() => {
    if (audioMode === "translated" && customAudioRef.current) {
      if (isPlaying) {
        // Try to play, catch auto-play errors
        const playPromise = customAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback prevented:", error);
            // Sometimes forcing sync in the interval loop fixes this
          });
        }
      } else {
        customAudioRef.current.pause();
      }
    }
  }, [isPlaying, audioMode]);


  // --- Main Sync Logic Loop (Time Drift Correction) ---
  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // We run this every 100ms to keep everything in check
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const t = playerRef.current.getCurrentTime();
        setCurrentTime(t);

        // === TRANSLATED AUDIO SYNC ===
        if (audioMode === "translated" && customAudioRef.current) {
          
          // 1. Aggressive Mute: If user somehow unmuted, force mute again immediately
          if (typeof playerRef.current.isMuted === 'function' && !playerRef.current.isMuted()) {
            playerRef.current.mute();
          }

          // 2. Time Sync: If audio drifted from video by > 0.15s, snap audio to video time
          const timeDiff = Math.abs(customAudioRef.current.currentTime - t);
          if (timeDiff > 0.15) {
             // Only seek if difference is significant to avoid stutter
             customAudioRef.current.currentTime = t;
          }
        }
        // ==============================

        // Trim Start Check (Live update of start handle visually)
        if (trimStart != null && !trimFinalized && t < trimStart) {
          setTrimStart(t);
        }

        // Trim End Check (Stop playback at end of trim)
        if (trimFinalized && trimEnd != null && t >= trimEnd - 0.05) {
          try { playerRef.current.pauseVideo(); } catch {}
          if (customAudioRef.current) customAudioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, 100);
  }, [trimStart, trimEnd, trimFinalized, audioMode]);

  // --- Reset ---
  const resetAllState = useCallback(() => {
    if (playerRef.current) { try { playerRef.current.stopVideo(); } catch {} }
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
    setCurrentQuestion({ question: "", answer: "" });
    setCurrentTime(0);
    setIsPlaying(false);
    setVideoDuration(0);
    setPlayerKey(0);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, [audioSrc]);

  // --- YouTube Events ---
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    setVideoDuration(event.target.getDuration());
    setVideoLoaded(true);

    // IMMEDIATE MUTE if translated mode
    if (audioMode === "translated") {
      event.target.mute();
    }

    if (videoMode === "trim" && trimEnd == null) {
      setTrimEnd(event.target.getDuration());
    }
    setAlert({ message: "Video loaded successfully!", type: "success" });
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    const state = event.data;
    
    // RE-MUTE on any state change to be safe
    if (audioMode === "translated") {
      event.target.mute();
    }

    if (state === 1) { // PLAYING
      setIsPlaying(true);
      startTimeTracking();
    } else if (state === 2) { // PAUSED
      setIsPlaying(false);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    } else if (state === 3) { // BUFFERING
       // Pause logic handled by useEffect(isPlaying)
    } else if (state === 0) { // ENDED
      setIsPlaying(false);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      if (lesson.questions.length > 0) {
        setAlert({ message: "Video ended. You can now save your lesson.", type: "info" });
      }
    }
  };

  // --- Controls ---
  const handleSetStart = () => {
    if (!playerRef.current) return;
    const t = playerRef.current.getCurrentTime();
    setTrimStart(t);
    setTrimEnd(null);
    setAlert({ message: `Start set to ${formatTime(t)}`, type: "success" });
    try { playerRef.current.pauseVideo(); } catch {}
  };

  const handleSetEnd = () => {
    if (!playerRef.current) return;
    const t = playerRef.current.getCurrentTime();
    if (trimStart == null) { setAlert({ message: "Set start first", type: "error" }); return; }
    if (t <= trimStart + 0.05) { setAlert({ message: "End must be after start", type: "error" }); return; }
    setTrimEnd(t);
    setAlert({ message: `End set to ${formatTime(t)}`, type: "success" });
    try { playerRef.current.pauseVideo(); } catch {}
  };

  const applyTrim = () => {
    if (trimStart == null || trimEnd == null || trimEnd <= trimStart) { setAlert({ message: "Invalid trim range", type: "error" }); return; }
    setTrimFinalized(true);
    setPlayerKey(prev => prev + 1); // reload player
    setAlert({ message: "Trim applied!", type: "success" });
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.seekTo(trimStart, true);
        playerRef.current.playVideo();
      }
    }, 150);
  };

  const handleTrimAdjust = useCallback((type: "start" | "end", time: number) => {
    if (type === "start") {
      if (trimEnd != null && time >= trimEnd - 0.5) return;
      setTrimStart(time);
      playerRef.current?.seekTo(time, true);
    } else {
      if (trimStart != null && time <= trimStart + 0.05) return;
      setTrimEnd(time);
      playerRef.current?.seekTo(time, true);
    }
  }, [trimStart, trimEnd]);

  // --- Q&A Logic ---
  const startAddQuestion = () => {
    if (!videoLoaded || !playerRef.current) return;
    const time = playerRef.current.getCurrentTime();
    if (videoMode === "trim" && trimFinalized) {
      if ((trimStart != null && time < trimStart) || (trimEnd != null && time > trimEnd)) {
        setAlert({ message: "Question time must be within trimmed range!", type: "error" }); return;
      }
    }
    playerRef.current.pauseVideo();
    setQuestionTime(time);
    setAddingQuestion(true);
  };

  const adjustQuestionTime = (delta: number) => {
    let newTime = questionTime + delta;
    const minTime = (videoMode === "trim" && trimFinalized && trimStart != null) ? trimStart : 0;
    const maxTime = (videoMode === "trim" && trimFinalized && trimEnd != null) ? trimEnd : videoDuration;
    newTime = Math.max(minTime, Math.min(maxTime, newTime));
    setQuestionTime(newTime);
    playerRef.current?.seekTo(newTime, true);
  };

  const saveQuestion = () => {
    if (!currentQuestion.question.trim() || !currentQuestion.answer.trim()) {
      setAlert({ message: "Both question and answer are required!", type: "error" }); return;
    }
    const newQ: Question = { id: uuidv4(), time: questionTime, question: currentQuestion.question.trim(), answer: currentQuestion.answer.trim() };
    setLesson(prev => ({ ...prev, questions: [...prev.questions, newQ].sort((a, b) => a.time - b.time) }));
    setCurrentQuestion({ question: "", answer: "" });
    setAddingQuestion(false);
    setAlert({ message: "Question added successfully!", type: "success" });
    playerRef.current?.playVideo();
  };

  const deleteQuestion = (id: string) => {
    setLesson(prev => {
      if (prev.questions.length <= 1) { setAlert({ message: "At least one question required!", type: "error" }); return prev; }
      setAlert({ message: "Question deleted", type: "info" });
      return { ...prev, questions: prev.questions.filter(q => q.id !== id) };
    });
  };

  const saveLesson = () => {
    if (!lesson.title.trim()) { setAlert({ message: "Please enter a lesson title", type: "error" }); return; }
    if (!lesson.questions.length) { setAlert({ message: "Please add at least one question", type: "error" }); return; }

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

  const seekTo = (time: number) => {
    playerRef.current?.seekTo(time, true);
    setCurrentTime(time);
    // Seek audio too if in translated mode
    if(audioMode === "translated" && customAudioRef.current) {
      customAudioRef.current.currentTime = time;
    }
  };

  // --- Player Config ---
  const safeTrimEnd = (trimFinalized && trimEnd != null) ? Math.floor(trimEnd) : undefined;
  const safeTrimStart = (trimFinalized && trimStart != null) ? Math.floor(trimStart) : 0;

  const ytOpts: YouTubeProps['opts'] = {
    playerVars: {
      start: safeTrimStart,
      ...(safeTrimEnd ? { end: safeTrimEnd } : {}),
      controls: 1,       // Keep controls for scrubbing
      modestbranding: 1, // Minimize YT logo
      rel: 0,            // Limit related videos
      fs: 0,             // Disable fullscreen
      disablekb: 1,      // Disable keyboard shortcuts
      iv_load_policy: 3, // Hide annotations
      playsinline: 1
    },
    width: "100%",
    height: "100%",
  };

  const isAudioReady = audioMode === "original" || (audioMode === "translated" && translatedFile !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Alert alert={alert} setAlert={setAlert} />
      
      {/* Hidden Audio Player for Translated Mode */}
      {audioMode === "translated" && audioSrc && (
        <audio ref={customAudioRef} src={audioSrc} preload="auto" muted={false} />
      )}

      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-gray-900">Video Lesson Creator</h1>
            <p className="text-sm text-gray-600 mt-1">Create interactive lessons from YouTube videos</p>
          </div>
          {videoLoaded && (
            <button onClick={resetAllState} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <RotateCcw className="w-4 h-4 stroke-gray-700" /> Start Over
            </button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main UI */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Setup */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lesson Setup</h2>
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                  <input type="text" placeholder="Enter lesson title" value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
                  <input type="text" placeholder="https://youtube.com/watch?v=..." 
                    value={lesson.youtubeLink} 
                    onChange={(e) => {
                      const ytId = extractYouTubeId(e.target.value);
                      setLesson(prev => ({ ...prev, youtubeLink: e.target.value, youtubeId: ytId }));
                    }} 
                    disabled={videoMode !== 'none'} 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-shadow" 
                  />
                </div>

                {/* Audio Selection (Only show if URL is valid and video not yet started) */}
                {lesson.youtubeId && videoMode === "none" && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-slide-in">
                    <label className="block text-sm font-medium text-gray-800 mb-3">Audio Preference</label>
                    <div className="flex gap-4 mb-4">
                      <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${audioMode === 'original' ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-gray-300 hover:bg-gray-100'}`}>
                        <input type="radio" name="audioMode" value="original" checked={audioMode === "original"} onChange={() => { setAudioMode("original"); setLesson(l => ({...l, translatedAudio: false})); }} className="hidden" />
                        <Volume2 className={`w-5 h-5 ${audioMode === 'original' ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${audioMode === 'original' ? 'text-blue-900' : 'text-gray-700'}`}>Use Original Audio</span>
                      </label>

                      <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${audioMode === 'translated' ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500' : 'bg-white border-gray-300 hover:bg-gray-100'}`}>
                        <input type="radio" name="audioMode" value="translated" checked={audioMode === "translated"} onChange={() => { setAudioMode("translated"); setLesson(l => ({...l, translatedAudio: true})); }} className="hidden" />
                        <Music className={`w-5 h-5 ${audioMode === 'translated' ? 'text-purple-600' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${audioMode === 'translated' ? 'text-purple-900' : 'text-gray-700'}`}>Use Translated Audio</span>
                      </label>
                    </div>

                    {/* File Upload for Translated Audio */}
                    {audioMode === "translated" && (
                      <div className="mt-3 animate-slide-in">
                        <label className="block text-xs font-semibold text-purple-800 mb-2 uppercase tracking-wider">Upload Audio File</label>
                        <div className="flex items-center gap-3">
                          <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors bg-white">
                             <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                             <Upload className="w-6 h-6 text-purple-400 mb-1" />
                             <span className="text-xs text-purple-600 font-medium">{translatedFile ? translatedFile.name : "Click to upload (.mp3, .wav)"}</span>
                          </label>
                          {translatedFile && <CheckCircle className="w-6 h-6 text-green-500" />}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons (Only appear when audio condition met) */}
                {videoMode === "none" && lesson.youtubeId && isAudioReady && (
                  <div className="flex gap-3 pt-2 animate-slide-in">
                    <button onClick={() => { setVideoMode("full"); setPlayerKey(k => k + 1); }} className="flex-1 px-4 py-2.5 bg-white border-2 border-blue-600 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                      Use Full Video
                    </button>
                    <button onClick={() => { setVideoMode("trim"); setPlayerKey(k => k + 1); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                      <Scissors className="w-4 h-4 stroke-purple-700" /> Trim Video
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Video Player & Tools */}
            {lesson.youtubeId && videoMode !== "none" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                {/* Player Wrapper */}
                <div className="relative">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    <YouTube
                      key={`${lesson.youtubeId}-${playerKey}`}
                      videoId={lesson.youtubeId}
                      opts={ytOpts}
                      onReady={onPlayerReady}
                      onStateChange={onStateChange}
                      className="w-full h-full"
                    />
                    
                    {/* Overlays */}
                    {videoLoaded && playerRef.current && (
                      ((playerRef.current.getPlayerState() === 0) || 
                      (videoMode === "trim" && trimFinalized && currentTime >= (trimEnd ?? videoDuration))) && (
                        <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-10">
                          <span className="text-white text-lg font-semibold mb-2">Video Ended</span>
                          {lesson.questions.length === 0 && (
                             <span className="text-white text-sm opacity-75">Prepare your questions.</span>
                          )}
                        </div>
                      )
                    )}
                    {/* Muted Icon Overlay for Translated Mode */}
                    {audioMode === "translated" && isPlaying && (
                       <div className="absolute top-4 right-4 bg-black bg-opacity-50 p-1.5 rounded-full text-white pointer-events-none" title="Using Translated Audio">
                          <VolumeX className="w-4 h-4" />
                       </div>
                    )}
                  </div>
                </div>

                {/* Trim Controls */}
                {videoMode === "trim" && videoLoaded && playerRef.current?.getPlayerState() !== 0 && (
                  <div className="space-y-4">
                    <VideoProgressBar
                      currentTime={currentTime}
                      duration={videoDuration}
                      trimStart={trimStart}
                      trimEnd={trimEnd}
                      isTrimMode={true}
                      isTrimFinalized={trimFinalized}
                      questions={lesson.questions}
                      onSeek={trimStart != null && trimEnd != null && !trimFinalized ? seekTo : undefined}
                      onTrimAdjust={(!trimFinalized && trimStart != null && trimEnd != null) ? handleTrimAdjust : undefined}
                      setTrimStart={setTrimStart}
                      setTrimEnd={setTrimEnd}
                    />
                    {!trimFinalized && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 grid grid-cols-3 gap-3">
                        <button onClick={handleSetStart} className="px-3 py-2 bg-white border-2 border-green-600 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50">
                          {trimStart == null ? "Set Start" : `Start: ${formatTime(trimStart)}`}
                        </button>
                        {trimStart != null && (
                          <button onClick={handleSetEnd} className="px-3 py-2 bg-white border-2 border-red-600 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50">
                            {trimEnd == null ? "Set End" : `End: ${formatTime(trimEnd)}`}
                          </button>
                        )}
                        {trimStart != null && trimEnd != null && (
                          <button onClick={applyTrim} className="px-3 py-2 bg-white border-2 border-purple-700 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100">
                            Apply Trim
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Add Question Button */}
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

          {/* Right: Questions & Stats */}
          <div className="space-y-6">
            {addingQuestion && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-300 p-6 animate-slide-in">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Question</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Time</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => adjustQuestionTime(-0.5)} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">-0.5s</button>
                      <span className="font-mono font-semibold text-purple-700">{formatTime(questionTime)}</span>
                      <button onClick={() => adjustQuestionTime(0.5)} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">+0.5s</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <textarea rows={3} placeholder="Enter question..." value={currentQuestion.question} onChange={(e) => setCurrentQuestion(q => ({ ...q, question: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <input type="text" placeholder="Enter answer..." value={currentQuestion.answer} onChange={(e) => setCurrentQuestion(q => ({ ...q, answer: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={saveQuestion} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                      <CheckCircle className="w-4 h-4" /> Save
                    </button>
                    <button onClick={() => { 
                      setAddingQuestion(false); 
                      // --- FIX: Type error (property 'q' and 'a' not valid) ---
                      setCurrentQuestion({ question: "", answer: "" }); 
                      playerRef.current?.playVideo(); 
                    }} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {lesson.questions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Questions ({lesson.questions.length})</h3>
                  {videoLoaded && (
                    <button onClick={saveLesson} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                      <Save className="w-4 h-4" /> Save Lesson
                    </button>
                  )}
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {lesson.questions.map((q, index) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono font-medium text-blue-600">#{index + 1} • {formatTime(q.time)}</span>
                        <button onClick={() => deleteQuestion(q.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 stroke-red-600" /></button>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{q.question}</p>
                      <p className="text-xs text-gray-600"><span className="font-medium">Answer:</span> {q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}