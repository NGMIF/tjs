import React from "react";
import { MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Map(props) {
  const map = useLoader(TextureLoader, `maps/${props.city}.jpg`);

  useEffect(() => {
    [map].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.anisotropy = 4;
    });
  }, [map]);

  return (
    <mesh {...props} receiveShadow>
      <planeGeometry args={[3.16, 1]} />
      <MeshReflectorMaterial
        opacity={1}
        roughness={0.2}
        alphaMap={map}
        transparent
        color={0xaaaaaa}
        envMapIntensity={0.3}
        dithering={true}
        blur={[100, 100]}
        mixBlur={30}
        mixStrength={10}
        mixContrast={1}
        resolution={1024}
        mirror={0.5}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
