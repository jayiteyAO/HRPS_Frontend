import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, ClockIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EditIcon, TrashIcon } from '@/components/Icons';

interface OvertimeRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

export const Overtime = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<OvertimeRequest | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reason: ''
  });

  const [requests, setRequests] = useState<OvertimeRequest[]>([
    { id: 1, employeeName: 'Kwame Mensah', employeeId: 'EMP001', date: '2025-11-15', startTime: '18:00', endTime: '22:00', hours: 4, reason: 'Project deadline', status: 'Approved', approvedBy: 'John Manager' },
    { id: 2, employeeName: 'Ama Adjei', employeeId: 'EMP002', date: '2025-11-14', startTime: '17:00', endTime: '20:00', hours: 3, reason: 'Client meeting', status: 'Pending' },
    { id: 3, employeeName: 'Kofi Asante', employeeId: 'EMP003', date: '2025-11-13', startTime: '16:00', endTime: '19:00', hours: 3, reason: 'System maintenance', status: 'Approved', approvedBy: 'Sarah Supervisor' },
    { id: 4, employeeName: 'Abena Owusu', employeeId: 'EMP004', date: '2025-11-12', startTime: '18:00', endTime: '21:00', hours: 3, reason: 'Report preparation', status: 'Rejected' },
  ]);

  const calculateHours = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    return ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60;
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.reason) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const hours = calculateHours(formData.startTime, formData.endTime);
    if (hours <= 0) {
      addToast('End time must be after start time', 'error');
      return;
    }

    const newRequest: OvertimeRequest = {
      id: requests.length + 1,
      employeeName: 'Current User',
      employeeId: 'EMP999',
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      hours,
      reason: formData.reason,
      status: 'Pending'
    };
    setRequests([newRequest, ...requests]);
    addToast('Overtime request submitted successfully', 'success');
    setShowModal(false);
    setFormData({ date: '', startTime: '', endTime: '', reason: '' });
  };

  const handleEdit = () => {
    if (!selectedRequest) return;
    addToast('Overtime request updated successfully', 'success');
    setShowEditModal(false);
    setSelectedRequest(null);
  };

  const handleDelete = () => {
    if (!selectedRequest) return;
    setRequests(requests.filter(r => r.id !== selectedRequest.id));
    addToast('Overtime request deleted successfully', 'success');
    setShowDeleteModal(false);
    setSelectedRequest(null);
  };

  const openViewModal = (request: OvertimeRequest) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const openEditModal = (request: OvertimeRequest) => {
    setSelectedRequest(request);
    setShowEditModal(true);
  };

  const openDeleteModal = (request: OvertimeRequest) => {
    setSelectedRequest(request);
    setShowDeleteModal(true);
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
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    totalHours: requests.filter(r => r.status === 'Approved').reduce((sum, r) => sum + r.hours, 0)
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Overtime
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Request and track overtime hours</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>Request Overtime</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Requests</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/10 flex items-center justify-center">
              <FileTextIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.pending}</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/10 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.approved}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/10 flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Hours</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.totalHours}h</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/10 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overtime Requests</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Time</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Hours</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Reason</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Approved By</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {requests.map((request) => (
              <tr key={request.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{request.employeeName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{request.employeeId}</div>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{request.date}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{request.startTime} - {request.endTime}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-[#00A4EF] font-medium">
                    <ClockIcon size={16} />
                    {request.hours}h
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{request.reason}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{request.approvedBy || '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openViewModal(request)}
                      className="flex items-center gap-2"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                    {request.status === 'Pending' && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openEditModal(request)}
                          className="flex items-center gap-2"
                        >
                          <EditIcon className="w-4 h-4" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => openDeleteModal(request)}
                          className="flex items-center gap-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span>Delete</span>
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Request Overtime">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>
          {formData.startTime && formData.endTime && (
            <div className="p-3 bg-[#00A4EF]/10 border border-[#00A4EF]/30">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Duration: <strong>{calculateHours(formData.startTime, formData.endTime)} hour(s)</strong>
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              placeholder="Please provide a reason for overtime"
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit} className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              <span>Submit Request</span>
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Overtime Request Details">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Employee Name</label>
                <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.employeeName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.employeeId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
                <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Duration</label>
                <p className="mt-1 text-[#00A4EF] font-bold flex items-center gap-1">
                  <ClockIcon size={16} />
                  {selectedRequest.hours} hours
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Start Time</label>
                <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.startTime}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">End Time</label>
                <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.endTime}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Reason</label>
              <p className="mt-1 text-gray-900 dark:text-white">{selectedRequest.reason}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                <span className={`inline-block mt-1 px-3 py-1 text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>
              {selectedRequest.approvedBy && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Approved By</label>
                  <p className="mt-1 text-gray-900 dark:text-white font-medium">{selectedRequest.approvedBy}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Overtime Request">
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
              <input
                type="date"
                defaultValue={selectedRequest.date}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
                <input
                  type="time"
                  defaultValue={selectedRequest.startTime}
                  className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
                <input
                  type="time"
                  defaultValue={selectedRequest.endTime}
                  className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason *</label>
              <textarea
                defaultValue={selectedRequest.reason}
                rows={4}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="primary" onClick={handleEdit} className="flex items-center gap-2">
                <EditIcon className="w-4 h-4" />
                <span>Update Request</span>
              </Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Overtime Request">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F25022]/10 flex items-center justify-center flex-shrink-0">
                <XCircleIcon className="w-6 h-6 text-[#F25022]" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium mb-2">
                  Are you sure you want to delete this overtime request?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Request for <strong>{selectedRequest.employeeName}</strong> on <strong>{selectedRequest.date}</strong> ({selectedRequest.hours} hours). This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="danger" onClick={handleDelete} className="flex items-center gap-2">
                <TrashIcon className="w-4 h-4" />
                <span>Delete Request</span>
              </Button>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Overtime;
