import React, { useEffect, useRef, useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    ShoppingCart,
    ArrowUpRight,
    RefreshCw,
} from "lucide-react";
import "./Contact.css";

import q1 from "../../assets/Aboutimages/q1.png";
import i11 from "../../assets/Imagegallery/i11.png";

import { getPages } from "../../Api/api";

const ContactUs = () => {
    const pageRef = useRef(null);

    // =====================================================
    // CONTACT PAGE STATE
    // =====================================================

    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);

    // =====================================================
    // LOAD CONTACT US DATA
    // =====================================================

    useEffect(() => {
        loadContactUs();
    }, []);

    const loadContactUs = async () => {
        try {
            setLoading(true);

            const response = await getPages();

            const pages = Array.isArray(response)
                ? response
                : response?.data ||
                response?.pages ||
                [];

            const contactPage = pages.find((item) => {
                const pageName = String(
                    item.page_name ||
                    item.pageName ||
                    ""
                )
                    .trim()
                    .toLowerCase();

                const sectionName = String(
                    item.section_name ||
                    item.sectionName ||
                    ""
                )
                    .trim()
                    .toLowerCase();

                return (
                    pageName === "contact us" ||
                    pageName === "contactus" ||
                    pageName === "contact" ||
                    sectionName === "contact us" ||
                    sectionName === "contactus" ||
                    sectionName === "contact"
                );
            });

            if (!contactPage) {
                console.error(
                    "Contact Us page record not found."
                );

                setContactData(null);
                return;
            }

            // =================================================
            // CONTENT
            // =================================================

            let content = {};

            try {
                content =
                    typeof contactPage.content === "string"
                        ? JSON.parse(
                            contactPage.content || "{}"
                        )
                        : contactPage.content || {};
            } catch (parseError) {
                console.error(
                    "Contact Us content parse error:",
                    parseError
                );

                content = {};
            }

            // =================================================
            // FINAL CONTACT DATA
            // =================================================

            const data = {
                // HERO
                heroTitle:
                    contactPage.title ||
                    content.heroTitle ||
                    "Contact us",

                heroImage:
                    contactPage.image ||
                    content.heroImage ||
                    "",

                // CONTACT INFORMATION
                contactImage:
                    content.contactImage ||
                    "",

                contactInfoTitle:
                    content.contactInfoTitle ||
                    "Contact Information",

                phoneLabel:
                    content.phoneLabel ||
                    "Phone Number",

                phone:
                    content.phone ||
                    "+1 (123) 456-789",

                emailLabel:
                    content.emailLabel ||
                    "Email Address",

                email:
                    content.email ||
                    "info@domainname.com",

                locationLabel:
                    content.locationLabel ||
                    "Our Location",

                location:
                    content.location ||
                    "2118 Thornridge Cir. Syracuse, 356",

                // GET IN TOUCH
                getInTouchTitle:
                    content.getInTouchTitle ||
                    "Get In Touch",

                getInTouchDescription:
                    content.getInTouchDescription ||
                    "Whether you have questions about our services, want a free consultation, or need support for your existing system, our team is ready to assist.",

                // FORM
                firstNameLabel:
                    content.firstNameLabel ||
                    "First Name",

                firstNamePlaceholder:
                    content.firstNamePlaceholder ||
                    "Enter First Name",

                lastNameLabel:
                    content.lastNameLabel ||
                    "Last Name",

                lastNamePlaceholder:
                    content.lastNamePlaceholder ||
                    "Enter Last Name",

                phoneFieldLabel:
                    content.phoneFieldLabel ||
                    "Phone Number",

                phonePlaceholder:
                    content.phonePlaceholder ||
                    "Enter Phone Number",

                emailFieldLabel:
                    content.emailFieldLabel ||
                    "Email Address",

                emailPlaceholder:
                    content.emailPlaceholder ||
                    "Enter Email Address",

                messageLabel:
                    content.messageLabel ||
                    "Message",

                messagePlaceholder:
                    content.messagePlaceholder ||
                    "Any Message...",

                submitButtonText:
                    content.submitButtonText ||
                    "Submit Message",

                // LOCATION
                locationTag:
                    content.locationTag ||
                    "Our Location",

                locationTitle:
                    content.locationTitle ||
                    "Connecting you to clean energy",

                locationDescription:
                    content.locationDescription ||
                    "No matter where you are, our expert team is ready to provide reliable solar solutions, on-site support, and consultations to help you transition to sustainable energy with ease.",

                mapUrl:
                    content.mapUrl ||
                    "https://www.google.com/maps?q=Lisbon,Portugal&z=11&output=embed",

                mapButtonText:
                    content.mapButtonText ||
                    "Open in Maps",

                mapButtonUrl:
                    content.mapButtonUrl ||
                    "https://www.google.com/maps",
            };

            setContactData(data);
        } catch (error) {
            console.error(
                "Contact Us frontend load error:",
                error
            );

            setContactData(null);
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // ANIMATION
    // =====================================================

    useEffect(() => {
        if (!contactData) return;

        const elements =
            pageRef.current?.querySelectorAll(
                ".contact-animate"
            );

        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "contact-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px",
            }
        );

        elements.forEach((element) =>
            observer.observe(element)
        );

        return () => observer.disconnect();
    }, [contactData]);

    // =====================================================
    // FORM SUBMIT
    // =====================================================

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="contact-loading">
                <RefreshCw
                    size={22}
                    className="animate-spin"
                />

                <span>
                    Loading Contact Us...
                </span>
            </div>
        );
    }

    // =====================================================
    // DATABASE DATA NOT FOUND
    // =====================================================

    if (!contactData) {
        return (
            <div
                style={{
                    minHeight: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "15px",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                <h2>
                    Contact Us data not found
                </h2>

                <p>
                    Contact Us page record
                    database mein available nahi hai.
                </p>

                <button
                    type="button"
                    onClick={loadContactUs}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#00c853",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    <RefreshCw size={17} />
                    Retry
                </button>
            </div>
        );
    }

    // =====================================================
    // FINAL IMAGE FALLBACKS
    // =====================================================

    const heroImage =
        contactData.heroImage || q1;

    const contactImage =
        contactData.contactImage || i11;

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div
            className="contact-page"
            ref={pageRef}
        >

            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <section
                className="contact-hero"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="contact-hero-overlay"></div>

                <div className="contact-hero-content">

                    <h1 className="hero-title-animation">
                        {contactData.heroTitle}
                    </h1>

                    <div className="contact-breadcrumb">
                        <span>Home</span>
                        <span>/</span>
                        <span>Contact Us</span>
                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTACT MAIN SECTION
            ===================================================== */}

            <section className="contact-main-section">

                <div className="contact-main-container">

                    {/* ================= LEFT CARD ================= */}

                    <div className="contact-info-card contact-animate contact-slide-left">

                        <div className="contact-image-wrapper">

                            <img
                                src={contactImage}
                                alt="Contact Us"
                            />

                        </div>

                        <div className="contact-info-content">

                            <h2>
                                {contactData.contactInfoTitle}
                            </h2>

                            <div className="contact-divider"></div>

                            {/* PHONE */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    <Phone
                                        size={24}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div className="contact-info-text">

                                    <span>
                                        {contactData.phoneLabel}
                                    </span>

                                    <strong>
                                        {contactData.phone}
                                    </strong>

                                </div>

                            </div>

                            {/* EMAIL */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    <Mail
                                        size={24}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div className="contact-info-text">

                                    <span>
                                        {contactData.emailLabel}
                                    </span>

                                    <strong>
                                        {contactData.email}
                                    </strong>

                                </div>

                            </div>

                            {/* LOCATION */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    <MapPin
                                        size={24}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div className="contact-info-text">

                                    <span>
                                        {contactData.locationLabel}
                                    </span>

                                    <strong>
                                        {contactData.location}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ================= FORM CARD ================= */}

                    <div className="contact-form-card contact-animate contact-slide-right">

                        <h2>
                            {contactData.getInTouchTitle}
                        </h2>

                        <p className="contact-form-description">
                            {contactData.getInTouchDescription}
                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* FIRST ROW */}

                            <div className="contact-form-row">

                                <div className="contact-field">

                                    <label>
                                        {contactData.firstNameLabel}
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder={
                                            contactData.firstNamePlaceholder
                                        }
                                    />

                                </div>

                                <div className="contact-field">

                                    <label>
                                        {contactData.lastNameLabel}
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder={
                                            contactData.lastNamePlaceholder
                                        }
                                    />

                                </div>

                            </div>

                            {/* SECOND ROW */}

                            <div className="contact-form-row">

                                <div className="contact-field">

                                    <label>
                                        {contactData.phoneFieldLabel}
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder={
                                            contactData.phonePlaceholder
                                        }
                                    />

                                </div>

                                <div className="contact-field">

                                    <label>
                                        {contactData.emailFieldLabel}
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="email"
                                        placeholder={
                                            contactData.emailPlaceholder
                                        }
                                    />

                                </div>

                            </div>

                            {/* MESSAGE */}

                            <div className="contact-field contact-message-field">

                                <label>
                                    {contactData.messageLabel}
                                </label>

                                <textarea
                                    placeholder={
                                        contactData.messagePlaceholder
                                    }
                                    rows="6"
                                ></textarea>

                            </div>

                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="contact-submit-btn"
                            >
                                {contactData.submitButtonText}
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* =====================================================
                LOCATION SECTION
            ===================================================== */}

            <section className="location-section">

                <div className="location-heading contact-animate">

                    <div className="location-tag">

                        <span></span>

                        {contactData.locationTag}

                    </div>

                    <h2>
                        {contactData.locationTitle}
                    </h2>

                    <p>
                        {contactData.locationDescription}
                    </p>

                </div>

                {/* MAP */}

                <div className="map-wrapper contact-animate">

                    <iframe
                        title="Our Location"
                        src={contactData.mapUrl}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <a
                        href={contactData.mapButtonUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="map-open-btn"
                    >
                        {contactData.mapButtonText}

                        <ArrowUpRight size={15} />
                    </a>

                </div>

            </section>

        </div>
    );
};

export default ContactUs;