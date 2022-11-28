import { MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function CeilingLight(props) {
  const light = useLoader(TextureLoader, "textures/lighting.jpg");

  useEffect(() => {
    [light].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.anisotropy = 4;
      t.repeat.set(5, 16);
    });
  }, [light]);

  return (
    <mesh {...props}>
      <planeGeometry args={[30, 30]} />

      <MeshReflectorMaterial
        opacity={1}
        alphaMap={light}
        transparent
        emissive={0xffffff}
        emissiveIntensity={10000}
      />
    </mesh>
  );
}
