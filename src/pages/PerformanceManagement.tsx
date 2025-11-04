import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { PerformanceIcon, StarIcon, CheckCircleIcon, ClockIcon, TargetIcon, EyeIcon, EditIcon, TrashIcon, PlusIcon } from '@/components/Icons';
import { performanceReviews } from '@/data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceManagement: React.FC = () => {
  const avgRating = performanceReviews.reduce((sum, r) => sum + r.overallRating, 0) / performanceReviews.length;
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  
  const performanceTrendData = [
    { month: 'Jan', rating: 4.1 },
    { month: 'Feb', rating: 4.2 },
    { month: 'Mar', rating: 4.3 },
    { month: 'Apr', rating: 4.4 },
    { month: 'May', rating: 4.5 },
    { month: 'Jun', rating: 4.6 },
  ];
  
  const departmentPerformanceData = [
    { department: 'Engineering', avgRating: 4.5 },
    { department: 'Sales', avgRating: 4.3 },
    { department: 'Marketing', avgRating: 4.6 },
    { department: 'HR', avgRating: 4.4 },
    { department: 'Finance', avgRating: 4.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <PerformanceIcon size={32} className="text-[#7FBA00]" />
            Performance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and evaluate employee performance
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <div className="flex items-center gap-2">
            <PlusIcon size={20} />
            <span>New Review</span>
          </div>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{avgRating.toFixed(1)}/5.0</p>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-sm">
              <StarIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {performanceReviews.filter(r => r.status === 'Completed').length}
              </p>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-sm">
              <CheckCircleIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4</p>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-sm">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Performers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {performanceReviews.filter(r => r.overallRating >= 4.5).length}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-sm">
              <TargetIcon size={24} className="text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Performance Trend" subtitle="Average rating over time" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="month" className="text-gray-700 dark:text-gray-300" />
              <YAxis domain={[0, 5]} className="text-gray-700 dark:text-gray-300" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(31, 41, 55)', 
                  border: '1px solid rgb(55, 65, 81)',
                  borderRadius: '0.125rem',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#7FBA00" strokeWidth={2} name="Average Rating" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Department Performance" subtitle="Average ratings by department" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="department" className="text-gray-700 dark:text-gray-300" />
              <YAxis domain={[0, 5]} className="text-gray-700 dark:text-gray-300" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(31, 41, 55)', 
                  border: '1px solid rgb(55, 65, 81)',
                  borderRadius: '0.125rem',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="avgRating" fill="#00A4EF" name="Avg Rating" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Performance Reviews Table */}
      <Card>
        <CardHeader
          title="Performance Reviews"
          subtitle={`${performanceReviews.length} reviews completed`}
        />
        <Table
          data={performanceReviews}
          columns={[
            {
              key: 'id',
              header: 'Review ID',
              render: (row) => (
                <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{row.id}</span>
              ),
            },
            {
              key: 'employeeName',
              header: 'Employee',
              render: (row) => (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{row.employeeName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{row.employeeId}</p>
                </div>
              ),
            },
            {
              key: 'reviewPeriod',
              header: 'Period',
            },
            {
              key: 'reviewerName',
              header: 'Reviewer',
            },
            {
              key: 'overallRating',
              header: 'Overall Rating',
              render: (row) => (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-[#7FBA00]">{row.overallRating}</span>
                    <span className="text-gray-400 ml-1">/5.0</span>
                  </div>
                  <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= row.overallRating ? 'text-[#FFB900]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge variant={row.status === 'Completed' ? 'success' : 'warning'}>{row.status}</Badge>
              ),
            },
            {
              key: 'reviewDate',
              header: 'Date',
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) => (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      setSelectedReview(row);
                      setIsViewModalOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <EyeIcon size={16} />
                      <span>View</span>
                    </div>
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      setSelectedReview(row);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <EditIcon size={16} />
                      <span>Edit</span>
                    </div>
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => {
                      setSelectedReview(row);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <TrashIcon size={16} />
                      <span>Delete</span>
                    </div>
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Rating Distribution" subtitle="Performance breakdown by category" />
          <div className="space-y-4">
            {performanceReviews[0] && (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Technical Skills</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">4.5/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2.5">
                    <div className="bg-[#00A4EF] h-2.5 rounded" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Communication</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">4.3/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2.5">
                    <div className="bg-[#7FBA00] h-2.5 rounded" style={{ width: '86%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Teamwork</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2.5">
                    <div className="bg-[#FFB900] h-2.5 rounded" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Leadership</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">3.9/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2.5">
                    <div className="bg-[#F25022] h-2.5 rounded" style={{ width: '78%' }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Top Performers" subtitle="Highest rated employees" />
          <div className="space-y-3">
            {performanceReviews
              .sort((a, b) => b.overallRating - a.overallRating)
              .slice(0, 5)
              .map((review, index) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-[#FFB900]' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-[#F25022]' : 
                      'bg-[#00A4EF]'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{review.employeeName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.reviewPeriod}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#7FBA00]">{review.overallRating}</p>
                    <p className="text-xs text-gray-500">rating</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Add Review Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New Performance Review"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Employee
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Select Employee</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Review Period
            </label>
            <input
              type="text"
              placeholder="e.g., Q1 2024"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Overall Rating
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="0.0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comments
            </label>
            <textarea
              rows={4}
              placeholder="Enter review comments..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              <span>Cancel</span>
            </Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>
              <span>Create Review</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Review Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Review Details"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedReview.employeeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedReview.employeeId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Period</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedReview.reviewPeriod}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewer</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedReview.reviewerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Rating</p>
                <p className="text-2xl font-bold text-[#7FBA00]">{selectedReview.overallRating}/5.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                <Badge variant={selectedReview.status === 'Completed' ? 'success' : 'warning'}>{selectedReview.status}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Comments</p>
              <p className="text-gray-900 dark:text-white">Excellent performance throughout the review period. Consistently exceeded expectations.</p>
            </div>
            <div className="flex justify-end pt-4">
              <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
                <span>Close</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Review Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Performance Review"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Employee
              </label>
              <input
                type="text"
                defaultValue={selectedReview.employeeName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Review Period
              </label>
              <input
                type="text"
                defaultValue={selectedReview.reviewPeriod}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Overall Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                defaultValue={selectedReview.overallRating}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select 
                defaultValue={selectedReview.status}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="primary" onClick={() => setIsEditModalOpen(false)}>
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Review Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Performance Review"
      >
        {selectedReview && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete the performance review for <strong>{selectedReview.employeeName}</strong> ({selectedReview.reviewPeriod})?
            </p>
            <p className="text-sm text-red-600 dark:text-red-400">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="danger" onClick={() => setIsDeleteModalOpen(false)}>
                <span>Delete</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PerformanceManagement;
