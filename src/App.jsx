import { Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'
import ActionPlanPage from './pages/ActionPlanPage'
import CheckupPage from './pages/CheckupPage'
import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import LandingPage from './pages/LandingPage'
import LearnModulePage from './pages/LearnModulePage'
import LearnPage from './pages/LearnPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import PrivacyPage from './pages/PrivacyPage'
import SnapshotAnalysisPage from './pages/SnapshotAnalysisPage'
import SnapshotPage from './pages/SnapshotPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin-login" element={<AdminLoginPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="checkup" element={<CheckupPage />} />
        <Route path="snapshot" element={<SnapshotPage />} />
        <Route path="snapshot/analysis" element={<SnapshotAnalysisPage />} />
        <Route path="action-plan" element={<ActionPlanPage />} />
        <Route path="dashboard" element={<SnapshotPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="learn/:moduleId" element={<LearnModulePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>
    </Routes>
  )
}
