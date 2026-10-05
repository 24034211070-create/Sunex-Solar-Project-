import React, { useEffect, useState } from "react";
import "./About.css";

import q1 from "../../assets/Aboutimages/q1.png";
import api from "../../Api/axios";

import About from "../Home1/About";
import Approach from "./Approach";
import WhyChooseUs from "../Home1/WhyChooseUs";
import WhatWeDo from "./WhatWeDo";
import Advantage from "./Advantage";
import SolarFeature from "../Home1/SolarFeature";
import ExpertTeam from "./ExpertTeam";
import Testi from "../Home1/Testi";
import Faq from "../Home1/Faq";
import Stats from "../Home1/States";

const AboutHero = () => {
  const [hero, setHero] = useState({
    title: "About Us",
    image: "",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About Us",
  });

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const response = await api.get("/pages");

      const pages = response.data?.pages || [];

      console.log("ABOUT US ALL PAGES:", pages);

      const aboutHeroPages = pages.filter((page) => {
        const pageName =
          page.pageName || page.page_name;

        const sectionName =
          page.sectionName || page.section_name;

        return (
          String(pageName).trim().toLowerCase() ===
          "about us" &&
          String(sectionName).trim().toLowerCase() ===
          "hero"
        );
      });

      console.log(
        "ABOUT US HERO RECORDS:",
        aboutHeroPages
      );

      if (aboutHeroPages.length === 0) {
        console.log(
          "ABOUT US HERO RECORD NOT FOUND"
        );
        return;
      }

      // Latest record use karo
      const aboutHero =
        aboutHeroPages[aboutHeroPages.length - 1];

      console.log(
        "ABOUT US LATEST HERO:",
        aboutHero
      );

      const content = aboutHero.content || {};

      setHero({
        title: aboutHero.title || "About Us",

        image: aboutHero.image || "",

        breadcrumbHome:
          content.breadcrumb_home ||
          "Home",

        breadcrumbCurrent:
          content.breadcrumb_current ||
          "About Us",
      });
    } catch (error) {
      console.error(
        "ABOUT US HERO LOAD ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const heroBackground = hero.image || q1;

  return (
    <main>
      <section
        className="about-hero"
        style={{
          backgroundImage: `url("${heroBackground}")`,
        }}
      >
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <div className="about-title-wrap">
            <h1>{hero.title}</h1>
          </div>

          <div className="about-line"></div>

          <div className="about-breadcrumb-wrap">
            <p>
              <span>
                {hero.breadcrumbHome}
              </span>

              <b>/</b>

              <span>
                {hero.breadcrumbCurrent}
              </span>
            </p>
          </div>
        </div>
      </section>

      <About />
      <Approach />
      <WhyChooseUs />
      <WhatWeDo />
      <Advantage />
      <SolarFeature />
      <ExpertTeam />
      <Testi />
      <Faq />
      <Stats />
    </main>
  );
};

export default AboutHero;