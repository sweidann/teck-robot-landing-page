import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import MechArm from "../MechArm";
import GearsContainer from "../GearsContainer";

const HomeSection = () => {
  const [grab, setGrab] = useState(true);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Load the audio file
    const sound = new Audio("./assets/sounds/arm_sound_effect.wav");
    setAudio(sound);

    // Delay the animation reset
    // setTimeout(() => setGrab(false), 1000);
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
        {/* 3D Model Canvas (Bigger to Avoid Clipping) */}
        <Canvas
          shadows
          className="absolute w-full h-full" // Make canvas cover the full section
          camera={{ fov: 50, position: [0, 0, 0] }}
          onClick={() => {
            setGrab(!grab);
            handlePlaySound();
          }}
        >
          <directionalLight
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            position={[5, 10, 5]}
            intensity={12}
          />
          {/* <ambientLight intensity={10} /> */}
          <spotLight
            position={[10, 10, 10]}
            intensity={2}
            angle={0.3}
            penumbra={1}
          />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <MechArm grab={grab} />
          {/* <OrbitControls enableZoom={false} /> */}
        </Canvas>

        {/* Logo (Positioned in front of the mech arm) */}
        <motion.div
          className="absolute translate-x-250 translate-y-60  w-[300px] h-[300px] " // Overlay on top of Canvas
          initial={{ x: 200, y: -150, scale: 1.2 }}
          whileInView={{
            y: grab ? 60 : -150,
            x: grab ? 250 : 200,
            scale: grab ? 1 : 1.2,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={"./assets/images/LOgo11.png"}
            alt={"Teck Robot"}
            className="w-full h-full object-cover"
          />
          <p
            className="text-xl font-black text-center text-secondary absolute bottom-[40px] right-[40px]"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            RENT A ROBOT
          </p>
        </motion.div>
        <div className="opacity-30 absolute top-20 right-[-15%]">
          <GearsContainer
            gear2={"./assets/images/Gear2.png"}
            gear3={"./assets/images/Gear3.png"}
            gear4={"./assets/images/Gear4.png"}
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
