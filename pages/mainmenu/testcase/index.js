import React, { useMemo } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';

const DATATABLE = [
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

const COLUMNS = [
  { Header: '상태', accessor: 'status', className: 'text-center' },
  { Header: '테스트케이스명', accessor: 'name', className: 'text-center' },
  { Header: '기능', accessor: 'feature', className: 'text-center' },
  { Header: '담당자', accessor: 'owner', className: 'text-center' },
  { Header: '최종 수정일', accessor: 'lastModified', className: 'text-center' },
  { Header: '우선순위', accessor: 'priority', className: 'text-center' },
  { Header: '액션', accessor: 'action', className: 'text-center', disableSortBy: true, disableFilters: true },
];

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="d-flex ms-auto">
      <input
        value={filter || ''}
        onChange={e => setFilter(e.target.value)}
        className="form-control mb-2"
        placeholder="테스트케이스 검색"
        style={{ minWidth: 200 }}
      />
    </span>
  );
}

const Testcase = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATATABLE, []);
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
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
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Seo title={"Dashboard2"}/>
      <div>
        {/* <!-- breadcrumb --> */}
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <span className="main-content-title mg-b-0 mg-b-lg-1">테스트케이스</span>
            <p>테스트 케이스를 생성하고 관리할 수 있습니다.</p>
          </div>
          <div className="justify-content-center mt-2">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
                메인메뉴
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item "
                active
                aria-current="page"
              >
                테스트케이스
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        {/* <!-- /breadcrumb --> */}

        {/* 상단 필터/검색/버튼 영역 */}
        <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
          <select className="form-select w-auto">
            <option>상태</option>
            <option>통과</option>
            <option>실패</option>
            <option>미시행</option>
            <option>스킵</option>
          </select>
          <select className="form-select w-auto">
            <option>기능</option>
            <option>회원 관리</option>
            <option>결제 시스템</option>
            <option>상품 관리</option>
            <option>알림 시스템</option>
            <option>인증 시스템</option>
          </select>
          <select className="form-select w-auto">
            <option>담당자</option>
            <option>정현우</option>
            <option>송지은</option>
            <option>민지훈</option>
            <option>윤서진</option>
            <option>한지민</option>
          </select>
          <select className="form-select w-auto">
            <option>우선순위</option>
            <option>높음</option>
            <option>중간</option>
            <option>낮음</option>
          </select>
          <Button className="ms-auto" variant="primary">+ 테스트케이스 추가</Button>
        </div>

        {/* 테이블 영역 */}
        <Row>
          <Col sm={12} className="col-12">
            <Card>
              <Card.Header>
                <h4 className="card-title">테스트 케이스</h4>
              </Card.Header>
              <Card.Body className="pt-0 example1-table">
                <div className="table-responsive">
                  <div className="d-sm-flex">
                    <div className="mb-3" style={{ minWidth: 120 }}>
                      <select
                        className="form-select"
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                      >
                        <option value={5}>Show 5</option>
                        <option value={10}>Show 10</option>
                        <option value={15}>Show 15</option>
                      </select>
                    </div>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  </div>
                  <table {...getTableProps()} className="table table-bordered text-nowrap mb-0">
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th
                              key={column.id}
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              className={column.className}
                            >
                              <span className="tabletitle">{column.render('Header')}</span>
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
                      {page.map(row => {
                        prepareRow(row);
                        return (
                          <tr key={row.id} className="text-center" {...row.getRowProps()}>
                            {row.cells.map(cell => (
                              <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
                        {' Previous '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-1"
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                      >
                        {' << '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-1"
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                      >
                        {' < '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-1"
                        onClick={nextPage}
                        disabled={!canNextPage}
                      >
                        {' > '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-1"
                        onClick={nextPage}
                        disabled={!canNextPage}
                      >
                        {' >> '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {' Next '}
                      </Button>
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <!-- /row --> */}
      </div>
    </>
  );
};

Testcase.layout = "Contentlayout";

export default Testcase;