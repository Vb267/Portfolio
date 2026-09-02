export const defaultData = {
  personal: {
    name: "Vrushank Bhosale",
    title: "MSc Business Analytics | Data & Fintech Enthusiast",
    location: "Dublin, Ireland",
    phone: "+353 89 497 0166",
    email: "vrushankbhosale10@gmail.com",
    linkedin: "https://www.linkedin.com/in/vrushank-bhosale10/",
    cvUrl: "",
    photo: `${import.meta.env.BASE_URL}images/profile.jpg`,
    profileSummary:
      "Analytical postgraduate with experience in data analysis, performance reporting, and process improvement within financial services and technology environments. Pursuing an MSc in Business Analytics at UCD, combining strong quantitative ability with strategic problem-solving and cross-functional collaboration. Skilled in analysing data to deliver actionable insights, supporting operational goals, and contributing to process improvement initiatives. Passionate about fintech innovation and eager to develop into a future leader in financial services technology.",
  },

  education: [
    {
      id: 1,
      degree: "MSc in Business Analytics",
      school: "University College Dublin",
      subtitle: "Michael Smurfit Graduate Business School",
      location: "Dublin, Ireland",
      period: "Sep 2025 – Sep 2026",
      grade: "",
      modules: ["Business Analytics", "Statistics", "Financial Analysis", "Data Interpretation"],
      highlights: [
        "Built KPI dashboards and conducted structured analyses to support strategic decision-making",
        "Modelled Ireland's national afforestation target through the Ireland Afforestation Programme, an interactive Tableau decision tool balancing carbon capture, land suitability, and farmer incentives",
        "Led The Limits of Learned Optimisation, a critical study benchmarking reinforcement learning against classical methods for job shop scheduling, in collaboration with UCD",
      ],
      logo: "https://www.google.com/s2/favicons?domain=ucd.ie&sz=128",
    },
    {
      id: 2,
      degree: "Bachelor of Engineering (First Class Honours)",
      school: "Pune University",
      subtitle: "Pune, India",
      location: "Pune, India",
      period: "Jun 2020 – Jun 2024",
      grade: "GPA: 3.54",
      modules: ["FastAPI", "Python", "Django", "SQL", "React"],
      highlights: [
        "Built a networking platform in final year using FastAPI, Python, Django, SQL, and React.",
        "Developed an AI chatbot for automated customer assistance.",
      ],
      logo: `${import.meta.env.BASE_URL}images/pune-university-logo.jpg`,
    },
  ],

  experience: [
    {
      id: 1,
      title: "Data Engineering Intern",
      company: "Bajaj Markets",
      companyType: "Financial Services",
      location: "Pune, India",
      period: "Nov 2024 – Aug 2025",
      bullets: [
        "Analysed financial and operational datasets (5M+ records) to provide actionable insights, identifying process inefficiencies that reduced reporting cycle time by 15%.",
        "Collaborated with cross-functional teams to track and report KPIs using Tableau and Advanced Excel, improving reporting visibility and decision turnaround time by 25%.",
        "Contributed to process improvement initiatives by developing standardised reporting templates, improving metric consistency across departments by 20%.",
        "Automated ETL workflows using Python and SQL, eliminating manual dependencies and reducing recurring reporting effort by 30%.",
        "Implemented data validation and reconciliation checks across pipelines, enhancing data quality and reducing discrepancies by 10%.",
      ],
      logo: "https://www.google.com/s2/favicons?domain=bajajfinservmarkets.in&sz=128",
    },
    {
      id: 2,
      title: "Technical Intern",
      company: "Siemens",
      companyType: "Technology",
      location: "Pune, India",
      period: "Feb 2024 – Aug 2024",
      bullets: [
        "Analysed large-scale datasets (10M+ records) to identify operational gaps, delivering insights that improved system reliability by 12%.",
        "Developed automation tools using Python, reducing manual task execution time by 25% and supporting operational efficiency goals.",
        "Created structured documentation and training material using Confluence, reducing recurring system issues by 30%.",
        "Collaborated with cross-functional stakeholders during system enhancements, translating technical updates into clear user guidance.",
      ],
      logo: "https://www.google.com/s2/favicons?domain=siemens.com&sz=128",
    },
  ],

  projects: [
    {
      id: 1,
      title: "The Limits of Learned Optimisation",
      description:
        "A critical study of whether reinforcement learning genuinely beats classical methods at job shop scheduling. Pairing a systematic review of twenty papers with a controlled fair-comparison benchmark, it exposes five practices that inflate reported results and delivers a six-point protocol for evaluating optimisation claims honestly, doubling as a due-diligence checklist for scheduling solutions.",
      tech: ["Reinforcement Learning", "Python", "SQL", "Tableau", "AI Research"],
      period: "May 2026 – Aug 2026",
      collaboration: "University College Dublin (UCD)",
      image: `${import.meta.env.BASE_URL}images/CapstoneProject.png`,
      link: "",
      github: "",
    },
    {
      id: 2,
      title: "Financial Data Pipeline Automation",
      description:
        "Automated ETL pipeline processing 5M+ financial records using Python and SQL. Implemented data validation and reconciliation checks that reduced reporting cycle time by 30% and discrepancies by 10%.",
      tech: ["Python", "SQL", "Snowflake", "ETL"],
      image: `${import.meta.env.BASE_URL}images/project2.png`,
      link: "",
      github: "",
    },
    {
      id: 3,
      title: "Ireland Afforestation Programme",
      description:
        "Turned a national climate target into an interactive decision tool. Built a Tableau dashboard and analytical report modelling Ireland's goal to raise forest cover from 11.6% to 18% by 2027, balancing carbon capture, land suitability, and farmer incentives across 15 sites.",
      tech: ["Tableau", "Data Modelling", "GIS Analysis", "Sustainability Analytics"],
      period: "Feb 2026 – April 2026",
      image: `${import.meta.env.BASE_URL}images/project3.png`,
      link: "https://public.tableau.com/views/Afforestation_Workbook_Main/Story1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
      github: "",
    },
  ],

  skills: [
    {
      category: "Analysis & Strategy",
      items: [
        "Data Analysis",
        "Performance Reporting",
        "Process Improvement",
        "KPI Tracking",
        "Strategic Decision Support",
        "Problem-Solving",
      ],
    },
    {
      category: "Technical",
      items: [
        "Python",
        "SQL",
        "Advanced Microsoft Excel",
        "Tableau",
        "Snowflake",
        "ETL Pipelines",
        "Data Validation",
        "Data Visualisation",
      ],
    },
    {
      category: "Collaboration & Communication",
      items: [
        "Cross-Functional Teamwork",
        "Stakeholder Engagement",
        "Client-Facing Documentation",
        "Presentation Skills",
      ],
    },
    {
      category: "Tools",
      items: ["JIRA", "Confluence", "Microsoft Office Suite"],
    },
  ],

  achievements: [
    {
      id: 1,
      title: "ICITCT 2024 Conference – Published & Presented",
      description:
        "Published and presented original research at the International Conference on Innovative Technologies in Computing and Communications Technology (ICITCT) 2024.",
      year: "2024",
      link: "",
    },
    {
      id: 2,
      title: "UCD Advantage Award",
      description:
        "Recognises growth beyond academics, from volunteering and leadership to community engagement and personal well-being, a reminder that growth doesn't just happen in the classroom.",
      year: "2026",
      link: "",
    },
  ],

  interests: [
    "Fintech",
    "Payments Technology",
    "Financial Services Innovation",
    "Data-Driven Strategy",
  ],

  volunteering: [
    { id: 1, name: "NSS Volunteer" },
    { id: 2, name: "UCD Food Committee" },
    { id: 3, name: "UCD Badminton Club" },
  ],

  partTimeActivities: [
    { id: 1, role: "Retail Assistant", company: "Dunnes Stores", period: "Nov 2025 – Present" },
  ],
};
