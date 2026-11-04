import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "Answers on how Tecplore works: the Explore, Discover and Create models, learning stations, maker spaces, support and how to get started.",
  "/faq"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
