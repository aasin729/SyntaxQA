import React from "react";
import dynamic from 'next/dynamic';
import Seo from "@/shared/layout-components/seo/seo";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { Breadcrumb, Col, Row, Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 테이블 컬럼 정의
const COLUMNS = [
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

// 테이블 데이터
const DATATABLE = [
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
  },
  {
    status: "통과",
    testcase: "로그인 인증 테스트",
    feature: "인증 시스템",
    owner: "김태영",
    ownerInitial: "KT",
    ownerColor: "#f59e0b", // 주황
    date: "2025-06-15",
    priority: "높음"
  },
  {
    status: "실패",
    testcase: "알림 발송 테스트",
    feature: "알림 시스템",
    owner: "박서연",
    ownerInitial: "PS",
    ownerColor: "#ec4899", // 분홍
    date: "2025-06-14",
    priority: "중간"
  }
];

// 검색 필터 컴포넌트
const GlobalFilter = ({ filter, setFilter }) => {
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

const summaryData = [
  { icon: "fa fa-list", label: "총 테스트케이스", value: 248, color: "primary" },
  { icon: "fa fa-check-circle", label: "통과", value: 186, color: "success" },
  { icon: "fa fa-times-circle", label: "실패", value: 32, color: "danger" },
  { icon: "fa fa-clock", label: "진행률", value: "87.9%", color: "warning" },
];

const barOptions = {
  chart: { type: 'bar', height: 250, toolbar: { show: false }, stacked: true },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['UI/UX', '인증 시스템', '알림 시스템', '결제 시스템', '상품 관리', '회원 관리'],
    labels: { style: { fontSize: '13px', fontWeight: 500 } },
  },
  colors: ['#60a5fa', '#fbbf24', '#22c55e', '#ef4444'],
  legend: {
    position: 'bottom',
    fontSize: '13px',
    fontWeight: 500,
    markers: { radius: 8 },
  },
  grid: { strokeDashArray: 4 },
};
const barSeries = [
  { name: '통과', data: [40, 35, 30, 45, 38, 42] },
  { name: '스킵', data: [2, 1, 2, 0, 2, 1] },
  { name: '미시작', data: [3, 2, 4, 1, 2, 3] },
  { name: '실패', data: [5, 7, 6, 4, 8, 2] },
];
const lineOptions = {
  chart: { type: 'line', height: 250, toolbar: { show: false } },
  xaxis: {
    categories: ['6/12', '6/13', '6/14', '6/15', '6/16', '6/17', '6/18'],
    labels: { style: { fontSize: '13px', fontWeight: 500 } },
  },
  colors: ['#60a5fa', '#22c55e', '#ef4444'],
  legend: {
    position: 'bottom',
    fontSize: '13px',
    fontWeight: 500,
    markers: { radius: 8 },
  },
  stroke: { width: 3, curve: 'smooth' },
  grid: { strokeDashArray: 4 },
};
const lineSeries = [
  { name: '테스트 수량', data: [20, 30, 35, 40, 45, 55, 65] },
  { name: '통과', data: [15, 22, 28, 32, 36, 44, 52] },
  { name: '실패', data: [2, 3, 4, 5, 6, 7, 9] },
];

const Dashboard = () => {
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: DATATABLE,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const FormSize = [
    { value: "5", label: "Show 5" },
    { value: "10", label: "Show 10" },
    { value: "15", label: "Show 15" },
  ];

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <Seo title={"Dashboard1"} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">대시보드</span>
          <p>테스트 진행 상황 및 주요 지표를 확인하세요</p>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb>
            <Breadcrumb.Item className=" tx-15" href="#!">
              메인메뉴
            </Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">
              대시보드
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* 상단 요약 카드 */}
      <Row className="mb-4 g-3">
        {summaryData.map((item, idx) => (
          <Col key={idx} md={3} sm={6} xs={12}>
            <div
              className="d-flex align-items-center p-4 bg-white rounded-4"
              style={{
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                minHeight: 90,
              }}
            >
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle me-3`}
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor:
                    item.color === "primary"
                      ? "rgba(99,102,241,0.15)"
                      : item.color === "success"
                      ? "rgba(34,197,94,0.15)"
                      : item.color === "danger"
                      ? "rgba(239,68,68,0.15)"
                      : item.color === "warning"
                      ? "rgba(251,191,36,0.15)"
                      : "#f3f4f6",
                }}
              >
                <i
                  className={`${item.icon} text-${item.color}`}
                  style={{ fontSize: 40 }}
                />
              </div>
              <div>
                <div style={{ fontSize: 16, color: '#808080' }}>{item.label}</div>
                <div className="fw-bold" style={{ fontSize: 22 }}>{item.value}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* 그래프 영역 */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="fw-bold mb-2">기능별 테스트 현황</div>
              <ReactApexChart options={barOptions} series={barSeries} type="bar" height={250} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="fw-bold mb-2">일별 테스트 진행 추이</div>
              <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={250} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 최근 테스트케이스 테이블 */}
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">최근 테스트케이스</h4>
            </Card.Header>
            <Card.Body className="pt-0 example1-table">
              <div className="table-responsive">
                <div className="d-sm-flex">
                  <Form.Group className='mb-3'>
                    <Select
                      classNamePrefix="selectform"
                      options={FormSize}
                      placeholder='Select'
                      onChange={(e) => setPageSize(Number(e.value))}
                    />
                  </Form.Group>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <table
                  {...getTableProps()}
                  className="table table-bordered text-nowrap mb-0"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr key={Math.random()} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            key={Math.random()}
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className={column.className}
                          >
                            <span className="tabletitle">{column.render("Header")}</span>
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <i className="fa fa-angle-down"></i>
                                ) : (
                                  <i className="fa fa-angle-up"></i>
                                )
                              ) : null}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={Math.random()} className="text-center" {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td key={Math.random()} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-block d-sm-flex mt-4 ">
                  <span>
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                  </span>
                  <span className="ms-sm-auto ">
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {" Previous "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1"
                      onClick={previousPage}
                      disabled={!canPreviousPage}
                    >
                      {" << "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1"
                      onClick={previousPage}
                      disabled={!canPreviousPage}
                    >
                      {" < "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1"
                      onClick={nextPage}
                      disabled={!canNextPage}
                    >
                      {" > "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1"
                      onClick={nextPage}
                      disabled={!canNextPage}
                    >
                      {" >> "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {" Next "}
                    </Button>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Dashboard.layout = "Contentlayout";

export default Dashboard;