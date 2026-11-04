import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Terms of Use",
  "The terms for using Tecplore's website, learning content and resources.",
  "/terms-conditions"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
