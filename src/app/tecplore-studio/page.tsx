"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden font-inter">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/photos/education-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header Section */}
        <header className="mb-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Tecplore Studio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 leading-relaxed">
            Transform YouTube Videos into Engaging Classroom Lessons
          </p>

          {/* Feature Badges - Clean without icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              AI-Powered Learning
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              Structured Content
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              Interactive Lessons
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              Smart Analytics
            </span>
          </div>
        </header>

        {/* What is Tecplore Studio Section */}
        <section className="max-w-4xl mb-16 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Teacher-Centric Platform
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-6">
              Tecplore Studio empowers educators to transform existing YouTube content into structured, 
              interactive classroom experiences. Create engaging lessons and deliver them seamlessly to your students.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Lesson Creation</h3>
                <p className="text-blue-100">
                  Curate YouTube videos into organized lesson plans with interactive elements, 
                  quizzes, and discussion points. Build comprehensive learning modules in minutes.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Lesson Delivery</h3>
                <p className="text-blue-100">
                  Present your curated lessons in the classroom with built-in engagement tools, 
                  real-time feedback, and progress tracking for effective teaching sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Module Selection - Revised for Teacher Use Cases */}
        <main className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-4xl">
          {/* Lesson Creator Module */}
          <a 
            href="/tecplore-studio/teacher" 
            className="group relative w-full sm:w-96 h-96 no-underline flip-card"
          >
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30 overflow-hidden">
                  <img 
                    src="/photos/teacher.png" 
                    alt="Lesson Creator" 
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement; 
                      target.onerror = null; 
                      target.src = 'https://placehold.co/400x400/4f46e5/ffffff?text=📝'; 
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lesson Creator</h3>
                <p className="text-blue-100 text-center">Transform YouTube videos into structured lessons</p>
               
              </div>
              
              {/* Back Side */}
              <div className="flip-card-back bg-gradient-to-br from-purple-700 to-blue-600 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Creation Features</h3>
                <ul className="text-blue-100 text-sm space-y-2 text-center">
                  <li>• Curate YouTube content into lessons</li>
                  <li>• Add interactive quizzes and polls</li>
                  <li>• Create discussion points and activities</li>
                  <li>• Organize content by topics and levels</li>
                  <li>• Save and reuse lesson templates</li>
                </ul>
                <div className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-full font-semibold">
                  Create Lessons
                </div>
              </div>
            </div>
          </a>

          {/* Classroom Presenter Module */}
          <a 
            href="/tecplore-studio/student" 
            className="group relative w-full sm:w-96 h-96 no-underline flip-card"
          >
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front bg-gradient-to-br from-green-500 to-cyan-600 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30 overflow-hidden">
                  <img 
                    src="/photos/student.png" 
                    alt="Classroom Presenter" 
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement; 
                      target.onerror = null; 
                      target.src = 'https://placehold.co/400x400/10b981/ffffff?text=👨‍🏫'; 
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Classroom Mode</h3>
                <p className="text-blue-100 text-center">Deliver interactive lessons to students</p>
              
              </div>
              
              {/* Back Side */}
              <div className="flip-card-back bg-gradient-to-br from-cyan-600 to-green-500 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Teaching Features</h3>
                <ul className="text-blue-100 text-sm space-y-2 text-center">
                  <li>• Present lessons with built-in tools</li>
                  <li>• Real-time student engagement tracking</li>
                  <li>• Interactive Q&A sessions</li>
                  <li>• Progress monitoring and analytics</li>
                  <li>• Seamless lesson flow control</li>
                </ul>
                <div className="mt-6 px-6 py-2 bg-white text-green-600 rounded-full font-semibold">
                  Start Teaching
                </div>
              </div>
            </div>
          </a>
        </main>

        {/* Alternative Simple Cards for Mobile */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl sm:hidden mt-8">
          <a 
            href="/tecplore-studio/teacher" 
            className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img 
                  src="/photos/teacher.png" 
                  alt="Lesson Creator" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement; 
                    target.onerror = null; 
                    target.src = 'https://placehold.co/400x400/4f46e5/ffffff?text=📝'; 
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lesson Creator</h3>
              <p className="text-blue-100 text-sm">Create from YouTube videos</p>
            </div>
          </a>

          <a 
            href="/tecplore-studio/student" 
            className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img 
                  src="/photos/student.png" 
                  alt="Classroom Mode" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement; 
                    target.onerror = null; 
                    target.src = 'https://placehold.co/400x400/10b981/ffffff?text=👨‍🏫'; 
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Classroom Mode</h3>
              <p className="text-blue-100 text-sm">Deliver interactive lessons</p>
            </div>
          </a>
        </div>

        {/* Footer CTA */}
        <footer className="mt-16 text-center">
          <p className="text-blue-200 text-sm">
            Join educators transforming YouTube content into powerful classroom experiences
          </p>
          <div className="mt-4 flex gap-4 justify-center flex-wrap">
            <span className="text-white/60 text-xs">✓ Trusted by educators worldwide</span>
            <span className="text-white/60 text-xs">✓ Easy YouTube integration</span>
            <span className="text-white/60 text-xs">✓ Time-saving lesson creation</span>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .no-underline {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}