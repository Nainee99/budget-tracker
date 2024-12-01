import NavBar from "@/components/custom/NavBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" relative flex flex-col h-screen w-full ">
      <NavBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
