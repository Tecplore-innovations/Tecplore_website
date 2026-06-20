"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/shared/PageHero";

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  label: string;
  faqs: FAQ[];
}

const categories: Category[] = [
  {
    label: "About Tecplore",
    faqs: [
      {
        question: "What does Tecplore do?",
        answer:
          "Tecplore designs and installs hands-on STEM learning environments (interactive science exhibits, maker spaces, and educator training programs) for schools, museums, libraries, and public venues across India. Our goal is to make science tangible and irresistible for every student.",
      },
      {
        question: "Which cities does Tecplore operate in?",
        answer:
          "Our registered office is in Coimbatore, Tamil Nadu, with branch offices in Trivandrum (Kerala) and Nagpur (Maharashtra). We have partnered with 100+ schools across these regions and continue to expand.",
      },
      {
        question: "How long has Tecplore been in operation?",
        answer:
          "Tecplore has been building science learning environments for over 8 years, working with schools, learning centres, and public institutions to bring experiential STEM education to students of all ages.",
      },
    ],
  },
  {
    label: "Interactive Exhibits",
    faqs: [
      {
        question: "What kinds of interactive exhibits does Tecplore offer?",
        answer:
          "Our exhibits span physics, chemistry, biology, space science, robotics, and environmental science. Each exhibit is designed to invite curiosity: students can touch, experiment, and observe real scientific phenomena rather than just read about them.",
      },
      {
        question: "Can exhibits be customised for a specific curriculum or theme?",
        answer:
          "Yes. We work closely with your institution to align exhibits with your academic curriculum, space constraints, age groups, and thematic goals. Custom branding and language options are also available.",
      },
      {
        question: "Are the exhibits suitable for all age groups?",
        answer:
          "Our exhibits are designed to engage students from primary school through higher secondary (Class 1–12) and beyond. Activity complexity and safety features are tailored to the target age group during the assessment phase.",
      },
      {
        question: "Can public spaces like museums or malls install Tecplore exhibits?",
        answer:
          "Absolutely. We regularly work with libraries, science museums, community centres, and family entertainment venues. Our exhibits are engineered for high-traffic environments with durable materials and minimal maintenance requirements.",
      },
    ],
  },
  {
    label: "Maker Spaces",
    faqs: [
      {
        question: "What is a Tecplore Maker Space?",
        answer:
          "A Tecplore Maker Space is a dedicated, safe environment where students design, build, and experiment using tools, electronics, craft materials, and open-ended project kits. It fosters creativity, problem-solving, and cross-disciplinary thinking beyond the standard classroom.",
      },
      {
        question: "How long does it take to set up a maker space?",
        answer:
          "The timeline depends on the size and complexity of the space. Our four-step process (Assessment, Proposal, Setup, Support) typically spans 4 to 10 weeks from first consultation to launch day. We handle equipment sourcing, installation, and educator training.",
      },
      {
        question: "Do you provide ongoing support after installation?",
        answer:
          "Yes. Every installation includes a launch support period, and we offer continued technical assistance, curriculum update packages, and maintenance guidance as your programme grows. We see ourselves as long-term partners, not one-time vendors.",
      },
    ],
  },
  {
    label: "Teacher Resources",
    faqs: [
      {
        question: "What is the Teacher Resources Portal?",
        answer:
          "The Teacher Resources Portal is a curated library of training videos, lesson plans, activity guides, and reference documents for educators. Content covers STEM subjects across multiple grade levels and is available in multiple languages.",
      },
      {
        question: "Who can access the Teacher Resources Portal?",
        answer:
          "The portal is available to educators at partner schools and institutions. If your school has a Tecplore programme in place, your resource access is included. Reach out to us if you'd like to unlock access for your staff.",
      },
    ],
  },
  {
    label: "Partnerships & Process",
    faqs: [
      {
        question: "How do I start a partnership with Tecplore?",
        answer:
          "The easiest first step is to fill out our contact form or email us at info@tecplore.com. We'll schedule a discovery call, understand your institution's needs and space, and put together a tailored proposal with no commitment required at that stage.",
      },
      {
        question: "Does Tecplore work with the school's existing curriculum?",
        answer:
          "Yes. During the Assessment phase, our team maps your institution's current curriculum and learning objectives to our exhibit and activity library. We integrate rather than replace: our programmes are designed to complement classroom teaching.",
      },
      {
        question: "Are Tecplore's activities safe for young students?",
        answer:
          "Safety is built into every product and programme we design. All exhibits meet applicable safety standards, materials are age-appropriate, and our team trains educators on supervision protocols. For tool-based maker activities, safety gear and structured guidelines are always included.",
      },
    ],
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium text-slate-900 leading-snug">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? categories.filter((c) => c.label === activeCategory)
    : categories;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Tecplore's exhibits, maker spaces, and partnerships."
        backgroundImage="/photos/career1.avif"
        overlayClass="bg-slate-950/80"
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-medium">FAQ</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeCategory === null
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCategory(c.label === activeCategory ? null : c.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeCategory === c.label
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="space-y-12">
          {displayed.map((category, ci) => (
            <div key={ci}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
                {category.label}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq) => (
                  <FAQItem key={faq.question} faq={faq} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 text-center">
          <p className="text-slate-700 font-medium text-lg mb-1">Still have questions?</p>
          <p className="text-slate-500 text-sm mb-6">Our team is happy to walk you through anything, no commitment needed.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
}
