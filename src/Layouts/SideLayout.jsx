import "./adminLayout.css";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BiCategoryAlt, BiLogOutCircle } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegChartBar, FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose, IoList } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

export default function SideLayout(Props) {
  const location =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState({
    product: false,
  });
  const { isOpen, setIsOpen } = Props;
  function changeOpen() {
    setIsOpen((prev) => !prev);
  }
  function changeMenuOpen() {
    setMenuOpen((prev) => !prev);
  }
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsOpen(true);
    }
  }, [setIsOpen]);

  function handleDropDown(name) {
    setDropDown((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }

  const List = (Props) => {
    const { url, icon, title, down , path } = Props;
    return (
      <li
      className={`navList pt-2 flex flex-col  items-center justify-between pe-3 ${location === path ? "active":""}`}
        onClick={() => {
          handleDropDown(down);
          if (url !== undefined) {
            navigate(`/admin/${url}`);
            setMenuOpen(false);
          }
        }}
      >
        <div className={`w-full h-full  flex justify-between items-center `}>
          <div className="flex gap-3 ">
            <div>{icon}</div>
            {isOpen && (
              <a className="text-sm md:text-base transition-all duration-700 delay-200 truncate">{title}</a>
            )}
          </div>
          {down && (
            <div className={`${isOpen ? "block" : "hidden"}`}>
              {dropDown?.[down] ? (
                <FaChevronDown
                  size={12}
                  className="rotate-180 transition-all"
                />
              ) : (
                <FaChevronDown size={12} className="transition-all" />
              )}
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <div
      className={` ${
        !isOpen ? "md:w-20 " : "md:w-[15%] md:min-w-[200px]"
      } w-full md:rounded-r-lg rounded-b-lg ${
        menuOpen ? "h-fit transition-color duration-300" : "h-14"
      }  md:h-[100%] transition-all  z-10  md:duration-200 fixed md:top-20 left-0 bg-[#75CFC0]`}
    >
      {/* :h-[40.6rem] */}
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
          <h4 className="text-black font-semibold">Home</h4>
          <div
            className={`w-full h-[1px] ${
              isOpen ? "block" : "hidden"
            } transition-all duration-500 bg-red-600`}
          ></div>
        </div>
        <div
          className="md:hidden w-10 h-10 flex justify-center items-center"
          onClick={changeMenuOpen}
        >
          {!menuOpen ? <HiOutlineMenuAlt1 size={20} /> : <IoClose size={20} />}
        </div>
      </div>
      <div className="flex w-full h-fit flex-col justify-between">
        <ul
          className={`w-full h-fit ${
            menuOpen ? "flex" : "hidden"
          } md:flex  flex-col space-y-2 p-2 `}
        >
          <List
            url={"dashboard"}
            icon={<LuLayoutDashboard size={20} className="list_icon" />}
            title="Dashboard"
            path="dashboard"
          />
          <List
            url={"customer"}
            icon={<FaRegUser size={20} className="list_icon" />}
            title="Customers"
            path="customer"
          />
          <List
            url={"categories"}
            icon={<BiCategoryAlt size={20} className="list_icon" />}
            title="Category"
            path="categories"
          />
          {/* Products section start */}
          <List
            // url={"products"}
            icon={<BsBoxSeam size={20} className="list_icon" />}
            title="Products"
            down={"product"}
            // path="product"
          />

          <ul
            className={`${
              dropDown?.product && isOpen ? "flex " : "hidden"
            } transition-all duration-700 flex-col  ms-3 gap-2 py-1 rounded-md`}
          >
            <List
              icon={<IoList size={20} className="list_icon" />}
              title="Product List"
              path="product-list"
              url={"product/product-list"}
              />
            <List
              icon={<IoMdAdd size={20} className="list_icon" />}
              title="Create Product"
              url={"product/create"}
              path="create"
            />
          </ul>
          {/* Product section end*/}
          <List
            url={"orders"}
            icon={<TiShoppingCart size={20} className="list_icon" />}
            title="Orders"
            path="orders"
          />
          <List
            url={"sales"}
            icon={<FaRegChartBar size={20} className="list_icon" />}
            title="Sales"
            path="sales"
          />
        <div
          className="w-full flex items-center  gap-2 p-5  cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <BiLogOutCircle size={20} className="text-red-500" />
          {isOpen && <a className="font-medium text-red-500 text-sm md:text-base">Logout</a>}
        </div>
        </ul>
      </div>
    </div>
  );
}
