import { forwardRef } from "react";
import Image from "next/image";

const stages = [
  { title: "Space layout", image: "/photos/end-to-end/space-layout.jpg" },
  { title: "Experience design", image: "/photos/end-to-end/experience-design.jpg" },
  { title: "Curriculum design and training", image: "/photos/end-to-end/curriculum-training.jpg" },
  { title: "Supply and installation of learning stations", image: "/photos/end-to-end/supply-installation.jpg" },
];

/** Answers the questions in the homepage hero. */
const ResponseSection = forwardRef<HTMLElement>(function ResponseSection(_props, ref) {
  return (
    <section ref={ref} className="scroll-mt-16 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">What We Do</p>
        <h2 className="heading-section mb-6">We curate the learning experience</h2>
        <p className="max-w-4xl text-lg leading-relaxed text-body">
          We start by understanding the space and its context: whether it is guided or self-guided,
          and who the students are. Then we develop hands-on learning stations, evaluation methods
          and continuous improvements.
        </p>

        <p className="mb-4 mt-8 font-semibold text-foreground">We provide it end to end:</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <li key={stage.title} className="surface-card overflow-hidden">
              <Image
                src={stage.image}
                alt=""
                width={728}
                height={544}
                className="h-auto w-full"
              />
              <p className="p-5 pt-3 font-semibold text-foreground">{stage.title}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-16 max-w-3xl text-center text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          We are <span className="text-primary">not just a vendor</span> who fabricates and installs
          models.
        </p>
      </div>
    </section>
  );
});

export default ResponseSection;
