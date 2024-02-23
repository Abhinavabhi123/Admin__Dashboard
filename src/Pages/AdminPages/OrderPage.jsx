import { OrderBarChart, OrderDonutChart, OrderTable } from "../../Components";

export default function OrderPage() {
  return (
    <div className="w-full h-full text-black py-6 space-y-5 mt-10 md:mt-0 ">
      <div className="w-full px-3 md:pe-4">
        <div className="w-full h-20  bg-primary flex items-center justify-between px-3 md:px-10 rounded-md shadow-xl">
          <h1 className="md:text-xl text-base font-medium">Orders</h1>
        </div>
      </div>
      <div className="w-full min-h-[30rem] px-4">
        <div className="w-full h-full  flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:h-full flex justify-center items-center">
            <OrderBarChart />
          </div>
          <div className="w-full md:w-1/2 md:h-full flex justify-center items-center md:pt-20">
            <OrderDonutChart />
          </div>
        </div>
      </div>
      <div className="w-full h-[30rem] px-2">
        <div className="w-full h-full rounded-md">
          <div className="flex justify-center py-3">
            <h2 className="text-sm md:text-xl md:font-medium">Order Details</h2>
          </div>
          <OrderTable/>
        </div>
      </div>
    </div>
  );
}
