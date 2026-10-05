import React, { useEffect, useState } from "react";
import "./Home1.css";

import { getPages } from "../../Api/api";

import sunex from "../../assets/Solarimage/sunex.mp4";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";
import avatar4 from "../../assets/Solarimage/avatar4.png";

const DEFAULT_HERO_DATA = {
    badge: "Solar Energy for Tomorrow",

    title: "Power Your Future with Clean Solar Energy",

    description:
        "From expert system design to seamless installation and ongoing support, we combine technical expertise with a commitment to performance, safety.",

    video: "",

    primary_button_text: "Get Free Consultation",
    primary_button_link: "#contact",

    secondary_button_text: "Watch Our Story",
    secondary_button_link: "#story",

    testimonial:
        "Empowering homes and businesses with clean solar energy for brighter tomorrow.",

    avatar_1: "",
    avatar_2: "",
    avatar_3: "",
    avatar_4: "",
};

const Hero = () => {
    const [heroData, setHeroData] = useState(DEFAULT_HERO_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                setLoading(true);

                const data = await getPages();

                if (!data.success) {
                    throw new Error(
                        data.message || "Failed to fetch Home Hero data"
                    );
                }

                const hero = data.pages?.find(
                    (page) =>
                        page.page_name === "Home" &&
                        page.section_name === "Hero"
                );

                if (hero) {
                    setHeroData({
                        badge:
                            hero.badge ||
                            DEFAULT_HERO_DATA.badge,

                        title:
                            hero.title ||
                            DEFAULT_HERO_DATA.title,

                        description:
                            hero.description ||
                            DEFAULT_HERO_DATA.description,

                        video:
                            hero.video ||
                            DEFAULT_HERO_DATA.video,

                        primary_button_text:
                            hero.primary_button_text ||
                            DEFAULT_HERO_DATA.primary_button_text,

                        primary_button_link:
                            hero.primary_button_link ||
                            DEFAULT_HERO_DATA.primary_button_link,

                        secondary_button_text:
                            hero.secondary_button_text ||
                            DEFAULT_HERO_DATA.secondary_button_text,

                        secondary_button_link:
                            hero.secondary_button_link ||
                            DEFAULT_HERO_DATA.secondary_button_link,

                        testimonial:
                            hero.testimonial ||
                            DEFAULT_HERO_DATA.testimonial,

                        avatar_1:
                            hero.avatar_1 ||
                            DEFAULT_HERO_DATA.avatar_1,

                        avatar_2:
                            hero.avatar_2 ||
                            DEFAULT_HERO_DATA.avatar_2,

                        avatar_3:
                            hero.avatar_3 ||
                            DEFAULT_HERO_DATA.avatar_3,

                        avatar_4:
                            hero.avatar_4 ||
                            DEFAULT_HERO_DATA.avatar_4,
                    });
                }
            } catch (error) {
                console.error("FETCH HOME HERO ERROR:", error);

                setHeroData(DEFAULT_HERO_DATA);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    const getMediaUrl = (media) => {
        if (!media) return "";

        if (
            media.startsWith("http://") ||
            media.startsWith("https://") ||
            media.startsWith("/")
        ) {
            return media;
        }

        return `http://localhost:5000/uploads/${media}`;
    };

    const videoSource = heroData.video
        ? getMediaUrl(heroData.video)
        : sunex;

    const avatarSources = [
        heroData.avatar_1
            ? getMediaUrl(heroData.avatar_1)
            : avatar1,

        heroData.avatar_2
            ? getMediaUrl(heroData.avatar_2)
            : avatar2,

        heroData.avatar_3
            ? getMediaUrl(heroData.avatar_3)
            : avatar3,

        heroData.avatar_4
            ? getMediaUrl(heroData.avatar_4)
            : avatar4,
    ];

    return (
        <section className="hero">

            {/* HERO BACKGROUND VIDEO */}
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src={videoSource}
                    type="video/mp4"
                />
            </video>

            <div className="hero-overlay"></div>

            <div className="hero-container">
                <div className="hero-content">

                    {/* BADGE */}
                    <div className="hero-badge hero-load hero-load-1">
                        <span></span>

                        {loading
                            ? DEFAULT_HERO_DATA.badge
                            : heroData.badge}
                    </div>

                    {/* HEADING */}
                    <h1 className="hero-load hero-load-2">
                        {loading
                            ? DEFAULT_HERO_DATA.title
                            : heroData.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="hero-description hero-load hero-load-3">
                        {loading
                            ? DEFAULT_HERO_DATA.description
                            : heroData.description}
                    </p>

                    {/* BUTTONS */}
                    <div className="hero-actions hero-load hero-load-4">

                        {/* PRIMARY BUTTON */}
                        <a
                            href={
                                loading
                                    ? DEFAULT_HERO_DATA.primary_button_link
                                    : heroData.primary_button_link
                            }
                            className="hero-primary-btn"
                        >
                            {loading
                                ? DEFAULT_HERO_DATA.primary_button_text
                                : heroData.primary_button_text}

                            <span>↗</span>
                        </a>

                        {/* SECONDARY BUTTON */}
                        <a
                            href={
                                loading
                                    ? DEFAULT_HERO_DATA.secondary_button_link
                                    : heroData.secondary_button_link
                            }
                            className="hero-story-btn"
                        >
                            <span className="play-icon">
                                ▶
                            </span>

                            <span>
                                {loading
                                    ? DEFAULT_HERO_DATA.secondary_button_text
                                    : heroData.secondary_button_text}
                            </span>
                        </a>

                    </div>

                    {/* TESTIMONIAL */}
                    <div className="hero-testimonial hero-load hero-load-5">

                        <div className="hero-testimonial-images">

                            {/* AVATAR 1 */}
                            <div className="testimonial-avatar">
                                <img
                                    src={avatarSources[0]}
                                    alt="Avatar 1"
                                />
                            </div>

                            {/* AVATAR 2 */}
                            <div className="testimonial-avatar">
                                <img
                                    src={avatarSources[1]}
                                    alt="Avatar 2"
                                />
                            </div>

                            {/* AVATAR 3 */}
                            <div className="testimonial-avatar">
                                <img
                                    src={avatarSources[2]}
                                    alt="Avatar 3"
                                />
                            </div>

                            {/* AVATAR 4 */}
                            <div className="testimonial-avatar">
                                <img
                                    src={avatarSources[3]}
                                    alt="Avatar 4"
                                />
                            </div>

                        </div>

                        <div className="testimonial-line"></div>

                        <p>
                            “
                            {loading
                                ? DEFAULT_HERO_DATA.testimonial
                                : heroData.testimonial}
                            ”
                        </p>

                    </div>

                </div>
            </div>

        </section>
    );
};

export default Hero;