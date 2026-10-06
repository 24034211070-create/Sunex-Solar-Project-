import { useEffect, useState } from "react";
import "./Contactnav.css";
import { getPages } from "../../Api/api";

const Contactnav = () => {
    const [contactBar, setContactBar] = useState({
        phoneLabel: "Phone Number:",
        phone: "+123 456-789",

        emailLabel: "Email Address:",
        email: "info@domainname.com",

        followText: "Follow Us On Social:",

        instagramIcon: "",
        instagramLink: "#",

        facebookIcon: "",
        facebookLink: "#",

        websiteIcon: "",
        websiteLink: "#",
    });

    useEffect(() => {
        const loadContactBar = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() ===
                        "contact bar" &&
                        page.section_name?.trim().toLowerCase() ===
                        "contact bar"
                );

                if (data?.content) {
                    setContactBar({
                        phoneLabel:
                            data.content.phoneLabel ||
                            "Phone Number:",

                        phone:
                            data.content.phone ||
                            "+123 456-789",

                        emailLabel:
                            data.content.emailLabel ||
                            "Email Address:",

                        email:
                            data.content.email ||
                            "info@domainname.com",

                        followText:
                            data.content.followText ||
                            "Follow Us On Social:",

                        instagramIcon:
                            data.content.instagramIcon || "",

                        instagramLink:
                            data.content.instagramLink || "#",

                        facebookIcon:
                            data.content.facebookIcon || "",

                        facebookLink:
                            data.content.facebookLink || "#",

                        websiteIcon:
                            data.content.websiteIcon || "",

                        websiteLink:
                            data.content.websiteLink || "#",
                    });
                }
            } catch (error) {
                console.error(
                    "Contact Bar load error:",
                    error
                );
            }
        };

        loadContactBar();
    }, []);

    return (
        <div className="contact-navbar">
            <div className="contact-navbar-container">

                {/* ==================================================
                    LEFT SIDE
                ================================================== */}

                <div className="contact-info">

                    {/* PHONE */}

                    <a
                        href={`tel:${contactBar.phone} `}
                        className="contact-item"
                    >
                        <span className="contact-icon">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </span>

                        <span className="contact-label">
                            {contactBar.phoneLabel}
                        </span>

                        <span className="contact-value">
                            {contactBar.phone}
                        </span>
                    </a>

                    {/* EMAIL */}

                    <a
                        href={`mailto:${contactBar.email} `}
                        className="contact-item"
                    >
                        <span className="contact-icon">
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="3"
                                    y="5"
                                    width="18"
                                    height="14"
                                    rx="1"
                                />

                                <path d="m3 7 9 6 9-6" />
                            </svg>
                        </span>

                        <span className="contact-label">
                            {contactBar.emailLabel}
                        </span>

                        <span className="contact-value">
                            {contactBar.email}
                        </span>
                    </a>
                </div>

                {/* ==================================================
                    RIGHT SIDE
                ================================================== */}

                <div className="social-section">

                    <span className="follow-text">
                        {contactBar.followText}
                    </span>

                    <div className="social-links">

                        {/* ==================================================
                            INSTAGRAM
                        ================================================== */}

                        <a
                            href={contactBar.instagramLink}
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactBar.instagramIcon ? (
                                <img
                                    src={contactBar.instagramIcon}
                                    alt="Instagram"
                                    className="social-icon-image"
                                />
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="5"
                                    />

                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="4"
                                    />

                                    <circle
                                        cx="17.5"
                                        cy="6.5"
                                        r="0.8"
                                        fill="currentColor"
                                    />
                                </svg>
                            )}
                        </a>

                        {/* ==================================================
                            FACEBOOK
                        ================================================== */}

                        <a
                            href={contactBar.facebookLink}
                            className="social-link facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactBar.facebookIcon ? (
                                <img
                                    src={contactBar.facebookIcon}
                                    alt="Facebook"
                                    className="social-icon-image"
                                />
                            ) : (
                                <span>f</span>
                            )}
                        </a>

                        {/* ==================================================
                            WEBSITE / GLOBE
                        ================================================== */}

                        <a
                            href={contactBar.websiteLink}
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactBar.websiteIcon ? (
                                <img
                                    src={contactBar.websiteIcon}
                                    alt="Website"
                                    className="social-icon-image"
                                />
                            ) : (
                                <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                    />

                                    <path d="M3 12h18" />

                                    <path d="M12 3a14 14 0 0 1 0 18" />

                                    <path d="M12 3a14 14 0 0 0 0 18" />
                                </svg>
                            )}
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactnav;
