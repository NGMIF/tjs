import React, { useRef } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export function Door(props) {
  const { nodes, materials } = useGLTF("/scene/Door.glb");
  return (
    <group {...props} dispose={null}>
      <mesh castShadow={true} geometry={nodes.Door_Frame.geometry}>
        <MeshReflectorMaterial
          color={0x969696}
          envMapIntensity={0.05}
          dithering={true}
          roughness={0.6}
          metalness={1}
          blur={[400, 400]}
          mixBlur={100}
          mixStrength={3}
          mixContrast={1}
          resolution={1024}
          mirror={0.3}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/scene/Door.glb");
