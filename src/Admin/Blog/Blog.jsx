import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Save,
    Plus,
    Trash2,
    ArrowLeft,
    Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const defaultPosts = [
    {
        id: 1,
        image: "",
        category: "Residential Solar",
        title: "A Complete Guide to Solar Energy for Homeowners",
        link: "/blog",
    },
    {
        id: 2,
        image: "",
        category: "Solar Benefits",
        title: "Top Benefits of Switching to Solar Power in 2026",
        link: "/blog",
    },
    {
        id: 3,
        image: "",
        category: "Installation Guide",
        title: "Solar Installation Process Explained Step by Step",
        link: "/blog",
    },
    {
        id: 4,
        image: "",
        category: "Solar Panels",
        title: "How Solar Panels Work: A Simple Guide for Homeowners",
        link: "/blog",
    },
    {
        id: 5,
        image: "",
        category: "Energy Solutions",
        title: "Residential vs Commercial Solar: Which Is Right for You?",
        link: "/blog",
    },
    {
        id: 6,
        image: "",
        category: "Solar Maintenance",
        title: "How to Maintain Your Solar System for Peak Performance",
        link: "/blog",
    },
];

const defaultData = {
    title: "Latest Articles",
    backgroundImage: "",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Blog",
    posts: defaultPosts,
};

const Blog = () => {
    const navigate = useNavigate();

    const [data, setData] = useState(defaultData);
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // ==========================================
    // LOAD BLOG DATA
    // ==========================================
    useEffect(() => {
        loadBlog();
    }, []);

    const loadBlog = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${API_URL}/pages`);

            const pages = Array.isArray(response.data)
                ? response.data
                : response.data?.pages || [];

            const blogPage = pages.find(
                (page) =>
                    String(page.pageName || "").toLowerCase() === "blog" &&
                    String(page.sectionName || "").toLowerCase() === "blog"
            );

            if (blogPage) {
                const content =
                    blogPage.content &&
                        typeof blogPage.content === "object"
                        ? blogPage.content
                        : {};

                setPageId(blogPage.id);

                setData({
                    ...defaultData,
                    ...content,
                    posts:
                        Array.isArray(content.posts) &&
                            content.posts.length > 0
                            ? content.posts
                            : defaultPosts,
                });
            }
        } catch (error) {
            console.error("BLOG LOAD ERROR:", error);
            setMessage("Failed to load Blog data.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // UPDATE HERO
    // ==========================================
    const updateField = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ==========================================
    // UPDATE POST
    // ==========================================
    const updatePost = (index, field, value) => {
        setData((prev) => {
            const posts = [...prev.posts];

            posts[index] = {
                ...posts[index],
                [field]: value,
            };

            return {
                ...prev,
                posts,
            };
        });
    };

    // ==========================================
    // ADD POST
    // ==========================================
    const addPost = () => {
        setData((prev) => ({
            ...prev,
            posts: [
                ...prev.posts,
                {
                    id: Date.now(),
                    image: "",
                    category: "New Category",
                    title: "New Blog Article",
                    link: "/blog",
                },
            ],
        }));
    };

    // ==========================================
    // DELETE POST
    // ==========================================
    const deletePost = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog post?"
        );

        if (!confirmDelete) return;

        setData((prev) => ({
            ...prev,
            posts: prev.posts.filter((_, i) => i !== index),
        }));
    };

    // ==========================================
    // SAVE BLOG
    // ==========================================
    const saveBlog = async () => {
        try {
            setSaving(true);
            setMessage("");

            const payload = {
                page_name: "Blog",
                section_name: "Blog",
                title: data.title,
                description: "Blog page content",
                image: data.backgroundImage,
                content: data,
            };

            let response;

            if (pageId) {
                response = await axios.put(
                    `${API_URL}/pages/${pageId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                response = await axios.post(
                    `${API_URL}/pages`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data?.page?.id) {
                    setPageId(response.data.page.id);
                }

                if (response.data?.id) {
                    setPageId(response.data.id);
                }
            }

            if (response.data?.success !== false) {
                setMessage("Blog saved successfully.");
            }
        } catch (error) {
            console.error("BLOG SAVE ERROR:", error);

            if (error.response?.status === 401) {
                setMessage("Unauthorized. Please login again.");
            } else if (error.response?.status === 403) {
                setMessage("Admin access required.");
            } else {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to save Blog."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading Blog...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 mb-3"
                    >
                        <ArrowLeft size={17} />
                        Back
                    </button>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Blog
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage Blog Hero and Blog Posts
                    </p>
                </div>

                <button
                    onClick={saveBlog}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#43ad3d] hover:bg-[#369532] text-white px-5 py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
                >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* MESSAGE */}
            {message && (
                <div className="mb-5 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700">
                    {message}
                </div>
            )}

            {/* ==========================================
                HERO
            ========================================== */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">
                    Blog Hero
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* TITLE */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Hero Title
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                updateField("title", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                        />
                    </div>

                    {/* BACKGROUND */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Background Image
                        </label>

                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <ImageIcon
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={data.backgroundImage}
                                    onChange={(e) =>
                                        updateField(
                                            "backgroundImage",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Image URL / path"
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BREADCRUMB HOME */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Breadcrumb Home
                        </label>

                        <input
                            type="text"
                            value={data.breadcrumbHome}
                            onChange={(e) =>
                                updateField(
                                    "breadcrumbHome",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                        />
                    </div>

                    {/* BREADCRUMB CURRENT */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Breadcrumb Current
                        </label>

                        <input
                            type="text"
                            value={data.breadcrumbCurrent}
                            onChange={(e) =>
                                updateField(
                                    "breadcrumbCurrent",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                        />
                    </div>
                </div>
            </div>

            {/* ==========================================
                BLOG POSTS
            ========================================== */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Blog Posts
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage your Blog cards
                        </p>
                    </div>

                    <button
                        onClick={addPost}
                        className="flex items-center gap-2 bg-[#43ad3d] hover:bg-[#369532] text-white px-4 py-2.5 rounded-lg font-semibold transition"
                    >
                        <Plus size={18} />
                        Add Post
                    </button>
                </div>

                <div className="space-y-5">
                    {data.posts.map((post, index) => (
                        <div
                            key={post.id || index}
                            className="border border-gray-200 rounded-xl p-5"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-gray-800">
                                    Blog Post {index + 1}
                                </h3>

                                <button
                                    onClick={() => deletePost(index)}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold"
                                >
                                    <Trash2 size={17} />
                                    Delete
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* IMAGE */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Image
                                    </label>

                                    <input
                                        type="text"
                                        value={post.image || ""}
                                        onChange={(e) =>
                                            updatePost(
                                                index,
                                                "image",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Image URL / path"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                                    />
                                </div>

                                {/* CATEGORY */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        value={post.category || ""}
                                        onChange={(e) =>
                                            updatePost(
                                                index,
                                                "category",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                                    />
                                </div>

                                {/* TITLE */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        value={post.title || ""}
                                        onChange={(e) =>
                                            updatePost(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                                    />
                                </div>

                                {/* LINK */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Read More Link
                                    </label>

                                    <input
                                        type="text"
                                        value={post.link || ""}
                                        onChange={(e) =>
                                            updatePost(
                                                index,
                                                "link",
                                                e.target.value
                                            )
                                        }
                                        placeholder="/blog"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {data.posts.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No Blog Posts found.
                        </div>
                    )}
                </div>
            </div>

            {/* BOTTOM SAVE */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={saveBlog}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#43ad3d] hover:bg-[#369532] text-white px-5 py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
                >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default Blog;