import React, { useEffect, useRef, useState } from "react";
import {
    Sun,
    PanelsTopLeft,
    Users
} from "lucide-react";
import "./States.css";

import { getPages } from "../../Api/api";

const iconMap = {
    Sun,
    PanelsTopLeft,
    Users
};

const fallbackStats = [
    {
        id: 1,
        value: 25,
        suffix: "MW+",
        label: "Installed Capacity",
        icon: "Sun"
    },
    {
        id: 2,
        value: 15000,
        suffix: "+",
        label: "Solar Panels Deployed",
        icon: "PanelsTopLeft"
    },
    {
        id: 3,
        value: 7500,
        suffix: "+",
        label: "Happy Satisfied Customers",
        icon: "Users"
    }
];

const Counter = ({ value, suffix, start }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        const duration = 1800;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                Number(value) * easedProgress
            );

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                setCount(Number(value));
            }
        };

        requestAnimationFrame(updateCounter);
    }, [start, value]);

    return (
        <span className="stat-number">
            {count}
            {suffix}
        </span>
    );
};

const Stats = () => {
    const [statsData, setStatsData] =
        useState(fallbackStats);

    const [started, setStarted] = useState(false);

    const statsRef = useRef(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const data = await getPages();

                if (
                    !data.success ||
                    !Array.isArray(data.pages)
                ) {
                    return;
                }

                const statesPage = data.pages.find(
                    (page) =>
                        page.page_name === "Home" &&
                        page.section_name === "States"
                );

                if (!statesPage) {
                    return;
                }

                const content =
                    statesPage.content &&
                        typeof statesPage.content === "object"
                        ? statesPage.content
                        : {};

                if (
                    Array.isArray(content.stats) &&
                    content.stats.length > 0
                ) {
                    setStatsData(content.stats);
                }
            } catch (error) {
                console.error(
                    "States fetch error:",
                    error
                );
            }
        };

        fetchStates();
    }, []);

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setStarted(true);

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.3
                }
            );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () =>
            observer.disconnect();
    }, []);

    return (
        <section
            className={`stats-section ${started ? "stats-started" : ""
                }`}
            ref={statsRef}
        >
            <div className="stats-container">

                {statsData.map((stat, index) => {
                    const Icon =
                        iconMap[stat.icon] || Sun;

                    return (
                        <React.Fragment
                            key={
                                stat.id ||
                                stat.label ||
                                index
                            }
                        >
                            <div
                                className={`stat-item stat-item-${index + 1
                                    }`}
                            >
                                <div className="stat-icon">
                                    <Icon
                                        size={25}
                                        strokeWidth={1.7}
                                    />
                                </div>

                                <div className="stat-content">

                                    <Counter
                                        value={
                                            Number(
                                                stat.value
                                            ) || 0
                                        }
                                        suffix={
                                            stat.suffix ||
                                            ""
                                        }
                                        start={started}
                                    />

                                    <span className="stat-label">
                                        {stat.label}
                                    </span>

                                </div>
                            </div>

                            {index <
                                statsData.length - 1 && (
                                    <div className="stat-divider"></div>
                                )}
                        </React.Fragment>
                    );
                })}

            </div>
        </section>
    );
};

export default Stats;