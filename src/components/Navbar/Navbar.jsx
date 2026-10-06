import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { getPages } from "../../Api/api";

const Navbar = ({ variant = "default" }) => {
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [homeOpen, setHomeOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);

    const [navbar, setNavbar] = useState({
        logoText: "Sunex",
        logoImage: "",
        logoLink: "/",

        homeText: "Home",
        aboutText: "About Us",
        aboutLink: "/about",

        servicesText: "Services",
        servicesLink: "/services",

        blogsText: "Blogs",
        blogsLink: "/blogs",

        pagesText: "Pages",

        contactText: "Contact Us",
        contactLink: "/contact",

        buttonText: "Contact Us",
        buttonLink: "/contact",

        homeDropdown: [
            {
                text: "Home-Version-1",
                mobileText: "Home 1",
                link: "/",
            },
            {
                text: "Home-Version-2",
                mobileText: "Home 2",
                link: "/home-2",
            },
            {
                text: "Home-Version-3",
                mobileText: "Home 3",
                link: "/home-3",
            },
        ],

        pagesDropdown: [
            {
                text: "Service Details",
                link: "/service-details",
            },
            {
                text: "Blog Details",
                link: "/blog-details",
            },
            {
                text: "Projects",
                link: "/projects",
            },
            {
                text: "Project Details",
                link: "/project-details",
            },
            {
                text: "Image Gallery",
                link: "/gallery",
            },
            {
                text: "404",
                link: "/404",
            },
        ],
    });

    const isHome2 = variant === "home2";

    /* =========================================
       LOAD NAVBAR FROM CMS
    ========================================= */

    useEffect(() => {
        const loadNavbar = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() === "navbar" &&
                        page.section_name?.trim().toLowerCase() === "navbar"
                );

                if (!data?.content) return;

                const content = data.content;

                setNavbar((previous) => ({
                    ...previous,

                    logoText:
                        content.logoText ??
                        previous.logoText,

                    logoImage:
                        content.logoImage ??
                        previous.logoImage,

                    logoLink:
                        content.logoLink ??
                        previous.logoLink,

                    homeText:
                        content.homeText ??
                        previous.homeText,

                    aboutText:
                        content.aboutText ??
                        previous.aboutText,

                    aboutLink:
                        content.aboutLink ??
                        previous.aboutLink,

                    servicesText:
                        content.servicesText ??
                        previous.servicesText,

                    servicesLink:
                        content.servicesLink ??
                        previous.servicesLink,

                    blogsText:
                        content.blogsText ??
                        previous.blogsText,

                    blogsLink:
                        content.blogsLink ??
                        previous.blogsLink,

                    pagesText:
                        content.pagesText ??
                        previous.pagesText,

                    contactText:
                        content.contactText ??
                        previous.contactText,

                    contactLink:
                        content.contactLink ??
                        previous.contactLink,

                    buttonText:
                        content.buttonText ??
                        previous.buttonText,

                    buttonLink:
                        content.buttonLink ??
                        previous.buttonLink,

                    homeDropdown:
                        Array.isArray(content.homeDropdown) &&
                            content.homeDropdown.length > 0
                            ? content.homeDropdown
                            : previous.homeDropdown,

                    pagesDropdown:
                        Array.isArray(content.pagesDropdown) &&
                            content.pagesDropdown.length > 0
                            ? content.pagesDropdown
                            : previous.pagesDropdown,
                }));
            } catch (error) {
                console.error("Navbar load error:", error);
            }
        };

        loadNavbar();
    }, []);

    /* =========================================
       CURRENT HOME VERSION
    ========================================= */

    const isHome1 = location.pathname === "/";
    const isCurrentHome2 = location.pathname === "/home-2";
    const isCurrentHome3 = location.pathname === "/home-3";

    let currentHome = navbar.homeText;

    if (isHome1) {
        currentHome =
            navbar.homeDropdown?.[0]?.mobileText ||
            "Home 1";
    } else if (isCurrentHome2) {
        currentHome =
            navbar.homeDropdown?.[1]?.mobileText ||
            "Home 2";
    } else if (isCurrentHome3) {
        currentHome =
            navbar.homeDropdown?.[2]?.mobileText ||
            "Home 3";
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
                    to={navbar.logoLink || "/"}
                    className="navbar-logo"
                    onClick={closeMobileMenu}
                >
                    {navbar.logoImage ? (
                        <img
                            src={navbar.logoImage}
                            alt={navbar.logoText || "Logo"}
                            className="navbar-logo-image"
                        />
                    ) : (
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
                    )}

                    <span className="logo-text">
                        {navbar.logoText}
                        <span>.</span>
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
                            to={
                                navbar.homeDropdown?.[0]?.link ||
                                "/"
                            }
                            className={`nav-link ${isHome1 ||
                                isCurrentHome2 ||
                                isCurrentHome3
                                ? "active"
                                : ""
                                }`}
                        >
                            <span>{navbar.homeText}</span>

                            <span className="arrow">
                                ⌄
                            </span>
                        </Link>

                        <div className="dropdown-menu">
                            {navbar.homeDropdown?.map(
                                (item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link || "#"}
                                        className={
                                            location.pathname ===
                                                item.link
                                                ? "selected-home"
                                                : ""
                                        }
                                    >
                                        {item.text}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* =================================
                       ABOUT
                    ================================= */}

                    <Link
                        to={navbar.aboutLink || "/about"}
                        className="nav-link"
                    >
                        {navbar.aboutText}
                    </Link>

                    {/* =================================
                       SERVICES
                    ================================= */}

                    <Link
                        to={
                            navbar.servicesLink ||
                            "/services"
                        }
                        className="nav-link"
                    >
                        {navbar.servicesText}
                    </Link>

                    {/* =================================
                       BLOGS
                    ================================= */}

                    <Link
                        to={navbar.blogsLink || "/blogs"}
                        className="nav-link"
                    >
                        {navbar.blogsText}
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
                            <span>{navbar.pagesText}</span>

                            <span className="arrow">
                                ⌄
                            </span>
                        </a>

                        <div className="dropdown-menu pages-dropdown">

                            {navbar.pagesDropdown?.map(
                                (item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link || "#"}
                                    >
                                        {item.text}
                                    </Link>
                                )
                            )}

                        </div>
                    </div>

                    {/* =================================
                       CONTACT
                    ================================= */}

                    <Link
                        to={
                            navbar.contactLink ||
                            "/contact"
                        }
                        className="nav-link"
                    >
                        {navbar.contactText}
                    </Link>

                </div>

                {/* =====================================
                   DESKTOP CONTACT BUTTON
                ===================================== */}

                <Link
                    to={
                        navbar.buttonLink ||
                        "/contact"
                    }
                    className="navbar-button"
                >
                    <span>
                        {navbar.buttonText}
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
                        {navbar.homeDropdown?.map(
                            (item, index) => (
                                <Link
                                    key={index}
                                    to={item.link || "#"}
                                    className={
                                        location.pathname ===
                                            item.link
                                            ? "active-home-option"
                                            : ""
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >
                                    {item.mobileText ||
                                        item.text}
                                </Link>
                            )
                        )}
                    </div>

                </div>

                {/* =====================================
                   MOBILE ABOUT
                ===================================== */}

                <Link
                    to={
                        navbar.aboutLink ||
                        "/about"
                    }
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    {navbar.aboutText}
                </Link>

                {/* =====================================
                   MOBILE SERVICES
                ===================================== */}

                <Link
                    to={
                        navbar.servicesLink ||
                        "/services"
                    }
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    {navbar.servicesText}
                </Link>

                {/* =====================================
                   MOBILE BLOGS
                ===================================== */}

                <Link
                    to={
                        navbar.blogsLink ||
                        "/blogs"
                    }
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    {navbar.blogsText}
                </Link>

                {/* =====================================
                   MOBILE PAGES
                ===================================== */}

                <div className="mobile-dropdown">

                    <button
                        type="button"
                        className={`mobile-nav-link ${pagesOpen ? "active" : ""
                            }`}
                        onClick={
                            handleMobilePagesClick
                        }
                        aria-expanded={pagesOpen}
                    >
                        <span>
                            {navbar.pagesText}
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
                        {navbar.pagesDropdown?.map(
                            (item, index) => (
                                <Link
                                    key={index}
                                    to={item.link || "#"}
                                    onClick={
                                        closeMobileMenu
                                    }
                                >
                                    {item.text}
                                </Link>
                            )
                        )}
                    </div>

                </div>

                {/* =====================================
                   MOBILE CONTACT
                ===================================== */}

                <Link
                    to={
                        navbar.contactLink ||
                        "/contact"
                    }
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                >
                    {navbar.contactText}
                </Link>

                {/* =====================================
                   MOBILE CONTACT BUTTON
                ===================================== */}

                <Link
                    to={
                        navbar.buttonLink ||
                        "/contact"
                    }
                    className="mobile-contact-button"
                    onClick={closeMobileMenu}
                >
                    <span>
                        {navbar.buttonText}
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
