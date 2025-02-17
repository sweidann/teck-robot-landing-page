import { motion } from "framer-motion";

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
            <div className="gears-container relative w-[500px] h-[500px] mx-auto">
              <img
                src="./assets/images/Gear1.png"
                className="absolute top-[-50px] left-[-50px] z-[200]"
              />
              <img
                src="./assets/images/Gear2.png"
                className="absolute top-[40px] right-[-150px]"
              />
              <img
                src="./assets/images/Gear4.png"
                className="absolute bottom-[-100px] right-[-120px]"
              />
              <img
                src="./assets/images/Gear3.png"
                className="absolute bottom-[-150px] left-[80px] rotate-[60]"
              />
            </div>
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
