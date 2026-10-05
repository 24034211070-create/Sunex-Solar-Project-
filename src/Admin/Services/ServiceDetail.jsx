import React, { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/axios";

const services = [
    {
        name: "Solar Battery Storage",
        slug: "solar-battery-storage",
    },
    {
        name: "Residential Solar Solutions",
        slug: "residential-solar-solutions",
    },
    {
        name: "Solar System Maintenance",
        slug: "solar-system-maintenance",
    },
    {
        name: "Rooftop Solar Solutions",
        slug: "rooftop-solar-solutions",
    },
    {
        name: "Solar Panel Maintenance",
        slug: "solar-panel-maintenance",
    },
    {
        name: "Hybrid Solar Systems",
        slug: "hybrid-solar-systems",
    },
];

const createDefaultData = (service) => ({
    serviceSlug: service?.slug || "",

    hero: {
        title: service?.name || "",
        image: "",
    },

    intro: {
        image: "",
        paragraphs: ["", "", ""],
    },

    whatWeOffer: {
        heading: "What we offer",
        description: "",
        items: ["", "", "", ""],
    },

    middleImage: "",

    keyBenefits: {
        heading: "Our key benefits",
        description: "",
    },

    benefits: {
        image: "",
        items: [
            {
                title: "",
                description: "",
            },
            {
                title: "",
                description: "",
            },
            {
                title: "",
                description: "",
            },
        ],
    },

    features: [
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },
    ],

    faq: {
        heading: "Frequently Asked Questions",
        description: "",
        items: [
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
            {
                question: "",
                answer: "",
            },
        ],
    },

    cta: {
        badge: "GO SOLAR",
        heading: "",
        description: "",
        buttonText: "Get Started",
        buttonLink: "#contact",
    },
});

const clone = (data) => JSON.parse(JSON.stringify(data));

const normalize = (value) =>
    String(value || "")
        .trim()
        .toLowerCase();

const mergeServiceData = (service, content = {}, page = {}) => {
    const defaults = createDefaultData(service);

    const merged = {
        ...defaults,
        ...content,

        serviceSlug:
            content.serviceSlug ||
            service?.slug ||
            "",

        hero: {
            ...defaults.hero,
            ...(content.hero || {}),
        },

        intro: {
            ...defaults.intro,
            ...(content.intro || {}),
            paragraphs:
                Array.isArray(content.intro?.paragraphs) &&
                    content.intro.paragraphs.length > 0
                    ? content.intro.paragraphs
                    : defaults.intro.paragraphs,
        },

        whatWeOffer: {
            ...defaults.whatWeOffer,
            ...(content.whatWeOffer || {}),
            items:
                Array.isArray(content.whatWeOffer?.items) &&
                    content.whatWeOffer.items.length > 0
                    ? content.whatWeOffer.items
                    : defaults.whatWeOffer.items,
        },

        keyBenefits: {
            ...defaults.keyBenefits,
            ...(content.keyBenefits || {}),
        },

        benefits: {
            ...defaults.benefits,
            ...(content.benefits || {}),
            items:
                Array.isArray(content.benefits?.items) &&
                    content.benefits.items.length > 0
                    ? content.benefits.items
                    : defaults.benefits.items,
        },

        features:
            Array.isArray(content.features) && content.features.length > 0
                ? content.features
                : defaults.features,

        faq: {
            ...defaults.faq,
            ...(content.faq || {}),
            items:
                Array.isArray(content.faq?.items) &&
                    content.faq.items.length > 0
                    ? content.faq.items
                    : defaults.faq.items,
        },

        cta: {
            ...defaults.cta,
            ...(content.cta || {}),
        },
    };

    /*
     * Safety fallback:
     * Agar DB content mein hero title empty hai,
     * to service ka actual name use hoga.
     */
    if (!merged.hero.title) {
        merged.hero.title =
            page.title ||
            service?.name ||
            "";
    }

    /*
     * Agar DB mein image content ke andar nahi hai,
     * to legacy page image preserve karenge.
     */
    if (!merged.hero.image && page.image) {
        merged.hero.image = page.image;
    }

    /*
     * Legacy description ko intro ke first paragraph
     * ke fallback ke roop mein preserve karenge.
     */
    if (
        (!merged.intro.paragraphs ||
            merged.intro.paragraphs.every(
                (item) => !String(item || "").trim()
            )) &&
        page.description
    ) {
        merged.intro.paragraphs = [
            page.description,
            ...defaults.intro.paragraphs.slice(1),
        ];
    }

    return merged;
};

const Section = ({ title, children }) => (
    <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
            {title}
        </h2>

        <div className="space-y-5">
            {children}
        </div>
    </section>
);

const Input = ({ label, value, onChange, placeholder = "" }) => (
    <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
        </label>

        <input
            type="text"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
    </div>
);

const Textarea = ({ label, value, onChange, placeholder = "" }) => (
    <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
        </label>

        <textarea
            rows={4}
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
    </div>
);

const ArrayTextEditor = ({
    title,
    items,
    onChange,
    onAdd,
    onRemove,
}) => (
    <div>
        <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
                {title}
            </h3>

            <button
                type="button"
                onClick={onAdd}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
                <Plus size={16} />
                Add
            </button>
        </div>

        <div className="space-y-3">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-start gap-3"
                >
                    <div className="flex-1">
                        <input
                            type="text"
                            value={item ?? ""}
                            onChange={(e) =>
                                onChange(index, e.target.value)
                            }
                            placeholder={`Item ${index + 1}`}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="rounded-lg border border-red-200 p-3 text-red-500 transition hover:bg-red-50"
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const ServicesDetail = () => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const currentService =
        services.find(
            (service) =>
                normalize(service.slug) === normalize(slug)
        ) || null;

    const [pageId, setPageId] = useState(null);
    const [form, setForm] = useState(
        createDefaultData(currentService)
    );
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!currentService) {
            setLoading(false);
            return;
        }

        loadData();
    }, [slug]);

    const loadData = async () => {
        try {
            setLoading(true);

            const response = await api.get("/pages");

            const pages = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.pages)
                    ? response.data.pages
                    : [];

            /*
             * First try exact serviceSlug.
             */
            let page = pages.find((item) => {
                const pageName = normalize(item.pageName);
                const contentSlug = normalize(
                    item.content?.serviceSlug
                );

                return (
                    pageName === "services inner" &&
                    contentSlug === normalize(slug)
                );
            });

            /*
             * Second safe fallback:
             * sectionName may already contain the service name.
             *
             * This helps existing DB records where serviceSlug
             * was not stored correctly.
             */
            if (!page && currentService) {
                page = pages.find((item) => {
                    const pageName = normalize(item.pageName);
                    const sectionName = normalize(
                        item.sectionName
                    );
                    const title = normalize(item.title);

                    return (
                        pageName === "services inner" &&
                        (
                            sectionName ===
                            normalize(currentService.name) ||
                            title ===
                            normalize(currentService.name)
                        )
                    );
                });
            }

            /*
             * Third fallback:
             * Some older records may use pageName/sectionName
             * with slightly different casing or spacing.
             */
            if (!page && currentService) {
                page = pages.find((item) => {
                    const pageName = normalize(item.pageName);
                    const sectionName = normalize(
                        item.sectionName
                    );

                    return (
                        pageName.includes("services") &&
                        sectionName ===
                        normalize(currentService.name)
                    );
                });
            }

            if (page) {
                setPageId(page.id);

                const content =
                    page.content &&
                        typeof page.content === "object"
                        ? page.content
                        : {};

                setForm(
                    mergeServiceData(
                        currentService,
                        content,
                        page
                    )
                );
            } else {
                /*
                 * Do NOT create anything automatically here.
                 * This prevents accidental duplicate DB records.
                 */
                setPageId(null);

                setForm(
                    createDefaultData(currentService)
                );
            }
        } catch (error) {
            console.error(
                "SERVICE DETAIL LOAD ERROR:",
                error
            );

            alert("Failed to load service data.");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (path, value) => {
        setForm((previous) => {
            const updated = clone(previous);

            let current = updated;

            for (let i = 0; i < path.length - 1; i++) {
                if (
                    !current[path[i]] ||
                    typeof current[path[i]] !== "object"
                ) {
                    current[path[i]] = {};
                }

                current = current[path[i]];
            }

            current[path[path.length - 1]] = value;

            return updated;
        });
    };

    const updateArrayItem = (
        path,
        index,
        value
    ) => {
        setForm((previous) => {
            const updated = clone(previous);

            let current = updated;

            for (const key of path) {
                current = current[key];
            }

            current[index] = value;

            return updated;
        });
    };

    const updateObjectArrayItem = (
        path,
        index,
        field,
        value
    ) => {
        setForm((previous) => {
            const updated = clone(previous);

            let current = updated;

            for (const key of path) {
                current = current[key];
            }

            if (!current[index]) {
                current[index] = {};
            }

            current[index][field] = value;

            return updated;
        });
    };

    const addArrayItem = (path, item) => {
        setForm((previous) => {
            const updated = clone(previous);

            let current = updated;

            for (const key of path) {
                current = current[key];
            }

            current.push(clone(item));

            return updated;
        });
    };

    const removeArrayItem = (
        path,
        index
    ) => {
        setForm((previous) => {
            const updated = clone(previous);

            let current = updated;

            for (const key of path) {
                current = current[key];
            }

            current.splice(index, 1);

            return updated;
        });
    };

    const handleSave = async () => {
        if (!currentService) return;

        try {
            setSaving(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                alert(
                    "Admin token not found. Please login again."
                );
                return;
            }

            const cleanForm = {
                ...clone(form),

                serviceSlug:
                    currentService.slug,

                hero: {
                    ...clone(form.hero),
                    title:
                        form.hero.title ||
                        currentService.name,
                },
            };

            const payload = {
                page_name: "Services Inner",

                section_name:
                    currentService.name,

                title:
                    cleanForm.hero.title,

                description:
                    cleanForm.intro?.paragraphs?.[0] ||
                    "",

                image:
                    cleanForm.hero?.image || "",

                content: cleanForm,
            };

            const config = {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            };

            if (pageId) {
                await api.put(
                    `/pages/${pageId}`,
                    payload,
                    config
                );
            } else {
                const response =
                    await api.post(
                        "/pages",
                        payload,
                        config
                    );

                if (response.data?.id) {
                    setPageId(
                        response.data.id
                    );
                }
            }

            alert(
                "Service details saved successfully!"
            );

            await loadData();
        } catch (error) {
            console.error(
                "SERVICE DETAIL SAVE ERROR:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                alert(
                    "Authorization failed. Please login again as admin."
                );
            } else if (
                error.response?.data?.message
            ) {
                alert(
                    error.response.data.message
                );
            } else {
                alert(
                    "Failed to save service details."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="flex min-h-[400px] items-center justify-center">
                    <p className="text-gray-500">
                        Loading service details...
                    </p>
                </div>
            </div>
        );
    }

    if (!currentService) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-xl font-bold text-gray-900">
                        Service not found
                    </h1>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/pages/services")
                        }
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            {currentService.name}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage this service inner page content.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/pages/services")
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={18} />
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* HERO */}
                <Section title="Hero Section">
                    <Input
                        label="Hero Title"
                        value={form.hero.title}
                        onChange={(value) =>
                            updateField(
                                ["hero", "title"],
                                value
                            )
                        }
                    />

                    <Input
                        label="Hero Image URL / Path"
                        value={form.hero.image}
                        onChange={(value) =>
                            updateField(
                                ["hero", "image"],
                                value
                            )
                        }
                    />
                </Section>

                {/* INTRO */}
                <Section title="Intro Section">
                    <Input
                        label="Intro Image URL / Path"
                        value={form.intro.image}
                        onChange={(value) =>
                            updateField(
                                ["intro", "image"],
                                value
                            )
                        }
                    />

                    <div className="space-y-5">
                        {form.intro.paragraphs.map(
                            (paragraph, index) => (
                                <Textarea
                                    key={index}
                                    label={`Paragraph ${index + 1}`}
                                    value={paragraph}
                                    onChange={(value) =>
                                        updateArrayItem(
                                            [
                                                "intro",
                                                "paragraphs",
                                            ],
                                            index,
                                            value
                                        )
                                    }
                                />
                            )
                        )}
                    </div>
                </Section>

                {/* WHAT WE OFFER */}
                <Section title="What We Offer">
                    <Input
                        label="Heading"
                        value={
                            form.whatWeOffer.heading
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "whatWeOffer",
                                    "heading",
                                ],
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Description"
                        value={
                            form.whatWeOffer
                                .description
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "whatWeOffer",
                                    "description",
                                ],
                                value
                            )
                        }
                    />

                    <ArrayTextEditor
                        title="Offer Items"
                        items={
                            form.whatWeOffer.items
                        }
                        onChange={(index, value) =>
                            updateArrayItem(
                                [
                                    "whatWeOffer",
                                    "items",
                                ],
                                index,
                                value
                            )
                        }
                        onAdd={() =>
                            addArrayItem(
                                [
                                    "whatWeOffer",
                                    "items",
                                ],
                                ""
                            )
                        }
                        onRemove={(index) =>
                            removeArrayItem(
                                [
                                    "whatWeOffer",
                                    "items",
                                ],
                                index
                            )
                        }
                    />
                </Section>

                {/* MIDDLE IMAGE */}
                <Section title="Middle Image">
                    <Input
                        label="Image URL / Path"
                        value={form.middleImage}
                        onChange={(value) =>
                            updateField(
                                ["middleImage"],
                                value
                            )
                        }
                    />
                </Section>

                {/* KEY BENEFITS */}
                <Section title="Key Benefits">
                    <Input
                        label="Heading"
                        value={
                            form.keyBenefits.heading
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "keyBenefits",
                                    "heading",
                                ],
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Description"
                        value={
                            form.keyBenefits
                                .description
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "keyBenefits",
                                    "description",
                                ],
                                value
                            )
                        }
                    />
                </Section>

                {/* BENEFITS */}
                <Section title="Benefits">
                    <Input
                        label="Benefits Image URL / Path"
                        value={form.benefits.image}
                        onChange={(value) =>
                            updateField(
                                [
                                    "benefits",
                                    "image",
                                ],
                                value
                            )
                        }
                    />

                    <div className="space-y-5">
                        {form.benefits.items.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800">
                                            Benefit{" "}
                                            {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeArrayItem(
                                                    [
                                                        "benefits",
                                                        "items",
                                                    ],
                                                    index
                                                )
                                            }
                                            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2
                                                size={17}
                                            />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            label="Title"
                                            value={
                                                item.title
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "benefits",
                                                        "items",
                                                    ],
                                                    index,
                                                    "title",
                                                    value
                                                )
                                            }
                                        />

                                        <Textarea
                                            label="Description"
                                            value={
                                                item.description
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "benefits",
                                                        "items",
                                                    ],
                                                    index,
                                                    "description",
                                                    value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            addArrayItem(
                                [
                                    "benefits",
                                    "items",
                                ],
                                {
                                    title: "",
                                    description: "",
                                }
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <Plus size={17} />
                        Add Benefit
                    </button>
                </Section>

                {/* FEATURES */}
                <Section title="Features">
                    <div className="space-y-5">
                        {form.features.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800">
                                            Feature{" "}
                                            {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeArrayItem(
                                                    [
                                                        "features",
                                                    ],
                                                    index
                                                )
                                            }
                                            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2
                                                size={17}
                                            />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            label="Title"
                                            value={
                                                item.title
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "features",
                                                    ],
                                                    index,
                                                    "title",
                                                    value
                                                )
                                            }
                                        />

                                        <Textarea
                                            label="Description"
                                            value={
                                                item.description
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "features",
                                                    ],
                                                    index,
                                                    "description",
                                                    value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            addArrayItem(
                                ["features"],
                                {
                                    title: "",
                                    description: "",
                                }
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <Plus size={17} />
                        Add Feature
                    </button>
                </Section>

                {/* FAQ */}
                <Section title="Frequently Asked Questions">
                    <Input
                        label="Heading"
                        value={form.faq.heading}
                        onChange={(value) =>
                            updateField(
                                ["faq", "heading"],
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Description"
                        value={
                            form.faq.description
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "faq",
                                    "description",
                                ],
                                value
                            )
                        }
                    />

                    <div className="space-y-5">
                        {form.faq.items.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800">
                                            FAQ{" "}
                                            {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeArrayItem(
                                                    [
                                                        "faq",
                                                        "items",
                                                    ],
                                                    index
                                                )
                                            }
                                            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2
                                                size={17}
                                            />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            label="Question"
                                            value={
                                                item.question
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "faq",
                                                        "items",
                                                    ],
                                                    index,
                                                    "question",
                                                    value
                                                )
                                            }
                                        />

                                        <Textarea
                                            label="Answer"
                                            value={
                                                item.answer
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateObjectArrayItem(
                                                    [
                                                        "faq",
                                                        "items",
                                                    ],
                                                    index,
                                                    "answer",
                                                    value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            addArrayItem(
                                ["faq", "items"],
                                {
                                    question: "",
                                    answer: "",
                                }
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <Plus size={17} />
                        Add FAQ
                    </button>
                </Section>

                {/* CTA */}
                <Section title="CTA Section">
                    <Input
                        label="Badge"
                        value={form.cta.badge}
                        onChange={(value) =>
                            updateField(
                                ["cta", "badge"],
                                value
                            )
                        }
                    />

                    <Input
                        label="Heading"
                        value={form.cta.heading}
                        onChange={(value) =>
                            updateField(
                                ["cta", "heading"],
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Description"
                        value={
                            form.cta.description
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "cta",
                                    "description",
                                ],
                                value
                            )
                        }
                    />

                    <Input
                        label="Button Text"
                        value={
                            form.cta.buttonText
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "cta",
                                    "buttonText",
                                ],
                                value
                            )
                        }
                    />

                    <Input
                        label="Button Link"
                        value={
                            form.cta.buttonLink
                        }
                        onChange={(value) =>
                            updateField(
                                [
                                    "cta",
                                    "buttonLink",
                                ],
                                value
                            )
                        }
                    />
                </Section>

                {/* BOTTOM NOTE */}
                <div className="mb-8 rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
                    Changes are saved to the Services Inner CMS
                    record for this service.
                </div>
            </div>
        </div>
    );
};

export default ServicesDetail;