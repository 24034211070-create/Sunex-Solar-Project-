import React, { useEffect, useRef, useState } from "react";
import { ClipboardList, Globe2, Star } from "lucide-react";
import "./Advantage.css";

import q5 from "../../assets/Aboutimages/q5.png";
import q6 from "../../assets/Aboutimages/q6.png";

import api from "../../Api/axios";

const Advantage = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    label: "Our Advantages",

    titlePart1: "Smart solar benefits designed to",
    titlePart2: "deliver performance,",
    titlePart3: "saving, &",
    titlePart4: "long term reliability",

    titleImage: "",

    leftNumber: "24*7",
    leftLabel: "Support Availability",
    leftDescription:
      "Dedicated service team to ensure smooth operation and quick assistance whenever needed.",

    centerImage: "",

    rightNumber: "2000+",
    rightLabel: "Projects Completed",
    rightDescription:
      "Successfully installed solar systems across residential, commercial, and industrial areas.",

    pills: [
      "Renewable Energy",
      "Residential Solar",
      "Sustainable Energy",
      "Solar Battery Storage",
    ],

    reviewRating: "4.9/5",
    reviewCount: "Over 4200 Reviews",
  });

  // =====================================================
  // LOAD ADVANTAGE DATA FROM API
  // =====================================================

  useEffect(() => {
    const loadAdvantage = async () => {
      try {
        const response = await api.get("/pages");

        console.log(
          "ABOUT US ADVANTAGE WEBSITE - API:",
          response.data
        );

        const pages = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.pages)
            ? response.data.pages
            : [];

        const matchingPages = pages.filter(
          (page) =>
            String(page.pageName || "")
              .trim()
              .toLowerCase() === "about us" &&
            String(page.sectionName || "")
              .trim()
              .toLowerCase() === "advantage"
        );

        console.log(
          "ABOUT US ADVANTAGE WEBSITE - MATCHING:",
          matchingPages
        );

        if (matchingPages.length === 0) {
          console.log(
            "ABOUT US ADVANTAGE WEBSITE - NO DATA FOUND"
          );
          return;
        }

        // Latest record
        const page = matchingPages.reduce((latest, current) =>
          Number(current.id) > Number(latest.id)
            ? current
            : latest
        );

        console.log(
          "ABOUT US ADVANTAGE WEBSITE - FOUND:",
          page
        );

        const content = page.content || {};

        // -------------------------------------------------
        // OLD TITLE SUPPORT
        // -------------------------------------------------
        // Agar database me pehle se title field saved hai
        // to usko bhi support karenge.

        let titlePart1 = "Smart solar benefits designed to";
        let titlePart2 = "deliver performance,";
        let titlePart3 = "saving, &";
        let titlePart4 = "long term reliability";

        if (content.title_part1) {
          titlePart1 = content.title_part1;
        }

        if (content.title_part2) {
          titlePart2 = content.title_part2;
        }

        if (content.title_part3) {
          titlePart3 = content.title_part3;
        }

        if (content.title_part4) {
          titlePart4 = content.title_part4;
        }

        // Agar sirf old single title available hai
        // to usko first line ke form me fallback karenge.
        if (
          content.title &&
          !content.title_part1 &&
          !content.title_part2 &&
          !content.title_part3 &&
          !content.title_part4
        ) {
          titlePart1 = content.title;
          titlePart2 = "";
          titlePart3 = "";
          titlePart4 = "";
        }

        setData({
          label:
            content.label ||
            page.label ||
            "Our Advantages",

          titlePart1,
          titlePart2,
          titlePart3,
          titlePart4,

          titleImage:
            content.title_image ||
            "",

          leftNumber:
            content.left_number ||
            "24*7",

          leftLabel:
            content.left_label ||
            "Support Availability",

          leftDescription:
            content.left_description ||
            "Dedicated service team to ensure smooth operation and quick assistance whenever needed.",

          centerImage:
            content.center_image ||
            page.image ||
            "",

          rightNumber:
            content.right_number ||
            "2000+",

          rightLabel:
            content.right_label ||
            "Projects Completed",

          rightDescription:
            content.right_description ||
            "Successfully installed solar systems across residential, commercial, and industrial areas.",

          pills:
            Array.isArray(content.pills) &&
              content.pills.length > 0
              ? content.pills
              : [
                "Renewable Energy",
                "Residential Solar",
                "Sustainable Energy",
                "Solar Battery Storage",
              ],

          reviewRating:
            content.review_rating ||
            "4.9/5",

          reviewCount:
            content.review_count ||
            "Over 4200 Reviews",
        });
      } catch (error) {
        console.error(
          "ABOUT US ADVANTAGE WEBSITE LOAD ERROR:",
          error
        );
      }
    };

    loadAdvantage();
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

  // =====================================================
  // FALLBACK IMAGES
  // =====================================================

  const titleImage = data.titleImage || q5;
  const centerImage = data.centerImage || q6;

  // =====================================================
  // JSX
  // =====================================================

  return (
    <section
      ref={sectionRef}
      className={`advantage-section ${visible ? "is-visible" : ""
        }`}
    >
      <div className="advantage-container">

        {/* =================================================
            TOP HEADING
        ================================================= */}

        <div className="advantage-heading">

          {/* BADGE */}

          <div className="advantage-badge reveal-text">
            <span></span>
            {data.label}
          </div>

          {/* TITLE */}

          <h2 className="advantage-title">

            {/* LINE 1 */}

            {data.titlePart1 && (
              <span className="title-row">
                {data.titlePart1}
              </span>
            )}

            {/* LINE 2 + IMAGE */}

            {(data.titlePart2 ||
              data.titleImage ||
              data.titlePart3) && (
                <span className="title-row">

                  {data.titlePart2}

                  {/* INLINE IMAGE */}

                  <span className="title-inline-image">
                    <img
                      src={titleImage}
                      alt="Solar benefits"
                    />
                  </span>

                  {data.titlePart3}

                </span>
              )}

            {/* LINE 3 */}

            {data.titlePart4 && (
              <span className="title-row">
                {data.titlePart4}
              </span>
            )}

          </h2>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="advantage-main">

          {/* =================================================
              LEFT CARD
          ================================================= */}

          <div className="advantage-card left-card reveal-card">

            <div className="advantage-icon">
              <ClipboardList
                size={25}
                strokeWidth={1.7}
              />
            </div>

            <div className="advantage-content">

              <h3>
                {data.leftNumber}
              </h3>

              <p className="advantage-card-label">
                {data.leftLabel}
              </p>

              <div className="card-divider"></div>

              <p className="advantage-description">
                {data.leftDescription}
              </p>

            </div>
          </div>

          {/* =================================================
              CENTER IMAGE
          ================================================= */}

          <div className="advantage-center-image reveal-image">

            <img
              src={centerImage}
              alt="Solar team"
            />

            <span className="image-green-dot"></span>

          </div>

          {/* =================================================
              RIGHT CARD
          ================================================= */}

          <div className="advantage-card right-card reveal-card">

            <div className="advantage-icon">
              <Globe2
                size={25}
                strokeWidth={1.7}
              />
            </div>

            <div className="advantage-content">

              <h3>
                {data.rightNumber}
              </h3>

              <p className="advantage-card-label">
                {data.rightLabel}
              </p>

              <div className="card-divider"></div>

              <p className="advantage-description">
                {data.rightDescription}
              </p>

            </div>
          </div>

        </div>

        {/* =================================================
            BOTTOM PILLS
        ================================================= */}

        <div className="advantage-pills reveal-bottom">

          {data.pills.map((pill, index) => (
            <div
              className="advantage-pill"
              key={`${pill}-${index}`}
            >
              <span></span>
              {pill}
            </div>
          ))}

        </div>

        {/* =================================================
            REVIEW
        ================================================= */}

        <div className="advantage-review reveal-bottom">

          <span className="review-rating">
            {data.reviewRating}
          </span>

          <div className="review-stars">

            <Star
              size={18}
              fill="currentColor"
            />

            <Star
              size={18}
              fill="currentColor"
            />

            <Star
              size={18}
              fill="currentColor"
            />

            <Star
              size={18}
              fill="currentColor"
            />

            <Star
              size={18}
              fill="currentColor"
            />

          </div>

          <span className="review-count">
            {data.reviewCount}
          </span>

        </div>

      </div>
    </section>
  );
};

export default Advantage;