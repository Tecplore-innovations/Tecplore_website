"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail } from "lucide-react";
import Confirm from "@/components/shared/Confirm";
import PageHero from "@/components/shared/PageHero";
import { SHOW_MAKER_SPACE } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

interface Category {
  label: string;
  faqs: FAQ[];
}

const allCategories: Category[] = [
  {
    label: "About Tecplore",
    faqs: [
      {
        question: "What does Tecplore do?",
        answer:
          "We design science learning experiences for NGOs, schools and science parks across India. We bring together learning stations and educator training, so children learn science by doing.",
      },
      {
        question: "Which cities does Tecplore operate in?",
        answer:
          "Our registered office is in Coimbatore, Tamil Nadu, with branch offices in Trivandrum (Kerala) and Nagpur (Maharashtra).",
      },
      {
        question: "How long has Tecplore been in operation?",
        answer:
          "Tecplore has been building science learning environments for over 8 years, working with schools, learning centres, and public institutions to bring experiential STEM education to students of all ages.",
      },
    ],
  },
  {
    label: "How It Works",
    faqs: [
      {
        question: "What do guided and self-guided mean?",
        answer:
          "They are our two ways of running a Tecplore space. Guided spaces are led by teachers or facilitators we train. Self-guided spaces do the teaching themselves, through their layout, panels and videos, and suit public science parks. Schools and NGOs can choose either. You bring the space and the context, and we translate it into a learning experience.",
      },
      {
        question: "Do you work with NGOs?",
        answer:
          "Yes. We start with a needs assessment covering age group, language, attendance and your programme goals. We then provide an end-to-end solution and train your facilitators, so the programme can continue without us on site.",
      },
      {
        question: "We don't have anyone to run sessions. Can this still work?",
        answer:
          "Yes. A self-guided space needs no staff on your side. The learning stations come with their learning built in, through panels and videos, so the space teaches on its own.",
      },
      {
        question: "Can we buy just the learning stations?",
        answer:
          "We are not just a vendor who fabricates and installs models. A learning station without its learning layer is soon left unused, so every one comes with interpretation, prompts and a way to capture what visitors learned. That layer can be light or deep, but it is never zero. A self-guided space is our simplest option, and it still includes it.",
      },
      {
        question: "How will we know it worked?",
        answer:
          "It depends on how the space runs. Guided spaces give you worksheet results, concept-check scores, attendance and teacher or facilitator feedback, with before-and-after scores and learner stories for structured programmes. Self-guided spaces give you footfall and dwell observations, question-board themes and QR scan counts.",
      },
    ],
  },
  {
    label: "Learning Stations",
    faqs: [
      {
        question: "What kinds of learning stations does Tecplore offer?",
        answer:
          "Our learning stations span physics, chemistry, biology, space science, robotics, and environmental science. Each one is designed around one concept, such as Bernoulli's principle or river erosion, so people can touch, experiment, and observe it for themselves rather than just read about it.",
      },
      {
        question: "Can learning stations be customised for a specific curriculum or theme?",
        answer:
          "Yes. We work closely with your institution to align learning stations with your academic curriculum, space constraints, age groups, and thematic goals. Custom branding and language options are also available.",
      },
      {
        question: "Are the learning stations suitable for all age groups?",
        answer:
          "Our learning stations are designed for students from Class 6 to Class 12. Activity complexity and safety features are tailored to the target age group during the assessment phase.",
      },
      {
        question: "Can public spaces like parks, museums or malls install Tecplore learning stations?",
        answer:
          "Absolutely. We regularly work with libraries, science museums, community centres, and family entertainment venues. Our learning stations are built with durable materials for high-traffic environments, and we plan maintenance with you so the space stays in use year after year.",
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
          "The easiest first step is to book a 30-minute context-setting call through our contact page, or email us at info@tecplore.com. We'll understand your needs and your space, and put together a tailored proposal with no commitment required at that stage.",
      },
      {
        question: "Does Tecplore work with the school's existing curriculum?",
        answer:
          "Yes. During the Assessment phase, our team maps your institution's current curriculum and learning objectives to our learning station and activity library. We integrate rather than replace: our programmes are designed to complement classroom teaching.",
      },
      {
        question: "Are Tecplore's activities safe for young students?",
        answer: (
          <>
            Safety is built into every product and programme we design.{" "}
            <Confirm id="safety">All learning stations meet applicable safety standards</Confirm>,
            materials are age-appropriate, and our team trains educators on supervision protocols.
            For tool-based activities, safety gear and structured guidelines are always included.
          </>
        ),
      },
    ],
  },
];

const categories = allCategories.filter((c) => SHOW_MAKER_SPACE || c.label !== "Maker Spaces");

function FAQItem({ faq, open, onToggle }: { faq: FAQ; open: boolean; onToggle: () => void }) {
  return (
    <div className="surface-card overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="font-medium text-foreground leading-snug">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* Answers stay in the page when closed, so search engines can read them. */}
      <div
        aria-hidden={!open}
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-body text-sm leading-relaxed border-t border-border pt-4">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // Only one answer is open at a time.
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const displayed = activeCategory
    ? categories.filter((c) => c.label === activeCategory)
    : categories;

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Tecplore's learning stations and partnerships."
        image="/photos/placeholders/students.jpg"
        illustration
      />

      {/* Category Filter */}
      <div className="bg-background border-b border-border sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-3 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? "chip-active" : "chip"}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCategory(c.label === activeCategory ? null : c.label)}
              className={activeCategory === c.label ? "chip-active" : "chip"}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
        <div className="space-y-12">
          {displayed.map((category, ci) => (
            <div key={ci}>
              <h2 className="section-label mb-4">
                {category.label}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq) => (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    open={openQuestion === faq.question}
                    onToggle={() => setOpenQuestion((q) => (q === faq.question ? null : faq.question))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 surface-card bg-muted px-8 py-10 text-center">
          <p className="text-body font-medium text-lg mb-1">Still have questions?</p>
          <p className="text-muted-foreground text-sm mb-6">Our team is happy to walk you through anything, no commitment needed.</p>
          <Button asChild>
            <Link href="/contact">
              <Mail />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
