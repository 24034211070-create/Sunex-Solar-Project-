import React, { useEffect, useState } from "react";
import { getPages, updatePage, createPage } from "../../Api/api";

const DEFAULT_CONTENT = {
    tag: "Why Choose Us",

    trusted_title: "Trusted Clean Energy Partner",

    trusted_description:
        "We deliver reliable solar solutions through expert planning, quality installations, and ongoing support.",

    stats: [
        {
            number: "1",
            suffix: "K+",
            label: "Solar Installations",
        },
        {
            number: "15",
            suffix: "MW+",
            label: "Energy Generated",
        },
        {
            number: "25",
            suffix: "+",
            label: "Solar System Lifespan",
        },
    ],

    slider_items: [
        "Solar Installation",
        "Solar Maintenance",
        "Hybrid Solar Systems",
        "Green Energy",
    ],

    support_title: "Long Term Support",

    support_description:
        "We provide dependable after sales support.",

    pills: [
        "Renewable Energy",
        "Residential Solar",
        "Sustainable Energy",
        "Solar Battery Storage",
    ],

    quote_text:
        "Let's make something great work together.",

    quote_button_text: "Get Free Quote",
};

const WhyChooseUs = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [pageId, setPageId] = useState(null);
    const [existingPage, setExistingPage] = useState(null);

    const [formData, setFormData] = useState({
        title:
            "Expert driven solar solutions built for efficiency & trust",

        description:
            "We are committed to delivering reliable, high-quality solar solutions you can trust. With expert guidance, advanced technology, and end-to-end support.",
    });

    const [content, setContent] = useState(DEFAULT_CONTENT);

    useEffect(() => {
        fetchWhyChooseUs();
    }, []);

    const fetchWhyChooseUs = async () => {
        try {
            setLoading(true);
            setMessage("");

            const data = await getPages();

            const page = data.pages?.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "Why Choose Us"
            );

            if (page) {
                setPageId(page.id);
                setExistingPage(page);

                setFormData({
                    title: page.title || "",
                    description: page.description || "",
                });

                if (page.content) {
                    setContent({
                        ...DEFAULT_CONTENT,
                        ...page.content,

                        stats: Array.isArray(page.content.stats)
                            ? page.content.stats
                            : DEFAULT_CONTENT.stats,

                        slider_items: Array.isArray(
                            page.content.slider_items
                        )
                            ? page.content.slider_items
                            : DEFAULT_CONTENT.slider_items,

                        pills: Array.isArray(page.content.pills)
                            ? page.content.pills
                            : DEFAULT_CONTENT.pills,
                    });
                }
            }
        } catch (error) {
            console.error(
                "Why Choose Us fetch error:",
                error
            );

            setMessage(
                `Data load error: ${error.response?.data?.message ||
                error.message ||
                "Failed to fetch pages"
                }`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleMainChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleContentChange = (field, value) => {
        setContent((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleStatChange = (
        index,
        field,
        value
    ) => {
        setContent((previous) => ({
            ...previous,

            stats: previous.stats.map(
                (stat, statIndex) =>
                    statIndex === index
                        ? {
                            ...stat,
                            [field]: value,
                        }
                        : stat
            ),
        }));
    };

    const handleSliderChange = (
        index,
        value
    ) => {
        setContent((previous) => ({
            ...previous,

            slider_items:
                previous.slider_items.map(
                    (item, itemIndex) =>
                        itemIndex === index
                            ? value
                            : item
                ),
        }));
    };

    const handlePillChange = (
        index,
        value
    ) => {
        setContent((previous) => ({
            ...previous,

            pills: previous.pills.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? value
                        : item
            ),
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                setMessage(
                    "Admin login required."
                );
                return;
            }

            const payload = {
                page_name: "Home",
                section_name: "Why Choose Us",

                title: formData.title,

                description:
                    formData.description,

                image: existingPage?.image || "",

                badge: existingPage?.badge || null,

                video: existingPage?.video || null,

                primary_button_text:
                    existingPage?.primary_button_text ||
                    null,

                primary_button_link:
                    existingPage?.primary_button_link ||
                    null,

                secondary_button_text:
                    existingPage?.secondary_button_text ||
                    null,

                secondary_button_link:
                    existingPage?.secondary_button_link ||
                    null,

                testimonial:
                    existingPage?.testimonial || null,

                avatar_1:
                    existingPage?.avatar_1 || null,

                avatar_2:
                    existingPage?.avatar_2 || null,

                avatar_3:
                    existingPage?.avatar_3 || null,

                avatar_4:
                    existingPage?.avatar_4 || null,

                content: content,
            };

            let data;

            if (pageId) {
                data = await updatePage(
                    pageId,
                    payload,
                    token
                );
            } else {
                data = await createPage(
                    payload,
                    token
                );
            }

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Save failed"
                );
            }

            if (data.page?.id) {
                setPageId(data.page.id);
                setExistingPage(data.page);
            }

            setMessage(
                "Why Choose Us successfully saved."
            );

            await fetchWhyChooseUs();
        } catch (error) {
            console.error(
                "Why Choose Us save error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Data save nahi ho paaya."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">
                    Loading Why Choose Us...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Home - Why Choose Us
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Home page ke Why Choose Us
                    section ka content manage karein.
                </p>
            </div>

            {/* MAIN SECTION */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                    Main Section
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Section Tag
                        </label>

                        <input
                            type="text"
                            value={content.tag}
                            onChange={(e) =>
                                handleContentChange(
                                    "tag",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Main Heading
                        </label>

                        <textarea
                            name="title"
                            value={formData.title}
                            onChange={handleMainChange}
                            rows={3}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Main Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={handleMainChange}
                            rows={4}
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                </div>
            </div>

            {/* TRUST CARD */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Trusted Card
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Card Title
                        </label>

                        <input
                            type="text"
                            value={
                                content.trusted_title
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "trusted_title",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Card Description
                        </label>

                        <textarea
                            value={
                                content.trusted_description
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "trusted_description",
                                    e.target.value
                                )
                            }
                            rows={3}
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                </div>
            </div>

            {/* STATS */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Statistics
                </h2>

                <div className="grid gap-5">

                    {content.stats.map(
                        (stat, index) => (
                            <div
                                key={index}
                                className="rounded-xl border bg-slate-50 p-5"
                            >
                                <h3 className="mb-4 font-semibold">
                                    Statistic{" "}
                                    {index + 1}
                                </h3>

                                <div className="grid gap-4 md:grid-cols-3">

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Number
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                stat.number
                                            }
                                            onChange={(e) =>
                                                handleStatChange(
                                                    index,
                                                    "number",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Suffix
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                stat.suffix
                                            }
                                            onChange={(e) =>
                                                handleStatChange(
                                                    index,
                                                    "suffix",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Label
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                stat.label
                                            }
                                            onChange={(e) =>
                                                handleStatChange(
                                                    index,
                                                    "label",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                        />
                                    </div>

                                </div>
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* SLIDER ITEMS */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Image Slider Items
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                    {content.slider_items.map(
                        (item, index) => (
                            <div key={index}>
                                <label className="mb-2 block text-sm font-medium">
                                    Slider Item{" "}
                                    {index + 1}
                                </label>

                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                        handleSliderChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                                />
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* SUPPORT */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Long Term Support
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={
                                content.support_title
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "support_title",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            value={
                                content.support_description
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "support_description",
                                    e.target.value
                                )
                            }
                            rows={3}
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                </div>
            </div>

            {/* BOTTOM PILLS */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Bottom Tags
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                    {content.pills.map(
                        (pill, index) => (
                            <div key={index}>
                                <label className="mb-2 block text-sm font-medium">
                                    Tag {index + 1}
                                </label>

                                <input
                                    type="text"
                                    value={pill}
                                    onChange={(e) =>
                                        handlePillChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* QUOTE */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Bottom Contact
                </h2>

                <div className="grid gap-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Quote Text
                        </label>

                        <input
                            type="text"
                            value={
                                content.quote_text
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "quote_text",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Button Text
                        </label>

                        <input
                            type="text"
                            value={
                                content.quote_button_text
                            }
                            onChange={(e) =>
                                handleContentChange(
                                    "quote_button_text",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                </div>
            </div>

            {/* SAVE */}

            <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm">

                <div>
                    {message && (
                        <p
                            className={`text-sm font-medium ${message.includes(
                                "successfully"
                            )
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

            </div>
        </div>
    );
};

export default WhyChooseUs;