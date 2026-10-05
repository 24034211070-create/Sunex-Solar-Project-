import React, { useEffect, useState } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, updatePage } from "../../Api/api";

const FAQ = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        badge: "Frequently Asked Questions",    
        heading: "Clear guidance for your solar journey",
        description:
            "We've answered the most common questions to help you understand solar energy, installation, costs, and maintenance.",
        button_text: "View All Questions",
        button_link: "#faq",

        faqs: [
            {
                id: 1,
                question:
                    "Is solar energy suitable for my home or business?",
                answer:
                    "Yes, solar energy is suitable for most homes and businesses. Factors such as roof space, sunlight exposure, and your energy consumption are evaluated to design a suitable solar system.",
            },
            {
                id: 2,
                question:
                    "What happens if I generate more power than I use?",
                answer:
                    "When your solar system generates more electricity than you consume, the excess power can be sent back to the grid depending on your local net metering or electricity regulations.",
            },
            {
                id: 3,
                question:
                    "Are there government subsidies or incentives available?",
                answer:
                    "Government subsidies and incentives may be available depending on your location, system type, and applicable renewable energy programs. Our team can help you understand the available options.",
            },
            {
                id: 4,
                question:
                    "What maintenance does a solar system require?",
                answer:
                    "Solar systems generally require minimal maintenance. Regular cleaning, visual inspections, and periodic performance checks help keep the system operating efficiently.",
            },
            {
                id: 5,
                question:
                    "Does solar work during cloudy days or at night?",
                answer:
                    "Solar panels can still generate electricity during cloudy weather, although production may be lower. At night, solar panels do not generate electricity, so battery storage or grid electricity can provide power.",
            },
        ],
    });

    useEffect(() => {
        fetchFAQ();
    }, []);

    // =========================
    // FETCH FAQ
    // =========================
    const fetchFAQ = async () => {
        try {
            setLoading(true);

            const data = await getPages();

            if (!data.success || !Array.isArray(data.pages)) {
                return;
            }

            const faqPage = data.pages.find(
                (page) =>
                    page.page_name === "Home" &&
                    page.section_name === "FAQ"
            );

            if (!faqPage) {
                return;
            }

            setPageId(faqPage.id);

            const content =
                faqPage.content &&
                    typeof faqPage.content === "object"
                    ? faqPage.content
                    : {};

            setFormData({
                badge:
                    content.badge ||
                    "Frequently Asked Questions",

                heading:
                    content.heading ||
                    faqPage.title ||
                    "Clear guidance for your solar journey",

                description:
                    content.description ||
                    faqPage.description ||
                    "",

                button_text:
                    content.button_text ||
                    "View All Questions",

                button_link:
                    content.button_link ||
                    "#faq",

                faqs: Array.isArray(content.faqs)
                    ? content.faqs
                    : [],
            });
        } catch (error) {
            console.error("FAQ fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // GENERAL CHANGE
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // FAQ CHANGE
    // =========================
    const handleFAQChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            faqs: prev.faqs.map((faq, faqIndex) =>
                faqIndex === index
                    ? {
                        ...faq,
                        [field]: value,
                    }
                    : faq
            ),
        }));
    };

    // =========================
    // ADD FAQ
    // =========================
    const addFAQ = () => {
        setFormData((prev) => ({
            ...prev,
            faqs: [
                ...prev.faqs,
                {
                    id: Date.now(),
                    question: "New FAQ Question",
                    answer: "Write the answer here.",
                },
            ],
        }));
    };

    // =========================
    // DELETE FAQ
    // =========================
    const deleteFAQ = (index) => {
        setFormData((prev) => ({
            ...prev,
            faqs: prev.faqs.filter(
                (_, faqIndex) => faqIndex !== index
            ),
        }));
    };

    // =========================
    // SAVE FAQ
    // =========================
    const handleSave = async () => {
        if (!pageId) {
            alert("FAQ page data not found.");
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
                    section_name: "FAQ",

                    title: formData.heading,

                    description:
                        formData.description,

                    image: "",

                    content: formData,
                },
                token
            );

            if (!data.success) {
                alert(
                    data.message ||
                    "Failed to update FAQ."
                );
                return;
            }

            alert("FAQ updated successfully!");
        } catch (error) {
            console.error(
                "FAQ save error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Something went wrong while saving FAQ."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="p-6">
                Loading FAQ...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        FAQ
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage Home FAQ section.
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
                        <ArrowLeft size={18} />
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

            {/* GENERAL SETTINGS */}
            <div className="bg-white border rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-5">
                    FAQ Section Settings
                </h2>

                <div className="grid gap-5">
                    {/* BADGE */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Badge
                        </label>

                        <input
                            type="text"
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    {/* HEADING */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Heading
                        </label>

                        <input
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            rows={4}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    {/* BUTTON SETTINGS */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                name="button_text"
                                value={
                                    formData.button_text
                                }
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                name="button_link"
                                value={
                                    formData.button_link
                                }
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ QUESTIONS */}
            <div className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Questions & Answers
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add, edit or remove FAQ questions.
                        </p>
                    </div>

                    <button
                        onClick={addFAQ}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
                    >
                        <Plus size={18} />
                        Add FAQ
                    </button>
                </div>

                <div className="space-y-5">
                    {formData.faqs.map(
                        (faq, index) => (
                            <div
                                key={
                                    faq.id || index
                                }
                                className="border rounded-xl p-5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold">
                                        Question{" "}
                                        {index + 1}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            deleteFAQ(
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

                                <div className="space-y-4">
                                    {/* QUESTION */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Question
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                faq.question
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleFAQChange(
                                                    index,
                                                    "question",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>

                                    {/* ANSWER */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Answer
                                        </label>

                                        <textarea
                                            value={
                                                faq.answer
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleFAQChange(
                                                    index,
                                                    "answer",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={5}
                                            className="w-full border rounded-lg px-4 py-3"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {formData.faqs.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No FAQ questions added.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;