// Work experience and education data
// Source: LinkedIn + Resume

const logos = {
  aws: "/images/logos/aws.png",
  paypal: "/images/logos/paypal.png",
  uw: "/images/logos/uw.png",
  uwIschool: "/images/logos/uw-ischool.png",
  gekko: "/images/logos/gekko.png",
  standard: "/images/logos/standard.png",
  gvcc: "/images/logos/gvcc.svg",
  games37: "/images/logos/37games.png",
  aisg: "/images/logos/aisg.png",
};

export const experiences = [
  // Upcoming & current roles (newest first)
  {
    id: 11,
    date: "Sep 2026 - Dec 2026",
    title: "Software Development Intern",
    company: "Amazon Web Services (AWS)",
    location: "Seattle, WA",
    description:
      "Software development internship at AWS in Seattle.",
    skills: ["Java", "AWS", "Software Development"],
    logo: logos.aws,
    logoDark: true,
  },
  {
    id: 12,
    date: "Jun 2026 - Sep 2026",
    title: "Full Stack Software Engineer Intern",
    company: "PayPal",
    location: "San Jose, CA",
    description:
      "Full-stack software engineering internship at PayPal headquarters in San Jose.",
    skills: ["Full-stack Development", "JavaScript", "Software Engineering"],
    logo: logos.paypal,
  },
  {
    id: 1,
    date: "Dec 2025 - Present",
    title: "Data Visualization Lead Teaching Assistant",
    company: "University of Washington Information School",
    course: "CSE 442 / INFO 474",
    description:
      "Lead TA for Data Visualization course, teaching p5.js and data visualization concepts.",
    skills: ["p5.js", "Data Visualization", "D3.js", "Teaching"],
    logo: logos.uwIschool,
  },
  {
    id: 6,
    date: "Sep 2025 - Present",
    title: "Lead Server-side Development Teaching Assistant",
    company: "University of Washington Information School",
    course: "INFO 441",
    description:
      "Lead TA for Server-side Development course, teaching MVC architecture and backend development.",
    skills: ["Node.js", "MVC", "Software Project Management", "Teaching"],
    logo: logos.uwIschool,
  },
  {
    id: 2,
    date: "Dec 2025 - Present",
    title: "Full-stack Developer Intern",
    company: "Gekko Corporation",
    location: "Bellevue, WA (Hybrid)",
    note: "iSchool Capstone Project",
    description:
      "Full-stack development internship working with Docker and IBM technologies as part of the UW Information School Capstone program.",
    skills: ["Docker", "IBM", "Full-stack Development"],
    logo: logos.gekko,
  },
  {
    id: 5,
    date: "Sep 2025 - Dec 2025",
    title: "Software Engineer Intern",
    company: "Standard",
    location: "New York, NY (Remote)",
    description: "Writing Python code for software development.",
    skills: ["Python"],
    logo: logos.standard,
  },
  {
    id: 7,
    date: "Mar 2025 - Aug 2025",
    title: "Front-end Development Teaching Assistant",
    company: "University of Washington Information School",
    course: "INFO 340",
    description:
      "TA for Front-end Development course, teaching HTML, CSS, and React.js.",
    skills: ["HTML/CSS", "React.js", "JavaScript", "Teaching"],
    logo: logos.uwIschool,
  },
  {
    id: 3,
    date: "Jul 2024 - Present",
    title: "Learning Management System Consultant",
    company: "University of Washington",
    description:
      "Provide front-line support in person, via email, and over the phone. Research and document solutions to technical issues and consultations. Build experience with software testing and QA.",
    skills: ["Consulting", "Customer Service", "QA", "Technical Support"],
    logo: logos.uw,
  },

  // Earlier roles (overflow accordion)
  {
    id: 9,
    date: "May 2023 - Nov 2023",
    title: "Software Engineer Intern",
    company: "Global Visa Consultation Center (GVCC)",
    description:
      "Designed and developed their entire internal business automation system from scratch",
    skills: ["JavaScript", "MySQL", "Bootstrap", "Adobe AI", "Data Migration"],
    logo: logos.gvcc,
  },
  {
    id: 10,
    date: "Dec 2020",
    title: "Software Engineer Intern",
    company: "37Games",
    location: "China",
    description:
      "Front-End team at 3rd largest gaming company in China. Assisted team of 8 software engineers using Unity to create and enhance game effects like rain simulation. Practiced using Lua and C# to write sorting and searching algorithms.",
    skills: ["Unity", "Lua", "C#", "Game Development"],
    logo: logos.games37,
  },
];

export const education = [
  {
    id: 1,
    date: "Sep 2023 - Jun 2027 (Expected)",
    school: "University of Washington, Seattle",
    degree: "B.S. in Computer Science | B.S. in Informatics (Bioinformatics Track) | Double Degree",
    minor: "Applied Mathematics",
    standing: "Junior (Senior Standing in Credits)",
    admissions: "Direct Admit (Early Start Entrance)",
    honors: "Dean's List · Robert N. Chang Scholarship",
    logo: logos.uw,
    coursework: [
      "Machine Learning",
      "Computer Security",
      "Datacenter Systems",
      "Data Science",
      "Database and Data Models",
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Frontend Development",
      "Server-Side Development",
      "Data Visualization",
    ],
    activities: [
      "COM^2",
      "Informatics Undergraduate Association",
      "UW Symphonic Band",
      "Software Engineering Career Club",
      "UW BIA",
    ],
  },
  {
    id: 2,
    date: "Grad. 2023",
    school: "American International School of Guangzhou",
    degree: "IB Diploma",
    minor: "",
    honors: "HL Math AA, Physics, Computer Science",
    logo: logos.aisg,
  },
];

// Research roles — shown in the Research & Clubs section.
export const research = [
  {
    id: 1,
    title: "Research Assistant",
    company: "UW Interactive Data Lab",
    advisor: "Kyle Thayer",
    date: "2025 - Present",
    description:
      "Multi-lingual color naming research — exploring how different languages name and categorize colors.",
    skills: ["Data Visualization", "p5.js", "Research"],
    url: "https://idl.uw.edu",
  },
  {
    id: 2,
    title: "Software Developer",
    company: "Wordplaypen",
    advisor: "Prof. Amy J. Ko",
    date: "Jan 2024 - Jun 2024",
    description:
      "Accessibility work on an inclusive programming language & IDE — making learning to code accessible across language barriers.",
    skills: ["TypeScript", "Accessibility", "Open Source"],
    url: "https://wordplay.dev",
  },
];

export const clubs = [
  {
    id: 1,
    title: "Technical Team Lead",
    organization: "Organization of Hua Classmates",
    location: "Seattle, WA",
    date: "Jan 2025 - Present",
    category: "Science and Technology",
    description:
      "Lead the technical team building and maintaining the club website and digital presence.",
    project: "华大课友社团官网",
    url: "https://uwclassmate.com",
  },
  {
    id: 2,
    title: "Mentorship Program Manager",
    organization: "Software Engineering Career Club at UW",
    date: "Jul 2024 - Present",
    category: "Science and Technology",
    description:
      "Manage the SWECC mentorship program pairing students with industry mentors.",
    url: "https://swecc.org",
  },
  {
    id: 3,
    title: "Coordinator",
    organization: "BIA at UW",
    date: "Jun 2024 - Present",
    category: "Social Services",
    description:
      "Coordinate events and operations for the UW Business in Asia student organization.",
    url: "https://www.linkedin.com/company/bia-at-uw",
  },
  {
    id: 4,
    title: "Software Developer",
    organization: "CSeed",
    date: "2025 - Present",
    category: "Science and Technology",
    description:
      "Building Breakpoint, a trader prediction bot for soccer and tennis betting markets.",
    project: "Breakpoint",
    url: "https://www.cseed.co",
  },
];

// @deprecated — use `clubs`
export const volunteering = clubs;

export const awards = [
  {
    id: 1,
    title: "Gary A. Kildall Endowed Scholarship",
    issuer: "Paul G. Allen School of Computer Science & Engineering",
    date: "Sep 2024",
    description:
      "Awarded to 2 outstanding CSE undergraduates based on academic merit out of 400+ applicants",
  },
  {
    id: 2,
    title: "Robert N. Chang Scholarship",
    issuer: "University of Washington",
    date: "2025",
    description:
      "Scholarship recognizing academic achievement and potential in computing and informatics.",
  },
  {
    id: 3,
    title: "Annual Dean's List Recipient",
    issuer: "University of Washington",
    date: "2023 - Present",
  },
  {
    id: 4,
    title: "T-Mobile & Nokia Track Winner",
    issuer: "DubHacks 2024",
    date: "Oct 2024",
    project: "TFind",
  },
  {
    id: 5,
    title: "Photon Track 1st Place",
    issuer: "USC Build with TRAE & MiniMax 2026",
    date: "Mar 2026",
    project: "Recall",
  },
  {
    id: 6,
    title: "Second Prize Award",
    issuer: "USC Build with TRAE & MiniMax 2026",
    date: "Mar 2026",
    project: "Recall",
  },
  {
    id: 7,
    title: "INRIX Amazon University Hackathon Finalist",
    issuer: "INRIX",
    date: "Oct 2023",
    project: "SmartFuel",
  },
  {
    id: 8,
    title: "Int'l Contemporary Youth Art Design Competition",
    issuer: "Silver Award",
    date: "2022",
  },
  {
    id: 9,
    title: "VEX Robotics Competition Asia Opening",
    issuer: "First Prize Award",
    date: "2021",
  },
  {
    id: 10,
    title: "USA Computing Olympiad (USACO)",
    issuer: "Gold Division",
    date: "2020",
  },
];

export const certifications = [
  {
    id: 1,
    title: "IB Diploma",
    subjects: "HL Math AA, Physics, Computer Science",
    issuer: "International Baccalaureate",
    date: "May 2023",
  },
  {
    id: 2,
    title: "Microsoft Technology Associate",
    subjects: "Introduction to Programming Using Python",
    issuer: "Microsoft",
    date: "Aug 2020",
  },
];

export const languages = [
  { name: "English", proficiency: "Native" },
  { name: "Chinese (Mandarin)", proficiency: "Native/Bilingual" },
  { name: "Cantonese", proficiency: "Native/Bilingual" },
];
