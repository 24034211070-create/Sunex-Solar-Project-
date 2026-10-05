import React from "react";
import {
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Footer.css";

const LOGO_URL =
    "https://demo.awaikenthemes.com/sunex/wp-content/uploads/2026/03/logo-white.svg";

const Footer = () => {
    return (
        <footer className="sunex-footer">

            {/* Background Pattern */}
            <div className="sunex-footer-pattern"></div>

            <div className="sunex-footer-container">

                {/* =====================================================
                    TOP FOOTER
                ===================================================== */}

                <div className="sunex-footer-top">

                    {/* ================= BRAND ================= */}

                    <div className="sunex-footer-brand">

                        <a href="/" className="sunex-footer-logo">
                            <img
                                src={LOGO_URL}
                                alt="Sunex"
                            />
                        </a>

                        <p className="sunex-brand-description">
                            Empowering homes &amp; business with reliable
                            solar energy solutions. We design, install, &amp;
                            maintain high-performance
                        </p>

                        <div className="sunex-brand-divider"></div>

                        <h3 className="sunex-social-title">
                            Follow Us On Socials:
                        </h3>

                        <div className="sunex-social-icons">

                            <a
                                href="#"
                                className="sunex-social-icon"
                                aria-label="Pinterest"
                            >
                                <span className="pinterest-icon">
                                    P
                                </span>
                            </a>

                            <a
                                href="#"
                                className="sunex-social-icon"
                                aria-label="X"
                            >
                                <span className="x-icon">
                                    X
                                </span>
                            </a>

                            <a
                                href="#"
                                className="sunex-social-icon"
                                aria-label="Facebook"
                            >
                                <span className="facebook-icon">
                                    f
                                </span>
                            </a>

                            <a
                                href="#"
                                className="sunex-social-icon"
                                aria-label="Instagram"
                            >
                                <span className="instagram-icon">
                                    ◎
                                </span>
                            </a>

                        </div>
                    </div>


                    {/* ================= RIGHT PANEL ================= */}

                    <div className="sunex-footer-links-panel">

                        <div className="sunex-panel-dot"></div>


                        {/* ================= QUICK LINKS ================= */}

                        <div className="sunex-footer-column">

                            <h3>
                                Quick Links
                            </h3>

                            <ul>

                                <li>
                                    <a href="/">
                                        <span className="footer-bullet">•</span>
                                        <span>Home</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/about">
                                        <span className="footer-bullet">•</span>
                                        <span>About Us</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/services">
                                        <span className="footer-bullet">•</span>
                                        <span>Our Services</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/blogs">
                                        <span className="footer-bullet">•</span>
                                        <span>Blogs</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/contact">
                                        <span className="footer-bullet">•</span>
                                        <span>Contact Us</span>
                                    </a>
                                </li>

                            </ul>

                        </div>


                        {/* ================= OUR SERVICES ================= */}

                        <div className="sunex-footer-column">

                            <h3>
                                Our Services
                            </h3>

                            <ul>

                                {/* Solar Battery Storage */}

                                <li>
                                    <Link to="/services/solar-battery-storage">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Solar Battery Storage
                                        </span>
                                    </Link>
                                </li>


                                {/* Solar System Maintenance */}

                                <li>
                                    <Link to="/services/solar-system-maintenance">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Solar System Maintenance
                                        </span>
                                    </Link>
                                </li>


                                {/* Rooftop Solar Solutions */}

                                <li>
                                    <Link to="/services/rooftop-solar-solutions">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Rooftop Solar Solutions
                                        </span>
                                    </Link>
                                </li>


                                {/* Solar Panel Maintenance */}

                                <li>
                                    <Link to="/services/solar-panel-maintenance">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Solar Panel Maintenance
                                        </span>
                                    </Link>
                                </li>


                                {/* Hybrid Solar Systems */}

                                <li>
                                    <Link to="/services/hybrid-solar-systems">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Hybrid Solar Systems
                                        </span>
                                    </Link>
                                </li>


                                {/* Residential Solar Solutions */}

                                <li>
                                    <Link to="/services/residential-solar-solutions">
                                        <span className="footer-bullet">•</span>
                                        <span>
                                            Residential Solar Solutions
                                        </span>
                                    </Link>
                                </li>

                            </ul>

                        </div>


                        {/* ================= NEWSLETTER ================= */}

                        <div className="sunex-footer-column newsletter-column">

                            <h3>
                                Subscribe To Newsletter
                            </h3>

                            <p className="sunex-newsletter-text">
                                Subscribe to receive solar tips, energy
                                saving insights, &amp; latest updates.
                            </p>

                            <div className="sunex-newsletter-form">

                                <input
                                    type="email"
                                    placeholder="Enter Email Address *"
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


                {/* =====================================================
                    CONTACT ROW
                ===================================================== */}

                <div className="sunex-contact-row">

                    {/* PHONE */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">
                            <Phone
                                size={25}
                                strokeWidth={2}
                            />
                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                Phone Number
                            </span>

                            <strong>
                                +1 (123) 456-789
                            </strong>

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">
                            <Mail
                                size={25}
                                strokeWidth={2}
                            />
                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                Email Address
                            </span>

                            <strong>
                                info@domainname.com
                            </strong>

                        </div>

                    </div>


                    {/* LOCATION */}

                    <div className="sunex-contact-item">

                        <div className="sunex-contact-icon">
                            <MapPin
                                size={25}
                                strokeWidth={2}
                            />
                        </div>

                        <div className="sunex-contact-content">

                            <span>
                                Our Location
                            </span>

                            <strong>
                                2118 Thornridge Cir. Syracuse
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    COPYRIGHT
                ===================================================== */}

                <div className="sunex-footer-bottom">

                    <p>
                        Copyright © 2026 Sunex. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;