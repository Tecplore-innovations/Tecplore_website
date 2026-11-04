import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Book a Design Call",
  "Tell us about your space and who will use it, and book a 30-minute design call with Tecplore. Offices in Coimbatore, Trivandrum and Nagpur.",
  "/contact"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
