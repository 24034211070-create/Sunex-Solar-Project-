import React, { useEffect, useRef, useState } from "react";
import "./Services.css";

import { getPages } from "../../Api/api";

import avatar1 from "../../assets/Solarimage/avatar1.png";

import m1 from "../../assets/Heroimages/m1.jpg";
import m2 from "../../assets/Heroimages/m2.jpg";
import m3 from "../../assets/Heroimages/m3.jpg";

const defaultServices = [
    {
        id: 1,
        image: m1,
        title: "Solar Battery Storage",
        description:
            "Reliable energy storage solutions that store excess solar power for use.",
        icon: "♧",
    },
    {
        id: 2,
        image: m2,
        title: "Residential Solar Solutions",
        description:
            "Custom designed solar systems for homes that help reduce electricity bills, etc.",
        icon: "⌕",
    },
    {
        id: 3,
        image: m3,
        title: "Solar System Maintenance",
        description:
            "Regular inspection, cleaning & performance checks to ensure your solar system.",
        icon: "⌁",
    },
];

const Services = () => {
    const sectionRef = useRef(null);

    const [sectionTitle, setSectionTitle] = useState(
        "Smart solar service designed for homes & businesses"
    );

    const [sectionDescription, setSectionDescription] = useState(
        "From system design and professional installation to energy storage, our smart solar solutions deliver reliable performance."
    );

    const [services, setServices] = useState(
        defaultServices
    );

    // ======================================================
    // FETCH SERVICES FROM BACKEND
    // ======================================================

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getPages();

                if (!data.success) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch pages"
                    );
                }

                const servicePage =
                    data.pages?.find(
                        (page) =>
                            page.page_name ===
                            "Home" &&
                            page.section_name ===
                            "Services"
                    );

                if (!servicePage) {
                    console.log(
                        "Home / Services data not found. Using default data."
                    );
                    return;
                }

                // ==================================================
                // SECTION TITLE
                // ==================================================

                if (servicePage.title) {
                    setSectionTitle(
                        servicePage.title
                    );
                }

                // ==================================================
                // SECTION DESCRIPTION
                // ==================================================

                if (servicePage.description) {
                    setSectionDescription(
                        servicePage.description
                    );
                }

                // ==================================================
                // SERVICE CARDS
                // ==================================================

                const savedServices =
                    servicePage.content?.services;

                if (
                    Array.isArray(
                        savedServices
                    ) &&
                    savedServices.length > 0
                ) {
                    const updatedServices =
                        savedServices.map(
                            (service, index) => ({
                                id:
                                    service.id ||
                                    index + 1,

                                title:
                                    service.title ||
                                    defaultServices[
                                        index
                                    ]?.title ||
                                    "",

                                description:
                                    service.description ||
                                    defaultServices[
                                        index
                                    ]?.description ||
                                    "",

                                image:
                                    service.image ||
                                    defaultServices[
                                        index
                                    ]?.image ||
                                    "",

                                icon:
                                    defaultServices[
                                        index
                                    ]?.icon ||
                                    "♧",
                            })
                        );

                    setServices(
                        updatedServices
                    );
                }
            } catch (error) {
                console.error(
                    "Services API error:",
                    error
                );

                // API fail hone par default
                // frontend data show hoga.
            }
        };

        fetchServices();
    }, []);

    // ======================================================
    // ANIMATION
    // ======================================================

    useEffect(() => {
        const section =
            sectionRef.current;

        if (!section) return;

        const animatedElements =
            section.querySelectorAll(
                ".services-animate"
            );

        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach(
                        (entry) => {
                            if (
                                entry.isIntersecting
                            ) {
                                entry.target.classList.add(
                                    "show"
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.08,
                }
            );

        animatedElements.forEach(
            (element) => {
                observer.observe(element);
            }
        );

        return () =>
            observer.disconnect();
    }, []);

    // ======================================================
    // IMAGE HANDLER
    // ======================================================

    const getServiceImage = (
        service,
        index
    ) => {
        if (!service.image) {
            return (
                defaultServices[index]
                    ?.image || m1
            );
        }

        /*
         * Agar database mein purane local
         * asset paths saved hain to original
         * imported images use karenge.
         */

        if (
            service.image.includes(
                "Heroimages/m1"
            )
        ) {
            return m1;
        }

        if (
            service.image.includes(
                "Heroimages/m2"
            )
        ) {
            return m2;
        }

        if (
            service.image.includes(
                "Heroimages/m3"
            )
        ) {
            return m3;
        }

        /*
         * Agar admin ne future mein koi
         * public URL/path diya hai to
         * directly use hoga.
         */

        return service.image;
    };

    return (
        <section
            className="services-section"
            ref={sectionRef}
        >
            {/* Background decoration */}

            <div className="services-bg-decoration services-bg-left"></div>

            <div className="services-bg-decoration services-bg-right"></div>

            <div className="services-container">

                {/* ================= HEADER ================= */}

                <div className="services-header">

                    <div className="services-heading animate-left services-animate">

                        <div className="services-label">
                            <span></span>
                            Our Services
                        </div>

                        <h2>
                            {sectionTitle}
                        </h2>

                    </div>

                    <div className="services-intro animate-right services-animate">

                        <p>
                            {sectionDescription}
                        </p>

                        <button
                            type="button"
                            className="view-services-btn"
                        >
                            <span>
                                View All Services
                            </span>

                            <span className="view-arrow">
                                ↗
                            </span>
                        </button>

                    </div>

                </div>

                {/* ================= SERVICES ================= */}

                <div className="services-grid">

                    {services.map(
                        (service, index) => (
                            <article
                                className={`service-card services-animate card-${index + 1}`}
                                key={
                                    service.id ||
                                    index
                                }
                            >

                                {/* IMAGE */}

                                <div className="service-image">

                                    <img
                                        src={getServiceImage(
                                            service,
                                            index
                                        )}
                                        alt={
                                            service.title
                                        }
                                        draggable="false"
                                    />

                                    <div className="service-icon">
                                        {service.icon}
                                    </div>

                                </div>

                                {/* CONTENT */}

                                <div className="service-content">

                                    <h3>
                                        {
                                            service.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            service.description
                                        }
                                    </p>

                                    <div className="service-line"></div>

                                    <button
                                        type="button"
                                        className="learn-more-btn"
                                    >
                                        <span>
                                            Learn More
                                        </span>

                                        <span className="learn-arrow">
                                            ↗
                                        </span>
                                    </button>

                                </div>

                            </article>
                        )
                    )}

                </div>

                {/* ================= BOTTOM ================= */}

                <div className="services-bottom services-animate">

                    <div className="services-trust">

                        <div className="trust-header">
                        <div className="trust-avatar">

                            <img
                                src={avatar1}
                                alt="Customer"
                            />

                        </div>

                        <div className="trust-icon">
                            ↗
                        </div>
                        </div>

                        <p>
                            From your first
                            consultation to
                            years of clean
                            energy –

                            <strong>
                                {" "}
                                We Build Solar
                                Confidence That
                                Lasts
                            </strong>
                        </p>

                    </div>

                    <div className="services-rating">

                        <span className="rating">
                            4.9
                        </span>

                        <span className="rating-stars">
                            ★★★★★
                        </span>

                        <span className="review-text">
                            Over 2000 Reviews
                        </span>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Services;