import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, AlertTriangle, CheckCircle, TrendingUp, Filter, Download, Plus, Edit2, Trash2, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface EscalationRule {
  id: string;
  module: string;
  action: string;
  level1Time: number;
  level2Time: number;
  level3Time: number;
  status: 'active' | 'inactive';
}

interface EscalationCase {
  id: string;
  module: string;
  action: string;
  requestedBy: string;
  currentLevel: number;
  timeElapsed: number;
  nextEscalation: number;
  status: 'pending' | 'escalated' | 'resolved' | 'overdue';
}

const EscalationTime: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<EscalationRule | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<EscalationCase | null>(null);
  const [showChartsModal, setShowChartsModal] = useState(false);

  const escalationRules: EscalationRule[] = [
    { id: '1', module: 'Leave Management', action: 'Leave Approval', level1Time: 24, level2Time: 48, level3Time: 72, status: 'active' },
    { id: '2', module: 'Payroll', action: 'Overtime Approval', level1Time: 12, level2Time: 24, level3Time: 48, status: 'active' },
    { id: '3', module: 'Grievance', action: 'Complaint Resolution', level1Time: 48, level2Time: 96, level3Time: 168, status: 'active' },
    { id: '4', module: 'Performance', action: 'Review Completion', level1Time: 72, level2Time: 120, level3Time: 168, status: 'active' },
  ];

  const escalationCases: EscalationCase[] = [
    { id: '1', module: 'Leave Management', action: 'Annual Leave - John Doe', requestedBy: 'John Doe', currentLevel: 1, timeElapsed: 20, nextEscalation: 4, status: 'pending' },
    { id: '2', module: 'Grievance', action: 'Workplace Harassment', requestedBy: 'Jane Smith', currentLevel: 2, timeElapsed: 55, nextEscalation: 41, status: 'escalated' },
    { id: '3', module: 'Payroll', action: 'Overtime - Sarah Williams', requestedBy: 'Sarah Williams', currentLevel: 1, timeElapsed: 15, nextEscalation: -3, status: 'overdue' },
    { id: '4', module: 'Performance', action: 'Q4 Review - Mike Johnson', requestedBy: 'Mike Johnson', currentLevel: 3, timeElapsed: 180, nextEscalation: -12, status: 'overdue' },
  ];

  const trendData = [
    { month: 'Jan', pending: 12, escalated: 8, resolved: 35, overdue: 5 },
    { month: 'Feb', pending: 15, escalated: 10, resolved: 40, overdue: 3 },
    { month: 'Mar', pending: 10, escalated: 6, resolved: 45, overdue: 4 },
    { month: 'Apr', pending: 18, escalated: 12, resolved: 38, overdue: 7 },
    { month: 'May', pending: 14, escalated: 9, resolved: 42, overdue: 6 },
    { month: 'Jun', pending: 11, escalated: 7, resolved: 48, overdue: 2 },
  ];

  const moduleDistribution = [
    { name: 'Leave Management', value: 35, color: '#00A4EF' },
    { name: 'Payroll', value: 25, color: '#FFB900' },
    { name: 'Grievance', value: 20, color: '#7FBA00' },
    { name: 'Performance', value: 20, color: '#F25022' },
  ];

  const avgResolutionTime = [
    { module: 'Leave', level1: 18, level2: 42, level3: 65 },
    { module: 'Payroll', level1: 10, level2: 22, level3: 45 },
    { module: 'Grievance', level1: 40, level2: 85, level3: 150 },
    { module: 'Performance', level1: 60, level2: 110, level3: 160 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#00A4EF';
      case 'escalated': return '#FFB900';
      case 'resolved': return '#7FBA00';
      case 'overdue': return '#F25022';
      default: return '#737373';
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Escalation Time Management
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monitor and configure automatic escalation rules
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setShowFilterModal(true)}
              className={`flex items-center gap-2 px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#2d2d2d]' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setShowRuleModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white font-medium transition-colors"
              style={{ backgroundColor: '#00A4EF' }}
            >
              <Plus size={16} />
              Add Escalation Rule
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Cases</p>
                <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>24</p>
                <p className="text-xs text-[#7FBA00] mt-1">↑ 12% from last month</p>
              </div>
              <div className="p-3" style={{ backgroundColor: 'rgba(0, 164, 239, 0.15)' }}>
                <Clock size={24} color="#00A4EF" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overdue Cases</p>
                <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>7</p>
                <p className="text-xs text-[#F25022] mt-1">↑ 3 from last week</p>
              </div>
              <div className="p-3" style={{ backgroundColor: 'rgba(242, 80, 34, 0.15)' }}>
                <AlertTriangle size={24} color="#F25022" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Resolved (MTD)</p>
                <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>156</p>
                <p className="text-xs text-[#7FBA00] mt-1">↑ 8% resolution rate</p>
              </div>
              <div className="p-3" style={{ backgroundColor: 'rgba(127, 186, 0, 0.15)' }}>
                <CheckCircle size={24} color="#7FBA00" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Resolution</p>
                <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>36h</p>
                <p className="text-xs text-[#7FBA00] mt-1">↓ 4h improvement</p>
              </div>
              <div className="p-3" style={{ backgroundColor: 'rgba(255, 185, 0, 0.15)' }}>
                <TrendingUp size={24} color="#FFB900" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Escalation Trends</h3>
              <button
                onClick={() => setShowChartsModal(true)}
                className={`p-2 ${isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-200'}`}
              >
                <BarChart3 size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#e0e0e0'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#888' : '#666'} />
                <YAxis stroke={isDarkMode ? '#888' : '#666'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                    border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                    color: isDarkMode ? '#fff' : '#000'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="pending" stroke="#00A4EF" strokeWidth={2} />
                <Line type="monotone" dataKey="escalated" stroke="#FFB900" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#7FBA00" strokeWidth={2} />
                <Line type="monotone" dataKey="overdue" stroke="#F25022" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cases by Module</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={moduleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moduleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                    border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Escalation Cases */}
        <div className={`mb-6 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Active Escalation Cases
            </h2>
            <button
              className={`flex items-center gap-2 px-3 py-1.5 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`}
            >
              <Download size={16} />
              <span className="text-sm">Export</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Module</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Requested By</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time Elapsed (hrs)</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Next Escalation (hrs)</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {escalationCases.map((caseItem) => (
                  <tr
                    key={caseItem.id}
                    className={`cursor-pointer ${isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-50'}`}
                    onClick={() => { setSelectedCase(caseItem); setShowDetailsModal(true); }}
                  >
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caseItem.module}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caseItem.action}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caseItem.requestedBy}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Level {caseItem.currentLevel}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caseItem.timeElapsed}</td>
                    <td className={`px-4 py-3 text-sm font-medium`} style={{ color: caseItem.nextEscalation < 0 ? '#F25022' : '#7FBA00' }}>
                      {caseItem.nextEscalation > 0 ? caseItem.nextEscalation : `Overdue by ${Math.abs(caseItem.nextEscalation)}`}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-block px-3 py-1 text-xs font-semibold" style={{ 
                        backgroundColor: getStatusColor(caseItem.status),
                        color: '#ffffff'
                      }}>
                        {caseItem.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Escalation Rules */}
        <div className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Escalation Rules Configuration
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Module</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 1 (hrs)</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 2 (hrs)</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 3 (hrs)</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {escalationRules.map((rule) => (
                  <tr key={rule.id} className={isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{rule.module}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{rule.action}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{rule.level1Time}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{rule.level2Time}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{rule.level3Time}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold ${rule.status === 'active' ? 'bg-[#7FBA00]' : 'bg-[#737373]'} text-white`}>
                        {rule.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedRule(rule); setShowRuleModal(true); }}
                        className="text-[#00A4EF] hover:text-[#0078D4] mr-3"
                      >
                        <Edit2 size={16} className="inline" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#F25022] hover:text-[#D13F00]"
                      >
                        <Trash2 size={16} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => { setShowRuleModal(false); setSelectedRule(null); }}>
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]/95' : 'bg-white/95'} backdrop-blur-sm p-6 w-full max-w-2xl`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedRule ? 'Edit Escalation Rule' : 'Add Escalation Rule'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Module</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>Leave Management</option>
                  <option>Payroll</option>
                  <option>Grievance</option>
                  <option>Performance</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</label>
                <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 1 (hours)</label>
                  <input type="number" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 2 (hours)</label>
                  <input type="number" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level 3 (hours)</label>
                  <input type="number" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowRuleModal(false); setSelectedRule(null); }}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowRuleModal(false); setSelectedRule(null); }}
                className="px-4 py-2 text-white"
                style={{ backgroundColor: '#00A4EF' }}
              >
                {selectedRule ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowFilterModal(false)}>
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]/95' : 'bg-white/95'} backdrop-blur-sm p-6 w-full max-w-md`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filter Cases</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Module</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>All Modules</option>
                  <option>Leave Management</option>
                  <option>Payroll</option>
                  <option>Grievance</option>
                  <option>Performance</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Escalated</option>
                  <option>Resolved</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Escalation Level</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>All Levels</option>
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Level 3</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className={`px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                  <input type="date" className={`px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowFilterModal(false)}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 text-white"
                style={{ backgroundColor: '#00A4EF' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {showDetailsModal && selectedCase && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => { setShowDetailsModal(false); setSelectedCase(null); }}>
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]/95' : 'bg-white/95'} backdrop-blur-sm p-6 w-full max-w-3xl`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Case Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Module</p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.module}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Action</p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.action}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Requested By</p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.requestedBy}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Level</p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Level {selectedCase.currentLevel}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Elapsed</p>
                  <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCase.timeElapsed} hours</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-white mt-1" style={{ backgroundColor: getStatusColor(selectedCase.status) }}>
                    {selectedCase.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-gray-50'} mt-4`}>
                <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Escalation Timeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#7FBA00]"></div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Initiated - 2 days ago</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#FFB900]"></div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Escalated to Level {selectedCase.currentLevel} - 1 day ago</p>
                  </div>
                  {selectedCase.status === 'overdue' && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#F25022]"></div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Overdue - {Math.abs(selectedCase.nextEscalation)} hours past deadline</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowDetailsModal(false); setSelectedCase(null); }}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-white"
                style={{ backgroundColor: '#00A4EF' }}
              >
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Charts Modal */}
      {showChartsModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowChartsModal(false)}>
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]/95' : 'bg-white/95'} backdrop-blur-sm p-6 w-full max-w-4xl`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Average Resolution Time by Level</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={avgResolutionTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#e0e0e0'} />
                <XAxis dataKey="module" stroke={isDarkMode ? '#888' : '#666'} />
                <YAxis stroke={isDarkMode ? '#888' : '#666'} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                    border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                  }}
                />
                <Legend />
                <Bar dataKey="level1" fill="#00A4EF" name="Level 1" />
                <Bar dataKey="level2" fill="#FFB900" name="Level 2" />
                <Bar dataKey="level3" fill="#F25022" name="Level 3" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowChartsModal(false)}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscalationTime;
