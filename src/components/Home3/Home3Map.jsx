import React, { useEffect, useRef, useState } from "react";
import "./Home3Map.css";

import b14 from "../../assets/Home3/b14.png";

const progressData = [
    {
        title: "Site Assessment",
        percentage: 75,
    },
    {
        title: "Site Assessment",
        percentage: 75,
    },
];

const Home3Impact = () => {
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);
    const [progressValues, setProgressValues] = useState(
        progressData.map(() => 0)
    );

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        let animationFrame;
        const duration = 1600;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setProgressValues(
                progressData.map((item) =>
                    Math.round(item.percentage * easedProgress)
                )
            );

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [started]);

    return (
        <section className="home3-impact" ref={sectionRef}>
            <div className="home3-impact-container">

                {/* ================= LEFT CONTENT ================= */}
                <div className="home3-impact-left">

                    <div className="home3-impact-label">
                        <span></span>
                        Our Impact
                    </div>

                    <h2>
                        Proven results from years of
                        <br />
                        solar expertise
                    </h2>

                    <p className="home3-impact-description">
                        Our solar energy projects speak for themselves. Through innovation, dedication,
                        <br />
                        and sustainable practices, we have helped thousands of homes, businesses,
                    </p>

                    {/* ================= PROGRESS BARS ================= */}
                    {progressData.map((item, index) => (
                        <div
                            className="home3-impact-progress"
                            key={`${item.title}-${index}`}
                        >
                            <div className="home3-impact-progress-top">
                                <span>{item.title}</span>

                                <strong>
                                    {progressValues[index]}%
                                </strong>
                            </div>

                            <div className="home3-impact-progress-bar">
                                <span
                                    style={{
                                        width: `${progressValues[index]}%`,
                                    }}
                                ></span>
                            </div>
                        </div>
                    ))}

                    {/* ================= CONTACT BUTTON ================= */}
                    <button className="home3-impact-btn">
                        <span>Contact Us</span>

                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7" />
                            <path d="M9 7H17V15" />
                        </svg>
                    </button>

                </div>

                {/* ================= RIGHT MAP ================= */}
                <div className="home3-impact-map">

                    <img
                        src={b14}
                        alt="Global Solar Impact Map"
                    />

                    {/* MAP DOTS */}
                    <span className="home3-map-dot dot-1"></span>
                    <span className="home3-map-dot dot-2"></span>
                    <span className="home3-map-dot dot-3"></span>
                    <span className="home3-map-dot dot-4"></span>
                    <span className="home3-map-dot dot-5"></span>

                    {/* ================= 10K CARD ================= */}
                    <div className="home3-map-stat">

                        <div className="home3-map-stat-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 3v18" />
                                <path d="M3 12h18" />
                                <path d="M6 6l12 12" />
                                <path d="M18 6L6 18" />
                            </svg>
                        </div>

                        <div>
                            <strong>10K</strong>
                            <span>Panels Installed</span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home3Impact;