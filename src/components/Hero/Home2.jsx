import React from "react";
import { ArrowUpRight, Phone, ShieldCheck } from "lucide-react";

// IMAGE IMPORT 

import s1 from "../../assets/Home2/s1.png";

// FILE IMPORT 

import Home2About from "../Home2/Home2About";
import Home2Services from "../Home2/Home2Services"
import Home2Choose from "../Home2/Home2Choose";
import Home2Do from "../Home2/Home2Do";
import Home2Work from "../Home2/Home2Work"
import Home2Project from "../Home2/Home2Project";
import Home2Pricing from "../Home2/Home2Pricing";
import Home2Faq from "../Home2/Home2Faq";
import Home2Testimonials from "../Home2/Home2Testimonials";
import Home2Blogs from "../Home2/Home2Blogs";
import Footer2 from "../Footer/Footer2"
import Home2Features from "../Home2/Home2Features";

import "./Home2.css";

const Home2 = () => {
    return (
        <>
            <section className="home2-hero">

                <video
                    className="home2-hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="/src/assets/Home2/Sunex.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className="home2-hero-overlay"></div>

                <div className="home2-navbar-wrapper">
                </div>

                <div className="home2-hero-content">

                    <div className="home2-left-content">

                        <div className="home2-badge">
                            <span></span>
                            Bright Energy For Tomorrow
                        </div>

                        <h1>
                            Reliable Solar Energy
                            <br />
                            for Every Home
                        </h1>

                        <div className="home2-bottom-content">

                            <a
                                href="#solar"
                                className="home2-solar-btn"
                            >
                                Go Solar Today

                                <ArrowUpRight
                                    size={20}
                                    strokeWidth={2.5}
                                />
                            </a>

                            <div className="home2-phone">

                                <div className="home2-phone-icon">
                                    <Phone size={23} />
                                </div>

                                <div className="home2-phone-text">

                                    <span>
                                        Phone Number
                                    </span>

                                    <strong>
                                        +1 (123) 456-789
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="home2-trusted-card">

                        <div className="home2-trusted-image">

                            <div className="home2-image-dot"></div>

                            <img
                                src={s1}
                                alt="Solar panels"
                            />

                        </div>


                        <div className="home2-trusted-content">

                            <div className="home2-shield-icon">
                                <ShieldCheck size={25} />
                            </div>

                            <h3>
                                Trusted Installers
                            </h3>

                            <p>
                                Our certified installers and
                                <br />
                                efficient solar system.
                            </p>

                            <div className="home2-card-line"></div>

                            <div className="home2-renewable">
                                <span></span>
                                Renewable Energy
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
               HOME 2 ABOUT SECTION
            ========================================= */}

            <Home2About />
            <Home2Services />
            <Home2Features />
            <Home2Choose />
            <Home2Do />
            <Home2Work />
            <Home2Project />
            <Home2Pricing />
            <Home2Faq />
            <Home2Testimonials />
            <Home2Blogs />
            <Footer2 />
        </>
    );
};

export default Home2;