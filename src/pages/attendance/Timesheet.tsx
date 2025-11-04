
import { useState } from 'react';
import { Button } from '@/components/Button';
import { 
  ClockIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  AlertIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  DownloadIcon,
  CloseIcon
} from '@/components/Icons';

interface TimesheetEntry {
  id: number;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  project: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export const Timesheet = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Total Hours This Week: 312h (39 employees × 8h average)
  // Pending Approvals: 23
  // Approved Timesheets: 156
  // Active Projects: 12
  const timesheetData: TimesheetEntry[] = [
    { id: 1, employee: 'John Doe', date: '2025-01-06', checkIn: '08:00 AM', checkOut: '05:00 PM', totalHours: '8.0', project: 'Project Alpha', status: 'Approved' },
    { id: 2, employee: 'Jane Smith', date: '2025-01-06', checkIn: '08:30 AM', checkOut: '05:30 PM', totalHours: '8.0', project: 'Project Beta', status: 'Pending' },
    { id: 3, employee: 'Mike Johnson', date: '2025-01-06', checkIn: '09:00 AM', checkOut: '06:00 PM', totalHours: '8.0', project: 'Project Gamma', status: 'Approved' },
    { id: 4, employee: 'Sarah Williams', date: '2025-01-06', checkIn: '08:00 AM', checkOut: '04:30 PM', totalHours: '7.5', project: 'Project Delta', status: 'Rejected' },
    { id: 5, employee: 'Robert Brown', date: '2025-01-06', checkIn: '07:30 AM', checkOut: '04:30 PM', totalHours: '8.0', project: 'Project Epsilon', status: 'Approved' },
    { id: 6, employee: 'Emily Davis', date: '2025-01-06', checkIn: '08:00 AM', checkOut: '05:00 PM', totalHours: '8.0', project: 'Project Zeta', status: 'Pending' },
    { id: 7, employee: 'David Wilson', date: '2025-01-05', checkIn: '08:30 AM', checkOut: '05:30 PM', totalHours: '8.0', project: 'Project Alpha', status: 'Approved' },
    { id: 8, employee: 'Lisa Anderson', date: '2025-01-05', checkIn: '09:00 AM', checkOut: '06:00 PM', totalHours: '8.0', project: 'Project Eta', status: 'Approved' },
    { id: 9, employee: 'James Taylor', date: '2025-01-05', checkIn: '08:00 AM', checkOut: '05:00 PM', totalHours: '8.0', project: 'Project Theta', status: 'Pending' },
    { id: 10, employee: 'Maria Garcia', date: '2025-01-05', checkIn: '07:30 AM', checkOut: '04:30 PM', totalHours: '8.0', project: 'Project Beta', status: 'Approved' },
    { id: 11, employee: 'Chris Martin', date: '2025-01-05', checkIn: '08:00 AM', checkOut: '05:00 PM', totalHours: '8.0', project: 'Project Iota', status: 'Pending' },
    { id: 12, employee: 'Anna Lee', date: '2025-01-04', checkIn: '08:30 AM', checkOut: '05:30 PM', totalHours: '8.0', project: 'Project Kappa', status: 'Approved' },
    { id: 13, employee: 'Tom Harris', date: '2025-01-04', checkIn: '09:00 AM', checkOut: '06:00 PM', totalHours: '8.0', project: 'Project Lambda', status: 'Approved' },
    { id: 14, employee: 'Rachel White', date: '2025-01-04', checkIn: '08:00 AM', checkOut: '05:00 PM', totalHours: '8.0', project: 'Project Gamma', status: 'Pending' },
    { id: 15, employee: 'Kevin Brown', date: '2025-01-04', checkIn: '07:30 AM', checkOut: '04:30 PM', totalHours: '8.0', project: 'Project Alpha', status: 'Approved' },
  ];

  const handleView = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowViewDialog(true);
  };

  const handleEdit = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowEditDialog(true);
  };

  const handleDelete = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowDeleteDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(timesheetData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = timesheetData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Timesheet
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage and track employee timesheets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Hours This Week</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">119.5</div>
              <div className="text-sm text-[#7FBA00] mt-2">15 entries recorded</div>
            </div>
            <div className="p-3 bg-[#0078D4]/10 rounded-lg">
              <ClockIcon className="w-6 h-6 text-[#0078D4]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Approvals</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">5</div>
              <div className="text-sm text-[#FFB900] mt-2">Needs review</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <AlertIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved Timesheets</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">9</div>
              <div className="text-sm text-[#7FBA00] mt-2">60% approval rate</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Projects</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-sm text-[#00A4EF] mt-2">Currently tracking</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Timesheet Entries</h2>
          <div className="flex gap-3">
            <Button variant="success" onClick={() => setShowAddDialog(true)}>
              <div className="flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                <span>Export</span>
              </div>
            </Button>
            <Button variant="primary" onClick={() => setShowAddDialog(true)}>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>Add Entry</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{entry.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{entry.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{entry.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{entry.totalHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{entry.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold ${getStatusColor(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button variant="primary" onClick={() => handleView(entry)}>
                        <div className="flex items-center gap-2">
                          <EyeIcon className="w-4 h-4" />
                          <span>View</span>
                        </div>
                      </Button>
                      <Button variant="secondary" onClick={() => handleEdit(entry)}>
                        <div className="flex items-center gap-2">
                          <EditIcon className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(entry)}>
                        <div className="flex items-center gap-2">
                          <TrashIcon className="w-4 h-4" />
                          <span>Delete</span>
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 px-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, timesheetData.length)} of {timesheetData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'secondary'}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Entry Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Timesheet Entry</h3>
              <button onClick={() => setShowAddDialog(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]">
                  <option>Select Employee</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check In</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check Out</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]">
                  <option>Select Project</option>
                  <option>Project Alpha</option>
                  <option>Project Beta</option>
                  <option>Project Gamma</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" placeholder="Add any notes..."></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowAddDialog(false)}>
                <div className="flex items-center gap-2">
                  <CloseIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </div>
              </Button>
              <Button variant="primary" onClick={() => setShowAddDialog(false)}>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Add Entry</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Dialog */}
      {showViewDialog && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Timesheet Entry Details</h3>
              <button onClick={() => setShowViewDialog(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee</label>
                  <p className="text-gray-900 dark:text-white">{selectedEntry.employee}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <p className="text-gray-900 dark:text-white">{selectedEntry.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check In</label>
                  <p className="text-gray-900 dark:text-white">{selectedEntry.checkIn}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check Out</label>
                  <p className="text-gray-900 dark:text-white">{selectedEntry.checkOut}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Hours</label>
                  <p className="text-gray-900 dark:text-white">{selectedEntry.totalHours}h</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold ${getStatusColor(selectedEntry.status)}`}>
                    {selectedEntry.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
                <p className="text-gray-900 dark:text-white">{selectedEntry.project}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowViewDialog(false)}>
                <div className="flex items-center gap-2">
                  <CloseIcon className="w-4 h-4" />
                  <span>Close</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {showEditDialog && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Timesheet Entry</h3>
              <button onClick={() => setShowEditDialog(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee</label>
                <select defaultValue={selectedEntry.employee} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]">
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" defaultValue={selectedEntry.date} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check In</label>
                  <input type="time" defaultValue={selectedEntry.checkIn} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check Out</label>
                  <input type="time" defaultValue={selectedEntry.checkOut} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project</label>
                <select defaultValue={selectedEntry.project} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]">
                  <option>Project Alpha</option>
                  <option>Project Beta</option>
                  <option>Project Gamma</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select defaultValue={selectedEntry.status} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4]">
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowEditDialog(false)}>
                <div className="flex items-center gap-2">
                  <CloseIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </div>
              </Button>
              <Button variant="primary" onClick={() => setShowEditDialog(false)}>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete Timesheet Entry</h3>
              <button onClick={() => setShowDeleteDialog(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the timesheet entry for <strong>{selectedEntry.employee}</strong> on <strong>{selectedEntry.date}</strong>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                <div className="flex items-center gap-2">
                  <CloseIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </div>
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteDialog(false)}>
                <div className="flex items-center gap-2">
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheet;
