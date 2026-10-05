import React from "react";
import { ArrowUpRight, BatteryCharging, Sun, CircleUserRound, Phone } from "lucide-react";

import s5 from "../../assets/Home2/s5.png";
import s6 from "../../assets/Home2/s6.png";
import s7 from "../../assets/Home2/s7.png";



import "./Home2Services.css";

const Home2Services = () => {

    const services = [
        {
            image: s5,
            title: "Rooftop Solar Solutions",
            description:
                "Efficient rooftop solar systems designed to reduce energy costs.",
            icon: <CircleUserRound size={25} strokeWidth={1.7} />
        },
        {
            image: s6,
            title: "Solar Battery Storage",
            description:
                "Efficient rooftop solar systems designed to reduce energy costs.",
            icon: <Sun size={25} strokeWidth={1.7} />
        },
        {
            image: s7,
            title: "Hybrid Solar Systems",
            description:
                "Efficient rooftop solar systems designed to reduce energy costs.",
            icon: <Sun size={25} strokeWidth={1.7} />
        }
    ];

    return (
        <section className="home2-services">

            {/* BACKGROUND DECORATION */}
            <div className="home2-services-bg"></div>

            <div className="home2-services-container">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="home2-services-header">

                    <div className="home2-services-badge">
                        <span></span>
                        Our Services
                    </div>

                    <h2>
                        Advanced solar services for
                        <br />
                        sustainable living
                    </h2>

                </div>


                {/* =========================================
                    SERVICE CARDS
                ========================================= */}

                <div className="home2-service-grid">

                    {services.map((service, index) => (

                        <div
                            className="home2-service-card"
                            key={index}
                        >

                            {/* IMAGE */}
                            <div className="home2-service-image">

                                <img
                                    src={service.image}
                                    alt={service.title}
                                />

                                <div className="home2-service-overlay"></div>

                            </div>


                            {/* CONTENT */}
                            <div className="home2-service-content">

                                {/* ICON */}
                                <div className="home2-service-icon">
                                    {service.icon}
                                </div>


                                <h3>
                                    {service.title}
                                </h3>


                                <p>
                                    {service.description}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =========================================
                    BOTTOM SERVICE CTA
                ========================================= */}

                <div className="home2-services-bottom">

                    <div className="home2-services-person">

                        {/* AVATAR */}
                        <div className="home2-services-avatar">
                            <span>👨🏻‍💼</span>
                        </div>


                        {/* PHONE */}
                        <div className="home2-services-phone">
                            <Phone size={18} />
                        </div>

                    </div>


                    <p>
                        See how our solar services deliver smarter
                        energy solutions –

                        <a href="/services">
                            View All Services
                        </a>
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Home2Services;