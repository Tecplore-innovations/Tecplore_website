import { CatalogGrid } from './components/catalog-grid';

// Exhibit Interface
export interface Exhibit {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

// Initial Exhibits Data
export const EXHIBITS: Exhibit[] = [
  {
    id: 1,
    title: "Wind Tunnel with extended base",
    category: "Physics",
    image: "/photos/catalog/windtnl/pic.jpg",
    description: "Ever wondered why some buildings survive hurricanes while others crumble? Or why certain cars seem to glide through the air while others guzzle gas? Welcome to the Junior Wind Tunnel Lab – where young scientists unlock the secrets of aerodynamics through hands-on exploration! This innovative educational kit transforms abstract concepts into tangible discoveries, allowing students to investigate how wind interacts with everyday objects. Using safe, durable materials and featuring interchangeable models of trees, houses, and vehicles, students conduct real engineering tests just like professionals. They'll visualize airflow patterns, measure forces, and understand how nature and human engineering adapt to our invisible yet powerful friend – the wind."
  },
  {
    id: 2,
    title: "Earthquake Table",
    category: "Physics",
    image: "/photos/catalog/earthq/pic.jpg",
    description: "Can your building survive the shake? Welcome to the Junior Structural Testing Lab - where young engineers put their creations to the ultimate test! Build structures with safe materials like popsicle sticks and rubber bands, then challenge them against simulated earthquakes and demolition forces. This hands-on engineering kit teaches crucial concepts about stability, force, and structural design through exciting destructive testing. Watch buildings wobble, sway, or stand strong as students discover what makes structures survive or fail!"
  },
  {
    id: 3,
    title: "Eliptical Pool",
    category: "Physics",
    image: "/photos/catalog/eliptic/pic.jpg",
    description: "What if you could play carrom and master geometry at the same time? Introducing the Elliptical Wonder Board - where classic carrom meets fascinating physics! This innovative game board transforms the traditional square into an elliptical playground, where two special focal points create magical paths for your coins. Find out why a shot from one focus point always passes through the other, and unlock the secrets of shapes that power everything from satellite dishes to concert halls. It's not just a game - it's geometry in action!"
  }
];

export default async function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Science Experiment Exhibits</h1>
        <CatalogGrid exhibits={EXHIBITS} />
      </div>
    </div>
  );
}