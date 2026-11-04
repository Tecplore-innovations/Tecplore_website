import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Stations",
  robots: { index: false, follow: true },
  alternates: { canonical: "/learning-stations" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
