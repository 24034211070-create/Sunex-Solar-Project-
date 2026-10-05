import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FolderKanban,
  Globe2,
  MapPin,
  Phone
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Projectdetail.css";

import { getPages } from "../../Api/api";

import s13 from "../../assets/Home2/s13.png";
import s14 from "../../assets/Home2/s14.png";
import s15 from "../../assets/Home2/s15.png";

import r1 from "../../assets/Projects/r1.png";
import r2 from "../../assets/Projects/r2.png";
import r3 from "../../assets/Projects/r3.png";

import q1 from "../../assets/Aboutimages/q1.png";

/* =========================================================
   FALLBACK PROJECT DATA
   ---------------------------------------------------------
   Ye data fallback ke liye hai.
   Actual website data ab Projects / Main CMS se aayega.
========================================================= */

const projects = [
  {
    id: 1,
    image: s13,
    detailImage1: s14,
    detailImage2: s15,

    title: "Rooftop Solar Installation For Residential Homes",
    category: "Residential Solar",
    country: "India",
    location: "Ahmedabad, Gujarat",
    date: "January 2026",
    capacity: "15 KW",
    estimatedTime: "3 Months",
    status: "Completed",

    heroTitle:
      "Rooftop Solar Installation For Residential Homes",

    fullImage: s13,

    introTitle:
      "Clean Solar Energy For Modern Homes",

    introText:
      "This residential solar project was designed to provide a reliable and sustainable source of clean energy for modern homes. The system was carefully planned according to the available rooftop area, energy requirements and long-term performance goals.",

    introText2:
      "By using solar energy, the project helps reduce dependence on conventional electricity while creating a cleaner and more efficient energy solution for everyday residential requirements.",

    challenges: [
      "Limited rooftop space required careful panel planning.",
      "The system needed to provide reliable daily energy generation.",
      "Panel placement had to maximize sunlight exposure.",
      "The installation needed to maintain a clean rooftop appearance."
    ],

    solutionTitle:
      "A Smart Solar Solution For Residential Energy",

    solutionText:
      "Our team designed and installed a complete rooftop solar solution focused on efficiency, reliability and long-term performance. Every part of the system was planned to make the best use of the available rooftop space.",

    solutionText2:
      "From panel positioning and system configuration to installation and monitoring, the complete solution was developed around the specific requirements of the residential property.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "How does this residential solar system work?",
        answer:
          "Solar panels capture sunlight and convert it into electricity. The generated energy can then be used by the property for its daily electricity requirements."
      },
      {
        question:
          "How long does a rooftop solar installation take?",
        answer:
          "The installation timeline depends on the size and requirements of the project. A typical residential installation can be completed within the planned project schedule."
      },
      {
        question:
          "Can the system reduce electricity costs?",
        answer:
          "Yes. Generating electricity from solar energy can reduce dependence on conventional grid electricity and help lower long-term energy costs."
      },
      {
        question:
          "Does the solar system require maintenance?",
        answer:
          "Solar systems require periodic inspection and basic maintenance to keep the panels and other components operating efficiently."
      }
    ]
  },

  {
    id: 2,
    image: s14,
    detailImage1: s15,
    detailImage2: r1,

    title:
      "Industrial Solar Power Installation Manufacturing",

    category: "Industrial Solar",
    country: "India",
    location: "Vadodara, Gujarat",
    date: "February 2026",
    capacity: "250 KW",
    estimatedTime: "6 Months",
    status: "Completed",

    heroTitle:
      "Industrial Solar Power Installation Manufacturing",

    fullImage: s14,

    introTitle:
      "Large-Scale Solar Power For Industry",

    introText:
      "This industrial solar project was developed to support the energy requirements of a large manufacturing facility. The solution was designed around high energy demand, efficient generation and dependable long-term operation.",

    introText2:
      "The installation provides the facility with a renewable energy source while helping create a more efficient and sustainable industrial energy infrastructure.",

    challenges: [
      "High industrial electricity demand required a scalable solution.",
      "Large installation areas needed detailed system planning.",
      "The system required reliable energy generation throughout operations.",
      "Installation had to be coordinated with the manufacturing environment."
    ],

    solutionTitle:
      "Scalable Solar Infrastructure For Industry",

    solutionText:
      "The industrial solution combines carefully planned solar panel placement with an efficient energy generation system. The installation was designed to maximize available space while maintaining reliable performance.",

    solutionText2:
      "The complete project was approached with a focus on system efficiency, operational reliability and long-term renewable energy generation.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "Is solar suitable for manufacturing facilities?",
        answer:
          "Solar power can be used for many industrial facilities and can help supplement conventional electricity with renewable energy generation."
      },
      {
        question:
          "Can industrial solar systems be expanded?",
        answer:
          "A properly planned solar installation can be designed with scalability in mind, depending on available space and electrical infrastructure."
      },
      {
        question:
          "How is industrial solar performance monitored?",
        answer:
          "Solar systems can use monitoring solutions to track energy generation and system performance."
      },
      {
        question:
          "Does industrial solar require regular maintenance?",
        answer:
          "Periodic inspection, cleaning and system checks help maintain efficient long-term operation."
      }
    ]
  },

  {
    id: 3,
    image: s15,
    detailImage1: r1,
    detailImage2: r2,

    title:
      "Sustainable Solar Energy Project For Communities",

    category: "Community Solar",
    country: "India",
    location: "Mehsana, Gujarat",
    date: "March 2026",
    capacity: "180 KW",
    estimatedTime: "5 Months",
    status: "Completed",

    heroTitle:
      "Sustainable Solar Energy Project For Communities",

    fullImage: s15,

    introTitle:
      "Creating Cleaner Energy For Communities",

    introText:
      "This community solar project focuses on creating a cleaner and more sustainable source of electricity for local communities. The project was planned to support renewable energy adoption and long-term energy efficiency.",

    introText2:
      "The system demonstrates how solar technology can be integrated into community-focused energy projects while maintaining dependable energy generation.",

    challenges: [
      "The project needed to serve broader community energy requirements.",
      "Available installation areas required efficient planning.",
      "The system needed dependable renewable generation.",
      "Long-term operation and maintenance had to be considered."
    ],

    solutionTitle:
      "Community-Focused Renewable Energy",

    solutionText:
      "The solar solution was planned around efficient energy generation and responsible use of available installation space. The project combines practical solar technology with a long-term sustainability approach.",

    solutionText2:
      "The result is a renewable energy system designed to support cleaner electricity generation for the surrounding community.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "What is a community solar project?",
        answer:
          "A community solar project is designed to provide renewable electricity generation for a group, community or shared energy environment."
      },
      {
        question:
          "Why is solar useful for communities?",
        answer:
          "Solar can provide renewable electricity generation while reducing dependence on conventional energy sources."
      },
      {
        question:
          "Can community solar projects be expanded?",
        answer:
          "Expansion depends on available land or rooftop space, electrical infrastructure and future energy requirements."
      },
      {
        question:
          "How is the system maintained?",
        answer:
          "Regular inspections, cleaning and performance monitoring help maintain system efficiency."
      }
    ]
  },

  {
    id: 4,
    image: r1,
    detailImage1: r2,
    detailImage2: r3,

    title:
      "Commercial Solar Plant For Office Building",

    category: "Commercial Solar",
    country: "India",
    location: "Surat, Gujarat",
    date: "April 2026",
    capacity: "120 KW",
    estimatedTime: "4 Months",
    status: "Completed",

    heroTitle:
      "Commercial Solar Plant For Office Building",

    fullImage: r1,

    introTitle:
      "Efficient Solar Power For Commercial Spaces",

    introText:
      "This commercial solar project was created for an office building with the goal of reducing conventional electricity dependency and improving renewable energy generation.",

    introText2:
      "The system was designed to integrate efficiently with the building while maintaining a professional and reliable energy solution.",

    challenges: [
      "The office building required efficient use of available rooftop space.",
      "The installation needed to work around the existing building structure.",
      "Energy generation needed to support regular office operations.",
      "The final installation had to maintain a clean appearance."
    ],

    solutionTitle:
      "Reliable Solar Energy For Commercial Operations",

    solutionText:
      "The commercial solar solution was planned to maximize renewable energy generation while fitting naturally into the existing building infrastructure.",

    solutionText2:
      "The project combines efficient solar panels, structured installation planning and system monitoring for dependable commercial energy generation.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "Can office buildings use rooftop solar?",
        answer:
          "Yes. Office buildings with suitable rooftop or installation areas can use solar systems to generate renewable electricity."
      },
      {
        question:
          "Will solar work during office hours?",
        answer:
          "Solar systems generate electricity when sunlight is available, making them suitable for buildings with daytime electricity demand."
      },
      {
        question:
          "How much rooftop space is required?",
        answer:
          "The required space depends on the desired system capacity and the efficiency of the selected solar panels."
      },
      {
        question:
          "Is regular cleaning required?",
        answer:
          "Periodic cleaning and inspection can help maintain efficient solar panel performance."
      }
    ]
  },

  {
    id: 5,
    image: r2,
    detailImage1: r3,
    detailImage2: s13,

    title:
      "Solar Installation For Educational Institute",

    category: "Institutional Solar",
    country: "India",
    location: "Patan, Gujarat",
    date: "May 2026",
    capacity: "75 KW",
    estimatedTime: "3 Months",
    status: "Completed",

    heroTitle:
      "Solar Installation For Educational Institute",

    fullImage: r2,

    introTitle:
      "Renewable Energy For Educational Spaces",

    introText:
      "This solar installation was developed for an educational institute to support renewable energy adoption and create a more sustainable campus environment.",

    introText2:
      "The project combines practical clean energy generation with a long-term approach toward reducing conventional electricity dependency.",

    challenges: [
      "The campus required a practical renewable energy solution.",
      "Solar installation needed to fit the existing building infrastructure.",
      "Energy generation had to support regular campus operations.",
      "The installation needed to be safe and professionally organized."
    ],

    solutionTitle:
      "A Sustainable Energy System For The Campus",

    solutionText:
      "The solar solution was designed around the institute's energy requirements and available installation space. The system provides a clean renewable energy source for the campus.",

    solutionText2:
      "The project also demonstrates how educational institutions can adopt practical renewable energy solutions for their infrastructure.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "Why is solar useful for educational institutes?",
        answer:
          "Solar energy can help educational campuses generate renewable electricity and reduce dependence on conventional power."
      },
      {
        question:
          "Can solar be installed on school or college rooftops?",
        answer:
          "Suitable rooftops can be used for solar installation after evaluating structural and electrical requirements."
      },
      {
        question:
          "Does the system need daily maintenance?",
        answer:
          "No. Solar systems generally require periodic inspection and cleaning rather than daily maintenance."
      },
      {
        question:
          "Can the system support daytime electricity usage?",
        answer:
          "Solar generation during daylight hours can help support daytime electricity requirements."
      }
    ]
  },

  {
    id: 6,
    image: r3,
    detailImage1: s13,
    detailImage2: s14,

    title:
      "Hybrid Solar System For Hospital Facility",

    category: "Hybrid Solar",
    country: "India",
    location: "Gandhinagar, Gujarat",
    date: "June 2026",
    capacity: "100 KW",
    estimatedTime: "5 Months",
    status: "Completed",

    heroTitle:
      "Hybrid Solar System For Hospital Facility",

    fullImage: r3,

    introTitle:
      "Reliable Solar Energy For Critical Facilities",

    introText:
      "This hybrid solar project was designed for a hospital facility where dependable energy availability is especially important. The solution combines renewable solar generation with a reliable energy support approach.",

    introText2:
      "The project focuses on energy reliability, efficient solar generation and a system design suitable for an important healthcare environment.",

    challenges: [
      "The facility required dependable electricity availability.",
      "The solar system had to work with the existing electrical infrastructure.",
      "Energy generation needed to be efficient and reliable.",
      "System planning required careful consideration of operational requirements."
    ],

    solutionTitle:
      "Hybrid Solar Technology For Reliable Power",

    solutionText:
      "The hybrid solar solution was planned to combine renewable solar generation with reliable energy support. The system was designed around the facility's operational requirements.",

    solutionText2:
      "Careful planning of the solar installation and system configuration helps create a dependable renewable energy solution for the hospital environment.",

    systemTitle:
      "Optimized System Design",

    panelEfficiency: 85,
    energyOptimization: 95,

    faq: [
      {
        question:
          "What is a hybrid solar system?",
        answer:
          "A hybrid solar system combines solar generation with additional energy support such as battery storage or another suitable backup source."
      },
      {
        question:
          "Why can hybrid solar be useful for hospitals?",
        answer:
          "Healthcare facilities can benefit from energy solutions designed around reliability and continuity of power."
      },
      {
        question:
          "Can solar work with existing electrical systems?",
        answer:
          "Solar systems can be integrated with existing electrical infrastructure after appropriate technical assessment and system planning."
      },
      {
        question:
          "How is a hybrid system monitored?",
        answer:
          "Monitoring systems can track solar generation, energy usage and other system performance information."
      }
    ]
  }
];

/* =========================================================
   HELPER
========================================================= */

const parseContent = (content) => {
  if (!content) return {};

  if (typeof content === "object") {
    return content;
  }

  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  return {};
};

/* =========================================================
   COMPONENT
========================================================= */

const ProjectDetail = () => {
  const location = useLocation();

  const [project, setProject] = useState(null);

  const [activeFaq, setActiveFaq] = useState(null);

  const [visible, setVisible] = useState(false);

  const [progressVisible, setProgressVisible] =
    useState(false);

  const progressRef = useRef(null);

  /* =======================================================
     SELECT PROJECT ID
     URL REMAINS /project-details
  ======================================================= */

  const getSelectedProjectId = () => {
    let selectedProjectId = Number(
      sessionStorage.getItem("selectedProjectId")
    );

    if (
      !selectedProjectId &&
      location.state?.project?.id
    ) {
      selectedProjectId = Number(
        location.state.project.id
      );
    }

    if (!selectedProjectId) {
      const savedProject =
        sessionStorage.getItem("selectedProject");

      if (savedProject) {
        try {
          const parsedProject =
            JSON.parse(savedProject);

          if (parsedProject?.id) {
            selectedProjectId = Number(
              parsedProject.id
            );
          }
        } catch {
          selectedProjectId = 1;
        }
      }
    }

    if (
      !selectedProjectId ||
      selectedProjectId < 1 ||
      selectedProjectId > 6
    ) {
      selectedProjectId = 1;
    }

    return selectedProjectId;
  };

  /* =======================================================
     LOAD EVERYTHING FROM:

     Projects
       ↓
     Main
       ↓
     content
       ↓
     projects[]
  ======================================================= */

  useEffect(() => {
    const loadProject = async () => {
      const selectedProjectId =
        getSelectedProjectId();

      const fallbackProject =
        projects.find(
          (item) =>
            Number(item.id) ===
            Number(selectedProjectId)
        ) || projects[0];

      /* Start immediately with fallback */
      setProject(fallbackProject);

      setActiveFaq(null);
      setProgressVisible(false);

      window.scrollTo({
        top: 0,
        behavior: "auto"
      });

      setVisible(false);

      const timer = setTimeout(() => {
        setVisible(true);
      }, 100);

      try {
        const response = await getPages();

        const pages = Array.isArray(
          response?.pages
        )
          ? response.pages
          : [];

        /* ===============================================
           FIND SINGLE PROJECTS / MAIN RECORD
        =============================================== */

        const projectPages = pages
          .filter(
            (page) =>
              page.page_name === "Projects" &&
              page.section_name === "Main"
          )
          .sort(
            (a, b) =>
              Number(b.id) - Number(a.id)
          );

        if (!projectPages.length) {
          return;
        }

        const latestPage =
          projectPages[0];

        const content = parseContent(
          latestPage.content
        );

        const cmsProjects =
          Array.isArray(content.projects)
            ? content.projects
            : [];

        /* ===============================================
           FIND SELECTED PROJECT INSIDE CMS
        =============================================== */

        const cmsProject =
          cmsProjects.find(
            (item) =>
              Number(item.id) ===
              Number(selectedProjectId)
          );

        if (!cmsProject) {
          return;
        }

        /* ===============================================
           MERGE CMS DATA WITH FALLBACK DATA

           CMS data wins.
           Missing fields remain from fallback.
        =============================================== */

        const mergedProject = {
          ...fallbackProject,
          ...cmsProject,

          challenges:
            Array.isArray(
              cmsProject.challenges
            )
              ? cmsProject.challenges
              : fallbackProject.challenges,

          faq:
            Array.isArray(
              cmsProject.faq
            )
              ? cmsProject.faq
              : fallbackProject.faq
        };

        setProject(mergedProject);
      } catch (error) {
        console.error(
          "Project Detail CMS Error:",
          error
        );
      }

      return () => clearTimeout(timer);
    };

    loadProject();
  }, [location.state]);

  /* =======================================================
     PROGRESS BAR OBSERVER
  ======================================================= */

  useEffect(() => {
    if (!progressRef.current) return;

    setProgressVisible(false);

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setProgressVisible(true);

            observer.unobserve(
              entry.target
            );
          }
        },
        {
          threshold: 0.25
        }
      );

    observer.observe(
      progressRef.current
    );

    return () =>
      observer.disconnect();
  }, [project]);

  if (!project) {
    return null;
  }

  /* =======================================================
     CMS VALUES

     These are now coming from Projects / Main
     content.projects[id]
  ======================================================= */

  const detailHeroTitle =
    project.heroTitle ||
    project.title;

  const detailFullImage =
    project.fullImage ||
    project.image;

  const panelEfficiency = Number(
    project.panelEfficiency ?? 85
  );

  const energyOptimization = Number(
    project.energyOptimization ?? 95
  );

  const systemTitle =
    project.systemTitle ||
    "Optimized System Design";

  const toggleFaq = (index) => {
    setActiveFaq(
      activeFaq === index
        ? null
        : index
    );
  };

  return (
    <div
      className={`project-detail-page ${visible
        ? "project-detail-page-visible"
        : ""
        }`}
    >

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="project-detail-hero">

        <div className="project-detail-hero-bg">
          <img
            src={q1}
            alt="Solar Energy"
          />
        </div>

        <div className="project-detail-hero-overlay" />

        <div className="project-detail-hero-content">

          <h1>
            {detailHeroTitle}
          </h1>

          <div className="project-detail-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <Link to="/projects">
              Projects
            </Link>

            <span>/</span>

            <span>
              {detailHeroTitle}
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN PROJECT DETAIL
      ====================================================== */}

      <section className="project-detail-main">

        <div className="project-detail-wrapper">

          {/* =================================================
              CMS FULL IMAGE
          ================================================== */}

          <div className="project-detail-main-image">

            <img
              src={detailFullImage}
              alt={detailHeroTitle}
            />

          </div>

          <div className="project-detail-layout">

            {/* =================================================
                LEFT SIDEBAR
            ================================================== */}

            <aside className="project-detail-sidebar">

              <div className="project-detail-sidebar-card">

                <span className="project-detail-side-label">
                  Project Information
                </span>

                <h2>
                  Project Details
                </h2>

                <div className="project-detail-info">

                  <div className="project-detail-info-item">

                    <span className="project-detail-info-icon">
                      <FolderKanban size={18} />
                    </span>

                    <div>

                      <small>
                        Project Name
                      </small>

                      <strong>
                        {project.title}
                      </strong>

                    </div>

                  </div>

                  <div className="project-detail-info-item">

                    <span className="project-detail-info-icon">
                      <MapPin size={18} />
                    </span>

                    <div>

                      <small>
                        Category
                      </small>

                      <strong>
                        {project.category}
                      </strong>

                    </div>

                  </div>

                  <div className="project-detail-info-item">

                    <span className="project-detail-info-icon">
                      <Globe2 size={18} />
                    </span>

                    <div>

                      <small>
                        Country
                      </small>

                      <strong>
                        {project.country}
                      </strong>

                    </div>

                  </div>

                  <div className="project-detail-info-item">

                    <span className="project-detail-info-icon">
                      <Clock3 size={18} />
                    </span>

                    <div>

                      <small>
                        Estimated Time
                      </small>

                      <strong>
                        {project.estimatedTime}
                      </strong>

                    </div>

                  </div>

                  <div className="project-detail-info-item">

                    <span className="project-detail-info-icon">
                      <Check size={18} />
                    </span>

                    <div>

                      <small>
                        Project Status
                      </small>

                      <strong>
                        {project.status}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CONTACT QUOTE
              ================================================== */}

              <div className="project-detail-quote">

                <div className="project-detail-quote-icon">
                  <Phone size={22} />
                </div>

                <span>
                  Need Solar Solution?
                </span>

                <h3>
                  Contact Us
                  <br />
                  For A Quote
                </h3>

                <p>
                  Talk to our solar experts and find
                  the right clean energy solution for
                  your project.
                </p>

                <a href="tel:+919999999999">

                  <span>
                    Call Us
                  </span>

                  <ArrowUpRight size={18} />

                </a>

              </div>

            </aside>

            {/* =================================================
                RIGHT SIDE CONTENT
            ================================================== */}

            <main className="project-detail-content">

              <div className="project-detail-scroll-content">

                {/* =================================================
                    INTRODUCTION
                ================================================== */}

                <section className="project-detail-section">

                  <span className="project-detail-section-label">
                    Introduction
                  </span>

                  <h2>
                    {project.introTitle}
                  </h2>

                  <p>
                    {project.introText}
                  </p>

                  <p>
                    {project.introText2}
                  </p>

                </section>

                {/* =================================================
                    CMS DETAIL IMAGES
                ================================================== */}

                <section className="project-detail-medium-images">

                  <div className="project-detail-medium-image">

                    <img
                      src={
                        project.detailImage1
                      }
                      alt={`${project.title} project`}
                    />

                  </div>

                  <div className="project-detail-medium-image">

                    <img
                      src={
                        project.detailImage2
                      }
                      alt={`${project.title} installation`}
                    />

                  </div>

                </section>

                {/* =================================================
                    PROJECT CHALLENGES
                ================================================== */}

                <section className="project-detail-section">

                  <span className="project-detail-section-label">
                    Project Challenges
                  </span>

                  <h2>
                    Challenges We
                    <br />
                    Solved
                  </h2>

                  <div className="project-detail-challenges">

                    {Array.isArray(
                      project.challenges
                    ) &&
                      project.challenges.map(
                        (
                          challenge,
                          index
                        ) => (

                          <div
                            className="project-detail-challenge"
                            key={index}
                          >

                            <span>
                              0
                              {index + 1}
                            </span>

                            <p>
                              {challenge}
                            </p>

                          </div>

                        )
                      )}

                  </div>

                </section>

                {/* =================================================
                    OUR SOLUTION
                ================================================== */}

                <section className="project-detail-section">

                  <span className="project-detail-section-label">
                    Our Solution
                  </span>

                  <h2>
                    {project.solutionTitle}
                  </h2>

                  <p>
                    {project.solutionText}
                  </p>

                  <p>
                    {project.solutionText2}
                  </p>

                </section>

                {/* =================================================
                    OPTIMIZED SYSTEM DESIGN
                ================================================== */}

                <section
                  ref={progressRef}
                  className="project-detail-section project-detail-design"
                >

                  <span className="project-detail-section-label">
                    Optimized System Design
                  </span>

                  <h2>
                    {systemTitle}
                  </h2>

                  <p>
                    Every project is carefully planned
                    to make efficient use of available
                    space, improve energy generation
                    and maintain dependable long-term
                    performance.
                  </p>

                  <div className="project-detail-progress-list">

                    {/* =================================================
                        PROGRESS 1
                    ================================================== */}

                    <div className="project-detail-progress-item">

                      <div className="project-detail-progress-head">

                        <span>
                          Roof Installation
                        </span>

                        <strong>
                          {panelEfficiency}%
                        </strong>

                      </div>

                      <div className="project-detail-progress-track">

                        <span
                          style={{
                            width: progressVisible
                              ? `${panelEfficiency}%`
                              : "0%"
                          }}
                        />

                      </div>

                    </div>

                    {/* =================================================
                        PROGRESS 2
                    ================================================== */}

                    <div className="project-detail-progress-item">

                      <div className="project-detail-progress-head">

                        <span>
                          Roof Repair & Maintenance
                        </span>

                        <strong>
                          {energyOptimization}%
                        </strong>

                      </div>

                      <div className="project-detail-progress-track">

                        <span
                          style={{
                            width: progressVisible
                              ? `${energyOptimization}%`
                              : "0%"
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    FAQ
                ================================================== */}

                <section className="project-detail-section project-detail-faq">

                  <span className="project-detail-section-label">
                    Frequently Asked Questions
                  </span>

                  <h2>
                    Questions About
                    <br />
                    This Project
                  </h2>

                  <div className="project-detail-faq-list">

                    {Array.isArray(
                      project.faq
                    ) &&
                      project.faq.map(
                        (
                          item,
                          index
                        ) => {

                          const open =
                            activeFaq ===
                            index;

                          return (

                            <div
                              className={`project-detail-faq-item ${open
                                ? "faq-open"
                                : ""
                                }`}
                              key={index}
                            >

                              <button
                                type="button"
                                onClick={() =>
                                  toggleFaq(
                                    index
                                  )
                                }
                              >

                                <span>
                                  {
                                    item.question
                                  }
                                </span>

                                <span className="project-detail-faq-icon">

                                  <ChevronDown
                                    size={19}
                                  />

                                </span>

                              </button>

                              <div className="project-detail-faq-answer">

                                <p>
                                  {
                                    item.answer
                                  }
                                </p>

                              </div>

                            </div>

                          );
                        }
                      )}

                  </div>

                </section>

                {/* =================================================
                    BOTTOM CTA
                ================================================== */}

                <section className="project-detail-bottom-cta">

                  <div>

                    <span>
                      Start Your Solar Journey
                    </span>

                    <h2>
                      Ready To Build
                      <br />
                      Your Solar Project?
                    </h2>

                  </div>

                  <Link to="/contact">

                    <span>
                      Contact Us
                    </span>

                    <ArrowUpRight size={20} />

                  </Link>

                </section>

              </div>

            </main>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ProjectDetail;