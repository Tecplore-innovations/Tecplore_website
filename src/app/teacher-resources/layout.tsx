import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Teacher Resources",
  "A library of training videos, lesson plans and activity guides for science educators, across subjects and grade levels.",
  "/teacher-resources"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
