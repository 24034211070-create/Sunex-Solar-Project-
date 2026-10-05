import React from "react";
import "./Home3Work.css";

import b11 from "../../assets/Home3/b11.png";
import b12 from "../../assets/Home3/b12.png";
import b13 from "../../assets/Home3/b13.png";
import m5 from "../../assets/Heroimages/m5.jpg";

const steps = [
    {
        number: "Step 01",
        title: "Site Assessment",
        text: "We evaluate your location, roof space, and energy requirements to design",
        image: b11,
        icon: "assessment",
    },
    {
        number: "Step 02",
        title: "Custom Solar System Design",
        text: "We evaluate your location, roof space, and energy requirements to design",
        image: b12,
        icon: "design",
    },
    {
        number: "Step 03",
        title: "Professional Installation",
        text: "We evaluate your location, roof space, and energy requirements to design",
        image: b13,
        icon: "installation",
    },
    {
        number: "Step 04",
        title: "Testing & Commissioning",
        text: "We evaluate your location, roof space, and energy requirements to design",
        image: m5,
        icon: "testing",
    },
];

const StepIcon = ({ type }) => {
    if (type === "assessment") {
        return (
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 4v4M17 4v4M5 8h14M6 8v10h12V8M9 13h2M13 13h2M9 16h2M13 16h2" />
            </svg>
        );
    }

    if (type === "design") {
        return (
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="8" />
                <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
            </svg>
        );
    }

    if (type === "installation") {
        return (
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 7h6v6H5zM13 11h6v6h-6z" />
                <path d="M11 10l2 2M9 16l4-4M7 7V4M17 17v3" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 12h6V6M13 18h6v-6" />
            <path d="M11 12h2M12 11v2" />
            <path d="M5 8V5h3M19 16v3h-3" />
        </svg>
    );
};

const Home3Work = () => {
    return (
        <section className="home3-work">
            <div className="home3-work-container">

                <div className="home3-work-heading">
                    <div className="home3-work-label">
                        <span></span>
                        How It Work
                    </div>

                    <h2>How our solar system works</h2>

                    <p>
                        Our solar energy solutions are designed to be simple, efficient, and reliable.
                        <br />
                        From initial consultation to final installation, we guide you through every
                    </p>
                </div>

                <div className="home3-work-process">

                    <div className="home3-work-line"></div>

                    {steps.map((step, index) => (
                        <div
                            className={`home3-work-item home3-work-item-${index + 1}`}
                            key={step.number}
                        >

                            <div className="home3-work-content">

                                <div className="home3-work-icon">
                                    <StepIcon type={step.icon} />
                                </div>

                                <span className="home3-work-step">
                                    {step.number}
                                </span>

                                <h3>{step.title}</h3>

                                <p>{step.text}</p>
                            </div>

                            <div className="home3-work-image-wrap">

                                <svg
                                    className="home3-work-shape"
                                    viewBox="0 0 300 250"
                                    preserveAspectRatio="none"
                                >
                                    <defs>
                                        <clipPath id={`workShape${index}`}>
                                            <path
                                                d="
                                                M150 5
                                                C175 5 185 27 207 25
                                                C230 23 246 8 265 28
                                                C284 48 270 70 277 91
                                                C284 113 300 125 285 148
                                                C271 169 247 161 232 176
                                                C215 193 218 222 193 235
                                                C169 247 151 227 130 235
                                                C106 244 91 223 91 201
                                                C91 179 69 170 48 176
                                                C25 182 8 162 16 140
                                                C23 119 5 101 17 80
                                                C29 59 51 63 66 48
                                                C82 31 77 10 101 6
                                                C122 2 132 7 150 5Z
                                                "
                                            />
                                        </clipPath>
                                    </defs>

                                    <image
                                        href={step.image}
                                        width="300"
                                        height="250"
                                        preserveAspectRatio="xMidYMid slice"
                                        clipPath={`url(#workShape${index})`}
                                    />
                                </svg>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Home3Work;