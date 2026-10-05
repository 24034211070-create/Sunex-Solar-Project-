import React from "react";
import {
    Home,
    Info,
    Wrench,
    FolderKanban,
    Newspaper,
    Phone,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const pages = [
    {
        name: "Home",
        description: "Manage Home page content, sections, headings and images.",
        icon: Home,
        path: "/admin/pages/home",
    },
    {
        name: "About",
        description: "Manage About page content, images and company information.",
        icon: Info,
        path: "/admin/pages/about",
    },
    {
        name: "Services",
        description: "Manage services content, descriptions and images.",
        icon: Wrench,
        path: "/admin/pages/services",
    },
    {
        name: "Projects",
        description: "Manage project content, images and project information.",
        icon: FolderKanban,
        path: "/admin/pages/projects",
    },
    {
        name: "Blog",
        description: "Manage blog posts, headings, descriptions and images.",
        icon: Newspaper,
        path: "/admin/pages/blog",
    },
    {
        name: "Contact",
        description: "Manage contact information and contact page content.",
        icon: Phone,
        path: "/admin/pages/contact",
    },
];

const Pages = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Pages
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage your Sunex website pages and their content.
                </p>
            </div>

            {/* PAGE CARDS */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {pages.map((page) => {
                    const Icon = page.icon;

                    return (
                        <div
                            key={page.name}
                            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                        >

                            {/* ICON */}
                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                    <Icon size={22} />
                                </div>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                    Page
                                </span>

                            </div>

                            {/* CONTENT */}
                            <div className="mt-5">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    {page.name}
                                </h2>

                                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                                    {page.description}
                                </p>

                            </div>

                            {/* BUTTON */}
                            <button
                                type="button"
                                onClick={() => navigate(page.path)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600"
                            >
                                Manage {page.name}

                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />
                            </button>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Pages;
