import Confirm from "@/components/shared/Confirm";
import SolutionPage, { type SolutionContent } from "@/components/Solutions/SolutionPage";
import StationPicks from "@/components/Solutions/StationPicks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Science Programmes for NGOs",
  "A science learning programme designed with students at the centre, facilitated by your team, guided by our curriculum and evaluation.",
  "/solutions/ngos"
);

const content: SolutionContent = {
  href: "/solutions/ngos",
  model: "Guided or self-guided",
  pitch: "A programme designed with students at the centre, facilitated by your team, guided by our curriculum and evaluation",
  subtitle: "Ideal for NGOs running structured interventions.",
  heroImage: "/photos/interactive-exhibits/SoundPatterns3.avif",
  whoRunsIt: "Your facilitators, trained by Tecplore, with our curriculum and evaluation behind them.",
  outcome: "Education as continuous improvement: data-backed, with quantifiable progress.",
  stepsHeading: "Built around your community",
  steps: [
    {
      title: "Needs assessment",
      text: "We start with the age group, language, attendance pattern, space and your programme goals.",
    },
    {
      title: "End-to-end solution",
      text: "From space layout and curriculum to learning stations, shaped by local context such as water, farming and festivals.",
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
  // Photos are added from the /site-admin page.
  caseStudy: {
    name: "Aarvam Learning Center, Trichy",
    summary: <Confirm id="aarvam">We set up the space at Aarvam and run the learning there.</Confirm>,
    photoGroup: "aarvam",
    quote:
      "The implementation of our maker space has fundamentally changed how students approach scientific inquiry. The level of engagement and depth of understanding we're seeing is remarkable.",
    quoteSource: "Aarvam Learning Center, Trichy",
  },
  ctaTitle: "Planning a science programme?",
  ctaText: "Tell us about your community and your goals, and we'll talk through what a programme could look like.",
};

export default function NgosPage() {
  return (
    <SolutionPage content={content}>
      <StationPicks
        tag="ngos"
        heading="Stations that suit community programmes"
        text="These are good starting points. We choose the final set with you, around your community and local context such as water, farming and festivals."
      />
    </SolutionPage>
  );
}
