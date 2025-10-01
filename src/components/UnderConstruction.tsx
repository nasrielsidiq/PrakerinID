import { BrainCircuit } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="fixed flex flex-col  w-full h-full justify-center z-10 bg-white">
      <BrainCircuit className="w-15 h-15 text-gray-500 mx-auto" />
      <h1 className="text-accent text-center font-bold">
        This Page Is Under Construction
      </h1>
      {/* <div className="flex justify-center mt-4">
                <span className="animate-spin rounded-full h-8 w-8 border-5 border-t-4 border-b-4 border-x-accent border-y-accent/50"></span>
            </div> */}
    </div>
  );
}
