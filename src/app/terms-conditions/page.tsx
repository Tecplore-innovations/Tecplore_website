"use client";
import React from "react";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background text-body">
      <PageHero title="Terms of Use" />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-sm text-body mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6">
          By accessing or using <strong>Tecplore</strong>&apos;s website, STEM modules, exhibits, learning tools, or resources, you agree to these Terms of Use.
        </p>

        <h2 className="font-semibold text-lg text-foreground mt-8 mb-2">Educational Purpose</h2>
        <p className="mb-4">
          Tecplore provides hands-on learning content, interactive STEM exhibits, and curiosity-driven educational tools. Material is for learning and informational purposes only, not professional engineering or scientific certification.
        </p>

        <h2 className="font-semibold text-lg text-foreground mt-8 mb-2">User Responsibilities</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Use content responsibly and safely</li>
          <li>Follow lab & exhibit safety guidelines</li>
          <li>Do not misuse learning equipment or software</li>
        </ul>

        <h2 className="font-semibold text-lg text-foreground mt-8 mb-2">Intellectual Property</h2>
        <p className="mb-4">
          All content, designs, exhibits, videos, and learning materials belong to Tecplore. You may not copy, resell, or reproduce content without permission.
        </p>

        <h2 className="font-semibold text-lg text-foreground mt-8 mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          Our tools are safe when used correctly. Tecplore is not responsible for injury, misuse, or unauthorized reproduction of scientific experiments or maker-space content.
        </p>

        <h2 className="font-semibold text-lg text-foreground mt-8 mb-2">Termination</h2>
        <p className="mb-6">
          We reserve the right to restrict access to website or learning systems for improper usage or safety violations.
        </p>

        <Link href="/" className="inline-block mt-8 font-semibold text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
