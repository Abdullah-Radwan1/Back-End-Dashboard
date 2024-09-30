import React from "react";

export const Loading = () => {
 return (
  <div className="my-24 min-h-[80vh] text-gray-400 flex justify-center items-center gap-4">
   <h2 className="text-yellow-500 text-center">Loading</h2>
   <div className="border-t-4  border-yellow-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
 );
};

export default Loading;
