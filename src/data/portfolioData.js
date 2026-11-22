import profileImg from '../assets/profile_img.png';

// Portfolio Central Data Configuration
// You can easily update your personal info, projects, skills, and links in this single file!

export const personalInfo = {
  name: "Maaz Ahmad",
  firstName: "Maaz",
  lastName: "Ahmad",
  avatar: profileImg, // Using high-res profile image from assets
  tagline: "Full Stack MERN Developer & Software Engineering Graduate",
  roles: [
    "Full Stack MERN Developer",
    "Software Engineering Graduate",
    "React & Modern UI Engineer",
    "Node.js & Express API Architect",
    "MongoDB & Database Specialist"
  ],
  bio: "Software Engineering Graduate from Islamia College University Peshawar with hands-on expertise in the Full Stack MERN ecosystem (MongoDB, Express.js, React, Node.js). Dedicated to engineering blazing-fast, scalable web applications with immersive interactive user experiences.",
  location: "Peshawar, Pakistan",
  hometown: "Orakzai, Pakistan",
  email: "maazahmad21988@gmail.com",
  phone: "+92 335 3545245",
  status: "Available for Full-time Roles & Freelance Projects",
  yearsExperience: "2+",
  completedProjects: "0",
  satisfiedClients: "15+",
  codeCommits: "850+",
  socials: {
    github: "https://github.com/maaz-ahmad06",
    linkedin: "https://www.linkedin.com/in/maaz-ahmad-a71830414",
    whatsapp: "https://wa.me/923353545245",
    email: "mailto:maazahmad21988@gmail.com"
  },
  resumeUrl: "#resume"
};

export const skillsData = {
  frontend: [
    { name: "React.js", tier: "Core Stack", icon: "Atom", color: "#0284c7", desc: "Hooks, Context, Redux Toolkit, React Router, Custom Hooks" },
    { name: "JavaScript (ES6+)", tier: "Core Stack", icon: "Code2", color: "#ca8a04", desc: "Async/Await, Closures, DOM, Prototypes, Modern Features" },
    { name: "HTML5 / CSS3", tier: "Core Stack", icon: "Layout", color: "#ea580c", desc: "Semantic HTML, Flexbox, CSS Grid, Custom Animations" },
    { name: "TailwindCSS", tier: "Core Stack", icon: "Palette", color: "#0ea5e9", desc: "Utility-first design, Responsive layouts, Custom themes" },
    { name: "Redux Toolkit", tier: "Production Ready", icon: "Cpu", color: "#7c3aed", desc: "Global state management, RTK Query, Slices, Middleware" },
    { name: "Next.js", tier: "Working Knowledge", icon: "Layers", color: "#0f172a", desc: "SSR, SSG, App Router, Server Components" }
  ],
  backend: [
    { name: "Node.js", tier: "Core Stack", icon: "Server", color: "#16a34a", desc: "Event loop, Streams, Async operations, File system" },
    { name: "Express.js", tier: "Core Stack", icon: "Zap", color: "#475569", desc: "RESTful APIs, Middleware, JWT Auth, Error handling" },
    { name: "MongoDB & Mongoose", tier: "Production Ready", icon: "Database", color: "#059669", desc: "Schema design, Aggregations, Indexing, CRUD" },
    { name: "REST APIs", tier: "Core Stack", icon: "Network", color: "#6366f1", desc: "API Architecture, Rate limiting, CORS, Documentation" },
    { name: "JWT & Auth", tier: "Production Ready", icon: "ShieldCheck", color: "#e11d48", desc: "Bcrypt, Role-based access, OAuth 2.0, Secure cookies" }
  ],
  tools: [
    { name: "Git & GitHub", tier: "Core Stack", icon: "GitBranch", color: "#dc2626", desc: "Version control, Branching workflows, PR reviews" },
    { name: "Postman", tier: "Production Ready", icon: "Send", color: "#ea580c", desc: "API testing, Automated tests, Mock servers" },
    { name: "Vite & Webpack", tier: "Production Ready", icon: "Rocket", color: "#9333ea", desc: "Fast build tooling, Module bundling, Optimizations" },
    { name: "VS Code", tier: "Core Stack", icon: "Terminal", color: "#0284c7", desc: "Productivity extensions, Debugging, Snippets" },
    { name: "Figma", tier: "Working Knowledge", icon: "Figma", color: "#7c3aed", desc: "UI wireframing, Prototyping, Design-to-code" }
  ]
};

export const marqueeSkills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "JavaScript ES6+",
  "TailwindCSS", "Redux Toolkit", "REST APIs", "JWT Authentication",
  "HTML5/CSS3", "Git & GitHub", "Vite", "Responsive Design", "Mongoose", "Postman"
];

export const projectTracks = [
  {
    id: "frontend-html-css-js",
    title: "Frontend (HTML, CSS, JS)",
    subtitle: "Vanilla Web & Interactive UI",
    desc: "Interactive web applications, audio players, games, weather radars, and responsive tools built with pure HTML5, CSS3, and JavaScript.",
    badge: "0 Live Projects",
    count: 0,
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    bgSoft: "rgba(245, 158, 11, 0.08)",
    borderSoft: "rgba(245, 158, 11, 0.25)",
    icon: "Code2",
    tags: ["HTML5", "CSS3", "JavaScript", "DOM API", "GitHub Pages"]
  },
  {
    id: "frontend-react",
    title: "Frontend (React.js)",
    subtitle: "Modern SPAs & Component UI",
    desc: "High-performance Single Page Applications, responsive Kanban boards, live API dashboards, and modern component-driven architectures.",
    badge: "0 Live Projects",
    count: 0,
    accentColor: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)",
    bgSoft: "rgba(2, 132, 199, 0.08)",
    borderSoft: "rgba(2, 132, 199, 0.25)",
    icon: "Atom",
    tags: ["React 19", "TailwindCSS", "Vite", "Redux Toolkit", "Hooks"]
  },
  {
    id: "fullstack-mern",
    title: "Full Stack (MERN)",
    subtitle: "End-to-End Scalable Systems",
    desc: "Complete end-to-end full-stack architectures with MongoDB database models, Express RESTful APIs, React user interfaces, and Node.js server runtimes.",
    badge: "0 Live Projects",
    count: 0,
    accentColor: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
    bgSoft: "rgba(5, 150, 105, 0.08)",
    borderSoft: "rgba(5, 150, 105, 0.25)",
    icon: "Database",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth"]
  }
];

export const projectsData = [];

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
