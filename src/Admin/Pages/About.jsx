import React, { useEffect, useState } from "react";
import { getPages, updatePage } from "../../Api/api";

const DEFAULT_ABOUT_DATA = {
    title: "Building a green tomorrow through clean energy",

    description:
        "We are committed to delivering reliable, efficient, and sustainable solar solutions that help homes and businesses reduce energy costs.",

    label: "About Our Company",

    image_1: "",
    image_2: "",
    image_3: "",

    experience_number: "25+",
    experience_text: "Years of Experience",

    feature_1_title: "Expertise You Can Trust",

    feature_1_description:
        "Our team consists of certified professionals with hands-on experience.",

    feature_2_title: "Customized Solar Solutions",

    feature_2_description:
        "That's why we design tailor-made solar systems that maximize efficiency and performance.",

    button_text: "More About Us",
    button_link: "/about",
};

const About = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getPages();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch About section"
                );
            }

            const aboutPage = data.pages.find(
                (page) =>
                    page.page_name === "Home" &&
                    page.section_name === "About"
            );

            if (!aboutPage) {
                throw new Error("About section not found");
            }

            const content = aboutPage.content || {};

            setAbout({
                ...aboutPage,

                label:
                    content.label ??
                    DEFAULT_ABOUT_DATA.label,

                image_1:
                    content.image_1 || "",

                image_2:
                    content.image_2 || "",

                image_3:
                    content.image_3 || "",

                experience_number:
                    content.experience_number ??
                    DEFAULT_ABOUT_DATA.experience_number,

                experience_text:
                    content.experience_text ??
                    DEFAULT_ABOUT_DATA.experience_text,

                feature_1_title:
                    content.feature_1_title ??
                    DEFAULT_ABOUT_DATA.feature_1_title,

                feature_1_description:
                    content.feature_1_description ??
                    DEFAULT_ABOUT_DATA.feature_1_description,

                feature_2_title:
                    content.feature_2_title ??
                    DEFAULT_ABOUT_DATA.feature_2_title,

                feature_2_description:
                    content.feature_2_description ??
                    DEFAULT_ABOUT_DATA.feature_2_description,

                button_text:
                    content.button_text ??
                    DEFAULT_ABOUT_DATA.button_text,

                button_link:
                    content.button_link ??
                    DEFAULT_ABOUT_DATA.button_link,
            });
        } catch (error) {
            console.error("FETCH ABOUT ERROR:", error);

            setError(
                error.message ||
                "Failed to load About section"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setAbout((previousAbout) => ({
            ...previousAbout,
            [field]: value,
        }));

        setMessage("");
        setError("");
    };

    const handleSave = async () => {
        if (!about) return;

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError(
                    "Admin login token not found. Please login again."
                );
                return;
            }

            const content = {
                label:
                    about.label ||
                    DEFAULT_ABOUT_DATA.label,

                image_1:
                    about.image_1 || "",

                image_2:
                    about.image_2 || "",

                image_3:
                    about.image_3 || "",

                experience_number:
                    about.experience_number ||
                    DEFAULT_ABOUT_DATA.experience_number,

                experience_text:
                    about.experience_text ||
                    DEFAULT_ABOUT_DATA.experience_text,

                feature_1_title:
                    about.feature_1_title ||
                    DEFAULT_ABOUT_DATA.feature_1_title,

                feature_1_description:
                    about.feature_1_description ||
                    DEFAULT_ABOUT_DATA.feature_1_description,

                feature_2_title:
                    about.feature_2_title ||
                    DEFAULT_ABOUT_DATA.feature_2_title,

                feature_2_description:
                    about.feature_2_description ||
                    DEFAULT_ABOUT_DATA.feature_2_description,

                button_text:
                    about.button_text ||
                    DEFAULT_ABOUT_DATA.button_text,

                button_link:
                    about.button_link ||
                    DEFAULT_ABOUT_DATA.button_link,
            };

            const data = await updatePage(
                about.id,
                {
                    page_name: about.page_name,

                    section_name:
                        about.section_name,

                    title:
                        about.title ||
                        DEFAULT_ABOUT_DATA.title,

                    description:
                        about.description ||
                        DEFAULT_ABOUT_DATA.description,

                    image: about.image || "",

                    content,
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update About section"
                );
            }

            const updatedPage = data.page;

            const updatedContent =
                updatedPage.content || {};

            setAbout({
                ...updatedPage,

                label:
                    updatedContent.label ??
                    DEFAULT_ABOUT_DATA.label,

                image_1:
                    updatedContent.image_1 || "",

                image_2:
                    updatedContent.image_2 || "",

                image_3:
                    updatedContent.image_3 || "",

                experience_number:
                    updatedContent.experience_number ??
                    DEFAULT_ABOUT_DATA.experience_number,

                experience_text:
                    updatedContent.experience_text ??
                    DEFAULT_ABOUT_DATA.experience_text,

                feature_1_title:
                    updatedContent.feature_1_title ??
                    DEFAULT_ABOUT_DATA.feature_1_title,

                feature_1_description:
                    updatedContent.feature_1_description ??
                    DEFAULT_ABOUT_DATA.feature_1_description,

                feature_2_title:
                    updatedContent.feature_2_title ??
                    DEFAULT_ABOUT_DATA.feature_2_title,

                feature_2_description:
                    updatedContent.feature_2_description ??
                    DEFAULT_ABOUT_DATA.feature_2_description,

                button_text:
                    updatedContent.button_text ??
                    DEFAULT_ABOUT_DATA.button_text,

                button_link:
                    updatedContent.button_link ??
                    DEFAULT_ABOUT_DATA.button_link,
            });

            setMessage(
                "About section changes saved successfully."
            );
        } catch (error) {
            console.error(
                "SAVE ABOUT ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to save About section"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">
                    Loading About section...
                </p>
            </div>
        );
    }

    if (error && !about) {
        return (
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        About Page
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the About section.
                    </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    if (!about) {
        return (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    About section not found
                </h2>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    About Page
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage the About section of your Sunex website.
                </p>
            </div>

            {/* SUCCESS */}
            {message && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {message}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            {/* ABOUT EDITOR */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            About
                        </h2>

                        <p className="text-sm text-slate-500">
                            About Page Section
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        ID: {about.id}
                    </span>
                </div>

                <div className="space-y-6">
                    {/* LABEL */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Label
                        </label>

                        <input
                            type="text"
                            value={about.label || ""}
                            onChange={(e) =>
                                handleChange(
                                    "label",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Enter label"
                        />
                    </div>

                    {/* HEADING */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Heading
                        </label>

                        <input
                            type="text"
                            value={about.title || ""}
                            onChange={(e) =>
                                handleChange(
                                    "title",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Enter heading"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            value={
                                about.description || ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            placeholder="Enter description"
                        />
                    </div>

                    {/* IMAGES */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-4 text-base font-semibold text-slate-900">
                            About Images
                        </h3>

                        <div className="grid gap-4 md:grid-cols-3">
                            {[1, 2, 3].map((number) => (
                                <div key={number}>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Image {number}
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            about[
                                            `image_${number}`
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                `image_${number}`,
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        placeholder="Enter image URL or path"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-4 text-base font-semibold text-slate-900">
                            Experience
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Experience Number
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.experience_number ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "experience_number",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Example: 25+"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Experience Text
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.experience_text ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "experience_text",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Example: Years of Experience"
                                />
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 1 */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-4 text-base font-semibold text-slate-900">
                            Feature 1
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Feature Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.feature_1_title ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "feature_1_title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Enter feature title"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Feature Description
                                </label>

                                <textarea
                                    rows="4"
                                    value={
                                        about.feature_1_description ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "feature_1_description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Enter feature description"
                                />
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 2 */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-4 text-base font-semibold text-slate-900">
                            Feature 2
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Feature Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.feature_2_title ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "feature_2_title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Enter feature title"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Feature Description
                                </label>

                                <textarea
                                    rows="4"
                                    value={
                                        about.feature_2_description ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "feature_2_description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Enter feature description"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-4 text-base font-semibold text-slate-900">
                            More About Us Button
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Button Text
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.button_text ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "button_text",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Enter button text"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Button Link
                                </label>

                                <input
                                    type="text"
                                    value={
                                        about.button_link ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "button_link",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    placeholder="Example: /about"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SAVE */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : "Save About Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;