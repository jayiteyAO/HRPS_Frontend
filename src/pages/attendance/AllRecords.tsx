import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { ArrowLeftIcon, EyeIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from '@/components/Icons';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  duration: string | null;
  status: 'checked-in' | 'checked-out' | 'absent';
  location: string;
  notes: string;
}

export const AllRecords = () => {
  const navigate = useNavigate();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const records: AttendanceRecord[] = [
    {
      id: '1',
      date: '2025-11-01',
      checkIn: '08:30 AM',
      checkOut: '05:15 PM',
      duration: '8h 45m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day with no incidents reported.'
    },
    {
      id: '2',
      date: '2025-10-31',
      checkIn: '08:25 AM',
      checkOut: '05:30 PM',
      duration: '9h 5m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Worked overtime on project deadline.'
    },
    {
      id: '3',
      date: '2025-10-30',
      checkIn: '08:45 AM',
      checkOut: '05:10 PM',
      duration: '8h 25m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day.'
    },
    {
      id: '4',
      date: '2025-10-29',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      duration: '8h 0m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Team meeting in the morning.'
    },
    {
      id: '5',
      date: '2025-10-28',
      checkIn: '08:30 AM',
      checkOut: '05:15 PM',
      duration: '8h 45m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day.'
    },
    {
      id: '6',
      date: '2025-10-27',
      checkIn: '08:20 AM',
      checkOut: '05:20 PM',
      duration: '9h 0m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Client presentation day.'
    },
    {
      id: '7',
      date: '2025-10-26',
      checkIn: '08:35 AM',
      checkOut: '05:05 PM',
      duration: '8h 30m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day.'
    },
    {
      id: '8',
      date: '2025-10-25',
      checkIn: '08:40 AM',
      checkOut: '05:25 PM',
      duration: '8h 45m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Training session in the afternoon.'
    },
    {
      id: '9',
      date: '2025-10-24',
      checkIn: '08:30 AM',
      checkOut: '05:30 PM',
      duration: '9h 0m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day.'
    },
    {
      id: '10',
      date: '2025-10-23',
      checkIn: '08:25 AM',
      checkOut: '05:15 PM',
      duration: '8h 50m',
      status: 'checked-out',
      location: 'Office - Main Building',
      notes: 'Regular working day.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge variant="success">Checked In</Badge>;
      case 'checked-out':
        return <Badge variant="info">Checked Out</Badge>;
      default:
        return <Badge variant="danger">Absent</Badge>;
    }
  };

  const handleViewRecord = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setViewDialogOpen(true);
  };

  const filteredRecords = filterStatus === 'all' 
    ? records 
    : records.filter(record => record.status === filterStatus);

  const totalHours = records.reduce((acc, record) => {
    if (record.duration) {
      const hours = parseInt(record.duration.split('h')[0]);
      const minutes = parseInt(record.duration.split('h')[1]?.split('m')[0] || '0');
      return acc + hours + (minutes / 60);
    }
    return acc;
  }, 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/attendance/check-in')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
              All Attendance Records
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Complete history of your attendance records</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Records</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{records.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CalendarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{Math.floor(totalHours)}h</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ClockIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Hours/Day</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {(totalHours / records.length).toFixed(1)}h
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ClockIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">100%</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <CheckCircleIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</label>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'checked-out' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('checked-out')}
              >
                Checked Out
              </Button>
              <Button
                variant={filterStatus === 'checked-in' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('checked-in')}
              >
                Checked In
              </Button>
              <Button
                variant={filterStatus === 'absent' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('absent')}
              >
                Absent
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* All Records Table */}
      <Card>
        <CardHeader 
          title="Attendance Records"
          subtitle={`Showing ${filteredRecords.length} record(s)`}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.checkOut || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.duration || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewRecord(record)}
                      className="flex items-center gap-2"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Record Dialog */}
      <Modal
        isOpen={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        title="Attendance Record Details"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <p className="text-base text-gray-900 dark:text-white">{selectedRecord.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                {getStatusBadge(selectedRecord.status)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check In Time</label>
                <p className="text-base text-gray-900 dark:text-white">{selectedRecord.checkIn}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check Out Time</label>
                <p className="text-base text-gray-900 dark:text-white">{selectedRecord.checkOut || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Duration</label>
                <p className="text-base text-gray-900 dark:text-white">{selectedRecord.duration || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <p className="text-base text-gray-900 dark:text-white">{selectedRecord.location}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedRecord.notes}</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllRecords;
