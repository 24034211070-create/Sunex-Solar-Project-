import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ArrowUpRight,
    Phone,
    ShieldCheck,
} from "lucide-react";

import "./WhyChooseUs.css";

import m7 from "../../assets/Heroimages/m7.png";
import m5 from "../../assets/Heroimages/m5.jpg";

import { getPages } from "../../Api/api";

const DEFAULT_DATA = {
    title:
        "Expert driven solar solutions built for efficiency & trust",

    description:
        "We are committed to delivering reliable, high-quality solar solutions you can trust. With expert guidance, advanced technology, and end-to-end support.",

    content: {
        tag: "Why Choose Us",

        trusted_title:
            "Trusted Clean Energy Partner",

        trusted_description:
            "We deliver reliable solar solutions through expert planning, quality installations, and ongoing support.",

        stats: [
            {
                number: "1",
                suffix: "K+",
                label: "Solar Installations",
            },
            {
                number: "15",
                suffix: "MW+",
                label: "Energy Generated",
            },
            {
                number: "25",
                suffix: "+",
                label: "Solar System Lifespan",
            },
        ],

        slider_items: [
            "Solar Installation",
            "Solar Maintenance",
            "Hybrid Solar Systems",
            "Green Energy",
        ],

        support_title:
            "Long Term Support",

        support_description:
            "We provide dependable after sales support.",

        pills: [
            "Renewable Energy",
            "Residential Solar",
            "Sustainable Energy",
            "Solar Battery Storage",
        ],

        quote_text:
            "Let's make something great work together.",

        quote_button_text:
            "Get Free Quote",
    },
};

const CountUp = ({
    end,
    suffix = "",
    start,
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let current = 0;

        const duration = 1800;
        const stepTime = 35;

        const totalSteps =
            duration / stepTime;

        const increment =
            Number(end) / totalSteps;

        const timer = setInterval(() => {
            current += increment;

            if (
                current >=
                Number(end)
            ) {
                current =
                    Number(end);

                clearInterval(timer);
            }

            setCount(
                Math.floor(current)
            );
        }, stepTime);

        return () => {
            clearInterval(timer);
        };
    }, [end, start]);

    return (
        <>
            {count}
            {suffix}
        </>
    );
};

const WhyChooseUs = () => {
    const sectionRef =
        useRef(null);

    const [visible, setVisible] =
        useState(false);

    const [data, setData] =
        useState(DEFAULT_DATA);

    // ==========================================
    // GET DATA FROM BACKEND
    // ==========================================

    useEffect(() => {
        const loadWhyChooseUs =
            async () => {
                try {
                    const result =
                        await getPages();

                    if (!result.success) {
                        throw new Error(
                            result.message ||
                            "Failed to fetch pages"
                        );
                    }

                    console.log(
                        "WHY CHOOSE US API:",
                        result
                    );

                    const page =
                        result.pages?.find(
                            (item) =>
                                item.page_name ===
                                "Home" &&
                                item.section_name ===
                                "Why Choose Us"
                        );

                    if (!page) {
                        console.log(
                            "Why Choose Us page not found. Using default content."
                        );

                        return;
                    }

                    const dbContent =
                        page.content || {};

                    setData({
                        title:
                            page.title ||
                            DEFAULT_DATA.title,

                        description:
                            page.description ||
                            DEFAULT_DATA.description,

                        content: {
                            ...DEFAULT_DATA.content,

                            ...dbContent,

                            stats:
                                Array.isArray(
                                    dbContent.stats
                                )
                                    ? dbContent.stats
                                    : DEFAULT_DATA
                                        .content
                                        .stats,

                            slider_items:
                                Array.isArray(
                                    dbContent.slider_items
                                )
                                    ? dbContent.slider_items
                                    : DEFAULT_DATA
                                        .content
                                        .slider_items,

                            pills:
                                Array.isArray(
                                    dbContent.pills
                                )
                                    ? dbContent.pills
                                    : DEFAULT_DATA
                                        .content
                                        .pills,
                        },
                    });
                } catch (error) {
                    console.error(
                        "Why Choose Us API Error:",
                        error
                    );

                    // API fail hone par default content show hoga.
                    setData(
                        DEFAULT_DATA
                    );
                }
            };

        loadWhyChooseUs();
    }, []);

    // ==========================================
    // SCROLL ANIMATION
    // ==========================================

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (
                        entry.isIntersecting
                    ) {
                        setVisible(true);

                        observer.disconnect();
                    }
                },
                {
                    threshold: 0.15,
                }
            );

        if (
            sectionRef.current
        ) {
            observer.observe(
                sectionRef.current
            );
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const content =
        data.content;

    // ==========================================
    // MAIN TITLE
    // ==========================================

    const mainTitle =
        data.title ||
        DEFAULT_DATA.title;

    return (
        <section
            ref={sectionRef}
            className={`why-choose-us ${visible
                ? "why-visible"
                : ""
                }`}
        >
            <div className="why-container">

                <div className="why-grid">

                    {/* ================= LEFT ================= */}

                    <div className="why-left">

                        {/* TAG */}

                        <div className="why-tag why-animation">

                            <span></span>

                            {content.tag}

                        </div>

                        {/* MAIN TITLE */}

                        <h2 className="why-title">
                            {mainTitle}
                        </h2>

                        {/* DESCRIPTION */}

                        <p className="why-description why-animation">
                            {data.description}
                        </p>

                        {/* TRUST CARD */}

                        <div className="trusted-card why-animation">

                            <div className="trusted-icon">

                                <ShieldCheck
                                    size={25}
                                    strokeWidth={1.8}
                                />

                            </div>

                            <div className="trusted-text">

                                <h3>
                                    {
                                        content.trusted_title
                                    }
                                </h3>

                                <p>
                                    {
                                        content.trusted_description
                                    }
                                </p>

                            </div>

                        </div>

                        {/* LINE */}

                        <div className="why-line"></div>

                        {/* STATS */}

                        <div className="why-stats">

                            {content.stats.map(
                                (
                                    stat,
                                    index
                                ) => (
                                    <div
                                        className="why-stat why-animation"
                                        key={
                                            index
                                        }
                                    >

                                        <h3>

                                            <CountUp
                                                end={
                                                    stat.number
                                                }
                                                suffix={
                                                    stat.suffix
                                                }
                                                start={
                                                    visible
                                                }
                                            />

                                        </h3>

                                        <p>
                                            {
                                                stat.label
                                            }
                                        </p>

                                    </div>
                                )
                            )}

                        </div>

                        {/* LINE */}

                        <div className="why-line"></div>

                        {/* BUTTON */}

                        <button className="learn-more-btn">

                            Learn More

                            <ArrowUpRight
                                size={18}
                            />

                        </button>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="why-right">

                        {/* MAIN IMAGE */}

                        <div className="why-main-image image-hover-card">

                            <img
                                src={m7}
                                alt="Solar team"
                                className="main-image main-image-first"
                            />

                            {/* SLIDER */}

                            <div className="image-slider-mask">

                                <div className="image-slider-track">

                                    {[
                                        ...content.slider_items,
                                        ...content.slider_items,
                                    ].map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                className="image-slider-item"
                                                key={
                                                    index
                                                }
                                            >
                                                {
                                                    item
                                                }
                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* BOTTOM CARDS */}

                        <div className="why-bottom-cards">

                            {/* SMALL IMAGE */}

                            <div className="why-small-image image-hover-card">

                                <img
                                    src={m5}
                                    alt="Solar installation"
                                />

                            </div>

                            {/* SUPPORT CARD */}

                            <div className="long-support-card">

                                <div className="solar-icon">

                                    <div className="solar-sun"></div>

                                    <div className="solar-panel">

                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                    <div className="solar-base"></div>

                                </div>

                                <h3>
                                    {
                                        content.support_title
                                    }
                                </h3>

                                <div className="support-line"></div>

                                <p>
                                    {
                                        content.support_description
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div className="why-footer">

                    {/* PILLS */}

                    <div className="why-pills">

                        {content.pills.map(
                            (
                                pill,
                                index
                            ) => (
                                <div
                                    className="why-pill"
                                    key={
                                        index
                                    }
                                >

                                    <span></span>

                                    {pill}

                                </div>
                            )
                        )}

                    </div>

                    {/* CONTACT */}

                    <div className="why-contact">

                        <div className="contact-avatar">
                        </div>

                        <div className="contact-phone">

                            <Phone
                                size={15}
                            />

                        </div>

                        <p>

                            {
                                content.quote_text
                            }

                            <span>
                                {" "}
                                {
                                    content.quote_button_text
                                }
                            </span>

                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;