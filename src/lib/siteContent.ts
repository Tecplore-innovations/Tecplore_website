"use client";

import { useEffect, useState } from "react";

// Photos and station details are read live from the server, so the hidden dev
// page at /site-admin can change them without a rebuild.
export const SITE_API = "/site-api/content.php";

export const PHOTO_GROUPS = [
  {
    id: "aarvam",
    title: "Aarvam case study",
    slots: [
      { id: "making", label: "Making", placeholder: "/photos/placeholders/making.jpg" },
      { id: "installation", label: "Installation", placeholder: "/photos/end-to-end/supply-installation.jpg" },
      { id: "training", label: "Training", placeholder: "/photos/end-to-end/curriculum-training.jpg" },
      { id: "evaluation", label: "Evaluation", placeholder: "/photos/placeholders/evaluation.jpg" },
    ],
  },
  {
    id: "solapur",
    title: "Solapur school case study",
    slots: [
      { id: "making", label: "Making", placeholder: "/photos/placeholders/making.jpg" },
      { id: "training", label: "Training", placeholder: "/photos/end-to-end/curriculum-training.jpg" },
      { id: "students", label: "Students explaining", placeholder: "/photos/placeholders/students.jpg" },
    ],
  },
  {
    id: "parks",
    title: "Science park project",
    slots: [
      { id: "layout", label: "Trail layout", placeholder: "/photos/end-to-end/space-layout.jpg" },
      { id: "installation", label: "Installation", placeholder: "/photos/end-to-end/supply-installation.jpg" },
      { id: "visitors", label: "Visitors exploring", placeholder: "/photos/end-to-end/experience-design.jpg" },
    ],
  },
  {
    id: "rnd",
    title: "R&D and manufacturing",
    slots: [
      { id: "design", label: "Design and development", placeholder: "/photos/placeholders/design.jpg" },
      { id: "manufacturing", label: "Manufacturing", placeholder: "/photos/placeholders/making.jpg" },
      { id: "testing", label: "Testing", placeholder: "/photos/placeholders/testing.jpg" },
    ],
  },
] as const;

// The three solution pages a station can be tagged for.
export const STATION_TAGS = [
  { id: "ngos", label: "NGOs" },
  { id: "schools", label: "Schools" },
  { id: "parks", label: "Science Parks" },
] as const;

export type StationTag = (typeof STATION_TAGS)[number]["id"];

export interface CustomStation {
  id: number;
  title: string;
  short: string;
  long: string;
  notice: string;
  why: string;
  tags: StationTag[];
}

// Set from /site-admin. Empty text keeps the original wording.
export interface StationEdits {
  space?: string;
  youtube?: string;
  tags?: StationTag[];
  title?: string;
  short?: string;
  long?: string;
  notice?: string;
  why?: string;
}

export interface SiteContent {
  photos: Record<string, { src: string; caption?: string }>;
  stations: Record<string, StationEdits>;
  customStations: CustomStation[];
}

export const EMPTY_CONTENT: SiteContent = { photos: {}, stations: {}, customStations: [] };

export function normaliseContent(data: Partial<SiteContent>): SiteContent {
  return {
    photos: data.photos ?? {},
    stations: data.stations ?? {},
    customStations: data.customStations ?? [],
  };
}

let request: Promise<SiteContent> | null = null;

export function fetchSiteContent(fresh = false): Promise<SiteContent> {
  if (!request || fresh) {
    request = fetch(SITE_API, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : EMPTY_CONTENT))
      .then(normaliseContent)
      // Without the server, for example in local development, placeholders show.
      .catch(() => EMPTY_CONTENT);
  }
  return request;
}

/** `loaded` stays false until the live content has arrived. */
export function useSiteContent(): SiteContent & { loaded: boolean } {
  const [content, setContent] = useState({ ...EMPTY_CONTENT, loaded: false });
  useEffect(() => {
    let active = true;
    fetchSiteContent().then((data) => {
      if (active) setContent({ ...data, loaded: true });
    });
    return () => {
      active = false;
    };
  }, []);
  return content;
}
