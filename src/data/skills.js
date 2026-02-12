// Skills and technologies
// Source: Resume

export const skills = {
  languages: [
    "Python",
    "Java",
    "TypeScript",
    "JavaScript",
    "C",
    "C++",
    "SQL",
    "HTML/CSS",
    "Lua",
    "R",
    "C#",
  ],
  technologies: [
    "React",
    "Node.js",
    "Three.js",
    "Azure",
    "MongoDB",
    "Express.js",
    "Git",
    "Linux",
  ],
  tools: [
    "Figma",
    "Adobe Apps (AI, PS)",
    "Unity",
    "RStudio",
    "Tableau",
    "Vim",
    "GDB",
  ],
};

// Flat list for badge display (featured skills)
export const featuredSkills = [
  { name: "Python", category: "language" },
  { name: "Java", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "C/C++", category: "language" },
  { name: "SQL", category: "language" },
  { name: "HTML/CSS", category: "language" },
  { name: "React", category: "technology" },
  { name: "Node.js", category: "technology" },
  { name: "Three.js", category: "technology" },
  { name: "Azure", category: "technology" },
  { name: "MongoDB", category: "technology" },
  { name: "Git", category: "technology" },
  { name: "Figma", category: "tool" },
  { name: "Linux", category: "technology" },
];

// Skill icons for 3D orbit (devicon CDN)
// Source: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
export const skillIcons = [
  { name: "Java", url: `${DEVICON_BASE}/java/java-original.svg` },
  { name: "Python", url: `${DEVICON_BASE}/python/python-plain.svg` },
  { name: "C++", url: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg` },
  {
    name: "JavaScript",
    url: `${DEVICON_BASE}/javascript/javascript-plain.svg`,
  },
  {
    name: "TypeScript",
    url: `${DEVICON_BASE}/typescript/typescript-plain.svg`,
  },
  { name: "React", url: `${DEVICON_BASE}/react/react-original.svg` },
  { name: "Node.js", url: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  { name: "HTML", url: `${DEVICON_BASE}/html5/html5-plain.svg` },
  { name: "CSS", url: `${DEVICON_BASE}/css3/css3-plain.svg` },
  { name: "R", url: `${DEVICON_BASE}/r/r-original.svg` },
  { name: "Lua", url: `${DEVICON_BASE}/lua/lua-original.svg` },
  { name: "Git", url: `${DEVICON_BASE}/git/git-original.svg` },
  { name: "Figma", url: `${DEVICON_BASE}/figma/figma-original.svg` },
  { name: "MongoDB", url: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
  {
    name: "Illustrator",
    url: `${DEVICON_BASE}/illustrator/illustrator-plain.svg`,
  },
  {
    name: "Photoshop",
    url: `${DEVICON_BASE}/photoshop/photoshop-original.svg`,
  },
];
