import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const defaultData = {
    title: "Our Services",
    image: "",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Services",
};

const ServicesHero = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [form, setForm] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const response = await api.get("/pages");

            const pages = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.pages)
                    ? response.data.pages
                    : [];

            const servicesHeroPages = pages.filter(
                (page) =>
                    String(page.pageName || "")
                        .trim()
                        .toLowerCase() === "services" &&
                    String(page.sectionName || "")
                        .trim()
                        .toLowerCase() === "hero"
            );

            const servicesHero =
                servicesHeroPages.length > 0
                    ? servicesHeroPages[servicesHeroPages.length - 1]
                    : null;

            if (servicesHero) {
                const content = servicesHero.content || {};

                setPageId(servicesHero.id);

                setForm({
                    title: servicesHero.title || "Our Services",
                    image: servicesHero.image || "",
                    breadcrumbHome:
                        content.breadcrumb_home || "Home",
                    breadcrumbCurrent:
                        content.breadcrumb_current || "Services",
                });
            } else {
                setPageId(null);
                setForm(defaultData);
            }
        } catch (error) {
            console.error("SERVICES HERO LOAD ERROR:", error);
            alert("Failed to load Services Hero data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Admin token not found. Please login again.");
                return;
            }

            const payload = {
                page_name: "Services",
                section_name: "Hero",
                title: form.title,
                image: form.image,
                content: {
                    breadcrumb_home: form.breadcrumbHome,
                    breadcrumb_current: form.breadcrumbCurrent,
                },
            };

            if (pageId) {
                await api.put(`/pages/${pageId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                const response = await api.post("/pages", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data?.id) {
                    setPageId(response.data.id);
                }
            }

            alert("Services Hero saved successfully!");

            await loadData();
        } catch (error) {
            console.error("SERVICES HERO SAVE ERROR:", error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to save Services Hero.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-gray-500">
                        Loading Services Hero...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Services - Hero
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage the Services page hero section.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/pages/services")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Save size={18} />

                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* HERO CONTENT */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Hero Content
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Update the Services page hero title, background
                            image and breadcrumb text.
                        </p>
                    </div>

                    <div className="space-y-6">

                        {/* TITLE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Our Services"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Background Image URL
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://example.com/services-hero.jpg"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                Leave empty to use the default Services hero image.
                            </p>

                            {form.image && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Image Preview
                                    </p>

                                    <img
                                        src={form.image}
                                        alt="Services Hero Preview"
                                        className="w-full max-w-xl h-56 object-cover rounded-lg border border-gray-200"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* BREADCRUMB */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* HOME */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Breadcrumb Home
                                </label>

                                <input
                                    type="text"
                                    name="breadcrumbHome"
                                    value={form.breadcrumbHome}
                                    onChange={handleChange}
                                    placeholder="Home"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* CURRENT */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Breadcrumb Current
                                </label>

                                <input
                                    type="text"
                                    name="breadcrumbCurrent"
                                    value={form.breadcrumbCurrent}
                                    onChange={handleChange}
                                    placeholder="Services"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServicesHero;