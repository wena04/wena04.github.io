// Work experience and education data
// Source: LinkedIn + Resume

export const experiences = [
  // Current Roles
  {
    id: 1,
    date: "Dec 2025 - Present",
    title: "Data Visualization Lead Teaching Assistant",
    company: "University of Washington Information School",
    course: "CSE 442 / INFO 474",
    description:
      "Lead TA for Data Visualization course, teaching p5.js and data visualization concepts.",
    skills: ["p5.js", "Data Visualization", "D3.js", "Teaching"],
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
  },
  {
    id: 3,
    date: "Jul 2024 - Present",
    title: "Learning Management System Consultant",
    company: "University of Washington",
    description:
      "Provide front-line support in person, via email, and over the phone. Research and document solutions to technical issues and consultations. Build experience with software testing and QA.",
    skills: ["Consulting", "Customer Service", "QA", "Technical Support"],
  },
  // TODO: Add Kyle Thayer / IDL Color Naming Research when title is confirmed
  // {
  //   id: 4,
  //   date: "??? - Present",
  //   title: "Research Assistant",
  //   company: "UW Interactive Data Lab (Kyle Thayer)",
  //   description: "Contributing to Multi-Lingual Color Naming research project.",
  //   skills: ["Data Visualization", "Research"],
  // },

  // Past Roles
  {
    id: 5,
    date: "Sep 2025 - Dec 2025",
    title: "Software Engineer Intern",
    company: "Standard",
    location: "New York, NY (Remote)",
    description: "Writing Python code for software development.",
    skills: ["Python"],
  },
  {
    id: 6,
    date: "Sep 2025 - Dec 2025",
    title: "Server-side Development Teaching Assistant",
    company: "University of Washington Information School",
    course: "INFO 441",
    description:
      "TA for Server-side Development course, teaching MVC architecture and backend development.",
    skills: ["Software Project Management", "MVC", "Node.js", "Teaching"],
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
  },
  {
    id: 8,
    date: "Jan 2024 - Jun 2024",
    title: "Software Developer",
    company: "Wordplaypen",
    description:
      "Designed and developed solutions to bugs in the Wordplaypen Program using TypeScript. Collaborated in a team led by Professor Amy J. Ko to make learning programming more accessible to people with language barriers.",
    skills: ["TypeScript", "Web Development", "Open Source", "Accessibility"],
  },
  {
    id: 9,
    date: "May 2023 - Nov 2023",
    title: "Software Engineer Intern",
    company: "Global Visa Consultation Center (GVCC)",
    description:
      "Designed and developed their entire internal business automation system from scratch",
    skills: ["JavaScript", "MySQL", "Bootstrap", "Adobe AI", "Data Migration"],
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
  },
];

export const education = [
  {
    id: 1,
    date: "Sep 2023 - Jun 2027 (Expected)",
    school: "University of Washington, Seattle",
    degree: "B.S. in Computer Science | B.S. in Informatics | Double Degree",
    minor: "Applied Mathematics",
    standing: "Junior (Senior Standing in Credits)",
    admissions: "Direct Admit (Early Start Entrance)",
    honors: "Dean's List Student",
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
];

export const volunteering = [
  {
    id: 1,
    title: "Mentorship Program Manager",
    organization: "Software Engineering Career Club at UW (SWECC)",
    date: "Jul 2024 - Present",
    category: "Science and Technology",
  },
  {
    id: 2,
    title: "Software Developer",
    organization: "Organization of Hua Classmates",
    date: "Jan 2025 - Present",
    category: "Science and Technology",
  },
];

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
    title: "Annual Dean's List Recipient",
    issuer: "University of Washington",
    date: "2023 - Present",
  },
  {
    id: 3,
    title: "T-Mobile & Nokia Track Winner",
    issuer: "DubHacks 2024",
    date: "Oct 2024",
    project: "TFind",
  },
  {
    id: 4,
    title: "INRIX Amazon University Hackathon Finalist",
    issuer: "INRIX",
    date: "Oct 2023",
    project: "SmartFuel",
  },
  {
    id: 5,
    title: "Int'l Contemporary Youth Art Design Competition",
    issuer: "Silver Award",
    date: "2022",
  },
  {
    id: 6,
    title: "VEX Robotics Competition Asia Opening",
    issuer: "First Prize Award",
    date: "2021",
  },
  {
    id: 7,
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
