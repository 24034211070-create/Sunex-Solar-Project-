import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    ArrowUpRight,
    CheckCircle2,
    ChevronDown,
    Headphones,
    BatteryCharging,
    ShieldCheck,
    Zap,
    Activity,
} from "lucide-react";

import "./Servicesdetail.css";

import q1 from "../../assets/Aboutimages/q1.png";

import m1 from "../../assets/Heroimages/m1.jpg";
import m2 from "../../assets/Heroimages/m2.jpg";
import m3 from "../../assets/Heroimages/m3.jpg";

import p1 from "../../assets/Servicesimages/p1.jpg";
import p2 from "../../assets/Servicesimages/p2.jpg";
import p3 from "../../assets/Servicesimages/p3.jpg";

import p4 from "../../assets/Servicesimages/p4.jpg";
import p5 from "../../assets/Servicesimages/p5.jpg";
import Services from "../Home1/Services";


/* =====================================================
   ALL SERVICES
===================================================== */

const services = [
    {
        name: "Solar Battery Storage",
        path: "/services/solar-battery-storage",
        image: m1,
    },
    {
        name: "Residential Solar Solutions",
        path: "/services/residential-solar-solutions",
        image: m2,
    },
    {
        name: "Solar System Maintenance",
        path: "/services/solar-system-maintenance",
        image: m3,
    },
    {
        name: "Rooftop Solar Solutions",
        path: "/services/rooftop-solar-solutions",
        image: p1,
    },
    {
        name: "Solar Panel Maintenance",
        path: "/services/solar-panel-maintenance",
        image: p2,
    },
    {
        name: "Hybrid Solar Systems",
        path: "/services/hybrid-solar-systems",
        image: p3,
    },
];


/* =====================================================
   FAQ
===================================================== */

const faqData = [
    "Is solar energy suitable for my home or business?",
    "What happens if I generate more power than I use?",
    "Are there government subsidies or incentives available?",
    "What maintenance does a solar system require?",
    "Does solar work during cloudy days or at night?",
];


const Servicesdetail = () => {

    const location = useLocation();

    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroBgRef = useRef(null);

    const [openFaq, setOpenFaq] = useState(null);


    /* =====================================================
       CURRENT SERVICE
    ===================================================== */

    const currentService =
        services.find(
            (service) =>
                service.path === location.pathname
        ) || services[0];


    /* =====================================================
       CURRENT SERVICE INDEX
    ===================================================== */

    const currentServiceIndex =
        services.findIndex(
            (service) =>
                service.path === location.pathname
        );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    useEffect(() => {

        const page = pageRef.current;

        if (!page) return;

        const elements =
            page.querySelectorAll(".sb-animate");

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "sb-visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px",
                }
            );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () =>
            observer.disconnect();

    }, [location.pathname]);


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    useEffect(() => {

        const handleScroll = () => {

            if (
                !heroRef.current ||
                !heroBgRef.current
            ) {
                return;
            }

            const rect =
                heroRef.current.getBoundingClientRect();

            if (
                rect.bottom > 0 &&
                rect.top < window.innerHeight
            ) {

                const movement =
                    rect.top * -0.18;

                heroBgRef.current.style.transform =
                    `translate3d(0, ${movement}px, 0) scale(1.08)`;

            }

        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        handleScroll();

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, [location.pathname]);


    return (
        <div
            className="solar-battery-page"
            ref={pageRef}
        >

            {/* =================================================
                HERO
            ================================================= */}

            <section
                className="sb-hero"
                ref={heroRef}
            >

                <div
                    className="sb-hero-bg"
                    ref={heroBgRef}
                    style={{
                        backgroundImage:
                            `url(${q1})`,
                    }}
                />

                <div className="sb-hero-overlay" />

                <div className="sb-hero-content sb-animate">

                    <h1>
                        {currentService.name}
                    </h1>

                    <div className="sb-breadcrumb">

                        <span>Home</span>

                        <b>/</b>

                        <span>Services</span>

                        <b>/</b>

                        <span>
                            {currentService.name}
                        </span>

                    </div>

                </div>

            </section>


            {/* =================================================
                MAIN
            ================================================= */}

            <section className="sb-layout">


                {/* =================================================
                    LEFT SIDEBAR
                ================================================= */}

                <aside className="sb-sidebar">

                    <div className="sb-service-menu sb-animate">

                        <div className="sb-menu-title">
                            Explore Our Services
                        </div>

                        <div className="sb-menu-list">

                            {services.map(
                                (service, index) => {

                                    const isActive =
                                        index ===
                                        currentServiceIndex;

                                    return (

                                        <Link
                                            key={service.path}
                                            to={service.path}
                                            className={`sb-service-item ${isActive
                                                ? "sb-active"
                                                : ""
                                                }`}
                                        >

                                            <span>
                                                {service.name}
                                            </span>

                                            <ArrowUpRight
                                                size={19}
                                                strokeWidth={2}
                                            />

                                        </Link>

                                    );

                                }
                            )}

                        </div>

                    </div>


                    {/* =================================================
                        CONTACT CARD
                    ================================================= */}

                    <div className="sb-contact-card sb-animate">

                        <div className="sb-contact-top">

                            <div className="sb-contact-icon">

                                <Headphones
                                    size={27}
                                />

                            </div>

                            <BatteryCharging
                                className="sb-contact-battery"
                                size={42}
                            />

                        </div>

                        <h3>
                            Contact Us For a Quote
                        </h3>

                        <div className="sb-contact-line" />

                        <p>
                            Installed by certified
                            professionals who follow
                            strict safety standards.
                        </p>

                        <h4>
                            Call Us: +(123) 456 - 789
                        </h4>

                    </div>

                </aside>


                {/* =================================================
                    RIGHT CONTENT
                ================================================= */}

                <main className="sb-content">


                    {/* =================================================
                        IMAGE + INTRO
                    ================================================= */}

                    <section className="sb-intro">

                        <div className="sb-large-image sb-image-animation sb-animate">

                            <img
                                src={
                                    currentService.image
                                }
                                alt={
                                    currentService.name
                                }
                            />

                        </div>


                        <div className="sb-text-content sb-animate">

                            <p>
                                Solar Battery Storage
                                solutions allow you to
                                store excess solar energy
                                generated during the day
                                and use it whenever you
                                need it at night, during
                                peak hours, or in case of
                                power outages.
                            </p>

                            <p>
                                Our systems help you
                                maximize energy
                                independence, reduce
                                reliance on the grid,
                                and get the most value
                                from your solar
                                investment.
                            </p>

                            <p>
                                Take control of your energy
                                and never waste your solar
                                power again. Contact us
                                today to learn how Solar
                                Battery Storage can make
                                your energy system smarter,
                                more reliable, and more
                                cost-effective.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        WHAT WE OFFER
                    ================================================= */}

                    <section className="sb-section sb-animate">

                        <h2>
                            What we offer
                        </h2>

                        <p className="sb-description">
                            We provide high-performance
                            battery storage systems
                            designed for both residential
                            and commercial use. Our team
                            handles everything from system
                            sizing and battery selection
                            to installation, integration,
                            and long-term support.
                        </p>

                        <div className="sb-check-grid">

                            <div className="sb-check-item">

                                <CheckCircle2 />

                                <span>
                                    Improve energy
                                    independence &
                                    reliability
                                </span>

                            </div>

                            <div className="sb-check-item">

                                <CheckCircle2 />

                                <span>
                                    Backup power during
                                    grid outages
                                </span>

                            </div>

                            <div className="sb-check-item">

                                <CheckCircle2 />

                                <span>
                                    Smart energy
                                    management &
                                    monitoring
                                </span>

                            </div>

                            <div className="sb-check-item">

                                <CheckCircle2 />

                                <span>
                                    Lower electricity
                                    bills using stored
                                    energy
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        SECOND IMAGE
                    ================================================= */}

                    <section className="sb-middle-image sb-image-animation sb-animate">

                        <img
                            src={p4}
                            alt="Solar Battery System"
                        />

                    </section>


                    {/* =================================================
                        KEY BENEFITS
                    ================================================= */}

                    <section className="sb-section sb-animate">

                        <h2>
                            Our key benefits
                        </h2>

                        <p className="sb-description">
                            Our Solar Battery Storage
                            solutions are designed to
                            give you greater control over
                            your energy. By storing excess
                            solar power, you can reduce
                            your dependence on the grid,
                            protect yourself from power
                            outages, and make better use
                            of your clean energy.
                        </p>

                    </section>


                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <section className="sb-benefit-layout">

                        <div className="sb-benefit-image sb-image-animation sb-animate">

                            <img
                                src={p5}
                                alt="Solar Battery Installation"
                            />

                        </div>


                        <div className="sb-benefit-cards">

                            <div className="sb-benefit-card sb-animate">

                                <div className="sb-benefit-icon">
                                    <BatteryCharging
                                        size={25}
                                    />
                                </div>

                                <h3>
                                    Energy Independence &
                                    Reliability
                                </h3>

                                <p>
                                    Store and use your own
                                    solar power to reduce
                                    dependence on the grid.
                                </p>

                            </div>


                            <div className="sb-benefit-card sb-animate">

                                <div className="sb-benefit-icon">
                                    <Zap size={25} />
                                </div>

                                <h3>
                                    Lower Costs &
                                    Smarter Savings
                                </h3>

                                <p>
                                    Use stored solar energy
                                    during peak hours to
                                    reduce your electricity
                                    costs.
                                </p>

                            </div>


                            <div className="sb-benefit-card sb-animate">

                                <div className="sb-benefit-icon">
                                    <ShieldCheck
                                        size={25}
                                    />
                                </div>

                                <h3>
                                    Reliable Backup Power
                                </h3>

                                <p>
                                    Keep essential
                                    appliances running
                                    when the main grid
                                    goes down.
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <section className="sb-feature-grid">

                        <div className="sb-feature-card sb-animate">

                            <div className="sb-feature-icon">

                                <BatteryCharging
                                    size={25}
                                />

                            </div>

                            <h3>
                                Smart Energy Storage
                            </h3>

                            <p>
                                Store excess clean energy
                                and use it whenever your
                                home or business needs it
                                most.
                            </p>

                        </div>


                        <div className="sb-feature-card sb-animate">

                            <div className="sb-feature-icon">

                                <Activity
                                    size={25}
                                />

                            </div>

                            <h3>
                                Better Energy Monitoring
                            </h3>

                            <p>
                                Monitor energy usage and
                                battery performance with
                                smart energy management.
                            </p>

                        </div>


                        <div className="sb-feature-card sb-animate">

                            <div className="sb-feature-icon">

                                <Zap size={25} />

                            </div>

                            <h3>
                                Maximum Solar Usage
                            </h3>

                            <p>
                                Make better use of your
                                solar generation instead
                                of wasting unused power.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        FAQ
                    ================================================= */}

                    <section className="sb-faq sb-animate">

                        <h2>
                            Frequently Asked Questions
                        </h2>

                        <p className="sb-description">
                            This section is designed
                            to help you understand the
                            process, clear your doubts,
                            and make confident decisions
                            about switching to clean,
                            reliable solar power.
                        </p>

                        <div className="sb-faq-list">

                            {faqData.map(
                                (question, index) => {

                                    const isOpen =
                                        openFaq === index;

                                    return (

                                        <div
                                            className={`sb-faq-item ${isOpen
                                                ? "sb-faq-open"
                                                : ""
                                                }`}
                                            key={question}
                                        >

                                            <button
                                                className="sb-faq-question"
                                                onClick={() =>
                                                    setOpenFaq(
                                                        isOpen
                                                            ? null
                                                            : index
                                                    )
                                                }
                                            >

                                                <span>
                                                    {index + 1}.
                                                    {" "}
                                                    {question}
                                                </span>

                                                <span className="sb-faq-arrow">

                                                    <ChevronDown
                                                        size={18}
                                                    />

                                                </span>

                                            </button>


                                            <div className="sb-faq-answer">

                                                <p>
                                                    Our solar
                                                    specialists
                                                    can provide
                                                    detailed
                                                    information
                                                    based on your
                                                    property,
                                                    energy usage,
                                                    system size
                                                    and
                                                    requirements.
                                                    Contact our
                                                    team for a
                                                    personalized
                                                    answer.
                                                </p>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    </section>


                    {/* =================================================
                        CTA
                    ================================================= */}

                    <section className="sb-cta sb-animate">

                        <div>

                            <span>
                                GO SOLAR
                            </span>

                            <h2>
                                Take control of your
                                energy today.
                            </h2>

                            <p>
                                Discover a smarter way
                                to store, manage and use
                                your solar power.
                            </p>

                        </div>

                        <button>
                            Get Started
                            <ArrowUpRight size={20} />
                        </button>

                    </section>

                </main>

            </section>

        </div>
    );
};

export default Servicesdetail;