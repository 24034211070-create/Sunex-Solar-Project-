import React, { useEffect, useRef } from "react";
import { Globe2, MapPin, } from "lucide-react";
import "./Home2Work.css";

// Apni image ka path yahan set karo
import s11 from "../../assets/Home2/s11.png";
import s12 from "../../assets/Home2/s12.png";

const HowItWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const elements = section.querySelectorAll(".how-animate");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("how-show");
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            elements.forEach((element) => observer.unobserve(element));
        };
    }, []);

    const steps = [
        {
            number: "01",
            title: "Free Assessment",
            description:
                "We analyze your roof sunlight exposure to recommend.",
        },
        {
            number: "02",
            title: "Custom Design",
            description:
                "We analyze your roof sunlight exposure to recommend.",
        },
        {
            number: "03",
            title: "Professional Installation",
            description:
                "We analyze your roof sunlight exposure to recommend.",
        },
        {
            number: "04",
            title: "Start Saving Energy",
            description:
                "We analyze your roof sunlight exposure to recommend.",
        },
    ];

    return (
        <section
            className="how-it-works-section"
            ref={sectionRef}
        >
            <div className="how-main-container">

                {/* =========================================
            LEFT CONTENT
        ========================================= */}

                <div className="how-left-content how-animate how-fade-left">

                    <div className="how-label">
                        <span></span>
                        How It Work
                    </div>

                    <h2>
                        How solar technology
                        <br />
                        powers your home
                        <br />
                        every single day
                    </h2>

                    <p className="how-description">
                        Solar technology works by capturing sunlight through
                        high-efficiency panels installed on your roof. These
                        panels convert sunlight into usable electricity, which
                        powers your lights.
                    </p>

                    {/* =========================================
              STEPS
          ========================================= */}

                    <div className="how-steps-grid">

                        {steps.map((step, index) => (
                            <div
                                className={`how-step-card how-animate how-card-animation card-delay-${index + 1}`}
                                key={step.number}
                            >
                                <div className="how-step-number">
                                    {step.number}
                                </div>

                                <div className="how-step-content">
                                    <h3>{step.title}</h3>

                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>


                {/* =========================================
            RIGHT VISUAL AREA
        ========================================= */}

                <div className="how-right-area">

                    {/* =========================================
              TOP IMAGE
          ========================================= */}

                    <div className="how-main-image how-animate how-image-animation">
                        <img
                            src={s11}
                            alt="Solar installation"
                        />
                    </div>


                    {/* =========================================
              TOP RIGHT STAT
          ========================================= */}

                    <div className="how-stat-box how-animate how-fade-right">

                        <div className="how-stat-header">

                            <div>
                                <div className="how-stat-number">
                                    10K<span>+</span>
                                </div>

                                <p>Total Energy Generated</p>
                            </div>

                            <div className="how-globe-icon">
                                <Globe2 size={28} />
                            </div>

                        </div>

                        <div className="how-stat-line"></div>

                        <p className="how-stat-description">
                            Every unit of energy generated contributes
                            lower electricity costs and a cleaner, more
                            sustainable environment.
                        </p>

                    </div>


                    {/* =========================================
              QUOTE BOX
          ========================================= */}

                    <div className="how-quote-box how-animate how-fade-up">

                        <h3>
                            “Trusted solar solutions
                            <br />
                            powering homes around
                            <br />
                            world”
                        </h3>

                        <div className="how-world-map">

                            <div className="map-dot dot-one">
                                <MapPin size={19} fill="currentColor" />
                            </div>

                            <div className="map-dot dot-two">
                                <MapPin size={19} fill="currentColor" />
                            </div>

                            <div className="map-dot dot-three">
                                <MapPin size={19} fill="currentColor" />
                            </div>

                            <div className="map-dot dot-four">
                                <MapPin size={19} fill="currentColor" />
                            </div>

                            <div className="map-dot dot-five">
                                <MapPin size={19} fill="currentColor" />
                            </div>

                            <div className="map-shape">
                                <span></span>
                            </div>

                        </div>

                    </div>


                    {/* =========================================
              BOTTOM IMAGE
          ========================================= */}

                    <div className="how-bottom-image how-animate how-image-animation delay-bottom">
                        <img
                            src={s12}
                            alt="Solar panel installation"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default HowItWorks;