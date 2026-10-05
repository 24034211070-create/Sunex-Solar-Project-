import React, { useEffect, useState } from "react";
import { Save, Loader2, PanelsTopLeft, Globe2, BadgeCheck } from "lucide-react";
import api from "../../Api/axios";

const defaultData = {
    label: "Our Approach",
    title: "Turning your clean energy vision into reality",
    description:
        "We guide you through every step of your solar journey – from understanding your energy needs and designing the right system to expert installation and ongoing support. Our approach focuses on smart planning, quality components, and reliable execution.",
    image: "",
    missionTitle: "Our Mission",
    missionText:
        "Our mission is to make clean, reliable affordable solar energy accessible to homes.",
    visionTitle: "Our Vision",
    visionText:
        "Our vision is to lead the transition to a cleaner & more sustainable energy future.",
    valuesTitle: "Our Values",
    valuesText:
        "We believe putting customer first, delivering reliable and efficient solutions.",
};

const Approach = () => {
    const [pageId, setPageId] = useState(null);

    const [form, setForm] = useState(defaultData);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadApproach();
    }, []);

    const loadApproach = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/pages");

            console.log(
                "ABOUT US APPROACH - API RESPONSE:",
                response.data
            );

            const pages = Array.isArray(response.data?.pages)
                ? response.data.pages
                : [];

            const approachPages = pages.filter(
                (page) =>
                    String(page.pageName || "")
                        .trim()
                        .toLowerCase() === "about us" &&
                    String(page.sectionName || "")
                        .trim()
                        .toLowerCase() === "approach"
            );

            console.log(
                "ABOUT US APPROACH - MATCHING RECORDS:",
                approachPages
            );

            if (approachPages.length === 0) {
                setPageId(null);
                setForm(defaultData);
                return;
            }

            // Duplicate records ho to latest ID wali row use karo
            const approach = [...approachPages].sort(
                (a, b) => Number(b.id) - Number(a.id)
            )[0];

            console.log(
                "ABOUT US APPROACH - USING RECORD:",
                approach
            );

            const content = approach.content || {};

            setPageId(approach.id);

            setForm({
                label:
                    content.label ||
                    approach.label ||
                    defaultData.label,

                title:
                    content.title ||
                    approach.title ||
                    defaultData.title,

                description:
                    content.description ||
                    approach.description ||
                    defaultData.description,

                image:
                    content.image ||
                    approach.image ||
                    defaultData.image,

                missionTitle:
                    content.mission_title ||
                    defaultData.missionTitle,

                missionText:
                    content.mission_text ||
                    defaultData.missionText,

                visionTitle:
                    content.vision_title ||
                    defaultData.visionTitle,

                visionText:
                    content.vision_text ||
                    defaultData.visionText,

                valuesTitle:
                    content.values_title ||
                    defaultData.valuesTitle,

                valuesText:
                    content.values_text ||
                    defaultData.valuesText,
            });
        } catch (err) {
            console.error(
                "ABOUT US APPROACH GET ERROR:",
                err.response?.data ||
                err.message ||
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load About Us Approach."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
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
                section_name: "Approach",

                title: form.title,
                description: form.description,
                image: form.image,

                content: {
                    label: form.label,

                    title: form.title,
                    description: form.description,
                    image: form.image,

                    mission_title: form.missionTitle,
                    mission_text: form.missionText,

                    vision_title: form.visionTitle,
                    vision_text: form.visionText,

                    values_title: form.valuesTitle,
                    values_text: form.valuesText,
                },
            };

            console.log(
                "ABOUT US APPROACH - SAVE DATA:",
                pageData
            );

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
                    "ABOUT US APPROACH - UPDATE RESPONSE:",
                    response.data
                );
            } else {
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
                    "ABOUT US APPROACH - CREATE RESPONSE:",
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
                "About Us Approach saved successfully."
            );

            await loadApproach();
        } catch (err) {
            console.error(
                "ABOUT US APPROACH SAVE ERROR:",
                err.response?.data ||
                err.message ||
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save About Us Approach."
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
                        About Us - Approach
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage About Us Approach section.
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

            {/* Messages */}
            {message && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                </div>
            )}

            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Main Content */}
            <div className="space-y-6">
                {/* Main Approach Content */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-bold text-slate-900">
                        Approach Content
                    </h2>

                    {/* Label */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Section Label
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
                            placeholder="Our Approach"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Heading */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Main Heading
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
                            placeholder="Turning your clean energy vision into reality"
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
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
                            placeholder="Enter approach description"
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Approach Image
                        </label>

                        <input
                            type="text"
                            value={form.image}
                            onChange={(e) =>
                                handleChange(
                                    "image",
                                    e.target.value
                                )
                            }
                            placeholder="Enter image URL or path"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Enter image URL or image path.
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <PanelsTopLeft size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Mission
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage Our Mission card.
                            </p>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Mission Title
                        </label>

                        <input
                            type="text"
                            value={form.missionTitle}
                            onChange={(e) =>
                                handleChange(
                                    "missionTitle",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Mission Description
                        </label>

                        <textarea
                            rows="4"
                            value={form.missionText}
                            onChange={(e) =>
                                handleChange(
                                    "missionText",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                </div>

                {/* Vision */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <Globe2 size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Vision
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage Our Vision card.
                            </p>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Vision Title
                        </label>

                        <input
                            type="text"
                            value={form.visionTitle}
                            onChange={(e) =>
                                handleChange(
                                    "visionTitle",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Vision Description
                        </label>

                        <textarea
                            rows="4"
                            value={form.visionText}
                            onChange={(e) =>
                                handleChange(
                                    "visionText",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                </div>

                {/* Values */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <BadgeCheck size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Values
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage Our Values card.
                            </p>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Values Title
                        </label>

                        <input
                            type="text"
                            value={form.valuesTitle}
                            onChange={(e) =>
                                handleChange(
                                    "valuesTitle",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Values Description
                        </label>

                        <textarea
                            rows="4"
                            value={form.valuesText}
                            onChange={(e) =>
                                handleChange(
                                    "valuesText",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Approach;