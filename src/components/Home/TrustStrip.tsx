import Confirm from "@/components/shared/Confirm";
import type { ConfirmId } from "@/lib/confirm";

// Proof points. Plain text, so they also appear in the page HTML for search engines.
const proofPoints: { value: string; label: string; confirm?: ConfirmId }[] = [
  { value: "In-house", label: "design and development of learning stations, worksheets and evaluation" },
  { value: "Decades of experience", label: "in industry and research, including ISRO and Nissan" },
  { value: "8+ years", label: "designing and building science learning spaces" },
];

export default function TrustStrip() {
  return (
    <section aria-labelledby="why-tecplore" className="border-y border-border bg-muted px-6 py-14">
      <div className="mx-auto max-w-6xl text-center">
        <p className="section-label">Why Tecplore</p>
        <h2 id="why-tecplore" className="mt-2 text-2xl font-semibold text-foreground">
          Every space needs its own plan
        </h2>
        <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-body">
          The right set-up for rural children is different from the right set-up for city children.
          Even in one city, two schools can need different things. We specialise in bridging that gap
          and making the learning effective.
        </p>
        <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.value} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm text-body">
                <Confirm id={point.confirm}>{point.label}</Confirm>
              </dt>
              <dd className="text-xl font-bold text-primary">{point.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
