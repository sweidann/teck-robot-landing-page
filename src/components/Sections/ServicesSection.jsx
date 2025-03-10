import { motion , useAnimation , useInView} from "framer-motion";
import { useEffect , useRef } from "react";
import { sectionImage1,sectionImage2 , sectionImage3 , sectionImage4 } from "../../vars/vars";
import VideoPlayer from "../VideoPlayer";

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
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="w-1/2 flex justify-center"
      >
        <div className="w-[500px] h-[500px] border-secondary rounded-full">
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
      image: sectionImage1,
      description: "Project and feasibility studies",
    },
    {
      image: sectionImage2,
      description: "Hiring the Right Robot",
    },
    {
      image: sectionImage3,
      description: "Installation and integration",
    },
    {
      image: sectionImage4,
      description: "Technical Support and Maintenance",
    },
  ];

  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  // let hasPlayed = false;

  // const startTitleAnimation = () => {
  //   controls.start({
  //     x: ["0vw","-2vw" ,"-1vw" , "0vw" , "5vw" , "0vw" ],
  //     y: ["-25vh","-15vh", "-13vh" ,"-5vh" , "5vh" , "-8vh"],
  //     transition: { 
  //       delay: 0.6,
  //       duration: 2.1,
  //     },
  //   });
  // };

  useEffect(() => {
    if (isInView ) {
      controls.start({
        x: ["0vw","-2vw" ,"-1vw" , "0vw" , "5vw" , "0vw"],
        y: ["-25vh","-15vh", "-13vh" ,"-5vh" , "5vh" , "-8vh"],
        transition: { 
          delay: 0.6,
          duration: 2.0,
        },
      });

      
    }
  }, [isInView, controls]);

  return (
    <section id="services" ref={sectionRef} className="min-h-screen py-20 mt-[200px]">
      <div className="container mx-auto px-6 relative">
        <motion.h2
          className="text-4xl font-black text-center mb-16 text-white mr-[250px]"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          initial={{ x: "0vw", y: "-25vh"}}
          animate={controls}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
          <VideoPlayer 
            url={"./assets/videos/armMoveRight.mp4"} 
            style={{
              position: "absolute", 
              right: -150, 
              top: -350, 
              zIndex: -100
            }}
            playing={isInView } // Video will only play when in view
          />
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
