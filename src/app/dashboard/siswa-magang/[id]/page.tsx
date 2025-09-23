"use client";

import React, { use } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <div>page</div>;
};

export default page;
