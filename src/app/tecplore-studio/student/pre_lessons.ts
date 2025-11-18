
export interface PreLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  jsonFile: string;
}

export const PRE_LESSONS: PreLesson[] = [
  {
    id: "born_to_run",
    title: "Born To Run",
    description:
      "A thrilling wildlife documentary that reveals how animals run, survive, and thrive in nature.",
    thumbnail: "/photos/pre_lesson/born_to_run.avif",
    jsonFile: "/photos/pre_lesson/born_to_run.json",
  },
  {
    id: "math_fractions",
    title: "Fun with Fractions",
    description:
      "Learn fractions using real-life examples and visual quizzes.",
    thumbnail: "/photos/pre_lesson/fractions.avif",
    jsonFile: "/photos/pre_lesson/fractions.json",
  },
  {
    id: "space_moon",
    title: "Moon Mission",
    description:
      "Understand the phases of the Moon and lunar exploration through interactive video.",
    thumbnail: "/photos/pre_lesson/moon.jpg",
    jsonFile: "/photos/pre_lesson/moon.json",
  },
  {
    id: "physics_gravity",
    title: "Gravity Magic",
    description:
      "Discover how gravity works using illustrations, short clips, and questions.",
    thumbnail: "/photos/pre_lesson/gravity.jpg",
    jsonFile: "/photos/pre_lesson/gravity.json",
  },
  {
    id: "plants_biology",
    title: "Plants: Nature's Factories",
    description:
      "The process of photosynthesis explained for young minds with stepwise checkpoints.",
    thumbnail: "/photos/pre_lesson/plants.jpg",
    jsonFile: "/photos/pre_lesson/plants.json",
  },
  {
    id: "geo_rivers",
    title: "Life of a River",
    description:
      "Track how rivers shape geography and support communities, with participatory Q&As.",
    thumbnail: "/photos/pre_lesson/rivers.jpg",
    jsonFile: "/photos/pre_lesson/rivers.json",
  },
  {
    id: "space_astro",
    title: "Meet the Astronauts",
    description:
      "What does an astronaut do? Discover with a journey through space lessons.",
    thumbnail: "/photos/pre_lesson/astronauts.jpg",
    jsonFile: "/photos/pre_lesson/astronauts.json",
  },
  {
    id: "math_shapes",
    title: "Shapes in Our World",
    description:
      "Find out about 2D and 3D shapes around us, learn through drawing and real examples.",
    thumbnail: "/photos/pre_lesson/shapes.jpg",
    jsonFile: "/photos/pre_lesson/shapes.json",
  },
  {
    id: "science_body",
    title: "Human Body Systems",
    description:
      "Explore the organs and their work using animated stories and checkpoint quizzes.",
    thumbnail: "/photos/pre_lesson/body.jpg",
    jsonFile: "/photos/pre_lesson/body.json",
  },
  {
    id: "tech_robotics",
    title: "Robotics for Kids",
    description:
      "Introduction to robots, sensors, and actuation, simplified for young learners.",
    thumbnail: "/photos/pre_lesson/robotics.jpg",
    jsonFile: "/photos/pre_lesson/robotics.json",
  },
];
