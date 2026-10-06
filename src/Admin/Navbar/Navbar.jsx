import React, { useEffect, useState } from "react";
import { ArrowLeft, ImageIcon, Plus, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPages, createPage, updatePage } from "../../Api/api";

const defaultNavbar = {
    logoText: "Sunex",
    logoImage: "",
    logoLink: "/",

    homeText: "Home",

    aboutText: "About Us",
    aboutLink: "/about",

    servicesText: "Services",
    servicesLink: "/services",

    blogsText: "Blogs",
    blogsLink: "/blogs",

    pagesText: "Pages",

    contactText: "Contact Us",
    contactLink: "/contact",

    buttonText: "Contact Us",
    buttonLink: "/contact",

    homeDropdown: [
        {
            text: "Home-Version-1",
            mobileText: "Home 1",
            link: "/",
        },
        {
            text: "Home-Version-2",
            mobileText: "Home 2",
            link: "/home-2",
        },
        {
            text: "Home-Version-3",
            mobileText: "Home 3",
            link: "/home-3",
        },
    ],

    pagesDropdown: [
        {
            text: "Service Details",
            link: "/service-details",
        },
        {
            text: "Blog Details",
            link: "/blog-details",
        },
        {
            text: "Projects",
            link: "/projects",
        },
        {
            text: "Project Details",
            link: "/project-details",
        },
        {
            text: "Image Gallery",
            link: "/gallery",
        },
        {
            text: "404",
            link: "/404",
        },
    ],
};

const Navbar = () => {
    const navigate = useNavigate();

    const [navbar, setNavbar] = useState(defaultNavbar);
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* =========================================
       LOAD NAVBAR DATA
    ========================================= */

    useEffect(() => {
        const loadNavbar = async () => {
            try {
                setLoading(true);

                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() ===
                        "navbar" &&
                        page.section_name?.trim().toLowerCase() ===
                        "navbar"
                );

                if (data) {
                    setPageId(data.id);

                    if (data.content) {
                        setNavbar({
                            ...defaultNavbar,
                            ...data.content,

                            homeDropdown:
                                Array.isArray(
                                    data.content.homeDropdown
                                ) &&
                                    data.content.homeDropdown.length
                                    ? data.content.homeDropdown
                                    : defaultNavbar.homeDropdown,

                            pagesDropdown:
                                Array.isArray(
                                    data.content.pagesDropdown
                                ) &&
                                    data.content.pagesDropdown.length
                                    ? data.content.pagesDropdown
                                    : defaultNavbar.pagesDropdown,
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Navbar Admin load error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadNavbar();
    }, []);

    /* =========================================
       SIMPLE FIELD CHANGE
    ========================================= */

    const handleChange = (field, value) => {
        setNavbar((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    /* =========================================
       HOME DROPDOWN CHANGE
    ========================================= */

    const handleHomeDropdownChange = (
        index,
        field,
        value
    ) => {
        setNavbar((previous) => ({
            ...previous,
            homeDropdown:
                previous.homeDropdown.map(
                    (item, itemIndex) =>
                        itemIndex === index
                            ? {
                                ...item,
                                [field]: value,
                            }
                            : item
                ),
        }));
    };

    /* =========================================
       ADD HOME DROPDOWN
    ========================================= */

    const addHomeDropdown = () => {
        setNavbar((previous) => ({
            ...previous,
            homeDropdown: [
                ...previous.homeDropdown,
                {
                    text: "New Home",
                    mobileText: "New Home",
                    link: "/",
                },
            ],
        }));
    };

    /* =========================================
       DELETE HOME DROPDOWN
    ========================================= */

    const deleteHomeDropdown = (index) => {
        setNavbar((previous) => ({
            ...previous,
            homeDropdown:
                previous.homeDropdown.filter(
                    (_, itemIndex) =>
                        itemIndex !== index
                ),
        }));
    };

    /* =========================================
       PAGES DROPDOWN CHANGE
    ========================================= */

    const handlePagesDropdownChange = (
        index,
        field,
        value
    ) => {
        setNavbar((previous) => ({
            ...previous,
            pagesDropdown:
                previous.pagesDropdown.map(
                    (item, itemIndex) =>
                        itemIndex === index
                            ? {
                                ...item,
                                [field]: value,
                            }
                            : item
                ),
        }));
    };

    /* =========================================
       ADD PAGES DROPDOWN
    ========================================= */

    const addPagesDropdown = () => {
        setNavbar((previous) => ({
            ...previous,
            pagesDropdown: [
                ...previous.pagesDropdown,
                {
                    text: "New Page",
                    link: "/new-page",
                },
            ],
        }));
    };

    /* =========================================
       DELETE PAGES DROPDOWN
    ========================================= */

    const deletePagesDropdown = (index) => {
        setNavbar((previous) => ({
            ...previous,
            pagesDropdown:
                previous.pagesDropdown.filter(
                    (_, itemIndex) =>
                        itemIndex !== index
                ),
        }));
    };

    /* =========================================
       SAVE NAVBAR
    ========================================= */

    const handleSave = async () => {
        try {
            setSaving(true);

            const token =
                localStorage.getItem("token");

            const payload = {
                page_name: "Navbar",
                section_name: "Navbar",
                title: navbar.logoText,
                description: "Main Navbar content",
                image: navbar.logoImage || null,
                content: navbar,
            };

            let response;

            if (pageId) {
                response = await updatePage(
                    pageId,
                    payload,
                    token
                );
            } else {
                response = await createPage(
                    payload,
                    token
                );
            }

            if (response?.page?.id) {
                setPageId(response.page.id);
            }

            alert("Navbar saved successfully!");
        } catch (error) {
            console.error(
                "Navbar save error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to save Navbar."
            );
        } finally {
            setSaving(false);
        }
    };

    /* =========================================
       LOADING
    ========================================= */

    if (loading) {
        return (
            <div className="p-6">
                <p>Loading Navbar...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* =====================================
               HEADER
            ===================================== */}

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/pages/home")
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-gray-600 transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Main Navbar
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage your website main
                            navigation
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-[#43ad3d] px-5 py-2.5 font-semibold text-white transition hover:bg-[#369331] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

            </div>

            {/* =====================================
               LOGO SECTION
            ===================================== */}

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Logo
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage Navbar logo and logo link.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    {/* LOGO TEXT */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Logo Text
                        </label>

                        <input
                            type="text"
                            value={navbar.logoText}
                            onChange={(e) =>
                                handleChange(
                                    "logoText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[#43ad3d]"
                            placeholder="Sunex"
                        />
                    </div>

                    {/* LOGO LINK */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Logo Link
                        </label>

                        <input
                            type="text"
                            value={navbar.logoLink}
                            onChange={(e) =>
                                handleChange(
                                    "logoLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[#43ad3d]"
                            placeholder="/"
                        />
                    </div>

                    {/* LOGO IMAGE */}

                    <div className="md:col-span-2">

                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <ImageIcon size={17} />
                            Logo Image URL / Path
                            (Optional)
                        </label>

                        <input
                            type="text"
                            value={navbar.logoImage}
                            onChange={(e) =>
                                handleChange(
                                    "logoImage",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[#43ad3d]"
                            placeholder="https://example.com/logo.png or /assets/logo.png"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Empty rakhoge to default
                            Sunex logo automatically
                            show hoga.
                        </p>

                        {navbar.logoImage && (
                            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                                <p className="mb-2 text-xs font-medium text-gray-500">
                                    Logo Preview
                                </p>

                                <img
                                    src={
                                        navbar.logoImage
                                    }
                                    alt="Logo Preview"
                                    className="h-16 max-w-[220px] object-contain"
                                />
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* =====================================
               MAIN MENU SECTION
            ===================================== */}

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Main Menu
                    </h2>

                    <p className="text-sm text-gray-500">
                        Change menu text and links.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    {/* HOME */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Home Text
                        </label>

                        <input
                            type="text"
                            value={navbar.homeText}
                            onChange={(e) =>
                                handleChange(
                                    "homeText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    {/* ABOUT */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            About Text
                        </label>

                        <input
                            type="text"
                            value={navbar.aboutText}
                            onChange={(e) =>
                                handleChange(
                                    "aboutText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            About Link
                        </label>

                        <input
                            type="text"
                            value={navbar.aboutLink}
                            onChange={(e) =>
                                handleChange(
                                    "aboutLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    {/* SERVICES */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Services Text
                        </label>

                        <input
                            type="text"
                            value={navbar.servicesText}
                            onChange={(e) =>
                                handleChange(
                                    "servicesText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Services Link
                        </label>

                        <input
                            type="text"
                            value={navbar.servicesLink}
                            onChange={(e) =>
                                handleChange(
                                    "servicesLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    {/* BLOGS */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Blogs Text
                        </label>

                        <input
                            type="text"
                            value={navbar.blogsText}
                            onChange={(e) =>
                                handleChange(
                                    "blogsText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Blogs Link
                        </label>

                        <input
                            type="text"
                            value={navbar.blogsLink}
                            onChange={(e) =>
                                handleChange(
                                    "blogsLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    {/* PAGES */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pages Text
                        </label>

                        <input
                            type="text"
                            value={navbar.pagesText}
                            onChange={(e) =>
                                handleChange(
                                    "pagesText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    {/* CONTACT */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Contact Text
                        </label>

                        <input
                            type="text"
                            value={navbar.contactText}
                            onChange={(e) =>
                                handleChange(
                                    "contactText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Contact Link
                        </label>

                        <input
                            type="text"
                            value={navbar.contactLink}
                            onChange={(e) =>
                                handleChange(
                                    "contactLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                </div>

            </div>

            {/* =====================================
               HOME DROPDOWN
            ===================================== */}

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Home Dropdown
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage Home dropdown options.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addHomeDropdown}
                        className="flex items-center gap-2 rounded-lg bg-[#43ad3d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#369331]"
                    >
                        <Plus size={17} />
                        Add Home
                    </button>

                </div>

                <div className="space-y-5">

                    {navbar.homeDropdown.map(
                        (item, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                            >

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="font-semibold text-gray-700">
                                        Home Option{" "}
                                        {index + 1}
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteHomeDropdown(
                                                index
                                            )
                                        }
                                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2
                                            size={16}
                                        />
                                        Delete
                                    </button>

                                </div>

                                <div className="grid gap-4 md:grid-cols-3">

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Desktop Text
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                item.text
                                            }
                                            onChange={(e) =>
                                                handleHomeDropdownChange(
                                                    index,
                                                    "text",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Mobile Text
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                item.mobileText
                                            }
                                            onChange={(e) =>
                                                handleHomeDropdownChange(
                                                    index,
                                                    "mobileText",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Link
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                item.link
                                            }
                                            onChange={(e) =>
                                                handleHomeDropdownChange(
                                                    index,
                                                    "link",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                                        />
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

            {/* =====================================
               PAGES DROPDOWN
            ===================================== */}

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Pages Dropdown
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage Pages dropdown options.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addPagesDropdown}
                        className="flex items-center gap-2 rounded-lg bg-[#43ad3d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#369331]"
                    >
                        <Plus size={17} />
                        Add Page
                    </button>

                </div>

                <div className="space-y-5">

                    {navbar.pagesDropdown.map(
                        (item, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                            >

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="font-semibold text-gray-700">
                                        Page Option{" "}
                                        {index + 1}
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deletePagesDropdown(
                                                index
                                            )
                                        }
                                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2
                                            size={16}
                                        />
                                        Delete
                                    </button>

                                </div>

                                <div className="grid gap-4 md:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Page Text
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                item.text
                                            }
                                            onChange={(e) =>
                                                handlePagesDropdownChange(
                                                    index,
                                                    "text",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Page Link
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                item.link
                                            }
                                            onChange={(e) =>
                                                handlePagesDropdownChange(
                                                    index,
                                                    "link",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                                        />
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

            {/* =====================================
               CONTACT BUTTON
            ===================================== */}

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Contact Button
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage the button displayed on
                        desktop and mobile Navbar.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Button Text
                        </label>

                        <input
                            type="text"
                            value={navbar.buttonText}
                            onChange={(e) =>
                                handleChange(
                                    "buttonText",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Button Link
                        </label>

                        <input
                            type="text"
                            value={navbar.buttonLink}
                            onChange={(e) =>
                                handleChange(
                                    "buttonLink",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#43ad3d]"
                        />
                    </div>

                </div>

            </div>

            {/* =====================================
               BOTTOM SAVE
            ===================================== */}

            <div className="flex justify-end pb-8">

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-[#43ad3d] px-6 py-3 font-semibold text-white transition hover:bg-[#369331] disabled:cursor-not-allowed disabled:opacity-60"
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

export default Navbar;
