// Site-wide navigation and call-to-action wording, kept in one place so the
// menu, footer and page buttons stay in step.

export const DESIGN_CALL = {
  label: "Book a 30-minute context-setting call",
  shortLabel: "Book a Call",
  href: "/contact",
};

// In priority order: NGOs come first.
export const SOLUTION_LINKS = [
  { name: "NGOs", href: "/solutions/ngos" },
  { name: "Schools", href: "/solutions/schools" },
  { name: "Science Parks", href: "/solutions/science-parks" },
];

// Set to true to bring Maker Spaces back to the menu, footer, sitemap and FAQ.
// The page and its code are kept. Its wording in site descriptions would also
// need adding back.
export const SHOW_MAKER_SPACE: boolean = false;

// Teacher Resources is reached from the Schools page and the footer.
export const NAV_LINKS = [
  { name: "Learning Stations", href: "/learning-stations" },
  ...(SHOW_MAKER_SPACE ? [{ name: "Maker Spaces", href: "/maker-space" }] : []),
  { name: "About Us", href: "/about-us" },
  { name: "FAQ", href: "/faq" },
];

