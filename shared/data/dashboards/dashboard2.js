import React from "react";
import {  OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import ReactApexChart from "react-apexcharts";
//Sales Activity
export class Statistics2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
         {
           name: "Sales",
           data: [32, 15, 63, 51, 136, 62, 99, 42, 178, 76, 32, 180],
         },
       ],
      options: {
        chart: {
         height: 280,
         type: "line",
         zoom: {
           enabled: false,
         },
         dropShadow: {
           enabled: true,
           enabledOnSeries: undefined,
           top: 5,
           left: 0,
           blur: 3,
           color: "#000",
           opacity: 0.1,
         },
       },
        dataLabels: {
         enabled: false,
       },
        legend: {
         position: "top",
         horizontalAlign: "left",
         offsetX: -15,
         fontWeight: "bold",
       },
       stroke: {
         curve: "smooth",
         width: "3",
       },
       grid: {
         borderColor: "#f2f6f7",
       },
       colors: ['var(--primary-bg-color)' || "#1fc5db"],
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
       xaxis: {
         type: "number",
         categories: [
           "1",
           "2",
           "3",
           "4",
           "5",
           "6",
           "7",
           "8",
           "9",
           "10",
           "11",
           "12",
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
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={270} />
      </div>
    );
  }
}
export class Budget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
         {
           name: "This Week",
           data: [44, 42, 57, 86, 58, 55, 70],
         },
         {
           name: "Last Week",
           data: [-34, -22, -37, -56, -21, -35, -60],
         },
       ],
      options: {
        chart: {
         stacked: true,
         type: "bar",
         height: 250,
          borderRadius: 5,
          toolbar: {
            show: false,
          },
       },
       grid: {
         borderColor: "#f2f6f7",
       },
       colors: ['var(--primary-bg-color)' || 'var(--primary-bg-color)', "#e4e7ed"],
        plotOptions: {
         bar: {
          
           colors: {
             ranges: [
               {
                 from: -100,
                 borderRadius: 5,
                 to: -46,
                 color: "#ebeff5",
               },
               {
                 from: -45,
                 borderRadius: 5,
                 to: 0,
                 color: "#ebeff5",
               },
             ],
           },
           columnWidth: "25%",
         },
       },
        dataLabels: {
          enabled: false,
        },
        legend: {
         show: true,
         position: "top",
       },
      },
      yaxis: {
         title: {
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
       xaxis: {
         type: "day",
         categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "sat"],
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
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={260} />
      </div>
    );
  }
}

export class Viewers1 extends React.Component {
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
        height: 270,
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
        colors: ['var(--primary-bg-color)' || 'var(--primary-bg-color)', "#e4e7ed"],
        
        background: "transparent",
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 2,
        },


        legend: {
          show: true,
          position: "top",
        },
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
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={270} />
      </div>
    );
  }
}

// =====================
// 테스트케이스 테이블 컬럼 정의 (이미지 기준)
// =====================
export const COLUMNS = [
  {
    Header: '상태',
    accessor: 'status',
    className: 'text-center',
    width: 80,
  },
  {
    Header: '테스트케이스명',
    accessor: 'name',
    className: 'text-center',
  },
  {
    Header: '기능',
    accessor: 'feature',
    className: 'text-center',
  },
  {
    Header: '담당자',
    accessor: 'owner',
    className: 'text-center',
  },
  {
    Header: '최종 수정일',
    accessor: 'lastModified',
    className: 'text-center',
  },
  {
    Header: '우선순위',
    accessor: 'priority',
    className: 'text-center',
  },
  {
    Header: '액션',
    accessor: 'action',
    className: 'text-center',
    disableSortBy: true,
    disableFilters: true,
    width: 100,
  },
];

// =====================
// 테스트케이스 테이블 데이터 예시 (이미지 기준)
// =====================
export const DATATABLE = [
  {
    status: <span className="badge bg-success">통과</span>,
    name: '회원가입 유효성 검사',
    feature: '회원 관리',
    owner: '정현우',
    lastModified: '2025-06-17',
    priority: <span className="badge bg-danger">높음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-danger">실패</span>,
    name: '결제 프로세스 테스트',
    feature: '결제 시스템',
    owner: '송지은',
    lastModified: '2025-06-18',
    priority: <span className="badge bg-danger">높음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-success">통과</span>,
    name: '상품 검색 필터링',
    feature: '상품 관리',
    owner: '민지훈',
    lastModified: '2025-06-16',
    priority: <span className="badge bg-warning">중간</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-secondary">미시행</span>,
    name: '알림 설정 저장',
    feature: '알림 시스템',
    owner: '윤서진',
    lastModified: '2025-06-15',
    priority: <span className="badge bg-info">낮음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-warning">스킵</span>,
    name: '소셜 로그인 연동',
    feature: '인증 시스템',
    owner: '한지민',
    lastModified: '2025-06-14',
    priority: <span className="badge bg-warning">중간</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-success">통과</span>,
    name: '비밀번호 변경 기능',
    feature: '회원 관리',
    owner: '정현우',
    lastModified: '2025-06-13',
    priority: <span className="badge bg-warning">중간</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-danger">실패</span>,
    name: '주문 취소 프로세스',
    feature: '결제 시스템',
    owner: '송지은',
    lastModified: '2025-06-12',
    priority: <span className="badge bg-danger">높음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-success">통과</span>,
    name: '상품 리뷰 작성',
    feature: '상품 관리',
    owner: '민지훈',
    lastModified: '2025-06-11',
    priority: <span className="badge bg-info">낮음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-secondary">미시행</span>,
    name: '투자 알림 수신 테스트',
    feature: '알림 시스템',
    owner: '윤서진',
    lastModified: '2025-06-10',
    priority: <span className="badge bg-warning">중간</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
  {
    status: <span className="badge bg-warning">스킵</span>,
    name: '2단계 인증 프로세스',
    feature: '인증 시스템',
    owner: '한지민',
    lastModified: '2025-06-09',
    priority: <span className="badge bg-danger">높음</span>,
    action: (
      <>
        <Link href="#"><i className="fa fa-edit me-2" /></Link>
        <Link href="#"><i className="fa fa-trash" /></Link>
      </>
    ),
  },
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
