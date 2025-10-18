"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 font-inter">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          <span className="text-blue-900">Tecplore Studio</span>
        </h1>
        <p className="mt-2 text-xl text-gray-500">
          Select your session to begin
        </p>
      </header>

      <main className="flex flex-col sm:flex-row items-center justify-center gap-12 w-full max-w-4xl">
        {/* Teacher Module - Replaced <Link> with <a> */}
        <a 
          href="/tecplore-studio/teacher" 
          className="relative h-[45vh] aspect-square rounded-2xl overflow-hidden 
                     shadow-xl hover:shadow-2xl transition-all duration-300 
                     group transform hover:scale-[1.03] flex items-center justify-center 
                     // Border width set to 1px via 'border' class
                     bg-white border border-indigo-200 cursor-pointer"
        >
          {/* Using image instead of icon */}
          <img 
            src="/photos/teacher.png" 
            alt="Teacher Module" 
            // Fallback placeholder image for environments where /photos/teacher.png doesn't load
            onError={(e) => { 
              const target = e.target as HTMLImageElement; 
              target.onerror = null; 
              target.src = 'https://placehold.co/600x600/6366f1/ffffff?text=Teacher+Image'; 
            }}
            className="w-full h-full object-cover absolute inset-0" 
          />
          
          {/* Overlay text for module name */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-bold text-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity p-4">
            Teacher Module
            <p className="text-sm font-normal text-gray-200 mt-1">Design engaging lessons.</p>
          </div>
        </a>

        {/* Student Module - Replaced <Link> with <a> */}
        <a 
          href="/tecplore-studio/student" 
          className="relative h-[45vh] aspect-square rounded-2xl overflow-hidden 
                     shadow-xl hover:shadow-2xl transition-all duration-300 
                     group transform hover:scale-[1.03] flex items-center justify-center 
                     // Border width set to 1px via 'border' class
                     bg-white border border-green-200 cursor-pointer"
        >
          {/* Using image instead of icon */}
          <img 
            src="/photos/student.png" 
            alt="Student Module" 
            // Fallback placeholder image for environments where /photos/student.png doesn't load
            onError={(e) => { 
              const target = e.target as HTMLImageElement; 
              target.onerror = null; 
              target.src = 'https://placehold.co/600x600/10b981/ffffff?text=Student+Image'; 
            }}
            className="w-full h-full object-cover absolute inset-0" 
          />
          
          {/* Overlay text for module name */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-bold text-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity p-4">
            Student Module
            <p className="text-sm font-normal text-gray-200 mt-1">Engage their logic, not just their memory.</p>
          </div>
        </a>
      </main>
    </div>
  );
}
