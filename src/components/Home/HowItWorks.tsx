import Link from "next/link";
import { ArrowRight, Check, Compass, GraduationCap, Handshake } from "lucide-react";

// The three engagement models from the Positioning & Proposal Framework.
const models = [
  {
    icon: Compass,
    name: "Explore",
    type: "Self-guided",
    bestFor: "Public parks, malls, libraries, municipal and CSR installations",
    carriedBy: "The space itself, through its layout, signage, challenge cards and QR content",
    includesLead: "",
    includes: [
      "Trail layout",
      "Try, Notice, Why panels",
      "Family challenge cards",
      "QR micro-videos",
      "Question board",
    ],
    outcome: "A landmark families stay at and come back to",
    href: "/solutions/public-spaces",
    linkLabel: "Explore for public spaces",
  },
  {
    icon: GraduationCap,
    name: "Discover",
    type: "Guided",
    bestFor: "Schools with occasional facilitation, and learning centres",
    carriedBy: "Your teachers, trained by Tecplore, with periodic Tecplore visits",
    includesLead: "Everything in Explore, plus:",
    includes: [
      "Curriculum map by class",
      "Lesson plans and worksheets",
      "Teacher training",
      "Visit kit",
    ],
    outcome: "Results tied to the syllabus, with low teacher load",
    href: "/solutions/schools",
    linkLabel: "Discover for schools",
  },
  {
    icon: Handshake,
    name: "Create",
    type: "Partnered programme",
    bestFor: "NGOs, CSR programmes and community learning hubs",
    carriedBy: "Tecplore-trained facilitators running a co-designed programme",
    includesLead: "Everything in Discover, plus:",
    includes: [
      "Tailor-made modules",
      "Facilitator training",
      "Maker space sessions",
      "Baseline and endline assessment",
    ],
    outcome: "Measurable outcomes you can report to a funder",
    href: "/solutions/ngos-csr",
    linkLabel: "Create for NGOs and CSR",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-muted px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="heading-section mb-4">One learning journey, three ways to run it</h2>
          <p className="text-lg leading-relaxed text-body">
            Every Tecplore space follows the same learning arc. What changes is who carries it: the
            space itself, a teacher, or a trained facilitator.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <article key={model.name} className="surface-card flex flex-col p-8">
                <Icon className="mb-4 h-7 w-7 text-primary" strokeWidth={1.5} />
                <p className="section-label mb-1">{model.type}</p>
                <h3 className="mb-5 text-2xl font-bold text-foreground">{model.name}</h3>

                <dl className="mb-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Best for</dt>
                    <dd className="mt-1 leading-relaxed text-body">{model.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Who runs it</dt>
                    <dd className="mt-1 leading-relaxed text-body">{model.carriedBy}</dd>
                  </div>
                </dl>

                <p className="mb-2 text-sm font-semibold text-foreground">
                  {model.includesLead || "What's included:"}
                </p>
                <ul className="mb-6 flex-1 space-y-2">
                  {model.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-body">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="border-t border-border pt-4 text-sm font-semibold text-foreground">
                  {model.outcome}
                </p>
                <Link
                  href={model.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {model.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-body">
          Don&apos;t have anyone to run it? <strong className="text-foreground">Explore needs no staff on your side.</strong>
        </p>
      </div>
    </section>
  );
}
