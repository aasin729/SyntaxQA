import React, { useState } from "react";
import { Button, Switch, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Select, MenuItem, Tabs, Tab, Box, Typography, Slider } from "@mui/material";
import Seo from "@/shared/layout-components/seo/seo";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

const languages = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];
const timezones = [
  { label: "(GMT+09:00) 서울, 도쿄, 오사카", value: "Asia/Seoul" },
  { label: "(GMT+00:00) 런던", value: "Europe/London" },
];
const dateFormats = [
  { label: "YYYY-MM-DD (2025-06-19)", value: "YYYY-MM-DD" },
  { label: "DD-MM-YYYY (19-06-2025)", value: "DD-MM-YYYY" },
  { label: "MM-DD-YYYY (06-19-2025)", value: "MM-DD-YYYY" },
];
const timeFormats = [
  { label: "24시간 (14:30)", value: "24" },
  { label: "12시간 (2:30 PM)", value: "12" },
];

const tabs = ["일반 설정", "고급 설정", "개인 설정"];

const SystemSettings = ({ settings, onSettingChange }) => (
  <Box sx={{ background: "#fff", borderRadius: 3, p: 3, boxShadow: 1, mb: 2 }}>
    <Typography variant="h6" fontWeight={700} mb={1.5} fontSize={16}>시스템 설정</Typography>
    <Box display="flex" gap={3} flexWrap="wrap" mb={2.5}>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <FormLabel sx={{ mb: 0.5, fontSize: 13 }}>언어</FormLabel>
        <Select name="language" value={settings.language} onChange={onSettingChange} size="small">
          {languages.map(l => (
            <MenuItem key={l.value} value={l.value} sx={{ fontSize: 13 }}>{l.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 240 }} size="small">
        <FormLabel sx={{ mb: 0.5, fontSize: 13 }}>시간대</FormLabel>
        <Select name="timezone" value={settings.timezone} onChange={onSettingChange} size="small">
          {timezones.map(tz => (
            <MenuItem key={tz.value} value={tz.value} sx={{ fontSize: 13 }}>{tz.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box display="flex" gap={4} flexWrap="wrap">
      <FormControl size="small">
        <FormLabel sx={{ fontSize: 13 }}>날짜 형식</FormLabel>
        <RadioGroup name="dateFormat" value={settings.dateFormat} onChange={onSettingChange} row>
          {dateFormats.map(df => (
            <FormControlLabel key={df.value} value={df.value} control={<Radio size="small" />} label={<Typography fontSize={13}>{df.label}</Typography>} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl size="small">
        <FormLabel sx={{ fontSize: 13 }}>시간 형식</FormLabel>
        <RadioGroup name="timeFormat" value={settings.timeFormat} onChange={onSettingChange} row>
          {timeFormats.map(tf => (
            <FormControlLabel key={tf.value} value={tf.value} control={<Radio size="small" />} label={<Typography fontSize={13}>{tf.label}</Typography>} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  </Box>
);

const NotificationSettings = ({ settings, onSettingChange }) => {
  const notificationItems = [
    { key: 'emailAlert', title: '이메일 알림', description: '중요 알림 및 업데이트를 이메일로 받습니다.' },
    { key: 'browserAlert', title: '브라우저 알림', description: '브라우저에서 푸시 알림을 받습니다.' },
    { key: 'soundAlert', title: '소리 알림', description: '알림 발생 시 소리를 재생합니다.' },
    { key: 'weeklySummary', title: '주간 활동 요약', description: '매주 활동 요약 보고서를 이메일로 받습니다.' },
  ];

  return (
    <Box sx={{ background: "#fff", borderRadius: 3, p: 3, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight={700} mb={1.5} fontSize={16}>알림 설정</Typography>
      <Box display="flex" flexDirection="column" gap={1.5}>
        {notificationItems.map(item => (
          <Box key={item.key} display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontWeight={600} fontSize={14}>{item.title}</Typography>
              <Typography color="text.secondary" fontSize={12}>{item.description}</Typography>
            </Box>
            <Switch name={item.key} checked={settings[item.key]} onChange={onSettingChange} size="small" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const passwordPolicies = [
  { key: 'minLength', label: '최소 8자 이상 필요' },
  { key: 'uppercase', label: '대문자 포함 필요' },
  { key: 'specialChar', label: '특수 문자 포함 필요' },
  { key: 'number', label: '숫자 포함 필요' },
  { key: 'change90', label: '90일마다 비밀번호 변경 요구' },
  { key: 'noReuse', label: '이전 비밀번호 재사용 금지 (5개)' },
];

const deviceIcons = {
  Chrome: '🟢',
  Safari: '🔵',
  Firefox: '🟣',
};

const loginHistorySample = [
  {
    device: 'Windows PC (Chrome)',
    location: '서울, 대한민국',
    current: true,
    date: '2025-06-19 14:32',
    browser: 'Chrome',
  },
  {
    device: 'iPhone 15 (Safari)',
    location: '서울, 대한민국',
    current: false,
    date: '2025-06-19 09:15',
    browser: 'Safari',
  },
  {
    device: 'MacBook Pro (Firefox)',
    location: '서울, 대한민국',
    current: false,
    date: '2025-06-18 17:22',
    browser: 'Firefox',
  },
];

const PasswordPolicySection = ({ policy, onChange }) => (
  <Box mb={2.5}>
    <Typography fontWeight={700} mb={0.5} fontSize={15}>비밀번호 정책</Typography>
    <Box display="flex" flexDirection="column" gap={0.5}>
      {passwordPolicies.map((item, idx) => (
        <FormControlLabel
          key={item.key}
          control={<Checkbox checked={!!policy[item.key]} onChange={onChange} name={item.key} size="small" />}
          label={<Typography fontSize={13}>{item.label}</Typography>}
          sx={{ ml: 0.5 }}
        />
      ))}
    </Box>
    <Divider sx={{ my: 2 }} />
  </Box>
);

const TwoFactorSection = ({ enabled, onChange }) => (
  <Box mb={2.5}>
    <Typography fontWeight={700} mb={0.5} fontSize={15}>2단계 인증</Typography>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography fontSize={14}>2단계 인증 활성화</Typography>
        <Typography color="text.secondary" fontSize={12}>
          로그인 시 추가 인증 단계를 요구하여 보안을 강화합니다.
        </Typography>
      </Box>
      <Switch checked={enabled} onChange={onChange} name="twoFactor" size="small" />
    </Box>
    <Divider sx={{ my: 2 }} />
  </Box>
);

const SessionManagementSection = ({ autoLogout, onAutoLogoutChange, allowMulti, onAllowMultiChange }) => (
  <Box mb={2.5}>
    <Typography fontWeight={700} mb={0.5} fontSize={15}>세션 관리</Typography>
    <Box display="flex" alignItems="center" gap={3} mb={1.5}>
      <Box>
        <Typography fontSize={14}>자동 로그아웃 시간</Typography>
        <Typography color="text.secondary" fontSize={12}>
          비활성 상태가 지속될 경우 자동으로 로그아웃됩니다.
        </Typography>
      </Box>
      <Select value={autoLogout} onChange={onAutoLogoutChange} size="small" sx={{ minWidth: 90, fontSize: 13 }}>
        <MenuItem value={60} sx={{ fontSize: 13 }}>1시간</MenuItem>
        <MenuItem value={30} sx={{ fontSize: 13 }}>30분</MenuItem>
        <MenuItem value={10} sx={{ fontSize: 13 }}>10분</MenuItem>
      </Select>
    </Box>
    <FormControlLabel
      control={<Switch checked={allowMulti} onChange={onAllowMultiChange} name="allowMulti" size="small" />}
      label={<Typography fontSize={13}>동시 로그인 허용</Typography>}
      sx={{ ml: 0.5 }}
    />
    <Typography color="text.secondary" fontSize={12} ml={3}>
      여러 기기에서 동시에 로그인할 수 있습니다.
    </Typography>
    <Divider sx={{ my: 2 }} />
  </Box>
);

const LoginHistorySection = ({ history }) => (
  <Box mb={2.5}>
    <Typography fontWeight={700} mb={0.5} fontSize={15}>로그인 기록</Typography>
    <Box display="flex" flexDirection="column" gap={0.5}>
      {history.map((item, idx) => (
        <Box key={idx} display="flex" alignItems="center" justifyContent="space-between" p={1.5} borderRadius={2} bgcolor={item.current ? '#f5f4ff' : '#f7f7f9'}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box fontSize={20}>{deviceIcons[item.browser] || '💻'}</Box>
            <Box>
              <Typography fontWeight={600} fontSize={13}>{item.device}</Typography>
              <Typography color="text.secondary" fontSize={12}>{item.location}{item.current && ' · 현재 활성 세션'}</Typography>
            </Box>
          </Box>
          <Typography color="text.secondary" fontSize={12}>{item.date}</Typography>
        </Box>
      ))}
    </Box>
    <Box mt={0.5} textAlign="right">
      <Button size="small" sx={{ textTransform: 'none', fontSize: 13, px: 1.5, py: 0.5 }}>모든 로그인 기록 보기</Button>
    </Box>
  </Box>
);

const SecuritySettings = () => {
  const [policy, setPolicy] = useState({
    minLength: true,
    uppercase: true,
    specialChar: true,
    number: true,
    change90: false,
    noReuse: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoLogout, setAutoLogout] = useState(60);
  const [allowMulti, setAllowMulti] = useState(true);

  const handlePolicyChange = (e) => {
    const { name, checked } = e.target;
    setPolicy(prev => ({ ...prev, [name]: checked }));
  };
  const handleTwoFactorChange = (e) => setTwoFactor(e.target.checked);
  const handleAutoLogoutChange = (e) => setAutoLogout(e.target.value);
  const handleAllowMultiChange = (e) => setAllowMulti(e.target.checked);

  return (
    <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: 1, mt: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={1.5} fontSize={16}>보안 설정</Typography>
      <PasswordPolicySection policy={policy} onChange={handlePolicyChange} />
      <TwoFactorSection enabled={twoFactor} onChange={handleTwoFactorChange} />
      <SessionManagementSection
        autoLogout={autoLogout}
        onAutoLogoutChange={handleAutoLogoutChange}
        allowMulti={allowMulti}
        onAllowMultiChange={handleAllowMultiChange}
      />
      <LoginHistorySection history={loginHistorySample} />
    </Box>
  );
};

const UserInterfaceSettings = () => {
  const [theme, setTheme] = useState('light');
  const [layout, setLayout] = useState('default');
  const [fontSize, setFontSize] = useState(100);
  const [settings, setSettings] = useState({
    animation: true,
    highContrast: false,
    autoSidebar: true,
  });

  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleLayoutChange = (e) => setLayout(e.target.value);
  const handleFontSizeChange = (_, value) => setFontSize(value);
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: 1, mt: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={1.5} fontSize={16}>사용자 인터페이스 설정</Typography>
      {/* 테마 선택 */}
      <Box mb={2.5}>
        <Typography fontWeight={600} mb={0.5} fontSize={14}>테마</Typography>
        <RadioGroup row value={theme} onChange={handleThemeChange}>
          <FormControlLabel
            value="light"
            control={<Radio size="small" />}
            label={<Box>
              <Typography fontSize={13}>라이트 모드</Typography>
              <Box sx={{ width: 90, height: 24, bgcolor: '#f5f5f5', borderRadius: 1, mt: 0.5 }} />
            </Box>}
            sx={{ mr: 2.5 }}
          />
          <FormControlLabel
            value="dark"
            control={<Radio size="small" />}
            label={<Box>
              <Typography fontSize={13}>다크 모드</Typography>
              <Box sx={{ width: 90, height: 24, bgcolor: '#232a3b', borderRadius: 1, mt: 0.5 }} />
            </Box>}
            sx={{ mr: 2.5 }}
          />
          <FormControlLabel
            value="system"
            control={<Radio size="small" />}
            label={<Box>
              <Typography fontSize={13}>시스템 설정 따름</Typography>
              <Box sx={{ width: 90, height: 24, background: 'linear-gradient(90deg, #fff 0%, #232a3b 100%)', borderRadius: 1, mt: 0.5 }} />
            </Box>}
          />
        </RadioGroup>
      </Box>
      {/* 레이아웃 선택 */}
      <Box mb={2.5}>
        <Typography fontWeight={600} mb={0.5} fontSize={14}>레이아웃</Typography>
        <RadioGroup row value={layout} onChange={handleLayoutChange}>
          <FormControlLabel
            value="default"
            control={<Radio size="small" />}
            label={<Box>
              <Typography fontSize={13}>기본 레이아웃</Typography>
              <Box sx={{ width: 90, height: 24, bgcolor: '#f5f5f5', borderRadius: 1, mt: 0.5 }} />
            </Box>}
            sx={{ mr: 2.5 }}
          />
          <FormControlLabel
            value="compact"
            control={<Radio size="small" />}
            label={<Box>
              <Typography fontSize={13}>콤팩트 레이아웃</Typography>
              <Box sx={{ width: 90, height: 24, bgcolor: '#f5f5f5', borderRadius: 1, mt: 0.5, opacity: 0.7 }} />
            </Box>}
          />
        </RadioGroup>
      </Box>
      {/* 글꼴 크기 슬라이더 */}
      <Box mb={2.5}>
        <Typography fontWeight={600} mb={0.5} fontSize={14}>글꼴 크기</Typography>
        <Typography color="text.secondary" fontSize={12} mb={0.5}>인터페이스 전체의 글꼴 크기를 조절합니다.</Typography>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography fontSize={12} color="text.secondary">작게</Typography>
          <Box flex={1}>
            <Slider
              value={fontSize}
              min={80}
              max={150}
              step={1}
              onChange={handleFontSizeChange}
              valueLabelDisplay="auto"
              sx={{ mx: 1.5, height: 4 }}
              size="small"
            />
          </Box>
          <Typography fontSize={12} color="text.secondary">크게</Typography>
          <Typography fontSize={12} color="text.secondary" ml={1}>{fontSize}%</Typography>
        </Box>
      </Box>
      {/* 추가 설정 스위치 */}
      <Box>
        <Typography fontWeight={600} mb={0.5} fontSize={14}>추가 설정</Typography>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontSize={13}>애니메이션 효과</Typography>
              <Typography color="text.secondary" fontSize={12}>인터페이스 전환 시 애니메이션을 표시합니다.</Typography>
            </Box>
            <Switch checked={settings.animation} onChange={handleSwitchChange} name="animation" size="small" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontSize={13}>고대비 모드</Typography>
              <Typography color="text.secondary" fontSize={12}>텍스트와 화면 간의 대비를 높입니다.</Typography>
            </Box>
            <Switch checked={settings.highContrast} onChange={handleSwitchChange} name="highContrast" size="small" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontSize={13}>사이드바 자동 숨김</Typography>
              <Typography color="text.secondary" fontSize={12}>최대의 몰입 시 사이드바를 자동으로 숨깁니다.</Typography>
            </Box>
            <Switch checked={settings.autoSidebar} onChange={handleSwitchChange} name="autoSidebar" size="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const backupPeriods = [
  { label: "매일", value: "daily" },
  { label: "매주", value: "weekly" },
  { label: "매월", value: "monthly" },
];
const backupRetentions = [
  { label: "30일", value: 30 },
  { label: "90일", value: 90 },
  { label: "180일", value: 180 },
];
const backupLocations = [
  { label: "클라우드 스토리지", value: "cloud" },
  { label: "로컬 저장소", value: "local" },
];

const DataManagementSection = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupPeriod, setBackupPeriod] = useState("weekly");
  const [backupRetention, setBackupRetention] = useState(90);
  const [backupLocation, setBackupLocation] = useState("cloud");
  const [backupEncrypt, setBackupEncrypt] = useState(true);
  const [backupAlert, setBackupAlert] = useState(true);
  const [importFormat, setImportFormat] = useState("");

  return (
    <Box sx={{ background: "#fff", borderRadius: 3, p: 3, boxShadow: 1, mt: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={1.5} fontSize={16}>데이터 관리</Typography>
      {/* 데이터 백업 */}
      <Box mb={3}>
        <Typography fontWeight={600} mb={0.5} fontSize={14}>데이터 백업</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography color="text.secondary" fontSize={12}>자동 백업</Typography>
          <Switch checked={autoBackup} onChange={e => setAutoBackup(e.target.checked)} size="small" />
        </Box>
        <Box display="flex" gap={1.5} mb={1.5}>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <FormLabel sx={{ fontSize: 13 }}>백업 주기</FormLabel>
            <Select size="small" value={backupPeriod} onChange={e => setBackupPeriod(e.target.value)}>
              {backupPeriods.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <FormLabel sx={{ fontSize: 13 }}>백업 보관 기간</FormLabel>
            <Select size="small" value={backupRetention} onChange={e => setBackupRetention(e.target.value)}>
              {backupRetentions.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <FormLabel sx={{ fontSize: 13 }}>백업 저장 위치</FormLabel>
            <Select size="small" value={backupLocation} onChange={e => setBackupLocation(e.target.value)}>
              {backupLocations.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" gap={2.5} mb={1.5}>
          <FormControlLabel
            control={<Switch checked={backupEncrypt} onChange={e => setBackupEncrypt(e.target.checked)} size="small" />}
            label={<Typography fontSize={13}>백업 암호화</Typography>}
            sx={{ ml: 0.5 }}
          />
          <FormControlLabel
            control={<Switch checked={backupAlert} onChange={e => setBackupAlert(e.target.checked)} size="small" />}
            label={<Typography fontSize={13}>백업 알림</Typography>}
            sx={{ ml: 0.5 }}
          />
        </Box>
        <Box display="flex" gap={1.5} mb={1.5}>
          <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>지금 백업</Button>
          <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>백업 기록</Button>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* 데이터 내보내기/가져오기 */}
      <Box>
        <Typography fontWeight={600} mb={1} fontSize={14}>데이터 내보내기/가져오기</Typography>
        <Box mb={1.5}>
          <Typography fontWeight={500} mb={0.5} fontSize={13}>데이터 내보내기</Typography>
          <Box display="flex" gap={1.5}>
            <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>Excel</Button>
            <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>CSV</Button>
            <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>JSON</Button>
            <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>PDF</Button>
          </Box>
        </Box>
        <Box>
          <Typography fontWeight={500} mb={0.5} fontSize={13}>데이터 가져오기</Typography>
          <Box display="flex" gap={1.5} alignItems="center">
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select size="small" value={importFormat} onChange={e => setImportFormat(e.target.value)} displayEmpty>
                <MenuItem value="" sx={{ fontSize: 13 }}>파일 형식 선택</MenuItem>
                <MenuItem value="excel" sx={{ fontSize: 13 }}>Excel</MenuItem>
                <MenuItem value="csv" sx={{ fontSize: 13 }}>CSV</MenuItem>
                <MenuItem value="json" sx={{ fontSize: 13 }}>JSON</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" component="label" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>
              파일 선택
              <input type="file" hidden />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1.5} mt={3}>
        <Button variant="outlined" size="small" sx={{ fontSize: 13, px: 2, py: 0.5 }}>설정 초기화</Button>
        <Button variant="contained" color="primary" size="small" sx={{ fontSize: 13, px: 2.5, py: 0.7 }}>변경사항 저장</Button>
      </Box>
    </Box>
  );
};

const Environment = () => {
  const [tab, setTab] = useState(0);
  const [settings, setSettings] = useState({
    language: "ko",
    timezone: "Asia/Seoul",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "24",
    emailAlert: true,
    browserAlert: true,
    soundAlert: false,
    weeklySummary: true,
  });

  const handleSettingChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // API call to save settings would go here
  };

  return (
    <Box sx={{ p: 2, background: "#fafbfc", minHeight: "100vh" }}>
      <Seo title={"환경 설정"} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Box>
          <Typography variant="h5" fontWeight={700} fontSize={20}>환경 설정</Typography>
          <Typography color="text.secondary" fontSize={13} mt={0.5}>
            시스템 및 사용자 환경을 설정할 수 있습니다.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 2.5, fontSize: 14, py: 0.7 }} size="small" onClick={handleSave}>
          변경사항 저장
        </Button>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }} TabIndicatorProps={{ style: { height: 2 } }}>
        {tabs.map((label) => (
          <Tab key={label} label={<Typography fontSize={14} fontWeight={600}>{label}</Typography>} sx={{ minWidth: 90, px: 1.5, py: 0.5 }} />
        ))}
      </Tabs>
      {tab === 0 && (
        <>
          <SystemSettings settings={settings} onSettingChange={handleSettingChange} />
          <NotificationSettings settings={settings} onSettingChange={handleSettingChange} />
        </>
      )}
      {tab !== 0 && (
        <Box sx={{ background: "#fff", borderRadius: 3, p: 3, boxShadow: 1, minHeight: 120 }}>
          <Typography color="text.secondary" fontSize={13}>준비 중입니다.</Typography>
        </Box>
      )}
      <SecuritySettings />
      <UserInterfaceSettings />
      <DataManagementSection />
    </Box>
  );
};

Environment.layout = "Contentlayout";
export default Environment;
