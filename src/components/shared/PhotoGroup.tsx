"use client";

import { SHOW_CONFIRM_HIGHLIGHTS } from "@/lib/confirm";
import { PHOTO_GROUPS, useSiteContent } from "@/lib/siteContent";

// These groups show their illustrations as finished pictures, with no yellow
// label, and keep them after the highlights are switched off.
const KEEP_ILLUSTRATIONS: string[] = ["rnd"];

/** Photos added from /site-admin, with a yellow placeholder for each empty slot. */
export default function PhotoGroup({ group }: { group: (typeof PHOTO_GROUPS)[number]["id"] }) {
  const { photos } = useSiteContent();
  const slots = PHOTO_GROUPS.find((item) => item.id === group)?.slots ?? [];
  const keep = KEEP_ILLUSTRATIONS.includes(group);
  const visible = slots.filter((slot) => keep || SHOW_CONFIRM_HIGHLIGHTS || photos[`${group}.${slot.id}`]);
  if (visible.length === 0) return null;

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((slot) => {
        const photo = photos[`${group}.${slot.id}`];
        return (
          <figure key={slot.id}>
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.caption || slot.label}
                className="aspect-[4/3] w-full rounded-card object-cover"
                loading="lazy"
              />
            ) : keep ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slot.placeholder}
                alt=""
                className="aspect-[4/3] w-full rounded-card border border-border bg-background object-cover"
                loading="lazy"
              />
            ) : (
              <div className="photo-placeholder">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slot.placeholder} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <p className="photo-placeholder-label">Photo to add: {slot.label}</p>
              </div>
            )}
            {(photo || keep) && (
              <figcaption className="mt-2 text-sm font-semibold text-foreground">
                {photo?.caption || slot.label}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
