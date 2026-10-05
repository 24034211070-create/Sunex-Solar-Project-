import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Image,
    Info,
    Wrench,
    CircleHelp,
    BadgeDollarSign,
    Sun,
    BarChart3,
    Briefcase,
    MessageSquare,
    Newspaper,
} from "lucide-react";

const homeSections = [
    {
        title: "Hero",
        description: "Manage the main Home hero section.",
        icon: Image,
        path: "/admin/pages/home/hero",
    },
    {
        title: "About",
        description: "Manage company information and About content.",
        icon: Info,
        path: "/admin/pages/home/about",
    },
    {
        title: "Services1",
        description: "Manage Home services section.",
        icon: Wrench,
        path: "/admin/pages/home/services1",
    },
    {
        title: "Why Choose Us",
        description: "Manage Why Choose Us section.",
        icon: CircleHelp,
        path: "/admin/pages/home/whychooseus",
    },
    {
        title: "Story",
        description: "Manage Home story section.",
        icon: Newspaper,
        path: "/admin/pages/home/story",
    },
    {
        title: "Pricing",
        description: "Manage pricing section.",
        icon: BadgeDollarSign,
        path: "/admin/pages/home/pricing",
    },
    {
        title: "Solar Feature",
        description: "Manage Solar Feature section.",
        icon: Sun,
        path: "/admin/pages/home/feature",
    },
    {
        title: "Fun Fact",
        description: "Manage statistics and fun facts.",
        icon: BarChart3,
        path: "/admin/pages/home/funfact",
    },
    {
        title: "Work",
        description: "Manage Home work and project section.",
        icon: Briefcase,
        path: "/admin/pages/home/work",
    },
    {
        title: "FAQ",
        description: "Manage frequently asked questions.",
        icon: CircleHelp,
        path: "/admin/pages/home/faq",
    },
    {
        title: "States",
        description: "Manage Home statistics and states.",
        icon: BarChart3,
        path: "/admin/pages/home/states",
    },
    {
        title: "Testimonials",
        description: "Manage customer testimonials.",
        icon: MessageSquare,
        path: "/admin/pages/home/testi",
    },
    {
        title: "Latest Blog",
        description: "Manage Latest Blog section.",
        icon: Newspaper,
        path: "/admin/pages/home/blog",
    },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Home Page
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Select a Home 1 section to manage its content.
                </p>
            </div>

            {/* HOME SECTIONS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {homeSections.map((section) => {
                    const Icon = section.icon;

                    return (
                        <button
                            key={section.title}
                            type="button"
                            onClick={() => navigate(section.path)}
                            className="group flex min-h-[150px] w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-400 hover:shadow-md"
                        >
                            <div className="flex min-w-0 items-start gap-4">

                                {/* ICON */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-200 group-hover:bg-green-500 group-hover:text-white">
                                    <Icon size={22} />
                                </div>

                                {/* TEXT */}
                                <div className="min-w-0">

                                    <h2 className="text-base font-semibold text-slate-900">
                                        {section.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-5 text-slate-500">
                                        {section.description}
                                    </p>

                                </div>
                            </div>

                            {/* ARROW */}
                            <ArrowRight
                                size={19}
                                className="ml-3 shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-green-500"
                            />
                        </button>
                    );
                })}

            </div>
        </div>
    );
};

export default Home;