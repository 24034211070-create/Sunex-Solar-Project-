import React, { useEffect, useState } from "react";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = () => {
        const savedServices = localStorage.getItem("sunex_services");

        if (savedServices) {
            setServices(JSON.parse(savedServices));
        } else {
            setServices([
                {
                    id: 1,
                    title: "Solar Battery Storage",
                    description:
                        "Reliable energy storage solutions that store excess solar power for use.",
                    image: "",
                },
                {
                    id: 2,
                    title: "Residential Solar Solutions",
                    description:
                        "Custom designed solar systems for homes that help reduce electricity bills, etc.",
                    image: "",
                },
                {
                    id: 3,
                    title: "Solar System Maintenance",
                    description:
                        "Regular inspection, cleaning & performance checks to ensure your solar system.",
                    image: "",
                },
            ]);
        }
    };

    const handleChange = (id, field, value) => {
        setServices((previousServices) =>
            previousServices.map((service) =>
                service.id === id
                    ? {
                        ...service,
                        [field]: value,
                    }
                    : service
            )
        );
    };

    const handleSave = () => {
        localStorage.setItem(
            "sunex_services",
            JSON.stringify(services)
        );

        alert("Services saved successfully!");
    };

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Services
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage your website services content.
                </p>
            </div>

            {/* SERVICE CARDS */}
            <div className="grid gap-6">

                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Service {index + 1}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Edit service information
                                </p>
                            </div>
                        </div>

                        {/* TITLE */}
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Service Title
                            </label>

                            <input
                                type="text"
                                value={service.title}
                                onChange={(event) =>
                                    handleChange(
                                        service.id,
                                        "title",
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-green-500"
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                value={service.description}
                                onChange={(event) =>
                                    handleChange(
                                        service.id,
                                        "description",
                                        event.target.value
                                    )
                                }
                                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-green-500"
                            />
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Image
                            </label>

                            <input
                                type="text"
                                value={service.image}
                                onChange={(event) =>
                                    handleChange(
                                        service.id,
                                        "image",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter image path or URL"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-green-500"
                            />
                        </div>

                    </div>
                ))}

            </div>

            {/* SAVE */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Save Services
                </button>
            </div>

        </div>
    );
};

export default Services;