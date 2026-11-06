import type { Metadata } from "next";

// Not linked from anywhere and not in the sitemap. Changes need the access key.
export const metadata: Metadata = {
  title: "Site Admin",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
