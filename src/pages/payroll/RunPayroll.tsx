import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlayIcon, CheckIcon, EyeIcon, DownloadIcon, UsersIcon, FileTextIcon, PrintIcon, TrendingUpIcon, MoneyIcon } from '@/components/Icons';

interface PayrollRun {
  id: number;
  period: string;
  month: string;
  year: number;
  employees: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: 'Draft' | 'Processing' | 'Approved' | 'Completed';
  runDate?: string;
  approvedBy?: string;
}

export const RunPayroll = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    year: new Date().getFullYear().toString()
  });

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([
    { id: 1, period: 'November 2025', month: 'November', year: 2025, employees: 145, grossPay: 1850000, deductions: 285000, netPay: 1565000, status: 'Completed', runDate: '2025-11-25', approvedBy: 'Finance Director' },
    { id: 2, period: 'October 2025', month: 'October', year: 2025, employees: 142, grossPay: 1820000, deductions: 280000, netPay: 1540000, status: 'Completed', runDate: '2025-10-25', approvedBy: 'Finance Director' },
    { id: 3, period: 'December 2025', month: 'December', year: 2025, employees: 148, grossPay: 1920000, deductions: 295000, netPay: 1625000, status: 'Approved', runDate: '2025-12-20', approvedBy: 'CFO' },
    { id: 4, period: 'January 2026', month: 'January', year: 2026, employees: 150, grossPay: 1950000, deductions: 300000, netPay: 1650000, status: 'Draft' },
  ]);

  const handleRunPayroll = () => {
    if (!formData.month || !formData.year) {
      addToast('Please select month and year', 'error');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      const newRun: PayrollRun = {
        id: payrollRuns.length + 1,
        period: `${formData.month} ${formData.year}`,
        month: formData.month,
        year: parseInt(formData.year),
        employees: 150,
        grossPay: 1950000,
        deductions: 300000,
        netPay: 1650000,
        status: 'Processing',
        runDate: new Date().toISOString().split('T')[0]
      };
      setPayrollRuns([newRun, ...payrollRuns]);
      addToast('Payroll run initiated successfully', 'success');
      setProcessing(false);
      setShowModal(false);
      setFormData({ month: '', year: new Date().getFullYear().toString() });
    }, 2000);
  };

  const handleApprove = (id: number) => {
    setPayrollRuns(payrollRuns.map(run =>
      run.id === id ? { ...run, status: 'Approved', approvedBy: 'Current User' } : run
    ));
    addToast('Payroll run approved successfully', 'success');
  };

  const handleComplete = (id: number) => {
    setPayrollRuns(payrollRuns.map(run =>
      run.id === id ? { ...run, status: 'Completed' } : run
    ));
    addToast('Payroll run completed successfully', 'success');
  };

  const handleDownload = () => {
    addToast('Downloading payroll report...', 'success');
    setShowDownloadModal(false);
  };

  const handleExportCSV = () => {
    addToast('Exporting to CSV...', 'success');
    setShowExportModal(false);
  };

  const handlePrint = () => {
    addToast('Printing payroll report...', 'success');
    setShowPrintModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Approved': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Processing': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Draft': return 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    totalEmployees: 150,
    thisMonthGross: 1950000,
    thisMonthNet: 1650000,
    pending: payrollRuns.filter(r => r.status === 'Draft' || r.status === 'Processing').length
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Run Payroll
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Process and manage payroll runs</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          <div className="flex items-center gap-2">
            <PlayIcon className="w-5 h-5" />
            <span>Run New Payroll</span>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Employees</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalEmployees}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded">
              <UsersIcon className="w-8 h-8 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month Gross</div>
              <div className="text-3xl font-bold text-[#00A4EF]">GH₵ {stats.thisMonthGross.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded">
              <TrendingUpIcon className="w-8 h-8 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month Net</div>
              <div className="text-3xl font-bold text-[#7FBA00]">GH₵ {stats.thisMonthNet.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded">
              <MoneyIcon className="w-8 h-8 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Runs</div>
              <div className="text-3xl font-bold text-[#FFB900]">{stats.pending}</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded">
              <FileTextIcon className="w-8 h-8 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll Runs</h2>
          <div className="flex gap-2">
            <Button 
              variant="success" 
              size="sm"
              onClick={() => setShowDownloadModal(true)}
            >
              <div className="flex items-center gap-1">
                <DownloadIcon className="w-4 h-4" />
                <span>Download</span>
              </div>
            </Button>
            <Button 
              variant="success" 
              size="sm"
              onClick={() => setShowExportModal(true)}
            >
              <div className="flex items-center gap-1">
                <FileTextIcon className="w-4 h-4" />
                <span>Export CSV</span>
              </div>
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowPrintModal(true)}
            >
              <div className="flex items-center gap-1">
                <PrintIcon className="w-4 h-4" />
                <span>Print</span>
              </div>
            </Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Period</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employees</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Gross Pay</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Deductions</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Net Pay</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {payrollRuns.map((run) => (
              <tr className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{run.period}</div>
                  {run.runDate && <div className="text-sm text-gray-500 dark:text-gray-400">{run.runDate}</div>}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{run.employees}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">GH₵ {run.grossPay.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#F25022]">GH₵ {run.deductions.toLocaleString()}</td>
                <td className="px-6 py-4 font-medium text-[#7FBA00]">GH₵ {run.netPay.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(run.status)}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedRun(run); setShowDetailsModal(true); }}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-[#00A4EF] hover:bg-[#0078D4] transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    {run.status === 'Draft' && (
                      <button
                        onClick={() => handleApprove(run.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-[#7FBA00] hover:bg-[#6BA000] transition-colors"
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                    )}
                    {run.status === 'Approved' && (
                      <button
                        onClick={() => handleComplete(run.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-[#7FBA00] hover:bg-[#6BA000] transition-colors"
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Run New Payroll">
        <div className="space-y-4">
          <div className="p-4 bg-[#00A4EF]/10 border border-[#00A4EF]/30">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This will process payroll for all active employees for the selected period.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month *</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="">Select month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year *</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
          <div className={`p-4 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payroll Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Employees:</span>
                <span className="font-medium text-gray-900 dark:text-white">150</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Gross:</span>
                <span className="font-medium text-gray-900 dark:text-white">GH₵ 1,950,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Deductions:</span>
                <span className="font-medium text-[#F25022]">GH₵ 300,000</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-600">
                <span className="font-medium text-gray-900 dark:text-white">Estimated Net Pay:</span>
                <span className="font-bold text-[#7FBA00]">GH₵ 1,650,000</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleRunPayroll} disabled={processing}>
              {processing ? 'Processing...' : 'Run Payroll'}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)} disabled={processing}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {selectedRun && (
        <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title={`Payroll Run - ${selectedRun.period}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Period</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedRun.period}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Employees</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedRun.employees}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gross Pay</div>
                <div className="font-medium text-gray-900 dark:text-white">GH₵ {selectedRun.grossPay.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Deductions</div>
                <div className="font-medium text-[#F25022]">GH₵ {selectedRun.deductions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Net Pay</div>
                <div className="font-medium text-[#7FBA00]">GH₵ {selectedRun.netPay.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium ${getStatusColor(selectedRun.status)}`}>
                  {selectedRun.status}
                </span>
              </div>
            </div>
            {selectedRun.approvedBy && (
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Approved By</div>
                <div className="font-medium text-gray-900 dark:text-white">{selectedRun.approvedBy}</div>
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button variant="primary">
                <div className="flex items-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  <span>Export Report</span>
                </div>
              </Button>
              <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} title="Download Payroll Report">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Select the format for downloading the payroll report:
          </p>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input type="radio" name="downloadFormat" value="pdf" defaultChecked className="text-[#00A4EF]" />
              <span className="text-gray-900 dark:text-white">PDF Document</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input type="radio" name="downloadFormat" value="excel" className="text-[#00A4EF]" />
              <span className="text-gray-900 dark:text-white">Excel Spreadsheet</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleDownload}>
              <div className="flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                <span>Download</span>
              </div>
            </Button>
            <Button variant="secondary" onClick={() => setShowDownloadModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export to CSV">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Export all payroll data to a CSV file for further analysis.
          </p>
          <div className={`p-4 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Export Options</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-[#00A4EF]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include employee details</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-[#00A4EF]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include deductions breakdown</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-[#00A4EF]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include tax information</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleExportCSV}>
              <div className="flex items-center gap-2">
                <FileTextIcon className="w-4 h-4" />
                <span>Export CSV</span>
              </div>
            </Button>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPrintModal} onClose={() => setShowPrintModal(false)} title="Print Payroll Report">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Configure print settings for the payroll report:
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Orientation</label>
              <select className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paper Size</label>
              <select className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="text-[#00A4EF]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include company header</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handlePrint}>
              <div className="flex items-center gap-2">
                <PrintIcon className="w-4 h-4" />
                <span>Print</span>
              </div>
            </Button>
            <Button variant="secondary" onClick={() => setShowPrintModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RunPayroll;
