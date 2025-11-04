import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { LeaveIcon, CheckCircleIcon, ClockIcon, CalendarIcon } from '@/components/Icons';
import { FormModal } from '@/components/FormModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { leaveRequests } from '@/data/mockData';
import { showToast } from '@/components/Toast';

interface LeaveFormData {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const LeaveManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeaveFormData>({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const filteredLeaves = filterStatus === 'All'
    ? leaveRequests
    : leaveRequests.filter(leave => leave.status === filterStatus);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  const handleRequestLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      showToast('Leave request submitted successfully!', 'success');
      setIsSubmitting(false);
      setIsRequestModalOpen(false);
      setFormData({
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
      });
    }, 1000);
  };

  const handleApproveClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsRejectModalOpen(true);
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      showToast('Leave request approved!', 'success');
      setIsSubmitting(false);
      setIsApproveModalOpen(false);
      setSelectedLeave(null);
    }, 1000);
  };

  const handleReject = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      showToast('Leave request rejected!', 'success');
      setIsSubmitting(false);
      setIsRejectModalOpen(false);
      setSelectedLeave(null);
    }, 1000);
  };

  const handleViewClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <LeaveIcon size={32} className="text-[#FFB900]" />
            Leave Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage employee leave requests and approvals
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsRequestModalOpen(true)}>
          + Request Leave
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding={false} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{leaveRequests.length}</p>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-700">
              <LeaveIcon size={24} className="text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-[#FFB900] mt-1">
                {leaveRequests.filter(l => l.status === 'Pending').length}
              </p>
            </div>
            <div className="p-2 bg-[#FFB900]/10">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-[#7FBA00] mt-1">
                {leaveRequests.filter(l => l.status === 'Approved').length}
              </p>
            </div>
            <div className="p-2 bg-[#7FBA00]/10">
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>
        <Card padding={false} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-[#00A4EF] mt-1">
                {leaveRequests.filter(l => l.appliedDate.includes('2025-11')).length}
              </p>
            </div>
            <div className="p-2 bg-[#00A4EF]/10">
              <CalendarIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</span>
          <div className="flex space-x-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader
          title="Leave Requests"
          subtitle={`${filteredLeaves.length} requests found`}
        />
        <Table
          data={filteredLeaves}
          columns={[
            {
              key: 'id',
              header: 'Request ID',
              render: (row) => (
                <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{row.id}</span>
              ),
            },
            {
              key: 'employeeName',
              header: 'Employee',
              render: (row) => (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{row.employeeName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{row.employeeId}</p>
                </div>
              ),
            },
            {
              key: 'type',
              header: 'Leave Type',
              render: (row) => (
                <Badge variant="info">{row.type}</Badge>
              ),
            },
            {
              key: 'dates',
              header: 'Duration',
              render: (row) => (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{row.startDate} to {row.endDate}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{row.days} days</p>
                </div>
              ),
            },
            {
              key: 'reason',
              header: 'Reason',
              render: (row) => (
                <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">{row.reason}</p>
              ),
            },
            {
              key: 'appliedDate',
              header: 'Applied On',
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
              ),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) => (
                <div className="flex space-x-2">
                  {row.status === 'Pending' && (
                    <>
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleApproveClick(row)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleRejectClick(row)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleViewClick(row)}
                  >
                    View
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Request Leave Modal */}
      <FormModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestLeave}
        title="Request Leave"
        submitText="Submit Request"
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Leave Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reason
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Please provide a reason for your leave request..."
              required
            />
          </div>
        </div>
      </FormModal>

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApprove}
        title="Approve Leave Request"
        message={`Are you sure you want to approve the leave request from ${selectedLeave?.employee}?`}
        confirmText="Approve"
        cancelText="Cancel"
        variant="info"
        isProcessing={isSubmitting}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Reject Leave Request"
        message={`Are you sure you want to reject the leave request from ${selectedLeave?.employee}?`}
        confirmText="Reject"
        cancelText="Cancel"
        variant="danger"
        isProcessing={isSubmitting}
      />

      {/* View Leave Details Modal */}
      {isViewModalOpen && selectedLeave && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={() => setIsViewModalOpen(false)} />
            
            <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Leave Request Details
                </h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Employee Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Employee Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Employee Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Employee ID</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.employeeId}</p>
                    </div>
                  </div>
                </div>

                {/* Leave Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Leave Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Request ID</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Leave Type</p>
                      <div className="mt-1">
                        <Badge variant="info">{selectedLeave.type}</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Start Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">End Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.days} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Applied On</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedLeave.appliedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <div className="mt-1">
                        <Badge variant={getStatusVariant(selectedLeave.status)}>{selectedLeave.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reason</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLeave.reason}</p>
                  </div>
                </div>

                {/* Approval Information (if approved/rejected) */}
                {selectedLeave.status !== 'Pending' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      {selectedLeave.status === 'Approved' ? 'Approval' : 'Rejection'} Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedLeave.status === 'Approved' ? 'Approved By' : 'Rejected By'}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">HR Manager</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedLeave.status === 'Approved' ? 'Approved On' : 'Rejected On'}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {new Date(selectedLeave.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="secondary"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>
                {selectedLeave.status === 'Pending' && (
                  <>
                    <Button
                      variant="success"
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleApproveClick(selectedLeave);
                      }}
                      className="bg-[#7FBA00] hover:bg-[#6da300] text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setIsViewModalOpen(false);
                        handleRejectClick(selectedLeave);
                      }}
                      className="bg-[#E81123] hover:bg-[#c40f1f] text-white"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
