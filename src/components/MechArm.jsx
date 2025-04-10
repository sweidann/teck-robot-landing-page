import { useRef, useEffect, useState } from "react";

const MechArm = ({ startLogoAnimation }) => {
  const { scene } = useGLTF("./assets/models/mech_arm_colored.glb");
  const armRef = useRef();
  const [isAnimatingToGrab, setIsAnimatingToGrab] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    armRef.current.position.set(-7.5, 0, -7); // Adjust initial position
    armRef.current.rotation.set(0, -1, 0.5); // Adjust initial rotation

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
    if (!armRef.current || !isAnimating) return;

    const rotationZ = armRef.current.rotation.z;
    const rotationY = armRef.current.rotation.y;

    if (isAnimatingToGrab) {
      if (armRef.current.rotation.y < 0.3) armRef.current.rotation.y += 0.005;
      if (armRef.current.rotation.z > 0) armRef.current.rotation.z -= 0.005;
      if (armRef.current.position.x < -3.5) armRef.current.position.x += 0.01;

      // Check if the grab animation is complete
      if (
        armRef.current.rotation.y >= 0.3 &&
        armRef.current.rotation.z <= 0 &&
        armRef.current.position.x >= -3.5
      ) {
        setIsAnimatingToGrab(false);
        startLogoAnimation();
      }
    } else {
      if (armRef.current.rotation.y > -0.1) armRef.current.rotation.y -= 0.005;
      if (armRef.current.rotation.z < 0.5) armRef.current.rotation.z += 0.005;

      if (
        armRef.current.rotation.y <= -0.1 &&
        armRef.current.rotation.z >= 0.5
      ) {
        setIsAnimating(false);
        return;
      }

      // Check if the release animation is complete
      if (
        armRef.current.rotation.y <= -0.1 &&
        armRef.current.rotation.z >= 0.5
      ) {
        setIsAnimatingToGrab(true);
      }
    }
  });

  return <primitive object={scene} ref={armRef} scale={[4, 4, 4]} />;
};

useGLTF.preload("./assets/models/mech_arm_colored.glb");

export default MechArm;
