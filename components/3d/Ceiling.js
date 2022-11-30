import { MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ceiling(props) {
  const [diff, roughness, normal] = useLoader(TextureLoader, [
    "textures/ceiling/ceiling_diffuse.jpg",
    "textures/ceiling/ceiling_rough.jpg",
    "textures/ceiling/ceiling_normal.jpg",
  ]);

  useEffect(() => {
    [diff, roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(6, 6);
    });

    roughness.encoding = LinearEncoding;
    normal.encoding = LinearEncoding;
  }, [diff, roughness, normal]);

  return (
    <mesh {...props}>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0.4}
        map={diff}
        normalMap={normal}
        normalScale={[1, 1]}
        roughnessMap={roughness}
        dithering={true}
        roughness={0.7}
        blur={[200, 200]}
        mixBlur={50}
        mixStrength={5}
        mixContrast={1}
        resolution={1024}
        mirror={1}
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
