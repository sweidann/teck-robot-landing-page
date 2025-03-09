import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import MechArm from "../MechArm";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4, homeArmImage, logoImage } from "../../vars/vars";
import ReactPlayer from "react-player";
import VideoPlayer from "../VideoPlayer";

const HomeSection = () => {
  const [grab, setGrab] = useState(true);
  const [audio, setAudio] = useState(null);
  const sectionRef = useRef(null);
  const [armPosition, setArmPosition] = useState({ x: 0, y: 0, z: -7 }); // Initial position
  const controls = useAnimation();

  const startLogoAnimation = () => {
    controls.start({
      x: [200 , 270 , 290], // Start at -800, go to 250, then to 200
      y: [250 , 200 , 150], // Start at 0, stay at 0, then go to -150
      transition: { delay : 1.5 , duration: 1, ease: "easeInOut" }, // Adjust duration as needed
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
            controls 
            playing={true} // Set to true if you want autoplay
          />
        </div>
        <motion.div
          className="absolute w-[300px] h-[300px] " // Overlay on top of Canvas
          initial={{ x: 200, y: 250, scale: 2 }}
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
              className="text-l font-black text-center text-secondary absolute bottom-[4vh] 2xl:bottom-[-5vh] right-[70px]"
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
