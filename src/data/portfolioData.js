export const portfolioData = {
  personal: {
    name: "Tharun C",
    fullName: "Tharun Chokkanathan",
    title: "B.E. Computer Science and Engineering (AI & ML)",
    role: "Computer Science Engineer • AI & ML • UI/UX",
    institution: "Rajalakshmi Institute of Technology, Chennai",
    affiliation: "Affiliated with Anna University",
    batch: "2025 - 2029",
    location: "Chennai, Tamil Nadu, India",
    shortBio: "Rooted in Artificial Intelligence & Machine Learning, with a strong focus on UI/UX design, product management, and software development.",
    aboutParagraphs: [
      "Rooted in Artificial Intelligence & Machine Learning, with a strong focus on UI/UX design, product management, and full-stack software development.",
      "An active tech community enthusiast who frequently travels for developer summits, hackathons, and community conferences—regularly attending and networking at Google Developer Groups (GDG), DevFest, and tech meetups.",
      "Focused on engineering tactile, high-performance digital products and intelligent systems that solve real-world problems with clean architecture and refined design."
    ],
    education: [
      {
        id: "edu-1",
        level: "Engineering / College",
        degree: "B.E. Computer Science and Engineering (AI & ML)",
        institution: "Rajalakshmi Institute of Technology, Chennai",
        affiliation: "Affiliated with Anna University",
        period: "2025 - 2029",
        score: "CGPA: 7.67 / 10.0",
        details: "Specialization in Artificial Intelligence & Machine Learning. Anna University affiliated curriculum."
      },
      {
        id: "edu-2",
        level: "Higher Secondary (Class XII)",
        institution: "Senior Secondary",
        degree: "Class XII (Higher Secondary)",
        period: "Completed",
        score: "Score: 84%",
        details: "Mathematics, Physics, Chemistry, and Computer Science."
      },
      {
        id: "edu-3",
        level: "Secondary School (Class X)",
        institution: "Secondary School",
        degree: "Class X (Secondary School Examination)",
        period: "Completed",
        score: "Score: 80%",
        details: "Foundation in Mathematics, Science, and Analytical Problem Solving."
      }
    ],
    community: [
      {
        name: "Google Developer Groups (GDG)",
        detail: "Active attendee and community enthusiast participating in Google developer summits, technical workshops, and developer meetups."
      },
      {
        name: "DevFest & Tech Summits",
        detail: "Regularly travels for regional DevFests, AI/ML hackathons, and software conferences to learn, network, and exchange ideas."
      }
    ],
    metrics: [
      { label: "College CGPA", value: "7.67", subtext: "Anna University" },
      { label: "Specialization", value: "AI & ML", subtext: "Department" },
      { label: "Engineering Batch", value: "2025–29", subtext: "RIT Chennai" }
    ]
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/tharun-chokkanathan-48a589398",
    github: "https://github.com/Tharunchokkanathan",
    email: "tharunchokkanc@gmail.com",
    gmailCompose: "mailto:tharunchokkanc@gmail.com",
    twitter: "https://x.com/Tharunr6oa",
    resume: "#"
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "Cpu",
      description: "Core programming languages, procedural & object-oriented programming, and relational querying.",
      items: [
        "Python",
        "C",
        "C++",
        "MySQL / SQL"
      ]
    },
    {
      category: "Web & Database Technologies",
      icon: "Layout",
      description: "Modern frontend engineering, reactive state management, and scalable databases.",
      items: [
        "React",
        "PostgreSQL",
        "MySQL",
        "Tailwind CSS",
        "HTML5 & CSS3"
      ]
    },
    {
      category: "Core Tools & Design",
      icon: "Palette",
      description: "Professional UI/UX wireframing, creative media, and modern developer workflow tools.",
      items: [
        "Figma (UI/UX Design)",
        "Canva",
        "GitHub & Git",
        "VS Code",
        "Product Management"
      ]
    }
  ],

  projects: [
    {
      id: "nourish-network",
      title: "Nourish Network",
      category: "Full-Stack Web App",
      year: "2025",
      headline: "Community surplus food redistribution & emergency hunger relief network.",
      description: "A comprehensive digital network engineered to connect surplus food donors, NGOs, volunteer drivers, and relief shelters in real-time. Optimizes meal logistics, reduces community food waste, and automates supply tracking.",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "REST API"],
      liveUrl: "https://nourish-network-4bit.onrender.com/",
      githubUrl: "https://github.com/Tharunchokkanathan/Nourish__Network",
      color: "#10b981",
      stats: [
        { label: "Mission", value: "Food Rescue" },
        { label: "Stack", value: "Full-Stack" },
        { label: "Status", value: "Render Live" }
      ],
      highlights: [
        "Engineered real-time donor-to-shelter distribution workflow with automated delivery request matching.",
        "Interactive dashboard for donors and volunteers tracking meal metrics, pickup routes, and delivery status.",
        "Responsive, lightweight UI designed for rapid mobile triage during food rescue operations."
      ]
    },
    {
      id: "solaris",
      title: "SOLARIS",
      category: "AI Energy Platform",
      year: "2025",
      headline: "AI-powered home energy platform monitoring real-time power flows and solar generation.",
      description: "SOLARIS is an AI-powered home energy platform that monitors real-time power flows, solar generation, and battery status. It optimizes your power consumption, tracks grid independence, and calculates financial savings and environmental impact.",
      tags: ["Firebase Hosting", "AI / ML Analytics", "Tailwind CSS", "Data Viz", "Renewable Energy"],
      liveUrl: "https://solaris-trails2.vercel.app/",
      githubUrl: "https://github.com/Tharunchokkanathan/SOLARIS",
      color: "#10b981",
      stats: [
        { label: "Analytics", value: "AI-Optimized" },
        { label: "Monitoring", value: "Real-Time Telemetry" },
        { label: "Status", value: "Firebase Live" }
      ],
      highlights: [
        "Real-time energy telemetry tracking solar generation curves, household load, and battery state-of-charge.",
        "Intelligent power flow optimizer projecting daily financial savings and reduced grid dependence.",
        "High-density interactive metric charts with predictive renewable energy forecasting."
      ]
    },
    {
      id: "clone-me",
      title: "CLONE ME",
      category: "Indie Browser Game",
      year: "2024",
      headline: "Arcade-style tactical browser game competing against a recorded ghost of your own past run.",
      description: "CLONE ME is an arcade-style indie browser game where you compete against a recorded ghost of your own past run. As you progress, your previous gameplay actions are mirrored by your clones, creating escalating tactical challenges against yourself.",
      tags: ["React", "HTML5 Canvas", "Game Loops", "Input Mirroring", "Tailwind CSS"],
      liveUrl: "https://clone-me-sepia.vercel.app/",
      githubUrl: "https://github.com/Tharunchokkanathan/CLONE-ME",
      color: "#10b981",
      stats: [
        { label: "Frame Rate", value: "60+ FPS" },
        { label: "Mechanic", value: "Ghost Recording" },
        { label: "Status", value: "Vercel Live" }
      ],
      highlights: [
        "Deterministic ghost-run recording and playback engine replicating prior run movements and actions.",
        "Escalating tactical gameplay loops where your own past strategies become your toughest obstacle.",
        "60+ FPS smooth canvas rendering with zero frame drop input polling on standard laptops."
      ]
    },
    {
      id: "beacon",
      title: "BEACON",
      category: "Mission-Critical Hub",
      year: "2024",
      headline: "Zero-trust search and rescue coordination hub managing field teams and GPS sector coverage.",
      description: "Beacon is an open-source, zero-trust search and rescue coordination hub designed to manage field teams, track GPS sector coverage, and verify real-time intel during emergency operations.",
      tags: ["React", "Firebase / DB", "GPS Geolocation", "Zero-Trust", "Emergency Ops"],
      liveUrl: "https://beacon-577ad.web.app/",
      githubUrl: "https://github.com/Tharunchokkanathan/BEACON",
      color: "#10b981",
      stats: [
        { label: "Architecture", value: "Zero-Trust" },
        { label: "Tracking", value: "GPS Geo-Grid" },
        { label: "Status", value: "Firebase Live" }
      ],
      highlights: [
        "Zero-trust verified mission log tracking search sectors, terrain heatmaps, and field team health in real time.",
        "Resilient offline-first telemetry synchronization for rapid field deployments in low-connectivity areas.",
        "Central incident command dashboard with live status feeds and geo-referenced situational reports."
      ]
    }
  ]
};
