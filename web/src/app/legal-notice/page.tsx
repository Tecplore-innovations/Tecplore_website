"use client";

import React from 'react';

const LegalNotice = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Company Information</h2>
          <p className="text-gray-700">
            Tecplore Educational Technologies Inc.<br />
            [Company Address]<br />
            Registration Number: [Number]<br />
            Email: legal@tecplore.com<br />
            Phone: +1 (555) 123-4567
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Legal Representation</h2>
          <p className="text-gray-700">
            Authorized representatives:<br />
            [Name], Chief Executive Officer<br />
            [Name], Chief Technology Officer
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="text-gray-700">
            The content provided on this website is for educational and informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Copyright Notice</h2>
          <p className="text-gray-700">
            All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Tecplore or its content suppliers and protected by international copyright laws.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalNotice;