import { Suspense, useState } from "react";
import Image from "next/image";
import Collapsible from "react-collapsible";
import { PopoverPicker } from "../components/PopoverPicker";

import { Canvas } from "@react-three/fiber";

import Meta from "../components/meta";
import Loader from "../components/loader";
import EnvContent from "../components/envContent";
import Content from "../components/content";
import TextContent from "../components/textContent";

export default function Home({ alldayMcData }) {
  const sortedAlldayMcData = alldayMcData;
  sortedAlldayMcData.sort(
    (a, b) => b.nfl_all_day.market_cap - a.nfl_all_day.market_cap
  );

  const liveMarquee = Array.from(
    sortedAlldayMcData.slice(0, 10),
    (datas) => datas.name
  ).join("  ");

  console.log(liveMarquee);

  /*  const sortedAlldayMcData = alldayMcData;
  sortedAlldayMcData.sort(
    (a, b) =>
      b.stats.dapper.nfl_all_day.market_cap -
      a.stats.dapper.nfl_all_day.market_cap
  ); */

  const [mainColor, setMainColor] = useState("#ffffff");
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [athletes, setAthletes] = useState([
    "Allday",
    "Studio",
    "Sample2",
    "Random",
  ]);
  const [athlete, setAthlete] = useState("Allday");
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
  const [wireframe, setWireframe] = useState(false);
  const [free, setFree] = useState(false);
  const [space, setSpace] = useState(7);
  const [speed, setSpeed] = useState(2);
  const [map, setMap] = useState("NYC");
  const [imageMode, setImageMode] = useState(false);
  const [website, setWebsite] = useState("NFLALLDAY.COM");
  const [marquee, setMarquee] = useState(liveMarquee);
  const [groundMap, setGroundMap] = useState();

  const [football, setFootball] = useState(5);
  const [cap, setCap] = useState(10);
  const [board, setBoard] = useState(false);
  const [boardContent, setBoardContent] = useState({
    boardContentUrl: "/videos/football.mp4",
    boardContentTitle: "NFLALLDAY Football Edition",
  });

  const handleBoard = () => {
    setBoard(true);
  };

  const handleBoardContent = (boardContent) => {
    setBoardContent(boardContent);
  };

  return (
    <div className=" bg-black">
      <Meta />

      {/* Board */}
      {/*  <div
        className={`duration-500 ring-offset-green-200 ring-green-200 hover:ring-4 hover:ring-offset-2 ring-opacity-50 justify-center grid-cols-5 rounded-3xl items-center absolute top-1/3 mx-auto left-0 right-0 w-1/2 bg-green-100/20 text-green-100 backdrop-blur-md z-50 h-auto p-4 gap-4 ${
          board ? "grid" : "hidden"
        } `}
      >
        <video className="w-full col-span-2 rounded-2xl" autoPlay controls>
          <source src={boardContent.boardContentUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="col-span-3 h-full justify-between flex space-y-2 flex-col">
          <div className="flex items-center space-x-2 w-full h-12 rounded-2xl ">
            <div className="px-4 py-2 w-full flex text-lg font-bold items-center bg-green-50/10 h-12  rounded-xl">
              {boardContent.boardContentTitle}
            </div>

            <div
              onClick={() => setBoard(false)}
              className="w-auto group cursor-pointer rounded-xl p-3 duration-500 bg-green-50/10 hover:bg-green-200/20"
            >
              <svg
                className="h-6 w-6 stroke-green-100 stroke-1 duration-300 group-hover:-rotate-90 group-hover:scale-75 group-hover:stroke-white group-hover:stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="11" x2="11" y2="1" />
                <line x1="11" y1="11" x2="1" y2="1" />
              </svg>
            </div>
          </div>

          <div className="p-4 justify-start flex flex-col space-y-2  bg-green-50/10 h-full rounded-xl ">
            <div className=" bg-green-100/20 w-1/6 rounded-md h-6"></div>
            <div className=" bg-green-100/20 w-1/12 rounded-md h-6"></div>
            <div className="hover:bg-green-200/30 duration-300 bg-green-100/20 w-1/2 rounded-lg text-sm text-green-100 hover:text-green-300 font-bold justify-center py-0.5 flex items-center cursor-pointer">
              ADD TO CART
            </div>

            <div className=" bg-green-100/20 rounded-lg h-full"></div>
          </div>
        </div>
      </div> */}

      <div className="h-screen">
        {/* Control Panel */}
        {/*  <div className="absolute top-0 items-center space-y-3 duration-500 z-40 m-10">
          <div className=" space-y-2 lg:flex items-center lg:space-x-2  duration-500 lg:space-y-0 ">
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
              className="cursor-pointer backdrop-blur-sm px-1 py-1 flex items-center duration-500 rounded-full ring-1 ring-green-300 bg-green-100/10 hover:ring-2"
            >
              <div
                className={`duration-500 ring-1 ring-inset ring-green-300  text-lg rounded-full px-3 py-1 text-white font-bold  ${
                  imageMode
                    ? "bg-green-300/50 hover:bg-green-300/70 "
                    : "hover:bg-green-300/20 hover:ring-2"
                }`}
              >
                2D
              </div>
              <div
                className={`duration-500 ring-1 ring-inset ring-green-300 text-lg rounded-full px-3 py-1 text-white font-bold  ${
                  !imageMode
                    ? "bg-green-300/50 hover:bg-green-300/70 "
                    : "hover:bg-green-300/20 hover:ring-2"
                }`}
              >
                3D
              </div>
            </div>
          </div>
          <div className={`space-y-1.5 duration-500 ${imageMode && "hidden"} `}>
            <div className="w-full ">
              <Collapsible
                contentInnerClassName=" rounded-3xl h-auto px-2 py-4 overflow-y-scroll bg-green-200/10 backdrop-blur-sm space-y-0.5 w-full scrollbar-track-green-200/20 scrollbar-thumb-green-300/30 scrollbar-thin duration-500 scrollbar-thumb-rounded-md scrollbar-thumb-rounded-md"
                contentOuterClassName=""
                className=" w-full  duration-200"
                openedClassName="w-full  duration-200"
                transitionTime={200}
                transitionCloseTime={300}
                easing="ease-in-out"
                overflowWhenOpen="visible"
                trigger={
                  <div className="group font-semibold flex w-full backdrop-blur-sm justify-between rounded-full bg-green-200/10 hover:bg-green-200/5 px-4 py-2.5 text-sm  text-green-200 duration-200  hover:text-green-200/80 lg:text-base">
                    NAME: {athlete}
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
                    NAME: {athlete}
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
                {athletes.map((a, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setAthlete(a)}
                    className={`ml-2  flex cursor-pointer items-center justify-between space-x-4  py-1.5 pl-2 pr-6 duration-100 dark:border-black  ${
                      athlete === a
                        ? "border-l-4  bg-green-300/20 hover:border-green-400 hover:bg-green-300/30 text-green-300/80 hover:text-green-100 border-green-300/60"
                        : "border-l hover:border-green-400 hover:bg-green-200/10 text-green-200/80 hover:text-green-300/80 border-green-200/40"
                    }`}
                  >
                    {a}
                  </div>
                ))}
              </Collapsible>
            </div>
            <div className="flex w-full  space-x-2">
              <PopoverPicker color={mainColor} onChange={setMainColor} />
              <PopoverPicker color={secondColor} onChange={setSecondColor} />
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
                  className="h-5 w-5 fill-green-200/80 group-hover:rotate-180   duration-500 group-hover:fill-green-200 lg:h-5 lg:w-5 "
                  fill="none"
                  viewBox="0 0 500 500"
                >
                  <path d="M165.96,50c11.03,0,20,8.97,20,20v95.96c0,11.03-8.97,20-20,20H70c-11.03,0-20-8.97-20-20V70c0-11.03,8.97-20,20-20h95.96m0-50H70C31.34,0,0,31.34,0,70v95.96c0,38.66,31.34,70,70,70h95.96c38.66,0,70-31.34,70-70V70C235.96,31.34,204.62,0,165.96,0h0Z" />
                  <path d="M430,50c11.03,0,20,8.97,20,20v95.96c0,11.03-8.97,20-20,20h-95.96c-11.03,0-20-8.97-20-20V70c0-11.03,8.97-20,20-20h95.96m0-50h-95.96c-38.66,0-70,31.34-70,70v95.96c0,38.66,31.34,70,70,70h95.96c38.66,0,70-31.34,70-70V70C500,31.34,468.66,0,430,0h0Z" />
                  <path d="M165.96,314.04c11.03,0,20,8.97,20,20v95.96c0,11.03-8.97,20-20,20H70c-11.03,0-20-8.97-20-20v-95.96c0-11.03,8.97-20,20-20h95.96m0-50H70C31.34,264.04,0,295.38,0,334.04v95.96c0,38.66,31.34,70,70,70h95.96c38.66,0,70-31.34,70-70v-95.96c0-38.66-31.34-70-70-70h0Z" />
                  <path d="M430,314.04c11.03,0,20,8.97,20,20v95.96c0,11.03-8.97,20-20,20h-95.96c-11.03,0-20-8.97-20-20v-95.96c0-11.03,8.97-20,20-20h95.96m0-50h-95.96c-38.66,0-70,31.34-70,70v95.96c0,38.66,31.34,70,70,70h95.96c38.66,0,70-31.34,70-70v-95.96c0-38.66-31.34-70-70-70h0Z" />
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
            <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-4">
              <div className="flex text-green-200/90  group-hover:text-green-200  font-semibold h-auto w-auto mr-2 flex-shrink-0 items-center justify-center">
                SPEED: {speed}
              </div>
              <input
                type="range"
                onChange={(e) => setSpeed(e.target.value)}
                value={speed}
                min="1"
                max="5"
                className="w-full cursor-pointer bg-green-200/90 group-hover:bg-green-300 group-hover:accent-green-100 accent-green-300 h-0.5 appearance-none rounded-full font-semibold  my-3 outline-none duration-500 "
              />
            </div>
            <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-4">
              <div className="flex text-green-200/80 group-hover:text-green-200  font-semibold h-auto w-auto mr-2 flex-shrink-0 items-center justify-center">
                SPACE: {space}
              </div>
              <input
                type="range"
                onChange={(e) => setSpace(e.target.value)}
                value={space}
                min="-50"
                max="25"
                className="w-full cursor-pointer bg-green-200/90  group-hover:bg-green-300 group-hover:accent-green-100 accent-green-300 h-0.5 appearance-none rounded-full font-semibold  my-3 outline-none duration-500 "
              />
            </div>

            <div className="w-full">
              <Collapsible
                contentInnerClassName=" rounded-3xl h-auto max-h-72 px-2 py-4 overflow-y-scroll bg-green-200/10 backdrop-blur-sm space-y-0.5 w-full scrollbar-track-green-200/20 scrollbar-thumb-green-300/30 scrollbar-thin duration-500 scrollbar-thumb-rounded-md scrollbar-thumb-rounded-md"
                contentOuterClassName=""
                className=" w-full  duration-200"
                openedClassName="w-full  duration-200"
                transitionTime={200}
                transitionCloseTime={300}
                easing="ease-in-out"
                overflowWhenOpen="visible"
                trigger={
                  <div className="group font-semibold flex w-full backdrop-blur-sm justify-between rounded-full bg-green-200/10 hover:bg-green-200/5 px-4 py-2.5 text-sm  text-green-200 duration-200  hover:text-green-200/80 lg:text-base">
                    CITY: {map}
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
                    CITY: {map}
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
                    onMouseEnter={() => setMap(m)}
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
            <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-4">
              <div className="flex h-auto text-green-200 text-sm font-semibold mr-2 flex-shrink-0 items-center justify-center ">
                GROUND:
              </div>
              <input
                type="text"
                onChange={(e) => setGroundMap(e.target.value)}
                value={groundMap}
                placeholder="link to ground texture"
                className="w-full text-green-200  font-semibold bg-transparent py-2.5 outline-none duration-500 placeholder:text-green-200/60 placeholder:duration-500 focus:placeholder:text-green-200/20 hover:placeholder:text-green-200/20 "
              />
            </div>
            <div className="group flex w-full items-center rounded-xl bg-green-200/10 ring-green-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-green-200/5 lg:rounded-full  lg:px-4">
              <div className="flex text-green-200/90  group-hover:text-green-200  font-semibold h-auto w-auto mr-2 flex-shrink-0 items-center justify-center">
                FOOTBALL: {football}
              </div>
              <input
                type="range"
                onChange={(e) => setFootball(e.target.value)}
                value={football}
                min="1"
                max="15"
                className="w-full cursor-pointer bg-green-200/90 group-hover:bg-green-300 group-hover:accent-green-100 accent-green-300 h-0.5 appearance-none rounded-full font-semibold  my-3 outline-none duration-500 "
              />
            </div>
            <div className="group flex w-full items-center rounded-xl bg-neutral-200/10 ring-neutral-200/30 backdrop-blur-sm px-2 duration-500 hover:bg-neutral-200/5 lg:rounded-full  lg:px-4">
              <div className="flex text-neutral-200/90  group-hover:text-neutral-200  font-semibold h-auto w-auto mr-2 flex-shrink-0 items-center justify-center">
                Cap: {15 - football}
              </div>
              <input
                disabled
                type="range"
                onChange={(e) => setCap(e.target.value)}
                value={cap}
                min="1"
                max="15"
                className="w-full cursor-pointer bg-neutral-200/90 group-hover:bg-neutral-300 group-hover:accent-neutral-100 accent-neutral-300 h-0.5 appearance-none rounded-full font-semibold  my-3 outline-none duration-500 "
              />
            </div>
            <div
              onClick={() => setWireframe((prev) => !prev)}
              className="group cursor-pointer flex w-auto items-center rounded-xl bg-yellow-200/10  backdrop-blur-sm text-lg  text-yellow-500 hover:text-yellow-300 font-bold px-2 duration-500 hover:bg-yellow-200/5 lg:rounded-full  lg:px-4 lg:py-0.5"
            >
              dev_wireframe: {wireframe.toString()}
            </div>
            <div
              onClick={() => setFree((prev) => !prev)}
              className="group cursor-pointer flex w-auto items-center rounded-xl bg-yellow-200/10  backdrop-blur-sm text-lg  text-yellow-500 hover:text-yellow-300 font-bold px-2 duration-500 hover:bg-yellow-200/5 lg:rounded-full  lg:px-4 lg:py-0.5"
            >
              dev_freecam: {free.toString()}
            </div>
          </div>
        </div> */}

        {/* 2D Version */}

        <Image
          className="absolute top-0 duration-500 w-screen z-10 "
          src="/2d.png"
          width={1920}
          height={1080}
          alt="2d"
        />

        {/* 3D Canvas */}
        <Canvas
          shadows={true}
          className={`absolute top-0 z-30 w-full h-full duration-500 ${
            imageMode && "hidden"
          }`}
          camera={{
            position: [-6, 7, 7],
          }}
        >
          <Suspense fallback={<Loader />}>
            <EnvContent free={free} />
            <Content
              map={map}
              wireframe={wireframe}
              groundMap={groundMap}
              football={football}
              cap={15 - football}
              handleBoard={handleBoard}
              handleBoardContent={handleBoardContent}
              athlete={athlete}
              mainColor={mainColor}
              secondColor={secondColor}
              sortedAlldayMcData={sortedAlldayMcData}
            />

            {/*  <TextContent
              website={website}
              marquee={marquee}
              space={space}
              speed={speed}
              mainColor={mainColor}
            /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  /* https://api.athlete.studio/staging/v1/dashboard */
  /* https://api.athlete.studio/production/v1/athletes/ */
  const alldayMcRes = await fetch(
    " https://api.athlete.studio/staging/v1/vshop "
  );
  const alldayMcData = await alldayMcRes.json();

  return {
    props: {
      alldayMcData,
    },
  };
};
