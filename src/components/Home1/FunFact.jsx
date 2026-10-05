import React, { useEffect, useState } from "react";
import "./FunFact.css";

import a1 from "../../assets/Main/a1.png";
import avatar1 from "../../assets/Solarimage/avatar1.png";

import { getPages } from "../../Api/api";

const defaultData = {
    label: "Our Fun Facts",

    heading:
        "Measurable success in solar energy solutions",

    description:
        "Each figure represents the trust of our customers and the positive change we create through efficient, dependable, and clean energy systems.",

    image: "",

    facts: [
        {
            id: 1,
            icon: "◎",
            number: "25+ Years",
            text: "Panel Performance Lifespan",
        },
        {
            id: 2,
            icon: "◉",
            number: "4800+",
            text: "Solar Powered Homes",
        },
        {
            id: 3,
            icon: "♕",
            number: "10K+",
            text: "Trees Worth Of a CO₂",
        },
        {
            id: 4,
            icon: "⌂",
            number: "100%",
            text: "Commitment to Clean",
        },
    ],

    avatar: "",

    message:
        "Where smart solar design meets powerful clean energy results",

    link_text: "Get Installation Now",

    link_url: "#",

    rating: "4.9/5",

    stars: "★★★★★",

    reviews: "Over 4200 Reviews",
};

const FunFacts = () => {
    const [funFactData, setFunFactData] =
        useState(defaultData);

    // ============================
    // GET FUN FACT DATA FROM API
    // ============================

    useEffect(() => {
        const fetchFunFact = async () => {
            try {
                const data = await getPages();

                if (!data.success) {
                    return;
                }

                const page =
                    data.pages.find(
                        (item) =>
                            item.page_name ===
                            "Home" &&
                            item.section_name ===
                            "FunFact"
                    );

                if (!page) {
                    return;
                }

                let content = {};

                try {
                    content =
                        typeof page.content ===
                            "string"
                            ? JSON.parse(
                                page.content
                            )
                            : page.content || {};
                } catch {
                    content = {};
                }

                setFunFactData({
                    ...defaultData,
                    ...content,

                    facts:
                        content.facts?.length ===
                            4
                            ? content.facts
                            : defaultData.facts,
                });
            } catch (error) {
                console.error(
                    "Fun Fact API error:",
                    error
                );
            }
        };

        fetchFunFact();
    }, []);

    // ============================
    // REVEAL ANIMATION
    // ============================

    useEffect(() => {
        const elements =
            document.querySelectorAll(
                ".funfacts-reveal"
            );

        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach(
                        (entry) => {
                            if (
                                entry.isIntersecting
                            ) {
                                entry.target.classList.add(
                                    "funfacts-reveal-active"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px",
                }
            );

        elements.forEach((element) =>
            observer.observe(element)
        );

        return () =>
            observer.disconnect();
    }, []);

    const imageSrc =
        funFactData.image?.trim()
            ? funFactData.image
            : a1;

    const avatarSrc =
        funFactData.avatar?.trim()
            ? funFactData.avatar
            : avatar1;

    return (
        <section className="funfacts-section">

            <div className="funfacts-bg-shape"></div>

            <div className="funfacts-container">

                <div className="funfacts-main">

                    <div className="funfacts-content">

                        <div className="funfacts-label funfacts-reveal funfacts-reveal-left">

                            <span></span>

                            {funFactData.label}

                        </div>

                        <h2 className="funfacts-title funfacts-reveal funfacts-reveal-left">

                            {funFactData.heading}

                        </h2>

                        <p className="funfacts-description funfacts-reveal funfacts-reveal-left">

                            {funFactData.description}

                        </p>

                        <div className="funfacts-grid">

                            {funFactData.facts.map(
                                (
                                    fact,
                                    index
                                ) => (

                                    <div
                                        className={`funfact-card funfacts-reveal funfacts-reveal-up funfact-card-${index + 1
                                            }`}
                                        key={
                                            fact.id ||
                                            index
                                        }
                                    >

                                        <div className="funfact-icon">
                                            {
                                                fact.icon
                                            }
                                        </div>

                                        <h3>
                                            {
                                                fact.number
                                            }
                                        </h3>

                                        <p>
                                            {
                                                fact.text
                                            }
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                    <div className="funfacts-image-wrap funfacts-reveal funfacts-reveal-right">

                        <img
                            src={imageSrc}
                            alt="Solar energy professionals"
                        />

                        <div className="funfacts-image-dot"></div>

                    </div>

                </div>

                <div className="funfacts-bottom funfacts-reveal funfacts-reveal-up">

                    <div className="funfacts-message">

                        <div className="funfacts-avatar">

                            <img
                                src={avatarSrc}
                                alt="Solar energy customer"
                            />

                        </div>

                        <div className="funfacts-message-icon">
                            ↗
                        </div>

                        <p>

                            {funFactData.message}{" "}

                            <a
                                href={
                                    funFactData.link_url ||
                                    "#"
                                }
                            >
                                {
                                    funFactData.link_text
                                }
                            </a>

                        </p>

                    </div>

                    <div className="funfacts-rating">

                        <span className="rating-number">
                            {
                                funFactData.rating
                            }
                        </span>

                        <span className="rating-stars">
                            {
                                funFactData.stars
                            }
                        </span>

                        <strong>
                            {
                                funFactData.reviews
                            }
                        </strong>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FunFacts;