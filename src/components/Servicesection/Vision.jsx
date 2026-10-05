import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowUpRight,
    Palette,
    Plug,
    Activity,
    Command,
    CircleDollarSign,
    BatteryCharging,
} from "lucide-react";

import "./Vision.css";

import m1 from "../../assets/Heroimages/m1.jpg";
import m2 from "../../assets/Heroimages/m2.jpg";
import m3 from "../../assets/Heroimages/m3.jpg";

import p1 from "../../assets/Servicesimages/p1.jpg";
import p2 from "../../assets/Servicesimages/p2.jpg";
import p3 from "../../assets/Servicesimages/p3.jpg";

const services = [
    {
        image: m1,
        icon: Palette,
        title: "Solar Battery Storage",
        description:
            "Reliable energy storage solutions that store excess solar power for use & electricity bills.",
        path: "/services/solar-battery-storage",
    },
    {
        image: m2,
        icon: Plug,
        title: "Residential Solar Solutions",
        description:
            "Custom designed solar systems for homes that help reduce electricity bills, etc.",
        path: "/services/residential-solar-solutions",
    },
    {
        image: m3,
        icon: Activity,
        title: "Solar System Maintenance",
        description:
            "Regular inspection, cleaning & performance checks to ensure your solar system.",
        path: "/services/solar-system-maintenance",
    },
    {
        image: p1,
        icon: Command,
        title: "Rooftop Solar Solutions",
        description:
            "Space efficient rooftop systems designed to maximize energy .",
        path: "/services/rooftop-solar-solutions",
    },
    {
        image: p2,
        icon: CircleDollarSign,
        title: "Solar Panel Maintenance",
        description:
            "Regular system checks, performance and monitoring maintenance.",
        path: "/services/solar-panel-maintenance",
    },
    {
        image: p3,
        icon: BatteryCharging,
        title: "Hybrid Solar Systems",
        description:
            "A smart combination of solar, & battery storage to ensure reliable power.",
        path: "/services/hybrid-solar-systems",
    },
];

const Vision = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`vision-section ${visible ? "vision-visible" : ""}`}
        >
            <div className="vision-container">
                <div className="vision-grid">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <article
                                className="vision-card"
                                key={service.title}
                                style={{
                                    "--card-delay": `${index * 0.12}s`,
                                }}
                            >
                                {/* IMAGE CLICK */}
                                <Link
                                    to={service.path}
                                    className="vision-image-link"
                                    aria-label={`View ${service.title}`}
                                >
                                    <div className="vision-image-wrapper">
                                        <div className="vision-image-reveal">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="vision-image"
                                            />
                                        </div>

                                        <div className="vision-icon">
                                            <Icon
                                                size={25}
                                                strokeWidth={2}
                                            />
                                        </div>
                                    </div>
                                </Link>

                                <div className="vision-content">
                                    <h3>{service.title}</h3>

                                    <p>{service.description}</p>

                                    <div className="vision-divider"></div>

                                    {/* LEARN MORE + ARROW CLICK */}
                                    <Link
                                        to={service.path}
                                        className="vision-link"
                                        aria-label={`Learn more about ${service.title}`}
                                    >
                                        <span>Learn More</span>

                                        <span className="vision-arrow">
                                            <ArrowUpRight
                                                size={17}
                                                strokeWidth={2.2}
                                            />
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Vision;