import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { useToast } from '@/components/ToastContainer';
import { PlusIcon, EditIcon, DeleteIcon, EyeIcon, SearchIcon, CalendarIcon, MoneyIcon } from '@/components/Icons';
import { employeeDatabase, type Employee } from '@/data/employees';

interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
}

export const EmployeeList: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    status: 'Active',
    joinDate: '',
  });

  const [employees, setEmployees] = useState<Employee[]>(employeeDatabase);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAdd = () => {
    setFormData({ name: '', email: '', department: '', position: '', salary: '', status: 'Active', joinDate: '' });
    setShowAddModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary.toString(),
      status: employee.status,
      joinDate: employee.joinDate,
    });
    setShowEditModal(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: employees.length + 1,
      name: formData.name,
      email: formData.email,
      phone: '+233 XX XXX XXXX',
      department: formData.department,
      position: formData.position,
      salary: parseFloat(formData.salary),
      status: formData.status,
      joinDate: formData.joinDate,
      employeeId: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      nationality: 'Ghanaian',
      maritalStatus: 'Single',
      address: 'Address not provided',
      city: 'Accra',
      location: 'Accra, Ghana',
      employmentType: 'Full-time',
      bankAccount: '',
      bankName: '',
      manager: 'Not assigned',
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    addToast('Employee added successfully!', 'success');
  };

  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === selectedEmployee.id
          ? { ...emp, ...formData, salary: parseFloat(formData.salary) }
          : emp
      ));
      setShowEditModal(false);
      addToast('Employee updated successfully!', 'success');
    }
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      addToast('Employee deleted successfully!', 'success');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#7FBA00] text-white';
      case 'On Leave': return 'bg-[#FFB900] text-white';
      case 'Terminated': return 'bg-[#F25022] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const avgSalary = Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent mb-2">
              Employee Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your workforce efficiently</p>
          </div>
          <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
            <PlusIcon size={20} className="mr-2" />
            <span>Add Employee</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-sm bg-[#00A4EF]/10 flex items-center justify-center">
                <PlusIcon size={24} className="text-[#00A4EF]" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">All registered staff</p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-sm bg-[#7FBA00]/10 flex items-center justify-center">
                <EyeIcon size={24} className="text-[#7FBA00]" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{activeEmployees}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Currently working</p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-sm bg-[#FFB900]/10 flex items-center justify-center">
                <CalendarIcon size={24} className="text-[#FFB900]" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{onLeave}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">On Leave</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Temporary absence</p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-sm bg-[#0078D4]/10 flex items-center justify-center">
                <MoneyIcon size={24} className="text-[#0078D4]" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">GH₵{avgSalary.toLocaleString()}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Salary</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Monthly average</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm mb-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="p-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees by name, email, department, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent rounded-sm`}
              />
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-sm flex items-center justify-center bg-gradient-to-br from-[#00A4EF] to-[#0078D4] text-white font-bold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => navigate(`/employees/profile/${employee.id}`)}
                          className="text-sm font-medium text-[#00A4EF] hover:text-[#0078D4] hover:underline transition-colors text-left"
                        >
                          {employee.name}
                        </button>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/employees/profile/${employee.id}`)}
                        className="text-[#00A4EF] hover:text-[#0078D4] transition-colors flex items-center gap-1"
                        title="View Details"
                      >
                        <EyeIcon size={18} />
                        <span className="text-xs">View</span>
                      </button>
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-[#7FBA00] hover:text-[#6A9E00] transition-colors"
                        title="Edit"
                      >
                        <EditIcon size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
                        className="text-[#F25022] hover:text-[#D43F1A] transition-colors"
                        title="Delete"
                      >
                        <DeleteIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No employees found</p>
            </div>
          )}

          {/* Pagination */}
          {filteredEmployees.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredEmployees.length)}</span> of{' '}
                  <span className="font-medium">{filteredEmployees.length}</span> results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === 1
                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    First
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === 1
                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-1 text-sm border ${
                            currentPage === page
                              ? 'bg-[#00A4EF] border-[#00A4EF] text-white'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === totalPages
                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === totalPages
                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Employee</h2>
            </div>
            <form onSubmit={submitAdd} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary (GHS)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'On Leave' | 'Terminated' })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button type="submit" variant="primary" size="lg">Add Employee</Button>
                <Button type="button" variant="secondary" size="lg" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Employee</h2>
            </div>
            <form onSubmit={submitEdit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary (GHS)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'On Leave' | 'Terminated' })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    required
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent`}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button type="submit" variant="primary" size="lg">Save Changes</Button>
                <Button type="button" variant="secondary" size="lg" onClick={() => setShowEditModal(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md w-full`}>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Delete Employee</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{selectedEmployee.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <Button variant="danger" size="lg" onClick={confirmDelete}>Delete</Button>
                <Button variant="secondary" size="lg" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
