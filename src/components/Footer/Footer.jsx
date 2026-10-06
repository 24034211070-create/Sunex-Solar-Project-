import React, { useEffect, useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Footer.css";
import { getPages } from "../../Api/api";

const defaultFooter = {
    logoImage:
        "https://demo.awaikenthemes.com/sunex/wp-content/uploads/2026/03/logo-white.svg",
    logoLink: "/",

    brandDescription:
        "Empowering homes & business with reliable solar energy solutions. We design, install, & maintain high-performance",

    socialTitle: "Follow Us On Socials:",

    socials: [
        {
            name: "Pinterest",
            icon: "P",
            iconUrl: "",
            link: "#",
        },
        {
            name: "X",
            icon: "X",
            iconUrl: "",
            link: "#",
        },
        {
            name: "Facebook",
            icon: "f",
            iconUrl: "",
            link: "#",
        },
        {
            name: "Instagram",
            icon: "◎",
            iconUrl: "",
            link: "#",
        },
    ],

    quickLinksTitle: "Quick Links",

    quickLinks: [
        {
            text: "Home",
            link: "/",
        },
        {
            text: "About Us",
            link: "/about",
        },
        {
            text: "Our Services",
            link: "/services",
        },
        {
            text: "Blogs",
            link: "/blogs",
        },
        {
            text: "Contact Us",
            link: "/contact",
        },
    ],

    servicesTitle: "Our Services",

    services: [
        {
            text: "Solar Battery Storage",
            link: "/services/solar-battery-storage",
        },
        {
            text: "Solar System Maintenance",
            link: "/services/solar-system-maintenance",
        },
        {
            text: "Rooftop Solar Solutions",
            link: "/services/rooftop-solar-solutions",
        },
        {
            text: "Solar Panel Maintenance",
            link: "/services/solar-panel-maintenance",
        },
        {
            text: "Hybrid Solar Systems",
            link: "/services/hybrid-solar-systems",
        },
        {
            text: "Residential Solar Solutions",
            link: "/services/residential-solar-solutions",
        },
    ],

    newsletterTitle: "Subscribe To Newsletter",

    newsletterText:
        "Subscribe to receive solar tips, energy saving insights, & latest updates.",

    newsletterPlaceholder: "Enter Email Address *",

    phoneLabel: "Phone Number",
    phone: "+1 (123) 456-789",
    phoneIconUrl: "",

    emailLabel: "Email Address",
    email: "info@domainname.com",
    emailIconUrl: "",

    locationLabel: "Our Location",
    location: "2118 Thornridge Cir. Syracuse",
    locationIconUrl: "",

    copyright: "Copyright © 2026 Sunex. All rights reserved.",
};

const Footer = () => {
    const [footer, setFooter] = useState(defaultFooter);

    useEffect(() => {
        const loadFooter = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() === "footer" &&
                        page.section_name?.trim().toLowerCase() === "footer"
                );

                if (data?.content) {
                    setFooter({
                        ...defaultFooter,
                        ...data.content,
                        socials: Array.isArray(data.content.socials)
                            ? data.content.socials
                            : defaultFooter.socials,
                        quickLinks: Array.isArray(data.content.quickLinks)
                            ? data.content.quickLinks
                            : defaultFooter.quickLinks,
                        services: Array.isArray(data.content.services)
                            ? data.content.services
                            : defaultFooter.services,
                    });
                }
            } catch (error) {
                console.error("Footer load error:", error);
            }
        };

        loadFooter();
    }, []);

    const renderSocialIcon = (social) => {
        if (social.iconUrl?.trim()) {
            return (
                <img
                    src={social.iconUrl}
                    alt={social.name}
                    className="sunex-social-icon-image"
                />
            );
        }

        const iconClass =
            social.name?.toLowerCase() === "pinterest"
                ? "pinterest-icon"
                : social.name?.toLowerCase() === "facebook"
                    ? "facebook-icon"
                    : social.name?.toLowerCase() === "instagram"
                        ? "instagram-icon"
                        : "x-icon";

        return (
            <span className={iconClass}>
                {social.icon}
            </span>
        );
    };

    const renderContactIcon = (
        iconUrl,
        defaultIcon,
        alt
    ) => {
        if (iconUrl?.trim()) {
            return (
                <img
                    src={iconUrl}
                    alt={alt}
                    className="sunex-contact-icon-image"
                />
            );
        }

        return defaultIcon;
    };

    return (
        <footer className="sunex-footer">

            <div className="sunex-footer-pattern"></div>

            <div className="sunex-footer-container">

                {/* TOP */}

                <div className="sunex-footer-top">

                    {/* BRAND */}

                    <div className="sunex-footer-brand">

                        <a
                            href={footer.logoLink || "/"}
                            className="sunex-footer-logo"
                        >
                            <img
                                src={footer.logoImage}
                                alt="Sunex"
                            />
                        </a>

                        <p className="sunex-brand-description">
                            {footer.brandDescription}
                        </p>

                        <div className="sunex-brand-divider"></div>

                        <h3 className="sunex-social-title">
                            {footer.socialTitle}
                        </h3>

                        <div className="sunex-social-icons">

                            {footer.socials.map(
                                (social, index) => (
                                    <a
                                        key={index}
                                        href={social.link || "#"}
                                        className="sunex-social-icon"
                                        aria-label={
                                            social.name
                                        }
                                    >
                                        {renderSocialIcon(
                                            social
                                        )}
                                    </a>
                                )
                            )}

                        </div>
                    </div>

                    {/* LINKS PANEL */}

                    <div className="sunex-footer-links-panel">

                        <div className="sunex-panel-dot"></div>

                        {/* QUICK LINKS */}

                        <div className="sunex-footer-column">

                            <h3>
                                {footer.quickLinksTitle}
                            </h3>

                            <ul>
                                {footer.quickLinks.map(
                                    (item, index) => (
                                        <li key={index}>
                                            <a
                                                href={
                                                    item.link ||
                                                    "#"
                                                }
                                            >
                                                <span className="footer-bullet">
                                                    •
                                                </span>

                                                <span>
                                                    {item.text}
                                                </span>
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* SERVICES */}

                        <div className="sunex-footer-column">

                            <h3>
                                {footer.servicesTitle}
                            </h3>

                            <ul>
                                {footer.services.map(
                                    (item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={
                                                    item.link ||
                                                    "#"
                                                }
                                            >
                                                <span className="footer-bullet">
                                                    •
                                                </span>

                                                <span>
                                                    {item.text}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* NEWSLETTER */}

                        <div className="sunex-footer-column newsletter-column">

                            <h3>
                                {footer.newsletterTitle}
                            </h3>

                            <p className="sunex-newsletter-text">
                                {footer.newsletterText}
                            </p>

                            <div className="sunex-newsletter-form">

                                <input
                                    type="email"
                                    placeholder={
                                        footer.newsletterPlaceholder
                                    }
                                    aria-label="Email Address"
                                />

                                <button
                                    type="button"
                                    className="sunex-newsletter-button"
                                    aria-label="Subscribe"
                                >
                                    <ArrowUpRight
                                        size={18}
                                        strokeWidth={2}
                                    />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTACT ROW */}

                <div className="sunex-contact-row">

                    {/* PHONE */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">

                            {renderContactIcon(
                                footer.phoneIconUrl,
                                <Phone
                                    size={25}
                                    strokeWidth={2}
                                />,
                                "Phone"
                            )}

                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                {footer.phoneLabel}
                            </span>

                            <strong>
                                {footer.phone}
                            </strong>

                        </div>
                    </div>

                    {/* EMAIL */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">

                            {renderContactIcon(
                                footer.emailIconUrl,
                                <Mail
                                    size={25}
                                    strokeWidth={2}
                                />,
                                "Email"
                            )}

                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                {footer.emailLabel}
                            </span>

                            <strong>
                                {footer.email}
                            </strong>

                        </div>
                    </div>

                    {/* LOCATION */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">

                            {renderContactIcon(
                                footer.locationIconUrl,
                                <MapPin
                                    size={25}
                                    strokeWidth={2}
                                />,
                                "Location"
                            )}

                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                {footer.locationLabel}
                            </span>

                            <strong>
                                {footer.location}
                            </strong>

                        </div>
                    </div>

                </div>

                {/* BOTTOM */}

                <div className="sunex-footer-bottom">

                    <p>
                        {footer.copyright}
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;