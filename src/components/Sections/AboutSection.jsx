import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4 } from "../../vars/vars";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
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
              className="text-4xl font-black text-left mb-16 text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {t("about.title")}
            </h2>
            <p className="text-[40px] w-3/4 text-white font-black">
              {t("about.mission")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
