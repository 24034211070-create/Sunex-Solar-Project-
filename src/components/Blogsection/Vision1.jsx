import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import "./Vision1.css";

import a5 from "../../assets/Main/a5.png";
import a6 from "../../assets/Main/a6.png";
import a7 from "../../assets/Main/a7.png";
import w1 from "../../assets/Blogimages/w1.png";
import w2 from "../../assets/Blogimages/w2.png";
import w3 from "../../assets/Blogimages/w3.png";

const API_URL = "http://localhost:5000/api";

const defaultBlogs = [
    {
        id: 1,
        image: a5,
        category: "Residential Solar",
        title: "A Complete Guide to Solar Energy for Homeowners",
        link: "/blogs",
    },
    {
        id: 2,
        image: a6,
        category: "Solar Benefits",
        title: "Top Benefits of Switching to Solar Power in 2026",
        link: "/blogs",
    },
    {
        id: 3,
        image: a7,
        category: "Installation Guide",
        title: "Solar Installation Process Explained Step by Step",
        link: "/blogs",
    },
    {
        id: 4,
        image: w1,
        category: "Solar Panels",
        title: "How Solar Panels Work: A Simple Guide for Homeowners",
        link: "/blogs",
    },
    {
        id: 5,
        image: w2,
        category: "Energy Solutions",
        title: "Residential vs Commercial Solar: Which Is Right for You?",
        link: "/blogs",
    },
    {
        id: 6,
        image: w3,
        category: "Solar Maintenance",
        title: "How to Maintain Your Solar System for Peak Performance",
        link: "/blogs",
    },
];

const Vision1 = () => {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [blogs, setBlogs] = useState(defaultBlogs);

    // =====================================================
    // LOAD BLOG POSTS FROM ADMIN CMS
    // =====================================================
    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/pages`
                );

                const pages = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.pages)
                        ? response.data.pages
                        : [];

                // IMPORTANT:
                // Admin Blog saves:
                // pageName = Blog
                // sectionName = Blog
                const blogPage = pages.find(
                    (page) =>
                        String(page.pageName || "")
                            .trim()
                            .toLowerCase() === "blog" &&
                        String(page.sectionName || "")
                            .trim()
                            .toLowerCase() === "blog"
                );

                if (!blogPage) {
                    console.log(
                        "BLOG CMS RECORD NOT FOUND"
                    );
                    return;
                }

                const content =
                    blogPage.content &&
                        typeof blogPage.content === "object"
                        ? blogPage.content
                        : {};

                // IMPORTANT:
                // Admin Blog uses content.posts
                const cmsPosts = Array.isArray(content.posts)
                    ? content.posts
                    : [];

                if (cmsPosts.length === 0) {
                    console.log(
                        "BLOG CMS POSTS NOT FOUND"
                    );
                    return;
                }

                // Merge CMS data with default images
                const updatedBlogs = cmsPosts.map(
                    (post, index) => {
                        const fallback =
                            defaultBlogs[index] ||
                            defaultBlogs[0];

                        return {
                            id:
                                post.id ||
                                fallback.id ||
                                index + 1,

                            image:
                                post.image ||
                                fallback.image,

                            category:
                                post.category ||
                                fallback.category,

                            title:
                                post.title ||
                                fallback.title,

                            link:
                                post.link ||
                                "/blogs",
                        };
                    }
                );

                setBlogs(updatedBlogs);

                console.log(
                    "BLOG POSTS LOADED FROM CMS:",
                    updatedBlogs
                );
            } catch (error) {
                console.error(
                    "BLOG POSTS LOAD ERROR:",
                    error
                );
            }
        };

        loadBlogs();
    }, []);

    // =====================================================
    // SCROLL ANIMATION
    // =====================================================
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`blog-section ${visible ? "blog-visible" : ""
                }`}
        >
            <div className="blog-container">
                <div className="blog-grid">
                    {blogs.map((blog, index) => (
                        <article
                            className="blog-card"
                            key={`${blog.id}-${index}`}
                            style={{
                                "--blog-delay": `${index * 0.12
                                    }s`,
                            }}
                        >
                            {/* IMAGE */}
                            <div className="blog-image-wrapper">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="blog-image"
                                />

                                <div className="blog-image-overlay"></div>

                                <div className="blog-category">
                                    {blog.category}
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="blog-card-content">
                                <h3>{blog.title}</h3>

                                <div className="blog-card-line"></div>

                                <a
                                    href={blog.link || "/blogs"}
                                    className="blog-read-more"
                                >
                                    <span>Read More</span>

                                    <span className="blog-arrow">
                                        <ArrowUpRight
                                            size={17}
                                            strokeWidth={2.2}
                                        />
                                    </span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision1;