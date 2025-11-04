import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,  
  PlusIcon, 
  TrashIcon, 
  EditIcon, 
  FilterIcon,
  EyeIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/Icons';
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

interface Interview {
  id: string;
  candidate: string;
  position: string;
  jobId: string;
  interviewer: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  location?: string;
  notes?: string;
  duration?: string;
  round?: string;
  feedback?: string;
  rating?: number;
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidate: 'Alice Johnson',
    position: 'Senior Full Stack Developer',
    jobId: '1',
    interviewer: 'John Doe',
    date: '2025-11-10',
    time: '10:00',
    type: 'video',
    status: 'scheduled',
    location: 'Zoom Meeting',
    notes: 'Technical interview - Round 1',
    duration: '60 min',
    round: 'Technical Round',
  },
  {
    id: '2',
    candidate: 'Bob Smith',
    position: 'Senior Full Stack Developer',
    jobId: '1',
    interviewer: 'Jane Smith',
    date: '2025-11-12',
    time: '14:00',
    type: 'in-person',
    status: 'scheduled',
    location: 'Conference Room A',
    duration: '45 min',
    round: 'Final Round',
    notes: 'Leadership and culture fit assessment',
  },
  {
    id: '3',
    candidate: 'Carol Williams',
    position: 'UX/UI Designer',
    jobId: '3',
    interviewer: 'Bob Wilson',
    date: '2025-11-05',
    time: '11:00',
    type: 'video',
    status: 'completed',
    duration: '60 min',
    round: 'Portfolio Review',
    rating: 4.5,
    feedback: 'Strong portfolio, excellent design thinking',
  },
  {
    id: '4',
    candidate: 'David Lee',
    position: 'Product Manager',
    jobId: '2',
    interviewer: 'Sarah Johnson',
    date: '2025-11-08',
    time: '09:30',
    type: 'phone',
    status: 'completed',
    duration: '30 min',
    round: 'Screening Call',
    rating: 4.0,
    feedback: 'Good experience, proceed to next round',
  },
  {
    id: '5',
    candidate: 'Emma Davis',
    position: 'DevOps Engineer',
    jobId: '4',
    interviewer: 'Michael Chen',
    date: '2025-11-06',
    time: '15:00',
    type: 'video',
    status: 'no-show',
    duration: '60 min',
    round: 'Technical Round',
  },
  {
    id: '6',
    candidate: 'Frank Wilson',
    position: 'Marketing Manager',
    jobId: '5',
    interviewer: 'Lisa Anderson',
    date: '2025-11-03',
    time: '13:00',
    type: 'in-person',
    status: 'cancelled',
    location: 'Conference Room B',
    duration: '45 min',
    round: 'Initial Interview',
    notes: 'Candidate withdrew application',
  },
];

const interviewsByWeek = [
  { week: 'Week 1', scheduled: 12, completed: 8, cancelled: 2 },
  { week: 'Week 2', scheduled: 15, completed: 12, cancelled: 1 },
  { week: 'Week 3', scheduled: 10, completed: 9, cancelled: 3 },
  { week: 'Week 4', scheduled: 18, completed: 14, cancelled: 2 },
];

const interviewByType = [
  { name: 'Video', value: 45, color: '#00A4EF' },
  { name: 'In-Person', value: 30, color: '#7FBA00' },
  { name: 'Phone', value: 25, color: '#FFB900' },
];

export const Interviews: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [interviews] = useState<Interview[]>(mockInterviews);
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [formData, setFormData] = useState({
    candidate: '',
    position: '',
    interviewer: '',
    date: '',
    time: '',
    type: 'video' as 'in-person' | 'video' | 'phone',
    location: '',
    duration: '',
    round: '',
    notes: '',
  });

  const filteredInterviews = activeTab === 'all' 
    ? interviews 
    : interviews.filter(i => i.status === activeTab);

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summaryStats = {
    totalInterviews: interviews.length,
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    avgRating: (interviews.filter(i => i.rating).reduce((sum, i) => sum + (i.rating || 0), 0) / interviews.filter(i => i.rating).length).toFixed(1),
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-[#00A4EF]/10 text-[#00A4EF]';
      case 'in-person':
        return 'bg-[#7FBA00]/10 text-[#7FBA00]';
      default:
        return 'bg-[#FFB900]/10 text-[#FFB900]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-[#00A4EF]/10 text-[#00A4EF]';
      case 'completed':
        return 'bg-[#7FBA00]/10 text-[#7FBA00]';
      case 'no-show':
        return 'bg-[#F25022]/10 text-[#F25022]';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleSchedule = () => {
    console.log('Scheduling interview:', formData);
    setShowScheduleModal(false);
    setFormData({
      candidate: '',
      position: '',
      interviewer: '',
      date: '',
      time: '',
      type: 'video',
      location: '',
      duration: '',
      round: '',
      notes: '',
    });
  };

  const handleEdit = () => {
    console.log('Editing interview:', selectedInterview?.id, formData);
    setShowEditModal(false);
    setSelectedInterview(null);
  };

  const handleDelete = () => {
    console.log('Deleting interview:', selectedInterview?.id);
    setShowDeleteModal(false);
    setSelectedInterview(null);
  };

  const openEditModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setFormData({
      candidate: interview.candidate,
      position: interview.position,
      interviewer: interview.interviewer,
      date: interview.date,
      time: interview.time,
      type: interview.type,
      location: interview.location || '',
      duration: interview.duration || '',
      round: interview.round || '',
      notes: interview.notes || '',
    });
    setShowEditModal(true);
  };

  const openViewModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setShowViewModal(true);
  };

  const openDeleteModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Interview Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule and manage candidate interviews
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.totalInterviews}</p>
              </div>
              <div className="p-3 bg-[#00A4EF]/10 text-[#00A4EF]">
                <CalendarIcon size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.scheduled}</p>
              </div>
              <div className="p-3 bg-[#FFB900]/10 text-[#FFB900]">
                <ClockIcon size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.completed}</p>
              </div>
              <div className="p-3 bg-[#7FBA00]/10 text-[#7FBA00]">
                <CheckCircleIcon size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.avgRating}/5.0</p>
              </div>
              <div className="p-3 bg-[#F25022]/10 text-[#F25022]">
                <UserIcon size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={interviewsByWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="week" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                    borderRadius: '2px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="scheduled" stroke="#00A4EF" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#7FBA00" strokeWidth={2} />
                <Line type="monotone" dataKey="cancelled" stroke="#F25022" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={interviewByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${((entry.value / interviewByType.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {interviewByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === 'scheduled'
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Scheduled
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === 'completed'
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === 'cancelled'
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Cancelled
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowFilterModal(true)}>
                <FilterIcon size={16} className="mr-1" />
                Filter
              </Button>
              <Button variant="primary" size="sm" onClick={() => setShowScheduleModal(true)}>
                <PlusIcon size={16} className="mr-1" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Interviews Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Interviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Round
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {interview.candidate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{interview.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{interview.interviewer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{interview.date}</div>
                      <div className="text-xs text-gray-500">{interview.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium ${getTypeColor(interview.type)}`}>
                        {interview.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{interview.round}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(interview.status)}`}>
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => openViewModal(interview)}>
                          <EyeIcon size={14} />
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => openEditModal(interview)}>
                          <EditIcon size={14} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => openDeleteModal(interview)}>
                          <TrashIcon size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInterviews.length)} of {filteredInterviews.length} interviews
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon size={16} />
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm ${
                        currentPage === page
                          ? 'bg-[#00A4EF] text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Schedule Interview</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      value={formData.candidate}
                      onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="Enter candidate name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="Enter position"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Interviewer
                    </label>
                    <input
                      type="text"
                      value={formData.interviewer}
                      onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="Enter interviewer name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Round
                    </label>
                    <input
                      type="text"
                      value={formData.round}
                      onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="e.g., Technical Round"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="e.g., 60 min"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'in-person' | 'video' | 'phone' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="video">Video</option>
                      <option value="in-person">In-Person</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location/Link
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="Enter location or meeting link"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    placeholder="Add any additional notes"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSchedule}>
                  Schedule Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Interview Modal */}
      {showViewModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Interview Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Candidate</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.candidate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Position</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interviewer</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.interviewer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Round</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.round}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(selectedInterview.type)}`}>
                      {selectedInterview.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${getStatusColor(selectedInterview.status)}`}>
                      {selectedInterview.status}
                    </span>
                  </div>
                </div>

                {selectedInterview.location && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location/Link</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.location}</p>
                  </div>
                )}

                {selectedInterview.rating && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{selectedInterview.rating}/5.0</p>
                  </div>
                )}

                {selectedInterview.feedback && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Feedback</p>
                    <p className="text-base text-gray-900 dark:text-white">{selectedInterview.feedback}</p>
                  </div>
                )}

                {selectedInterview.notes && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                    <p className="text-base text-gray-900 dark:text-white">{selectedInterview.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Interview Modal */}
      {showEditModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Interview</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      value={formData.candidate}
                      onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Interviewer
                    </label>
                    <input
                      type="text"
                      value={formData.interviewer}
                      onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Round
                    </label>
                    <input
                      type="text"
                      value={formData.round}
                      onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'in-person' | 'video' | 'phone' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="video">Video</option>
                      <option value="in-person">In-Person</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location/Link
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delete Interview</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete the interview with <strong>{selectedInterview.candidate}</strong> for the position of <strong>{selectedInterview.position}</strong>? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Filter Interviews</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interview Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                    <option value="">All Types</option>
                    <option value="video">Video</option>
                    <option value="in-person">In-Person</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                    <option value="">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No-Show</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="To"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interviewer
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    placeholder="Search by interviewer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
                  Clear
                </Button>
                <Button variant="primary" onClick={() => setShowFilterModal(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;
