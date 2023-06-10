import { Box, OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

export const Experience = () => {
  const [hover, setHover] = useState(false);
  const cube = useRef();
  const mainCube = useRef(false);
  const jump = () => {
    if (cube.current && !mainCube.current) {
      console.log(cube.current?.translation());
      cube.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true);
      mainCube.current = true;
    }
  };
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 5]} intensity={0.4} />
      <OrbitControls />
      <RigidBody
        position={[-2.5, 1, 0]}
        ref={cube}
        name="cube"
        restitution={0.1}
        onContactForce={({ other }) => {
          if (other.rigidBodyObject.name === "floor" && mainCube.current) {
            console.log("making contact");
            mainCube.current = false;
          }
        }}
      >
        <Box
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={jump}
        >
          <meshStandardMaterial color={hover ? "red" : "blue"} />
        </Box>
      </RigidBody>
      <RigidBody type="kinematicPosition" name="obstacle">
        <Box args={[1 / 2, 1 / 2, 5]} position={[0, 1, 0]}></Box>
      </RigidBody>
      <RigidBody type="fixed" name="floor">
        <Box args={[10, 1, 10]} position={[0, 0, 0]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};
