import React, { useEffect, useState } from "react";
import "./Pricing.css";

import { getPages } from "../../Api/api";

const DEFAULT_PRICING = {
    label: "Our Pricing Plans",
    heading: "Flexible solar pricing designed for every budget",

    plans: [
        {
            id: 1,
            title: "Basic Solar Plan",
            icon: "♧",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "299.00",
            annually: "599.00",
            popular: false,
        },
        {
            id: 2,
            title: "Standard Solar Plan",
            icon: "♔",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "499.00",
            annually: "799.00",
            popular: true,
        },
        {
            id: 3,
            title: "Premium Solar Plan",
            icon: "◇",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "699.00",
            annually: "999.00",
            popular: false,
        },
    ],

    features: [
        "High-Efficiency Solar Panels",
        "Real-Time Performance Monitoring",
        "Hybrid Inverter Battery Support",
    ],

    benefits: [
        "Get 30 day free trial",
        "No any hidden fees pay",
        "You can cancel anytime",
    ],
};

const Pricing = () => {
    const [billingType, setBillingType] =
        useState("monthly");

    const [pricingData, setPricingData] =
        useState(DEFAULT_PRICING);

    const isMonthly =
        billingType === "monthly";

    // ============================
    // GET PRICING FROM DATABASE
    // ============================

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const data = await getPages();

                if (
                    !data.success ||
                    !Array.isArray(data.pages)
                ) {
                    return;
                }

                const pricingPage =
                    data.pages.find(
                        (page) =>
                            page.page_name ===
                            "Home" &&
                            page.section_name ===
                            "Pricing"
                    );

                if (!pricingPage) {
                    return;
                }

                let content =
                    pricingPage.content;

                // PostgreSQL JSONB kabhi string form mein bhi aa sakta hai
                if (typeof content === "string") {
                    try {
                        content =
                            JSON.parse(content);
                    } catch (error) {
                        console.error(
                            "Pricing content parse error:",
                            error
                        );

                        return;
                    }
                }

                if (!content) {
                    return;
                }

                setPricingData({
                    label:
                        content.label ||
                        DEFAULT_PRICING.label,

                    heading:
                        content.heading ||
                        DEFAULT_PRICING.heading,

                    plans:
                        Array.isArray(
                            content.plans
                        ) &&
                            content.plans.length > 0
                            ? content.plans
                            : DEFAULT_PRICING.plans,

                    features:
                        Array.isArray(
                            content.features
                        )
                            ? content.features
                            : DEFAULT_PRICING.features,

                    benefits:
                        Array.isArray(
                            content.benefits
                        )
                            ? content.benefits
                            : DEFAULT_PRICING.benefits,
                });
            } catch (error) {
                console.error(
                    "Pricing fetch error:",
                    error
                );
            }
        };

        fetchPricing();
    }, []);

    // ============================
    // PRICING REVEAL ANIMATION
    // ============================

    useEffect(() => {
        const elements =
            document.querySelectorAll(
                ".pricing-reveal"
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
                                    "pricing-reveal-active"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px",
                }
            );

        elements.forEach(
            (element) =>
                observer.observe(element)
        );

        return () =>
            observer.disconnect();
    }, [pricingData]);

    return (
        <section className="pricing-section">

            {/* ============================
                HEADER
            ============================ */}

            <div className="pricing-header pricing-reveal pricing-reveal-up">

                <div className="pricing-label">
                    <span></span>
                    {pricingData.label}
                </div>

                <h2>
                    {pricingData.heading}
                </h2>

            </div>

            {/* ============================
                BILLING TOGGLE
            ============================ */}

            <div className="billing-toggle pricing-reveal pricing-reveal-scale">

                <span
                    className={
                        isMonthly
                            ? "billing-text active"
                            : "billing-text"
                    }
                >
                    Monthly
                </span>

                <button
                    className={
                        isMonthly
                            ? "billing-switch monthly"
                            : "billing-switch annually"
                    }
                    onClick={() =>
                        setBillingType(
                            isMonthly
                                ? "annually"
                                : "monthly"
                        )
                    }
                    aria-label="Change billing period"
                >
                    <span className="switch-circle"></span>
                </button>

                <span
                    className={
                        !isMonthly
                            ? "billing-text active"
                            : "billing-text"
                    }
                >
                    Annually
                </span>

            </div>

            {/* ============================
                PRICING CARDS
            ============================ */}

            <div className="pricing-container">

                {pricingData.plans.map(
                    (plan, index) => (

                        <div
                            className={`${plan.popular
                                ? "pricing-card popular-card"
                                : "pricing-card"
                                } pricing-reveal pricing-reveal-up pricing-card-${index + 1
                                }`}
                            key={
                                plan.id ||
                                index
                            }
                        >

                            {/* PLAN HEADER */}

                            <div className="plan-header">

                                <div
                                    className={
                                        plan.popular
                                            ? "plan-icon popular-icon"
                                            : "plan-icon"
                                    }
                                >
                                    {plan.icon}
                                </div>

                                <h3>
                                    {plan.title}
                                </h3>

                            </div>

                            {/* DESCRIPTION */}

                            <p className="plan-description">
                                {plan.description}
                            </p>

                            <div className="pricing-divider"></div>

                            {/* PRICE */}

                            <div className="plan-price">

                                <span
                                    className="price"
                                    key={
                                        billingType
                                    }
                                >
                                    $
                                    {isMonthly
                                        ? plan.monthly
                                        : plan.annually}
                                </span>

                                <span className="price-period">
                                    /
                                    {isMonthly
                                        ? "Monthly"
                                        : "Annually"}
                                </span>

                            </div>

                            {/* BUTTON */}

                            <button className="plan-button">
                                <span>
                                    Get Started With Plan
                                </span>

                                <span className="plan-button-arrow">
                                    ↗
                                </span>
                            </button>

                            {/* INCLUDED FEATURES */}

                            <div className="included-box">

                                <h4>
                                    What's Included:
                                </h4>

                                <div className="included-divider"></div>

                                <div className="features-list">

                                    {pricingData.features.map(
                                        (
                                            feature,
                                            featureIndex
                                        ) => (

                                            <div
                                                className="feature-item"
                                                key={
                                                    featureIndex
                                                }
                                            >

                                                <span className="check-icon">
                                                    ✓
                                                </span>

                                                <span>
                                                    {
                                                        feature
                                                    }
                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>

            {/* ============================
                BENEFITS
            ============================ */}

            <div className="pricing-benefits">

                {pricingData.benefits.map(
                    (
                        benefit,
                        index
                    ) => (

                        <div
                            className={`benefit-item pricing-reveal pricing-reveal-up pricing-benefit-${index + 1
                                }`}
                            key={index}
                        >

                            <span className="benefit-icon">
                                {index === 0
                                    ? "▣"
                                    : index === 1
                                        ? "$"
                                        : "◷"}
                            </span>

                            <span>
                                {benefit}
                            </span>

                        </div>

                    )
                )}

            </div>

        </section>
    );
};

export default Pricing;