// ─────────────────────────────────────────────────────────────
// ALL SITE CONTENT LIVES HERE. Edit this file, push, Vercel redeploys.
// Anything marked TODO is a placeholder for you to fill in.
// Gallery photos are NOT listed here: just drop them in public/gallery/ (see README-SITE.md).
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Michelle Buchi Okonicha",
  shortName: "Michelle",
  title: "AI/ML engineer, researcher & community builder",
  tagline:
    "I build production machine learning systems, research how AI agents behave on small devices, and teach the next generation of women in tech.",
  location: "UK",
  // Used for the sitemap, RSS feed and link previews. Set NEXT_PUBLIC_SITE_URL in Vercel once you
  // have your own domain; until then Vercel's production URL (*.vercel.app) is used automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  email: "michelleokonicha@gmail.com",
  // The "Download CV" button only shows once this file exists. Leave your phone number off the public copy.
  cvUrl: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Michellebuchiokonicha" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/buchi-michelle-okonicha/" },
    { label: "X / Twitter", href: "https://x.com/mchelleOkonicha" },
    { label: "Instagram", href: "https://www.instagram.com/michelle_okonicha/" },
    { label: "Google Developers profile", href: "https://me.developers.google.com/u/michellebuchiokonicha" },
  ],
};

export const badges = [
  "Google Developer Expert",
  "Women Techmakers Ambassador",
  "MSc AI & Data Science, University of Hull",
];

export const stats = [
  { value: "60+", label: "technical events spoken at" },
  { value: "~40", label: "technical articles written" },
  { value: "640+", label: "girls reached through Girls Like Me Dream" },
  { value: "1 + 2", label: "papers published + under review" },
];

export const about = [
  "I'm a machine learning and AI engineer and a Google Developer Expert, currently completing an MSc in Artificial Intelligence and Data Science at the University of Hull, supervised by Dr. Julius Mboli.",
  "My research interests are LLM memory, goal drift, edge AI, quantisation, small language models, agents and agentic workflows, computer vision, and time series forecasting. My MSc project measures how the goals of small, quantised language-model agents drift over long recursive workflows on edge devices.",
  "Before the MSc I was a Machine Learning and AI Engineer at PLATE, building the AI layer of a kitchen assistant app live on Google Play, and an AI Software Engineer at Aricah Technologies, where I shipped LLM-powered products to the web and Google Play. I started my career in software engineering as the first female software engineer at Landmark Africa. Today I also volunteer as an AI Engineer on evaluation and benchmarking with Crossing Party Lines, a US-based LLM benchmark project.",
  "Outside the code, I'm a Women Techmakers Ambassador, Partnerships Lead for the AI Society at the University of Hull, a student ambassador at the University of Hull, and a volunteer tutor with PyGirls.",
];

export const skills = [
  {
    group: "LLMs & agents",
    items: ["LLM applications", "RAG", "LangChain", "Agentic workflows (LangGraph)", "Multi-agent systems (CrewAI, AutoGen)", "Human-in-the-loop safeguards", "Tool calling", "Prompt engineering", "Semantic search", "MongoDB Vector Search", "Fine-tuning (LoRA)", "Hugging Face"],
  },
  {
    group: "Evaluation & MLOps",
    items: ["Agent & LLM evaluation", "Benchmarking", "Survival analysis for model comparison", "MLflow", "Model monitoring (drift & latency)", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    group: "Models & data",
    items: ["PyTorch", "TensorFlow", "Computer vision (YOLO26, YOLOv8, Mask R-CNN)", "NLP", "Quantisation", "ONNX Runtime"],
  },
  {
    group: "Engineering",
    items: ["Python", "FastAPI", "REST APIs", "JavaScript", "AWS", "GCP", "PostgreSQL", "MongoDB", "Supabase"],
  },
];

export type Project = {
  name: string;
  role: string;
  period?: string;
  summary: string;
  tags: string[];
  href?: string;
  featured?: boolean;
  todo?: boolean; // true = placeholder text you still need to write
};

// Featured first, then the rest. Reorder freely.
export const projects: Project[] = [
  {
    name: "Goal drift in recursive agentic workflows on edge-quantised SLMs",
    role: "MSc research · ongoing",
    period: "2026",
    summary:
      "An evaluation pipeline that measures and mitigates goal drift in stateless small language model agents. A LangGraph auditor monitors agent behaviour across recursive steps, benchmarking IBM Granite 4.2 models (3B and 8B) on Apple hardware and HPC, with time-to-drift modelled using survival analysis (Kaplan-Meier, Cox) to compare models and mitigation strategies.",
    tags: ["Agent evaluation", "Small language models", "IBM Granite", "LangGraph", "Survival analysis"],
    featured: true,
  },
  {
    name: "PLATE",
    role: "Machine Learning and AI Engineer",
    period: "Aug 2025 – Jun 2026",
    summary:
      "A kitchen assistant app live on Google Play, combining real-time computer vision food recognition with prompt-engineered multi-modal LLMs for automated recipe generation. I built the AI layer, including an offline YOLO26n recognition system trained on around 149,000 images merged from 5 datasets, and cut inference latency by 35% for cross-platform mobile users.",
    tags: ["Computer vision", "YOLO26n", "Multi-modal LLMs", "FastAPI", "Google Play"],
    featured: true,
  },
  {
    name: "AfroLearner",
    role: "Open-source lead · in development",
    summary:
      "An NLP language-learning platform for low-resource African languages, starting with Wolof. Built with Python, FastAPI and the Waxal dataset, with custom tokenisers and local inference via Meta's MMS framework.",
    tags: ["NLP", "Low-resource languages", "FastAPI", "Open source"],
    featured: true,
  },
  {
    name: "Velarius Education Platform",
    role: "Aricah Technologies · live on Play Store & web",
    summary:
      "An LLM-powered learning platform for secondary school students, using LangChain to orchestrate RAG over OpenAI and Gemini models, with secure document indexing and context-grounded tests. 50+ downloads.",
    tags: ["RAG", "LangChain", "OpenAI", "Gemini", "Edtech"],
    featured: true,
  },
  {
    name: "Upsidedown House app",
    role: "Landmark Africa",
    summary:
      "The first interactive experience of its kind in West Africa, with scalable data logging for 100,000+ event visitors.",
    tags: ["Product engineering", "Scale"],
  },
  {
    name: "Hospitality Institute portal",
    role: "Landmark Africa",
    summary:
      "A student portal and admin panel (Vue.js, PHP, Laravel, SQL) that automated workflows and reduced administrative bottlenecks.",
    tags: ["Vue.js", "Laravel", "SQL"],
  },
  {
    name: "Hospitality operations platform",
    role: "Execufy · contract",
    period: "2024",
    summary:
      "Delivered a high-availability platform to go-live on schedule, with board collaboration and peer interaction modules. Cut server response times by 18% via Supabase/PostgreSQL tuning and code splitting.",
    tags: ["Supabase", "PostgreSQL", "Performance"],
  },
  {
    name: "Frootaz & Belish",
    role: "Aricah Technologies · live",
    summary: "Shipped food-logistics (Frootaz) and kilishi-delivery (Belish) applications.",
    tags: ["Food-tech", "Web & mobile"],
  },
  {
    name: "Fugoku",
    role: "Software Engineer",
    period: "2024 – 2025",
    summary:
      "Enterprise cloud and AI infrastructure platform: servers, GPUs and private cloud spun up in seconds on open standards, plus the Kaiju AI Gateway.",
    tags: ["Cloud infrastructure", "AI/ML platform", "GPUs"],
    href: "https://fugoku.com/",
  },
];

export type Job = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "AI Engineer, Evaluation and Benchmarking (Volunteer)",
    org: "Crossing Party Lines",
    period: "Oct 2026 – Present",
    bullets: [
      "Contribute to a US-based LLM benchmark project: reviewing candidate datasets for the benchmark, labelling benchmark items and reporting findings to the research team.",
    ],
  },
  {
    role: "Machine Learning and AI Engineer",
    org: "PLATE",
    period: "Aug 2025 – Jun 2026",
    bullets: [
      "Built the AI layer for PLATE, a kitchen assistant app live on Google Play, combining real-time computer vision food recognition with prompt-engineered multi-modal LLMs for automated recipe generation.",
      "Evaluated several multi-modal models against each other for accuracy, cost and latency before choosing the production model.",
      "Built an offline food recognition system with YOLO26n, trained on around 149,000 images merged from 5 datasets, so recognition works on-device without an internet connection.",
      "Built async FastAPI model-serving APIs, containerised with Docker, with automated logging to track model drift through continuous user feedback.",
      "Optimised the deep learning CV pipeline and cut inference latency by 35% for cross-platform mobile users.",
    ],
  },
  {
    role: "AI Software Engineer",
    org: "Aricah Technologies",
    period: "Jan 2024 – Dec 2025",
    bullets: [
      "Engineered and shipped 3 production AI applications for clients across edtech and food logistics (Velarius, Frootaz and Belish), available on web and Google Play Store.",
      "Built Velarius, an LLM-powered learning platform for secondary school students, using LangChain to orchestrate RAG over OpenAI and Gemini models, with secure document indexing and context-grounded tests. 50+ downloads.",
      "Architected RAG pipelines using MongoDB Vector Search, improving context retrieval precision by 22%.",
      "Built FastAPI services to serve LLM features, handling context-window limits across user sessions.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Fugoku",
    period: "2024 – 2025",
    bullets: [
      "Software engineer on Fugoku's enterprise cloud and AI infrastructure platform: servers, GPUs and private cloud, plus the Kaiju AI Gateway.",
    ],
  },
  {
    role: "Software Engineer (Contract)",
    org: "Execufy",
    period: "2024",
    bullets: ["Delivered a hospitality operations platform on schedule and reduced server response times by 18%."],
  },
  {
    role: "Software Engineer",
    org: "Landmark Africa",
    period: "Jan 2022 – Jan 2024",
    bullets: [
      "Maintained applications serving 200,000+ monthly customers and contributing circa ₦2bn in revenue.",
      "Built the Hospitality Institute student portal and admin panel, reducing administrative bottlenecks through automated workflows.",
      "Developed the Upsidedown House app, the first interactive experience of its kind in West Africa, logging data for 100,000+ event visitors.",
    ],
  },
  {
    role: "Software Support Engineer",
    org: "Zanibal LLC",
    period: "Mar 2021 – Nov 2021",
    bullets: [
      "Improved bug resolution cycles by 25% through SQL reporting pipelines and batch script automation for enterprise wealth management clients.",
      "Promoted within 3 months, conducting penetration testing on the fintech platform and onboarding enterprise clients.",
    ],
  },
];

export type Award = {
  title: string;
  org: string;
  year: string;
  description: string;
  image: string; // put the file in public/awards/ and match the name here
};

export const awards: Award[] = [
  {
    title: "Full Circle Award",
    org: "Google Showcase",
    year: "2026",
    description:
      "Recognised for completing the full development-to-mentorship circle: graduated from the Women Developer Academy, became the first Google Developer Expert to emerge from it in Sub-Saharan Africa, then mentored others through the GDE Academy who also became GDEs.",
    image: "/awards/full-circle-award.jpg",
  },
  {
    title: "1st Place, AI Racer",
    org: "DAIM Hackathon",
    year: "2026",
    description:
      "Winning team in an autonomous racing challenge for Gymnasium's CarRacing-v3, pairing a PPO reinforcement-learning agent with a NEAT-style genetic algorithm. I built the genetic-algorithm component.",
    image: "/awards/daim-hackathon-2026.jpg",
  },
  {
    title: "Women Techmakers High Impact Award",
    org: "Women Techmakers",
    year: "2023",
    description:
      "First recipient of the Women Techmakers High Impact Award in Sub-Saharan Africa, for outstanding contributions to the technical community.",
    image: "/awards/wtm-high-impact-award.jpg",
  },
  {
    title: "Emerging Software Engineer, Nominee",
    org: "TechTrend Africa",
    year: "2021",
    description: "Nominated for early contributions to software engineering.",
    image: "/awards/techtrend-africa-nominee.jpg",
  },
];

// ── Writing ──────────────────────────────────────────────────
export const writingPlatforms = [
  { name: "dev.to", href: "https://dev.to/michellebuchiokonicha" },
];

export type Article = {
  title: string;
  platform: "dev.to" | "Hashnode" | "Medium" | "Other";
  href: string;
  date?: string; // e.g. "2026-03"
  summary?: string;
};

// Newest first. Add one object per article.
export const articles: Article[] = [
  // A selection from dev.to. Articles copied onto this site (npm run import:devto) don't need to be listed here.
  { title: "Google I/O 2026: From Consumer to Builder", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/google-io-2026-from-consumer-to-builder-dom", date: "2026-05" },
  { title: "The Machine Learning Engineering Series", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/the-machine-learning-engineering-series-3anj", date: "2026-05" },
  { title: "Infrastructure as Code: Getting Started with Terraform for Cloud Deployment", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/getting-started-with-terraform-for-cloud-deployment-9f0", date: "2025-02" },
  { title: "Python OOP Made Easy: Master Object-Oriented Programming with Ease", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/python-oop-made-easy-master-object-oriented-programming-with-ease-4h9e", date: "2025-02" },
  { title: "Are Web APIs the same as REST APIs? How to Improve your Web Apps with Web APIs", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/are-web-apis-the-same-as-rest-apis-how-web-apis-improve-the-web-57jm", date: "2025-01" },
  { title: "How to Automate Excel Files from APIs with Python and Openpyxl", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/how-to-automatecreate-update-excel-files-from-apis-with-python-and-openpyxl-2148", date: "2024-08" },
  { title: "How to Improve Your Development Workflow with Gemini Code Assist", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/how-to-improve-your-development-workflow-with-gemini-code-assist-10lm", date: "2024-07" },
  { title: "Data Science and the Cloud", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/data-science-in-the-cloud-1hg5", date: "2024-06" },
  { title: "Virtualization & Containerization with Docker", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/virtualization-containerization-with-docker-storage-and-network-services-2bjf", date: "2024-06" },
  { title: "Git, GitHub and Git Commands (70+ git commands)", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/git-github-and-git-commands-70-git-commands-3lc8", date: "2022-08" },
  { title: "How to Create a Preview Link in Next.js with Open Graph", platform: "dev.to", href: "https://dev.to/michellebuchiokonicha/how-to-create-a-preview-link-in-nextjs-with-open-graph-j76", date: "2022-05" },
];

// ── Press, papers & conversations ────────────────────────────
export type PressItem = {
  title: string;
  outlet: string;
  href: string;
  date?: string;
  type: "Feature" | "Paper" | "Interview" | "Podcast" | "Talk" | "Mention";
};

export const press: PressItem[] = [
  // Types: Feature, Paper, Interview, Podcast, Talk, Mention. Empty groups are hidden on /press.
  {
    title: "Michelle Buchi Okonicha wants to build the future of technology",
    outlet: "The Geek Circle",
    href: "https://thegeekcircle.com/michelle-buchi-okonicha/",
    date: "2026",
    type: "Feature",
  },
];

export type Talk = { title: string; event: string; date: string; href?: string };
export const talks: Talk[] = [
  // Add your best 4 to 6 talks here. The Talks column on the home page is hidden while this is empty.
  // { title: "Talk title", event: "Event name", date: "2026", href: "https://..." },
];

export const community = {
  headline: "Girls Like Me Dream Initiative",
  body: "An outreach and AI training programme I founded. It has reached more than 640 girls, giving them hands-on exposure to AI and a community that tells them they belong in tech.",
  roles: [
    "Google Developer Expert (GDE)",
    "Women Techmakers Ambassador",
    "Partnerships Lead, AI Society · University of Hull",
    "Student Ambassador, University of Hull",
    "Volunteer tutor, PyGirls",
  ],
};

// ── Home page extras ─────────────────────────────────────────
// Scrolling strip under the header.
export const ticker = [
  "Google Developer Expert",
  "Women Techmakers Ambassador",
  "Full Circle Award 2026",
  "DAIM Hackathon winner",
  "Featured in The Geek Circle, June 2026",
];

// Topics you're happy to be invited to speak on.
export const speakingTopics = [
  "Small language models & edge AI",
  "Goal drift in AI agents",
  "Getting started in machine learning",
  "Building a community from zero",
  "Women in tech & AI education",
];

// What you're up to right now. Update whenever.
export const currently = [
  "Writing my MSc dissertation on goal drift in small language model agents",
  "Volunteering on LLM evaluation and benchmarking with Crossing Party Lines",
  "Partnerships Lead for the University of Hull AI Society",
  "Tutoring with PyGirls",
  "Building AfroLearner in the open",
];
