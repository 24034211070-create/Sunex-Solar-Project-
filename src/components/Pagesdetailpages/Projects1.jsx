import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Projects1.css";

import s13 from "../../assets/Home2/s13.png";
import s14 from "../../assets/Home2/s14.png";
import s15 from "../../assets/Home2/s15.png";
import r1 from "../../assets/Projects/r1.png";
import r2 from "../../assets/Projects/r2.png";
import r3 from "../../assets/Projects/r3.png";

import { getPages } from "../../Api/api";

const fallbackProjects = [
    {
        id: 1,
        image: s13,
        title: "Rooftop Solar Installation for Residential Homes",
        category: "Residential Solar",
        location: "Ahmedabad, Gujarat",
        date: "January 2026",
        capacity: "15 KW",
        description:
            "A rooftop solar installation designed to provide clean, reliable and cost-effective energy for residential homes. The project focuses on reducing electricity dependency while supporting a more sustainable lifestyle."
    },
    {
        id: 2,
        image: s14,
        title: "Industrial Solar Power Installation Manufacturing",
        category: "Industrial Solar",
        location: "Vadodara, Gujarat",
        date: "February 2026",
        capacity: "250 KW",
        description:
            "A large-scale solar power installation created for an industrial manufacturing facility. The system helps provide dependable renewable energy while reducing long-term operational energy costs."
    },
    {
        id: 3,
        image: s15,
        title: "Sustainable Solar Energy Project for Communities",
        category: "Community Solar",
        location: "Mehsana, Gujarat",
        date: "March 2026",
        capacity: "180 KW",
        description:
            "A community-focused solar energy project created to support clean power generation and improve access to renewable energy for local communities."
    },
    {
        id: 4,
        image: r1,
        title: "Commercial Solar Plant for Office Building",
        category: "Commercial Solar",
        location: "Surat, Gujarat",
        date: "April 2026",
        capacity: "120 KW",
        description:
            "A commercial solar solution developed for an office building to reduce conventional electricity consumption and create a cleaner, more efficient energy system."
    },
    {
        id: 5,
        image: r2,
        title: "Solar Installation for Educational Institute",
        category: "Institutional Solar",
        location: "Patan, Gujarat",
        date: "May 2026",
        capacity: "75 KW",
        description:
            "A solar installation designed for an educational institute, helping the campus move toward renewable energy while creating a more sustainable learning environment."
    },
    {
        id: 6,
        image: r3,
        title: "Hybrid Solar System for Hospital Facility",
        category: "Hybrid Solar",
        location: "Gandhinagar, Gujarat",
        date: "June 2026",
        capacity: "100 KW",
        description:
            "A hybrid solar energy system designed for a hospital facility where dependable electricity is essential. The system combines renewable generation with reliable backup support."
    }
];

const fallbackListing = {
    badge: "Our Projects",
    title: "Powering Progress Through",
    highlightTitle: "Solar Innovation",
    description:
        "Explore our completed solar energy projects, designed to deliver clean, reliable and sustainable power for homes, businesses and communities."
};

const Project1 = () => {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState(fallbackProjects);
    const [listing, setListing] = useState(fallbackListing);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await getPages();

                const pages = Array.isArray(response?.pages)
                    ? response.pages
                    : [];

                const matchingPages = pages
                    .filter(
                        (page) =>
                            page.page_name === "Projects" &&
                            page.section_name === "Main"
                    )
                    .sort(
                        (a, b) =>
                            Number(b.id) - Number(a.id)
                    );

                const page = matchingPages[0];

                if (!page) {
                    setProjects(fallbackProjects);
                    setListing(fallbackListing);
                    return;
                }

                const content =
                    page.content &&
                        typeof page.content === "object"
                        ? page.content
                        : {};

                /* ==============================
                   PROJECTS SECTION HEADER
                ============================== */

                const cmsListing =
                    content.listing &&
                        typeof content.listing === "object"
                        ? content.listing
                        : {};

                setListing({
                    badge:
                        cmsListing.badge ||
                        fallbackListing.badge,

                    title:
                        cmsListing.title ||
                        fallbackListing.title,

                    highlightTitle:
                        cmsListing.highlightTitle ||
                        fallbackListing.highlightTitle,

                    description:
                        cmsListing.description ||
                        fallbackListing.description
                });

                /* ==============================
                   PROJECT CARDS
                ============================== */

                const cmsProjects = Array.isArray(
                    content.projects
                )
                    ? content.projects
                    : [];

                if (cmsProjects.length > 0) {
                    const updatedProjects =
                        fallbackProjects.map(
                            (fallback, index) => {
                                const cmsProject =
                                    cmsProjects.find(
                                        (project) =>
                                            Number(
                                                project.id
                                            ) ===
                                            fallback.id
                                    ) ||
                                    cmsProjects[index];

                                if (!cmsProject) {
                                    return fallback;
                                }

                                return {
                                    ...fallback,
                                    id: fallback.id,

                                    image:
                                        cmsProject.image ||
                                        fallback.image,

                                    title:
                                        cmsProject.title ||
                                        fallback.title,

                                    category:
                                        cmsProject.category ||
                                        fallback.category,

                                    location:
                                        cmsProject.location ||
                                        fallback.location,

                                    date:
                                        cmsProject.date ||
                                        fallback.date,

                                    capacity:
                                        cmsProject.capacity ||
                                        fallback.capacity,

                                    description:
                                        cmsProject.description ||
                                        fallback.description
                                };
                            }
                        );

                    setProjects(updatedProjects);
                } else {
                    setProjects(fallbackProjects);
                }
            } catch (error) {
                console.error(
                    "Projects CMS load error:",
                    error
                );

                setProjects(fallbackProjects);
                setListing(fallbackListing);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(section);
                    }
                },
                {
                    threshold: 0.12
                }
            );

        observer.observe(section);

        return () =>
            observer.disconnect();
    }, []);

    const handleProjectClick = (project) => {
        sessionStorage.setItem(
            "selectedProject",
            JSON.stringify(project)
        );

        sessionStorage.setItem(
            "selectedProjectId",
            String(project.id)
        );
    };

    return (
        <section
            ref={sectionRef}
            className={`project1-section ${visible
                ? "project1-visible"
                : ""
                }`}
        >
            <div className="project1-container">

                {/* ==============================
                    SECTION HEADER
                ============================== */}

                <div className="project1-header">

                    <div className="project1-header-left">

                        <span className="project1-badge">
                            {listing.badge}
                        </span>

                        <h2>
                            {listing.title}
                            <br />
                            <span>
                                {listing.highlightTitle}
                            </span>
                        </h2>

                    </div>

                    <div className="project1-header-right">

                        <p>
                            {listing.description}
                        </p>

                    </div>

                </div>

                {/* ==============================
                    PROJECT CARDS
                ============================== */}

                <div className="project1-grid">

                    {projects.map(
                        (project, index) => (

                            <Link
                                key={project.id}
                                to="/project-details"
                                state={{
                                    project
                                }}
                                onClick={() =>
                                    handleProjectClick(
                                        project
                                    )
                                }
                                className="project1-card"
                                style={{
                                    transitionDelay: `${index * 0.1
                                        }s`
                                }}
                            >

                                <div className="project1-image">

                                    <img
                                        src={
                                            project.image
                                        }
                                        alt={
                                            project.title
                                        }
                                    />

                                </div>

                                <div className="project1-card-content">

                                    <div className="project1-card-text">

                                        <h3>
                                            {
                                                project.title
                                            }
                                        </h3>

                                        <div className="project1-view-details">

                                            <span>
                                                View Details
                                            </span>

                                            <span className="project1-arrow">
                                                <ArrowUpRight
                                                    size={21}
                                                />
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </Link>

                        )
                    )}

                </div>

            </div>
        </section>
    );
};

export default Project1;