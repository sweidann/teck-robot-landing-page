import { motion , useAnimation  } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import MechArm from "../MechArm";
import GearsContainer from "../GearsContainer";




const HomeSection = () => {
  const [grab, setGrab] = useState(true);
  const [audio, setAudio] = useState(null);
  const sectionRef = useRef(null);
  const [armPosition, setArmPosition] = useState({ x: 0, y: 0, z: -7 }); // Initial position
  const controls = useAnimation();

  const startLogoAnimation = () => {
    controls.start({
      x: [ 250, 200 ], // Start at -800, go to 250, then to 200
      y: [ 50, -150 ],      // Start at 0, stay at 0, then go to -150
      transition: { duration: 1, ease: 'easeInOut' } // Adjust duration as needed
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
        {/* 3D Model Canvas (Bigger to Avoid Clipping) */}
        <Canvas
          shadows
          className="absolute w-full h-full" 
          camera={{ fov: 50, position: [0, 0, 0] }}
          // onClick={() => {
          //   setGrab(!grab);
          //   handlePlaySound();
          // }}
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
          <MechArm grab={grab} startLogoAnimation={startLogoAnimation}/>
          {/* <OrbitControls enableZoom={false} /> */}
        </Canvas>
        {/* <video autoPlay loop muted>
          <source src={'./assets/videos/mechArmVideo.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* Logo (Positioned in front of the mech arm) */}
        <motion.div
          className="absolute w-[300px] h-[300px] " // Overlay on top of Canvas
          initial={{ x: 250, y: 50, scale: 1.2 }}
          animate={controls}
          viewport={{ once: false }}
          transition={{ duration: 2, ease: 'easeInOut' }}
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
