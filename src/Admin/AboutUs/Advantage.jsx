import React, { useEffect, useState } from "react";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const defaultData = {
    label: "Our Advantages",
    title:
        "Smart solar benefits designed to deliver performance, saving, & long term reliability",
    titleImage: "",

    leftNumber: "24*7",
    leftLabel: "Support Availability",
    leftDescription:
        "Dedicated service team to ensure smooth operation and quick assistance whenever needed.",

    centerImage: "",

    rightNumber: "2000+",
    rightLabel: "Projects Completed",
    rightDescription:
        "Successfully installed solar systems across residential, commercial, and industrial areas.",

    pills: [
        "Renewable Energy",
        "Residential Solar",
        "Sustainable Energy",
        "Solar Battery Storage",
    ],

    reviewRating: "4.9/5",
    reviewCount: "Over 4200 Reviews",
};

const Advantage = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [form, setForm] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ================= LOAD DATA =================

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
                        .toLowerCase() === "advantage"
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

                    titleImage:
                        content.title_image ||
                        defaultData.titleImage,

                    leftNumber:
                        content.left_number ||
                        defaultData.leftNumber,

                    leftLabel:
                        content.left_label ||
                        defaultData.leftLabel,

                    leftDescription:
                        content.left_description ||
                        defaultData.leftDescription,

                    centerImage:
                        content.center_image ||
                        page.image ||
                        defaultData.centerImage,

                    rightNumber:
                        content.right_number ||
                        defaultData.rightNumber,

                    rightLabel:
                        content.right_label ||
                        defaultData.rightLabel,

                    rightDescription:
                        content.right_description ||
                        defaultData.rightDescription,

                    pills:
                        Array.isArray(content.pills) &&
                            content.pills.length > 0
                            ? content.pills
                            : defaultData.pills,

                    reviewRating:
                        content.review_rating ||
                        defaultData.reviewRating,

                    reviewCount:
                        content.review_count ||
                        defaultData.reviewCount,
                });
            }
        } catch (error) {
            console.error(
                "ABOUT US ADVANTAGE ADMIN LOAD ERROR:",
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

    // ================= PILLS =================

    const handlePillChange = (index, value) => {
        setForm((prev) => ({
            ...prev,
            pills: prev.pills.map((pill, i) =>
                i === index ? value : pill
            ),
        }));
    };

    const addPill = () => {
        setForm((prev) => ({
            ...prev,
            pills: [...prev.pills, ""],
        }));
    };

    const removePill = (index) => {
        setForm((prev) => ({
            ...prev,
            pills: prev.pills.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // ================= SAVE =================

    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                page_name: "About Us",
                section_name: "Advantage",

                title: form.title,
                image: form.centerImage,

                content: {
                    label: form.label,
                    title: form.title,
                    title_image: form.titleImage,

                    left_number: form.leftNumber,
                    left_label: form.leftLabel,
                    left_description: form.leftDescription,

                    center_image: form.centerImage,

                    right_number: form.rightNumber,
                    right_label: form.rightLabel,
                    right_description: form.rightDescription,

                    pills: form.pills,

                    review_rating: form.reviewRating,
                    review_count: form.reviewCount,
                },
            };

            const token = localStorage.getItem("token");

            if (pageId) {
                await api.put(
                    `/pages/${pageId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                const response = await api.post(
                    "/pages",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data?.id) {
                    setPageId(response.data.id);
                }
            }

            alert(
                "Advantage updated successfully!"
            );

            await loadData();
        } catch (error) {
            console.error(
                "ABOUT US ADVANTAGE ADMIN SAVE ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to save Advantage."
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
                    Loading Advantage...
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
                        About Us - Advantage
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage Our Advantages section content.
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

            <div className="space-y-6">

                {/* ================= HEADING ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Advantage Heading
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the section label and heading.
                        </p>
                    </div>

                    <div className="p-6 space-y-5">

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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>

                            <textarea
                                rows="4"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title Inline Image URL
                            </label>

                            <input
                                type="text"
                                value={form.titleImage}
                                onChange={(e) =>
                                    handleChange(
                                        "titleImage",
                                        e.target.value
                                    )
                                }
                                placeholder="Image URL"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                            {form.titleImage && (
                                <img
                                    src={form.titleImage}
                                    alt="Title preview"
                                    className="mt-3 w-32 h-20 object-cover rounded-lg border"
                                />
                            )}
                        </div>

                    </div>
                </div>

                {/* ================= LEFT ADVANTAGE ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Left Advantage
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the support availability card.
                        </p>
                    </div>

                    <div className="p-6 space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number
                            </label>

                            <input
                                type="text"
                                value={form.leftNumber}
                                onChange={(e) =>
                                    handleChange(
                                        "leftNumber",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                            </label>

                            <input
                                type="text"
                                value={form.leftLabel}
                                onChange={(e) =>
                                    handleChange(
                                        "leftLabel",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                value={form.leftDescription}
                                onChange={(e) =>
                                    handleChange(
                                        "leftDescription",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= CENTER IMAGE ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Center Image
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the main image displayed between the two cards.
                        </p>
                    </div>

                    <div className="p-6">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>

                        <input
                            type="text"
                            value={form.centerImage}
                            onChange={(e) =>
                                handleChange(
                                    "centerImage",
                                    e.target.value
                                )
                            }
                            placeholder="Image URL"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {form.centerImage && (
                            <img
                                src={form.centerImage}
                                alt="Center preview"
                                className="mt-3 w-full max-w-md h-48 object-cover rounded-lg border"
                            />
                        )}

                    </div>
                </div>

                {/* ================= RIGHT ADVANTAGE ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Right Advantage
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the projects completed card.
                        </p>
                    </div>

                    <div className="p-6 space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number
                            </label>

                            <input
                                type="text"
                                value={form.rightNumber}
                                onChange={(e) =>
                                    handleChange(
                                        "rightNumber",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                            </label>

                            <input
                                type="text"
                                value={form.rightLabel}
                                onChange={(e) =>
                                    handleChange(
                                        "rightLabel",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                value={form.rightDescription}
                                onChange={(e) =>
                                    handleChange(
                                        "rightDescription",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= PILLS ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Advantage Pills
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage the tags displayed below the cards.
                            </p>
                        </div>

                        <button
                            onClick={addPill}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            <Plus size={17} />
                            Add Pill
                        </button>

                    </div>

                    <div className="p-6 space-y-3">

                        {form.pills.map((pill, index) => (
                            <div
                                key={index}
                                className="flex gap-3"
                            >

                                <input
                                    type="text"
                                    value={pill}
                                    onChange={(e) =>
                                        handlePillChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Pill ${index + 1}`}
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <button
                                    onClick={() =>
                                        removePill(index)
                                    }
                                    className="px-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>
                        ))}

                    </div>
                </div>

                {/* ================= REVIEW ================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Reviews
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the review information.
                        </p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                            </label>

                            <input
                                type="text"
                                value={form.reviewRating}
                                onChange={(e) =>
                                    handleChange(
                                        "reviewRating",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Review Count
                            </label>

                            <input
                                type="text"
                                value={form.reviewCount}
                                onChange={(e) =>
                                    handleChange(
                                        "reviewCount",
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

export default Advantage;