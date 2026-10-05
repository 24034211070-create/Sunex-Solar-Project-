import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, ShieldCheck, Star } from "lucide-react";
import "./WhatWeDo.css";

import q3 from "../../assets/Aboutimages/q3.png";
import q4 from "../../assets/Aboutimages/q4.png";
import api from "../../Api/axios";

const WhatWeDo = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const [data, setData] = useState({
        label: "What We Do",
        title: "Complete solar services built for performance",
        description:
            "Our team provides end-to-end solar solutions including site assessment, custom system design, professional installation, and ongoing maintenance.",
        videoImage: "",
        mainImage: "",
        serviceTitle: "Complete Solar Solutions",
        serviceDescription:
            "We provide end-to-end solar services from site assessment & system design.",
        rating: "4.9",
        ratingMax: "5.0",
        ratingText: "Average Website Ratings",
        buttonText: "Learn More",
        buttonLink: "#",
        videoText: "Watch Video",
        videoLink: "https://www.youtube.com/embed/Y-x0efG1seA",
    });

    // ================= LOAD DATA =================

    useEffect(() => {
        const loadWhatWeDo = async () => {
            try {
                const response = await api.get("/pages");

                console.log(
                    "ABOUT US WHAT WE DO WEBSITE - API:",
                    response.data
                );

                const pages = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.pages)
                        ? response.data.pages
                        : [];

                const page = pages.find(
                    (item) =>
                        String(item.pageName || "")
                            .trim()
                            .toLowerCase() === "about us" &&
                        String(item.sectionName || "")
                            .trim()
                            .toLowerCase() === "what we do"
                );

                console.log(
                    "ABOUT US WHAT WE DO WEBSITE - FOUND:",
                    page
                );

                if (!page) return;

                const content = page.content || {};

                setData({
                    label:
                        content.label ||
                        page.label ||
                        "What We Do",

                    title:
                        content.title ||
                        page.title ||
                        "Complete solar services built for performance",

                    description:
                        content.description ||
                        page.description ||
                        "Our team provides end-to-end solar solutions including site assessment, custom system design, professional installation, and ongoing maintenance.",

                    videoImage:
                        content.video_image ||
                        "",

                    mainImage:
                        content.main_image ||
                        page.image ||
                        "",

                    serviceTitle:
                        content.service_title ||
                        "Complete Solar Solutions",

                    serviceDescription:
                        content.service_description ||
                        "We provide end-to-end solar services from site assessment & system design.",

                    rating:
                        content.rating ||
                        "4.9",

                    ratingMax:
                        content.rating_max ||
                        "5.0",

                    ratingText:
                        content.rating_text ||
                        "Average Website Ratings",

                    buttonText:
                        content.button_text ||
                        page.buttonText ||
                        "Learn More",

                    buttonLink:
                        content.button_link ||
                        page.buttonLink ||
                        "#",

                    videoText:
                        content.video_text ||
                        "Watch Video",

                    videoLink:
                        content.video_link ||
                        "https://www.youtube.com/embed/Y-x0efG1seA",
                });
            } catch (error) {
                console.error(
                    "ABOUT US WHAT WE DO WEBSITE LOAD ERROR:",
                    error
                );
            }
        };

        loadWhatWeDo();
    }, []);

    // ================= SCROLL ANIMATION =================

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const videoImage = data.videoImage || q4;
    const mainImage = data.mainImage || q3;

    return (
        <section
            ref={sectionRef}
            className={`what-we-do ${visible ? "what-visible" : ""
                }`}
        >
            <div className="what-container">
                <div className="what-grid">

                    {/* ================= LEFT ================= */}

                    <div className="what-left">

                        <div className="what-tag what-reveal">
                            <span></span>
                            {data.label}
                        </div>

                        <h2
                            className="what-title"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {data.title}
                        </h2>

                        <p className="what-description what-reveal">
                            {data.description}
                        </p>

                        {/* VIDEO IMAGE */}

                        <div className="what-video-card what-image-reveal">

                            <img
                                src={videoImage}
                                alt="Solar professionals working"
                            />

                            <div className="video-overlay"></div>

                            {/* WATCH VIDEO */}

                            <a
                                href={data.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="watch-video"
                            >
                                <div className="watch-circle">

                                    <svg
                                        className="watch-svg"
                                        viewBox="0 0 180 180"
                                    >
                                        <defs>
                                            <path
                                                id="watchTextPath"
                                                d="
                                                    M 90,90
                                                    m -65,0
                                                    a 65,65 0 1,1 130,0
                                                    a 65,65 0 1,1 -130,0
                                                "
                                            />
                                        </defs>

                                        <text>
                                            <textPath
                                                href="#watchTextPath"
                                                startOffset="0%"
                                            >
                                                {data.videoText} •{" "}
                                                {data.videoText} •
                                            </textPath>
                                        </text>
                                    </svg>

                                    <div className="watch-play">
                                        <Play
                                            size={24}
                                            fill="white"
                                            strokeWidth={0}
                                        />
                                    </div>

                                </div>
                            </a>

                        </div>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="what-right">

                        {/* TOP IMAGE */}

                        <div className="what-main-image what-image-reveal">

                            <img
                                src={mainImage}
                                alt="Solar installation team"
                            />

                        </div>

                        {/* SERVICE INFORMATION */}

                        <div className="what-service-row what-reveal">

                            <div className="service-main">

                                <div className="service-icon">
                                    <ShieldCheck
                                        size={24}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div className="service-content">

                                    <h3>
                                        {data.serviceTitle}
                                    </h3>

                                    <p>
                                        {data.serviceDescription}
                                    </p>

                                </div>

                            </div>

                            {/* RATING */}

                            <div className="service-rating">

                                <div className="rating-number">

                                    <strong>
                                        {data.rating}
                                    </strong>

                                    <span>
                                        /{data.ratingMax}
                                    </span>

                                    <Star
                                        size={23}
                                        fill="#49ad3e"
                                        color="#49ad3e"
                                    />

                                </div>

                                <div className="rating-line"></div>

                                <p>
                                    {data.ratingText}
                                </p>

                            </div>

                        </div>

                        {/* BOTTOM LINE */}

                        <div className="what-divider what-reveal"></div>

                        {/* BUTTON */}

                        <a
                            href={data.buttonLink}
                            className="what-learn-btn"
                        >
                            {data.buttonText}
                            <ArrowUpRight size={18} />
                        </a>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;