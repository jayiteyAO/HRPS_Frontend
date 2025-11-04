import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, ClockIcon, UsersIcon, CheckCircleIcon } from '@/components/Icons';

interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  department: string;
  employees: number;
  daysOfWeek: string[];
  status: 'active' | 'inactive';
}

export const Shifts = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<number | null>(null);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    startTime: '', 
    endTime: '', 
    department: '', 
    daysOfWeek: [] as string[]
  });
  const { addToast } = useToast();
  const { theme } = useTheme();

  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, name: 'Morning Shift', startTime: '08:00', endTime: '16:00', department: 'All', employees: 45, daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], status: 'active' },
    { id: 2, name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', department: 'Support', employees: 22, daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], status: 'active' },
    { id: 3, name: 'Night Shift', startTime: '22:00', endTime: '06:00', department: 'Operations', employees: 15, daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], status: 'active' },
    { id: 4, name: 'Weekend Shift', startTime: '09:00', endTime: '17:00', department: 'Sales', employees: 12, daysOfWeek: ['Sat', 'Sun'], status: 'active' },
  ]);

  const totalShifts = shifts.length;
  const activeShifts = shifts.filter(s => s.status === 'active').length;
  const totalEmployees = shifts.reduce((sum, s) => sum + s.employees, 0);

  const handleAdd = () => {
    setEditingShift(null);
    setFormData({ name: '', startTime: '', endTime: '', department: '', daysOfWeek: [] });
    setShowModal(true);
  };

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    setFormData({ 
      name: shift.name, 
      startTime: shift.startTime, 
      endTime: shift.endTime, 
      department: shift.department,
      daysOfWeek: shift.daysOfWeek 
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setShiftToDelete(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (shiftToDelete) {
      setShifts(shifts.filter(s => s.id !== shiftToDelete));
      addToast('Shift deleted successfully', 'success');
      setDeleteModal(false);
      setShiftToDelete(null);
    }
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day) 
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.startTime || !formData.endTime || !formData.department || formData.daysOfWeek.length === 0) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    if (editingShift) {
      setShifts(shifts.map(s => s.id === editingShift.id ? { ...s, ...formData, employees: s.employees } : s));
      addToast('Shift updated successfully', 'success');
    } else {
      const newShift: Shift = {
        id: shifts.length + 1,
        ...formData,
        employees: 0,
        status: 'active'
      };
      setShifts([...shifts, newShift]);
      addToast('Shift created successfully', 'success');
    }
    setShowModal(false);
  };

 return (
 <div className="p-8">
 <div className="flex justify-between items-center mb-8">
   <div>
     <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
       Shifts
     </h1>
     <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage and view work shifts</p>
   </div>
   <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center gap-2">
     <PlusIcon className="w-5 h-5" />
     <span>Add Shift</span>
   </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
 <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
 <div className="flex items-start justify-between">
   <div className="flex-1">
     <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Shifts</div>
     <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalShifts}</div>
     <div className="text-sm text-[#7FBA00] mt-2 flex items-center gap-1">
       <CheckCircleIcon className="w-4 h-4" />
       Active configurations
     </div>
   </div>
   <div className="w-12 h-12 bg-[#7FBA00]/10 flex items-center justify-center">
     <ClockIcon className="w-6 h-6 text-[#7FBA00]" />
   </div>
 </div>
 </div>
 <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
 <div className="flex items-start justify-between">
   <div className="flex-1">
     <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Shifts</div>
     <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeShifts}</div>
     <div className="text-sm text-[#00A4EF] mt-2">{((activeShifts/totalShifts)*100).toFixed(0)}% operational</div>
   </div>
   <div className="w-12 h-12 bg-[#00A4EF]/10 flex items-center justify-center">
     <CheckCircleIcon className="w-6 h-6 text-[#00A4EF]" />
   </div>
 </div>
 </div>
 <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
 <div className="flex items-start justify-between">
   <div className="flex-1">
     <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Employees</div>
     <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalEmployees}</div>
     <div className="text-sm text-[#FFB900] mt-2">Across all shifts</div>
   </div>
   <div className="w-12 h-12 bg-[#FFB900]/10 flex items-center justify-center">
     <UsersIcon className="w-6 h-6 text-[#FFB900]" />
   </div>
 </div>
 </div>
 </div>

 <div className={`p-8 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   {shifts.map(shift => (
     <div 
       key={shift.id} 
       className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
     >
       <div className="flex justify-between items-start mb-4">
         <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">{shift.name}</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">{shift.department}</p>
         </div>
         <span className={`px-3 py-1 text-xs font-medium ${shift.status === 'active' ? 'bg-[#7FBA00]/20 text-[#7FBA00]' : 'bg-gray-300 text-gray-700'}`}>
           {shift.status}
         </span>
       </div>
       <div className="space-y-2 mb-4">
         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
           <ClockIcon className="w-4 h-4" />
           <span>{shift.startTime} - {shift.endTime}</span>
         </div>
         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
           <span className="font-medium">{shift.employees} employees</span>
         </div>
       </div>
       <div className="flex flex-wrap gap-2 mb-4">
         {shift.daysOfWeek.map(day => (
           <span key={day} className="px-2 py-1 text-xs bg-[#00A4EF]/20 text-[#00A4EF] font-medium">
             {day}
           </span>
         ))}
       </div>
       <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
         <Button variant="primary" size="sm" className="flex-1 flex items-center justify-center gap-2" onClick={() => handleEdit(shift)}>
           <EditIcon className="w-4 h-4" />
           <span>Edit</span>
         </Button>
         <Button variant="danger" size="sm" className="flex-1 flex items-center justify-center gap-2" onClick={() => handleDelete(shift.id)}>
           <TrashIcon className="w-4 h-4" />
           <span>Delete</span>
         </Button>
       </div>
     </div>
   ))}
 </div>
 </div>

 <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingShift ? 'Edit Shift' : 'Add New Shift'}>
 <div className="space-y-4">
   <div>
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shift Name *</label>
     <input
       type="text"
       placeholder="e.g., Morning Shift"
       value={formData.name}
       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
       className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
     />
   </div>
   <div className="grid grid-cols-2 gap-4">
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
       <input
         type="time"
         value={formData.startTime}
         onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
       <input
         type="time"
         value={formData.endTime}
         onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       />
     </div>
   </div>
   <div>
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
     <select
       value={formData.department}
       onChange={(e) => setFormData({ ...formData, department: e.target.value })}
       className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
     >
       <option value="">Select department</option>
       <option value="All">All Departments</option>
       <option value="Engineering">Engineering</option>
       <option value="Support">Support</option>
       <option value="Operations">Operations</option>
       <option value="Sales">Sales</option>
     </select>
   </div>
   <div>
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Days of Week *</label>
     <div className="flex flex-wrap gap-2">
       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
         <button
           key={day}
           type="button"
           onClick={() => toggleDay(day)}
           className={`px-4 py-2 border font-medium transition-colors ${
             formData.daysOfWeek.includes(day)
               ? 'bg-[#00A4EF] text-white border-[#00A4EF]'
               : theme === 'dark' 
                 ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                 : 'border-gray-300 text-gray-700 hover:border-gray-400'
           }`}
         >
           {day}
         </button>
       ))}
     </div>
   </div>
   <div className="flex gap-3 pt-4">
     <Button variant="primary" onClick={handleSubmit} className="flex items-center gap-2">
       <CheckCircleIcon className="w-4 h-4" />
       <span>{editingShift ? 'Update Shift' : 'Create Shift'}</span>
     </Button>
     <Button variant="secondary" onClick={() => setShowModal(false)}>
       <span>Cancel</span>
     </Button>
   </div>
 </div>
 </Modal>

 <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Shift">
 <div className="space-y-4">
   <p className="text-gray-600 dark:text-gray-400">
     Are you sure you want to delete this shift? This action cannot be undone.
   </p>
   <div className="flex gap-3 pt-4">
     <Button variant="danger" onClick={confirmDelete} className="flex items-center gap-2">
       <TrashIcon className="w-4 h-4" />
       <span>Delete Shift</span>
     </Button>
     <Button variant="secondary" onClick={() => setDeleteModal(false)}>
       <span>Cancel</span>
     </Button>
   </div>
 </div>
 </Modal>
 </div>
 );
};

export default Shifts;
