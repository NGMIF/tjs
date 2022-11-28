import { MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ground(props) {
  const [diff, roughness, normal] = useLoader(TextureLoader, [
    props.map !== undefined && props.map.length > 1
      ? props.map
      : "textures/floor/floor_diffuse.jpg",
    "textures/floor/floor_rough.jpg",
    "textures/floor/floor_normal.jpg",
  ]);

  useEffect(() => {
    [diff, roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(8, 8);
    });

    roughness.encoding = LinearEncoding;
    normal.encoding = LinearEncoding;
  }, [diff, roughness, normal]);

  return (
    <mesh {...props} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0.1}
        map={diff}
        normalMap={normal}
        normalScale={[4, 4]}
        roughnessMap={roughness}
        dithering={true}
        roughness={0.52}
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
      />
    </mesh>
  );
}
