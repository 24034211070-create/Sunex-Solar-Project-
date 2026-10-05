import React, { useEffect, useRef } from "react";
import { Globe2, Plus, Star, Zap, ArrowUpRight, } from "lucide-react";
import "./Home2Do.css";
import s9 from "../../assets/Home2/s9.png";
import s10 from "../../assets/Home2/s10.jpg";
import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";

const WhatWeDo = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const animatedElements = section.querySelectorAll(
            ".animate-on-scroll"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-animation");
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            animatedElements.forEach((element) => {
                observer.unobserve(element);
            });
        };
    }, []);

    return (
        <section className="what-we-do-section" ref={sectionRef}>
            {/* Decorative dots */}
            <div className="wwd-top-dot"></div>

            {/* Heading */}
            <div className="wwd-heading animate-on-scroll fade-up">
                <div className="wwd-label">
                    <span></span>
                    What We Do
                </div>

                <h2>
                    What we do driving sustainable
                    <br />
                    energy futures
                </h2>
            </div>

            {/* Main Cards */}
            <div className="wwd-cards-container">

                {/* ================= LEFT CARD ================= */}
                <div className="wwd-card wwd-left-card animate-on-scroll image-reveal">
                    <img
                        src={s9}
                        alt="Solar panel"
                        className="wwd-card-image"
                    />

                    <div className="wwd-left-overlay"></div>

                    <div className="wwd-left-content">
                        <p>
                            “Power your home with reliable affordable
                            <br />
                            clean solar energy today”
                        </p>
                    </div>

                    <div className="wwd-left-bottom">
                        <span>Clean Energy</span>
                        <ArrowUpRight size={20} />
                    </div>
                </div>

                {/* ================= CENTER CARD ================= */}
                <div className="wwd-card wwd-center-card animate-on-scroll image-reveal delay-1">
                    <img
                        src={s10}
                        alt="Solar and wind energy"
                        className="wwd-card-image"
                    />

                    <div className="wwd-center-overlay"></div>

                    <div className="wwd-center-content">

                        <div className="wwd-brand-row">
                            <div className="wwd-zap-icon">
                                <Zap size={27} fill="white" />
                            </div>

                            <h3>Sunex.</h3>
                        </div>

                        <p>
                            Smart solar solutions tailored to energy
                            <br />
                            needs, budget, and future goals.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT CARD ================= */}
                <div className="wwd-card wwd-stat-card animate-on-scroll fade-right delay-2">

                    <div className="wwd-stat-icon">
                        <Globe2 size={27} />
                    </div>

                    <div className="wwd-stat-number">
                        40<span>+</span>
                    </div>

                    <p className="wwd-stat-title">
                        Average Energy Cost Savings
                    </p>

                    <div className="wwd-stat-spacer"></div>

                    <div className="wwd-customer-row">

                        <div className="wwd-avatars">

                            <img
                                src={avatar1}
                                alt="Customer"
                            />

                            <img
                                src={avatar2}
                                alt="Customer"
                            />

                            <img
                                src={avatar3}
                                alt="Customer"
                            />

                            <div className="wwd-plus-avatar">
                                <Plus size={23} />
                            </div>

                        </div>

                        <p>
                            <strong>5K+ Customer</strong>
                            <br />
                            Trust Our Solar
                        </p>

                    </div>
                </div>
            </div>

            {/* ================= BOTTOM TRUST SECTION ================= */}
            <div className="wwd-bottom animate-on-scroll fade-up delay-3">

                <div className="wwd-bottom-top">

                    <div className="wwd-bottom-avatar">
                        <img
                            src={avatar1}
                            alt="Customer"
                        />

                        <div className="wwd-phone-icon">
                            <Globe2 size={15} />
                        </div>
                    </div>

                    <p>
                        From your first consultation to years of clean energy –
                        <span> We Build Solar Confidence That Lasts</span>
                    </p>

                </div>

                <div className="wwd-rating">

                    <strong>4.9</strong>

                    <div className="wwd-stars">
                        <Star size={19} fill="currentColor" />
                        <Star size={19} fill="currentColor" />
                        <Star size={19} fill="currentColor" />
                        <Star size={19} fill="currentColor" />
                        <Star size={19} fill="currentColor" />
                    </div>

                    <strong>Over 2000 Reviews</strong>

                </div>
            </div>

            {/* Decorative floating dot */}
            <div className="wwd-floating-dot"></div>
        </section>
    );
};

export default WhatWeDo;