import ReactApexChart from "react-apexcharts";
import { BsCurrencyDollar } from "react-icons/bs";

export default function DashboardCard(Props) {
  const { data } = Props;
  const series = [
    {
      name: "STOCK ABC",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: [data.color],
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: ["#fff"],
      opacity: 0,
      type: "solid",
    },
  };

  return (
    <div className="w-full md:w-60 h-36 rounded-md  box_shadow  border border-gray-400">
      <div className="flex py-3 px-5 justify-between items-center">
        <h1 className="font-medium">{data.name}</h1>
        {data.icon}
      </div>
      <div className="flex w-full  items-center px-4 justify-between">
        <div className="font-medium flex items-center">
          <BsCurrencyDollar size={20} />
          {data.value}
        </div>
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            width={140}
          />
        </div>
      </div>
    </div>
  );
}
