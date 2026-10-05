import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import "./Home2Project.css";

import s13 from "../../assets/Home2/s13.png";
import s14 from "../../assets/Home2/s14.png";
import s15 from "../../assets/Home2/s15.png";

const OurProjects = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements = section.querySelectorAll(".project-scroll");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("project-visible");
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            elements.forEach((element) => {
                observer.unobserve(element);
            });
        };
    }, []);

    const projects = [
        {
            image: s13,
            title: "Rooftop Solar Installation for Residential Homes",
        },
        {
            image: s14,
            title: "Industrial Solar Power Installation Manufacturing Unit",
        },
        {
            image: s15,
            title: "Sustainable Solar Energy Project for Communities",
        },
    ];

    return (
        <section className="our-projects-section" ref={sectionRef}>

            {/* ================= HEADING ================= */}

            <div className="projects-heading project-scroll">

                <div className="projects-label">
                    <span></span>
                    Our Projects
                </div>

                <h2>
                    Our projects delivering reliable
                    <br />
                    clean energy solutions
                </h2>

            </div>


            {/* ================= PROJECT CARDS ================= */}

            <div className="projects-grid">

                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`project-card project-scroll project-delay-${index + 1}`}
                    >

                        {/* BIG IMAGE */}

                        <img
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                        />

                        {/* IMAGE DARK OVERLAY */}

                        <div className="project-image-overlay"></div>


                        {/* ================= CONTENT ================= */}

                        <div className="project-info">

                            <h3>
                                {project.title}
                            </h3>

                            <div className="project-details">

                                <span>
                                    View Details
                                </span>

                                <button
                                    type="button"
                                    className="project-arrow"
                                    aria-label="View project details"
                                >
                                    <ArrowUpRight size={19} />
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="projects-bottom project-scroll">

                <span className="projects-free">
                    Free
                </span>

                <p>
                    Explore our completed solar projects and success stories today –
                    <a href="#projects">
                        View All Projects
                    </a>
                </p>

            </div>

        </section>
    );
};

export default OurProjects;