import React, { useEffect, useState } from "react";
import "./Story.css";

import image4 from "../../assets/Solarimage/image4.png";

import { getPages } from "../../Api/api";

const DEFAULT_VIDEO =
    "https://www.youtube.com/embed/Y-x0efG1seA?autoplay=1";

const Story = () => {
    const [showVideo, setShowVideo] = useState(false);

    const [story, setStory] = useState({
        image: "",
        video: DEFAULT_VIDEO,
        play_button_text: "PLAY",
    });

    useEffect(() => {
        fetchStory();
    }, []);

    const fetchStory = async () => {
        try {
            const data = await getPages();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch Story"
                );
            }

            const storyPage = data.pages.find(
                (item) =>
                    item.page_name === "Home" &&
                    item.section_name === "Story"
            );

            if (!storyPage) {
                console.warn(
                    "Home Story section not found"
                );
                return;
            }

            setStory({
                image: storyPage.image || "",
                video:
                    storyPage.video ||
                    DEFAULT_VIDEO,
                play_button_text:
                    storyPage.content
                        ?.play_button_text ||
                    "PLAY",
            });
        } catch (error) {
            console.error(
                "Story fetch error:",
                error
            );
        }
    };

    const openVideo = () => {
        setShowVideo(true);
    };

    const closeVideo = () => {
        setShowVideo(false);
    };

    /*
     * If database image is empty,
     * use the original image4.
     */
    const backgroundImage =
        story.image || image4;

    return (
        <>
            <section className="story-section">
                {/* Background Image */}
                <img
                    src={backgroundImage}
                    alt="Solar energy team"
                    className="story-background"
                />

                {/* Dark Overlay */}
                <div className="story-overlay"></div>

                {/* Center Play Button */}
                <button
                    type="button"
                    className="story-play-btn"
                    onClick={openVideo}
                    aria-label="Play video"
                >
                    <span>
                        {story.play_button_text}
                    </span>
                </button>
            </section>

            {/* ================= VIDEO MODAL ================= */}

            {showVideo && (
                <div
                    className="story-video-modal"
                    onClick={closeVideo}
                >
                    <div
                        className="story-video-container"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            className="story-video-close"
                            onClick={closeVideo}
                            aria-label="Close video"
                        >
                            ×
                        </button>

                        {/* YouTube Video */}
                        <iframe
                            src={story.video}
                            title="Sunex Solar Story"
                            className="story-video-iframe"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default Story;