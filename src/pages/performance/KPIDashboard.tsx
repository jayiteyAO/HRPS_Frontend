
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Target, TrendingUp, AlertCircle, CheckCircle, Eye, Edit2, Trash2, Plus, Download, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  {
    id: 1,
    name: 'Sales Revenue',
    category: 'Sales',
    target: 1000000,
    current: 850000,
    unit: 'GH₵',
    status: 'On Track',
    owner: 'John Doe',
    dueDate: '2025-12-31',
    frequency: 'Monthly'
  },
  {
    id: 2,
    name: 'Customer Satisfaction',
    category: 'Customer Service',
    target: 95,
    current: 92,
    unit: '%',
    status: 'At Risk',
    owner: 'Jane Smith',
    dueDate: '2025-12-31',
    frequency: 'Quarterly'
  },
  {
    id: 3,
    name: 'Employee Retention',
    category: 'HR',
    target: 90,
    current: 94,
    unit: '%',
    status: 'Achieved',
    owner: 'Mike Johnson',
    dueDate: '2025-12-31',
    frequency: 'Annually'
  },
  {
    id: 4,
    name: 'Product Quality',
    category: 'Operations',
    target: 98,
    current: 89,
    unit: '%',
    status: 'Behind',
    owner: 'Sarah Williams',
    dueDate: '2025-12-31',
    frequency: 'Monthly'
  },
  {
    id: 5,
    name: 'Market Share',
    category: 'Strategy',
    target: 25,
    current: 26,
    unit: '%',
    status: 'Achieved',
    owner: 'David Brown',
    dueDate: '2025-12-31',
    frequency: 'Quarterly'
  }
];

const trendData = [
  { month: 'Jan', sales: 720000, satisfaction: 88, retention: 91 },
  { month: 'Feb', sales: 750000, satisfaction: 90, retention: 92 },
  { month: 'Mar', sales: 780000, satisfaction: 89, retention: 93 },
  { month: 'Apr', sales: 800000, satisfaction: 91, retention: 93 },
  { month: 'May', sales: 830000, satisfaction: 92, retention: 94 },
  { month: 'Jun', sales: 850000, satisfaction: 92, retention: 94 }
];

const categoryPerformance = [
  { name: 'Sales', value: 85, color: '#00A4EF' },
  { name: 'Customer Service', value: 92, color: '#7FBA00' },
  { name: 'HR', value: 94, color: '#FFB900' },
  { name: 'Operations', value: 89, color: '#E74856' },
  { name: 'Strategy', value: 96, color: '#8764B8' }
];

export const KPIDashboard = () => {
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);

  const handleView = (kpi: any) => {
    setSelectedKPI(kpi);
    setViewOpen(true);
  };

  const handleEdit = (kpi: any) => {
    setSelectedKPI(kpi);
    setEditOpen(true);
  };

  const handleDelete = (kpi: any) => {
    setSelectedKPI(kpi);
    setDeleteOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Achieved':
        return 'text-[#7FBA00] bg-[#7FBA00]/10';
      case 'On Track':
        return 'text-[#00A4EF] bg-[#00A4EF]/10';
      case 'At Risk':
        return 'text-[#FFB900] bg-[#FFB900]/10';
      case 'Behind':
        return 'text-[#E74856] bg-[#E74856]/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const totalKPIs = kpiData.length;
  const achievedKPIs = kpiData.filter(k => k.status === 'Achieved').length;
  const onTrackKPIs = kpiData.filter(k => k.status === 'On Track').length;
  const atRiskKPIs = kpiData.filter(k => k.status === 'At Risk' || k.status === 'Behind').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          KPI Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track and manage key performance indicators</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total KPIs</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalKPIs}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Active indicators</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <Target className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Achieved</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{achievedKPIs}</div>
              <div className="text-sm text-[#7FBA00] mt-2">Target met</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">On Track</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{onTrackKPIs}</div>
              <div className="text-sm text-[#00A4EF] mt-2">Progressing well</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">At Risk</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{atRiskKPIs}</div>
              <div className="text-sm text-[#E74856] mt-2">Needs attention</div>
            </div>
            <div className="p-3 bg-[#E74856]/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-[#E74856]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">KPI Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#00A4EF" name="Sales (GH₵)" />
              <Line type="monotone" dataKey="satisfaction" stroke="#7FBA00" name="Satisfaction (%)" />
              <Line type="monotone" dataKey="retention" stroke="#FFB900" name="Retention (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Table */}
      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KPI List</h2>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setExportOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              <span>Export Report</span>
            </Button>
            <Button variant="primary" onClick={() => setAddOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              <span>Add KPI</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">KPI Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Progress</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Current/Target</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Owner</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Frequency</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kpiData.map((kpi) => {
                const progress = getProgress(kpi.current, kpi.target);
                return (
                  <tr key={kpi.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{kpi.name}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{kpi.category}</td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            progress >= 100 ? 'bg-[#7FBA00]' : progress >= 80 ? 'bg-[#00A4EF]' : progress >= 60 ? 'bg-[#FFB900]' : 'bg-[#E74856]'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{progress}%</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()} {kpi.unit}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                        {kpi.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{kpi.owner}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{kpi.frequency}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" onClick={() => handleView(kpi)}>
                          <Eye className="w-4 h-4 mr-1" />
                          <span>View</span>
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(kpi)}>
                          <Edit2 className="w-4 h-4 mr-1" />
                          <span>Edit</span>
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(kpi)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>KPI Details</DialogTitle>
          </DialogHeader>
          {selectedKPI && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">KPI Name</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedKPI.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedKPI.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target</label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedKPI.target.toLocaleString()} {selectedKPI.unit}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Value</label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedKPI.current.toLocaleString()} {selectedKPI.unit}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</label>
                  <p className="text-gray-900 dark:text-white mt-1">{getProgress(selectedKPI.current, selectedKPI.target)}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedKPI.status)}`}>
                      {selectedKPI.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Owner</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedKPI.owner}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedKPI.frequency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedKPI.dueDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setViewOpen(false)}>
              <span>Close</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New KPI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">KPI Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Sales</option>
                  <option>Customer Service</option>
                  <option>HR</option>
                  <option>Operations</option>
                  <option>Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Value</label>
                <input type="number" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>GH₵</option>
                  <option>%</option>
                  <option>Number</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Owner</label>
                <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annually</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>
              <span>Cancel</span>
            </Button>
            <Button variant="primary" onClick={() => setAddOpen(false)}>
              <Plus className="w-4 h-4 mr-2" />
              <span>Add KPI</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit KPI</DialogTitle>
          </DialogHeader>
          {selectedKPI && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">KPI Name</label>
                  <input type="text" defaultValue={selectedKPI.name} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select defaultValue={selectedKPI.category} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Sales</option>
                    <option>Customer Service</option>
                    <option>HR</option>
                    <option>Operations</option>
                    <option>Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Value</label>
                  <input type="number" defaultValue={selectedKPI.target} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Value</label>
                  <input type="number" defaultValue={selectedKPI.current} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Owner</label>
                  <input type="text" defaultValue={selectedKPI.owner} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
                  <select defaultValue={selectedKPI.frequency} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annually</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              <span>Cancel</span>
            </Button>
            <Button variant="primary" onClick={() => setEditOpen(false)}>
              <Edit2 className="w-4 h-4 mr-2" />
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete KPI</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete "{selectedKPI?.name}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              <span>Cancel</span>
            </Button>
            <Button variant="danger" onClick={() => setDeleteOpen(false)}>
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export KPI Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Format</label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="date" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setExportOpen(false)}>
              <span>Cancel</span>
            </Button>
            <Button variant="success" onClick={() => setExportOpen(false)}>
              <Download className="w-4 h-4 mr-2" />
              <span>Export</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KPIDashboard;
