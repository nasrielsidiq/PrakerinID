import React from "react";

const LoaderData: React.FC = () => {
  return (
    <div className="flex justify-center w-full mt-4 py-6">
      <span className="animate-spin rounded-full h-8 w-8 border-5 border-t-4 border-b-4 border-x-accent border-y-accent/50"></span>
    </div>
  );
};

export default LoaderData;
