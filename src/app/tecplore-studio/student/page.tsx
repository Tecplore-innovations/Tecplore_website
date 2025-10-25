"use client";

import React, { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Upload, CheckCircle, Video } from "lucide-react"; // Using lucide-react for modern icons

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
  trimStart: number;
  trimEnd?: number;
  questions: Question[];
};

// --- Main Component ---
export default function StudentPage() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lessonEnded, setLessonEnded] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [triggeredQuestions, setTriggeredQuestions] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const data: Lesson = JSON.parse(ev.target?.result as string);
        setLesson(data);
        setCurrentQuestionIndex(null);
        setShowAnswer(false);
        setLessonEnded(false);
        setSummaryVisible(false);
        setAnsweredQuestions(new Set());
        setTriggeredQuestions(new Set());
        setIsPaused(false);
      } catch (error) {
        console.error("Error parsing lesson JSON:", error);
        alert("Invalid Lesson JSON file.");
        setFileName(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    const startTime = lesson?.trimStart ?? 0;
    playerRef.current?.seekTo(startTime, true);
    playerRef.current?.playVideo();

    setTimeout(() => {
      startInterval();
    }, 500);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setCurrentQuestionIndex(null);
      setLessonEnded(true);
      setIsPaused(false);
    } else if (event.data === YT.PlayerState.PAUSED) {
      setIsPaused(true);
    } else if (event.data === YT.PlayerState.PLAYING) {
      setIsPaused(false);
    }
  };

  const startInterval = () => {
    if (!lesson || !playerRef.current) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    intervalRef.current = setInterval(checkVideoTime, 200);
  };

  const checkVideoTime = () => {
    if (!lesson || !playerRef.current) return;

    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    const endTime = lesson.trimEnd ?? duration;

    if (duration && lesson.trimEnd && currentTime >= endTime - 0.5) {
      playerRef.current.pauseVideo();
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setLessonEnded(true);
      setCurrentQuestionIndex(null);
      return;
    }

    for (let i = 0; i < lesson.questions.length; i++) {
      if (
        !answeredQuestions.has(i) &&
        !triggeredQuestions.has(i) &&
        currentTime >= lesson.questions[i].time
      ) {
        playerRef.current.pauseVideo();
        setCurrentQuestionIndex(i);
        setShowAnswer(false);
        setTriggeredQuestions((prev) => new Set(prev).add(i));
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
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
    startInterval();
  };

  const viewSummary = () => {
    setLessonEnded(false);
    setSummaryVisible(true);
  };

  const completeLesson = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setLesson(null);
    setFileName(null);
    setLessonEnded(false);
    setSummaryVisible(false);
    setCurrentQuestionIndex(null);
    setShowAnswer(false);
    setAnsweredQuestions(new Set());
    setTriggeredQuestions(new Set());
    playerRef.current = null;
    setIsPaused(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);

  // --- Render Components ---

  const renderFileUploader = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-lg max-w-xl w-full transition duration-300 hover:border-blue-500">
        <h2 className="font-extrabold text-3xl mb-4 text-gray-800">Student Module</h2>
        <p className="text-gray-600 mb-6">Start by loading a lesson file.</p>

        <label
          htmlFor="lesson-upload"
          className="flex flex-col items-center justify-center p-6 border-2 border-blue-100 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
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

        {fileName && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Loaded: {fileName}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderLessonSummary = () => (
    <div className="p-8 border rounded-xl max-w-4xl mx-auto bg-white shadow-xl flex flex-col gap-6">
      <h2 className="font-bold text-3xl text-gray-800 border-b pb-3 flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-600" />
          Lesson Summary
        </div>
        <span className="text-blue-600 text-2xl font-semibold mt-1">{lesson?.title}</span>
      </h2>

      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-4">
        {lesson?.questions.map((q, i) => (
          <div
            key={q.id}
            className={`border-l-4 p-4 rounded-r-lg shadow-sm ${
              answeredQuestions.has(i)
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <p className="font-semibold text-lg text-gray-800 mb-1">
              Q{i + 1} ({q.time.toFixed(2)}s): {q.question}
            </p>
            <p className="text-gray-600 ml-2 border-l pl-3">
              <span className="font-medium text-gray-700">Answer:</span> {q.answer}
            </p>
          </div>
        ))}
      </div>

      <button
        className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition shadow-md self-end"
        onClick={completeLesson}
      >
        Return Home
      </button>
    </div>
  );

  const renderQuestionModal = () => {
    if (currentQuestionIndex === null || !lesson || !lesson.questions[currentQuestionIndex])
      return null;

    const questionData = lesson.questions[currentQuestionIndex];

    return (
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col justify-center items-center p-6 z-20">
        <div className="bg-white rounded-xl p-8 max-w-xl w-full shadow-2xl flex flex-col gap-5 transform scale-100 transition-transform duration-300 relative z-30 border-t-4 border-blue-600">
          <h3 className="font-bold text-2xl text-blue-600">Pop-up Question 🧠</h3>
          <p className="text-gray-800 text-lg border-b pb-3">{questionData.question}</p>

          {!showAnswer ? (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md self-start"
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
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md self-start"
                onClick={okAnswer}
              >
                Continue lesson 📖
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLessonCompletedScreen = () => (
    <div className="absolute inset-0 bg-black/95 flex flex-col justify-center items-center p-6 z-20">
      <div className="text-white text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
        <h3 className="font-extrabold text-4xl mb-6">Lesson Completed!</h3>
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg text-lg"
          onClick={viewSummary}
        >
          View Summary
        </button>
      </div>
    </div>
  );

  const renderVideoPlayer = () => (
    <div className="relative flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black relative">
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

        {isPaused && currentQuestionIndex === null && !lessonEnded && (
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-75">Paused</span>
          </div>
        )}

        {lessonEnded && renderLessonCompletedScreen()}
        {renderQuestionModal()}
      </div>
      <h1 className="text-2xl font-bold text-gray-800">{lesson?.title}</h1>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
      {!lesson && !summaryVisible && (
        <div className="min-h-[80vh] flex items-center justify-center">{renderFileUploader()}</div>
      )}

      {lesson && !summaryVisible && renderVideoPlayer()}

      {summaryVisible && lesson && renderLessonSummary()}
    </div>
  );
}
