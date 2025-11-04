import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, EyeIcon, DollarIcon, ClockIcon, CheckCircleIcon, MoneyIcon } from '@/components/Icons';

interface Bonus {
  id: number;
  employeeName: string;
  employeeId: string;
  bonusType: 'Performance' | 'Annual' | 'Quarterly' | 'Special' | 'Holiday';
  amount: number;
  period: string;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  approvedBy?: string;
  paidDate?: string;
  reason?: string;
}

export const Bonuses = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null);
  const [viewingBonus, setViewingBonus] = useState<Bonus | null>(null);
  const [deletingBonus, setDeletingBonus] = useState<Bonus | null>(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    bonusType: 'Performance' as Bonus['bonusType'],
    amount: '',
    period: '',
    reason: ''
  });
  const { addToast } = useToast();
  const { theme } = useTheme();

  const [bonuses, setBonuses] = useState<Bonus[]>([
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      bonusType: 'Performance',
      amount: 5000,
      period: '2025 Q4',
      status: 'Approved',
      approvedBy: 'Jane Manager',
      reason: 'Exceptional Q4 performance'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP025',
      bonusType: 'Annual',
      amount: 8000,
      period: '2025',
      status: 'Paid',
      approvedBy: 'Mike Director',
      paidDate: '2025-12-15',
      reason: 'Year-end bonus'
    },
    {
      id: 3,
      employeeName: 'Mike Williams',
      employeeId: 'EMP042',
      bonusType: 'Quarterly',
      amount: 3500,
      period: '2025 Q3',
      status: 'Pending',
      reason: 'Q3 sales target achievement'
    },
    {
      id: 4,
      employeeName: 'Emily Brown',
      employeeId: 'EMP015',
      bonusType: 'Special',
      amount: 10000,
      period: '2025',
      status: 'Approved',
      approvedBy: 'John CEO',
      reason: 'Project completion bonus'
    },
    {
      id: 5,
      employeeName: 'David Lee',
      employeeId: 'EMP033',
      bonusType: 'Holiday',
      amount: 2000,
      period: 'December 2025',
      status: 'Paid',
      approvedBy: 'Jane Manager',
      paidDate: '2025-12-20',
      reason: 'Christmas bonus'
    }
  ]);

  const handleAdd = () => {
    setEditingBonus(null);
    setFormData({
      employeeName: '',
      employeeId: '',
      bonusType: 'Performance',
      amount: '',
      period: '',
      reason: ''
    });
    setShowModal(true);
  };

  const handleView = (bonus: Bonus) => {
    setViewingBonus(bonus);
    setShowViewModal(true);
  };

  const handleEdit = (bonus: Bonus) => {
    setEditingBonus(bonus);
    setFormData({
      employeeName: bonus.employeeName,
      employeeId: bonus.employeeId,
      bonusType: bonus.bonusType,
      amount: bonus.amount.toString(),
      period: bonus.period,
      reason: bonus.reason || ''
    });
    setShowModal(true);
  };

  const handleDeleteClick = (bonus: Bonus) => {
    setDeletingBonus(bonus);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deletingBonus) {
      setBonuses(bonuses.filter(b => b.id !== deletingBonus.id));
      addToast('Bonus deleted successfully', 'success');
      setShowDeleteModal(false);
      setDeletingBonus(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.employeeName || !formData.employeeId || !formData.amount || !formData.period) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    if (editingBonus) {
      setBonuses(bonuses.map(b => b.id === editingBonus.id ? {
        ...b,
        ...formData,
        amount: parseFloat(formData.amount)
      } : b));
      addToast('Bonus updated successfully', 'success');
    } else {
      const newBonus: Bonus = {
        id: bonuses.length + 1,
        employeeName: formData.employeeName,
        employeeId: formData.employeeId,
        bonusType: formData.bonusType,
        amount: parseFloat(formData.amount),
        period: formData.period,
        status: 'Pending',
        reason: formData.reason
      };
      setBonuses([newBonus, ...bonuses]);
      addToast('Bonus created successfully', 'success');
    }
    setShowModal(false);
  };

  const handleStatusUpdate = (id: number, status: Bonus['status']) => {
    setBonuses(bonuses.map(b => b.id === id ? { ...b, status } : b));
    addToast(`Bonus status updated to ${status}`, 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Approved': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Pending': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Rejected': return 'bg-[#F25022]/20 text-[#F25022]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case 'Performance': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Annual': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Quarterly': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Special': return 'bg-[#F25022]/20 text-[#F25022]';
      case 'Holiday': return 'bg-purple-500/20 text-purple-600';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: bonuses.reduce((sum, b) => sum + b.amount, 0),
    pending: bonuses.filter(b => b.status === 'Pending').length,
    approved: bonuses.filter(b => b.status === 'Approved').length,
    paid: bonuses.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0)
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Bonuses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage employee bonuses and incentives</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          <span>Add Bonus</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Bonuses</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">GH₵ {stats.total.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <MoneyIcon className="w-8 h-8 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Approvals</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.pending}</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <ClockIcon className="w-8 h-8 text-[#FFB900]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.approved}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <CheckCircleIcon className="w-8 h-8 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paid</div>
              <div className="text-3xl font-bold text-[#7FBA00]">GH₵ {stats.paid.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <DollarIcon className="w-8 h-8 text-[#7FBA00]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Period</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Approved By</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {bonuses.map((bonus) => (
              <tr key={bonus.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{bonus.employeeName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{bonus.employeeId}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getBonusTypeColor(bonus.bonusType)}`}>
                    {bonus.bonusType}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">GH₵ {bonus.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{bonus.period}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(bonus.status)}`}>
                    {bonus.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{bonus.approvedBy || '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleView(bonus)}
                      className="bg-[#0078D4] hover:bg-[#106EBE] text-white flex items-center"
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      <span>View</span>
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleEdit(bonus)}
                      className="bg-[#00A4EF] hover:bg-[#0078D4] text-white flex items-center"
                    >
                      <EditIcon className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </Button>
                    {bonus.status === 'Pending' && (
                      <Button 
                        variant="success" 
                        size="sm" 
                        onClick={() => handleStatusUpdate(bonus.id, 'Approved')}
                        className="bg-[#7FBA00] hover:bg-[#6FA000] text-white flex items-center"
                      >
                        <CheckIcon className="w-4 h-4 mr-2" />
                        <span>Approve</span>
                      </Button>
                    )}
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteClick(bonus)}
                      className="bg-[#F25022] hover:bg-[#D83B01] text-white flex items-center"
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingBonus ? 'Edit Bonus' : 'Add New Bonus'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee Name *</label>
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID *</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bonus Type *</label>
              <select
                value={formData.bonusType}
                onChange={(e) => setFormData({ ...formData, bonusType: e.target.value as Bonus['bonusType'] })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="Performance">Performance</option>
                <option value="Annual">Annual</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Special">Special</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (GH₵) *</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period *</label>
            <input
              type="text"
              placeholder="e.g., 2025 Q4 or December 2025"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
            <textarea
              placeholder="Reason for bonus"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit} className="flex items-center">
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>{editingBonus ? 'Update' : 'Create'}</span>
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex items-center">
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Bonus Details">
        {viewingBonus && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Employee Name</label>
                <div className="text-base font-medium text-gray-900 dark:text-white">{viewingBonus.employeeName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Employee ID</label>
                <div className="text-base font-medium text-gray-900 dark:text-white">{viewingBonus.employeeId}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bonus Type</label>
                <span className={`inline-block px-3 py-1 text-sm font-medium ${getBonusTypeColor(viewingBonus.bonusType)}`}>
                  {viewingBonus.bonusType}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</label>
                <div className="text-base font-bold text-gray-900 dark:text-white">GH₵ {viewingBonus.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Period</label>
                <div className="text-base font-medium text-gray-900 dark:text-white">{viewingBonus.period}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
                <span className={`inline-block px-3 py-1 text-sm font-medium ${getStatusColor(viewingBonus.status)}`}>
                  {viewingBonus.status}
                </span>
              </div>
            </div>
            {viewingBonus.approvedBy && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Approved By</label>
                <div className="text-base font-medium text-gray-900 dark:text-white">{viewingBonus.approvedBy}</div>
              </div>
            )}
            {viewingBonus.paidDate && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Paid Date</label>
                <div className="text-base font-medium text-gray-900 dark:text-white">{viewingBonus.paidDate}</div>
              </div>
            )}
            {viewingBonus.reason && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Reason</label>
                <div className="text-base text-gray-900 dark:text-white">{viewingBonus.reason}</div>
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowViewModal(false)} className="flex items-center">
                <span>Close</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Bonus">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the bonus for <span className="font-bold">{deletingBonus?.employeeName}</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button variant="danger" onClick={handleDelete} className="flex items-center">
              <TrashIcon className="w-4 h-4 mr-2" />
              <span>Delete</span>
            </Button>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="flex items-center">
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bonuses;
