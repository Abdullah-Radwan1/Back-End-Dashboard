import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <div className=" text-gray-400 flex justify-center  h-full items-center gap-4">
      <CircularProgress />
    </div>
  );
};

export default Loading;
