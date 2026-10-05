import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";

import q1 from "../../assets/Aboutimages/q1.png";
import Projects1 from "../Pagesdetailpages/Projects1";

import { getPages } from "../../Api/api";

const Projects = () => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    const [heroData, setHeroData] = useState({
        title: "Our Projects",
        backgroundImage: "",
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Projects",
    });

    // ======================================================
    // LOAD COMPLETE PROJECTS PAGE HERO FROM CMS
    // Projects / Main
    // ======================================================

    useEffect(() => {
        const loadProjectsHero = async () => {
            try {
                const response = await getPages();

                const pages = Array.isArray(response?.pages)
                    ? response.pages
                    : [];

                // ==================================================
                // FIND ONLY:
                // page_name = Projects
                // section_name = Main
                // ==================================================

                const projectMainPages = pages.filter((page) => {
                    const pageName = String(
                        page.page_name ||
                        page.pageName ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    const sectionName = String(
                        page.section_name ||
                        page.sectionName ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    return (
                        pageName === "projects" &&
                        sectionName === "main"
                    );
                });

                if (projectMainPages.length === 0) {
                    console.warn(
                        "Projects / Main CMS record not found. Using default Hero."
                    );

                    return;
                }

                // ==================================================
                // LATEST PROJECTS / MAIN RECORD
                // ==================================================

                const latestPage = projectMainPages.reduce(
                    (latest, current) =>
                        Number(current.id) > Number(latest.id)
                            ? current
                            : latest
                );

                // ==================================================
                // CONTENT
                // ==================================================

                const content =
                    latestPage.content &&
                        typeof latestPage.content === "object"
                        ? latestPage.content
                        : {};

                // ==================================================
                // HERO CONTENT
                // ==================================================

                const hero =
                    content.hero &&
                        typeof content.hero === "object"
                        ? content.hero
                        : {};

                // ==================================================
                // SET HERO DATA
                // ==================================================

                setHeroData({
                    title:
                        hero.title ||
                        latestPage.title ||
                        "Our Projects",

                    backgroundImage:
                        hero.image ||
                        latestPage.image ||
                        "",

                    breadcrumbHome:
                        hero.breadcrumbHome ||
                        "Home",

                    breadcrumbCurrent:
                        hero.breadcrumbCurrent ||
                        "Projects",
                });

            } catch (error) {
                console.error(
                    "PROJECTS HERO LOAD ERROR:",
                    error
                );
            }
        };

        loadProjectsHero();
    }, []);

    // ======================================================
    // PARALLAX EFFECT
    // ======================================================

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current || !bgRef.current) {
                return;
            }

            const rect =
                heroRef.current.getBoundingClientRect();

            const movement = rect.top * -0.28;

            bgRef.current.style.transform =
                `translate3d(0, ${movement}px, 0)`;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    // ======================================================
    // BACKGROUND IMAGE
    // ======================================================

    const backgroundImage =
        heroData.backgroundImage || q1;

    // ======================================================
    // UI
    // ======================================================

    return (
        <main>

            {/* ==================================================
                PROJECTS HERO
            ================================================== */}

            <section
                className="vision-hero"
                ref={heroRef}
            >

                {/* Background */}

                <div
                    ref={bgRef}
                    className="vision-background"
                    style={{
                        backgroundImage:
                            `url(${backgroundImage})`,
                    }}
                ></div>

                {/* Overlay */}

                <div className="vision-overlay"></div>

                {/* Content */}

                <div className="vision-content">

                    <h1>
                        {heroData.title}
                    </h1>

                    <div className="vision-breadcrumb">

                        <span>
                            {heroData.breadcrumbHome}
                        </span>

                        <span>
                            /
                        </span>

                        <span>
                            {heroData.breadcrumbCurrent}
                        </span>

                    </div>

                </div>

            </section>

            {/* ==================================================
                PROJECT LISTING
                Projects1 CMS se data load karega
            ================================================== */}

            <Projects1 />

        </main>
    );
};

export default Projects;