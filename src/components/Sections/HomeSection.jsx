import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import MechArm from "../MechArm";
import GearsContainer from "../GearsContainer";
import { gearImage2, gearImage3, gearImage4, homeArmImage, logoImage } from "../../vars/vars";

const HomeSection = () => {
  const [grab, setGrab] = useState(true);
  const [audio, setAudio] = useState(null);
  const sectionRef = useRef(null);
  const [armPosition, setArmPosition] = useState({ x: 0, y: 0, z: -7 }); // Initial position
  const controls = useAnimation();

  const startLogoAnimation = () => {
    controls.start({
      x: [250, 200], // Start at -800, go to 250, then to 200
      y: [50, -150], // Start at 0, stay at 0, then go to -150
      transition: { duration: 1, ease: "easeInOut" }, // Adjust duration as needed
    });
  };

  useEffect(() => {
    // Load the audio file
    const sound = new Audio("./assets/sounds/arm_sound_effect.wav");
    setAudio(sound);

    // setGrab(true);
    // handlePlaySound();
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
        <motion.div
          className="flex-[1.5]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <img src= {homeArmImage} className=""></img>
        </motion.div>
        <motion.div
          className="flex-1 relative w-[300px] h-[300px] mt-auto right-[8vw] bottom-[10vh] "
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={logoImage}
            alt={"Teck Robot"}
            className="w-full h-full object-cover"
          />
          <p
            className="text-2xl font-black text-center text-secondary absolute bottom-[-2vh] 2xl:bottom-[-5vh] right-[130px]"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            RENT A ROBOT
          </p>
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
