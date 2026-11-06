"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useSiteContent, type StationTag } from "@/lib/siteContent";
import { stationsForTag } from "@/lib/stations";

/** The stations tagged for this page. Tags are set from /site-admin. */
export default function StationPicks({
  tag,
  heading,
  text,
}: {
  tag: StationTag;
  heading: string;
  text: React.ReactNode;
}) {
  const content = useSiteContent();
  const picks = stationsForTag(tag, content);

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="heading-section mb-3">{heading}</h2>
        <p className="mb-8 max-w-3xl text-body">{text}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((station) => (
            <div key={station.id} className="surface-card flex gap-4 p-4">
              <Image
                src={station.thumb}
                alt={station.title}
                width={80}
                height={80}
                className="h-20 w-20 flex-shrink-0 rounded-card object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{station.title}</h3>
                <p className="mt-1 text-sm text-body">{station.short}</p>
              </div>
            </div>
          ))}
          {/* Loading stage, while tags and added stations arrive */}
          {!content.loaded && <div aria-hidden className="surface-card h-28 animate-pulse bg-muted" />}
        </div>
        <Link
          href="/learning-stations"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          See all learning stations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
