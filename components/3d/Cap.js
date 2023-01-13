import React, { useState } from "react";
import { useGLTF, MeshReflectorMaterial, Decal } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Cap(props) {
  const [diff, roughness, normal, logo_alpha] = useLoader(TextureLoader, [
    "textures/football/football_diffuse.jpg",
    "textures/football/football_rough.jpg",
    "textures/football/football_normal.jpg",
    `/athletes/${props.athlete}/logo_alpha.jpg`,
  ]);

  useEffect(() => {
    [diff, roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(1, -1);
    });

    diff.encoding = LinearEncoding;
    roughness.encoding = LinearEncoding;
    normal.encoding = LinearEncoding;
  }, [diff, roughness, normal]);

  useEffect(() => {
    logo_alpha.wrapS = RepeatWrapping;
    logo_alpha.wrapT = RepeatWrapping;
    logo_alpha.repeat.set(-1, 1);
  }, [logo_alpha]);

  const { nodes } = useGLTF("models/items/Cap.glb");
  const [hover, setHover] = useState(false);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => props.handleBoard()}
      geometry={nodes.Cap.geometry}
      position-x={hover ? "0.15" : "0"}
      position-y={hover ? "0.15" : "0"}
      rotation-y={hover ? Math.PI * 0.35 : Math.PI * 0.5}
      dispose={null}
    >
      <MeshReflectorMaterial
        color={0x505050}
        envMapIntensity={hover ? 0.15 : 0.05}
        dithering={true}
        roughness={hover ? 1 : 1.4}
        blur={[400, 400]}
        mixBlur={30}
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
      <Decal
        debug={props.wireframe}
        position={[0, 0.02, 0.1]} // Position
        rotation={0} // Rotation  (vector / degree in radians)
        scale={0.08} // Scale
        map-anisotropy={16}
      >
        <MeshReflectorMaterial
          envMapIntensity={0.1}
          alphaMap={logo_alpha}
          color={0xffffff}
          roughness={1}
          metalness={1}
          blur={[200, 200]}
          mixBlur={30}
          mixStrength={2}
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
          polygonOffset
          polygonOffsetFactor={-10}
        />
      </Decal>
    </mesh>
  );
}

useGLTF.preload("models/items/Cap.glb");
