import { motion } from "framer-motion";
import GearsContainer from "../GearsContainer";

const AboutSection = () => {
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
              gear2={"./assets/images/Gear2.png"}
              gear3={"./assets/images/Gear3.png"}
              gear4={"./assets/images/Gear4.png"}
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
              About Us
            </h2>
            <p className="text-[40px] w-3/4 text-white font-black">
              Our Mission is to assist you towards the robotization of your
              projects.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
