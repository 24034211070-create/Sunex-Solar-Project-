import React, { useEffect, useState } from "react";
import { Save, Image as ImageIcon, Loader2 } from "lucide-react";
import {
    getPages,
    createPage,
    updatePage,
} from "../../Api/api";

const defaultGalleryImages = [
    { id: 1, image: "" },
    { id: 2, image: "" },
    { id: 3, image: "" },
    { id: 4, image: "" },
    { id: 5, image: "" },
    { id: 6, image: "" },
    { id: 7, image: "" },
    { id: 8, image: "" },
    { id: 9, image: "" },
];

const ImageGallery = () => {
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        heroTitle: "Our Gallery",
        heroImage: "",
        galleryImages: defaultGalleryImages,
    });

    useEffect(() => {
        loadGallery();
    }, []);

    // ======================================================
    // LOAD GALLERY
    // ======================================================

    const loadGallery = async () => {
        try {
            setLoading(true);

            const pages = await getPages();

            console.log("ALL PAGES:", pages);

            if (!Array.isArray(pages)) {
                throw new Error("Invalid pages response from server.");
            }

            // IMPORTANT:
            // Prisma returns camelCase fields.
            // We support both camelCase and snake_case.

            let galleryPage = pages.find(
                (page) =>
                    (page.pageName === "Pages" ||
                        page.page_name === "Pages") &&
                    (page.sectionName === "ImageGallery" ||
                        page.section_name === "ImageGallery")
            );

            // ==================================================
            // CREATE PAGE IF IT DOES NOT EXIST
            // ==================================================

            if (!galleryPage) {
                console.log(
                    "ImageGallery page not found. Creating new page..."
                );

                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error(
                        "Admin token not found. Please login again."
                    );
                }

                const response = await createPage(
                    {
                        page_name: "Pages",
                        section_name: "ImageGallery",
                        title: "Our Gallery",
                        description: "",
                        image: "",
                        content: {
                            heroTitle: "Our Gallery",
                            heroImage: "",
                            galleryImages: defaultGalleryImages,
                        },
                    },
                    token
                );

                console.log(
                    "CREATE IMAGE GALLERY RESPONSE:",
                    response
                );

                galleryPage = response?.page;

                if (!galleryPage) {
                    throw new Error(
                        "Image Gallery page was not created."
                    );
                }
            }

            // ==================================================
            // SET PAGE ID
            // ==================================================

            setPageId(galleryPage.id);

            // ==================================================
            // CONTENT
            // ==================================================

            let content = galleryPage.content;

            if (typeof content === "string") {
                try {
                    content = JSON.parse(content);
                } catch (error) {
                    console.error(
                        "Content JSON parse error:",
                        error
                    );

                    content = {};
                }
            }

            if (!content || typeof content !== "object") {
                content = {};
            }

            // ==================================================
            // SET FORM
            // ==================================================

            setFormData({
                heroTitle:
                    content.heroTitle ||
                    galleryPage.title ||
                    "Our Gallery",

                heroImage:
                    content.heroImage ||
                    galleryPage.image ||
                    "",

                galleryImages:
                    Array.isArray(content.galleryImages) &&
                        content.galleryImages.length > 0
                        ? content.galleryImages
                        : defaultGalleryImages,
            });
        } catch (error) {
            console.error(
                "IMAGE GALLERY LOAD ERROR:",
                error
            );

            console.error(
                "SERVER ERROR:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load Image Gallery."
            );
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // HERO TITLE
    // ======================================================

    const handleTitleChange = (event) => {
        setFormData((previous) => ({
            ...previous,
            heroTitle: event.target.value,
        }));
    };

    // ======================================================
    // HERO IMAGE
    // ======================================================

    const handleHeroImageChange = (event) => {
        setFormData((previous) => ({
            ...previous,
            heroImage: event.target.value,
        }));
    };

    // ======================================================
    // GALLERY IMAGE
    // ======================================================

    const handleImageChange = (index, value) => {
        setFormData((previous) => {
            const updatedImages = [
                ...previous.galleryImages,
            ];

            updatedImages[index] = {
                ...updatedImages[index],
                image: value,
            };

            return {
                ...previous,
                galleryImages: updatedImages,
            };
        });
    };

    // ======================================================
    // SAVE
    // ======================================================

    const handleSave = async () => {
        if (!pageId) {
            alert(
                "Image Gallery page ID is missing."
            );
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Admin login session expired. Please login again."
                );
                return;
            }

            const payload = {
                page_name: "Pages",
                section_name: "ImageGallery",
                title: formData.heroTitle,
                description: "",
                image: formData.heroImage,

                content: {
                    heroTitle: formData.heroTitle,
                    heroImage: formData.heroImage,
                    galleryImages: formData.galleryImages,
                },
            };

            console.log(
                "IMAGE GALLERY SAVE PAYLOAD:",
                payload
            );

            const response = await updatePage(
                pageId,
                payload,
                token
            );

            console.log(
                "IMAGE GALLERY SAVE RESPONSE:",
                response
            );

            alert(
                "Image Gallery updated successfully!"
            );
        } catch (error) {
            console.error(
                "IMAGE GALLERY SAVE ERROR:",
                error
            );

            console.error(
                "SERVER RESPONSE:",
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to save Image Gallery."
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
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex items-center gap-2 text-slate-600">
                    <Loader2
                        size={20}
                        className="animate-spin"
                    />

                    <span>
                        Loading Image Gallery...
                    </span>
                </div>
            </div>
        );
    }

    // ======================================================
    // UI
    // ======================================================

    return (
        <div className="p-6">

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Image Gallery
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your website gallery images
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* HERO */}

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-2">
                    <ImageIcon
                        size={20}
                        className="text-green-500"
                    />

                    <h2 className="text-lg font-semibold text-slate-800">
                        Hero Section
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Hero Title
                        </label>

                        <input
                            type="text"
                            value={formData.heroTitle}
                            onChange={handleTitleChange}
                            placeholder="Our Gallery"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Hero Image URL
                        </label>

                        <input
                            type="text"
                            value={formData.heroImage}
                            onChange={handleHeroImageChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                </div>

                {formData.heroImage && (
                    <div className="mt-5">
                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Hero Preview
                        </p>

                        <img
                            src={formData.heroImage}
                            alt="Hero Preview"
                            className="h-48 w-full rounded-lg object-cover"
                        />
                    </div>
                )}

            </div>

            {/* GALLERY */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Gallery Images
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Add image URLs for your gallery.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    {formData.galleryImages.map(
                        (item, index) => (
                            <div
                                key={item.id || index}
                                className="rounded-lg border border-slate-200 p-4"
                            >
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Gallery Image {index + 1}
                                </label>

                                <input
                                    type="text"
                                    value={item.image || ""}
                                    onChange={(event) =>
                                        handleImageChange(
                                            index,
                                            event.target.value
                                        )
                                    }
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                />

                                {item.image && (
                                    <div className="mt-3">
                                        <img
                                            src={item.image}
                                            alt={`Gallery Preview ${index + 1
                                                }`}
                                            className="h-40 w-full rounded-md object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    )}

                </div>
            </div>

            {/* BOTTOM SAVE */}

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-md bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

        </div>
    );
};

export default ImageGallery;