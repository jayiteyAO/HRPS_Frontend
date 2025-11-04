import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { formatCurrency } from '@/utils/currency';
import { MoneyIcon, EditIcon, DeleteIcon, AddIcon, UsersIcon, TrendingUpIcon } from '@/components/Icons';

interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  amount: number;
  isPercentage: boolean;
  isTaxable: boolean;
  isFixed: boolean;
}

interface SalaryGrade {
  id: string;
  grade: string;
  level: number;
  basicSalary: number;
  components: SalaryComponent[];
  totalPackage: number;
  employees: number;
}

const SalaryStructure: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<SalaryGrade | null>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [gradeToDelete, setGradeToDelete] = useState<SalaryGrade | null>(null);
  const [showDeleteComponentModal, setShowDeleteComponentModal] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<{ component: SalaryComponent; grade: SalaryGrade } | null>(null);

  const salaryGrades: SalaryGrade[] = [
    {
      id: '1',
      grade: 'Executive',
      level: 1,
      basicSalary: 25000,
      components: [
        { id: 'c1', name: 'Housing Allowance', type: 'earning', amount: 8000, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c2', name: 'Transport Allowance', type: 'earning', amount: 3000, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c3', name: 'Performance Bonus', type: 'earning', amount: 15, isPercentage: true, isTaxable: true, isFixed: false },
        { id: 'c4', name: 'SSNIT', type: 'deduction', amount: 5.5, isPercentage: true, isTaxable: false, isFixed: true },
      ],
      totalPackage: 39750,
      employees: 8
    },
    {
      id: '2',
      grade: 'Senior Management',
      level: 2,
      basicSalary: 18000,
      components: [
        { id: 'c5', name: 'Housing Allowance', type: 'earning', amount: 5000, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c6', name: 'Transport Allowance', type: 'earning', amount: 2000, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c7', name: 'SSNIT', type: 'deduction', amount: 5.5, isPercentage: true, isTaxable: false, isFixed: true },
      ],
      totalPackage: 26375,
      employees: 15
    },
    {
      id: '3',
      grade: 'Mid-Level',
      level: 3,
      basicSalary: 12000,
      components: [
        { id: 'c8', name: 'Transport Allowance', type: 'earning', amount: 1500, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c9', name: 'Lunch Allowance', type: 'earning', amount: 800, isPercentage: false, isTaxable: false, isFixed: true },
        { id: 'c10', name: 'SSNIT', type: 'deduction', amount: 5.5, isPercentage: true, isTaxable: false, isFixed: true },
      ],
      totalPackage: 15640,
      employees: 42
    },
    {
      id: '4',
      grade: 'Junior Staff',
      level: 4,
      basicSalary: 6500,
      components: [
        { id: 'c11', name: 'Transport Allowance', type: 'earning', amount: 800, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c12', name: 'SSNIT', type: 'deduction', amount: 5.5, isPercentage: true, isTaxable: false, isFixed: true },
      ],
      totalPackage: 7892.5,
      employees: 58
    },
    {
      id: '5',
      grade: 'Entry Level',
      level: 5,
      basicSalary: 4200,
      components: [
        { id: 'c13', name: 'Transport Allowance', type: 'earning', amount: 500, isPercentage: false, isTaxable: true, isFixed: true },
        { id: 'c14', name: 'SSNIT', type: 'deduction', amount: 5.5, isPercentage: true, isTaxable: false, isFixed: true },
      ],
      totalPackage: 5441.5,
      employees: 22
    }
  ];

  const handleEdit = (grade: SalaryGrade) => {
    setSelectedGrade(grade);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedGrade(null);
    setShowModal(true);
  };

  const handleDelete = (grade: SalaryGrade) => {
    setGradeToDelete(grade);
    setShowDeleteModal(true);
  };

  const handleDeleteComponent = (component: SalaryComponent, grade: SalaryGrade) => {
    setComponentToDelete({ component, grade });
    setShowDeleteComponentModal(true);
  };

  const handleAddComponent = (grade: SalaryGrade) => {
    setSelectedGrade(grade);
    setShowComponentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
              <MoneyIcon size={28} className="text-[#00A4EF]" />
              Salary Structure Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Define and manage salary grades and components</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <AddIcon size={18} />
            Add Salary Grade
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Grades</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{salaryGrades.length}</div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <MoneyIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Basic Salary</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(salaryGrades.reduce((acc, g) => acc + g.basicSalary, 0) / salaryGrades.length)}
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUpIcon size={24} className="text-[#8661C5]" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highest Package</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(Math.max(...salaryGrades.map(g => g.totalPackage)))}
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <MoneyIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Employees</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {salaryGrades.reduce((acc, g) => acc + g.employees, 0)}
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <UsersIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Salary Grades Table */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader title="Salary Grades" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Components</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Total Package</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {salaryGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900 dark:text-white">{grade.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">{grade.level}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900 dark:text-white">{formatCurrency(grade.basicSalary)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.components.filter(c => c.type === 'earning').length} earnings, {grade.components.filter(c => c.type === 'deduction').length} deductions
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-[#7FBA00]">{formatCurrency(grade.totalPackage)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 dark:text-white">{grade.employees}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(grade)}
                        className="flex items-center gap-1"
                      >
                        <EditIcon size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(grade)}
                        className="flex items-center gap-1"
                      >
                        <DeleteIcon size={16} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Salary Components by Grade */}
      {salaryGrades.map((grade) => (
        <Card key={grade.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader 
            title={`${grade.grade} - Components Breakdown`}
            action={
              <Button size="sm" onClick={() => handleAddComponent(grade)} className="flex items-center gap-2">
                <AddIcon size={16} />
                Add Component
              </Button>
            }
          />
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Earnings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {grade.components.filter(c => c.type === 'earning').map((comp) => (
                  <div key={comp.id} className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 relative group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{comp.name}</div>
                      {comp.isTaxable && <Badge variant="warning" size="sm">Taxable</Badge>}
                    </div>
                    <div className="text-lg font-bold text-[#7FBA00]">
                      {comp.isPercentage ? `${comp.amount}%` : formatCurrency(comp.amount)}
                    </div>
                    {comp.isPercentage && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        ≈ {formatCurrency((grade.basicSalary * comp.amount) / 100)}
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteComponent(comp, grade)}
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded"
                      title="Remove component"
                    >
                      <DeleteIcon size={14} className="text-[#F25022]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Deductions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {grade.components.filter(c => c.type === 'deduction').map((comp) => (
                  <div key={comp.id} className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 relative group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">{comp.name}</div>
                      {comp.isFixed && <Badge variant="info" size="sm">Fixed</Badge>}
                    </div>
                    <div className="text-lg font-bold text-[#F25022]">
                      {comp.isPercentage ? `${comp.amount}%` : formatCurrency(comp.amount)}
                    </div>
                    {comp.isPercentage && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        ≈ {formatCurrency((grade.basicSalary * comp.amount) / 100)}
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteComponent(comp, grade)}
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded"
                      title="Remove component"
                    >
                      <DeleteIcon size={14} className="text-[#F25022]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Edit/Add Grade Modal */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedGrade ? 'Edit Salary Grade' : 'Add Salary Grade'}>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade Name</label>
              <input
                type="text"
                defaultValue={selectedGrade?.grade || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
              <input
                type="number"
                defaultValue={selectedGrade?.level || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Basic Salary (GH₵)</label>
              <input
                type="number"
                defaultValue={selectedGrade?.basicSalary || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save Grade</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Grade Modal */}
      {showDeleteModal && gradeToDelete && (
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Salary Grade">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete the <strong>{gradeToDelete.grade}</strong> salary grade? 
              This action will affect <strong>{gradeToDelete.employees}</strong> employees and cannot be undone.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Warning: Deleting this salary grade may require reassigning affected employees to a different grade.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setGradeToDelete(null);
                }}
              >
                Delete Grade
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Component Modal */}
      {showComponentModal && selectedGrade && (
        <Modal isOpen={showComponentModal} onClose={() => setShowComponentModal(false)} title={`Add Component to ${selectedGrade.grade}`}>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Component Name</label>
              <input
                type="text"
                placeholder="e.g., Housing Allowance"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]">
                <option value="earning">Earning</option>
                <option value="deduction">Deduction</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A4EF]">
                  <option value="fixed">Fixed Amount (GH₵)</option>
                  <option value="percentage">Percentage (%)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Is Taxable</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Is Fixed (applies to all employees in this grade)</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowComponentModal(false)}>Cancel</Button>
              <Button onClick={() => setShowComponentModal(false)}>Add Component</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Component Modal */}
      {showDeleteComponentModal && componentToDelete && (
        <Modal isOpen={showDeleteComponentModal} onClose={() => setShowDeleteComponentModal(false)} title="Remove Component">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to remove <strong>{componentToDelete.component.name}</strong> from the <strong>{componentToDelete.grade.grade}</strong> salary grade?
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{componentToDelete.component.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {componentToDelete.component.type === 'earning' ? 'Earning' : 'Deduction'} • 
                    {componentToDelete.component.isPercentage 
                      ? ` ${componentToDelete.component.amount}%` 
                      : ` ${formatCurrency(componentToDelete.component.amount)}`
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowDeleteComponentModal(false)}>Cancel</Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setShowDeleteComponentModal(false);
                  setComponentToDelete(null);
                }}
              >
                Remove Component
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SalaryStructure;
