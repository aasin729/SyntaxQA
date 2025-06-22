import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(()=>import('react-apexcharts'), { ssr: false })
// import ReactApexChart from "react-apexcharts";

export class Statistics1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          name: "Total Orders",
          data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
        },
        {
          name: "Total Sales",
          data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 280,
        },
        grid: {
          borderColor: "#f2f6f7",
          show: true,
        },
        colors: ['var(--primary-bg-color)' || "#38cab3", "#e4e7ed"],
        plotOptions: {
      
          bar: {
            borderradius: "5px",
            colors: {
              ranges: [
                {
                  from: -100,
                  to: -46,
                  color: "#ebeff5",
                },
                {
                  from: -45,
                  to: 0,
                  color: "#ebeff5",
                },
              ],
            },
            columnWidth: "40%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 4,
          colors: ["transparent"],
        },
        legend: {
          show: true,
          position: "top",
        },
        xaxis: {
          type: "month",
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "sep",
            "oct",
            "nov",
            "dec",
          ],
          axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            rotate: -90,
          },
        },
        yaxis: {
          title: {
            text: "Growth",
            style: {
              color: "#adb5be",
              fontSize: "14px",
              fontFamily: "poppins, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            },
          },
        },
        fill: {
          opacity: 1
        },

      },


    };
  }



  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={280} />
      </div>
    )
  }
}
export class Viewers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          name: "Male",
          data: [51, 44, 55, 42, 58, 50, 62],
        },
        {
          name: "Female",
          data: [56, 58, 38, 50, 64, 45, 55],
        },
      ],
      options: {
        chart: {
          height: 315,
          type: "line",
          toolbar: {
            show: false,
          },
          background: "none",
          fill: "#fff",
        },
        grid: {
          borderColor: "#f2f6f7",
        },
        colors: ['var(--primary-bg-color)' || "#38cab3", "#e4e7ed"],
        background: "transparent",
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },

        legend: {
          show: true,
          position: "top",
        },
        xaxis: {
          show: false,
          axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            rotate: -90,
          },
        },
        yaxis: {
          show: false,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },

    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={300} />
      </div>
    )
  }
}
export const Radialbar = {
  className: "forth circle",
  series: [85],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  options: {
    colors: ['var(--primary-bg-color)'],

    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        hollow: {},
      },
    },
  },
};

export const COLUMNS = [
  {
    Header: "상태",
    accessor: "status",
    className: "text-center",
    Cell: ({ value }) => (
      <span className={`badge rounded-pill ${value === "통과" ? "bg-success" : value === "실패" ? "bg-danger" : "bg-secondary"}`}>{value}</span>
    ),
  },
  {
    Header: "테스트케이스",
    accessor: "testcase",
  },
  {
    Header: "기능",
    accessor: "feature",
  },
  {
    Header: "담당자",
    accessor: "owner",
    className: "text-center",
    Cell: ({ row }) => (
      <span className="d-flex align-items-center justify-content-center">
        <span style={{
          background: row.original.ownerColor,
          color: "#fff",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: 14,
          marginRight: 8
        }}>{row.original.ownerInitial}</span>
        {row.original.owner}
      </span>
    ),
  },
  {
    Header: "최종 수정일",
    accessor: "date",
  },
  {
    Header: "우선순위",
    accessor: "priority",
    className: "text-center",
    Cell: ({ value }) => (
      <span className={`badge rounded-pill ${value === "높음" ? "bg-danger" : value === "중간" ? "bg-warning text-dark" : "bg-secondary"}`}>{value}</span>
    ),
  },
];

export const DATATABLE = [
  {
    status: "통과",
    testcase: "회원가입 유효성 검사",
    feature: "회원 관리",
    owner: "정현우",
    ownerInitial: "JH",
    ownerColor: "#3b82f6", // 파랑
    date: "2025-06-17",
    priority: "높음"
  },
  {
    status: "실패",
    testcase: "결제 프로세스 테스트",
    feature: "결제 시스템",
    owner: "송지은",
    ownerInitial: "SJ",
    ownerColor: "#a78bfa", // 보라
    date: "2025-06-18",
    priority: "높음"
  },
  {
    status: "통과",
    testcase: "상품 검색 필터링",
    feature: "상품 관리",
    owner: "민지훈",
    ownerInitial: "MJ",
    ownerColor: "#22c55e", // 초록
    date: "2025-06-16",
    priority: "중간"
  }
];

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="d-flex ms-auto">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Search..."
      />
    </span>
  );
};
