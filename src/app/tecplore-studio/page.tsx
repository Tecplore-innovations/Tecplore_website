"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import PreLessonList from "./shared_resources/preLessonList";
import { useRouter } from "next/navigation";
import { Upload, FileJson, Music, ArrowRight, CheckCircle, X, RefreshCcw } from "lucide-react";

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

export default function HomePage() {
  const router = useRouter();

  // --- UI State for Classroom Section ---
  // modes: 'intro' = show text | 'upload_json' = show json input | 'upload_audio' = show audio input | 'ready' = show proceed button
  const [mode, setMode] = useState<"intro" | "upload_json" | "upload_audio" | "ready">("intro");
  
  // --- Data State ---
  const [fileName, setFileName] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [parsedLesson, setParsedLesson] = useState<Lesson | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  // --- Refs ---
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const data: Lesson = JSON.parse(ev.target?.result as string);
        setParsedLesson(data);
        
        // Check if audio is needed
        if (data.translatedAudio) {
            setMode("upload_audio");
        } else {
            setMode("ready");
        }
      } catch (error) {
        console.error("Error parsing lesson JSON:", error);
        alert("Invalid JSON file");
        resetUpload();
      }
    };
    reader.readAsText(file);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioFileName(file.name);
    setIsUploadingAudio(true);

    // Simulate a small processing delay for UX
    setTimeout(() => {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setIsUploadingAudio(false);
        setMode("ready");
    }, 800);
  };

  const resetUpload = () => {
    setMode("intro");
    setFileName(null);
    setAudioFileName(null);
    setParsedLesson(null);
    setAudioUrl(null);
    setIsUploadingAudio(false);
  };

  const handleProceed = () => {
    if (!parsedLesson) return;

    try {
        // 1. Save Lesson Data
        sessionStorage.setItem("tecplore_lesson_data", JSON.stringify(parsedLesson));
        
        // 2. Save Audio URL (if exists)
        // Note: Blob URLs persist in the browser session until the document is unloaded. 
        // Since we use router.push (client-side nav), this URL remains valid in the next page.
        if (audioUrl) {
            sessionStorage.setItem("tecplore_audio_url", audioUrl);
        } else {
            sessionStorage.removeItem("tecplore_audio_url");
        }
        
        // 3. Navigate
        router.push("/tecplore-studio/student");
    } catch (e) {
        console.error("Storage error", e);
        alert("Could not initialize lesson.");
    }
  };

  // --- Render Helpers ---

  // This renders the dynamic content inside the "Classroom Mode" card
  const renderClassroomContent = () => {
    switch (mode) {
        case "intro":
            return (
                <div className="animate-fade-in">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        Utilize the <b className="text-slate-700">Classroom Mode</b> to make every lesson more interactive and dramatically improve retention.
                    </p>
                    <button 
                        onClick={() => setMode("upload_json")}
                        className="inline-block border-2 border-gray-300 text-blue-700 px-7 py-2 rounded-full font-semi text-lg shadow-sm hover:border-blue-700 transition w-fit"
                    >
                        Start Teaching
                    </button>
                </div>
            );

        case "upload_json":
            return (
                <div className="animate-fade-in flex flex-col gap-4 bg-blue-50/50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
                    <div className="flex justify-between items-start">
                        <h3 className="text-blue-800 font-medium">Step 1: Upload Lesson</h3>
                       
                        <button onClick={resetUpload}><X className="w-5 h-5 text-gray-400 hover:text-red-500"/></button>
                    </div>
                    <div> 
                       <p> Dont you have a lesson file? create one using creator mode. </p>
                    </div>

                    <label className="flex flex-col items-center justify-center h-32 bg-white rounded-xl cursor-pointer hover:bg-blue-50 border border-blue-100 transition-all group shadow-sm">
                        <Upload className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm text-blue-600">Select .json File</span>
                        <input
                            ref={jsonInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleJsonUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            );

        case "upload_audio":
            return (
                <div className="animate-fade-in flex flex-col gap-4 bg-purple-50/50 p-6 rounded-2xl border-2 border-dashed border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                        <FileJson className="w-4 h-4 text-green-600"/>
                        <span className="text-xs text-green-700 font-medium truncate max-w-[200px]">{fileName}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-purple-800 font-medium">Step 2: Add Voiceover</h3>
                            <p className="text-xs text-purple-600 mt-1">This lesson requires translated audio.</p>
                        </div>
                        <button onClick={resetUpload}><X className="w-5 h-5 text-gray-400 hover:text-red-500"/></button>
                    </div>
                    
                    {isUploadingAudio ? (
                         <div className="flex items-center justify-center h-24 bg-white rounded-xl border border-purple-100">
                            <span className="text-sm text-purple-500 animate-pulse">Processing Audio...</span>
                         </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center h-24 bg-white rounded-xl cursor-pointer hover:bg-purple-50 border border-purple-100 transition-all group shadow-sm">
                            <Music className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-sm text-purple-600">Select Audio (.mp3/wav)</span>
                            <input
                                ref={audioInputRef}
                                type="file"
                                accept="audio/*"
                                onChange={handleAudioUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            );

        case "ready":
            return (
                <div className="animate-fade-in flex flex-col gap-4 p-4 rounded-2xl border border-green-200 bg-green-50/30">
                     <div className="flex justify-between items-start">
                        <h3 className="text-green-800 font-semibold text-lg">Ready to Teach!</h3>
                        <button onClick={resetUpload} title="Reset" className="p-1 hover:bg-gray-200 rounded-full"><RefreshCcw className="w-4 h-4 text-gray-500"/></button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="truncate">{fileName}</span>
                        </div>
                        {audioUrl && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-purple-500" />
                                <span className="truncate">{audioFileName}</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleProceed}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        Launch Classroom <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            );
    }
  };

  return (
    <div className="min-h-screen bg-whiter">
      {/* HERO */}
      <section className="pt-12 pb-8 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-4xl md:text-4xl font-semibold mb-6 text-purple-700/75">
          Tecplore Studio
        </h1>

        <p className="text-lg md:text-xl text-slate-700 mt-4 max-w-3xl mx-auto leading-relaxed">
          Transform YouTube videos into classroom learning experiences with
          interaction, questions, and learning checkpoints.
        </p>

        {/* WHY WE CREATED TECPLORE STUDIO */}
        <div className="mt-12 max-w-6xl mx-auto">
          <img
            src="/photos/studio_banner_info.avif"
            alt="Tecplore Studio Banner"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      <main className="max-w-6xl mx-auto py-10 px-4">
        
        {/* SECTION 1: CREATOR MODE (Standard Link) */}
        <section className="flex flex-col md:flex-row items-stretch mb-20">
            {/* Image Pane */}
            <div className="md:w-1/2 w-full flex-shrink-0 flex items-center justify-center relative">
              <div className="w-full h-80 md:h-96 clip-left bg-blue-100 overflow-hidden rounded-3xl shadow-lg relative">
                <img src="/photos/teacher.avif" alt="Creator Mode" className="w-full h-full object-cover object-center" draggable={false} />
                <span className="absolute top-4 left-4 bg-purple-500/75 text-white uppercase py-1 px-4 rounded-full shadow text-xs font-semibold tracking-wider">
                  Creator Mode
                </span>
              </div>
            </div>

            {/* Text Panel */}
            <div className="md:w-1/2 w-full flex flex-col justify-center p-8 text-clip-right">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Utilize the <b className="text-slate-700">Creator Mode</b> to make lesson out of youtube content.
                <br />Embed interactive elements like quizzes at precise points, and save the lesson.
              </p>
              <Link href="/tecplore-studio/teacher">
                <span className="inline-block border-2 border-gray-300 text-blue-700 px-7 py-2 rounded-full font-semi text-lg shadow-sm hover:border-blue-700 transition cursor-pointer">
                  Create Lesson
                </span>
              </Link>
            </div>
        </section>

        {/* SECTION 2: CLASSROOM MODE (Inline Interactive) */}
        <section className="flex flex-col md:flex-row-reverse items-stretch mb-20">
             {/* Image Pane */}
             <div className="md:w-1/2 w-full flex-shrink-0 flex items-center justify-center relative">
              <div className="w-full h-80 md:h-96 clip-right bg-blue-100 overflow-hidden rounded-3xl shadow-lg relative">
                <img src="/photos/student.avif" alt="Classroom Mode" className="w-full h-full object-cover object-center" draggable={false} />
                <span className="absolute top-4 right-4 bg-purple-500/75 text-white uppercase py-1 px-4 rounded-full shadow text-xs font-semibold tracking-wider">
                  Classroom Mode
                </span>
              </div>
            </div>

            {/* Interactive Panel - REPLACES TEXT ON CLICK */}
            <div className="md:w-1/2 w-full flex flex-col justify-center p-8 text-clip-left">
                {renderClassroomContent()}
            </div>
        </section>

      </main>

      {/* SHOW PRE-MADE LESSON CARDS */}
      <div className="mt-10 mb-5 max-w-6xl mx-auto px-4">
        <PreLessonList
          onSelect={(lesson) => {
            router.push(`/tecplore-studio/student?lesson=${lesson.id}`);
          }}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center px-2">
        <p className="text-gray-800 text-base sm:text-lg mb-4 leading-snug">
          Join educators transforming YouTube content into powerful classroom experiences
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-7">
          <span className="text-gray-500 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 whitespace-nowrap shrink">
            ✓ Trusted by educators worldwide
          </span>
          <span className="text-gray-500 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 whitespace-nowrap shrink">
            ✓ Classroom appropriate content
          </span>
          <span className="text-gray-500 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 whitespace-nowrap shrink">
            ✓ Time-saving lesson creation
          </span>
        </div>
      </footer>

      {/* CUSTOM CLIP-PATH STYLES */}
      <style jsx global>{`
        .clip-left { clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%); }
        .clip-right { clip-path: polygon(5% 0, 100% 0, 100% 100%, 15% 100%); }
        @media (min-width: 768px) {
          .text-clip-right {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%);
            border-top-right-radius: 24px; border-bottom-right-radius: 24px;
            border: 2px solid #a78bfa; border-left: none; background: white;
          }
          .text-clip-left {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%);
            border-top-left-radius: 24px; border-bottom-left-radius: 24px;
            border: 2px solid #a78bfa; border-right: none; background: white;
          }
        }
        @keyframes fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}