"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  subject: string;
  level: string;
  thumbnail: string;
  createdAt: string;
  content: "Tecplore" | "Community";
}

const SAMPLE_COUNT = 3;

/** Real samples from the Teacher Resources library, as proof of the learning layer. */
export default function ResourceSamples() {
  const [samples, setSamples] = useState<Resource[]>([]);
  const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get_resources.php`);
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data)) return;
        // Show Tecplore's own material, not third-party resources.
        setSamples(
          (data as Resource[])
            .filter((r) => r.content === "Tecplore")
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, SAMPLE_COUNT)
        );
      } catch {
        // The samples are a bonus; the section still links to the library.
      }
    };
    load();
  }, []);

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="heading-section mb-3">Teacher&apos;s portal</h2>
        <p className="mb-8 max-w-3xl text-body">
          Our Teacher Resources library holds training videos, lesson plans and activity guides across
          subjects and grade levels.
        </p>

        {samples.length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((resource) => (
              <Link
                key={resource.id}
                href="/teacher-resources"
                className="surface-card-interactive overflow-hidden"
              >
                <img
                  src={`${assetBase}${resource.thumbnail}`}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground">{resource.title}</h3>
                  <span className="tag">{resource.level}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/teacher-resources"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Browse Teacher Resources
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
