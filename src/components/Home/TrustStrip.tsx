// Proof points. Plain text, so they also appear in the page HTML for search engines.
const proofPoints = [
  { value: "8+ years", label: "designing and building science learning spaces" },
  { value: "20+ years", label: "at ISRO on space systems: Prasanna G, founding partner" },
  { value: "TU Eindhoven", label: "Master's and two patents: Vivek Devaraj, founding partner" },
];

export default function TrustStrip() {
  return (
    <section aria-labelledby="why-tecplore" className="border-b border-border bg-muted px-6 py-12">
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-label">Why Tecplore</p>
        <h2 id="why-tecplore" className="mt-2 text-2xl font-semibold text-foreground">
          Real science and engineering experience behind every project
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.value} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-body">{point.label}</dt>
              <dd className="text-2xl font-bold text-primary">{point.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
