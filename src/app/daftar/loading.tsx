import Loader from "@/components/loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader width={64} height={64} />
    </div>
  );
};

export default loading;
