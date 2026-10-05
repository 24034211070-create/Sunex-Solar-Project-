import React, { useEffect, useRef } from "react";
import {
    ArrowUpRight,
    Building2,
    Sun,
    SunMedium,
    Phone,
} from "lucide-react";

import "./Home3Services.css";

// =====================================================
// SERVICE IMAGES
// Apni actual images ke naam yahan set kar dena
// =====================================================

import b7 from "../../assets/Home3/b7.png";
import b8 from "../../assets/Home3/b8.png";
import b9 from "../../assets/Home3/b9.png";

// Avatar
import avatar from "../../assets/Solarimage/avatar1.png";


const Home3Services = () => {

    const sectionRef = useRef(null);

    useEffect(() => {

        const section = sectionRef.current;

        if (!section) return;

        const elements = section.querySelectorAll(".h3-service-reveal");

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("h3-service-show");
                    }

                });

            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };

    }, []);


    const services = [
        {
            image: b7,
            icon: <Building2 size={27} strokeWidth={1.8} />,
            title: "Residential Solar Solutions",
            description:
                "Customized rooftop solar systems that help homeowners reduce electricity bills while using clean and renewable energy.",
        },

        {
            image: b8,
            icon: <Sun size={27} strokeWidth={1.8} />,
            title: "Solar Panel Maintenance",
            description:
                "Scalable solar power systems for offices, retail spaces, hospitals, and institutions, helping reduce operational costs",
        },

        {
            image: b9,
            icon: <SunMedium size={27} strokeWidth={1.8} />,
            title: "Hybrid Solar Systems",
            description:
                "High-capacity solar installations for factories & large facilities, ensuring energy reliability & reduced dependence",
        },
    ];


    return (

        <section
            className="home3-services"
            ref={sectionRef}
        >

            <div className="home3-services-bg"></div>


            <div className="home3-services-container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="home3-services-header h3-service-reveal">

                    <div className="home3-services-badge">
                        <span></span>
                        Our Services
                    </div>


                    <h2>
                        Comprehensive solar solutions
                        <br />
                        for every energy need
                    </h2>

                </div>


                {/* =================================================
                    SERVICE CARDS
                ================================================= */}

                <div className="home3-services-grid">

                    {services.map((service, index) => (

                        <article
                            className={`home3-service-card h3-service-reveal service-delay-${index}`}
                            key={service.title}
                        >

                            {/* IMAGE */}

                            <div className="home3-service-image">

                                <img
                                    src={service.image}
                                    alt={service.title}
                                />

                            </div>


                            {/* ICON */}

                            <div className="home3-service-icon">

                                {service.icon}

                            </div>


                            {/* CONTENT */}

                            <div className="home3-service-content">

                                <h3>
                                    {service.title}
                                </h3>


                                <p>
                                    {service.description}
                                </p>


                                <button
                                    type="button"
                                    className="home3-learn-btn"
                                >

                                    <span>
                                        Learn More
                                    </span>

                                    <span className="home3-learn-arrow">
                                        <ArrowUpRight
                                            size={16}
                                            strokeWidth={2.2}
                                        />
                                    </span>

                                </button>

                            </div>

                        </article>

                    ))}

                </div>


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <div className="home3-services-bottom h3-service-reveal">

                    <div className="home3-installation">

                        <div className="home3-install-avatar">

                            <img
                                src={avatar}
                                alt=""
                            />

                            <span>
                                <Phone
                                    size={16}
                                    strokeWidth={2}
                                />
                            </span>

                        </div>


                        <p>
                            Where smart solar design meets powerful clean
                            energy results –

                            <a href="#installation">
                                Get Installation Now
                            </a>
                        </p>

                    </div>


                    {/* REVIEWS */}

                    <div className="home3-review">

                        <strong>
                            4.9/5
                        </strong>


                        <div className="home3-stars">
                            ★★★★★
                        </div>


                        <strong>
                            Over 4200 Reviews
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                FLOATING BUY BUTTON
            ================================================= */}

            <button
                type="button"
                className="home3-buy-button"
            >

                <span>
                    🛒
                </span>

                Buy Now

            </button>

        </section>

    );
};


export default Home3Services;