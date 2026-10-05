import React, { useEffect, useRef } from "react";
import {
    ArrowUpRight,
    BatteryCharging,
    Phone,
    Sun,
    Zap,
    Wrench
} from "lucide-react";

import "./Home2Features.css";

import s8 from "../../assets/Home2/s8.png";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";

const Home2Features = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements = section.querySelectorAll(
            "[data-feature-reveal]"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "home2-feature-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -70px 0px"
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const features = [
        {
            title: "High-Efficiency",
            subtitle: "Solar Panels",
            icon: <Sun size={23} strokeWidth={2} />
        },
        {
            title: "Expert Install &",
            subtitle: "Services",
            icon: <Wrench size={23} strokeWidth={2} />
        },
        {
            title: "Fast and Clean",
            subtitle: "Installation",
            icon: <Zap size={23} strokeWidth={2} />
        },
        {
            title: "Smart System",
            subtitle: "Design",
            icon: <BatteryCharging size={23} strokeWidth={2} />
        }
    ];

    const avatars = [
        avatar1,
        avatar2,
        avatar3
    ];

    return (
        <section
            className="home2-features"
            ref={sectionRef}
        >
            <div className="home2-features-container">

                {/* =========================================
                    LEFT CONTENT
                ========================================= */}

                <div className="home2-features-left">

                    {/* BADGE */}

                    <div
                        className="home2-features-badge home2-reveal-left"
                        data-feature-reveal
                    >
                        <span></span>
                        Our Core Feature
                    </div>


                    {/* HEADING */}

                    <h2
                        className="home2-reveal-left home2-reveal-delay-1"
                        data-feature-reveal
                    >
                        Core features driving
                        <br />
                        reliable solar performance
                    </h2>


                    {/* FEATURE CARDS */}

                    <div className="home2-feature-grid">

                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`home2-feature-card home2-card-delay-${index + 1}`}
                                data-feature-reveal
                            >
                                <div className="home2-feature-icon">
                                    {feature.icon}
                                </div>

                                <div className="home2-feature-text">
                                    <h3>{feature.title}</h3>
                                    <h3>{feature.subtitle}</h3>
                                </div>
                            </div>
                        ))}

                    </div>


                    {/* DIVIDER */}

                    <div
                        className="home2-features-divider home2-reveal-left home2-reveal-delay-5"
                        data-feature-reveal
                    ></div>


                    {/* BOTTOM CONTACT */}

                    <div
                        className="home2-features-contact home2-reveal-left home2-reveal-delay-6"
                        data-feature-reveal
                    >
                        <a
                            href="#solar"
                            className="home2-features-solar-btn"
                        >
                            <span>Go Solar Today</span>

                            <ArrowUpRight
                                size={18}
                                strokeWidth={2.5}
                            />
                        </a>


                        <div className="home2-features-phone">

                            <div className="home2-features-phone-icon">
                                <Phone size={22} />
                            </div>

                            <div className="home2-features-phone-text">
                                <span>Phone Number</span>

                                <strong>
                                    +1 (123) 456-789
                                </strong>
                            </div>

                        </div>
                    </div>

                </div>


                {/* =========================================
                    RIGHT IMAGE
                ========================================= */}

                <div
                    className="home2-features-right"
                    data-feature-reveal
                >

                    <div className="home2-features-image">

                        <img
                            src={s8}
                            alt="Solar energy experts"
                        />

                        <div className="home2-features-image-overlay"></div>


                        {/* GREEN DOT */}

                        <div className="home2-features-green-dot"></div>


                        {/* =================================
                            CUSTOMER TRUST CARD
                        ================================= */}

                        <div className="home2-customer-trust">

                            {/* AVATAR ROW */}

                            <div className="home2-trust-avatars">

                                {avatars.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Customer ${index + 1}`}
                                        className="home2-trust-avatar"
                                    />
                                ))}


                                {/* PLUS */}

                                <div className="home2-trust-plus">
                                    +
                                </div>

                            </div>


                            {/* TEXT */}

                            <div className="home2-trust-text">

                                <strong>
                                    5K+ Customer Trust
                                </strong>

                                <span>
                                    Our Solar
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home2Features;