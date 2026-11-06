import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "Answers on how Tecplore works: guided and self-guided spaces, learning stations, support and how to get started.",
  "/faq"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
