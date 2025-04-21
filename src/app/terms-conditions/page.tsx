"use client";

import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using Tecplore&apos;s platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p className="text-gray-700">
            When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, features, and functionality of the Tecplore platform, including but not limited to educational materials, text, graphics, logos, and software, are owned by Tecplore and are protected by intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-gray-700">
            Users agree to:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Use the platform for educational purposes only</li>
            <li>Not engage in unauthorized access or use</li>
            <li>Not distribute harmful content or malware</li>
            <li>Not violate any applicable laws or regulations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms & Conditions or is harmful to other users, us, or third parties, or for any other reason.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;