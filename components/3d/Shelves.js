import React from "react";
import {
  useGLTF,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
  CubeCamera,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Shelves(props) {
  const [diff] = useLoader(TextureLoader, ["textures/screenbg.png"]);

  React.useEffect(() => {
    [diff].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(4.5, 4.5);
    });

    diff.encoding = LinearEncoding;
  }, [diff]);

  const { nodes } = useGLTF("/scene/Shelves.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Desks.geometry}
      >
        <MeshReflectorMaterial
          color={0x252525}
          envMapIntensity={0.05}
          dithering={true}
          roughness={0.8}
          metalness={0}
          blur={[300, 300]}
          mixBlur={20}
          mixStrength={50}
          mixContrast={0.97}
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
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Screen_BG.geometry}
      >
        <MeshReflectorMaterial
          map={diff}
          color={0xbbbbbb}
          envMapIntensity={0}
          dithering={true}
          roughness={1}
          metalness={0}
          blur={[100, 100]}
          mixBlur={10}
          mixStrength={1}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
          wireframe={props.wireframe}
        />
      </mesh>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Frame.geometry}
      >
        <MeshReflectorMaterial
          color={0x272727}
          envMapIntensity={0.15}
          dithering={true}
          roughness={0.9}
          metalness={0}
          blur={[100, 100]}
          mixBlur={20}
          mixStrength={30}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
          wireframe={props.wireframe}
        />
      </mesh>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Shelves.geometry}
      >
        <MeshReflectorMaterial
          color={0x272727}
          envMapIntensity={0.15}
          dithering={true}
          roughness={0.5}
          metalness={0}
          blur={[100, 100]}
          mixBlur={10}
          mixStrength={15}
          mixContrast={0.95}
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

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Chain_Case_Glass.geometry}
      >
        <meshPhysicalMaterial
          roughness={0}
          transmission={1}
          thickness={0.03}
          clearcoat={0.18}
          reflectivity={0.18}
          ior={1.55}
          color={0xffffff}
          wireframe={props.wireframe}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/scene/Shelves.glb");
