import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";
import {
  sectionImage1,
  sectionImage2,
  sectionImage3,
  sectionImage4,
} from "../../vars/vars";
import VideoPlayer from "../VideoPlayer";

const ServiceItem = ({ image, description, isReversed }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-12 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="w-[280px] h-[280px] md:w-[500px] md:h-[500px] border-secondary rounded-full">
          <img
            src={image}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className={`w-full md:w-1/2 flex justify-center md:${
          isReversed ? "justify-end" : "justify-start"
        }`}
      >
        <p className="text-white text-[32px] md:text-[48px] font-black text-center md:text-left px-4 md:px-0">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

ServiceItem.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isReversed: PropTypes.bool.isRequired,
};

const ServicesSection = () => {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const services = [
    {
      image: sectionImage1,
      description: t("services.items.0"),
    },
    {
      image: sectionImage2,
      description: t("services.items.1"),
    },
    {
      image: sectionImage3,
      description: t("services.items.2"),
    },
    {
      image: sectionImage4,
      description: t("services.items.3"),
    },
  ];

  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1536) {
        setXValues(["10vw", "8vw", "9vw", "10vw", "15vw", "10vw"]);
        setYValues(["10vh", "16vh", "24vh", "34vh", "34vh", "26vh"]);
      } else {
        setXValues(["-2vw", "-4vw", "-3vw", "-2vw", "3vw", "-2vw"]);
        setYValues(["15vh", "25vh", "30vh", "40vh", "50vh", "32vh"]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isInView) {
      setIsVideoPlaying(true);
      controls.start({
        x: xValues,
        y: yValues,
        transition: {
          delay: 0.6,
          duration: 1.9,
        },
      });
    }
  }, [isInView, controls, xValues, yValues]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen py-10 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6 relative flex flex-col">
        <div className="flex items-center justify-start flex absolute top-[30vh] md:top-[40vh] w-full md:w-auto">
          <h2
            className="text-4xl md:text-5xl font-black text-center ml-10 text-white md:ml-[10vw]"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {t("services.title")}
          </h2>
        </div>
        <VideoPlayer
          url={"./assets/videos/armMoveRight.mp4" + "#t=0.1"}
          style={{
            position: "absolute",
            right: -150,
            top: -50,
            zIndex: -1,
            pointerEvents: "none",
          }}
          playing={isVideoPlaying}
          onEnded={() => setIsVideoPlaying(false)}
        />
        <div className="space-y-20 md:space-y-40 mt-[40vh] md:mt-[80vh]">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              {...service}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
