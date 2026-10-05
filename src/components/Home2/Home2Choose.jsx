import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone, ShieldCheck, BadgeDollarSign, } from "lucide-react";
import "./Home2Choose.css";
import sh9 from "../../assets/Home2/sh9.png";
const HomeV2 = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    // Animation sirf ek baar chalegi
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`home-v2 ${isVisible ? "home-v2-visible" : ""
                }`}
        >
            <div className="home-v2-container">

                {/* ================= LEFT IMAGE ================= */}

                <div className="home-v2-image-wrapper">
                    <div className="home-v2-image-circle">
                        <img
                            src={sh9}
                            alt="Solar panels installed on a modern home"
                            className="home-v2-image"
                        />
                    </div>
                </div>


                {/* ================= RIGHT CONTENT ================= */}

                <div className="home-v2-content">

                    {/* Badge */}

                    <div className="home-v2-badge">
                        <span className="home-v2-badge-dot"></span>

                        <span>Why Choose Us</span>
                    </div>


                    {/* Heading */}

                    <h2 className="home-v2-title">
                        Why homeowners choose
                        <br />
                        our solar services
                    </h2>


                    {/* Description */}

                    <p className="home-v2-description">
                        Our certified and experienced installers handle every project
                        with care, ensuring safe installation, clean workmanship, and
                        minimal disruption to your home.
                    </p>


                    {/* ================= FEATURES ================= */}

                    <div className="home-v2-features">

                        {/* Feature 1 */}

                        <div className="home-v2-feature">

                            <div className="home-v2-feature-top">

                                <div className="home-v2-icon">
                                    <BadgeDollarSign
                                        size={25}
                                        strokeWidth={2}
                                    />
                                </div>

                                <h3>
                                    Transparent Pricing
                                </h3>

                            </div>

                            <p>
                                Know exactly what you pay for upfront
                                <br className="desktop-break" />
                                pricing and no charges.
                            </p>

                        </div>


                        {/* Feature 2 */}

                        <div className="home-v2-feature">

                            <div className="home-v2-feature-top">

                                <div className="home-v2-icon">
                                    <ShieldCheck
                                        size={25}
                                        strokeWidth={2}
                                    />
                                </div>

                                <h3>
                                    Long-Term Warranty
                                </h3>

                            </div>

                            <p>
                                Know exactly what you pay for upfront
                                <br className="desktop-break" />
                                pricing and no charges.
                            </p>

                        </div>

                    </div>


                    {/* Divider */}

                    <div className="home-v2-divider"></div>


                    {/* ================= BOTTOM CTA ================= */}

                    <div className="home-v2-bottom">

                        {/* Button */}

                        <button className="home-v2-button">

                            <span>
                                Go Solar Today
                            </span>

                            <ArrowUpRight
                                size={20}
                                strokeWidth={2.5}
                            />

                        </button>


                        {/* Phone */}

                        <div className="home-v2-phone">

                            <div className="home-v2-phone-icon">
                                <Phone
                                    size={25}
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="home-v2-phone-info">

                                <span>
                                    Phone Number
                                </span>

                                <strong>
                                    +(123) 456-789
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default HomeV2;