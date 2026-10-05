import React, { useEffect, useRef, useState } from "react";
import "./Home3.css";

import b1 from "../../assets/Home3/b1.png";
import b2 from "../../assets/Home3/b2.png";
import b3 from "../../assets/Home3/b3.png";
import b4 from "../../assets/Home3/b4.png";
import b5 from "../../assets/Home3/b5.png";

import Home3About from "../Home3/Home3About";
import Home3Services from "../Home3/Home3Services";
import Home3Do from "../Home3/Home3Do";
import Home3Work from "../Home3/Home3Work";
import Home3Map from "../Home3/Home3Map";
import Home3Pricing from "../Home3/Home3Pricing";
import Home3Testimonials from "../Home3/Home3Testimonials";

const Home3 = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

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
                threshold: 0.01,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <main
            ref={sectionRef}
            className={`home3-page ${visible ? "home3-visible" : ""}`}
        >
            {/* ================= HERO ================= */}

            <section className="home3-hero">

                {/* BACKGROUND IMAGE */}
                <div className="home3-background">
                    <img
                        src={b5}
                        alt=""
                        className="home3-background-image"
                    />
                </div>

                {/* WHITE OVERLAY */}
                <div className="home3-overlay"></div>

                {/* HERO CONTENT */}
                <div className="home3-content">

                    {/* BADGE */}
                    <div className="home3-badge home3-reveal">
                        <span></span>
                        Solar Energy For Tomorrow
                    </div>

                    {/* HEADING */}
                    <h1 className="home3-title home3-reveal">

                        <span>Harnessing</span>

                        <img
                            src={b1}
                            alt="Solar panel"
                            className="home3-title-image"
                        />

                        <span>The Power Of The</span>

                        <img
                            src={b2}
                            alt="Sun"
                            className="home3-title-image"
                        />

                        <span>Sun</span>

                        <br />

                        <span>To Build A Sustainable</span>

                        <img
                            src={b3}
                            alt="Sustainable future"
                            className="home3-title-image"
                        />

                        <span>Future</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="home3-description home3-reveal">
                        From expert system design to seamless installation and
                        ongoing support, we combine technical
                        <br className="home3-desktop-break" />
                        expertise with a commitment to performance, safety.
                    </p>

                    {/* BUTTONS */}
                    <div className="home3-actions home3-reveal">

                        <button
                            type="button"
                            className="home3-consult-btn"
                        >
                            <span>Get Free Consultation</span>
                            <strong>↗</strong>
                        </button>

                        <button
                            type="button"
                            className="home3-story-btn"
                        >
                            <span className="home3-play">
                                ▶
                            </span>

                            <span>Watch Our Story</span>
                        </button>

                    </div>

                    {/* PEOPLE IMAGE */}
                    <div className="home3-people-wrapper home3-reveal">
                        <img
                            src={b4}
                            alt="Solar energy professionals"
                            className="home3-people-image"
                        />
                    </div>

                </div>
            </section>

            {/* ================= OTHER SECTIONS ================= */}

            <Home3About />
            <Home3Services />
            <Home3Do />
            <Home3Work />
            <Home3Map />
            <Home3Pricing />
            <Home3Testimonials />

        </main>
    );
};

export default Home3;