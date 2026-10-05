import React, { useEffect, useRef, useState } from "react";
import {
    ArrowUpRight,
    Sun,
    Globe2,
    Network,
    SolarPanel,
    Phone,
} from "lucide-react";

import "./Home3Do.css";

import b10 from "../../assets/Home3/b10.png";
import avatar1 from "../../assets/Solarimage/avatar1.png";

const Home3Do = () => {
    const sectionRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    const [counts, setCounts] = useState({
        residential: 0,
        commercial: 0,
        industrial: 0,
        installation: 0,
    });

    /* =========================================
       TARGET VALUES
    ========================================= */

    const targets = {
        residential: 2.8,
        commercial: 10,
        industrial: 3.5,
        installation: 2.5,
    };

    /* =========================================
       SCROLL OBSERVER
    ========================================= */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    /* =========================================
       NUMBER COUNT ANIMATION
    ========================================= */

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1800;
        const startTime = performance.now();

        const animateNumbers = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
                residential: targets.residential * easeOut,
                commercial: targets.commercial * easeOut,
                industrial: targets.industrial * easeOut,
                installation: targets.installation * easeOut,
            });

            if (progress < 1) {
                requestAnimationFrame(animateNumbers);
            } else {
                setCounts(targets);
            }
        };

        requestAnimationFrame(animateNumbers);
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className={`home3-do ${isVisible ? "is-visible" : ""}`}
        >
            <div className="home3-do-container">

                {/* =====================================
            TOP SECTION
        ====================================== */}

                <div className="home3-do-top">

                    {/* LEFT */}

                    <div className="home3-do-heading reveal-left">

                        <div className="section-tag">
                            <span className="tag-dot"></span>
                            <span>What We Do</span>
                        </div>

                        <h2>
                            Providing end to end solar
                            <br />
                            power solutions
                        </h2>

                    </div>


                    {/* RIGHT */}

                    <div className="home3-do-intro reveal-right">

                        <p>
                            At our company, we specialize in providing complete solar
                            energy solutions that empower homes, businesses, and
                            industries to harness clean, renewable energy.
                        </p>

                        <a
                            href="#learn-more"
                            className="learn-more-btn"
                        >
                            <span>Learn More</span>

                            <span className="learn-arrow">
                                <ArrowUpRight
                                    size={19}
                                    strokeWidth={2.2}
                                />
                            </span>
                        </a>

                    </div>

                </div>


                {/* =====================================
            MAIN CONTENT
        ====================================== */}

                <div className="home3-do-content">

                    {/* ===================================
              CARDS
          ==================================== */}

                    <div className="home3-do-cards">

                        {/* CARD 1 */}

                        <div className="service-card card-1">

                            <div className="service-icon">
                                <Sun
                                    size={21}
                                    strokeWidth={1.9}
                                />
                            </div>

                            <h3>
                                Residential Solar
                                <br />
                                Solutions
                            </h3>

                            <div className="card-line"></div>

                            <div className="counter-number">
                                {counts.residential.toFixed(1)}
                                K<span>+</span>
                            </div>

                            <p>
                                Panels Installed
                            </p>

                        </div>


                        {/* CARD 2 */}

                        <div className="service-card card-2">

                            <div className="service-icon">
                                <Globe2
                                    size={21}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <h3>
                                Commercial Solar
                                <br />
                                Solutions
                            </h3>

                            <div className="card-line"></div>

                            <div className="counter-number">
                                {counts.commercial.toFixed(0)}
                                K<span>+</span>
                            </div>

                            <p>
                                Renewable Energy
                            </p>

                        </div>


                        {/* CARD 3 */}

                        <div className="service-card card-3">

                            <div className="service-icon">
                                <Network
                                    size={21}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <h3>
                                Industrials Solar
                                <br />
                                Projects
                            </h3>

                            <div className="card-line"></div>

                            <div className="counter-number">
                                {counts.industrial.toFixed(1)}
                                K<span>+</span>
                            </div>

                            <p>
                                Projects
                            </p>

                        </div>


                        {/* CARD 4 */}

                        <div className="service-card card-4">

                            <div className="service-icon">
                                <SolarPanel
                                    size={21}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <h3>
                                Solar Installation &
                                <br />
                                Commissioning
                            </h3>

                            <div className="card-line"></div>

                            <div className="counter-number">
                                {counts.installation.toFixed(1)}
                                K
                            </div>

                            <p>
                                Happy Clients
                            </p>

                        </div>

                    </div>


                    {/* ===================================
              RIGHT IMAGE
          ==================================== */}

                    <div className="home3-do-image-wrapper">

                        <div className="home3-do-image">

                            <img
                                src={b10}
                                alt="Solar Energy Solutions"
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================
            BOTTOM CTA
        ====================================== */}

                <div className="home3-do-bottom">

                    <div className="cta-contact">

                        {/* AVATAR */}

                        <div className="avatar-wrapper">

                            <img
                                src={avatar1}
                                alt="Team member"
                                className="cta-avatar-image"
                            />

                        </div>


                        {/* PHONE ICON */}

                        <div className="cta-phone">

                            <Phone
                                size={16}
                                strokeWidth={2}
                            />

                        </div>

                    </div>


                    <p>
                        Let's make something great work together.
                        <a href="#quote">
                            {" "}
                            Get Free Quote
                        </a>
                    </p>

                </div>

            </div>
        </section>
    );
};

export default Home3Do;