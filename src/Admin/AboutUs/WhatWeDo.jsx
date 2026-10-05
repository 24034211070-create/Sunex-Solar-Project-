import React, { useEffect, useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const defaultData = {
    label: "What We Do",
    title: "Complete solar services built for performance",
    description:
        "Our team provides end-to-end solar solutions including site assessment, custom system design, professional installation, and ongoing maintenance.",

    videoImage: "",
    mainImage: "",

    serviceTitle: "Complete Solar Solutions",
    serviceDescription:
        "We provide end-to-end solar services from site assessment & system design.",

    rating: "4.9",
    ratingMax: "5.0",
    ratingText: "Average Website Ratings",

    buttonText: "Learn More",
    buttonLink: "#",

    videoText: "Watch Video",
    videoLink: "https://www.youtube.com/embed/Y-x0efG1seA",
};

const WhatWeDo = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [form, setForm] = useState(defaultData);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ================= GET DATA =================

    const loadData = async () => {
        try {
            setLoading(true);

            const response = await api.get("/pages");

            const pages = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.pages)
                    ? response.data.pages
                    : [];

            const matchingPages = pages.filter(
                (page) =>
                    String(page.pageName || "")
                        .trim()
                        .toLowerCase() === "about us" &&
                    String(page.sectionName || "")
                        .trim()
                        .toLowerCase() === "what we do"
            );

            if (matchingPages.length > 0) {
                const page = matchingPages.reduce((latest, current) =>
                    Number(current.id) > Number(latest.id)
                        ? current
                        : latest
                );

                setPageId(page.id);

                const content = page.content || {};

                setForm({
                    label:
                        content.label ||
                        page.label ||
                        defaultData.label,

                    title:
                        content.title ||
                        page.title ||
                        defaultData.title,

                    description:
                        content.description ||
                        page.description ||
                        defaultData.description,

                    videoImage:
                        content.video_image ||
                        defaultData.videoImage,

                    mainImage:
                        content.main_image ||
                        page.image ||
                        defaultData.mainImage,

                    serviceTitle:
                        content.service_title ||
                        defaultData.serviceTitle,

                    serviceDescription:
                        content.service_description ||
                        defaultData.serviceDescription,

                    rating:
                        content.rating ||
                        defaultData.rating,

                    ratingMax:
                        content.rating_max ||
                        defaultData.ratingMax,

                    ratingText:
                        content.rating_text ||
                        defaultData.ratingText,

                    buttonText:
                        content.button_text ||
                        page.buttonText ||
                        defaultData.buttonText,

                    buttonLink:
                        content.button_link ||
                        page.buttonLink ||
                        defaultData.buttonLink,

                    videoText:
                        content.video_text ||
                        defaultData.videoText,

                    videoLink:
                        content.video_link ||
                        defaultData.videoLink,
                });
            }
        } catch (error) {
            console.error(
                "ABOUT US WHAT WE DO ADMIN LOAD ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ================= HANDLE CHANGE =================

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ================= SAVE =================

    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                page_name: "About Us",
                section_name: "What We Do",

                title: form.title,
                description: form.description,
                image: form.mainImage,

                button_text: form.buttonText,
                button_link: form.buttonLink,

                content: {
                    label: form.label,
                    title: form.title,
                    description: form.description,

                    video_image: form.videoImage,
                    main_image: form.mainImage,

                    service_title: form.serviceTitle,
                    service_description: form.serviceDescription,

                    rating: form.rating,
                    rating_max: form.ratingMax,
                    rating_text: form.ratingText,

                    button_text: form.buttonText,
                    button_link: form.buttonLink,

                    video_text: form.videoText,
                    video_link: form.videoLink,
                },
            };

            if (pageId) {
                await api.put(`/pages/${pageId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
            } else {
                const response = await api.post("/pages", payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });

                if (response.data?.id) {
                    setPageId(response.data.id);
                }
            }

            alert("What We Do updated successfully!");

            await loadData();
        } catch (error) {
            console.error(
                "ABOUT US WHAT WE DO ADMIN SAVE ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to save What We Do."
            );
        } finally {
            setSaving(false);
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-xl border p-8 text-center">
                    Loading What We Do...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        About Us - What We Do
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage What We Do section content.
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            navigate("/admin/pages/about-us")
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}

            <div className="space-y-6">

                {/* ================= WHAT WE DO CONTENT ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            What We Do Content
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Main heading and description of the section.
                        </p>
                    </div>

                    <div className="p-6 space-y-5">

                        {/* LABEL */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                            </label>

                            <input
                                type="text"
                                value={form.label}
                                onChange={(e) =>
                                    handleChange(
                                        "label",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* TITLE */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>

                            <textarea
                                rows="3"
                                value={form.title}
                                onChange={(e) =>
                                    handleChange(
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>

                        {/* DESCRIPTION */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= IMAGES ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Images
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage images used in the What We Do section.
                        </p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* VIDEO IMAGE */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Image
                            </label>

                            <input
                                type="text"
                                value={form.videoImage}
                                onChange={(e) =>
                                    handleChange(
                                        "videoImage",
                                        e.target.value
                                    )
                                }
                                placeholder="Image URL"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                            {form.videoImage && (
                                <img
                                    src={form.videoImage}
                                    alt="Video preview"
                                    className="mt-3 w-full h-40 object-cover rounded-lg border"
                                />
                            )}
                        </div>

                        {/* MAIN IMAGE */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Image
                            </label>

                            <input
                                type="text"
                                value={form.mainImage}
                                onChange={(e) =>
                                    handleChange(
                                        "mainImage",
                                        e.target.value
                                    )
                                }
                                placeholder="Image URL"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                            {form.mainImage && (
                                <img
                                    src={form.mainImage}
                                    alt="Main preview"
                                    className="mt-3 w-full h-40 object-cover rounded-lg border"
                                />
                            )}
                        </div>

                    </div>
                </div>

                {/* ================= SERVICE ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Service Information
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the service information displayed on the right side.
                        </p>
                    </div>

                    <div className="p-6 space-y-5">

                        {/* SERVICE TITLE */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Title
                            </label>

                            <input
                                type="text"
                                value={form.serviceTitle}
                                onChange={(e) =>
                                    handleChange(
                                        "serviceTitle",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* SERVICE DESCRIPTION */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Description
                            </label>

                            <textarea
                                rows="4"
                                value={form.serviceDescription}
                                onChange={(e) =>
                                    handleChange(
                                        "serviceDescription",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= RATING ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Rating
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage website rating information.
                        </p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* RATING */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                            </label>

                            <input
                                type="text"
                                value={form.rating}
                                onChange={(e) =>
                                    handleChange(
                                        "rating",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* MAX RATING */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Rating
                            </label>

                            <input
                                type="text"
                                value={form.ratingMax}
                                onChange={(e) =>
                                    handleChange(
                                        "ratingMax",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* RATING TEXT */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating Text
                            </label>

                            <input
                                type="text"
                                value={form.ratingText}
                                onChange={(e) =>
                                    handleChange(
                                        "ratingText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= VIDEO ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Video
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the Watch Video button and video link.
                        </p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* VIDEO TEXT */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Text
                            </label>

                            <input
                                type="text"
                                value={form.videoText}
                                onChange={(e) =>
                                    handleChange(
                                        "videoText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* VIDEO LINK */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Link
                            </label>

                            <input
                                type="text"
                                value={form.videoLink}
                                onChange={(e) =>
                                    handleChange(
                                        "videoLink",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= BUTTON ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Learn More Button
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage button text and destination.
                        </p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* BUTTON TEXT */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                value={form.buttonText}
                                onChange={(e) =>
                                    handleChange(
                                        "buttonText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* BUTTON LINK */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                value={form.buttonLink}
                                onChange={(e) =>
                                    handleChange(
                                        "buttonLink",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= BOTTOM SAVE ================= */}

                <div className="flex justify-end pb-6">

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default WhatWeDo; 