// Portfolio Central Data Configuration
// You can easily update your personal info, projects, skills, and links in this single file!

export const personalInfo = {
  name: "Maaz Ahmad",
  firstName: "Maaz",
  lastName: "Ahmad",
  avatar: "/profile.jpg", // Place your image as profile.jpg in public folder or paste image URL here
  tagline: "Full Stack MERN Developer & Software Engineering Undergraduate",
  roles: [
    "Full Stack MERN Developer",
    "Software Engineering Student",
    "React & Modern UI Engineer",
    "Node.js & Express API Architect",
    "MongoDB & Database Specialist"
  ],
  bio: "Passionate Software Engineering undergraduate at Islamia College University Peshawar with hands-on expertise in the Full Stack MERN ecosystem (MongoDB, Express.js, React, Node.js). Dedicated to engineering blazing-fast, scalable web applications with immersive interactive user experiences.",
  location: "Peshawar, Pakistan",
  hometown: "Orakzai, Pakistan",
  email: "maazahmad21988@gmail.com",
  phone: "+92 335 3545245",
  status: "Available for Full-time Roles & Freelance Projects",
  yearsExperience: "2+",
  completedProjects: "18+",
  satisfiedClients: "15+",
  codeCommits: "850+",
  socials: {
    github: "https://github.com/maaz-ahmad06",
    linkedin: "https://www.linkedin.com/in/maaz-ahmad-a71830414",
    twitter: "https://twitter.com",
    whatsapp: "https://wa.me/923353545245",
    email: "mailto:maazahmad21988@gmail.com"
  },
  resumeUrl: "#resume"
};

export const skillsData = {
  frontend: [
    { name: "React.js", level: 95, icon: "Atom", color: "#00f2fe", desc: "Hooks, Context, Redux Toolkit, React Router, Custom Hooks" },
    { name: "JavaScript (ES6+)", level: 92, icon: "Code2", color: "#f7df1e", desc: "Async/Await, Closures, DOM, Prototypes, Modern Features" },
    { name: "HTML5 / CSS3", level: 98, icon: "Layout", color: "#e34f26", desc: "Semantic HTML, Flexbox, CSS Grid, Custom Animations" },
    { name: "TailwindCSS", level: 95, icon: "Palette", color: "#38bdf8", desc: "Utility-first design, Responsive layouts, Custom themes" },
    { name: "Redux Toolkit", level: 88, icon: "Cpu", color: "#764abc", desc: "Global state management, RTK Query, Slices, Middleware" },
    { name: "Next.js", level: 80, icon: "Layers", color: "#ffffff", desc: "SSR, SSG, App Router, Server Components" }
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "Server", color: "#22c55e", desc: "Event loop, Streams, Async operations, File system" },
    { name: "Express.js", level: 92, icon: "Zap", color: "#94a3b8", desc: "RESTful APIs, Middleware, JWT Auth, Error handling" },
    { name: "MongoDB & Mongoose", level: 88, icon: "Database", color: "#10b981", desc: "Schema design, Aggregations, Indexing, CRUD" },
    { name: "REST APIs", level: 95, icon: "Network", color: "#8b5cf6", desc: "API Architecture, Rate limiting, CORS, Documentation" },
    { name: "JWT & Auth", level: 90, icon: "ShieldCheck", color: "#f43f5e", desc: "Bcrypt, Role-based access, OAuth 2.0, Secure cookies" }
  ],
  tools: [
    { name: "Git & GitHub", level: 92, icon: "GitBranch", color: "#f05032", desc: "Version control, Branching workflows, PR reviews" },
    { name: "Postman", level: 90, icon: "Send", color: "#ff6c37", desc: "API testing, Automated tests, Mock servers" },
    { name: "Vite & Webpack", level: 88, icon: "Rocket", color: "#bd34fe", desc: "Fast build tooling, Module bundling, Optimizations" },
    { name: "VS Code", level: 95, icon: "Terminal", color: "#007acc", desc: "Productivity extensions, Debugging, Snippets" },
    { name: "Figma", level: 80, icon: "Figma", color: "#a259ff", desc: "UI wireframing, Prototyping, Design-to-code" }
  ]
};

export const marqueeSkills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "JavaScript ES6+",
  "TailwindCSS", "Redux Toolkit", "REST APIs", "JWT Authentication",
  "HTML5/CSS3", "Git & GitHub", "Vite", "Responsive Design", "Mongoose", "Postman"
];

export const projectsData = [
  {
    id: "dev-pulse-mern",
    title: "DevPulse - Full Stack MERN Developer Community Platform",
    category: "Full Stack MERN",
    badge: "MERN Stack",
    shortDesc: "A complete social network for developers with real-time post feeds, code snippet sharing, interactive comments, and JWT auth.",
    longDesc: "DevPulse is an enterprise-ready developer collaboration platform built with the MERN stack. Features comprehensive authentication with JWT and bcrypt, dynamic feed with rich code highlighting, upvoting system, developer profile customization, and bookmarking functionality.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "TailwindCSS"],
    highlights: [
      "Custom JWT Authentication with HTTP-only cookies",
      "Dynamic feed with Markdown and syntax highlighted code blocks",
      "Optimized MongoDB indexing and aggregation queries",
      "Real-time notifications and profile analytics"
    ],
    gradient: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://demo.devpulse-example.com",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shop-zen-ecommerce",
    title: "ShopZen - Next-Gen MERN E-Commerce Store",
    category: "Full Stack MERN",
    badge: "E-Commerce",
    shortDesc: "Full-featured shopping platform with product search, filtering, cart management, Stripe checkout simulation, and Admin CMS.",
    longDesc: "ShopZen delivers a seamless shopping experience with lightning-fast product search, multi-criteria category filtering, Redux-powered persistent cart state, user order history, and a rich Admin dashboard to manage products, categories, and inventory.",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "TailwindCSS", "Redux Toolkit"],
    highlights: [
      "Dynamic product filtering by price, category, and rating",
      "Secure checkout flow with simulated payment gateway",
      "Full Admin CMS dashboard for product & stock management",
      "Responsive mobile-first layout with smooth micro-interactions"
    ],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://demo.shopzen-example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "task-flow-pro",
    title: "TaskFlow Pro - Agile Kanban & Team Task Tracker",
    category: "Frontend & UI",
    badge: "Productivity",
    shortDesc: "Interactive Kanban board with drag-and-drop task columns, priority tags, progress stats, and dark cyber UI.",
    longDesc: "TaskFlow Pro is a sleek productivity tool designed for sprint planning and personal workflow tracking. Built with modern React and interactive drag-and-drop physics, allowing users to effortlessly organize tasks across custom columns with real-time statistics.",
    tech: ["React.js", "TailwindCSS", "Lucide Icons", "LocalStorage API", "HTML5 DnD"],
    highlights: [
      "Smooth fluid drag-and-drop card interaction",
      "Priority badges, due-date tracking, and search filter",
      "Instant state persistence with auto-sync",
      "Gorgeous glassmorphism cyber dark theme"
    ],
    gradient: "linear-gradient(135deg, #10b981 0%, #00f2fe 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://demo.taskflow-example.com",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "weather-nexus",
    title: "WeatherNexus - Real-time Global Climate Radar & Forecast",
    category: "Frontend & UI",
    badge: "API App",
    shortDesc: "Dynamic weather forecasting application with live temperature metrics, 7-day forecast, air quality index, and animated weather icons.",
    longDesc: "WeatherNexus connects to live meteorology APIs to deliver hyper-local forecast data with responsive visual representations of weather conditions, animated sun/rain radar effects, geolocation detection, and temperature unit toggling.",
    tech: ["React.js", "OpenWeather API", "Vanilla CSS", "Async Fetch", "Chart.js"],
    highlights: [
      "Auto geolocation detection & instant search for 200,000+ cities",
      "Detailed 24-hour hourly graph and 7-day forecast cards",
      "Dynamic background gradient matching current weather status",
      "Air Quality Index (AQI) and UV radiation metrics"
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://demo.weathernexus-example.com",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cryptoview-api",
    title: "CryptoView - Live Cryptocurrency Tracker & Market Screener",
    category: "APIs & Tools",
    badge: "FinTech",
    shortDesc: "Real-time crypto price screener with interactive sparkline charts, market cap rankings, and currency conversion calculator.",
    longDesc: "A high-performance crypto analytics dashboard tracking top 500+ coins in real time using CoinGecko REST APIs. Features search with instant debounce, price change highlights, historical charts, and portfolio calculator.",
    tech: ["React.js", "CoinGecko REST API", "TailwindCSS", "Lucide Icons"],
    highlights: [
      "Live price polling with green/red fluctuation badges",
      "Interactive 24h/7d sparkline mini-charts",
      "Multi-currency selector (USD, EUR, PKR, GBP)",
      "Fast debounced search across hundreds of tokens"
    ],
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://demo.cryptoview-example.com",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "auth-guard-rest-api",
    title: "AuthGuard - Scalable MERN Backend Architecture & REST API",
    category: "APIs & Tools",
    badge: "Backend / API",
    shortDesc: "Robust production-ready Node.js & Express REST API boilerplate with JWT authentication, rate limiting, and MongoDB aggregation.",
    longDesc: "A modular, enterprise-grade backend architecture implementing MVC pattern, comprehensive input validation with Joi/Express-validator, JWT authentication with refresh token rotation, security headers via Helmet, and rate limiting.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt", "Postman"],
    highlights: [
      "Clean MVC Folder Structure with modular controllers and routes",
      "Role-Based Access Control (Admin, Moderator, User)",
      "Rate limiting and Brute-force protection middleware",
      "Full Postman collection and API documentation included"
    ],
    gradient: "linear-gradient(135deg, #00f2fe 0%, #10b981 100%)",
    github: "https://github.com/maaz-ahmad06",
    demo: "https://github.com/maaz-ahmad06",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  }
];

export const experienceData = [
  {
    period: "2022 - 2026",
    title: "BS Software Engineering",
    organization: "Islamia College University, Peshawar",
    location: "Peshawar, Khyber Pakhtunkhwa",
    desc: "Comprehensive software engineering degree covering Software Architecture, Algorithms & Data Structures, Modern Web Technologies, OOP, Database Systems, Computer Networks, and Full Stack application lifecycle.",
    tags: ["Software Engineering", "Full Stack", "Algorithms", "React & Node.js", "Databases"]
  },
  {
    period: "2024 - Present",
    title: "Full Stack Web Developer (MERN)",
    organization: "Freelance & Independent Projects",
    location: "Peshawar, Pakistan",
    desc: "Architecting custom full-stack web applications, dynamic React frontends, scalable Express/Node.js REST APIs, and optimized MongoDB schemas for client and real-world projects.",
    tags: ["React 19", "Node.js", "Express", "MongoDB", "REST APIs", "TailwindCSS"]
  },
  {
    period: "2020 - 2022",
    title: "FSc Pre-Engineering",
    organization: "Wisdom College, Hangu",
    location: "Hangu, Khyber Pakhtunkhwa",
    desc: "Strong core analytical and mathematical foundation with rigorous coursework in Calculus, Physics, Analytical Reasoning, and Scientific Methodology.",
    tags: ["Pre-Engineering", "Mathematics", "Physics", "Analytical Problem Solving"]
  },
  {
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
    color: "#00f2fe"
  },
  {
    icon: "Layout",
    title: "Modern UI/UX & Frontend",
    desc: "Pixel-perfect, ultra-smooth frontends built with modern React, TailwindCSS, glassmorphism, and engaging micro-animations.",
    color: "#8b5cf6"
  },
  {
    icon: "Server",
    title: "RESTful API Engineering",
    desc: "Secure, well-documented REST APIs with JWT authentication, role-based access control, caching, and rate limiting.",
    color: "#10b981"
  },
  {
    icon: "Zap",
    title: "Performance & Optimization",
    desc: "Lightning-fast page load speeds, SEO optimization, responsive mobile compatibility, and clean clean code standards.",
    color: "#f59e0b"
  }
];

export const terminalCommands = {
  help: "Available commands: 'about', 'skills', 'projects', 'contact', 'clear', 'socials'",
  about: "Maaz Ahmad - Passionate Full Stack MERN Developer from Karachi, Pakistan.",
  skills: "React, Node.js, Express, MongoDB, TailwindCSS, JavaScript ES6+, Git, REST APIs",
  projects: "DevPulse MERN Community, ShopZen E-Commerce, TaskFlow Pro, WeatherNexus, CryptoView",
  contact: "Email: maazahmad21988@gmail.com | WhatsApp: +92 335 3545245",
  socials: "GitHub: github.com/maaz-ahmad06 | LinkedIn: linkedin.com/in/maaz-ahmad-a71830414 | WhatsApp: wa.me/923353545245"
};
