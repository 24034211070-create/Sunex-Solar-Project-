import React from 'react'
import Home1 from "../components/Hero/Home1";
import About from "../components/Home1/About";
import Services from "../components/Home1/Services";
import WhyChooseUs from "../components/Home1/WhyChooseUs";
import Story from "../components/Home1/Story";
import Pricing from "../components/Home1/Pricing";
import SolarFeature from "../components/Home1/SolarFeature";
import FunFact from "../components/Home1/FunFact";
import Work from "../components/Home1/Work";
import Faq from "../components/Home1/Faq"
import States from "../components/Home1/States"
import Testi from "../components/Home1/Testi";
import LatestBlog from "../components/Home1/LatestBlog";

const Home = () => {
    return (
        <>
            <Home1 />
            <About />
            <Services />
            <WhyChooseUs />
            <Story />
            <Pricing />
            <SolarFeature />
            <FunFact />
            <Work />
            <Faq />
            <States />
            <Testi />
            <LatestBlog />

        </>
    )
}   

export default Home
