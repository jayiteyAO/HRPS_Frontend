
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  BriefcaseIcon, 
  CheckCircleIcon, 
  UsersIcon,
  FilterIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  LocationIcon,
  CalendarIcon,
  ChartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/Button';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  applicants: number;
  status: 'Active' | 'Closed' | 'Draft' | 'On Hold';
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  views: number;
}

export const JobPostings: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'closed' | 'on-hold'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const jobs: JobPosting[] = [
    { 
      id: '1', 
      title: 'Senior Full Stack Developer', 
      department: 'Engineering', 
      location: 'Remote', 
      type: 'Full-time',
      salary: 'GH₵ 120,000 - GH₵ 180,000',
      applicants: 45, 
      status: 'Active', 
      posted: '2025-02-01',
      deadline: '2025-03-15',
      description: 'We are seeking an experienced Full Stack Developer to join our growing engineering team.',
      requirements: ['5+ years experience', 'React & Node.js', 'TypeScript', 'AWS/Azure'],
      responsibilities: ['Lead development projects', 'Mentor junior developers', 'Code reviews'],
      views: 324
    },
    { 
      id: '2', 
      title: 'Product Manager', 
      department: 'Product', 
      location: 'Accra', 
      type: 'Full-time',
      salary: 'GH₵ 100,000 - GH₵ 140,000',
      applicants: 32, 
      status: 'Active', 
      posted: '2025-02-10',
      deadline: '2025-03-20',
      description: 'Looking for a strategic Product Manager to drive product vision and execution.',
      requirements: ['3+ years PM experience', 'Agile methodology', 'Data-driven mindset'],
      responsibilities: ['Define product roadmap', 'Stakeholder management', 'Feature prioritization'],
      views: 256
    },
    { 
      id: '3', 
      title: 'UX/UI Designer', 
      department: 'Design', 
      location: 'Hybrid', 
      type: 'Full-time',
      salary: 'GH₵ 70,000 - GH₵ 95,000',
      applicants: 28, 
      status: 'Active', 
      posted: '2025-02-15',
      deadline: '2025-03-25',
      description: 'Creative UX/UI Designer needed to craft beautiful and intuitive user experiences.',
      requirements: ['Figma/Sketch proficiency', 'Portfolio required', 'User research experience'],
      responsibilities: ['Design mockups', 'User testing', 'Design system maintenance'],
      views: 189
    },
    { 
      id: '4', 
      title: 'Data Analyst', 
      department: 'Analytics', 
      location: 'Remote', 
      type: 'Full-time',
      salary: 'GH₵ 60,000 - GH₵ 85,000',
      applicants: 51, 
      status: 'Closed', 
      posted: '2025-01-20',
      deadline: '2025-02-28',
      description: 'Data Analyst to transform data into actionable insights.',
      requirements: ['SQL proficiency', 'Python/R', 'Data visualization'],
      responsibilities: ['Create dashboards', 'Analyze trends', 'Present findings'],
      views: 412
    },
    { 
      id: '5', 
      title: 'HR Coordinator', 
      department: 'Human Resources', 
      location: 'Accra', 
      type: 'Full-time',
      salary: 'GH₵ 45,000 - GH₵ 60,000',
      applicants: 67, 
      status: 'Active', 
      posted: '2025-02-20',
      deadline: '2025-03-30',
      description: 'Organized HR Coordinator to support recruitment and employee relations.',
      requirements: ['HR degree', '2+ years experience', 'HRIS knowledge'],
      responsibilities: ['Coordinate recruitment', 'Employee onboarding', 'Maintain HR records'],
      views: 298
    },
    { 
      id: '6', 
      title: 'DevOps Engineer', 
      department: 'Engineering', 
      location: 'Remote', 
      type: 'Full-time',
      salary: 'GH₵ 110,000 - GH₵ 150,000',
      applicants: 38, 
      status: 'On Hold', 
      posted: '2025-02-05',
      deadline: '2025-03-18',
      description: 'DevOps Engineer to build and maintain CI/CD pipelines.',
      requirements: ['Docker/Kubernetes', 'AWS/GCP', 'Terraform', 'Linux'],
      responsibilities: ['Manage infrastructure', 'Automate deployments', 'Monitor systems'],
      views: 167
    },
  ];

  const applicantsTrendData = [
    { month: 'Jan', applicants: 145 },
    { month: 'Feb', applicants: 189 },
    { month: 'Mar', applicants: 234 },
    { month: 'Apr', applicants: 198 },
    { month: 'May', applicants: 267 },
    { month: 'Jun', applicants: 312 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35 },
    { name: 'Product', value: 20 },
    { name: 'Design', value: 15 },
    { name: 'HR', value: 12 },
    { name: 'Others', value: 18 },
  ];

  const COLORS = ['#00A4EF', '#7FBA00', '#FFB900', '#F25022', '#737373'];

  const summaryCards = [
    { 
      label: 'Active Jobs', 
      value: jobs.filter(j => j.status === 'Active').length, 
      icon: BriefcaseIcon,
      color: '#7FBA00',
      bgColor: '#7FBA0020'
    },
    { 
      label: 'Total Applicants', 
      value: jobs.reduce((sum, j) => sum + j.applicants, 0), 
      icon: UsersIcon,
      color: '#00A4EF',
      bgColor: '#00A4EF20'
    },
    { 
      label: 'Total Views', 
      value: jobs.reduce((sum, j) => sum + j.views, 0), 
      icon: EyeIcon,
      color: '#FFB900',
      bgColor: '#FFB90020'
    },
    { 
      label: 'Closed Positions', 
      value: jobs.filter(j => j.status === 'Closed').length, 
      icon: CheckCircleIcon,
      color: '#F25022',
      bgColor: '#F2502220'
    }
  ];

  const handleViewJob = (job: JobPosting) => {
    setSelectedJob(job);
    setIsViewOpen(true);
  };

  const handleEditJob = (job: JobPosting) => {
    setSelectedJob(job);
    setIsEditOpen(true);
  };

  const handleDeleteJob = (job: JobPosting) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return job.status === 'Active';
    if (activeTab === 'closed') return job.status === 'Closed';
    if (activeTab === 'on-hold') return job.status === 'On Hold';
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: 'bg-[#7FBA00]/20', text: 'text-[#7FBA00]' };
      case 'Closed':
        return { bg: 'bg-gray-500/20', text: 'text-gray-500' };
      case 'On Hold':
        return { bg: 'bg-[#FFB900]/20', text: 'text-[#FFB900]' };
      case 'Draft':
        return { bg: 'bg-[#00A4EF]/20', text: 'text-[#00A4EF]' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Job Postings
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 text-sm bg-gray-500/20 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 hover:bg-gray-500/30 transition-colors"
          >
            <FilterIcon size={16} />
            Filter
          </button>
          <button
            onClick={() => setIsPostJobOpen(true)}
            className="px-3 py-2 text-sm bg-[#00A4EF] text-white font-medium flex items-center gap-2 hover:bg-[#0078D4] transition-colors"
          >
            <PlusIcon size={16} />
            Post New Job
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        {summaryCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`
                ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}
                p-6 shadow-sm border
                ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Toggle Button */}
      <div className="flex justify-start">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="px-4 py-2 text-sm bg-[#7FBA00]/20 text-[#7FBA00] font-medium flex items-center gap-2 hover:bg-[#7FBA00]/30 transition-colors"
        >
          <ChartIcon size={18} />
          {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
        </button>
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recruitment Analytics
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Applicants Trend
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={applicantsTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="applicants" stroke="#00A4EF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Applications by Department
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => `${entry.name} ${((entry.value / departmentData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Job Performance Metrics
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Avg. Applicants/Job', value: '38', color: '#00A4EF' },
                  { label: 'Avg. Time to Fill', value: '24 days', color: '#7FBA00' },
                  { label: 'Application Rate', value: '12.5%', color: '#FFB900' },
                  { label: 'Offer Accept Rate', value: '85%', color: '#F25022' },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}
                  >
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{metric.label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: metric.color }}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex gap-1 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {[
          { key: 'all', label: 'All Jobs', count: jobs.length },
          { key: 'active', label: 'Active', count: jobs.filter(j => j.status === 'Active').length },
          { key: 'closed', label: 'Closed', count: jobs.filter(j => j.status === 'Closed').length },
          { key: 'on-hold', label: 'On Hold', count: jobs.filter(j => j.status === 'On Hold').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as any);
              setCurrentPage(1);
            }}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? `border-b-2 border-[#00A4EF] ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Job Title
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Department
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Applicants
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Views
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Deadline
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {paginatedJobs.map((job) => {
                const statusColor = getStatusColor(job.status);
                return (
                  <tr key={job.id} className={`${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div className="font-medium">{job.title}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.salary}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {job.department}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-1">
                        <LocationIcon size={14} />
                        {job.location}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {job.type}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
                      {job.applicants}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {job.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        {job.deadline}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewJob(job)}
                          className="p-1.5 text-[#00A4EF] hover:bg-[#00A4EF]/10 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleEditJob(job)}
                          className="p-1.5 text-[#7FBA00] hover:bg-[#7FBA00]/10 transition-colors"
                          title="Edit"
                        >
                          <EditIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job)}
                          className="p-1.5 text-[#F25022] hover:bg-[#F25022]/10 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`px-6 py-4 flex items-center justify-between border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm flex items-center gap-1 border ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                <ChevronLeftIcon size={16} />
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === page
                        ? 'bg-[#00A4EF] text-white border-[#00A4EF]'
                        : `${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm flex items-center gap-1 border ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Next
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Post New Job Dialog */}
      <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
        <DialogContent className={`max-w-3xl ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Post New Job</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Create a new job posting to attract qualified candidates
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Job Title
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Department
                </label>
                <select
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>HR</option>
                  <option>Analytics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="e.g. Remote, Accra, Hybrid"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Employment Type
                </label>
                <select
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Salary Range
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="e.g. GH₵ 100,000 - GH₵ 150,000"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Application Deadline
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Job Description
              </label>
              <textarea
                rows={4}
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Describe the role and what you're looking for..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Requirements
              </label>
              <textarea
                rows={3}
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="List required skills and qualifications..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Responsibilities
              </label>
              <textarea
                rows={3}
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="List key responsibilities..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsPostJobOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsPostJobOpen(false)}
              className="bg-[#00A4EF] text-white hover:bg-[#0078D4] text-sm"
            >
              Post Job
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Filter Job Postings</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Refine job listings by status and department
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Department
              </label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
                <option value="hr">Human Resources</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Location
              </label>
              <select
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="accra">Accra</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen(false)}
              className="text-sm"
            >
              Clear
            </Button>
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="bg-[#00A4EF] text-white hover:bg-[#0078D4] text-sm"
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Job Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className={`max-w-3xl ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Complete job posting details
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.department}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.location}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Employment Type</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.type}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Salary Range</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.salary}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Posted Date</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.posted}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Application Deadline</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.deadline}</p>
                </div>
              </div>

              <div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</p>
                <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.description}</p>
              </div>

              <div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Requirements</p>
                <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Responsibilities</p>
                <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.applicants}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Applicants</p>
                </div>
                <div className="text-center">
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.views}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Views</p>
                </div>
                <div className="text-center">
                  <span className={`inline-block px-4 py-2 text-sm font-medium ${getStatusColor(selectedJob.status).bg} ${getStatusColor(selectedJob.status).text}`}>
                    {selectedJob.status}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsViewOpen(false)}
              className="text-sm"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className={`max-w-3xl ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Edit Job Posting</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Update job posting information
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedJob.title}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    defaultValue={selectedJob.status}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Department
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedJob.department}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedJob.location}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Salary Range
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedJob.salary}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Deadline
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedJob.deadline}
                    className={`w-full px-4 py-2 border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  rows={4}
                  defaultValue={selectedJob.description}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsEditOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsEditOpen(false)}
              className="bg-[#7FBA00] text-white hover:bg-[#6AA000] text-sm"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Delete Job Posting</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Are you sure you want to delete this job posting?
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedJob.department} • {selectedJob.location}
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedJob.applicants} applicants will be notified
              </p>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(false)}
              className="bg-[#F25022] text-white hover:bg-[#D13F1A] text-sm"
            >
              Delete Posting
            </Button>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
};
