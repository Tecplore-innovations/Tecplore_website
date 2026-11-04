import SolutionPage, { type SolutionContent } from "@/components/Solutions/SolutionPage";
import { pageMetadata } from "@/lib/seo";
import StationPicks from "@/components/Solutions/StationPicks";

export const metadata = pageMetadata(
  "Science Trails for Public Spaces",
  "Self-guided science trails for parks, malls and libraries. The space does the teaching, with no staff needed on your side.",
  "/solutions/public-spaces"
);

const content: SolutionContent = {
  href: "/solutions/public-spaces",
  model: "Explore",
  modelType: "Self-guided",
  pitch: "A science trail your visitors walk through on their own, and come back to",
  subtitle: "For parks, malls, libraries and municipal or CSR installations. No staff needed on your side.",
  heroImage: "/photos/interactive-exhibits/Pulley2.avif",
  whoRunsIt: "The space itself, through its layout, signage, challenge cards and QR content.",
  outcome: "A landmark families stay at and come back to.",
  stepsHeading: "The space does the facilitator's job",
  steps: [
    {
      title: "Exhibits that teach themselves",
      text: "We pick stations that need no setup, supervision or consumables, so visitors can start on their own.",
    },
    {
      title: "A trail, not a cluster",
      text: "A start panel with a welcome and map, 4 to 6 stations in a loop, and an end board that asks \"What did you discover?\"",
    },
    {
      title: "Try, Notice, Why",
      text: "Every station has a three-line panel: one action, what to look for, and one sentence of science, plus a QR code to a 60-second video in Tamil and English.",
    },
    {
      title: "Family challenge card",
      text: "A stamp or tick sheet at the entry takes a parent and child through the whole trail.",
    },
    {
      title: "A question wall",
      text: "Visitors leave their questions on a wall or chalkboard. We collect them each month and post the answers back.",
    },
    {
      title: "Tecplore Days",
      text: "Weekend activation days with a facilitator, timed to holidays, keep the space visible and give people a reason to return.",
    },
    {
      title: "Built to last outdoors",
      text: "Outdoor-grade build, vandal resistance, and an annual maintenance contract keep the trail in use.",
    },
  ],
  evidence: [
    "Footfall and dwell observations",
    "Question-board themes showing what visitors are curious about",
    "QR scan counts for each station",
  ],
  ctaTitle: "Planning a science trail?",
  ctaText: "Tell us about your site and who visits it, and we'll talk through how the trail could work.",
};

export default function PublicSpacesPage() {
  return (
    <SolutionPage content={content}>
      <StationPicks
        ids={[10, 7, 8, 4, 6, 9]}
        heading="Stations that suit public spaces"
        text="These stations work without supervision, so they are our first choice for a self-guided trail."
      />
    </SolutionPage>
  );
}
