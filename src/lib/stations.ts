import { moreExhibits, showcases, type MoreExhibit, type Showcase } from "@/app/learning-stations/exhibits";
import type { SiteContent, StationTag } from "@/lib/siteContent";

// Where the built-in stations show until they are changed from /site-admin.
const DEFAULT_TAGS: Record<number, StationTag[]> = {
  10: ["ngos", "parks"],
  6: ["ngos", "schools", "parks"],
  8: ["ngos", "parks"],
  3: ["ngos", "schools"],
  5: ["ngos", "schools"],
  9: ["ngos", "parks"],
  2: ["schools"],
  1: ["schools"],
  4: ["schools", "parks"],
  7: ["parks"],
};

// Shown for a new station until its photo is added.
const NO_PHOTO = "/photos/placeholders/making.jpg";

export const builtInStations = [...showcases, ...moreExhibits];

/** A built-in station with any text or photo changes from /site-admin applied. */
function withEdits<T extends Showcase | MoreExhibit>(station: T, content: SiteContent): T {
  const edits = content.stations[station.id];
  const photo = content.photos[`station.${station.id}`]?.src;
  const edited = {
    ...station,
    title: edits?.title || station.title,
    short: edits?.short || station.short,
    long: edits?.long || station.long,
    notice: edits?.notice || station.notice,
    why: edits?.why || station.why,
  };
  if (!photo) return edited;
  return "images" in edited
    ? { ...edited, images: [photo, ...edited.images.slice(1)] }
    : { ...edited, image: photo };
}

export function editedStations(content: SiteContent) {
  return builtInStations.map((station) => withEdits(station, content));
}

/** Stations added from /site-admin, in the same shape as the built-in ones. */
export function addedStations(content: SiteContent): MoreExhibit[] {
  return content.customStations.map((station) => {
    const image = content.photos[`station.${station.id}`]?.src ?? NO_PHOTO;
    return {
      id: station.id,
      title: station.title,
      short: station.short,
      long: station.long,
      notice: station.notice,
      why: station.why,
      tryIt: "",
      categories: [],
      image,
      gallery: [image],
    };
  });
}

export function stationTags(id: number, content: SiteContent): StationTag[] {
  const added = content.customStations.find((station) => station.id === id);
  if (added) return added.tags;
  return content.stations[id]?.tags ?? DEFAULT_TAGS[id] ?? [];
}

/** Every station tagged for one solution page. */
export function stationsForTag(tag: StationTag, content: SiteContent) {
  const builtIn = editedStations(content).map((station) => ({
    id: station.id,
    title: station.title,
    short: station.short,
    thumb: "images" in station ? station.images[0] : station.image,
  }));
  const added = addedStations(content).map((station) => ({
    id: station.id,
    title: station.title,
    short: station.short,
    thumb: station.image,
  }));
  return [...builtIn, ...added].filter((station) => stationTags(station.id, content).includes(tag));
}
