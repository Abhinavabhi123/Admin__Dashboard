import ReactApexChart from "react-apexcharts";

export default function OrderBarChart() {
  const series = [
    {
      name: "Order",
      data: [
        2300, 3100, 4000, 10100, 4000, 3600, 3200, 2300, 1400, 800, 500, 200,
      ],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius:3,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val + "%";
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      tickAmount: 12,
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
          fontWeight: "bold", // Adjust the font weight as needed
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    title: {
      text: "Monthly Orders",
      floating: false,
      align: "center",
      style: {
        color: "#444",
        fontSize: 18,
      },
    },
    responsive: [
      {
        breakpoint: 493,
        options: {
          xaxis: {
            tickAmount: 4,
          },
          dataLabels:{
            enabled:false
          }
        },
      },
    ],
  };

  return (
    <div id="chart" className="w-full h-full md:pt-16">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}
