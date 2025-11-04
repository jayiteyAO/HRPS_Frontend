import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { useToast } from '@/components/ToastContainer';
import { 
  UserIcon, 
  BriefcaseIcon, 
  UsersIcon,
  TrendingUpIcon,
  PlusIcon,
  EditIcon,
  DeleteIcon,
  EmailIcon,
  PhoneIcon,
  SaveIcon,
  XIcon
} from '@/components/Icons';


interface OrgNode {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  directReports: number;
  manager?: string;
  level: number;
}

export const OrgChart = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [selectedView, setSelectedView] = useState<'hierarchy' | 'list'>('hierarchy');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([1, 2, 3]));

  // Build org structure from employee data
  const orgStructure: OrgNode[] = [
    { id: 1, name: 'Sarah Johnson', position: 'CEO', department: 'Executive', email: 'sarah.johnson@company.com', phone: '+233 XX XXX XXXX', directReports: 3, level: 0 },
    { id: 2, name: 'John Smith', position: 'CTO', department: 'Engineering', email: 'john.smith@company.com', phone: '+233 XX XXX XXXX', directReports: 2, manager: 'Sarah Johnson', level: 1 },
    { id: 3, name: 'Emily Wilson', position: 'CFO', department: 'Finance', email: 'emily.wilson@company.com', phone: '+233 XX XXX XXXX', directReports: 1, manager: 'Sarah Johnson', level: 1 },
    { id: 4, name: 'Michael Brown', position: 'Head of Sales', department: 'Sales', email: 'michael.brown@company.com', phone: '+233 XX XXX XXXX', directReports: 1, manager: 'Sarah Johnson', level: 1 },
    { id: 5, name: 'Kwame Mensah', position: 'Senior Developer', department: 'Engineering', email: 'kwame.mensah@company.com', phone: '+233 24 123 4567', directReports: 0, manager: 'John Smith', level: 2 },
    { id: 6, name: 'Akua Sarpong', position: 'Frontend Developer', department: 'Engineering', email: 'akua.sarpong@company.com', phone: '+233 24 678 9012', directReports: 0, manager: 'John Smith', level: 2 },
    { id: 7, name: 'Yaw Boateng', position: 'Accountant', department: 'Finance', email: 'yaw.boateng@company.com', phone: '+233 24 567 8901', directReports: 0, manager: 'Emily Wilson', level: 2 },
    { id: 8, name: 'Kofi Asante', position: 'Sales Executive', department: 'Sales', email: 'kofi.asante@company.com', phone: '+233 24 345 6789', directReports: 0, manager: 'Michael Brown', level: 2 },
  ];

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    manager: '',
  });

  const handleAdd = () => {
    setFormData({ name: '', position: '', department: '', email: '', phone: '', manager: '' });
    setShowAddModal(true);
  };

  const handleEdit = (node: OrgNode) => {
    setSelectedNode(node);
    setFormData({
      name: node.name,
      position: node.position,
      department: node.department,
      email: node.email,
      phone: node.phone,
      manager: node.manager || '',
    });
    setShowEditModal(true);
  };

  const handleDelete = (node: OrgNode) => {
    setSelectedNode(node);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedNode) {
      addToast(`${selectedNode.name} removed from org chart`, 'success');
      setShowDeleteModal(false);
      setSelectedNode(null);
    }
  };

  const handleSave = () => {
    addToast('Organization chart updated successfully!', 'success');
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const toggleNode = (id: number) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  // Calculate metrics
  const totalEmployees = orgStructure.length;
  const totalManagers = orgStructure.filter(n => n.directReports > 0).length;
  const departments = new Set(orgStructure.map(n => n.department)).size;
  const avgDirectReports = (orgStructure.reduce((sum, n) => sum + n.directReports, 0) / totalManagers).toFixed(1);

  const renderOrgNode = (node: OrgNode, children: OrgNode[]) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = children.length > 0;

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Card */}
        <div className={`relative bg-white dark:bg-gray-800 rounded-sm shadow-md border-2 ${
          node.level === 0 ? 'border-[#00A4EF]' : 
          node.level === 1 ? 'border-[#7FBA00]' : 
          'border-gray-300 dark:border-gray-600'
        } p-4 w-64 hover:shadow-lg transition-shadow`}>
          {/* Level indicator */}
          <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
            node.level === 0 ? 'bg-[#00A4EF]' : 
            node.level === 1 ? 'bg-[#7FBA00]' : 
            'bg-[#FFB900]'
          }`}>
            L{node.level}
          </div>

          {/* Avatar */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center text-white font-bold">
              {node.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{node.name}</h3>
              <p className="text-xs text-[#00A4EF] font-medium truncate">{node.position}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{node.department}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <EmailIcon size={12} />
              <span className="truncate">{node.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <PhoneIcon size={12} />
              <span>{node.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <UsersIcon size={14} />
              <span>{node.directReports} reports</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleEdit(node)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-[#00A4EF]"
                title="Edit"
              >
                <EditIcon size={14} />
              </button>
              <button
                onClick={() => handleDelete(node)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-[#F25022]"
                title="Delete"
              >
                <DeleteIcon size={14} />
              </button>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.id)}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-600 dark:text-gray-400 text-xs font-bold">
                {isExpanded ? '−' : '+'}
              </span>
            </button>
          )}
        </div>

        {/* Connector Line */}
        {hasChildren && isExpanded && (
          <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
        )}

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="flex gap-8 relative">
            {/* Horizontal connector */}
            {children.length > 1 && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600" 
                   style={{ width: `calc(100% - ${64 * 2}px)`, left: '50%', transform: 'translateX(-50%)' }}
              ></div>
            )}
            {children.map((child) => {
              const grandChildren = orgStructure.filter(n => n.manager === child.name);
              return (
                <div key={child.id} className="relative pt-8">
                  {/* Vertical connector to child */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>
                  {renderOrgNode(child, grandChildren)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent mb-2">
            Organization Chart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Visualize company structure and reporting relationships
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Employees</h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees}</span>
                <p className="text-xs text-[#7FBA00] mt-2">↑ 8% growth this year</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center">
                <UsersIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Departments</h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{departments}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Across organization</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#7FBA00] to-[#5A9000] flex items-center justify-center">
                <BriefcaseIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Managers</h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalManagers}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">With direct reports</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#FFB900] to-[#D39600] flex items-center justify-center">
                <UserIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Avg. Reports</h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{avgDirectReports}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Per manager</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#F25022] to-[#D13A13] flex items-center justify-center">
                <TrendingUpIcon size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-4 border border-gray-200/50 dark:border-gray-700/50 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={selectedView === 'hierarchy' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('hierarchy')}
              >
                Hierarchy View
              </Button>
              <Button
                variant={selectedView === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('list')}
              >
                List View
              </Button>
            </div>
            <Button variant="primary" size="sm" onClick={handleAdd} className="flex items-center">
              <PlusIcon size={16} className="mr-1" />
              <span>Add Position</span>
            </Button>
          </div>
        </div>

        {/* Hierarchy View */}
        {selectedView === 'hierarchy' && (
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-8 border border-gray-200/50 dark:border-gray-700/50 overflow-x-auto">
            <div className="min-w-max flex justify-center">
              {(() => {
                const ceo = orgStructure.find(n => n.level === 0);
                if (!ceo) return null;
                const directReports = orgStructure.filter(n => n.manager === ceo.name);
                return renderOrgNode(ceo, directReports);
              })()}
            </div>
          </div>
        )}

        {/* List View */}
        {selectedView === 'list' && (
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reports To</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Direct Reports</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {orgStructure.map((node) => (
                    <tr key={node.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center text-white font-bold text-sm">
                            {node.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{node.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{node.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{node.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{node.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{node.manager || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{node.directReports}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm ${
                          node.level === 0 ? 'bg-[#00A4EF]/20 text-[#00A4EF]' :
                          node.level === 1 ? 'bg-[#7FBA00]/20 text-[#7FBA00]' :
                          'bg-[#FFB900]/20 text-[#FFB900]'
                        }`}>
                          Level {node.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(node)}
                            className="text-[#00A4EF] hover:text-[#0078D4] transition-colors"
                            title="Edit"
                          >
                            <EditIcon size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(node)}
                            className="text-[#F25022] hover:text-[#D13A13] transition-colors"
                            title="Delete"
                          >
                            <DeleteIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Position</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      <option value="Executive">Executive</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reports To
                    </label>
                    <select
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="">Select Manager</option>
                      {orgStructure.filter(n => n.directReports > 0).map(n => (
                        <option key={n.id} value={n.name}>{n.name} - {n.position}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="john.doe@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <Button variant="secondary" size="lg" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="lg" onClick={handleSave} className="flex items-center">
                  <SaveIcon size={20} className="mr-2" />
                  <span>Add Position</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedNode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Position</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reports To
                    </label>
                    <select
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="">Select Manager</option>
                      {orgStructure.filter(n => n.id !== selectedNode.id && n.directReports > 0).map(n => (
                        <option key={n.id} value={n.name}>{n.name} - {n.position}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <Button variant="secondary" size="lg" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="lg" onClick={handleSave} className="flex items-center">
                  <SaveIcon size={20} className="mr-2" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedNode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Remove Position</h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Are you sure you want to remove <span className="font-semibold text-gray-900 dark:text-white">{selectedNode.name}</span> from the organization chart?
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-sm p-4">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Warning:</strong> This action will remove the position and may affect reporting relationships.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <Button variant="secondary" size="lg" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" size="lg" onClick={confirmDelete} className="flex items-center text-white">
                  <DeleteIcon size={20} className="mr-2" />
                  <span>Remove Position</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgChart;
