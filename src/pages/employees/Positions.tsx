import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, } from '@/components/Icons';

interface Position {
  id: number;
  title: string;
  department: string;
  level: string;
  count: number;
  salary: string;
  description?: string;
}

export const Positions = () => {
 const [showModal, setShowModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [editingPos, setEditingPos] = useState<Position | null>(null);
 const [deletingPos, setDeletingPos] = useState<Position | null>(null);
 const [formData, setFormData] = useState({ title: '', department: '', level: 'Mid', salary: '', description: '' });
 const { addToast } = useToast();
 const { theme } = useTheme();

 const [positions, setPositions] = useState<Position[]>([
 { id: 1, title: 'Senior Software Engineer', department: 'Engineering', level: 'Senior', count: 12, salary: 'GH₵ 8,500', description: 'Lead development projects and mentor junior developers' },
 { id: 2, title: 'Product Manager', department: 'Product', level: 'Mid', count: 8, salary: 'GH₵ 7,200', description: 'Define product strategy and roadmap' },
 { id: 3, title: 'HR Specialist', department: 'Human Resources', level: 'Junior', count: 5, salary: 'GH₵ 4,500', description: 'Support recruitment and employee relations' },
 { id: 4, title: 'Sales Executive', department: 'Sales', level: 'Mid', count: 15, salary: 'GH₵ 6,000', description: 'Drive revenue through client acquisition' },
 { id: 5, title: 'Marketing Coordinator', department: 'Marketing', level: 'Junior', count: 6, salary: 'GH₵ 4,200', description: 'Execute marketing campaigns' },
 ]);

 const handleAdd = () => {
   setEditingPos(null);
   setFormData({ title: '', department: '', level: 'Mid', salary: '', description: '' });
   setShowModal(true);
 };

 const handleEdit = (pos: Position) => {
   setEditingPos(pos);
   setFormData({ title: pos.title, department: pos.department, level: pos.level, salary: pos.salary, description: pos.description || '' });
   setShowModal(true);
 };

 const handleDeleteClick = (pos: Position) => {
   setDeletingPos(pos);
   setShowDeleteModal(true);
 };

 const confirmDelete = () => {
   if (deletingPos) {
     setPositions(positions.filter(p => p.id !== deletingPos.id));
     addToast('Position deleted successfully', 'success');
     setShowDeleteModal(false);
     setDeletingPos(null);
   }
 };

 const handleSubmit = () => {
   if (!formData.title || !formData.department || !formData.salary) {
     addToast('Please fill all required fields', 'error');
     return;
   }

   if (editingPos) {
     setPositions(positions.map(p => p.id === editingPos.id ? { ...p, ...formData } : p));
     addToast('Position updated successfully', 'success');
   } else {
     const newPos: Position = {
       id: positions.length + 1,
       ...formData,
       count: 0
     };
     setPositions([...positions, newPos]);
     addToast('Position created successfully', 'success');
   }
   setShowModal(false);
 };

 return (
 <div className="p-8">
 <div className="flex justify-between items-center mb-8">
 <div>
 <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
 Job Positions
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage job roles and positions</p>
 </div>
 <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
 <PlusIcon size={20} className="mr-2" />
 <span>Add Position</span>
 </Button>
 </div>

 <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
 <table className="w-full">
 <thead>
 <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Position Title</th>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Department</th>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Level</th>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Salary</th>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Headcount</th>
 <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
 </tr>
 </thead>
 <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
 {positions.map((position) => (
 <tr key={position.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
 <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{position.title}</td>
 <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{position.department}</td>
 <td className="px-6 py-4">
 <span className={`px-3 py-1 text-xs font-medium ${
 position.level === 'Senior' ? 'bg-[#7FBA00]/20 text-[#7FBA00]' :
 position.level === 'Mid' ? 'bg-[#FFB900]/20 text-[#FFB900]' :
 'bg-[#00A4EF]/20 text-[#00A4EF]'
 }`}>
 {position.level}
 </span>
 </td>
 <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{position.salary}</td>
 <td className="px-6 py-4 text-gray-900 dark:text-white">{position.count}</td>
 <td className="px-6 py-4">
 <div className="flex gap-2">
 <button
   onClick={() => handleEdit(position)}
   className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
     theme === 'dark'
       ? 'bg-[#00A4EF]/10 text-[#00A4EF] hover:bg-[#00A4EF]/20'
       : 'bg-[#0078D4]/10 text-[#0078D4] hover:bg-[#0078D4]/20'
   }`}
   title="Edit Position"
 >
   <EditIcon size={18} />
   <span>Edit</span>
 </button>
 <button
   onClick={() => handleDeleteClick(position)}
   className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
     theme === 'dark'
       ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
       : 'bg-red-50 text-red-600 hover:bg-red-100'
   }`}
   title="Delete Position"
 >
   <TrashIcon size={18} />
   <span>Delete</span>
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingPos ? 'Edit Position' : 'Add New Position'}>
 <div className="space-y-6">
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position Title *</label>
   <input
     type="text"
     placeholder="e.g., Senior Software Engineer"
     value={formData.title}
     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
     className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
   />
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
   <select
     value={formData.department}
     onChange={(e) => setFormData({ ...formData, department: e.target.value })}
     className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   >
     <option value="" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Select department</option>
     <option value="Engineering" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Engineering</option>
     <option value="Human Resources" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Human Resources</option>
     <option value="Sales" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Sales</option>
     <option value="Marketing" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Marketing</option>
     <option value="Finance" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Finance</option>
     <option value="Product" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Product</option>
   </select>
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level *</label>
   <select
     value={formData.level}
     onChange={(e) => setFormData({ ...formData, level: e.target.value })}
     className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
   >
     <option value="Junior" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Junior</option>
     <option value="Mid" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Mid</option>
     <option value="Senior" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Senior</option>
     <option value="Lead" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Lead</option>
     <option value="Manager" className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>Manager</option>
   </select>
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary Range *</label>
   <input
     type="text"
     placeholder="e.g., GH₵ 5,000 - GH₵ 8,000"
     value={formData.salary}
     onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
     className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
   />
 </div>
 <div>
   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
   <textarea
     placeholder="Job description and responsibilities"
     value={formData.description}
     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
     rows={4}
     className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent transition-all resize-none ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
   />
 </div>
 <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
 <Button 
   variant="primary" 
   onClick={handleSubmit} 
   className="flex-1 font-medium bg-[#0078D4] hover:bg-[#005A9E] text-white"
 >
   {editingPos ? 'Update Position' : 'Create Position'}
 </Button>
 <Button 
   variant="secondary" 
   onClick={() => setShowModal(false)} 
   className="flex-1 font-medium"
 >
   Cancel
 </Button>
 </div>
 </div>
 </Modal>

 <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Position">
 <div className="space-y-6">
   <div className={`p-4 border-l-4 border-red-500 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
     <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
       Are you sure you want to delete the position <strong className={theme === 'dark' ? 'text-red-200' : 'text-red-900'}>{deletingPos?.title}</strong>?
       This action cannot be undone.
     </p>
   </div>
   <div className="flex gap-3 pt-2">
     <Button 
       variant="danger" 
       onClick={confirmDelete}
       className="flex-1 font-medium"
     >
       Delete
     </Button>
     <Button 
       variant="secondary" 
       onClick={() => setShowDeleteModal(false)} 
       className="flex-1 font-medium"
     >
       Cancel
     </Button>
   </div>
 </div>
 </Modal>
 </div>
 );
};

export default Positions;
