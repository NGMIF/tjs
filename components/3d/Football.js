import React, { useState } from "react";
import { useGLTF, MeshReflectorMaterial, Decal } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Football(props) {
  const [diff, roughness, normal, image] = useLoader(TextureLoader, [
    "textures/football/football_diffuse.jpg",
    "textures/football/football_rough.jpg",
    "textures/football/football_normal.jpg",
    "/logotest.png",
  ]);

  useEffect(() => {
    [diff, roughness, normal, image].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(1, -1);
    });

    diff.encoding = LinearEncoding;
    roughness.encoding = LinearEncoding;
    normal.encoding = LinearEncoding;
  }, [diff, roughness, normal, image]);

  const { nodes } = useGLTF("models/items/Football.glb");
  const [hover, setHover] = useState(false);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => props.handleBoard()}
      geometry={nodes.Football.geometry}
      position-x={hover ? "0.15" : "0"}
      position-y={hover ? "0.15" : "0"}
      rotation-y={hover ? Math.PI * 0.15 : Math.PI * 0.35}
      dispose={null}
    >
      <MeshReflectorMaterial
        envMapIntensity={hover ? 0.3 : 0.05}
        map={diff}
        normalMap={normal}
        normalScale={[4, 4]}
        roughnessMap={roughness}
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
        position={[0, 0, 0.1]} // Position
        rotation={0} // Rotation  (vector / degree in radians)
        scale={0.1} // Scale
        map-anisotropy={16}
      >
        <MeshReflectorMaterial
          envMapIntensity={0.2}
          alphaMap={image}
          color={0xffffff}
          roughness={0.25}
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

useGLTF.preload("models/items/Football.glb");
