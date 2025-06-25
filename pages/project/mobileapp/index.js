import React from "react";
import dynamic from 'next/dynamic';
import {Breadcrumb, Card, Col, Row, Table, Badge } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 상단 카드 데이터
const topCards = [
  { label: '총 테스트케이스', value: 186, icon: 'fa-list-check', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { label: '통과율', value: '78.5%', icon: 'fa-circle-check', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  { label: '주요 이슈', value: 12, icon: 'fa-triangle-exclamation', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  { label: '진행률', value: '82.3%', icon: 'fa-gauge-high', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
];

// iOS/Android 현황 카드 데이터
const iosStatus = { total: 92, pass: 74, fail: 8, coverage: 86, critical: 5 };
const androidStatus = { total: 94, pass: 72, fail: 12, coverage: 88, critical: 7 };

// 플랫폼별 테스트 현황(스택바)
const platformBarOptions = {
  chart: { type: 'bar', stacked: true, toolbar: { show: false }, height: 220 },
  plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '60%' } },
  xaxis: { categories: ['공통', 'Android', 'iOS'], labels: { style: { fontSize: '13px' } } },
  legend: { position: 'bottom', fontSize: '13px' },
  colors: ['#22c55e', '#ef4444', '#fbbf24', '#e5e7eb'],
  grid: { strokeDashArray: 4 },
  dataLabels: { enabled: false },
};
const platformBarSeries = [
  { name: '통과', data: [20, 40, 38] },
  { name: '실패', data: [2, 8, 6] },
  { name: '미처리', data: [3, 6, 4] },
  { name: '스킵', data: [1, 4, 2] },
];

// 일별 테스트 진행 추이(라인)
const dailyLineOptions = {
  chart: { type: 'line', height: 220, toolbar: { show: false } },
  xaxis: { categories: ['6/13', '6/14', '6/15', '6/16', '6/17', '6/18', '6/19'], labels: { style: { fontSize: '13px' } } },
  colors: ['#60a5fa', '#22c55e'],
  legend: { position: 'bottom', fontSize: '13px' },
  stroke: { width: 3, curve: 'smooth' },
  grid: { strokeDashArray: 4 },
  dataLabels: { enabled: false },
};
const dailyLineSeries = [
  { name: 'iOS', data: [10, 22, 34, 45, 56, 68, 78] },
  { name: 'Android', data: [12, 24, 36, 48, 60, 72, 80] },
];

// 최근 테스트케이스 표 데이터
const recentTestcases = [
  { status: '통과', name: '앱 로그인 화면 유효성 검사', platform: 'iOS', owner: '정하윤', date: '2025-06-18', priority: '높음' },
  { status: '실패', name: '푸시 알림 관련 오류 프로세스', platform: 'Android', owner: '송지윤', date: '2025-06-18', priority: '중간' },
  { status: '통과', name: '다크모드 전환 기능', platform: 'iOS', owner: '민지호', date: '2025-06-17', priority: '낮음'},
  { status: '미처리', name: '지연 인식 토큰', platform: 'Android', owner: '윤서진', date: '2025-06-16', priority: '높음' },
  { status: '스킵', name: '소셜 로그인 연동', platform: '공통', owner: '한지민', date: '2025-06-15', priority: '중간' },
];

// 모바일 앱 이슈 데이터
const mobileIssues = [
  {
    title: "iOS 15.4에서 카메라 접근 권한 오류",
    description: "iOS 15.4 버전에서 카메라 접근 권한을 요청할 때 앱이 간헐적으로 충돌하는 현상이 발생합니다. 권한 요청 다이얼로그가 표시된 후 사용자가 '허용'을 선택하면 앱이 종료됩니다.",
    owner: "정현우",
    date: "2025-06-18",
    platform: "iOS",
    priority: "높음",
    icon: "fa-circle-exclamation",
    iconBg: "#fee2e2",
    iconColor: "#ef4444"
  },
  {
    title: "Android 저사양 기기에서 성능 저하",
    description: "RAM 2GB 이하의 Android 기기에서 앱 실행 시 심각한 성능 저하가 발생합니다. 특히 이미지가 많은 화면에서 스크롤 시 프레임 드롭이 심하게 발생하고 UI 응답성이 떨어집니다.",
    owner: "송지윤",
    date: "2025-06-17",
    platform: "Android",
    priority: "중간",
    icon: "fa-triangle-exclamation",
    iconBg: "#fef9c3",
    iconColor: "#eab308"
  },
  {
    title: "다크모드에서 일부 텍스트 가독성 문제",
    description: "다크모드 활성화 시 일부 화면에서 텍스트와 배경 색상의 대비가 낮아 가독성이 떨어지는 문제가 있습니다. 특히 설정 화면과 프로필 화면에서 이 문제가 두드러집니다.",
    owner: "민지훈",
    date: "2025-06-16",
    platform: "공통",
    priority: "낮음",
    icon: "fa-circle-info",
    iconBg: "#dbeafe",
    iconColor: "#3b82f6"
  }
];

const statusColor = {
  '통과': 'success',
  '실패': 'danger',
  '미처리': 'warning',
  '스킵': 'secondary',
};

// 카드 컴포넌트 추출
const StatusCard = ({ title, platformIcon, version, status }) => (
  <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 200 }}>
    <Card.Body style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontWeight: 600, fontSize: 20 }}>{title}</span>
        <span style={{ marginLeft: 'auto', color: '#222', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className={platformIcon} style={{ fontSize: 20, marginRight: 2 }} /> {version}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
        <div style={{ flex: 1, background: '#fafbfc', borderRadius: 12, padding: '16px 0', textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>테스트케이스</div>
          <div style={{ fontWeight: 700, fontSize: 26 }}>{status.total}</div>
        </div>
        <div style={{ flex: 1, background: '#fafbfc', borderRadius: 12, padding: '16px 0', textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>통과</div>
          <div style={{ fontWeight: 700, fontSize: 26, color: '#22c55e' }}>{status.pass}</div>
        </div>
        <div style={{ flex: 1, background: '#fafbfc', borderRadius: 12, padding: '16px 0', textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>실패</div>
          <div style={{ fontWeight: 700, fontSize: 26, color: '#ef4444' }}>{status.fail}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 2 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ color: '#888', fontSize: 15 }}>테스트 커버리지</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginLeft: 4 }}>{status.coverage}%</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ color: '#888', fontSize: 15 }}>주요 버그</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginLeft: 4 }}>{status.critical}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, position: 'relative' }}>
          <div style={{ width: `${status.coverage}%`, height: 8, background: '#3b82f6', borderRadius: 4, position: 'absolute', left: 0, top: 0 }} />
        </div>
        <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, position: 'relative' }}>
          <div style={{ width: `${Math.min(status.critical * 10, 100)}%`, height: 8, background: '#ef4444', borderRadius: 4, position: 'absolute', left: 0, top: 0 }} />
        </div>
      </div>
    </Card.Body>
  </Card>
);

const MobileAppDashboard = () => (
  <div>
    <Seo title="모바일 앱 프로젝트 대시보드" />

       {/* <!-- breadcrumb --> */}
       <div className="breadcrumb-header justify-content-between">
      <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">모바일 앱 프로젝트 대시보드</span>
        <div style={{ color: '#888', fontSize: 15 }}>모바일 앱 테스트 진행 상황 및 주요 지표를 확인하세요.</div>
      </div>
      <div className="justify-content-center mt-2">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
            프로젝트
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="breadcrumb-item "
            active
            aria-current="page"
          >
            모바일 앱
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    {/* <!-- /breadcrumb --> */}
    {/* 상단 카드 */}
    <Row className="mb-3 g-3">
      {topCards.map((card, idx) => (
        <Col key={idx} md={3} sm={6} xs={12}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '24px 20px', border: '1px solid #f1f3f5', minHeight: 90, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <i className={`fa ${card.icon}`} style={{ color: card.color, fontSize: 22 }} />
            </div>
            <div>
              <div style={{ fontSize: 15, color: '#888', fontWeight: 500 }}>{card.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{card.value}</div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
    {/* iOS/Android 현황 */}
    <Row className="mb-3 g-3">
      <Col md={6}>
        <StatusCard title="iOS 테스트 현황" platformIcon="fab fa-apple" version="iOS 15.0+" status={iosStatus} />
      </Col>
      <Col md={6}>
        <StatusCard title="Android 테스트 현황" platformIcon="fab fa-android" version="Android 9.0+" status={androidStatus} />
      </Col>
    </Row>
    {/* 차트 2종 */}
    <Row className="mb-3 g-3">
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
          <Card.Body>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>플랫폼별 테스트 현황</div>
            <ReactApexChart options={platformBarOptions} series={platformBarSeries} type="bar" height={220} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
          <Card.Body>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>일별 테스트 진행 추이</div>
            <ReactApexChart options={dailyLineOptions} series={dailyLineSeries} type="line" height={220} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* 최근 테스트케이스 표 */}
    <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
      <Card.Body>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>최근 테스트케이스</span>
          <span style={{ marginLeft: 'auto', color: '#6c4cf1', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>모두 보기</span>
        </div>
        <Table hover responsive style={{ marginBottom: 0 }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr style={{ fontSize: 15 }}>
              <th className="text-center">상태</th>
              <th className="text-center">테스트케이스</th>
              <th className="text-center">플랫폼</th>
              <th className="text-center">담당자</th>
              <th className="text-center">최종 수행일</th>
              <th className="text-center">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {recentTestcases.map((row, idx) => (
              <tr key={idx} style={{ fontSize: 15 }}>
                <td className="text-center">
                  <Badge bg={statusColor[row.status]} style={{ fontSize: 13, borderRadius: 8, padding: '4px 12px' }}>{row.status}</Badge>
                </td>
                <td>
                  <div className="text-center" style={{ fontWeight: 500 }}>{row.name}</div>
                </td>
                <td className="text-center">{row.platform}</td>
                <td className="text-center">{row.owner}</td>
                <td className="text-center">{row.date}</td>
                <td className="text-center">
                  <Badge bg={row.priority === '높음' ? 'danger' : row.priority === '중간' ? 'warning' : 'secondary'} style={{ fontSize: 13, borderRadius: 8, padding: '4px 12px', color: row.priority === '중간' ? '#222' : undefined }}>{row.priority}</Badge>
                </td>             
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    {/* 모바일 앱 이슈 리스트 */}
    <div style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>모바일 앱 이슈</span>
        <span style={{ marginLeft: 'auto', color: '#6c4cf1', fontSize: 15, cursor: 'pointer', fontWeight: 500 }}>모두 보기</span>
      </div>
      {mobileIssues.map((issue, idx) => (
        <div key={idx} style={{
          display: 'flex', alignItems: 'flex-start', background: '#fff', borderRadius: 16, border: '1px solid #f1f3f5',
          padding: 25, marginBottom: 16, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: issue.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 18
          }}>
            <i className={`fa ${issue.icon}`} style={{ color: issue.iconColor, fontSize: 22 }} />
          </div>
          <div style={{ flex: 1, marginLeft: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
              {issue.priority === "높음" && <Badge bg="danger" style={{ fontSize: 12, borderRadius: 8, marginRight: 8 }}>높음</Badge>}
              {issue.priority === "중간" && <Badge bg="warning" style={{ fontSize: 12, borderRadius: 8, marginRight: 8, color: "#222" }}>중간</Badge>}
              {issue.priority === "낮음" && <Badge bg="primary" style={{ fontSize: 12, borderRadius: 8, marginRight: 8 }}>낮음</Badge>}
              {issue.title}
            </div>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 6 }}>{issue.description}</div>
            <div style={{ color: '#888', fontSize: 13 }}>
              {issue.owner} · {issue.date} · <i className={`fa ${issue.platform === "iOS" ? "fa-apple" : issue.platform === "Android" ? "fa-android" : "fa-mobile-alt"}`} style={{ marginRight: 2 }} /> {issue.platform}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MobileAppDashboard;

// 레이아웃(헤더, 사이드바 등) 적용
MobileAppDashboard.layout = "Contentlayout"; 