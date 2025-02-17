import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

const MechArm = ({ grab }) => {
  const { scene } = useGLTF("/assets/models/mech_arm_colored.glb");
  const armRef = useRef();

  useEffect(() => {
    armRef.current.position.set(-3, 0, -5); // (X, Y, Z) Adjust as needed
    armRef.current.rotation.set(0, -0.3, 0.5); // (X, Y, Z) Adjust as needed
  }, []);
  // Animate the arm to grab the logo
  useFrame(() => {
    // if (grab) {
    //   armRef.current.position.y = Math.max(
    //     -0.5,
    //     armRef.current.position.y - 0.02
    //   );
    //   armRef.current.rotation.z = Math.min(
    //     Math.PI / 4,
    //     armRef.current.rotation.z + 0.01
    //   );
    // } else {
    //   armRef.current.position.y = Math.min(0, armRef.current.position.y + 0.02);
    //   armRef.current.rotation.z = Math.max(0, armRef.current.rotation.z - 0.01);
    // }
    if (armRef.current.rotation.y < 0.3) armRef.current.rotation.y += 0.001;
  });

  return <primitive object={scene} ref={armRef} scale={[4, 4, 4]} />;
};

useGLTF.preload("/assets/models/mech_arm_colored.glb");

export default MechArm;
