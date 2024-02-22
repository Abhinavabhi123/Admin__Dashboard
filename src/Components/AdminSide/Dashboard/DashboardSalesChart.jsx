import ReactApexChart from "react-apexcharts";

export default function DashboardSalesChart() {
  const series = [
    {
      name: "Total Sales",
      data: [3001, 4000, 2800, 5100, 4200, 10500, 10000, 3100, 4000, 2800, 5100, 4200],
    },
    {
      name: "Total Profit",
      data: [1100, 3200, 4500, 3200, 3400, 5100, 4100, 1100, 3200, 4500, 3200, 3400],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false, 
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ['#ff0000', '#00ff00'], 
    },
    xaxis: {
      tickAmount: 12,
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      tickAmount: 5,
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      position: "top",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Poppins",
      fontWeight: 600,
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    fill: {
        colors: ["#fff"],
        opacity: 0,
        type: "solid",
      },
  };

  return (
    <div id="chart" className="w-full relative md:px-20">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={300}
      />
    </div>
  );
}
