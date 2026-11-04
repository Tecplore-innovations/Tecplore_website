import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Careers",
  "Join Tecplore's team of engineers, scientists and educators, and help change how students experience science.",
  "/careers"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
