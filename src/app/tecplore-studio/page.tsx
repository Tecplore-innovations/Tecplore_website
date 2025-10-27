"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden font-inter">
      {/* Page Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
       
      >
        <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        {/* Header */}
        <header className="mb-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Tecplore Studio
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 leading-relaxed">
            Transform YouTube Videos into Engaging Classroom Lessons
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "Teacher-Driven Design",
              "Structured Content",
              "Interactive Lessons",
              "Smart Analytics",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Platform Description */}
        <section className="max-w-4xl mb-20 text-center">    
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
          
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Space for Teachers to Design, Deliver & Inspire
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Tecplore Studio empowers educators to reimagine existing YouTube content into
              well-structured classroom experiences - designed for clarity, engagement, and
              outcome-based learning.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Lesson Creation
                </h3>
                <p className="text-blue-100">
                  Curate YouTube videos into structured lesson plans with prompts, quizzes,
                  and discussions. Build complete learning journeys effortlessly.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Lesson Delivery
                </h3>
                <p className="text-blue-100">
                  Present curated lessons interactively in class, track real-time engagement,
                  and encourage active participation through built-in tools.
                </p>
              </div>
            </div>
          </div>
        </section>

{/* Main Cards Section (Desktop + Tablet) */}
<main className="hidden sm:grid sm:grid-cols-2 gap-10 w-full max-w-5xl">
  {[
    {
      title: "Lesson Creator",
      href: "/tecplore-studio/teacher",
      img: "/photos/teacher.png",
      buttonText: "Create Lesson",
      buttonColor: "text-blue-600",
    },
    {
      title: "Classroom Mode",
      href: "/tecplore-studio/student",
      img: "/photos/student.png",
      buttonText: "Start Teaching",
      buttonColor: "text-blue-600",
    },
  ].map((card) => (
    <a
      key={card.title}
      href={card.href}
      className="relative group overflow-hidden rounded-3xl shadow-2xl border border-white/20 h-[400px] sm:h-[450px] transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Image Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-50"
        style={{ backgroundImage: `url(${card.img})` }}
      />

      {/* CTA on Hover (bottom aligned) */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`bg-white px-6 py-3 rounded-full font-semibold text-sm ${card.buttonColor}`}
        >
          {card.buttonText}
        </div>
      </div>
    </a>
  ))}
</main>

{/* Mobile Compact Cards */}
<div className="sm:hidden flex flex-col gap-6 w-full max-w-md mt-10">
  {[
    {
      title: "Lesson Creator",
      href: "/tecplore-studio/teacher",
      img: "/photos/teacher.png",
      buttonText: "Create Lesson",
    },
    {
      title: "Classroom Mode",
      href: "/tecplore-studio/student",
      img: "/photos/student.png",
      buttonText: "Start Teaching",
    },
  ].map((card) => (
    <a
      key={card.title}
      href={card.href}
      className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md h-64 flex flex-col justify-end transition-all duration-500 hover:scale-[1.02]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${card.img})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <div className="mt-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2 rounded-full inline-block">
          {card.buttonText}
        </div>
      </div>
    </a>
  ))}
</div>


        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-blue-200 text-sm">
            Join educators transforming YouTube content into powerful classroom experiences
          </p>
          <div className="mt-4 flex gap-4 justify-center flex-wrap">
            <span className="text-white/60 text-xs">
              ✓ Trusted by educators worldwide
            </span>
            <span className="text-white/60 text-xs">
              ✓ Easy YouTube integration
            </span>
            <span className="text-white/60 text-xs">
              ✓ Time-saving lesson creation
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
