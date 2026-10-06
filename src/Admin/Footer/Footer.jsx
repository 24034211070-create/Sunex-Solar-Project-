import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ImageIcon,
    Plus,
    Save,
    Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getPages,
    createPage,
    updatePage,
} from "../../Api/api";

const DEFAULT_LOGO =
    "https://demo.awaikenthemes.com/sunex/wp-content/uploads/2026/03/logo-white.svg";

const defaultFooter = {
    logoImage: DEFAULT_LOGO,
    logoLink: "/",

    brandDescription:
        "Empowering homes & business with reliable solar energy solutions. We design, install, & maintain high-performance",

    socialTitle: "Follow Us On Socials:",

    socials: [
        {
            name: "Pinterest",
            icon: "P",
            iconUrl: "",
            link: "#",
        },
        {
            name: "X",
            icon: "X",
            iconUrl: "",
            link: "#",
        },
        {
            name: "Facebook",
            icon: "f",
            iconUrl: "",
            link: "#",
        },
        {
            name: "Instagram",
            icon: "◎",
            iconUrl: "",
            link: "#",
        },
    ],

    quickLinksTitle: "Quick Links",

    quickLinks: [
        {
            text: "Home",
            link: "/",
        },
        {
            text: "About Us",
            link: "/about",
        },
        {
            text: "Our Services",
            link: "/services",
        },
        {
            text: "Blogs",
            link: "/blogs",
        },
        {
            text: "Contact Us",
            link: "/contact",
        },
    ],

    servicesTitle: "Our Services",

    services: [
        {
            text: "Solar Battery Storage",
            link: "/services/solar-battery-storage",
        },
        {
            text: "Solar System Maintenance",
            link: "/services/solar-system-maintenance",
        },
        {
            text: "Rooftop Solar Solutions",
            link: "/services/rooftop-solar-solutions",
        },
        {
            text: "Solar Panel Maintenance",
            link: "/services/solar-panel-maintenance",
        },
        {
            text: "Hybrid Solar Systems",
            link: "/services/hybrid-solar-systems",
        },
        {
            text: "Residential Solar Solutions",
            link: "/services/residential-solar-solutions",
        },
    ],

    newsletterTitle: "Subscribe To Newsletter",

    newsletterText:
        "Subscribe to receive solar tips, energy saving insights, & latest updates.",

    newsletterPlaceholder: "Enter Email Address *",

    phoneLabel: "Phone Number",
    phone: "+1 (123) 456-789",
    phoneIconUrl: "",

    emailLabel: "Email Address",
    email: "info@domainname.com",
    emailIconUrl: "",

    locationLabel: "Our Location",
    location: "2118 Thornridge Cir. Syracuse",
    locationIconUrl: "",

    copyright:
        "Copyright © 2026 Sunex. All rights reserved.",
};

const Footer = () => {
    const navigate = useNavigate();

    const [footer, setFooter] = useState(defaultFooter);
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadFooter();
    }, []);

    const loadFooter = async () => {
        try {
            setLoading(true);

            const pages = await getPages();

            const data = pages.find(
                (page) =>
                    page.page_name?.trim().toLowerCase() === "footer" &&
                    page.section_name?.trim().toLowerCase() === "footer"
            );

            if (data) {
                setPageId(data.id);

                if (data.content) {
                    setFooter({
                        ...defaultFooter,
                        ...data.content,

                        // IMPORTANT:
                        // Empty/null logo => original Sunex logo
                        logoImage:
                            data.content.logoImage?.trim() ||
                            DEFAULT_LOGO,

                        socials: Array.isArray(data.content.socials)
                            ? data.content.socials
                            : defaultFooter.socials,

                        quickLinks: Array.isArray(data.content.quickLinks)
                            ? data.content.quickLinks
                            : defaultFooter.quickLinks,

                        services: Array.isArray(data.content.services)
                            ? data.content.services
                            : defaultFooter.services,
                    });
                }
            }
        } catch (error) {
            console.error("Footer load error:", error);
            alert("Footer data load nahi ho paya.");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field, value) => {
        setFooter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // =====================================================
    // SOCIALS
    // =====================================================

    const updateSocial = (index, field, value) => {
        setFooter((prev) => ({
            ...prev,
            socials: prev.socials.map((social, i) =>
                i === index
                    ? {
                        ...social,
                        [field]: value,
                    }
                    : social
            ),
        }));
    };

    const addSocial = () => {
        setFooter((prev) => ({
            ...prev,
            socials: [
                ...prev.socials,
                {
                    name: "New Social",
                    icon: "●",
                    iconUrl: "",
                    link: "#",
                },
            ],
        }));
    };

    const removeSocial = (index) => {
        setFooter((prev) => ({
            ...prev,
            socials: prev.socials.filter((_, i) => i !== index),
        }));
    };

    // =====================================================
    // QUICK LINKS
    // =====================================================

    const updateQuickLink = (index, field, value) => {
        setFooter((prev) => ({
            ...prev,
            quickLinks: prev.quickLinks.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            ),
        }));
    };

    const addQuickLink = () => {
        setFooter((prev) => ({
            ...prev,
            quickLinks: [
                ...prev.quickLinks,
                {
                    text: "New Link",
                    link: "#",
                },
            ],
        }));
    };

    const removeQuickLink = (index) => {
        setFooter((prev) => ({
            ...prev,
            quickLinks: prev.quickLinks.filter((_, i) => i !== index),
        }));
    };

    // =====================================================
    // SERVICES
    // =====================================================

    const updateService = (index, field, value) => {
        setFooter((prev) => ({
            ...prev,
            services: prev.services.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            ),
        }));
    };

    const addService = () => {
        setFooter((prev) => ({
            ...prev,
            services: [
                ...prev.services,
                {
                    text: "New Service",
                    link: "#",
                },
            ],
        }));
    };

    const removeService = (index) => {
        setFooter((prev) => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index),
        }));
    };

    // =====================================================
    // SAVE FOOTER
    // =====================================================

    const saveFooter = async () => {
        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            const payload = {
                page_name: "Footer",
                section_name: "Footer",
                title: footer.newsletterTitle,
                description: footer.brandDescription,

                // IMPORTANT:
                // Agar logo blank hai to original logo save hoga.
                image:
                    footer.logoImage?.trim() ||
                    DEFAULT_LOGO,

                content: {
                    ...footer,

                    // IMPORTANT:
                    // Database me bhi blank logo nahi jayega.
                    logoImage:
                        footer.logoImage?.trim() ||
                        DEFAULT_LOGO,
                },
            };

            let response;

            if (pageId) {
                response = await updatePage(
                    pageId,
                    payload,
                    token
                );
            } else {
                response = await createPage(
                    payload,
                    token
                );
            }

            if (response?.page?.id) {
                setPageId(response.page.id);
            }

            // State ko bhi original logo ke saath maintain karo
            setFooter((prev) => ({
                ...prev,
                logoImage:
                    prev.logoImage?.trim() ||
                    DEFAULT_LOGO,
            }));

            alert("Footer saved successfully!");
        } catch (error) {
            console.error("Footer save error:", error);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Footer save nahi ho paya.";

            alert(message);
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-600">
                    Loading Footer...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/pages/home")
                        }
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Footer
                        </h1>

                        <p className="text-gray-500">
                            Manage website footer content
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={saveFooter}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-60"
                >
                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

            </div>

            {/* =====================================================
                LOGO + BRAND
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold mb-6">
                    Footer Brand
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Footer Logo URL
                        </label>

                        <div className="flex gap-3">

                            <div className="relative flex-1">

                                <ImageIcon
                                    size={18}
                                    className="absolute left-3 top-3.5 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={footer.logoImage || ""}
                                    onChange={(e) =>
                                        updateField(
                                            "logoImage",
                                            e.target.value
                                        )
                                    }
                                    placeholder={DEFAULT_LOGO}
                                    className="w-full border rounded-lg pl-10 pr-4 py-3"
                                />

                            </div>

                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                            Logo URL empty karne par original
                            Sunex logo automatically use hoga.
                        </p>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Logo Link
                        </label>

                        <input
                            type="text"
                            value={footer.logoLink || ""}
                            onChange={(e) =>
                                updateField(
                                    "logoLink",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                </div>

                {/* LOGO PREVIEW */}

                <div className="mt-6">

                    <label className="block text-sm font-medium mb-2">
                        Logo Preview
                    </label>

                    <div className="bg-[#032333] rounded-lg p-6">

                        <img
                            src={
                                footer.logoImage?.trim() ||
                                DEFAULT_LOGO
                            }
                            alt="Footer Logo"
                            className="w-[160px] h-[65px] object-contain"
                        />

                    </div>

                </div>

                {/* BRAND DESCRIPTION */}

                <div className="mt-6">

                    <label className="block text-sm font-medium mb-2">
                        Brand Description
                    </label>

                    <textarea
                        rows={4}
                        value={footer.brandDescription || ""}
                        onChange={(e) =>
                            updateField(
                                "brandDescription",
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

            </div>

            {/* =====================================================
                SOCIALS
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-xl font-semibold">
                            Social Media
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage social icons and links.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addSocial}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        <Plus size={18} />
                        Add Social
                    </button>

                </div>

                <div className="mb-6">

                    <label className="block text-sm font-medium mb-2">
                        Social Title
                    </label>

                    <input
                        type="text"
                        value={footer.socialTitle || ""}
                        onChange={(e) =>
                            updateField(
                                "socialTitle",
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div className="space-y-4">

                    {footer.socials.map((social, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-4"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        value={social.name || ""}
                                        onChange={(e) =>
                                            updateSocial(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-3 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Default Icon
                                    </label>

                                    <input
                                        type="text"
                                        value={social.icon || ""}
                                        onChange={(e) =>
                                            updateSocial(
                                                index,
                                                "icon",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-3 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Icon URL
                                    </label>

                                    <input
                                        type="text"
                                        value={social.iconUrl || ""}
                                        onChange={(e) =>
                                            updateSocial(
                                                index,
                                                "iconUrl",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Optional"
                                        className="w-full border rounded-lg px-3 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Social Link
                                    </label>

                                    <input
                                        type="text"
                                        value={social.link || ""}
                                        onChange={(e) =>
                                            updateSocial(
                                                index,
                                                "link",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-3 py-2.5"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end mt-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeSocial(index)
                                    }
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                >
                                    <Trash2 size={17} />
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* =====================================================
                QUICK LINKS
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-xl font-semibold">
                        Quick Links
                    </h2>

                    <button
                        type="button"
                        onClick={addQuickLink}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        <Plus size={18} />
                        Add Link
                    </button>

                </div>

                <div className="mb-6">

                    <label className="block text-sm font-medium mb-2">
                        Section Title
                    </label>

                    <input
                        type="text"
                        value={footer.quickLinksTitle || ""}
                        onChange={(e) =>
                            updateField(
                                "quickLinksTitle",
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div className="space-y-3">

                    {footer.quickLinks.map((item, index) => (

                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-3"
                        >

                            <input
                                type="text"
                                value={item.text || ""}
                                onChange={(e) =>
                                    updateQuickLink(
                                        index,
                                        "text",
                                        e.target.value
                                    )
                                }
                                placeholder="Link Text"
                                className="flex-1 border rounded-lg px-4 py-3"
                            />

                            <input
                                type="text"
                                value={item.link || ""}
                                onChange={(e) =>
                                    updateQuickLink(
                                        index,
                                        "link",
                                        e.target.value
                                    )
                                }
                                placeholder="Link URL"
                                className="flex-1 border rounded-lg px-4 py-3"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeQuickLink(index)
                                }
                                className="px-4 py-3 text-red-600 border rounded-lg hover:bg-red-50"
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            {/* =====================================================
                SERVICES
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-xl font-semibold">
                        Footer Services
                    </h2>

                    <button
                        type="button"
                        onClick={addService}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        <Plus size={18} />
                        Add Service
                    </button>

                </div>

                <div className="mb-6">

                    <label className="block text-sm font-medium mb-2">
                        Section Title
                    </label>

                    <input
                        type="text"
                        value={footer.servicesTitle || ""}
                        onChange={(e) =>
                            updateField(
                                "servicesTitle",
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div className="space-y-3">

                    {footer.services.map((item, index) => (

                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-3"
                        >

                            <input
                                type="text"
                                value={item.text || ""}
                                onChange={(e) =>
                                    updateService(
                                        index,
                                        "text",
                                        e.target.value
                                    )
                                }
                                placeholder="Service Name"
                                className="flex-1 border rounded-lg px-4 py-3"
                            />

                            <input
                                type="text"
                                value={item.link || ""}
                                onChange={(e) =>
                                    updateService(
                                        index,
                                        "link",
                                        e.target.value
                                    )
                                }
                                placeholder="Service URL"
                                className="flex-1 border rounded-lg px-4 py-3"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeService(index)
                                }
                                className="px-4 py-3 text-red-600 border rounded-lg hover:bg-red-50"
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            {/* =====================================================
                NEWSLETTER
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold mb-6">
                    Newsletter
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Newsletter Title
                        </label>

                        <input
                            type="text"
                            value={
                                footer.newsletterTitle || ""
                            }
                            onChange={(e) =>
                                updateField(
                                    "newsletterTitle",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Input Placeholder
                        </label>

                        <input
                            type="text"
                            value={
                                footer.newsletterPlaceholder ||
                                ""
                            }
                            onChange={(e) =>
                                updateField(
                                    "newsletterPlaceholder",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                </div>

                <div className="mt-6">

                    <label className="block text-sm font-medium mb-2">
                        Newsletter Description
                    </label>

                    <textarea
                        rows={3}
                        value={
                            footer.newsletterText || ""
                        }
                        onChange={(e) =>
                            updateField(
                                "newsletterText",
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

            </div>

            {/* =====================================================
                CONTACT INFORMATION
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold mb-6">
                    Contact Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* PHONE */}

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-4">
                            Phone
                        </h3>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.phoneLabel ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "phoneLabel",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.phone || ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Icon URL
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.phoneIconUrl ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "phoneIconUrl",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Optional"
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                        </div>

                    </div>

                    {/* EMAIL */}

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-4">
                            Email
                        </h3>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.emailLabel ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "emailLabel",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.email || ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Icon URL
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.emailIconUrl ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "emailIconUrl",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Optional"
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                        </div>

                    </div>

                    {/* LOCATION */}

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-4">
                            Location
                        </h3>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.locationLabel ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "locationLabel",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.location ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Icon URL
                                </label>

                                <input
                                    type="text"
                                    value={
                                        footer.locationIconUrl ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "locationIconUrl",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Optional"
                                    className="w-full border rounded-lg px-3 py-2.5"
                                />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
                COPYRIGHT
            ===================================================== */}

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold mb-6">
                    Footer Bottom
                </h2>

                <label className="block text-sm font-medium mb-2">
                    Copyright Text
                </label>

                <input
                    type="text"
                    value={footer.copyright || ""}
                    onChange={(e) =>
                        updateField(
                            "copyright",
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-4 py-3"
                />

            </div>

            {/* =====================================================
                BOTTOM SAVE
            ===================================================== */}

            <div className="flex justify-end">

                <button
                    type="button"
                    onClick={saveFooter}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-60"
                >
                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

            </div>

        </div>
    );
};

export default Footer;