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
      "/photos/interactive-exhibits/AeroTower1.png",
      "/photos/interactive-exhibits/AeroTower2.png",
    ],
    short: "Airflow, lift, and visualize pressure.",
    long: "An engaging experiment that demonstrates Bernoulli's principle in action. The Aero Tower helps learners understand how airspeed affects pressure, forming the basis of flight and aerodynamics.",
    gallery: [
      "/photos/interactive-exhibits/AeroTower3.png",
      "/photos/interactive-exhibits/AeroTower4.png",
      "/photos/interactive-exhibits/AeroTower5.png",
    ],
    categories: ["Physics", "Aerodynamics"],
    
  },
  {
    id: 2,
    title: "Wind Tunnel",
    images: [
      "/photos/interactive-exhibits/HorizontalWindTunnel1.png",
      "/photos/interactive-exhibits/HorizontalWindTunnel2.png",
    ],
    short: "Bernoulli's principle, drag & lift forces.",
    long: "Designed for aerodynamics demos with visible smoke flow and adjustable models to study lift and drag characteristics.",
    gallery: [
      "/photos/interactive-exhibits/HorizontalWindTunnel3.png",
      "/photos/interactive-exhibits/HorizontalWindTunnel4.png",
      "/photos/interactive-exhibits/HorizontalWindTunnel5.png",
    ],
    categories: ["Physics", "Engineering"],
   
  },
  {
    id: 3,
    title: "Static Rocket Model",
    images: [
      "/photos/interactive-exhibits/RocketModel1.png",
      "/photos/interactive-exhibits/RocketModel2.png",
    ],
    short: "Newton's laws and thrust demonstrations.",
    long: "A scaled model to explore thrust, center of mass and stability. Perfect for classroom physics discussions.",
    gallery: [
     "/photos/interactive-exhibits/RocketModel3.png",
      "/photos/interactive-exhibits/RocketModel4.png",
       "/photos/interactive-exhibits/RocketModel5.png",
    ],
    categories: ["Physics", "Engineering"],
    
  },
  {
    id: 4,
    title: "Curved Carrom",
    images: [
      "/photos/interactive-exhibits/CurvedCarrom1.png",
      "/photos/interactive-exhibits/CurvedCarrom2.png",
    ],
    short: "Reflection & Convergence — focal points in motion.",
    long: "Hands-on demonstration of how curved surfaces change trajectories and focus energy. Great for optics and geometry lessons.",
    gallery: [
      "/photos/interactive-exhibits/CurvedCarrom3.png",
      "/photos/interactive-exhibits/CurvedCarrom4.png",
      "/photos/interactive-exhibits/CurvedCarrom5.png",
    ],
    categories: ["Physics", "Math"],
   
  },
{
  id: 5,
  title: "Projectile Launcher",
  images: [
    "/photos/interactive-exhibits/ProjectileLauncher1.png",
    "/photos/interactive-exhibits/ProjectileLauncher2.png",
  ],
  short: "Explore projectile motion and trajectories.",
  long: "Demonstrates the principles of projectile motion, including launch angle, velocity, and trajectory. Perfect for physics lessons on kinematics.",
  gallery: [
    "/photos/interactive-exhibits/ProjectileLauncher3.png",
    "/photos/interactive-exhibits/ProjectileLauncher4.png",
    "/photos/interactive-exhibits/ProjectileLauncher5.png",
  ],
  categories: ["Physics", "Mechanics"],
}

];

  // -------- Gallery-only Exhibits (Explore section only) --------

  export const moreExhibits: MoreExhibit[] = [
  {
    id: 6,
     title: "Pulleys",
    long: "Explore the relationship between mass, force, and acceleration using interactive weights and pulleys.",
    gallery: [
      "/photos/interactive-exhibits/Pulleys1.png",
      "/photos/interactive-exhibits/Pulleys2.png",
    ],
    categories: ["Physics", "Mechanics"],
  },
  {
    id: 7,
     title: "Chladni figures",
    long: "Demonstrates resonance and standing waves using vibrating plates and sand patterns (Chladni figures).",
    gallery: [
      "/photos/interactive-exhibits/SoundPatterns1.png",
      "/photos/interactive-exhibits/SoundPatterns2.png",
    ],
    categories: ["Physics", "Waves"],
  },
  {
    id: 8,
     title: "Optical Illusion",
    long: "Shows how refraction and dispersion work by passing light through glass prisms and lenses.",
    gallery: [
      "/photos/interactive-exhibits/LightRefraction1.png",
      "/photos/interactive-exhibits/LightRefraction2.png",
    ],
    categories: ["Physics", "Optics"],
  },
  {
    id: 9,
     title: "Rotating Table",
    long: "Interactive demonstration of centrifugal force using rotating masses on flexible arms.",
    gallery: [
      "/photos/interactive-exhibits/CentrifugalForce1.png",
      "/photos/interactive-exhibits/CentrifugalForce2.png",
    ],
    categories: ["Physics", "Motion"],
  },
  {
    id: 10,
     title: "Magnetic Induction",
    long: "Magnet and coil setup showing induction, Lenz's law, and electromagnetic braking effects.",
    gallery: [
      "/photos/interactive-exhibits/MagneticInduction1.png",
      "/photos/interactive-exhibits/MagneticInduction2.png",
    ],
    categories: ["Physics", "Electricity"],
  },
];
