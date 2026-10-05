import React, {
    useEffect,
    useState
} from "react";

import {
    Plus,
    Trash2,
    Save,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getPages, updatePage } from "../../Api/api";

const Testi = () => {

    const navigate = useNavigate();

    const [pageId, setPageId] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [formData, setFormData] =
        useState({
            badge: "Our Testimonials",

            heading:
                "Customers sharing their journey to solar",

            button_text:
                "View All Testimonials",

            button_link:
                "#testimonials",

            rating: "4.9/5",

            trust_text:
                "5K+ Customer Trust Our Solar",

            avatars: [
                "",
                "",
                "",
                ""
            ],

            reviews: [
                {
                    id: 1,
                    text:
                        "The installation was done with great attention to safety and quality. The support team regularly checks in to ensure.",
                    name: "Jerome Bell",
                    role: "School Administrator"
                },
                {
                    id: 2,
                    text:
                        "Switching to solar was one of the best decisions we made. The installation was smooth, and our electricity bills dropped.",
                    name: "Cameron Williamson",
                    role: "Small Business Owner"
                },
                {
                    id: 3,
                    text:
                        "The entire process was simple and transparent. The professional team explained everything clearly and delivered great results.",
                    name: "Leslie Alexander",
                    role: "Retail Store Owner"
                },
                {
                    id: 4,
                    text:
                        "Excellent service from start to finish. The team was professional, helpful, and made our solar installation completely stress-free.",
                    name: "Kathryn Murphy",
                    role: "Homeowner"
                }
            ],

            bottom_avatar: "",

            bottom_text:
                "Where smart design and clean energy come together powerfully",

            bottom_link_text:
                "View All Testimonials.",

            bottom_link:
                "#testimonials",

            bottom_rating:
                "4.9/5",

            bottom_reviews:
                "Over 4200 Reviews"
        });

    // =========================
    // FETCH TESTIMONIALS
    // =========================
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {

        try {

            setLoading(true);

            const data = await getPages();

            if (
                !data.success ||
                !Array.isArray(data.pages)
            ) {
                return;
            }

            const testiPage =
                data.pages.find(
                    (page) =>
                        page.page_name ===
                        "Home" &&
                        page.section_name ===
                        "Testi"
                );

            if (!testiPage) {
                return;
            }

            setPageId(testiPage.id);

            const content =
                testiPage.content &&
                    typeof testiPage.content ===
                    "object"
                    ? testiPage.content
                    : {};

            setFormData({
                badge:
                    content.badge ||
                    "Our Testimonials",

                heading:
                    content.heading ||
                    testiPage.title ||
                    "Customers sharing their journey to solar",

                button_text:
                    content.button_text ||
                    "View All Testimonials",

                button_link:
                    content.button_link ||
                    "#testimonials",

                rating:
                    content.rating ||
                    "4.9/5",

                trust_text:
                    content.trust_text ||
                    "5K+ Customer Trust Our Solar",

                avatars:
                    Array.isArray(
                        content.avatars
                    )
                        ? content.avatars
                        : [
                            "",
                            "",
                            "",
                            ""
                        ],

                reviews:
                    Array.isArray(
                        content.reviews
                    )
                        ? content.reviews
                        : [],

                bottom_avatar:
                    content.bottom_avatar ||
                    "",

                bottom_text:
                    content.bottom_text ||
                    "Where smart design and clean energy come together powerfully",

                bottom_link_text:
                    content.bottom_link_text ||
                    "View All Testimonials.",

                bottom_link:
                    content.bottom_link ||
                    "#testimonials",

                bottom_rating:
                    content.bottom_rating ||
                    "4.9/5",

                bottom_reviews:
                    content.bottom_reviews ||
                    "Over 4200 Reviews"
            });

        } catch (error) {

            console.error(
                "Testimonials fetch error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // HANDLE GENERAL CHANGE
    // =========================
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value
            })
        );
    };

    // =========================
    // HANDLE AVATAR CHANGE
    // =========================
    const handleAvatarChange = (
        index,
        value
    ) => {

        setFormData(
            (previous) => ({

                ...previous,

                avatars:
                    previous.avatars.map(
                        (
                            avatar,
                            avatarIndex
                        ) =>
                            avatarIndex ===
                                index
                                ? value
                                : avatar
                    )

            })
        );
    };

    // =========================
    // HANDLE REVIEW CHANGE
    // =========================
    const handleReviewChange = (
        index,
        field,
        value
    ) => {

        setFormData(
            (previous) => ({

                ...previous,

                reviews:
                    previous.reviews.map(
                        (
                            review,
                            reviewIndex
                        ) =>
                            reviewIndex ===
                                index
                                ? {
                                    ...review,
                                    [field]:
                                        value
                                }
                                : review
                    )

            })
        );
    };

    // =========================
    // ADD REVIEW
    // =========================
    const addReview = () => {

        setFormData(
            (previous) => ({

                ...previous,

                reviews: [
                    ...previous.reviews,

                    {
                        id: Date.now(),

                        text:
                            "Write customer testimonial here.",

                        name:
                            "Customer Name",

                        role:
                            "Customer Role"
                    }
                ]

            })
        );
    };

    // =========================
    // DELETE REVIEW
    // =========================
    const deleteReview = (
        index
    ) => {

        setFormData(
            (previous) => ({

                ...previous,

                reviews:
                    previous.reviews.filter(
                        (
                            _,
                            reviewIndex
                        ) =>
                            reviewIndex !==
                            index
                    )

            })
        );
    };

    // =========================
    // SAVE TESTIMONIALS
    // =========================
    const handleSave = async () => {

        if (!pageId) {

            alert(
                "Testimonials page data not found."
            );

            return;
        }

        try {

            setSaving(true);

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {

                alert(
                    "Please login as admin first."
                );

                return;
            }

            const data = await updatePage(
                pageId,
                {
                    page_name: "Home",
                    section_name: "Testi",
                    title:
                        formData.heading,
                    description:
                        "Real experiences from customers who chose solar energy for their homes and businesses.",
                    image: "",
                    content:
                        formData
                },
                token
            );

            if (!data.success) {

                alert(
                    data.message ||
                    "Failed to update Testimonials."
                );

                return;
            }

            alert(
                "Testimonials updated successfully!"
            );

        } catch (error) {

            console.error(
                "Testimonials save error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Something went wrong while saving Testimonials."
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {

        return (
            <div className="p-6">
                Loading Testimonials...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h1 className="text-2xl font-bold">
                        Testimonials
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage Home testimonials section.
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/pages/home"
                            )
                        }
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                    >
                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </button>

                    <button
                        onClick={
                            handleSave
                        }
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg"
                    >
                        <Save
                            size={18}
                        />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </div>

            {/* GENERAL SETTINGS */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Testimonial Section
                </h2>

                <div className="grid gap-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Badge
                        </label>

                        <input
                            type="text"
                            name="badge"
                            value={
                                formData.badge
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Heading
                        </label>

                        <input
                            type="text"
                            name="heading"
                            value={
                                formData.heading
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                name="button_text"
                                value={
                                    formData.button_text
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                name="button_link"
                                value={
                                    formData.button_link
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Main Rating
                            </label>

                            <input
                                type="text"
                                name="rating"
                                value={
                                    formData.rating
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="4.9/5"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Customer Trust Text
                            </label>

                            <input
                                type="text"
                                name="trust_text"
                                value={
                                    formData.trust_text
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* AVATARS */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-2">
                    Customer Avatars
                </h2>

                <p className="text-sm text-gray-500 mb-5">
                    Enter image paths or image URLs.
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                    {formData.avatars.map(
                        (
                            avatar,
                            index
                        ) => (

                            <div
                                key={
                                    index
                                }
                            >

                                <label className="block text-sm font-medium mb-2">
                                    Avatar{" "}
                                    {index + 1}
                                </label>

                                <input
                                    type="text"
                                    value={
                                        avatar
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        handleAvatarChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Image URL"
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                            </div>

                        )
                    )}

                </div>

                <div className="mt-5">

                    <label className="block text-sm font-medium mb-2">
                        Bottom CTA Avatar
                    </label>

                    <input
                        type="text"
                        name="bottom_avatar"
                        value={
                            formData.bottom_avatar
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Image URL"
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

            </div>

            {/* REVIEWS */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-lg font-semibold">
                            Customer Reviews
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add, edit or remove testimonials.
                        </p>

                    </div>

                    <button
                        onClick={
                            addReview
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
                    >
                        <Plus
                            size={18}
                        />

                        Add Review

                    </button>

                </div>

                <div className="space-y-5">

                    {formData.reviews.map(
                        (
                            review,
                            index
                        ) => (

                            <div
                                key={
                                    review.id ||
                                    index
                                }
                                className="border rounded-xl p-5"
                            >

                                <div className="flex items-center justify-between mb-5">

                                    <h3 className="font-semibold">
                                        Review{" "}
                                        {index + 1}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            deleteReview(
                                                index
                                            )
                                        }
                                        className="flex items-center gap-2 text-red-600"
                                    >
                                        <Trash2
                                            size={
                                                18
                                            }
                                        />

                                        Delete

                                    </button>

                                </div>

                                <div className="space-y-4">

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Review Text
                                        </label>

                                        <textarea
                                            value={
                                                review.text
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                handleReviewChange(
                                                    index,
                                                    "text",
                                                    e.target.value
                                                )
                                            }
                                            rows={
                                                4
                                            }
                                            className="w-full border rounded-lg px-4 py-3"
                                        />

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Customer Name
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    review.name
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    handleReviewChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded-lg px-4 py-3"
                                            />

                                        </div>

                                        <div>

                                            <label className="block text-sm font-medium mb-2">
                                                Customer Role
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    review.role
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    handleReviewChange(
                                                        index,
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded-lg px-4 py-3"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

                {formData.reviews.length ===
                    0 && (
                        <div className="text-center py-10 text-gray-500">
                            No reviews added.
                        </div>
                    )}

            </div>

            {/* BOTTOM CTA */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Bottom CTA & Rating
                </h2>

                <div className="grid gap-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            CTA Text
                        </label>

                        <textarea
                            name="bottom_text"
                            value={
                                formData.bottom_text
                            }
                            onChange={
                                handleChange
                            }
                            rows={3}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                CTA Link Text
                            </label>

                            <input
                                type="text"
                                name="bottom_link_text"
                                value={
                                    formData.bottom_link_text
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                CTA Link
                            </label>

                            <input
                                type="text"
                                name="bottom_link"
                                value={
                                    formData.bottom_link
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Bottom Rating
                            </label>

                            <input
                                type="text"
                                name="bottom_rating"
                                value={
                                    formData.bottom_rating
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="4.9/5"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Reviews Text
                            </label>

                            <input
                                type="text"
                                name="bottom_reviews"
                                value={
                                    formData.bottom_reviews
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Over 4200 Reviews"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* SAVE */}

            <div className="flex justify-end">

                <button
                    onClick={
                        handleSave
                    }
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg"
                >

                    <Save size={19} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>
    );
};

export default Testi;