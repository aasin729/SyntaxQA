import React from "react";
import { Breadcrumb, Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Link from "next/link";
import * as Dashboard2data from "./dashboard2";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import {COLUMNS,DATATABLE,GlobalFilter} from "./dashboard2"
const Dashboard2com = () =>{ 
  
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: DATATABLE,
    },
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
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
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
  return(
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
      <input type="text" className="form-control w-auto" placeholder="테스트케이스 검색" />
      <Button className="ms-auto" variant="primary">+ 테스트케이스 추가</Button>
    </div>

    {/* <!-- row  --> */}
    <Row>
      <Col sm={12} className="col-12">
        <Card>
          <Card.Header>
            <h4 className="card-title">테스트 케이스</h4>
          </Card.Header>
          <Card.Body className=" pt-0">
            <div className="table-responsive">
            <>
      <div className="d-flex">
        <select
          className=" mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
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
                <th key={Math.random()}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className}
                  style={column.width ? { width: column.width } : {}}
                >
                  <span className="tabletitle">{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-up"></i>
                      )
                    ) : (
                      ""
                    )}
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
                {row.cells.map((cell, idx) => {
                  // 담당자 avatar-circle 스타일 적용 제거, 이름만 출력
                  if (cell.column.id === 'owner') {
                    return (
                      <td key={Math.random()} {...cell.getCellProps()}>{cell.value}</td>
                    );
                  }
                  // 상태/우선순위 컬러 뱃지 스타일 적용
                  if (cell.column.id === 'status' || cell.column.id === 'priority') {
                    return (
                      <td key={Math.random()} {...cell.getCellProps()}>
                        <span style={{
                          display: 'inline-block',
                          minWidth: 48,
                          padding: '2px 10px',
                          borderRadius: 12,
                          fontSize: 13,
                          fontWeight: 500,
                          background: cell.value?.props?.className?.includes('bg-danger') ? '#ffeaea'
                            : cell.value?.props?.className?.includes('bg-success') ? '#e6f4ea'
                            : cell.value?.props?.className?.includes('bg-warning') ? '#fff7e0'
                            : cell.value?.props?.className?.includes('bg-info') ? '#e6f1fa'
                            : cell.value?.props?.className?.includes('bg-secondary') ? '#f1f1f1'
                            : '#f8f9fa',
                          color: cell.value?.props?.className?.includes('bg-danger') ? '#e74c3c'
                            : cell.value?.props?.className?.includes('bg-success') ? '#27ae60'
                            : cell.value?.props?.className?.includes('bg-warning') ? '#e67e22'
                            : cell.value?.props?.className?.includes('bg-info') ? '#2980b9'
                            : cell.value?.props?.className?.includes('bg-secondary') ? '#888'
                            : '#333',
                        }}>{cell.value?.props?.children || cell.value}</span>
                      </td>
                    );
                  }
                  // 기본 렌더링
                  return (
                    <td key={Math.random()} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-block d-sm-flex mt-4 ">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
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
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" < "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {" > "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
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
    </>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* <!-- /row --> */}
  </div>
)};

Dashboard2com.propTypes = {};

Dashboard2com.defaultProps = {};

export default Dashboard2com;