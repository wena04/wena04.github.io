// Projects data - coding and design
// Source: Resume, GitHub, LinkedIn, Project List

// =============================================================================
// CODING PROJECTS
// =============================================================================
export const codingProjects = [
  // Featured / Hackathon Projects
  {
    id: 1,
    title: "AWS Pilot",
    role: "Full Stack",
    description:
      "AI-powered Chrome extension that provides real-time AWS Console guidance to deliver secure, on-screen tutoring, automated workflows, and intelligent error assistance.",
    technologies: ["Node.js", "AWS Lambda", "Amazon Bedrock", "Python", "Chrome Extension", "DynamoDB", "API"],
    github: null,
    demo: null,
    image: "/images/aws-pilot.png",
    date: "Oct 2025",
    featured: true,
    type: "coding",
  },
  {
    id: 2,
    title: "TFind",
    role: "3D Visualization",
    award: "T-Mobile & Nokia Track Winner @ DubHacks 2024",
    description:
      "Street-GL-based interactive web application that allows companies to track, manage, and analyze multiple device locations, signal strengths, and access to T-Mobile Nokia 5G network resources in real time, all visualized on a dynamic 3D map.",
    technologies: ["Three.js", "Node.js", "MongoDB", "T-Mobile API", "Nokia API", "Data Visualization"],
    github: null,
    demo: null,
    image: "/images/tfind.png",
    date: "Oct 2024",
    featured: true,
    type: "coding",
  },
  {
    id: 3,
    title: "SmartFuel",
    role: "Full Stack",
    award: "INRIX Hackathon Finalist",
    description:
      "Cost-efficient routing engine using Inrix Traffic API, Google Maps Routes, and Leaflet to compute and visualize cheapest driving paths with real-time gas-price overlays.",
    technologies: ["Google Maps API", "SQL", "Tailwind", "Azure", "ER Modeling", "Leaflet"],
    github: "https://github.com/FRCroboSam/inrix-amazon-hack-23",
    demo: null,
    image: "/images/smartfuel.png",
    date: "Oct 2023",
    featured: true,
    type: "coding",
  },

  // Course Projects
  {
    id: 4,
    title: "Mini Google",
    role: "Systems Programming",
    course: "CSE 333",
    description:
      "Search engine implementation with file system crawling and indexing.",
    technologies: ["C", "C++", "Systems Programming"],
    github: null,
    demo: null,
    image: "/images/mini-google.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 5,
    title: "KACK FoodBank",
    role: "Frontend Developer",
    course: "INFO 340",
    description:
      "Web application for food bank management and donor coordination.",
    technologies: ["React", "HTML/CSS", "JavaScript"],
    github: "https://github.com/wena04/project-kack",
    demo: null,
    image: "/images/kack-foodbank.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 6,
    title: "Global Economy & Climate Change",
    role: "Data Visualization",
    course: "INFO 201",
    description:
      "Interactive data visualizations exploring the relationship between global economy and climate change using 25,000+ rows of environmental and economic data.",
    technologies: ["R", "Shiny", "ggplotly", "HTML/CSS", "Git"],
    github: null,
    demo: null,
    image: "/images/climate-viz.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 7,
    title: "Social Justice Art Archive",
    role: "Database Design",
    course: "INFO 330",
    description:
      "Database system for archiving and cataloging social justice artwork.",
    technologies: ["SQL", "Database Design", "ER Modeling"],
    github: null,
    demo: null,
    image: "/images/art-archive.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 8,
    title: "HuskyMap",
    role: "Data Structures",
    course: "CSE 373",
    description:
      "Map application implementing shortest path algorithms and data structures.",
    technologies: ["Java", "Data Structures", "Algorithms"],
    github: null,
    demo: null,
    image: "/images/huskymap.png",
    date: "2024",
    featured: false,
    type: "coding",
  },

  // Open Source / Other
  {
    id: 9,
    title: "SWECC Website",
    role: "Contributor",
    description:
      "Software Engineering Career Club website - contributed to frontend development.",
    technologies: ["JavaScript", "React"],
    github: "https://github.com/swecc-uw/swecc-website",
    demo: null,
    image: "/images/swecc.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 10,
    title: "Wordplay",
    role: "Contributor",
    description:
      "An accessible, language-inclusive programming language and IDE for creating interactive typography on the web.",
    technologies: ["TypeScript"],
    github: "https://github.com/wordplaydev/wordplay",
    demo: null,
    image: "/images/wordplay.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 11,
    title: "PetSwipe",
    role: "iOS Developer",
    course: "INFO 449",
    description:
      "iOS mobile app that helps users discover and match with adoptable pets through a swipe-based interface.",
    technologies: ["Swift", "UIKit", "Firebase", "iOS Development"],
    github: "https://github.com/wena04/Petswipe",
    demo: null,
    image: "/images/petswipe.png",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 12,
    title: "Portfolio 2026",
    role: "Creative Dev",
    description:
      "The interactive 3D portfolio site you are looking at right now.",
    technologies: ["React", "Three.js", "Vite", "CSS"],
    github: "https://github.com/wena04/wena04.github.io",
    demo: "https://wena04.github.io",
    image: "/images/portfolio.png",
    date: "2026",
    featured: false,
    type: "coding",
  },
];

// =============================================================================
// DESIGN PROJECTS (UI/UX)
// =============================================================================
export const designProjects = [
  {
    id: 101,
    title: "Tempad 2.0",
    role: "UI/UX Design",
    event: "DubsTech Protothon 2024",
    collaborators: ["Amelia Li"],
    description:
      "Time travel application inspired by the TV series Loki. Designed user interfaces based on time travel theme during DubsTech's two-day protothon.",
    tools: ["Figma"],
    link: null, // TODO: Add live demo link
    image: "/images/tempad.png",
    date: "2024",
    featured: true,
    type: "design",
  },
  {
    id: 102,
    title: "PAC: Play & Cure",
    role: "Product Design",
    description:
      "Personal product design project.", // TODO: Add full description
    tools: ["Figma", "Adobe AI"],
    link: null,
    image: "/images/pac.png",
    date: "2024",
    featured: true,
    type: "design",
  },
  {
    id: 103,
    title: "SWIMPLE",
    role: "Product Design",
    description:
      "Swim app and smart goggles concept. Created 3D diagrams of swimming positions, wireframes and mock-ups for a swim application.",
    tools: ["Adobe AI", "Adobe PS", "Figma"],
    link: null,
    image: "/images/swimple.png",
    date: "2023",
    featured: true,
    type: "design",
  },
  {
    id: 104,
    title: "EXTENT: Height App",
    role: "Product Design",
    description:
      "Mobile app design for height tracking and visualization.", // TODO: Add full description
    tools: ["Figma"],
    link: null,
    image: "/images/extent.png",
    date: "2024",
    featured: false,
    type: "design",
  },
  {
    id: 105,
    title: "Temporary Plastic Viewing Device",
    role: "Sustainability Design",
    description:
      "Product design project focused on sustainability and reducing plastic waste.", // TODO: Add full description
    tools: ["Figma", "Adobe AI"],
    link: null,
    image: "/images/plastic-device.png",
    date: "2024",
    featured: false,
    type: "design",
  },
  {
    id: 106,
    title: "GVCC Internal Business Automation",
    role: "UI/UX Design",
    description:
      "Designed internal business automation system for GVCC after conducting user research, resolving 10+ bugs and UX issues through cross-departmental collaborations.",
    tools: ["Adobe AI", "Figma"],
    link: null,
    image: "/images/gvcc-design.png",
    date: "2023",
    featured: false,
    type: "design",
  },
];

// =============================================================================
// COMBINED EXPORTS
// =============================================================================
export const allProjects = [...codingProjects, ...designProjects];

export const featuredProjects = allProjects.filter((p) => p.featured);

export const featuredCoding = codingProjects.filter((p) => p.featured);
export const featuredDesign = designProjects.filter((p) => p.featured);
