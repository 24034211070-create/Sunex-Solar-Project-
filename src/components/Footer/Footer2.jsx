import React, { useEffect, useState } from "react";
import "./Footer2.css";
import { FiPhoneCall, FiArrowUpRight } from "react-icons/fi";

const Footer2 = () => {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        const footer = document.querySelector(".footer2");

        if (footer) {
            observer.observe(footer);
        }

        return () => observer.disconnect();
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        setEmail("");
    };

    return (
        <footer className={`footer2 ${visible ? "footer2-visible" : ""}`}>

            <div className="footer2-pattern"></div>

            <div className="footer2-container">

                {/* LEFT COLUMN */}
                <div className="footer2-brand footer2-reveal">

                    <div className="footer2-logo">
                        <div className="footer2-logo-circle">
                            <svg
                                viewBox="0 0 40 40"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M22.5 4L10 22h9l-2 14 13-19h-9l1.5-13z"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <span>
                            Sunex<span className="footer2-logo-dot">.</span>
                        </span>
                    </div>

                    <p className="footer2-description">
                        We provide reliable and efficient
                        <br />
                        solar solutions for homes.
                    </p>

                    <div className="footer2-phone">

                        <div className="footer2-phone-icon">
                            <FiPhoneCall />
                        </div>

                        <div className="footer2-phone-content">
                            <span>Phone Number</span>
                            <a href="tel:+1123456789">
                                +1 (123) 456 789
                            </a>
                        </div>

                    </div>

                </div>

                {/* QUICK LINKS */}
                <div className="footer2-column footer2-reveal footer2-delay-1">

                    <h3>Quick Links</h3>

                    <ul>
                        <li>
                            <a href="#home">Home</a>
                        </li>

                        <li>
                            <a href="#about">About Us</a>
                        </li>

                        <li>
                            <a href="#services">Our Services</a>
                        </li>

                        <li>
                            <a href="#blogs">Blogs</a>
                        </li>

                        <li>
                            <a href="#contact">Contact Us</a>
                        </li>
                    </ul>

                </div>

                {/* SERVICES */}
                <div className="footer2-column footer2-reveal footer2-delay-2">

                    <h3>Our Services</h3>

                    <ul>
                        <li>
                            <a href="#solar-battery">
                                Solar Battery Storage
                            </a>
                        </li>

                        <li>
                            <a href="#maintenance">
                                Solar System Maintenance
                            </a>
                        </li>

                        <li>
                            <a href="#rooftop">
                                Rooftop Solar Solutions
                            </a>
                        </li>

                        <li>
                            <a href="#panel">
                                Solar Panel Maintenance
                            </a>
                        </li>

                        <li>
                            <a href="#hybrid">
                                Hybrid Solar Systems
                            </a>
                        </li>
                    </ul>

                </div>

                {/* NEWSLETTER */}
                <div className="footer2-newsletter footer2-reveal footer2-delay-3">

                    <h3>Subscribe our newsletter</h3>

                    <form onSubmit={handleSubscribe}>

                        <input
                            type="email"
                            placeholder="Enter Email Address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit">
                            <span>Subscribe</span>
                            <FiArrowUpRight />
                        </button>

                    </form>

                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer2-bottom">

                <div className="footer2-bottom-line"></div>

                <div className="footer2-bottom-content">

                    <p>
                        Copyright © 2026 Sunex. All rights reserved.
                    </p>

                </div>

            </div>

            {/* BUY NOW */}
            <a
                href="#"
                className="footer2-buy-now"
                onClick={(e) => e.preventDefault()}
            >
                <span className="footer2-cart-icon">🛒</span>
                <span>Buy Now</span>
            </a>

        </footer>
    );
};

export default Footer2;