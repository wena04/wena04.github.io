// Projects data - coding and design
// Source: Resume, GitHub, LinkedIn, Project List

// =============================================================================
// CODING PROJECTS
// =============================================================================
export const codingProjects = [
  // Featured / Hackathon Projects
  {
    id: 14,
    title: "Recall",
    role: "AI / Full Stack",
    award: "Photon Track 1st Place · Second Prize @ USC Build with TRAE & MiniMax 2026",
    description:
      "AI-powered “second brain” that transforms unstructured chat history, browser history, links, and screenshots into structured, searchable memories — with proactive location-based recall and a personalized RAG chatbot.",
    technologies: ["RAG", "Vector Databases", "LLMs", "Python", "AI"],
    github: "https://github.com/wena04/recall",
    demo: "https://traerecall1ehv.vercel.app",
    image: "/images/recall.png",
    date: "Mar 2026",
    featured: true,
    type: "coding",
  },
  {
    id: 1,
    title: "Breakpoint",
    role: "Full Stack",
    collaborators: ["David Gao"],
    description:
      "Trader prediction bot for sports betting markets — soccer and tennis — built for CSeed. Analyzes match data to surface betting insights and predictions.",
    technologies: ["Python", "Machine Learning", "APIs", "Data Analysis"],
    github: null,
    demo: null,
    image: "/images/breakpoint.svg",
    date: "2026",
    featured: true,
    type: "coding",
  },
  {
    id: 2,
    title: "AWS Pilot",
    role: "Full Stack",
    collaborators: ["Marco Guo", "Amelia Li", "Anna Huang"],
    description:
      "AI-powered Chrome extension that provides real-time AWS Console guidance to deliver secure, on-screen tutoring, automated workflows, and intelligent error assistance.",
    technologies: ["Node.js", "AWS Lambda", "Amazon Bedrock", "Python", "Chrome Extension", "DynamoDB", "API"],
    github: "https://github.com/Marc0Guo/Dubhacks2025",
    demo: "https://devpost.com/software/airesearch",
    image: "/images/aws-pilot.png",
    imageFit: "contain",
    date: "Oct 2025",
    featured: true,
    type: "coding",
  },
  {
    id: 3,
    title: "TFind",
    role: "3D Visualization",
    award: "T-Mobile & Nokia Track Winner @ DubHacks 2024",
    collaborators: ["Brian K.", "Randolph Jenkins", "Larry Liu"],
    description:
      "Street-GL-based interactive web application that allows companies to track, manage, and analyze multiple device locations, signal strengths, and access to T-Mobile Nokia 5G network resources in real time, all visualized on a dynamic 3D map.",
    technologies: ["Three.js", "Node.js", "MongoDB", "T-Mobile API", "Nokia API", "Data Visualization"],
    github: null,
    demo: "https://devpost.com/software/tfind-0qaop5",
    image: "/images/tfind.png",
    imageFit: "contain",
    date: "Oct 2024",
    featured: true,
    type: "coding",
  },
  {
    id: 4,
    title: "SmartFuel",
    role: "Full Stack",
    award: "INRIX Hackathon Finalist",
    description:
      "Cost-efficient routing engine using Inrix Traffic API, Google Maps Routes, and Leaflet to compute and visualize cheapest driving paths with real-time gas-price overlays.",
    technologies: ["Google Maps API", "SQL", "Tailwind", "Azure", "ER Modeling", "Leaflet"],
    github: "https://github.com/FRCroboSam/inrix-amazon-hack-23",
    demo: "https://devpost.com/software/fuel-maps",
    image: "/images/smartfuel.png",
    imageFit: "contain",
    date: "Dec 2023",
    featured: true,
    type: "coding",
  },

  // Course Projects
  {
    id: 5,
    title: "Mini Google",
    role: "Systems Programming",
    course: "CSE 333",
    description:
      "Search engine implementation with file system crawling and indexing.",
    technologies: ["C", "C++", "Systems Programming"],
    github: null,
    demo: null,
    image: "/images/mini-google.svg",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 6,
    title: "KACK FoodBank",
    role: "Frontend Developer",
    course: "INFO 340",
    description:
      "Web application for food bank management and donor coordination.",
    technologies: ["React", "HTML/CSS", "JavaScript"],
    github: "https://github.com/wena04/project-kack",
    demo: null,
    image: "/images/kack-foodbank.svg",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
    title: "PetSwipe",
    role: "iOS Developer",
    course: "INFO 449",
    collaborators: ["Jessica Wang", "Amelia Li", "George Lee", "Marco Guo"],
    description:
      "INFO 449 iOS app (Swift / UIKit / Firebase) that reimagines pet adoption with a swipe-to-match interface, preference filters, and location-aware discovery so adopters can find shelter pets more easily.",
    technologies: ["Swift", "UIKit", "Firebase", "iOS Development"],
    github: "https://github.com/wena04/petswipe",
    demo: null,
    youtube: "/videos/petswipe-demo.mp4",
    image: "/images/petswipe.jpg",
    date: "2024",
    featured: false,
    type: "coding",
  },
  {
    id: 15,
    title: "华大课友社团官网",
    role: "Technical Team Lead",
    description:
      "Official website for the Organization of Hua Classmates at UW — built and maintained by the technical team.",
    technologies: ["React", "Web Development", "UI/UX"],
    github: null,
    demo: null,
    image: "/images/ohcc-website.png",
    date: "2025",
    featured: false,
    type: "coding",
  },
  {
    id: 13,
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
// Covers only on-site; full case-study PDFs stay private (available on request).
// =============================================================================
export const designProjects = [
  {
    id: 101,
    title: "Tempad 2.0",
    role: "UI/UX Design",
    event: "DubsTech Protothon 2024",
    collaborators: ["Amelia Li"],
    description:
      "Time travel application inspired by Loki. Designed themed UI and end-to-end flows during DubsTech’s two-day protothon.",
    tools: ["Figma"],
    link: "https://www.figma.com/proto/LwjP9jGd7bmgFA2xF9OAOr/TEMPAD-2.0?node-id=59-106&t=oSMGhQG6OhaQq6dN-1&starting-point-node-id=59%3A106",
    image: "/images/tempad.jpg",
    date: "2024",
    featured: true,
    type: "design",
  },
  {
    id: 102,
    title: "PAC: Play & Cure",
    role: "Product Design",
    description:
      "Music-therapy app paired with an interactive toy for children with autism—session planning for guardians and therapists, plus an Arduino-linked prototype for play-based engagement.",
    tools: ["Arduino", "Adobe AI", "Adobe PS"],
    link: null,
    image: "/images/pac.jpg",
    date: "2022",
    featured: true,
    type: "design",
  },
  {
    id: 103,
    title: "SWIMPLE",
    role: "Product Design",
    description:
      "Swim-training concept pairing an app with AR smart goggles: posture guidance, in-swim stats, tutorials, and goal tracking for more efficient practice.",
    tools: ["Adobe AI", "Adobe PS"],
    link: null,
    image: "/images/swimple.jpg",
    date: "2022",
    featured: true,
    type: "design",
  },
  {
    id: 104,
    title: "EXTENT: Height App",
    role: "Product Design",
    description:
      "Height-focused mobile UX for training, growth management, and using stature to advantage in athletic and social contexts—tutorials, tracking, community, and shop flows.",
    tools: ["Adobe AI", "Adobe PS"],
    link: null,
    image: "/images/extent.jpg",
    date: "2022",
    featured: false,
    type: "design",
  },
  {
    id: 105,
    title: "Temporary Plastic Viewing Device",
    role: "Sustainability Design",
    description:
      "Team project fabricating bioplastics from food waste and building a viewing device that makes biodegradable materials tangible—research, material experiments, and an educational installation.",
    tools: ["Bioplastics", "Adobe AI"],
    link: null,
    image: "/images/plastic-device.jpg",
    date: "2022",
    featured: false,
    type: "design",
  },
  {
    id: 106,
    title: "GVCC Internal Business Automation",
    role: "UI/UX Design",
    description:
      "Internal case-management UI for GVCC: role-based login and workflows after user research, fixing 10+ UX issues across departments.",
    tools: ["Adobe AI", "Figma"],
    link: null,
    image: "/images/gvcc-design.jpg",
    date: "2023",
    featured: false,
    type: "design",
  },
];

// =============================================================================
// FINE ART (covers only — mid-res composites, no full case PDFs)
// =============================================================================
export const artProjects = [
  {
    id: 201,
    title: "White Cloud & Sparkle Wave",
    role: "Acrylic Painting",
    award: "Silver · Int'l Contemporary Youth Art Design Competition",
    description:
      "Two acrylic landscapes on contrast and stillness: White Cloud (night sky, mountain glow) and Sparkle Wave (surf with bright foam against dark water).",
    tools: ["Acrylic", "Pencil"],
    link: null,
    image: "/images/white-cloud-sparkle-wave.jpg",
    date: "2022",
    featured: false,
    type: "art",
  },
  {
    id: 202,
    title: "Doomsday Alley · Configuration · Cupcake Afterparty",
    role: "Drawing / Mixed Media",
    description:
      "Three works from one sunset session—alley perspective, geometric still life, and stacked cupcake forms—playing with RGB emotion through colored pencil and watercolor.",
    tools: ["Colored pencil", "Watercolor", "Outliner"],
    link: null,
    image: "/images/doomsday-configuration-cupcake.jpg",
    date: "2022",
    featured: false,
    type: "art",
  },
];

// =============================================================================
// COMBINED EXPORTS
// =============================================================================
// Link slots per project: github, website (demo/link aliases), youtube — null until set.
const withLinks = (p) => ({
  ...p,
  github: p.github ?? null,
  website: p.website ?? p.demo ?? p.link ?? null,
  youtube: p.youtube ?? null,
});

export const allProjects = [...codingProjects, ...designProjects, ...artProjects].map(withLinks);
export const codingProjectsNorm = codingProjects.map(withLinks);
export const designProjectsNorm = designProjects.map(withLinks);
export const artProjectsNorm = artProjects.map(withLinks);

export const featuredProjects = allProjects.filter((p) => p.featured);

export const featuredCoding = codingProjects.filter((p) => p.featured);
export const featuredDesign = designProjects.filter((p) => p.featured);
