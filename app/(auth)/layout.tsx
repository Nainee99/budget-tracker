import Logo from "@/components/custom/Logo";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center">
      <Logo />
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default Layout;
