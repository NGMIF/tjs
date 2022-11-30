import React, { useRef } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export function Computer(props) {
  const { nodes } = useGLTF("/scene/Computer.glb");
  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Computer.geometry}>
        <MeshReflectorMaterial
          color={0x333333}
          envMapIntensity={0.05}
          dithering={true}
          roughness={0.5}
          metalness={0}
          blur={[400, 400]}
          mixBlur={10}
          mixStrength={10}
          mixContrast={1}
          resolution={1024}
          mirror={0.2}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
          wireframe={props.wireframe}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/scene/Computer.glb");
