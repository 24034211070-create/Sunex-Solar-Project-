import "./Topbar.css";

const Topbar = () => {
    return (
        <div className="top-navbar">
            <div className="top-navbar-content">

                <div className="offer-text">
                    <span className="offer-icon">🔥</span>
                    <span>Purchase Today & Enjoy UP TO 35% Off</span>
                </div>

                <div className="buy-now-wrapper">

                    <button className="buy-now-btn">
                        Buy Now
                    </button>

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