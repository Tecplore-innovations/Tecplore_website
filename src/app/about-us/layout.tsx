import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Us",
  "Meet the Tecplore team of educators and engineers, with industry and research experience, designing science learning experiences across India.",
  "/about-us"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
