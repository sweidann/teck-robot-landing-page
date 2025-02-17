import { motion } from "framer-motion";

const ServiceItem = ({ image, description, isReversed }) => {
  return (
    <div
      className={`flex items-center gap-12 ${
        isReversed ? "flex-row-reverse" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-1/2 flex justify-center"
      >
        <div className="w-[400px] h-[400px] border-secondary rounded-full">
          <img
            src={image}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`w-1/2 flex  ${
          isReversed ? "justify-end" : "justify-start"
        }`}
      >
        <p className="text-white text-[48px] font-black ">{description}</p>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      image: "/assets/images/Projects Studies.png",
      description: "Project and feasibility studies",
    },
    {
      image: "/assets/images/Right Robot.png",
      description: "Hiring the Right Robot",
    },
    {
      image: "/assets/images/Installation.png",
      description: "Installation and integration",
    },
    {
      image: "/assets/images/Maintenance.png",
      description: "Technical Support and Maintenance",
    },
  ];

  return (
    <section id="services" className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <h2
          className="text-4xl font-black text-center mb-16 text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Our Services
        </h2>
        <div className="space-y-24">
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
