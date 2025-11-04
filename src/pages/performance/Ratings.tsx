
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Star, TrendingUp, Users, Award, BarChart3, Edit, Trash2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Rating {
  id: string;
  employee: string;
  department: string;
  period: string;
  overallRating: number;
  performanceScore: number;
  behaviorScore: number;
  skillScore: number;
  ratedBy: string;
  status: 'Completed' | 'Pending' | 'Under Review';
}

const mockRatings: Rating[] = [
  {
    id: '1',
    employee: 'John Doe',
    department: 'Engineering',
    period: 'Q4 2024',
    overallRating: 4.5,
    performanceScore: 90,
    behaviorScore: 85,
    skillScore: 88,
    ratedBy: 'Sarah Johnson',
    status: 'Completed',
  },
  {
    id: '2',
    employee: 'Jane Smith',
    department: 'Marketing',
    period: 'Q4 2024',
    overallRating: 4.8,
    performanceScore: 95,
    behaviorScore: 92,
    skillScore: 94,
    ratedBy: 'Michael Chen',
    status: 'Completed',
  },
  {
    id: '3',
    employee: 'Mike Johnson',
    department: 'Sales',
    period: 'Q4 2024',
    overallRating: 4.2,
    performanceScore: 82,
    behaviorScore: 80,
    skillScore: 85,
    ratedBy: 'Emily Davis',
    status: 'Under Review',
  },
  {
    id: '4',
    employee: 'Sarah Williams',
    department: 'HR',
    period: 'Q4 2024',
    overallRating: 4.6,
    performanceScore: 88,
    behaviorScore: 90,
    skillScore: 87,
    ratedBy: 'David Brown',
    status: 'Completed',
  },
  {
    id: '5',
    employee: 'Robert Chen',
    department: 'Finance',
    period: 'Q4 2024',
    overallRating: 0,
    performanceScore: 0,
    behaviorScore: 0,
    skillScore: 0,
    ratedBy: 'Lisa Anderson',
    status: 'Pending',
  },
];

const ratingDistributionData = [
  { rating: '5 Stars', count: 45 },
  { rating: '4 Stars', count: 78 },
  { rating: '3 Stars', count: 32 },
  { rating: '2 Stars', count: 12 },
  { rating: '1 Star', count: 5 },
];

const departmentRatingsData = [
  { department: 'Engineering', avgRating: 4.3 },
  { department: 'Marketing', avgRating: 4.5 },
  { department: 'Sales', avgRating: 4.1 },
  { department: 'HR', avgRating: 4.4 },
  { department: 'Finance', avgRating: 4.2 },
];

const ratingTrendData = [
  { month: 'Jul', avgRating: 4.1 },
  { month: 'Aug', avgRating: 4.2 },
  { month: 'Sep', avgRating: 4.3 },
  { month: 'Oct', avgRating: 4.4 },
  { month: 'Nov', avgRating: 4.5 },
  { month: 'Dec', avgRating: 4.6 },
];

export const Ratings = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  const handleView = (rating: Rating) => {
    setSelectedRating(rating);
    setViewDialogOpen(true);
  };

  const handleEdit = (rating: Rating) => {
    setSelectedRating(rating);
    setEditDialogOpen(true);
  };

  const handleDelete = (rating: Rating) => {
    setSelectedRating(rating);
    setDeleteDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-[#FFB900] text-[#FFB900]'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Performance Ratings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          Manage and track employee performance ratings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Ratings</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">172</div>
              <div className="text-sm text-[#7FBA00] mt-2 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                12% from last quarter
              </div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <Star className="h-6 w-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Rating</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.4</div>
              <div className="text-sm text-[#00A4EF] mt-2">Out of 5.0</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <Award className="h-6 w-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">137</div>
              <div className="text-sm text-[#7FBA00] mt-2">79.7% completion</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <Users className="h-6 w-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">35</div>
              <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rating Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="rating" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                }}
              />
              <Bar dataKey="count" fill="#00A4EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Average Ratings
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentRatingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#6B7280" />
              <YAxis domain={[0, 5]} stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                }}
              />
              <Bar dataKey="avgRating" fill="#7FBA00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Rating Trends (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ratingTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis domain={[0, 5]} stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
              }}
            />
            <Line type="monotone" dataKey="avgRating" stroke="#00A4EF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ratings Table */}
      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Ratings</h2>
          <Button variant="primary" onClick={() => setAddDialogOpen(true)}>
            <Star className="h-4 w-4 mr-2" />
            Add Rating
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Overall Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rated By
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
              {mockRatings.map((rating) => (
                <tr key={rating.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {rating.employee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {rating.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {rating.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {rating.overallRating > 0 ? (
                      <div className="flex items-center gap-2">
                        {renderStars(rating.overallRating)}
                        <span className="text-gray-600 dark:text-gray-400">
                          ({rating.overallRating})
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">Not rated</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {rating.ratedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold ${
                        rating.status === 'Completed'
                          ? 'bg-[#7FBA00]/10 text-[#7FBA00]'
                          : rating.status === 'Under Review'
                          ? 'bg-[#00A4EF]/10 text-[#00A4EF]'
                          : 'bg-[#FFB900]/10 text-[#FFB900]'
                      }`}
                    >
                      {rating.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(rating)}
                        className="bg-[#0078D4] hover:bg-[#106EBE] text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(rating)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(rating)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
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

      {/* Add Rating Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Add New Rating</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Employee
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]">
                <option>Select Employee</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating Period
              </label>
              <input
                type="text"
                placeholder="e.g., Q4 2024"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Performance Score
                </label>
                <input
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Behavior Score
                </label>
                <input
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skill Score
                </label>
                <input
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Overall Rating
                </label>
                <input
                  type="number"
                  placeholder="0-5"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comments
              </label>
              <textarea
                rows={4}
                placeholder="Enter rating comments..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setAddDialogOpen(false)}>
              <Star className="h-4 w-4 mr-2" />
              Add Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Rating Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Rating Details</DialogTitle>
          </DialogHeader>
          {selectedRating && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employee
                  </label>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {selectedRating.employee}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedRating.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating Period
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedRating.period}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rated By
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedRating.ratedBy}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(selectedRating.overallRating)}
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedRating.overallRating}/5.0
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Performance
                  </label>
                  <p className="text-2xl font-bold text-[#00A4EF]">
                    {selectedRating.performanceScore}%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Behavior
                  </label>
                  <p className="text-2xl font-bold text-[#7FBA00]">
                    {selectedRating.behaviorScore}%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Skills
                  </label>
                  <p className="text-2xl font-bold text-[#FFB900]">
                    {selectedRating.skillScore}%
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <span
                  className={`px-3 py-1 text-sm font-semibold ${
                    selectedRating.status === 'Completed'
                      ? 'bg-[#7FBA00]/10 text-[#7FBA00]'
                      : selectedRating.status === 'Under Review'
                      ? 'bg-[#00A4EF]/10 text-[#00A4EF]'
                      : 'bg-[#FFB900]/10 text-[#FFB900]'
                  }`}
                >
                  {selectedRating.status}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Rating Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Edit Rating</DialogTitle>
          </DialogHeader>
          {selectedRating && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Employee
                </label>
                <input
                  type="text"
                  defaultValue={selectedRating.employee}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating Period
                </label>
                <input
                  type="text"
                  defaultValue={selectedRating.period}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Performance Score
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedRating.performanceScore}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Behavior Score
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedRating.behaviorScore}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Skill Score
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedRating.skillScore}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Overall Rating
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedRating.overallRating}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  defaultValue={selectedRating.status}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                >
                  <option>Completed</option>
                  <option>Under Review</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setEditDialogOpen(false)}>
              <Edit className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Rating Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delete Rating</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete the rating for{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedRating?.employee}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setDeleteDialogOpen(false)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ratings;
