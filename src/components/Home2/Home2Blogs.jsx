import React from "react";
import "./Home2Blogs.css";

import a5 from "../../assets/Main/a5.png";
import a6 from "../../assets/Main/a6.png";
import a7 from "../../assets/Main/a7.png";

const blogs = [
    {
        id: 1,
        image: a5,
        category: "Residential Solar",
        title: "A Complete Guide to Solar Energy for Homeowners",
    },
    {
        id: 2,
        image: a6,
        category: "Solar Benefits",
        title: "Top Benefits of Switching to Solar Power in 2026",
    },
    {
        id: 3,
        image: a7,
        category: "Installation Guide",
        title: "Solar Installation Process Explained Step by Step",
    },
];

const LatestBlogs = () => {
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
                            Latest Blogs
                        </div>

                        <h2>
                            Insights, trend and updates
                            <br />
                            from the solar industry
                            <b>•</b>
                        </h2>

                    </div>


                    {/* RIGHT CONTENT */}
                    <div className="latest-blogs-description-area">

                        <p>
                            Stay up to date with in-depth insights, emerging trends,
                            and important updates from the solar industry. Our articles
                            cover everything from new.
                        </p>

                        <button
                            type="button"
                            className="latest-blogs-button"
                        >
                            <span>
                                View All Blogs
                            </span>

                            <strong>
                                ↗
                            </strong>
                        </button>

                    </div>

                </div>


                {/* =================================================
            BLOG CARDS
        ================================================= */}

                <div className="latest-blogs-grid">

                    {blogs.map((blog) => (

                        <article
                            className="latest-blog-card"
                            key={blog.id}
                        >

                            <div className="latest-blog-image-wrap">

                                {/* IMAGE */}

                                <img
                                    src={blog.image}
                                    alt={blog.title}
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

                                        <span>
                                            Read More
                                        </span>

                                        <div className="latest-blog-arrow">
                                            <span>↗</span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default LatestBlogs;