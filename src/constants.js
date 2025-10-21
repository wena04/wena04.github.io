// Personal Information
export const PERSONAL_INFO = {
  name: "Anthony Wen",
  title: "Developer • CS + INFO Student • Boba + Music Lover",
  email: "wena04@uw.edu",
  university: "University of Washington",
  major: "Computer Science & Informatics",
  location: "Seattle, WA",
  bio: "Communication is key in life. Undergraduate student at the University of Washington currently pursuing a double degree in Computer Science and Informatics.",
  status: ["⚙️ Full-Stack Dev", "🧠 Product Thinking", "🧋 Boba Dev Hours"],
};

// Social Links
export const SOCIAL_LINKS = {
  email: "mailto:wena04@uw.edu",
  linkedin: "https://linkedin.com/in/anthony-wen",
  github: "https://github.com/wena04",
  twitter: "https://twitter.com/wena04",
};

// Navigation Items
export const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// Skills
export const SKILLS = {
  frontend: [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML/CSS",
    "Three.js",
    "Vite",
  ],
  backend: ["Node.js", "Python", "Java", "SQL", "Express.js", "FastAPI"],
  tools: ["Git", "Docker", "VS Code", "Figma", "Postman", "MongoDB"],
  languages: ["English", "Chinese (Mandarin)"],
};

// Projects Data
export const PROJECTS = [
  {
    id: "solar-system",
    title: "3D Solar System",
    description:
      "Interactive 3D solar system built with Three.js and React Three Fiber, featuring realistic physics and orbital mechanics.",
    technologies: ["Three.js", "React Three Fiber", "Rapier Physics", "React"],
    github: "https://github.com/wena04/solar-system",
    demo: "https://wena04.github.io/solar-system",
    image: "/images/solar-system.png",
    featured: true,
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Personal portfolio website with 3D interactive elements and modern design, showcasing my projects and skills.",
    technologies: ["React", "Vite", "Three.js", "CSS3", "JavaScript"],
    github: "https://github.com/wena04/wena04.github.io",
    demo: "https://wena04.github.io",
    image: "/images/portfolio.png",
    featured: true,
  },
  {
    id: "data-dashboard",
    title: "Data Visualization Dashboard",
    description:
      "Real-time data visualization dashboard for analyzing market trends and financial data with interactive charts.",
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/wena04/data-dashboard",
    demo: "https://data-dashboard.vercel.app",
    image: "/images/dashboard.png",
    featured: false,
  },
];

// Site Metadata
export const SITE_METADATA = {
  title: "Anthony Wen - Portfolio",
  description:
    "Computer Science & Informatics student at UW. Full-stack developer passionate about 3D graphics, data visualization, and innovative technology solutions.",
  keywords: [
    "Anthony Wen",
    "Portfolio",
    "Developer",
    "Computer Science",
    "UW",
    "Three.js",
    "React",
    "JavaScript",
  ],
  author: "Anthony Wen",
  url: "https://wena04.github.io",
  image: "/og-image.png",
};

// Animation Settings
export const ANIMATION_CONFIG = {
  duration: 300,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  stagger: 100,
};

// Three.js Settings
export const THREE_CONFIG = {
  camera: {
    fov: 50,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 8 },
  },
  renderer: {
    antialias: true,
    shadowMap: true,
    shadowMapType: "PCFSoftShadowMap",
  },
  lights: {
    ambient: { color: 0xffffff, intensity: 0.05 },
    sun: { color: 0xffff00, intensity: 3, distance: 25 },
    directional: { color: 0xffffff, intensity: 0.3 },
  },
};

