import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon } from '@/components/Icons';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  image?: string;
  reports: Employee[];
  status?: string;
  startDate?: string;
}

const OrgStructureKanban: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showReorganizeModal, setShowReorganizeModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'list'>('hierarchy');

  const orgData: Employee = {
    id: 'CEO-001',
    name: 'Robert Johnson',
    position: 'Chief Executive Officer',
    department: 'Executive',
    email: 'robert.johnson@company.com',
    phone: '+233 24 123 4567',
    status: 'Active',
    startDate: '2015-01-15',
    reports: [
      {
        id: 'CFO-001',
        name: 'Sarah Williams',
        position: 'Chief Financial Officer',
        department: 'Finance',
        email: 'sarah.williams@company.com',
        phone: '+233 24 234 5678',
        status: 'Active',
        startDate: '2016-03-20',
        reports: [
          {
            id: 'FM-001',
            name: 'David Brown',
            position: 'Finance Manager',
            department: 'Finance',
            email: 'david.brown@company.com',
            phone: '+233 24 345 6789',
            status: 'Active',
            startDate: '2018-07-10',
            reports: [],
          },
          {
            id: 'AM-001',
            name: 'Emily Davis',
            position: 'Accounting Manager',
            department: 'Accounting',
            email: 'emily.davis@company.com',
            phone: '+233 24 456 7890',
            status: 'Active',
            startDate: '2019-02-14',
            reports: [],
          },
        ],
      },
      {
        id: 'CTO-001',
        name: 'Michael Chen',
        position: 'Chief Technology Officer',
        department: 'Technology',
        email: 'michael.chen@company.com',
        phone: '+233 24 567 8901',
        status: 'Active',
        startDate: '2016-06-01',
        reports: [
          {
            id: 'EM-001',
            name: 'James Wilson',
            position: 'Engineering Manager',
            department: 'Engineering',
            email: 'james.wilson@company.com',
            phone: '+233 24 678 9012',
            status: 'Active',
            startDate: '2017-09-15',
            reports: [],
          },
          {
            id: 'PM-001',
            name: 'Lisa Anderson',
            position: 'Product Manager',
            department: 'Product',
            email: 'lisa.anderson@company.com',
            phone: '+233 24 789 0123',
            status: 'Active',
            startDate: '2018-11-20',
            reports: [],
          },
        ],
      },
      {
        id: 'CHRO-001',
        name: 'Jennifer Martinez',
        position: 'Chief Human Resources Officer',
        department: 'HR',
        email: 'jennifer.martinez@company.com',
        phone: '+233 24 890 1234',
        status: 'Active',
        startDate: '2016-08-10',
        reports: [
          {
            id: 'HRM-001',
            name: 'John Doe',
            position: 'HR Manager',
            department: 'HR',
            email: 'john.doe@company.com',
            phone: '+233 24 901 2345',
            status: 'Active',
            startDate: '2019-04-01',
            reports: [],
          },
          {
            id: 'RM-001',
            name: 'Jane Smith',
            position: 'Recruitment Manager',
            department: 'Recruitment',
            email: 'jane.smith@company.com',
            phone: '+233 24 012 3456',
            status: 'Active',
            startDate: '2020-01-15',
            reports: [],
          },
        ],
      },
    ],
  };

  const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
    <div 
      className={`p-4 border ${isDarkMode ? 'bg-[#2d2d2d] border-gray-700' : 'bg-white border-gray-200'} transition-all cursor-pointer hover:shadow-lg`}
      onClick={() => {
        setSelectedEmployee(employee);
        setShowEmployeeDetails(true);
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#00A4EF] flex items-center justify-center text-white font-bold text-lg">
          {employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {employee.name}
          </h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {employee.position}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {employee.department}
          </p>
          <div className={`mt-2 space-y-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div>{employee.email}</div>
            <div>{employee.phone}</div>
          </div>
          {employee.reports.length > 0 && (
            <div className="mt-2 text-xs" style={{ color: '#00A4EF' }}>
              {employee.reports.length} Direct Reports
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHierarchy = (employee: Employee, level: number = 0) => (
    <div key={employee.id} className="flex flex-col items-center">
      <div className="w-64">
        <EmployeeCard employee={employee} />
      </div>
      
      {employee.reports.length > 0 && (
        <>
          {/* Vertical connector */}
          <div className={`w-px h-8 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
          
          {/* Horizontal connector */}
          <div className="flex items-start gap-8 relative">
            {employee.reports.length > 1 && (
              <div
                className={`absolute top-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                style={{
                  left: '50%',
                  right: '50%',
                  transform: 'translateX(-50%)',
                  width: `${(employee.reports.length - 1) * 18}rem`,
                }}
              />
            )}
            
            {employee.reports.map((report) => (
              <div key={report.id} className="flex flex-col items-center">
                {/* Vertical connector to card */}
                <div className={`w-px h-8 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                {renderHierarchy(report, level + 1)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} min-h-screen`}>
      <div className="max-w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Organization Structure
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Visual representation of company hierarchy
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setViewMode(viewMode === 'hierarchy' ? 'list' : 'hierarchy')}
              className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <ViewIcon size={18} className="inline mr-2" />
              {viewMode === 'hierarchy' ? 'List View' : 'Hierarchy View'}
            </button>
            <button 
              onClick={() => setShowReorganizeModal(true)}
              className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <ReorganizeIcon size={18} className="inline mr-2" />
              Reorganize
            </button>
            <button 
              onClick={() => setShowExportModal(true)}
              className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <DownloadIcon size={18} className="inline mr-2" />
              Export Chart
            </button>
            <button 
              onClick={() => setShowAddEmployee(true)}
              className="px-4 py-2 text-white" 
              style={{ backgroundColor: '#00A4EF' }}
            >
              <PlusIcon size={18} className="inline mr-2" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats Cards with Icons on Right */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Employees</div>
                <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>145</div>
                <div className="text-xs mt-1" style={{ color: '#7FBA00' }}>+12 this month</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 164, 239, 0.1)' }}>
                <UsersIcon size={24} style={{ color: '#00A4EF' }} />
              </div>
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Departments</div>
                <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
                <div className="text-xs mt-1" style={{ color: '#00A4EF' }}>Across 4 divisions</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'rgba(127, 186, 0, 0.1)' }}>
                <DepartmentIcon size={24} style={{ color: '#7FBA00' }} />
              </div>
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Management Levels</div>
                <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4</div>
                <div className="text-xs mt-1" style={{ color: '#FFB900' }}>Optimal structure</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 185, 0, 0.1)' }}>
                <LevelsIcon size={24} style={{ color: '#FFB900' }} />
              </div>
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Team Size</div>
                <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>8</div>
                <div className="text-xs mt-1" style={{ color: '#F25022' }}>Per manager</div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'rgba(242, 80, 34, 0.1)' }}>
                <TeamIcon size={24} style={{ color: '#F25022' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Org Chart or List View */}
        {viewMode === 'hierarchy' ? (
          <div className={`p-8 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-x-auto`}>
            <div className="min-w-max flex justify-center">
              {renderHierarchy(orgData)}
            </div>
          </div>
        ) : (
          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              All Employees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getAllEmployees(orgData).map(emp => (
                <EmployeeCard key={emp.id} employee={emp} />
              ))}
            </div>
          </div>
        )}

        {/* Department Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Department Distribution
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Technology', count: 42, color: '#7FBA00', percent: 29 },
                { name: 'Sales', count: 32, color: '#00A4EF', percent: 22 },
                { name: 'Finance', count: 25, color: '#FFB900', percent: 17 },
                { name: 'HR', count: 18, color: '#F25022', percent: 12 },
                { name: 'Marketing', count: 12, color: '#00A4EF', percent: 8 },
                { name: 'Executive', count: 8, color: '#737373', percent: 6 },
                { name: 'Operations', count: 6, color: '#7FBA00', percent: 4 },
                { name: 'Support', count: 2, color: '#FFB900', percent: 2 },
              ].map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {dept.name}
                    </span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {dept.count} ({dept.percent}%)
                    </span>
                  </div>
                  <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full" style={{ backgroundColor: dept.color, width: `${dept.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Growth Trends
            </h2>
            <div className="space-y-4">
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Q1 2024</span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>125 employees</span>
                </div>
                <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full" style={{ backgroundColor: '#00A4EF', width: '86%' }} />
                </div>
              </div>
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Q2 2024</span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>133 employees</span>
                </div>
                <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full" style={{ backgroundColor: '#7FBA00', width: '92%' }} />
                </div>
              </div>
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Q3 2024</span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>145 employees</span>
                </div>
                <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full" style={{ backgroundColor: '#FFB900', width: '100%' }} />
                </div>
              </div>
              <div className={`p-3 mt-4 border-l-4`} style={{ borderColor: '#7FBA00', backgroundColor: isDarkMode ? 'rgba(127, 186, 0, 0.1)' : 'rgba(127, 186, 0, 0.05)' }}>
                <div className="text-sm font-semibold" style={{ color: '#7FBA00' }}>16% Growth</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Year-to-date headcount increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowAddEmployee(false)}>
          <div 
            className={`w-full max-w-2xl ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-6 max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Employee</h2>
              <button onClick={() => setShowAddEmployee(false)} className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>&times;</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                  <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                  <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Position</label>
                <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Select Department</option>
                  <option>Executive</option>
                  <option>Finance</option>
                  <option>Technology</option>
                  <option>HR</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reports To</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Select Manager</option>
                  <option>Robert Johnson - CEO</option>
                  <option>Sarah Williams - CFO</option>
                  <option>Michael Chen - CTO</option>
                  <option>Jennifer Martinez - CHRO</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input type="email" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                  <input type="tel" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Start Date</label>
                <input type="date" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddEmployee(false)} className={`flex-1 px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 text-white" style={{ backgroundColor: '#00A4EF' }}>
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showEmployeeDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowEmployeeDetails(false)}>
          <div 
            className={`w-full max-w-2xl ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Employee Details</h2>
              <button onClick={() => setShowEmployeeDetails(false)} className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>&times;</button>
            </div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-[#00A4EF] flex items-center justify-center text-white font-bold text-2xl">
                {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEmployee.position}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{selectedEmployee.department} Department</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Employee ID</div>
                <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.id}</div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</div>
                <div className="text-sm" style={{ color: '#7FBA00' }}>{selectedEmployee.status || 'Active'}</div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</div>
                <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.email}</div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</div>
                <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.phone}</div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start Date</div>
                <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.startDate || 'N/A'}</div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Direct Reports</div>
                <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.reports.length}</div>
              </div>
            </div>
            {selectedEmployee.reports.length > 0 && (
              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Direct Reports</h4>
                <div className="space-y-2">
                  {selectedEmployee.reports.map(report => (
                    <div key={report.id} className={`p-3 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{report.name}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.position}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button className={`flex-1 px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                Edit Employee
              </button>
              <button onClick={() => setShowEmployeeDetails(false)} className="flex-1 px-4 py-2 text-white" style={{ backgroundColor: '#00A4EF' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reorganize Modal */}
      {showReorganizeModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowReorganizeModal(false)}>
          <div 
            className={`w-full max-w-3xl ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-6 max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reorganize Structure</h2>
              <button onClick={() => setShowReorganizeModal(false)} className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>&times;</button>
            </div>
            <div className={`mb-4 p-4 border-l-4`} style={{ borderColor: '#FFB900', backgroundColor: isDarkMode ? 'rgba(255, 185, 0, 0.1)' : 'rgba(255, 185, 0, 0.05)' }}>
              <div className="text-sm font-semibold" style={{ color: '#FFB900' }}>⚠️ Important</div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Reorganizing the structure will affect reporting relationships and may impact permissions.
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Employee to Move</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Select Employee</option>
                  <option>David Brown - Finance Manager</option>
                  <option>Emily Davis - Accounting Manager</option>
                  <option>James Wilson - Engineering Manager</option>
                  <option>Lisa Anderson - Product Manager</option>
                  <option>John Doe - HR Manager</option>
                  <option>Jane Smith - Recruitment Manager</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Manager</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Select New Manager</option>
                  <option>Robert Johnson - CEO</option>
                  <option>Sarah Williams - CFO</option>
                  <option>Michael Chen - CTO</option>
                  <option>Jennifer Martinez - CHRO</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Effective Date</label>
                <input type="date" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reason for Reorganization</label>
                <textarea rows={3} className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Enter reason..."></textarea>
              </div>
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-300 bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Impact Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Employees Affected</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Reporting Chain Changes</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Permission Updates Required</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Yes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowReorganizeModal(false)} className={`flex-1 px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 text-white" style={{ backgroundColor: '#00A4EF' }}>
                Apply Reorganization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Chart Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowExportModal(false)}>
          <div 
            className={`w-full max-w-md ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Export Organization Chart</h2>
              <button onClick={() => setShowExportModal(false)} className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>&times;</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Export Format</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>PDF Document</option>
                  <option>PNG Image</option>
                  <option>SVG Image</option>
                  <option>Excel Spreadsheet</option>
                  <option>CSV File</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>View Type</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Hierarchy Chart</option>
                  <option>Employee List</option>
                  <option>Both Views</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Include Details</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact Information</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Details</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Employee Photos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Statistics Summary</span>
                  </label>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Page Orientation (for PDF)</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="orientation" defaultChecked className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Landscape</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="orientation" className="w-4 h-4" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Portrait</span>
                  </label>
                </div>
              </div>

              <div className={`p-3 border-l-4`} style={{ borderColor: '#00A4EF', backgroundColor: isDarkMode ? 'rgba(0, 164, 239, 0.1)' : 'rgba(0, 164, 239, 0.05)' }}>
                <div className="text-sm font-semibold" style={{ color: '#00A4EF' }}>Export Preview</div>
                <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  File size: ~2.5 MB • 145 employees • 12 departments
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowExportModal(false)} className={`flex-1 px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 text-white" style={{ backgroundColor: '#00A4EF' }}>
                <DownloadIcon size={16} className="inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getAllEmployees = (employee: Employee): Employee[] => {
  let employees = [employee];
  employee.reports.forEach(report => {
    employees = employees.concat(getAllEmployees(report));
  });
  return employees;
};

const DownloadIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 24, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DepartmentIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 24, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LevelsIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 24, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TeamIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 24, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ViewIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ReorganizeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default OrgStructureKanban;
