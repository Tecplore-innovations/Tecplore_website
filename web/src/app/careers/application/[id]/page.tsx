// app/careers/application/[id]/page.tsx
import { Metadata } from 'next';
import { positions } from '../../components/constants';
import { notFound } from 'next/navigation';
import { Position } from '../../components/types';
import JobApplicationClient from '../../components/JobApplicationClient';

// Explicitly define PageProps to match Next.js expectations
export interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ 
    [key: string]: string | string[] | undefined 
  } | undefined>;
}

async function getPosition(id: string): Promise<Position | null> {
  const position = positions.find(p => p.id === parseInt(id));
  return position || null;
}

export async function generateMetadata({ 
  params 
}: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const position = await getPosition(resolvedParams.id);
  
  if (!position) {
    return {
      title: 'Position Not Found',
    };
  }

  return {
    title: `Apply for ${position.title} | Tecplore Careers`,
    description: position.description,
  };
}

export default async function Page({ 
  params 
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const position = await getPosition(resolvedParams.id);
  
  if (!position) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <JobApplicationClient position={position} />
    </main>
  );
}