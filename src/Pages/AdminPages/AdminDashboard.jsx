import {
  DashboardCard,
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
    <div className="w-full h-full text-black py-6 space-y-5 mt-10 md:mt-0">
      <div className="ps-4 md:ps-0">
        <h2 className="text-xl font-medium">Welcome Admin</h2>
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
      <div className="w-full h-fit  bg-transparent flex flex-col md:flex-row md:pe-3 md:gap-4">
        <div className="w-full relative py-5  md:w-[58%] h-full  box_shadow  bg-transparent flex flex-col gap-8 justify-center items-center">
          <div className="flex justify-center"><h2 className="font-semibold">Sales Overview</h2></div>
          <DashboardSalesChart />
          <Dropdown menu={menuProps} className="absolute right-8 top-12  ">
            <Button>
              <Space>
                {clickValue} <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div className="w-full md:w-[40%] h-full bg-transparent box_shadow rounded-md flex justify-center items-center" >
          <OrderChart />
        </div>
      </div>
    </div>
  );
}
