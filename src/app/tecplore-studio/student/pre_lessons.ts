export interface PreLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  jsonFile: string;
  isTranslated?: boolean; // New Field
  audioFile?: string;     // New Field
}

export const PRE_LESSONS: PreLesson[] = [
  {
    id: "born_to_run",
    title: "Born To Run",
    description:
      "A thrilling wildlife documentary that reveals how animals run, survive, and thrive in nature.",
    thumbnail: "/photos/pre_lesson/born_to_run.avif",
    jsonFile: "/photos/pre_lesson/Born_To_Run.json",
    isTranslated: false
  },
  {
  id: "human_body_tamil",
  title: "Human Body (Tamil)",
  description: "Explore the parts of the human body with fun activities. (Translated Audio)",
  thumbnail: "/photos/pre_lesson/human_body_101.avif",
  jsonFile: "/photos/pre_lesson/Human_Body_101_Tamil.json",
  isTranslated: true,
  audioFile: "/audio/pre_lesson/human_body_tamil.mp3"
},
{
  id: "human_heart_tamil",
  title: "Human Heart (Tamil)",
  description: "Learn how the heart works with animations and interactive questions. (Translated Audio)",
  thumbnail: "/photos/pre_lesson/human_heart_101.avif",
  jsonFile: "/photos/pre_lesson/Human_Heart_101_Tamil.json",
  isTranslated: true,
  audioFile: "/audio/pre_lesson/human_heart_tamil.mp3"
}

];