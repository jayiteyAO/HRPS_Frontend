
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  UserIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
  StarIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  XIcon
} from '@/components/Icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface Review {
  id: number;
  employee: string;
  reviewer: string;
  period: string;
  score: number;
  status: 'Completed' | 'Pending' | 'Overdue';
  date: string;
  department: string;
  position: string;
  goals: string[];
  achievements: string[];
  areasOfImprovement: string[];
  comments: string;
}

export const PerformanceReviews: React.FC = () => {
  const { theme } = useTheme();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const reviews: Review[] = [
    { 
      id: 1, 
      employee: 'John Doe', 
      reviewer: 'Jane Smith', 
      period: 'Q1 2025', 
      score: 4.5, 
      status: 'Completed', 
      date: '2025-03-15',
      department: 'Engineering',
      position: 'Senior Developer',
      goals: ['Complete project X', 'Mentor junior developers', 'Improve code quality'],
      achievements: ['Delivered 3 major features', 'Reduced bug count by 40%'],
      areasOfImprovement: ['Time management', 'Documentation'],
      comments: 'Excellent performance this quarter.'
    },
    { 
      id: 2, 
      employee: 'Mike Johnson', 
      reviewer: 'Jane Smith', 
      period: 'Q1 2025', 
      score: 4.2, 
      status: 'Completed', 
      date: '2025-03-14',
      department: 'Marketing',
      position: 'Marketing Manager',
      goals: ['Increase brand awareness', 'Launch new campaign'],
      achievements: ['Campaign reach increased by 50%'],
      areasOfImprovement: ['Budget management'],
      comments: 'Strong performance with room for growth.'
    },
    { 
      id: 3, 
      employee: 'Sarah Williams', 
      reviewer: 'Tom Brown', 
      period: 'Q1 2025', 
      score: 0, 
      status: 'Pending', 
      date: '2025-03-20',
      department: 'Sales',
      position: 'Sales Executive',
      goals: ['Meet sales targets', 'Build client relationships'],
      achievements: [],
      areasOfImprovement: [],
      comments: ''
    },
    { 
      id: 4, 
      employee: 'David Lee', 
      reviewer: 'Tom Brown', 
      period: 'Q1 2025', 
      score: 4.8, 
      status: 'Completed', 
      date: '2025-03-12',
      department: 'Product',
      position: 'Product Manager',
      goals: ['Launch new product', 'Improve user satisfaction'],
      achievements: ['Product launched on time', 'User satisfaction up 25%'],
      areasOfImprovement: ['Stakeholder communication'],
      comments: 'Outstanding performance.'
    },
    { 
      id: 5, 
      employee: 'Emily Chen', 
      reviewer: 'Jane Smith', 
      period: 'Q1 2025', 
      score: 0, 
      status: 'Overdue', 
      date: '2025-02-28',
      department: 'Design',
      position: 'UI/UX Designer',
      goals: ['Redesign dashboard', 'Improve user experience'],
      achievements: [],
      areasOfImprovement: [],
      comments: ''
    },
  ];

  const performanceTrendData = [
    { month: 'Sep', avgScore: 4.1 },
    { month: 'Oct', avgScore: 4.2 },
    { month: 'Nov', avgScore: 4.0 },
    { month: 'Dec', avgScore: 4.3 },
    { month: 'Jan', avgScore: 4.4 },
    { month: 'Feb', avgScore: 4.3 },
  ];

  const departmentPerformanceData = [
    { department: 'Engineering', avgScore: 4.5, reviews: 35 },
    { department: 'Marketing', avgScore: 4.2, reviews: 18 },
    { department: 'Sales', avgScore: 4.0, reviews: 42 },
    { department: 'Product', avgScore: 4.6, reviews: 12 },
    { department: 'Design', avgScore: 4.3, reviews: 15 },
    { department: 'HR', avgScore: 4.4, reviews: 8 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return '#7FBA00';
    if (score >= 3.5) return '#00A4EF';
    if (score >= 2.5) return '#FFB900';
    return '#F25022';
  };

  const summaryCards = [
    { 
      label: 'Completed Reviews', 
      value: 142, 
      color: '#7FBA00',
      icon: CheckCircleIcon,
      bgColor: 'bg-[#7FBA00]'
    },
    { 
      label: 'Pending Reviews', 
      value: 8, 
      color: '#FFB900',
      icon: ClockIcon,
      bgColor: 'bg-[#FFB900]'
    },
    { 
      label: 'Overdue Reviews', 
      value: 2, 
      color: '#F25022',
      icon: ExclamationCircleIcon,
      bgColor: 'bg-[#F25022]'
    },
    { 
      label: 'Avg Score', 
      value: '4.3', 
      color: '#00A4EF',
      icon: StarIcon,
      bgColor: 'bg-[#00A4EF]'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Performance Reviews
        </h1>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="bg-[#00A4EF] hover:bg-[#0078D4] text-white"
        >
          <PlusIcon size={20} />
          <span>New Review</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        {summaryCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
                p-6 shadow-sm border
                ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              `}
              style={{
                animation: `scale-in 0.5s ease-out ${index * 100}ms forwards`
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <div className={`
          ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
          shadow-sm border
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          p-6
        `}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="month" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '0.375rem',
                  color: theme === 'dark' ? '#F3F4F6' : '#111827'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#00A4EF" 
                strokeWidth={2}
                name="Average Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance Chart */}
        <div className={`
          ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
          shadow-sm border
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          p-6
        `}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Department Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="department" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '0.375rem',
                  color: theme === 'dark' ? '#F3F4F6' : '#111827'
                }}
              />
              <Legend />
              <Bar dataKey="avgScore" fill="#00A4EF" name="Average Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews Table */}
      <div className={`
        ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
        shadow-sm border
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        overflow-hidden
      `}>
        <table className="w-full">
          <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Employee
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Reviewer
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Period
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Score
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Date
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map((review, index) => (
              <tr
                key={review.id}
                className={`
                  ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
                `}
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 100}ms forwards`,
                  opacity: 0
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#00A4EF]/20 flex items-center justify-center">
                      <UserIcon size={20} className="text-[#00A4EF]" />
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {review.employee}
                    </span>
                  </div>
                </td>
                <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {review.reviewer}
                </td>
                <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {review.period}
                </td>
                <td className="px-6 py-4">
                  {review.score > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded h-2">
                        <div
                          className="h-2 rounded"
                          style={{
                            width: `${(review.score / 5) * 100}%`,
                            backgroundColor: getScoreColor(review.score)
                          }}
                        />
                      </div>
                      <span
                        className="font-bold text-lg"
                        style={{ color: getScoreColor(review.score) }}
                      >
                        {review.score.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    px-3 py-1 rounded text-xs font-medium
                    ${review.status === 'Completed'
                      ? 'bg-[#7FBA00]/20 text-[#7FBA00]'
                      : review.status === 'Pending'
                      ? 'bg-[#FFB900]/20 text-[#FFB900]'
                      : 'bg-[#F25022]/20 text-[#F25022]'
                    }
                  `}>
                    {review.status}
                  </span>
                </td>
                <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {review.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setSelectedReview(review);
                        setViewDialogOpen(true);
                      }}
                      variant="primary"
                      size="sm"
                      className="bg-[#00A4EF] hover:bg-[#0078D4] text-white"
                    >
                      <EyeIcon size={16} />
                      <span>View</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedReview(review);
                        setEditDialogOpen(true);
                      }}
                      variant="success"
                      size="sm"
                      className="text-white"
                    >
                      <EditIcon size={16} />
                      <span>Edit</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedReview(review);
                        setDeleteDialogOpen(true);
                      }}
                      variant="danger"
                      size="sm"
                      className="text-white"
                    >
                      <TrashIcon size={16} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Modal
        isOpen={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        title="Review Details"
        size="lg"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Employee
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.employee}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Reviewer
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.reviewer}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Period
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.period}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Score
                </label>
                <p className={`mt-1 font-bold text-xl`} style={{ color: getScoreColor(selectedReview.score) }}>
                  {selectedReview.score > 0 ? selectedReview.score.toFixed(1) : 'Pending'}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Department
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.department}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Position
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.position}
                </p>
              </div>
            </div>

            <div>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Goals
              </label>
              <ul className={`mt-1 list-disc list-inside ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedReview.goals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>

            {selectedReview.achievements.length > 0 && (
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Achievements
                </label>
                <ul className={`mt-1 list-disc list-inside ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReview.areasOfImprovement.length > 0 && (
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Areas of Improvement
                </label>
                <ul className={`mt-1 list-disc list-inside ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.areasOfImprovement.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReview.comments && (
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Comments
                </label>
                <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedReview.comments}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => setViewDialogOpen(false)}
                variant="secondary"
              >
                <XIcon size={16} />
                <span>Close</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Dialog */}
      <Modal
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit Review"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Employee
              </label>
              <input
                type="text"
                defaultValue={selectedReview?.employee}
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Reviewer
              </label>
              <input
                type="text"
                defaultValue={selectedReview?.reviewer}
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Period
              </label>
              <input
                type="text"
                defaultValue={selectedReview?.period}
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Score (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={selectedReview?.score}
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Comments
            </label>
            <textarea
              rows={4}
              defaultValue={selectedReview?.comments}
              className={`w-full px-3 py-2 border rounded ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setEditDialogOpen(false)}
              variant="secondary"
            >
              <XIcon size={16} />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="bg-[#00A4EF] hover:bg-[#0078D4] text-white"
            >
              <CheckCircleIcon size={16} />
              <span>Save Changes</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Dialog */}
      <Modal
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Review"
        size="md"
      >
        <div className="space-y-4">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Are you sure you want to delete this performance review for {selectedReview?.employee}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="secondary"
            >
              <XIcon size={16} />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="danger"
              className="text-white"
            >
              <TrashIcon size={16} />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Dialog */}
      <Modal
        isOpen={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        title="Create New Review"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Employee
              </label>
              <input
                type="text"
                placeholder="Select employee"
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Reviewer
              </label>
              <input
                type="text"
                placeholder="Select reviewer"
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Period
              </label>
              <input
                type="text"
                placeholder="e.g., Q1 2025"
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Review Date
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2 border rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Goals
            </label>
            <textarea
              rows={3}
              placeholder="Enter goals (one per line)"
              className={`w-full px-3 py-2 border rounded ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setAddDialogOpen(false)}
              variant="secondary"
            >
              <XIcon size={16} />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="bg-[#00A4EF] hover:bg-[#0078D4] text-white"
            >
              <PlusIcon size={16} />
              <span>Create Review</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
