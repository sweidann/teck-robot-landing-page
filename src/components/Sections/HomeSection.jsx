import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4, logoImage } from "../../vars/vars";
import VideoPlayer from "../VideoPlayer";

const HomeSection = () => {
  const controls = useAnimation();
  const { t } = useLanguage();

  const startLogoAnimation = () => {
    controls.start({
      x: ["15vw", "17vw", "19vw"],
      y: ["35vh", "25vh", "20vh"],
      transition: { 
        delay: 1.4, 
        duration: 1, 
      },
    });
  };

  useEffect(() => {
    startLogoAnimation();
  }, []);

  return (
    <section
      id="home"
      className="h-screen relative flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex-[1.5] w-full h-full">
          <VideoPlayer 
            url="./assets/videos/armMoveLeft.mp4"
            style={{ width: "100%",height : "100%" , position : "absolute" ,  margin: "auto" , left: "-30vw", top : "-10vh"}}
            controls 
            playing={true}
          />
        </div>
        <motion.div
          className="absolute w-[20vw] h-[20vw]"
          initial={{ x: "15vw", y: "35vh", scale: 2 }}
          animate={controls}
          viewport={{ once: false }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="relative">
            <img
              src={logoImage}
              alt={"Teck Robot"}
              className="w-full h-full object-cover"
            />
            <p
              className="text-l font-black text-center text-secondary absolute bottom-[4vh] 2xl:bottom-[5vh] right-[70px]"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {t("hero.title").split(":")[1].trim()}
            </p>
          </div>
        </motion.div>
        <div className="opacity-30 absolute top-20 right-[-15%]">
          <GearsContainer
            gear2={gearImage2}
            gear3={gearImage3}
            gear4={gearImage4}
            rotation={"rotate-[180deg]"}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
