// exhibits.ts
export type Showcase = {
  id: number;
  title: string;
  images: string[];
  short: string;
  long: string;
  gallery: string[];
  categories: string[];
};

export type MoreExhibit = {
  id: number;
  title:string;
  image: string; 
  short: string;   
  long: string;
  gallery: string[];
  categories: string[];
};


export const showcases: Showcase[] = [
  // -------- Featured Exhibits (Hero + Gallery) --------
  {
    id: 1,
    title: "Aero Tower",
    images: [
      "/photos/interactive-exhibits/AeroTower1.avif",
      "/photos/interactive-exhibits/AeroTower2.avif",
    ],
    short: "Airflow, lift, and visualize pressure.",
    long: "An engaging experiment that demonstrates Bernoulli's principle in action. The Aero Tower helps learners understand how airspeed affects pressure, forming the basis of flight and aerodynamics.",
    gallery: [
      "/photos/interactive-exhibits/AeroTower3.avif",
      "/photos/interactive-exhibits/AeroTower4.avif",
      "/photos/interactive-exhibits/AeroTower5.avif",
    ],
    categories: ["Physics", "Aerodynamics"],
    
  },
  {
    id: 2,
    title: "Wind Tunnel",
    images: [
      "/photos/interactive-exhibits/HorizontalWindTunnel1.avif",
      "/photos/interactive-exhibits/HorizontalWindTunnel2.avif",
    ],
    short: "Bernoulli's principle, drag & lift forces.",
    long: "Designed for aerodynamics demos with visible smoke flow and adjustable models to study lift and drag characteristics.",
    gallery: [
      "/photos/interactive-exhibits/HorizontalWindTunnel3.avif",
      "/photos/interactive-exhibits/HorizontalWindTunnel4.avif",
      "/photos/interactive-exhibits/HorizontalWindTunnel5.avif",
    ],
    categories: ["Physics", "Engineering"],
   
  },
  {
    id: 3,
    title: "Static Rocket Model",
    images: [
      "/photos/interactive-exhibits/RocketModel1.avif",
      "/photos/interactive-exhibits/RocketModel2.avif",
    ],
    short: "Newton's laws and thrust demonstrations.",
    long: "A scaled model to explore thrust, center of mass and stability. Perfect for classroom physics discussions.",
    gallery: [
     "/photos/interactive-exhibits/RocketModel3.avif",
     "/photos/interactive-exhibits/RocketModel4.avif",
     "/photos/interactive-exhibits/RocketModel5.avif",
     
    ],
    categories: ["Physics", "Engineering"],
    
  },
  {
    id: 4,
    title: "Curved Carrom",
    images: [
      "/photos/interactive-exhibits/CurvedCarrom1.avif",
      "/photos/interactive-exhibits/CurvedCarrom2.avif",
    ],
    short: "Reflection, Convergence & Focal points.",
    long: "Hands-on demonstration of how curved surfaces change trajectories and focus energy. Great for optics and geometry lessons.",
    gallery: [
      "/photos/interactive-exhibits/CurvedCarrom3.avif",
      "/photos/interactive-exhibits/CurvedCarrom4.avif",
      "/photos/interactive-exhibits/CurvedCarrom5.avif",
    ],
    categories: ["Physics", "Math"],
   
  },
{
  id: 5,
  title: "Projectile Launcher",
  images: [
    "/photos/interactive-exhibits/ProjectileLauncher1.avif",
    "/photos/interactive-exhibits/ProjectileLauncher2.avif",
  ],
  short: "Explore projectile motion and trajectories.",
  long: "Demonstrates the principles of projectile motion, including launch angle, velocity, and trajectory. Perfect for physics lessons on kinematics.",
  gallery: [
    "/photos/interactive-exhibits/ProjectileLauncher3.avif",
    "/photos/interactive-exhibits/ProjectileLauncher4.avif",
    "/photos/interactive-exhibits/ProjectileLauncher5.avif",
  ],
  categories: ["Physics", "Mechanics"],
}

];
// -------- Gallery-only Exhibits (Explore section only) --------

export const moreExhibits: MoreExhibit[] = [
  {
    id: 6,
    title: "Pulleys",
    image: "/photos/interactive-exhibits/Pulley1.avif",
    short: "Understand how pulleys balance forces and make lifting easier.",
    long: "Explore the relationship between mass, force, and acceleration using interactive weights and pulleys. Experience how mechanical advantage helps lift heavy objects with less effort.",
    gallery: [
      "/photos/interactive-exhibits/Pulley2.avif",
      "/photos/interactive-exhibits/Pulley3.avif",
      "/photos/interactive-exhibits/Pulley4.avif",
    ],
    categories: ["Physics", "Mechanics"],
  },
  {
    id: 7,
    title: "Chladni Figures",
    image: "/photos/interactive-exhibits/SoundPatterns1.avif",
    short: "Visualize sound waves through mesmerizing sand patterns.",
    long: "Demonstrates resonance and standing waves using vibrating plates and sand patterns (Chladni figures). The sand settles at nodes where the plate doesn’t vibrate, forming beautiful geometric shapes.",
    gallery: [
      "/photos/interactive-exhibits/SoundPatterns2.avif",
      "/photos/interactive-exhibits/SoundPatterns3.avif",
   
    ],
    categories: ["Physics", "Waves"],
  },
{
  id: 8,
  title: "Musical Pipe",
  image: "/photos/interactive-exhibits/MusicalPipe1.avif",
  short: "Explore how sound waves and air columns create musical notes.",
  long: "Demonstrates how the length of air columns in pipes affects the pitch of sound. Strike or blow across the pipes to hear different notes and understand resonance in acoustics.",
  gallery: [
    "/photos/interactive-exhibits/MusicalPipe2.avif",
    "/photos/interactive-exhibits/MusicalPipe3.avif",

  ],
  categories: ["Physics", "Sound"],
},

  {
    id: 9,
    title: "Rotating Table",
    image: "/photos/interactive-exhibits/CentrifugalForce1.avif",
    short: "Feel the power of rotation and centrifugal force in action.",
    long: "An interactive demonstration of centrifugal force using rotating masses on flexible arms. Observe how rotation influences motion and stability in spinning systems.",
    gallery: [
      "/photos/interactive-exhibits/CentrifugalForce2.avif",
      "/photos/interactive-exhibits/CentrifugalForce3.avif",
      "/photos/interactive-exhibits/CentrifugalForce4.avif",
    ],
    categories: ["Physics", "Motion"],
  },
 {
  id: 10,
  title: "Stream Table (Topography Sandbox)",
  image: "/photos/interactive-exhibits/StreamTable1.avif",
  short: "Explore how rivers shape landscapes - from meanders to deltas.",
  long: "A hands-on sandbox model that simulates river formation and erosion. Students can observe how flowing water carves valleys, creates meanders, and deposits sediments to form deltas - demonstrating topography, soil erosion, and watershed dynamics.",
  gallery: [
    "/photos/interactive-exhibits/StreamTable2.avif",
    "/photos/interactive-exhibits/StreamTable3.avif",
  ],
  categories: ["Geography", "Earth Science"],
},



];
