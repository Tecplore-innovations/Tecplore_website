import ResourceSamples from "@/components/Solutions/ResourceSamples";
import SolutionPage, { type SolutionContent } from "@/components/Solutions/SolutionPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Science Labs for Schools",
  "A hands-on science lab mapped to your syllabus, with teacher training, lesson plans and worksheets, so teachers can run it without extra work.",
  "/solutions/schools"
);

const content: SolutionContent = {
  href: "/solutions/schools",
  model: "Discover",
  modelType: "Guided",
  pitch: "A lab students use every week, mapped to your syllabus, that teachers can run without extra work",
  subtitle: "For schools with occasional facilitation, and for learning centres.",
  heroImage: "/photos/interactive-exhibits/CentrifugalForce3.avif",
  whoRunsIt: "Your teachers, trained by Tecplore, with periodic Tecplore visits.",
  outcome: "Results tied to the syllabus, with low teacher load.",
  stepsHeading: "Your teachers lead, and we make it easy",
  steps: [
    {
      title: "Curriculum map",
      text: "One page per exhibit showing the class, the chapter (CBSE, NCERT or Samacheer Kalvi) and the learning outcome.",
    },
    {
      title: "Teacher training",
      text: "A half-day training makes your teachers the facilitators, with a short video to refer back to.",
    },
    {
      title: "Ready lesson plans",
      text: "A 40-minute lesson plan and ready worksheets for each exhibit, so there is nothing extra to prepare.",
    },
    {
      title: "A complete session",
      text: "Each session runs from welcome and orientation, through free exploration and a guided activity, to a worksheet, reflection and a class discovery wall.",
    },
    {
      title: "Tecplore Days",
      text: "Each term, our staff run sessions for a whole grade, which also work well for open days and parent visits.",
    },
    {
      title: "Results you can share",
      text: "A simple before-and-after concept check for each exhibit, shared with the principal each term.",
    },
  ],
  evidence: ["Worksheet results", "Concept-check scores", "Teacher feedback"],
  ctaTitle: "Planning a science lab for your school?",
  ctaText: "Tell us your classes and your syllabus, and we'll talk through how it could fit your timetable.",
};

export default function SchoolsPage() {
  return (
    <SolutionPage content={content}>
      <ResourceSamples />
    </SolutionPage>
  );
}
