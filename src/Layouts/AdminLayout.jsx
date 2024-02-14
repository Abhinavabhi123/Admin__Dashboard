/* eslint-disable react/prop-types */
import { useState } from "react";
import HeaderLayout from "./HeaderLayout";
import SideLayout from "./SideLayout";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="max-w-[100vw]  h-[100vh] ">
      <div className="w-full bg-transparent h-14 md:h-20 ">
        <HeaderLayout />
      </div>
      <div className="w-full h-[40.5rem] bg-transparent flex  flex-col md:flex-row">
        <div
          className={`w-full md:w-[5.3%] transition-all duration-300 bg-transparent h-24 md:h-full`}
        >
          <SideLayout setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div
          className={`w-full md:w-[94.7%] transition-all duration-300 md:ps-4 mt-2 md:mt-0 h-full`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
