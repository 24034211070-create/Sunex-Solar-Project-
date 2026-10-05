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

import api from "../../Api/axios";
import "./SolarBattery.css";

import q1 from "../../assets/Aboutimages/q1.png";

import m1 from "../../assets/Heroimages/m1.jpg";
import m2 from "../../assets/Heroimages/m2.jpg";
import m3 from "../../assets/Heroimages/m3.jpg";

import p1 from "../../assets/Servicesimages/p1.jpg";
import p2 from "../../assets/Servicesimages/p2.jpg";
import p3 from "../../assets/Servicesimages/p3.jpg";

import p4 from "../../assets/Servicesimages/p4.jpg";
import p5 from "../../assets/Servicesimages/p5.jpg";

/* =====================================================
   ALL SERVICES
===================================================== */

const services = [
    {
        name: "Solar Battery Storage",
        slug: "solar-battery-storage",
        path: "/services/solar-battery-storage",
        image: m1,
    },
    {
        name: "Residential Solar Solutions",
        slug: "residential-solar-solutions",
        path: "/services/residential-solar-solutions",
        image: m2,
    },
    {
        name: "Solar System Maintenance",
        slug: "solar-system-maintenance",
        path: "/services/solar-system-maintenance",
        image: m3,
    },
    {
        name: "Rooftop Solar Solutions",
        slug: "rooftop-solar-solutions",
        path: "/services/rooftop-solar-solutions",
        image: p1,
    },
    {
        name: "Solar Panel Maintenance",
        slug: "solar-panel-maintenance",
        path: "/services/solar-panel-maintenance",
        image: p2,
    },
    {
        name: "Hybrid Solar Systems",
        slug: "hybrid-solar-systems",
        path: "/services/hybrid-solar-systems",
        image: p3,
    },
];

/* =====================================================
   DEFAULT DATA
===================================================== */

const getDefaultData = (service) => ({
    serviceSlug: service.slug,

    hero: {
        title: service.name,
        image: "",
    },

    intro: {
        image: "",
        paragraphs: ["", "", ""],
    },

    whatWeOffer: {
        heading: "What we offer",
        description: "",
        items: ["", "", "", ""],
    },

    middleImage: "",

    keyBenefits: {
        heading: "Our key benefits",
        description: "",
    },

    benefits: {
        image: "",
        items: [
            {
                title: "",
                description: "",
            },
            {
                title: "",
                description: "",
            },
            {
                title: "",
                description: "",
            },
        ],
    },

    features: [
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },
    ],

    faq: {
        heading: "Frequently Asked Questions",
        description: "",
        items: [
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
        ],
    },

    cta: {
        badge: "GO SOLAR",
        heading: "Take control of your energy today.",
        description: "",
        buttonText: "Get Started",
        buttonLink: "#contact",
    },
});

/* =====================================================
   IMAGE HELPER
===================================================== */

const imageMap = {
    "/src/assets/Heroimages/m1.jpg": m1,
    "/src/assets/Heroimages/m2.jpg": m2,
    "/src/assets/Heroimages/m3.jpg": m3,

    "/src/assets/Servicesimages/p1.jpg": p1,
    "/src/assets/Servicesimages/p2.jpg": p2,
    "/src/assets/Servicesimages/p3.jpg": p3,
    "/src/assets/Servicesimages/p4.jpg": p4,
    "/src/assets/Servicesimages/p5.jpg": p5,

    "/src/assets/Aboutimages/q1.png": q1,
};

const getImage = (image, fallback = "") => {
    if (!image) return fallback;

    if (imageMap[image]) {
        return imageMap[image];
    }

    return image;
};

/* =====================================================
   SAFE ARRAY
===================================================== */

const safeArray = (value, length = 0) => {
    if (Array.isArray(value)) return value;

    return Array.from({ length }, () => "");
};

/* =====================================================
   COMPONENT
===================================================== */

const SolarBattery = () => {
    const location = useLocation();

    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const heroBgRef = useRef(null);

    const [openFaq, setOpenFaq] = useState(null);
    const [cmsData, setCmsData] = useState(null);
    const [loading, setLoading] = useState(true);

    /* =====================================================
       CURRENT SERVICE
    ===================================================== */

    const currentService =
        services.find(
            (service) => service.path === location.pathname
        ) || services[0];

    /* =====================================================
       CURRENT SERVICE INDEX
    ===================================================== */

    const currentServiceIndex =
        services.findIndex(
            (service) => service.path === location.pathname
        );

    /* =====================================================
       LOAD CMS DATA
    ===================================================== */

    useEffect(() => {
        const loadServiceData = async () => {
            try {
                setLoading(true);

                const response = await api.get("/pages");

                const pages = Array.isArray(response.data)
                    ? response.data
                    : response.data?.pages || [];

                const page = pages.find(
                    (item) =>
                        item.pageName?.toLowerCase() ===
                        "services inner" &&
                        item.content?.serviceSlug ===
                        currentService.slug
                );

                if (page?.content) {
                    const defaults = getDefaultData(currentService);

                    setCmsData({
                        ...defaults,
                        ...page.content,
                        hero: {
                            ...defaults.hero,
                            ...(page.content.hero || {}),
                        },
                        intro: {
                            ...defaults.intro,
                            ...(page.content.intro || {}),
                        },
                        whatWeOffer: {
                            ...defaults.whatWeOffer,
                            ...(page.content.whatWeOffer || {}),
                        },
                        keyBenefits: {
                            ...defaults.keyBenefits,
                            ...(page.content.keyBenefits || {}),
                        },
                        benefits: {
                            ...defaults.benefits,
                            ...(page.content.benefits || {}),
                        },
                        faq: {
                            ...defaults.faq,
                            ...(page.content.faq || {}),
                        },
                        cta: {
                            ...defaults.cta,
                            ...(page.content.cta || {}),
                        },
                    });
                } else {
                    setCmsData(getDefaultData(currentService));
                }
            } catch (error) {
                console.error(
                    "SERVICE INNER PAGE LOAD ERROR:",
                    error
                );

                setCmsData(getDefaultData(currentService));
            } finally {
                setLoading(false);
            }
        };

        loadServiceData();
    }, [currentService.slug]);

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

        return () => {
            observer.disconnect();
        };
    }, [location.pathname, cmsData]);

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
                const movement = rect.top * -0.18;

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
    }, [location.pathname, cmsData]);

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading || !cmsData) {
        return (
            <div className="solar-battery-page">
                <div
                    style={{
                        minHeight: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                    }}
                >
                    Loading service...
                </div>
            </div>
        );
    }

    /* =====================================================
       CMS DATA
    ===================================================== */

    const heroTitle =
        cmsData.hero?.title ||
        currentService.name;

    const heroImage =
        getImage(
            cmsData.hero?.image,
            q1
        );

    const introImage =
        getImage(
            cmsData.intro?.image,
            currentService.image
        );

    const middleImage =
        getImage(
            cmsData.middleImage,
            p4
        );

    const benefitsImage =
        getImage(
            cmsData.benefits?.image,
            p5
        );

    const introParagraphs =
        safeArray(
            cmsData.intro?.paragraphs,
            3
        );

    const offerItems =
        safeArray(
            cmsData.whatWeOffer?.items,
            4
        );

    const benefitItems =
        Array.isArray(cmsData.benefits?.items)
            ? cmsData.benefits.items
            : [];

    const featureItems =
        Array.isArray(cmsData.features)
            ? cmsData.features
            : [];

    const faqItems =
        Array.isArray(cmsData.faq?.items)
            ? cmsData.faq.items
            : [];

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
                            `url(${heroImage})`,
                    }}
                />

                <div className="sb-hero-overlay" />

                <div className="sb-hero-content sb-animate">

                    <h1>
                        {heroTitle}
                    </h1>

                    <div className="sb-breadcrumb">

                        <span>
                            Home
                        </span>

                        <b>/</b>

                        <span>
                            Services
                        </span>

                        <b>/</b>

                        <span>
                            {heroTitle}
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
                                src={introImage}
                                alt={heroTitle}
                            />

                        </div>

                        <div className="sb-text-content sb-animate">

                            {introParagraphs.map(
                                (paragraph, index) => (
                                    paragraph && (
                                        <p key={index}>
                                            {paragraph}
                                        </p>
                                    )
                                )
                            )}

                        </div>

                    </section>

                    {/* =================================================
                        WHAT WE OFFER
                    ================================================= */}

                    <section className="sb-section sb-animate">

                        <h2>
                            {cmsData.whatWeOffer?.heading ||
                                "What we offer"}
                        </h2>

                        <p className="sb-description">
                            {cmsData.whatWeOffer?.description}
                        </p>

                        <div className="sb-check-grid">

                            {offerItems.map(
                                (item, index) => (
                                    item && (
                                        <div
                                            className="sb-check-item"
                                            key={index}
                                        >
                                            <CheckCircle2 />

                                            <span>
                                                {item}
                                            </span>
                                        </div>
                                    )
                                )
                            )}

                        </div>

                    </section>

                    {/* =================================================
                        SECOND IMAGE
                    ================================================= */}

                    <section className="sb-middle-image sb-image-animation sb-animate">

                        <img
                            src={middleImage}
                            alt={heroTitle}
                        />

                    </section>

                    {/* =================================================
                        KEY BENEFITS
                    ================================================= */}

                    <section className="sb-section sb-animate">

                        <h2>
                            {cmsData.keyBenefits?.heading ||
                                "Our key benefits"}
                        </h2>

                        <p className="sb-description">
                            {cmsData.keyBenefits?.description}
                        </p>

                    </section>

                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <section className="sb-benefit-layout">

                        <div className="sb-benefit-image sb-image-animation sb-animate">

                            <img
                                src={benefitsImage}
                                alt={heroTitle}
                            />

                        </div>

                        <div className="sb-benefit-cards">

                            {benefitItems.map(
                                (benefit, index) => {

                                    const icons = [
                                        BatteryCharging,
                                        Zap,
                                        ShieldCheck,
                                    ];

                                    const Icon =
                                        icons[index] ||
                                        BatteryCharging;

                                    return (
                                        <div
                                            className="sb-benefit-card sb-animate"
                                            key={index}
                                        >

                                            <div className="sb-benefit-icon">
                                                <Icon
                                                    size={25}
                                                />
                                            </div>

                                            <h3>
                                                {benefit?.title}
                                            </h3>

                                            <p>
                                                {benefit?.description}
                                            </p>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </section>

                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <section className="sb-feature-grid">

                        {featureItems.map(
                            (feature, index) => {

                                const icons = [
                                    BatteryCharging,
                                    Activity,
                                    Zap,
                                ];

                                const Icon =
                                    icons[index] ||
                                    BatteryCharging;

                                return (
                                    <div
                                        className="sb-feature-card sb-animate"
                                        key={index}
                                    >

                                        <div className="sb-feature-icon">

                                            <Icon
                                                size={25}
                                            />

                                        </div>

                                        <h3>
                                            {feature?.title}
                                        </h3>

                                        <p>
                                            {feature?.description}
                                        </p>

                                    </div>
                                );
                            }
                        )}

                    </section>

                    {/* =================================================
                        FAQ
                    ================================================= */}

                    <section className="sb-faq sb-animate">

                        <h2>
                            {cmsData.faq?.heading ||
                                "Frequently Asked Questions"}
                        </h2>

                        <p className="sb-description">
                            {cmsData.faq?.description}
                        </p>

                        <div className="sb-faq-list">

                            {faqItems.map(
                                (item, index) => {

                                    const isOpen =
                                        openFaq === index;

                                    return (
                                        <div
                                            className={`sb-faq-item ${isOpen
                                                ? "sb-faq-open"
                                                : ""
                                                }`}
                                            key={
                                                item?.question ||
                                                index
                                            }
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
                                                    {item?.question}
                                                </span>

                                                <span className="sb-faq-arrow">

                                                    <ChevronDown
                                                        size={18}
                                                    />

                                                </span>

                                            </button>

                                            <div className="sb-faq-answer">

                                                <p>
                                                    {item?.answer}
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
                                {cmsData.cta?.badge ||
                                    "GO SOLAR"}
                            </span>

                            <h2>
                                {cmsData.cta?.heading ||
                                    "Take control of your energy today."}
                            </h2>

                            <p>
                                {cmsData.cta?.description}
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                const link =
                                    cmsData.cta?.buttonLink;

                                if (
                                    link &&
                                    link.startsWith("#")
                                ) {
                                    const element =
                                        document.querySelector(
                                            link
                                        );

                                    if (element) {
                                        element.scrollIntoView({
                                            behavior:
                                                "smooth",
                                        });
                                    }
                                } else if (link) {
                                    window.location.href =
                                        link;
                                }
                            }}
                        >
                            {cmsData.cta?.buttonText ||
                                "Get Started"}

                            <ArrowUpRight
                                size={20}
                            />
                        </button>

                    </section>

                </main>

            </section>

        </div>
    );
};

export default SolarBattery;