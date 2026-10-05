import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Blog.css";

import q1 from "../../assets/Aboutimages/q1.png";
import Vision1 from "../Blogsection/Vision1";

const API_URL = "http://localhost:5000/api";

const defaultBlogData = {
    title: "Latest Articles",
    backgroundImage: "",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Blog",
};

const Blog = () => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    const [hero, setHero] = useState(defaultBlogData);

    // ==========================================
    // LOAD BLOG HERO FROM CMS
    // ==========================================
    useEffect(() => {
        const loadBlogHero = async () => {
            try {
                const response = await axios.get(`${API_URL}/pages`);

                const pages = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.pages)
                        ? response.data.pages
                        : [];

                // Admin Blog saves:
                // pageName = Blog
                // sectionName = Blog
                const blogPage = pages.find(
                    (page) =>
                        String(page.pageName || "").trim().toLowerCase() ===
                        "blog" &&
                        String(page.sectionName || "").trim().toLowerCase() ===
                        "blog"
                );

                if (!blogPage) {
                    console.log("BLOG HERO CMS RECORD NOT FOUND");
                    return;
                }

                const content =
                    blogPage.content &&
                        typeof blogPage.content === "object"
                        ? blogPage.content
                        : {};

                setHero({
                    title:
                        content.title ||
                        blogPage.title ||
                        defaultBlogData.title,

                    backgroundImage:
                        content.backgroundImage ||
                        blogPage.image ||
                        defaultBlogData.backgroundImage,

                    breadcrumbHome:
                        content.breadcrumbHome ||
                        defaultBlogData.breadcrumbHome,

                    breadcrumbCurrent:
                        content.breadcrumbCurrent ||
                        defaultBlogData.breadcrumbCurrent,
                });

                console.log("BLOG HERO LOADED:", {
                    title: content.title,
                    backgroundImage: content.backgroundImage,
                    breadcrumbHome: content.breadcrumbHome,
                    breadcrumbCurrent: content.breadcrumbCurrent,
                });
            } catch (error) {
                console.error("BLOG HERO LOAD ERROR:", error);
            }
        };

        loadBlogHero();
    }, []);

    // ==========================================
    // HERO PARALLAX
    // ==========================================
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current || !bgRef.current) return;

            const rect = heroRef.current.getBoundingClientRect();
            const movement = rect.top * -0.28;

            bgRef.current.style.transform = `translate3d(0, ${movement}px, 0)`;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const backgroundImage =
        hero.backgroundImage || q1;

    return (
        <main>
            {/* ==========================================
                BLOG HERO
            ========================================== */}
            <section
                className="vision-hero"
                ref={heroRef}
            >
                <div
                    ref={bgRef}
                    className="vision-background"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                ></div>

                <div className="vision-overlay"></div>

                <div className="vision-content">
                    <h1>{hero.title}</h1>

                    <div className="vision-breadcrumb">
                        <span>{hero.breadcrumbHome}</span>
                        <span>/</span>
                        <span>{hero.breadcrumbCurrent}</span>
                    </div>
                </div>
            </section>

            {/* ==========================================
                BLOG POSTS
                Vision1 ALREADY CMS CONNECTED
            ========================================== */}
            <Vision1 />
        </main>
    );
};

export default Blog;