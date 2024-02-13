import { useEffect, useState } from "react";
import "./adminLayout.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegChartBar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function SideLayout(Props) {
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, setIsOpen } = Props;
  function changeOpen() {
    setIsOpen((prev) => !prev);
    setMenuOpen((prev) => !prev);
  }
  useEffect(() => {
      if (window.innerWidth <= 916) {
        console.log("ooo");
      setIsOpen(false);
    }
  }, [setIsOpen]);
  console.log(location);
  return (
    <div
      className={` ${!isOpen ? "md:w-20" : "md:w-1/6"} w-full rounded-r-lg ${
        menuOpen ? "h-fit" : "h-14"
      }  md:h-full transition-all  duration-300 fixed top-20 left-0 bg-[#7E30E1]`}
    >
      {/* Toggle setup laptop*/}
      <div
        className="w-6  h-6 hidden md:flex rotate-90 md:rotate-0 absolute top-11 transition-all duration-300 right-4 md:-right-3 md:top-2 bg-white bg-opacity-40 hover:bg-opacity-100 rounded-full  justify-center items-center cursor-pointer"
        onClick={changeOpen}
      >
        {isOpen ? (
          <MdKeyboardArrowLeft size={20} />
        ) : (
          <MdKeyboardArrowRight size={20} />
        )}
      </div>
      <div className="flex justify-between px-4  items-center p-2">
        <div className=" flex justify-center items-center gap-4">
          <h4 className="text-white font-semibold">Home</h4>
          <div
            className={`w-full h-[1px] ${
              isOpen ? "block" : "hidden"
            } transition-all duration-500 bg-red-600`}
          ></div>
        </div>
        <div
          className="md:hidden w-10 h-10 flex justify-center items-center"
          onClick={changeOpen}
        >
          {!menuOpen ? <HiOutlineMenuAlt1 size={20} /> : <IoClose size={20} />}
        </div>
      </div>
      <ul
        className={`w-full h-full ${
          menuOpen ? "flex" : "hidden"
        } md:flex  flex-col space-y-2 p-2 `}
      >
        <li
          className={`navList ${location === "dashboard" && "active"}`}
          onClick={() => navigate("/admin/dashboard")}
        >
          <LuLayoutDashboard size={20} className="list_icon" />
          {isOpen && (
          <a
            className="transition-all text-sm md:text-base duration-300 truncate"
          >
            {" "}
            Dashboard
          </a>
         )} 
        </li>
        <li
          className={`navList ${location === "users" && "active"}`}
          onClick={() => navigate("/admin/users")}
        >
          <FaRegUser size={20} className="list_icon" />
          {isOpen && (
            <a className="transition-all text-sm md:text-base duration-300 truncate">Users</a>
          )}
        </li>
        <li className="navList">
          <BiCategoryAlt size={20} />
          {isOpen && (
            <a className="transition-all text-sm md:text-base duration-300 truncate">Category</a>
          )}
        </li>
        <li className="navList">
          <BsBoxSeam size={20} />
          {isOpen && (
            <a className="transition-all text-sm md:text-base duration-300 truncate">Products</a>
          )}
        </li>
        <li className="navList">
          <TiShoppingCart size={20} />
          {isOpen && (
            <a className="transition-all text-sm md:text-base duration-300 truncate">Orders</a>
          )}
        </li>
        <li className="navList">
          <FaRegChartBar size={20} />
          {isOpen && (
            <a className="transition-all text-sm md:text-base duration-300 truncate">Sales</a>
          )}
        </li>
      </ul>

      {/* <div className="w-full h-20 bg-red-500">LogOut</div> */}
    </div>
  );
}
