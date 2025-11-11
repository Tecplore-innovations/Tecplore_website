"use client";

import Link from "next/link";

const sections = [
  {
      
    desc: (
      <>      
      Utilize the <b className="text-slate-700">Creator Studio</b> to load a youtube video,
      embed interactive elements like quizzes at precise points, and save the lesson as a JSON file.
      </>
    ),
    button: "Create Lesson",
    href: "/tecplore-studio/teacher",
    banner: "Creator Studio",
    img: "/photos/teacher.avif",
    imageLeft: true,
  },
  {
   
    desc: (
      <>
      Load the JSON file in <b className="text-slate-700">Classroom Mode</b>, the video auto-plays, pauses for questions, and resumes after responses and gives an summary at end.
      </>
    ),
    button: "Start Teaching",
    href: "/tecplore-studio/student",
    banner: "Classroom Mode",
    img: "/photos/student.avif",
    imageLeft: false,
  },
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* HERO */}
      <section className="pt-12 pb-8 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-5xl md:text-5xl font-black text-slate-700 leading-tig   mb-4 ">
          Tecplore Studio
        </h1>
        <p className="text-lg md:text-1.5xl text-blue-700/75 mt-4 max-w-3xl mx-auto leading-relaxed ">
          Transform YouTube videos into classroom learning experiences with interaction, questions, and learning checkpoints.
        </p>
      
      
      </section>

     <main className="max-w-6xl mx-auto py-10 px-4">
      {sections.map((card, index) => (
        <section
          key={index}
          className={`flex flex-col md:flex-row items-stretch mb-20 ${
            card.imageLeft ? "" : "md:flex-row-reverse"
          }`}
        >
          {/* Image Pane */}
          <div className="md:w-1/2 w-full flex-shrink-0 flex items-center justify-center relative">
            <div
              className={`w-full h-80 md:h-96 ${
                card.imageLeft ? "clip-left" : "clip-right"
              } bg-blue-100 overflow-hidden rounded-3xl shadow-lg relative`}
            >
              <img
                src={card.img}
                alt="Tecplore feature section"
                className="w-full h-full object-cover object-center"
                draggable={false}
              />

              <span
                className={`
                absolute top-4 
                ${card.imageLeft ? "left-4" : "right-4"}
                bg-blue-700 text-white uppercase py-1 px-4 rounded-full shadow text-xs font-semibold tracking-wider
              `}
              >
                {card.banner}
              </span>
            </div>
          </div>

          {/* Text Panel */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:pl-10 md:pr-10">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {card.desc}
            </p>

            <Link href={card.href}>
             <span className="inline-block border-2 border-gray-300 text-blue-700 px-7 py-2 rounded-full font-semi text-lg shadow-sm hover:border-blue-700 transition">
              {card.button}
              </span>

            </Link>
          </div>
        </section>
      ))}
    </main>

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
        .clip-left {
          clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%);
        }
        .clip-right {
          clip-path: polygon(5% 0, 100% 0, 100% 100%, 15% 100%);
        }
      `}</style>
    </div>
  );
}
