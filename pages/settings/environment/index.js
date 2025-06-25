import React, { useState } from "react";
import { Button, Switch, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Select, MenuItem, Tabs, Tab, Box, Typography } from "@mui/material";
import Seo from "@/shared/layout-components/seo/seo";

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
  <Box sx={{ background: "#fff", borderRadius: 3, p: 4, boxShadow: 1, mb: 3 }}>
    <Typography variant="h6" fontWeight={700} mb={2}>시스템 설정</Typography>
    <Box display="flex" gap={4} flexWrap="wrap" mb={3}>
      <FormControl sx={{ minWidth: 200 }}>
        <FormLabel sx={{ mb: 1 }}>언어</FormLabel>
        <Select name="language" value={settings.language} onChange={onSettingChange}>
          {languages.map(l => (
            <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 300 }}>
        <FormLabel sx={{ mb: 1 }}>시간대</FormLabel>
        <Select name="timezone" value={settings.timezone} onChange={onSettingChange}>
          {timezones.map(tz => (
            <MenuItem key={tz.value} value={tz.value}>{tz.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box display="flex" gap={6} flexWrap="wrap">
      <FormControl>
        <FormLabel>날짜 형식</FormLabel>
        <RadioGroup name="dateFormat" value={settings.dateFormat} onChange={onSettingChange}>
          {dateFormats.map(df => (
            <FormControlLabel key={df.value} value={df.value} control={<Radio />} label={df.label} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>시간 형식</FormLabel>
        <RadioGroup name="timeFormat" value={settings.timeFormat} onChange={onSettingChange}>
          {timeFormats.map(tf => (
            <FormControlLabel key={tf.value} value={tf.value} control={<Radio />} label={tf.label} />
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
    <Box sx={{ background: "#fff", borderRadius: 3, p: 4, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>알림 설정</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {notificationItems.map(item => (
          <Box key={item.key} display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontWeight={600}>{item.title}</Typography>
              <Typography color="text.secondary" fontSize={13}>{item.description}</Typography>
            </Box>
            <Switch name={item.key} checked={settings[item.key]} onChange={onSettingChange} />
          </Box>
        ))}
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
    <Box sx={{ p: 3, background: "#fafbfc", minHeight: "100vh" }}>
      <Seo title={"환경 설정"} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>환경 설정</Typography>
          <Typography color="text.secondary" fontSize={15} mt={1}>
            시스템 및 사용자 환경을 설정할 수 있습니다.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 3 }} onClick={handleSave}>
          변경사항 저장
        </Button>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {tabs.map((label) => (
          <Tab key={label} label={label} sx={{ fontWeight: 600, minWidth: 120 }} />
        ))}
      </Tabs>
      {tab === 0 && (
        <>
          <SystemSettings settings={settings} onSettingChange={handleSettingChange} />
          <NotificationSettings settings={settings} onSettingChange={handleSettingChange} />
        </>
      )}
      {tab !== 0 && (
        <Box sx={{ background: "#fff", borderRadius: 3, p: 4, boxShadow: 1, minHeight: 200 }}>
          <Typography color="text.secondary">준비 중입니다.</Typography>
        </Box>
      )}
    </Box>
  );
};

Environment.layout = "Contentlayout";
export default Environment;
