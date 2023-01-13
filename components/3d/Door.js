import React, { useRef } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export function Door(props) {
  const { nodes } = useGLTF("/scene/Door.glb");

  return (
    <group {...props} dispose={null}>
      <mesh castShadow={true} geometry={nodes.Door.geometry}>
        <MeshReflectorMaterial
          color={0x969696}
          envMapIntensity={0.05}
          dithering={true}
          roughness={0.9}
          metalness={1}
          blur={[300, 300]}
          mixBlur={10}
          mixStrength={3}
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
      <mesh castShadow={true} geometry={nodes.Door_Frame.geometry}>
        <MeshReflectorMaterial
          color={0xa0a0a0}
          envMapIntensity={0.1}
          dithering={true}
          roughness={0.5}
          metalness={1}
          blur={[200, 200]}
          mixBlur={10}
          mixStrength={2}
          mixContrast={1}
          resolution={1024}
          mirror={0.5}
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

useGLTF.preload("/scene/Door.glb");
