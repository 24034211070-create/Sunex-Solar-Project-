import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { getPages, upsertPage } from "../../Api/api";

const Topbar = () => {
    const [topbar, setTopbar] = useState({
        offerText: "Purchase Today & Enjoy UP TO 35% Off",
        buttonText: "Buy Now",
        buttonLink: "#",
    });

    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ======================================================
    // LOAD TOPBAR DATA
    // ======================================================

    useEffect(() => {
        const loadTopbar = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() === "topbar" &&
                        page.section_name?.trim().toLowerCase() === "topbar"
                );

                if (data) {
                    setPageId(data.id);

                    setTopbar({
                        offerText:
                            data.content?.offerText ||
                            "Purchase Today & Enjoy UP TO 35% Off",

                        buttonText:
                            data.content?.buttonText ||
                            "Buy Now",

                        buttonLink:
                            data.content?.buttonLink ||
                            "#",
                    });
                }
            } catch (error) {
                console.error("Topbar load error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTopbar();
    }, []);

    // ======================================================
    // HANDLE INPUT CHANGE
    // ======================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTopbar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // SAVE TOPBAR
    // ======================================================

    const handleSave = async () => {
        try {
            setSaving(true);

            const response = await upsertPage(pageId, {
                page_name: "Topbar",
                section_name: "Topbar",

                title: topbar.offerText,

                description: "Topbar content",

                image: null,

                content: {
                    offerText: topbar.offerText,
                    buttonText: topbar.buttonText,
                    buttonLink: topbar.buttonLink,
                },
            });

            // ==================================================
            // UPDATE PAGE ID
            // ==================================================
            // Agar page pehle DB mein nahi tha aur create hua,
            // to newly created ID yahan save ho jayegi.
            // ==================================================

            if (response?.page?.id) {
                setPageId(response.page.id);
            }

            alert("Topbar updated successfully!");
        } catch (error) {
            console.error("Topbar save error:", error);

            console.error(
                "Topbar API error response:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                "Failed to update Topbar."
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
                <p>Loading Topbar...</p>
            </div>
        );
    }

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="p-6">

            {/* PAGE HEADER */}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Topbar
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage the website Topbar content.
                </p>
            </div>

            {/* FORM */}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                {/* OFFER TEXT */}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Text
                    </label>

                    <input
                        type="text"
                        name="offerText"
                        value={topbar.offerText}
                        onChange={handleChange}
                        placeholder="Enter offer text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* BUTTON TEXT */}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                    </label>

                    <input
                        type="text"
                        name="buttonText"
                        value={topbar.buttonText}
                        onChange={handleChange}
                        placeholder="Enter button text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* BUTTON LINK */}

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Link
                    </label>

                    <input
                        type="text"
                        name="buttonLink"
                        value={topbar.buttonLink}
                        onChange={handleChange}
                        placeholder="Enter button link"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* SAVE BUTTON */}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition disabled:opacity-50"
                >
                    <Save size={18} />

                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </div>
        </div>
    );
};

export default Topbar;
