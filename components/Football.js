import React, { useState } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei/";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Football(props) {
  const [diff, roughness, normal] = useLoader(TextureLoader, [
    "textures/football/football_diffuse.jpg",
    "textures/football/football_rough.jpg",
    "textures/football/football_normal.jpg",
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

  const { nodes } = useGLTF("models/items/Football.glb");
  const [hover, setHover] = useState(false);
  return (
    <mesh
      {...props}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => props.handleBoard()}
      geometry={nodes.Football.geometry}
      position-x={hover ? "0.15" : "0"}
      position-y={hover ? "0.15" : "0"}
      rotation-y={hover ? Math.PI * 0.15 : Math.PI * 0.35}
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
    </mesh>
  );
}

useGLTF.preload("models/items/Football.glb");