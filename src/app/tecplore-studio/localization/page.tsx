"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

// --- TYPES ---
type Clip = {
  id: string;
  trackIndex: number; // 1-4
  buffer: AudioBuffer; 
  startOffset: number; 
  audioOffset: number; 
  duration: number;    
  color: string;
};

type Gap = {
  trackIndex: number;
  start: number;
  duration: number;
};

// Fix: Defined specific interfaces for external libraries
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

interface WaveSurferInstance {
  play: () => void;
  pause: () => void;
  load: (url: string) => void;
  setTime: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  empty: () => void;
  on: (event: string, callback: () => void) => void;
  once: (event: string, callback: () => void) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    // Fix: Replaced 'any' with 'Record<string, unknown>'
    YT: { Player: new (id: string, config: Record<string, unknown>) => YTPlayer }; 
    onYouTubeIframeAPIReady: () => void;
    // Fix: Replaced 'any' with 'Record<string, unknown>'
    WaveSurfer: { create: (config: Record<string, unknown>) => WaveSurferInstance };
    webkitAudioContext: typeof AudioContext;
  }
}

// --- UTILS ---
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
};

const getRandomColor = () => {
  const hues = [250, 270, 290, 230, 310, 200];
  const hue = hues[Math.floor(Math.random() * hues.length)];
  return `hsl(${hue}, 70%, 85%)`;
};

// --- DRAWING HELPER ---
const drawWaveform = (buffer: AudioBuffer, canvas: HTMLCanvasElement, color: string, start: number, duration: number) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  const width = canvas.width;
  const height = canvas.height;
  const data = buffer.getChannelData(0);
  const sampleRate = buffer.sampleRate;
  
  const startIndex = Math.floor(start * sampleRate);
  const endIndex = Math.floor((start + duration) * sampleRate);
  const safeStart = Math.max(0, startIndex);
  const safeEnd = Math.min(data.length, endIndex);
  
  const segmentLength = safeEnd - safeStart;
  if (segmentLength <= 0) {
      ctx.clearRect(0, 0, width, height);
      return;
  }

  const step = Math.max(1, Math.ceil(segmentLength / width));
  const amp = height / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i < width; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      const idx = safeStart + (i * step) + j;
      if (idx < safeEnd) {
        const datum = data[idx];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
    }
    ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
  }
};

// --- COMPONENTS ---

const GapItem = ({ gap, pxPerSec }: { gap: Gap, pxPerSec: number }) => {
  return (
    <div 
      className="absolute top-1 bottom-1 bg-slate-100 border border-slate-200/50 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
      style={{
        left: `${gap.start * pxPerSec}px`,
        width: `${gap.duration * pxPerSec}px`,
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)`
      }}
    >
      {gap.duration > 2 && (
        <span className="text-[10px] text-slate-300 font-medium italic select-none">Empty</span>
      )}
    </div>
  );
};

const ClipItem = ({ 
  clip, 
  pxPerSec, 
  onMouseDown,
  onResizeStart,
  isSelected 
}: { 
  clip: Clip, 
  pxPerSec: number, 
  onMouseDown: (e: React.MouseEvent) => void,
  onResizeStart: (e: React.MouseEvent, edge: 'left' | 'right') => void,
  isSelected: boolean 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawWaveform(clip.buffer, canvasRef.current, "#6d28d9", clip.audioOffset, clip.duration);
    }
  }, [clip.buffer, clip.audioOffset, clip.duration, pxPerSec]);

  return (
    <div
      className={`absolute top-1 bottom-1 rounded-md cursor-grab active:cursor-grabbing select-none group border border-black/10 flex flex-col
        ${isSelected ? 'ring-2 ring-yellow-400 shadow-lg z-20' : 'shadow-sm hover:shadow-md z-10'}
      `}
      style={{
        left: `${clip.startOffset * pxPerSec}px`,
        width: `${Math.max(2, clip.duration * pxPerSec)}px`,
        backgroundColor: clip.color,
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex-1 relative overflow-hidden">
         <canvas 
           ref={canvasRef} 
           width={Math.max(1, clip.duration * pxPerSec)} 
           height={60} 
           className="w-full h-full opacity-60 pointer-events-none"
         />
         <div 
           className="absolute top-0 bottom-0 left-0 w-4 cursor-w-resize hover:bg-black/20 z-30 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity"
           onMouseDown={(e) => onResizeStart(e, 'left')}
         >
           <div className="h-4 w-0.5 bg-slate-600" />
         </div>
         <div 
           className="absolute top-0 bottom-0 right-0 w-4 cursor-e-resize hover:bg-black/20 z-30 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity"
           onMouseDown={(e) => onResizeStart(e, 'right')}
         >
           <div className="h-4 w-0.5 bg-slate-600" />
         </div>
      </div>
    </div>
  );
};

// --- FIX: WRAPPED YOUTUBE PLAYER TO PREVENT NODE REMOVAL ERROR ---
const NativeYouTubePlayer = React.memo(({ 
  videoId, 
  onReady,
  onStateChange,
  className 
}: { 
  videoId: string; 
  // Fix: Typed callbacks
  onReady: (player: YTPlayer) => void;
  onStateChange: (event: YTEvent) => void;
  className?: string;
}) => {
  // We use a ref for the container ID to ensure we don't lose track of it
  const divId = useRef(`yt-player-${Math.random().toString(36).substr(2, 9)}`);
  // Fix: Typed Ref
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!videoId) return;

    const initPlayer = () => {
      // If player exists, just load new video, don't destroy/recreate if not needed
      // But since we unmount on reset, destruction is handled in cleanup
      if (playerRef.current) return; 

      if (window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player(divId.current, {
            videoId: videoId,
            height: '100%',
            width: '100%',
            playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, showinfo: 0, disablekb: 1, fs: 0 },
            events: {
              // Fix: Typed Events
              onReady: (event: { target: YTPlayer }) => onReady(event.target),
              onStateChange: (event: YTEvent) => onStateChange(event)
            },
          });
        } catch(e) { console.error("YT Init error", e); }
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };
    } else { initPlayer(); }

    // Cleanup: Destroy player instance when component unmounts (e.g. on Reset)
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch { /* ignore */ } // Fix: Removed unused variable
        playerRef.current = null;
      }
    };
    // Fix: Added dependencies onReady and onStateChange
  }, [videoId, onReady, onStateChange]);

  // FIX: Extra wrapper div. 
  // React manages the outer div. YouTube replaces the inner div. 
  // When unmounting, React removes the outer div safely.
  return (
    <div className={className}>
      <div id={divId.current} className="w-full h-full" />
    </div>
  );
});
NativeYouTubePlayer.displayName = "NativeYouTubePlayer";


// --- MAIN COMPONENT ---
export default function NativeSync() {
  // --- STATE ---
  const [isMobile, setIsMobile] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [videoDuration, setVideoDuration] = useState(60); 
  const [currentTime, setCurrentTime] = useState(0);
  
  // Editor State
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [pxPerSec, setPxPerSec] = useState(50); 
  const [masterBlobUrl, setMasterBlobUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  // Export State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStep, setExportStep] = useState<'input' | 'success'>('input');
  const [exportName, setExportName] = useState("my-mix");

  // Refs
  const clipsRef = useRef(clips); 
  // Fix: Typed Refs
  const youtubePlayer = useRef<YTPlayer | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const masterPlayerRef = useRef<WaveSurferInstance | null>(null);
  const masterContainerRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const tracksContainerRef = useRef<HTMLDivElement>(null);

  // Drag State
  const dragRef = useRef<{ 
    isDragging: boolean;
    mode: 'move' | 'resize-left' | 'resize-right'; 
    clipId: string | null; 
    startX: number; 
    originalStartOffset: number;
    originalAudioOffset: number;
    originalDuration: number;
  }>({ 
    isDragging: false, 
    mode: 'move',
    clipId: null, 
    startX: 0, 
    originalStartOffset: 0,
    originalAudioOffset: 0,
    originalDuration: 0
  });

  // Sync Ref
  useEffect(() => { clipsRef.current = clips; }, [clips]);

  // Mobile Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fix: Move renderMasterMix UP before it is used in useEffect
  // Fix: Wrapped in useCallback for dependency stability
  const renderMasterMix = useCallback(async (currentClips: Clip[]) => {
    if (currentClips.length === 0 || !audioContext.current) return;
    
    // Stop playback before rendering to avoid "ghosting" old buffer
    setIsPlaying(false);
    if (youtubePlayer.current) youtubePlayer.current.pauseVideo();
    if (masterPlayerRef.current) masterPlayerRef.current.pause();

    setIsRendering(true);

    const audioEnd = currentClips.reduce((max, c) => Math.max(max, c.startOffset + c.duration), 0);
    const totalDuration = Math.max(videoDuration, audioEnd, 1);
    
    const offlineCtx = new OfflineAudioContext(2, Math.ceil(totalDuration * 44100), 44100);
    
    currentClips.forEach(clip => {
      const src = offlineCtx.createBufferSource();
      src.buffer = clip.buffer;
      src.connect(offlineCtx.destination);
      src.start(clip.startOffset, clip.audioOffset, clip.duration);
    });

    const renderedBuffer = await offlineCtx.startRendering();
    const wavBlob = await audioBufferToWav(renderedBuffer);
    const url = URL.createObjectURL(wavBlob);
    
    if (masterBlobUrl) URL.revokeObjectURL(masterBlobUrl);
    setMasterBlobUrl(url);

    if (masterPlayerRef.current) {
       // We use the ref for currentTime to get the very latest value without adding it to deps
       // But since we want to be safe, we can just use 0 or the last known state
       masterPlayerRef.current.load(url);
       masterPlayerRef.current.once('ready', () => {
          // Ensure playhead is exactly where visual needle is
          if (masterPlayerRef.current) {
             // masterPlayerRef.current.setTime(currentTime); // Optional: sync time
             setIsRendering(false);
          }
       });
    } else {
      setIsRendering(false);
    }
  }, [videoDuration, masterBlobUrl]); // Added dependencies

  // --- INIT ---
  useEffect(() => {
    const init = async () => {
      await loadScript("https://unpkg.com/wavesurfer.js@7.8.6/dist/wavesurfer.min.js");
      if (masterContainerRef.current && !masterPlayerRef.current && window.WaveSurfer) {
        masterPlayerRef.current = window.WaveSurfer.create({
          container: masterContainerRef.current,
          height: 0,
          waveColor: 'transparent',
          progressColor: 'transparent',
          interact: false, 
          backend: 'WebAudio',
        });
        masterPlayerRef.current.on('finish', () => {
           setIsPlaying(false);
           if(youtubePlayer.current) youtubePlayer.current.pauseVideo();
        });
      }
      if (!audioContext.current) {
         audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };
    init();
    
    // GLOBAL HANDLERS
    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
         dragRef.current.isDragging = false;
         dragRef.current.clipId = null;
         // Re-render on drop to fix audio glitches
         renderMasterMix(clipsRef.current); 
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging || !dragRef.current.clipId) return;
      
      // Pausing interaction to prevent ghost audio
      if (isPlaying) {
        setIsPlaying(false);
        youtubePlayer.current?.pauseVideo();
        masterPlayerRef.current?.pause();
      }
      
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaSec = deltaX / pxPerSec;
      
      let targetTrackIndex = -1;
      if (dragRef.current.mode === 'move' && tracksContainerRef.current) {
          const containerRect = tracksContainerRef.current.getBoundingClientRect();
          const relativeY = e.clientY - containerRect.top;
          if (relativeY > 72) { // Header + Video Track offset
             targetTrackIndex = Math.ceil((relativeY - 72) / 64);
             targetTrackIndex = Math.max(1, Math.min(4, targetTrackIndex));
          }
      }

      const nextClips = clipsRef.current.map(c => {
        if (c.id === dragRef.current.clipId) {
           const updated = { ...c };
           if (dragRef.current.mode === 'move') {
              updated.startOffset = Math.max(0, dragRef.current.originalStartOffset + deltaSec);
              if (targetTrackIndex !== -1) updated.trackIndex = targetTrackIndex;
           } 
           else if (dragRef.current.mode === 'resize-right') {
              const maxDur = c.buffer.duration - c.audioOffset;
              updated.duration = Math.max(0.1, Math.min(maxDur, dragRef.current.originalDuration + deltaSec));
           } 
           else if (dragRef.current.mode === 'resize-left') {
              let shift = deltaSec;
              if (dragRef.current.originalStartOffset + shift < 0) shift = -dragRef.current.originalStartOffset;
              if (dragRef.current.originalAudioOffset + shift < 0) shift = -dragRef.current.originalAudioOffset;
              if (dragRef.current.originalDuration - shift < 0.1) shift = dragRef.current.originalDuration - 0.1;

              updated.startOffset = dragRef.current.originalStartOffset + shift;
              updated.audioOffset = dragRef.current.originalAudioOffset + shift;
              updated.duration = dragRef.current.originalDuration - shift;
           }
           return updated;
        }
        return c;
      });

      setClips(nextClips);
      clipsRef.current = nextClips; 
    };

    const handleKeyDown = (e: KeyboardEvent) => {
       if ((e.target as HTMLElement).tagName === 'INPUT') return;
       switch(e.key.toLowerCase()) {
          case ' ':
             e.preventDefault();
             document.getElementById('main-play-btn')?.click();
             break;
          case 's':
             e.preventDefault();
             document.getElementById('btn-split')?.click();
             break;
          case 'd':
          case 'delete':
          case 'backspace':
             e.preventDefault();
             document.getElementById('btn-delete')?.click();
             break;
       }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
       window.removeEventListener('mouseup', handleMouseUp);
       window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('keydown', handleKeyDown);
    };
    // Fix: Added renderMasterMix to dependencies
  }, [pxPerSec, isPlaying, renderMasterMix]); 

  // --- SYNC LOOP ---
  useEffect(() => {
    const timer = setInterval(() => {
       if (isPlaying) {
          if (audioContext.current?.state === 'suspended') audioContext.current.resume();
          
          let newTime = currentTime;
          if (masterPlayerRef.current && masterPlayerRef.current.getDuration() > 0) {
             newTime = masterPlayerRef.current.getCurrentTime();
             const ytTime = youtubePlayer.current?.getCurrentTime() || 0;
             if (Math.abs(ytTime - newTime) > 0.4) {
                youtubePlayer.current?.seekTo(newTime, true);
             }
          } else if (youtubePlayer.current) {
             newTime = youtubePlayer.current.getCurrentTime();
          }
          setCurrentTime(newTime);
       } else {
          if (youtubePlayer.current) {
             const t = youtubePlayer.current.getCurrentTime();
             if (Math.abs(t - currentTime) > 0.5) setCurrentTime(t);
          }
       }
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying, currentTime]);

  // --- LOGIC ---
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !audioContext.current) return;
    if (audioContext.current.state === 'suspended') await audioContext.current.resume();

    setIsEditing(true);
    const arrayBuffer = await f.arrayBuffer();
    const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);

    let targetTrack = 1;
    const used = new Set(clips.map(c => c.trackIndex));
    for(let i=1; i<=4; i++) { if(!used.has(i)) { targetTrack=i; break; } }
    if(targetTrack>4) targetTrack=4;

    const newClip: Clip = {
      id: Math.random().toString(36).substr(2, 9),
      trackIndex: targetTrack,
      buffer: audioBuffer,
      startOffset: 0,
      audioOffset: 0,
      duration: audioBuffer.duration,
      color: getRandomColor(),
    };

    setClips(prev => {
       const next = [...prev, newClip];
       requestAnimationFrame(() => renderMasterMix(next));
       return next;
    });
  };

  const splitClipAtPlayhead = () => {
    if (!selectedClipId) { alert("Select a clip first."); return; }
    const original = clips.find(c => c.id === selectedClipId);
    if (!original) return;

    if (currentTime <= original.startOffset + 0.1 || currentTime >= original.startOffset + original.duration - 0.1) {
       alert("Playhead not inside selected clip range");
       return;
    }

    const splitRel = currentTime - original.startOffset;
    const clipA: Clip = { ...original, duration: splitRel };
    const clipB: Clip = { 
       ...original, 
       id: Math.random().toString(36).substr(2,9),
       startOffset: currentTime,
       audioOffset: original.audioOffset + splitRel,
       duration: original.duration - splitRel,
       color: getRandomColor()
    };

    const nextClips = clips.filter(c => c.id !== selectedClipId).concat([clipA, clipB]);
    setClips(nextClips);
    clipsRef.current = nextClips; 
    setSelectedClipId(clipB.id);
    renderMasterMix(nextClips);
  };

  const deleteSelectedClip = () => {
     if(!selectedClipId) return;
     const nextClips = clips.filter(c => c.id !== selectedClipId);
     setClips(nextClips);
     clipsRef.current = nextClips;
     setSelectedClipId(null);
     renderMasterMix(nextClips);
  };

  // --- RESET HANDLER ---
  const resetEditor = () => {
    // Stop players
    setIsPlaying(false);
    if (youtubePlayer.current) {
      try { youtubePlayer.current.pauseVideo(); } catch {}
    }
    if (masterPlayerRef.current) {
      masterPlayerRef.current.pause();
      masterPlayerRef.current.empty(); // Clear waveform
    }

    // Clear state
    setClips([]);
    setVideoId(""); // This triggers NativeYouTubePlayer unmount
    setYoutubeUrl("");
    setIsEditing(false);
    setShowExportModal(false);
    setExportStep('input');
    setCurrentTime(0);
    setMasterBlobUrl(null);
    setSelectedClipId(null);
  };

  // --- CONTROLS ---
  const canPlay = videoId && clips.length > 0 && !isRendering;

  const togglePlayback = async () => {
    if (!canPlay) return;
    if (audioContext.current?.state === 'suspended') await audioContext.current.resume();

    if (isPlaying) {
      if (youtubePlayer.current) youtubePlayer.current.pauseVideo();
      if (masterPlayerRef.current) masterPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      if (youtubePlayer.current) {
         youtubePlayer.current.mute(); 
         youtubePlayer.current.playVideo();
      }
      if (masterPlayerRef.current) masterPlayerRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const seekRelative = (sec: number) => {
      const t = Math.max(0, currentTime + sec);
      setCurrentTime(t);
      youtubePlayer.current?.seekTo(t, true);
      masterPlayerRef.current?.setTime(t);
  };

  // --- EXPORT FLOW ---
  const handleExportClick = () => {
    setExportStep('input');
    setShowExportModal(true);
  };

  const executeDownload = () => {
    if (!masterBlobUrl) return;
    const a = document.createElement('a');
    a.href = masterBlobUrl;
    a.download = `${exportName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.wav`;
    a.click();
    setExportStep('success');
  };

  // --- VISUALS ---
  const gaps = useMemo(() => {
      const result: Gap[] = [];
      for (let track = 1; track <= 4; track++) {
         const trackClips = clips.filter(c => c.trackIndex === track).sort((a,b) => a.startOffset - b.startOffset);
         let lastEnd = 0;
         trackClips.forEach(clip => {
            if (clip.startOffset > lastEnd) {
               result.push({ trackIndex: track, start: lastEnd, duration: clip.startOffset - lastEnd });
            }
            lastEnd = clip.startOffset + clip.duration;
         });
         if (lastEnd < videoDuration) {
            result.push({ trackIndex: track, start: lastEnd, duration: videoDuration - lastEnd });
         }
      }
      return result;
  }, [clips, videoDuration]);

  const renderRuler = useMemo(() => {
      const duration = Math.max(videoDuration, 300);
      const step = 5;
      return Array.from({ length: Math.ceil(duration / step) + 5 }).map((_, i) => (
        <div key={i} className="absolute top-0 bottom-0 border-l border-slate-200 text-[10px] pl-1 text-slate-400 pointer-events-none" 
             style={{ left: i * step * pxPerSec }}>
           {i * step}s
        </div>
      ));
  }, [videoDuration, pxPerSec]);

  // Fix: useCallback for YouTube Handlers to maintain stability for child useEffect
  const onPlayerReady = useCallback((p: YTPlayer) => { 
    youtubePlayer.current = p; 
    setVideoDuration(p.getDuration()); 
  }, []);

  const onPlayerStateChange = useCallback((e: YTEvent) => {
    if(e.data === 1) setIsPlaying(true);
    if(e.data === 2) setIsPlaying(false);
 }, []);

 if (isMobile) {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
  <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl text-center p-8 max-w-md">
    <div className="text-7xl mb-6">🖥️</div>
    <h1 className="text-2xl font-bold text-white mb-2">Desktop Required</h1>
    <p className="text-slate-300 leading-relaxed">
      NativeSync is a precision audio mixing tool.<br />
      Please open on a <span className="text-violet-300 font-semibold">desktop</span> or 
      <span className="text-violet-300 font-semibold"> tablet</span> for the best editing experience.
    </p>
  </div>
</div>

  );
}


  return (
    <div className="h-screen w-full bg-slate-50 font-sans text-slate-900 flex flex-col overflow-hidden select-none">
      
      {/* HEADER */}
      <header className="bg-white border-b px-4 py-3 shadow-sm flex justify-between items-center z-20 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl bg-slate-100 p-1 rounded">🎙️</span>
          <h1 className="text-lg font-bold text-slate-700 tracking-tight">NativeSync</h1>
        </div>
        <button 
             onClick={handleExportClick}
             disabled={!masterBlobUrl}
             className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50 transition-all shadow-sm flex items-center gap-2"
        >
             <span>Export Mix</span>
             <span>⬇</span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-0">
         <div className="flex-1 bg-slate-100 p-4 flex flex-col items-center justify-center overflow-y-auto">
             
             {/* VIDEO PLAYER CONTAINER */}
             <div className="w-full max-w-3xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden relative mb-6 ring-1 ring-slate-900/10 group">
                {videoId ? (
                   <div className="relative w-full h-full">
                     <NativeYouTubePlayer 
                       videoId={videoId} 
                       className="w-full h-full"
                       onReady={onPlayerReady}
                       onStateChange={onPlayerStateChange}
                     />
                     {/* Transparent Overlay to prevent direct YouTube Interaction */}
                     <div 
                        className="absolute inset-0 z-10 bg-transparent cursor-default"
                        onClick={(e) => {
                          e.preventDefault();
                          // Optional: Blink the play button to hint user where controls are
                          const btn = document.getElementById('main-play-btn');
                          btn?.classList.add('ring-4');
                          setTimeout(() => btn?.classList.remove('ring-4'), 200);
                        }}
                     />
                   </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/30 bg-slate-900">
                    <div className="text-5xl mb-4 opacity-50">📺</div>
                    <div className="font-light text-lg">Paste a YouTube URL to begin</div>
                  </div>
                )}
             </div>

             {/* SETUP INPUTS */}
             {!isEditing && (
               <div className="w-full max-w-lg space-y-4 z-10 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Source Video</label>
                    <input 
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" 
                      placeholder="Paste YouTube Link (e.g. youtube.com/watch?v=...)" 
                      value={youtubeUrl} 
                      onChange={(e) => {
                        setYoutubeUrl(e.target.value);
                        const match = e.target.value.match(/[?&]v=([^&]+)/);
                        if(match) setVideoId(match[1]);
                        else if(e.target.value.includes('youtu.be/')) setVideoId(e.target.value.split('youtu.be/')[1]);
                      }} 
                    />
                  </div>
                  
                  <div className={`space-y-1 transition-opacity duration-300 ${!videoId ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Native Audio</label>
                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-purple-200 bg-purple-50/50 text-purple-600 rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition-all">
                      <span className="font-medium">Click to Upload Audio File</span>
                      <span className="text-xs opacity-70 mt-1">MP3, WAV, AAC supported</span>
                      <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                    </label>
                  </div>
               </div>
             )}

             {/* TRANSPORT CONTROLS */}
             <div className="flex gap-6 mt-2 items-center bg-white px-8 py-3 rounded-2xl shadow-sm border border-slate-200">
                <button onClick={() => seekRelative(-1000)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors" title="Start">⏮</button>
                <button onClick={() => seekRelative(-5)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors" title="-5s">⏪</button>
                
                <button 
                   id="main-play-btn"
                   onClick={togglePlayback} 
                   disabled={!canPlay}
                   className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all text-3xl
                     ${canPlay ? 'bg-purple-600 text-white ring-purple-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                   `}
                >
                   {isRendering ? (
                     <span className="text-sm font-bold animate-pulse">SYNC</span>
                   ) : (
                     isPlaying ? "⏸" : "▶"
                   )}
                </button>
                
                <button onClick={() => seekRelative(5)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors" title="+5s">⏩</button>
                <button onClick={() => seekRelative(1000)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors" title="End">⏭</button>
             </div>
             <div className="mt-3 text-sm font-mono text-slate-400 font-medium">
                {new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(videoDuration * 1000).toISOString().substr(14, 5)}
             </div>
         </div>
      </div>

      {/* TIMELINE EDITOR */}
      {isEditing && (
        <div className="h-[340px] bg-white border-t flex flex-col z-30 shadow-[0_-5px_30px_rgba(0,0,0,0.08)] flex-shrink-0 relative">
            
            {/* Toolbar */}
            <div className="h-12 border-b bg-slate-50 flex items-center px-4 justify-between text-xs">
                <div className="flex gap-3">
                   <div className="flex bg-white rounded-lg border p-1 shadow-sm">
                     <button id="btn-split" onClick={splitClipAtPlayhead} className="px-3 py-1 hover:bg-orange-50 rounded text-slate-700 font-medium flex items-center gap-2" title="Shortcut: S">
                       <span>✂️</span> Split
                     </button>
                     <div className="w-[1px] bg-slate-200 mx-1"></div>
                     <button id="btn-delete" onClick={deleteSelectedClip} className="px-3 py-1 hover:bg-red-50 rounded text-slate-700 font-medium flex items-center gap-2" title="Shortcut: Del">
                       <span>🗑</span> Delete
                     </button>
                   </div>
                   <label className="px-3 py-1 bg-white border rounded-lg hover:bg-blue-50 shadow-sm cursor-pointer flex items-center gap-2 text-blue-600 font-medium">
                      <span>+ Add Track</span>
                      <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                   </label>
                </div>
                <div className="text-slate-400 flex gap-4 items-center font-medium">
                   {isRendering && <span className="text-purple-500 flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"/> Syncing Audio Engine...</span>}
                   <span>Ctrl + Scroll to Zoom</span>
                </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 flex overflow-hidden" onWheel={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? 0.9 : 1.1;
                  setPxPerSec(prev => Math.min(Math.max(prev * delta, 10), 300));
                }
            }}>
               {/* Track Headers */}
               <div className="w-12 border-r bg-slate-50 flex-shrink-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                  <div className="h-8 border-b bg-slate-100"></div>
                  <div className="h-14 border-b bg-slate-50 flex items-center justify-center border-l-4 border-l-blue-400"><span className="text-lg grayscale opacity-70">📺</span></div>
                  {[1, 2, 3, 4].map(id => <div key={id} className="h-16 border-b bg-white flex items-center justify-center text-xs font-bold text-slate-300">{id}</div>)}
               </div>

               {/* Timeline Tracks */}
               <div ref={tracksContainerRef} className="flex-1 relative overflow-hidden flex">
                   <div 
                     ref={timelineScrollRef}
                     className="flex-1 overflow-x-auto overflow-y-hidden relative bg-white custom-scrollbar"
                     onClick={(e) => {
                        if ((e.target as HTMLElement).closest('.group')) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left + e.currentTarget.scrollLeft;
                        const t = Math.max(0, clickX / pxPerSec);
                        setCurrentTime(t);
                        youtubePlayer.current?.seekTo(t, true);
                        masterPlayerRef.current?.setTime(t);
                     }}
                   >
                      <div className="relative h-full" style={{ width: Math.max(videoDuration * pxPerSec, 2000) }}>
                         {/* Ruler */}
                         <div className="h-8 border-b relative bg-slate-50/50">{renderRuler}</div>

                         {/* Video Track */}
                         <div className="h-14 border-b relative bg-slate-50/30 group">
                            <div className="absolute top-2 h-10 bg-blue-50 border border-blue-200 rounded flex items-center overflow-hidden opacity-80"
                                 style={{ width: videoDuration * pxPerSec, left: 0 }}>
                               <div className="w-full h-full opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 40px, #000 41px)' }}></div>
                               <span className="ml-2 text-xs text-blue-400 font-medium sticky left-2">Video Source</span>
                            </div>
                         </div>

                         {/* Audio Tracks 1-4 */}
                         {[1, 2, 3, 4].map(trackId => (
                            <div key={trackId} className="h-16 border-b relative hover:bg-slate-50/50 transition-colors">
                               {gaps.filter(g => g.trackIndex === trackId).map((gap, i) => (
                                  <GapItem key={`gap-${i}`} gap={gap} pxPerSec={pxPerSec} />
                               ))}
                               {clips.filter(c => c.trackIndex === trackId).map(clip => (
                                  <ClipItem 
                                    key={clip.id}
                                    clip={clip}
                                    pxPerSec={pxPerSec}
                                    isSelected={selectedClipId === clip.id}
                                    onMouseDown={(e) => {
                                       e.stopPropagation();
                                       setSelectedClipId(clip.id);
                                       dragRef.current = {
                                          isDragging: true, mode: 'move', clipId: clip.id,
                                          startX: e.clientX, originalStartOffset: clip.startOffset,
                                          originalAudioOffset: clip.audioOffset, originalDuration: clip.duration
                                       };
                                    }}
                                    onResizeStart={(e, edge) => {
                                       e.stopPropagation();
                                       setSelectedClipId(clip.id);
                                       dragRef.current = {
                                          isDragging: true, mode: edge === 'left' ? 'resize-left' : 'resize-right', clipId: clip.id,
                                          startX: e.clientX, originalStartOffset: clip.startOffset,
                                          originalAudioOffset: clip.audioOffset, originalDuration: clip.duration
                                       };
                                    }}
                                  />
                               ))}
                            </div>
                         ))}

                         {/* Playhead */}
                         <div 
                            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-40 pointer-events-none shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                            style={{ transform: `translateX(${currentTime * pxPerSec}px)` }}
                         >
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500 -ml-[5px]" />
                         </div>
                      </div>
                   </div>
               </div>
            </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-96 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
                 <h3 className="font-bold text-lg">Export Audio Mix</h3>
                 <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              
              <div className="p-6">
                 {exportStep === 'input' ? (
                    <>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Filename</label>
                      <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 mb-6">
                         <input 
                           type="text" 
                           value={exportName} 
                           onChange={(e) => setExportName(e.target.value)}
                           className="flex-1 p-2 outline-none text-slate-700"
                           autoFocus
                         />
                         <span className="bg-slate-100 px-3 py-2 text-slate-500 border-l text-sm">.wav</span>
                      </div>
                      <button 
                        onClick={executeDownload}
                        className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                      >
                        Download File
                      </button>
                    </>
                 ) : (
                    <div className="text-center py-2">
                       <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                       <h4 className="text-xl font-bold text-slate-800 mb-2">Export Successful!</h4>
                       <p className="text-slate-500 text-sm mb-6">Your audio mix has been saved.</p>
                       
                       <div className="flex flex-col gap-2">
                          <button onClick={() => setShowExportModal(false)} className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50">
                             Continue Editing
                          </button>
                          <button onClick={resetEditor} className="w-full text-slate-400 py-2 text-sm hover:text-red-500">
                             Start Over (Reset)
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}
      
      <div ref={masterContainerRef} className="hidden" />
    </div>
  );
}

// --- HELPERS ---
function audioBufferToWav(buffer: AudioBuffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  let result;
  if (numChannels === 2) {
      result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
      result = buffer.getChannelData(0);
  }
  return encodeWAV(result, numChannels, sampleRate);
}

function interleave(inputL: Float32Array, inputR: Float32Array) {
  const length = inputL.length + inputR.length;
  const result = new Float32Array(length);
  let index = 0;
  let inputIndex = 0;
  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function encodeWAV(samples: Float32Array, numChannels: number, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  floatTo16BitPCM(view, 44, samples);
  return new Blob([view], { type: 'audio/wav' });
}

function floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}