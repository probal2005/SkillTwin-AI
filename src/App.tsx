import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/hooks/useAppContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Landing } from '@/pages/Landing';
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { SkillTwin } from '@/pages/SkillTwin';
import { SkillGaps } from '@/pages/SkillGaps';
import { Simulator } from '@/pages/Simulator';
import { Roadmap } from '@/pages/Roadmap';
import { Industry } from '@/pages/Industry';
import { Profile } from '@/pages/Profile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skill-twin" element={<SkillTwin />} />
            <Route path="/skill-gaps" element={<SkillGaps />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/industry" element={<Industry />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
