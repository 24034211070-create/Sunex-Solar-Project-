import React, { useEffect, useRef, useState } from "react";
import "./Home3Pricing.css";

const plans = [
    {
        icon: "basic",
        name: "Basic Solar Plan",
        monthly: "599.00",
        annually: "5,999.00",
        description:
            "An affordable entry level solar solution designed to reduce electricity bills.",
        ideal: "Ideal For Small Homes",
    },
    {
        icon: "standard",
        name: "Standard Solar Plan",
        monthly: "799.00",
        annually: "7,999.00",
        description:
            "An affordable entry level solar solution designed to reduce electricity bills.",
        ideal: "Ideal For Small Homes",
    },
    {
        icon: "premium",
        name: "Premium Solar Plan",
        monthly: "999.00",
        annually: "9,999.00",
        description:
            "An affordable entry level solar solution designed to reduce electricity bills.",
        ideal: "Ideal For Small Homes",
    },
];

const features = [
    "Up to 1-2 kW Solar System",
    "Complete Install & Commissioning",
    "10 kW+ Customized Solar System",
    "Dedicate Monitoring & Maintenance",
];

const PlanIcon = ({ type }) => {
    if (type === "basic") {
        return (
            <svg viewBox="0 0 24 24" fill="none">
                <rect x="5" y="5" width="9" height="9" rx="1" />
                <rect x="10" y="10" width="9" height="9" rx="1" />
                <path d="M9 2v6M6 5h6" />
            </svg>
        );
    }

    if (type === "standard") {
        return (
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 8l4-4h8l4 4-8 12L4 8Z" />
                <path d="M4 8h16M8 4l4 4 4-4M8 8l4 12 4-12" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    );
};

const CheckIcon = () => (
    <span className="home3-pricing-check">
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M6.5 12.5l3.2 3.2 7.8-8" />
        </svg>
    </span>
);

const Home3Pricing = () => {
    const sectionRef = useRef(null);
    const [billing, setBilling] = useState("monthly");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            className={`home3-pricing ${visible ? "pricing-visible" : ""}`}
            ref={sectionRef}
        >
            <div className="home3-pricing-bg"></div>

            <div className="home3-pricing-container">

                {/* ================= HEADING ================= */}

                <div className="home3-pricing-heading">

                    <div className="home3-pricing-label">
                        <span></span>
                        Our Pricing Plan
                    </div>

                    <h2>
                        Flexible solar plans designed for
                        <br />
                        maximum savings
                    </h2>

                    {/* BILLING TOGGLE */}

                    <div className="home3-billing-toggle">
                        <button
                            className={billing === "monthly" ? "active" : ""}
                            onClick={() => setBilling("monthly")}
                        >
                            Monthly
                        </button>

                        <button
                            className={billing === "annually" ? "active" : ""}
                            onClick={() => setBilling("annually")}
                        >
                            Annually
                        </button>
                    </div>

                </div>

                {/* ================= PRICING CARDS ================= */}

                <div className="home3-pricing-grid">

                    {plans.map((plan, index) => (

                        <div
                            className="home3-pricing-card"
                            style={{
                                "--card-delay": `${index * 0.15}s`,
                            }}
                            key={plan.name}
                        >

                            <div className="home3-plan-icon">
                                <PlanIcon type={plan.icon} />
                            </div>

                            <div className="home3-plan-name">
                                {plan.name}
                            </div>

                            <div className="home3-plan-price">
                                <span className="currency">$</span>

                                <strong key={billing}>
                                    {billing === "monthly"
                                        ? plan.monthly
                                        : plan.annually}
                                </strong>

                                <span className="price-period">
                                    /
                                    {billing === "monthly"
                                        ? "Monthly"
                                        : "Yearly"}
                                </span>
                            </div>

                            <p className="home3-plan-description">
                                {plan.description}
                            </p>

                            <div className="home3-plan-divider"></div>

                            <h3>{plan.ideal}</h3>

                            <ul className="home3-plan-features">

                                {features.map((feature) => (
                                    <li key={feature}>
                                        <CheckIcon />
                                        <span>{feature}</span>
                                    </li>
                                ))}

                            </ul>

                            <button className="home3-plan-button">
                                Get Started With Plan
                            </button>

                        </div>

                    ))}

                </div>

                {/* ================= BOTTOM BENEFITS ================= */}

                <div className="home3-pricing-benefits">

                    <div className="home3-benefit">
                        <div className="benefit-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <rect x="4" y="5" width="16" height="15" rx="2" />
                                <path d="M8 3v4M16 3v4M4 9h16" />
                                <circle cx="16" cy="16" r="3" />
                                <path d="M16 14.5v1.8l1.2.7" />
                            </svg>
                        </div>

                        <span>Get 30 day free trial</span>
                    </div>

                    <div className="home3-benefit">
                        <div className="benefit-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v10M15 9.5c0-1.2-1.2-2-3-2s-3 .8-3 2 1.2 2 3 2 3 .8 3 2-1.2 2-3 2-3-.8-3-2" />
                            </svg>
                        </div>

                        <span>No any hidden fees pay</span>
                    </div>

                    <div className="home3-benefit">
                        <div className="benefit-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                        </div>

                        <span>You can cancel anytime</span>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home3Pricing;