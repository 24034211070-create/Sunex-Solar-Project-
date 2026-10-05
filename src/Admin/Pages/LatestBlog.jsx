import React, { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { getPages, updatePage } from "../../Api/api";

const defaultBlog = {
    id: Date.now(),
    image: "",
    category: "",
    title: "",
    link: "/blog",
};

const LatestBlog = () => {
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        label: "Latest Blogs",
        heading:
            "Insights, trend and updates from the solar industry",
        description:
            "Stay up to date with in-depth insights, emerging trends, and important updates from the solar industry. Our articles cover everything from new.",
        button_text: "View All Blogs",
        button_link: "/blog",
        blogs: [],
    });

    useEffect(() => {
        fetchLatestBlog();
    }, []);

    const fetchLatestBlog = async () => {
        try {
            setLoading(true);

            const result = await getPages();

            if (!result.success) {
                alert("Latest Blog data load nahi hua.");
                return;
            }

            const page = result.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "LatestBlog"
            );

            if (!page) {
                alert(
                    "Home / LatestBlog database me nahi mila."
                );
                return;
            }

            setPageId(page.id);

            const content = page.content || {};

            setFormData({
                label:
                    content.label ||
                    "Latest Blogs",

                heading:
                    content.heading ||
                    page.title ||
                    "",

                description:
                    content.description ||
                    page.description ||
                    "",

                button_text:
                    content.button_text ||
                    "View All Blogs",

                button_link:
                    content.button_link ||
                    "/blog",

                blogs:
                    Array.isArray(content.blogs)
                        ? content.blogs
                        : [],
            });
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Latest Blog data fetch karte waqt error aaya."
            );
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateBlog = (index, field, value) => {
        setFormData((prev) => {
            const blogs = [...prev.blogs];

            blogs[index] = {
                ...blogs[index],
                [field]: value,
            };

            return {
                ...prev,
                blogs,
            };
        });
    };

    const addBlog = () => {
        setFormData((prev) => ({
            ...prev,
            blogs: [
                ...prev.blogs,
                {
                    ...defaultBlog,
                    id: Date.now(),
                },
            ],
        }));
    };

    const deleteBlog = (index) => {
        const confirmDelete = window.confirm(
            "Kya aap ye blog card delete karna chahte ho?"
        );

        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            blogs: prev.blogs.filter(
                (_, blogIndex) => blogIndex !== index
            ),
        }));
    };

    const handleSave = async () => {
        if (!pageId) {
            alert("Latest Blog page ID nahi mila.");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Admin login token nahi mila. Please login again."
                );
                return;
            }

            const result = await updatePage(
                pageId,
                {
                    page_name: "Home",
                    section_name: "LatestBlog",
                    title: formData.heading,
                    description: formData.description,
                    image: "",
                    content: formData,
                },
                token
            );

            if (!result.success) {
                alert(
                    result.message ||
                    "Latest Blog save nahi hua."
                );
                return;
            }

            alert(
                "Latest Blog successfully updated!"
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Latest Blog save karte waqt error aaya."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading Latest Blog...
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* PAGE HEADER */}

            <div className="mb-6">

                <h1 className="text-2xl font-bold">
                    Latest Blog
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage Home page Latest Blog section.
                </p>

            </div>

            {/* MAIN SETTINGS */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Section Content
                </h2>

                <div className="grid gap-5">

                    {/* LABEL */}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Label
                        </label>

                        <input
                            type="text"
                            value={formData.label}
                            onChange={(e) =>
                                updateField(
                                    "label",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Latest Blogs"
                        />
                    </div>

                    {/* HEADING */}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Heading
                        </label>

                        <textarea
                            value={formData.heading}
                            onChange={(e) =>
                                updateField(
                                    "heading",
                                    e.target.value
                                )
                            }
                            rows={3}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                updateField(
                                    "description",
                                    e.target.value
                                )
                            }
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* BUTTON */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.button_text
                                }
                                onChange={(e) =>
                                    updateField(
                                        "button_text",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.button_link
                                }
                                onChange={(e) =>
                                    updateField(
                                        "button_link",
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="/blog"
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* BLOG CARDS */}

            <div className="bg-white border rounded-xl p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-lg font-semibold">
                            Blog Cards
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add, edit or remove blog cards.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addBlog}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                    >
                        <Plus size={18} />
                        Add Blog
                    </button>

                </div>

                <div className="space-y-6">

                    {formData.blogs.map(
                        (blog, index) => (

                            <div
                                key={blog.id || index}
                                className="border rounded-xl p-5"
                            >

                                <div className="flex items-center justify-between mb-5">

                                    <h3 className="font-semibold">
                                        Blog {index + 1}
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteBlog(index)
                                        }
                                        className="flex items-center gap-2 text-red-600"
                                    >
                                        <Trash2 size={17} />
                                        Delete
                                    </button>

                                </div>

                                <div className="grid gap-4">

                                    {/* IMAGE */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Image URL
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                blog.image || ""
                                            }
                                            onChange={(e) =>
                                                updateBlog(
                                                    index,
                                                    "image",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="https://example.com/blog.jpg"
                                        />
                                    </div>

                                    {/* CATEGORY */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                blog.category ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateBlog(
                                                    index,
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="Residential Solar"
                                        />
                                    </div>

                                    {/* TITLE */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Blog Title
                                        </label>

                                        <textarea
                                            value={
                                                blog.title ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateBlog(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            rows={3}
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="Enter blog title"
                                        />
                                    </div>

                                    {/* LINK */}

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Blog Link
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                blog.link ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateBlog(
                                                    index,
                                                    "link",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="/blog"
                                        />
                                    </div>

                                </div>

                            </div>

                        )
                    )}

                    {formData.blogs.length === 0 && (
                        <div className="border border-dashed rounded-xl p-8 text-center text-gray-500">
                            No blog cards available.
                            <br />
                            Click "Add Blog" to create one.
                        </div>
                    )}

                </div>

            </div>

            {/* SAVE BUTTON */}

            <div className="mt-6 flex justify-end">

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >

                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>
    );
};

export default LatestBlog;