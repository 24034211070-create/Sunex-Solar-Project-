import React, { useEffect, useRef, useState } from "react";
import "./About.css";

import { getPages } from "../../Api/api";

import defaultImage1 from "../../assets/Solarimage/image1.jpg";
import defaultImage2 from "../../assets/Solarimage/image2.jpg";
import defaultImage3 from "../../assets/Solarimage/image3.jpg";

const API_URL = "http://localhost:5000";

const About = () => {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);

    const [about, setAbout] = useState({
        title: "Building a green tomorrow through clean energy",
        description:
            "We are committed to delivering reliable, efficient, and sustainable solar solutions that help homes and businesses reduce energy costs.",

        label: "About Our Company",

        image_1: "",
        image_2: "",
        image_3: "",

        experience_number: "25+",
        experience_text: "Years of Experience",

        feature_1_title: "Expertise You Can Trust",
        feature_1_description:
            "Our team consists of certified professionals with hands-on experience.",

        feature_2_title: "Customized Solar Solutions",
        feature_2_description:
            "That's why we design tailor-made solar systems that maximize efficiency and performance.",

        button_text: "More About Us",
        button_link: "/about",
    });

    // ======================================================
    // FETCH ABOUT DATA
    // ======================================================

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await getPages();

                if (!data.success || !data.pages) {
                    return;
                }

                const aboutPage = data.pages.find(
                    (page) =>
                        page.page_name === "Home" &&
                        page.section_name === "About"
                );

                if (!aboutPage) {
                    return;
                }

                const content = aboutPage.content || {};

                setAbout({
                    title:
                        aboutPage.title ||
                        "Building a green tomorrow through clean energy",

                    description:
                        aboutPage.description ||
                        "We are committed to delivering reliable, efficient, and sustainable solar solutions that help homes and businesses reduce energy costs.",

                    label:
                        content.label ||
                        "About Our Company",

                    image_1: content.image_1 || "",
                    image_2: content.image_2 || "",
                    image_3: content.image_3 || "",

                    experience_number:
                        content.experience_number || "25+",

                    experience_text:
                        content.experience_text ||
                        "Years of Experience",

                    feature_1_title:
                        content.feature_1_title ||
                        "Expertise You Can Trust",

                    feature_1_description:
                        content.feature_1_description ||
                        "Our team consists of certified professionals with hands-on experience.",

                    feature_2_title:
                        content.feature_2_title ||
                        "Customized Solar Solutions",

                    feature_2_description:
                        content.feature_2_description ||
                        "That's why we design tailor-made solar systems that maximize efficiency and performance.",

                    button_text:
                        content.button_text ||
                        "More About Us",

                    button_link:
                        content.button_link ||
                        "/about",
                });
            } catch (error) {
                console.error("ABOUT FETCH ERROR:", error);
            }
        };

        fetchAbout();
    }, []);

    // ======================================================
    // IMAGE URL
    // ======================================================

    const getImageUrl = (image, fallback) => {
        if (!image) {
            return fallback;
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        return `${API_URL}/uploads/${image}`;
    };

    // ======================================================
    // SCROLL ANIMATION
    // ======================================================

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.12,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`about-section ${visible ? "about-visible" : ""
                }`}
        >
            <div className="about-container">

                {/* =========================================
                    LEFT IMAGES
                ========================================= */}

                <div className="about-images">

                    <div className="about-image about-image-one about-animate-left">
                        <img
                            src={getImageUrl(
                                about.image_1,
                                defaultImage1
                            )}
                            alt="Solar energy professionals"
                        />
                    </div>

                    {/* CONTACT CIRCLE */}

                    <div className="contact-circle about-animate-scale">

                        <div className="contact-rotate">
                            <svg viewBox="0 0 200 200">
                                <defs>
                                    <path
                                        id="contactPath"
                                        d="M 100,100
                                        m -72,0
                                        a 72,72 0 1,1 144,0
                                        a 72,72 0 1,1 -144,0"
                                    />
                                </defs>

                                <text>
                                    <textPath href="#contactPath">
                                        Contact Us • Contact Us • Contact Us •
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        <div className="contact-circle-center">
                            <span>⚡</span>
                        </div>

                    </div>

                    {/* SECOND IMAGE */}

                    <div className="about-image about-image-two about-animate-right">
                        <img
                            src={getImageUrl(
                                about.image_2,
                                defaultImage2
                            )}
                            alt="Solar installation team"
                        />
                    </div>

                    {/* EXPERIENCE */}

                    <div className="experience-card about-animate-up">

                        <div className="experience-number">
                            {about.experience_number}
                        </div>

                        <div className="experience-text">
                            {about.experience_text}
                        </div>

                    </div>

                </div>

                {/* =========================================
                    RIGHT CONTENT
                ========================================= */}

                <div className="about-content">

                    {/* LABEL */}

                    <div className="about-label about-content-animate">
                        <span></span>
                        {about.label}
                    </div>

                    {/* HEADING */}

                    <h2 className="about-content-animate">
                        {about.title}
                    </h2>

                    {/* DESCRIPTION */}

                    <p className="about-description about-content-animate">
                        {about.description}
                    </p>

                    {/* =====================================
                        FEATURE 1
                    ===================================== */}

                    <div className="about-feature about-content-animate">

                        <div className="feature-icon">
                            <span>◎</span>
                        </div>

                        <div className="feature-content">

                            <h3>
                                {about.feature_1_title}
                            </h3>

                            <p>
                                {about.feature_1_description}
                            </p>

                        </div>

                    </div>

                    <div className="feature-divider about-content-animate"></div>

                    {/* =====================================
                        FEATURE 2
                    ===================================== */}

                    <div className="about-feature about-content-animate">

                        <div className="feature-icon">
                            <span>◇</span>
                        </div>

                        <div className="feature-content">

                            <h3>
                                {about.feature_2_title}
                            </h3>

                            <p>
                                {about.feature_2_description}
                            </p>

                        </div>

                    </div>

                </div>

                {/* =========================================
                    SIDE IMAGE
                ========================================= */}

                <div className="about-side-image about-side-animate">

                    <div className="side-image-wrapper">

                        <img
                            src={getImageUrl(
                                about.image_3,
                                defaultImage3
                            )}
                            alt="Solar panel installation"
                        />

                    </div>

                    <button
                        className="buy-button"
                        onClick={() => {
                            window.location.href = about.button_link;
                        }}
                    >
                        {about.button_text}
                        <span>↗</span>
                    </button>

                </div>

                {/* =========================================
                    MOBILE BUTTONS
                ========================================= */}

                <div className="mobile-about-buttons">

                    <button
                        className="more-about-button"
                        onClick={() => {
                            window.location.href = about.button_link;
                        }}
                    >
                        {about.button_text}
                        <span>↗</span>
                    </button>

                    <button
                        className="story-button"
                        onClick={() => {
                            const storySection =
                                document.getElementById("story");

                            if (storySection) {
                                storySection.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }}
                    >
                        <span className="story-icon">
                            ▶
                        </span>

                        <span>
                            Watch Our Story
                        </span>
                    </button>

                </div>

            </div>
        </section>
    );
};

export default About;