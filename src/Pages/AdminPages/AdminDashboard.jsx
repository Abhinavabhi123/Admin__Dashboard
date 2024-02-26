import {
  DashboardCard,
  DashboardOrderTable,
  DashboardSalesChart,
  OrderChart,
} from "../../Components";
import { IoPulse } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { purchased } from "../../Services/Constants";
import { BsCurrencyDollar } from "react-icons/bs";

export default function AdminDashboard() {
  const items = [
    {
      label: "Monthly",
      key: "0",
    },
    {
      label: "Weekly",
      key: "1",
    },
    {
      label: "Daily",
      key: "2",
    },
  ];
  const [clickValue, setClickValue] = useState(items[0].label);

  const dashboardTopData = [
    {
      name: "Total Sales",
      value: 562544,
      icon: <IoPulse size={25} color="#ff9900" />,
      color: "#ff9900",
    },
    {
      name: "Total Orders",
      value: 202554,
      icon: <HiOutlineShoppingBag size={25} color="#ff3333" />,
      color: "#ff3333",
    },
    {
      name: "Total Earnings",
      value: 202554,
      icon: <PiCurrencyCircleDollar size={25} color="#33cc33" />,
      color: "#33cc33",
    },
    {
      name: "Total Users",
      value: 15102,
      icon: <FaRegUser size={20} color="3399ff" />,
      color: "#3399ff",
    },
  ];

  const handleMenuClick = (e) => {
    console.log(items[parseInt(e.key)], "eeee");
    setClickValue(items[e.key].label);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="w-full h-full text-black py-6 space-y-5 mt-10 md:mt-0 ">
      <div className="w-full px-3 md:pe-4">
        <div className="w-full h-20  bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
          <h1 className="md:text-xl text-base font-medium">Welcome Admin</h1>
        </div>
      </div>
      {/* Dashboard card  */}
      <div className="w-full p-5 bg-transparent">
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-4 auto-cols-max">
          {dashboardTopData.map((item, i) => (
            <div key={i} className="flex justify-center">
              <DashboardCard data={item} />
            </div>
          ))}
        </div>
      </div>
      {/* Dashboard middle section */}
      <div className="w-full h-fit  bg-transparent flex flex-col md:flex-row px-4 md:pe-3 gap-4">
        <div className="w-full relative py-5  md:w-[60%] h-full  box_shadow  rounded-md bg-transparent flex flex-col gap-8 justify-center items-center">
          <div className="flex justify-center">
            <h2 className="font-semibold">Sales Overview</h2>
          </div>
          <DashboardSalesChart />
          <Dropdown menu={menuProps} className="absolute right-8 top-12  ">
            <Button>
              <Space>
                {clickValue} <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div className="w-full md:w-[40%] h-full bg-transparent box_shadow rounded-md flex justify-center items-center">
          <OrderChart />
        </div>
      </div>
      {/* Dashboard bottom section */}
      <div className="w-full h-[32rem] bg-transparent flex flex-col md:flex-row gap-4 md:pe-4 p-4">
        <div className="w-full md:w-[60%] md:h-full bg-transparent rounded-md box_shadow p-4 space-y-3">
          <div>
            <h3 className="font-medium text-lg">Recent Orders</h3>
          </div>
          <div>
            <p className="text-sm">Total 2450 Orders </p>
          </div>
          <div className="w-full">
            <DashboardOrderTable />
          </div>
        </div>
        <div className="w-full md:w-[40%] md:h-full bg-transparent rounded-md box_shadow p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Most Selling</h3>
            <SlOptionsVertical className="cursor-pointer" />
          </div>
          <div className="w-full h-full space-y-3 flex flex-col justify-center items-center">
            {purchased.map((item, i) => (
              <div
                key={i}
                className="w-full h-16 box_shadow rounded-md flex items-center justify-between px-2"
              >
                <div className="flex w-[33%] items-center gap-2">
                  <img
                    src={item.ProductImage}
                    alt="product image"
                    className="w-12 h-12 rounded-md"
                  />
                  <h2 className="text-xs md:text-sm">{item.Name}</h2>
                </div>

                <p className="text-center w-[33%] text-xs md:text-sm">
                  {item.Price}
                </p>

                <div className="w-[33%] text-center flex items-center justify-center">
                  <BsCurrencyDollar />
                  <p className="text-xs md:text-sm font-medium">{item.Earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
