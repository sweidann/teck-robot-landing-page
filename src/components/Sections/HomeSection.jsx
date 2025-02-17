import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import MechArm from "../MechArm";

const HomeSection = () => {
  const [grab, setGrab] = useState(false);

  return (
    <section
      id="home"
      className="h-screen relative flex items-center justify-center"
    >
      {/* Container with relative positioning */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 3D Model Canvas (Bigger to Avoid Clipping) */}
        <Canvas
          className="absolute w-full h-full" // Make canvas cover the full section
          camera={{ fov: 64, position: [0, 0, 0] }}
        >
          <directionalLight position={[5, 5, 5]} intensity={12} />
          {/* <ambientLight intensity={10} /> */}
          <spotLight
            position={[10, 10, 10]}
            intensity={2}
            angle={0.3}
            penumbra={1}
          />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <MechArm grab={grab} />
          <OrbitControls enableZoom={false} />
        </Canvas>

        {/* Logo (Positioned in front of the mech arm) */}
        <motion.div
          className="absolute  w-[300px] h-[300px] " // Overlay on top of Canvas
          animate={{
            y: grab ? -200 : 70, // Move logo up when grabbed
            x: grab ? 250 : 320, // Move left
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => setGrab(!grab)} // Click to trigger animation
        >
          <img
            src={"/assets/images/LOgo11.png"}
            alt={"Teck Robot"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
