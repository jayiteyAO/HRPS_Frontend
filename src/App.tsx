import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import LeaveManagement from '@/pages/LeaveManagement';
import PayrollManagement from '@/pages/PayrollManagement';
import AttendanceManagement from '@/pages/AttendanceManagement';
import PerformanceManagement from '@/pages/PerformanceManagement';
import GrievanceManagement from '@/pages/GrievanceManagement';
import LearningManagement from '@/pages/LearningManagement';
import Reports from '@/pages/Reports';
import Login from '@/components/Login';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import TestPage from '@/pages/TestPage';

// Employee pages
import { EmployeeList } from '@/pages/employees/EmployeeList';
import AddEmployee from '@/pages/employees/AddEmployee';
import Departments from '@/pages/employees/Departments';
import Positions from '@/pages/employees/Positions';
import OrgChart from '@/pages/employees/OrgChart';
import ExitManagement from '@/pages/employees/ExitManagement';
import { EmployeeProfile } from '@/pages/employees/EmployeeProfile';
import BenefitsManagement from '@/pages/employees/BenefitsManagement';

// Leave pages
import ApplyLeave from '@/pages/leave/ApplyLeave';
import LeaveCalendar from '@/pages/leave/LeaveCalendar';
import LeavePolicies from '@/pages/leave/LeavePolicies';
import LeaveBalance from '@/pages/leave/LeaveBalance';
import Holidays from '@/pages/leave/Holidays';

// Payroll pages
import RunPayroll from '@/pages/payroll/RunPayroll';
import SalaryStructure from '@/pages/payroll/SalaryStructure';
import TaxManagement from '@/pages/payroll/TaxManagement';
import Payslips from '@/pages/payroll/Payslips';
import Bonuses from '@/pages/payroll/Bonuses';
import { PayrollRuns } from '@/pages/payroll/PayrollRuns';

// Attendance pages
import CheckIn from '@/pages/attendance/CheckIn';
import Timesheet from '@/pages/attendance/Timesheet';
import Shifts from '@/pages/attendance/Shifts';
import Overtime from '@/pages/attendance/Overtime';
import AttendanceReports from '@/pages/attendance/AttendanceReports';
import { AttendanceLogs } from '@/pages/attendance/AttendanceLogs';
import { Schedules } from '@/pages/attendance/Schedules';
import AllRecords from '@/pages/attendance/AllRecords';

// Performance pages
import Goals from '@/pages/performance/Goals';
import Feedback from '@/pages/performance/Feedback';
import KPIDashboard from '@/pages/performance/KPIDashboard';
import Development from '@/pages/performance/Development';
import Ratings from '@/pages/performance/Ratings';
import { PerformanceReviews } from '@/pages/performance/PerformanceReviews';

// Grievance pages
import SubmitGrievance from '@/pages/grievances/SubmitGrievance';
import TrackGrievance from '@/pages/grievances/TrackGrievance';
import GrievanceAnalytics from '@/pages/grievances/GrievanceAnalytics';
import ResolutionCenter from '@/pages/grievances/ResolutionCenter';

// Learning pages
import CourseCatalog from '@/pages/learning/CourseCatalog';
import TrainingCalendar from '@/pages/learning/TrainingCalendar';
import Certifications from '@/pages/learning/Certifications';
import LearningPaths from '@/pages/learning/LearningPaths';
import SkillsMatrix from '@/pages/learning/SkillsMatrix';
import { Courses } from '@/pages/learning/Courses';

// Report pages
import HeadcountReports from '@/pages/reports/HeadcountReports';
import PayrollReports from '@/pages/reports/PayrollReports';
import AttendanceReportsPage from '@/pages/reports/AttendanceReports';
import PerformanceReports from '@/pages/reports/PerformanceReports';
import CustomReports from '@/pages/reports/CustomReports';
import ReportBuilder from '@/pages/reports/ReportBuilder';
import OrgStructureKanban from '@/pages/reports/OrgStructureKanban';
import EscalationTime from '@/pages/reports/EscalationTime';
import AuditTrail from '@/pages/reports/AuditTrail';
import AnalyticsReports from '@/pages/reports/AnalyticsReports';

// Recruitment pages
import { JobPostings } from '@/pages/recruitment/JobPostings';
import { Applicants } from '@/pages/recruitment/Applicants';
import Interviews from '@/pages/recruitment/Interviews';
import Offers from '@/pages/recruitment/Offers';
import Onboarding from '@/pages/recruitment/Onboarding';
import TalentPool from '@/pages/recruitment/TalentPool';

// Root pages
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Notifications from '@/pages/Notifications';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <div className="app-root min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/test" element={<ProtectedLayout><TestPage /></ProtectedLayout>} />

        {/* Main routes */}
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/employees" element={<ProtectedLayout><EmployeeList /></ProtectedLayout>} />
        <Route path="/leave" element={<ProtectedLayout><LeaveManagement /></ProtectedLayout>} />
        <Route path="/payroll" element={<ProtectedLayout><PayrollManagement /></ProtectedLayout>} />
        <Route path="/attendance" element={<ProtectedLayout><AttendanceManagement /></ProtectedLayout>} />
        <Route path="/performance" element={<ProtectedLayout><PerformanceManagement /></ProtectedLayout>} />
        <Route path="/grievances" element={<ProtectedLayout><TrackGrievance /></ProtectedLayout>} />
        <Route path="/learning" element={<ProtectedLayout><CourseCatalog /></ProtectedLayout>} />
        <Route path="/learning/management" element={<ProtectedLayout><LearningManagement /></ProtectedLayout>} />
        <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />

        {/* Employee sub-routes */}
        <Route path="/employees/add" element={<ProtectedLayout><AddEmployee /></ProtectedLayout>} />
        <Route path="/employees/benefits" element={<ProtectedLayout><BenefitsManagement /></ProtectedLayout>} />
        <Route path="/employees/departments" element={<ProtectedLayout><Departments /></ProtectedLayout>} />
        <Route path="/employees/positions" element={<ProtectedLayout><Positions /></ProtectedLayout>} />
        <Route path="/employees/org-chart" element={<ProtectedLayout><OrgChart /></ProtectedLayout>} />
        <Route path="/employees/exit" element={<ProtectedLayout><ExitManagement /></ProtectedLayout>} />
        <Route path="/employees/profile/:id" element={<ProtectedLayout><EmployeeProfile /></ProtectedLayout>} />

        {/* Leave sub-routes */}
        <Route path="/leave/apply" element={<ProtectedLayout><ApplyLeave /></ProtectedLayout>} />
        <Route path="/leave/calendar" element={<ProtectedLayout><LeaveCalendar /></ProtectedLayout>} />
        <Route path="/leave/policies" element={<ProtectedLayout><LeavePolicies /></ProtectedLayout>} />
        <Route path="/leave/balance" element={<ProtectedLayout><LeaveBalance /></ProtectedLayout>} />
        <Route path="/leave/holidays" element={<ProtectedLayout><Holidays /></ProtectedLayout>} />

        {/* Payroll sub-routes */}
        <Route path="/payroll/run" element={<ProtectedLayout><RunPayroll /></ProtectedLayout>} />
        <Route path="/payroll/runs" element={<ProtectedLayout><PayrollRuns /></ProtectedLayout>} />
        <Route path="/payroll/structure" element={<ProtectedLayout><SalaryStructure /></ProtectedLayout>} />
        <Route path="/payroll/tax" element={<ProtectedLayout><TaxManagement /></ProtectedLayout>} />
        <Route path="/payroll/payslips" element={<ProtectedLayout><Payslips /></ProtectedLayout>} />
        <Route path="/payroll/bonuses" element={<ProtectedLayout><Bonuses /></ProtectedLayout>} />

        {/* Attendance sub-routes */}
        <Route path="/attendance/checkin" element={<ProtectedLayout><CheckIn /></ProtectedLayout>} />
        <Route path="/attendance/check-in" element={<ProtectedLayout><CheckIn /></ProtectedLayout>} />
        <Route path="/attendance/all-records" element={<ProtectedLayout><AllRecords /></ProtectedLayout>} />
        <Route path="/attendance/logs" element={<ProtectedLayout><AttendanceLogs /></ProtectedLayout>} />
        <Route path="/attendance/schedules" element={<ProtectedLayout><Schedules /></ProtectedLayout>} />
        <Route path="/attendance/timesheet" element={<ProtectedLayout><Timesheet /></ProtectedLayout>} />
        <Route path="/attendance/shifts" element={<ProtectedLayout><Shifts /></ProtectedLayout>} />
        <Route path="/attendance/overtime" element={<ProtectedLayout><Overtime /></ProtectedLayout>} />
        <Route path="/attendance/reports" element={<ProtectedLayout><AttendanceReports /></ProtectedLayout>} />

        {/* Performance sub-routes */}
        <Route path="/performance/reviews" element={<ProtectedLayout><PerformanceReviews /></ProtectedLayout>} />
        <Route path="/performance/goals" element={<ProtectedLayout><Goals /></ProtectedLayout>} />
        <Route path="/performance/feedback" element={<ProtectedLayout><Feedback /></ProtectedLayout>} />
        <Route path="/performance/kpi" element={<ProtectedLayout><KPIDashboard /></ProtectedLayout>} />
        <Route path="/performance/development" element={<ProtectedLayout><Development /></ProtectedLayout>} />
        <Route path="/performance/ratings" element={<ProtectedLayout><Ratings /></ProtectedLayout>} />

        {/* Grievance sub-routes */}
        <Route path="/grievances/management" element={<ProtectedLayout><GrievanceManagement /></ProtectedLayout>} />
        <Route path="/grievances/submit" element={<ProtectedLayout><SubmitGrievance /></ProtectedLayout>} />
        <Route path="/grievances/analytics" element={<ProtectedLayout><GrievanceAnalytics /></ProtectedLayout>} />
        <Route path="/grievances/resolution" element={<ProtectedLayout><ResolutionCenter /></ProtectedLayout>} />

        {/* Learning sub-routes */}
        <Route path="/learning/courses" element={<ProtectedLayout><Courses /></ProtectedLayout>} />
        <Route path="/learning/catalog" element={<ProtectedLayout><CourseCatalog /></ProtectedLayout>} />
        <Route path="/learning/calendar" element={<ProtectedLayout><TrainingCalendar /></ProtectedLayout>} />
        <Route path="/learning/certifications" element={<ProtectedLayout><Certifications /></ProtectedLayout>} />
        <Route path="/learning/paths" element={<ProtectedLayout><LearningPaths /></ProtectedLayout>} />
        <Route path="/learning/skills" element={<ProtectedLayout><SkillsMatrix /></ProtectedLayout>} />

        {/* Report sub-routes */}
        <Route path="/reports/analytics" element={<ProtectedLayout><AnalyticsReports /></ProtectedLayout>} />
        <Route path="/reports/headcount" element={<ProtectedLayout><HeadcountReports /></ProtectedLayout>} />
        <Route path="/reports/payroll" element={<ProtectedLayout><PayrollReports /></ProtectedLayout>} />
        <Route path="/reports/attendance" element={<ProtectedLayout><AttendanceReportsPage /></ProtectedLayout>} />
        <Route path="/reports/performance" element={<ProtectedLayout><PerformanceReports /></ProtectedLayout>} />
        <Route path="/reports/custom" element={<ProtectedLayout><CustomReports /></ProtectedLayout>} />
        <Route path="/reports/builder" element={<ProtectedLayout><ReportBuilder /></ProtectedLayout>} />
        <Route path="/reports/org-structure" element={<ProtectedLayout><OrgStructureKanban /></ProtectedLayout>} />
        <Route path="/reports/escalation-time" element={<ProtectedLayout><EscalationTime /></ProtectedLayout>} />
        <Route path="/reports/audit-trail" element={<ProtectedLayout><AuditTrail /></ProtectedLayout>} />

        {/* Recruitment routes */}
        <Route path="/recruitment/jobs" element={<ProtectedLayout><JobPostings /></ProtectedLayout>} />
        <Route path="/recruitment/applicants" element={<ProtectedLayout><Applicants /></ProtectedLayout>} />
        <Route path="/recruitment/interviews" element={<ProtectedLayout><Interviews /></ProtectedLayout>} />
        <Route path="/recruitment/offers" element={<ProtectedLayout><Offers /></ProtectedLayout>} />
        <Route path="/recruitment/onboarding" element={<ProtectedLayout><Onboarding /></ProtectedLayout>} />
        <Route path="/recruitment/talent-pool" element={<ProtectedLayout><TalentPool /></ProtectedLayout>} />

        {/* Root pages */}
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />
        <Route path="/settings/escalation" element={<ProtectedLayout><EscalationTime /></ProtectedLayout>} />
        <Route path="/settings/audit" element={<ProtectedLayout><AuditTrail /></ProtectedLayout>} />
        <Route path="/notifications" element={<ProtectedLayout><Notifications /></ProtectedLayout>} />
      </Routes>
    </div>
  );
}

export default App;
