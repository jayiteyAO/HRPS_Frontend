import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, TargetIcon, EditIcon, TrashIcon, CheckCircleIcon, ClockIcon, TrendingUpIcon, FileTextIcon } from '@/components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Goal {
  id: number;
  title: string;
  description: string;
  category: 'Individual' | 'Team' | 'Department' | 'Company';
  priority: 'High' | 'Medium' | 'Low';
  startDate: string;
  dueDate: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
}

type TabType = 'Individual' | 'Team' | 'Department' | 'Company';

export const Goals = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('Individual');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingGoalId, setDeletingGoalId] = useState<number | null>(null);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Individual' as 'Individual' | 'Team' | 'Department' | 'Company',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    startDate: '',
    dueDate: '',
    progress: 0
  });

  const [goals, setGoals] = useState<Goal[]>([
    // Individual Goals
    { id: 1, title: 'Complete Project Alpha', description: 'Deliver all features for Project Alpha by Q1 end', category: 'Individual', priority: 'High', startDate: '2025-01-01', dueDate: '2025-03-31', progress: 75, status: 'In Progress' },
    { id: 2, title: 'Complete Certification', description: 'Obtain AWS Solutions Architect certification', category: 'Individual', priority: 'Medium', startDate: '2025-01-10', dueDate: '2025-04-30', progress: 30, status: 'In Progress' },
    { id: 3, title: 'Improve Code Quality', description: 'Reduce technical debt by 50% in personal projects', category: 'Individual', priority: 'High', startDate: '2025-02-01', dueDate: '2025-05-31', progress: 45, status: 'In Progress' },
    { id: 4, title: 'Master TypeScript', description: 'Complete advanced TypeScript course and certification', category: 'Individual', priority: 'Medium', startDate: '2025-01-15', dueDate: '2025-06-30', progress: 60, status: 'In Progress' },
    
    // Team Goals
    { id: 5, title: 'Improve Team Collaboration', description: 'Implement weekly sync meetings and collaboration tools', category: 'Team', priority: 'Medium', startDate: '2025-01-15', dueDate: '2025-06-30', progress: 40, status: 'In Progress' },
    { id: 6, title: 'Increase Sprint Velocity', description: 'Achieve 20% increase in sprint velocity', category: 'Team', priority: 'High', startDate: '2025-02-01', dueDate: '2025-04-30', progress: 55, status: 'In Progress' },
    { id: 7, title: 'Reduce Bug Count', description: 'Decrease production bugs by 40% this quarter', category: 'Team', priority: 'High', startDate: '2025-01-01', dueDate: '2025-03-31', progress: 70, status: 'In Progress' },
    { id: 8, title: 'Team Training Program', description: 'Complete React and Node.js training for all team members', category: 'Team', priority: 'Medium', startDate: '2025-02-15', dueDate: '2025-07-31', progress: 25, status: 'In Progress' },
    
    // Department Goals
    { id: 9, title: 'Reduce Customer Response Time', description: 'Achieve < 2 hour response time for all customer queries', category: 'Department', priority: 'High', startDate: '2025-02-01', dueDate: '2025-05-31', progress: 60, status: 'In Progress' },
    { id: 10, title: 'Launch New Product Line', description: 'Successfully launch 3 new products in Q2', category: 'Department', priority: 'High', startDate: '2025-01-01', dueDate: '2025-06-30', progress: 50, status: 'In Progress' },
    { id: 11, title: 'Improve Department Efficiency', description: 'Reduce operational costs by 15% while maintaining quality', category: 'Department', priority: 'Medium', startDate: '2025-01-15', dueDate: '2025-12-31', progress: 35, status: 'In Progress' },
    { id: 12, title: 'Customer Satisfaction Score', description: 'Achieve 90% customer satisfaction rating', category: 'Department', priority: 'High', startDate: '2025-02-01', dueDate: '2025-11-30', progress: 80, status: 'In Progress' },
    
    // Company Goals
    { id: 13, title: 'Revenue Growth Target', description: 'Achieve 25% revenue growth this fiscal year', category: 'Company', priority: 'High', startDate: '2025-01-01', dueDate: '2025-12-31', progress: 100, status: 'Completed' },
    { id: 14, title: 'Market Expansion', description: 'Enter 5 new international markets', category: 'Company', priority: 'High', startDate: '2025-01-01', dueDate: '2025-12-31', progress: 45, status: 'In Progress' },
    { id: 15, title: 'Employee Retention', description: 'Improve employee retention rate to 95%', category: 'Company', priority: 'Medium', startDate: '2025-01-01', dueDate: '2025-12-31', progress: 65, status: 'In Progress' },
    { id: 16, title: 'Digital Transformation', description: 'Complete digital transformation of core business processes', category: 'Company', priority: 'High', startDate: '2025-02-01', dueDate: '2025-12-31', progress: 40, status: 'In Progress' },
  ]);

  const handleAdd = () => {
    setEditingGoal(null);
    setFormData({ title: '', description: '', category: 'Individual', priority: 'Medium', startDate: '', dueDate: '', progress: 0 });
    setShowModal(true);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      priority: goal.priority,
      startDate: goal.startDate,
      dueDate: goal.dueDate,
      progress: goal.progress
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setDeletingGoalId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingGoalId) {
      setGoals(goals.filter(g => g.id !== deletingGoalId));
      addToast('Goal deleted successfully', 'success');
      setShowDeleteModal(false);
      setDeletingGoalId(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startDate || !formData.dueDate) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? {
        ...g,
        ...formData,
        status: formData.progress === 100 ? 'Completed' : formData.progress > 0 ? 'In Progress' : 'Not Started'
      } : g));
      addToast('Goal updated successfully', 'success');
    } else {
      const newGoal: Goal = {
        id: goals.length + 1,
        ...formData,
        status: formData.progress === 100 ? 'Completed' : formData.progress > 0 ? 'In Progress' : 'Not Started'
      };
      setGoals([...goals, newGoal]);
      addToast('Goal created successfully', 'success');
    }
    setShowModal(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-[#F25022]/20 text-[#F25022]';
      case 'Medium': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Low': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'In Progress': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Not Started': return 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300';
      case 'On Hold': return 'bg-[#FFB900]/20 text-[#FFB900]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: goals.length,
    inProgress: goals.filter(g => g.status === 'In Progress').length,
    completed: goals.filter(g => g.status === 'Completed').length,
    averageProgress: Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
  };

  // Get goals for active tab
  const filteredGoals = goals.filter(g => g.category === activeTab);

  // Chart data - Category breakdown
  const categoryData = [
    { name: 'Individual', value: goals.filter(g => g.category === 'Individual').length, color: '#00A4EF' },
    { name: 'Team', value: goals.filter(g => g.category === 'Team').length, color: '#7FBA00' },
    { name: 'Department', value: goals.filter(g => g.category === 'Department').length, color: '#FFB900' },
    { name: 'Company', value: goals.filter(g => g.category === 'Company').length, color: '#F25022' },
  ].filter(d => d.value > 0);

  // Priority data for active tab
  const priorityData = [
    { name: 'High', count: filteredGoals.filter(g => g.priority === 'High').length, color: '#F25022' },
    { name: 'Medium', count: filteredGoals.filter(g => g.priority === 'Medium').length, color: '#FFB900' },
    { name: 'Low', count: filteredGoals.filter(g => g.priority === 'Low').length, color: '#7FBA00' },
  ].filter(d => d.count > 0);

  const tabs: TabType[] = ['Individual', 'Team', 'Department', 'Company'];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Set and track your performance goals</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>Add Goal</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Goals</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
              <FileTextIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.inProgress}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.completed}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/20 flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Progress</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.averageProgress}%</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/20 flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals by Priority ({activeTab})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
              />
              <Bar dataKey="count" fill="#00A4EF">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabbed Goals Card */}
      <div className={`border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-[#00A4EF] border-b-2 border-[#00A4EF]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab} ({goals.filter(g => g.category === tab).length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-[#00A4EF]/20 flex items-center justify-center flex-shrink-0">
                      <TargetIcon className="w-5 h-5 text-[#00A4EF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{goal.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{goal.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority} Priority
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <span>Start: {goal.startDate}</span>
                        <span>Due: {goal.dueDate}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">{goal.progress}%</span>
                        </div>
                        <div className={`w-full h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} overflow-hidden`}>
                          <div
                            className="h-full bg-[#00A4EF] transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleEdit(goal)}
                      className="flex items-center gap-2"
                    >
                      <EditIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(goal.id)}
                      className="flex items-center gap-2 text-white"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingGoal ? 'Edit Goal' : 'Add New Goal'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="Individual">Individual</option>
                <option value="Team">Team</option>
                <option value="Department">Department</option>
                <option value="Company">Company</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority *</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date *</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit}>
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Goal">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this goal? This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button variant="danger" onClick={confirmDelete} className="flex items-center gap-2 text-white">
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </Button>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="flex items-center gap-2">
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Goals;
