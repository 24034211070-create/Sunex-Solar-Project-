import React, { useEffect, useState } from "react";
import { getPages, updatePage } from "../../Api/api";

const DEFAULT_FEATURE = {
    label: "Our Core Features",

    heading:
        "Innovative solar feature with real environmental impact",

    description:
        "Our core features are designed to maximize renewable energy production while reducing environmental impact and supporting a cleaner future.",

    button_text: "Contact Us",

    image: "",

    features: [
        {
            id: "01.",
            icon: "Sun",
            title: "25+ Years",
            description: "Panel Performance Lifespan",
        },
        {
            id: "02.",
            icon: "Globe",
            title: "4800+",
            description: "Solar Powered Homes",
        },
        {
            id: "03.",
            icon: "Mic",
            title: "10K+",
            description: "Trees Worth Of CO₂",
        },
        {
            id: "04.",
            icon: "Database",
            title: "100%",
            description: "Commitment to Clean",
        },
    ],
};

const Feature = () => {
    const [feature, setFeature] = useState(DEFAULT_FEATURE);
    const [pageId, setPageId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ============================
    // FETCH FEATURE DATA
    // ============================
    useEffect(() => {
        const fetchFeature = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPages();

                if (!data.success || !Array.isArray(data.pages)) {
                    throw new Error("Unable to load pages.");
                }

                const featurePage = data.pages.find(
                    (page) =>
                        page.page_name === "Home" &&
                        page.section_name === "SolarFeature"
                );

                if (!featurePage) {
                    setLoading(false);
                    return;
                }

                setPageId(featurePage.id);

                let content = featurePage.content;

                if (typeof content === "string") {
                    try {
                        content = JSON.parse(content);
                    } catch (parseError) {
                        console.error(
                            "Feature content parse error:",
                            parseError
                        );

                        content = {};
                    }
                }

                setFeature({
                    label:
                        content?.label ||
                        featurePage.description ||
                        DEFAULT_FEATURE.label,

                    heading:
                        content?.heading ||
                        featurePage.title ||
                        DEFAULT_FEATURE.heading,

                    description:
                        content?.description ||
                        DEFAULT_FEATURE.description,

                    button_text:
                        content?.button_text ||
                        DEFAULT_FEATURE.button_text,

                    image:
                        content?.image ||
                        featurePage.image ||
                        DEFAULT_FEATURE.image,

                    features:
                        Array.isArray(content?.features) &&
                            content.features.length > 0
                            ? content.features
                            : DEFAULT_FEATURE.features,
                });
            } catch (err) {
                console.error("Feature fetch error:", err);
                setError("Failed to load Feature section.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeature();
    }, []);

    // ============================
    // UPDATE MAIN FIELD
    // ============================
    const handleChange = (field, value) => {
        setFeature((prev) => ({
            ...prev,
            [field]: value,
        }));

        setMessage("");
        setError("");
    };

    // ============================
    // UPDATE FEATURE CARD
    // ============================
    const updateFeatureCard = (index, field, value) => {
        setFeature((prev) => {
            const updatedFeatures = [...prev.features];

            updatedFeatures[index] = {
                ...updatedFeatures[index],
                [field]: value,
            };

            return {
                ...prev,
                features: updatedFeatures,
            };
        });

        setMessage("");
        setError("");
    };

    // ============================
    // SAVE CHANGES
    // ============================
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
                setSaving(false);
                return;
            }

            if (!pageId) {
                setError(
                    "Solar Feature page not found in database. Create the Home / SolarFeature row first."
                );
                setSaving(false);
                return;
            }

            const data = await updatePage(
                pageId,
                {
                    page_name: "Home",
                    section_name: "SolarFeature",

                    title: feature.heading,

                    description: feature.label,

                    image: feature.image,

                    content: {
                        label: feature.label,
                        heading: feature.heading,
                        description: feature.description,
                        button_text: feature.button_text,
                        image: feature.image,
                        features: feature.features,
                    },
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to save Feature section."
                );
            }

            setMessage(
                "Feature section updated successfully."
            );

            // Backend se latest saved data
            if (data.page) {
                let savedContent = data.page.content;

                if (typeof savedContent === "string") {
                    try {
                        savedContent = JSON.parse(savedContent);
                    } catch {
                        savedContent = {};
                    }
                }

                setFeature({
                    label:
                        savedContent?.label ||
                        data.page.description ||
                        feature.label,

                    heading:
                        savedContent?.heading ||
                        data.page.title ||
                        feature.heading,

                    description:
                        savedContent?.description ||
                        feature.description,

                    button_text:
                        savedContent?.button_text ||
                        feature.button_text,

                    image:
                        savedContent?.image ||
                        data.page.image ||
                        feature.image,

                    features:
                        Array.isArray(savedContent?.features)
                            ? savedContent.features
                            : feature.features,
                });
            }
        } catch (err) {
            console.error("Feature save error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to save Feature section."
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================
    // LOADING
    // ============================
    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-slate-500">
                    Loading Feature section...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Solar Feature
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage the Home Solar Feature section.
                </p>
            </div>

            {/* SUCCESS MESSAGE */}
            {message && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {message}
                </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            {/* SECTION CONTENT */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                    Section Content
                </h2>

                <div className="space-y-5">
                    {/* LABEL */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Section Label
                        </label>

                        <input
                            type="text"
                            value={feature.label}
                            onChange={(e) =>
                                handleChange(
                                    "label",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Our Core Features"
                        />
                    </div>

                    {/* HEADING */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Heading
                        </label>

                        <textarea
                            rows={3}
                            value={feature.heading}
                            onChange={(e) =>
                                handleChange(
                                    "heading",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Enter Feature heading"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={feature.description}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Enter Feature description"
                        />
                    </div>

                    {/* BUTTON TEXT */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Button Text
                        </label>

                        <input
                            type="text"
                            value={feature.button_text}
                            onChange={(e) =>
                                handleChange(
                                    "button_text",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Contact Us"
                        />
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Feature Image
                        </label>

                        <input
                            type="text"
                            value={feature.image}
                            onChange={(e) =>
                                handleChange(
                                    "image",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Image URL or image path"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Enter the image URL or path that should
                            be used for the Feature section.
                        </p>
                    </div>
                </div>
            </div>

            {/* FEATURE CARDS */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Feature Cards
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the four Feature cards shown on the
                        Home page.
                    </p>
                </div>

                <div className="space-y-6">
                    {feature.features.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-800">
                                    Feature {index + 1}
                                </h3>

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                                    {item.id}
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* NUMBER */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Number
                                    </label>

                                    <input
                                        type="text"
                                        value={item.id || ""}
                                        onChange={(e) =>
                                            updateFeatureCard(
                                                index,
                                                "id",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        placeholder="01."
                                    />
                                </div>

                                {/* ICON */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Icon
                                    </label>

                                    <select
                                        value={item.icon || "Sun"}
                                        onChange={(e) =>
                                            updateFeatureCard(
                                                index,
                                                "icon",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    >
                                        <option value="Sun">
                                            Sun
                                        </option>

                                        <option value="Globe">
                                            Globe
                                        </option>

                                        <option value="Mic">
                                            Mic
                                        </option>

                                        <option value="Database">
                                            Database
                                        </option>
                                    </select>
                                </div>

                                {/* TITLE */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        value={item.title || ""}
                                        onChange={(e) =>
                                            updateFeatureCard(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        placeholder="25+ Years"
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Description
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            item.description || ""
                                        }
                                        onChange={(e) =>
                                            updateFeatureCard(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        placeholder="Panel Performance Lifespan"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default Feature;