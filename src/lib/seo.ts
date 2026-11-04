import type { Metadata } from "next";

export const SITE_URL = "https://tecplore.com";
export const SITE_NAME = "Tecplore";

export const SITE_DESCRIPTION =
  "We design science learning experiences for parks, schools and communities across India, bringing together interactive exhibits, maker spaces and educator training.";

// Every public page, for the sitemap. Add new pages here.
export const SITEMAP_PATHS = [
  "/",
  "/solutions/public-spaces",
  "/solutions/schools",
  "/solutions/ngos-csr",
  "/learning-stations",
  "/maker-space",
  "/teacher-resources",
  "/about-us",
  "/faq",
  "/contact",
  "/careers",
  "/privacy-policy",
  "/terms-conditions",
];

const openGraphDefaults = {
  siteName: SITE_NAME,
  type: "website",
  locale: "en_IN",
} as const;

/** Title, description, canonical URL and social tags for one page. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, title, description, url: path },
  };
}

/** Site-wide defaults, set once in the root layout. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tecplore | Science Learning for Parks, Schools and Communities",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphDefaults,
    title: "Tecplore | Science Learning Experiences",
    description: SITE_DESCRIPTION,
    url: "/",
  },
};
