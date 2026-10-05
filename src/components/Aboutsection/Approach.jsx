import React, { useEffect, useRef, useState } from "react";
import { PanelsTopLeft, Globe2, BadgeCheck } from "lucide-react";
import "./Approach.css";

import q2 from "../../assets/Aboutimages/q2.png";
import api from "../../Api/axios";

const Home3About = () => {
    const sectionRef = useRef(null);

    const [hovered, setHovered] = useState(false);

    const [approach, setApproach] = useState({
        label: "Our Approach",
        title: "Turning your clean energy vision into reality",
        description:
            "We guide you through every step of your solar journey – from understanding your energy needs and designing the right system to expert installation and ongoing support. Our approach focuses on smart planning, quality components, and reliable execution.",
        image: "",
        missionTitle: "Our Mission",
        missionText:
            "Our mission is to make clean, reliable affordable solar energy accessible to homes.",
        visionTitle: "Our Vision",
        visionText:
            "Our vision is to lead the transition to a cleaner & more sustainable energy future.",
        valuesTitle: "Our Values",
        valuesText:
            "We believe putting customer first, delivering reliable and efficient solutions.",
    });

    // =========================================================
    // LOAD APPROACH FROM DATABASE
    // =========================================================

    useEffect(() => {
        const loadApproach = async () => {
            try {
                const response = await api.get("/pages");

                console.log(
                    "ABOUT US APPROACH WEBSITE - API:",
                    response.data
                );

                const pages = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.pages)
                        ? response.data.pages
                        : [];

                const approachPage = pages.find(
                    (page) =>
                        String(page.pageName || "")
                            .trim()
                            .toLowerCase() === "about us" &&
                        String(page.sectionName || "")
                            .trim()
                            .toLowerCase() === "approach"
                );

                console.log(
                    "ABOUT US APPROACH WEBSITE - FOUND:",
                    approachPage
                );

                if (!approachPage) {
                    return;
                }

                const content = approachPage.content || {};

                setApproach({
                    label:
                        content.label ||
                        approachPage.label ||
                        "Our Approach",

                    title:
                        content.title ||
                        approachPage.title ||
                        "Turning your clean energy vision into reality",

                    description:
                        content.description ||
                        approachPage.description ||
                        "We guide you through every step of your solar journey – from understanding your energy needs and designing the right system to expert installation and ongoing support. Our approach focuses on smart planning, quality components, and reliable execution.",

                    image:
                        content.image ||
                        approachPage.image ||
                        "",

                    missionTitle:
                        content.mission_title ||
                        "Our Mission",

                    missionText:
                        content.mission_text ||
                        "Our mission is to make clean, reliable affordable solar energy accessible to homes.",

                    visionTitle:
                        content.vision_title ||
                        "Our Vision",

                    visionText:
                        content.vision_text ||
                        "Our vision is to lead the transition to a cleaner & more sustainable energy future.",

                    valuesTitle:
                        content.values_title ||
                        "Our Values",

                    valuesText:
                        content.values_text ||
                        "We believe putting customer first, delivering reliable and efficient solutions.",
                });
            } catch (error) {
                console.error(
                    "ABOUT US APPROACH WEBSITE LOAD ERROR:",
                    error
                );
            }
        };

        loadApproach();
    }, []);

    // =========================================================
    // SCROLL ANIMATION
    // =========================================================

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements =
            section.querySelectorAll(".scroll-animate");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((el) =>
            observer.observe(el)
        );

        return () => observer.disconnect();
    }, [approach]);

    // =========================================================
    // IMAGE
    // =========================================================

    const approachImage =
        approach.image || q2;

    // =========================================================
    // CARDS
    // =========================================================

    const cards = [
        {
            icon: PanelsTopLeft,
            title: approach.missionTitle,
            text: approach.missionText,
        },
        {
            icon: Globe2,
            title: approach.visionTitle,
            text: approach.visionText,
        },
        {
            icon: BadgeCheck,
            title: approach.valuesTitle,
            text: approach.valuesText,
        },
    ];

    // =========================================================
    // UI
    // =========================================================

    return (
        <section
            className="home3-about"
            ref={sectionRef}
        >
            <div className="about-bg-shape"></div>

            <div className="home3-about-inner">

                {/* =================================================
                    HEADING AREA
                ================================================== */}

                <div className="about-heading-area">

                    <div className="about-left">

                        {/* LABEL */}

                        <div className="about-tag scroll-animate">

                            <span></span>

                            {approach.label}

                        </div>

                        {/* TITLE */}

                        <h2
                            className="about-main-title scroll-animate"
                            style={{
                                whiteSpace: "pre-line",
                            }}
                        >
                            {approach.title}
                        </h2>

                        {/* DESCRIPTION */}

                        <p className="about-main-text scroll-animate">
                            {approach.description}
                        </p>

                    </div>

                    {/* =================================================
                        IMAGE
                    ================================================== */}

                    <div
                        className="about-image-box scroll-animate"
                        onMouseEnter={() =>
                            setHovered(true)
                        }
                        onMouseLeave={() =>
                            setHovered(false)
                        }
                    >

                        <img
                            src={approachImage}
                            alt="Solar workers"
                            className={`about-img about-img-1 ${hovered ? "hide" : ""
                                }`}
                        />

                    </div>

                </div>

                {/* =================================================
                    CARDS
                ================================================== */}

                <div className="about-card-row">

                    {cards.map(
                        (card, index) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={`${card.title}-${index}`}
                                    className={`about-info-card scroll-animate delay-${index + 1
                                        }`}
                                >

                                    {/* ICON */}

                                    <div className="about-card-icon">

                                        <Icon
                                            size={26}
                                            strokeWidth={1.8}
                                        />

                                    </div>

                                    {/* TITLE */}

                                    <h3>
                                        {card.title}
                                    </h3>

                                    {/* DIVIDER */}

                                    <div className="about-divider"></div>

                                    {/* TEXT */}

                                    <p>
                                        {card.text}
                                    </p>

                                </div>
                            );
                        }
                    )}

                </div>

            </div>
        </section>
    );
};

export default Home3About;