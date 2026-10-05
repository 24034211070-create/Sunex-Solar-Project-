import React, { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import api from "../../Api/axios";

const Hero = () => {
    const [pageId, setPageId] = useState(null);

    const [title, setTitle] = useState("About Us");
    const [image, setImage] = useState("");
    const [breadcrumbHome, setBreadcrumbHome] = useState("Home");
    const [breadcrumbCurrent, setBreadcrumbCurrent] =
        useState("About Us");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadHero();
    }, []);

    const loadHero = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/pages");

            console.log(
                "ABOUT US HERO - API RESPONSE:",
                response.data
            );

            // Backend response:
            // { success: true, pages: [...] }
            const pages = Array.isArray(response.data?.pages)
                ? response.data.pages
                : [];

            console.log(
                "ABOUT US HERO - ALL PAGES:",
                pages
            );

            // About Us + Hero ki saari rows find karo
            const heroPages = pages.filter(
                (page) =>
                    String(page.pageName || "").trim().toLowerCase() ===
                    "about us" &&
                    String(page.sectionName || "").trim().toLowerCase() ===
                    "hero"
            );

            console.log(
                "ABOUT US HERO - MATCHING RECORDS:",
                heroPages
            );

            if (heroPages.length === 0) {
                console.log(
                    "ABOUT US HERO - NO RECORD FOUND"
                );

                setPageId(null);
                return;
            }

            // Agar duplicate records hain,
            // sabse latest ID wali row use karo.
            const hero = [...heroPages].sort(
                (a, b) => Number(b.id) - Number(a.id)
            )[0];

            console.log(
                "ABOUT US HERO - USING RECORD:",
                hero
            );

            setPageId(hero.id);

            setTitle(hero.title || "About Us");

            setImage(hero.image || "");

            setBreadcrumbHome(
                hero.content?.breadcrumb_home || "Home"
            );

            setBreadcrumbCurrent(
                hero.content?.breadcrumb_current || "About Us"
            );
        } catch (err) {
            console.error(
                "ABOUT US HERO GET ERROR:",
                err.response?.data ||
                err.message ||
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load About Us Hero."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError(
                    "Admin token not found. Please login again."
                );
                return;
            }

            const pageData = {
                page_name: "About Us",
                section_name: "Hero",
                title: title,
                image: image,
                content: {
                    breadcrumb_home: breadcrumbHome,
                    breadcrumb_current: breadcrumbCurrent,
                },
            };

            console.log(
                "ABOUT US HERO - SAVE DATA:",
                pageData
            );

            // Existing record update
            if (pageId) {
                const response = await api.put(
                    `/pages/${pageId}`,
                    pageData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(
                    "ABOUT US HERO - UPDATE RESPONSE:",
                    response.data
                );
            }

            // Record nahi mila to new record create
            else {
                const response = await api.post(
                    "/pages",
                    pageData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(
                    "ABOUT US HERO - CREATE RESPONSE:",
                    response.data
                );

                const newPage =
                    response.data?.page ||
                    response.data?.data ||
                    response.data;

                if (newPage?.id) {
                    setPageId(newPage.id);
                }
            }

            setMessage(
                "About Us Hero saved successfully."
            );

            // Save ke baad latest database data reload karo
            await loadHero();
        } catch (err) {
            console.error(
                "ABOUT US HERO SAVE ERROR:",
                err.response?.data ||
                err.message ||
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save About Us Hero."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Loader2
                    size={32}
                    className="animate-spin text-green-500"
                />
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        About Us - Hero
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage About Us Hero section.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2
                                size={17}
                                className="animate-spin"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={17} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* Success Message */}
            {message && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                {/* Hero Title */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Hero Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="About Us"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Background Image */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Background Image
                    </label>

                    <input
                        type="text"
                        value={image}
                        onChange={(e) =>
                            setImage(e.target.value)
                        }
                        placeholder="Enter image URL or path"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Enter image URL or image path.
                    </p>
                </div>

                {/* Breadcrumb Home */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Breadcrumb Home
                    </label>

                    <input
                        type="text"
                        value={breadcrumbHome}
                        onChange={(e) =>
                            setBreadcrumbHome(e.target.value)
                        }
                        placeholder="Home"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Breadcrumb Current */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Breadcrumb Current
                    </label>

                    <input
                        type="text"
                        value={breadcrumbCurrent}
                        onChange={(e) =>
                            setBreadcrumbCurrent(e.target.value)
                        }
                        placeholder="About Us"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero; 