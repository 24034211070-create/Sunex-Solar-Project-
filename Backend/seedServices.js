const axios = require("axios");

const API = "http://localhost:5000/api/pages";

const commonFaq = [
  {
    question: "Is solar energy suitable for my home or business?",
    answer:
      "Our solar specialists can provide detailed information based on your property, energy usage, system size and requirements. Contact our team for a personalized answer.",
  },
  {
    question: "What happens if I generate more power than I use?",
    answer:
      "Excess solar energy can be stored or managed through suitable solar system solutions. Our team can recommend the right option based on your energy requirements.",
  },
  {
    question: "Are there government subsidies or incentives available?",
    answer:
      "Available subsidies and incentives depend on your location and current government policies. Contact our team for the latest information applicable to your project.",
  },
  {
    question: "What maintenance does a solar system require?",
    answer:
      "Solar systems generally require periodic inspection, cleaning and performance monitoring to maintain reliable and efficient operation.",
  },
  {
    question: "Does solar work during cloudy days or at night?",
    answer:
      "Solar panels can still generate electricity during cloudy weather, although production may be lower. Battery storage can provide energy when solar generation is unavailable.",
  },
];

const services = [
  {
    serviceSlug: "residential-solar-solutions",
    name: "Residential Solar Solutions",
    image: "/src/assets/Heroimages/m2.jpg",
    middleImage: "/src/assets/Servicesimages/p4.jpg",

    intro: [
      "Residential Solar Solutions help homeowners generate clean electricity directly from their own property while reducing dependence on traditional grid power.",
      "Our residential solar systems are designed according to your home's energy consumption, available roof space and long-term energy goals.",
      "Switch to clean solar energy and take greater control of your home's electricity costs with a reliable residential solar solution.",
    ],

    whatWeOffer:
      "We provide complete residential solar solutions including system planning, panel selection, installation, monitoring and ongoing support.",

    whatItems: [
      "Customized solar systems for homes",
      "High-efficiency solar panels",
      "Professional installation and setup",
      "Smart energy monitoring",
    ],

    keyBenefits:
      "Our residential solar systems help homeowners generate clean energy, reduce electricity expenses and increase energy independence.",

    benefits: [
      {
        title: "Lower Electricity Bills",
        description:
          "Generate your own electricity and reduce your dependence on grid power.",
      },
      {
        title: "Clean & Renewable Energy",
        description:
          "Use clean solar power and reduce your home's environmental impact.",
      },
      {
        title: "Long-Term Energy Savings",
        description:
          "A properly designed solar system can provide reliable energy savings for many years.",
      },
    ],

    features: [
      {
        title: "Custom Home Solar Design",
        description:
          "Solar systems are designed around your home's energy consumption and available space.",
      },
      {
        title: "Smart Energy Monitoring",
        description:
          "Monitor your solar production and energy usage with modern monitoring solutions.",
      },
      {
        title: "Professional Installation",
        description:
          "Our installation process focuses on reliable setup and efficient system performance.",
      },
    ],

    ctaHeading: "Power your home with clean solar energy.",
    ctaDescription:
      "Discover a smarter and cleaner way to generate electricity for your home.",
  },

  {
    serviceSlug: "solar-system-maintenance",
    name: "Solar System Maintenance",
    image: "/src/assets/Heroimages/m3.jpg",
    middleImage: "/src/assets/Servicesimages/p4.jpg",

    intro: [
      "Solar System Maintenance helps keep your solar installation operating safely and efficiently throughout its service life.",
      "Regular inspection and maintenance can help identify performance issues, dirt accumulation, damaged components and other system problems.",
      "Our maintenance solutions are designed to keep your solar investment performing reliably year after year.",
    ],

    whatWeOffer:
      "We provide professional solar maintenance services including system inspection, cleaning, performance checks and troubleshooting.",

    whatItems: [
      "Solar panel inspection and cleaning",
      "System performance monitoring",
      "Electrical connection checks",
      "Fault detection and troubleshooting",
    ],

    keyBenefits:
      "Regular solar maintenance helps maintain system efficiency, identify problems early and extend the useful life of your solar equipment.",

    benefits: [
      {
        title: "Better System Performance",
        description:
          "Regular maintenance helps your solar panels and equipment operate efficiently.",
      },
      {
        title: "Early Problem Detection",
        description:
          "Routine inspections can identify potential issues before they become major problems.",
      },
      {
        title: "Longer Equipment Life",
        description:
          "Proper maintenance helps protect your solar investment and equipment over time.",
      },
    ],

    features: [
      {
        title: "Professional Inspection",
        description:
          "Important system components are inspected to identify potential performance issues.",
      },
      {
        title: "Panel Cleaning",
        description:
          "Cleaning helps remove dust and dirt that can reduce solar panel performance.",
      },
      {
        title: "Performance Checks",
        description:
          "System output and performance can be monitored to ensure the installation is working correctly.",
      },
    ],

    ctaHeading: "Keep your solar system performing at its best.",
    ctaDescription:
      "Give your solar investment the care it needs with professional maintenance.",
  },

  {
    serviceSlug: "rooftop-solar-solutions",
    name: "Rooftop Solar Solutions",
    image: "/src/assets/Servicesimages/p1.jpg",
    middleImage: "/src/assets/Servicesimages/p4.jpg",

    intro: [
      "Rooftop Solar Solutions transform unused roof space into a clean and productive source of renewable electricity.",
      "Our rooftop solar systems are planned according to roof structure, available space, energy requirements and installation conditions.",
      "Make better use of your rooftop and generate clean electricity for your home or business.",
    ],

    whatWeOffer:
      "We provide complete rooftop solar solutions from site assessment and system design to installation, monitoring and support.",

    whatItems: [
      "Rooftop site assessment",
      "Customized solar system design",
      "Professional rooftop installation",
      "Solar monitoring and support",
    ],

    keyBenefits:
      "Rooftop solar allows you to use available roof space to generate clean electricity while reducing dependence on conventional energy sources.",

    benefits: [
      {
        title: "Use Your Rooftop Space",
        description:
          "Turn unused rooftop space into a productive clean-energy source.",
      },
      {
        title: "Reduce Grid Dependence",
        description:
          "Generate electricity on-site and reduce your reliance on conventional grid power.",
      },
      {
        title: "Clean Energy Generation",
        description: "Produce renewable electricity directly from sunlight.",
      },
    ],

    features: [
      {
        title: "Rooftop Assessment",
        description:
          "We evaluate available roof space and installation conditions before system planning.",
      },
      {
        title: "Efficient Panel Layout",
        description:
          "Solar panels are arranged to make effective use of the available rooftop area.",
      },
      {
        title: "Complete Installation",
        description:
          "Our team handles the complete rooftop solar installation process.",
      },
    ],

    ctaHeading: "Turn your rooftop into a source of clean energy.",
    ctaDescription:
      "Make your unused rooftop space work for you with a reliable solar solution.",
  },

  {
    serviceSlug: "solar-panel-maintenance",
    name: "Solar Panel Maintenance",
    image: "/src/assets/Servicesimages/p2.jpg",
    middleImage: "/src/assets/Servicesimages/p4.jpg",

    intro: [
      "Solar Panel Maintenance keeps your panels clean, inspected and operating efficiently throughout the year.",
      "Dust, dirt and environmental conditions can affect solar panel performance. Regular maintenance helps keep your panels operating at their expected efficiency.",
      "Our team provides practical maintenance support to protect your solar investment and maintain consistent energy production.",
    ],

    whatWeOffer:
      "We provide solar panel inspection, cleaning, condition checks and performance monitoring services.",

    whatItems: [
      "Professional panel cleaning",
      "Panel condition inspection",
      "Performance monitoring",
      "Maintenance support",
    ],

    keyBenefits:
      "Regular panel maintenance helps maintain clean surfaces, reliable energy production and long-term solar system performance.",

    benefits: [
      {
        title: "Maintain Panel Efficiency",
        description:
          "Clean and properly maintained panels can operate more effectively.",
      },
      {
        title: "Protect Your Investment",
        description:
          "Regular checks help identify panel or connection issues at an early stage.",
      },
      {
        title: "Consistent Energy Production",
        description:
          "Proper maintenance supports reliable solar energy generation.",
      },
    ],

    features: [
      {
        title: "Panel Cleaning",
        description: "Remove accumulated dust and dirt from panel surfaces.",
      },
      {
        title: "Visual Inspection",
        description:
          "Check panels and visible components for signs of damage or wear.",
      },
      {
        title: "Performance Monitoring",
        description:
          "Review system output to identify unusual performance changes.",
      },
    ],

    ctaHeading: "Keep your solar panels clean and efficient.",
    ctaDescription:
      "Protect your solar investment with regular professional panel maintenance.",
  },

  {
    serviceSlug: "hybrid-solar-systems",
    name: "Hybrid Solar Systems",
    image: "/src/assets/Servicesimages/p3.jpg",
    middleImage: "/src/assets/Servicesimages/p4.jpg",

    intro: [
      "Hybrid Solar Systems combine solar generation with battery storage to provide flexible and reliable energy management.",
      "The system can store excess solar electricity and make it available when solar generation is low or when additional energy is required.",
      "With smart energy management and battery storage, hybrid solar systems can provide greater control over how your energy is generated, stored and used.",
    ],

    whatWeOffer:
      "We provide hybrid solar solutions combining solar panels, smart inverters and battery storage according to your energy requirements.",

    whatItems: [
      "Solar panel and battery integration",
      "Smart hybrid inverter solutions",
      "Backup energy capability",
      "Intelligent energy management",
    ],

    keyBenefits:
      "Hybrid solar systems provide greater flexibility by combining renewable solar generation with energy storage and smart power management.",

    benefits: [
      {
        title: "Energy Storage",
        description: "Store excess solar electricity and use it when required.",
      },
      {
        title: "Backup Power",
        description:
          "Battery storage can provide backup electricity when grid power is unavailable.",
      },
      {
        title: "Smarter Energy Management",
        description:
          "Manage solar generation, battery storage and energy consumption more efficiently.",
      },
    ],

    features: [
      {
        title: "Solar + Battery Integration",
        description:
          "Combine solar generation with battery storage in one integrated system.",
      },
      {
        title: "Smart Hybrid Inverter",
        description:
          "Manage energy flow between solar panels, batteries, loads and the grid.",
      },
      {
        title: "Backup Energy",
        description:
          "Use stored energy when solar generation or grid electricity is unavailable.",
      },
    ],

    ctaHeading: "Take control of your energy with a hybrid solar system.",
    ctaDescription:
      "Generate, store and manage your clean energy with a smarter solar solution.",
  },
];

async function seedServices() {
  try {
    console.log("Starting Services Inner CMS seed...");

    for (const service of services) {
      const content = {
        serviceSlug: service.serviceSlug,

        hero: {
          title: service.name,
          image: service.image,
        },

        intro: {
          image: service.image,
          paragraphs: service.intro,
        },

        whatWeOffer: {
          heading: "What we offer",
          description: service.whatWeOffer,
          items: service.whatItems,
        },

        middleImage: service.middleImage,

        keyBenefits: {
          heading: "Our key benefits",
          description: service.keyBenefits,
        },

        benefits: {
          image: service.image,
          items: service.benefits,
        },

        features: service.features,

        faq: {
          heading: "Frequently Asked Questions",
          description:
            "This section is designed to help you understand the process, clear your doubts, and make confident decisions about switching to clean, reliable solar power.",
          items: commonFaq,
        },

        cta: {
          badge: "GO SOLAR",
          heading: service.ctaHeading,
          description: service.ctaDescription,
          buttonText: "Get Started",
          buttonLink: "#contact",
        },
      };

      const payload = {
        page_name: "Services Inner",
        section_name: service.name,
        title: service.name,
        description: service.intro[0],
        image: service.image,
        content,
      };

      console.log(`Creating: ${service.name}`);

      const response = await axios.post(API, payload);

      console.log(
        `✓ ${service.name} created successfully | ID: ${response.data?.id || "created"}`,
      );
    }

    console.log("\n====================================");
    console.log("All Services Inner pages created!");
    console.log("====================================");
  } catch (error) {
    console.error("\n❌ Seed failed.");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

seedServices();
