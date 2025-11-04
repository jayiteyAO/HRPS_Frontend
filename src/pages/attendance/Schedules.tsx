import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CalendarIcon, PlusIcon, EditIcon, TrashIcon, EyeIcon, UsersIcon, ClockIcon } from '@/components/Icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';

interface Schedule {
  id: number;
  name: string;
  start: string;
  end: string;
  days: string;
  employees: number;
  breakDuration?: number;
  department?: string;
}

export const Schedules: React.FC = () => {
 const { theme } = useTheme();
 const { addToast } = useToast();
 const [showAddModal, setShowAddModal] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [showViewModal, setShowViewModal] = useState(false);
 const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
 const [formData, setFormData] = useState({
   name: '',
   start: '',
   end: '',
   days: '',
   breakDuration: 60,
   department: ''
 });

 const [schedules, setSchedules] = useState<Schedule[]>([
 { id: 1, name: 'Standard Shift', start: '09:00', end: '17:00', days: 'Mon-Fri', employees: 120, breakDuration: 60, department: 'All Departments' },
 { id: 2, name: 'Morning Shift', start: '07:00', end: '15:00', days: 'Mon-Sat', employees: 25, breakDuration: 45, department: 'Operations' },
 { id: 3, name: 'Night Shift', start: '22:00', end: '06:00', days: 'Mon-Fri', employees: 15, breakDuration: 60, department: 'Security' },
 { id: 4, name: 'Flexible Hours', start: 'Flexible', end: 'Flexible', days: 'Mon-Fri', employees: 35, breakDuration: 60, department: 'Engineering' },
 ]);

 const handleAdd = () => {
   setFormData({ name: '', start: '', end: '', days: '', breakDuration: 60, department: '' });
   setShowAddModal(true);
 };

 const handleEdit = (schedule: Schedule) => {
   setSelectedSchedule(schedule);
   setFormData({
     name: schedule.name,
     start: schedule.start,
     end: schedule.end,
     days: schedule.days,
     breakDuration: schedule.breakDuration || 60,
     department: schedule.department || ''
   });
   setShowEditModal(true);
 };

 const handleView = (schedule: Schedule) => {
   setSelectedSchedule(schedule);
   setShowViewModal(true);
 };

 const handleDeleteClick = (schedule: Schedule) => {
   setSelectedSchedule(schedule);
   setShowDeleteModal(true);
 };

 const confirmDelete = () => {
   if (selectedSchedule) {
     setSchedules(schedules.filter(s => s.id !== selectedSchedule.id));
     addToast('Schedule deleted successfully', 'success');
     setShowDeleteModal(false);
     setSelectedSchedule(null);
   }
 };

 const handleSubmitAdd = () => {
   if (!formData.name || !formData.start || !formData.end || !formData.days || !formData.department) {
     addToast('Please fill all required fields', 'error');
     return;
   }

   const newSchedule: Schedule = {
     id: schedules.length + 1,
     ...formData,
     employees: 0
   };
   setSchedules([...schedules, newSchedule]);
   addToast('Schedule created successfully', 'success');
   setShowAddModal(false);
 };

 const handleSubmitEdit = () => {
   if (!formData.name || !formData.start || !formData.end || !formData.days || !formData.department) {
     addToast('Please fill all required fields', 'error');
     return;
   }

   if (selectedSchedule) {
     setSchedules(schedules.map(s => 
       s.id === selectedSchedule.id 
         ? { ...s, ...formData }
         : s
     ));
     addToast('Schedule updated successfully', 'success');
     setShowEditModal(false);
     setSelectedSchedule(null);
   }
 };

 const totalSchedules = schedules.length;
 const totalEmployees = schedules.reduce((sum, s) => sum + s.employees, 0);
 const activeSchedules = schedules.filter(s => s.employees > 0).length;

 return (
 <div className="p-8">
 <div className="flex justify-between items-center mb-8">
 <div>
   <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
     Work Schedules
   </h1>
   <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage work schedules and shifts</p>
 </div>
 <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center gap-2">
   <PlusIcon className="w-5 h-5" />
   <span>Create Schedule</span>
 </Button>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
   <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
     <div className="flex items-center justify-between">
       <div>
         <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Schedules</div>
         <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalSchedules}</div>
       </div>
       <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
         <CalendarIcon className="w-6 h-6 text-[#00A4EF]" />
       </div>
     </div>
   </div>

   <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
     <div className="flex items-center justify-between">
       <div>
         <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Schedules</div>
         <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeSchedules}</div>
       </div>
       <div className="w-12 h-12 bg-[#7FBA00]/20 flex items-center justify-center">
         <ClockIcon className="w-6 h-6 text-[#7FBA00]" />
       </div>
     </div>
   </div>

   <div className={`p-6 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
     <div className="flex items-center justify-between">
       <div>
         <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Employees</div>
         <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalEmployees}</div>
       </div>
       <div className="w-12 h-12 bg-[#FFB900]/20 flex items-center justify-center">
         <UsersIcon className="w-6 h-6 text-[#FFB900]" />
       </div>
     </div>
   </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {schedules.map((schedule, index) => (
 <div
 key={schedule.id}
 className={`
 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
 p-6 shadow-sm border
 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 hover:shadow-sm
 `}
 style={{
 animation: `scale-in 0.5s ease-out ${index * 100}ms forwards`
 }}
 >
 <div className="flex items-center gap-4 mb-4">
 <div className="w-14 h-14 bg-[#00A4EF]/20 flex items-center justify-center">
 <CalendarIcon className="w-7 h-7 text-[#00A4EF]" />
 </div>
 <div className="flex-1">
 <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {schedule.name}
 </h3>
 <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
 {schedule.employees} employees
 </p>
 </div>
 </div>

 <div className="space-y-3">
 <div className={`
 p-3 rounded-sm ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 `}>
 <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Working Hours</p>
 <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {schedule.start} - {schedule.end}
 </p>
 </div>

 <div className={`
 p-3 rounded-sm ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 `}>
 <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Working Days</p>
 <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {schedule.days}
 </p>
 </div>

 <div className={`
 p-3 rounded-sm ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 `}>
 <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Department</p>
 <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {schedule.department}
 </p>
 </div>
 </div>

 <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
   <Button variant="primary" size="sm" onClick={() => handleView(schedule)} className="flex items-center gap-1.5">
     <EyeIcon className="w-4 h-4" />
     <span>View</span>
   </Button>
   <Button variant="primary" size="sm" onClick={() => handleEdit(schedule)} className="flex items-center gap-1.5">
     <EditIcon className="w-4 h-4" />
     <span>Edit</span>
   </Button>
   <Button variant="danger" size="sm" onClick={() => handleDeleteClick(schedule)} className="flex items-center gap-1.5">
     <TrashIcon className="w-4 h-4" />
     <span>Delete</span>
   </Button>
 </div>
 </div>
 ))}
 </div>

 {/* Add Schedule Modal */}
 <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create New Schedule">
   <div className="space-y-4">
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schedule Name *</label>
       <input
         type="text"
         value={formData.name}
         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         placeholder="e.g., Morning Shift"
       />
     </div>
     <div className="grid grid-cols-2 gap-4">
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time *</label>
         <input
           type="time"
           value={formData.start}
           onChange={(e) => setFormData({ ...formData, start: e.target.value })}
           className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         />
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
         <input
           type="time"
           value={formData.end}
           onChange={(e) => setFormData({ ...formData, end: e.target.value })}
           className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         />
       </div>
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Working Days *</label>
       <input
         type="text"
         value={formData.days}
         onChange={(e) => setFormData({ ...formData, days: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         placeholder="e.g., Mon-Fri"
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
       <select
         value={formData.department}
         onChange={(e) => setFormData({ ...formData, department: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       >
         <option value="">Select department</option>
         <option value="All Departments">All Departments</option>
         <option value="Engineering">Engineering</option>
         <option value="Operations">Operations</option>
         <option value="Security">Security</option>
         <option value="Sales">Sales</option>
       </select>
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Break Duration (minutes)</label>
       <input
         type="number"
         value={formData.breakDuration}
         onChange={(e) => setFormData({ ...formData, breakDuration: parseInt(e.target.value) })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       />
     </div>
     <div className="flex gap-3 pt-4">
       <Button variant="primary" onClick={handleSubmitAdd} className="flex items-center gap-2">
         <PlusIcon className="w-4 h-4" />
         <span>Create Schedule</span>
       </Button>
       <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
     </div>
   </div>
 </Modal>

 {/* Edit Schedule Modal */}
 <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Schedule">
   <div className="space-y-4">
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schedule Name *</label>
       <input
         type="text"
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
           value={formData.start}
           onChange={(e) => setFormData({ ...formData, start: e.target.value })}
           className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         />
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time *</label>
         <input
           type="time"
           value={formData.end}
           onChange={(e) => setFormData({ ...formData, end: e.target.value })}
           className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         />
       </div>
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Working Days *</label>
       <input
         type="text"
         value={formData.days}
         onChange={(e) => setFormData({ ...formData, days: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
       <select
         value={formData.department}
         onChange={(e) => setFormData({ ...formData, department: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       >
         <option value="">Select department</option>
         <option value="All Departments">All Departments</option>
         <option value="Engineering">Engineering</option>
         <option value="Operations">Operations</option>
         <option value="Security">Security</option>
         <option value="Sales">Sales</option>
       </select>
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Break Duration (minutes)</label>
       <input
         type="number"
         value={formData.breakDuration}
         onChange={(e) => setFormData({ ...formData, breakDuration: parseInt(e.target.value) })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       />
     </div>
     <div className="flex gap-3 pt-4">
       <Button variant="primary" onClick={handleSubmitEdit} className="flex items-center gap-2">
         <EditIcon className="w-4 h-4" />
         <span>Update Schedule</span>
       </Button>
       <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
     </div>
   </div>
 </Modal>

 {/* View Schedule Modal */}
 <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Schedule Details">
   {selectedSchedule && (
     <div className="space-y-4">
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schedule Name</label>
         <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.name}</p>
       </div>
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
           <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.start}</p>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
           <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.end}</p>
         </div>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Working Days</label>
         <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.days}</p>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
         <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.department}</p>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employees Assigned</label>
         <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.employees}</p>
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Break Duration</label>
         <p className="text-gray-900 dark:text-white font-medium">{selectedSchedule.breakDuration} minutes</p>
       </div>
       <div className="pt-4">
         <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
       </div>
     </div>
   )}
 </Modal>

 {/* Delete Schedule Modal */}
 <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Schedule">
   <div className="space-y-4">
     <p className="text-gray-700 dark:text-gray-300">
       Are you sure you want to delete the schedule <strong>{selectedSchedule?.name}</strong>? This action cannot be undone.
     </p>
     <div className="flex gap-3 pt-4">
       <Button variant="danger" onClick={confirmDelete} className="flex items-center gap-2">
         <TrashIcon className="w-4 h-4" />
         <span>Delete</span>
       </Button>
       <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
     </div>
   </div>
 </Modal>
 </div>
 );
};
