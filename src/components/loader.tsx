import React from "react";

const Loader = ({
  width = 32,
  height = 32,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <div className="flex justify-center w-full mt-4 py-6">
      <span
        className="animate-spin rounded-full border-5 border-t-4 border-b-4 border-x-accent border-y-accent/50"
        style={{ width, height, borderWidth: Math.min(width, height) / 8 }}
      ></span>
    </div>
  );
};

export default Loader;
