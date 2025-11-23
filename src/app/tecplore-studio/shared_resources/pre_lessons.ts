export interface PreLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  jsonFile: string;
  isTranslated?: boolean; // New Field
  audioFile?: string;     // New Field
  isLocked?: boolean;
}

export const PRE_LESSONS: PreLesson[] = [
 
  {
  id: "human_body_tamil",
  title: "Human Body (Tamil)",
  description: "Explore the parts of the human body. (Translated Audio)",
  thumbnail: "/photos/pre_lesson/human_body_101.avif",
  jsonFile: "/photos/pre_lesson/Human_Body_101_Tamil.json",
  isTranslated: true,
  audioFile: "/audio/pre_lesson/human_body_tamil.mp3"
},

 {
    id: "born_to_run",
    title: "Born To Run",
    description:
      "A thrilling wildlife documentary that reveals how animals thrive in nature.",
    thumbnail: "/photos/pre_lesson/born_to_run.avif",
    jsonFile: "/photos/pre_lesson/Born_To_Run.json",
    isTranslated: false
  },

{
  id: "human_heart_tamil",
  title: "Human Heart (Tamil)",
  description: "Learn how the heart works with animations. (Translated Audio)",
  thumbnail: "/photos/pre_lesson/human_heart_101.avif",
  jsonFile: "/photos/pre_lesson/Human_Heart_101_Tamil.json",
  isTranslated: true,
  audioFile: "/audio/pre_lesson/human_heart_tamil.mp3"
},

 // Locked lessons

    {
    id: "how_to_translate",
    title: "Sync & Localize Audio in Your Students’ Language",
    description: "Learn How to make a translated voiceover and sync!",
    thumbnail: "/photos/pre_lesson/how_to_get.avif",
    jsonFile: "/photos/pre_lesson/Jupiter_lesson.json",
    isLocked: true,
  },
  {
    id: "jupiter_god_father",
    title: "Jupiter - God Father Planet",
    description: "Contact us to get this!",
    thumbnail: "/photos/pre_lesson/jupiter_god_father.avif",
    jsonFile: "/photos/pre_lesson/Jupiter_lesson.json",
    isLocked: true,
  },

  {
    id: "deep_ocean",
    title: "Deep Ocean",
    description: "Contact us to get this!",
    thumbnail: "/photos/pre_lesson/deep_ocean.avif",
    jsonFile: "/photos/pre_lesson/Deep_Ocean_Lesson.json",
    isLocked: true,
    isTranslated: true,
    audioFile: "/audio/pre_lesson/deep_ocean_tamil.mp3"
  },

];