import React, { useEffect, useRef, useState } from "react";
import "./Home3Testimonials.css";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";
import avatar4 from "../../assets/Solarimage/avatar4.png";

const testimonials = [
    {
        name: "Vikram Singh",
        role: "Industrial Client",
        avatar: avatar1,
        title: "Reliable And Professional Team",
        text: "From the initial consultation to the final installation, the entire solar project was handled with great professionalism. The team carefully explained the system design,",
    },
    {
        name: "Annette Black",
        role: "Industrial Client",
        avatar: avatar2,
        title: "Reliable And Professional Team",
        text: "From the initial consultation to the final installation, the entire solar project was handled with great professionalism. The team carefully explained the system design,",
    },
    {
        name: "Courtney Henry",
        role: "Industrial Client",
        avatar: avatar3,
        title: "Reliable And Professional Team",
        text: "From the initial consultation to the final installation, the entire solar project was handled with great professionalism. The team carefully explained the system design,",
    },
];

const headingText = "What our customers say about\nsolar solutions";

const Stars = ({ small = false }) => {
    return (
        <div className={small ? "testimonial-stars small" : "testimonial-stars"}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M12 2.8l2.8 5.7 6.3.9-4.5 4.4 1.1 6.2-5.7-3-5.7 3 1.1-6.2-4.5-4.4 6.3-.9L12 2.8z" />
                </svg>
            ))}
        </div>
    );
};

const Home3Testimonials = () => {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [typedHeading, setTypedHeading] = useState("");

    /* ================= SECTION OBSERVER ================= */

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
                threshold: 0.12,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    /* ================= TYPEWRITER ================= */

    useEffect(() => {
        if (!visible) return;

        setTypedHeading("");

        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            currentIndex++;

            setTypedHeading(
                headingText.slice(0, currentIndex)
            );

            if (currentIndex >= headingText.length) {
                clearInterval(typingInterval);
            }
        }, 55);

        return () => clearInterval(typingInterval);
    }, [visible]);

    return (
        <section
            ref={sectionRef}
            className={`home3-testimonials ${visible ? "testimonials-visible" : ""
                }`}
        >
            <div className="home3-testimonials-container">

                {/* ================= HEADING ================= */}

                <div className="home3-testimonials-heading">

                    {/* BADGE */}

                    <div className="home3-testimonials-label">
                        <span></span>
                        Our Testimonials
                    </div>

                    {/* TYPEWRITER HEADING */}

                    <h2 className="home3-testimonials-title">
                        {typedHeading.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}

                                {index === 0 && <br />}
                            </React.Fragment>
                        ))}

                        <span className="testimonial-type-cursor">
                            |
                        </span>
                    </h2>

                </div>

                {/* ================= TESTIMONIAL CARDS ================= */}

                <div className="home3-testimonials-grid">

                    {testimonials.map((testimonial, index) => (
                        <article
                            className="home3-testimonial-card"
                            key={testimonial.name}
                            style={{
                                "--testimonial-delay": `${index * 0.18}s`,
                            }}
                        >

                            {/* STARS */}

                            <div className="testimonial-card-stars">
                                <Stars />
                            </div>

                            {/* TITLE */}

                            <h3>
                                {testimonial.title}
                            </h3>

                            {/* DESCRIPTION */}

                            <p>
                                {testimonial.text}
                            </p>

                            {/* DIVIDER */}

                            <div className="testimonial-card-divider"></div>

                            {/* CUSTOMER */}

                            <div className="testimonial-customer">

                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                />

                                <div>
                                    <strong>
                                        {testimonial.name}
                                    </strong>

                                    <span>
                                        {testimonial.role}
                                    </span>
                                </div>

                            </div>

                        </article>
                    ))}

                </div>

                {/* ================= BOTTOM INFORMATION ================= */}

                <div className="home3-testimonials-bottom">

                    {/* MESSAGE */}

                    <div className="testimonial-bottom-message">

                        <div className="testimonial-bottom-avatar">
                            <img
                                src={avatar4}
                                alt="Customer"
                            />
                        </div>

                        <div className="testimonial-phone">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M7 4h3l1.5 4-2 1.5a13 13 0 005 5L16 12l4 1.5v3c0 1.1-.9 2-2 2C10.3 18.5 5.5 13.7 5.5 6c0-1.1.4-2 1.5-2z" />
                            </svg>

                        </div>

                        <p>
                            Where smart solar design meets powerful clean
                            energy results -{" "}
                            <a href="#testimonials">
                                View All Testimonials
                            </a>
                        </p>

                    </div>

                    {/* RATING */}

                    <div className="home3-testimonials-rating">

                        <strong>
                            4.9/5
                        </strong>

                        <Stars small />

                        <strong>
                            Over 4200 Reviews
                        </strong>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home3Testimonials;