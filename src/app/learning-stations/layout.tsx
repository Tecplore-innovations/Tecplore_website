import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Learning Stations",
  "Hands-on science exhibits with their learning built in. See our learning stations, each designed around one concept, from Stream Table to Wind Tunnel.",
  "/learning-stations"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
