import React, { useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  ProgressBar,
  ListGroup,
  Table,
} from "react-bootstrap";

// 테스트케이스 목록
const testCases = [
  {
    id: 1,
    name: "회원가입 유효성 검사",
    desc: "이메일, 비밀번호, 휴대폰 번호 유효성 검사",
    status: "통과",
    statusColor: "success",
    feature: "회원 관리",
    ownerName: "정현우",
    priority: "높음",
    priorityColor: "danger",
  },
  {
    id: 2,
    name: "결제 프로세스 테스트",
    desc: "신용카드, 무통장입금, 간편결제 프로세스 검증",
    status: "실패",
    statusColor: "danger",
    feature: "결제 시스템",
    ownerName: "송지은",
    priority: "높음",
    priorityColor: "danger",
  },
  {
    id: 3,
    name: "상품 검색 필터링",
    desc: "카테고리, 가격, 평점 등 필터링 기능 검증",
    status: "통과",
    statusColor: "success",
    feature: "상품 관리",
    ownerName: "민지훈",
    priority: "중간",
    priorityColor: "warning",
  },
  {
    id: 4,
    name: "알림 설정 저장",
    desc: "알림 설정 변경 후 저장 및 적용 검증",
    status: "미시작",
    statusColor: "secondary",
    feature: "알림 시스템",
    ownerName: "윤서진",
    priority: "낮음",
    priorityColor: "info",
  },
  {
    id: 5,
    name: "소셜 로그인 연동",
    desc: "카카오, 네이버, 구글 소셜 로그인 연동 검증",
    status: "스킵",
    statusColor: "warning",
    feature: "인증 시스템",
    ownerName: "한지민",
    priority: "중간",
    priorityColor: "warning",
  },
];

const runningTests = [
  { id: 1, name: "해외망 유입차단 검사", progress: 75, total: 4, done: 3 },
  { id: 2, name: "결제 프로세스 테스트", progress: 50, total: 4, done: 2 },
  { id: 3, name: "상품 정보 배달", progress: 100, total: 3, done: 3 },
  { id: 4, name: "수집 로그 연동", progress: 33, total: 6, done: 2, error: true },
];

const recentTests = [
  { id: 1, name: "해외망 유입차단 검사", status: "성공", date: "2025-06-18" },
  { id: 2, name: "결제 프로세스 테스트", status: "실패", date: "2025-06-18" },
  { id: 3, name: "알림 연동 저장", status: "성공", date: "2025-06-17" },
  { id: 4, name: "상품 정보 배달", status: "성공", date: "2025-06-17" },
];

const statsData = {
  labels: ["6/12", "6/13", "6/14", "6/15", "6/16", "6/17", "6/18"],
  success: [30, 32, 28, 35, 40, 38, 42],
  fail: [5, 4, 6, 3, 2, 4, 3],
  skip: [2, 1, 1, 0, 1, 0, 1],
};

const BarChart = () => (
  <div style={{ height: 180, display: "flex", alignItems: "flex-end", gap: 8, position: "relative" }}>
    {statsData.labels.map((label, idx) => (
      <div key={label} style={{ flex: 1, textAlign: "center" }}>
        <div style={{ height: statsData.success[idx] * 2, background: "#38cab3", marginBottom: 2 }} />
        <div style={{ height: statsData.fail[idx] * 2, background: "#f66", marginBottom: 2 }} />
        <div style={{ height: statsData.skip[idx] * 2, background: "#ccc", marginBottom: 2 }} />
        <div style={{ fontSize: 12 }}>{label}</div>
      </div>
    ))}
    <div style={{ position: "absolute", right: 10, top: 0, fontSize: 12 }}>
      <span style={{ color: "#38cab3" }}>■</span> 성공 &nbsp;
      <span style={{ color: "#f66" }}>■</span> 실패 &nbsp;
      <span style={{ color: "#ccc" }}>■</span> 건너뜀
    </div>
  </div>
);

const RunATestPage = () => {
  const [selectedCases, setSelectedCases] = useState([]);
  const [env, setEnv] = useState("개발 환경");
  const [browser, setBrowser] = useState("Chrome");
  const [saveScreenshot, setSaveScreenshot] = useState(true);
  const [saveResult, setSaveResult] = useState(false);
  const [schedule, setSchedule] = useState("now");

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <Seo title="테스트 실행" />

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">테스트 실행</span>
          <p>테스트케이스를 선택하고 실행 환경을 설정하여 테스트를 실행할 수 있습니다.</p>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              메인메뉴
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item" active>
              테스트 실행
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row>
        {/* 좌측 영역 */}
        <Col xl={8} lg={7}>
          {/* 테스트케이스 선택 */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0">테스트케이스 선택</h5>
                <Form.Control
                  size="sm"
                  className="ms-auto"
                  style={{ maxWidth: 200 }}
                  placeholder="테스트케이스 검색"
                />
              </div>
              <Table hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th style={{ width: 48, textAlign: "center" }}>
                      <Form.Check
                        type="checkbox"
                        checked={selectedCases.length === testCases.length}
                        onChange={(e) =>
                          setSelectedCases(
                            e.target.checked ? testCases.map((t) => t.id) : []
                          )
                        }
                      />
                    </th>
                    <th style={{ textAlign: "center" }}>상태</th>
                    <th style={{ textAlign: "center" }}>테스트케이스</th>
                    <th style={{ textAlign: "center" }}>기능</th>
                    <th style={{ textAlign: "center" }}>담당자</th>
                    <th style={{ textAlign: "center" }}>우선순위</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((tc) => (
                    <tr key={tc.id}>
                      <td style={{ textAlign: "center" }}>
                        <Form.Check
                          type="checkbox"
                          checked={selectedCases.includes(tc.id)}
                          onChange={(e) =>
                            setSelectedCases(
                              selectedCases.includes(tc.id)
                                ? selectedCases.filter((id) => id !== tc.id)
                                : [...selectedCases, tc.id]
                            )
                          }
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className={`badge bg-${tc.statusColor}`}
                          style={{ fontSize: 12 }}
                        >
                          {tc.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="fw-bold">{tc.name}</div>
                        <div style={{ fontSize: 13 }}>{tc.desc}</div>
                      </td>
                      <td style={{ textAlign: "center" }}>{tc.feature}</td>
                      <td style={{ textAlign: "center" }}>{tc.ownerName}</td>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className={`badge bg-${tc.priorityColor}`}
                          style={{ fontSize: 12 }}
                        >
                          {tc.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* 현재 실행 중인 테스트 */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">현재 실행 중인 테스트</h5>
              {runningTests.map((rt) => (
                <div key={rt.id} className="mb-3">
                  <div className="d-flex align-items-center mb-1">
                    <span style={{ minWidth: 180 }}>{rt.name}</span>
                    <span className="ms-auto" style={{ fontSize: 13 }}>
                      {rt.done}/{rt.total} 완료
                    </span>
                    {rt.error && (
                      <span className="badge bg-danger ms-2">실패 중지</span>
                    )}
                  </div>
                  <ProgressBar
                    now={rt.progress}
                    variant={rt.error ? "danger" : "primary"}
                    style={{ height: 8, borderRadius: 4 }}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* 우측 영역 */}
        <Col xl={4} lg={5}>
          {/* 환경 설정 */}
          <Card className="mb-4">
            <Card.Body>
              <h6>테스트 환경 설정</h6>
              <Form.Select
                size="sm"
                value={env}
                onChange={(e) => setEnv(e.target.value)}
                className="mb-2"
              >
                <option>개발 환경</option>
                <option>운영 환경</option>
              </Form.Select>
              <Form.Select
                size="sm"
                value={browser}
                onChange={(e) => setBrowser(e.target.value)}
                className="mb-2"
              >
                <option>Chrome</option>
                <option>Edge</option>
                <option>Firefox</option>
              </Form.Select>
              <Form.Check
                type="switch"
                id="screenshot"
                label="스크린샷 저장"
                checked={saveScreenshot}
                onChange={(e) => setSaveScreenshot(e.target.checked)}
              />
              <Form.Check
                type="switch"
                id="saveresult"
                label="테스트결과 저장"
                checked={saveResult}
                onChange={(e) => setSaveResult(e.target.checked)}
              />
            </Card.Body>
          </Card>

          {/* 실행 일정 */}
          <Card className="mb-4">
            <Card.Body>
              <h6>실행 일정</h6>
              <Form.Check
                type="radio"
                label="즉시 실행"
                checked={schedule === "now"}
                onChange={() => setSchedule("now")}
              />
              <Form.Check
                type="radio"
                label="예약 실행"
                checked={schedule === "reserve"}
                onChange={() => setSchedule("reserve")}
              />
            </Card.Body>
          </Card>

          {/* 최근 테스트 */}
          <Card className="mb-4">
            <Card.Body>
              <h6>최근 테스트 실행</h6>
              <ListGroup>
                {recentTests.map((r) => (
                  <ListGroup.Item
                    key={r.id}
                    className="d-flex align-items-center"
                  >
                    <span
                      className={`badge bg-${
                        r.status === "성공" ? "success" : "danger"
                      } me-2`}
                      style={{ width: 16, height: 16 }}
                    ></span>
                    <span className="flex-grow-1">{r.name}</span>
                    <span style={{ fontSize: 13, color: "#888" }}>{r.date}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* 통계 차트 */}
          <Card>
            <Card.Body>
              <h6>테스트 실행 통계</h6>
              <BarChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// Layout 적용 (예: Contentlayout.js)
RunATestPage.layout = "Contentlayout";

export default RunATestPage;
