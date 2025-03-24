import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4, logoImage } from "../../vars/vars";
import VideoPlayer from "../VideoPlayer";

const HomeSection = () => {
  const controls = useAnimation();
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 767) {
        setXValues(["20vw", "27vw", "29vw"]);
        setYValues(["0px", "-40px", "-45px"]);
      } else {
        setXValues(["15vw", "17vw", "19vw"]);
        setYValues(["35vh", "25vh", "20vh"]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startLogoAnimation = () => {
    controls.start({
      x: xValues,
      y: yValues,
      transition: {
        delay: 1.4,
        duration: 1,
      },
    });
  };

  useEffect(() => {
    if (xValues.length && yValues.length) {
      startLogoAnimation();
    }
  }, [xValues, yValues]);

  return (
    <section
      id="home"
      className="h-[50vh] md:h-screen relative flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex-[1.5] w-full h-full">
          <VideoPlayer
            url={"./assets/videos/armMoveLeft.mp4"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              margin: "auto",
              left: "-30vw",
              top: "-10vh",
              zIndex: -1,
            }}
            playing={isVideoPlaying}
            onEnded={() => setIsVideoPlaying(false)}
          />
        </div>
        <motion.div
          className="absolute w-[30vw] md:w-[20vw] h-[20vw] z-[100]"
          initial={{ x: "15vw", y: "35vh", scale: 2 }}
          animate={controls}
          viewport={{ once: false }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="relative">
            <img
              src={logoImage}
              alt={"Teck Robot"}
              className="w-full h-full object-cover"
            />
            <p
              className="text-[8px] text-nowrap md:text-lg font-black text-center text-[var(--yellow-color)] absolute bottom-[10px] right-[25px] md:bottom-[4vh] 2xl:bottom-[5vh] md:right-[70px]"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {t("hero.title").split(":")[1].trim()}
            </p>
          </div>
        </motion.div>
        <div className="opacity-30 absolute top-10 right-[-30%] md:top-20 right-[-20%] md:right-[-15%] ">
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
