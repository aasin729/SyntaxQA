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

const EnvironmentSettings = () => {
  const [tab, setTab] = useState(0);
  const [language, setLanguage] = useState("ko");
  const [timezone, setTimezone] = useState("Asia/Seoul");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [timeFormat, setTimeFormat] = useState("24");
  const [emailAlert, setEmailAlert] = useState(true);
  const [browserAlert, setBrowserAlert] = useState(true);
  const [soundAlert, setSoundAlert] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

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
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 3 }}>
          변경사항 저장
        </Button>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {tabs.map((label, idx) => (
          <Tab key={label} label={label} sx={{ fontWeight: 600, minWidth: 120 }} />
        ))}
      </Tabs>
      {tab === 0 && (
        <Box sx={{ background: "#fff", borderRadius: 3, p: 4, boxShadow: 1 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>시스템 설정</Typography>
          <Box display="flex" gap={4} flexWrap="wrap" mb={3}>
            <FormControl sx={{ minWidth: 200 }}>
              <FormLabel sx={{ mb: 1 }}>언어</FormLabel>
              <Select value={language} onChange={e => setLanguage(e.target.value)}>
                {languages.map(l => (
                  <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 300 }}>
              <FormLabel sx={{ mb: 1 }}>시간대</FormLabel>
              <Select value={timezone} onChange={e => setTimezone(e.target.value)}>
                {timezones.map(tz => (
                  <MenuItem key={tz.value} value={tz.value}>{tz.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" gap={6} flexWrap="wrap" mb={3}>
            <FormControl>
              <FormLabel>날짜 형식</FormLabel>
              <RadioGroup value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
                {dateFormats.map(df => (
                  <FormControlLabel key={df.value} value={df.value} control={<Radio />} label={df.label} />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>시간 형식</FormLabel>
              <RadioGroup value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
                {timeFormats.map(tf => (
                  <FormControlLabel key={tf.value} value={tf.value} control={<Radio />} label={tf.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700} mb={2}>알림 설정</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={600}>이메일 알림</Typography>
                  <Typography color="text.secondary" fontSize={13}>중요 알림 및 업데이트를 이메일로 받습니다.</Typography>
                </Box>
                <Switch checked={emailAlert} onChange={e => setEmailAlert(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={600}>브라우저 알림</Typography>
                  <Typography color="text.secondary" fontSize={13}>브라우저에서 푸시 알림을 받습니다.</Typography>
                </Box>
                <Switch checked={browserAlert} onChange={e => setBrowserAlert(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={600}>소리 알림</Typography>
                  <Typography color="text.secondary" fontSize={13}>알림 발생 시 소리를 재생합니다.</Typography>
                </Box>
                <Switch checked={soundAlert} onChange={e => setSoundAlert(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={600}>주간 활동 요약</Typography>
                  <Typography color="text.secondary" fontSize={13}>매주 활동 요약 보고서를 이메일로 받습니다.</Typography>
                </Box>
                <Switch checked={weeklySummary} onChange={e => setWeeklySummary(e.target.checked)} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {tab !== 0 && (
        <Box sx={{ background: "#fff", borderRadius: 3, p: 4, boxShadow: 1, minHeight: 200 }}>
          <Typography color="text.secondary">준비 중입니다.</Typography>
        </Box>
      )}
    </Box>
  );
};

EnvironmentSettings.layout = "Contentlayout";
export default EnvironmentSettings;
