"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Tecplore?",
    answer:
      "Tecplore is a hands-on STEM learning platform and maker lab for students. We bring science, engineering, and technology to life through real experiments, interactive exhibits, and project-based learning.",
  },
  {
    question: "Who can use Tecplore?",
    answer:
      "Students, parents, schools, and educators looking for experiential learning, STEM exhibits, robotics, space education, and maker-space activities.",
  },
  {
    question: "Do you provide school partnerships?",
    answer:
      "Yes! Tecplore sets up STEM labs, maker-spaces, and interactive science exhibits inside schools and institutions. Contact us for collaboration.",
  },
  {
    question: "Are the activities safe for children?",
    answer:
      "Yes, all our activities are designed with strict safety guidelines. Supervision is required for tools, machines, and live science demos.",
  },
  {
    question: "Is Tecplore a gaming platform?",
    answer:
      "No. Tecplore is not a gaming product. It is a real-world learning and scientific exploration platform using hands-on models and interactive STEM equipment.",
  },
  {
    question: "Do you provide online learning?",
    answer:
      "Yes, Tecplore offers blended learning — interactive physical science exhibits + digital learning modules.",
  },
  {
    question: "Does Tecplore collect student data?",
    answer:
      "We only collect minimal information for learning analytics and login management. Student privacy and data protection is our top priority.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Email us at support@tecplore.com or visit our Contact page.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        </div>

        <p className="text-gray-600 mb-8 text-sm">
          Find answers about interactive STEM learning, school partnerships, safety, and maker-space programs.
        </p>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
