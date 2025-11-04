
import { useState } from 'react';
import { Button } from '@/components/Button';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  X,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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

interface TrainingProgram {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  startDate: string;
  endDate: string;
  enrolled: number;
  capacity: number;
  completed: number;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Cancelled';
  progress: number;
}

const trainingData: TrainingProgram[] = [
  {
    id: 'TRN-001',
    title: 'Leadership Development Program',
    category: 'Leadership',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    startDate: '2025-01-15',
    endDate: '2025-03-10',
    enrolled: 24,
    capacity: 30,
    completed: 18,
    status: 'Active',
    progress: 65,
  },
  {
    id: 'TRN-002',
    title: 'Technical Skills Bootcamp',
    category: 'Technical',
    instructor: 'John Williams',
    duration: '6 weeks',
    startDate: '2025-02-01',
    endDate: '2025-03-15',
    enrolled: 30,
    capacity: 30,
    completed: 0,
    status: 'Upcoming',
    progress: 0,
  },
  {
    id: 'TRN-003',
    title: 'Communication Excellence',
    category: 'Soft Skills',
    instructor: 'Emily Chen',
    duration: '4 weeks',
    startDate: '2024-12-01',
    endDate: '2024-12-29',
    enrolled: 20,
    capacity: 25,
    completed: 20,
    status: 'Completed',
    progress: 100,
  },
  {
    id: 'TRN-004',
    title: 'Project Management Certification',
    category: 'Professional',
    instructor: 'Michael Brown',
    duration: '12 weeks',
    startDate: '2025-01-20',
    endDate: '2025-04-15',
    enrolled: 18,
    capacity: 20,
    completed: 5,
    status: 'Active',
    progress: 42,
  },
  {
    id: 'TRN-005',
    title: 'Data Analytics Fundamentals',
    category: 'Technical',
    instructor: 'Lisa Anderson',
    duration: '6 weeks',
    startDate: '2025-03-01',
    endDate: '2025-04-12',
    enrolled: 15,
    capacity: 25,
    completed: 0,
    status: 'Upcoming',
    progress: 0,
  },
];

const progressChartData = [
  { month: 'Jan', completed: 45, inProgress: 32, upcoming: 18 },
  { month: 'Feb', completed: 52, inProgress: 38, upcoming: 22 },
  { month: 'Mar', completed: 61, inProgress: 41, upcoming: 25 },
  { month: 'Apr', completed: 58, inProgress: 45, upcoming: 20 },
  { month: 'May', completed: 67, inProgress: 48, upcoming: 28 },
  { month: 'Jun', completed: 74, inProgress: 52, upcoming: 30 },
];

const categoryData = [
  { name: 'Leadership', value: 28, color: '#00A4EF' },
  { name: 'Technical', value: 35, color: '#7FBA00' },
  { name: 'Soft Skills', value: 22, color: '#FFB900' },
  { name: 'Professional', value: 15, color: '#F25022' },
];

const completionRateData = [
  { program: 'Leadership', rate: 85 },
  { program: 'Technical', rate: 78 },
  { program: 'Soft Skills', rate: 92 },
  { program: 'Professional', rate: 71 },
  { program: 'Management', rate: 88 },
];

export const Development = () => {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleView = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setShowViewModal(true);
  };

  const handleEdit = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const handleDelete = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Employee Development
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          Manage training programs and employee development initiatives
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Programs</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">38</div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 15% from last quarter</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Participants</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">156</div>
              <div className="text-sm text-[#00A4EF] mt-2">Across 8 programs</div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completion Rate</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">84%</div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 8% improvement</div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Satisfaction</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.6/5</div>
              <div className="text-sm text-[#7FBA00] mt-2">Highly rated</div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Progress Trend Chart */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Training Progress Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#7FBA00" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="inProgress" stroke="#00A4EF" strokeWidth={2} name="In Progress" />
              <Line type="monotone" dataKey="upcoming" stroke="#FFB900" strokeWidth={2} name="Upcoming" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution Chart */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Programs by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${((entry.value / categoryData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completion Rate by Program Type */}
      <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Completion Rate by Program Type
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={completionRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="program" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="rate" fill="#00A4EF" name="Completion Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Training Programs Table */}
      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Training Programs</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <GraduationCap className="w-4 h-4 mr-2" />
            Add Training Program
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Program ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Title
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Instructor
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Duration
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Enrollment
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Progress
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trainingData.map((program) => (
                <tr
                  key={program.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                    {program.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{program.title}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {program.category}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {program.instructor}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {program.duration}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {program.enrolled}/{program.capacity}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-[#00A4EF] h-2 rounded-full"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                      <span className="text-xs">{program.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(program)}
                        className="bg-[#0078D4] hover:bg-[#106EBE] text-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(program)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(program)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Training Program Details
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Program ID
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedProgram.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                  <p className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(selectedProgram.status)}`}>
                      {selectedProgram.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Program Title
                </label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedProgram.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedProgram.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Instructor
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedProgram.instructor}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Duration
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedProgram.duration}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Enrollment
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedProgram.enrolled} / {selectedProgram.capacity} participants
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Start Date
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProgram.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    End Date
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProgram.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Progress
                </label>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-[#00A4EF] h-3 rounded-full transition-all"
                        style={{ width: `${selectedProgram.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedProgram.progress}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed Participants
                </label>
                <p className="text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {selectedProgram.completed} / {selectedProgram.enrolled} participants
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Training Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Training Program
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter program title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Leadership</option>
                    <option>Technical</option>
                    <option>Soft Skills</option>
                    <option>Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructor
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Instructor name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 8 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Max participants"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowAddModal(false)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Add Program
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Training Program Modal */}
      {showEditModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Training Program
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program Title
                </label>
                <input
                  type="text"
                  defaultValue={selectedProgram.title}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    defaultValue={selectedProgram.category}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option>Leadership</option>
                    <option>Technical</option>
                    <option>Soft Skills</option>
                    <option>Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructor
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProgram.instructor}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProgram.duration}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedProgram.capacity}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedProgram.startDate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedProgram.endDate}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  defaultValue={selectedProgram.status}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowEditModal(false)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Training Program Modal */}
      {showDeleteModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Delete Training Program
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the training program{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  "{selectedProgram.title}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  This will affect {selectedProgram.enrolled} enrolled participants
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(false)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Program
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Development;
