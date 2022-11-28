import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Monkey() {
  const monkey = useLoader(GLTFLoader, "models/monkey/monkey.gltf");

  useEffect(() => {
    monkey.scene.scale.set(1, 1, 1);
    monkey.scene.position.set(0, 1.5, 5);
    monkey.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 0.5;
      }
    });
  }, [monkey]);

  return <primitive object={monkey.scene} />;
}
