"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Mail } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";

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
          "We design science learning experiences for NGO and CSR programmes, schools and public spaces across India. We bring together interactive exhibits, maker spaces and educator training, so children learn science by doing. Exhibits are the instrument; the learning is the product.",
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
    label: "How It Works",
    faqs: [
      {
        question: "What are Explore, Discover and Create?",
        answer:
          "They are our three ways of running a Tecplore space. Explore is self-guided, so the space itself does the teaching, and suits parks, malls and libraries. Discover is guided by teachers we train, and suits schools and learning centres. Create is a programme we design with you, run by trained facilitators, and suits NGOs and CSR teams. All three follow the same learning arc; what changes is who carries it.",
      },
      {
        question: "Do you work with NGOs and CSR programmes?",
        answer:
          "Yes. We start with a needs assessment covering age group, language, attendance and your funder's indicators, then co-design modules and train your facilitators, so the programme can continue without us on site.",
      },
      {
        question: "We don't have anyone to run sessions. Can this still work?",
        answer:
          "Yes. Explore needs no staff on your side. The exhibits come with their learning built in, through panels, challenge cards and videos, so the space teaches on its own.",
      },
      {
        question: "Can we buy just the exhibits?",
        answer:
          "We don't send exhibits on their own, because an exhibit without its learning layer is soon left unused. Every Tecplore exhibit comes with interpretation, prompts and a way to capture what visitors learned. That layer can be light or deep, but it is never zero. Explore is our simplest option, and it still includes it.",
      },
      {
        question: "How will we know it worked?",
        answer:
          "It depends on the model. Explore gives you footfall and dwell observations, question-board themes and QR scan counts. Discover gives you worksheet results, concept-check scores and teacher feedback. Create gives you an impact report for funders, with pre and post scores, attendance, stories and photos.",
      },
    ],
  },
  {
    label: "Interactive Exhibits",
    faqs: [
      {
        question: "What kinds of interactive exhibits does Tecplore offer?",
        answer:
          "Our exhibits span physics, chemistry, biology, space science, robotics, and environmental science. Each exhibit is designed around one concept, such as Bernoulli's principle or river erosion, so people can touch, experiment, and observe it for themselves rather than just read about it.",
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
        question: "Can public spaces like parks, museums or malls install Tecplore exhibits?",
        answer:
          "Absolutely. We regularly work with libraries, science museums, community centres, and family entertainment venues. Our exhibits are built with durable materials for high-traffic environments, and we plan maintenance with you so the space stays in use year after year.",
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
          "The easiest first step is to book a 30-minute design call through our contact page, or email us at info@tecplore.com. We'll understand your needs and your space, and put together a tailored proposal with no commitment required at that stage.",
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
        subtitle="Everything you need to know about Tecplore's exhibits, maker spaces, and partnerships."
      />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">FAQ</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-background border-b border-border sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap gap-2">
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
      <div className="max-w-4xl mx-auto px-6 py-14">
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
