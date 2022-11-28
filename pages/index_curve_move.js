import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { BufferGeometry, CatmullRomCurve3, LineLoop, Vector3 } from "three";
import { FontLoader, TextGeometry, TextGeometryParameters } from "three-stdlib";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import Collapsible from "react-collapsible";
import Image from "next/image";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  MeshReflectorMaterial,
  Text,
  CatmullRomLine,
  CurveModifier,
  Svg,
} from "@react-three/drei";
import { Ground } from "../components/Ground";

import { Wall } from "../components/Wall";
import { Door } from "../components/Door";
import { Ceiling } from "../components/Ceiling";

import { Shelves } from "../components/Shelves";
import { Computer } from "../components/Computer";
import { CeilingLight } from "../components/CeilingLight";
import { Map } from "../components/Map";

extend({ StdText: TextGeometry });

function Content({ website, map, marquee }) {
  const curveRef = useRef();
  const geomRef = useRef(null);

  const handlePos = useMemo(
    () =>
      [
        { x: 4.85, y: 8.75, z: -15 },
        { x: 4.85, y: 8.75, z: -5.35 },
        { x: -4.85, y: 8.75, z: -5.35 },
        { x: -4.85, y: 8.75, z: -15 },
      ].map((hand) => new Vector3(...Object.values(hand))),
    []
  );

  const curve2 = useMemo(
    () => (
      <CatmullRomLine
        points={handlePos} // Array of Points
        closed={true}
        curveType="catmullrom" // One of "centripetal" (default), "chordal", or "catmullrom"
        tension={0}
        color="lime"
        lineWidth={3} // In pixels (default)
        dashed={false} // Default
      />
    ),
    [handlePos]
  );

  const curve = useMemo(
    () => new CatmullRomCurve3(handlePos, true, "catmullrom", 0),
    [handlePos]
  );

  useFrame(() => {
    if (curveRef.current) {
      curveRef.current?.moveAlongCurve(0.001);
    }
  });

  return (
    <>
      <OrbitControls
      /*  enablePan={false}
        enableZoom={true}
        target={[0, 5, 0]}
        minPolarAngle={1.2}
        maxPolarAngle={1.55}
        minAzimuthAngle={-0.35}
        maxAzimuthAngle={0.35}
        minDistance={12}
        maxDistance={22}
        rotateSpeed={0.15} */
      />
      <PerspectiveCamera makeDefault fov={50} position={[0, 5, 20]} />
      <color args={[0.8, 0.8, 0.8]} attach="background" />
      <Environment
        intensity={1}
        background={false}
        blur={0}
        ground={false}
        files="hdri/studio.hdr"
        path="/"
      ></Environment>
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
      <ambientLight color={0xffffff} intensity={0.1} />
      <CeilingLight position={[0, 13.5, 0]} rotation-x={-Math.PI * -0.5} />
      <Ceiling position={[0, 13.7, 0]} rotation-x={-Math.PI * -0.5} />
      <Ground position={[0, 0, 0]} rotation-x={-Math.PI * 0.5} />
      <Computer position={[0, 0, 0]} scale={[4, 4, 4]} />
      <Shelves position={[0, 0, 0]} scale={[4, 4, 4]} />
      <Door position={[0, 0, 0]} scale={[4, 4, 4]} />
      <Wall position={[0, 0, 0]} scale={[4, 4, 4]} />
      <Map position={[0.445, 1.13, 3.375]} scale={2.25} city={map} />
      {/* <Monkey /> */}

      <CurveModifier ref={curveRef} curve={curve}>
        <mesh>
          <stdText
            attach="geometry"
            args={[
              "hello @react-three/drei",
              {
                size: 2,
                height: 0.05,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 5,
              },
            ]}
            ref={geomRef}
          />
          <meshNormalMaterial attach="material" />
        </mesh>
      </CurveModifier>

      {curve2}

      <Text
        position={[0, 8.75, -5.35]}
        scale={11}
        color="white"
        anchorX="center"
        anchorY="bottom-baseline"
        font="/Display.ttf"
      >
        {marquee}
      </Text>
      <Text
        rotation-y={-Math.PI * 0.224}
        position={[10.67, 4.7, -1.09]}
        scale={2.2}
        anchorX="center"
        anchorY="center"
        outlineWidth={0.003}
        outlineColor={0x999999}
        strokeWidth={2}
        strokeColor={0x999999}
        strokeOpacity={0.7}
        outlineOpacity={0.9}
      >
        {website}
      </Text>
      {/*  <Svg
        src="/logos/m.svg"
        skipFill={false}
        skipStrokes={false}
        scale={3.7}
        position={[-3.7, 7.5, -5.5]}
      ></Svg> */}
    </>
  );
}

export default function Home() {
  const [maps, setMaps] = useState([
    "Baltimore",
    "Cleaveland",
    "Dallas",
    "Eugene",
    "Indianapolis",
    "LasVegas",
    "Minneapolis",
    "NYC",
    "Pittsburgh",
    "SanDiego",
    "SanFrancisco",
    "Seattle",
    "Tijuana",
    "Vancouver",
  ]);
  const [map, setMap] = useState("NYC");
  const [imageMode, setImageMode] = useState(false);
  const [website, setWebsite] = useState("Athlete's Website");
  const [marquee, setMarquee] = useState("marquee");
  return (
    <Suspense fallback={null}>
      <div className="duration-500 fixed w-full z-10 h-screen p-2 lg:p-12">
        <Image
          className="ring-white hover:ring-8 hover:ring-offset-8 ring-opacity-50 duration-500 ring-offset-white w-full h-full rounded-3xl "
          src="/d1.jpg"
          width={2000}
          height={2000}
          alt="placeholder"
        />
      </div>
      <div className="duration-500 h-screen bg-gradient-to-b from-green-300 to-blue-500 p-2 lg:p-12">
        <div className="items-center space-y-2 duration-500 rounded-full z-40 m-10 fixed">
          <div className=" space-y-2 lg:flex items-center lg:space-x-6  duration-500 lg:space-y-0 ">
            <a
              href="https://www.athlete.studio/"
              className="px-4 py-2 group hover:ring-2 hover:bg-green-100/5 cursor-pointer bg-green-200/10 ring-green-200/30 backdrop-blur-sm flex items-center space-x-3 duration-500 rounded-full"
            >
              <Image
                className=" group-hover:animate-pulse "
                src="/logo.png"
                width={25}
                height={25}
                alt="logo"
              />
              <div className="bg-gradient-to-br from-green-300 to-blue-500 text-transparent bg-clip-text text-lg group-hover:bg-gradient-to-bl duration-500 font-bold">
                ATHLETE STUDIO
              </div>
            </a>
            <div
              onClick={() => setImageMode((prev) => !prev)}
              className="cursor-pointer backdrop-blur-sm px-2 py-1 flex items-center duration-500 rounded-full ring-1 ring-green-300 bg-green-100/10 hover:ring-2"
            >
              <div
                className={`duration-500 ring-1 ring-inset ring-green-300  text-lg rounded-full px-4 py-1 text-white font-bold  ${
                  imageMode
                    ? "bg-green-300/50 hover:bg-green-300/70 "
                    : "hover:bg-green-300/20 hover:ring-2"
                }`}
              >
                2D
              </div>
              <div
                className={`duration-500 ring-1 ring-inset ring-green-300 text-lg rounded-full px-4 py-1 text-white font-bold  ${
                  !imageMode
                    ? "bg-green-300/50 hover:bg-green-300/70 "
                    : "hover:bg-green-300/20 hover:ring-2"
                }`}
              >
                3D
              </div>
            </div>
          </div>

          <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-2">
            <div className="flex h-auto w-8 mr-2 flex-shrink-0 items-center justify-center lg:w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-green-200/80 group-hover:rotate-180   duration-500 group-hover:fill-green-200 lg:h-6 lg:w-6 "
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M12,0C5.35,0,0,5.35,0,12s5.35,12,12,12,12-5.35,12-12S18.65,0,12,0h0ZM1.85,12c0-1.48,.37-2.95,.92-4.25,.83,.28,1.66,.55,2.58,.74-.18,1.11-.28,2.31-.28,3.51s.09,2.4,.28,3.51c-.92,.18-1.75,.46-2.58,.74-.55-1.29-.92-2.77-.92-4.25h0Zm5.08,0c0-1.11,.09-2.12,.28-3.14,1.29,.18,2.58,.28,3.88,.37v5.63c-1.29,0-2.58,.18-3.88,.37-.18-1.11-.28-2.12-.28-3.23h0Zm9.51-4.98c-1.11,.18-2.31,.28-3.51,.28V2.03c1.48,.55,2.77,2.49,3.51,4.98h0ZM11.08,2.03V7.29c-1.2,0-2.31-.09-3.51-.28,.74-2.49,2.03-4.43,3.51-4.98h0Zm0,14.68v5.26c-1.48-.55-2.77-2.49-3.51-4.98,1.2-.18,2.31-.28,3.51-.28h0Zm1.85,5.26v-5.26c1.2,0,2.31,.09,3.51,.28-.74,2.49-2.03,4.43-3.51,4.98h0Zm0-7.11v-5.63c1.29,0,2.58-.18,3.88-.37,.18,1.02,.28,2.03,.28,3.14s-.09,2.12-.28,3.14c-1.29-.18-2.58-.28-3.88-.28h0Zm5.72-6.37c.92-.18,1.75-.46,2.58-.74,.55,1.29,.92,2.68,.92,4.25,0,1.48-.37,2.95-.92,4.25-.83-.28-1.66-.55-2.58-.74,.18-1.11,.28-2.31,.28-3.51s-.09-2.4-.28-3.51h0Zm1.66-2.4c-.65,.18-1.38,.37-2.03,.55-.37-1.38-.92-2.68-1.66-3.69,1.48,.74,2.68,1.85,3.69,3.14ZM7.38,2.95c-.65,1.02-1.2,2.31-1.66,3.69-.65-.09-1.29-.28-2.03-.55,1.02-1.29,2.22-2.4,3.69-3.14Zm-3.69,14.95c.65-.18,1.38-.37,2.03-.55,.37,1.38,.92,2.68,1.66,3.69-1.48-.74-2.68-1.85-3.69-3.14Zm12.92,3.14c.65-1.02,1.2-2.31,1.66-3.69,.74,.18,1.38,.37,2.03,.55-1.02,1.29-2.22,2.4-3.69,3.14Z" />
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              placeholder="Athlete's Website"
              className="w-full text-green-200 font-semibold bg-transparent py-2.5 outline-none duration-500 placeholder:text-green-200/60 placeholder:duration-500 focus:placeholder:text-green-200/20 hover:placeholder:text-green-200/20 "
            />
          </div>
          <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-2">
            <div className="flex h-auto w-8 mr-2 flex-shrink-0 items-center justify-center lg:w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-green-200/80 group-hover:rotate-180   duration-500 group-hover:fill-green-200 lg:h-6 lg:w-6 "
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M12,0C5.35,0,0,5.35,0,12s5.35,12,12,12,12-5.35,12-12S18.65,0,12,0h0ZM1.85,12c0-1.48,.37-2.95,.92-4.25,.83,.28,1.66,.55,2.58,.74-.18,1.11-.28,2.31-.28,3.51s.09,2.4,.28,3.51c-.92,.18-1.75,.46-2.58,.74-.55-1.29-.92-2.77-.92-4.25h0Zm5.08,0c0-1.11,.09-2.12,.28-3.14,1.29,.18,2.58,.28,3.88,.37v5.63c-1.29,0-2.58,.18-3.88,.37-.18-1.11-.28-2.12-.28-3.23h0Zm9.51-4.98c-1.11,.18-2.31,.28-3.51,.28V2.03c1.48,.55,2.77,2.49,3.51,4.98h0ZM11.08,2.03V7.29c-1.2,0-2.31-.09-3.51-.28,.74-2.49,2.03-4.43,3.51-4.98h0Zm0,14.68v5.26c-1.48-.55-2.77-2.49-3.51-4.98,1.2-.18,2.31-.28,3.51-.28h0Zm1.85,5.26v-5.26c1.2,0,2.31,.09,3.51,.28-.74,2.49-2.03,4.43-3.51,4.98h0Zm0-7.11v-5.63c1.29,0,2.58-.18,3.88-.37,.18,1.02,.28,2.03,.28,3.14s-.09,2.12-.28,3.14c-1.29-.18-2.58-.28-3.88-.28h0Zm5.72-6.37c.92-.18,1.75-.46,2.58-.74,.55,1.29,.92,2.68,.92,4.25,0,1.48-.37,2.95-.92,4.25-.83-.28-1.66-.55-2.58-.74,.18-1.11,.28-2.31,.28-3.51s-.09-2.4-.28-3.51h0Zm1.66-2.4c-.65,.18-1.38,.37-2.03,.55-.37-1.38-.92-2.68-1.66-3.69,1.48,.74,2.68,1.85,3.69,3.14ZM7.38,2.95c-.65,1.02-1.2,2.31-1.66,3.69-.65-.09-1.29-.28-2.03-.55,1.02-1.29,2.22-2.4,3.69-3.14Zm-3.69,14.95c.65-.18,1.38-.37,2.03-.55,.37,1.38,.92,2.68,1.66,3.69-1.48-.74-2.68-1.85-3.69-3.14Zm12.92,3.14c.65-1.02,1.2-2.31,1.66-3.69,.74,.18,1.38,.37,2.03,.55-1.02,1.29-2.22,2.4-3.69,3.14Z" />
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setMarquee(e.target.value)}
              value={marquee}
              placeholder="Marquee Content"
              className="w-full text-green-200  font-semibold bg-transparent py-2.5 outline-none duration-500 placeholder:text-green-200/60 placeholder:duration-500 focus:placeholder:text-green-200/20 hover:placeholder:text-green-200/20 "
            />
          </div>
          <div className="w-full ">
            <Collapsible
              contentInnerClassName=" rounded-3xl h-72 px-2 py-4 overflow-y-scroll bg-green-200/10 backdrop-blur-sm space-y-0.5 w-full scrollbar-track-green-200/20 scrollbar-thumb-green-300/30 scrollbar-thin duration-500 scrollbar-thumb-rounded-md scrollbar-thumb-rounded-md"
              contentOuterClassName=""
              className=" w-full  duration-200"
              openedClassName="w-full  duration-200"
              transitionTime={200}
              transitionCloseTime={300}
              easing="ease-in-out"
              overflowWhenOpen="visible"
              trigger={
                <div className="group font-semibold flex w-full backdrop-blur-sm justify-between rounded-full bg-green-200/10 hover:bg-green-200/5 px-4 py-2.5 text-sm  text-green-200 duration-200  hover:text-green-200/80 lg:text-base">
                  City Map
                  <div
                    className={`flex h-auto w-auto items-center duration-500`}
                  >
                    <svg
                      className="h-4 w-4 fill-green-200 duration-200 group-hover:scale-110 group-hover:fill-green-200/800 lg:h-4 lg:w-4 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10,.69c0-.18-.07-.35-.2-.49-.27-.27-.71-.27-.98,0l-3.24,3.24c-.15,.15-.36,.24-.58,.24s-.42-.09-.58-.24L1.18,.2C.91-.07,.47-.07,.2,.2-.07,.47-.07,.91,.2,1.18l3.24,3.24c.42,.42,.97,.64,1.56,.64s1.14-.23,1.56-.64l3.24-3.24c.13-.14,.2-.31,.2-.49h0Z" />
                    </svg>
                  </div>
                </div>
              }
              triggerWhenOpen={
                <div className="group font-semibold flex my-2 w-full backdrop-blur-sm justify-between rounded-full bg-green-200/10 hover:bg-green-200/5 px-4 py-2.5  text-sm  text-green-200 duration-200  hover:text-green-200 lg:py-2 lg:text-base">
                  City Map
                  <div
                    className={`flex h-auto w-auto items-center duration-500`}
                  >
                    <svg
                      className="h-4 w-4 rotate-180 fill-green-200 duration-200 group-hover:scale-110 group-hover:fill-green-200/800 lg:h-4 lg:w-4 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10,.69c0-.18-.07-.35-.2-.49-.27-.27-.71-.27-.98,0l-3.24,3.24c-.15,.15-.36,.24-.58,.24s-.42-.09-.58-.24L1.18,.2C.91-.07,.47-.07,.2,.2-.07,.47-.07,.91,.2,1.18l3.24,3.24c.42,.42,.97,.64,1.56,.64s1.14-.23,1.56-.64l3.24-3.24c.13-.14,.2-.31,.2-.49h0Z" />
                    </svg>
                  </div>
                </div>
              }
            >
              {maps.map((m, i) => (
                <div
                  key={i}
                  onClick={() => setMap(m)}
                  className={`ml-2  flex cursor-pointer items-center justify-between space-x-4  py-1.5 pl-2 pr-6 duration-100 dark:border-black  ${
                    map === m
                      ? "border-l-4  bg-green-300/20 hover:border-green-400 hover:bg-green-300/30 text-green-300/80 hover:text-green-100 border-green-300/60"
                      : "border-l hover:border-green-400 hover:bg-green-200/10 text-green-200/80 hover:text-green-300/80 border-green-200/40"
                  }`}
                >
                  {m}
                </div>
              ))}
            </Collapsible>
          </div>
        </div>
        <Canvas
          shadows={true}
          className={` z-30 w-full h-full bg-transparent ring-opacity-50 hover:ring-8 hover:ring-offset-8 duration-500 ring-white ring-offset-white rounded-3xl ${
            imageMode && "hidden"
          }`}
          camera={{
            position: [-6, 7, 7],
          }}
        >
          <Content website={website} map={map} marquee={marquee} />
        </Canvas>
      </div>
    </Suspense>
  );
}
