import Confirm from "@/components/shared/Confirm";
import SolutionPage, { type SolutionContent } from "@/components/Solutions/SolutionPage";
import { SHOW_CONFIRM_HIGHLIGHTS } from "@/lib/confirm";
import { pageMetadata } from "@/lib/seo";
import StationPicks from "@/components/Solutions/StationPicks";

export const metadata = pageMetadata(
  "Self-Guided Science Parks",
  "Self-guided science parks for municipal corporations, theme parks and apartment communities. The space does the teaching, with no staff needed on your side.",
  "/solutions/science-parks"
);

const content: SolutionContent = {
  href: "/solutions/science-parks",
  model: "Self-guided",
  pitch: "A self-guided science park your visitors explore on their own, and come back to",
  subtitle: "Ideal for municipal corporations, theme parks and apartment communities. No staff needed on your side.",
  heroImage: "/photos/interactive-exhibits/Pulley2.avif",
  whoRunsIt: "The space itself, through its layout, signage and QR content.",
  outcome: "A landmark families stay at and come back to.",
  stepsHeading: "The space does the facilitator's job",
  steps: [
    {
      title: "Stations that teach themselves",
      text: "We pick stations that need no setup, supervision or consumables, so visitors can start on their own.",
    },
    {
      title: "A trail, not a cluster",
      text: "A start panel with a welcome and map, 4 to 6 stations in a loop, and an end board that asks \"What did you discover?\"",
    },
    {
      title: "Station panels",
      text: (
        <Confirm id="station-panels">
          Every station has a short panel with what to look for and one sentence of science.
        </Confirm>
      ),
    },
    {
      title: "QR videos",
      text: (
        <Confirm id="station-panels">
          A QR code on each station opens a 60-second video in the regional language.
        </Confirm>
      ),
    },
    {
      title: "A question wall",
      text: "Visitors leave their questions on a wall or chalkboard. We collect them each month and post the answers back.",
    },
    {
      title: "Built to last outdoors",
      text: (
        <Confirm id="outdoors">
          Outdoor-grade build, vandal resistance, and an annual maintenance contract keep the trail in use.
        </Confirm>
      ),
    },
  ],
  evidence: [
    "Footfall and dwell observations",
    "Question-board themes showing what visitors are curious about",
    "QR scan counts for each station",
  ],
  // No completed project yet, so this only shows while highlights are on.
  caseStudy: SHOW_CONFIRM_HIGHLIGHTS
    ? {
        name: <Confirm id="parks-case">Science park project</Confirm>,
        summary: <Confirm id="parks-case">Project details and photos to be added.</Confirm>,
        photoGroup: "parks",
      }
    : undefined,
  ctaTitle: "Planning a science park?",
  ctaText: "Tell us about your site and who visits it, and we'll talk through how the trail could work.",
};

export default function ScienceParksPage() {
  return (
    <SolutionPage content={content}>
      <StationPicks
        tag="parks"
        heading="Stations that suit science parks"
        text={
          <Confirm id="supervision">
            These stations work without supervision, so they are our first choice for a self-guided trail.
          </Confirm>
        }
      />
    </SolutionPage>
  );
}
