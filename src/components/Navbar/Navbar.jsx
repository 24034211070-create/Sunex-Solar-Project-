import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ variant = "default" }) => {
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [homeOpen, setHomeOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);

    const isHome2 = variant === "home2";

    /* =========================================
       CURRENT HOME VERSION
    ========================================= */

    const isHome1 = location.pathname === "/";
    const isCurrentHome2 = location.pathname === "/home-2";
    const isCurrentHome3 = location.pathname === "/home-3";

    let currentHome = "Home";

    if (isHome1) {
        currentHome = "Home 1";
    } else if (isCurrentHome2) {
        currentHome = "Home 2";
    } else if (isCurrentHome3) {
        currentHome = "Home 3";
    }

    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    const closeMobileMenu = () => {
        setMenuOpen(false);
        setHomeOpen(false);
        setPagesOpen(false);
    };

    /* =========================================
       PAGES CLICK
    ========================================= */

    const handlePagesClick = (e) => {
        e.preventDefault();
        setPagesOpen(!pagesOpen);
    };

    /* =========================================
       MOBILE PAGES CLICK
    ========================================= */

    const handleMobilePagesClick = () => {
        setPagesOpen(!pagesOpen);
    };

    return (
        <nav
            className={`main-navbar ${isHome2 ? "home2-main-navbar" : ""
                }`}
        >
            {/* =========================================
               NAVBAR CONTAINER
            ========================================= */}

            <div className="navbar-container">

                {/* =====================================
                   LOGO
                ===================================== */}

                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMobileMenu}
                >
                    <div className="logo-circle">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M13.5 2L6 13h5l-1 9 7.5-12h-5L13.5 2z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <span className="logo-text">
                        Sunex<span>.</span>
                    </span>
                </Link>

                {/* =====================================
                   DESKTOP NAVIGATION
                ===================================== */}

                <div className="navbar-menu">

                    {/* =================================
                       HOME
                    ================================= */}

                    <div className="nav-dropdown">
                        <Link
                            to="/"
                            className={`nav-link ${isHome1 ||
                                isCurrentHome2 ||
                                isCurrentHome3
                                ? "active"
                                : ""
                                }`}
                        >
                            <span>Home</span>

                            <span className="arrow">
                                ⌄
                            </span>
                        </Link>

                        <div className="dropdown-menu">
                            <Link
                                to="/"
                                className={
                                    isHome1
                                        ? "selected-home"
                                        : ""
                                }
                            >
                                Home-Version-1
                            </Link>

                            <Link
                                to="/home-2"
                                className={
                                    isCurrentHome2
                                        ? "selected-home"
                                        : ""
                                }
                            >
                                Home-Version-2
                            </Link>

                            <Link
                                to="/home-3"
                                className={
                                    isCurrentHome3
                                        ? "selected-home"
                                        : ""
                                }
                            >
                                Home-Version-3
                            </Link>
                        </div>
                    </div>

                    {/* =================================
                       ABOUT
                    ================================= */}

                    <Link
                        to="/about"
                        className="nav-link"
                    >
                        About Us
                    </Link>

                    {/* =================================
                       SERVICES
                    ================================= */}

                    <Link
                        to="/services"
                        className="nav-link"
                    >
                        Services
                    </Link>

                    {/* =================================
                       BLOGS
                    ================================= */}

                    <Link
                        to="/blogs"
                        className="nav-link"
                    >
                        Blogs
                    </Link>

                    {/* =================================
                       PAGES
                    ================================= */}

                    <div className="nav-dropdown">

                        <a
                            href="#"
                            className="nav-link"
                            onClick={handlePagesClick}
                        >
                            <span>Pages</span>

                            <span className="arrow">
                                ⌄
                            </span>
                        </a>

                        <div className="dropdown-menu pages-dropdown">

                            {/* 1. SERVICE DETAILS */}
                            <Link to="/service-details">
                                Service Details
                            </Link>

                            {/* 2. BLOG DETAILS */}
                            <Link to="/blog-details">
                                Blog Details
                            </Link>

                            {/* 3. PROJECTS */}
                            <Link to="/projects">
                                Projects
                            </Link>

                            {/* 4. PROJECT DETAILS */}
                            <Link to="/project-details">
                                Project Details
                            </Link>

                            {/* 5. IMAGE GALLERY */}
                            <Link to="/gallery">
                                Image Gallery
                            </Link>

                            {/* 6. 404 */}
                            <Link to="/404">
                                404
                            </Link>

                        </div>
                    </div>

                    {/* =================================
                       CONTACT
                    ================================= */}

                    <Link
                        to="/contact"
                        className="nav-link"
                    >
                        Contact Us
                    </Link>

                </div>

                {/* =====================================
                   DESKTOP CONTACT BUTTON
                ===================================== */}

                <Link
                    to="/contact"
                    className="navbar-button"
                >
                    <span>
                        Contact Us
                    </span>

                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 19L19 5" />
                        <path d="M9 5h10v10" />
                    </svg>
                </Link>

                {/* =====================================
                   MOBILE HAMBURGER
                ===================================== */}

                <button
                    type="button"
                    className={`mobile-menu-button ${menuOpen ? "open" : ""
                        }`}
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Toggle mobile menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

            </div>

            {/* =========================================
               MOBILE MENU
            ========================================= */}

            <div
                className={`mobile-menu ${menuOpen ? "show" : ""
                    }`}
            >

                {/* =====================================
                   MOBILE HOME
                ===================================== */}

                <div className="mobile-dropdown">

                    <button
                        type="button"
                        className={`mobile-nav-link ${homeOpen ? "active" : ""
                            }`}
                        onClick={() =>
                            setHomeOpen(!homeOpen)
                        }
                        aria-expanded={homeOpen}
                    >
                        <span>
                            {currentHome}
                        </span>

                        <span
                            className={`mobile-arrow ${homeOpen ? "rotate" : ""
                                }`}
                        >
                            ▾
                        </span>
                    </button>

                    {/* HOME OPTIONS */}

                    <div
                        className={`mobile-submenu ${homeOpen ? "show" : ""
                            }`}
                    >
                        <Link
                            to="/"
                            className={
                                isHome1
                                    ? "active-home-option"
                                    : ""
                            }
                            onClick={closeMobileMenu}
                        >
                            Home 1
                        </Link>

                        <Link
                            to="/home-2"
                            className={
                                isCurrentHome2
                                    ? "active-home-option"
                                    : ""
                            }
                            onClick={closeMobileMenu}
                        >
                            Home 2
                        </Link>

                        <Link
                            to="/home-3"
                            className={
                                isCurrentHome3
                                    ? "active-home-option"
                                    : ""
                            }
                            onClick={closeMobileMenu}
                        >
                            Home 3
                        </Link>
                    </div>

                </div>

                {/* =====================================
                   MOBILE ABOUT
                ===================================== */}

                <Link
                    to="/about"
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    About Us
                </Link>

                {/* =====================================
                   MOBILE SERVICES
                ===================================== */}

                <Link
                    to="/services"
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    Services
                </Link>

                {/* =====================================
                   MOBILE BLOGS
                ===================================== */}

                <Link
                    to="/blogs"
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    Blogs
                </Link>

                {/* =====================================
                   MOBILE PAGES
                ===================================== */}

                <div className="mobile-dropdown">

                    <button
                        type="button"
                        className={`mobile-nav-link ${pagesOpen ? "active" : ""
                            }`}
                        onClick={handleMobilePagesClick}
                        aria-expanded={pagesOpen}
                    >
                        <span>
                            Pages
                        </span>

                        <span
                            className={`mobile-arrow ${pagesOpen ? "rotate" : ""
                                }`}
                        >
                            ▾
                        </span>
                    </button>

                    <div
                        className={`mobile-submenu ${pagesOpen ? "show" : ""
                            }`}
                    >

                        {/* 1. SERVICE DETAILS */}
                        <Link
                            to="/service-details"
                            onClick={closeMobileMenu}
                        >
                            Service Details
                        </Link>

                        {/* 2. BLOG DETAILS */}
                        <Link
                            to="/blog-details"
                            onClick={closeMobileMenu}
                        >
                            Blog Details
                        </Link>

                        {/* 3. PROJECTS */}
                        <Link
                            to="/projects"
                            onClick={closeMobileMenu}
                        >
                            Projects
                        </Link>

                        {/* 4. PROJECT DETAILS */}
                        <Link
                            to="/project-details"
                            onClick={closeMobileMenu}
                        >
                            Project Details
                        </Link>

                        {/* 5. IMAGE GALLERY */}
                        <Link
                            to="/gallery"
                            onClick={closeMobileMenu}
                        >
                            Image Gallery
                        </Link>

                        {/* 6. 404 */}
                        <Link
                            to="/404"
                            onClick={closeMobileMenu}
                        >
                            404
                        </Link>

                    </div>

                </div>

                {/* =====================================
                   MOBILE CONTACT
                ===================================== */}

                <Link
                    to="/contact"
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    Contact Us
                </Link>

                {/* =====================================
                   MOBILE CONTACT BUTTON
                ===================================== */}

                <Link
                    to="/contact"
                    className="mobile-contact-button"
                    onClick={closeMobileMenu}
                >
                    <span>
                        Contact Us
                    </span>

                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 19L19 5" />
                        <path d="M9 5h10v10" />
                    </svg>
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;