"use client";

import { PRE_LESSONS, PreLesson } from "@/app/tecplore-studio/shared_resources/pre_lessons";
import { Music, Lock, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  onSelect: (preLesson: PreLesson) => void;
  loading?: boolean;
}

export default function PreLessonList({ onSelect, loading }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ------------ Mouse Drag Scroll ------------
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  // ------------ Show/Hide Arrows ------------
  const checkForScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 10);
  };

  useEffect(() => {
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => window.removeEventListener("resize", checkForScroll);
  }, []);

  // ------------ Scroll with Arrow Click ------------
  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="mt-8 w-full max-w-6xl px-2 sm:px-4 relative">
      <h3 className="font-semibold text-lg mb-8 text-blue-800 text-center">
        Start with a Ready-Made Lesson
      </h3>

      {/* Arrow Left */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-1 hover:bg-blue-50"
        >
          <ChevronLeft className="text-blue-600 w-6 h-6" />
        </button>
      )}

      {/* Scroll/Drag Container */}
            <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDrag}
            onMouseUp={stopDrag}
            onScroll={checkForScroll}
            >

        {PRE_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className={`relative flex-none w-56 bg-white rounded-2xl overflow-hidden shadow-md border transition cursor-pointer select-none
              ${selected === lesson.id ? "border-blue-500 shadow-lg" : "border-gray-200"}
              hover:shadow-lg`}
           
              onClick={() => {
                if (isDragging.current) return;
                setSelected(lesson.id);
              }}
          >
            {lesson.isTranslated && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1 shadow-md">
                <Music className="w-3 h-3" /> Translated
              </div>
            )}

            <div className="w-full aspect-[4/3]">
              <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover"
              draggable={false}
               onDragStart={(e) => e.preventDefault()} />
            </div>

            <div className="p-3 flex flex-col h-[150px]">
              <h4 className="font-semibold text-base mb-2 leading-tight line-clamp-2">
                {lesson.title}
              </h4>
              <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-3">
                {lesson.description}
              </p>

              {lesson.isLocked && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              )}

              <button
               className={`w-full px-3 py-2 rounded transition font-medium text-sm mt-auto
                ${selected === lesson.id 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"}
                disabled:opacity-50 disabled:cursor-not-allowed`}
                
              disabled={loading || lesson.isLocked || selected !== lesson.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!lesson.isLocked && selected === lesson.id) {
                    onSelect(lesson);
                  }
                }}
              >
                {lesson.isLocked ? "Locked" : loading && selected === lesson.id ? "Loading..." : "Start Lesson"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Right */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-1 hover:bg-blue-50"
        >
          <ChevronRight className="text-blue-600 w-6 h-6" />
        </button>
      )}
    </div>
  );
}
