import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { PayrollIcon, DollarIcon, UsersIcon, CheckCircleIcon, ClockIcon, DownloadIcon, PrintIcon, FileTextIcon } from '@/components/Icons';
import { FormModal } from '@/components/FormModal';
import { Modal } from '@/components/Modal';
import { payrollRecords } from '@/data/mockData';
import { showToast } from '@/components/Toast';

interface PayrollFormData {
 employeeId: string;
 period: string;
 basicSalary: number;
 allowances: number;
 deductions: number;
 bonuses: number;
}

const PayrollManagement: React.FC = () => {
 const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
 const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
 const [isExportModalOpen, setIsExportModalOpen] = useState(false);
 const [selectedPayroll, setSelectedPayroll] = useState<any>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [formData, setFormData] = useState<PayrollFormData>({
 employeeId: '',
 period: '',
 basicSalary: 0,
 allowances: 0,
 deductions: 0,
 bonuses: 0,
 });
 
 const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);
 const avgSalary = totalPayroll / payrollRecords.length;

 const handleProcessPayroll = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 setTimeout(() => {
 showToast('Payroll processed successfully!', 'success');
 setIsSubmitting(false);
 setIsProcessModalOpen(false);
 setFormData({
 employeeId: '',
 period: '',
 basicSalary: 0,
 allowances: 0,
 deductions: 0,
 bonuses: 0,
 });
 }, 1000);
 };

 const handleView = (payroll: any) => {
 setSelectedPayroll(payroll);
 setIsViewModalOpen(true);
 };

 const handleDownload = (payroll: any) => {
 setSelectedPayroll(payroll);
 setIsDownloadModalOpen(true);
 };

 const confirmDownload = () => {
 showToast(`Downloading payslip for ${selectedPayroll?.employeeName}...`, 'success');
 setIsDownloadModalOpen(false);
 };

 const handlePrint = () => {
 setIsPrintModalOpen(true);
 };

 const confirmPrint = () => {
 showToast('Printing payroll records...', 'success');
 setIsPrintModalOpen(false);
 };

 const handleExportCSV = () => {
 setIsExportModalOpen(true);
 };

 const confirmExportCSV = () => {
 showToast('Exporting payroll data to CSV...', 'success');
 setIsExportModalOpen(false);
 };

 return (
 <div className="space-y-6">
 {/* Page Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
 <PayrollIcon size={32} className="text-[#7FBA00]" />
 Payroll Management
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-1">
 Process and manage employee payroll
 </p>
 </div>
 <Button variant="primary" onClick={() => setIsProcessModalOpen(true)}>
 Process Payroll
 </Button>
 </div>

 {/* Stats Cards */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <Card padding={false} className="p-4 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] text-white">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm text-blue-100">Total Payroll</p>
 <p className="text-2xl font-bold mt-1">₵{totalPayroll.toLocaleString()}</p>
 <p className="text-xs text-blue-100 mt-1">This month</p>
 </div>
 <DollarIcon size={24} className="text-blue-100" />
 </div>
 </Card>
 <Card padding={false} className="p-4">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Salary</p>
 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
 ₵{Math.round(avgSalary).toLocaleString()}
 </p>
 </div>
 <UsersIcon size={24} className="text-gray-400" />
 </div>
 </Card>
 <Card padding={false} className="p-4">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Processed</p>
 <p className="text-2xl font-bold text-[#7FBA00] mt-1">
 {payrollRecords.filter(p => p.status === 'Processed').length}
 </p>
 </div>
 <CheckCircleIcon size={24} className="text-gray-400" />
 </div>
 </Card>
 <Card padding={false} className="p-4">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
 <p className="text-2xl font-bold text-[#FFB900] mt-1">
 {payrollRecords.filter(p => p.status === 'Pending').length}
 </p>
 </div>
 <ClockIcon size={24} className="text-gray-400" />
 </div>
 </Card>
 </div>

 {/* Payroll Table */}
 <Card>
 <CardHeader
 title="Payroll Records"
 subtitle={`${payrollRecords.length} records for October 2025`}
 action={
 <div className="flex space-x-2">
 <Button 
 variant="success" 
 size="sm"
 onClick={handleExportCSV}
 className="flex items-center gap-2"
 >
 <FileTextIcon size={16} />
 Export CSV
 </Button>
 <Button 
 variant="primary" 
 size="sm"
 onClick={handlePrint}
 className="flex items-center gap-2"
 >
 <PrintIcon size={16} />
 Print
 </Button>
 </div>
 }
 />
 <Table
 data={payrollRecords}
 columns={[
 {
 key: 'id',
 header: 'Payroll ID',
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
 key: 'period',
 header: 'Period',
 },
 {
 key: 'baseSalary',
 header: 'Base Salary',
 render: () => (
 <span className="font-medium text-gray-500 dark:text-gray-400">••••••</span>
 ),
 },
 {
 key: 'allowances',
 header: 'Allowances',
 render: () => (
 <span className="text-gray-500 dark:text-gray-400">••••••</span>
 ),
 },
 {
 key: 'deductions',
 header: 'Deductions',
 render: () => (
 <span className="text-gray-500 dark:text-gray-400">••••••</span>
 ),
 },
 {
 key: 'netPay',
 header: 'Net Pay',
 render: () => (
 <span className="font-medium text-gray-500 dark:text-gray-400">••••••</span>
 ),
 },
 {
 key: 'status',
 header: 'Status',
 render: (row) => (
 <Badge variant={row.status === 'Processed' ? 'success' : 'warning'}>{row.status}</Badge>
 ),
 },
 {
 key: 'actions',
 header: 'Actions',
 render: (row) => (
 <div className="flex space-x-2">
 <Button 
 variant="primary"
 size="sm"
 onClick={() => handleView(row)}
 className="bg-[#0078D4] hover:bg-[#005A9E] text-white"
 >
 View
 </Button>
 <Button 
 variant="success"
 size="sm"
 onClick={() => handleDownload(row)}
 className="flex items-center gap-1"
 >
 <DownloadIcon size={14} />
 Download
 </Button>
 </div>
 ),
 },
 ]}
 />
 </Card>

 {/* Payment Breakdown */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card>
 <CardHeader title="Payment Breakdown" subtitle="Current period analysis" />
 <div className="space-y-4">
 <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <span className="text-gray-700 dark:text-gray-300">Total Base Salaries</span>
 <span className="font-bold text-gray-900 dark:text-white">
 ₵{payrollRecords.reduce((sum, r) => sum + r.baseSalary, 0).toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <span className="text-gray-700 dark:text-gray-300">Total Allowances</span>
 <span className="font-bold text-green-600">
 +₵{payrollRecords.reduce((sum, r) => sum + r.allowances, 0).toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <span className="text-gray-700 dark:text-gray-300">Total Deductions</span>
 <span className="font-bold text-red-600">
 -₵{payrollRecords.reduce((sum, r) => sum + r.deductions, 0).toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00A4EF] to-[#0078D4] rounded-sm text-white">
 <span className="font-medium">Net Payroll</span>
 <span className="font-bold text-xl">
 ₵{totalPayroll.toLocaleString()}
 </span>
 </div>
 </div>
 </Card>

 <Card>
 <CardHeader title="Payroll Calendar" subtitle="Important dates" />
 <div className="space-y-3">
 <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-sm">
 <div className="flex-shrink-0 w-12 h-12 bg-[#00A4EF] rounded-sm flex flex-col items-center justify-center text-white">
 <span className="text-xs">Nov</span>
 <span className="text-lg font-bold">25</span>
 </div>
 <div>
 <p className="font-medium text-gray-900 dark:text-white">Payroll Processing</p>
 <p className="text-sm text-gray-600 dark:text-gray-400">Process November payroll</p>
 </div>
 </div>
 <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-sm">
 <div className="flex-shrink-0 w-12 h-12 bg-[#7FBA00] rounded-sm flex flex-col items-center justify-center text-white">
 <span className="text-xs">Nov</span>
 <span className="text-lg font-bold">30</span>
 </div>
 <div>
 <p className="font-medium text-gray-900 dark:text-white">Payment Date</p>
 <p className="text-sm text-gray-600 dark:text-gray-400">Salary disbursement</p>
 </div>
 </div>
 <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-sm">
 <div className="flex-shrink-0 w-12 h-12 bg-[#FFB900] rounded-sm flex flex-col items-center justify-center text-gray-900">
 <span className="text-xs">Dec</span>
 <span className="text-lg font-bold">05</span>
 </div>
 <div>
 <p className="font-medium text-gray-900 dark:text-white">Tax Submission</p>
 <p className="text-sm text-gray-600 dark:text-gray-400">Submit payroll taxes</p>
 </div>
 </div>
 </div>
 </Card>
 </div>

 {/* Process Payroll Modal */}
 <FormModal
 isOpen={isProcessModalOpen}
 onClose={() => setIsProcessModalOpen(false)}
 onSubmit={handleProcessPayroll}
 title="Process Payroll"
 submitText="Process"
 isSubmitting={isSubmitting}
 size="lg"
 >
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Employee
 </label>
 <select
 value={formData.employeeId}
 onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 >
 <option value="">Select Employee</option>
 {payrollRecords.map(record => (
 <option key={record.id} value={record.id}>{record.employeeName}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Pay Period
 </label>
 <input
 type="month"
 value={formData.period}
 onChange={(e) => setFormData({ ...formData, period: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Basic Salary
 </label>
 <input
 type="number"
 value={formData.basicSalary || ''}
 onChange={(e) => setFormData({ ...formData, basicSalary: parseFloat(e.target.value) || 0 })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 min="0"
 step="0.01"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Allowances
 </label>
 <input
 type="number"
 value={formData.allowances || ''}
 onChange={(e) => setFormData({ ...formData, allowances: parseFloat(e.target.value) || 0 })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 min="0"
 step="0.01"
 />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Deductions
 </label>
 <input
 type="number"
 value={formData.deductions || ''}
 onChange={(e) => setFormData({ ...formData, deductions: parseFloat(e.target.value) || 0 })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 min="0"
 step="0.01"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Bonuses
 </label>
 <input
 type="number"
 value={formData.bonuses || ''}
 onChange={(e) => setFormData({ ...formData, bonuses: parseFloat(e.target.value) || 0 })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 min="0"
 step="0.01"
 />
 </div>
 </div>
 
 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
 <div className="flex justify-between items-center">
 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Net Pay:</span>
 <span className="text-lg font-bold text-gray-900 dark:text-white">
 ₵{(formData.basicSalary + formData.allowances + formData.bonuses - formData.deductions).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
 </span>
 </div>
 </div>
 </div>
 </FormModal>

 {/* View Payroll Details Modal */}
 <Modal
 isOpen={isViewModalOpen}
 onClose={() => setIsViewModalOpen(false)}
 title="Payroll Details"
 size="lg"
 >
 {selectedPayroll && (
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Employee</p>
 <p className="font-medium text-gray-900 dark:text-white">{selectedPayroll.employee}</p>
 </div>
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Employee ID</p>
 <p className="font-medium text-gray-900 dark:text-white">{selectedPayroll.id}</p>
 </div>
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Period</p>
 <p className="font-medium text-gray-900 dark:text-white">{selectedPayroll.period}</p>
 </div>
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
 <Badge variant={selectedPayroll.status === 'Processed' ? 'success' : 'warning'}>
 {selectedPayroll.status}
 </Badge>
 </div>
 </div>

 <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
 <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Salary Breakdown</h3>
 <div className="space-y-2">
 <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700/50">
 <span className="text-gray-700 dark:text-gray-300">Basic Salary</span>
 <span className="font-medium text-gray-900 dark:text-white">
 ₵{selectedPayroll.baseSalary.toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between p-2">
 <span className="text-gray-700 dark:text-gray-300">Allowances</span>
 <span className="font-medium text-gray-900 dark:text-white">
 ₵{selectedPayroll.allowances.toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700/50">
 <span className="text-gray-700 dark:text-gray-300">Deductions</span>
 <span className="font-medium text-red-600 dark:text-red-400">
 -₵{selectedPayroll.deductions.toLocaleString()}
 </span>
 </div>
 <div className="flex justify-between p-3 bg-[#00A4EF]/10 border-t-2 border-[#00A4EF]">
 <span className="font-semibold text-gray-900 dark:text-white">Net Pay</span>
 <span className="font-bold text-lg text-gray-900 dark:text-white">
 ₵{selectedPayroll.netPay.toLocaleString()}
 </span>
 </div>
 </div>
 </div>

 <div className="flex gap-2 pt-4">
 <Button variant="primary" className="flex-1">
 Download Payslip
 </Button>
 <Button variant="secondary" className="flex-1">
 Send to Employee
 </Button>
 </div>
 </div>
 )}
 </Modal>

 {/* Download Payslip Modal */}
 <Modal
 isOpen={isDownloadModalOpen}
 onClose={() => setIsDownloadModalOpen(false)}
 title="Download Payslip"
 >
 {selectedPayroll && (
 <div className="space-y-4">
 <p className="text-gray-700 dark:text-gray-300">
 Are you sure you want to download the payslip for <strong>{selectedPayroll.employeeName}</strong>?
 </p>
 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-sm border border-blue-200 dark:border-blue-800">
 <div className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Employee:</span>
 <span className="font-medium text-gray-900 dark:text-white">{selectedPayroll.employeeName}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Period:</span>
 <span className="font-medium text-gray-900 dark:text-white">{selectedPayroll.period}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Net Pay:</span>
 <span className="font-bold text-[#00A4EF]">₵{selectedPayroll.netPay.toLocaleString()}</span>
 </div>
 </div>
 </div>
 <div className="flex gap-3 pt-4">
 <Button 
 variant="secondary" 
 onClick={() => setIsDownloadModalOpen(false)}
 className="flex-1"
 >
 Cancel
 </Button>
 <Button 
 variant="success" 
 onClick={confirmDownload}
 className="flex-1"
 >
 Download
 </Button>
 </div>
 </div>
 )}
 </Modal>

 {/* Print Modal */}
 <Modal
 isOpen={isPrintModalOpen}
 onClose={() => setIsPrintModalOpen(false)}
 title="Print Payroll Records"
 >
 <div className="space-y-4">
 <p className="text-gray-700 dark:text-gray-300">
 This will print all payroll records for the current period.
 </p>
 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <div className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Total Records:</span>
 <span className="font-medium text-gray-900 dark:text-white">{payrollRecords.length}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Period:</span>
 <span className="font-medium text-gray-900 dark:text-white">October 2025</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Total Payroll:</span>
 <span className="font-bold text-[#00A4EF]">₵{totalPayroll.toLocaleString()}</span>
 </div>
 </div>
 </div>
 <div className="flex gap-3 pt-4">
 <Button 
 variant="secondary" 
 onClick={() => setIsPrintModalOpen(false)}
 className="flex-1"
 >
 Cancel
 </Button>
 <Button 
 variant="primary" 
 onClick={confirmPrint}
 className="flex-1"
 >
 Print
 </Button>
 </div>
 </div>
 </Modal>

 {/* Export CSV Modal */}
 <Modal
 isOpen={isExportModalOpen}
 onClose={() => setIsExportModalOpen(false)}
 title="Export to CSV"
 >
 <div className="space-y-4">
 <p className="text-gray-700 dark:text-gray-300">
 Export all payroll records to a CSV file for further analysis.
 </p>
 <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-sm border border-green-200 dark:border-green-800">
 <div className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Records to Export:</span>
 <span className="font-medium text-gray-900 dark:text-white">{payrollRecords.length}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Format:</span>
 <span className="font-medium text-gray-900 dark:text-white">CSV (Comma Separated Values)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">File Name:</span>
 <span className="font-medium text-gray-900 dark:text-white">payroll_october_2025.csv</span>
 </div>
 </div>
 </div>
 <div className="flex gap-3 pt-4">
 <Button 
 variant="secondary" 
 onClick={() => setIsExportModalOpen(false)}
 className="flex-1"
 >
 Cancel
 </Button>
 <Button 
 variant="success" 
 onClick={confirmExportCSV}
 className="flex-1"
 >
 Export CSV
 </Button>
 </div>
 </div>
 </Modal>
 </div>
 );
};

export default PayrollManagement;
