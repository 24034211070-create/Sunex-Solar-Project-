import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const DEFAULT_HERO = {
    badge: "Solar Energy Tomorrow",
    title: "Power Your Future with Clean Solar Energy",
    description:
        "We provide reliable, efficient, and sustainable solar solutions designed to power homes and businesses with clean energy.",
    video: "",
    primary_button_text: "Get Free Consultation",
    primary_button_link: "#contact",
    secondary_button_text: "Watch Our Story",
    secondary_button_link: "#story",
    testimonial:
        "Empowering homes and businesses with clean solar energy for a brighter tomorrow.",
    avatar_1: "",
    avatar_2: "",
    avatar_3: "",
    avatar_4: "",
};

function Hero() {
    const navigate = useNavigate();

    const [hero, setHero] = useState(DEFAULT_HERO);
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchHero();
    }, []);

    // ======================================================
    // GET HERO
    // ======================================================

    const fetchHero = async () => {
        try {
            setLoading(true);

            const response = await api.get("/pages");

            const data = response.data;

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch Hero"
                );
            }

            const pages = Array.isArray(data.pages)
                ? data.pages
                : [];

            // Support both Prisma camelCase and old snake_case
            const heroPage = pages.find((item) => {
                const pageName =
                    item.pageName ?? item.page_name;

                const sectionName =
                    item.sectionName ?? item.section_name;

                return (
                    pageName === "Home" &&
                    sectionName === "Hero"
                );
            });

            if (!heroPage) {
                alert("Home - Hero database me nahi mila.");
                setPage(null);
                return;
            }

            setPage(heroPage);

            setHero({
                badge:
                    heroPage.badge ||
                    DEFAULT_HERO.badge,

                title:
                    heroPage.title ||
                    DEFAULT_HERO.title,

                description:
                    heroPage.description ||
                    DEFAULT_HERO.description,

                video:
                    heroPage.video || "",

                primary_button_text:
                    heroPage.primaryButtonText ??
                    heroPage.primary_button_text ??
                    DEFAULT_HERO.primary_button_text,

                primary_button_link:
                    heroPage.primaryButtonLink ??
                    heroPage.primary_button_link ??
                    DEFAULT_HERO.primary_button_link,

                secondary_button_text:
                    heroPage.secondaryButtonText ??
                    heroPage.secondary_button_text ??
                    DEFAULT_HERO.secondary_button_text,

                secondary_button_link:
                    heroPage.secondaryButtonLink ??
                    heroPage.secondary_button_link ??
                    DEFAULT_HERO.secondary_button_link,

                testimonial:
                    heroPage.testimonial ||
                    DEFAULT_HERO.testimonial,

                avatar_1:
                    heroPage.avatar1 ??
                    heroPage.avatar_1 ??
                    "",

                avatar_2:
                    heroPage.avatar2 ??
                    heroPage.avatar_2 ??
                    "",

                avatar_3:
                    heroPage.avatar3 ??
                    heroPage.avatar_3 ??
                    "",

                avatar_4:
                    heroPage.avatar4 ??
                    heroPage.avatar_4 ??
                    "",
            });
        } catch (error) {
            console.error("HERO FETCH ERROR:", error);

            if (error.response?.status === 401) {
                alert(
                    "Your login session has expired. Please login again."
                );

                localStorage.removeItem("token");
                navigate("/admin/login");
                return;
            }

            alert(
                error.response?.data?.message ||
                error.message ||
                "Hero data load nahi ho paya."
            );
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // INPUT CHANGE
    // ======================================================

    const handleChange = (field, value) => {
        setHero((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ======================================================
    // SAVE HERO
    // ======================================================

    const handleSave = async () => {
        if (!page?.id) {
            alert("Hero section database me nahi mila.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Admin login required.");
            navigate("/admin/login");
            return;
        }

        try {
            setSaving(true);

            const response = await api.put(
                `/pages/${page.id}`,
                {
                    page_name: "Home",
                    section_name: "Hero",

                    title: hero.title,
                    description: hero.description,

                    image:
                        page.image ??
                        "",

                    badge: hero.badge,

                    video: hero.video,

                    primary_button_text:
                        hero.primary_button_text,

                    primary_button_link:
                        hero.primary_button_link,

                    secondary_button_text:
                        hero.secondary_button_text,

                    secondary_button_link:
                        hero.secondary_button_link,

                    testimonial:
                        hero.testimonial,

                    avatar_1:
                        hero.avatar_1,

                    avatar_2:
                        hero.avatar_2,

                    avatar_3:
                        hero.avatar_3,

                    avatar_4:
                        hero.avatar_4,

                    content:
                        page.content ?? {},
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            console.log(
                "HERO SAVE RESPONSE:",
                data
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Hero update failed"
                );
            }

            alert(
                "Hero section successfully updated!"
            );

            // Fresh database data
            await fetchHero();
        } catch (error) {
            console.error(
                "HERO SAVE ERROR:",
                error
            );

            if (error.response?.status === 401) {
                alert(
                    "Invalid or expired token. Please login again."
                );

                localStorage.removeItem("token");

                navigate("/admin/login");

                return;
            }

            if (error.response?.status === 403) {
                alert(
                    "Admin access required."
                );

                return;
            }

            alert(
                error.response?.data?.message ||
                error.message ||
                "Hero save nahi ho paya."
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
            <div className="p-6">
                <p>Loading Hero...</p>
            </div>
        );
    }

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="p-6">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/pages/home"
                            )
                        }
                        className="p-2 border rounded-md hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>

                        <h1 className="text-2xl font-bold">
                            Home 1 - Hero
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage Hero section content
                        </p>

                    </div>

                </div>

            </div>

            {/* HERO CONTENT */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT */}

                <div className="border rounded-xl p-5 space-y-5">

                    <h2 className="text-lg font-semibold">
                        Hero Content
                    </h2>

                    <Input
                        label="Badge"
                        value={hero.badge}
                        onChange={(value) =>
                            handleChange(
                                "badge",
                                value
                            )
                        }
                    />

                    <Input
                        label="Hero Title"
                        value={hero.title}
                        onChange={(value) =>
                            handleChange(
                                "title",
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Hero Description"
                        value={hero.description}
                        onChange={(value) =>
                            handleChange(
                                "description",
                                value
                            )
                        }
                    />

                    <Input
                        label="Video URL"
                        value={hero.video}
                        onChange={(value) =>
                            handleChange(
                                "video",
                                value
                            )
                        }
                    />

                    <Textarea
                        label="Testimonial"
                        value={hero.testimonial}
                        onChange={(value) =>
                            handleChange(
                                "testimonial",
                                value
                            )
                        }
                    />

                </div>

                {/* RIGHT */}

                <div className="border rounded-xl p-5 space-y-5">

                    <h2 className="text-lg font-semibold">
                        Hero Buttons
                    </h2>

                    <Input
                        label="Primary Button Text"
                        value={
                            hero.primary_button_text
                        }
                        onChange={(value) =>
                            handleChange(
                                "primary_button_text",
                                value
                            )
                        }
                    />

                    <Input
                        label="Primary Button Link"
                        value={
                            hero.primary_button_link
                        }
                        onChange={(value) =>
                            handleChange(
                                "primary_button_link",
                                value
                            )
                        }
                    />

                    <Input
                        label="Secondary Button Text"
                        value={
                            hero.secondary_button_text
                        }
                        onChange={(value) =>
                            handleChange(
                                "secondary_button_text",
                                value
                            )
                        }
                    />

                    <Input
                        label="Secondary Button Link"
                        value={
                            hero.secondary_button_link
                        }
                        onChange={(value) =>
                            handleChange(
                                "secondary_button_link",
                                value
                            )
                        }
                    />

                </div>

            </div>

            {/* AVATARS */}

            <div className="border rounded-xl p-5 mt-6">

                <h2 className="text-lg font-semibold mb-5">
                    Hero Avatars
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <Input
                        label="Avatar 1"
                        value={hero.avatar_1}
                        onChange={(value) =>
                            handleChange(
                                "avatar_1",
                                value
                            )
                        }
                    />

                    <Input
                        label="Avatar 2"
                        value={hero.avatar_2}
                        onChange={(value) =>
                            handleChange(
                                "avatar_2",
                                value
                            )
                        }
                    />

                    <Input
                        label="Avatar 3"
                        value={hero.avatar_3}
                        onChange={(value) =>
                            handleChange(
                                "avatar_3",
                                value
                            )
                        }
                    />

                    <Input
                        label="Avatar 4"
                        value={hero.avatar_4}
                        onChange={(value) =>
                            handleChange(
                                "avatar_4",
                                value
                            )
                        }
                    />

                </div>

            </div>

            {/* SAVE */}

            <div className="flex justify-end mt-6">

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#43AD3D] hover:bg-[#369B31] text-white hover:opacity-90 disabled:opacity-50"
                >

                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Hero Changes"}

                </button>

            </div>

        </div>
    );
}

// ======================================================
// INPUT
// ======================================================

function Input({
    label,
    value,
    onChange,
}) {
    return (
        <div>

            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <input
                type="text"
                value={value || ""}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />

        </div>
    );
}

// ======================================================
// TEXTAREA
// ======================================================

function Textarea({
    label,
    value,
    onChange,
}) {
    return (
        <div>

            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <textarea
                rows={5}
                value={value || ""}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
            />

        </div>
    );
}

export default Hero;