import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import s2 from "../../assets/Home2/s2.png";
import s3 from "../../assets/Home2/s3.png";
import s4 from "../../assets/Home2/s4.png";
import "./Home2About.css";

const Home2About = ({
    mainImage,
    workerImage,
    bottomImage
}) => {
    return (
        <section className="home2-about">
            <div className="home2-about-container">

                {/* =========================================
                    LEFT IMAGE COMPOSITION
                ========================================= */}

                <div className="home2-about-images">

                    {/* MAIN IMAGE */}
                    <div className="home2-about-main-image">
                        <img
                            src={s2}
                            alt="Solar energy"
                        />
                    </div>

                    {/* WORKER IMAGE */}
                    <div className="home2-about-worker-image">
                        <img
                            src={s3}
                            alt="Solar energy worker"
                        />
                    </div>

                    {/* BOTTOM IMAGE */}
                    <div className="home2-about-bottom-image">
                        <img
                            src={s4}
                            alt="Solar panels"
                        />
                    </div>

                    {/* CONTACT US SPINNER */}
                    <div className="home2-contact-spinner">

                        <svg
                            className="home2-spinner-svg"
                            viewBox="0 0 120 120"
                            aria-hidden="true"
                        >
                            <defs>
                                <path
                                    id="home2-spinner-circle"
                                    d="
                                        M 60,60
                                        m -45,0
                                        a 45,45 0 1,1 90,0
                                        a 45,45 0 1,1 -90,0
                                    "
                                />
                            </defs>

                            <text>
                                <textPath
                                    href="#home2-spinner-circle"
                                    startOffset="0%"
                                >
                                    CONTACT US • CONTACT US • CONTACT US •
                                </textPath>
                            </text>
                        </svg>

                        <div className="home2-spinner-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M13.5 2L6 13h5l-1 9 7.5-12h-5L13.5 2z"
                                    fill="white"
                                />
                            </svg>
                        </div>

                    </div>

                </div>


                {/* =========================================
                    RIGHT CONTENT
                ========================================= */}

                <div className="home2-about-content">

                    <div className="home2-about-badge">
                        <span></span>
                        About Our Solar
                    </div>

                    <h2>
                        Leading provider of reliable
                        <br />
                        solar energy solutions
                    </h2>

                    <p className="home2-about-description">
                        As a leading provider of reliable solar energy
                        solutions, we are committed to delivering clean,
                        sustainable power for homes and businesses.
                    </p>

                    <div className="home2-about-line"></div>

                    <div className="home2-about-bottom">

                        <div className="home2-about-details">

                            <div className="home2-about-check">
                                <CheckCircle2 />
                                <span>
                                    Trusted Solar Energy Solutions Provider
                                </span>
                            </div>

                            <div className="home2-about-check">
                                <CheckCircle2 />
                                <span>
                                    High Quality Solar Technology Systems
                                </span>
                            </div>

                            <div className="home2-about-check">
                                <CheckCircle2 />
                                <span>
                                    Focused on Long Term Performance
                                </span>
                            </div>

                            <a
                                href="#services"
                                className="home2-about-button"
                            >
                                <span>Learn More About</span>

                                <ArrowUpRight
                                    size={19}
                                    strokeWidth={2.5}
                                />
                            </a>

                        </div>


                        <div className="home2-warranty-card">

                            <span className="home2-warranty-number">
                                25+
                            </span>

                            <span className="home2-warranty-label">
                                Panel Performance
                                <br />
                                Warranty
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Home2About;