import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

export default function EnvContent({ free }) {
  return (
    <>
      <OrbitControls
        enablePan={free}
        enableZoom={true}
        target={[0, 5, 0]}
        minPolarAngle={!free ? "1.2" : "0.5"}
        maxPolarAngle={!free ? "1.55" : "2"}
        minAzimuthAngle={!free ? "-0.35" : "-2"}
        maxAzimuthAngle={!free ? "0.35" : "2"}
        minDistance={!free ? "12" : "0"}
        maxDistance={!free ? "22" : "100"}
        rotateSpeed={0.15}
      />
      <PerspectiveCamera makeDefault fov={50} position={[0, 5, 20]} />

      <color args={[0.1, 0.1, 0.1]} attach="background" />

      <Environment
        intensity={1}
        background={true}
        blur={0}
        ground={true}
        files="hdri/studio.hdr"
        path="/"
      />

      <ambientLight color={0xffffff} intensity={0.1} />
      <spotLight
        color={[1, 1, 1]}
        intensity={0.2}
        angle={1}
        penumbra={1}
        position={[10, 15, 10]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[1, 1, 1]}
        intensity={0.2}
        angle={1}
        penumbra={1}
        position={[-10, 15, 10]}
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight
        castShadow={true}
        intensity={0.3}
        position={[5, 5, -5]}
        color="white"
      />
      <directionalLight
        castShadow={true}
        intensity={0.2}
        position={[-10, 10, -5]}
        color="white"
      />
    </>
  );
}
