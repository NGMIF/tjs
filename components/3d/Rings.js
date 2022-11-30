import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings() {
  const itemsRef = useRef([]);

  useFrame((state) => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 2;
      mesh.position.set(0, 0, -z);
      let distance = Math.abs(z);
      mesh.scale.set(
        1 - distance * 0.05,
        1 - distance * 0.05,
        1 - distance * 0.05
      );

      let colorScale = 1;
      if (distance > 2) {
        colorScale = 1 - Math.min(distance, 8) / 12;
      }
      colorScale *= 0.5;

      if (i % 2 == 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(
          colorScale
        );
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(
          colorScale
        );
      }
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[4, 0.03, 16, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
}
