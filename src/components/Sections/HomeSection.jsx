import { motion, useAnimation , useScroll , useTransform} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4, homeArmImage, logoImage } from "../../vars/vars";
import VideoPlayer from "../VideoPlayer";

const HomeSection = () => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  // Create responsive values based on viewport width
  const xRange = useTransform(
    scrollYProgress,
    [0, 1],
    ["20vw", "30vw"] // Using viewport width units
  );

  const yRange = useTransform(
    scrollYProgress,
    [0, 1],
    ["30vh", "15vh"] // Using viewport height units
  );

  console.log(yRange);

  const startLogoAnimation = () => {
    controls.start({
      x: ["15vw" , "17vw" , "19vw"],
      y: ["35vh" , "25vh" , "20vh"],
      transition: { 
        delay: 1.4, 
        duration: 1, 
        // ease: "easeInOut" 
      },
    });
  };

  useEffect(() => {
    startLogoAnimation();
  }, []);

  // Function to play the audio after user interaction
  const handlePlaySound = () => {
    if (audio) {
      audio.pause(); // Stop any currently playing sound
      audio.currentTime = 0; // Reset sound to start
      audio.play().catch((error) => console.log("Audio play failed:", error));
    }
  };

  return (
    <section
      id="home"
      className="h-screen relative flex items-center justify-center"
    >
      {/* Container with relative positioning */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Logo (Positioned in front of the mech arm) */}
        <div
          className="flex-[1.5] w-full h-full"
        >
          <VideoPlayer 
            url="./assets/videos/armMoveLeft.mp4" // Ensure it's placed in the 'public/assets/videos' folder
            style={{ width: "100%",height : "100%" , position : "absolute" ,  margin: "auto" , left: "-30vw", top : "-10vh"}}
            controls 
            playing={true} // Set to true if you want autoplay
          />
        </div>
        <motion.div
          className="absolute w-[20vw] h-[20vw] " // Overlay on top of Canvas
          initial={{ x: "15vw", y: "35vh", scale: 2 }}
          animate={controls}
          viewport={{ once: false }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="relative">
            <img
              src={logoImage}
              alt={"Teck Robot"}
              className="w-full h-full object-cover "
            />
            <p
              className="text-l font-black text-center text-secondary absolute bottom-[4vh] 2xl:bottom-[5vh] right-[70px]"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              RENT A ROBOT
            </p>
          </div>
        </motion.div>
        <div className="opacity-30 absolute top-20 right-[-15%]">
          <GearsContainer
            gear2={gearImage2}
            gear3={gearImage3}
            gear4={gearImage4}
            // opacity={"opacity-50"}
            // position="absolute top-20 right-[-15%]"
            rotation={"rotate-[180deg]"}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
