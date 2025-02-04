import ClientPage from '@/components/Editor/ClientPage';
import Image from 'next/image';

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
              <Image
                src="/process-hero.jpg"
                alt="Our Process"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">Our Process</h1>
              </div>
            </div>
            <div className="max-w-4xl mx-auto p-4">
              <ClientPage />
            </div>
      
    </main>
  );
}