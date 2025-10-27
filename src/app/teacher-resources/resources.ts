export interface Resource {
  id: number;
  title: string;
  type: "video" | "document"; 
  subject: string;
  level: string;
  thumbnail: string;
  contentUrl: string;
  createdAt: string; 
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
    title: "Physics Experiments for Grade 8",
    type: "document",
    subject: "Physics",
    level: "Grade 8",
    thumbnail: "/teacher-resources/images/physics8_thumb.jpg",
    contentUrl: "/teacher-resources/articles/physics_grade8.pdf",
  }),
  createResource({
    id: 2,
    title: "Chemistry Lab Safety Video",
    type: "video",
    subject: "Chemistry",
    level: "High School",
    thumbnail: "/teacher-resources/images/chem_safety_thumb.jpg",
    contentUrl: "https://www.youtube.com/watch?v=PhwyPQ0_5K0&pp=ygUnY2hlbWlzdHJ5IGxhYiBzYWZldHkgcnVsZXMgZm9yIHN0dWRlbnRz",
  }),
  createResource({
    id: 3,
    title: "Mathematics Experiments PDF",
    type: "document",
    subject: "Mathematics",
    level: "Grade 6-7",
    thumbnail: "/teacher-resources/images/math_lesson_thumb.jpg",
    contentUrl: "/teacher-resources/articles/math_experiments.pdf",
  }),

];

