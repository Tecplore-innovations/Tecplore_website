/* app/catalog/data.ts */

import type { EnhancedExhibit } from './types';

export const EXHIBITS: EnhancedExhibit[] = [
  {
    id: 1,
    title: "Wind Tunnel with extended base",
    category: "Physics",
    image: "/photos/catalog/windtnl/pic.jpeg",
    description: "Explore aerodynamics and fluid mechanics with our advanced wind tunnel system. This comprehensive model allows students to visualize airflow patterns, measure drag and lift forces, and understand the principles of aerodynamics through hands-on experimentation.",
    price: 1299,
    availability: "in-stock",
    headerTagline: "Visualize Aerodynamics in Action",
    conceptualQuestions: [
      "How do different shapes affect drag force?",
      "What aerodynamic principles make airplanes fly?",
      "How can we optimize designs to reduce air resistance?"
    ],
    media: [
      {
        type: "image",
        url: "/photos/catalog/windtnl/pic.jpeg",
        alt: "Wind Tunnel Front View"
      },
      {
        type: "image",
        url: "/photos/catalog/windtnl/detail.jpg",
        alt: "Wind Tunnel with Smoke Visualization"
      },
      {
        type: "image",
        url: "/photos/catalog/windtnl/usage.jpg",
        alt: "Students Using Wind Tunnel"
      }
    ],
    features: [
      {
        title: "Variable Speed Control",
        description: "Precision digital controls allow for exact airflow velocity settings from gentle breeze to strong wind simulation.",
        icon: "dial"
      },
      {
        title: "Smoke Visualization System",
        description: "Integrated smoke generation for clear visualization of airflow patterns around test objects.",
        icon: "cloud"
      },
      {
        title: "Digital Force Measurement",
        description: "Built-in sensors provide real-time data on lift, drag, and lateral forces with digital display.",
        icon: "gauge"
      },
      {
        title: "Interchangeable Test Models",
        description: "Includes various aerodynamic shapes for comparative testing and experimentation.",
        icon: "shapes"
      }
    ],
    sections: [
      {
        title: "Hands-On Aerodynamics Learning",
        description: "Our wind tunnel provides students with real-world insights into aerodynamic principles. From testing wing designs to visualizing flow patterns, students gain intuitive understanding of complex fluid dynamics concepts in an engaging, tangible way.",
        imageUrl: "/photos/catalog/windtnl/classroom.jpg",
        altText: "Students examining airflow patterns in wind tunnel",
        alignment: "right"
      },
      {
        title: "Professional-Grade Design Testing",
        description: "Beyond basic education, our wind tunnel enables advanced design testing for student projects. Test custom car bodies, building models, or wing designs with precise instrumentation to collect meaningful data for engineering projects.",
        imageUrl: "/photos/catalog/windtnl/testing.jpg",
        altText: "Engineering student testing custom design in wind tunnel",
        alignment: "left"
      }
    ],
    educationalBenefits: [
      "Demonstrates fundamental principles of fluid dynamics and aerodynamics",
      "Provides real data collection opportunities for physics and engineering courses",
      "Enables visualization of abstract concepts like boundary layers and turbulence",
      "Facilitates project-based learning through design, testing, and optimization cycles",
      "Connects theoretical physics with real-world applications in aviation and automotive design"
    ],
    technicalSpecs: [
      {
        label: "Test Section Dimensions",
        value: "30cm × 30cm × 60cm",
        icon: "ruler"
      },
      {
        label: "Maximum Air Velocity",
        value: "30 m/s (108 km/h)",
        icon: "wind"
      },
      {
        label: "Power Requirements",
        value: "220-240V AC, 15A",
        icon: "power"
      },
      {
        label: "Measurement Accuracy",
        value: "±0.01N force, ±0.1 m/s velocity",
        icon: "gauge"
      }
    ],
    setupGuide: {
      difficulty: "Intermediate",
      timeRequired: "2-3 hours",
      steps: [
        "Unpack all components and verify against included inventory list",
        "Assemble the main tunnel body on a flat, stable surface",
        "Connect the fan assembly and digital control unit",
        "Install the force measurement platform in the test section",
        "Calibrate sensors using the provided reference weights",
        "Connect to power supply and run initial system checks"
      ]
    },
    safety: {
      requirements: [
        "Requires adequate ventilation for smoke visualization system",
        "Minimum room size: 4m × 4m with 2.5m ceiling height",
        "Requires stable power supply with surge protection"
      ],
      guidelines: [
        "Always secure loose clothing and long hair before operation",
        "Never place hands or foreign objects in tunnel during operation",
        "Ensure all test models are properly secured before testing",
        "Switch off system immediately if unusual noise or vibration occurs"
      ]
    },
    resources: [
      {
        title: "Wind Tunnel Experiment Guide",
        fileUrl: "/docs/wind-tunnel-experiments.pdf",
        fileSize: "4.2 MB",
        fileType: "PDF"
      },
      {
        title: "Calibration & Maintenance Manual",
        fileUrl: "/docs/wind-tunnel-maintenance.pdf",
        fileSize: "2.8 MB",
        fileType: "PDF"
      },
      {
        title: "Data Analysis Software",
        fileUrl: "/software/aero-data-tool.zip",
        fileSize: "68.5 MB",
        fileType: "ZIP"
      }
    ]
  },
  {
    id: 2,
    title: "Earthquake Table",
    category: "Physics",
    image: "/photos/catalog/earthq/pic.jpeg",
    description: "Simulate seismic activity and test structural designs with our programmable earthquake simulation table. Students can explore structural engineering principles and discover how different building designs respond to various earthquake intensities and wave patterns.",
    price: 2499,
    availability: "in-stock",
    headerTagline: "Bring Seismic Engineering to Life",
    conceptualQuestions: [
      "How do building designs affect structural stability during earthquakes?",
      "What resonance patterns emerge in different structures?",
      "How can we engineer buildings to better withstand seismic events?"
    ],
    media: [
      {
        type: "image",
        url: "/photos/catalog/earthq/pic.jpeg",
        alt: "Earthquake Simulation Table"
      },
      {
        type: "image",
        url: "/photos/catalog/earthq/demo.jpg",
        alt: "Building Models on Earthquake Table"
      },
      {
        type: "video",
        url: "/videos/earthquake-demo.mp4",
        alt: "Earthquake Table Demonstration"
      }
    ],
    features: [
      {
        title: "Programmable Seismic Patterns",
        description: "Recreate historical earthquakes or design custom seismic patterns with variable intensity, duration, and wave characteristics.",
        icon: "waveform"
      },
      {
        title: "Multi-Axis Movement",
        description: "Simulates both horizontal and vertical ground motion for realistic seismic testing.",
        icon: "move"
      },
      {
        title: "High-Speed Camera Integration",
        description: "Compatible with optional high-speed camera system for detailed motion analysis.",
        icon: "camera"
      },
      {
        title: "Building Block System",
        description: "Includes specialized building materials designed for structural testing and analysis.",
        icon: "blocks"
      }
    ],
    sections: [
      {
        title: "Engineering Challenges Made Tangible",
        description: "Our earthquake table transforms abstract engineering concepts into hands-on challenges. Students build structures and immediately test their resistance to various seismic events, creating an intuitive understanding of structural dynamics.",
        imageUrl: "/photos/catalog/earthq/classroom.jpg",
        altText: "Students testing building designs on earthquake table",
        alignment: "left"
      },
      {
        title: "Data-Driven Learning",
        description: "Built-in sensors capture detailed movement data during simulations, allowing students to analyze structural responses and identify critical failure points. This quantitative approach connects physical observations with engineering principles.",
        imageUrl: "/photos/catalog/earthq/data.jpg",
        altText: "Students analyzing earthquake simulation data",
        alignment: "right"
      }
    ],
    educationalBenefits: [
      "Demonstrates principles of structural engineering and resonance",
      "Develops intuitive understanding of how forces affect structures",
      "Provides hands-on experience with engineering design process",
      "Connects physics concepts to real-world disaster mitigation",
      "Facilitates project-based learning through design competitions"
    ],
    technicalSpecs: [
      {
        label: "Platform Dimensions",
        value: "75cm × 75cm",
        icon: "ruler"
      },
      {
        label: "Maximum Load Capacity",
        value: "15kg",
        icon: "weight"
      },
      {
        label: "Frequency Range",
        value: "0.5Hz to 15Hz",
        icon: "waveform"
      },
      {
        label: "Maximum Acceleration",
        value: "2.5g",
        icon: "gauge"
      }
    ],
    setupGuide: {
      difficulty: "Intermediate",
      timeRequired: "1-2 hours",
      steps: [
        "Place the base unit on a solid, level surface",
        "Connect the control module and verify secure connections",
        "Install the simulation platform onto the base unit",
        "Connect power supply and calibrate the system",
        "Install software on a compatible computer (Windows 10/11)",
        "Run test sequence to verify proper operation"
      ]
    },
    safety: {
      requirements: [
        "Requires stable, level surface with adequate load capacity",
        "Minimum clearance of 1m on all sides during operation",
        "Requires stable power supply with surge protection"
      ],
      guidelines: [
        "Keep hands clear of platform during operation",
        "Secure all loose items in the vicinity before testing",
        "Maximum structure height should not exceed 60cm",
        "Always supervise students during active simulations"
      ]
    },
    resources: [
      {
        title: "Earthquake Table User Manual",
        fileUrl: "/docs/earthquake-manual.pdf",
        fileSize: "5.6 MB",
        fileType: "PDF"
      },
      {
        title: "Historical Earthquake Patterns Database",
        fileUrl: "/data/earthquake-patterns.zip",
        fileSize: "12.4 MB",
        fileType: "ZIP"
      },
      {
        title: "Structural Engineering Lesson Plans",
        fileUrl: "/docs/seismic-lesson-plans.pdf",
        fileSize: "8.2 MB",
        fileType: "PDF"
      }
    ]
  },
  {
    id: 3,
    title: "Prism & Slit",
    category: "Physics",
    image: "/photos/catalog/prism/pic4.jpeg",
    description: "Explore the fascinating world of light physics with our comprehensive optics kit. Study reflection, refraction, diffraction, and the color spectrum through hands-on experiments with high-quality optical components and precision light sources.",
    price: 699,
    availability: "in-stock",
    headerTagline: "Unlock the Secrets of Light and Color",
    conceptualQuestions: [
      "How does light behave when passing through different media?",
      "What causes the separation of white light into colors?",
      "How do diffraction patterns demonstrate the wave nature of light?"
    ],
    media: [
      {
        type: "image",
        url: "/photos/catalog/prism/pic4.jpeg",
        alt: "Prism and Slit Apparatus"
      },
      {
        type: "image",
        url: "/photos/catalog/prism/spectrum.jpg",
        alt: "Light Spectrum Display"
      },
      {
        type: "image",
        url: "/photos/catalog/prism/experiment.jpg",
        alt: "Students Conducting Optics Experiment"
      }
    ],
    features: [
      {
        title: "Precision Optical Bench",
        description: "Stable, calibrated mounting system for accurate placement of optical components.",
        icon: "layout"
      },
      {
        title: "High-Quality Optical Components",
        description: "Includes research-grade prisms, lenses, and diffraction gratings for clear results.",
        icon: "circle"
      },
      {
        title: "Variable Light Sources",
        description: "Monochromatic and white light sources with adjustable intensity for diverse experiments.",
        icon: "lamp"
      },
      {
        title: "Adjustable Precision Slits",
        description: "Micrometer-controlled slit width for detailed diffraction and interference studies.",
        icon: "align-justify"
      }
    ],
    sections: [
      {
        title: "Visualizing Light Phenomena",
        description: "Our optical system makes the invisible visible, transforming abstract light concepts into tangible visual experiences. Students can directly observe phenomena like wavelength-dependent refraction, interference patterns, and polarization effects.",
        imageUrl: "/photos/catalog/prism/demonstration.jpg",
        altText: "Teacher demonstrating light refraction through prism",
        alignment: "right"
      },
      {
        title: "Quantitative Optical Measurements",
        description: "Beyond qualitative observations, our system enables precise measurements of optical properties. Students can determine indices of refraction, measure wavelengths using diffraction, and explore the mathematical relationships in optics.",
        imageUrl: "/photos/catalog/prism/measurement.jpg",
        altText: "Student taking measurements with optical equipment",
        alignment: "left"
      }
    ],
    educationalBenefits: [
      "Demonstrates fundamental properties of light: reflection, refraction, diffraction",
      "Provides visual confirmation of theoretical optics principles",
      "Develops measurement and experimental skills in physics",
      "Connects abstract equations with observable phenomena",
      "Facilitates exploration of both wave and particle properties of light"
    ],
    technicalSpecs: [
      {
        label: "Optical Bench Length",
        value: "100cm with 1mm scale divisions",
        icon: "ruler"
      },
      {
        label: "Light Sources",
        value: "White LED, Red/Green/Blue lasers (Class 2)",
        icon: "lamp"
      },
      {
        label: "Prism Material",
        value: "BK7 Optical Glass, n=1.517",
        icon: "triangle"
      },
      {
        label: "Diffraction Grating",
        value: "100, 300, and 600 lines/mm",
        icon: "grid"
      }
    ],
    setupGuide: {
      difficulty: "Basic",
      timeRequired: "30-45 minutes",
      steps: [
        "Unpack all optical components and verify against inventory",
        "Attach the optical bench to a stable table or surface",
        "Mount the light source at one end of the optical bench",
        "Install component holders at appropriate distances",
        "Place screen or sensor at viewing end of bench",
        "Align all components along the optical axis"
      ]
    },
    safety: {
      requirements: [
        "Requires darkened room for optimal visualization",
        "Table or benchtop with minimum 120cm × 50cm space",
        "Standard power outlet required for light sources"
      ],
      guidelines: [
        "Never look directly into laser sources",
        "Use laser safety glasses when appropriate",
        "Handle optical components carefully to prevent damage",
        "Keep optical surfaces clean using provided cleaning materials"
      ]
    },
    resources: [
      {
        title: "Optics Experiment Guide",
        fileUrl: "/docs/optics-experiments.pdf",
        fileSize: "7.2 MB",
        fileType: "PDF"
      },
      {
        title: "Light Theory Companion",
        fileUrl: "/docs/light-theory.pdf",
        fileSize: "4.5 MB",
        fileType: "PDF"
      },
      {
        title: "Component Care Guide",
        fileUrl: "/docs/optical-care.pdf",
        fileSize: "1.8 MB",
        fileType: "PDF"
      }
    ]
  },
  // Remaining exhibits with extended information...
  {
    id: 4,
    title: "DNA Replication Model",
    category: "Biology",
    image: "/photos/catalog/dna/pic.jpg",
    description: "Visualize the complex process of DNA replication with this detailed interactive model. Students can manipulate each component to understand leading and lagging strands, DNA polymerase action, and the role of various enzymes in genetic replication.",
    price: 849,
    availability: "in-stock",
    headerTagline: "Demystifying the Language of Life",
    features: [
      {
        title: "Magnetic Component System",
        description: "Color-coded, magnetically connected pieces represent nucleotides, enzymes and other cellular components.",
        icon: "magnet"
      },
      {
        title: "Step-by-Step Replication Process",
        description: "Simulate each stage of DNA replication from unwinding to proofreading.",
        icon: "layers"
      },
      {
        title: "Scale Model with Detail",
        description: "Enlarged model shows molecular details while maintaining structural accuracy.",
        icon: "zoom-in"
      }
    ],
    technicalSpecs: [
      {
        label: "Model Size",
        value: "120cm when fully assembled",
        icon: "ruler"
      },
      {
        label: "Number of Components",
        value: "245 individual pieces",
        icon: "grid"
      },
      {
        label: "Material",
        value: "Durable ABS plastic with magnetic connections",
        icon: "box"
      }
    ]
  },
  {
    id: 5,
    title: "Chemical Reaction Chamber",
    category: "Chemistry",
    image: "/photos/catalog/chem/pic.jpg",
    description: "Observe and control various chemical reactions in real-time with our safe, enclosed reaction chamber. Features precise temperature control, reagent dispensing, and pH monitoring to demonstrate fundamental principles of chemical kinetics and equilibrium.",
    price: 1499,
    availability: "pre-order",
    headerTagline: "Chemistry Brought to Life",
    features: [
      {
        title: "Digital Temperature Control",
        description: "Precise regulation from 5°C to 95°C with 0.5°C increments.",
        icon: "thermometer"
      },
      {
        title: "Real-time Monitoring",
        description: "Integrated sensors for temperature, pH, and pressure with digital display.",
        icon: "activity"
      },
      {
        title: "Safety-First Design",
        description: "Fully enclosed system with ventilation and automatic shutdown features.",
        icon: "shield"
      }
    ],
    technicalSpecs: [
      {
        label: "Chamber Volume",
        value: "2L maximum working capacity",
        icon: "container"
      },
      {
        label: "Temperature Range",
        value: "5°C to 95°C",
        icon: "thermometer"
      },
      {
        label: "Power Requirements",
        value: "110-240V AC, 8A",
        icon: "power"
      }
    ]
  },
  {
    id: 6,
    title: "Solar System Simulator",
    category: "Astronomy",
    image: "/photos/catalog/solar/pic.jpg",
    description: "Explore planetary motion, orbital mechanics, and gravitational interactions with our comprehensive solar system model. Features accurate scale representations and interactive controls to demonstrate celestial mechanics and astronomical phenomena.",
    price: 1299,
    availability: "in-stock",
    headerTagline: "The Universe in Your Classroom",
    features: [
      {
        title: "Dynamic Orbital System",
        description: "Motorized planets move in accurate elliptical orbits with correct relative speeds.",
        icon: "circle"
      },
      {
        title: "Scale Toggle Feature",
        description: "Switch between size-scaled and distance-scaled modes for different educational focus.",
        icon: "maximize"
      },
      {
        title: "Illuminated Sun",
        description: "Central light source casts accurate shadows to demonstrate seasons and eclipses.",
        icon: "sun"
      }
    ],
    technicalSpecs: [
      {
        label: "Model Diameter",
        value: "150cm fully extended",
        icon: "ruler"
      },
      {
        label: "Planets Included",
        value: "All 8 planets plus key dwarf planets",
        icon: "circle"
      },
      {
        label: "Power Source",
        value: "AC adapter or rechargeable battery (8hr)",
        icon: "battery"
      }
    ]
  },
  {
    id: 7,
    title: "Wave Motion Demonstrator",
    category: "Physics",
    image: "/photos/catalog/wave/pic.jpg",
    description: "Visualize complex wave phenomena including interference, reflection, and diffraction. This versatile apparatus demonstrates both transverse and longitudinal waves, helping students grasp fundamental concepts in wave mechanics and sound.",
    price: 599,
    availability: "in-stock",
    headerTagline: "Making Waves Visible",
    features: [
      {
        title: "Dual Wave Generators",
        description: "Independent control of two wave sources for interference demonstrations.",
        icon: "wave-square"
      },
      {
        title: "Adjustable Frequency",
        description: "Variable from 0.5Hz to 5Hz for slow-motion wave observation.",
        icon: "sliders"
      },
      {
        title: "Multiple Wave Media",
        description: "Interchangeable components for string, water, and spring wave demonstrations.",
        icon: "grid"
      }
    ],
    technicalSpecs: [
      {
        label: "Trough Dimensions",
        value: "80cm × 60cm for water waves",
        icon: "square"
      },
      {
        label: "Frequency Range",
        value: "0.5Hz to 5Hz, continuously variable",
        icon: "activity"
      },
      {
        label: "Illumination",
        value: "LED stroboscopic system for wave freezing",
        icon: "lamp"
      }
    ]
  },
  {
    id: 8,
    title: "Microscopic Life Explorer",
    category: "Biology",
    image: "/photos/catalog/micro/pic.jpg",
    description: "Discover the microscopic world with our high-resolution digital microscope system. Observe living microorganisms, cell structures, and tissue samples in stunning detail, with interactive features for measurement and analysis.",
    price: 1899,
    availability: "in-stock",
    headerTagline: "Journey into the Invisible World",
    features: [
      {
        title: "High-Definition Imaging",
        description: "5MP camera with specialized optics for crisp, detailed microscopic images.",
        icon: "camera"
      },
      {
        title: "Digital Analysis Tools",
        description: "Integrated software for measurements, annotations, and time-lapse recording.",
        icon: "search"
      },
      {
        title: "Live Specimen Support",
        description: "Temperature-controlled stage for extended observation of living specimens.",
        icon: "thermometer"
      }
    ],
    technicalSpecs: [
      {
        label: "Magnification Range",
        value: "40× to 1000× with digital zoom",
        icon: "zoom-in"
      },
      {
        label: "Camera Resolution",
        value: "5MP with HDMI and USB output",
        icon: "camera"
      },
      {
        label: "Illumination",
        value: "LED brightfield and phase contrast",
        icon: "sun"
      }
    ]
  },
  {
    id: 9,
    title: "Renewable Energy Kit",
    category: "Environmental Science",
    image: "/photos/catalog/renewable/pic.jpg",
    description: "Demonstrate various renewable energy technologies including solar, wind, and hydroelectric power generation. This comprehensive kit allows hands-on experimentation with energy conversion, storage, and efficiency measurement.",
    price: 799,
    availability: "in-stock",
    headerTagline: "Powering a Sustainable Future",
    features: [
      {
        title: "Multiple Energy Sources",
        description: "Interchangeable solar, wind, and water power generation modules.",
        icon: "sun"
      },
      {
        title: "Energy Storage System",
        description: "Integrated capacitor and battery storage with monitoring system.",
        icon: "battery"
      },
      {
        title: "Consumption Simulators",
        description: "Various load devices to demonstrate energy usage and efficiency.",
        icon: "lightbulb"
      }
    ],
    technicalSpecs: [
      {
        label: "Solar Panel",
        value: "6V, 2W with adjustable angle mount",
        icon: "sun"
      },
      {
        label: "Wind Turbine",
        value: "Variable pitch blades, 0.5-3V output",
        icon: "wind"
      },
      {
        label: "Data Logging",
        value: "USB interface with custom software",
        icon: "activity"
      }
    ]
  },
  {
    id: 10,
    title: "Geological Formation Model",
    category: "Earth Science",
    image: "/photos/catalog/geo/pic.jpg",
    description: "Explore geological processes with our interactive earth science model. Demonstrate plate tectonics, volcanic activity, and sediment formation. Features removable layers and cross-sections to reveal Earth's internal structure.",
    price: 899,
    availability: "coming-soon",
    headerTagline: "Earth's Story in Your Hands",
    features: [
      {
        title: "Cross-Section Visualization",
        description: "Detailed layers show Earth's crust, mantle, and core with accurate proportions.",
        icon: "layers"
      },
      {
        title: "Tectonic Plate Simulation",
        description: "Movable plates demonstrate convergent, divergent, and transform boundaries.",
        icon: "move"
      },
      {
        title: "Volcanic Activity Model",
        description: "Working model demonstrates magma flow and eruption processes.",
        icon: "triangle"
      }
    ],
    technicalSpecs: [
      {
        label: "Model Dimensions",
        value: "60cm diameter, 30cm height",
        icon: "circle"
      },
      {
        label: "Number of Layers",
        value: "12 distinct geological layers",
        icon: "layers"
      },
      {
        label: "Material",
        value: "Durable, painted polyresin composite",
        icon: "box"
      }
    ]
  }
];