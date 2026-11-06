import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Book a Context-Setting Call",
  "Tell us about your space and who will use it, and book a 30-minute context-setting call with Tecplore. Offices in Coimbatore, Trivandrum and Nagpur.",
  "/contact"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
