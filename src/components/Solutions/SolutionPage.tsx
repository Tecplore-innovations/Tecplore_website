import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { DESIGN_CALL, SOLUTION_LINKS } from "@/lib/site";

export interface SolutionContent {
  /** The page's own path, so it can be left out of the "other solutions" links. */
  href: string;
  model: string;
  modelType: string;
  pitch: string;
  subtitle: string;
  heroImage: string;
  whoRunsIt: string;
  outcome: string;
  stepsHeading: string;
  steps: { title: string; text: string }[];
  evidence: string[];
  ctaTitle: string;
  ctaText: string;
}

/** Shared layout for the Public Spaces, Schools, and NGOs and CSR pages. */
export default function SolutionPage({
  content,
  children,
}: {
  content: SolutionContent;
  children?: React.ReactNode;
}) {
  const otherSolutions = SOLUTION_LINKS.filter((link) => link.href !== content.href);

  return (
    <div className="min-h-screen bg-background">
      <PageHero title={content.pitch} subtitle={content.subtitle} backgroundImage={content.heroImage}>
        <Button asChild size="lg">
          <Link href={DESIGN_CALL.href}>{DESIGN_CALL.label}</Link>
        </Button>
      </PageHero>

      {/* The model at a glance */}
      <section className="border-b border-border bg-muted px-6 py-10">
        <dl className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <dt className="section-label mb-2">Our model</dt>
            <dd className="text-lg font-semibold text-foreground">
              {content.model} ({content.modelType.toLowerCase()})
            </dd>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Evidence */}
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

      <CtaSection title={content.ctaTitle} text={content.ctaText} />

      {/* Other solutions */}
      <section className="px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <span className="text-muted-foreground">Also see:</span>
          {otherSolutions.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              {link.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
