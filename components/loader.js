import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const loading = useProgress();
  console.log(loading);
  return (
    <Html
      className="bg-green-100/20 w-[30vw] rounded-2xl px-12 py-8 text-green-100 backdrop-blur-md space-y-4 border-2 border-green-50/40"
      center
    >
      <div className="font-mono text-lg tracking-tight justify-between flex">
        <div>
          {loading.loaded}/{loading.total}
        </div>
        <div>
          ...
          {loading.item}
        </div>
      </div>
      <div className=" p-3 text-green-50 tracking-wide rounded-xl text-2xl text-center font-bold bg-green-100/10 border border-green-100/40">
        RENDERING...
      </div>
    </Html>
  );
}
