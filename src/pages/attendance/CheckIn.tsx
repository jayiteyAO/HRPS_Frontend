import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { ClockIcon, CalendarIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@/components/Icons';
import { showToast } from '@/components/Toast';

interface CheckInRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  duration: string | null;
  status: 'checked-in' | 'checked-out' | 'absent';
}

export const CheckIn = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CheckInRecord | null>(null);
  const [records, setRecords] = useState<CheckInRecord[]>([
    {
      id: '1',
      date: '2025-11-01',
      checkIn: '08:30 AM',
      checkOut: '05:15 PM',
      duration: '8h 45m',
      status: 'checked-out'
    },
    {
      id: '2',
      date: '2025-10-31',
      checkIn: '08:25 AM',
      checkOut: '05:30 PM',
      duration: '9h 5m',
      status: 'checked-out'
    },
    {
      id: '3',
      date: '2025-10-30',
      checkIn: '08:45 AM',
      checkOut: '05:10 PM',
      duration: '8h 25m',
      status: 'checked-out'
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
    showToast('Checked in successfully!', 'success');
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;
    
    const now = new Date();
    const duration = calculateDuration(checkInTime, now);
    
    const newRecord: CheckInRecord = {
      id: (records.length + 1).toString(),
      date: now.toISOString().split('T')[0],
      checkIn: formatTime(checkInTime),
      checkOut: formatTime(now),
      duration: duration,
      status: 'checked-out'
    };

    setRecords([newRecord, ...records]);
    setIsCheckedIn(false);
    setCheckInTime(null);
    showToast('Checked out successfully!', 'success');
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const calculateDuration = (start: Date, end: Date): string => {
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

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

  const handleViewRecord = (record: CheckInRecord) => {
    setSelectedRecord(record);
    setViewDialogOpen(true);
  };

  const handleViewAll = () => {
    navigate('/attendance/all-records');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Time & Attendance
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Record your daily attendance and track your time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Status</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isCheckedIn ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {isCheckedIn ? (
                  <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {isCheckedIn && checkInTime ? calculateDuration(checkInTime, currentTime) : '0h 0m'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">40h 15m</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <CalendarIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">165h 30m</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <CalendarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Time and Status Card */}
      <Card>
        <div className="p-8">
          <div className="text-center mb-8">
            <ClockIcon className="w-20 h-20 text-[#00A4EF] mx-auto mb-4" />
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {isCheckedIn && checkInTime && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 mb-6 text-center">
              <p className="text-green-800 dark:text-green-200 font-medium">
                You checked in at {formatTime(checkInTime)}
              </p>
              <p className="text-green-600 dark:text-green-300 text-sm mt-1">
                Duration: {calculateDuration(checkInTime, currentTime)}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckIn}
              disabled={isCheckedIn}
              className="min-w-[180px] flex items-center justify-center gap-2"
            >
              <ClockIcon className="w-5 h-5" />
              <span>Clock In</span>
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={handleCheckOut}
              disabled={!isCheckedIn}
              className="min-w-[180px] flex items-center justify-center gap-2"
            >
              <ClockIcon className="w-5 h-5" />
              <span>Clock Out</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Check-In History */}
      <Card>
        <CardHeader 
          title="Recent Check-In History"
          subtitle="Your attendance records for the past week"
          action={
            <Button
              variant="primary"
              onClick={handleViewAll}
              className="flex items-center gap-2"
            >
              <EyeIcon className="w-4 h-4" />
              <span>View All</span>
            </Button>
          }
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {records.map((record, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.checkOut || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.duration || '-'}</td>
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
                <p className="text-base text-gray-900 dark:text-white">Office - Main Building</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regular working day with no incidents reported.</p>
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

export default CheckIn;
