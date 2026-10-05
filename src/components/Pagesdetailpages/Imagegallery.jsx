import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import "./Imagegallery.css";

import i1 from "../../assets/Imagegallery/i1.png";
import i2 from "../../assets/Imagegallery/i2.png";
import i3 from "../../assets/Imagegallery/i3.png";
import i4 from "../../assets/Imagegallery/i4.png";
import i5 from "../../assets/Imagegallery/i5.png";
import i6 from "../../assets/Imagegallery/i6.png";
import i7 from "../../assets/Imagegallery/i7.png";
import i8 from "../../assets/Imagegallery/i8.png";
import i9 from "../../assets/Imagegallery/i9.png";

import q1 from "../../assets/Aboutimages/q1.png";

import { getPages } from "../../Api/api";

const fallbackGalleryImages = [
    i1,
    i2,
    i3,
    i4,
    i5,
    i6,
    i7,
    i8,
    i9,
];

const ImageGallery = () => {
    const galleryRef = useRef(null);

    const [galleryData, setGalleryData] = useState({
        heroTitle: "Our Gallery",
        heroImage: q1,
        galleryImages: fallbackGalleryImages,
    });

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const pages = await getPages();

            if (!Array.isArray(pages)) {
                console.error("Invalid pages response:", pages);
                return;
            }

            const galleryPage = pages.find(
                (page) =>
                    page.page_name === "Pages" &&
                    page.section_name === "ImageGallery"
            );

            if (!galleryPage) {
                console.warn(
                    "Pages / ImageGallery row not found in database."
                );
                return;
            }

            let content = galleryPage.content;

            if (typeof content === "string") {
                try {
                    content = JSON.parse(content);
                } catch (error) {
                    console.error(
                        "ImageGallery content JSON parse error:",
                        error
                    );
                    content = {};
                }
            }

            if (!content || typeof content !== "object") {
                content = {};
            }

            const databaseImages = Array.isArray(
                content.galleryImages
            )
                ? content.galleryImages
                    .map((item) => {
                        if (typeof item === "string") {
                            return item.trim();
                        }

                        return item?.image?.trim?.() || "";
                    })
                    .filter(Boolean)
                : [];

            setGalleryData({
                heroTitle:
                    typeof content.heroTitle === "string" &&
                        content.heroTitle.trim()
                        ? content.heroTitle.trim()
                        : galleryPage.title || "Our Gallery",

                heroImage:
                    typeof content.heroImage === "string" &&
                        content.heroImage.trim()
                        ? content.heroImage.trim()
                        : galleryPage.image || q1,

                galleryImages:
                    databaseImages.length > 0
                        ? databaseImages
                        : fallbackGalleryImages,
            });
        } catch (error) {
            console.error(
                "ImageGallery API error:",
                error
            );
        }
    };

    useEffect(() => {
        const galleryItems =
            galleryRef.current?.querySelectorAll(
                ".gallery-image-wrap"
            );

        if (!galleryItems?.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "gallery-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        galleryItems.forEach((item) => {
            observer.observe(item);
        });

        return () => {
            observer.disconnect();
        };
    }, [galleryData.galleryImages]);

    return (
        <div className="image-gallery-page">

            {/* ================= HERO ================= */}

            <section
                className="gallery-hero"
                style={{
                    backgroundImage: `url(${galleryData.heroImage})`,
                }}
            >
                <div className="gallery-hero-overlay"></div>

                <div className="gallery-hero-content">
                    <h1>{galleryData.heroTitle}</h1>

                    <div className="gallery-breadcrumb">
                        <span>Home</span>

                        <span className="breadcrumb-slash">
                            /
                        </span>

                        <span>Image Gallery</span>
                    </div>
                </div>
            </section>

            {/* ================= GALLERY ================= */}

            <section
                className="gallery-section"
                ref={galleryRef}
            >
                <div className="gallery-container">
                    {galleryData.galleryImages.map(
                        (image, index) => (
                            <div
                                className="gallery-image-wrap"
                                key={`${image} -${index} `}
                                style={{
                                    "--delay": `${index * 0.08} s`,
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Solar Gallery ${index + 1} `}
                                    onError={(event) => {
                                        event.currentTarget.src =
                                            fallbackGalleryImages[
                                            index
                                            ] ||
                                            fallbackGalleryImages[0];
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* ================= BUY NOW ================= */}

            <button className="gallery-buy-btn">
                <ShoppingCart
                    size={19}
                    strokeWidth={2.5}
                />

                <span>Buy Now</span>
            </button>

        </div>
    );
};

export default ImageGallery;
