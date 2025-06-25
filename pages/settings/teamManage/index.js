import React, { useState, useMemo } from "react";
import { Breadcrumb, Card, Col, Row, Button, Table, Form, InputGroup, Dropdown, Pagination } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import AddIcon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const teamInfo = {
  name: "개발팀",
  description: "웹 및 모바일 애플리케이션 개발 담당 팀",
  created: "2024-03-15",
  members: 12,
};

const memberList = [
  { id: 1, name: "김지연", email: "jiyeon.kim@example.com", role: "팀장 / 프론트엔드 개발자", level: "관리자", levelColor: "primary", status: "활성", statusColor: "success", lastLogin: "2025-06-19 14:32" },
  { id: 2, name: "박현우", email: "hyunwoo.park@example.com", role: "백엔드 개발자", level: "매니저", levelColor: "success", status: "활성", statusColor: "success", lastLogin: "2025-06-19 13:45" },
  { id: 3, name: "이승민", email: "seungmin.lee@example.com", role: "UI/UX 디자이너", level: "멤버", levelColor: "info", status: "활성", statusColor: "success", lastLogin: "2025-06-19 11:22" },
  { id: 4, name: "정현석", email: "hyunseok.jung@example.com", role: "QA 엔지니어", level: "멤버", levelColor: "info", status: "비활성", statusColor: "secondary", lastLogin: "2025-06-18 17:05" },
  { id: 5, name: "최윤서", email: "yunseo.choi@example.com", role: "프론트엔드 개발자", level: "멤버", levelColor: "info", status: "활성", statusColor: "success", lastLogin: "2025-06-19 09:15" },
  { id: 6, name: "김성준", email: "sungjun.kim@example.com", role: "데이터 엔지니어", level: "멤버", levelColor: "info", status: "활성", statusColor: "success", lastLogin: "2025-06-19 10:42" },
  { id: 7, name: "이미지", email: "minji.lee@example.com", role: "제품 매니저", level: "뷰어", levelColor: "warning", status: "대기중", statusColor: "warning", lastLogin: "-" },
];

const ROWS_PER_PAGE = 7;

const initialPermissions = {
  admin: { name: "관리자", icon: "fe fe-shield", color: "primary", description: "모든 기능에 대한 전체 접근 권한을 가집니다.", values: { teamManage: true, teamSetting: true, permissionSetting: true, projectManage: true } },
  manager: { name: "매니저", icon: "fe fe-user-check", color: "success", description: "대부분의 기능에 접근할 수 있으나 일부 제한이 있습니다.", values: { teamManage: false, teamSetting: false, permissionSetting: false, projectManage: true } },
  member: { name: "멤버", icon: "fe fe-users", color: "info", description: "프로젝트 작업에 필요한 기본 기능에만 접근할 수 있습니다.", values: { teamManage: false, teamSetting: false, permissionSetting: false, projectManage: true } },
  viewer: { name: "뷰어", icon: "fe fe-eye", color: "warning", description: "읽기 전용 접근 권한만 가집니다.", values: { teamManage: false, teamSetting: false, permissionSetting: false, projectManage: false } },
};

const PermissionGroupCard = ({ groupKey, data, onChange }) => {
  const { name, icon, color, description, values } = data;
  
  return (
    <Card className={`mb-2 border border-${color}-subtle`}>
      <Card.Body className="pb-2 pt-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-bold mb-1"><i className={`${icon} me-1`}/> {name}</div>
            <div className="text-muted small mb-2">{description}</div>
            <div className="d-flex flex-wrap gap-3 mb-2">
              <Form.Check type="checkbox" label="팀원 관리" className="me-3" checked={values.teamManage} onChange={() => onChange(groupKey, 'teamManage')} />
              <Form.Check type="checkbox" label="팀 설정 변경" className="me-3" checked={values.teamSetting} onChange={() => onChange(groupKey, 'teamSetting')} />
              <Form.Check type="checkbox" label="권한 설정" className="me-3" checked={values.permissionSetting} onChange={() => onChange(groupKey, 'permissionSetting')} />
              <Form.Check type="checkbox" label="프로젝트 관리" className="me-3" checked={values.projectManage} onChange={() => onChange(groupKey, 'projectManage')} />
            </div>
          </div>
          <div>
            <Button variant="link" size="sm"><EditIcon fontSize="small"/></Button>
            <Button variant="link" size="sm"><DeleteIcon fontSize="small"/></Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const TeamManage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("이름순");
  const [selected, setSelected] = useState([]); // 체크박스 선택
  const [pageIndex, setPageIndex] = useState(0);
  const [permissions, setPermissions] = useState(initialPermissions);

  const handlePermissionChange = (group, permission) => {
    setPermissions(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        values: {
          ...prev[group].values,
          [permission]: !prev[group].values[permission]
        }
      }
    }));
  };

  // 필터링 및 정렬된 데이터 생성 (useMemo로 감쌈)
  const filteredData = useMemo(() =>
    memberList
      .filter(member =>
        (!search || member.name.includes(search) || member.email.includes(search)) &&
        (!status || member.status === status) &&
        (!level || member.level === level)
      )
      .sort((a, b) => {
        if (sort === "이름순") return a.name.localeCompare(b.name);
        if (sort === "최신순") return b.id - a.id;
        if (sort === "권한순") return a.level.localeCompare(b.level);
        return 0;
      })
  , [search, status, level, sort]);

  // 페이지네이션
  const pageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const pagedRows = filteredData.slice(pageIndex * ROWS_PER_PAGE, (pageIndex + 1) * ROWS_PER_PAGE);

  // 체크박스 전체 선택/해제
  const allChecked = pagedRows.length > 0 && pagedRows.every(row => selected.includes(row.id));
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(prev => Array.from(new Set([...prev, ...pagedRows.map(row => row.id)])));
    } else {
      setSelected(prev => prev.filter(id => !pagedRows.some(row => row.id === id)));
    }
  };
  const handleSelectRow = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div>
      <Seo title={"팀 관리"} />
      {/* 상단 설명 */}
      <div className="mb-3">
        <div className="main-content-title mg-b-0 mg-b-lg-1 fs-20 fw-bold">팀 관리</div>
        <div className="text-muted mt-1">팀 구성원을 관리하고 권한을 설정할 수 있습니다.</div>
      </div>

      {/* 팀 정보 카드 */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="fw-bold fs-16 mb-1">{teamInfo.name}</div>
              <div className="text-muted mb-1">{teamInfo.description}</div>
              <div className="small text-muted">생성일: {teamInfo.created} &nbsp; | &nbsp; 구성원: {teamInfo.members}명</div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="outline-secondary" className="me-2">팀 정보 수정</Button>
              <Button variant="outline-secondary">팀 설정</Button>
              <Button variant="outline-secondary" className="m-2"><AddIcon className="me-1" /> 팀원 추가</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 검색/필터/정렬/추가 */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center mb-3 filter-row">
            <Col md={2}>
              <InputGroup>
                <Form.Control placeholder="팀원 검색" value={search} onChange={e => setSearch(e.target.value)} />
              </InputGroup>
            </Col>
            <Col md={1}>
              <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">상태</option>
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
                <option value="대기중">대기중</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Form.Select value={level} onChange={e => setLevel(e.target.value)}>
                <option value="">권한</option>
                <option value="관리자">관리자</option>
                <option value="매니저">매니저</option>
                <option value="멤버">멤버</option>
                <option value="뷰어">뷰어</option>
              </Form.Select>
            </Col>
            <Col md={{ span: 3, offset: 5 }} className="d-flex justify-content-end">
              <Dropdown onSelect={setSort} className="me-2" style={{ minWidth: 120 }}>
                <Dropdown.Toggle className="w-100" id="dropdown-sort">
                  정렬: {sort} <ArrowDropDownIcon fontSize="small" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="이름순">이름순</Dropdown.Item>
                  <Dropdown.Item eventKey="최신순">최신순</Dropdown.Item> 
                  <Dropdown.Item eventKey="권한순">권한순</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button>
                <FilterListIcon fontSize="small" /> 필터
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 팀원 목록 테이블 (react-bootstrap Table + map) */}
      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover bordered className="text-nowrap mb-0 align-middle text-center">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: 40 }}>
                    <input type="checkbox" checked={allChecked} onChange={handleSelectAll} />
                  </th>
                  <th>이름</th>
                  <th>직책</th>
                  <th>권한 수준</th>
                  <th>상태</th>
                  <th>마지막 접속</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {pagedRows.map((member, idx) => (
                  <tr key={member.id}>
                    <td>
                      <input type="checkbox" checked={selected.includes(member.id)} onChange={() => handleSelectRow(member.id)} />
                    </td>
                    <td>
                      <div className="fw-semibold">{member.name}</div>
                      <div className="text-muted small">{member.email}</div>
                    </td>
                    <td>{member.role}</td>
                    <td>
                      <span className={`badge rounded-pill bg-${member.levelColor} px-3 py-2`}>{member.level}</span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill bg-${member.statusColor} px-3 py-2`}>{member.status}</span>
                    </td>
                    <td>{member.lastLogin}</td>
                    <td>
                      <Button variant="link" size="sm"><EditIcon fontSize="small" /></Button>
                      <Button variant="link" size="sm"><DeleteIcon fontSize="small" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* 하단 선택/페이지네이션 */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <Form.Select style={{width:180}}>
              <option>선택한 항목</option>
              <option>권한 변경</option>
              <option>상태 변경</option>
              <option>삭제</option>
            </Form.Select>
            <div className="d-flex align-items-center gap-2">
              <Pagination className="mb-0">
                <Pagination.First onClick={() => setPageIndex(0)} disabled={pageIndex === 0} />
                <Pagination.Prev onClick={() => setPageIndex(p => Math.max(p-1, 0))} disabled={pageIndex === 0} />
                {Array.from({ length: pageCount }, (_, i) => (
                  <Pagination.Item key={i} active={i === pageIndex} onClick={() => setPageIndex(i)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPageIndex(p => Math.min(p+1, pageCount - 1))} disabled={pageIndex >= pageCount - 1} />
                <Pagination.Last onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex >= pageCount - 1} />
              </Pagination>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 팀 권한 설정 UI */}
      <Card className="mt-5">
        <Card.Body>
          <div className="fw-bold fs-18 mb-3">팀 권한 설정</div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <span className="fw-semibold">권한 그룹</span>
            <Button variant="link" className="p-0 text-primary fw-semibold">+ 권한 그룹 추가</Button>
          </div>
          {/* 권한 그룹 목록 */}
          <div className="mb-4">
            {Object.entries(permissions).map(([key, value]) => (
              <PermissionGroupCard
                key={key}
                groupKey={key}
                data={value}
                onChange={handlePermissionChange}
              />
            ))}
          </div>
          {/* 하단 저장/취소 버튼 */}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary">취소</Button>
            <Button variant="primary">변경사항 저장</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

TeamManage.layout = "Contentlayout";

export default TeamManage;
