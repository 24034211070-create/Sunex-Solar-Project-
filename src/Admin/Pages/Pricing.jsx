import React, { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, updatePage } from "../../Api/api";

const DEFAULT_PRICING = {
    label: "Our Pricing Plans",
    heading: "Flexible solar pricing designed for every budget",

    plans: [
        {
            id: 1,
            title: "Basic Solar Plan",
            icon: "♧",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "299.00",
            annually: "599.00",
            popular: false,
        },
        {
            id: 2,
            title: "Standard Solar Plan",
            icon: "♔",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "499.00",
            annually: "799.00",
            popular: true,
        },
        {
            id: 3,
            title: "Premium Solar Plan",
            icon: "◇",
            description:
                "An affordable entry level solar solution design to reduce electricity bills.",
            monthly: "699.00",
            annually: "999.00",
            popular: false,
        },
    ],

    features: [
        "High-Efficiency Solar Panels",
        "Real-Time Performance Monitoring",
        "Hybrid Inverter Battery Support",
    ],

    benefits: [
        "Get 30 day free trial",
        "No any hidden fees pay",
        "You can cancel anytime",
    ],
};

const Pricing = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(null);
    const [pricing, setPricing] = useState(DEFAULT_PRICING);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            setLoading(true);

            const data = await getPages();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch Pricing"
                );
            }

            const pricingPage = data.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "Pricing"
            );

            if (!pricingPage) {
                throw new Error("Pricing section not found");
            }

            setPage(pricingPage);

            const content = pricingPage.content || {};

            setPricing({
                label: content.label || DEFAULT_PRICING.label,

                heading:
                    content.heading || DEFAULT_PRICING.heading,

                plans:
                    Array.isArray(content.plans) &&
                        content.plans.length
                        ? content.plans
                        : DEFAULT_PRICING.plans,

                features: Array.isArray(content.features)
                    ? content.features
                    : DEFAULT_PRICING.features,

                benefits: Array.isArray(content.benefits)
                    ? content.benefits
                    : DEFAULT_PRICING.benefits,
            });
        } catch (error) {
            console.error("Pricing fetch error:", error);

            setMessage(
                error.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const updatePlan = (index, field, value) => {
        setPricing((prev) => ({
            ...prev,

            plans: prev.plans.map((plan, planIndex) =>
                planIndex === index
                    ? {
                        ...plan,
                        [field]: value,
                    }
                    : plan
            ),
        }));
    };

    const updateFeature = (index, value) => {
        setPricing((prev) => ({
            ...prev,

            features: prev.features.map(
                (feature, featureIndex) =>
                    featureIndex === index
                        ? value
                        : feature
            ),
        }));
    };

    const updateBenefit = (index, value) => {
        setPricing((prev) => ({
            ...prev,

            benefits: prev.benefits.map(
                (benefit, benefitIndex) =>
                    benefitIndex === index
                        ? value
                        : benefit
            ),
        }));
    };

    const addFeature = () => {
        setPricing((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    };

    const removeFeature = (index) => {
        setPricing((prev) => ({
            ...prev,

            features: prev.features.filter(
                (_, featureIndex) =>
                    featureIndex !== index
            ),
        }));
    };

    const addBenefit = () => {
        setPricing((prev) => ({
            ...prev,
            benefits: [...prev.benefits, ""],
        }));
    };

    const removeBenefit = (index) => {
        setPricing((prev) => ({
            ...prev,

            benefits: prev.benefits.filter(
                (_, benefitIndex) =>
                    benefitIndex !== index
            ),
        }));
    };

    const handleSave = async () => {
        if (!page?.id) {
            setMessage("Pricing page not found.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");

            const token = localStorage.getItem("token");

            if (!token) {
                setMessage(
                    "Admin token not found. Please login again."
                );
                return;
            }

            const data = await updatePage(
                page.id,
                {
                    page_name: "Home",
                    section_name: "Pricing",

                    title: pricing.heading,
                    description: pricing.label,

                    image: page.image || "",
                    video: page.video || "",

                    content: {
                        label: pricing.label,
                        heading: pricing.heading,
                        plans: pricing.plans,
                        features: pricing.features,
                        benefits: pricing.benefits,
                    },
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to update Pricing"
                );
            }

            setPage(data.page);

            const updatedContent = data.page.content || {};

            setPricing({
                label:
                    updatedContent.label ||
                    DEFAULT_PRICING.label,

                heading:
                    updatedContent.heading ||
                    DEFAULT_PRICING.heading,

                plans:
                    Array.isArray(updatedContent.plans) &&
                        updatedContent.plans.length
                        ? updatedContent.plans
                        : DEFAULT_PRICING.plans,

                features:
                    Array.isArray(updatedContent.features)
                        ? updatedContent.features
                        : DEFAULT_PRICING.features,

                benefits:
                    Array.isArray(updatedContent.benefits)
                        ? updatedContent.benefits
                        : DEFAULT_PRICING.benefits,
            });

            setMessage("Pricing updated successfully.");
        } catch (error) {
            console.error("Pricing save error:", error);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-slate-500">
                    Loading Pricing...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/pages/home")
                        }
                        className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
                    >
                        <ArrowLeft size={17} />
                        Back to Home
                    </button>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Pricing Section
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the Home Pricing section.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                    {message}
                </div>
            )}

            {/* Header Content */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    Pricing Header
                </h2>

                <div className="mt-5 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Label
                        </label>

                        <input
                            type="text"
                            value={pricing.label}
                            onChange={(e) =>
                                setPricing((prev) => ({
                                    ...prev,
                                    label: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Heading
                        </label>

                        <textarea
                            rows="3"
                            value={pricing.heading}
                            onChange={(e) =>
                                setPricing((prev) => ({
                                    ...prev,
                                    heading: e.target.value,
                                }))
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                </div>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Pricing Plans
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your three pricing plans.
                    </p>
                </div>

                {pricing.plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-base font-semibold text-slate-900">
                                Plan {index + 1}
                            </h3>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                ID: {plan.id}
                            </span>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Icon */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Icon
                                </label>

                                <input
                                    type="text"
                                    value={plan.icon}
                                    onChange={(e) =>
                                        updatePlan(
                                            index,
                                            "icon",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Plan Title
                                </label>

                                <input
                                    type="text"
                                    value={plan.title}
                                    onChange={(e) =>
                                        updatePlan(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    rows="3"
                                    value={plan.description}
                                    onChange={(e) =>
                                        updatePlan(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Monthly */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Monthly Price
                                </label>

                                <input
                                    type="text"
                                    value={plan.monthly}
                                    onChange={(e) =>
                                        updatePlan(
                                            index,
                                            "monthly",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Annual */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Annual Price
                                </label>

                                <input
                                    type="text"
                                    value={plan.annually}
                                    onChange={(e) =>
                                        updatePlan(
                                            index,
                                            "annually",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>
                        </div>

                        {/* Popular */}
                        <label className="mt-5 flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={Boolean(plan.popular)}
                                onChange={(e) =>
                                    updatePlan(
                                        index,
                                        "popular",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 accent-green-600"
                            />

                            <span className="text-sm font-medium text-slate-700">
                                Mark as Popular Plan
                            </span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Features */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            What's Included
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage common features for all plans.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addFeature}
                        className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                    >
                        <Plus size={16} />
                        Add Feature
                    </button>
                </div>

                <div className="mt-5 space-y-3">
                    {pricing.features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex gap-3"
                        >
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) =>
                                    updateFeature(
                                        index,
                                        e.target.value
                                    )
                                }
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeFeature(index)
                                }
                                className="rounded-lg border border-red-200 px-3 text-red-500 transition hover:bg-red-50"
                                aria-label="Remove feature"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Pricing Benefits
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage the benefits shown below the pricing cards.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addBenefit}
                        className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                    >
                        <Plus size={16} />
                        Add Benefit
                    </button>
                </div>

                <div className="mt-5 space-y-3">
                    {pricing.benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex gap-3"
                        >
                            <input
                                type="text"
                                value={benefit}
                                onChange={(e) =>
                                    updateBenefit(
                                        index,
                                        e.target.value
                                    )
                                }
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeBenefit(index)
                                }
                                className="rounded-lg border border-red-200 px-3 text-red-500 transition hover:bg-red-50"
                                aria-label="Remove benefit"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;