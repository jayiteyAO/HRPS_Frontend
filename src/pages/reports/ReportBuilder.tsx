import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  PlusIcon, 
  DownloadIcon, 
  SaveIcon, 
  EyeIcon,
  FileTextIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@/components/Icons';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  selected: boolean;
}

interface ReportFilter {
  field: string;
  operator: string;
  value: string;
}

interface SavedReport {
  id: string;
  name: string;
  type: string;
  module: string;
  createdAt: string;
  lastRun?: string;
}

const ReportBuilder: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedModule, setSelectedModule] = useState('Employees');
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('Table');
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedSavedReport, setSelectedSavedReport] = useState<SavedReport | null>(null);

  const [availableFields, setAvailableFields] = useState<Record<string, ReportField[]>>({
    Employees: [
      { id: '1', name: 'Employee ID', type: 'text', selected: true },
      { id: '2', name: 'Full Name', type: 'text', selected: true },
      { id: '3', name: 'Department', type: 'text', selected: true },
      { id: '4', name: 'Position', type: 'text', selected: true },
      { id: '5', name: 'Salary', type: 'number', selected: false },
      { id: '6', name: 'Hire Date', type: 'date', selected: true },
      { id: '7', name: 'Status', type: 'text', selected: true },
      { id: '8', name: 'Manager', type: 'text', selected: false },
    ],
    Payroll: [
      { id: '1', name: 'Employee Name', type: 'text', selected: true },
      { id: '2', name: 'Basic Salary', type: 'number', selected: true },
      { id: '3', name: 'Allowances', type: 'number', selected: true },
      { id: '4', name: 'Deductions', type: 'number', selected: true },
      { id: '5', name: 'Net Pay', type: 'number', selected: true },
      { id: '6', name: 'Payment Date', type: 'date', selected: true },
      { id: '7', name: 'Payment Method', type: 'text', selected: false },
    ],
    Leave: [
      { id: '1', name: 'Employee Name', type: 'text', selected: true },
      { id: '2', name: 'Leave Type', type: 'text', selected: true },
      { id: '3', name: 'Start Date', type: 'date', selected: true },
      { id: '4', name: 'End Date', type: 'date', selected: true },
      { id: '5', name: 'Days', type: 'number', selected: true },
      { id: '6', name: 'Status', type: 'text', selected: true },
      { id: '7', name: 'Approver', type: 'text', selected: false },
    ],
    Performance: [
      { id: '1', name: 'Employee Name', type: 'text', selected: true },
      { id: '2', name: 'Rating', type: 'number', selected: true },
      { id: '3', name: 'Review Period', type: 'date', selected: true },
      { id: '4', name: 'Reviewer', type: 'text', selected: true },
      { id: '5', name: 'Goals Met', type: 'number', selected: true },
      { id: '6', name: 'Comments', type: 'text', selected: false },
    ],
    Attendance: [
      { id: '1', name: 'Employee Name', type: 'text', selected: true },
      { id: '2', name: 'Date', type: 'date', selected: true },
      { id: '3', name: 'Check In', type: 'text', selected: true },
      { id: '4', name: 'Check Out', type: 'text', selected: true },
      { id: '5', name: 'Hours Worked', type: 'number', selected: true },
      { id: '6', name: 'Status', type: 'text', selected: true },
    ],
    Recruitment: [
      { id: '1', name: 'Candidate Name', type: 'text', selected: true },
      { id: '2', name: 'Position', type: 'text', selected: true },
      { id: '3', name: 'Application Date', type: 'date', selected: true },
      { id: '4', name: 'Status', type: 'text', selected: true },
      { id: '5', name: 'Interview Date', type: 'date', selected: false },
      { id: '6', name: 'Source', type: 'text', selected: true },
    ],
  });

  const [filters, setFilters] = useState<ReportFilter[]>([]);
  const [savedReports] = useState<SavedReport[]>([
    { id: '1', name: 'Monthly Payroll Summary', type: 'Table', module: 'Payroll', createdAt: '2024-01-15', lastRun: '2024-02-01' },
    { id: '2', name: 'Leave Balance Report', type: 'Summary', module: 'Leave', createdAt: '2024-01-20', lastRun: '2024-01-28' },
    { id: '3', name: 'Department Headcount', type: 'Pie Chart', module: 'Employees', createdAt: '2024-01-10' },
    { id: '4', name: 'Performance Trends', type: 'Line Chart', module: 'Performance', createdAt: '2024-01-25', lastRun: '2024-02-03' },
    { id: '5', name: 'Attendance Overview', type: 'Bar Chart', module: 'Attendance', createdAt: '2024-01-18' },
  ]);

  const toggleFieldSelection = (fieldId: string) => {
    setAvailableFields(prev => ({
      ...prev,
      [selectedModule]: prev[selectedModule].map(field =>
        field.id === fieldId ? { ...field, selected: !field.selected } : field
      )
    }));
  };

  const addFilter = () => {
    setFilters([...filters, { field: '', operator: '=', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const loadSavedReport = (report: SavedReport) => {
    setSelectedSavedReport(report);
    setReportName(report.name);
    setReportType(report.type);
    setSelectedModule(report.module);
  };

  // Realistic mock data based on selected module
  const getMockTableData = () => {
    switch (selectedModule) {
      case 'Employees':
        return [
          { id: 'EMP001', name: 'Kwame Mensah', dept: 'IT', position: 'Senior Developer', salary: '₵8,500', hireDate: '2020-03-15', status: 'Active', manager: 'Ama Sarpong' },
          { id: 'EMP002', name: 'Akosua Boateng', dept: 'HR', position: 'HR Manager', salary: '₵12,000', hireDate: '2018-06-20', status: 'Active', manager: 'Yaw Asante' },
          { id: 'EMP003', name: 'Kofi Agyeman', dept: 'Finance', position: 'Accountant', salary: '₵7,200', hireDate: '2021-01-10', status: 'Active', manager: 'Abena Owusu' },
          { id: 'EMP004', name: 'Ama Adjei', dept: 'Sales', position: 'Sales Executive', salary: '₵6,800', hireDate: '2022-04-05', status: 'Active', manager: 'Kwabena Osei' },
          { id: 'EMP005', name: 'Yaw Frimpong', dept: 'Operations', position: 'Operations Lead', salary: '₵9,500', hireDate: '2019-11-22', status: 'Active', manager: 'Efua Mensah' },
          { id: 'EMP006', name: 'Abena Darko', dept: 'IT', position: 'DevOps Engineer', salary: '₵8,000', hireDate: '2021-07-14', status: 'Active', manager: 'Ama Sarpong' },
          { id: 'EMP007', name: 'Kwabena Appiah', dept: 'Finance', position: 'Financial Analyst', salary: '₵6,500', hireDate: '2023-02-01', status: 'Active', manager: 'Abena Owusu' },
          { id: 'EMP008', name: 'Efua Asare', dept: 'Sales', position: 'Regional Manager', salary: '₵11,000', hireDate: '2017-09-30', status: 'Active', manager: 'Kwabena Osei' },
        ];
      case 'Payroll':
        return [
          { name: 'Kwame Mensah', basic: '₵8,500', allowances: '₵1,200', deductions: '₵850', net: '₵8,850', date: '2024-01-31', method: 'Bank Transfer' },
          { name: 'Akosua Boateng', basic: '₵12,000', allowances: '₵1,800', deductions: '₵1,200', net: '₵12,600', date: '2024-01-31', method: 'Bank Transfer' },
          { name: 'Kofi Agyeman', basic: '₵7,200', allowances: '₵900', deductions: '₵720', net: '₵7,380', date: '2024-01-31', method: 'Bank Transfer' },
          { name: 'Ama Adjei', basic: '₵6,800', allowances: '₵800', deductions: '₵680', net: '₵6,920', date: '2024-01-31', method: 'Cash' },
          { name: 'Yaw Frimpong', basic: '₵9,500', allowances: '₵1,400', deductions: '₵950', net: '₵9,950', date: '2024-01-31', method: 'Bank Transfer' },
          { name: 'Abena Darko', basic: '₵8,000', allowances: '₵1,100', deductions: '₵800', net: '₵8,300', date: '2024-01-31', method: 'Bank Transfer' },
          { name: 'Kwabena Appiah', basic: '₵6,500', allowances: '₵750', deductions: '₵650', net: '₵6,600', date: '2024-01-31', method: 'Mobile Money' },
          { name: 'Efua Asare', basic: '₵11,000', allowances: '₵1,600', deductions: '₵1,100', net: '₵11,500', date: '2024-01-31', method: 'Bank Transfer' },
        ];
      case 'Leave':
        return [
          { name: 'Kwame Mensah', type: 'Annual Leave', start: '2024-02-15', end: '2024-02-22', days: '7', status: 'Approved', approver: 'Ama Sarpong' },
          { name: 'Akosua Boateng', type: 'Sick Leave', start: '2024-02-05', end: '2024-02-07', days: '2', status: 'Approved', approver: 'Yaw Asante' },
          { name: 'Kofi Agyeman', type: 'Annual Leave', start: '2024-03-01', end: '2024-03-10', days: '10', status: 'Pending', approver: 'Abena Owusu' },
          { name: 'Ama Adjei', type: 'Maternity Leave', start: '2024-02-20', end: '2024-05-20', days: '90', status: 'Approved', approver: 'Kwabena Osei' },
          { name: 'Yaw Frimpong', type: 'Annual Leave', start: '2024-04-10', end: '2024-04-17', days: '7', status: 'Approved', approver: 'Efua Mensah' },
          { name: 'Abena Darko', type: 'Sick Leave', start: '2024-02-12', end: '2024-02-13', days: '1', status: 'Approved', approver: 'Ama Sarpong' },
          { name: 'Kwabena Appiah', type: 'Annual Leave', start: '2024-05-01', end: '2024-05-05', days: '5', status: 'Pending', approver: 'Abena Owusu' },
          { name: 'Efua Asare', type: 'Compassionate Leave', start: '2024-02-25', end: '2024-02-27', days: '2', status: 'Approved', approver: 'Kwabena Osei' },
        ];
      case 'Performance':
        return [
          { name: 'Kwame Mensah', rating: '4.5', period: 'Q4 2023', reviewer: 'Ama Sarpong', goalsMet: '9/10', comments: 'Excellent performance' },
          { name: 'Akosua Boateng', rating: '4.8', period: 'Q4 2023', reviewer: 'Yaw Asante', goalsMet: '10/10', comments: 'Outstanding leadership' },
          { name: 'Kofi Agyeman', rating: '4.2', period: 'Q4 2023', reviewer: 'Abena Owusu', goalsMet: '8/10', comments: 'Good progress' },
          { name: 'Ama Adjei', rating: '4.0', period: 'Q4 2023', reviewer: 'Kwabena Osei', goalsMet: '8/10', comments: 'Meets expectations' },
          { name: 'Yaw Frimpong', rating: '4.6', period: 'Q4 2023', reviewer: 'Efua Mensah', goalsMet: '9/10', comments: 'Strong contributor' },
          { name: 'Abena Darko', rating: '4.3', period: 'Q4 2023', reviewer: 'Ama Sarpong', goalsMet: '8/10', comments: 'Solid performance' },
          { name: 'Kwabena Appiah', rating: '3.8', period: 'Q4 2023', reviewer: 'Abena Owusu', goalsMet: '7/10', comments: 'Room for improvement' },
          { name: 'Efua Asare', rating: '4.7', period: 'Q4 2023', reviewer: 'Kwabena Osei', goalsMet: '10/10', comments: 'Exceptional results' },
        ];
      case 'Attendance':
        return [
          { name: 'Kwame Mensah', date: '2024-02-01', checkIn: '08:15 AM', checkOut: '05:30 PM', hours: '8.25', status: 'Present' },
          { name: 'Akosua Boateng', date: '2024-02-01', checkIn: '08:00 AM', checkOut: '05:15 PM', hours: '8.25', status: 'Present' },
          { name: 'Kofi Agyeman', date: '2024-02-01', checkIn: '08:45 AM', checkOut: '05:45 PM', hours: '8.00', status: 'Late' },
          { name: 'Ama Adjei', date: '2024-02-01', checkIn: '08:10 AM', checkOut: '05:20 PM', hours: '8.17', status: 'Present' },
          { name: 'Yaw Frimpong', date: '2024-02-01', checkIn: '07:55 AM', checkOut: '05:30 PM', hours: '8.58', status: 'Present' },
          { name: 'Abena Darko', date: '2024-02-01', checkIn: '08:20 AM', checkOut: '05:25 PM', hours: '8.08', status: 'Present' },
          { name: 'Kwabena Appiah', date: '2024-02-01', checkIn: '-', checkOut: '-', hours: '0', status: 'Absent' },
          { name: 'Efua Asare', date: '2024-02-01', checkIn: '08:05 AM', checkOut: '05:35 PM', hours: '8.50', status: 'Present' },
        ];
      case 'Recruitment':
        return [
          { name: 'Kwesi Adomako', position: 'Software Engineer', appDate: '2024-01-15', status: 'Interview Scheduled', intDate: '2024-02-10', source: 'LinkedIn' },
          { name: 'Esi Amankwah', position: 'Marketing Manager', appDate: '2024-01-18', status: 'Under Review', intDate: '-', source: 'Job Portal' },
          { name: 'Kojo Antwi', position: 'Sales Representative', appDate: '2024-01-20', status: 'Offer Extended', intDate: '2024-01-28', source: 'Referral' },
          { name: 'Adjoa Baah', position: 'HR Assistant', appDate: '2024-01-22', status: 'Rejected', intDate: '-', source: 'Career Fair' },
          { name: 'Fiifi Quartey', position: 'Accountant', appDate: '2024-01-25', status: 'Interview Scheduled', intDate: '2024-02-12', source: 'Company Website' },
          { name: 'Akua Serwaa', position: 'Data Analyst', appDate: '2024-01-28', status: 'Under Review', intDate: '-', source: 'LinkedIn' },
          { name: 'Yaa Oforiwaa', position: 'Customer Service', appDate: '2024-02-01', status: 'Screening', intDate: '-', source: 'Job Portal' },
          { name: 'Nana Addo', position: 'Project Manager', appDate: '2024-02-03', status: 'Interview Scheduled', intDate: '2024-02-15', source: 'Referral' },
        ];
      default:
        return [];
    }
  };

  const getSelectedFields = () => {
    return availableFields[selectedModule]?.filter(f => f.selected) || [];
  };

  const getFieldValue = (row: any, fieldName: string) => {
    const fieldMap: Record<string, string> = {
      'Employee ID': 'id',
      'Full Name': 'name',
      'Department': 'dept',
      'Position': 'position',
      'Salary': 'salary',
      'Hire Date': 'hireDate',
      'Status': 'status',
      'Manager': 'manager',
      'Employee Name': 'name',
      'Basic Salary': 'basic',
      'Allowances': 'allowances',
      'Deductions': 'deductions',
      'Net Pay': 'net',
      'Payment Date': 'date',
      'Payment Method': 'method',
      'Leave Type': 'type',
      'Start Date': 'start',
      'End Date': 'end',
      'Days': 'days',
      'Approver': 'approver',
      'Rating': 'rating',
      'Review Period': 'period',
      'Reviewer': 'reviewer',
      'Goals Met': 'goalsMet',
      'Comments': 'comments',
      'Date': 'date',
      'Check In': 'checkIn',
      'Check Out': 'checkOut',
      'Hours Worked': 'hours',
      'Candidate Name': 'name',
      'Application Date': 'appDate',
      'Interview Date': 'intDate',
      'Source': 'source',
    };
    const key = fieldMap[fieldName];
    return row[key] || '-';
  };

  const sampleData = {
    labels: ['IT', 'HR', 'Finance', 'Sales', 'Operations'],
    datasets: [{
      label: 'Employee Count',
      data: [45, 12, 18, 32, 28],
      backgroundColor: ['#00A4EF', '#F25022', '#7FBA00', '#FFB900', '#737373'],
    }],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Score',
      data: [65, 72, 68, 75, 78, 82],
      borderColor: '#00A4EF',
      backgroundColor: 'rgba(0, 164, 239, 0.1)',
      tension: 0.4,
    }],
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Report Builder
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create custom reports with flexible filtering and visualization
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#00A4EF] text-[#00A4EF] hover:bg-[#00A4EF] hover:text-white transition-colors"
            >
              <EyeIcon size={20} />
              Preview
            </button>
            <button 
              onClick={() => setShowScheduleDialog(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#FFB900] text-[#FFB900] hover:bg-[#FFB900] hover:text-white transition-colors"
            >
              <ClockIcon size={20} />
              Schedule
            </button>
            <button 
              onClick={() => setShowSaveDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#7FBA00] text-white hover:bg-[#6BA000] transition-colors"
            >
              <SaveIcon size={20} />
              Save Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Total Reports</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>24</p>
                <p className="text-sm text-[#7FBA00] mt-2">+3 this month</p>
              </div>
              <div className="p-3 bg-[#00A4EF]/10">
                <FileTextIcon size={24} className="text-[#00A4EF]" />
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Data Sources</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>6</p>
                <p className="text-sm text-gray-500 mt-2">Modules available</p>
              </div>
              <div className="p-3 bg-[#7FBA00]/10">
                <BriefcaseIcon size={24} className="text-[#7FBA00]" />
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Scheduled Reports</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8</p>
                <p className="text-sm text-[#FFB900] mt-2">2 running today</p>
              </div>
              <div className="p-3 bg-[#FFB900]/10">
                <ClockIcon size={24} className="text-[#FFB900]" />
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Chart Types</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>5</p>
                <p className="text-sm text-gray-500 mt-2">Visualization options</p>
              </div>
              <div className="p-3 bg-[#F25022]/10">
                <ChartBarIcon size={24} className="text-[#F25022]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Settings */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Report Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter report name..."
                    className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Data Source
                    </label>
                    <select
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                      className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option>Employees</option>
                      <option>Payroll</option>
                      <option>Leave</option>
                      <option>Performance</option>
                      <option>Attendance</option>
                      <option>Recruitment</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Report Type
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option>Table</option>
                      <option>Bar Chart</option>
                      <option>Line Chart</option>
                      <option>Pie Chart</option>
                      <option>Summary</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Selection */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Select Fields
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {availableFields[selectedModule]?.map((field) => (
                  <label key={field.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.selected}
                      onChange={() => toggleFieldSelection(field.id)}
                      className="w-4 h-4"
                    />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {field.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Filters
                </h2>
                <button
                  onClick={addFilter}
                  className="flex items-center gap-2 px-3 py-1 bg-[#00A4EF] text-white text-sm hover:bg-[#0078D4]"
                >
                  <PlusIcon size={16} />
                  Add Filter
                </button>
              </div>
              <div className="space-y-3">
                {filters.length === 0 ? (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    No filters applied. Click "Add Filter" to create one.
                  </p>
                ) : (
                  filters.map((_filter, filterIndex) => (
                    <div key={filterIndex} className="grid grid-cols-12 gap-2">
                      <select className={`col-span-4 px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                        <option>Select Field</option>
                        {availableFields[selectedModule]?.map((field) => (
                          <option key={field.id}>{field.name}</option>
                        ))}
                      </select>
                      <select className={`col-span-3 px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                        <option>=</option>
                        <option>!=</option>
                        <option>&gt;</option>
                        <option>&lt;</option>
                        <option>Contains</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Value"
                        className={`col-span-4 px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                      />
                      <button
                        onClick={() => removeFilter(filterIndex)}
                        className="col-span-1 px-2 py-2 bg-[#F25022] text-white hover:bg-[#E04010]"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sorting & Grouping */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sorting & Grouping
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sort By
                  </label>
                  <select className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <option>None</option>
                    {availableFields[selectedModule]?.filter(f => f.selected).map((field) => (
                      <option key={field.id}>{field.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Order
                  </label>
                  <select className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <option>Ascending</option>
                    <option>Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Reports */}
          <div className="space-y-6">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Saved Reports
              </h2>
              <div className="space-y-3">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => loadSavedReport(report)}
                    className={`p-3 border ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition-colors ${selectedSavedReport?.id === report.id ? 'bg-[#00A4EF]/10 border-[#00A4EF]' : ''}`}
                  >
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {report.name}
                    </div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {report.type} • {report.module}
                    </div>
                    {report.lastRun && (
                      <div className="text-xs mt-1 text-[#7FBA00]">
                        Last run: {report.lastRun}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Export Options
              </h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowExportDialog(true)}
                  className="w-full px-4 py-2 bg-[#7FBA00] text-white hover:bg-[#6BA000] flex items-center justify-center gap-2"
                >
                  <DownloadIcon size={18} />
                  Export as Excel
                </button>
                <button 
                  onClick={() => setShowExportDialog(true)}
                  className="w-full px-4 py-2 bg-[#00A4EF] text-white hover:bg-[#0078D4] flex items-center justify-center gap-2"
                >
                  <DownloadIcon size={18} />
                  Export as PDF
                </button>
                <button 
                  onClick={() => setShowExportDialog(true)}
                  className="w-full px-4 py-2 bg-[#F25022] text-white hover:bg-[#E04010] flex items-center justify-center gap-2"
                >
                  <DownloadIcon size={18} />
                  Export as CSV
                </button>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Fields Selected</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {availableFields[selectedModule]?.filter(f => f.selected).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Filters</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {filters.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Report Type</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {reportType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal - Transparent */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} w-full max-w-7xl max-h-[90vh] overflow-hidden border ${isDark ? 'border-gray-600' : 'border-gray-300'} flex flex-col`}>
              {/* Header */}
              <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {reportName || 'Report Preview'}
                    </h2>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Module: <span className="font-medium text-[#00A4EF]">{selectedModule}</span>
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Type: <span className="font-medium text-[#7FBA00]">{reportType}</span>
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Generated: <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`text-3xl leading-none ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {reportType === 'Pie Chart' && (
                  <div className="h-[500px] flex items-center justify-center">
                    <div className="w-[500px] h-[500px]">
                      <Pie data={sampleData} options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              color: isDark ? '#E5E7EB' : '#1F2937',
                              font: { size: 12 },
                              padding: 15
                            }
                          },
                          title: {
                            display: true,
                            text: 'Department Distribution',
                            color: isDark ? '#E5E7EB' : '#1F2937',
                            font: { size: 16, weight: 'bold' }
                          }
                        }
                      }} />
                    </div>
                  </div>
                )}
                
                {reportType === 'Bar Chart' && (
                  <div className="h-[500px]">
                    <Bar data={sampleData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                          display: true,
                          text: 'Employee Count by Department',
                          color: isDark ? '#E5E7EB' : '#1F2937',
                          font: { size: 16, weight: 'bold' }
                        }
                      },
                      scales: {
                        x: {
                          ticks: { color: isDark ? '#E5E7EB' : '#1F2937' },
                          grid: { color: isDark ? '#374151' : '#E5E7EB' }
                        },
                        y: {
                          ticks: { color: isDark ? '#E5E7EB' : '#1F2937' },
                          grid: { color: isDark ? '#374151' : '#E5E7EB' }
                        }
                      }
                    }} />
                  </div>
                )}

                {reportType === 'Line Chart' && (
                  <div className="h-[500px]">
                    <Line data={lineChartData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: isDark ? '#E5E7EB' : '#1F2937'
                          }
                        },
                        title: {
                          display: true,
                          text: 'Performance Trends',
                          color: isDark ? '#E5E7EB' : '#1F2937',
                          font: { size: 16, weight: 'bold' }
                        }
                      },
                      scales: {
                        x: {
                          ticks: { color: isDark ? '#E5E7EB' : '#1F2937' },
                          grid: { color: isDark ? '#374151' : '#E5E7EB' }
                        },
                        y: {
                          ticks: { color: isDark ? '#E5E7EB' : '#1F2937' },
                          grid: { color: isDark ? '#374151' : '#E5E7EB' }
                        }
                      }
                    }} />
                  </div>
                )}

                {reportType === 'Summary' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`p-6 border ${isDark ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Total Records</p>
                        <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {getMockTableData().length}
                        </p>
                      </div>
                      <div className={`p-6 border ${isDark ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Fields Selected</p>
                        <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {getSelectedFields().length}
                        </p>
                      </div>
                      <div className={`p-6 border ${isDark ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Filters Applied</p>
                        <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {filters.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {reportType === 'Table' && (
                  <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <tr>
                            {getSelectedFields().map((field) => (
                              <th key={field.id} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {field.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className={isDark ? 'divide-y divide-gray-800' : 'divide-y divide-gray-200'}>
                          {getMockTableData().map((row, rowIndex) => (
                            <tr key={rowIndex} className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors`}>
                              {getSelectedFields().map((field) => (
                                <td key={field.id} className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'} whitespace-nowrap`}>
                                  {getFieldValue(row, field.name)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Showing {getMockTableData().length} of {getMockTableData().length} records
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Preview generated on {new Date().toLocaleString()}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-5 py-2 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      setShowExportDialog(true);
                    }}
                    className="px-5 py-2 bg-[#00A4EF] text-white hover:bg-[#0078D4] flex items-center gap-2 transition-colors"
                  >
                    <DownloadIcon size={18} />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Report Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} w-full max-w-md border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Save Report
                  </h2>
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className={`text-2xl ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Report Name
                    </label>
                    <input
                      type="text"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Enter report name..."
                      className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter report description..."
                      className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Set as favorite
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className={`px-4 py-2 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveDialog(false);
                    }}
                    className="px-4 py-2 bg-[#7FBA00] text-white hover:bg-[#6BA000] flex items-center gap-2"
                  >
                    <CheckCircleIcon size={18} />
                    Save Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Dialog */}
        {showExportDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} w-full max-w-md border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Export Report
                  </h2>
                  <button
                    onClick={() => setShowExportDialog(false)}
                    className={`text-2xl ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Export Format
                    </label>
                    <select className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                      <option>Excel (.xlsx)</option>
                      <option>PDF (.pdf)</option>
                      <option>CSV (.csv)</option>
                      <option>JSON (.json)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Include
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Headers
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Filters applied
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Charts and visualizations
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowExportDialog(false)}
                    className={`px-4 py-2 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowExportDialog(false);
                    }}
                    className="px-4 py-2 bg-[#00A4EF] text-white hover:bg-[#0078D4] flex items-center gap-2 transition-colors"
                  >
                    <DownloadIcon size={18} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Dialog */}
        {showScheduleDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} w-full max-w-lg border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Schedule Report
                  </h2>
                  <button
                    onClick={() => setShowScheduleDialog(false)}
                    className={`text-2xl ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Frequency
                    </label>
                    <select className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Start Date
                      </label>
                      <input
                        type="date"
                        className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Time
                      </label>
                      <input
                        type="time"
                        className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Recipients (Email)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email addresses separated by commas"
                      className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Include report as attachment
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowScheduleDialog(false)}
                    className={`px-4 py-2 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowScheduleDialog(false);
                    }}
                    className="px-4 py-2 bg-[#FFB900] text-white hover:bg-[#E0A800] flex items-center gap-2 transition-colors"
                  >
                    <ClockIcon size={18} />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportBuilder;
