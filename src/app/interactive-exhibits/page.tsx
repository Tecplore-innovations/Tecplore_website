"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NEW_PATH = "/learning-stations";

/**
 * The exhibits page moved to /learning-stations. The site is a static export
 * with no server redirects, so this page forwards old links and search results.
 */
export default function InteractiveExhibitsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(NEW_PATH);
  }, [router]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${NEW_PATH}`} />
      <div className="min-h-[50vh] px-6 py-24 text-center text-body">
        This page has moved to{" "}
        <Link href={NEW_PATH} className="font-semibold text-primary hover:underline">
          Learning Stations
        </Link>
        .
      </div>
    </>
  );
}
