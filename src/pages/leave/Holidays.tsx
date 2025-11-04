import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon, CalendarIcon, UserIcon, StarIcon, BriefcaseIcon } from '@/components/Icons';

interface Holiday {
  id: number;
  name: string;
  date: string;
  type: 'Public' | 'Religious' | 'National' | 'Optional';
  description?: string;
  isPaid: boolean;
}

export const Holidays = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingHoliday, setDeletingHoliday] = useState<Holiday | null>(null);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'Public' as Holiday['type'],
    description: '',
    isPaid: true
  });
  const { addToast } = useToast();
  const { theme } = useTheme();

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: 1, name: 'New Year\'s Day', date: '2025-01-01', type: 'Public', description: 'First day of the year', isPaid: true },
    { id: 2, name: 'Independence Day', date: '2025-03-06', type: 'National', description: 'Ghana Independence Day', isPaid: true },
    { id: 3, name: 'Good Friday', date: '2025-04-18', type: 'Religious', description: 'Christian holiday', isPaid: true },
    { id: 4, name: 'Easter Monday', date: '2025-04-21', type: 'Religious', description: 'Christian holiday', isPaid: true },
    { id: 5, name: 'May Day', date: '2025-05-01', type: 'Public', description: 'Workers\' Day', isPaid: true },
    { id: 6, name: 'Eid al-Fitr', date: '2025-04-10', type: 'Religious', description: 'Islamic holiday', isPaid: true },
    { id: 7, name: 'Founders\' Day', date: '2025-08-04', type: 'National', description: 'Celebrate Ghana\'s founders', isPaid: true },
    { id: 8, name: 'Kwame Nkrumah Memorial Day', date: '2025-09-21', type: 'National', description: 'Honor first president', isPaid: true },
    { id: 9, name: 'Christmas Day', date: '2025-12-25', type: 'Religious', description: 'Christian holiday', isPaid: true },
    { id: 10, name: 'Boxing Day', date: '2025-12-26', type: 'Public', description: 'Day after Christmas', isPaid: true }
  ]);

  const handleAdd = () => {
    setEditingHoliday(null);
    setFormData({ name: '', date: '', type: 'Public', description: '', isPaid: true });
    setShowModal(true);
  };

  const handleEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setFormData({
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      description: holiday.description || '',
      isPaid: holiday.isPaid
    });
    setShowModal(true);
  };

  const handleDeleteClick = (holiday: Holiday) => {
    setDeletingHoliday(holiday);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingHoliday) {
      setHolidays(holidays.filter(h => h.id !== deletingHoliday.id));
      addToast('Holiday deleted successfully', 'success');
      setShowDeleteModal(false);
      setDeletingHoliday(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.date) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    if (editingHoliday) {
      setHolidays(holidays.map(h => h.id === editingHoliday.id ? { ...h, ...formData } : h));
      addToast('Holiday updated successfully', 'success');
    } else {
      const newHoliday: Holiday = {
        id: holidays.length + 1,
        ...formData
      };
      setHolidays([...holidays, newHoliday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      addToast('Holiday created successfully', 'success');
    }
    setShowModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Public': return 'bg-[#00A4EF]/20 text-[#00A4EF]';
      case 'Religious': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'National': return 'bg-[#F25022]/20 text-[#F25022]';
      case 'Optional': return 'bg-[#FFB900]/20 text-[#FFB900]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const stats = {
    total: holidays.length,
    public: holidays.filter(h => h.type === 'Public').length,
    religious: holidays.filter(h => h.type === 'Religious').length,
    national: holidays.filter(h => h.type === 'National').length
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
            Holidays
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage company holidays and observances</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>Add Holiday</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Holidays</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <CalendarIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Public Holidays</div>
              <div className="text-3xl font-bold text-[#00A4EF]">{stats.public}</div>
            </div>
            <div className="w-14 h-14 bg-[#00A4EF]/10 flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Religious Holidays</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{stats.religious}</div>
            </div>
            <div className="w-14 h-14 bg-[#7FBA00]/10 flex items-center justify-center">
              <StarIcon className="w-7 h-7 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">National Days</div>
              <div className="text-3xl font-bold text-[#F25022]">{stats.national}</div>
            </div>
            <div className="w-14 h-14 bg-[#F25022]/10 flex items-center justify-center">
              <BriefcaseIcon className="w-7 h-7 text-[#F25022]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Holiday Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Paid</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Description</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {holidays.map((holiday) => (
              <tr key={holiday.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{holiday.name}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{holiday.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getTypeColor(holiday.type)}`}>
                    {holiday.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${holiday.isPaid ? 'bg-[#7FBA00]/20 text-[#7FBA00]' : 'bg-gray-200 text-gray-700'}`}>
                    {holiday.isPaid ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{holiday.description}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleEdit(holiday)} className="flex items-center gap-1 text-white">
                      <EditIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                    <Button variant="danger" size="sm" className="text-white flex items-center gap-1" onClick={() => handleDeleteClick(holiday)}>
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingHoliday ? 'Edit Holiday' : 'Add New Holiday'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Holiday Name *</label>
            <input
              type="text"
              placeholder="e.g., Christmas Day"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Holiday['type'] })}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="Public">Public</option>
              <option value="Religious">Religious</option>
              <option value="National">National</option>
              <option value="Optional">Optional</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPaid}
                onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Paid Holiday</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              placeholder="Brief description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSubmit}>
              {editingHoliday ? 'Update' : 'Create'}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Holiday">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the holiday <strong>{deletingHoliday?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Holidays;
