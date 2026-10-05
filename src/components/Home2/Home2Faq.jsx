import React, { useEffect, useRef, useState } from "react";
import "./Home2Faq.css";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";

const faqData = [
    {
        question: "Is solar energy suitable for my home or business?",
        answer: "Yes, solar energy is suitable for most homes and businesses. Factors such as roof space, sunlight exposure, and your energy consumption are evaluated to design a suitable solar system."
    },
    {
        question: "What happens if I generate more power than I use?",
        answer: "When your solar system generates more electricity than you consume, the excess power can be sent back to the grid depending on your local net metering or electricity regulations."
    },
    {
        question: "Are there government subsidies or incentives available?",
        answer: "Government subsidies and incentives may be available depending on your location, system type, and applicable renewable energy programs. Our team can help you understand the available options."
    },
    {
        question: "What maintenance does a solar system require?",
        answer: "Solar systems generally require minimal maintenance. Regular cleaning, visual inspections, and periodic performance checks help keep the system operating efficiently."
    },
    {
        question: "Does solar work during cloudy days or at night?",
        answer: "Solar panels can still generate electricity during cloudy weather, although production may be lower. At night, solar panels do not generate electricity, so battery storage or grid electricity can provide power."
    }
];

const RatingCounter = ({ start }) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!start) return;

        let animationFrame;
        const duration = 1800;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            const currentRating = 4.9 * eased;

            setRating(Number(currentRating.toFixed(1)));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setRating(4.9);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [start]);

    return <>{rating.toFixed(1)}</>;
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const faqRef = useRef(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const section = faqRef.current;

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
                threshold: 0.18
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            className={`faq-section ${isVisible ? "faq-visible" : ""}`}
            ref={faqRef}
        >
            <div className="faq-container">

                {/* LEFT SIDE */}
                <div className="faq-left">

                    <div className="faq-badge faq-reveal faq-reveal-left">
                        <span></span>
                        Frequently Asked Questions
                    </div>

                    <h2 className="faq-reveal faq-reveal-left">
                        Clear guidance for your
                        <br />
                        solar journey
                    </h2>

                    <p className="faq-reveal faq-reveal-left">
                        We've answered the most common questions to help you
                        understand solar energy, installation, costs, and maintenance.
                    </p>

                    {/* RATING BOX */}
                    <div className="faq-rating-box faq-reveal faq-reveal-left">

                        <div className="faq-rating">
                            <strong>
                                <RatingCounter start={isVisible} />
                            </strong>

                            <span className="faq-star">★</span>
                        </div>

                        <div className="faq-rating-divider"></div>

                        <div className="faq-customers">

                            <div className="faq-avatars">
                                <div className="faq-avatar">
                                    <img src={avatar1} alt="Customer" />
                                </div>

                                <div className="faq-avatar">
                                    <img src={avatar2} alt="Customer" />
                                </div>

                                <div className="faq-avatar">
                                    <img src={avatar3} alt="Customer" />
                                </div>

                                <div className="faq-avatar-plus">
                                    +
                                </div>
                            </div>

                            <p>
                                Join 5K+ Customers Switching to
                                <br />
                                Solar Today
                            </p>

                        </div>

                    </div>

                    <button className="faq-view-btn faq-reveal faq-reveal-left">
                        <span>View All Questions</span>
                        <span className="faq-button-arrow">↗</span>
                    </button>

                </div>

                {/* RIGHT SIDE */}
                <div className="faq-right faq-reveal faq-reveal-right">

                    {faqData.map((faq, index) => (
                        <div
                            className={`faq-item ${openIndex === index ? "faq-active" : ""
                                }`}
                            key={faq.question}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="faq-question-text">
                                    {index + 1}. {faq.question}
                                </span>

                                <span className="faq-arrow">
                                    ↑
                                </span>
                            </button>

                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default FAQ;