import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import "./Notfound.css";

import q1 from "../../assets/Aboutimages/q1.png";
import i10 from "../../assets/Imagegallery/i10.png";

const NotFound = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const elements =
            contentRef.current?.querySelectorAll(".notfound-animate");

        if (!elements?.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("notfound-show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="notfound-page" ref={contentRef}>

            {/* =====================================================
                HERO
            ===================================================== */}

            <section
                className="notfound-hero"
                style={{ backgroundImage: `url(${q1})` }}
            >
                <div className="notfound-hero-overlay"></div>

                <div className="notfound-hero-glow"></div>

                <div className="notfound-hero-content">

                    <div className="notfound-hero-line notfound-animate">
                        <span></span>
                        <span>404 ERROR</span>
                        <span></span>
                    </div>

                    <h1 className="notfound-animate notfound-hero-title">
                        Page Not Found
                    </h1>

                    <div className="notfound-breadcrumb notfound-animate">
                        <span>Home</span>
                        <span className="notfound-breadcrumb-slash">
                            /
                        </span>
                        <span>404 Error Page</span>
                    </div>

                </div>

                <div className="notfound-hero-shape notfound-shape-one"></div>
                <div className="notfound-hero-shape notfound-shape-two"></div>
            </section>

            {/* =====================================================
                ERROR CONTENT
            ===================================================== */}

            <section className="notfound-content">
                <div className="notfound-inner">

                    {/* 404 IMAGE */}

                    <div className="notfound-image-area">

                        <div className="notfound-image-glow"></div>

                        <div className="notfound-image-wrap notfound-animate">
                            <img
                                src={i10}
                                alt="404 Page Not Found"
                            />
                        </div>

                    </div>

                    {/* TITLE */}

                    <h2 className="notfound-title notfound-animate">
                        Oops! Page Not Found
                    </h2>

                    {/* DESCRIPTION */}

                    <p className="notfound-description notfound-animate">
                        The page you are looking for does not exist.
                        It may have been moved or removed.
                    </p>

                    {/* BACK HOME BUTTON */}

                    <a
                        href="/"
                        className="notfound-home-btn notfound-animate"
                    >
                        <span>Back To Homepage</span>

                        <span className="notfound-btn-icon">
                            <ArrowUpRight
                                size={20}
                                strokeWidth={2.4}
                            />
                        </span>
                    </a>

                </div>
            </section>

            {/* =====================================================
                FLOATING BUY NOW
            ===================================================== */}

            <button className="notfound-buy-btn">
                <ShoppingCart
                    size={19}
                    strokeWidth={2.5}
                />

                <span>Buy Now</span>
            </button>

        </div>
    );
};

export default NotFound;