import React from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Computer(props) {
  const [logo, logo_alpha] = useLoader(TextureLoader, [
    `/athletes/${props.athlete}/logo.jpg`,
    `/athletes/${props.athlete}/logo_alpha.jpg`,
  ]);

  useEffect(() => {
    [logo, logo_alpha].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(1, 1);
    });
  }, [logo, logo_alpha]);

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
      <mesh position={[0.65, 0.92, 0.584]} rotation-z={-Math.PI * 0.2}>
        <planeGeometry args={[0.07, 0.07]} />
        <MeshReflectorMaterial
          map={logo}
          alphaMap={logo_alpha}
          envMapIntensity={0.2}
          dithering={true}
          roughness={0.3}
          blur={[100, 100]}
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
          transparent
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/scene/Computer.glb");
