import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useTheme } from '@/contexts/ThemeContext';
import { DownloadIcon, EyeIcon, PrintIcon, SearchIcon, FileTextIcon, CalendarIcon, CheckCircleIcon, ClockIcon } from '@/components/Icons';

interface Payslip {
  id: number;
  period: string;
  month: string;
  year: number;
  employeeName: string;
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'Generated' | 'Sent' | 'Downloaded';
}

export const Payslips = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadPayslip, setDownloadPayslip] = useState<Payslip | null>(null);

  const [payslips] = useState<Payslip[]>([
    { id: 1, period: 'November 2025', month: 'November', year: 2025, employeeName: 'Kwame Mensah', employeeId: 'EMP001', basicSalary: 12000, allowances: 3000, deductions: 1800, netPay: 13200, status: 'Downloaded' },
    { id: 2, period: 'November 2025', month: 'November', year: 2025, employeeName: 'Ama Adjei', employeeId: 'EMP002', basicSalary: 10000, allowances: 2000, deductions: 1500, netPay: 10500, status: 'Sent' },
    { id: 3, period: 'November 2025', month: 'November', year: 2025, employeeName: 'Kofi Asante', employeeId: 'EMP003', basicSalary: 15000, allowances: 4000, deductions: 2200, netPay: 16800, status: 'Generated' },
    { id: 4, period: 'October 2025', month: 'October', year: 2025, employeeName: 'Kwame Mensah', employeeId: 'EMP001', basicSalary: 12000, allowances: 3000, deductions: 1800, netPay: 13200, status: 'Downloaded' },
    { id: 5, period: 'October 2025', month: 'October', year: 2025, employeeName: 'Ama Adjei', employeeId: 'EMP002', basicSalary: 10000, allowances: 2000, deductions: 1500, netPay: 10500, status: 'Downloaded' },
  ]);

  const filteredPayslips = payslips.filter(slip =>
    slip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Downloaded': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Sent': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Generated': return 'bg-[#FFB900]/20 text-[#FFB900]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: payslips.length,
    thisMonth: payslips.filter(p => p.month === 'November' && p.year === 2025).length,
    downloaded: payslips.filter(p => p.status === 'Downloaded').length,
    pending: payslips.filter(p => p.status === 'Generated').length
  };

  const handleView = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setShowDetailsModal(true);
  };

  const handleDownload = (payslip: Payslip) => {
    setDownloadPayslip(payslip);
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    if (downloadPayslip) {
      console.log('Downloading payslip:', downloadPayslip.id);
      setShowDownloadModal(false);
      setDownloadPayslip(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Payslips
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">View and download your payslips</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Payslips</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <FileTextIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.thisMonth}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Downloaded</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.downloaded}</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Download</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.pending}</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <ClockIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by employee name, ID, or period..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Period</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Basic Salary</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Allowances</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Deductions</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Net Pay</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {filteredPayslips.map((slip) => (
              <tr key={slip.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{slip.employeeName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{slip.employeeId}</div>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{slip.period}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">GH₵ {slip.basicSalary.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#7FBA00]">GH₵ {slip.allowances.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#F25022]">GH₵ {slip.deductions.toLocaleString()}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">GH₵ {slip.netPay.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(slip.status)}`}>
                    {slip.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleView(slip)}
                      className="bg-[#0078D4] hover:bg-[#005A9E] text-white flex items-center"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span className="ml-1">View</span>
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleDownload(slip)}
                      className="bg-[#7FBA00] hover:bg-[#6BA100] text-white flex items-center"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span className="ml-1">Download</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayslips.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No payslips found</p>
          </div>
        )}
      </div>

      {selectedPayslip && (
        <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title={`Payslip - ${selectedPayslip.period}`}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Employee Name</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedPayslip.employeeName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Employee ID</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedPayslip.employeeId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Period</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedPayslip.period}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(selectedPayslip.status)}`}>
                  {selectedPayslip.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white">Earnings</h3>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Basic Salary</span>
                <span className="font-medium text-gray-900 dark:text-white">GH₵ {selectedPayslip.basicSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Allowances</span>
                <span className="font-medium text-[#7FBA00]">GH₵ {selectedPayslip.allowances.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-900 dark:text-white">Gross Pay</span>
                <span className="font-bold text-gray-900 dark:text-white">GH₵ {(selectedPayslip.basicSalary + selectedPayslip.allowances).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white">Deductions</h3>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax & SSNIT</span>
                <span className="font-medium text-[#F25022]">GH₵ {selectedPayslip.deductions.toLocaleString()}</span>
              </div>
            </div>

            <div className={`p-4 border-t-2 border-[#00A4EF] ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Net Pay</span>
                <span className="text-2xl font-bold text-[#7FBA00]">GH₵ {selectedPayslip.netPay.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="primary"
                className="bg-[#7FBA00] hover:bg-[#6BA100] text-white flex items-center"
              >
                <DownloadIcon className="w-4 h-4" />
                <span className="ml-2">Download PDF</span>
              </Button>
              <Button 
                variant="primary"
                className="bg-[#0078D4] hover:bg-[#005A9E] text-white flex items-center"
              >
                <PrintIcon className="w-4 h-4" />
                <span className="ml-2">Print</span>
              </Button>
              <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      {downloadPayslip && (
        <Modal 
          isOpen={showDownloadModal} 
          onClose={() => setShowDownloadModal(false)} 
          title="Download Payslip"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to download the payslip for <strong>{downloadPayslip.employeeName}</strong> for the period <strong>{downloadPayslip.period}</strong>?
            </p>
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Employee ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{downloadPayslip.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Net Pay:</span>
                  <span className="font-medium text-[#7FBA00]">GH₵ {downloadPayslip.netPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(downloadPayslip.status)}`}>
                    {downloadPayslip.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowDownloadModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmDownload}
                className="bg-[#7FBA00] hover:bg-[#6BA100] text-white flex items-center"
              >
                <DownloadIcon className="w-4 h-4" />
                <span className="ml-2">Download</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Payslips;
