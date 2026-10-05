import React, { useEffect, useState } from "react";
import "./Home2Testimonials.css";

import s19 from "../../assets/Home2/s19.png";
import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";
import avatar4 from "../../assets/Solarimage/avatar4.png";

const testimonials = [
    {
        name: "Priya Singh",
        role: "Property Owner",
        avatar: avatar1,
        review:
            '"The entire process was smooth and professional. The team explained everything clearly, and the installation was completed perfectly. Our electricity bills have reduced significantly."',
    },
    {
        name: "Rahul Sharma",
        role: "Home Owner",
        avatar: avatar2,
        review:
            '"The solar installation was handled professionally from start to finish. The team was very helpful and explained every step clearly."',
    },
    {
        name: "Nisha Mehta",
        role: "Business Owner",
        avatar: avatar3,
        review:
            '"Excellent service and great support. Our energy bills have reduced significantly after switching to solar energy."',
    },
    {
        name: "Anita Patel",
        role: "Property Owner",
        avatar: avatar4,
        review:
            '"A very smooth experience with a knowledgeable team. The installation quality and after-sales support have been excellent."',
    },
];

const Home2Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [reviewChanging, setReviewChanging] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector(".home2-testimonials");

        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            changeReview((currentIndex + 1) % testimonials.length);
        }, 4500);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const changeReview = (nextIndex) => {
        setReviewChanging(true);

        setTimeout(() => {
            setCurrentIndex(nextIndex);
            setReviewChanging(false);
        }, 350);
    };

    const previousReview = () => {
        const nextIndex =
            (currentIndex - 1 + testimonials.length) % testimonials.length;

        changeReview(nextIndex);
    };

    const nextReview = () => {
        const nextIndex = (currentIndex + 1) % testimonials.length;

        changeReview(nextIndex);
    };

    const activeReview = testimonials[currentIndex];

    return (
        <section
            className={`home2-testimonials ${visible ? "testimonial-visible" : ""
                }`}
            style={{
                "--testimonial-bg": `url(${s19})`,
            }}
        >
            {/* Animated Background */}
            <div className="testimonial-background"></div>

            {/* Dark Overlay */}
            <div className="testimonial-overlay"></div>

            <div className="testimonial-container">

                {/* LEFT SIDE */}
                <div className="testimonial-left">

                    <div className="testimonial-badge testimonial-reveal">
                        <span></span>
                        Our Testimonials
                    </div>

                    <h2 className="testimonial-title testimonial-reveal">
                        Real reviews from happy
                        <br />
                        customers
                    </h2>

                    <p className="testimonial-description testimonial-reveal">
                        Read genuine feedback from customers who trust our solar
                        solutions for reliable performance and long-term savings.
                    </p>

                    <button className="testimonial-button testimonial-reveal">
                        <span>View All Reviews</span>
                        <span className="testimonial-button-arrow">↗</span>
                    </button>

                    <div className="testimonial-customers testimonial-reveal">
                        <div className="customer-avatars">

                            <div className="customer-avatar">
                                <img src={avatar1} alt="Customer" />
                            </div>

                            <div className="customer-avatar">
                                <img src={avatar2} alt="Customer" />
                            </div>

                            <div className="customer-avatar">
                                <img src={avatar3} alt="Customer" />
                            </div>

                            <div className="customer-plus">+</div>

                        </div>

                        <p>
                            Join 5K+ Customers Switching
                            <br />
                            to Solar Today
                        </p>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="testimonial-right testimonial-reveal-right">

                    {/* CARD NEVER REMOUNTS / NEVER SLIDES */}
                    <div className="testimonial-card">

                        <div className="testimonial-stars">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>

                        <h3>Trusted Solar Experts</h3>

                        {/* ONLY REVIEW CONTENT SLIDES */}
                        <div
                            className={`testimonial-review-content ${reviewChanging
                                ? "review-changing"
                                : ""
                                }`}
                        >
                            <p className="testimonial-review">
                                {activeReview.review}
                            </p>
                        </div>

                        <div className="testimonial-quotes">
                            <span>“</span>
                            <span>”</span>
                        </div>

                        <div className="testimonial-card-divider"></div>

                        <div className="testimonial-user">

                            <div className="testimonial-user-info">

                                <div className="testimonial-user-avatar">
                                    <img
                                        src={activeReview.avatar}
                                        alt={activeReview.name}
                                    />
                                </div>

                                <div>
                                    <h4>{activeReview.name}</h4>
                                    <p>{activeReview.role}</p>
                                </div>

                            </div>

                            <div className="testimonial-arrows">

                                <button
                                    type="button"
                                    onClick={previousReview}
                                    aria-label="Previous review"
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    onClick={nextReview}
                                    aria-label="Next review"
                                >
                                    →
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home2Testimonials;