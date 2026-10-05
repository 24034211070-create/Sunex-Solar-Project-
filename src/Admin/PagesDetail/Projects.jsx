import React, { useEffect, useState } from "react";
import {
    Save,
    RefreshCw,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import {
    getPages,
    updatePage,
    createPage
} from "../../Api/api";

import s13 from "../../assets/Home2/s13.png";
import s14 from "../../assets/Home2/s14.png";
import s15 from "../../assets/Home2/s15.png";
import r1 from "../../assets/Projects/r1.png";
import r2 from "../../assets/Projects/r2.png";
import r3 from "../../assets/Projects/r3.png";
import q1 from "../../assets/Aboutimages/q1.png";

const defaultProjects = [
    {
        id: 1,
        image: s13,
        title: "Rooftop Solar Installation For Residential Homes",
        category: "Residential Solar",
        location: "Ahmedabad, Gujarat",
        date: "January 2026",
        capacity: "15 KW",

        country: "India",
        estimatedTime: "3 Months",
        status: "Completed",

        heroTitle:
            "Rooftop Solar Installation For Residential Homes",
        fullImage: s13,

        introTitle:
            "Clean Solar Energy For Modern Homes",

        introText:
            "This residential solar project was designed to provide a reliable and sustainable source of clean energy for modern homes. The system was carefully planned according to the available rooftop area, energy requirements and long-term performance goals.",

        introText2:
            "By using solar energy, the project helps reduce dependence on conventional electricity while creating a cleaner and more efficient energy solution for everyday residential requirements.",

        detailImage1: s14,
        detailImage2: s15,

        challenges: [
            "Limited rooftop space required careful panel planning.",
            "System needed reliable daily energy generation.",
            "Panel placement had to maximize sunlight exposure.",
            "Installation needed clean rooftop appearance."
        ],

        solutionTitle:
            "A Smart Solar Solution For Residential Energy",

        solutionText:
            "Our team designed and installed a complete rooftop solar solution focused on efficiency, reliability and long-term performance. Every part of the system was planned to make the best use of the available rooftop space.",

        solutionText2:
            "From panel positioning and system configuration to installation and monitoring, the complete solution was developed around the specific requirements of the residential property.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "How does this residential solar system work?",
                answer:
                    "Solar panels capture sunlight and convert it into electricity. The generated energy can then be used by the property for its daily electricity requirements."
            },
            {
                question:
                    "How long does a rooftop solar installation take?",
                answer:
                    "The installation timeline depends on the size and requirements of the project. A typical residential installation can be completed within the planned project schedule."
            },
            {
                question:
                    "Can the system reduce electricity costs?",
                answer:
                    "Yes. Generating electricity from solar energy can reduce dependence on conventional grid electricity and help lower long-term energy costs."
            },
            {
                question:
                    "Does the solar system require maintenance?",
                answer:
                    "Solar systems require periodic inspection and basic maintenance to keep the panels and other components operating efficiently."
            }
        ]
    },

    {
        id: 2,
        image: s14,
        title: "Industrial Solar Power Installation Manufacturing",
        category: "Industrial Solar",
        location: "Vadodara, Gujarat",
        date: "February 2026",
        capacity: "250 KW",

        country: "India",
        estimatedTime: "6 Months",
        status: "Completed",

        heroTitle:
            "Industrial Solar Power Installation Manufacturing",
        fullImage: s14,

        introTitle:
            "Large-Scale Solar Power For Industry",

        introText:
            "This industrial solar project was developed to support the energy requirements of a large manufacturing facility. The solution was designed around high energy demand, efficient generation and dependable long-term operation.",

        introText2:
            "The installation provides the facility with a renewable energy source while helping create a more efficient and sustainable industrial energy infrastructure.",

        detailImage1: s15,
        detailImage2: r1,

        challenges: [
            "High industrial electricity demand required a scalable solution.",
            "Large installation areas needed detailed system planning.",
            "System required reliable energy generation throughout operations.",
            "Installation had to be coordinated with manufacturing environment."
        ],

        solutionTitle:
            "Scalable Solar Infrastructure For Industry",

        solutionText:
            "The industrial solution combines carefully planned solar panel placement with an efficient energy generation system. The installation was designed to maximize available space while maintaining reliable performance.",

        solutionText2:
            "The complete project was approached with a focus on system efficiency, operational reliability and long-term renewable energy generation.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "Is solar suitable for manufacturing facilities?",
                answer:
                    "Solar power can be used for many industrial facilities and can help supplement conventional electricity with renewable energy generation."
            },
            {
                question:
                    "Can industrial solar systems be expanded?",
                answer:
                    "A properly planned solar installation can be designed with scalability in mind, depending on available space and electrical infrastructure."
            },
            {
                question:
                    "How is industrial solar performance monitored?",
                answer:
                    "Solar systems can use monitoring solutions to track energy generation and system performance."
            },
            {
                question:
                    "Does industrial solar require regular maintenance?",
                answer:
                    "Periodic inspection, cleaning and system checks help maintain efficient long-term operation."
            }
        ]
    },

    {
        id: 3,
        image: s15,
        title: "Sustainable Solar Energy Project For Communities",
        category: "Community Solar",
        location: "Mehsana, Gujarat",
        date: "March 2026",
        capacity: "180 KW",

        country: "India",
        estimatedTime: "5 Months",
        status: "Completed",

        heroTitle:
            "Sustainable Solar Energy Project For Communities",
        fullImage: s15,

        introTitle:
            "Creating Cleaner Energy For Communities",

        introText:
            "This community solar project focuses on creating a cleaner and more sustainable source of electricity for local communities. The project was planned to support renewable energy adoption and long-term energy efficiency.",

        introText2:
            "The system demonstrates how solar technology can be integrated into community-focused energy projects while maintaining dependable energy generation.",

        detailImage1: r1,
        detailImage2: r2,

        challenges: [
            "Project needed to serve broader community energy requirements.",
            "Available installation areas required efficient planning.",
            "System needed dependable renewable generation.",
            "Long-term operation and maintenance had to be considered."
        ],

        solutionTitle:
            "Community-Focused Renewable Energy",

        solutionText:
            "The solar solution was planned around efficient energy generation and responsible use of available installation space. The project combines practical solar technology with a long-term sustainability approach.",

        solutionText2:
            "The result is a renewable energy system designed to support cleaner electricity generation for the surrounding community.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "What is a community solar project?",
                answer:
                    "A community solar project is designed to provide renewable electricity generation for a group, community or shared energy environment."
            },
            {
                question:
                    "Why is solar useful for communities?",
                answer:
                    "Solar can provide renewable electricity generation while reducing dependence on conventional energy sources."
            },
            {
                question:
                    "Can community solar projects be expanded?",
                answer:
                    "Expansion depends on available land or rooftop space, electrical infrastructure and future energy requirements."
            },
            {
                question:
                    "How is the system maintained?",
                answer:
                    "Regular inspections, cleaning and performance monitoring help maintain system efficiency."
            }
        ]
    },

    {
        id: 4,
        image: r1,
        title: "Commercial Solar Plant For Office Building",
        category: "Commercial Solar",
        location: "Surat, Gujarat",
        date: "April 2026",
        capacity: "120 KW",

        country: "India",
        estimatedTime: "4 Months",
        status: "Completed",

        heroTitle:
            "Commercial Solar Plant For Office Building",
        fullImage: r1,

        introTitle:
            "Efficient Solar Power For Commercial Spaces",

        introText:
            "This commercial solar project was created for an office building with the goal of reducing conventional electricity dependency and improving renewable energy generation.",

        introText2:
            "The system was designed to integrate efficiently with the building while maintaining a professional and reliable energy solution.",

        detailImage1: r2,
        detailImage2: r3,

        challenges: [
            "Office building required efficient use of rooftop space.",
            "Installation needed to work around existing building structure.",
            "Energy generation needed to support regular office operations.",
            "Final installation had to maintain a clean appearance."
        ],

        solutionTitle:
            "Reliable Solar Energy For Commercial Operations",

        solutionText:
            "The commercial solar solution was planned to maximize renewable energy generation while fitting naturally into the existing building infrastructure.",

        solutionText2:
            "The project combines efficient solar panels, structured installation planning and system monitoring for dependable commercial energy generation.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "Can office buildings use rooftop solar?",
                answer:
                    "Yes. Office buildings with suitable rooftop or installation areas can use solar systems to generate renewable electricity."
            },
            {
                question:
                    "Will solar work during office hours?",
                answer:
                    "Solar systems generate electricity when sunlight is available, making them suitable for buildings with daytime electricity demand."
            },
            {
                question:
                    "How much rooftop space is required?",
                answer:
                    "The required space depends on the desired system capacity and the efficiency of the selected solar panels."
            },
            {
                question:
                    "Is regular cleaning required?",
                answer:
                    "Periodic cleaning and inspection can help maintain efficient solar panel performance."
            }
        ]
    },

    {
        id: 5,
        image: r2,
        title: "Solar Installation For Educational Institute",
        category: "Institutional Solar",
        location: "Patan, Gujarat",
        date: "May 2026",
        capacity: "75 KW",

        country: "India",
        estimatedTime: "3 Months",
        status: "Completed",

        heroTitle:
            "Solar Installation For Educational Institute",
        fullImage: r2,

        introTitle:
            "Renewable Energy For Educational Spaces",

        introText:
            "This solar installation was developed for an educational institute to support renewable energy adoption and create a more sustainable campus environment.",

        introText2:
            "The project combines practical clean energy generation with a long-term approach toward reducing conventional electricity dependency.",

        detailImage1: r3,
        detailImage2: s13,

        challenges: [
            "Campus required practical renewable energy solution.",
            "Installation needed to fit existing building infrastructure.",
            "Energy generation had to support regular campus operations.",
            "Installation needed to be safe and professionally organized."
        ],

        solutionTitle:
            "A Sustainable Energy System For The Campus",

        solutionText:
            "The solar solution was designed around the institute's energy requirements and available installation space. The system provides a clean renewable energy source for the campus.",

        solutionText2:
            "The project also demonstrates how educational institutions can adopt practical renewable energy solutions for their infrastructure.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "Why is solar useful for educational institutes?",
                answer:
                    "Solar energy can help educational campuses generate renewable electricity and reduce dependence on conventional power."
            },
            {
                question:
                    "Can solar be installed on school or college rooftops?",
                answer:
                    "Suitable rooftops can be used for solar installation after evaluating structural and electrical requirements."
            },
            {
                question:
                    "Does the system need daily maintenance?",
                answer:
                    "No. Solar systems generally require periodic inspection and cleaning rather than daily maintenance."
            },
            {
                question:
                    "Can the system support daytime electricity usage?",
                answer:
                    "Solar generation during daylight hours can help support daytime electricity requirements."
            }
        ]
    },

    {
        id: 6,
        image: r3,
        title: "Hybrid Solar System For Hospital Facility",
        category: "Hybrid Solar",
        location: "Gandhinagar, Gujarat",
        date: "June 2026",
        capacity: "100 KW",

        country: "India",
        estimatedTime: "5 Months",
        status: "Completed",

        heroTitle:
            "Hybrid Solar System For Hospital Facility",
        fullImage: r3,

        introTitle:
            "Reliable Solar Energy For Critical Facilities",

        introText:
            "This hybrid solar project was designed for a hospital facility where dependable energy availability is especially important. The solution combines renewable solar generation with a reliable energy support approach.",

        introText2:
            "The project focuses on energy reliability, efficient solar generation and a system design suitable for an important healthcare environment.",

        detailImage1: s13,
        detailImage2: s14,

        challenges: [
            "Facility required dependable electricity availability.",
            "Solar system had to work with existing electrical infrastructure.",
            "Energy generation needed efficient and reliable.",
            "System planning required careful consideration of operational requirements."
        ],

        solutionTitle:
            "Hybrid Solar Technology For Reliable Power",

        solutionText:
            "The hybrid solar solution was planned to combine renewable solar generation with reliable energy support. The system was designed around the facility's operational requirements.",

        solutionText2:
            "Careful planning of the solar installation and system configuration helps create a dependable renewable energy solution for the hospital environment.",

        systemTitle:
            "Optimized Solar System Design",

        panelEfficiency: 85,
        energyOptimization: 95,

        faq: [
            {
                question:
                    "What is a hybrid solar system?",
                answer:
                    "A hybrid solar system combines solar generation with additional energy support such as battery storage or another suitable backup source."
            },
            {
                question:
                    "Why can hybrid solar be useful for hospitals?",
                answer:
                    "Healthcare facilities can benefit from energy solutions designed around reliability and continuity of power."
            },
            {
                question:
                    "Can solar work with existing electrical systems?",
                answer:
                    "Solar systems can be integrated with existing electrical infrastructure after appropriate technical assessment and system planning."
            },
            {
                question:
                    "How is a hybrid system monitored?",
                answer:
                    "Monitoring systems can track solar generation, energy usage and other system performance information."
            }
        ]
    }
];

const defaultHero = {
    title: "Our Projects",
    image: q1,
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Projects"
};

const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500";

const labelClass =
    "mb-1.5 block text-sm font-medium text-gray-700";

const getContent = (page) => {
    if (!page?.content) return {};

    if (typeof page.content === "object") {
        return page.content;
    }

    try {
        return JSON.parse(page.content);
    } catch {
        return {};
    }
};

const Projects = () => {
    const [hero, setHero] = useState(defaultHero);
    const [projects, setProjects] = useState(defaultProjects);

    const [pageId, setPageId] = useState(null);
    const [openProject, setOpenProject] = useState(1);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadProjects = async () => {
        try {
            setLoading(true);

            const response = await getPages();
            const pages = response.pages || [];

            // ONLY ONE PROJECT CMS PAGE
            const projectPage = pages
                .filter(
                    (page) =>
                        page.page_name === "Projects" &&
                        page.section_name === "Main"
                )
                .sort(
                    (a, b) =>
                        Number(b.id) - Number(a.id)
                )[0];

            if (!projectPage) {
                setHero(defaultHero);
                setProjects(defaultProjects);
                setPageId(null);
                return;
            }

            setPageId(projectPage.id);

            const content = getContent(projectPage);

            setHero({
                ...defaultHero,
                ...(content.hero || {})
            });

            if (
                Array.isArray(content.projects) &&
                content.projects.length
            ) {
                setProjects(
                    defaultProjects.map((defaultProject) => {
                        const savedProject =
                            content.projects.find(
                                (item) =>
                                    Number(item.id) ===
                                    Number(defaultProject.id)
                            );

                        return savedProject
                            ? {
                                ...defaultProject,
                                ...savedProject
                            }
                            : defaultProject;
                    })
                );
            }
        } catch (error) {
            console.error(
                "Projects CMS Load Error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const updateProject = (
        projectId,
        field,
        value
    ) => {
        setProjects((current) =>
            current.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        [field]: value
                    }
                    : project
            )
        );
    };

    const updateChallenge = (
        projectId,
        index,
        value
    ) => {
        setProjects((current) =>
            current.map((project) => {
                if (project.id !== projectId) {
                    return project;
                }

                const challenges = [
                    ...project.challenges
                ];

                challenges[index] = value;

                return {
                    ...project,
                    challenges
                };
            })
        );
    };

    const updateFaq = (
        projectId,
        index,
        field,
        value
    ) => {
        setProjects((current) =>
            current.map((project) => {
                if (project.id !== projectId) {
                    return project;
                }

                const faq = [...project.faq];

                faq[index] = {
                    ...faq[index],
                    [field]: value
                };

                return {
                    ...project,
                    faq
                };
            })
        );
    };

    const saveProjects = async () => {
        try {
            setSaving(true);

            const data = {
                page_name: "Projects",
                section_name: "Main",
                title: hero.title,
                description: "",
                image: hero.image,

                content: {
                    hero: {
                        title: hero.title,
                        image: hero.image,
                        breadcrumbHome:
                            hero.breadcrumbHome,
                        breadcrumbCurrent:
                            hero.breadcrumbCurrent
                    },

                    projects
                }
            };

            if (pageId) {
                await updatePage(
                    pageId,
                    data,
                    localStorage.getItem("token")
                );
            } else {
                const response =
                    await createPage(
                        data,
                        localStorage.getItem("token")
                    );

                setPageId(
                    response?.page?.id || null
                );
            }

            alert(
                "All Projects content saved successfully."
            );

            await loadProjects();
        } catch (error) {
            console.error(
                "Projects Save Error:",
                error
            );

            console.error(
                "Response:",
                error?.response?.data
            );

            alert(
                "Projects save failed. Check console."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2 text-gray-600">
                    <RefreshCw
                        size={18}
                        className="animate-spin"
                    />
                    Loading Projects...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">

            {/* HEADER */}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Projects
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all Projects content from one CMS page.
                    </p>
                </div>

                <button
                    onClick={saveProjects}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                    {saving ? (
                        <RefreshCw
                            size={18}
                            className="animate-spin"
                        />
                    ) : (
                        <Save size={18} />
                    )}

                    {saving
                        ? "Saving..."
                        : "Save All Changes"}
                </button>
            </div>

            {/* HERO */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                    Projects Hero
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className={labelClass}>
                            Hero Title
                        </label>

                        <input
                            className={inputClass}
                            value={hero.title}
                            onChange={(e) =>
                                setHero({
                                    ...hero,
                                    title: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Hero Background Image URL
                        </label>

                        <input
                            className={inputClass}
                            value={hero.image}
                            onChange={(e) =>
                                setHero({
                                    ...hero,
                                    image: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Breadcrumb Home
                        </label>

                        <input
                            className={inputClass}
                            value={hero.breadcrumbHome}
                            onChange={(e) =>
                                setHero({
                                    ...hero,
                                    breadcrumbHome:
                                        e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Breadcrumb Current
                        </label>

                        <input
                            className={inputClass}
                            value={hero.breadcrumbCurrent}
                            onChange={(e) =>
                                setHero({
                                    ...hero,
                                    breadcrumbCurrent:
                                        e.target.value
                                })
                            }
                        />
                    </div>

                </div>
            </div>

            {/* PROJECTS */}

            <div className="space-y-4">

                {projects.map((project) => {
                    const open =
                        openProject === project.id;

                    return (
                        <div
                            key={project.id}
                            className="rounded-xl border border-gray-200 bg-white shadow-sm"
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setOpenProject(
                                        open
                                            ? null
                                            : project.id
                                    )
                                }
                                className="flex w-full items-center justify-between p-5 text-left"
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Project {project.id}
                                        </span>

                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {project.title}
                                        </h2>
                                    </div>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Complete Project Detail Content
                                    </p>
                                </div>

                                {open ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </button>

                            {open && (
                                <div className="space-y-6 border-t border-gray-200 p-5">

                                    {/* LISTING */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Project Listing Card
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-2">

                                            <Field
                                                label="Image URL"
                                                value={project.image}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "image",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Project Title"
                                                value={project.title}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "title",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Category"
                                                value={project.category}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "category",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Location"
                                                value={project.location}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "location",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Date"
                                                value={project.date}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "date",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Capacity"
                                                value={project.capacity}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "capacity",
                                                        value
                                                    )
                                                }
                                            />

                                        </div>
                                    </div>

                                    {/* DETAIL HERO */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Project Detail Hero
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-2">

                                            <Field
                                                label="Hero Title"
                                                value={project.heroTitle}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "heroTitle",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Full Image URL"
                                                value={project.fullImage}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "fullImage",
                                                        value
                                                    )
                                                }
                                            />

                                        </div>
                                    </div>

                                    {/* PROJECT INFO */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Project Information
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-3">

                                            <Field
                                                label="Country"
                                                value={project.country}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "country",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Estimated Time"
                                                value={project.estimatedTime}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "estimatedTime",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Status"
                                                value={project.status}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "status",
                                                        value
                                                    )
                                                }
                                            />

                                        </div>
                                    </div>

                                    {/* INTRO */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Introduction
                                        </h3>

                                        <TextAreaField
                                            label="Introduction Title"
                                            value={project.introTitle}
                                            onChange={(value) =>
                                                updateProject(
                                                    project.id,
                                                    "introTitle",
                                                    value
                                                )
                                            }
                                            rows={2}
                                        />

                                        <div className="mt-4">
                                            <TextAreaField
                                                label="Introduction Text"
                                                value={project.introText}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "introText",
                                                        value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <TextAreaField
                                                label="Introduction Text 2"
                                                value={project.introText2}
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "introText2",
                                                        value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-4 grid gap-4 md:grid-cols-2">

                                            <Field
                                                label="Detail Image 1 URL"
                                                value={
                                                    project.detailImage1
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "detailImage1",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Detail Image 2 URL"
                                                value={
                                                    project.detailImage2
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "detailImage2",
                                                        value
                                                    )
                                                }
                                            />

                                        </div>
                                    </div>

                                    {/* CHALLENGES */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Challenges
                                        </h3>

                                        <div className="space-y-3">

                                            {project.challenges.map(
                                                (
                                                    challenge,
                                                    index
                                                ) => (
                                                    <TextAreaField
                                                        key={index}
                                                        label={`Challenge ${index + 1
                                                            }`}
                                                        value={
                                                            challenge
                                                        }
                                                        onChange={(value) =>
                                                            updateChallenge(
                                                                project.id,
                                                                index,
                                                                value
                                                            )
                                                        }
                                                        rows={3}
                                                    />
                                                )
                                            )}

                                        </div>
                                    </div>

                                    {/* SOLUTION */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Solution
                                        </h3>

                                        <TextAreaField
                                            label="Solution Title"
                                            value={
                                                project.solutionTitle
                                            }
                                            onChange={(value) =>
                                                updateProject(
                                                    project.id,
                                                    "solutionTitle",
                                                    value
                                                )
                                            }
                                            rows={2}
                                        />

                                        <div className="mt-4">
                                            <TextAreaField
                                                label="Solution Text"
                                                value={
                                                    project.solutionText
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "solutionText",
                                                        value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <TextAreaField
                                                label="Solution Text 2"
                                                value={
                                                    project.solutionText2
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "solutionText2",
                                                        value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* SYSTEM */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            Optimized System Design
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-3">

                                            <Field
                                                label="Section Title"
                                                value={
                                                    project.systemTitle
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "systemTitle",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Panel Efficiency %"
                                                type="number"
                                                value={
                                                    project.panelEfficiency
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "panelEfficiency",
                                                        value
                                                    )
                                                }
                                            />

                                            <Field
                                                label="Energy Optimization %"
                                                type="number"
                                                value={
                                                    project.energyOptimization
                                                }
                                                onChange={(value) =>
                                                    updateProject(
                                                        project.id,
                                                        "energyOptimization",
                                                        value
                                                    )
                                                }
                                            />

                                        </div>
                                    </div>

                                    {/* FAQ */}

                                    <div>
                                        <h3 className="mb-4 font-semibold">
                                            FAQ
                                        </h3>

                                        <div className="space-y-5">

                                            {project.faq.map(
                                                (
                                                    faq,
                                                    index
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                                                    >

                                                        <TextAreaField
                                                            label={`Question ${index + 1
                                                                }`}
                                                            value={
                                                                faq.question
                                                            }
                                                            onChange={(value) =>
                                                                updateFaq(
                                                                    project.id,
                                                                    index,
                                                                    "question",
                                                                    value
                                                                )
                                                            }
                                                            rows={2}
                                                        />

                                                        <div className="mt-3">
                                                            <TextAreaField
                                                                label={`Answer ${index + 1
                                                                    }`}
                                                                value={
                                                                    faq.answer
                                                                }
                                                                onChange={(value) =>
                                                                    updateFaq(
                                                                        project.id,
                                                                        index,
                                                                        "answer",
                                                                        value
                                                                    )
                                                                }
                                                                rows={4}
                                                            />
                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    );
                })}

            </div>

            {/* BOTTOM SAVE */}

            <div className="flex justify-end">
                <button
                    onClick={saveProjects}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                    {saving ? (
                        <RefreshCw
                            size={18}
                            className="animate-spin"
                        />
                    ) : (
                        <Save size={18} />
                    )}

                    {saving
                        ? "Saving..."
                        : "Save All Changes"}
                </button>
            </div>
        </div>
    );
};

const Field = ({
    label,
    value,
    onChange,
    type = "text"
}) => {
    return (
        <div>
            <label className={labelClass}>
                {label}
            </label>

            <input
                type={type}
                className={inputClass}
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />
        </div>
    );
};

const TextAreaField = ({
    label,
    value,
    onChange,
    rows = 5
}) => {
    return (
        <div>
            <label className={labelClass}>
                {label}
            </label>

            <textarea
                rows={rows}
                className={inputClass}
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />
        </div>
    );
};

export default Projects;