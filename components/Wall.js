import React from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Wall(props) {
  const [diff, roughness, normal] = useLoader(TextureLoader, [
    "textures/wall/wall_diffuse.jpg",
    "textures/wall/wall_rough.jpg",
    "textures/wall/wall_normal.jpg",
  ]);

  useEffect(() => {
    [diff, roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(7, 7);
    });

    diff.encoding = LinearEncoding;
    roughness.encoding = LinearEncoding;
    normal.encoding = LinearEncoding;
  }, [diff, roughness, normal]);

  const { nodes } = useGLTF("/scene/Walls.glb");
  return (
    <mesh {...props} geometry={nodes.Walls.geometry}>
      <MeshReflectorMaterial
        envMapIntensity={0.05}
        map={diff}
        normalMap={normal}
        normalScale={[4, 4]}
        roughnessMap={roughness}
        dithering={true}
        roughness={1}
        blur={[100, 100]}
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
      />
    </mesh>
  );
}

useGLTF.preload("/scene/Walls.glb");
