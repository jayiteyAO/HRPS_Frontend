import { useState } from 'react';
import { Button } from '@/components/Button';
import { XIcon, PlusIcon, TrashIcon, EditIcon, UsersIcon, CheckCircleIcon, ClockIcon, CalendarIcon, FilterIcon, DownloadIcon, EyeIcon, SendIcon, FileTextIcon } from '@/components/Icons';

interface NewHire {
  id: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasksCompleted: number;
  totalTasks: number;
  email?: string;
  manager?: string;
  documentStatus?: 'pending' | 'submitted' | 'verified';
}

const mockNewHires: NewHire[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    position: 'Software Engineer',
    department: 'Engineering',
    startDate: '2025-11-15',
    status: 'in-progress',
    tasksCompleted: 7,
    totalTasks: 12,
    email: 'emma.wilson@company.com',
    manager: 'John Smith',
    documentStatus: 'submitted',
  },
  {
    id: '2',
    name: 'David Lee',
    position: 'Senior Developer',
    department: 'Engineering',
    startDate: '2025-11-18',
    status: 'in-progress',
    tasksCompleted: 5,
    totalTasks: 12,
    email: 'david.lee@company.com',
    manager: 'John Smith',
    documentStatus: 'submitted',
  },
  {
    id: '3',
    name: 'James Brown',
    position: 'Marketing Manager',
    department: 'Marketing',
    startDate: '2025-11-20',
    status: 'not-started',
    tasksCompleted: 0,
    totalTasks: 10,
    email: 'james.brown@company.com',
    manager: 'Sarah Johnson',
    documentStatus: 'pending',
  },
  {
    id: '4',
    name: 'Lisa Martinez',
    position: 'Content Strategist',
    department: 'Marketing',
    startDate: '2025-11-22',
    status: 'in-progress',
    tasksCompleted: 3,
    totalTasks: 10,
    email: 'lisa.m@company.com',
    manager: 'Sarah Johnson',
    documentStatus: 'submitted',
  },
  {
    id: '5',
    name: 'Sarah Chen',
    position: 'UX Designer',
    department: 'Design',
    startDate: '2025-11-10',
    status: 'completed',
    tasksCompleted: 10,
    totalTasks: 10,
    email: 'sarah.chen@company.com',
    manager: 'Michael Davis',
    documentStatus: 'verified',
  },
  {
    id: '6',
    name: 'Alex Kim',
    position: 'UI Designer',
    department: 'Design',
    startDate: '2025-11-12',
    status: 'in-progress',
    tasksCompleted: 8,
    totalTasks: 10,
    email: 'alex.kim@company.com',
    manager: 'Michael Davis',
    documentStatus: 'verified',
  },
  {
    id: '7',
    name: 'Michael Rodriguez',
    position: 'Sales Executive',
    department: 'Sales',
    startDate: '2025-11-25',
    status: 'not-started',
    tasksCompleted: 0,
    totalTasks: 8,
    email: 'michael.r@company.com',
    manager: 'Lisa Anderson',
    documentStatus: 'pending',
  },
  {
    id: '8',
    name: 'Jennifer White',
    position: 'Account Manager',
    department: 'Sales',
    startDate: '2025-11-28',
    status: 'not-started',
    tasksCompleted: 0,
    totalTasks: 8,
    email: 'jennifer.w@company.com',
    manager: 'Lisa Anderson',
    documentStatus: 'pending',
  },
  {
    id: '9',
    name: 'Robert Taylor',
    position: 'HR Specialist',
    department: 'Human Resources',
    startDate: '2025-11-14',
    status: 'in-progress',
    tasksCompleted: 6,
    totalTasks: 10,
    email: 'robert.t@company.com',
    manager: 'Patricia Moore',
    documentStatus: 'submitted',
  },
  {
    id: '10',
    name: 'Amanda Green',
    position: 'Financial Analyst',
    department: 'Finance',
    startDate: '2025-11-16',
    status: 'in-progress',
    tasksCompleted: 4,
    totalTasks: 10,
    email: 'amanda.g@company.com',
    manager: 'Thomas Brown',
    documentStatus: 'submitted',
  },
];

export const Onboarding: React.FC = () => {
  const [newHires, setNewHires] = useState<NewHire[]>(mockNewHires);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHire, setEditingHire] = useState<NewHire | null>(null);
  const [viewDetailsId, setViewDetailsId] = useState<string | null>(null);
  const [assignTaskId, setAssignTaskId] = useState<string | null>(null);
  const [documentsDialogId, setDocumentsDialogId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<Partial<NewHire>>({
    name: '',
    position: '',
    department: '',
    startDate: '',
    status: 'not-started',
    tasksCompleted: 0,
    totalTasks: 10,
    email: '',
    manager: '',
    documentStatus: 'pending',
  });

  const handleOpenDialog = (hire?: NewHire) => {
    if (hire) {
      setEditingHire(hire);
      setFormData(hire);
    } else {
      setEditingHire(null);
      setFormData({
        name: '',
        position: '',
        department: '',
        startDate: '',
        status: 'not-started',
        tasksCompleted: 0,
        totalTasks: 10,
        email: '',
        manager: '',
        documentStatus: 'pending',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingHire(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHire) {
      setNewHires(newHires.map(h => h.id === editingHire.id ? { ...formData, id: editingHire.id } as NewHire : h));
    } else {
      const newHire: NewHire = {
        ...formData,
        id: `hire-${Date.now()}`,
      } as NewHire;
      setNewHires([...newHires, newHire]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this new hire?')) {
      setNewHires(newHires.filter(h => h.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#7FBA00]/10 text-[#7FBA00] border-[#7FBA00]/20';
      case 'in-progress':
        return 'bg-[#00A4EF]/10 text-[#00A4EF] border-[#00A4EF]/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-[#7FBA00]/10 text-[#7FBA00] border-[#7FBA00]/20';
      case 'submitted':
        return 'bg-[#FFB900]/10 text-[#FFB900] border-[#FFB900]/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600';
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  // Get unique departments
  const departments = ['all', ...Array.from(new Set(newHires.map(h => h.department)))];

  // Filter by department and status
  const filteredHires = newHires.filter(h => {
    const matchesDepartment = activeTab === 'all' || h.department === activeTab;
    const matchesStatus = selectedStatus === 'all' || h.status === selectedStatus;
    return matchesDepartment && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHires.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHires = filteredHires.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Name', 'Position', 'Department', 'Start Date', 'Status', 'Tasks Completed', 'Total Tasks', 'Progress %', 'Email', 'Manager', 'Document Status'];
    const rows = filteredHires.map(h => [
      h.name,
      h.position,
      h.department,
      h.startDate,
      h.status,
      h.tasksCompleted,
      h.totalTasks,
      getProgressPercentage(h.tasksCompleted, h.totalTasks),
      h.email || '',
      h.manager || '',
      h.documentStatus || 'pending'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onboarding-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setExportDialogOpen(false);
  };

  const totalHires = newHires.length;
  const inProgressHires = newHires.filter(h => h.status === 'in-progress').length;
  const completedHires = newHires.filter(h => h.status === 'completed').length;
  const pendingDocuments = newHires.filter(h => h.documentStatus === 'pending').length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Onboarding Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage new hire onboarding process and track progress
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total New Hires</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalHires}</p>
            </div>
            <div className="w-10 h-10 bg-[#00A4EF]/10 flex items-center justify-center">
              <UsersIcon size={20} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressHires}</p>
            </div>
            <div className="w-10 h-10 bg-[#FFB900]/10 flex items-center justify-center">
              <ClockIcon size={20} className="text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedHires}</p>
            </div>
            <div className="w-10 h-10 bg-[#7FBA00]/10 flex items-center justify-center">
              <CheckCircleIcon size={20} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Documents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingDocuments}</p>
            </div>
            <div className="w-10 h-10 bg-[#F25022]/10 flex items-center justify-center">
              <FileTextIcon size={20} className="text-[#F25022]" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={() => handleOpenDialog()} size="sm">
          <PlusIcon size={16} className="mr-2" />
          Add New Hire
        </Button>
        <Button variant="secondary" onClick={() => setFilterOpen(true)} size="sm">
          <FilterIcon size={16} className="mr-2" />
          Filter
        </Button>
        <Button variant="secondary" onClick={() => setExportDialogOpen(true)} size="sm">
          <DownloadIcon size={16} className="mr-2" />
          Export Report
        </Button>
      </div>

      {/* Department Tabs */}
      <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {departments.map((dept) => {
            const count = dept === 'all' ? newHires.length : newHires.filter(h => h.department === dept).length;
            return (
              <button
                key={dept}
                onClick={() => handleTabChange(dept)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === dept
                    ? 'border-[#0078D4] text-[#0078D4] bg-[#0078D4]/5'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {dept === 'all' ? 'All Departments' : dept}
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* New Hires List */}
      <div className="space-y-4">
        {paginatedHires.map((hire) => {
          const progress = getProgressPercentage(hire.tasksCompleted, hire.totalTasks);
          return (
            <div
              key={hire.id}
              className="bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white text-lg font-bold">
                    {hire.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {hire.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hire.position} • {hire.department}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Start Date: {hire.startDate} • Manager: {hire.manager}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 border text-xs font-medium ${getStatusColor(hire.status)}`}>
                    {hire.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 border text-xs font-medium ${getDocumentStatusColor(hire.documentStatus || 'pending')}`}>
                    {(hire.documentStatus || 'pending').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Onboarding Progress
                  </span>
                  <span className="text-sm font-bold text-[#00A4EF]">
                    {hire.tasksCompleted}/{hire.totalTasks} ({progress}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00A4EF] to-[#7FBA00] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm" onClick={() => setViewDetailsId(hire.id)}>
                  <EyeIcon size={16} className="mr-1" />
                  View Details
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setAssignTaskId(hire.id)}>
                  <CalendarIcon size={16} className="mr-1" />
                  Assign Task
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setDocumentsDialogId(hire.id)}>
                  <FileTextIcon size={16} className="mr-1" />
                  Documents
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleOpenDialog(hire)}>
                  <EditIcon size={16} className="mr-1" />
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(hire.id)}>
                  <TrashIcon size={16} className="mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredHires.length)} of {filteredHires.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingHire ? 'Edit New Hire' : 'Add New Hire'}
              </h2>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manager
                  </label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Status
                  </label>
                  <select
                    value={formData.documentStatus}
                    onChange={(e) => setFormData({ ...formData, documentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="verified">Verified</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Tasks
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalTasks}
                    onChange={(e) => setFormData({ ...formData, totalTasks: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="sm">
                  {editingHire ? 'Update' : 'Add New Hire'}
                </Button>
                <Button type="button" variant="secondary" onClick={handleCloseDialog} size="sm">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Dialog */}
      {viewDetailsId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Onboarding Details
              </h2>
              <button onClick={() => setViewDetailsId(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6">
              {(() => {
                const hire = newHires.find(h => h.id === viewDetailsId);
                if (!hire) return null;
                return (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white text-xl font-bold">
                        {hire.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{hire.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{hire.position}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{hire.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manager</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{hire.manager}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{hire.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{hire.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <span className={`inline-block px-3 py-1 border text-xs font-medium ${getStatusColor(hire.status)}`}>
                          {hire.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Document Status</p>
                        <span className={`inline-block px-3 py-1 border text-xs font-medium ${getDocumentStatusColor(hire.documentStatus || 'pending')}`}>
                          {(hire.documentStatus || 'pending').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Onboarding Checklist</h4>
                      <div className="space-y-2">
                        {[
                          'Complete employment forms',
                          'Submit identification documents',
                          'Review employee handbook',
                          'Complete IT setup',
                          'Attend orientation session',
                          'Meet team members',
                          'Setup payroll & benefits',
                          'Complete compliance training',
                          'Review job responsibilities',
                          'Schedule 30-day check-in'
                        ].slice(0, hire.totalTasks).map((task, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50">
                            <div className={`w-5 h-5 border-2 flex items-center justify-center ${idx < hire.tasksCompleted ? 'bg-[#7FBA00] border-[#7FBA00]' : 'border-gray-300 dark:border-gray-600'}`}>
                              {idx < hire.tasksCompleted && <CheckCircleIcon size={16} className="text-white" />}
                            </div>
                            <span className={`text-sm ${idx < hire.tasksCompleted ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                              {task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="primary" size="sm" onClick={() => setViewDetailsId(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Assign Task Dialog */}
      {assignTaskId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-lg w-full">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Assign Task
              </h2>
              <button onClick={() => setAssignTaskId(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-6">
                <Button variant="primary" size="sm">
                  <SendIcon size={16} className="mr-2" />
                  Assign Task
                </Button>
                <Button variant="secondary" onClick={() => setAssignTaskId(null)} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Dialog */}
      {documentsDialogId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Onboarding Documents
              </h2>
              <button onClick={() => setDocumentsDialogId(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {[
                  { name: 'Employment Contract', status: 'verified', uploaded: '2025-11-01' },
                  { name: 'ID Document', status: 'verified', uploaded: '2025-11-01' },
                  { name: 'Tax Forms', status: 'submitted', uploaded: '2025-11-02' },
                  { name: 'Bank Details', status: 'submitted', uploaded: '2025-11-02' },
                  { name: 'Educational Certificates', status: 'pending', uploaded: '-' },
                  { name: 'Medical Records', status: 'pending', uploaded: '-' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <FileTextIcon size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploaded}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 border text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                      {doc.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-6">
                <Button variant="primary" size="sm">
                  <PlusIcon size={16} className="mr-2" />
                  Upload Document
                </Button>
                <Button variant="secondary" onClick={() => setDocumentsDialogId(null)} size="sm">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Dialog */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filter New Hires
              </h2>
              <button onClick={() => setFilterOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {['all', 'not-started', 'in-progress', 'completed'].map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="text-[#00A4EF] focus:ring-[#00A4EF]"
                      />
                      <span className="text-sm text-gray-900 dark:text-white capitalize">
                        {status === 'all' ? 'All Statuses' : status.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button variant="primary" onClick={() => { setCurrentPage(1); setFilterOpen(false); }} size="sm">
                  Apply Filter
                </Button>
                <Button variant="secondary" onClick={() => { setSelectedStatus('all'); setCurrentPage(1); setFilterOpen(false); }} size="sm">
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Dialog */}
      {exportDialogOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Export Onboarding Report
              </h2>
              <button onClick={() => setExportDialogOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Export the current filtered onboarding data ({filteredHires.length} records) to CSV format.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 mb-4 border border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Export will include:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Employee details (Name, Position, Department)</li>
                  <li>• Onboarding status and progress</li>
                  <li>• Task completion metrics</li>
                  <li>• Document verification status</li>
                  <li>• Contact information</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" onClick={handleExport} size="sm">
                  <DownloadIcon size={16} className="mr-2" />
                  Export to CSV
                </Button>
                <Button variant="secondary" onClick={() => setExportDialogOpen(false)} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
