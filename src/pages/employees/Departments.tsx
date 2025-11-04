import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, UsersIcon } from '@/components/Icons';

interface Department {
  id: number;
  name: string;
  headCount: number;
  manager: string;
  budget: string;
  description?: string;
}

export const Departments = () => {
 const [showModal, setShowModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [editingDept, setEditingDept] = useState<Department | null>(null);
 const [deletingDept, setDeletingDept] = useState<Department | null>(null);
 const [formData, setFormData] = useState({ name: '', manager: '', budget: '', description: '' });
 const { addToast } = useToast();
 const { theme } = useTheme();

 const [departments, setDepartments] = useState<Department[]>([
 { id: 1, name: 'Engineering', headCount: 45, manager: 'John Smith', budget: 'GH₵ 2.5M', description: 'Software development and IT infrastructure' },
 { id: 2, name: 'Human Resources', headCount: 12, manager: 'Sarah Johnson', budget: 'GH₵ 800K', description: 'Employee relations and talent management' },
 { id: 3, name: 'Sales', headCount: 28, manager: 'Mike Williams', budget: 'GH₵ 1.2M', description: 'Revenue generation and client acquisition' },
 { id: 4, name: 'Marketing', headCount: 18, manager: 'Emily Brown', budget: 'GH₵ 900K', description: 'Brand development and market strategy' },
 { id: 5, name: 'Finance', headCount: 15, manager: 'David Lee', budget: 'GH₵ 700K', description: 'Financial planning and accounting' },
 ]);

 const handleAdd = () => {
   setEditingDept(null);
   setFormData({ name: '', manager: '', budget: '', description: '' });
   setShowModal(true);
 };

 const handleEdit = (dept: Department) => {
   setEditingDept(dept);
   setFormData({ name: dept.name, manager: dept.manager, budget: dept.budget, description: dept.description || '' });
   setShowModal(true);
 };

 const handleDeleteClick = (dept: Department) => {
   setDeletingDept(dept);
   setShowDeleteModal(true);
 };

 const handleConfirmDelete = () => {
   if (deletingDept) {
     setDepartments(departments.filter(d => d.id !== deletingDept.id));
     addToast('Department deleted successfully', 'success');
     setShowDeleteModal(false);
     setDeletingDept(null);
   }
 };

 const handleSubmit = () => {
   if (!formData.name || !formData.manager || !formData.budget) {
     addToast('Please fill all required fields', 'error');
     return;
   }

   if (editingDept) {
     setDepartments(departments.map(d => d.id === editingDept.id ? { ...d, ...formData } : d));
     addToast('Department updated successfully', 'success');
   } else {
     const newDept: Department = {
       id: departments.length + 1,
       name: formData.name,
       manager: formData.manager,
       budget: formData.budget,
       headCount: 0,
       description: formData.description
     };
     setDepartments([...departments, newDept]);
     addToast('Department created successfully', 'success');
   }
   setShowModal(false);
 };

 return (
 <div className="p-8">
 <div className="flex justify-between items-center mb-8">
 <div>
 <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
 Departments
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage organizational departments</p>
 </div>
 <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
 <PlusIcon size={20} className="mr-2" />
 <span>Add Department</span>
 </Button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {departments.map((dept) => (
 <div
 key={dept.id}
 className={`p-6 border transition-all ${
   theme === 'dark' 
     ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
     : 'bg-white border-gray-200 hover:border-gray-300'
 }`}
 >
 <div className="flex items-center gap-4 mb-4">
 <div className="w-12 h-12 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center">
 <span className="text-white font-bold text-xl">{dept.name.charAt(0)}</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dept.name}</h3>
 <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
   <UsersIcon size={16} />
   <span>{dept.headCount} employees</span>
 </div>
 </div>
 </div>
 {dept.description && (
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dept.description}</p>
 )}
 <div className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Manager:</span>
 <span className="font-medium text-gray-900 dark:text-white">{dept.manager}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-gray-400">Budget:</span>
 <span className="font-medium text-[#7FBA00]">{dept.budget}</span>
 </div>
 </div>
 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
 <Button variant="primary" size="sm" className="flex-1 flex items-center justify-center text-white" onClick={() => handleEdit(dept)}>
   <EditIcon size={16} className="mr-1" />
   <span>Edit</span>
 </Button>
 <Button variant="danger" size="sm" className="flex-1 flex items-center justify-center text-white" onClick={() => handleDeleteClick(dept)}>
   <TrashIcon size={16} className="mr-1" />
   <span>Delete</span>
 </Button>
 </div>
 </div>
 ))}
 </div>

 <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingDept ? 'Edit Department' : 'Add New Department'}>
 <div className="space-y-4">
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department Name *</label>
   <input
     type="text"
     placeholder="e.g., Engineering"
     value={formData.name}
     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
     className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   />
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager Name *</label>
   <input
     type="text"
     placeholder="e.g., John Doe"
     value={formData.manager}
     onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
     className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   />
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget *</label>
   <input
     type="text"
     placeholder="e.g., GH₵ 1.5M"
     value={formData.budget}
     onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
     className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   />
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
   <textarea
     placeholder="Brief description of the department"
     value={formData.description}
     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
     rows={3}
     className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   />
 </div>
 <div className="flex gap-3 pt-4">
 <Button variant="primary" onClick={handleSubmit}>
   {editingDept ? 'Update' : 'Create'}
 </Button>
 <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
 </div>
 </div>
 </Modal>

 <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Department">
 <div className="space-y-4">
   <p className="text-gray-700 dark:text-gray-300">
     Are you sure you want to delete the <strong>{deletingDept?.name}</strong> department? This action cannot be undone.
   </p>
   <div className="flex gap-3 pt-4">
     <Button 
       variant="danger" 
       onClick={handleConfirmDelete}
       className="bg-red-600 hover:bg-red-700 text-white"
     >
       Delete
     </Button>
     <Button 
       variant="secondary" 
       onClick={() => setShowDeleteModal(false)}
     >
       Cancel
     </Button>
   </div>
 </div>
 </Modal>
 </div>
 );
};

export default Departments;
