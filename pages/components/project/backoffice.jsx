import React, { useState } from "react";
import dynamic from 'next/dynamic';
import {Breadcrumb, Card, Col, Row, Table, Badge } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 백오피스 대시보드 상단 카드 데이터
const backofficeTopCards = [
  { label: '총 사용자 수', value: '3,842', icon: 'fa-user', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { label: '시스템 상태', value: '정상', icon: 'fa-circle-check', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  { label: '오늘 로그인 수', value: '276', icon: 'fa-rotate-right', color: '#6c4cf1', bg: 'rgba(108,76,241,0.08)' },
  { label: '미해결 이슈', value: '12', icon: 'fa-circle-exclamation', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
];

// 사용자 활동 추이 (라인차트)
const userActivityLineOptions = {
  chart: { type: 'line', height: 220, toolbar: { show: false } },
  xaxis: { categories: ['6/13', '6/14', '6/15', '6/16', '6/17', '6/18', '6/19'], labels: { style: { fontSize: '13px' } } },
  colors: ['#60a5fa', '#22c55e', '#fbbf24'],
  legend: { position: 'top', fontSize: '13px' },
  stroke: { width: 3, curve: 'smooth' },
  grid: { strokeDashArray: 4 },
  dataLabels: { enabled: false },
};
const userActivityLineSeries = [
  { name: '활성 사용자', data: [1200, 1250, 1300, 1400, 1450, 1500, 1550] },
  { name: '신규 가입', data: [100, 120, 110, 130, 140, 135, 150] },
  { name: '방문자', data: [2000, 2100, 2200, 2300, 2400, 2600, 2800] },
];

// 시스템 리소스 사용량 (막대차트)
const systemResourceBarOptions = {
  chart: { type: 'bar', height: 220, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 6, columnWidth: '40%' } },
  xaxis: { categories: ['6/14', '6/15', '6/16', '6/17', '6/18', '6/19'], labels: { style: { fontSize: '13px' } } },
  colors: ['#60a5fa', '#22c55e', '#fbbf24', '#f472b6'],
  legend: { position: 'top', fontSize: '13px' },
  grid: { strokeDashArray: 4 },
  dataLabels: { enabled: false },
};
const systemResourceBarSeries = [
  { name: 'CPU', data: [70, 80, 65, 75, 60, 85] },
  { name: 'RAM', data: [60, 75, 70, 80, 65, 90] },
  { name: '디스크', data: [40, 55, 50, 60, 45, 70] },
  { name: '네트워크', data: [30, 40, 35, 45, 38, 50] },
];

// 최근 활동 내역 테이블 데이터
const recentActivities = [
  { time: '2025-06-19 14:32:15', user: '김지연', type: '로그인', status: '성공', ip: '192.168.1.45', result: '정상 처리됨' },
  { time: '2025-06-19 14:28:03', user: '박현우', type: '권한 변경', status: '성공', ip: '192.168.1.23', result: '사용자 "이상민" 권한 변경' },
  { time: '2025-06-19 14:15:47', user: '이승민', type: '데이터 수정', status: '성공', ip: '192.168.1.87', result: '사용자 정보 업데이트' },
  { time: '2025-06-19 14:02:31', user: '정혜선', type: '로그인', status: '실패', ip: '192.168.1.102', result: '비밀번호 오류 (3회 시도)' },
  { time: '2025-06-19 13:58:16', user: '최윤서', type: '설정 변경', status: '성공', ip: '192.168.1.56', result: '시스템 알림 설정 변경' },
];

const activityTypeColor = {
  '로그인': 'primary',
  '권한 변경': 'info',
  '데이터 수정': 'warning',
  '설정 변경': 'secondary',
};
const activityStatusColor = {
  '성공': 'success',
  '실패': 'danger',
};

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

const ROWS_PER_PAGE = 5;

const WebServiceDashboard = () => {
  // 페이징 상태
  const [pageIndex, setPageIndex] = useState(0);
  // 빠른 설정 체크박스 상태
  const [settings, setSettings] = useState({
    maintenance: false,
    autobackup: true,
    twofa: true,
    loginAlert: true,
    anonymousStats: false,
    logChange: false,
  });
  const pageCount = Math.ceil(recentActivities.length / ROWS_PER_PAGE);
  const pageOptions = Array.from({ length: pageCount }, (_, i) => i);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;
  const gotoPage = (idx) => setPageIndex(idx);
  const previousPage = () => setPageIndex((idx) => Math.max(idx - 1, 0));
  const nextPage = () => setPageIndex((idx) => Math.min(idx + 1, pageCount - 1));
  const pagedRows = recentActivities.slice(pageIndex * ROWS_PER_PAGE, (pageIndex + 1) * ROWS_PER_PAGE);

  return (
    <div>
      <Seo title="백오피스 대시보드" />
      {/* breadcrumb */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">백오피스 대시보드</span>
          <div style={{ color: '#888', fontSize: 15 }}>시스템 현황 및 주요 지표를 확인하세요.</div>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              프로젝트
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item " active aria-current="page">
              백오피스
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* 상단 카드 */}
      <Row className="mb-3 g-3">
        {backofficeTopCards.map((card, idx) => (
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
      {/* 사용자 활동 추이 & 시스템 리소스 사용량 */}
      <Row className="mb-3 g-3 align-items-stretch">
        <Col md={6}>
          <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 320, height: '100%' }}>
            <Card.Body style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>사용자 활동 추이</span>
                <span style={{ marginLeft: 'auto', color: '#888', fontSize: 14 }}>최근 업데이트: 2025-06-19</span>
              </div>
              <ReactApexChart options={{...userActivityLineOptions, chart: {...userActivityLineOptions.chart, height: 260}}} series={userActivityLineSeries} type="line" height={260} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 320, height: '100%' }}>
            <Card.Body style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>시스템 리소스 사용량</span>
                <span style={{ marginLeft: 'auto', color: '#888', fontSize: 14 }}>최근 업데이트: 2025-06-19</span>
              </div>
              <ReactApexChart options={{...systemResourceBarOptions, chart: {...systemResourceBarOptions.chart, height: 260}}} series={systemResourceBarSeries} type="bar" height={260} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* 최근 활동 내역 테이블 */}
      <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5' }}>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 18 }}>최근 활동 내역</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="btn btn-outline-secondary btn-sm" style={{ fontWeight: 500, fontSize: 14 }}><i className="fa fa-filter" style={{ marginRight: 6 }} />필터</button>
              <button className="btn btn-outline-secondary btn-sm" style={{ fontWeight: 500, fontSize: 14 }}><i className="fa fa-download" style={{ marginRight: 6 }} />내보내기</button>
            </div>
          </div>
          <Table hover responsive style={{ marginBottom: 0 }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr style={{ fontSize: 15 }}>
                <th>활동 시간</th>
                <th>사용자</th>
                <th>활동 유형</th>
                <th>상태</th>
                <th>IP 주소</th>
                <th>처리 결과</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((row, idx) => (
                <tr key={idx} style={{ fontSize: 15 }}>
                  <td>{row.time}</td>
                  <td>{row.user}</td>
                  <td><Badge bg={activityTypeColor[row.type]} style={{ fontSize: 13, borderRadius: 8, padding: '4px 12px' }}>{row.type}</Badge></td>
                  <td><Badge bg={activityStatusColor[row.status]} style={{ fontSize: 13, borderRadius: 8, padding: '4px 12px' }}>{row.status}</Badge></td>
                  <td>{row.ip}</td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-block d-sm-flex mt-4 ">
            <span>
              Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
            </span>
            <span className="ms-sm-auto ">
              <button className="btn btn-default tablebutton me-2 d-sm-inline d-block my-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' Previous '}</button>
              <button className="btn btn-default tablebutton me-2 my-1" onClick={previousPage} disabled={!canPreviousPage}>{' << '}</button>
              <button className="btn btn-default tablebutton me-2 my-1" onClick={previousPage} disabled={!canPreviousPage}>{' < '}</button>
              <button className="btn btn-default tablebutton me-2 my-1" onClick={nextPage} disabled={!canNextPage}>{' > '}</button>
              <button className="btn btn-default tablebutton me-2 my-1" onClick={nextPage} disabled={!canNextPage}>{' >> '}</button>
              <button className="btn btn-default tablebutton me-2 d-sm-inline d-block my-1" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{' Next '}</button>
            </span>
          </div>
        </Card.Body>
      </Card>
      {/* 최근 활동 내역 하단: 시스템 알림 & 빠른 설정 */}
      <Row className="mt-4 g-3" style={{ display: 'flex' }}>
        {/* 시스템 알림 */}
        <Col md={6} xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 320, height: '100%', flex: 1 }}>
            <Card.Body style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>시스템 알림</span>
                <span style={{ marginLeft: 'auto', color: '#6366f1', fontSize: 15, cursor: 'pointer', fontWeight: 500 }}>모두 보기</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* 알림 리스트 (하드코딩) */}
                <div style={{ display: 'flex', alignItems: 'flex-start', background: '#fef2f2', borderRadius: 12, padding: '14px 16px', gap: 14 }}>
                  <i className="fa fa-circle-xmark" style={{ color: '#ef4444', fontSize: 20, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>데이터베이스 백업 실패</div>
                    <div style={{ color: '#888', fontSize: 14 }}>자동 데이터베이스 백업이 실패했습니다. 저장 공간을 확인하세요.</div>
                  </div>
                  <div style={{ color: '#bbb', fontSize: 13, minWidth: 60, textAlign: 'right' }}>15분 전</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', background: '#fef9c3', borderRadius: 12, padding: '14px 16px', gap: 14 }}>
                  <i className="fa fa-triangle-exclamation" style={{ color: '#fbbf24', fontSize: 20, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>서버 CPU 사용량 높음</div>
                    <div style={{ color: '#888', fontSize: 14 }}>서버 CPU 사용량이 85%를 초과했습니다. 성능 저하가 발생할 수 있습니다.</div>
                  </div>
                  <div style={{ color: '#bbb', fontSize: 13, minWidth: 60, textAlign: 'right' }}>1시간 전</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', background: '#e0e7ff', borderRadius: 12, padding: '14px 16px', gap: 14 }}>
                  <i className="fa fa-circle-info" style={{ color: '#6366f1', fontSize: 20, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>시스템 업데이트 예정</div>
                    <div style={{ color: '#888', fontSize: 14 }}>2025-06-20 02:00에 시스템 유지보수가 예정되어 있습니다. 약 30분간 서비스가 중단될 수 있습니다.</div>
                  </div>
                  <div style={{ color: '#bbb', fontSize: 13, minWidth: 60, textAlign: 'right' }}>3시간 전</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', background: '#dcfce7', borderRadius: 12, padding: '14px 16px', gap: 14 }}>
                  <i className="fa fa-circle-check" style={{ color: '#22c55e', fontSize: 20, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>보안 스캔 완료</div>
                    <div style={{ color: '#888', fontSize: 14 }}>정기 보안 취약점 스캔이 완료되었습니다. 발견된 위험 요소가 없습니다.</div>
                  </div>
                  <div style={{ color: '#bbb', fontSize: 13, minWidth: 60, textAlign: 'right' }}>5시간 전</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* 빠른 설정 */}
        <Col md={6} xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card style={{ borderRadius: 16, border: '1px solid #f1f3f5', minHeight: 320, height: '100%', flex: 1 }}>
            <Card.Body style={{ padding: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>빠른 설정</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* 설정 스위치 (상태 기반) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>시스템 유지보수 모드</span><br />
                    <span style={{ color: '#888', fontSize: 14 }}>사용자 접근을 제한하고 관리자만 접속 가능합니다.</span>
                  </span>
                  <input type="checkbox" style={{ width: 36, height: 20 }}
                    checked={settings.maintenance}
                    onChange={e => setSettings(s => ({ ...s, maintenance: e.target.checked }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>자동 백업</span><br />
                    <span style={{ color: '#888', fontSize: 14 }}>매일 자정에 데이터베이스 자동 백업을 실행합니다.</span>
                  </span>
                  <input type="checkbox" style={{ width: 36, height: 20 }}
                    checked={settings.autobackup}
                    onChange={e => setSettings(s => ({ ...s, autobackup: e.target.checked }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>이중 인증(2FA)</span><br />
                    <span style={{ color: '#888', fontSize: 14 }}>모든 관리자 계정에 이중 인증을 필수로 적용합니다.</span>
                  </span>
                  <input type="checkbox" style={{ width: 36, height: 20 }}
                    checked={settings.twofa}
                    onChange={e => setSettings(s => ({ ...s, twofa: e.target.checked }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>로그인 실패 알림</span><br />
                    <span style={{ color: '#888', fontSize: 14 }}>연속 3회 이상 로그인 실패 시 관리자에게 알림을 보냅니다.</span>
                  </span>
                  <input type="checkbox" style={{ width: 36, height: 20 }}
                    checked={settings.loginAlert}
                    onChange={e => setSettings(s => ({ ...s, loginAlert: e.target.checked }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>익명 사용 통계</span><br />
                    <span style={{ color: '#888', fontSize: 14 }}>시스템 개선을 위한 익명 사용 데이터를 수집합니다.</span>
                  </span>
                  <input type="checkbox" style={{ width: 36, height: 20 }}
                    checked={settings.anonymousStats}
                    onChange={e => setSettings(s => ({ ...s, anonymousStats: e.target.checked }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <input type="checkbox" style={{ width: 16, height: 16, marginRight: 6 }}
                    checked={settings.logChange}
                    onChange={e => setSettings(s => ({ ...s, logChange: e.target.checked }))}
                  />
                  <span style={{ color: '#888', fontSize: 14 }}>변경 사항을 로그에 기록</span>
                </div>
              </div>
              <button className="btn btn-primary w-100 mt-4" style={{ fontWeight: 600, fontSize: 17, borderRadius: 8 }}>설정 저장</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WebServiceDashboard;

// 레이아웃(헤더, 사이드바 등) 적용
WebServiceDashboard.layout = "Contentlayout"; 