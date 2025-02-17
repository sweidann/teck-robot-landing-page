import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/assets/about-image.jpg"
              alt="About Us"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl font-black text-center mb-16 text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              About Us
            </h2>
            <p className="text-lg text-gray-600">
              Our mission is to revolutionize the industry through innovative
              solutions... [Your mission statement and description here]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
