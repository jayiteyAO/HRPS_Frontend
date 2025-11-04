
import { useState } from 'react';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  TrendingUp,
  Users,
  Award,
  Target,
  Download,
  Filter,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  FileText,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PerformanceReview {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  reviewPeriod: string;
  reviewDate: string;
  overallScore: number;
  status: 'completed' | 'pending' | 'in-progress' | 'overdue';
  reviewer: string;
  goals: {
    achieved: number;
    total: number;
  };
  competencies: {
    technical: number;
    leadership: number;
    communication: number;
    problemSolving: number;
    teamwork: number;
  };
}

const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: 'PR-2024-001',
    employeeName: 'John Mensah',
    employeeId: 'EMP-001',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    reviewPeriod: 'Q1 2024',
    reviewDate: '2024-03-31',
    overallScore: 4.5,
    status: 'completed',
    reviewer: 'Sarah Johnson',
    goals: { achieved: 8, total: 10 },
    competencies: {
      technical: 4.8,
      leadership: 4.2,
      communication: 4.5,
      problemSolving: 4.6,
      teamwork: 4.3
    }
  },
  {
    id: 'PR-2024-002',
    employeeName: 'Ama Owusu',
    employeeId: 'EMP-002',
    department: 'Sales',
    position: 'Sales Manager',
    reviewPeriod: 'Q1 2024',
    reviewDate: '2024-03-28',
    overallScore: 4.7,
    status: 'completed',
    reviewer: 'Michael Brown',
    goals: { achieved: 9, total: 10 },
    competencies: {
      technical: 4.5,
      leadership: 4.9,
      communication: 4.8,
      problemSolving: 4.6,
      teamwork: 4.7
    }
  },
  {
    id: 'PR-2024-003',
    employeeName: 'Kwame Asante',
    employeeId: 'EMP-003',
    department: 'Marketing',
    position: 'Marketing Specialist',
    reviewPeriod: 'Q1 2024',
    reviewDate: '2024-03-25',
    overallScore: 4.2,
    status: 'completed',
    reviewer: 'Lisa Wang',
    goals: { achieved: 7, total: 10 },
    competencies: {
      technical: 4.3,
      leadership: 3.9,
      communication: 4.5,
      problemSolving: 4.1,
      teamwork: 4.4
    }
  },
  {
    id: 'PR-2024-004',
    employeeName: 'Akosua Boateng',
    employeeId: 'EMP-004',
    department: 'HR',
    position: 'HR Business Partner',
    reviewPeriod: 'Q1 2024',
    reviewDate: '',
    overallScore: 0,
    status: 'in-progress',
    reviewer: 'David Chen',
    goals: { achieved: 0, total: 10 },
    competencies: {
      technical: 0,
      leadership: 0,
      communication: 0,
      problemSolving: 0,
      teamwork: 0
    }
  },
  {
    id: 'PR-2024-005',
    employeeName: 'Kofi Agyeman',
    employeeId: 'EMP-005',
    department: 'Finance',
    position: 'Financial Analyst',
    reviewPeriod: 'Q1 2024',
    reviewDate: '',
    overallScore: 0,
    status: 'overdue',
    reviewer: 'Emily Davis',
    goals: { achieved: 0, total: 10 },
    competencies: {
      technical: 0,
      leadership: 0,
      communication: 0,
      problemSolving: 0,
      teamwork: 0
    }
  },
];

const performanceDistribution = [
  { name: 'Excellent (4.5-5.0)', value: 2, color: '#7FBA00' },
  { name: 'Good (4.0-4.4)', value: 1, color: '#00A4EF' },
  { name: 'Satisfactory (3.5-3.9)', value: 0, color: '#FFB900' },
  { name: 'Needs Improvement (<3.5)', value: 0, color: '#E81123' },
];

const departmentPerformanceData = [
  { department: 'Engineering', avgScore: 4.5, reviews: 15, topPerformers: 5 },
  { department: 'Sales', avgScore: 4.7, reviews: 12, topPerformers: 6 },
  { department: 'Marketing', avgScore: 4.2, reviews: 10, topPerformers: 3 },
  { department: 'HR', avgScore: 4.3, reviews: 8, topPerformers: 2 },
  { department: 'Finance', avgScore: 4.4, reviews: 9, topPerformers: 3 },
];

const quarterlyTrendData = [
  { quarter: 'Q1 2023', avgScore: 4.1, reviewsCompleted: 42 },
  { quarter: 'Q2 2023', avgScore: 4.2, reviewsCompleted: 45 },
  { quarter: 'Q3 2023', avgScore: 4.3, reviewsCompleted: 48 },
  { quarter: 'Q4 2023', avgScore: 4.4, reviewsCompleted: 50 },
  { quarter: 'Q1 2024', avgScore: 4.5, reviewsCompleted: 54 },
];

const competencyAverages = [
  { competency: 'Technical', score: 4.5 },
  { competency: 'Leadership', score: 4.3 },
  { competency: 'Communication', score: 4.6 },
  { competency: 'Problem Solving', score: 4.4 },
  { competency: 'Teamwork', score: 4.5 },
];

export const PerformanceReports = () => {
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNewReviewModal, setShowNewReviewModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const handleViewDetails = (review: PerformanceReview) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  const completedReviews = mockPerformanceReviews.filter(r => r.status === 'completed');
  const avgPerformanceScore = completedReviews.length > 0 
    ? (completedReviews.reduce((sum, r) => sum + r.overallScore, 0) / completedReviews.length).toFixed(1)
    : '0.0';
  const totalGoalsAchieved = completedReviews.reduce((sum, r) => sum + r.goals.achieved, 0);
  const totalGoals = completedReviews.reduce((sum, r) => sum + r.goals.total, 0);
  const goalAchievementRate = totalGoals > 0 ? ((totalGoalsAchieved / totalGoals) * 100).toFixed(0) : '0';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
              Performance Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Comprehensive employee performance analytics and reviews
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-white">Filter</span>
            </Button>
            <Button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#00A4EF] text-white rounded-none hover:bg-[#0078D4]"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Reviews</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPerformanceReviews.length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 8% from last quarter</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-none">
              <FileText className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Performance Score</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {avgPerformanceScore} / 5.0
              </div>
              <div className="text-sm text-[#00A4EF] mt-2">
                {completedReviews.length} completed reviews
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-none">
              <Star className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Goal Achievement Rate</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {goalAchievementRate}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {totalGoalsAchieved} of {totalGoals} goals achieved
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-none">
              <Target className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Reviews</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPerformanceReviews.filter(r => r.status !== 'completed').length}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                {mockPerformanceReviews.filter(r => r.status === 'overdue').length} overdue
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-none">
              <AlertCircle className="w-6 h-6 text-[#FF8C00]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quarterly Trend Chart */}
        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
              Quarterly Performance Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quarterlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="quarter" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0px' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="avgScore" stroke="#00A4EF" strokeWidth={2} name="Avg Score" />
              <Line yAxisId="right" type="monotone" dataKey="reviewsCompleted" stroke="#7FBA00" strokeWidth={2} name="Reviews Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution Chart */}
        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-[#00A4EF]" />
              Performance Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }: any) => value > 0 ? `${name}: ${value}` : ''}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance Chart */}
        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
              Department Performance
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 5]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0px' }}
              />
              <Legend />
              <Bar dataKey="avgScore" fill="#00A4EF" name="Avg Score" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Competency Averages Radar Chart */}
        <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00A4EF]" />
              Competency Averages
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={competencyAverages}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="competency" stroke="#9CA3AF" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#9CA3AF" />
              <Radar name="Score" dataKey="score" stroke="#00A4EF" fill="#00A4EF" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Reviews Table */}
      <div className="p-6 rounded-none shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Reviews</h2>
          <Button 
            variant="primary" 
            onClick={() => setShowNewReviewModal(true)}
            className="flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            New Review
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Review Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Overall Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockPerformanceReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.employeeName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{review.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">{review.department}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">{review.reviewPeriod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.overallScore > 0 ? (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.overallScore.toFixed(1)} / 5.0
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not scored</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.goals.total > 0 ? (
                      <div className="text-sm text-gray-900 dark:text-white">
                        {review.goals.achieved} / {review.goals.total}
                        <span className="text-xs text-gray-500 ml-1">
                          ({((review.goals.achieved / review.goals.total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-medium ${getStatusColor(review.status)}`}>
                      {getStatusIcon(review.status)}
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetails(review)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-none text-blue-600 dark:text-blue-400"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Review Details
            </DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              {/* Employee Info */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-none">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Employee</div>
                  <div className="text-base font-medium text-gray-900 dark:text-white">{selectedReview.employeeName}</div>
                  <div className="text-xs text-gray-500">{selectedReview.employeeId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Position</div>
                  <div className="text-base font-medium text-gray-900 dark:text-white">{selectedReview.position}</div>
                  <div className="text-xs text-gray-500">{selectedReview.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Review Period</div>
                  <div className="text-base font-medium text-gray-900 dark:text-white">{selectedReview.reviewPeriod}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Reviewer</div>
                  <div className="text-base font-medium text-gray-900 dark:text-white">{selectedReview.reviewer}</div>
                </div>
              </div>

              {/* Overall Score */}
              {selectedReview.overallScore > 0 && (
                <div className="p-6 bg-gradient-to-r from-[#00A4EF]/10 to-[#0078D4]/10 rounded-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Performance Score</div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {selectedReview.overallScore.toFixed(1)} <span className="text-2xl text-gray-500">/ 5.0</span>
                      </div>
                    </div>
                    <Award className="w-16 h-16 text-[#00A4EF]" />
                  </div>
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-none h-3">
                    <div 
                      className="bg-gradient-to-r from-[#00A4EF] to-[#0078D4] h-3 rounded-none transition-all"
                      style={{ width: `${(selectedReview.overallScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Goals Progress */}
              {selectedReview.goals.total > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#00A4EF]" />
                    Goals Achievement
                  </h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-none">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedReview.goals.achieved} of {selectedReview.goals.total} goals achieved
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-none h-2">
                      <div 
                        className="bg-[#7FBA00] h-2 rounded-none transition-all"
                        style={{ width: `${(selectedReview.goals.achieved / selectedReview.goals.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-lg font-bold text-[#7FBA00]">
                        {((selectedReview.goals.achieved / selectedReview.goals.total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Competencies */}
              {selectedReview.overallScore > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Competency Scores</h4>
                  <div className="space-y-4">
                    {Object.entries(selectedReview.competencies).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {value.toFixed(1)} / 5.0
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-none h-2">
                          <div 
                            className="bg-[#00A4EF] h-2 rounded-none transition-all"
                            style={{ width: `${(value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Review Status</div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-none text-sm font-medium ${getStatusColor(selectedReview.status)} mt-2`}>
                      {getStatusIcon(selectedReview.status)}
                      {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  {selectedReview.reviewDate && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Review Date</div>
                      <div className="text-base font-medium text-gray-900 dark:text-white">
                        {new Date(selectedReview.reviewDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Review Modal */}
      <Dialog open={showNewReviewModal} onOpenChange={setShowNewReviewModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create New Performance Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employee
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                  <option value="">Select Employee</option>
                  <option value="emp1">John Mensah - Engineering</option>
                  <option value="emp2">Ama Owusu - Sales</option>
                  <option value="emp3">Kwame Asante - Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Review Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                  <option value="">Select Period</option>
                  <option value="q1-2024">Q1 2024</option>
                  <option value="q2-2024">Q2 2024</option>
                  <option value="q3-2024">Q3 2024</option>
                  <option value="q4-2024">Q4 2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reviewer
              </label>
              <input
                type="text"
                placeholder="Enter reviewer name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Competency Scores (1-5)</h4>
              <div className="space-y-3">
                {['Technical Skills', 'Leadership', 'Communication', 'Problem Solving', 'Teamwork'].map((competency) => (
                  <div key={competency} className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm text-gray-700 dark:text-gray-300">{competency}</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      placeholder="0.0"
                      className="col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments
              </label>
              <textarea
                rows={4}
                placeholder="Add review comments and feedback..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowNewReviewModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowNewReviewModal(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Filter Performance Reviews</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Period
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Periods</option>
                <option value="q1-2024">Q1 2024</option>
                <option value="q4-2023">Q4 2023</option>
                <option value="q3-2023">Q3 2023</option>
                <option value="q2-2023">Q2 2023</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Performance Score
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Scores</option>
                <option value="excellent">Excellent (4.5-5.0)</option>
                <option value="good">Good (4.0-4.4)</option>
                <option value="satisfactory">Satisfactory (3.5-3.9)</option>
                <option value="needs-improvement">Needs Improvement (&lt;3.5)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
              Reset
            </Button>
            <Button variant="primary" onClick={() => setShowFilterModal(false)}>
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Export Performance Reports</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-none">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Export Information</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    You are about to export {mockPerformanceReviews.length} performance reviews with all associated data.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Format
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="pdf"
                    checked={exportFormat === 'pdf'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-red-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">PDF Document</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Comprehensive report with all charts</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="excel"
                    checked={exportFormat === 'excel'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Excel Spreadsheet</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">All data in structured format</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">CSV File</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Raw data for external analysis</div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded-none text-[#00A4EF] focus:ring-[#00A4EF]"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include competency breakdowns</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded-none text-[#00A4EF] focus:ring-[#00A4EF]"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include goal tracking data</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowExportModal(false)}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceReports;
