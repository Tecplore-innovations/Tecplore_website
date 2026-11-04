import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { moreExhibits, showcases } from "@/app/learning-stations/exhibits";

/** A short list of recommended learning stations, picked by id. */
export default function StationPicks({
  ids,
  heading,
  text,
}: {
  ids: number[];
  heading: string;
  text: string;
}) {
  const all = [
    ...showcases.map((s) => ({ ...s, thumb: s.images[0] })),
    ...moreExhibits.map((s) => ({ ...s, thumb: s.image })),
  ];
  const picks = ids.flatMap((id) => all.filter((station) => station.id === id));

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
                <p className="mt-1 text-sm text-body">
                  <span className="font-semibold text-primary">Try: </span>
                  {station.tryIt}
                </p>
              </div>
            </div>
          ))}
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
