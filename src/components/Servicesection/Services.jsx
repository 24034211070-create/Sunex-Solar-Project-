import React, { useEffect, useState } from "react";
import "./Services.css";

import q1 from "../../assets/Aboutimages/q1.png";
import api from "../../Api/axios";

// FILES IMPORT
import Vision from "../Servicesection/Vision";
import SolarFeature from "../Home1/SolarFeature";
import WhyChooseUs from "../Home1/WhyChooseUs";
import Testi from "../Home1/Testi";
import Faq from "../Home1/Faq";
import States from "../Home1/States";

const Services = () => {
    const [hero, setHero] = useState({
        title: "Our Services",
        image: "",
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Services",
    });

    useEffect(() => {
        loadHero();
    }, []);

    const loadHero = async () => {
        try {
            const response = await api.get("/pages");

            const pages = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.pages)
                    ? response.data.pages
                    : [];

            const servicesHero = pages.find(
                (page) =>
                    String(page.pageName || "")
                        .trim()
                        .toLowerCase() === "services" &&
                    String(page.sectionName || "")
                        .trim()
                        .toLowerCase() === "hero"
            );

            if (servicesHero) {
                const content = servicesHero.content || {};

                setHero({
                    title: servicesHero.title || "Our Services",
                    image: servicesHero.image || "",
                    breadcrumbHome:
                        content.breadcrumb_home || "Home",
                    breadcrumbCurrent:
                        content.breadcrumb_current || "Services",
                });
            }
        } catch (error) {
            console.error("SERVICES HERO LOAD ERROR:", error);
        }
    };

    const heroBackground = hero.image || q1;

    return (
        <main>
            {/* ================= SERVICES HERO ================= */}
            <section
                className="about-hero"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                }}
            >
                <div className="about-hero-overlay"></div>

                <div className="about-hero-content">
                    <div className="about-title-wrap">
                        <h1>{hero.title}</h1>
                    </div>

                    <div className="about-line"></div>

                    <div className="about-breadcrumb-wrap">
                        <p>
                            <span>{hero.breadcrumbHome}</span>
                            <b>/</b>
                            <span>{hero.breadcrumbCurrent}</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES SECTIONS ================= */}

            <Vision />

            {/* Already managed from Home 1 */}
            <SolarFeature />
            <WhyChooseUs />
            <Testi />
            <Faq />
            <States />
        </main>
    );
};

export default Services;