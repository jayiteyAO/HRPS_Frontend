import { useState } from 'react';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { SearchIcon, EmployeeIcon } from '@/components/Icons';
import { FormModal } from '@/components/FormModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { employees } from '@/data/mockData';
import { showToast } from '@/components/Toast';

interface EmployeeFormData {
 id: string;
 name: string;
 email: string;
 role: string;
 department: string;
 location: string;
 phone: string;
 hireDate: string;
 status: string;
}

const EmployeeManagement: React.FC = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedDepartment, setSelectedDepartment] = useState('All');
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [formData, setFormData] = useState<EmployeeFormData>({
 id: '',
 name: '',
 email: '',
 role: '',
 department: '',
 location: '',
 phone: '',
 hireDate: '',
 status: 'Active',
 });

 const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

 const filteredEmployees = employees.filter(emp => {
 const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
 emp.id.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
 return matchesSearch && matchesDepartment;
 });

 const handleAdd = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 setTimeout(() => {
 showToast('Employee added successfully!', 'success');
 setIsSubmitting(false);
 setIsAddModalOpen(false);
 setFormData({
 id: '',
 name: '',
 email: '',
 role: '',
 department: '',
 location: '',
 phone: '',
 hireDate: '',
 status: 'Active',
 });
 }, 1000);
 };

 const handleEdit = (employee: any) => {
 setSelectedEmployee(employee);
 setFormData({
 id: employee.id,
 name: employee.name,
 email: employee.email,
 role: employee.role,
 department: employee.department,
 location: employee.location,
 phone: employee.phone || '',
 hireDate: employee.hireDate,
 status: employee.status,
 });
 setIsEditModalOpen(true);
 };

 const handleUpdate = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 setTimeout(() => {
 showToast('Employee updated successfully!', 'success');
 setIsSubmitting(false);
 setIsEditModalOpen(false);
 }, 1000);
 };

 const handleDeleteClick = (employee: any) => {
 setSelectedEmployee(employee);
 setIsDeleteModalOpen(true);
 };

 const handleDelete = () => {
 setIsSubmitting(true);
 
 setTimeout(() => {
 showToast('Employee deleted successfully!', 'success');
 setIsSubmitting(false);
 setIsDeleteModalOpen(false);
 setSelectedEmployee(null);
 }, 1000);
 };

 return (
 <div className="space-y-6">
 {/* Page Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
 <EmployeeIcon size={32} className="text-[#00A4EF]" />
 Employee Management
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-1">
 Manage and view employee information
 </p>
 </div>
 <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
 + Add Employee
 </Button>
 </div>

 {/* Filters */}
 <Card>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="relative">
 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
 <input
 type="text"
 placeholder="Search employees..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 />
 </div>
 <div>
 <select
 value={selectedDepartment}
 onChange={(e) => setSelectedDepartment(e.target.value)}
 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 >
 {departments.map(dept => (
 <option key={dept} value={dept}>{dept}</option>
 ))}
 </select>
 </div>
 </div>
 </Card>

 {/* Stats Cards */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{employees.length}</p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
 <p className="text-2xl font-bold text-green-600 mt-1">
 {employees.filter(e => e.status === 'Active').length}
 </p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Departments</p>
 <p className="text-2xl font-bold text-[#00A4EF] mt-1">{departments.length - 1}</p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Tenure</p>
 <p className="text-2xl font-bold text-[#7FBA00] mt-1">2.3 yrs</p>
 </Card>
 </div>

 {/* Employee Table */}
 <Card>
 <CardHeader
 title="Employee Directory"
 subtitle={`${filteredEmployees.length} employees found`}
 />
 <Table
 data={filteredEmployees}
 columns={[
 {
 key: 'employee',
 header: 'Employee',
 render: (row) => (
 <div className="flex items-center space-x-3">
 <div className="w-10 h-10 rounded bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white font-semibold text-sm">
 {row.avatar}
 </div>
 <div>
 <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
 <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
 </div>
 </div>
 ),
 },
 {
 key: 'id',
 header: 'Employee ID',
 render: (row) => (
 <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{row.id}</span>
 ),
 },
 {
 key: 'role',
 header: 'Role',
 },
 {
 key: 'department',
 header: 'Department',
 render: (row) => (
 <Badge variant="info">{row.department}</Badge>
 ),
 },
 {
 key: 'location',
 header: 'Location',
 },
 {
 key: 'hireDate',
 header: 'Hire Date',
 },
 {
 key: 'status',
 header: 'Status',
 render: (row) => (
 <Badge variant={row.status === 'Active' ? 'success' : 'danger'}>
 {row.status}
 </Badge>
 ),
 },
 {
 key: 'actions',
 header: 'Actions',
 render: (row) => (
 <div className="flex space-x-2">
 <Button 
 variant="ghost" 
 size="sm"
 onClick={() => handleEdit(row)}
 >
 Edit
 </Button>
 <Button 
 variant="danger" 
 size="sm"
 onClick={() => handleDeleteClick(row)}
 >
 Delete
 </Button>
 </div>
 ),
 },
 ]}
 />
 </Card>

 {/* Add Employee Modal */}
 <FormModal
 isOpen={isAddModalOpen}
 onClose={() => setIsAddModalOpen(false)}
 onSubmit={handleAdd}
 title="Add New Employee"
 submitText="Add Employee"
 isSubmitting={isSubmitting}
 >
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Employee ID
 </label>
 <input
 type="text"
 value={formData.id}
 onChange={(e) => setFormData({ ...formData, id: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Full Name
 </label>
 <input
 type="text"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Email
 </label>
 <input
 type="email"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Phone
 </label>
 <input
 type="tel"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Role
 </label>
 <input
 type="text"
 value={formData.role}
 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Department
 </label>
 <select
 value={formData.department}
 onChange={(e) => setFormData({ ...formData, department: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 >
 <option value="">Select Department</option>
 <option value="Engineering">Engineering</option>
 <option value="HR">HR</option>
 <option value="Finance">Finance</option>
 <option value="Marketing">Marketing</option>
 <option value="Sales">Sales</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Location
 </label>
 <input
 type="text"
 value={formData.location}
 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Hire Date
 </label>
 <input
 type="date"
 value={formData.hireDate}
 onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div className="col-span-2">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Status
 </label>
 <select
 value={formData.status}
 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 >
 <option value="Active">Active</option>
 <option value="Inactive">Inactive</option>
 </select>
 </div>
 </div>
 </FormModal>

 {/* Edit Employee Modal */}
 <FormModal
 isOpen={isEditModalOpen}
 onClose={() => setIsEditModalOpen(false)}
 onSubmit={handleUpdate}
 title="Edit Employee"
 submitText="Update Employee"
 isSubmitting={isSubmitting}
 >
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Employee ID
 </label>
 <input
 type="text"
 value={formData.id}
 onChange={(e) => setFormData({ ...formData, id: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 disabled
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Full Name
 </label>
 <input
 type="text"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Email
 </label>
 <input
 type="email"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Phone
 </label>
 <input
 type="tel"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Role
 </label>
 <input
 type="text"
 value={formData.role}
 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Department
 </label>
 <select
 value={formData.department}
 onChange={(e) => setFormData({ ...formData, department: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 >
 <option value="">Select Department</option>
 <option value="Engineering">Engineering</option>
 <option value="HR">HR</option>
 <option value="Finance">Finance</option>
 <option value="Marketing">Marketing</option>
 <option value="Sales">Sales</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Location
 </label>
 <input
 type="text"
 value={formData.location}
 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Hire Date
 </label>
 <input
 type="date"
 value={formData.hireDate}
 onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 required
 />
 </div>
 <div className="col-span-2">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Status
 </label>
 <select
 value={formData.status}
 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent dark:bg-gray-700 dark:text-white"
 >
 <option value="Active">Active</option>
 <option value="Inactive">Inactive</option>
 </select>
 </div>
 </div>
 </FormModal>

 {/* Delete Confirmation Modal */}
 <ConfirmModal
 isOpen={isDeleteModalOpen}
 onClose={() => setIsDeleteModalOpen(false)}
 onConfirm={handleDelete}
 title="Delete Employee"
 message={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
 confirmText="Delete"
 cancelText="Cancel"
 variant="danger"
 isProcessing={isSubmitting}
 />
 </div>
 );
};

export default EmployeeManagement;
