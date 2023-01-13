import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Text3D, Center } from "@react-three/drei";

export default function TextContent({
  website,
  marquee,
  space,
  speed,
  mainColor,
}) {
  const marqueeRef = useRef();

  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();
    marqueeRef.current.position.x =
      5 - (elapsed % (marquee.length - (25 - space))) * speed;
  });

  return (
    <>
      <Center
        ref={marqueeRef}
        bottom
        right
        position={[5, 9.75, -5.532]}
        scale={0.75}
      >
        <Text3D font="/fonts/Display.json" size={1} height={0}>
          {marquee}
          <MeshReflectorMaterial color={mainColor} />
        </Text3D>
      </Center>

      <Center
        middle
        center
        rotation-y={-Math.PI * 0.22222}
        position={[10.67, 4.55, -1.09]}
        scale={[0.3, 0.35, 0.3]}
      >
        <Text3D font="/fonts/websiteFont.json" size={0.5} height={0}>
          {website}
          <MeshReflectorMaterial color={0x999999} />
        </Text3D>
      </Center>
    </>
  );
}
