import React, { useEffect, useRef, useState } from "react";

import {
    Sun,
    Globe,
    Mic,
    Database,
    ArrowUpRight,
} from "lucide-react";

import "./SolarFeature.css";
import m8 from "../../assets/Heroimages/m8.png";
import { getPages } from "../../Api/api";

const DEFAULT_FEATURE = {
    label: "Our Core Features",

    heading:
        "Innovative solar feature with real environmental impact",

    description:
        "Our core features are designed to maximize renewable energy production while reducing environmental impact and supporting a cleaner future.",

    button_text: "Contact Us",

    image: "",

    features: [
        {
            id: "01.",
            icon: "Sun",
            title: "25+ Years",
            description: "Panel Performance Lifespan",
        },
        {
            id: "02.",
            icon: "Globe",
            title: "4800+",
            description: "Solar Powered Homes",
        },
        {
            id: "03.",
            icon: "Mic",
            title: "10K+",
            description: "Trees Worth Of CO₂",
        },
        {
            id: "04.",
            icon: "Database",
            title: "100%",
            description: "Commitment to Clean",
        },
    ],
};

const iconMap = {
    Sun,
    Globe,
    Mic,
    Database,
};

function SolarFeature() {
    const sectionRef = useRef(null);

    const [featureData, setFeatureData] =
        useState(DEFAULT_FEATURE);

    // ============================
    // GET FEATURE DATA FROM API
    // ============================

    useEffect(() => {
        const fetchFeature = async () => {
            try {
                const data = await getPages();

                /*
                 * getPages() returns pages array directly.
                 * So we handle the current API structure here.
                 */
                const pages = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.pages)
                        ? data.pages
                        : [];

                const featurePage = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() ===
                        "home" &&
                        page.section_name?.trim().toLowerCase() ===
                        "solarfeature"
                );

                if (!featurePage) {
                    return;
                }

                let content = featurePage.content;

                // JSONB string handle
                if (typeof content === "string") {
                    try {
                        content = JSON.parse(content);
                    } catch (error) {
                        console.error(
                            "Solar Feature content parse error:",
                            error
                        );
                        return;
                    }
                }

                if (!content) {
                    return;
                }

                setFeatureData({
                    label:
                        content.label ||
                        featurePage.description ||
                        DEFAULT_FEATURE.label,

                    heading:
                        content.heading ||
                        featurePage.title ||
                        DEFAULT_FEATURE.heading,

                    description:
                        content.description ||
                        DEFAULT_FEATURE.description,

                    button_text:
                        content.button_text ||
                        DEFAULT_FEATURE.button_text,

                    image:
                        content.image ||
                        featurePage.image ||
                        DEFAULT_FEATURE.image,

                    features:
                        Array.isArray(content.features) &&
                            content.features.length > 0
                            ? content.features
                            : DEFAULT_FEATURE.features,
                });
            } catch (error) {
                console.error(
                    "Solar Feature fetch error:",
                    error
                );
            }
        };

        fetchFeature();
    }, []);

    // ============================
    // REVEAL ANIMATION
    // ============================

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements =
            section.querySelectorAll(".reveal");

        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px",
                }
            );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [featureData]);

    // ============================
    // IMAGE
    // ============================

    const featureImage =
        featureData.image || m8;

    return (
        <section
            className="solar-features"
            ref={sectionRef}
        >
            {/* Decorative dots */}

            <span className="decor-dot decor-dot-one"></span>

            <span className="decor-dot decor-dot-two"></span>

            {/* Background line art */}

            <div className="solar-background-lines">
                <div className="line-house line-house-one"></div>
                <div className="line-house line-house-two"></div>
                <div className="line-house line-house-three"></div>
            </div>

            <div className="solar-container">

                {/* ============================
                    TOP CONTENT
                ============================ */}

                <div className="solar-top">

                    {/* LEFT */}

                    <div className="solar-heading-area">

                        <div className="section-label reveal">
                            <span className="label-dot"></span>

                            <span>
                                {featureData.label}
                            </span>
                        </div>

                        <h2 className="solar-title reveal">
                            <span className="title-line">
                                {featureData.heading}
                            </span>
                        </h2>

                    </div>

                    {/* RIGHT */}

                    <div className="solar-intro reveal">

                        <p>
                            {featureData.description}
                        </p>

                        {/* CONTACT BUTTON */}

                        <a
                            href="/contact"
                            className="contact-btn"
                        >
                            <span>
                                {featureData.button_text}
                            </span>

                            <ArrowUpRight
                                size={20}
                                strokeWidth={2}
                            />
                        </a>

                    </div>
                </div>

                {/* ============================
                    MAIN CONTENT
                ============================ */}

                <div className="solar-main">

                    {/* IMAGE */}

                    <div className="solar-image-wrapper reveal">

                        <div className="solar-circle"></div>

                        <span className="image-dot"></span>

                        <img
                            src={featureImage}
                            alt="Solar energy professional"
                            className="solar-worker"
                        />

                    </div>

                    {/* FEATURE CARDS */}

                    <div className="feature-grid">

                        {featureData.features.map(
                            (feature, index) => {

                                const Icon =
                                    iconMap[
                                    feature.icon
                                    ] || Sun;

                                return (
                                    <div
                                        className="feature-card reveal"
                                        key={
                                            feature.id ||
                                            index
                                        }
                                        style={{
                                            "--card-delay":
                                                `${index * 0.14}s`,
                                        }}
                                    >

                                        <div className="card-top">

                                            <div className="feature-icon">

                                                <Icon
                                                    size={22}
                                                    strokeWidth={1.7}
                                                />

                                            </div>

                                            <span className="feature-number">
                                                {feature.id}
                                            </span>

                                        </div>

                                        <div className="card-content">

                                            <h3>
                                                {feature.title}
                                            </h3>

                                            <p>
                                                {
                                                    feature.description
                                                }
                                            </p>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolarFeature;