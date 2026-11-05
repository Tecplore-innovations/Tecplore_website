import SolutionPage, { type SolutionContent } from "@/components/Solutions/SolutionPage";
import StationPicks from "@/components/Solutions/StationPicks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Science Programmes for NGOs and CSR",
  "Science learning programmes designed with you and delivered by your people, with outcomes you can show your funder.",
  "/solutions/ngos-csr"
);

const content: SolutionContent = {
  href: "/solutions/ngos-csr",
  model: "Create",
  modelType: "Partnered programme",
  pitch: "A programme designed with you, delivered by your people, with outcomes you can show your funder",
  subtitle: "For NGOs, CSR programmes and community learning hubs.",
  heroImage: "/photos/interactive-exhibits/SoundPatterns3.avif",
  whoRunsIt: "Tecplore-trained facilitators running a co-designed programme.",
  outcome: "Measurable outcomes you can report to a funder.",
  stepsHeading: "Built around your community and your funder",
  steps: [
    {
      title: "Needs assessment",
      text: "We start with the age group, language, attendance pattern, space and your funder's indicators.",
    },
    {
      title: "Co-designed modules",
      text: "We combine exhibits, maker space builds and local context such as water, farming and festivals.",
    },
    {
      title: "Facilitator training",
      text: "We train your facilitators, so the programme carries on without Tecplore on site.",
    },
    {
      title: "Measurement from day one",
      text: "Baseline, endline, attendance and a few learner stories with photos, tracked from the start.",
    },
  ],
  evidence: [
    "An impact report for your funders",
    "Before-and-after scores",
    "Attendance records",
    "Learner stories and photos",
  ],
  ctaTitle: "Planning a science programme?",
  ctaText: "Tell us about your community and your funder's goals, and we'll talk through what a programme could look like.",
};

export default function NgosCsrPage() {
  return (
    <SolutionPage content={content}>
      <StationPicks
        ids={[10, 6, 8, 3, 5, 9]}
        heading="Stations that suit community programmes"
        text="These are good starting points. We choose the final set with you, around your community and local context such as water, farming and festivals."
      />
    </SolutionPage>
  );
}
