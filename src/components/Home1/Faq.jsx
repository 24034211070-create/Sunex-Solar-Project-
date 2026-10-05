import React, { useEffect, useState } from "react";
import "./Faq.css";

import { getPages } from "../../Api/api";

const fallbackFAQ = {
    badge: "Frequently Asked Questions",
    heading: "Clear guidance for your solar journey",
    description:
        "We've answered the most common questions to help you understand solar energy, installation, costs, and maintenance.",
    button_text: "View All Questions",
    button_link: "#faq",

    faqs: [
        {
            id: 1,
            question: "Is solar energy suitable for my home or business?",
            answer:
                "Yes, solar energy is suitable for most homes and businesses. Factors such as roof space, sunlight exposure, and your energy consumption are evaluated to design a suitable solar system."
        },
        {
            id: 2,
            question: "What happens if I generate more power than I use?",
            answer:
                "When your solar system generates more electricity than you consume, the excess power can be sent back to the grid depending on your local net metering or electricity regulations."
        },
        {
            id: 3,
            question: "Are there government subsidies or incentives available?",
            answer:
                "Government subsidies and incentives may be available depending on your location, system type, and applicable renewable energy programs. Our team can help you understand the available options."
        },
        {
            id: 4,
            question: "What maintenance does a solar system require?",
            answer:
                "Solar systems generally require minimal maintenance. Regular cleaning, visual inspections, and periodic performance checks help keep the system operating efficiently."
        },
        {
            id: 5,
            question: "Does solar work during cloudy days or at night?",
            answer:
                "Solar panels can still generate electricity during cloudy weather, although production may be lower. At night, solar panels do not generate electricity, so battery storage or grid electricity can provide power."
        }
    ]
};

const FAQ = () => {
    const [faqData, setFaqData] = useState(fallbackFAQ);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                const data = await getPages();

                if (!data.success || !Array.isArray(data.pages)) {
                    return;
                }

                const faqPage = data.pages.find(
                    (page) =>
                        page.page_name === "Home" &&
                        page.section_name === "FAQ"
                );

                if (!faqPage) {
                    return;
                }

                const content =
                    faqPage.content &&
                        typeof faqPage.content === "object"
                        ? faqPage.content
                        : {};

                setFaqData({
                    badge:
                        content.badge ||
                        faqPage.title ||
                        fallbackFAQ.badge,

                    heading:
                        content.heading ||
                        faqPage.title ||
                        fallbackFAQ.heading,

                    description:
                        content.description ||
                        faqPage.description ||
                        fallbackFAQ.description,

                    button_text:
                        content.button_text ||
                        fallbackFAQ.button_text,

                    button_link:
                        content.button_link ||
                        fallbackFAQ.button_link,

                    faqs:
                        Array.isArray(content.faqs) &&
                            content.faqs.length > 0
                            ? content.faqs
                            : fallbackFAQ.faqs
                });
            } catch (error) {
                console.error("FAQ fetch error:", error);
            }
        };

        fetchFAQ();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(
            openIndex === index ? null : index
        );
    };

    return (
        <section className="faq-section">
            <div className="faq-container">

                {/* LEFT SIDE */}
                <div className="faq-left">

                    <div className="faq-badge">
                        <span></span>
                        {faqData.badge}
                    </div>

                    <h2>
                        {faqData.heading}
                    </h2>

                    <p>
                        {faqData.description}
                    </p>

                    <a
                        href={faqData.button_link}
                        className="faq-view-btn"
                    >
                        <span>
                            {faqData.button_text}
                        </span>

                        <span className="faq-button-arrow">
                            ↗
                        </span>
                    </a>

                </div>

                {/* RIGHT SIDE */}
                <div className="faq-right">

                    {faqData.faqs.map(
                        (faq, index) => (
                            <div
                                className={`faq-item ${openIndex === index
                                    ? "faq-active"
                                    : ""
                                    }`}
                                key={
                                    faq.id ||
                                    index
                                }
                            >

                                <button
                                    className="faq-question"
                                    onClick={() =>
                                        toggleFAQ(
                                            index
                                        )
                                    }
                                    aria-expanded={
                                        openIndex ===
                                        index
                                    }
                                >
                                    <span>
                                        {index + 1}.{" "}
                                        {
                                            faq.question
                                        }
                                    </span>

                                    <span className="faq-arrow">
                                        ↓
                                    </span>
                                </button>

                                <div className="faq-answer">
                                    <p>
                                        {
                                            faq.answer
                                        }
                                    </p>
                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>
        </section>
    );
};

export default FAQ;