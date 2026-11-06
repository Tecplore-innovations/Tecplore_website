import { pageMetadata } from "@/lib/seo";
import { SHOW_MAKER_SPACE } from "@/lib/site";

const baseMetadata = pageMetadata(
  "Maker Spaces",
  "We design and set up maker spaces for schools, learning centres and public spaces, with installation, educator training and ongoing support.",
  "/maker-space"
);

// Kept out of search engines while Maker Spaces is hidden.
export const metadata = SHOW_MAKER_SPACE
  ? baseMetadata
  : { ...baseMetadata, robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
