
import { useState } from 'react';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Resolution {
  id: string;
  grievanceId: string;
  employeeName: string;
  issue: string;
  resolvedBy: string;
  resolutionDate: string;
  status: 'Resolved' | 'Partially Resolved' | 'Pending';
  resolutionType: string;
  satisfactionScore: number;
}

export const ResolutionCenter = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<Resolution | null>(null);

  const resolutions: Resolution[] = [
    {
      id: 'RES001',
      grievanceId: 'GR-2024-001',
      employeeName: 'John Doe',
      issue: 'Workplace Harassment',
      resolvedBy: 'Sarah Johnson',
      resolutionDate: '2024-01-15',
      status: 'Resolved',
      resolutionType: 'Mediation',
      satisfactionScore: 4.5,
    },
    {
      id: 'RES002',
      grievanceId: 'GR-2024-002',
      employeeName: 'Jane Smith',
      issue: 'Salary Dispute',
      resolvedBy: 'Michael Brown',
      resolutionDate: '2024-01-14',
      status: 'Partially Resolved',
      resolutionType: 'Arbitration',
      satisfactionScore: 3.8,
    },
    {
      id: 'RES003',
      grievanceId: 'GR-2024-003',
      employeeName: 'Robert Wilson',
      issue: 'Working Conditions',
      resolvedBy: 'Sarah Johnson',
      resolutionDate: '2024-01-13',
      status: 'Resolved',
      resolutionType: 'Investigation',
      satisfactionScore: 4.2,
    },
    {
      id: 'RES004',
      grievanceId: 'GR-2024-004',
      employeeName: 'Emily Davis',
      issue: 'Leave Denial',
      resolvedBy: 'Michael Brown',
      resolutionDate: '2024-01-12',
      status: 'Pending',
      resolutionType: 'Review',
      satisfactionScore: 0,
    },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resolved',
        data: [12, 19, 15, 22, 18, 25],
        backgroundColor: '#7FBA00',
      },
      {
        label: 'Partially Resolved',
        data: [5, 8, 6, 9, 7, 10],
        backgroundColor: '#FFB900',
      },
      {
        label: 'Pending',
        data: [3, 5, 4, 6, 5, 7],
        backgroundColor: '#F25022',
      },
    ],
  };

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Satisfaction Score',
        data: [4.2, 4.3, 4.5, 4.4],
        borderColor: '#00A4EF',
        backgroundColor: 'rgba(0, 164, 239, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Partially Resolved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Pending':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handleView = (resolution: Resolution) => {
    setSelectedResolution(resolution);
    setViewDialogOpen(true);
  };

  const handleEdit = (resolution: Resolution) => {
    setSelectedResolution(resolution);
    setEditDialogOpen(true);
  };

  const handleDelete = (resolution: Resolution) => {
    setSelectedResolution(resolution);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Resolution Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          Track and manage grievance resolutions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Resolutions
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                48
              </div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 12% from last month</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <FileText className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Resolved Cases
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                35
              </div>
              <div className="text-sm text-[#7FBA00] mt-2">72.9% success rate</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Pending Review
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                8
              </div>
              <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <Clock className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Avg Satisfaction
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                4.3
              </div>
              <div className="text-sm text-[#7FBA00] mt-2">Out of 5.0</div>
            </div>
            <div className="p-3 bg-[#0078D4]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#0078D4]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Resolution Trends
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Satisfaction Score Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Resolutions Table */}
      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Resolution Records
          </h2>
          <Button variant="primary" onClick={() => setExportDialogOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Grievance ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Resolved By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Resolution Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {resolutions.map((resolution) => (
                <tr key={resolution.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {resolution.grievanceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {resolution.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {resolution.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {resolution.resolvedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {resolution.resolutionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold ${getStatusColor(
                        resolution.status
                      )}`}
                    >
                      {resolution.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {resolution.satisfactionScore > 0
                      ? `${resolution.satisfactionScore}/5.0`
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(resolution)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(resolution)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(resolution)}
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

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              Resolution Details
            </DialogTitle>
          </DialogHeader>
          {selectedResolution && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolution ID
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grievance ID
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.grievanceId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Employee Name
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.employeeName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Issue
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.issue}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolved By
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.resolvedBy}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolution Date
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.resolutionDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolution Type
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.resolutionType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <p className="mt-1">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold ${getStatusColor(
                        selectedResolution.status
                      )}`}
                    >
                      {selectedResolution.status}
                    </span>
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Satisfaction Score
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedResolution.satisfactionScore > 0
                      ? `${selectedResolution.satisfactionScore}/5.0`
                      : 'Not Rated'}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => setViewDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              Edit Resolution
            </DialogTitle>
          </DialogHeader>
          {selectedResolution && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grievance ID
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedResolution.grievanceId}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedResolution.employeeName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Issue
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedResolution.issue}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolved By
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedResolution.resolvedBy}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolution Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedResolution.resolutionDate}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    defaultValue={selectedResolution.status}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  >
                    <option>Resolved</option>
                    <option>Partially Resolved</option>
                    <option>Pending</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resolution Type
                  </label>
                  <select
                    defaultValue={selectedResolution.resolutionType}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  >
                    <option>Mediation</option>
                    <option>Arbitration</option>
                    <option>Investigation</option>
                    <option>Review</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Satisfaction Score
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    defaultValue={selectedResolution.satisfactionScore}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="primary">
                  <Edit className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              Delete Resolution
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this resolution record? This action cannot
              be undone.
            </p>
            {selectedResolution && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Resolution ID:</strong> {selectedResolution.id}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Grievance ID:</strong> {selectedResolution.grievanceId}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Employee:</strong> {selectedResolution.employeeName}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button variant="danger">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Report Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              Export Resolution Report
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Report Format
              </label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  placeholder="From"
                />
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                  placeholder="To"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Include Fields
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mr-2 h-4 w-4 text-[#00A4EF] focus:ring-[#00A4EF] border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Resolution Details
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mr-2 h-4 w-4 text-[#00A4EF] focus:ring-[#00A4EF] border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Satisfaction Scores
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mr-2 h-4 w-4 text-[#00A4EF] focus:ring-[#00A4EF] border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Charts and Analytics
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setExportDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button variant="primary">
              <FileText className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResolutionCenter;
