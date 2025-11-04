import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EyeIcon } from '@/components/Icons';

interface LeaveApplication {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approvedBy?: string;
}

export const ApplyLeave = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [applications, setApplications] = useState<LeaveApplication[]>([
    { id: 1, leaveType: 'Annual Leave', startDate: '2025-12-01', endDate: '2025-12-05', days: 5, reason: 'Family vacation', status: 'Approved', appliedOn: '2025-11-01', approvedBy: 'John Manager' },
    { id: 2, leaveType: 'Sick Leave', startDate: '2025-11-20', endDate: '2025-11-21', days: 2, reason: 'Medical appointment', status: 'Pending', appliedOn: '2025-11-18' },
    { id: 3, leaveType: 'Casual Leave', startDate: '2025-11-10', endDate: '2025-11-10', days: 1, reason: 'Personal errands', status: 'Approved', appliedOn: '2025-11-05', approvedBy: 'Jane Supervisor' },
    { id: 4, leaveType: 'Annual Leave', startDate: '2025-10-15', endDate: '2025-10-22', days: 8, reason: 'Wedding', status: 'Rejected', appliedOn: '2025-10-01' },
  ]);

  const leaveBalance = {
    annual: { total: 21, used: 13, available: 8 },
    sick: { total: 10, used: 2, available: 8 },
    casual: { total: 5, used: 1, available: 4 }
  };

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return diff + 1;
  };

  const handleSubmit = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);
    const newApp: LeaveApplication = {
      id: applications.length + 1,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };
    setApplications([newApp, ...applications]);
    addToast('Leave application submitted successfully', 'success');
    setShowModal(false);
    setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Pending': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Rejected': return 'bg-[#F25022]/20 text-[#F25022]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.status === 'Approved').length,
    pending: applications.filter(a => a.status === 'Pending').length
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Apply Leave
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Submit and track your leave applications</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Apply for Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Applications</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</div>
          <div className="text-3xl font-bold text-[#7FBA00]">{stats.approved}</div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
          <div className="text-3xl font-bold text-[#FFB900]">{stats.pending}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Annual Leave</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total</span>
              <span className="font-medium text-gray-900 dark:text-white">{leaveBalance.annual.total} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Used</span>
              <span className="font-medium text-[#F25022]">{leaveBalance.annual.used} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Available</span>
              <span className="font-medium text-[#7FBA00]">{leaveBalance.annual.available} days</span>
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sick Leave</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total</span>
              <span className="font-medium text-gray-900 dark:text-white">{leaveBalance.sick.total} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Used</span>
              <span className="font-medium text-[#F25022]">{leaveBalance.sick.used} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Available</span>
              <span className="font-medium text-[#7FBA00]">{leaveBalance.sick.available} days</span>
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Casual Leave</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total</span>
              <span className="font-medium text-gray-900 dark:text-white">{leaveBalance.casual.total} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Used</span>
              <span className="font-medium text-[#F25022]">{leaveBalance.casual.used} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Available</span>
              <span className="font-medium text-[#7FBA00]">{leaveBalance.casual.available} days</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Leave Applications</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Leave Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Start Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">End Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Days</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Applied On</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {applications.map((app) => (
              <tr key={app.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{app.leaveType}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{app.startDate}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{app.endDate}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{app.days}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{app.appliedOn}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedLeave(app); setShowDetailsModal(true); }}>
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply for Leave">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type *</label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="">Select leave type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Compassionate Leave">Compassionate Leave</option>
            </select>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          {formData.startDate && formData.endDate && (
            <div className="p-3 bg-[#00A4EF]/10 border border-[#00A4EF]/30">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Duration: <strong>{calculateDays(formData.startDate, formData.endDate)} day(s)</strong>
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              placeholder="Please provide a reason for your leave"
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit}>Submit Application</Button>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {selectedLeave && (
        <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title="Leave Application Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Leave Type</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.leaveType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.days} day(s)</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Start Date</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.startDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">End Date</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.endDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Applied On</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.appliedOn}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(selectedLeave.status)}`}>
                  {selectedLeave.status}
                </span>
              </div>
            </div>
            {selectedLeave.approvedBy && (
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Approved By</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedLeave.approvedBy}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reason</div>
              <div className="text-gray-900 dark:text-white">{selectedLeave.reason}</div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowDetailsModal(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplyLeave;
