"use client";

import Link from "next/link";


const sections = [
  {
      
    desc: (
      <>      
      Utilize the <b className="text-slate-700">Creator Mode</b> to make lesson out of youtube content.
      <br/>Embed interactive elements like quizzes at precise points, and save the lesson.
      </>
    ),
    button: "Create Lesson",
    href: "/tecplore-studio/teacher",
    banner: "Creator Mode",
    img: "/photos/teacher.avif",
    imageLeft: true,
  },
  {
   
    desc: (
      <>
      Utilize the <b className="text-slate-700">Classroom Mode</b> to make every lesson more interactive and dramatically improve retention.
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
    <div className="min-h-screen bg-whiter ">
    
       {/* HERO */}
     
      <section className="pt-12 pb-8 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-4xl md:text-4xl font-light mb-6 text-slate-700">
          Tecplore Studio
        </h1>

        <p className="text-lg md:text-xl text-blue-700/75 mt-4 max-w-3xl mx-auto leading-relaxed">
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
    <div className={`md:w-1/2 w-full flex flex-col justify-center p-8 ${card.imageLeft ? "text-clip-right" : "text-clip-left"}`}>
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

        {/* localization / translation section */}
        <section className="max-w-6xl mx-auto mb-24 px-4">
          <div className="rounded-3xl bg-gradient-to-br from-violet-100 via-purple-50 to-pink-50 p-10 shadow-lg border border-violet-200/40">

            {/* top title + transform text */}
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Transform global YouTube videos into lessons in 
                <b className="text-purple-700"> your students&apos; language</b> using 
                synced voiceovers for localized learning.
              </p>
            </div>

            {/* image + nativesync explainer */}
            <div className="grid md:grid-cols-2 gap-8 items-center">

              {/* image left */}
              <div className="w-full h-72 rounded-3xl overflow-hidden shadow-xl border border-purple-200/40">
                <img
                  src="/photos/translate.avif"
                  alt="localization flow"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* text right */}
              <div className="flex flex-col justify-center">

                {/* prerequisite note */}
                <div className="bg-white/60 border-l-4 border-purple-500 p-4 mb-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-800 leading-relaxed">
                  Have a useful YouTube video in foreign language and want to teach it in your students’ native language? <br/> <br/>Just translate the transcript and prepare a native voiceover. You can either record it yourself or generate it using any online tool.
                  </p>
                </div>

                {/* nativesync flow */}
                <div className="bg-white/70 border-r-4 border-purple-500 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Bring your audio into <span className="font-semibold text-purple-700">NativeSync</span> to align it perfectly with the YouTube visuals. Export the synced track, build lessons in <span className="font-semibold text-purple-700">Creator Mode</span>, and present them to your class through <span className="font-semibold text-purple-700">Classroom Mode</span>.
                  </p>
                </div>

              </div>
            </div>

            {/* cta button */}
            <div className="mt-8 text-center">
              <Link href="/tecplore-studio/localization">
                <span className="inline-block border-2 border-purple-400 text-purple-700 px-7 py-2 rounded-full font-medium text-lg shadow-sm hover:border-purple-600 hover:text-purple-900 transition">
                  Start Localization
                </span>
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                Opens NativeSync
              </p>
            </div>

          </div>
        </section>


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
         /* Desktop only: text card clips */
        @media (min-width: 768px) {
          .text-clip-right {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%);
            border-top-right-radius: 24px;
            border-bottom-right-radius: 24px;
            border: 2px solid #a78bfa;
            border-left: none;
            background: white;
          }
          .text-clip-left {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%);
            border-top-left-radius: 24px;
            border-bottom-left-radius: 24px;
            border: 2px solid #a78bfa;
            border-right: none;
            background: white;
          }
        }


      `}</style>
    </div>
  );
}
