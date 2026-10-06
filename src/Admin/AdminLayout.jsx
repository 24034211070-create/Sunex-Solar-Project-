import React, { useState } from "react";

import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    Wrench,
    Users,
    Settings,
    LogOut,
    Sun,
    ChevronDown,
    ChevronRight,
    Mail,
} from "lucide-react";

import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    Routes,
    Route,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

// ================= MAIN ADMIN PAGES =================

import Dashboard from "./Dashboard";
import Services from "./Services";
import UsersPage from "./Users";

// ================= HOME PAGES =================

import Home from "./Pages/Home";
import About from "./Pages/About";
import Hero from "./Pages/Hero";
import Services1 from "./Pages/Services1";
import WhyChooseUs from "./Pages/WhyChooseUs";
import Story from "./Pages/Story";
import Pricing from "./Pages/Pricing";
import Feature from "./Pages/Feature";
import FunFact from "./Pages/FunFact";
import Work from "./Pages/Work";
import Faq from "./Pages/Faq";
import States from "./Pages/States";
import Testi from "./Pages/Testi";
import LatestBlog from "./Pages/LatestBlog";

// ================= NAVBAR PAGES =================

import Topbar from "../Admin/Navbar/Topbar";
import Contactnav from "../Admin/Navbar/Contactnav";
import Navbar from "../Admin/Navbar/Navbar";
// ================= BLOG PAGES =================

import Blog from "./Blog/Blog";
import BlogDetail from "./PagesDetail/BlogDetail";

// ================= PROJECT PAGES =================

import Projects from "./PagesDetail/Projects";

// ================= IMAGE GALLERY =================

import ImageGallery from "./PagesDetail/ImageGallery";

// ================= ABOUT US PAGES =================

import AboutUsHero from "./AboutUs/Hero";
import AboutUsApproach from "./AboutUs/Approach";
import AboutUsWhatWeDo from "./AboutUs/WhatWeDo";
import AboutUsAdvantage from "./AboutUs/Advantage";
import AboutUsExpertTeam from "./AboutUs/ExpertTeam";

// ================= SERVICES PAGES =================

import ServicesHero from "./Services/Hero";
import ServicesDetail from "./Services/ServiceDetail";

// ================= CONTACT US =================

import Contact from "../Admin/ContactUs/Contact";

// =====================================================
// ADMIN LAYOUT
// =====================================================

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // ================= SIDEBAR STATES =================

    const [pagesOpen, setPagesOpen] = useState(
        location.pathname.startsWith("/admin/pages")
    );

    const [homeOpen, setHomeOpen] = useState(
        location.pathname.startsWith("/admin/pages/home")
    );

    const [aboutUsOpen, setAboutUsOpen] = useState(
        location.pathname.startsWith("/admin/pages/about-us")
    );

    const [servicesOpen, setServicesOpen] = useState(
        location.pathname.startsWith("/admin/pages/services")
    );

    const [projectsOpen, setProjectsOpen] = useState(
        location.pathname.startsWith("/admin/pages/projects")
    );

    const [navbarOpen, setNavbarOpen] = useState(
        location.pathname.startsWith("/admin/pages/navbar")
    );

    // ================= LOGOUT =================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <SidebarProvider>

            <div className="flex min-h-screen w-full bg-slate-50">

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <Sidebar>

                    <SidebarContent>

                        {/* ================= LOGO ================= */}

                        <div className="flex items-center gap-2 px-5 py-5">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                <Sun
                                    size={22}
                                    className="text-white"
                                />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold text-slate-900">
                                    Sunex
                                </h1>

                                <p className="text-xs text-slate-500">
                                    Admin Panel
                                </p>
                            </div>

                        </div>


                        {/* =================================================
                            MAIN MENU
                        ================================================== */}

                        <SidebarGroup>

                            <SidebarGroupLabel>
                                Main Menu
                            </SidebarGroupLabel>

                            <SidebarGroupContent>

                                <SidebarMenu>

                                    {/* ================= DASHBOARD ================= */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton asChild>

                                            <NavLink
                                                to="/admin"
                                                end
                                                className={({ isActive }) =>
                                                    `flex items - center gap - 3 ${isActive
                                                        ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                                        : "text-slate-700 hover:bg-green-50"
                                                    } `
                                                }
                                            >

                                                <LayoutDashboard size={18} />

                                                <span>
                                                    Dashboard
                                                </span>

                                            </NavLink>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>


                                    {/* =================================================
                                        PAGES
                                    ================================================== */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton
                                            onClick={() =>
                                                setPagesOpen(!pagesOpen)
                                            }
                                            className="cursor-pointer"
                                        >

                                            <FileText size={18} />

                                            <span className="flex-1 text-left">
                                                Pages
                                            </span>

                                            {pagesOpen ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}

                                        </SidebarMenuButton>


                                        {pagesOpen && (

                                            <div className="ml-4 mt-1 border-l border-slate-200 pl-2">

                                                {/* =================================================
                                                    HOME
                                                ================================================== */}

                                                <div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setHomeOpen(
                                                                !homeOpen
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-green-50"
                                                    >

                                                        {homeOpen ? (
                                                            <ChevronDown size={15} />
                                                        ) : (
                                                            <ChevronRight size={15} />
                                                        )}

                                                        <span>
                                                            Home
                                                        </span>

                                                    </button>


                                                    {homeOpen && (

                                                        <div className="ml-5 border-l border-slate-200 pl-2">

                                                            <NavLink
                                                                to="/admin/pages/home"
                                                                end
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Home Sections
                                                            </NavLink>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* =================================================
                                                    ABOUT US
                                                ================================================== */}

                                                <div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setAboutUsOpen(
                                                                !aboutUsOpen
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-green-50"
                                                    >

                                                        {aboutUsOpen ? (
                                                            <ChevronDown size={15} />
                                                        ) : (
                                                            <ChevronRight size={15} />
                                                        )}

                                                        <span>
                                                            About Us
                                                        </span>

                                                    </button>


                                                    {aboutUsOpen && (

                                                        <div className="ml-5 border-l border-slate-200 pl-2">

                                                            <NavLink
                                                                to="/admin/pages/about-us"
                                                                end
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                About Us Sections
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/about-us/hero"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Hero
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/about-us/approach"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Approach
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/about-us/what-we-do"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                What We Do
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/about-us/advantage"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Advantage
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/about-us/expert-team"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Expert Team
                                                            </NavLink>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* =================================================
                                                    SERVICES
                                                ================================================== */}

                                                <div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setServicesOpen(
                                                                !servicesOpen
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-green-50"
                                                    >

                                                        {servicesOpen ? (
                                                            <ChevronDown size={15} />
                                                        ) : (
                                                            <ChevronRight size={15} />
                                                        )}

                                                        <span>
                                                            Services
                                                        </span>

                                                    </button>


                                                    {servicesOpen && (

                                                        <div className="ml-5 border-l border-slate-200 pl-2">

                                                            <NavLink
                                                                to="/admin/pages/services"
                                                                end
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Services Sections
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/hero"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Hero
                                                            </NavLink>


                                                            <div className="mt-2 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                                Inner Pages
                                                            </div>


                                                            <NavLink
                                                                to="/admin/pages/services/solar-battery-storage"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Solar Battery Storage
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/residential-solar-solutions"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Residential Solar Solutions
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/solar-system-maintenance"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Solar System Maintenance
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/rooftop-solar-solutions"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Rooftop Solar Solutions
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/solar-panel-maintenance"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Solar Panel Maintenance
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/services/hybrid-solar-systems"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Hybrid Solar Systems
                                                            </NavLink>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* =================================================
                                                    BLOG
                                                ================================================== */}

                                                <div className="mt-2 space-y-1">

                                                    <NavLink
                                                        to="/admin/pages/blog"
                                                        className={({ isActive }) =>
                                                            `flex items - center gap - 2 rounded - md px - 3 py - 2 text - sm font - medium ${isActive
                                                                ? "bg-green-500 text-white"
                                                                : "text-slate-700 hover:bg-green-50"
                                                            } `
                                                        }
                                                    >

                                                        <FileText size={15} />

                                                        Blog

                                                    </NavLink>


                                                    <NavLink
                                                        to="/admin/pages/blog-details"
                                                        className={({ isActive }) =>
                                                            `flex items - center gap - 2 rounded - md px - 3 py - 2 text - sm font - medium ${isActive
                                                                ? "bg-green-500 text-white"
                                                                : "text-slate-700 hover:bg-green-50"
                                                            } `
                                                        }
                                                    >

                                                        <FileText size={15} />

                                                        Blog Details

                                                    </NavLink>

                                                </div>


                                                {/* =================================================
                                                    PROJECTS
                                                ================================================== */}

                                                <div className="mt-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setProjectsOpen(
                                                                !projectsOpen
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-green-50"
                                                    >

                                                        {projectsOpen ? (
                                                            <ChevronDown size={15} />
                                                        ) : (
                                                            <ChevronRight size={15} />
                                                        )}

                                                        <FolderKanban size={15} />

                                                        <span>
                                                            Projects
                                                        </span>

                                                    </button>


                                                    {projectsOpen && (

                                                        <div className="ml-5 border-l border-slate-200 pl-2">

                                                            <NavLink
                                                                to="/admin/pages/projects"
                                                                end
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Projects Page
                                                            </NavLink>


                                                            <div className="mt-2 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                                Inner Pages
                                                            </div>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-1"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 1
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-2"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 2
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-3"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 3
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-4"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 4
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-5"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 5
                                                            </NavLink>


                                                            <NavLink
                                                                to="/admin/pages/projects/project-6"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Project 6
                                                            </NavLink>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* =================================================
                                                    IMAGE GALLERY
                                                ================================================== */}

                                                <div className="mt-2">

                                                    <NavLink
                                                        to="/admin/pages/image-gallery"
                                                        className={({ isActive }) =>
                                                            `flex items - center gap - 2 rounded - md px - 3 py - 2 text - sm font - medium ${isActive
                                                                ? "bg-green-500 text-white"
                                                                : "text-slate-700 hover:bg-green-50"
                                                            } `
                                                        }
                                                    >

                                                        <FileText size={15} />

                                                        <span>
                                                            Image Gallery
                                                        </span>

                                                    </NavLink>

                                                </div>


                                                {/* =================================================
                                                    NAVBAR
                                                ================================================== */}

                                                <div className="mt-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setNavbarOpen(
                                                                !navbarOpen
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-green-50"
                                                    >

                                                        {navbarOpen ? (
                                                            <ChevronDown size={15} />
                                                        ) : (
                                                            <ChevronRight size={15} />
                                                        )}

                                                        <FileText size={15} />

                                                        <span>
                                                            Navbar
                                                        </span>

                                                    </button>


                                                    {navbarOpen && (

                                                        <div className="ml-5 border-l border-slate-200 pl-2">

                                                            {/* TOPBAR */}

                                                            <NavLink
                                                                to="/admin/pages/navbar/topbar"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Topbar
                                                            </NavLink>


                                                            {/* CONTACT BAR */}

                                                            <NavLink
                                                                to="/admin/pages/navbar/contact-bar"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Contact Bar
                                                            </NavLink>


                                                            {/* NAVBAR */}

                                                            <NavLink
                                                                to="/admin/pages/navbar/navbar"
                                                                className={({ isActive }) =>
                                                                    `mb - 1 block rounded - md px - 3 py - 2 text - sm ${isActive
                                                                        ? "bg-green-500 text-white"
                                                                        : "text-slate-600 hover:bg-green-50"
                                                                    } `
                                                                }
                                                            >
                                                                Navbar
                                                            </NavLink>

                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                        )}

                                    </SidebarMenuItem>


                                    {/* ================= SERVICES ================= */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton asChild>

                                            <NavLink
                                                to="/admin/services"
                                                className={({ isActive }) =>
                                                    `flex items - center gap - 3 ${isActive
                                                        ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                                        : "text-slate-700 hover:bg-green-50"
                                                    } `
                                                }
                                            >

                                                <Wrench size={18} />

                                                <span>
                                                    Services
                                                </span>

                                            </NavLink>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>


                                    {/* ================= CONTACT US ================= */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton asChild>

                                            <NavLink
                                                to="/admin/contact-us"
                                                className={({ isActive }) =>
                                                    `flex items - center gap - 3 ${isActive
                                                        ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                                        : "text-slate-700 hover:bg-green-50"
                                                    } `
                                                }
                                            >

                                                <Mail size={18} />

                                                <span>
                                                    Contact Us
                                                </span>

                                            </NavLink>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>


                                    {/* ================= USERS ================= */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton asChild>

                                            <NavLink
                                                to="/admin/users"
                                                className={({ isActive }) =>
                                                    `flex items - center gap - 3 ${isActive
                                                        ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                                        : "text-slate-700 hover:bg-green-50"
                                                    } `
                                                }
                                            >

                                                <Users size={18} />

                                                <span>
                                                    Users
                                                </span>

                                            </NavLink>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>

                                </SidebarMenu>

                            </SidebarGroupContent>

                        </SidebarGroup>


                        {/* =================================================
                            SETTINGS / LOGOUT
                        ================================================== */}

                        <SidebarGroup className="mt-auto">

                            <SidebarGroupContent>

                                <SidebarMenu>

                                    {/* SETTINGS */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton
                                            className="cursor-pointer text-slate-700 hover:bg-green-50"
                                        >

                                            <Settings size={18} />

                                            <span>
                                                Settings
                                            </span>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>


                                    {/* LOGOUT */}

                                    <SidebarMenuItem>

                                        <SidebarMenuButton
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
                                        >

                                            <LogOut size={18} />

                                            <span>
                                                Logout
                                            </span>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>

                                </SidebarMenu>

                            </SidebarGroupContent>

                        </SidebarGroup>

                    </SidebarContent>

                </Sidebar>


                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <main className="flex min-w-0 flex-1 flex-col">

                    {/* HEADER */}

                    <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6">

                        <SidebarTrigger />

                        <div className="ml-4">

                            <h2 className="text-lg font-semibold text-slate-800">
                                Sunex Admin Panel
                            </h2>

                        </div>

                    </header>


                    {/* PAGE CONTENT */}

                    <div className="flex-1 p-6">

                        <Routes>

                            {/* =================================================
                                DASHBOARD
                            ================================================== */}

                            <Route
                                path="/"
                                element={<Dashboard />}
                            />


                            {/* =================================================
                                HOME
                            ================================================== */}

                            <Route
                                path="/pages/home"
                                element={<Home />}
                            />

                            <Route
                                path="/pages/home/about"
                                element={<About />}
                            />

                            <Route
                                path="/pages/home/hero"
                                element={<Hero />}
                            />

                            <Route
                                path="/pages/home/services"
                                element={<Services1 />}
                            />

                            <Route
                                path="/pages/home/why-choose-us"
                                element={<WhyChooseUs />}
                            />

                            <Route
                                path="/pages/home/story"
                                element={<Story />}
                            />

                            <Route
                                path="/pages/home/pricing"
                                element={<Pricing />}
                            />

                            <Route
                                path="/pages/home/solar-feature"
                                element={<Feature />}
                            />

                            <Route
                                path="/pages/home/fun-fact"
                                element={<FunFact />}
                            />

                            <Route
                                path="/pages/home/work"
                                element={<Work />}
                            />

                            <Route
                                path="/pages/home/faq"
                                element={<Faq />}
                            />

                            <Route
                                path="/pages/home/states"
                                element={<States />}
                            />

                            <Route
                                path="/pages/home/testi"
                                element={<Testi />}
                            />

                            <Route
                                path="/pages/home/latest-blog"
                                element={<LatestBlog />}
                            />


                            {/* =================================================
                                NAVBAR
                            ================================================== */}

                            <Route path="/pages/navbar/topbar" element={<Topbar />} />

                            <Route path="/pages/navbar/contact-bar" element={<Contactnav />} />

                            <Route path="/pages/navbar/navbar" element={<Navbar />} />
                            {/* =================================================
                                BLOG
                            ================================================== */}

                            <Route path="/pages/blog" element={<Blog />} />

                            {/* =================================================
                                BLOG DETAILS
                            ================================================== */}

                            <Route
                                path="/pages/blog-details"
                                element={<BlogDetail />}
                            />


                            {/* =================================================
                                IMAGE GALLERY
                            ================================================== */}

                            <Route
                                path="/pages/image-gallery"
                                element={<ImageGallery />}
                            />


                            {/* =================================================
                                ABOUT US
                            ================================================== */}

                            <Route
                                path="/pages/about-us"
                                element={
                                    <div className="rounded-xl border border-slate-200 bg-white p-6">

                                        <h1 className="text-2xl font-bold text-slate-900">
                                            About Us Sections
                                        </h1>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Select a section from the sidebar.
                                        </p>

                                    </div>
                                }
                            />

                            <Route
                                path="/pages/about-us/hero"
                                element={<AboutUsHero />}
                            />

                            <Route
                                path="/pages/about-us/approach"
                                element={<AboutUsApproach />}
                            />

                            <Route
                                path="/pages/about-us/what-we-do"
                                element={<AboutUsWhatWeDo />}
                            />

                            <Route
                                path="/pages/about-us/advantage"
                                element={<AboutUsAdvantage />}
                            />

                            <Route
                                path="/pages/about-us/expert-team"
                                element={<AboutUsExpertTeam />}
                            />


                            {/* =================================================
                                SERVICES
                            ================================================== */}

                            <Route
                                path="/pages/services"
                                element={
                                    <div className="rounded-xl border border-slate-200 bg-white p-6">

                                        <h1 className="text-2xl font-bold text-slate-900">
                                            Services Sections
                                        </h1>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Select a section from the sidebar.
                                        </p>

                                    </div>
                                }
                            />

                            <Route
                                path="/pages/services/hero"
                                element={<ServicesHero />}
                            />

                            <Route
                                path="/pages/services/:slug"
                                element={<ServicesDetail />}
                            />


                            {/* =================================================
                                PROJECTS
                            ================================================== */}

                            <Route
                                path="/pages/projects"
                                element={<Projects />}
                            />


                            {/* =================================================
                                PROJECT INNER PAGES
                            ================================================== */}

                            <Route
                                path="/pages/projects/project-1"
                                element={<Projects />}
                            />

                            <Route
                                path="/pages/projects/project-2"
                                element={<Projects />}
                            />

                            <Route
                                path="/pages/projects/project-3"
                                element={<Projects />}
                            />

                            <Route
                                path="/pages/projects/project-4"
                                element={<Projects />}
                            />

                            <Route
                                path="/pages/projects/project-5"
                                element={<Projects />}
                            />

                            <Route
                                path="/pages/projects/project-6"
                                element={<Projects />}
                            />


                            {/* =================================================
                                SERVICES MAIN PAGE
                            ================================================== */}

                            <Route
                                path="/services"
                                element={<Services />}
                            />


                            {/* =================================================
                                USERS
                            ================================================== */}

                            <Route
                                path="/users"
                                element={<UsersPage />}
                            />


                            {/* =================================================
                                CONTACT US
                            ================================================== */}

                            <Route
                                path="/contact-us"
                                element={<Contact />}
                            />

                        </Routes>

                    </div>

                </main>

            </div>

        </SidebarProvider>
    );
};

export default AdminLayout;