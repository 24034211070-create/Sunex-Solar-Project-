import React, { useEffect, useState } from "react";
import { createPage, getPages, updatePage } from "../../Api/api";

const DEFAULT_SERVICES = [
    {
        title: "Solar Battery Storage",
        description:
            "Reliable energy storage solutions that store excess solar power for use.",
        image: "/src/assets/Heroimages/m1.jpg",
    },
    {
        title: "Residential Solar Solutions",
        description:
            "Custom designed solar systems for homes that help reduce electricity bills.",
        image: "/src/assets/Heroimages/m2.jpg",
    },
    {
        title: "Solar System Maintenance",
        description:
            "Regular inspection, cleaning & performance checks to ensure your solar system.",
        image: "/src/assets/Heroimages/m3.jpg",
    },
];

const Services1 = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [pageId, setPageId] = useState(null);

    const [formData, setFormData] = useState({
        title: "Smart solar service designed for homes & businesses",
        description:
            "From system design and professional installation to energy storage, our smart solar solutions deliver reliable performance.",
    });

    const [services, setServices] = useState(DEFAULT_SERVICES);

    useEffect(() => {
        fetchServices();
    }, []);

    // ======================================================
    // GET SERVICES
    // ======================================================

    const fetchServices = async () => {
        try {
            setLoading(true);
            setMessage("");

            const data = await getPages();

            console.log("PAGES API RESPONSE:", data);

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch pages"
                );
            }

            const pages = Array.isArray(data.pages)
                ? data.pages
                : [];

            const servicePage = pages.find(
                (page) =>
                    page.page_name?.toLowerCase() === "home" &&
                    page.section_name?.toLowerCase() === "services"
            );

            // ==================================================
            // SERVICES FOUND IN DATABASE
            // ==================================================

            if (servicePage) {
                console.log(
                    "HOME SERVICES FOUND:",
                    servicePage
                );

                setPageId(servicePage.id);

                setFormData({
                    title: servicePage.title || "",
                    description:
                        servicePage.description || "",
                });

                if (
                    servicePage.content &&
                    Array.isArray(
                        servicePage.content.services
                    )
                ) {
                    setServices(
                        servicePage.content.services
                    );
                } else {
                    setServices(DEFAULT_SERVICES);
                }

                setMessage("");
            }

            // ==================================================
            // SERVICES NOT FOUND
            // ==================================================

            else {
                console.log(
                    "Home / Services row not found."
                );

                setPageId(null);

                setFormData({
                    title:
                        "Smart solar service designed for homes & businesses",
                    description:
                        "From system design and professional installation to energy storage, our smart solar solutions deliver reliable performance.",
                });

                setServices(DEFAULT_SERVICES);

                setMessage(
                    "New Services section ready. Save Changes par database mein create hoga."
                );
            }
        } catch (error) {
            console.error(
                "GET SERVICES ERROR:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                `Services load error: ${error.message}`
            );
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // HEADER CHANGE
    // ======================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ======================================================
    // SERVICE CARD CHANGE
    // ======================================================

    const handleServiceChange = (
        index,
        field,
        value
    ) => {
        setServices((previous) =>
            previous.map((service, serviceIndex) =>
                serviceIndex === index
                    ? {
                        ...service,
                        [field]: value,
                    }
                    : service
            )
        );
    };

    // ======================================================
    // SAVE SERVICES
    // ======================================================

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");

            const token = localStorage.getItem("token");

            if (!token) {
                setMessage(
                    "Admin login required."
                );
                return;
            }

            const payload = {
                page_name: "Home",
                section_name: "Services",
                title: formData.title,
                description: formData.description,
                image: "",
                content: {
                    services: services,
                },
            };

            console.log(
                "SERVICES SAVE PAYLOAD:",
                payload
            );

            let data;

            // ==================================================
            // UPDATE EXISTING ROW
            // ==================================================

            if (pageId) {
                data = await updatePage(
                    pageId,
                    payload,
                    token
                );
            }

            // ==================================================
            // CREATE NEW ROW
            // ==================================================

            else {
                data = await createPage(
                    payload,
                    token
                );
            }

            console.log(
                "SERVICES SAVE RESPONSE:",
                data
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Services save failed"
                );
            }

            // New record create hua hai to ID store karo
            if (data.page?.id) {
                setPageId(data.page.id);
            }

            setMessage(
                "Services successfully saved."
            );
        } catch (error) {
            console.error(
                "SAVE SERVICES ERROR:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Services save nahi ho paaya."
            );
        } finally {
            setSaving(false);
        }
    };

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">
                    Loading Services...
                </p>
            </div>
        );
    }

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="mx-auto w-full max-w-6xl">

            {/* PAGE HEADER */}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Home - Services
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Home page ke Services section ka
                    content yahan se manage karein.
                </p>
            </div>

            {/* SERVICES HEADER */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Services Header
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Services section ka heading aur
                        description edit karein.
                    </p>
                </div>

                <div className="grid gap-5">

                    {/* TITLE */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Section Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter services title"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500"
                        />
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Section Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            rows={4}
                            placeholder="Enter services description"
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500"
                        />
                    </div>

                </div>
            </div>

            {/* SERVICE CARDS */}

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Service Cards
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Home page par dikhne wale 3
                        service cards edit karein.
                    </p>
                </div>

                <div className="grid gap-6">

                    {services.map(
                        (service, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                            >

                                {/* CARD HEADER */}

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="font-semibold text-slate-900">
                                        Service{" "}
                                        {index + 1}
                                    </h3>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Card{" "}
                                        {index + 1}
                                    </span>

                                </div>

                                <div className="grid gap-5 md:grid-cols-2">

                                    {/* TITLE */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Service Title
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                service.title
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleServiceChange(
                                                    index,
                                                    "title",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Service title"
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-500"
                                        />
                                    </div>

                                    {/* IMAGE */}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Image URL / Path
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                service.image
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleServiceChange(
                                                    index,
                                                    "image",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="/images/service.jpg"
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-500"
                                        />
                                    </div>

                                    {/* DESCRIPTION */}

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Service Description
                                        </label>

                                        <textarea
                                            value={
                                                service.description
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleServiceChange(
                                                    index,
                                                    "description",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            rows={3}
                                            placeholder="Service description"
                                            className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-500"
                                        />
                                    </div>

                                </div>
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* SAVE AREA */}

            <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm">

                <div className="max-w-[70%]">

                    {message && (
                        <p
                            className={`text-sm font-medium ${message.includes(
                                "successfully"
                            )
                                ? "text-green-600"
                                : "text-orange-600"
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

export default Services1;