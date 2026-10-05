import React, { useEffect, useState } from "react";
import "./Work.css";

import a2 from "../../assets/Main/a2.png";
import a3 from "../../assets/Main/a3.png";
import a4 from "../../assets/Main/a4.png";

import avatar1 from "../../assets/Solarimage/avatar1.png";

import { getPages } from "../../Api/api";

const defaultData = {
    badge: "How It Works",

    heading:
        "Turning sunlight into savings in simple steps",

    intro:
        "From initial consultation and system design to professional installation & ongoing support, our simple step by step process helps you start generating energy.",

    button_text: "Contact Us",

    button_link: "#contact",

    steps: [
        {
            id: 1,
            title: "Free Consultation & Assessment",
            description:
                "We begin with a detailed consultation to understand your energy needs.",
            point: "Our experts assess your roof space",
            image: "",
            icon: "⌘",
        },
        {
            id: 2,
            title: "Custom System Design & Installation",
            description:
                "Based on the assessment, we create a customized solar systems.",
            point: "Certified technicians handle the installation",
            image: "",
            icon: "▱",
        },
        {
            id: 3,
            title: "Power Generation & Savings",
            description:
                "Once installed, your system starts generating clean energy immediately.",
            point: "Monitor your performance & electricity",
            image: "",
            icon: "♧",
        },
    ],

    avatar: "",

    cta_text:
        "Let's Build a Brighter, Solar Powered Tomorrow",

    cta_link_text: "Contact Us Today.",

    cta_link: "#contact",

    rating: "4.9",

    stars: "★★★★★",

    reviews: "Over 3000 Reviews",
};

const HowItWorks = () => {
    const [workData, setWorkData] =
        useState(defaultData);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const data = await getPages();

                if (!data.success) {
                    return;
                }

                const page = data.pages.find(
                    (item) =>
                        item.page_name === "Home" &&
                        item.section_name === "Work"
                );

                if (!page) {
                    return;
                }

                let content = {};

                try {
                    content =
                        typeof page.content === "string"
                            ? JSON.parse(page.content)
                            : page.content || {};
                } catch {
                    content = {};
                }

                setWorkData({
                    ...defaultData,
                    ...content,

                    steps:
                        content.steps?.length === 3
                            ? content.steps
                            : defaultData.steps,
                });
            } catch (error) {
                console.error(
                    "Work API error:",
                    error
                );
            }
        };

        fetchWork();
    }, []);

    useEffect(() => {
        const elements =
            document.querySelectorAll(
                ".how-reveal"
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
                                    "how-reveal-active"
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

    const getStepImage = (
        image,
        index
    ) => {
        if (image?.trim()) {
            return image;
        }

        const fallbackImages = [
            a2,
            a3,
            a4,
        ];

        return fallbackImages[index];
    };

    const avatarSrc =
        workData.avatar?.trim()
            ? workData.avatar
            : avatar1;

    return (
        <section className="how-it-works">

            <div className="how-top">

                <div className="how-heading how-reveal how-reveal-left">

                    <span className="how-badge">

                        <span className="badge-dot"></span>

                        {workData.badge}

                    </span>

                    <h1>
                        {workData.heading}
                    </h1>

                </div>

                <div className="how-intro how-reveal how-reveal-right">

                    <p>
                        {workData.intro}
                    </p>

                    <a
                        href={
                            workData.button_link ||
                            "#"
                        }
                        className="contact-btn"
                    >
                        {workData.button_text}

                        <span>
                            ↗
                        </span>
                    </a>

                </div>

            </div>

            <div className="steps-container">

                {workData.steps.map(
                    (step, index) => (

                        <div
                            className={`step-card step-${index + 1
                                } how-reveal how-reveal-up`}
                            key={
                                step.id ||
                                index
                            }
                        >

                            <div className="step-content">

                                <h2>
                                    {step.title}
                                </h2>

                                <p>
                                    {
                                        step.description
                                    }
                                </p>

                                <div className="step-line"></div>

                                <div className="step-point">

                                    <span></span>

                                    {
                                        step.point
                                    }

                                </div>

                            </div>

                            <div className="step-image-wrapper">

                                <img
                                    src={getStepImage(
                                        step.image,
                                        index
                                    )}
                                    alt={
                                        step.title
                                    }
                                    className="step-image"
                                />

                                <div className="step-icon">
                                    {
                                        step.icon
                                    }
                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>

            <div className="bottom-cta how-reveal how-reveal-up">

                <div className="cta-text">

                    <span className="cta-avatar">

                        <img
                            src={avatarSrc}
                            alt="Solar expert"
                        />

                    </span>

                    <span>

                        {workData.cta_text}{" "}

                        <a
                            href={
                                workData.cta_link ||
                                "#"
                            }
                        >
                            {
                                workData.cta_link_text
                            }
                        </a>

                    </span>

                </div>

                <div className="reviews">

                    <strong>
                        {workData.rating}
                    </strong>

                    <span className="stars">
                        {workData.stars}
                    </span>

                    <strong>
                        {workData.reviews}
                    </strong>

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;