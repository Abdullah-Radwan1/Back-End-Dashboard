import { Loader } from "lucide-react";
import React from "react";

export const Loading = () => {
  return (
    <div className=" text-gray-400 flex justify-center  h-full items-center gap-4">
      <Loader className="animate-spin justify-center items-center" />
    </div>
  );
};

export default Loading;
