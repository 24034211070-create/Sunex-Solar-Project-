import React, { useEffect, useState } from "react";
import { getPages, updatePage } from "../../Api/api";

const defaultData = {
    badge: "How It Works",

    heading:
        "Turning sunlight into savings in simple steps",

    intro:
        "From initial consultation and system design to professional installation & ongoing support, our simple step by step process helps you start generating energy.",

    button_text: "Contact Us",

    button_link: "#contact",

    steps: [
        {
            id: 1,
            title: "Free Consultation & Assessment",
            description:
                "We begin with a detailed consultation to understand your energy needs.",
            point: "Our experts assess your roof space",
            image: "",
            icon: "⌘",
        },
        {
            id: 2,
            title: "Custom System Design & Installation",
            description:
                "Based on the assessment, we create a customized solar systems.",
            point: "Certified technicians handle the installation",
            image: "",
            icon: "▱",
        },
        {
            id: 3,
            title: "Power Generation & Savings",
            description:
                "Once installed, your system starts generating clean energy immediately.",
            point: "Monitor your performance & electricity",
            image: "",
            icon: "♧",
        },
    ],

    avatar: "",

    cta_text:
        "Let's Build a Brighter, Solar Powered Tomorrow",

    cta_link_text: "Contact Us Today.",

    cta_link: "#contact",

    rating: "4.9",

    stars: "★★★★★",

    reviews: "Over 3000 Reviews",
};

const Work = () => {
    const [pageId, setPageId] = useState(null);
    const [formData, setFormData] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const getToken = () => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        fetchWork();
    }, []);

    const fetchWork = async () => {
        try {
            const data = await getPages();

            if (!data.success) {
                throw new Error("Unable to fetch pages");
            }

            const page = data.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "Work"
            );

            if (!page) {
                setMessage(
                    "Work database row not found. Please create the Home / Work row first."
                );

                setLoading(false);
                return;
            }

            setPageId(page.id);

            let content = {};

            try {
                content =
                    typeof page.content === "string"
                        ? JSON.parse(page.content)
                        : page.content || {};
            } catch {
                content = {};
            }

            setFormData({
                ...defaultData,
                ...content,

                steps:
                    content.steps?.length === 3
                        ? content.steps
                        : defaultData.steps,
            });
        } catch (error) {
            console.error("Work fetch error:", error);

            setMessage(
                "Failed to load Work section."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleStepChange = (
        index,
        field,
        value
    ) => {
        setFormData((prev) => {
            const updatedSteps = [
                ...prev.steps,
            ];

            updatedSteps[index] = {
                ...updatedSteps[index],
                [field]: value,
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    const handleSave = async () => {
        if (!pageId) {
            setMessage(
                "Work page ID not found."
            );
            return;
        }

        try {
            setSaving(true);
            setMessage("");

            const token = getToken();

            const data = await updatePage(
                pageId,
                {
                    page_name: "Home",
                    section_name: "Work",
                    title: formData.heading,
                    description: formData.intro,
                    image: "",
                    content: formData,
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update Work section"
                );
            }

            setMessage(
                "Work section updated successfully."
            );
        } catch (error) {
            console.error(
                "Work save error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Failed to save Work section."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">
                    Loading Work...
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Work
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage the Home page How It Works section.
                </p>
            </div>

            {message && (
                <div className="mb-6 p-4 rounded-lg bg-gray-100 border">
                    {message}
                </div>
            )}

            {/* MAIN CONTENT */}

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-5">
                    Main Content
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="block font-medium mb-2">
                            Badge
                        </label>

                        <input
                            type="text"
                            value={
                                formData.badge
                            }
                            onChange={(e) =>
                                handleChange(
                                    "badge",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Heading
                        </label>

                        <textarea
                            rows="3"
                            value={
                                formData.heading
                            }
                            onChange={(e) =>
                                handleChange(
                                    "heading",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Introduction
                        </label>

                        <textarea
                            rows="5"
                            value={
                                formData.intro
                            }
                            onChange={(e) =>
                                handleChange(
                                    "intro",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="block font-medium mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.button_text
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "button_text",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.button_link
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "button_link",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* STEPS */}

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-5">
                    How It Works Steps
                </h2>

                <div className="grid gap-6">

                    {formData.steps.map(
                        (step, index) => (
                            <div
                                key={step.id}
                                className="border rounded-xl p-5"
                            >

                                <h3 className="text-lg font-semibold mb-5">
                                    Step {index + 1}
                                </h3>

                                <div className="grid gap-4">

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Title
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                step.title
                                            }
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Description
                                        </label>

                                        <textarea
                                            rows="3"
                                            value={
                                                step.description
                                            }
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Point
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                step.point
                                            }
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    "point",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Image URL
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                step.image
                                            }
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    "image",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="/assets/Main/a2.png"
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-2">
                                            Icon
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                step.icon
                                            }
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    "icon",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                </div>
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* BOTTOM CTA */}

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-5">
                    Bottom CTA
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="block font-medium mb-2">
                            Avatar Image URL
                        </label>

                        <input
                            type="text"
                            value={
                                formData.avatar
                            }
                            onChange={(e) =>
                                handleChange(
                                    "avatar",
                                    e.target.value
                                )
                            }
                            placeholder="/assets/Solarimage/avatar1.png"
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            CTA Text
                        </label>

                        <textarea
                            rows="3"
                            value={
                                formData.cta_text
                            }
                            onChange={(e) =>
                                handleChange(
                                    "cta_text",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="block font-medium mb-2">
                                Link Text
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.cta_link_text
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "cta_link_text",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Link URL
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.cta_link
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "cta_link",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* REVIEWS */}

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-5">
                    Reviews
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <div>
                        <label className="block font-medium mb-2">
                            Rating
                        </label>

                        <input
                            type="text"
                            value={
                                formData.rating
                            }
                            onChange={(e) =>
                                handleChange(
                                    "rating",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Stars
                        </label>

                        <input
                            type="text"
                            value={
                                formData.stars
                            }
                            onChange={(e) =>
                                handleChange(
                                    "stars",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Reviews
                        </label>

                        <input
                            type="text"
                            value={
                                formData.reviews
                            }
                            onChange={(e) =>
                                handleChange(
                                    "reviews",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 rounded-lg bg-black text-white font-medium disabled:opacity-50"
            >
                {saving
                    ? "Saving..."
                    : "Save Changes"}
            </button>

        </div>
    );
};

export default Work;