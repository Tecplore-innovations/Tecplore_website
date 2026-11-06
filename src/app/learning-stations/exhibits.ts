// exhibits.ts
type Station = {
  id: number;
  title: string;
  short: string;
  long: string;
  gallery: string[];
  categories: string[];
  // The learning layer shown on each station.
  tryIt: string;
  notice: string;
  why: string;
  // Shown as a tag on the card and in the detail view.
  ageGroup?: string;
};

export type Showcase = Station & { images: string[] };
export type MoreExhibit = Station & { image: string };

const photo = (file: string) => `/photos/interactive-exhibits/${file}.avif`;

export const showcases: Showcase[] = [
  // -------- Featured stations (hero + gallery) --------
  {
    id: 10,
    title: "Stream Table (Topography Sandbox)",
    images: [photo("StreamTable2"), photo("StreamTable3")],
    short: "Explore how rivers shape landscapes - from meanders to deltas.",
    long: "A hands-on sandbox model that simulates river formation and erosion. Students can observe how flowing water carves valleys, creates meanders, and deposits sediments to form deltas - demonstrating topography, soil erosion, and watershed dynamics.",
    gallery: [photo("StreamTable4"), photo("StreamTable1")],
    categories: ["Geography", "Earth Science"],
    ageGroup: "Class 6-12",
    tryIt: "Let water flow across the sand.",
    notice: "Where it cuts channels, and where it drops sediment.",
    why: "Moving water carries land away from one place and deposits it in another, forming meanders and deltas.",
  },
  {
    id: 7,
    title: "Chladni Figures",
    images: [photo("SoundPatterns3"), photo("SoundPatterns2")],
    short: "Visualize sound waves through mesmerizing sand patterns.",
    long: "Demonstrates resonance and standing waves using vibrating plates and sand patterns (Chladni figures). The sand settles at nodes where the plate doesn’t vibrate, forming beautiful geometric shapes.",
    gallery: [photo("SoundPatterns1")],
    categories: ["Physics", "Waves"],
    ageGroup: "Class 6-12",
    tryIt: "Make the plate vibrate.",
    notice: "The shapes the sand forms on the plate.",
    why: "Sand settles at the nodes, the lines where the plate does not vibrate.",
  },
  {
    id: 4,
    title: "Curved Carrom",
    images: [photo("CurvedCarrom4"), photo("CurvedCarrom3")],
    short: "Reflection, Convergence & Focal points.",
    long: "Hands-on demonstration of how curved surfaces change trajectories and focus energy. Great for optics and geometry lessons.",
    gallery: [photo("CurvedCarrom5"), photo("CurvedCarrom2"), photo("CurvedCarrom1")],
    categories: ["Physics", "Math"],
    ageGroup: "Class 6-12",
    tryIt: "Flick a striker at the curved edge.",
    notice: "Where it travels after it bounces.",
    why: "A curved surface turns paths towards a focal point, as a curved mirror does with light.",
  },
  {
    id: 1,
    title: "Aero Tower",
    images: [photo("AeroTower3"), photo("AeroTower4")],
    short: "Airflow, lift, and visualize pressure.",
    long: "An engaging experiment that demonstrates Bernoulli's principle in action. The Aero Tower helps learners understand how airspeed affects pressure, forming the basis of flight and aerodynamics.",
    gallery: [photo("AeroTower5"), photo("AeroTower2"), photo("AeroTower1")],
    categories: ["Physics", "Aerodynamics"],
    ageGroup: "Class 6-12",
    tryIt: "Change the airflow in the tower.",
    notice: "How the objects respond as the air speeds up.",
    why: "Faster-moving air has lower pressure, which is the basis of flight.",
  },
  {
    id: 2,
    title: "Wind Tunnel",
    images: [photo("HorizontalWindTunnel3"), photo("HorizontalWindTunnel4")],
    short: "Bernoulli's principle, drag & lift forces.",
    long: "Designed for aerodynamics demos with visible smoke flow and adjustable models to study lift and drag characteristics.",
    gallery: [photo("HorizontalWindTunnel5"), photo("HorizontalWindTunnel2"), photo("HorizontalWindTunnel1")],
    categories: ["Physics", "Engineering"],
    ageGroup: "Class 6-12",
    tryIt: "Adjust the model in the airflow.",
    notice: "How the smoke flows around its shape.",
    why: "A shape and its angle in moving air change its lift and drag.",
  },
];

// -------- All other stations (catalogue only) --------
export const moreExhibits: MoreExhibit[] = [
  {
    id: 8,
    title: "Musical Pipe",
    image: photo("MusicalPipe2"),
    short: "Explore how sound waves and air columns create musical notes.",
    long: "Demonstrates how the length of air columns in pipes affects the pitch of sound. Strike or blow across the pipes to hear different notes and understand resonance in acoustics.",
    gallery: [photo("MusicalPipe3"), photo("MusicalPipe1")],
    categories: ["Physics", "Sound"],
    ageGroup: "Class 6-12",
    tryIt: "Strike or blow across pipes of different lengths.",
    notice: "Which pipes sound higher, and which sound lower.",
    why: "A shorter column of air vibrates faster, which gives a higher note.",
  },
  {
    id: 6,
    title: "Pulleys",
    image: photo("Pulley3"),
    short: "Understand how pulleys balance forces and make lifting easier.",
    long: "Explore the relationship between mass, force, and acceleration using interactive weights and pulleys. Experience how mechanical advantage helps lift heavy objects with less effort.",
    gallery: [photo("Pulley4")],
    categories: ["Physics", "Mechanics"],
    ageGroup: "Class 6-12",
    tryIt: "Lift the weight using different pulley set-ups.",
    notice: "Which set-up takes the least effort.",
    why: "More ropes share the load, so you pull with less force over a longer distance.",
  },
  {
    id: 9,
    title: "Rotating Table",
    image: photo("CentrifugalForce3"),
    short: "Feel the power of rotation and centrifugal force in action.",
    long: "An interactive demonstration of centrifugal force using rotating masses on flexible arms. Observe how rotation influences motion and stability in spinning systems.",
    gallery: [photo("CentrifugalForce4"), photo("CentrifugalForce2"), photo("CentrifugalForce1")],
    categories: ["Physics", "Motion"],
    ageGroup: "Class 6-12",
    tryIt: "Spin the table, slowly and then faster.",
    notice: "How the masses move outward as the speed rises.",
    why: "Moving objects tend to carry on in a straight line, so they swing outward in a spin.",
  },
  {
    id: 3,
    title: "Model Rocket",
    image: photo("RocketModel2"),
    short: "Newton's laws and thrust demonstrations.",
    long: "A scaled model to explore thrust, center of mass and stability. Perfect for classroom physics discussions.",
    gallery: [photo("RocketModel3"), photo("RocketModel5"), photo("RocketModel4"), photo("RocketModel1")],
    categories: ["Physics", "Engineering"],
    ageGroup: "Class 6-12",
    tryIt: "Find the point where the rocket balances.",
    notice: "Where that point sits along its length.",
    why: "A rocket's stability depends on its centre of mass, and thrust pushes it up as gas is pushed down.",
  },
  {
    id: 5,
    title: "Projectile Launcher",
    image: photo("ProjectileLauncher4"),
    short: "Explore projectile motion and trajectories.",
    long: "Demonstrates the principles of projectile motion, including launch angle, velocity, and trajectory. Perfect for physics lessons on kinematics.",
    gallery: [photo("ProjectileLauncher3"), photo("ProjectileLauncher5"), photo("ProjectileLauncher2"), photo("ProjectileLauncher1")],
    categories: ["Physics", "Mechanics"],
    ageGroup: "Class 6-12",
    tryIt: "Change the launch angle and fire.",
    notice: "How far and how high it travels.",
    why: "Launch angle and speed together set the path of any projectile.",
  },
];
