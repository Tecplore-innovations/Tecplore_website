// Proof points. Plain text, so they also appear in the page HTML for search engines.
const proofPoints = [
  { value: "100+", label: "partner schools" },
  { value: "8+ years", label: "building science learning spaces" },
  { value: "20+ years", label: "of ISRO space systems experience on the team" },
  { value: "TU Eindhoven", label: "engineering, with two patents" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why Tecplore" className="border-b border-border bg-muted px-6 py-10">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <div key={point.value} className="flex flex-col-reverse">
            <dt className="mt-1 text-sm text-body">{point.label}</dt>
            <dd className="text-2xl font-bold text-foreground">{point.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
