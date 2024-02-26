import * as echarts from "echarts";
import { useEffect } from "react";

export default function OrderDonutChart() {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("myChart"));
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Total Orders" },
            { value: 735, name: "Delivered" },
            { value: 580, name: "Canceled" },
            { value: 484, name: "Returned" },
          ],
        },
      ],
    };
    chart.setOption(option);
    return () => {
      chart.dispose(); // Clean up chart instance
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex justify-center pt-5">
        <h1 className="font-semibold">Order Statistics</h1>
      </div>
      <div
        id="myChart"
        className="flex justify-center items-center w-[15rem] h-[20rem] md:w-[20rem] md:h-[23rem]"
      ></div>
    </div>
  );
}
