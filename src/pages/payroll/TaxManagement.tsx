import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { DownloadIcon, ChartIcon, MoneyIcon, UserIcon, BriefcaseIcon } from '@/components/Icons';

interface TaxBracket {
  id: number;
  minIncome: number;
  maxIncome: number | null;
  rate: number;
  description: string;
}

interface EmployeeTax {
  id: number;
  employeeName: string;
  employeeId: string;
  grossSalary: number;
  taxableIncome: number;
  taxAmount: number;
  ssnit: number;
  netSalary: number;
  period: string;
  status: 'Calculated' | 'Filed' | 'Paid';
}

export const TaxManagement = () => {
  const [_showBracketModal, _setShowBracketModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'brackets' | 'employee-tax'>('employee-tax');
  const [calculatorGross, setCalculatorGross] = useState('');
  const [calculatorResult, setCalculatorResult] = useState<any>(null);
  const { addToast } = useToast();
  const { theme } = useTheme();

  // Ghana tax brackets (PAYE) - 2025
  const [taxBrackets] = useState<TaxBracket[]>([
    { id: 1, minIncome: 0, maxIncome: 4380, rate: 0, description: 'Tax-free threshold' },
    { id: 2, minIncome: 4381, maxIncome: 6000, rate: 5, description: 'First bracket' },
    { id: 3, minIncome: 6001, maxIncome: 9600, rate: 10, description: 'Second bracket' },
    { id: 4, minIncome: 9601, maxIncome: 36000, rate: 17.5, description: 'Third bracket' },
    { id: 5, minIncome: 36001, maxIncome: 240000, rate: 25, description: 'Fourth bracket' },
    { id: 6, minIncome: 240001, maxIncome: null, rate: 30, description: 'Highest bracket' }
  ]);

  const [employeeTaxes, _setEmployeeTaxes] = useState<EmployeeTax[]>([
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      grossSalary: 12000,
      taxableIncome: 10440,
      taxAmount: 1523.25,
      ssnit: 660,
      netSalary: 9816.75,
      period: 'November 2025',
      status: 'Filed'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP025',
      grossSalary: 8500,
      taxableIncome: 7805,
      taxAmount: 777.75,
      ssnit: 467.5,
      netSalary: 7254.75,
      period: 'November 2025',
      status: 'Paid'
    },
    {
      id: 3,
      employeeName: 'Mike Williams',
      employeeId: 'EMP042',
      grossSalary: 6000,
      taxableIncome: 5340,
      taxAmount: 48,
      ssnit: 330,
      netSalary: 5622,
      period: 'November 2025',
      status: 'Calculated'
    },
    {
      id: 4,
      employeeName: 'Emily Brown',
      employeeId: 'EMP015',
      grossSalary: 15000,
      taxableIncome: 13650,
      taxAmount: 2217.75,
      ssnit: 825,
      netSalary: 11957.25,
      period: 'November 2025',
      status: 'Filed'
    }
  ]);

  // @ts-ignore
  const calculateTax = (grossSalary: number) => {
    const ssnit = grossSalary * 0.055; // 5.5% SSNIT employee contribution
    const taxableIncome = grossSalary - ssnit - 365; // Monthly relief of GH₵ 365
    
    let tax = 0;
    let remaining = taxableIncome;

    for (const bracket of taxBrackets) {
      if (remaining <= 0) break;
      
      const bracketMin = bracket.minIncome;
      const bracketMax = bracket.maxIncome || Infinity;
      const bracketRange = bracketMax - bracketMin;
      
      if (remaining > bracketMin) {
        const taxableInBracket = Math.min(remaining - bracketMin, bracketRange);
        tax += taxableInBracket * (bracket.rate / 100);
        remaining -= taxableInBracket;
      }
    }

    return {
      taxableIncome,
      taxAmount: tax,
      ssnit,
      netSalary: grossSalary - tax - ssnit
    };
  };

  const handleCalculateTax = () => {
    const gross = parseFloat(calculatorGross);
    if (!gross || gross <= 0) {
      addToast('Please enter a valid gross salary', 'error');
      return;
    }
    const result = calculateTax(gross);
    setCalculatorResult(result);
    addToast('Tax calculated successfully', 'success');
  };

  const handleExportReport = () => {
    addToast('Tax report exported successfully', 'success');
    setShowExportModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Filed': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Calculated': return 'bg-[#FFB900]/20 text-[#FFB900]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    totalTax: employeeTaxes.reduce((sum, e) => sum + e.taxAmount, 0),
    totalSSNIT: employeeTaxes.reduce((sum, e) => sum + e.ssnit, 0),
    totalGross: employeeTaxes.reduce((sum, e) => sum + e.grossSalary, 0),
    totalNet: employeeTaxes.reduce((sum, e) => sum + e.netSalary, 0)
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Tax Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage PAYE and SSNIT contributions</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => setShowCalculatorModal(true)}
            className="flex items-center gap-2"
          >
            <ChartIcon className="w-5 h-5" />
            <span>Tax Calculator</span>
          </Button>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Export Tax Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total PAYE Tax</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">GH₵ {stats.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-3 bg-[#F25022]/10 rounded-lg">
              <MoneyIcon className="w-8 h-8 text-[#F25022]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total SSNIT</div>
              <div className="text-3xl font-bold text-[#00A4EF]">GH₵ {stats.totalSSNIT.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <UserIcon className="w-8 h-8 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gross</div>
              <div className="text-3xl font-bold text-[#7FBA00]">GH₵ {stats.totalGross.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <BriefcaseIcon className="w-8 h-8 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Net</div>
              <div className="text-3xl font-bold text-[#FFB900]">GH₵ {stats.totalNet.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <MoneyIcon className="w-8 h-8 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedTab('employee-tax')}
          className={`px-4 py-2 font-bold transition-colors border-b-2 ${
            selectedTab === 'employee-tax'
              ? 'text-[#00A4EF] border-[#00A4EF]'
              : theme === 'dark' ? 'text-gray-400 border-transparent' : 'text-gray-600 border-transparent'
          }`}
        >
          Employee Tax Records
        </button>
        <button
          onClick={() => setSelectedTab('brackets')}
          className={`px-4 py-2 font-bold transition-colors border-b-2 ${
            selectedTab === 'brackets'
              ? 'text-[#00A4EF] border-[#00A4EF]'
              : theme === 'dark' ? 'text-gray-400 border-transparent' : 'text-gray-600 border-transparent'
          }`}
        >
          Tax Brackets
        </button>
      </div>

      {selectedTab === 'employee-tax' && (
        <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Gross Salary</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">SSNIT (5.5%)</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Taxable Income</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">PAYE Tax</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Net Salary</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
              {employeeTaxes.map((tax) => (
                <tr key={tax.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{tax.employeeName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{tax.employeeId} • {tax.period}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">GH₵ {tax.grossSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">GH₵ {tax.ssnit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">GH₵ {tax.taxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 font-medium text-[#F25022]">GH₵ {tax.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 font-bold text-[#7FBA00]">GH₵ {tax.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(tax.status)}`}>
                      {tax.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTab === 'brackets' && (
        <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ghana PAYE Tax Brackets (2025)</h3>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Income Range (Annual)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Tax Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                {taxBrackets.map((bracket) => (
                  <tr key={bracket.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      GH₵ {bracket.minIncome.toLocaleString()} - {bracket.maxIncome ? `GH₵ ${bracket.maxIncome.toLocaleString()}` : 'Above'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium ${
                        bracket.rate === 0 ? 'bg-[#7FBA00]/20 text-[#7FBA00]' : 
                        bracket.rate <= 10 ? 'bg-[#00A4EF]/20 text-[#00A4EF]' :
                        bracket.rate <= 20 ? 'bg-[#FFB900]/20 text-[#FFB900]' :
                        'bg-[#F25022]/20 text-[#F25022]'
                      }`}>
                        {bracket.rate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{bracket.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tax Calculator Modal */}
      <Modal isOpen={showCalculatorModal} onClose={() => setShowCalculatorModal(false)} title="Tax Calculator">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gross Monthly Salary (GH₵)
            </label>
            <input
              type="number"
              value={calculatorGross}
              onChange={(e) => setCalculatorGross(e.target.value)}
              placeholder="e.g., 5000"
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          
          {calculatorResult && (
            <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Calculation Results</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Gross Salary:</span>
                  <span className="font-medium text-gray-900 dark:text-white">GH₵ {parseFloat(calculatorGross).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">SSNIT (5.5%):</span>
                  <span className="font-medium text-[#00A4EF]">GH₵ {calculatorResult.ssnit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                  <span className="font-medium text-gray-900 dark:text-white">GH₵ {calculatorResult.taxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">PAYE Tax:</span>
                  <span className="font-medium text-[#F25022]">GH₵ {calculatorResult.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300 dark:border-gray-600">
                  <span className="font-bold text-gray-900 dark:text-white">Net Salary:</span>
                  <span className="font-bold text-[#7FBA00] text-lg">GH₵ {calculatorResult.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => {
              setShowCalculatorModal(false);
              setCalculatorGross('');
              setCalculatorResult(null);
            }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCalculateTax} className="flex items-center gap-2">
              <ChartIcon className="w-4 h-4" />
              <span>Calculate Tax</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Export Tax Report Modal */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export Tax Report">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Report Type
            </label>
            <select
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option>Monthly Tax Summary</option>
              <option>Employee Tax Details</option>
              <option>SSNIT Contribution Report</option>
              <option>Tax Bracket Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Period
            </label>
            <input
              type="month"
              defaultValue="2025-11"
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <select
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option>PDF</option>
              <option>Excel (XLSX)</option>
              <option>CSV</option>
            </select>
          </div>

          <div className={`p-4 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              The report will include all employee tax calculations, SSNIT contributions, and tax bracket breakdowns for the selected period.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExportReport} className="flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaxManagement;
