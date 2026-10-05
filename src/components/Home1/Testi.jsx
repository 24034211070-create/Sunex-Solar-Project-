import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    ArrowUpRight,
    Star,
    Phone
} from "lucide-react";

import "./Testi.css";

import avatar1 from "../../assets/Solarimage/avatar1.png";
import avatar2 from "../../assets/Solarimage/avatar2.png";
import avatar3 from "../../assets/Solarimage/avatar3.png";
import avatar4 from "../../assets/Solarimage/avatar4.png";

import { getPages } from "../../Api/api";

const fallbackData = {
    badge: "Our Testimonials",

    heading:
        "Customers sharing their journey to solar",

    button_text: "View All Testimonials",

    button_link: "#testimonials",

    rating: "4.9/5",

    trust_text:
        "5K+ Customer Trust Our Solar",

    avatars: [
        "",
        "",
        "",
        ""
    ],

    reviews: [
        {
            id: 1,
            text:
                "The installation was done with great attention to safety and quality. The support team regularly checks in to ensure.",
            name: "Jerome Bell",
            role: "School Administrator"
        },
        {
            id: 2,
            text:
                "Switching to solar was one of the best decisions we made. The installation was smooth, and our electricity bills dropped.",
            name: "Cameron Williamson",
            role: "Small Business Owner"
        },
        {
            id: 3,
            text:
                "The entire process was simple and transparent. The professional team explained everything clearly and delivered great results.",
            name: "Leslie Alexander",
            role: "Retail Store Owner"
        },
        {
            id: 4,
            text:
                "Excellent service from start to finish. The team was professional, helpful, and made our solar installation completely stress-free.",
            name: "Kathryn Murphy",
            role: "Homeowner"
        }
    ],

    bottom_avatar: "",

    bottom_text:
        "Where smart design and clean energy come together powerfully",

    bottom_link_text:
        "View All Testimonials.",

    bottom_link:
        "#testimonials",

    bottom_rating: "4.9/5",

    bottom_reviews:
        "Over 4200 Reviews"
};

const defaultAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4
];

const Testimonials = () => {

    const sectionRef = useRef(null);

    const [visible, setVisible] =
        useState(false);

    const [data, setData] =
        useState(fallbackData);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [isTransitioning, setIsTransitioning] =
        useState(true);

    /*
    =====================================================
    FETCH TESTIMONIAL DATA
    =====================================================
    */

    useEffect(() => {

        const fetchTestimonials =
            async () => {

                try {

                    const result =
                        await getPages();

                    if (
                        !result.success ||
                        !Array.isArray(
                            result.pages
                        )
                    ) {
                        return;
                    }

                    const testiPage =
                        result.pages.find(
                            (page) =>
                                page.page_name ===
                                "Home" &&
                                page.section_name ===
                                "Testi"
                        );

                    if (!testiPage) {
                        return;
                    }

                    const content =
                        testiPage.content &&
                            typeof testiPage.content ===
                            "object"
                            ? testiPage.content
                            : {};

                    setData({
                        badge:
                            content.badge ||
                            fallbackData.badge,

                        heading:
                            content.heading ||
                            testiPage.title ||
                            fallbackData.heading,

                        button_text:
                            content.button_text ||
                            fallbackData.button_text,

                        button_link:
                            content.button_link ||
                            fallbackData.button_link,

                        rating:
                            content.rating ||
                            fallbackData.rating,

                        trust_text:
                            content.trust_text ||
                            fallbackData.trust_text,

                        avatars:
                            Array.isArray(
                                content.avatars
                            )
                                ? content.avatars
                                : fallbackData.avatars,

                        reviews:
                            Array.isArray(
                                content.reviews
                            ) &&
                                content.reviews.length > 0
                                ? content.reviews
                                : fallbackData.reviews,

                        bottom_avatar:
                            content.bottom_avatar ||
                            "",

                        bottom_text:
                            content.bottom_text ||
                            fallbackData.bottom_text,

                        bottom_link_text:
                            content.bottom_link_text ||
                            fallbackData.bottom_link_text,

                        bottom_link:
                            content.bottom_link ||
                            fallbackData.bottom_link,

                        bottom_rating:
                            content.bottom_rating ||
                            fallbackData.bottom_rating,

                        bottom_reviews:
                            content.bottom_reviews ||
                            fallbackData.bottom_reviews
                    });

                } catch (error) {

                    console.error(
                        "Testimonials fetch error:",
                        error
                    );

                }
            };

        fetchTestimonials();

    }, []);

    /*
    =====================================================
    SCROLL REVEAL
    =====================================================
    */

    useEffect(() => {

        const section =
            sectionRef.current;

        if (!section) return;

        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setVisible(true);

                        observer.disconnect();
                    }

                },
                {
                    threshold: 0.12
                }
            );

        observer.observe(section);

        return () =>
            observer.disconnect();

    }, []);

    /*
    =====================================================
    INFINITE SLIDER
    =====================================================
    */

    const reviews =
        data.reviews &&
            data.reviews.length > 0
            ? data.reviews
            : fallbackData.reviews;

    const totalReviews =
        reviews.length;

    const sliderReviews = [
        ...reviews,
        ...reviews
    ];

    useEffect(() => {

        if (totalReviews <= 1) {
            return;
        }

        const interval =
            setInterval(() => {

                setCurrentIndex(
                    (previous) =>
                        previous + 1
                );

                setIsTransitioning(true);

            }, 4000);

        return () =>
            clearInterval(interval);

    }, [totalReviews]);

    /*
    =====================================================
    SEAMLESS RESET
    =====================================================
    */

    useEffect(() => {

        if (
            currentIndex !==
            totalReviews
        ) {
            return;
        }

        const timeout =
            setTimeout(() => {

                setIsTransitioning(
                    false
                );

                setCurrentIndex(0);

            }, 750);

        return () =>
            clearTimeout(timeout);

    }, [
        currentIndex,
        totalReviews
    ]);

    /*
    =====================================================
    TURN TRANSITION BACK ON
    =====================================================
    */

    useEffect(() => {

        if (!isTransitioning) {

            const timeout =
                setTimeout(() => {

                    setIsTransitioning(
                        true
                    );

                }, 50);

            return () =>
                clearTimeout(timeout);
        }

    }, [isTransitioning]);

    /*
    =====================================================
    AVATARS
    =====================================================
    */

    const ratingAvatars =
        data.avatars || [];

    return (
        <section
            ref={sectionRef}
            className={`testimonials-section ${visible
                ? "testimonials-visible"
                : ""
                }`}
        >

            {/* BACKGROUND DECORATION */}

            <div className="testimonial-bg-shape testimonial-bg-one"></div>

            <div className="testimonial-bg-shape testimonial-bg-two"></div>

            <div className="testimonial-bg-dot"></div>

            <div className="testimonials-container">

                {/* LEFT SIDE */}

                <div className="testimonial-left">

                    <div className="testimonial-badge testimonial-reveal">

                        <span></span>

                        {data.badge}

                    </div>

                    <h2 className="testimonial-heading testimonial-reveal">

                        {data.heading}

                    </h2>

                    <a
                        href={
                            data.button_link
                        }
                        className="testimonial-button testimonial-reveal"
                    >

                        <span>
                            {data.button_text}
                        </span>

                        <ArrowUpRight
                            size={19}
                        />

                    </a>

                    {/* RATING BOX */}

                    <div className="testimonial-rating-box testimonial-reveal">

                        <div className="rating-top">

                            <span className="rating-number">
                                {
                                    data.rating
                                }
                            </span>

                            <div className="rating-stars">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (
                                        <Star
                                            key={star}
                                            size={20}
                                            fill="currentColor"
                                            strokeWidth={1.8}
                                        />
                                    )
                                )}

                            </div>

                        </div>

                        <div className="rating-bottom">

                            <div className="rating-avatars">

                                {ratingAvatars.map(
                                    (
                                        avatar,
                                        index
                                    ) => {

                                        const fallbackAvatar =
                                            defaultAvatars[
                                            index
                                            ];

                                        return (
                                            <img
                                                key={
                                                    index
                                                }
                                                src={
                                                    avatar ||
                                                    fallbackAvatar
                                                }
                                                alt="Customer"
                                            />
                                        );
                                    }
                                )}

                                <div className="rating-plus">
                                    +
                                </div>

                            </div>

                            <p>
                                {
                                    data.trust_text
                                }
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE SLIDER */}

                <div className="testimonial-slider-wrapper">

                    <div
                        className={`testimonial-track ${isTransitioning
                            ? "testimonial-track-transition"
                            : ""
                            }`}
                        style={{
                            "--current-index":
                                currentIndex
                        }}
                    >

                        {sliderReviews.map(
                            (
                                review,
                                index
                            ) => (

                                <article
                                    className="testimonial-card"
                                    key={`${review.id}-${index}`}
                                >

                                    {/* STARS */}

                                    <div className="card-stars">

                                        {[1, 2, 3, 4, 5].map(
                                            (
                                                star
                                            ) => (
                                                <Star
                                                    key={
                                                        star
                                                    }
                                                    size={
                                                        20
                                                    }
                                                    fill="currentColor"
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                />
                                            )
                                        )}

                                    </div>

                                    {/* REVIEW TEXT */}

                                    <div className="testimonial-card-middle">

                                        <p className="testimonial-text">

                                            “
                                            {
                                                review.text
                                            }
                                            ”

                                        </p>

                                    </div>

                                    {/* CUSTOMER INFO */}

                                    <div className="testimonial-card-bottom">

                                        <div className="testimonial-card-line"></div>

                                        <h3>
                                            {
                                                review.name
                                            }
                                        </h3>

                                        <p>
                                            {
                                                review.role
                                            }
                                        </p>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                </div>

            </div>

            {/* BOTTOM CTA */}

            <div className="testimonial-bottom">

                <div className="testimonial-contact">

                    <div className="testimonial-contact-avatar">

                        <img
                            src={
                                data.bottom_avatar ||
                                avatar1
                            }
                            alt="Solar expert"
                        />

                        <span>
                            <Phone
                                size={15}
                            />
                        </span>

                    </div>

                    <p>

                        {
                            data.bottom_text
                        }

                        {" "}

                        <a
                            href={
                                data.bottom_link
                            }
                        >
                            {
                                data.bottom_link_text
                            }
                        </a>

                    </p>

                </div>

                <div className="testimonial-bottom-rating">

                    <strong>
                        {
                            data.bottom_rating
                        }
                    </strong>

                    <div className="bottom-stars">

                        {[1, 2, 3, 4, 5].map(
                            (star) => (
                                <Star
                                    key={star}
                                    size={18}
                                    fill="currentColor"
                                />
                            )
                        )}

                    </div>

                    <strong>
                        {
                            data.bottom_reviews
                        }
                    </strong>

                </div>

            </div>

        </section>
    );
};

export default Testimonials;