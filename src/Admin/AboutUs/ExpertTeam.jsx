import React, { useEffect, useState } from "react";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";

const defaultMember = {
    image: "",
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    pinterest: "#pinterest",
    x: "#x",
    facebook: "#facebook",
    instagram: "#instagram",
};

const defaultData = {
    label: "Our Expert Team",
    title: "Skilled professional powering your clean energy future",
    description:
        "Our team of experienced engineers, technicians, and energy specialists work together to design, install, and maintain solar systems.",

    buttonText: "View All Members",
    buttonLink: "#",

    teamMembers: [
        {
            ...defaultMember,
        },
        {
            ...defaultMember,
            name: "Marvin McKinney",
        },
        {
            ...defaultMember,
            name: "Kathryn Murphy",
        },
    ],

    contactAvatar: "",
    contactText:
        "Where smart solar design meets powerful clean energy results –",
    contactLinkText: "Get Installation Now",
    contactLink: "#installation",

    reviewRating: "4.9/5",
    reviewText: "Over 4200 Reviews",
};

const ExpertTeam = () => {
    const navigate = useNavigate();

    const [pageId, setPageId] = useState(null);
    const [form, setForm] = useState(defaultData);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // =====================================================
    // LOAD DATA
    // =====================================================

    const loadData = async () => {
        try {
            setLoading(true);

            const response = await api.get("/pages");

            const pages = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.pages)
                    ? response.data.pages
                    : [];

            const matchingPages = pages.filter(
                (page) =>
                    String(page.pageName || "")
                        .trim()
                        .toLowerCase() === "about us" &&
                    String(page.sectionName || "")
                        .trim()
                        .toLowerCase() === "expert team"
            );

            if (matchingPages.length === 0) {
                setPageId(null);
                setForm(defaultData);
                return;
            }

            const page = matchingPages.reduce(
                (latest, current) =>
                    Number(current.id) > Number(latest.id)
                        ? current
                        : latest
            );

            setPageId(page.id);

            const content = page.content || {};

            let members = defaultData.teamMembers;

            if (
                Array.isArray(content.team_members) &&
                content.team_members.length > 0
            ) {
                members = content.team_members.map(
                    (member, index) => ({
                        image: member.image || "",
                        name:
                            member.name ||
                            defaultData.teamMembers[index]
                                ?.name ||
                            "",
                        role:
                            member.role ||
                            "Lead Solar Engineer",
                        pinterest:
                            member.pinterest ||
                            "#pinterest",
                        x:
                            member.x ||
                            "#x",
                        facebook:
                            member.facebook ||
                            "#facebook",
                        instagram:
                            member.instagram ||
                            "#instagram",
                    })
                );
            }

            setForm({
                label:
                    content.label ||
                    page.label ||
                    defaultData.label,

                title:
                    content.title ||
                    page.title ||
                    defaultData.title,

                description:
                    content.description ||
                    page.description ||
                    defaultData.description,

                buttonText:
                    content.button_text ||
                    defaultData.buttonText,

                buttonLink:
                    content.button_link ||
                    defaultData.buttonLink,

                teamMembers: members,

                contactAvatar:
                    content.contact_avatar ||
                    "",

                contactText:
                    content.contact_text ||
                    defaultData.contactText,

                contactLinkText:
                    content.contact_link_text ||
                    defaultData.contactLinkText,

                contactLink:
                    content.contact_link ||
                    defaultData.contactLink,

                reviewRating:
                    content.review_rating ||
                    defaultData.reviewRating,

                reviewText:
                    content.review_text ||
                    defaultData.reviewText,
            });
        } catch (error) {
            console.error(
                "ABOUT US EXPERT TEAM ADMIN LOAD ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // =====================================================
    // MAIN FIELD CHANGE
    // =====================================================

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // =====================================================
    // TEAM MEMBER CHANGE
    // =====================================================

    const handleMemberChange = (
        index,
        field,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            teamMembers: prev.teamMembers.map(
                (member, memberIndex) =>
                    memberIndex === index
                        ? {
                            ...member,
                            [field]: value,
                        }
                        : member
            ),
        }));
    };

    // =====================================================
    // ADD MEMBER
    // =====================================================

    const addMember = () => {
        setForm((prev) => ({
            ...prev,
            teamMembers: [
                ...prev.teamMembers,
                {
                    image: "",
                    name: "",
                    role: "Lead Solar Engineer",
                    pinterest: "#pinterest",
                    x: "#x",
                    facebook: "#facebook",
                    instagram: "#instagram",
                },
            ],
        }));
    };

    // =====================================================
    // REMOVE MEMBER
    // =====================================================

    const removeMember = (index) => {
        setForm((prev) => ({
            ...prev,
            teamMembers: prev.teamMembers.filter(
                (_, memberIndex) =>
                    memberIndex !== index
            ),
        }));
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                page_name: "About Us",
                section_name: "Expert Team",

                title: form.title,
                description: form.description,

                content: {
                    label: form.label,
                    title: form.title,
                    description: form.description,

                    button_text: form.buttonText,
                    button_link: form.buttonLink,

                    team_members: form.teamMembers,

                    contact_avatar:
                        form.contactAvatar,

                    contact_text:
                        form.contactText,

                    contact_link_text:
                        form.contactLinkText,

                    contact_link:
                        form.contactLink,

                    review_rating:
                        form.reviewRating,

                    review_text:
                        form.reviewText,
                },
            };

            const token =
                localStorage.getItem("token");

            if (pageId) {
                await api.put(
                    `/pages/${pageId}`,
                    payload,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );
            } else {
                const response = await api.post(
                    "/pages",
                    payload,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                if (response.data?.id) {
                    setPageId(response.data.id);
                }
            }

            alert(
                "Expert Team updated successfully!"
            );

            await loadData();
        } catch (error) {
            console.error(
                "ABOUT US EXPERT TEAM ADMIN SAVE ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to save Expert Team."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-xl border p-8 text-center">
                    Loading Expert Team...
                </div>
            </div>
        );
    }

    // =====================================================
    // JSX
    // =====================================================

    return (
        <div className="p-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        About Us - Expert Team
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage the Expert Team section.
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/pages/about-us"
                            )
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>
            </div>

            <div className="space-y-6">

                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Expert Team Content
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the heading and description.
                        </p>

                    </div>

                    <div className="p-6 space-y-5">

                        {/* LABEL */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                            </label>

                            <input
                                type="text"
                                value={form.label}
                                onChange={(e) =>
                                    handleChange(
                                        "label",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        {/* TITLE */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Heading
                            </label>

                            <textarea
                                rows="3"
                                value={form.title}
                                onChange={(e) =>
                                    handleChange(
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />

                        </div>

                    </div>
                </div>

                {/* =================================================
                    BUTTON
                ================================================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">

                        <h2 className="text-lg font-semibold text-gray-800">
                            View All Members Button
                        </h2>

                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                            </label>

                            <input
                                type="text"
                                value={form.buttonText}
                                onChange={(e) =>
                                    handleChange(
                                        "buttonText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Link
                            </label>

                            <input
                                type="text"
                                value={form.buttonLink}
                                onChange={(e) =>
                                    handleChange(
                                        "buttonLink",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                    </div>
                </div>

                {/* =================================================
                    TEAM MEMBERS
                ================================================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-800">
                                Team Members
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage team member details and social links.
                            </p>

                        </div>

                        <button
                            onClick={addMember}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            <Plus size={17} />
                            Add Member
                        </button>

                    </div>

                    <div className="p-6 space-y-6">

                        {form.teamMembers.map(
                            (member, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl p-5"
                                >

                                    <div className="flex items-center justify-between mb-5">

                                        <h3 className="text-base font-semibold text-gray-800">
                                            Team Member{" "}
                                            {index + 1}
                                        </h3>

                                        <button
                                            onClick={() =>
                                                removeMember(
                                                    index
                                                )
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                                        >
                                            <Trash2
                                                size={17}
                                            />
                                            Remove
                                        </button>

                                    </div>

                                    <div className="space-y-5">

                                        {/* IMAGE */}

                                        <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Image URL
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    member.image
                                                }
                                                onChange={(e) =>
                                                    handleMemberChange(
                                                        index,
                                                        "image",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Image URL"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                            />

                                            {member.image && (
                                                <img
                                                    src={
                                                        member.image
                                                    }
                                                    alt={
                                                        member.name
                                                    }
                                                    className="mt-3 w-32 h-32 object-cover rounded-lg border"
                                                />
                                            )}

                                        </div>

                                        {/* NAME + ROLE */}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        member.name
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                            </div>

                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Role
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        member.role
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "role",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                            </div>

                                        </div>

                                        {/* SOCIAL LINKS */}

                                        <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Social Links
                                            </label>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                <input
                                                    type="text"
                                                    value={
                                                        member.pinterest
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "pinterest",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Pinterest URL"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                                <input
                                                    type="text"
                                                    value={
                                                        member.x
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "x",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="X / Twitter URL"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                                <input
                                                    type="text"
                                                    value={
                                                        member.facebook
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "facebook",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Facebook URL"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                                <input
                                                    type="text"
                                                    value={
                                                        member.instagram
                                                    }
                                                    onChange={(e) =>
                                                        handleMemberChange(
                                                            index,
                                                            "instagram",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Instagram URL"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                </div>

                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Bottom Contact CTA
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the contact message displayed below the team.
                        </p>

                    </div>

                    <div className="p-6 space-y-5">

                        {/* AVATAR */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Avatar URL
                            </label>

                            <input
                                type="text"
                                value={
                                    form.contactAvatar
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contactAvatar",
                                        e.target.value
                                    )
                                }
                                placeholder="Image URL"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                            {form.contactAvatar && (
                                <img
                                    src={
                                        form.contactAvatar
                                    }
                                    alt="Contact"
                                    className="mt-3 w-20 h-20 object-cover rounded-full border"
                                />
                            )}

                        </div>

                        {/* TEXT */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Text
                            </label>

                            <textarea
                                rows="3"
                                value={
                                    form.contactText
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contactText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />

                        </div>

                        {/* LINK TEXT + LINK */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link Text
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.contactLinkText
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "contactLinkText",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link URL
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.contactLink
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "contactLink",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                                />

                            </div>

                        </div>

                    </div>
                </div>

                {/* =================================================
                    REVIEW
                ================================================= */}

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-4 border-b">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Reviews
                        </h2>

                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                            </label>

                            <input
                                type="text"
                                value={
                                    form.reviewRating
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "reviewRating",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Review Text
                            </label>

                            <input
                                type="text"
                                value={
                                    form.reviewText
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "reviewText",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                    </div>
                </div>

                {/* =================================================
                    BOTTOM SAVE
                ================================================= */}

                <div className="flex justify-end pb-6">

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ExpertTeam;