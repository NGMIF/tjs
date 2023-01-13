import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Svg } from "@react-three/drei";

import { Ground } from "../components/3d/Ground";
import { Wall } from "../components/3d/Wall";
import { Door } from "../components/3d/Door";
import { Ceiling } from "../components/3d/Ceiling";
import { CeilingLight } from "../components/3d/CeilingLight";
import { Shelves } from "../components/3d/Shelves";
import { Computer } from "../components/3d/Computer";
import { Map } from "../components/3d/Map";

import { Football } from "../components/3d/Football";
import { Cap } from "../components/3d/Cap";

export default function Content({
  wireframe,
  map,
  groundMap,
  football,
  cap,
  handleBoard,
  handleBoardContent,
  athlete,
  mainColor,
  secondColor,
  sortedAlldayMcData,
}) {
  const itemsRef = useRef([]);
  const capsRef = useRef([]);

  useFrame(() => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let y = 5.4 - parseInt(i / 5) * 1.42;
      let z = (i % 5) * 1.5 - 10.5;
      mesh.position.set(-12, y, -z);
      i < football ? (mesh.visible = true) : (mesh.visible = false);
    }
  });

  useFrame(() => {
    for (let i = 0; i < capsRef.current.length; i++) {
      let mesh = capsRef.current[i];
      let y = 5.4 - 1.62 - 1.47 + parseInt(i / 5) * 1.47;
      let z = -(i % 5) * 1.5 - 4.2;
      mesh.position.set(-12.4, y, -z);
      i < cap ? (mesh.visible = true) : (mesh.visible = false);
    }
  });

  return (
    <>
      <CeilingLight position={[0, 13.65, 0]} rotation-x={-Math.PI * -0.5} />
      <Ceiling position={[0, 13.7, 0]} rotation-x={-Math.PI * -0.5} />
      <Ground
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        map={groundMap}
      />
      <Shelves
        position={[0, 0, 0]}
        scale={[4, 4, 4]}
        wireframe={wireframe}
        secondColor={secondColor}
        sortedAlldayMcData={sortedAlldayMcData}
      />
      <Computer
        position={[0, 0, 0]}
        scale={[4, 4, 4]}
        wireframe={wireframe}
        athlete={athlete}
      />

      <Door position={[0, 0, 0]} scale={[4, 4, 4]} wireframe={wireframe} />
      <Wall position={[0, 0, 0]} scale={[4, 4, 4]} />
      <Map position={[0.445, 1.12, 3.375]} scale={2.22} city={map} />

      {Array.from(Array(15).keys()).map((v, i) => (
        <mesh key={i} ref={(el) => (itemsRef.current[i] = el)}>
          <Football
            scale={[4, 4, 4]}
            wireframe={wireframe}
            handleBoard={handleBoard}
            handleBoardContent={handleBoardContent}
            athlete={athlete}
          />
        </mesh>
      ))}

      {Array.from(Array(15).keys()).map((v, i) => (
        <mesh key={i} ref={(el) => (capsRef.current[i] = el)}>
          <Cap
            scale={[4, 4, 4]}
            wireframe={wireframe}
            handleBoard={handleBoard}
            handleBoardContent={handleBoardContent}
            athlete={athlete}
          />
        </mesh>
      ))}

      <Svg
        src="/logos/allday.svg"
        skipFill={true}
        skipStrokes={false}
        scale={3.7 / 25}
        fillMaterial={{ color: `${mainColor}` }}
        strokeMaterial={{ color: `${mainColor}` }}
        position={[-3, 7.5, -5.5]}
      ></Svg>
    </>
  );
}
