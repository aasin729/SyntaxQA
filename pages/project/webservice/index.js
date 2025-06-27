import React from "react";
import dynamic from 'next/dynamic';
import {Breadcrumb, Card, Col, Row, Table, Badge } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// TopCard 컴포넌트 추출
const TopCard = ({ icon, color, bg, label, value }) => (
  <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '24px 20px', border: '1px solid #f1f3f5', minHeight: 90, display: 'flex', alignItems: 'center', gap: 18 }}>
    <div style={{ width: 44, height: 44, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
      <i className={`fa ${icon}`} style={{ color, fontSize: 22 }} />
    </div>
    <div>
      <div style={{ fontSize: 15, color: '#888', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
    </div>
  </div>
);

// 상단 카드 데이터 (웹 서비스 기준)
const topCards = [
  { label: '웹 테스트케이스', value: 214, icon: 'fa-list-check', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { label: '브라우저 호환성', value: '82.3%', icon: 'fa-globe', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  { label: '웹 성능 점수', value: '76/100', icon: 'fa-gauge-high', color: '#6c4cf1', bg: 'rgba(108,76,241,0.08)' },
  { label: '접근성 준수율', value: '89.7%', icon: 'fa-universal-access', color: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
];

// 브라우저별 테스트 현황
const browserStatus = [
  { name: 'Chrome', percent: 92, color: '#3b82f6', icon: 'fab fa-chrome' },
  { name: 'Firefox', percent: 87, color: '#f97316', icon: 'fab fa-firefox' },
  { name: 'Safari', percent: 78, color: '#10b981', icon: 'fab fa-safari' },
  { name: 'Edge', percent: 85, color: '#6366f1', icon: 'fab fa-edge' },
];

const browserIssues = [
  { icon: 'fa-circle-exclamation', color: '#ef4444', text: 'Safari에서 WebP 이미지 포맷 지원 문제' },
  { icon: 'fa-triangle-exclamation', color: '#f59e42', text: 'Firefox에서 CSS Grid 레이아웃 렌더링 이슈' },
  { icon: 'fa-circle-info', color: '#6366f1', text: 'IE11에서 Flexbox 지원 문제' },
];

// 웹 성능 지표
const webPerfIndicators = [
  { label: '메인로드 시간', value: '2.4초', color: '#6366f1', bar: 80 },
  { label: 'First Contentful Paint', value: '1.2초', color: '#22c55e', bar: 40 },
  { label: 'Time to Interactive', value: '3.8초', color: '#fbbf24', bar: 95 },
  { label: 'Cumulative Layout Shift', value: '0.12', color: '#6c4cf1', bar: 12 },
];

// 브라우저별 테스트 결과 (도넛)
const donutOptions = {
  chart: { type: 'donut', height: 220 },
  labels: ['통과', '실패', '미처리', '스킵'],
  colors: ['#22c55e', '#ef4444', '#fbbf24', '#e5e7eb'],
  legend: { position: 'bottom', fontSize: '13px' },
  dataLabels: { enabled: false },
};
const donutSeries = [142, 18, 32, 22];

// 접근성 준수 현황 (막대)
const accessBarOptions = {
  chart: { type: 'bar', height: 220, toolbar: { show: false } },
  plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '60%', distributed: true } },
  xaxis: { categories: ['견고성', '이해 가능성', '운용 가능성', '지각 가능성'], labels: { style: { fontSize: '13px' } } },
  colors: ['#cc3a57', '#2780ed', '#22c55e', '#f8a02c'],
  grid: { strokeDashArray: 4 },
  dataLabels: { enabled: false },
};
const accessBarSeries = [{ name: '점수', data: [88, 76, 92, 97] }];

// 상태별 뱃지 색상 매핑
const statusColor = {
  '통과': 'success',
  '실패': 'danger',
  '미처리': 'warning',
  '스킵': 'secondary',
};

// 최근 웹 테스트케이스 데이터 (이미지와 동일하게)
const recentTestcases = [
  { status: '통과', name: '반응형 레이아웃 테스트', browser: 'Chrome', browserIcon: 'fab fa-chrome', owner: '서현진',  date: '2025-06-19', priority: '높음' },
  { status: '실패', name: '웹폰트 로딩 성능 테스트', browser: 'Safari', browserIcon: 'fab fa-safari', owner: '정우성',  date: '2025-06-18', priority: '중간' },
  { status: '통과', name: '다크모드 전환 기능', browser: 'Firefox', browserIcon: 'fab fa-firefox', owner: '한지민',  date: '2025-06-17', priority: '중간' },
  { status: '미처리', name: '웹 접근성 키보드 네비게이션', browser: 'Edge', browserIcon: 'fab fa-edge', owner: '윤재현',  date: '2025-06-16', priority: '낮음' },
  { status: '스킵', name: 'IE11 호환성 테스트', browser: 'IE', browserIcon: 'fab fa-internet-explorer', owner: '민지훈',  date: '2025-06-15', priority: '낮음' },
];

// 웹 서비스 이슈 데이터 (이미지와 동일하게)
const webIssues = [
  {
    title: 'Safari에서 WebP 이미지 로딩 실패',
    description: 'Safari 브라우저에서 WebP 이미지 포맷이 제대로 로드되지 않는 문제가 발생합니다. 특히 Safari 14 이하 버전에서 이미지가 표시되지 않거나 대체 이미지가 표시되지 않습니다.',
    owner: '서현진',
    date: '2025-06-19',
    browser: 'Safari',
    browserIcon: 'fab fa-safari',
    priority: '높음'
  },
  {
    title: 'Firefox에서 CSS Grid 레이아웃 렌더링 이슈',
    description: 'Firefox 브라우저에서 CSS Grid 레이아웃이 Chrome과 다르게 렌더링되는 문제가 있습니다. 특히 grid-auto-flow 속성과 관련된 부분에서 레이아웃이 깨지는 현상이 발생합니다.',
    owner: '정우성',
    date: '2025-06-18',
    browser: 'Firefox',
    browserIcon: 'fab fa-firefox',
    priority: '중간'
  },
  {
    title: '스크린리더 호환성 문제',
    description: '일부 스크린리더(NVDA, VoiceOver)에서 동적으로 생성된 콘텐츠를 제대로 읽지 못하는 문제가 있습니다. ARIA 속성이 적용되었음에도 불구하고 스크린리더가 변경된 콘텐츠를 감지하지 못합니다.',
    owner: '한지민',
    date: '2025-06-17',
    browser: '모든 브라우저',
    browserIcon: 'fa fa-globe',
    priority: '낮음'
  }
];

const WebServiceDashboard = () => (
  <div>
    <Seo title="웹 서비스 프로젝트 대시보드" />
    {/* breadcrumb */}
    <div className="breadcrumb-header justify-content-between">
      <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">웹 서비스 프로젝트 대시보드</span>
        <div style={{ color: '#888', fontSize: 15 }}>웹 서비스 테스트 진행 상황 및 주요 지표를 확인하세요.</div>
      </div>
      <div className="justify-content-center mt-2">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
            프로젝트
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb-item " active aria-current="page">
            웹 서비스
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    {/* 상단 카드 */}
    <Row className="mb-3 g-3">
      {topCards.map((card, idx) => (
        <Col key={idx} md={3} sm={6} xs={12}>
          <TopCard {...card} />
        </Col>
      ))}
    </Row>
    {/* 브라우저별 테스트 현황 & 웹 성능 지표 */}
    <Row className="mb-3 g-3 align-items-stretch">
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 200, height: '100%' }}>
          <Card.Body style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 18 }}>브라우저별 테스트 현황</span>
              <span style={{ marginLeft: 'auto', color: '#888', fontSize: 14 }}>최근 업데이트: 2025-06-19</span>
            </div>
            <div style={{ display: 'flex', gap: 18, marginBottom: 12, marginTop: 30 }}>
              {browserStatus.map((b) => (
                <div key={b.name} style={{ flex: 1, textAlign: 'center' }}>
                  <div>
                    <i className={b.icon} style={{ fontSize: 28, color: b.color, marginBottom: 4 }} />
                  </div>
                  <div style={{ color: b.color, fontWeight: 700, fontSize: 18 }}>{b.percent}%</div>
                  <div style={{ color: '#888', fontSize: 15 }}>{b.name}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#ef4444', fontWeight: 500, fontSize: 14, marginBottom: 4, marginTop: 20 }}>주요 호환성 이슈</div>
            <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
              {browserIssues.map((issue, idx) => (
                <li key={idx} style={{ color: '#555', fontSize: 14, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className={`fa ${issue.icon}`} style={{ color: issue.color, fontSize: 14 }} /> {issue.text}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 200, height: '100%' }}>
          <Card.Body style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 18 }}>웹 성능 지표</span>
              <span style={{ marginLeft: 'auto', color: '#888', fontSize: 14 }}>최근 업데이트: 2025-06-19</span>
            </div>
            <Row>
              {webPerfIndicators.map((ind) => (
                <Col key={ind.label} md={6} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>{ind.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: ind.color }}>{ind.value}</div>
                  <div style={{ width: '100%', height: 7, background: '#e5e7eb', borderRadius: 4, marginTop: 4, position: 'relative' }}>
                    <div style={{ width: `${ind.bar}%`, height: 7, background: ind.color, borderRadius: 4, position: 'absolute', left: 0, top: 0 }} />
                  </div>
                </Col>
              ))}
            </Row>
            {/* 아래 라인 차트(더미) */}
            <div style={{ marginTop: 18 }}>
              <div style={{ width: '100%', height: 60, background: 'linear-gradient(180deg, #f3f4f6 60%, #fff 100%)', borderRadius: 8 }} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* 브라우저별 테스트 결과 & 접근성 준수 현황 */}
    <Row className="mb-3 g-3">
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
          <Card.Body>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>브라우저별 테스트 결과</div>
            <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={220} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
          <Card.Body>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>접근성 준수 현황</div>
            <ReactApexChart options={accessBarOptions} series={accessBarSeries} type="bar" height={220} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
      {/* 최근 테스트케이스 표 */}
      <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
      <Card.Body>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 18 }}>최근 웹 테스트케이스</span>
          <span style={{ marginLeft: 'auto', color: '#6c4cf1', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>모두 보기</span>
        </div>
        <Table hover responsive style={{ marginBottom: 0 }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr style={{ fontSize: 15 }}>
              <th className="text-center">상태</th>
              <th className="text-center">테스트케이스</th>
              <th className="text-center">브라우저</th>
              <th className="text-center">담당자</th>
              <th className="text-center">실행일</th>
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
                <td className="text-center">
                  <i className={row.browserIcon} style={{ fontSize: 18, marginRight: 6, color: '#888' }} /> {row.browser}
                </td>
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
    {/* 웹 서비스 이슈 리스트 */}
    <div style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>웹 서비스 이슈</span>
        <span style={{ marginLeft: 'auto', color: '#6c4cf1', fontSize: 15, cursor: 'pointer', fontWeight: 500 }}>모두 보기</span>
      </div>
      {webIssues.map((issue, idx) => (
        <div key={idx} style={{
          display: 'flex', alignItems: 'flex-start', background: '#fff', borderRadius: 16, border: '1px solid #f1f3f5',
          padding: 25, marginBottom: 16, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: issue.priority === '높음' ? '#fee2e2' : issue.priority === '중간' ? '#fef9c3' : '#dbeafe',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 18
          }}>
            <i className={issue.priority === '높음' ? 'fa fa-exclamation-circle' : issue.priority === '중간' ? 'fa fa-exclamation-triangle' : 'fa fa-info-circle'} style={{ color: issue.priority === '높음' ? '#ef4444' : issue.priority === '중간' ? '#eab308' : '#3b82f6', fontSize: 22 }} />
          </div>
          <div style={{ flex: 1, marginLeft: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
              <Badge bg={issue.priority === '높음' ? 'danger' : issue.priority === '중간' ? 'warning' : 'primary'} style={{ fontSize: 12, borderRadius: 8, marginRight: 8, color: issue.priority === '중간' ? '#222' : undefined }}>{issue.priority}</Badge>
              {issue.title}
            </div>
            
            <div style={{ color: '#555', fontSize: 15, marginBottom: 6 }}>{issue.description}</div>
            <div style={{ color: '#888', fontSize: 13 }}>
              {issue.owner} · {issue.date} · <i className={issue.browserIcon} style={{ marginRight: 2 }} /> {issue.browser}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WebServiceDashboard;

WebServiceDashboard.layout = "Contentlayout"; 