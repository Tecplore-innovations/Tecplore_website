"use client";

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials</li>
            <li>Educational institution details</li>
            <li>Usage data and learning progress</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use the collected information to:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Provide and maintain our educational services</li>
            <li>Analyze and improve our platform</li>
            <li>Communicate with users about updates and features</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to maintain the security of your personal information, including encryption, access controls, and regular security assessments.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;