import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import PhotoGroup from "@/components/shared/PhotoGroup";
import { Button } from "@/components/ui/button";
import { DESIGN_CALL, SOLUTION_LINKS } from "@/lib/site";

export interface CaseStudy {
  name: React.ReactNode;
  summary: React.ReactNode;
  photoGroup: "aarvam" | "solapur" | "parks";
  quote?: string;
  quoteSource?: string;
}

export interface SolutionContent {
  /** The page's own path, used to work out the previous and next solutions. */
  href: string;
  model: React.ReactNode;
  pitch: string;
  subtitle: string;
  heroImage: string;
  whoRunsIt: string;
  outcome: string;
  stepsHeading: React.ReactNode;
  steps: { title: string; text: React.ReactNode }[];
  evidence?: string[];
  caseStudy?: CaseStudy;
  ctaTitle: string;
  ctaText: string;
}

/** Shared layout for the NGOs, Schools and Science Parks pages. */
export default function SolutionPage({
  content,
  children,
}: {
  content: SolutionContent;
  children?: React.ReactNode;
}) {
  // Previous and next loop round, so every page links to both of the others.
  const index = SOLUTION_LINKS.findIndex((link) => link.href === content.href);
  const count = SOLUTION_LINKS.length;
  const previous = SOLUTION_LINKS[(index - 1 + count) % count];
  const next = SOLUTION_LINKS[(index + 1) % count];

  return (
    <div className="min-h-screen bg-background">
      <PageHero title={content.pitch} subtitle={content.subtitle} image={content.heroImage}>
        <Button asChild size="lg">
          <Link href={DESIGN_CALL.href}>{DESIGN_CALL.label}</Link>
        </Button>
      </PageHero>

      {/* The model at a glance */}
      <section className="border-b border-border bg-muted px-6 py-10">
        <dl className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <dt className="section-label mb-2">Our model</dt>
            <dd className="text-lg font-semibold text-foreground">{content.model}</dd>
          </div>
          <div>
            <dt className="section-label mb-2">Who runs it</dt>
            <dd className="leading-relaxed text-body">{content.whoRunsIt}</dd>
          </div>
          <div>
            <dt className="section-label mb-2">What you get</dt>
            <dd className="leading-relaxed text-body">{content.outcome}</dd>
          </div>
        </dl>
      </section>

      {/* How it works here */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="heading-section mb-10">{content.stepsHeading}</h2>
          <div
            className={`grid gap-6 md:grid-cols-2 ${
              content.steps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {content.steps.map((step) => (
              <div key={step.title} className="surface-card p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-body">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* Case study */}
      {content.caseStudy && (
        <section className="bg-muted px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-label mb-3">Case Study</p>
            <h2 className="heading-section mb-4">{content.caseStudy.name}</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-body">{content.caseStudy.summary}</p>
            <PhotoGroup group={content.caseStudy.photoGroup} />
            {content.caseStudy.quote && (
              <blockquote className="mt-8 max-w-3xl border-l-4 border-primary pl-6">
                <p className="text-lg italic leading-relaxed text-body">
                  &ldquo;{content.caseStudy.quote}&rdquo;
                </p>
                {content.caseStudy.quoteSource && (
                  <footer className="mt-3 text-sm font-semibold text-foreground">
                    {content.caseStudy.quoteSource}
                  </footer>
                )}
              </blockquote>
            )}
          </div>
        </section>
      )}

      {/* Evidence */}
      {content.evidence && (
        <section className="bg-muted px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-label mb-3">Evidence</p>
            <h2 className="heading-section mb-8">How you&apos;ll know it worked</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {content.evidence.map((item) => (
                <li key={item} className="flex gap-3 text-body">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Previous and next solution */}
      <nav aria-label="Other solutions" className="px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          <Link href={previous.href} className="surface-card-interactive flex items-center gap-4 p-5">
            <ArrowLeft className="h-5 w-5 flex-shrink-0 text-primary" />
            <span>
              <span className="section-label block">Previous</span>
              <span className="text-lg font-semibold text-foreground">{previous.name}</span>
            </span>
          </Link>
          <Link
            href={next.href}
            className="surface-card-interactive flex items-center justify-end gap-4 p-5 text-right"
          >
            <span>
              <span className="section-label block">Next</span>
              <span className="text-lg font-semibold text-foreground">{next.name}</span>
            </span>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
          </Link>
        </div>
      </nav>

      <CtaSection title={content.ctaTitle} text={content.ctaText} />
    </div>
  );
}
