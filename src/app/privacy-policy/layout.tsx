import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How Tecplore collects, uses and protects your personal information.",
  "/privacy-policy"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
