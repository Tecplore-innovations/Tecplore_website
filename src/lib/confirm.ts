// The master list of everything waiting for confirmation.
//
// Master switch: set SHOW_CONFIRM_HIGHLIGHTS to false to clear every yellow
// highlight and every empty placeholder across the site at once. Do this
// before going live.
//
// To clear one item only, delete its line from CONFIRM_ITEMS.
export const SHOW_CONFIRM_HIGHLIGHTS: boolean = true;

export const CONFIRM_ITEMS = {
  aarvam: {
    text: "We set up the space at Aarvam and run the learning there.",
    note: "Confirm how to describe the work at Aarvam.",
    page: "/solutions/ngos",
  },
  solapur: {
    text: "Solapur School. A completed Tecplore project. Summary to be added.",
    note: "Add the school's full name and a summary of the project.",
    page: "/solutions/schools",
  },
  "parks-case": {
    text: "Science park project. Project details and photos to be added.",
    note: "No science park project yet. Placeholder only, so nothing here should claim a completed project.",
    page: "/solutions/science-parks",
  },
  "station-panels": {
    text: "The Station panels and QR videos cards.",
    note: "Confirm that this matches the panels and videos actually built.",
    page: "/solutions/science-parks",
  },
  "schools-text": {
    text: "Your teachers lead, and we make it easy",
    note: "Schools page text to be refined.",
    page: "/solutions/schools",
  },
  outdoors: {
    text: "Outdoor-grade build, vandal resistance, and an annual maintenance contract keep the trail in use.",
    note: "Confirm outdoor-grade build, vandal resistance and the maintenance contract.",
    page: "/solutions/science-parks",
  },
  supervision: {
    text: "These stations work without supervision, so they are our first choice for a self-guided trail.",
    note: "Confirm each of these stations is safe to leave unattended.",
    page: "/solutions/science-parks",
  },
  safety: {
    text: "All learning stations meet applicable safety standards",
    note: "Name the safety standards that apply. Open the safety question on the FAQ page to see it.",
    page: "/faq",
  },
} as const;

export type ConfirmId = keyof typeof CONFIRM_ITEMS;
