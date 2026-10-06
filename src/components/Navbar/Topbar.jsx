import { useEffect, useState } from "react";
import "./Topbar.css";
import { getPages } from "../../Api/api";

const Topbar = () => {
    const [topbar, setTopbar] = useState({
        offerText: "Purchase Today & Enjoy UP TO 35% Off",
        buttonText: "Buy Now",
        buttonLink: "#",
    });

    useEffect(() => {
        const loadTopbar = async () => {
            try {
                const pages = await getPages();

                const data = pages.find(
                    (page) =>
                        page.page_name?.trim().toLowerCase() === "topbar" &&
                        page.section_name?.trim().toLowerCase() === "topbar"
                );

                if (data?.content) {
                    setTopbar({
                        offerText:
                            data.content.offerText ||
                            "Purchase Today & Enjoy UP TO 35% Off",

                        buttonText:
                            data.content.buttonText ||
                            "Buy Now",

                        buttonLink:
                            data.content.buttonLink ||
                            "#",
                    });
                }
            } catch (error) {
                console.error("Topbar load error:", error);
            }
        };

        loadTopbar();
    }, []);

    return (
        <div className="top-navbar">
            <div className="top-navbar-content">

                <div className="offer-text">
                    <span className="offer-icon">🔥</span>

                    <span>
                        {topbar.offerText}
                    </span>
                </div>

                <div className="buy-now-wrapper">

                    <a
                        href={topbar.buttonLink}
                        className="buy-now-btn"
                    >
                        {topbar.buttonText}
                    </a>

                    <div className="animated-arrow">
                        <img
                            src="https://demo.awaikenthemes.com/assets/js/right-arrow.gif"
                            alt="arrow"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Topbar;
