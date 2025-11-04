
import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { BarChart, ProgressBar, PieChart } from '@/components/Charts';
import { 
  EmployeeIcon, 
  DownloadIcon, 
  FilterIcon, 
  ChartIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  BuildingIcon,
  LocationIcon,
  EyeIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface DepartmentDetail {
  department: string;
  headcount: number;
  change: number;
  locations: { name: string; count: number }[];
  avgAge: number;
  avgTenure: string;
}

export const HeadcountReports = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetail | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');
  
  // Filter state
  const [filters, setFilters] = useState({
    departments: [] as string[],
    locations: [] as string[],
    contractTypes: [] as string[],
    ageGroups: [] as string[],
    tenureRanges: [] as string[],
  });

  const departmentData = [
    { label: 'Engineering', value: 45, color: 'bg-[#00A4EF]' },
    { label: 'Sales', value: 32, color: 'bg-[#7FBA00]' },
    { label: 'Marketing', value: 18, color: 'bg-[#FFB900]' },
    { label: 'HR', value: 12, color: 'bg-[#F25022]' },
    { label: 'Finance', value: 15, color: 'bg-[#737373]' },
  ];

  const genderData = [
    { label: 'Male', value: 68, color: '#00A4EF' },
    { label: 'Female', value: 54, color: '#7FBA00' },
  ];

  const ageGroups = [
    { label: '18-25', percentage: 15 },
    { label: '26-35', percentage: 45 },
    { label: '36-45', percentage: 25 },
    { label: '46-55', percentage: 10 },
    { label: '56+', percentage: 5 },
  ];

  const departmentDetails: DepartmentDetail[] = [
    {
      department: 'Engineering',
      headcount: 45,
      change: 12.5,
      locations: [
        { name: 'Lagos', count: 28 },
        { name: 'Abuja', count: 12 },
        { name: 'Port Harcourt', count: 5 },
      ],
      avgAge: 32,
      avgTenure: '3.2 years',
    },
    {
      department: 'Sales',
      headcount: 32,
      change: 8.3,
      locations: [
        { name: 'Lagos', count: 15 },
        { name: 'Abuja', count: 10 },
        { name: 'Kano', count: 7 },
      ],
      avgAge: 29,
      avgTenure: '2.1 years',
    },
    {
      department: 'Marketing',
      headcount: 18,
      change: 5.9,
      locations: [
        { name: 'Lagos', count: 12 },
        { name: 'Abuja', count: 6 },
      ],
      avgAge: 28,
      avgTenure: '1.8 years',
    },
    {
      department: 'HR',
      headcount: 12,
      change: 0,
      locations: [
        { name: 'Lagos', count: 8 },
        { name: 'Abuja', count: 4 },
      ],
      avgAge: 35,
      avgTenure: '4.5 years',
    },
    {
      department: 'Finance',
      headcount: 15,
      change: 7.1,
      locations: [
        { name: 'Lagos', count: 10 },
        { name: 'Abuja', count: 5 },
      ],
      avgAge: 38,
      avgTenure: '5.2 years',
    },
  ];

  const locationData = [
    { location: 'Lagos', count: 73, percentage: 59.8 },
    { location: 'Abuja', count: 37, percentage: 30.3 },
    { location: 'Port Harcourt', count: 5, percentage: 4.1 },
    { location: 'Kano', count: 7, percentage: 5.7 },
  ];

  const contractTypes = [
    { type: 'Full-Time', count: 98, percentage: 80.3, color: 'bg-[#00A4EF]' },
    { type: 'Part-Time', count: 12, percentage: 9.8, color: 'bg-[#7FBA00]' },
    { type: 'Contract', count: 8, percentage: 6.6, color: 'bg-[#FFB900]' },
    { type: 'Intern', count: 4, percentage: 3.3, color: 'bg-[#F25022]' },
  ];

  const handleViewDetails = (dept: DepartmentDetail) => {
    setSelectedDepartment(dept);
    setShowDetailsDialog(true);
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleFilter = () => {
    setShowFilterDialog(true);
  };

  const handleApplyFilters = () => {
    setShowFilterDialog(false);
    // Apply filters logic here
  };

  const handleClearFilters = () => {
    setFilters({
      departments: [],
      locations: [],
      contractTypes: [],
      ageGroups: [],
      tenureRanges: [],
    });
  };

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <EmployeeIcon size={28} className="text-[#00A4EF]" />
            Headcount Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Employee demographics and distribution analytics
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <Button variant="secondary" onClick={handleFilter}>
            <FilterIcon size={16} />
            <span>Filter</span>
          </Button>
          <Button variant="primary" onClick={handleExport}>
            <DownloadIcon size={16} />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            selectedView === 'overview'
              ? 'border-[#00A4EF] text-[#00A4EF]'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('departments')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            selectedView === 'departments'
              ? 'border-[#00A4EF] text-[#00A4EF]'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Departments
        </button>
        <button
          onClick={() => setSelectedView('locations')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            selectedView === 'locations'
              ? 'border-[#00A4EF] text-[#00A4EF]'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Locations
        </button>
        <button
          onClick={() => setSelectedView('trends')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            selectedView === 'trends'
              ? 'border-[#00A4EF] text-[#00A4EF]'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Trends
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding={false} className="p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <UsersIcon size={16} />
                Total Employees
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">122</p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUpIcon size={12} />
                <span>↑ 8.5% from last month</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <UsersIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <TrendingUpIcon size={16} />
                New Hires
              </p>
              <p className="text-3xl font-bold text-[#7FBA00] mt-2">8</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUpIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <CalendarIcon size={16} />
                Departures
              </p>
              <p className="text-3xl font-bold text-[#F25022] mt-2">3</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <CalendarIcon size={24} className="text-[#F25022]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <ChartIcon size={16} />
                Turnover Rate
              </p>
              <p className="text-3xl font-bold text-[#FFB900] mt-2">2.4%</p>
              <p className="text-xs text-gray-500 mt-2">Annual rate</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <ChartIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <Card>
            <CardHeader title="Employees by Department" />
            <BarChart data={departmentData} height={250} />
          </Card>

          {/* Gender Distribution */}
          <Card>
            <CardHeader title="Gender Distribution" />
            <div className="flex justify-center py-4">
              <PieChart data={genderData} size={220} />
            </div>
          </Card>

          {/* Age Distribution */}
          <Card>
            <CardHeader title="Age Group Distribution" />
            <div className="space-y-4 mt-4">
              {ageGroups.map((group, index) => (
                <ProgressBar
                  key={index}
                  label={group.label}
                  value={group.percentage}
                  color="bg-[#00A4EF]"
                />
              ))}
            </div>
          </Card>

          {/* Contract Types */}
          <Card>
            <CardHeader title="Employment Types" />
            <div className="space-y-4 mt-4">
              {contractTypes.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{type.type}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {type.count} ({type.percentage}%)
                    </span>
                  </div>
                  <ProgressBar value={type.percentage} color={type.color} showPercentage={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Departments View */}
      {selectedView === 'departments' && (
        <Card>
          <CardHeader title="Department Details" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Headcount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Tenure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {departmentDetails.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <BuildingIcon size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {dept.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {dept.headcount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dept.change > 0 ? (
                        <Badge variant="success">+{dept.change}%</Badge>
                      ) : dept.change < 0 ? (
                        <Badge variant="danger">{dept.change}%</Badge>
                      ) : (
                        <Badge variant="default">0%</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {dept.avgAge} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {dept.avgTenure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(dept)}
                      >
                        <EyeIcon size={14} />
                        <span>View Details</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Locations View */}
      {selectedView === 'locations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Employees by Location" />
            <div className="space-y-4 mt-4">
              {locationData.map((loc, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <LocationIcon size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{loc.location}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {loc.count} ({loc.percentage}%)
                    </span>
                  </div>
                  <ProgressBar value={loc.percentage} color="bg-[#00A4EF]" showPercentage={false} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Location Distribution Chart" />
            <BarChart 
              data={locationData.map(loc => ({
                label: loc.location,
                value: loc.count,
                color: 'bg-[#00A4EF]',
              }))} 
              height={250} 
            />
          </Card>
        </div>
      )}

      {/* Trends View */}
      {selectedView === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Monthly Headcount Growth" />
            <div className="space-y-3 mt-4">
              {[
                { month: 'January', count: 105, color: 'bg-[#00A4EF]' },
                { month: 'February', count: 112, color: 'bg-[#7FBA00]' },
                { month: 'March', count: 122, color: 'bg-[#FFB900]' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{item.month}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                  <ProgressBar value={item.count} max={150} color={item.color} showPercentage={false} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Hiring vs Attrition Trend" />
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Hires (Q1)</span>
                  <span className="text-xl font-bold text-[#7FBA00]">24</span>
                </div>
                <ProgressBar value={80} color="bg-[#7FBA00]" showPercentage={false} />
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Departures (Q1)</span>
                  <span className="text-xl font-bold text-[#F25022]">7</span>
                </div>
                <ProgressBar value={23} color="bg-[#F25022]" showPercentage={false} />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Net Growth</span>
                  <span className="text-xl font-bold text-[#00A4EF]">+17</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Department Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDepartment?.department} Department Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedDepartment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Headcount</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedDepartment.headcount}
                  </p>
                  {selectedDepartment.change !== 0 && (
                    <p className={`text-sm mt-2 ${selectedDepartment.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedDepartment.change > 0 ? '↑' : '↓'} {Math.abs(selectedDepartment.change)}% change
                    </p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Age</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedDepartment.avgAge}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">years old</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Distribution by Location
                </h4>
                <div className="space-y-3">
                  {selectedDepartment.locations.map((loc, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <LocationIcon size={14} className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{loc.name}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {loc.count} employees
                        </span>
                      </div>
                      <ProgressBar 
                        value={(loc.count / selectedDepartment.headcount) * 100} 
                        color="bg-[#00A4EF]" 
                        showPercentage={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-sm">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={20} className="text-[#00A4EF]" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Average Tenure
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedDepartment.avgTenure}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="primary">
              <DownloadIcon size={16} />
              <span>Export Department Report</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-lg">
          <DialogHeader>
            <DialogTitle>Export Headcount Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Format
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV File</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Include Sections
              </label>
              <div className="space-y-2">
                {['Summary Statistics', 'Department Breakdown', 'Location Analysis', 'Trend Charts'].map((section) => (
                  <label key={section} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{section}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="current">Current Period</option>
                <option value="ytd">Year to Date</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              <DownloadIcon size={16} />
              <span>Download Report</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Filter Headcount Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Departments Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Departments
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'].map((dept) => (
                  <label key={dept} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(dept)}
                      onChange={() => toggleFilter('departments', dept)}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Locations Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Locations
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Lagos', 'Abuja', 'Port Harcourt', 'Kano'].map((location) => (
                  <label key={location} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.locations.includes(location)}
                      onChange={() => toggleFilter('locations', location)}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contract Types Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Contract Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Full-Time', 'Part-Time', 'Contract', 'Intern'].map((type) => (
                  <label key={type} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.contractTypes.includes(type)}
                      onChange={() => toggleFilter('contractTypes', type)}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Age Groups Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Age Groups
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['18-25', '26-35', '36-45', '46-55', '56+'].map((age) => (
                  <label key={age} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.ageGroups.includes(age)}
                      onChange={() => toggleFilter('ageGroups', age)}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{age}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tenure Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tenure Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['0-1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map((tenure) => (
                  <label key={tenure} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.tenureRanges.includes(tenure)}
                      onChange={() => toggleFilter('tenureRanges', tenure)}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tenure}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            {(filters.departments.length > 0 || filters.locations.length > 0 || 
              filters.contractTypes.length > 0 || filters.ageGroups.length > 0 || 
              filters.tenureRanges.length > 0) && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Filters
                  </p>
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...filters.departments, ...filters.locations, ...filters.contractTypes, 
                    ...filters.ageGroups, ...filters.tenureRanges].map((filter, idx) => (
                    <Badge key={idx} variant="primary">{filter}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApplyFilters}>
              <FilterIcon size={16} />
              <span>Apply Filters</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeadcountReports;
