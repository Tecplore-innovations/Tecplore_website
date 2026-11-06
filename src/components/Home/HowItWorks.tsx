import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Compass, GraduationCap, Star } from "lucide-react";

// Two ways to run a Tecplore space. Schools and NGOs can be on either side.
const models = [
  {
    icon: GraduationCap,
    name: "Guided",
    bestFor: "Schools and NGOs with teachers or facilitators to lead sessions",
    carriedBy: "Your teachers or facilitators, trained by Tecplore, with periodic Tecplore visits",
    includes: [
      "Curriculum map by class",
      "Lesson plans and worksheets",
      "Teacher and facilitator training",
      "Tailor-made modules",
      "Evaluation of student progress",
    ],
    outcome: "Progress you can quantify, with low load on your team",
    links: [
      { label: "Guided for NGOs", href: "/solutions/ngos" },
      { label: "Guided for schools", href: "/solutions/schools" },
    ],
  },
  {
    icon: Compass,
    name: "Self-Guided",
    bestFor: "Public science parks",
    carriedBy: "The space itself, through its layout, signage and QR content",
    includes: [
      "Trail layout",
      "Station panels",
      "QR micro-videos",
      "Question board",
    ],
    outcome: "A landmark families stay at and come back to",
    links: [{ label: "Self-guided science parks", href: "/solutions/science-parks" }],
  },
];

const journey = ["Your space and context", "Tecplore", "A learning experience"];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-muted px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="heading-section mb-4">One learning journey, two ways to run it</h2>
          <p className="text-lg leading-relaxed text-body">
            A school, NGO or public body brings the space and the context. Tecplore translates it
            into a learning experience.
          </p>
        </div>

        <ol className="mb-12 flex flex-col items-center justify-center gap-3 md:flex-row">
          {journey.map((step, index) => (
            <li key={step} className="flex flex-col items-center gap-3 md:flex-row">
              <span
                className={
                  index === 1
                    ? "rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground"
                    : "rounded-full border border-input bg-background px-5 py-2 font-semibold text-foreground"
                }
              >
                {step}
              </span>
              {index < journey.length - 1 && (
                <>
                  <ArrowRight className="hidden h-5 w-5 text-primary md:block" />
                  <ArrowDown className="h-5 w-5 text-primary md:hidden" />
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-2">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <article key={model.name} className="surface-card flex flex-col p-8">
                <Icon className="mb-4 h-7 w-7 text-primary" strokeWidth={1.5} />
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

                <p className="mb-2 text-sm font-semibold text-foreground">What&apos;s included:</p>
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
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {model.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 flex items-center justify-center gap-3 text-center text-lg font-semibold text-foreground">
          <Star aria-hidden className="star-glow h-7 w-7 flex-shrink-0" />
          We recommend guided for schools and NGOs. Self-guided can also fit.
        </p>

        <p className="mt-4 text-center text-body">
          Don&apos;t have anyone to run it?{" "}
          <strong className="text-foreground">Self-guided spaces need no staff on your side.</strong>
        </p>
      </div>
    </section>
  );
}
