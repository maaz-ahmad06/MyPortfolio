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
  yearsExperience: "Fresher",
  completedProjects: "24+",
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
    desc: "18+ interactive web applications, audio players, games, weather radars, and responsive tools built with pure HTML5, CSS3, and JavaScript.",
    badge: "18 Live Projects",
    count: 18,
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
    desc: "6 live Single Page Applications, conversational AI assistants, automotive portals, and dynamic state-driven tools built with React 19, Tailwind CSS v4, and Vite.",
    badge: "6 Live Projects",
    count: 6,
    accentColor: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)",
    bgSoft: "rgba(2, 132, 199, 0.08)",
    borderSoft: "rgba(2, 132, 199, 0.25)",
    icon: "Atom",
    tags: ["React 19", "TailwindCSS v4", "Vite", "Google AI API", "Hooks"]
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

export const projectsData = [
  // ==========================================
  // TRACK 1: FRONTEND (HTML, CSS, JS) - 18 LIVE PROJECTS
  // ==========================================
  {
    id: "weather-app-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Weather App - Real-Time Forecast & Radar",
    badge: "Weather API",
    shortDesc: "Live weather radar fetching real-time temperature, humidity, wind velocity, and condition-based dynamic icons using OpenWeather API.",
    longDesc: "A responsive real-time weather forecasting application built with vanilla JavaScript. Connects to weather APIs to fetch live temperatures, atmospheric pressure, wind speeds, and humidity with instant search across global cities and animated error handling.",
    tech: ["HTML5", "CSS3", "JavaScript", "OpenWeather API", "Async Fetch"],
    highlights: [
      "Real-time weather data fetching with error feedback",
      "Dynamic visual weather condition icons (rain, clouds, clear, snow)",
      "Instant city search with keyboard Enter support",
      "Clean glassmorphism weather dashboard card"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #00f2fe 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/WEATHER-APP",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/WEATHER-APP/",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "quiz-app-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Interactive Quiz Engine with Score Tracker",
    badge: "Interactive Game",
    shortDesc: "Multiple-choice interactive quiz application with dynamic question rendering, score calculation, instant answer feedback, and replay functionality.",
    longDesc: "A sleek and responsive quiz engine developed using vanilla JavaScript DOM manipulation. Features multiple-choice questions, visual true/false feedback, running score accumulation, and a victory summary screen with restart controls.",
    tech: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    highlights: [
      "Dynamic question & options rendering from array data structures",
      "Instant color-coded correct/incorrect visual feedback",
      "Smart Next-question state button disabling duplicate clicks",
      "Final percentage score summary and restart flow"
    ],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/QUIZ%20APP",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/QUIZ%20APP/",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "music-player-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Audio Music Player & Playlist Controller",
    badge: "Audio & Media",
    shortDesc: "Custom audio media player with dynamic track progress scrubber, play/pause controls, song navigation, and rotating vinyl cover.",
    longDesc: "A fully custom audio player built using HTML5 Audio API and JavaScript. Includes interactive timeline scrubber, volume control, track switching, rotating artwork animation on playback, and clean modern aesthetic.",
    tech: ["HTML5", "CSS3", "JavaScript", "HTML5 Audio API", "Keyframe Animations"],
    highlights: [
      "Custom audio control interface bypassing browser default player",
      "Interactive progress bar scrubber with click-to-seek support",
      "Smooth rotating vinyl artwork CSS keyframes animation",
      "Responsive mobile and desktop playback controller"
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/MUSIC%20PLAYER",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/MUSIC%20PLAYER/",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "notes-app-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Persistent Notes & Quick Memo Pad",
    badge: "Productivity",
    shortDesc: "Sticky notes application with instant add, inline edit, and delete actions, fully persisted across browser sessions with LocalStorage.",
    longDesc: "A sleek productivity tool allowing users to take notes, write daily reminders, and brainstorm ideas. Powered by browser LocalStorage so all entries remain securely saved across page refreshes.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
    highlights: [
      "Instant note creation with contenteditable HTML5 elements",
      "LocalStorage data synchronization on every keystroke",
      "Delete confirmation and smooth card dismissal",
      "Clean yellow memo pad aesthetic with responsive columns"
    ],
    gradient: "linear-gradient(135deg, #10b981 0%, #00f2fe 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/NOTES%20APP",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/NOTES%20APP/",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "todo-list-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Daily To-Do List & Task Manager",
    badge: "Task Manager",
    shortDesc: "Task organizer featuring task completion toggle, remove triggers, input validation, and persistent storage synchronization.",
    longDesc: "A responsive daily task organizer built to practice DOM manipulation and browser persistence. Users can add new tasks, mark items as completed with a visual strike-through, and delete items with persistent state.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
    highlights: [
      "Task creation with input sanitization and empty check",
      "One-click completion toggle with visual checkmark",
      "Delete action with transition feedback",
      "LocalStorage persistence across browser restarts"
    ],
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/TO-DO%20LIST",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/TO-DO%20LIST/",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "age-calculator-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "High-Precision Date & Age Calculator",
    badge: "Utility Tool",
    shortDesc: "Calculates exact years, months, and days from any date of birth with leap year edge-case handling and responsive input controls.",
    longDesc: "An accurate date calculation tool that prevents future date selection and accurately calculates an individual's exact chronological age down to the exact days, accounting for variable month lengths and leap years.",
    tech: ["HTML5", "CSS3", "JavaScript", "Date Algorithms"],
    highlights: [
      "Dynamic maximum date constraint set to current day",
      "Complex calendar date difference logic for uneven month lengths",
      "Instant calculation with smooth result fade-in",
      "Modern clean card interface"
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/AGE%20CALCULATOR",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/AGE%20CALCULATOR/",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "password-generator-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Cryptographic Random Password Generator",
    badge: "Security Tool",
    shortDesc: "Generates high-entropy random passwords combining uppercase, lowercase, numbers, and symbols with 1-click clipboard copy.",
    longDesc: "A cybersecurity utility tool designed to create cryptographically secure passwords. Combines custom character pools, configurable length, and instantaneous copy-to-clipboard functionality with user feedback toast.",
    tech: ["HTML5", "CSS3", "JavaScript", "Clipboard API"],
    highlights: [
      "Multi-pool character randomization (A-Z, a-z, 0-9, special symbols)",
      "One-click copy to clipboard with toast notification",
      "Customizable password length generation",
      "Clean cyber-themed layout"
    ],
    gradient: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/PASSWORD%20GENERATER",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/PASSWORD%20GENERATER/",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "qr-code-generator-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Instant QR Code Generator & Renderer",
    badge: "API Integration",
    shortDesc: "Converts URLs, text snippets, and contact data into high-resolution scannable QR codes instantaneously with responsive preview.",
    longDesc: "An API-driven QR generator that encodes user input into scannable matrix barcodes in real-time. Features input validation, error shaking animations, and rapid image generation.",
    tech: ["HTML5", "CSS3", "JavaScript", "QR Code API"],
    highlights: [
      "Instant real-time QR barcode generation",
      "Input validation with shake animation feedback on empty submit",
      "Responsive barcode sizing for mobile and desktop screens",
      "Clean frosted glass container design"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #6366f1 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/QR-CODE%20GENERATER",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/QR-CODE%20GENERATER/",
    image: "https://images.unsplash.com/photo-1595079672139-622943ac5321?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "stopwatch-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Digital Lap Stopwatch & Chronometer",
    badge: "Timer Utility",
    shortDesc: "High-precision digital stopwatch with start, pause, reset, and millisecond tracking built using JavaScript setInterval.",
    longDesc: "A digital stopwatch and chronometer with zero-padded formatted hours, minutes, seconds, and milliseconds. Features state management for active running, paused, and reset timers.",
    tech: ["HTML5", "CSS3", "JavaScript", "Interval Timers"],
    highlights: [
      "Millisecond precision timing loop",
      "Formatted double-digit time string display (00:00:00:000)",
      "Dynamic Start/Pause/Reset state button switching",
      "Minimalist dark sports timer design"
    ],
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/STOPWATCH",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/STOPWATCH/",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "text-to-speech-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Text-to-Speech Voice Synthesizer",
    badge: "Web Speech API",
    shortDesc: "Translates typed text into natural spoken audio in real-time with voice selection and speech synthesis controls.",
    longDesc: "An interactive application utilizing browser-native SpeechSynthesis API to convert any paragraph or phrase into spoken voice with multiple accent and voice options.",
    tech: ["HTML5", "CSS3", "JavaScript", "Web Speech API"],
    highlights: [
      "Dynamic population of installed system speech voices",
      "Real-time audio speech synthesis playback",
      "Voice selector dropdown with accent detection",
      "Responsive textarea with character counter"
    ],
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0284c7 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/TEXT%20TO%20SPEECH%20CONVERTER",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/TEXT%20TO%20SPEECH%20CONVERTER/",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "form-validation-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Client-Side Real-Time Form Validator",
    badge: "Validation Engine",
    shortDesc: "Regex-based form validation for email, name, phone, and password fields with live visual checkmark and error prompts.",
    longDesc: "A complete client-side validation engine checking input formats on keyup. Validates standard email patterns, minimum password security criteria, and phone digit rules before form submission.",
    tech: ["HTML5", "CSS3", "JavaScript", "Regex"],
    highlights: [
      "Real-time on-keyup validation feedback",
      "Regex checks for email, phone format, and password length",
      "Animated green checkmarks and red error warning messages",
      "Form submission prevention on invalid inputs"
    ],
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/FORM%20VALIDATION",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/FORM%20VALIDATION/",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "arctic-breeze-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Arctic Breeze - Modern Product Showcase",
    badge: "Landing Page",
    shortDesc: "Clean, responsive product showcase page featuring modern hero typography, feature grid, and smooth responsive navigation.",
    longDesc: "A product landing page designed to demonstrate semantic HTML layout principles, responsive CSS grid, flexbox alignments, and modern product marketing aesthetic.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    highlights: [
      "Mobile-first responsive navigation bar",
      "Hero section with product typography and call-to-action buttons",
      "Feature showcase cards with hover elevate animations",
      "Cross-browser tested CSS layout"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/ARCTIC%20BREEZE",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/ARCTIC%20BREEZE/",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "toast-notification-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Toast Notification & Alert Dispatcher",
    badge: "UI Component",
    shortDesc: "Dynamic multi-status notification stack (Success, Error, Invalid) with auto-dismiss countdown timer and slide animations.",
    longDesc: "A reusable toast notification system capable of generating dynamic alert popups that automatically remove themselves after a countdown timer, with custom status colors and icons.",
    tech: ["HTML5", "CSS3", "JavaScript", "DOM Animations"],
    highlights: [
      "Multi-type toasts: Success, Error, and Warning states",
      "Dynamic DOM element creation and self-removal timers",
      "Progress bar countdown animation under each toast",
      "Stackable notifications without layout break"
    ],
    gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/TOAST%20NOTIFICATION",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/TOAST%20NOTIFICATION/",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "progress-bar-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Multi-Step Interactive Progress Stepper",
    badge: "UI Flow",
    shortDesc: "Step-by-step progress indicator and form stepper with Next/Previous button controls and state visualization.",
    longDesc: "A multi-step progress bar component often found in checkout flows and user onboarding. Calculates active percentage width and updates circle badges smoothly.",
    tech: ["HTML5", "CSS3", "JavaScript", "CSS Transitions"],
    highlights: [
      "Dynamic width calculation based on active step index",
      "Next and Previous boundary button state disabling",
      "Smooth CSS transitions on connector line and step circles",
      "Reusable UI component pattern"
    ],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/PROGRESS%20BAR",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/PROGRESS%20BAR/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-scroll-slider-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Horizontal Gallery & Carousel Slider",
    badge: "Gallery Slider",
    shortDesc: "Scrollable card gallery with back/next navigation buttons, mouse wheel support, and smooth scroll animations.",
    longDesc: "A horizontal media gallery slider with custom back and forward scroll controls, perfect for product carousels, testimonials, and photo portfolios.",
    tech: ["HTML5", "CSS3", "JavaScript", "Scroll Physics"],
    highlights: [
      "Direct DOM scroll calculation with left offset steps",
      "Back and Next arrow controls with smooth transition",
      "Hidden scrollbar with mouse drag compatibility",
      "High-density responsive photo cards"
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/H-SCROLL%20SLIDER",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/H-SCROLL%20SLIDER/",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "popup-modal-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Modal Window Dialog with Backdrop",
    badge: "Modal Component",
    shortDesc: "Lightweight popup dialog system with click-outside dismissal, confirmation feedback, and spring animation.",
    longDesc: "A modal window implementation featuring open/close transitions, backdrop shading, and user confirmation triggers.",
    tech: ["HTML5", "CSS3", "JavaScript", "Event Handling"],
    highlights: [
      "Center-aligned modal dialog with scale-up entrance animation",
      "Click-outside and button-close event bindings",
      "Confirmation checkmark graphics",
      "Accessible modal pattern"
    ],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/POPUP",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/POPUP/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "toggle-password-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Password Visibility Toggle Component",
    badge: "Form Control",
    shortDesc: "Eye-icon toggle switching password field between masked and plaintext states with dynamic icon states.",
    longDesc: "A micro-interaction component for password input fields allowing users to toggle between secure masking and readable plaintext.",
    tech: ["HTML5", "CSS3", "JavaScript", "Form Security"],
    highlights: [
      "Dynamic attribute switching (type='password' to type='text')",
      "Icon image swapping based on current visibility state",
      "Responsive input field styling",
      "Essential UX pattern for user authentication forms"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #059669 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/TOGGLE%20PASSWORD",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/TOGGLE%20PASSWORD/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "product-page-vanilla",
    track: "frontend-html-css-js",
    category: "Frontend (HTML, CSS, JS)",
    title: "Interactive E-Commerce Product Showcase",
    badge: "E-Commerce",
    shortDesc: "Rich product page with dynamic image thumbnail switcher, color picker selector, quantity counter, and add-to-cart feedback.",
    longDesc: "An e-commerce product detail page built with pure JavaScript. Users can click image gallery thumbnails to change the main hero photo, select color variants, and adjust item quantities with price recalculations.",
    tech: ["HTML5", "CSS3", "JavaScript", "E-Commerce UI"],
    highlights: [
      "Interactive multi-angle image gallery switcher",
      "Color variant selection with active state indicators",
      "Dynamic quantity increment/decrement controls",
      "Clean shopping cart call-to-action button"
    ],
    gradient: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
    github: "https://github.com/maaz-ahmad06/HTML-CSS-JS/tree/main/Projects/RPODUCT%20PAGE",
    demo: "https://maaz-ahmad06.github.io/HTML-CSS-JS/Projects/RPODUCT%20PAGE/",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // TRACK 2: FRONTEND (REACT.JS) - 6 LIVE PROJECTS
  // ==========================================
  {
    id: "agency-ai-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "Agency AI - Next-Gen Digital Marketing Platform",
    badge: "AI Landing Page",
    shortDesc: "High-converting digital AI agency landing page with smooth Framer Motion entrance animations, interactive pricing, and Tailwind CSS v4 styling.",
    longDesc: "A production-grade AI Agency landing page engineered using React 19, Tailwind CSS v4, Motion, and Vite. Features high-converting hero sections, dynamic service showcase cards, interactive testimonial carousels, and engaging toast notifications.",
    tech: ["React 19", "TailwindCSS v4", "Motion", "Vite", "React Hot Toast"],
    highlights: [
      "Smooth spring animations and scroll reveals with Motion",
      "Modern Tailwind CSS v4 design system with dark glassmorphism",
      "Interactive lead-generation CTA with toast feedback",
      "Fully responsive across mobile, tablet, and widescreen layouts"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #6366f1 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/AGENCY-AI",
    demo: "https://agency-ai-beta-azure.vercel.app/",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gemini-clone-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "Gemini AI Clone - Conversational AI Assistant",
    badge: "Google AI API",
    shortDesc: "Full Google Gemini conversational AI clone integrating Google Generative AI API with streaming prompt responses and chat history.",
    longDesc: "A Google Gemini conversational intelligence interface built with React 19 and the official @google/generative-ai SDK. Features instant prompt execution, contextual conversation responses, animated typing effects, suggestion prompts, and mobile-friendly sidebar navigation.",
    tech: ["React 19", "Google Gemini API", "Vite", "Generative AI", "JavaScript ES6+"],
    highlights: [
      "Direct integration with official @google/generative-ai SDK",
      "Dynamic prompt history sidebar with new chat session creator",
      "Animated response streaming mimicking Gemini native interface",
      "Prompt suggestion quick-cards and responsive input bar"
    ],
    gradient: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/gemini-clone",
    demo: "https://gemini-clone-peach-eight.vercel.app/",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ev-website-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "EV Future - Electric Vehicle Experience Platform",
    badge: "Modern UI / Showcase",
    shortDesc: "Interactive electric vehicle platform featuring dynamic hero video background switcher, animated spec counters, and vehicle feature explorer.",
    longDesc: "An immersive automotive product showcase website engineered with React 19 and Vite. Designed to highlight next-generation electric vehicles with smooth background video playback, dynamic car feature sliders, battery/range statistics, and inquiry forms.",
    tech: ["React 19", "Vite", "CSS3 Animations", "Interactive Media", "Modern UI"],
    highlights: [
      "Background video and high-resolution photo transitions",
      "Interactive vehicle specification overview and telemetry counters",
      "Clean minimalist luxury UI styling with responsive layouts",
      "Stateful navigation and dynamic feature discovery carousel"
    ],
    gradient: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/ev-website",
    demo: "https://ev-website-flame-three.vercel.app/",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "news-mag-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "NewsMag - Real-Time Global News Magazine",
    badge: "News API",
    shortDesc: "Dynamic real-time news aggregation platform fetching top breaking headlines across Technology, Business, Sports, and Entertainment categories.",
    longDesc: "A fast real-time news application built with React 19, Bootstrap/Tailwind, and News API. Users can browse categorized breaking news, search stories, read summarized cards, and launch direct articles with live timestamp indicators.",
    tech: ["React 19", "News API", "Vite", "RESTful Fetch", "Responsive Grid"],
    highlights: [
      "Category-based news filtering (Tech, Business, Sports, Health, Entertainment)",
      "Async API data fetching with robust loading skeletons and fallback imagery",
      "Article snippet cards with source badges and external reading links",
      "Clean magazine grid layout with mobile navigation"
    ],
    gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/news-mag",
    demo: "https://news-mag-gold-ten.vercel.app/",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "quiz-app-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "React Quiz Engine - Timed Interactive Challenge",
    badge: "State-Driven Quiz",
    shortDesc: "Dynamic React quiz application with question progression, instant feedback, score calculation, and final performance analytics.",
    longDesc: "An interactive assessment web application developed with React 19 hooks (useState, useEffect, useRef). Features timed question rounds, color-coded answer validation, running score tally, and a performance report card upon test completion.",
    tech: ["React 19", "React Hooks", "Vite", "State Management", "CSS Grid"],
    highlights: [
      "Single Page Application state management for seamless question transitions",
      "Instant visual true/false response indicator disabling duplicate submissions",
      "Detailed end-of-quiz score summary with restart and review option",
      "Optimized mobile-friendly UI with progress gauge"
    ],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/quiz-app",
    demo: "https://quiz-app-sepia-kappa-38.vercel.app/",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "todo-list-react",
    track: "frontend-react",
    category: "Frontend (React.js)",
    title: "TaskMaster - React Todo & Productivity Tracker",
    badge: "State & LocalStorage",
    shortDesc: "Intuitive task management app with real-time add, toggle completion, delete actions, filter tabs, and persistent local storage sync.",
    longDesc: "A modern task management application built in React 19. Empowers users to organize daily goals, cross out completed items, filter by active or finished tasks, and persist state across browser sessions.",
    tech: ["React 19", "React Hooks", "Vite", "LocalStorage Persistence", "CSS Modules"],
    highlights: [
      "Full CRUD task management with instant state synchronization",
      "Filter controls (All, Active, Completed) for organized workflow",
      "Automatic LocalStorage persistence preventing data loss on reload",
      "Smooth item entrance/exit micro-interactions and empty-state illustrations"
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #10b981 100%)",
    github: "https://github.com/maaz-ahmad06/React-js/tree/main/todo-list",
    demo: "https://todo-list-ashy-alpha-70hijm2ov8.vercel.app/",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  }
];

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
