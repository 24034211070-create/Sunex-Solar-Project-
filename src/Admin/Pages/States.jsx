import React, { useEffect, useState } from "react";
import {
    Plus,
    Trash2,
    Save,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, updatePage } from "../../Api/api";

const iconOptions = [
    "Sun",
    "PanelsTopLeft",
    "Users"
];

const States = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        stats: [
            {
                id: 1,
                value: 25,
                suffix: "MW+",
                label: "Installed Capacity",
                icon: "Sun"
            },
            {
                id: 2,
                value: 15000,
                suffix: "+",
                label: "Solar Panels Deployed",
                icon: "PanelsTopLeft"
            },
            {
                id: 3,
                value: 7500,
                suffix: "+",
                label: "Happy Satisfied Customers",
                icon: "Users"
            }
        ]
    });

    useEffect(() => {
        fetchStates();
    }, []);

    // =========================
    // FETCH STATES
    // =========================
    const fetchStates = async () => {
        try {
            setLoading(true);

            const data = await getPages();

            if (!data.success || !Array.isArray(data.pages)) {
                return;
            }

            const statesPage = data.pages.find(
                (page) =>
                    page.page_name === "Home" &&
                    page.section_name === "States"
            );

            if (!statesPage) {
                return;
            }

            setPageId(statesPage.id);

            const content =
                statesPage.content &&
                    typeof statesPage.content === "object"
                    ? statesPage.content
                    : {};

            setFormData({
                stats: Array.isArray(content.stats)
                    ? content.stats
                    : []
            });
        } catch (error) {
            console.error("States fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // HANDLE STAT CHANGE
    // =========================
    const handleStatChange = (
        index,
        field,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.map(
                (stat, statIndex) =>
                    statIndex === index
                        ? {
                            ...stat,
                            [field]:
                                field === "value"
                                    ? Number(value)
                                    : value
                        }
                        : stat
            )
        }));
    };

    // =========================
    // ADD STAT
    // =========================
    const addStat = () => {
        setFormData((prev) => ({
            ...prev,
            stats: [
                ...prev.stats,
                {
                    id: Date.now(),
                    value: 0,
                    suffix: "+",
                    label: "New Statistic",
                    icon: "Sun"
                }
            ]
        }));
    };

    // =========================
    // DELETE STAT
    // =========================
    const deleteStat = (index) => {
        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.filter(
                (_, statIndex) =>
                    statIndex !== index
            )
        }));
    };

    // =========================
    // SAVE STATES
    // =========================
    const handleSave = async () => {
        if (!pageId) {
            alert("States page data not found.");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login as admin first.");
                return;
            }

            const data = await updatePage(
                pageId,
                {
                    page_name: "Home",
                    section_name: "States",
                    title: "Our solar impact at a glance",
                    description:
                        "Our growing solar impact across homes and businesses.",
                    image: "",
                    content: formData
                },
                token
            );

            if (!data.success) {
                alert(
                    data.message ||
                    "Failed to update States."
                );
                return;
            }

            alert("States updated successfully!");
        } catch (error) {
            console.error("States save error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong while saving States."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading States...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold">
                        States
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage Home statistics
                        section.
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/pages/home"
                            )
                        }
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                    >
                        <ArrowLeft
                            size={18}
                        />

                        Back
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </div>

            {/* STATS */}

            <div className="bg-white border rounded-xl p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-lg font-semibold">
                            Statistics
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage numbers,
                            labels and icons.
                        </p>
                    </div>

                    <button
                        onClick={addStat}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
                    >
                        <Plus size={18} />

                        Add Statistic
                    </button>

                </div>

                <div className="space-y-5">

                    {formData.stats.map(
                        (stat, index) => (
                            <div
                                key={
                                    stat.id ||
                                    index
                                }
                                className="border rounded-xl p-5"
                            >

                                {/* STAT HEADER */}

                                <div className="flex items-center justify-between mb-5">

                                    <h3 className="font-semibold">
                                        Statistic{" "}
                                        {index + 1}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            deleteStat(
                                                index
                                            )
                                        }
                                        className="flex items-center gap-2 text-red-600"
                                    >
                                        <Trash2
                                            size={18}
                                        />

                                        Delete
                                    </button>

                                </div>

                                {/* FIELDS */}

                                <div className="grid md:grid-cols-2 gap-5">

                                    {/* VALUE */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Number
                                        </label>

                                        <input
                                            type="number"
                                            value={
                                                stat.value
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleStatChange(
                                                    index,
                                                    "value",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    {/* SUFFIX */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Suffix
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                stat.suffix
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleStatChange(
                                                    index,
                                                    "suffix",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="MW+"
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    {/* LABEL */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Label
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                stat.label
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleStatChange(
                                                    index,
                                                    "label",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    {/* ICON */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Icon
                                        </label>

                                        <select
                                            value={
                                                stat.icon
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleStatChange(
                                                    index,
                                                    "icon",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3 bg-white"
                                        >
                                            {iconOptions.map(
                                                (
                                                    icon
                                                ) => (
                                                    <option
                                                        key={
                                                            icon
                                                        }
                                                        value={
                                                            icon
                                                        }
                                                    >
                                                        {
                                                            icon
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

                {formData.stats.length ===
                    0 && (
                        <div className="text-center py-10 text-gray-500">
                            No statistics added.
                        </div>
                    )}

            </div>

        </div>
    );
};

export default States;