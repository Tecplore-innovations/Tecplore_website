import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Maker Spaces",
  "We design and set up maker spaces for schools, learning centres and public spaces, with installation, educator training and ongoing support.",
  "/maker-space"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
