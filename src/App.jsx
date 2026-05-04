import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import QuizEducativo from './components/Quiz/QuizEducativo'
import CheckupFlow from './components/Checkup/CheckupFlow'
import DashboardLayout from './components/Dashboard/DashboardLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/quiz" replace />} />
        <Route path="quiz" element={<QuizEducativo />} />
        <Route path="checkup" element={<CheckupFlow />} />
        <Route path="dashboard" element={<DashboardLayout />} />
      </Route>
    </Routes>
  )
}
