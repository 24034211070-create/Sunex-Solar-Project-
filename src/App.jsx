import React, { useEffect } from "react";

import Topbar from "./components/Navbar/Topbar";
import Contactnav from "./components/Navbar/Contactnav";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

import {
    Route,
    Routes,
    Navigate,
    useLocation
} from "react-router-dom";

import Home from "./Pages/Home";
import About from "../src/components/Aboutsection/About";
import Services from "../src/components/Servicesection/Services";
import Blog from "../src/components/Blogsection/Blog";
import Home2 from "./components/Hero/Home2";
import Home3 from "./components/Hero/Home3";

import SolarBattery from "../src/components/Servicesdetailpage/SolarBattery";
import Servicesdetail from "../src/components/Pagesdetailpages/Servicesdetail";
import Blogdetail from "./components/Pagesdetailpages/Blogdetail";
import Projects from "./components/Pagesdetailpages/Projects";
import Projectdetail from "./components/Pagesdetailpages/Projectdetail";
import Imagegallery from "./components/Pagesdetailpages/Imagegallery";
import Notfound from "./components/Pagesdetailpages/Notfound";
import Contact from "./components/ContactUs/Contact";

import AdminLayout from "./Admin/AdminLayout";
import Login from "./Admin/Login";


/* =====================================================
   ADMIN GUARD
===================================================== */

const AdminGuard = ({ children }) => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const userRole = user?.role;

    if (userRole !== "admin") {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
};


const App = () => {

    const location = useLocation();

    const isAdmin =
        location.pathname.startsWith("/admin");

    const isHome2 =
        location.pathname === "/home-2";

    const isHome3 =
        location.pathname === "/home-3";


    /* =====================================================
       SCROLL TO TOP WHEN ROUTE CHANGES
    ===================================================== */

    useEffect(() => {

        window.history.scrollRestoration = "manual";

        window.scrollTo(0, 0);

    }, [location.pathname]);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    useEffect(() => {

        if (isAdmin) return;

        const revealElements =
            document.querySelectorAll(
                ".why-reveal"
            );

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15,
                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach((element) => {
            observer.observe(element);
        });


        return () => {

            observer.disconnect();

        };

    }, [location.pathname, isAdmin]);


    return (
        <>

            {/* =========================================
                ADMIN PANEL
                ADMIN LOGIN IS SEPARATE
            ========================================= */}

            {isAdmin ? (

                <Routes>

                    {/* =====================================
                        ADMIN LOGIN
                        LOGIN IS NOT PROTECTED
                    ===================================== */}

                    <Route
                        path="/admin/login"
                        element={<Login />}
                    />


                    {/* =====================================
                        PROTECTED ADMIN PANEL
                    ===================================== */}

                    <Route
                        path="/admin/*"
                        element={
                            <AdminGuard>
                                <AdminLayout />
                            </AdminGuard>
                        }
                    />

                </Routes>

            ) : (

                <>

                    {/* =========================================
                        WEBSITE HEADER
                    ========================================= */}

                    {isHome2 || isHome3 ? (

                        <div className="home2-header-wrapper">

                            <Topbar />

                            <Navbar variant="home2" />

                        </div>

                    ) : (

                        <>

                            <Topbar />

                            <Contactnav />

                            <Navbar variant="default" />

                        </>

                    )}


                    {/* =========================================
                        WEBSITE ROUTES
                    ========================================= */}

                    <Routes>

                        {/* =========================================
                            HOME
                        ========================================= */}

                        <Route
                            path="/"
                            element={<Home />}
                        />


                        {/* =========================================
                            ABOUT
                        ========================================= */}

                        <Route
                            path="/about"
                            element={<About />}
                        />


                        {/* =========================================
                            HOME 2
                        ========================================= */}

                        <Route
                            path="/home-2"
                            element={<Home2 />}
                        />


                        {/* =========================================
                            HOME 3
                        ========================================= */}

                        <Route
                            path="/home-3"
                            element={<Home3 />}
                        />


                        {/* =========================================
                            SERVICES
                        ========================================= */}

                        <Route
                            path="/services"
                            element={<Services />}
                        />


                        {/* =========================================
                            SERVICE INNER PAGES
                        ========================================= */}

                        <Route
                            path="/services/solar-battery-storage"
                            element={<SolarBattery />}
                        />

                        <Route
                            path="/services/residential-solar-solutions"
                            element={<SolarBattery />}
                        />

                        <Route
                            path="/services/solar-system-maintenance"
                            element={<SolarBattery />}
                        />

                        <Route
                            path="/services/rooftop-solar-solutions"
                            element={<SolarBattery />}
                        />

                        <Route
                            path="/services/solar-panel-maintenance"
                            element={<SolarBattery />}
                        />

                        <Route
                            path="/services/hybrid-solar-systems"
                            element={<SolarBattery />}
                        />


                        {/* =========================================
                            BLOG
                        ========================================= */}

                        <Route
                            path="/blogs"
                            element={<Blog />}
                        />


                        {/* =========================================
                            PAGES
                        ========================================= */}

                        <Route
                            path="/service-details"
                            element={<Servicesdetail />}
                        />

                        <Route
                            path="/blog-details"
                            element={<Blogdetail />}
                        />

                        <Route
                            path="/projects"
                            element={<Projects />}
                        />

                        <Route
                            path="/project-details"
                            element={<Projectdetail />}
                        />

                        <Route
                            path="/gallery"
                            element={<Imagegallery />}
                        />

                        <Route
                            path="/404"
                            element={<Notfound />}
                        />


                        {/* =========================================
                            CONTACT
                        ========================================= */}

                        <Route
                            path="/contact"
                            element={<Contact />}
                        />

                    </Routes>


                    {/* =========================================
                        FOOTER
                        HOME 2 + HOME 3 PAR HIDE
                    ========================================= */}

                    {!isHome2 && !isHome3 && (
                        <Footer />
                    )}

                </>

            )}

        </>
    );
};


export default App;