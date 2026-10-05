import "./Contactnav.css";

const Contactnav = () => {
    return (
        <div className="contact-navbar">

            <div className="contact-navbar-container">

                {/* Left Side */}
                <div className="contact-info">

                    {/* Phone */}
                    <a
                        href="tel:+123456789"
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
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                                19.79 19.79 0 0 1-8.63-3.07
                                19.5 19.5 0 0 1-6-6
                                19.79 19.79 0 0 1-3.07-8.67
                                A2 2 0 0 1 4.11 2h3
                                a2 2 0 0 1 2 1.72
                                12.84 12.84 0 0 0 .7 2.81
                                2 2 0 0 1-.45 2.11L8.09 9.91
                                a16 16 0 0 0 6 6l1.27-1.27
                                a2 2 0 0 1 2.11-.45
                                12.84 12.84 0 0 0 2.81.7
                                A2 2 0 0 1 22 16.92z"
                                />
                            </svg>
                        </span>

                        <span className="contact-label">
                            Phone Number:
                        </span>

                        <span className="contact-value">
                            +123 456-789
                        </span>
                    </a>


                    {/* Email */}
                    <a
                        href="mailto:info@domainname.com"
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
                            Email Address:
                        </span>

                        <span className="contact-value">
                            info@domainname.com
                        </span>
                    </a>

                </div>


                {/* Right Side */}
                <div className="social-section">

                    <span className="follow-text">
                        Follow Us On Social:
                    </span>

                    <div className="social-links">

                        {/* Instagram */}
                        <a href="#" className="social-link">
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
                        </a>


                        {/* Facebook */}
                        <a
                            href="#"
                            className="social-link facebook"
                        >
                            f
                        </a>


                        {/* Globe */}
                        <a href="#" className="social-link">
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
                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Contactnav;