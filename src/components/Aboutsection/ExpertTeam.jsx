import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone, Star } from "lucide-react";
import {
    FaInstagram,
    FaFacebookF,
    FaPinterestP,
    FaXTwitter,
} from "react-icons/fa6";

import "./ExpertTeam.css";

import q7 from "../../assets/Aboutimages/q7.png";
import q8 from "../../assets/Aboutimages/q8.png";
import q9 from "../../assets/Aboutimages/q9.png";
import avatar1 from "../../assets/Solarimage/avatar1.png";

import api from "../../Api/axios";

const defaultTeamMembers = [
    {
        image: "",
        name: "Leslie Alexander",
        role: "Lead Solar Engineer",
        pinterest: "#pinterest",
        x: "#x",
        facebook: "#facebook",
        instagram: "#instagram",
    },
    {
        image: "",
        name: "Marvin McKinney",
        role: "Lead Solar Engineer",
        pinterest: "#pinterest",
        x: "#x",
        facebook: "#facebook",
        instagram: "#instagram",
    },
    {
        image: "",
        name: "Kathryn Murphy",
        role: "Lead Solar Engineer",
        pinterest: "#pinterest",
        x: "#x",
        facebook: "#facebook",
        instagram: "#instagram",
    },
];

const ExpertTeam = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const [data, setData] = useState({
        label: "Our Expert Team",

        title:
            "Skilled professional powering your clean energy future",

        description:
            "Our team of experienced engineers, technicians, and energy specialists work together to design, install, and maintain solar systems.",

        buttonText: "View All Members",
        buttonLink: "#",

        teamMembers: defaultTeamMembers,

        contactAvatar: "",
        contactText:
            "Where smart solar design meets powerful clean energy results –",
        contactLinkText: "Get Installation Now",
        contactLink: "#installation",

        reviewRating: "4.9/5",
        reviewText: "Over 4200 Reviews",
    });

    // =====================================================
    // LOAD DATA FROM API
    // =====================================================

    useEffect(() => {
        const loadExpertTeam = async () => {
            try {
                const response = await api.get("/pages");

                console.log(
                    "ABOUT US EXPERT TEAM WEBSITE - API:",
                    response.data
                );

                const pages = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.pages)
                        ? response.data.pages
                        : [];

                const matchingPages = pages.filter(
                    (page) =>
                        String(page.pageName || "")
                            .trim()
                            .toLowerCase() === "about us" &&
                        String(page.sectionName || "")
                            .trim()
                            .toLowerCase() === "expert team"
                );

                console.log(
                    "ABOUT US EXPERT TEAM WEBSITE - MATCHING:",
                    matchingPages
                );

                if (matchingPages.length === 0) {
                    console.log(
                        "ABOUT US EXPERT TEAM WEBSITE - NO DATA FOUND"
                    );
                    return;
                }

                const page = matchingPages.reduce(
                    (latest, current) =>
                        Number(current.id) > Number(latest.id)
                            ? current
                            : latest
                );

                console.log(
                    "ABOUT US EXPERT TEAM WEBSITE - FOUND:",
                    page
                );

                const content = page.content || {};

                let members = defaultTeamMembers;

                if (
                    Array.isArray(content.team_members) &&
                    content.team_members.length > 0
                ) {
                    members = content.team_members.map(
                        (member, index) => ({
                            image: member.image || "",
                            name:
                                member.name ||
                                defaultTeamMembers[index]
                                    ?.name ||
                                "",
                            role:
                                member.role ||
                                defaultTeamMembers[index]
                                    ?.role ||
                                "",
                            pinterest:
                                member.pinterest ||
                                "#pinterest",
                            x:
                                member.x ||
                                "#x",
                            facebook:
                                member.facebook ||
                                "#facebook",
                            instagram:
                                member.instagram ||
                                "#instagram",
                        })
                    );
                }

                setData({
                    label:
                        content.label ||
                        page.label ||
                        "Our Expert Team",

                    title:
                        content.title ||
                        page.title ||
                        "Skilled professional powering your clean energy future",

                    description:
                        content.description ||
                        page.description ||
                        "Our team of experienced engineers, technicians, and energy specialists work together to design, install, and maintain solar systems.",

                    buttonText:
                        content.button_text ||
                        "View All Members",

                    buttonLink:
                        content.button_link ||
                        "#",

                    teamMembers: members,

                    contactAvatar:
                        content.contact_avatar ||
                        "",

                    contactText:
                        content.contact_text ||
                        "Where smart solar design meets powerful clean energy results –",

                    contactLinkText:
                        content.contact_link_text ||
                        "Get Installation Now",

                    contactLink:
                        content.contact_link ||
                        "#installation",

                    reviewRating:
                        content.review_rating ||
                        "4.9/5",

                    reviewText:
                        content.review_text ||
                        "Over 4200 Reviews",
                });
            } catch (error) {
                console.error(
                    "ABOUT US EXPERT TEAM WEBSITE LOAD ERROR:",
                    error
                );
            }
        };

        loadExpertTeam();
    }, []);

    // =====================================================
    // SCROLL ANIMATION
    // =====================================================

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

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

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // =====================================================
    // FALLBACK IMAGES
    // =====================================================

    const fallbackImages = [q7, q8, q9];

    const contactAvatar =
        data.contactAvatar || avatar1;

    // =====================================================
    // JSX
    // =====================================================

    return (
        <section
            ref={sectionRef}
            className={`expert-team-section ${visible ? "team-visible" : ""
                }`}
        >
            <div className="expert-team-container">

                {/* =========================
                    TOP CONTENT
                ========================= */}

                <div className="team-top-content">

                    <div className="team-heading-area">

                        <div className="team-badge team-reveal">
                            <span></span>
                            {data.label}
                        </div>

                        <h2 className="team-heading team-reveal">
                            {data.title}
                        </h2>

                    </div>

                    <div className="team-description-area team-reveal">

                        <p>
                            {data.description}
                        </p>

                        <a
                            href={data.buttonLink}
                            className="team-button"
                        >
                            <span>
                                {data.buttonText}
                            </span>

                            <ArrowUpRight size={20} />
                        </a>

                    </div>

                </div>

                {/* =========================
                    TEAM CARDS
                ========================= */}

                <div className="team-grid">

                    {data.teamMembers.map(
                        (member, index) => {

                            const image =
                                member.image ||
                                fallbackImages[index] ||
                                q7;

                            return (
                                <div
                                    className={`team-card team-card-${index + 1
                                        }`}
                                    key={`${member.name}-${index}`}
                                >

                                    <div className="team-image-wrapper">

                                        <img
                                            src={image}
                                            alt={
                                                member.name
                                            }
                                            className="team-image"
                                        />

                                    </div>

                                    <div className="team-card-content">

                                        <h3>
                                            {member.name}
                                        </h3>

                                        <p>
                                            {member.role}
                                        </p>

                                        <div className="team-card-line"></div>

                                        <div className="team-socials">

                                            <a
                                                href={
                                                    member.pinterest
                                                }
                                                aria-label="Pinterest"
                                            >
                                                <FaPinterestP />
                                            </a>

                                            <a
                                                href={
                                                    member.x
                                                }
                                                aria-label="X"
                                            >
                                                <FaXTwitter />
                                            </a>

                                            <a
                                                href={
                                                    member.facebook
                                                }
                                                aria-label="Facebook"
                                            >
                                                <FaFacebookF />
                                            </a>

                                            <a
                                                href={
                                                    member.instagram
                                                }
                                                aria-label="Instagram"
                                            >
                                                <FaInstagram />
                                            </a>

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

                {/* =========================
                    BOTTOM CTA
                ========================= */}

                <div className="team-bottom-cta team-reveal">

                    <div className="team-contact-avatar">

                        <img
                            src={contactAvatar}
                            alt="Solar expert"
                        />

                        <div className="team-phone-icon">
                            <Phone size={17} />
                        </div>

                    </div>

                    <p>
                        {data.contactText}{" "}

                        <a
                            href={
                                data.contactLink
                            }
                        >
                            {data.contactLinkText}
                        </a>
                    </p>

                </div>

                {/* =========================
                    REVIEW
                ========================= */}

                <div className="team-review team-reveal">

                    <span className="team-rating">
                        {data.reviewRating}
                    </span>

                    <div className="team-stars">

                        <Star
                            size={18}
                            fill="currentColor"
                        />

                        <Star
                            size={18}
                            fill="currentColor"
                        />

                        <Star
                            size={18}
                            fill="currentColor"
                        />

                        <Star
                            size={18}
                            fill="currentColor"
                        />

                        <Star
                            size={18}
                            fill="currentColor"
                        />

                    </div>

                    <span className="team-review-text">
                        {data.reviewText}
                    </span>

                </div>

            </div>
        </section>
    );
};

export default ExpertTeam;