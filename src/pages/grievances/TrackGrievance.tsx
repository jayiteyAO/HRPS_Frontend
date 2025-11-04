import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchIcon, EyeIcon, EditIcon, CheckIcon, CloseIcon, FileTextIcon, UserIcon, CalendarIcon, ClockIcon, XCircleIcon } from '@/components/Icons';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface Grievance {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Closed';
  submittedDate: string;
  lastUpdate: string;
  assignedTo: string;
  submittedBy: string;
  description: string;
}

export const TrackGrievance = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [grievances] = useState<Grievance[]>([
    { id: 'GRV-001', title: 'Workplace Harassment Complaint', category: 'HR', priority: 'High', status: 'In Progress', submittedDate: '2025-10-15', lastUpdate: '2025-11-02', assignedTo: 'Sarah Johnson', submittedBy: 'John Doe', description: 'Reported harassment incidents in the workplace requiring immediate attention.' },
    { id: 'GRV-002', title: 'Salary Discrepancy Issue', category: 'Payroll', priority: 'High', status: 'Under Review', submittedDate: '2025-10-20', lastUpdate: '2025-10-28', assignedTo: 'Mike Williams', submittedBy: 'Jane Smith', description: 'Salary calculation errors identified in recent payroll.' },
    { id: 'GRV-003', title: 'Overtime Payment Delay', category: 'Payroll', priority: 'Medium', status: 'Resolved', submittedDate: '2025-09-10', lastUpdate: '2025-10-01', assignedTo: 'David Lee', submittedBy: 'Robert Brown', description: 'Overtime hours not properly compensated in last month salary.' },
    { id: 'GRV-004', title: 'Equipment Malfunction', category: 'IT', priority: 'Low', status: 'Closed', submittedDate: '2025-08-15', lastUpdate: '2025-08-25', assignedTo: 'John Smith', submittedBy: 'Emily Davis', description: 'Desktop computer experiencing frequent crashes and performance issues.' },
    { id: 'GRV-005', title: 'Unfair Work Distribution', category: 'Management', priority: 'Medium', status: 'Submitted', submittedDate: '2025-11-01', lastUpdate: '2025-11-01', assignedTo: 'Sarah Johnson', submittedBy: 'Michael Wilson', description: 'Unequal task distribution among team members.' },
    { id: 'GRV-006', title: 'Leave Approval Delay', category: 'HR', priority: 'Low', status: 'Under Review', submittedDate: '2025-10-25', lastUpdate: '2025-10-30', assignedTo: 'Mike Williams', submittedBy: 'Sarah Parker', description: 'Leave request pending approval for over 2 weeks.' },
  ]);

  const filteredGrievances = grievances.filter(g =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Closed': return 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300';
      case 'In Progress': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Under Review': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Submitted': return 'bg-[#F25022]/20 text-[#F25022]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-[#F25022]/20 text-[#F25022]';
      case 'Medium': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Low': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: grievances.length,
    inProgress: grievances.filter(g => g.status === 'In Progress').length,
    underReview: grievances.filter(g => g.status === 'Under Review').length,
    resolved: grievances.filter(g => g.status === 'Resolved').length
  };

  // Chart data
  const categoryData = [
    { name: 'HR', count: grievances.filter(g => g.category === 'HR').length },
    { name: 'Payroll', count: grievances.filter(g => g.category === 'Payroll').length },
    { name: 'IT', count: grievances.filter(g => g.category === 'IT').length },
    { name: 'Management', count: grievances.filter(g => g.category === 'Management').length },
  ];

  const statusData = [
    { name: 'Submitted', value: grievances.filter(g => g.status === 'Submitted').length },
    { name: 'Under Review', value: grievances.filter(g => g.status === 'Under Review').length },
    { name: 'In Progress', value: grievances.filter(g => g.status === 'In Progress').length },
    { name: 'Resolved', value: grievances.filter(g => g.status === 'Resolved').length },
    { name: 'Closed', value: grievances.filter(g => g.status === 'Closed').length },
  ];

  const trendData = [
    { month: 'Aug', count: 1 },
    { month: 'Sep', count: 1 },
    { month: 'Oct', count: 3 },
    { month: 'Nov', count: 1 },
  ];

  const COLORS = ['#F25022', '#FFB900', '#00A4EF', '#7FBA00', '#737373'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Grievances
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track and manage all employee grievances</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Grievances</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <FileTextIcon size={24} className="text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.inProgress}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/10 flex items-center justify-center">
              <ClockIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Under Review</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.underReview}</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/10 flex items-center justify-center">
              <XCircleIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resolved</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.resolved}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/10 flex items-center justify-center">
              <CheckIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grievances by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', border: 'none' }} />
              <Bar dataKey="count" fill="#00A4EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={60} fill="#8884d8" dataKey="value">
                {statusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', border: 'none' }} />
              <Line type="monotone" dataKey="count" stroke="#00A4EF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by ID, title, category, or submitted by..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">ID</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Title</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Submitted By</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Priority</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Last Update</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {filteredGrievances.map((grievance) => (
              <tr key={grievance.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{grievance.id}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{grievance.title}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{grievance.submittedBy}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{grievance.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getPriorityColor(grievance.priority)}`}>
                    {grievance.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(grievance.status)}`}>
                    {grievance.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{grievance.lastUpdate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedGrievance(grievance); setShowDetailsModal(true); }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00A4EF] text-white hover:bg-[#0078D4] transition-colors text-sm"
                    >
                      <EyeIcon size={16} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => { setSelectedGrievance(grievance); setShowEditModal(true); }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFB900] text-white hover:bg-[#ff9500] transition-colors text-sm"
                    >
                      <EditIcon size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredGrievances.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No grievances found</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedGrievance && (
        <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title={`Grievance ${selectedGrievance.id}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Title</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedGrievance.title}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedGrievance.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Priority</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium ${getPriorityColor(selectedGrievance.priority)}`}>
                  {selectedGrievance.priority}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(selectedGrievance.status)}`}>
                  {selectedGrievance.status}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Submitted By</div>
                <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <UserIcon size={16} />
                  {selectedGrievance.submittedBy}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned To</div>
                <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <UserIcon size={16} />
                  {selectedGrievance.assignedTo}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Submitted Date</div>
                <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <CalendarIcon size={16} />
                  {selectedGrievance.submittedDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Update</div>
                <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <CalendarIcon size={16} />
                  {selectedGrievance.lastUpdate}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedGrievance.description}</div>
              </div>
            </div>

            <div className={`p-4 border-l-4 border-[#00A4EF] ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Submitted</span>
                  <span className="text-gray-900 dark:text-white">{selectedGrievance.submittedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                  <span className="text-gray-900 dark:text-white">{selectedGrievance.lastUpdate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
              <Button variant="success" onClick={() => { setShowDetailsModal(false); setShowResolveModal(true); }}>
                <CheckIcon size={16} className="inline mr-1" />
                Resolve
              </Button>
              <Button variant="danger" onClick={() => { setShowDetailsModal(false); setShowRejectModal(true); }}>
                <CloseIcon size={16} className="inline mr-1" />
                Reject
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {selectedGrievance && (
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Grievance ${selectedGrievance.id}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                <option>{selectedGrievance.status}</option>
                <option>Submitted</option>
                <option>Under Review</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                <option>{selectedGrievance.priority}</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned To</label>
              <input type="text" defaultValue={selectedGrievance.assignedTo} className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea rows={3} className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Add notes or comments..."></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowEditModal(false)}>
                <CheckIcon size={16} className="inline mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Resolve Modal */}
      {selectedGrievance && (
        <Modal isOpen={showResolveModal} onClose={() => setShowResolveModal(false)} title="Resolve Grievance">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Are you sure you want to mark this grievance as resolved?</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resolution Notes</label>
              <textarea rows={4} className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Provide resolution details..."></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowResolveModal(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={() => setShowResolveModal(false)}>
                <CheckIcon size={16} className="inline mr-1" />
                Confirm Resolution
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {selectedGrievance && (
        <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject Grievance">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Are you sure you want to reject this grievance?</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Rejection</label>
              <textarea rows={4} className={`w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Provide reason for rejection..." required></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setShowRejectModal(false)}>
                <CloseIcon size={16} className="inline mr-1" />
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TrackGrievance;
