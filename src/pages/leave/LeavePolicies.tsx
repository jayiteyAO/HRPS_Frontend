import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, FileIcon, CheckIcon } from '@/components/Icons';

interface LeavePolicy {
  id: number;
  name: string;
  leaveType: string;
  entitlement: number;
  carryForward: number;
  maxCarryForward: number;
  accrualRate: string;
  eligibility: string;
  isActive: boolean;
  effectiveDate: string;
}

export const LeavePolicies = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null);
  const [deletingPolicy, setDeletingPolicy] = useState<LeavePolicy | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    leaveType: '',
    entitlement: 0,
    carryForward: 0,
    maxCarryForward: 0,
    accrualRate: 'Monthly',
    eligibility: '',
    isActive: true,
    effectiveDate: ''
  });

  const [policies, setPolicies] = useState<LeavePolicy[]>([
    { id: 1, name: 'Standard Annual Leave', leaveType: 'Annual Leave', entitlement: 21, carryForward: 5, maxCarryForward: 10, accrualRate: 'Monthly', eligibility: 'All employees', isActive: true, effectiveDate: '2025-01-01' },
    { id: 2, name: 'Sick Leave Policy', leaveType: 'Sick Leave', entitlement: 10, carryForward: 0, maxCarryForward: 0, accrualRate: 'Yearly', eligibility: 'All employees', isActive: true, effectiveDate: '2025-01-01' },
    { id: 3, name: 'Casual Leave Policy', leaveType: 'Casual Leave', entitlement: 7, carryForward: 2, maxCarryForward: 5, accrualRate: 'Monthly', eligibility: 'All employees', isActive: true, effectiveDate: '2025-01-01' },
    { id: 4, name: 'Maternity Leave', leaveType: 'Maternity Leave', entitlement: 90, carryForward: 0, maxCarryForward: 0, accrualRate: 'On Request', eligibility: 'Female employees', isActive: true, effectiveDate: '2025-01-01' },
    { id: 5, name: 'Paternity Leave', leaveType: 'Paternity Leave', entitlement: 5, carryForward: 0, maxCarryForward: 0, accrualRate: 'On Request', eligibility: 'Male employees', isActive: true, effectiveDate: '2025-01-01' },
    { id: 6, name: 'Compassionate Leave', leaveType: 'Compassionate Leave', entitlement: 5, carryForward: 0, maxCarryForward: 0, accrualRate: 'On Request', eligibility: 'All employees', isActive: true, effectiveDate: '2025-01-01' },
  ]);

  const handleAdd = () => {
    setEditingPolicy(null);
    setFormData({ name: '', leaveType: '', entitlement: 0, carryForward: 0, maxCarryForward: 0, accrualRate: 'Monthly', eligibility: '', isActive: true, effectiveDate: '' });
    setShowModal(true);
  };

  const handleEdit = (policy: LeavePolicy) => {
    setEditingPolicy(policy);
    setFormData({
      name: policy.name,
      leaveType: policy.leaveType,
      entitlement: policy.entitlement,
      carryForward: policy.carryForward,
      maxCarryForward: policy.maxCarryForward,
      accrualRate: policy.accrualRate,
      eligibility: policy.eligibility,
      isActive: policy.isActive,
      effectiveDate: policy.effectiveDate
    });
    setShowModal(true);
  };

  const handleDelete = (policy: LeavePolicy) => {
    setDeletingPolicy(policy);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingPolicy) {
      setPolicies(policies.filter(p => p.id !== deletingPolicy.id));
      addToast('Leave policy deleted successfully', 'success');
      setShowDeleteModal(false);
      setDeletingPolicy(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.leaveType || !formData.eligibility || !formData.effectiveDate) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    if (editingPolicy) {
      setPolicies(policies.map(p => p.id === editingPolicy.id ? { ...p, ...formData } : p));
      addToast('Leave policy updated successfully', 'success');
    } else {
      const newPolicy: LeavePolicy = {
        id: policies.length + 1,
        ...formData
      };
      setPolicies([...policies, newPolicy]);
      addToast('Leave policy created successfully', 'success');
    }
    setShowModal(false);
  };

  const stats = {
    total: policies.length,
    active: policies.filter(p => p.isActive).length,
    totalEntitlement: policies.reduce((sum, p) => sum + p.entitlement, 0)
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Leave Policies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage company leave policies and entitlements</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          <span>Add Policy</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Policies</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Policies</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.active}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/20 flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Days</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.totalEntitlement}</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/20 flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Policies</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Policy Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Leave Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Entitlement</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Carry Forward</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Accrual</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Eligibility</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {policies.map((policy) => (
              <tr key={policy.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{policy.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{policy.leaveType}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{policy.entitlement} days</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{policy.carryForward} / {policy.maxCarryForward} days</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{policy.accrualRate}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{policy.eligibility}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${policy.isActive ? 'bg-[#7FBA00]/20 text-[#7FBA00]' : 'bg-gray-200 text-gray-700'}`}>
                    {policy.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(policy)}
                      className={`p-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                    >
                      <EditIcon className="w-4 h-4 text-gray-900 dark:text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(policy)}
                      className={`p-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-red-900/20' : 'bg-gray-100 hover:bg-red-50'} transition-colors`}
                    >
                      <TrashIcon className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingPolicy ? 'Edit Leave Policy' : 'Add New Leave Policy'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Policy Name *</label>
            <input
              type="text"
              placeholder="e.g., Standard Annual Leave"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type *</label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="">Select type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
                <option value="Compassionate Leave">Compassionate Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entitlement (Days) *</label>
              <input
                type="number"
                value={formData.entitlement}
                onChange={(e) => setFormData({ ...formData, entitlement: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carry Forward (Days)</label>
              <input
                type="number"
                value={formData.carryForward}
                onChange={(e) => setFormData({ ...formData, carryForward: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Carry Forward</label>
              <input
                type="number"
                value={formData.maxCarryForward}
                onChange={(e) => setFormData({ ...formData, maxCarryForward: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accrual Rate *</label>
              <select
                value={formData.accrualRate}
                onChange={(e) => setFormData({ ...formData, accrualRate: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="On Request">On Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Effective Date *</label>
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eligibility *</label>
            <input
              type="text"
              placeholder="e.g., All employees, Female employees"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Policy</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit}>
              {editingPolicy ? 'Update' : 'Create'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Leave Policy">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the policy "{deletingPolicy?.name}"? This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button 
              variant="danger" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeavePolicies;
