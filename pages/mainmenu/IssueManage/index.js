import React, { useMemo, useState } from "react";
import dynamic from 'next/dynamic';
import { Breadcrumb, Card, Col, Row, Button, Form } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 상단 요약 카드 데이터
const summaryData = [
  { label: "전체 이슈", value: 42, unit: "건", diffType: "down", diffPercent: 12, icon: "fa-circle-info", iconBg: "rgba(99,102,241,0.12)", iconColor: "#6366f1" },
  { label: "미해결", value: 18, unit: "건", diffType: "up", diffPercent: 5, icon: "fa-clock", iconBg: "rgba(99,102,241,0.08)", iconColor: "#64748b" },
  { label: "진행 중", value: 15, unit: "건", diffType: "up", diffPercent: 8, icon: "fa-rotate-right", iconBg: "rgba(99,102,241,0.12)", iconColor: "#60a5fa" },
  { label: "해결됨", value: 9, unit: "건", diffType: "up", diffPercent: 15, icon: "fa-circle-check", iconBg: "rgba(34,197,94,0.12)", iconColor: "#22c55e" },
];

// 도넛 차트 (우선순위별 이슈)
const donutOptions = {
  chart: { type: 'donut' },
  labels: ['높음', '중간', '낮음'],
  legend: { position: 'bottom', fontSize: '14px' },
  colors: ['#ef4444', '#fbbf24', '#60a5fa'],
  dataLabels: { enabled: true },
};
const donutSeries = [12, 18, 12];

// 라인 차트 (상태별 이슈 추이)
const lineOptions = {
  chart: { type: 'line', height: 250, toolbar: { show: false } },
  xaxis: { categories: ['5/15', '5/22', '5/29', '6/5', '6/12'], labels: { style: { fontSize: '13px', fontWeight: 500 } } },
  colors: ['#60a5fa', '#22c55e', '#ef4444'],
  legend: { position: 'bottom', fontSize: '13px', fontWeight: 500, markers: { radius: 8 } },
  stroke: { width: 3, curve: 'smooth' },
  grid: { strokeDashArray: 4 },
};
const lineSeries = [
  { name: '미해결', data: [15, 16, 17, 18, 18] },
  { name: '진행 중', data: [10, 12, 13, 14, 15] },
  { name: '해결됨', data: [5, 6, 7, 8, 9] },
];

// 테이블 컬럼/데이터
const COLUMNS = [
  { Header: '상태', accessor: 'status', className: 'text-center' },
  { Header: '이슈 제목', accessor: 'title', className: 'text-center',
    Cell: ({ row }) => <><div className="fw-bold">{row.original.title}</div><div className="text-muted" style={{fontSize:13}}>{row.original.desc}</div></> },
  { Header: '우선순위', accessor: 'priority', className: 'text-center' },
  { Header: '담당자', accessor: 'owner', className: 'text-center' },
  { Header: '발생일', accessor: 'created', className: 'text-center' },
  { Header: '해결기한', accessor: 'deadline', className: 'text-center' },
  { Header: '관리', accessor: 'actions', className: 'text-center', disableSortBy: true, disableFilters: true },
];
const DATATABLE = [
  { status: '미해결', title: '로그인 페이지에서 비밀번호 재설정 기능 동작하지 않음', desc: 'ISSUE-3546', priority: '높음', owner: '김지연', created: '2025-06-10', deadline: '2025-06-23', createdBy: '김지연' },
  { status: '진행 중', title: '상품 목록 페이지에서 필터 적용 시 결과가 갱신되지 않음', desc: 'ISSUE-3547', priority: '중간', owner: '박유진', created: '2025-06-12', deadline: '2025-06-16', createdBy: '박유진' },
  { status: '해결됨', title: '모바일 환경에서 메뉴 바텀에 제대로 표시되지 않음', desc: 'ISSUE-3548', priority: '낮음', owner: '이승민', created: '2025-06-08', deadline: '2025-06-12', createdBy: '이승민' },
  { status: '미해결', title: '결제 완료 후 주문 확인 이메일이 발송되지 않음', desc: 'ISSUE-3549', priority: '높음', owner: '김성호', created: '2025-06-15', deadline: '2025-06-19', createdBy: '김성호' },
  { status: '진행 중', title: '관리자 페이지에서 그래프가 1회에 1개씩밖에 표시되지 않음', desc: 'ISSUE-3550', priority: '중간', owner: '오지현', created: '2025-06-11', deadline: '2025-06-23', createdBy: '오지현' },
  { status: '미해결', title: '프로필 사진 업로드 시 이미지 크롭이 올바르게 동작하지 않는 오류', desc: 'ISSUE-3551', priority: '높음', owner: '최유나', created: '2025-06-13', deadline: '2025-06-21', createdBy: '최유나' },
  { status: '진행 중', title: '활동기록 시 이력 입력 창크기 변동되는 시간에 너무 짧음', desc: 'ISSUE-3552', priority: '낮음', owner: '정민수', created: '2025-06-09', deadline: '2025-06-15', createdBy: '정민수' },
];

// 필터용 옵션
const statusOptions = ['상태', '전체', '미해결', '진행 중', '해결됨'];
const priorityOptions = ['우선순위', '전체', '높음', '중간', '낮음'];
const ownerOptions = ['담당자', '전체', ...Array.from(new Set(DATATABLE.map(d => d.owner)))];

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="d-flex ms-auto">
      <input
        value={filter || ""}
        onChange={e => setFilter(e.target.value)}
        className="form-control mb-2"
        placeholder="이슈 검색..."
        style={{ minWidth: 200 }}
      />
    </span>
  );
}

const IssueDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [status, setStatus] = useState('상태');
  const [priority, setPriority] = useState('우선순위');
  const [owner, setOwner] = useState('담당자');

  const allCount = DATATABLE.length;
  const myName = '김지연'; // 실제 로그인 유저 이름으로 교체 필요
  const assignedCount = DATATABLE.filter(row => row.owner === myName).length;
  const createdCount = DATATABLE.filter(row => row.createdBy === myName).length;
  const recentCount = Math.min(DATATABLE.length, 5);

  const tabFilteredData = useMemo(() => {
    if (activeTab === 'all') return DATATABLE;
    if (activeTab === 'assigned') return DATATABLE.filter(row => row.owner === myName);
    if (activeTab === 'created') return DATATABLE.filter(row => row.createdBy === myName);
    if (activeTab === 'recent') return [...DATATABLE].sort((a, b) => b.created.localeCompare(a.created)).slice(0, 5);
    return DATATABLE;
  }, [activeTab]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    return tabFilteredData.filter(row =>
      ((status === '상태' || status === '전체') || row.status === status) &&
      ((priority === '우선순위' || priority === '전체') || row.priority === priority) &&
      ((owner === '담당자' || owner === '전체') || row.owner === owner)
    );
  }, [tabFilteredData, status, priority, owner]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
          disableSortBy: true,
          disableFilters: true,
          width: 40,
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps, headerGroups, getTableBodyProps, prepareRow, state, setGlobalFilter, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize
  } = tableInstance;
  const { pageIndex, pageSize } = state;

  return (
    <div>
      <Seo title="이슈 관리 대시보드" />
      {/* breadcrumb */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">이슈 관리</span>
          <p>테스트 활동 중 발견된 이슈를 관리하고 해결 상태를 추적합니다.</p>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              메인메뉴
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item " active aria-current="page">
              이슈 관리
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* 요약 카드 */}
      <Row className="mb-4 g-3">
        {summaryData.map((item, idx) => (
          <Col key={idx} md={3} sm={6} xs={12}>
            <div
              className="bg-white"
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                padding: "28px 24px 20px 24px",
                minHeight: 120,
                position: "relative",
                border: "1px solid #f1f3f5",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 24,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className={`fa ${item.icon}`} style={{ color: item.iconColor, fontSize: 20 }} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{item.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700 }}>{item.value}</span>
                <span style={{ fontSize: 15, color: "#888" }}>{item.unit}</span>
              </div>
              <div style={{ fontSize: 13, marginTop: 4, color: item.diffType === "up" ? "#22c55e" : "#ef4444", fontWeight: 500 }}>
                {item.diffType === "up" ? "↑" : "↓"} {item.diffPercent}%
                <span style={{ color: "#888", fontWeight: 400, marginLeft: 4 }}>지난 주 대비</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {/* 차트 영역 */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="fw-bold mb-2">우선순위별 이슈</div>
              <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={250} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="fw-bold mb-2">상태별 이슈 추이</div>
              <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={250} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* 탭 바 */}
      <div
        className="issue-tab-bar"
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: '0 24px',
          border: '1px solid #f1f3f5',
          marginBottom: 18,
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.02)',
          borderBottom: '1.5px solid #f1f3f5',
        }}
      >
        {[
          { key: 'all', label: `모든 이슈`, count: allCount },
          { key: 'assigned', label: `내게 할당된 이슈`, count: assignedCount },
          { key: 'created', label: `내가 생성한 이슈`, count: createdCount },
          { key: 'recent', label: `최근 활동`, count: recentCount },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontWeight: 500,
              fontSize: 15,
              color: activeTab === tab.key ? '#6c4cf1' : '#222',
              borderBottom: activeTab === tab.key ? '3px solid #6c4cf1' : '3px solid transparent',
              padding: '0 0 13px 0',
              marginRight: 36,
              transition: 'color 0.2s, border-bottom 0.2s',
              position: 'relative',
              height: 56,
              cursor: 'pointer',
            }}
          >
            {tab.label}
            <span style={{
              marginLeft: 4,
              color: activeTab === tab.key ? '#6c4cf1' : '#888',
              fontWeight: 500,
              fontSize: 15,
            }}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>
      {/* 필터/검색 영역 */}
      <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
        <Form.Select className="w-auto" value={status} onChange={e => setStatus(e.target.value)}>{statusOptions.map(opt => <option key={opt}>{opt}</option>)}</Form.Select>
        <Form.Select className="w-auto" value={priority} onChange={e => setPriority(e.target.value)}>{priorityOptions.map(opt => <option key={opt}>{opt}</option>)}</Form.Select>
        <Form.Select className="w-auto" value={owner} onChange={e => setOwner(e.target.value)}>{ownerOptions.map(opt => <option key={opt}>{opt}</option>)}</Form.Select>
      </div>
      {/* 테이블 */}
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">이슈 목록</h4>
        </Card.Header>
        <Card.Body className="pt-0">
          <div className="table-responsive">
            <table {...getTableProps()} className="table table-bordered text-nowrap mb-0">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        key={column.id}
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={column.className}
                        style={column.width ? { width: column.width } : {}}
                      >
                        <span className="tabletitle">{column.render("Header")}</span>
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-up"></i>) : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr key={row.id} {...row.getRowProps()} className="text-center">
                      {row.cells.map((cell) => {
                        if (cell.column.id === 'owner') {
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>{cell.value}</td>
                          );
                        }
                        if (cell.column.id === 'status') {
                          let badgeClass = '';
                          if (cell.value === '미해결') badgeClass = 'bg-danger';
                          else if (cell.value === '진행 중') badgeClass = 'bg-info';
                          else if (cell.value === '해결됨') badgeClass = 'bg-success';
                          else badgeClass = 'bg-secondary';
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>
                              <span className={`badge rounded-pill ${badgeClass}`} style={{ fontSize: 13 }}>{cell.value}</span>
                            </td>
                          );
                        }
                        if (cell.column.id === 'priority') {
                          let badgeClass = '';
                          if (cell.value === '높음') badgeClass = 'bg-danger';
                          else if (cell.value === '중간') badgeClass = 'bg-warning text-dark';
                          else if (cell.value === '낮음') badgeClass = 'bg-secondary';
                          else badgeClass = 'bg-info';
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>
                              <span className={`badge rounded-pill ${badgeClass}`} style={{ fontSize: 13 }}>{cell.value}</span>
                            </td>
                          );
                        }
                        if (cell.column.id === 'deadline') {
                          const today = new Date();
                          const yyyy = today.getFullYear();
                          const mm = String(today.getMonth() + 1).padStart(2, '0');
                          const dd = String(today.getDate()).padStart(2, '0');
                          const todayStr = `${yyyy}-${mm}-${dd}`;
                          const isToday = cell.value === todayStr;
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>
                              <span style={{ color: isToday ? '#ef4444' : undefined }}>{cell.value}</span>
                            </td>
                          );
                        }
                        if (cell.column.id === 'actions') {
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>
                              <div style={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
                                <Button variant="link" size="sm" style={{ color: '#6c4cf1', padding: 0, fontSize: 13 }} title="수정">
                                  <i className="fa fa-edit" style={{ color: '#222' }} />
                                </Button>
                                <Button variant="link" size="sm" style={{ color: '#ef4444', padding: 0, fontSize: 13 }} title="삭제">
                                  <i className="fa fa-trash" style={{ color: '#222' }} />
                                </Button>
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td key={cell.column.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* 페이지네이션 */}
            <div className="d-flex flex-wrap align-items-center justify-content-between mt-4 gap-2">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: 14, color: "#888" }}>
                  Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span>
                <Form.Select className="w-auto ms-2" style={{ minWidth: 140 }}>
                  <option>선택한 항목</option>
                  <option>삭제</option>
                  <option>엑셀 다운로드</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2 ms-auto">
                <Form.Select
                  className="w-auto"
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}
                  style={{ minWidth: 90 }}
                >
                  {[5, 10, 15].map(size => <option key={size} value={size}>페이지 {size}</option>)}
                </Form.Select>
                <span>
                  <Button variant="" className="btn-default tablebutton me-2 d-sm-inline d-block my-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' Previous '}</Button>
                  <Button variant="" className="btn-default tablebutton me-2 my-1" onClick={() => previousPage()} disabled={!canPreviousPage}>{' << '}</Button>
                  <Button variant="" className="btn-default tablebutton me-2 my-1" onClick={() => previousPage()} disabled={!canPreviousPage}>{' < '}</Button>
                  <Button variant="" className="btn-default tablebutton me-2 my-1" onClick={() => nextPage()} disabled={!canNextPage}>{' > '}</Button>
                  <Button variant="" className="btn-default tablebutton me-2 my-1" onClick={() => nextPage()} disabled={!canNextPage}>{' >> '}</Button>
                  <Button variant="" className="btn-default tablebutton me-2 d-sm-inline d-block my-1" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{' Next '}</Button>
                </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

IssueDashboard.layout = "Contentlayout";
export default IssueDashboard; 