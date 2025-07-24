import { Loader } from "lucide-react";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Image alt="loader" width={100} height={100} src={"/inf.svg"} />
    </div>
  );
};

export default Loading;
