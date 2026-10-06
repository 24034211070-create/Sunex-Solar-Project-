import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getPages, upsertPage } from "../../Api/api";

const ContactBar = () => {
    const [contactBar, setContactBar] = useState({
        phoneLabel: "Phone Number:",
        phone: "+123 456-789",

        emailLabel: "Email Address:",
        email: "info@domainname.com",

        followText: "Follow Us On Social:",

        instagramIcon: "",
        instagramLink: "#",

        facebookIcon: "",
        facebookLink: "#",

        websiteIcon: "",
        websiteLink: "#",
    });

    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ======================================================
    // LOAD CONTACT BAR
    // ======================================================

    useEffect(() => {
        const loadContactBar = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() ===
                        "contact bar" &&
                        page.section_name?.trim().toLowerCase() ===
                        "contact bar"
                );

                if (data) {
                    setPageId(data.id);

                    setContactBar({
                        phoneLabel:
                            data.content?.phoneLabel ||
                            "Phone Number:",

                        phone:
                            data.content?.phone ||
                            "+123 456-789",

                        emailLabel:
                            data.content?.emailLabel ||
                            "Email Address:",

                        email:
                            data.content?.email ||
                            "info@domainname.com",

                        followText:
                            data.content?.followText ||
                            "Follow Us On Social:",

                        instagramIcon:
                            data.content?.instagramIcon || "",

                        instagramLink:
                            data.content?.instagramLink || "#",

                        facebookIcon:
                            data.content?.facebookIcon || "",

                        facebookLink:
                            data.content?.facebookLink || "#",

                        websiteIcon:
                            data.content?.websiteIcon || "",

                        websiteLink:
                            data.content?.websiteLink || "#",
                    });
                }
            } catch (error) {
                console.error(
                    "Contact Bar load error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadContactBar();
    }, []);

    // ======================================================
    // HANDLE CHANGE
    // ======================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setContactBar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // SAVE CONTACT BAR
    // ======================================================

    const handleSave = async () => {
        try {
            setSaving(true);

            const response = await upsertPage(pageId, {
                page_name: "Contact Bar",
                section_name: "Contact Bar",

                title: contactBar.phone,

                description: "Contact Bar content",

                image: null,

                content: {
                    phoneLabel: contactBar.phoneLabel,
                    phone: contactBar.phone,

                    emailLabel: contactBar.emailLabel,
                    email: contactBar.email,

                    followText: contactBar.followText,

                    // OPTIONAL CUSTOM ICONS
                    instagramIcon:
                        contactBar.instagramIcon,

                    instagramLink:
                        contactBar.instagramLink,

                    facebookIcon:
                        contactBar.facebookIcon,

                    facebookLink:
                        contactBar.facebookLink,

                    websiteIcon:
                        contactBar.websiteIcon,

                    websiteLink:
                        contactBar.websiteLink,
                },
            });

            if (response?.page?.id) {
                setPageId(response.page.id);
            }

            alert("Contact Bar updated successfully!");
        } catch (error) {
            console.error(
                "Contact Bar save error:",
                error
            );

            console.error(
                "API Error:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                "Failed to update Contact Bar."
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
                <p>Loading Contact Bar...</p>
            </div>
        );
    }

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="p-6">

            {/* HEADER */}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Contact Bar
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage Contact Bar content and optional social icons.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                {/* ==================================================
                    PHONE
                ================================================== */}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Label
                    </label>

                    <input
                        type="text"
                        name="phoneLabel"
                        value={contactBar.phoneLabel}
                        onChange={handleChange}
                        placeholder="Phone Number:"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={contactBar.phone}
                        onChange={handleChange}
                        placeholder="+123 456-789"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* ==================================================
                    EMAIL
                ================================================== */}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Label
                    </label>

                    <input
                        type="text"
                        name="emailLabel"
                        value={contactBar.emailLabel}
                        onChange={handleChange}
                        placeholder="Email Address:"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={contactBar.email}
                        onChange={handleChange}
                        placeholder="info@domainname.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* ==================================================
                    FOLLOW TEXT
                ================================================== */}

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Social Follow Text
                    </label>

                    <input
                        type="text"
                        name="followText"
                        value={contactBar.followText}
                        onChange={handleChange}
                        placeholder="Follow Us On Social:"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* ==================================================
                    INSTAGRAM
                ================================================== */}

                <div className="border-t border-gray-200 pt-6 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Instagram
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon URL / Path
                            <span className="text-gray-400 ml-2">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="instagramIcon"
                            value={contactBar.instagramIcon}
                            onChange={handleChange}
                            placeholder="Leave empty to use default Instagram icon"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {contactBar.instagramIcon && (
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-sm text-gray-500">
                                    Custom Icon Preview:
                                </span>

                                <img
                                    src={contactBar.instagramIcon}
                                    alt="Instagram"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram Link
                        </label>

                        <input
                            type="text"
                            name="instagramLink"
                            value={contactBar.instagramLink}
                            onChange={handleChange}
                            placeholder="https://instagram.com/..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                </div>

                {/* ==================================================
                    FACEBOOK
                ================================================== */}

                <div className="border-t border-gray-200 pt-6 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Facebook
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon URL / Path
                            <span className="text-gray-400 ml-2">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="facebookIcon"
                            value={contactBar.facebookIcon}
                            onChange={handleChange}
                            placeholder="Leave empty to use default Facebook icon"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {contactBar.facebookIcon && (
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-sm text-gray-500">
                                    Custom Icon Preview:
                                </span>

                                <img
                                    src={contactBar.facebookIcon}
                                    alt="Facebook"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook Link
                        </label>

                        <input
                            type="text"
                            name="facebookLink"
                            value={contactBar.facebookLink}
                            onChange={handleChange}
                            placeholder="https://facebook.com/..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                </div>

                {/* ==================================================
                    WEBSITE / GLOBE
                ================================================== */}

                <div className="border-t border-gray-200 pt-6 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Website / Globe
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon URL / Path
                            <span className="text-gray-400 ml-2">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="websiteIcon"
                            value={contactBar.websiteIcon}
                            onChange={handleChange}
                            placeholder="Leave empty to use default Globe icon"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {contactBar.websiteIcon && (
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-sm text-gray-500">
                                    Custom Icon Preview:
                                </span>

                                <img
                                    src={contactBar.websiteIcon}
                                    alt="Website"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website Link
                        </label>

                        <input
                            type="text"
                            name="websiteLink"
                            value={contactBar.websiteLink}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                </div>

                {/* ==================================================
                    SAVE
                ================================================== */}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition disabled:opacity-50"
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

export default ContactBar;
