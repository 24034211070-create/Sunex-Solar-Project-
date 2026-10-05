import React, { useEffect, useState } from "react";
import { getPages, updatePage } from "../../Api/api";

const defaultData = {
    label: "Our Fun Facts",
    heading: "Measurable success in solar energy solutions",
    description:
        "Each figure represents the trust of our customers and the positive change we create through efficient, dependable, and clean energy systems.",
    image: "",
    facts: [
        {
            id: 1,
            icon: "◎",
            number: "25+ Years",
            text: "Panel Performance Lifespan",
        },
        {
            id: 2,
            icon: "◉",
            number: "4800+",
            text: "Solar Powered Homes",
        },
        {
            id: 3,
            icon: "♕",
            number: "10K+",
            text: "Trees Worth Of a CO₂",
        },
        {
            id: 4,
            icon: "⌂",
            number: "100%",
            text: "Commitment to Clean",
        },
    ],
    avatar: "",
    message:
        "Where smart solar design meets powerful clean energy results",
    link_text: "Get Installation Now",
    link_url: "#",
    rating: "4.9/5",
    stars: "★★★★★",
    reviews: "Over 4200 Reviews",
};

const FunFact = () => {
    const [pageId, setPageId] = useState(null);
    const [formData, setFormData] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const getToken = () => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        fetchFunFact();
    }, []);

    const fetchFunFact = async () => {
        try {
            const data = await getPages();

            if (!data.success) {
                throw new Error("Unable to fetch pages");
            }

            const page = data.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "FunFact"
            );

            if (!page) {
                setMessage(
                    "Fun Fact database row not found. Please create the Home / FunFact row first."
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
                facts:
                    content.facts?.length === 4
                        ? content.facts
                        : defaultData.facts,
            });
        } catch (error) {
            console.error("Fun Fact fetch error:", error);
            setMessage("Failed to load Fun Fact data.");
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

    const handleFactChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedFacts = [...prev.facts];

            updatedFacts[index] = {
                ...updatedFacts[index],
                [field]: value,
            };

            return {
                ...prev,
                facts: updatedFacts,
            };
        });
    };

    const handleSave = async () => {
        if (!pageId) {
            setMessage("Fun Fact page ID not found.");
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
                    section_name: "FunFact",
                    title: formData.heading,
                    description: formData.description,
                    image: formData.image,
                    content: formData,
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to update Fun Fact"
                );
            }

            setMessage("Fun Fact updated successfully.");
        } catch (error) {
            console.error("Fun Fact save error:", error);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Failed to save Fun Fact."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">
                    Loading Fun Fact...
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Fun Fact
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage the Home page Fun Fact section.
                </p>
            </div>

            {message && (
                <div className="mb-6 p-4 rounded-lg bg-gray-100 border">
                    {message}
                </div>
            )}

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-5">
                    Main Content
                </h2>

                <div className="grid gap-5">
                    <div>
                        <label className="block font-medium mb-2">
                            Label
                        </label>

                        <input
                            type="text"
                            value={formData.label}
                            onChange={(e) =>
                                handleChange(
                                    "label",
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
                            value={formData.heading}
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
                            Description
                        </label>

                        <textarea
                            rows="5"
                            value={formData.description}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Main Image URL
                        </label>

                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) =>
                                handleChange(
                                    "image",
                                    e.target.value
                                )
                            }
                            placeholder="/assets/Main/a1.png"
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-5">
                    Fun Fact Cards
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {formData.facts.map((fact, index) => (
                        <div
                            key={fact.id}
                            className="border rounded-xl p-5"
                        >
                            <h3 className="font-semibold text-lg mb-4">
                                Fact {index + 1}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-2">
                                        Icon
                                    </label>

                                    <input
                                        type="text"
                                        value={fact.icon}
                                        onChange={(e) =>
                                            handleFactChange(
                                                index,
                                                "icon",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">
                                        Number
                                    </label>

                                    <input
                                        type="text"
                                        value={fact.number}
                                        onChange={(e) =>
                                            handleFactChange(
                                                index,
                                                "number",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">
                                        Text
                                    </label>

                                    <input
                                        type="text"
                                        value={fact.text}
                                        onChange={(e) =>
                                            handleFactChange(
                                                index,
                                                "text",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-5">
                    Bottom Message
                </h2>

                <div className="grid gap-5">
                    <div>
                        <label className="block font-medium mb-2">
                            Avatar Image URL
                        </label>

                        <input
                            type="text"
                            value={formData.avatar}
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
                            Message
                        </label>

                        <textarea
                            rows="3"
                            value={formData.message}
                            onChange={(e) =>
                                handleChange(
                                    "message",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Link Text
                        </label>

                        <input
                            type="text"
                            value={formData.link_text}
                            onChange={(e) =>
                                handleChange(
                                    "link_text",
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
                            value={formData.link_url}
                            onChange={(e) =>
                                handleChange(
                                    "link_url",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-5">
                    Rating
                </h2>

                <div className="grid md:grid-cols-3 gap-5">
                    <div>
                        <label className="block font-medium mb-2">
                            Rating
                        </label>

                        <input
                            type="text"
                            value={formData.rating}
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
                            value={formData.stars}
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
                            value={formData.reviews}
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
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default FunFact;