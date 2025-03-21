import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4 } from "../../vars/vars";
import { useEffect, useState } from "react";

const AboutSection = () => {
  const { t } = useLanguage();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Update state based on window width
      setIsMobile(window.innerWidth < 768); // Adjust 768px as needed
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="about" className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: isMobile ? -60 : 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="transform translate-x-[-100px] md:translate-x-[-200px]"
          >
            <GearsContainer
              gear2={gearImage2}
              gear3={gearImage3}
              gear4={gearImage4}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl md:text-5xl font-black text-left mb-8 md:mb-16 text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {t("about.title")}
            </h2>
            <p className="text-lg w-full md:leading-custom md:text-[40px] w-3/4 text-white font-black">
              {t("about.mission")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
