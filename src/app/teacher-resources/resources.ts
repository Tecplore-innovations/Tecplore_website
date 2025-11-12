export interface Resource {
  id: number;
  title: string;
  type: "video" | "document"; 
  subject: string;
  level: string;
  thumbnail: string;
  contentUrl: string;
  createdAt: string; 
  language: string;  
  content: "Tecplore" | "Community";
}

// Helper to create a resource and auto-add createdAt
function createResource(resource: Omit<Resource, "createdAt">): Resource {
  return {
    ...resource,
    createdAt: new Date().toISOString(),
  };
}

export const resources: Resource[] = [
  createResource({
    id: 1,
    title: "Make a Straw Plane",
    type: "document",
    subject: "Aeronautics-Flight Dynamics",
    level: "Grade 6-8",
    thumbnail: "/teacher-resources/images/physics8_thumb.avif",
    contentUrl: "/teacher-resources/articles/Make a Straw Plane.pdf",
    language: "English",
    content: "Community"
  }),
  createResource({
    id: 2,
    title: "Chemistry Lab Safety Video",
    type: "video",
    subject: "Chemistry-Lab",
    level: "High School",
    thumbnail: "/teacher-resources/images/chem_safety_thumb.avif",
    contentUrl: "https://www.youtube.com/watch?v=PhwyPQ0_5K0&pp=ygUnY2hlbWlzdHJ5IGxhYiBzYWZldHkgcnVsZXMgZm9yIHN0dWRlbnRz",
    language: "English",
    content: "Community"
  }),
  createResource({
    id: 3,
    title: "Mathematics of Planet Earth",
    type: "document",
    subject: "Mathematics",
    level: "High School",
    thumbnail: "/teacher-resources/images/math_lesson_thumb.avif",
    contentUrl: "/teacher-resources/articles/Maths of Planet Earth.pdf",
    language: "English",
    content: "Community"
  }),
   createResource({
    id: 4,
    title: "What is the Universe",
    type: "document",
    subject: "Physics-Astronomy",
    level: "Grade 9-10",
    thumbnail: "/teacher-resources/images/universe.avif",
    contentUrl: "/teacher-resources/articles/What is the Universe.pdf",
    language: "Tamil",
    content: "Community"
  }),
   createResource({
    id: 5,
    title: "Our Solar System and Beyond",
    type: "document",
    subject: "Physics-Astronomy",
    level: "Grade 9-10",
    thumbnail: "/teacher-resources/images/solar system and beyond.avif",
    contentUrl: "/teacher-resources/articles/Our Solar System and Beyond.pdf",
    language: "Tamil",
    content: "Community"
  }),
   createResource({
    id: 6,
    title: "The Beginning of the Universe",
    type: "document",
    subject: "Physics-Astronomy",
    level: "Grade 9-10",
    thumbnail: "/teacher-resources/images/birth of universe.avif",
    contentUrl: "/teacher-resources/articles/The Beginning of the Universe.pdf",
    language: "Tamil",
    content: "Community"
  }),
   createResource({
    id: 7,
    title: "Light-Years and Time Travel",
    type: "document",
    subject: "Physics-Astronomy",
    level: "High School",
    thumbnail: "/teacher-resources/images/light year.avif",
    contentUrl: "/teacher-resources/articles/Light-Years and Time Travel.pdf",
    language: "Tamil",
    content: "Community"
  }),
   createResource({
    id: 8,
    title: "The Search for Life",
    type: "document",
    subject: "Physics-Astronomy",
    level: "High School",
    thumbnail: "/teacher-resources/images/aliens.avif",
    contentUrl: "/teacher-resources/articles/The Search for Life.pdf",
    language: "Tamil",
    content: "Community"
  }),

    createResource({
    id: 9,
    title: "Imperial vs Metric",
    type: "document",
    subject: "Physics-Units",
    level: "Grade 6-8",
    thumbnail: "/teacher-resources/images/rulers.avif",
    contentUrl: "/teacher-resources/articles/Imperial vs Metric.pdf",
    language: "English",
    content: "Tecplore"
  }),

  

];

