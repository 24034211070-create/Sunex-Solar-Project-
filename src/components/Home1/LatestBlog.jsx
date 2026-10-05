import React, { useEffect, useState } from "react";
import "./LatestBlog.css";

import a5 from "../../assets/Main/a5.png";
import a6 from "../../assets/Main/a6.png";
import a7 from "../../assets/Main/a7.png";

import { getPages } from "../../Api/api";

const fallbackBlogs = [
    {
        id: 1,
        image: a5,
        category: "Residential Solar",
        title: "A Complete Guide to Solar Energy for Homeowners",
        link: "/blog",
    },
    {
        id: 2,
        image: a6,
        category: "Solar Benefits",
        title: "Top Benefits of Switching to Solar Power in 2026",
        link: "/blog",
    },
    {
        id: 3,
        image: a7,
        category: "Installation Guide",
        title: "Solar Installation Process Explained Step by Step",
        link: "/blog",
    },
];

const LatestBlogs = () => {
    const [data, setData] = useState({
        label: "Latest Blogs",
        heading:
            "Insights, trend and updates from the solar industry",
        description:
            "Stay up to date with in-depth insights, emerging trends, and important updates from the solar industry. Our articles cover everything from new.",
        button_text: "View All Blogs",
        button_link: "/blog",
        blogs: fallbackBlogs,
    });

    useEffect(() => {
        const fetchLatestBlog = async () => {
            try {
                const result = await getPages();

                if (
                    result.success &&
                    Array.isArray(result.pages)
                ) {
                    const latestBlogPage =
                        result.pages.find(
                            (page) =>
                                page.page_name === "Home" &&
                                page.section_name ===
                                "LatestBlog"
                        );

                    if (latestBlogPage) {
                        const content =
                            latestBlogPage.content || {};

                        setData({
                            label:
                                content.label ||
                                "Latest Blogs",

                            heading:
                                content.heading ||
                                latestBlogPage.title ||
                                "Insights, trend and updates from the solar industry",

                            description:
                                content.description ||
                                latestBlogPage.description ||
                                "Stay up to date with in-depth insights, emerging trends, and important updates from the solar industry. Our articles cover everything from new.",

                            button_text:
                                content.button_text ||
                                "View All Blogs",

                            button_link:
                                content.button_link ||
                                "/blog",

                            blogs:
                                Array.isArray(
                                    content.blogs
                                ) &&
                                    content.blogs.length > 0
                                    ? content.blogs
                                    : fallbackBlogs,
                        });
                    }
                }
            } catch (error) {
                console.error(
                    "Latest Blog fetch error:",
                    error
                );
            }
        };

        fetchLatestBlog();
    }, []);

    return (
        <section className="latest-blogs-section">
            <div className="latest-blogs-container">

                {/* =================================================
                    TOP CONTENT
                ================================================= */}

                <div className="latest-blogs-top">

                    {/* LEFT CONTENT */}

                    <div className="latest-blogs-heading-area">

                        <div className="latest-blogs-label">
                            <span></span>
                            {data.label}
                        </div>

                        <h2>
                            {data.heading}
                            <b>•</b>
                        </h2>

                    </div>

                    {/* RIGHT CONTENT */}

                    <div className="latest-blogs-description-area">

                        <p>
                            {data.description}
                        </p>

                        <a
                            href={data.button_link}
                            className="latest-blogs-button"
                        >
                            <span>
                                {data.button_text}
                            </span>

                            <strong>
                                ↗
                            </strong>
                        </a>

                    </div>

                </div>

                {/* =================================================
                    BLOG CARDS
                ================================================= */}

                <div className="latest-blogs-grid">

                    {data.blogs.map((blog, index) => {

                        const fallbackImage =
                            index === 0
                                ? a5
                                : index === 1
                                    ? a6
                                    : a7;

                        return (
                            <article
                                className="latest-blog-card"
                                key={
                                    blog.id ||
                                    index
                                }
                            >

                                <div className="latest-blog-image-wrap">

                                    {/* IMAGE */}

                                    <img
                                        src={
                                            blog.image ||
                                            fallbackImage
                                        }
                                        alt={
                                            blog.title ||
                                            "Solar Blog"
                                        }
                                        className="latest-blog-image"
                                    />

                                    {/* DARK OVERLAY */}

                                    <div className="latest-blog-overlay"></div>

                                    {/* CATEGORY */}

                                    <div className="latest-blog-category">
                                        {blog.category}
                                    </div>

                                    {/* CONTENT */}

                                    <div className="latest-blog-content">

                                        <h3>
                                            {blog.title}
                                        </h3>

                                        {/* BOTTOM */}

                                        <div className="latest-blog-bottom">

                                            <a
                                                href={
                                                    blog.link ||
                                                    "/blog"
                                                }
                                            >
                                                Read More
                                            </a>

                                            <div className="latest-blog-arrow">
                                                <span>
                                                    ↗
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default LatestBlogs;