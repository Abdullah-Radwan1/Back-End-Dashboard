import React from "react";

const loading = () => {
 return (
  <div className="my-24 min-h-[80vh] text-green-700 flex justify-center items-center gap-4">
   loading...{" "}
   <div className="border-t-4  border-green-700 rounded-full w-16 h-16 animate-spin"></div>
  </div>
 );
};

export default loading;
