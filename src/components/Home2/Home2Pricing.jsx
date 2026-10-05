import React from "react";
import "./Home2Pricing.css";

import s16 from "../../assets/Home2/s16.png";
import s17 from "../../assets/Home2/s17.png";
import s18 from "../../assets/Home2/s18.png";

const plans = [
    {
        title: "Basic Solar Plan",
        price: "75K",
        image: s16,
    },
    {
        title: "Standard Solar Plan",
        price: "115K",
        image: s17,
    },
    {
        title: "Premium Solar Plan",
        price: "180",
        image: s18,
    },
];

const features = [
    "Tier-1 High-Efficiency Panels",
    "High-capacity energy storage",
    "Real-Time Performance Monitoring",
    "Hybrid Inverter & Battery Support",
];

const Pricing = () => {
    return (
        <section className="home2-pricing-section">
            <div className="home2-pricing-container">

                {/* HEADING */}
                <div className="home2-pricing-heading">

                    <div className="home2-pricing-badge">
                        <span></span>
                        Pricing Plan
                    </div>

                    <h2>
                        What we do driving sustainable
                        <br />
                        energy futures
                    </h2>

                </div>

                {/* CARDS */}
                <div className="home2-pricing-cards">

                    {plans.map((plan, index) => (
                        <div
                            className="home2-pricing-card"
                            key={index}
                        >

                            {/* IMAGE */}
                            <div className="home2-pricing-image">

                                <img
                                    src={plan.image}
                                    alt={plan.title}
                                />

                                <div className="home2-pricing-image-overlay"></div>

                                <div className="home2-pricing-image-content">

                                    <h3>
                                        {plan.title}
                                    </h3>

                                    <div className="home2-pricing-price">

                                        <span>
                                            {plan.price}
                                        </span>

                                        <small>
                                            /Starting
                                        </small>

                                    </div>

                                </div>

                            </div>

                            {/* BODY */}
                            <div className="home2-pricing-card-body">

                                <h4>
                                    What Included Feature:
                                </h4>

                                <div className="home2-pricing-divider"></div>

                                <ul>

                                    {features.map(
                                        (feature, featureIndex) => (
                                            <li key={featureIndex}>

                                                <span className="home2-check-icon">
                                                    ✓
                                                </span>

                                                <span>
                                                    {feature}
                                                </span>

                                            </li>
                                        )
                                    )}

                                </ul>

                                <button className="home2-solar-button">

                                    <span>
                                        Go Solar Today
                                    </span>

                                    <strong>
                                        ↗
                                    </strong>

                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {/* BOTTOM INFORMATION */}
                <div className="home2-pricing-bottom-info">

                    <div className="home2-pricing-info-item">

                        <span className="home2-info-icon">
                            ▣
                        </span>

                        <p>
                            Get 30 day free trial
                        </p>

                    </div>

                    <div className="home2-pricing-info-item">

                        <span className="home2-info-icon">
                            $
                        </span>

                        <p>
                            No any hidden fee pay
                        </p>

                    </div>

                    <div className="home2-pricing-info-item">

                        <span className="home2-info-icon">
                            ◷
                        </span>

                        <p>
                            You can cancel anytime
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Pricing;