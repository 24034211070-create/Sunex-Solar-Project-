import React, { useEffect, useRef } from "react";
import {
    ArrowUpRight,
    Check,
    Layers3,
    MapPin,
    Phone,
} from "lucide-react";

import "./Home3About.css";

// Apni images yahan import karo
import b6 from "../../assets/Home3/b6.png";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";
import avatar4 from "../../assets/Solarimage/avatar4.png";

const Home3About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements = section.querySelectorAll(".h3-reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("h3-show");
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="home3-about" ref={sectionRef}>
            <div className="home3-about-container">

                {/* ================= TOP ================= */}
                <div className="home3-about-top h3-reveal">

                    <div className="home3-about-label">
                        <span></span>
                        About Our Company
                    </div>

                    <h2>
                        Empowering homes and businesses
                        <br />
                        with reliable solar energy solutions
                    </h2>

                </div>

                {/* ================= MAIN GRID ================= */}
                <div className="home3-about-grid">

                    {/* ================= LEFT COLUMN ================= */}
                    <div className="home3-about-left">

                        {/* Happy Customers Card */}
                        <div className="h3-customer-card h3-reveal">

                            <div className="h3-avatar-group">
                                <img src={avatar1} alt="" />
                                <img src={avatar2} alt="" />
                                <img src={avatar3} alt="" />
                                <img src={avatar4} alt="" />
                            </div>

                            <p className="h3-small-title">
                                Happy Customers
                            </p>

                            <div className="h3-number-row">
                                <div className="h3-round-icon">
                                    <span>♧</span>
                                </div>

                                <strong>2.8+</strong>
                            </div>

                            <p className="h3-card-description">
                                Satisfied Customers
                                <br />
                                Nationwide
                            </p>

                        </div>

                        {/* Award Card */}
                        <div className="h3-award-card h3-reveal">

                            <div className="h3-award-top">

                                <div className="h3-award-icon">
                                    <MapPin size={37} strokeWidth={1.7} />
                                </div>

                                <strong>2024</strong>

                            </div>

                            <div className="h3-award-pills">
                                <span>Certified</span>
                                <span>Awarded</span>
                            </div>

                            <div className="h3-award-line"></div>

                            <p>
                                Best Solar Energy Company
                                <br />
                                Award
                            </p>

                        </div>

                    </div>

                    {/* ================= CENTER IMAGE ================= */}
                    <div className="home3-about-image h3-reveal">

                        <img
                            src={b6}
                            alt="Solar energy professionals"
                        />

                    </div>

                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="home3-about-right">

                        <div className="h3-description h3-reveal">

                            <p>
                                From expert system design to seamless installation and
                                ongoing support, we combine technical expertise with a
                                commitment to performance, safety.
                            </p>

                            <button className="h3-more-btn">
                                More About Us
                                <ArrowUpRight size={18} />
                            </button>

                        </div>

                        {/* Features */}
                        <div className="h3-features h3-reveal">

                            <div className="h3-feature">
                                <Check size={12} />
                                <span>
                                    Comprehensive solar solutions covering design,
                                </span>
                            </div>

                            <div className="h3-feature">
                                <Check size={12} />
                                <span>
                                    Expert team of certified engineers ensuring safe
                                </span>
                            </div>

                        </div>

                        {/* Mission Card */}
                        <div className="h3-mission-card h3-reveal">

                            <div className="h3-mission-heading">

                                <div className="h3-mission-icon">
                                    <Layers3 size={27} />
                                </div>

                                <h3>Our Mission</h3>

                            </div>

                            <p>
                                Our mission is to accelerate the adoption of clean and
                                renewable solar energy by delivering reliable,
                                affordable, and high-performance solar solutions.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= TAGS ================= */}
                <div className="h3-tags h3-reveal">

                    <span>
                        <i></i>
                        Renewable Energy
                    </span>

                    <span>
                        <i></i>
                        Residential Solar
                    </span>

                    <span>
                        <i></i>
                        Sustainable Energy
                    </span>

                    <span>
                        <i></i>
                        Solar Battery Storage
                    </span>

                </div>

                {/* ================= BOTTOM CTA ================= */}
                <div className="h3-bottom h3-reveal">

                    <div className="h3-contact">

                        <div className="h3-contact-avatars">
                            <img src={avatar1} alt="" />

                            <div className="h3-phone">
                                <Phone size={17} />
                            </div>
                        </div>

                        <p>
                            Let's make something great work together.
                            <a href="#quote">Get Free Quote</a>
                        </p>

                    </div>

                </div>

            </div>

            {/* Floating Buy Button */}
            <button className="h3-buy-button">
                <span className="h3-cart-icon">🛒</span>
                Buy Now
            </button>

        </section>
    );
};

export default Home3About;