/**
 * Formats current portfolio state back into portfolioData.js code string
 */
export function generatePortfolioDataJsString({ profile, skills, projects, tracks }) {
  return `import profileImg from '../assets/profile_img.png';

// Portfolio Central Data Configuration
// Auto-generated & synced via Portfolio Admin Dashboard

export const personalInfo = ${JSON.stringify(profile, null, 2).replace('"profileImg"', 'profileImg')};

export const skillsData = ${JSON.stringify(skills, null, 2)};

export const marqueeSkills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "JavaScript ES6+",
  "TailwindCSS", "Redux Toolkit", "REST APIs", "JWT Authentication",
  "HTML5/CSS3", "Git & GitHub", "Vite", "Responsive Design", "Mongoose", "Postman"
];

export const projectTracks = ${JSON.stringify(tracks, null, 2)};

export const projectsData = ${JSON.stringify(projects, null, 2)};

export const experienceData = [
  {
    type: "Education",
    period: "2022 - 2026",
    title: "BS Software Engineering",
    organization: "Islamia College University, Peshawar",
    location: "Peshawar, Khyber Pakhtunkhwa",
    desc: "Comprehensive software engineering degree covering Software Architecture, Algorithms & Data Structures, Modern Web Technologies, OOP, Database Systems, Computer Networks, and Full Stack application lifecycle.",
    tags: ["Software Engineering", "Full Stack", "Algorithms", "React & Node.js", "Databases"]
  },
  {
    type: "Experience",
    period: "2024 - Present",
    title: "Full Stack Web Developer (MERN)",
    organization: "Freelance & Independent Projects",
    location: "Peshawar, Pakistan",
    desc: "Architecting custom full-stack web applications, dynamic React frontends, scalable Express/Node.js REST APIs, and optimized MongoDB schemas for client and real-world projects.",
    tags: ["React 19", "Node.js", "Express", "MongoDB", "REST APIs", "TailwindCSS"]
  },
  {
    type: "Education",
    period: "2020 - 2022",
    title: "FSc Pre-Engineering",
    organization: "Wisdom College, Hangu",
    location: "Hangu, Khyber Pakhtunkhwa",
    desc: "Strong core analytical and mathematical foundation with rigorous coursework in Calculus, Physics, Analytical Reasoning, and Scientific Methodology.",
    tags: ["Pre-Engineering", "Mathematics", "Physics", "Analytical Problem Solving"]
  },
  {
    type: "Education",
    period: "2018 - 2020",
    title: "Matriculation (Science)",
    organization: "Al-Noor Public High School, Hangu",
    location: "Hangu, Khyber Pakhtunkhwa",
    desc: "Secondary School Certificate (SSC) with top academic performance and distinction in General Science, Computer Fundamentals, and Mathematics.",
    tags: ["Matric Science", "Computer Fundamentals", "Secondary Education"]
  }
];

export const servicesData = [
  {
    icon: "Code",
    title: "Full Stack MERN Development",
    desc: "End-to-end web application development from scalable MongoDB schemas and robust Express APIs to dynamic, responsive React user interfaces.",
    color: "#0284c7"
  },
  {
    icon: "Layout",
    title: "Modern UI/UX & Frontend",
    desc: "Pixel-perfect, ultra-smooth frontends built with modern React, TailwindCSS, glassmorphism, and engaging micro-animations.",
    color: "#6366f1"
  },
  {
    icon: "Server",
    title: "RESTful API Engineering",
    desc: "Secure, well-documented REST APIs with JWT authentication, role-based access control, caching, and rate limiting.",
    color: "#059669"
  },
  {
    icon: "Zap",
    title: "Performance & Optimization",
    desc: "Lightning-fast page load speeds, SEO optimization, responsive mobile compatibility, and clean code standards.",
    color: "#d97706"
  }
];

export const terminalCommands = {
  help: "Available commands: 'about', 'skills', 'projects', 'contact', 'clear', 'socials'",
  about: "Maaz Ahmad - Passionate Full Stack MERN Developer from Peshawar, Pakistan.",
  skills: "React, Node.js, Express, MongoDB, TailwindCSS, JavaScript ES6+, Git, REST APIs",
  projects: "DevPulse MERN Community, ShopZen E-Commerce, TaskFlow Pro, WeatherNexus, CryptoView",
  contact: "Email: maazahmad21988@gmail.com | WhatsApp: +92 335 3545245",
  socials: "GitHub: github.com/maaz-ahmad06 | LinkedIn: linkedin.com/in/maaz-ahmad-a71830414 | WhatsApp: wa.me/923353545245"
};
`;
}
