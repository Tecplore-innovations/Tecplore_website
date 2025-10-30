"use client";
import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6">
          At <strong>Tecplore</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you engage with our educational platforms, STEM exhibits, and interactive learning content.
        </p>

        <h2 className="font-semibold text-lg mt-8 mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Basic contact details (name, email, school or parent information)</li>
          <li>Usage data — activities on website & learning modules</li>
          <li>Device, browser & analytics information</li>
        </ul>

        <h2 className="font-semibold text-lg mt-8 mb-2">How We Use Your Data</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Deliver STEM learning experiences</li>
          <li>Improve interactive exhibits & learning content</li>
          <li>Communicate updates & education resources</li>
          <li>Enhance website performance & personalization</li>
        </ul>

        <h2 className="font-semibold text-lg mt-8 mb-2">Children&apos;s Privacy</h2>
        <p className="mb-4">
          We create learning products for children but **do not collect personal data from children under 13 without guardian consent**. Schools and parents manage child accounts.
        </p>

        <h2 className="font-semibold text-lg mt-8 mb-2">Data Sharing</h2>
        <p className="mb-4">
          We do not sell personal data. We may share limited information with trusted partners for analytics, hosting, and security — always with strict privacy compliance.
        </p>

        <h2 className="font-semibold text-lg mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Access and update your data</li>
          <li>Request account deletion</li>
          <li>Opt-out of marketing communication</li>
        </ul>

        <p className="mt-10 text-sm text-gray-600">
          If you have questions or privacy requests, contact us at  
          <br />
          <strong>support@tecplore.com</strong>
        </p>

        <Link href="/" className="inline-block mt-8 text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
