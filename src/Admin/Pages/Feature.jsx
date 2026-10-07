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

const SolarFeature = () => {
    const navigate = useNavigate();

    const [featureData, setFeatureData] =
        useState(DEFAULT_FEATURE);

    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ======================================================
    // LOAD SOLAR FEATURE
    // ======================================================

    useEffect(() => {
        const loadSolarFeature = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPages();

                // IMPORTANT:
                // getPages() directly array return karta hai
                const pages = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.pages)
                        ? data.pages
                        : [];

                const featurePage = pages.find((page) => {
                    const pageName = (
                        page.page_name ||
                        page.pageName ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    const sectionName = (
                        page.section_name ||
                        page.sectionName ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    return (
                        pageName === "home" &&
                        (
                            sectionName === "solarfeature" ||
                            sectionName === "solar feature"
                        )
                    );
                });

                // ==================================================
                // PAGE DOES NOT EXIST
                // ==================================================

                if (!featurePage) {
                    setPageId(null);
                    setFeatureData(DEFAULT_FEATURE);

                    // IMPORTANT:
                    // Error mat dikhao.
                    // User Save karega to row automatically create hogi.
                    setError("");

                    return;
                }

                setPageId(featurePage.id);

                let content = featurePage.content;

                // JSONB string support
                if (typeof content === "string") {
                    try {
                        content = JSON.parse(content);
                    } catch (parseError) {
                        console.error(
                            "SolarFeature content parse error:",
                            parseError
                        );

                        content = {};
                    }
                }

                content =
                    content && typeof content === "object"
                        ? content
                        : {};

                setFeatureData({
                    label:
                        content.label ||
                        featurePage.description ||
                        DEFAULT_FEATURE.label,

                    heading:
                        content.heading ||
                        featurePage.title ||
                        DEFAULT_FEATURE.heading,

                    description:
                        content.description ||
                        DEFAULT_FEATURE.description,

                    button_text:
                        content.button_text ||
                        DEFAULT_FEATURE.button_text,

                    image:
                        content.image ||
                        featurePage.image ||
                        DEFAULT_FEATURE.image,

                    features:
                        Array.isArray(content.features) &&
                            content.features.length > 0
                            ? content.features
                            : DEFAULT_FEATURE.features,
                });
            } catch (err) {
                console.error(
                    "SolarFeature load error:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "Unable to load Solar Feature data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSolarFeature();
    }, []);

    // ======================================================
    // NORMALIZE FEATURE DATA BEFORE SAVE
    // ======================================================

    const getCleanFeatures = () => {
        return featureData.features.map((feature, index) => ({
            id:
                feature.id ||
                `${String(index + 1).padStart(2, "0")}.`,

            icon: feature.icon || "Sun",

            title: feature.title || "",

            description:
                feature.description || "",
        }));
    };

    // ======================================================
    // HANDLE BASIC FIELD
    // ======================================================

    const handleChange = (field, value) => {
        setFeatureData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ======================================================
    // HANDLE FEATURE CHANGE
    // ======================================================

    const handleFeatureChange = (
        index,
        field,
        value
    ) => {
        setFeatureData((prev) => {
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
    };

    // ======================================================
    // ADD FEATURE
    // ======================================================

    const addFeature = () => {
        setFeatureData((prev) => ({
            ...prev,
            features: [
                ...prev.features,
                {
                    id: `${String(
                        prev.features.length + 1
                    ).padStart(2, "0")}.`,
                    icon: "Sun",
                    title: "",
                    description: "",
                },
            ],
        }));
    };

    // ======================================================
    // DELETE FEATURE
    // ======================================================

    const deleteFeature = (index) => {
        setFeatureData((prev) => ({
            ...prev,
            features: prev.features.filter(
                (_, featureIndex) =>
                    featureIndex !== index
            ),
        }));
    };

    // ======================================================
    // SAVE
    // ======================================================

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");

            const token =
                localStorage.getItem("token");

            const cleanFeatures = getCleanFeatures();

            const content = {
                label:
                    featureData.label.trim(),

                heading:
                    featureData.heading.trim(),

                description:
                    featureData.description.trim(),

                button_text:
                    featureData.button_text.trim(),

                image:
                    featureData.image.trim(),

                features: cleanFeatures,
            };

            const payload = {
                page_name: "Home",
                section_name: "SolarFeature",

                title: content.heading,

                description: content.label,

                image: content.image || null,

                content,
            };

            let response;

            // ==================================================
            // UPDATE EXISTING ROW
            // ==================================================

            if (pageId) {
                response = await updatePage(
                    pageId,
                    payload,
                    token
                );
            }

            // ==================================================
            // CREATE NEW ROW
            // ==================================================

            else {
                response = await createPage(
                    payload,
                    token
                );
            }

            if (response?.page?.id) {
                setPageId(response.page.id);
            }

            alert(
                "Solar Feature saved successfully!"
            );
        } catch (err) {
            console.error(
                "SolarFeature save error:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to save Solar Feature.";

            setError(message);
        } finally {
            setSaving(false);
        }
    };

    // ======================================================
    // RESET
    // ======================================================

    const handleReset = () => {
        setFeatureData(DEFAULT_FEATURE);
    };

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="p-6">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        Loading Solar Feature...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/pages/home")
                        }
                        className="mb-3 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Solar Feature
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage the Home Solar Feature section.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {/* ==================================================
                SECTION CONTENT
            ================================================== */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Section Content
                </h2>

                {/* SECTION LABEL */}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                        Section Label
                    </label>

                    <input
                        type="text"
                        value={featureData.label}
                        onChange={(e) =>
                            handleChange(
                                "label",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        placeholder="Our Core Features"
                    />
                </div>

                {/* HEADING */}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                        Heading
                    </label>

                    <textarea
                        rows={3}
                        value={featureData.heading}
                        onChange={(e) =>
                            handleChange(
                                "heading",
                                e.target.value
                            )
                        }
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        placeholder="Enter heading"
                    />
                </div>

                {/* DESCRIPTION */}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={featureData.description}
                        onChange={(e) =>
                            handleChange(
                                "description",
                                e.target.value
                            )
                        }
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        placeholder="Enter description"
                    />
                </div>

                {/* BUTTON TEXT */}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                        Button Text
                    </label>

                    <input
                        type="text"
                        value={featureData.button_text}
                        onChange={(e) =>
                            handleChange(
                                "button_text",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        placeholder="Contact Us"
                    />
                </div>

                {/* IMAGE */}

                <div className="mb-8">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800">
                        <ImageIcon size={17} />
                        Image URL
                    </label>

                    <input
                        type="text"
                        value={featureData.image}
                        onChange={(e) =>
                            handleChange(
                                "image",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        placeholder="Enter image URL"
                    />

                    {featureData.image && (
                        <div className="mt-4 overflow-hidden rounded-lg border bg-gray-50 p-3">
                            <img
                                src={featureData.image}
                                alt="Solar Feature Preview"
                                className="h-52 w-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display =
                                        "none";
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* ==================================================
                    FEATURES
                ================================================== */}

                <div className="border-t border-gray-200 pt-6">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-900">
                                Feature Cards
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage the four Solar Feature cards.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addFeature}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            <Plus size={17} />
                            Add Feature
                        </button>
                    </div>

                    <div className="space-y-5">
                        {featureData.features.map(
                            (feature, index) => (
                                <div
                                    key={
                                        feature.id ||
                                        index
                                    }
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-900">
                                            Feature{" "}
                                            {index + 1}
                                        </h4>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteFeature(
                                                    index
                                                )
                                            }
                                            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2
                                                size={16}
                                            />
                                            Delete
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* ID */}

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                                Number
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    feature.id ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        index,
                                                        "id",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />
                                        </div>

                                        {/* ICON */}

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                                Icon
                                            </label>

                                            <select
                                                value={
                                                    feature.icon ||
                                                    "Sun"
                                                }
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        index,
                                                        "icon",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
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
                                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                                Title
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    feature.title ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        index,
                                                        "title",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                                placeholder="25+ Years"
                                            />
                                        </div>

                                        {/* DESCRIPTION */}

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                                Description
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    feature.description ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        index,
                                                        "description",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                                placeholder="Panel Performance Lifespan"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* ==================================================
                BOTTOM SAVE
            ================================================== */}

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
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

export default SolarFeature;