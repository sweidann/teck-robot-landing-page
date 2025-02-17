import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

const MechArm = ({ grab }) => {
  const { scene } = useGLTF("/assets/models/mech_arm_colored.glb");
  const armRef = useRef();

  useEffect(() => {
    armRef.current.position.set(-3.5, 0, -7); // Adjust initial position
    armRef.current.rotation.set(0, -0.1, 0.5); // Adjust initial rotation

    // Enable shadow on all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Allow the model to cast shadows
        child.receiveShadow = true; // Allow the model to receive shadows
      }
    });
  }, []);

  // Animate the arm movement
  useFrame(() => {
    if (grab) {
      if (armRef.current.rotation.y < 0.3) armRef.current.rotation.y += 0.005;
      if (armRef.current.rotation.z > 0) armRef.current.rotation.z -= 0.005;
    } else {
      if (armRef.current.rotation.y > -0.1) armRef.current.rotation.y -= 0.005;
      if (armRef.current.rotation.z < 0.5) armRef.current.rotation.z += 0.005;
    }
  });

  return <primitive object={scene} ref={armRef} scale={[4, 4, 4]} />;
};

useGLTF.preload("/assets/models/mech_arm_colored.glb");

export default MechArm;
