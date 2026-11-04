import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DESIGN_CALL } from "@/lib/site";

interface CtaSectionProps {
  title?: string;
  text?: string;
}

/** The closing call to action used at the end of sales pages. */
export default function CtaSection({
  title = "Planning a science space?",
  text = "Tell us about your space and who will use it, and we'll talk through the right learning experience for you.",
}: CtaSectionProps) {
  return (
    <section className="bg-accent px-6 py-16 text-center">
      <h2 className="heading-section mb-4">{title}</h2>
      <p className="mx-auto mb-8 max-w-2xl text-body">{text}</p>
      <Button asChild size="lg">
        <Link href={DESIGN_CALL.href}>{DESIGN_CALL.label}</Link>
      </Button>
    </section>
  );
}
