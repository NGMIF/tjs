import React from "react";
import {
  useGLTF,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
  CubeCamera,
  Html,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Shelves(props) {
  const [diff] = useLoader(TextureLoader, ["textures/screenbg.png"]);

  React.useEffect(() => {
    [diff].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(4.5, 4.5);
    });

    diff.encoding = LinearEncoding;
  }, [diff]);

  const { nodes } = useGLTF("/scene/Shelves.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Desks.geometry}
      >
        <MeshReflectorMaterial
          color={0x252525}
          envMapIntensity={0.05}
          dithering={true}
          roughness={0.8}
          metalness={0}
          blur={[300, 300]}
          mixBlur={20}
          mixStrength={50}
          mixContrast={0.97}
          resolution={1024}
          mirror={0.5}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
          wireframe={props.wireframe}
        />
      </mesh>

      <mesh geometry={nodes.Leaderboard_Common_Screen_BG.geometry}>
        <MeshReflectorMaterial
          map={diff}
          color={0xbbbbbb}
          envMapIntensity={0}
          dithering={true}
          roughness={1}
          metalness={0}
          blur={[100, 100]}
          mixBlur={10}
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

      <Html
        rotation-y={Math.PI * 0.22222}
        position={[-2.365, 1.365, -0.525]}
        scale={[0.255, 0.23, 1]}
        className="w-96 h-96 select-none bg-repeat bg-opacity-20 bg-[length:100px_100px] bg-[url('/textures/screenbg_dark.png')] overflow-x-hidden overflow-y-hidden scrollbar-thin scrollbar-track-green-200/20 scrollbar-thumb-green-300/30 duration-500 scrollbar-thumb-rounded-md scrollbar-thumb-rounded-md"
        transform
        occlude="blending"
        prepend
      >
        <div className="pt-1 w-96 h-96 text-neutral-100 space-y-2 ">
          <div className="flex text-2xl font-bold tracking-tight uppercase justify-center ">
            Top NFL Allday MarketCap
          </div>
          <div className="flex px-1.5 py-0 flex-col font-bold space-y-0.5 w-auto h-auto ">
            {props.sortedAlldayMcData.map((athleteData, index) => (
              <div
                key={index}
                className="group relative bg-green-300/10 pl-1 pr-2 hover:pr-4 py-1 rounded-full grid items-center hover:bg-green-200/20 grid-cols-12 duration-300"
              >
                {/*  <div
                  className={`z-20 w-28 p-0.5 overflow-hidden h-28 bg-green-200/20 shadow-md shadow-black rounded-lg right-20 hidden group-hover:flex absolute ${
                    index < 5 ? "top-0 " : "bottom-0 "
                  } `}
                >
                  <video
                    controlslist="nodownload"
                    autoplay=""
                    loop=""
                    playsinline=""
                    className=" overflow-hidden rounded-md"
                  >
                    <source
                      src="https://assets.nflallday.com/editions/draw_it_up/c1182978-cae8-4b47-a2e5-2af791b429a8/play_c1182978-cae8-4b47-a2e5-2af791b429a8_draw_it_up_capture_AnimationCapture_Video_Square_Grey_1080_1080_Grey.mp4"
                      type="video/mp4"
                    />
                    <p>
                      Your browser doesn’t support mp4 or webm html5 videos.
                    </p>
                  </video>
                </div> */}
                <div className=" border-green-200/40 group-hover:bg-green-300/40 duration-300 bg-green-100/20 group-hover:border  w-6 h-6 text-sm flex items-center justify-center rounded-full text-center font-semibold col-span-1">
                  {index + 1}
                </div>
                <div className=" text-neutral-200 group-hover:text-neutral-50 ml-0 col-span-8">
                  {athleteData.name}
                </div>
                <div className=" text-neutral-200 group-hover:text-green-200 tracking-wider leading-none font-mono duration-300 text-end col-span-3">
                  {athleteData.nfl_all_day.market_cap}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Html>

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Leaderboard_Common.geometry}
      >
        <MeshReflectorMaterial
          color={0x272727}
          envMapIntensity={0.15}
          dithering={true}
          roughness={0.9}
          metalness={0}
          blur={[100, 100]}
          mixBlur={20}
          mixStrength={30}
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

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Screen_BG.geometry}
      >
        <MeshReflectorMaterial
          map={diff}
          color={0xbbbbbb}
          envMapIntensity={0}
          dithering={true}
          roughness={1}
          metalness={0}
          blur={[100, 100]}
          mixBlur={10}
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

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Frame.geometry}
      >
        <MeshReflectorMaterial
          color={0x272727}
          envMapIntensity={0.15}
          dithering={true}
          roughness={0.9}
          metalness={0}
          blur={[100, 100]}
          mixBlur={20}
          mixStrength={30}
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

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Shelves.geometry}
      >
        <MeshReflectorMaterial
          color={0x272727}
          envMapIntensity={0.15}
          dithering={true}
          roughness={0.5}
          metalness={0}
          blur={[100, 100]}
          mixBlur={10}
          mixStrength={15}
          mixContrast={0.95}
          resolution={1024}
          mirror={0.5}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
          wireframe={props.wireframe}
        />
      </mesh>

      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Chain_Case_Glass.geometry}
      >
        <meshPhysicalMaterial
          roughness={0}
          transmission={1}
          thickness={0.03}
          clearcoat={0.18}
          reflectivity={0.18}
          ior={1.55}
          color={props.secondColor}
          wireframe={props.wireframe}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/scene/Shelves.glb");
