import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, updatePage } from "../../Api/api";

const DEFAULT_STORY = {
    image: "",
    video: "https://www.youtube.com/embed/Y-x0efG1seA?autoplay=1",
    play_button_text: "PLAY",
};

const Story = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(null);
    const [story, setStory] = useState(DEFAULT_STORY);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchStory();
    }, []);

    const fetchStory = async () => {
        try {
            setLoading(true);

            const data = await getPages();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch Story"
                );
            }

            const storyPage = data.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "Story"
            );

            if (!storyPage) {
                throw new Error("Story section not found");
            }

            setPage(storyPage);

            setStory({
                image: storyPage.image || "",
                video:
                    storyPage.video ||
                    DEFAULT_STORY.video,
                play_button_text:
                    storyPage.content?.play_button_text ||
                    DEFAULT_STORY.play_button_text,
            });
        } catch (error) {
            console.error("Story fetch error:", error);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setStory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!page?.id) {
            setMessage("Story page not found.");
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
                    section_name: "Story",
                    title: page.title || "",
                    description: page.description || "",
                    image: story.image,
                    video: story.video,
                    content: {
                        ...(page.content || {}),
                        play_button_text:
                            story.play_button_text,
                    },
                },
                token
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update Story"
                );
            }

            setPage(data.page);

            setStory({
                image: data.page.image || "",
                video:
                    data.page.video ||
                    DEFAULT_STORY.video,
                play_button_text:
                    data.page.content?.play_button_text ||
                    DEFAULT_STORY.play_button_text,
            });

            setMessage(
                "Story updated successfully."
            );
        } catch (error) {
            console.error("Story save error:", error);

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
                    Loading Story...
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
                        Story Section
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the Home Story section.
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

            {/* Story Form */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Story Content
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Update the background image, video and play button.
                    </p>

                </div>

                <div className="space-y-6">

                    {/* Background Image */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Background Image
                        </label>

                        <input
                            type="text"
                            value={story.image}
                            onChange={(e) =>
                                handleChange(
                                    "image",
                                    e.target.value
                                )
                            }
                            placeholder="Enter image path or URL"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Example: /uploads/story.jpg or an image URL
                        </p>

                    </div>

                    {/* Video URL */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Video URL
                        </label>

                        <input
                            type="text"
                            value={story.video}
                            onChange={(e) =>
                                handleChange(
                                    "video",
                                    e.target.value
                                )
                            }
                            placeholder="Enter YouTube embed URL"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Example: https://www.youtube.com/embed/Y-x0efG1seA
                        </p>

                    </div>

                    {/* Play Button Text */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Play Button Text
                        </label>

                        <input
                            type="text"
                            value={story.play_button_text}
                            onChange={(e) =>
                                handleChange(
                                    "play_button_text",
                                    e.target.value
                                )
                            }
                            placeholder="PLAY"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>

                    {/* Image Preview */}

                    {story.image && (
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Image Preview
                            </label>

                            <div className="overflow-hidden rounded-xl border border-slate-200">

                                <img
                                    src={story.image}
                                    alt="Story preview"
                                    className="h-64 w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Story;