/* eslint-disable react/prop-types */
import { useState } from "react";
import HeaderLayout from "./HeaderLayout";
import SideLayout from "./SideLayout";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-[100vw]  h-[100vh] ">
      <div className="w-full bg-transparent h-14 md:h-20 ">
        <HeaderLayout />
      </div>
      <div className="w-full h-[40.5rem] bg-transparent flex  flex-col md:flex-row">
        <div
          className={`w-full ${!isOpen?"md:w-[5.3%]":"md:w-[250px]"} transition-all duration-300 bg-transparent h-24 md:h-full`}
        >
          <SideLayout setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div
          className={`w-full ${isOpen?"md:w-5/6":"md:w-[95%]"}  transition-all duration-300 md:ps-4 mt-2 md:mt-0 h-full`}
        >
          {/* md:w-[94.7%] */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
