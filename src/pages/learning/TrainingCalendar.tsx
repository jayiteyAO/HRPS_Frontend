import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  BookIcon,
  CheckCircleIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  EyeIcon,
  LocationIcon,
  PlayIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TrainingSession {
  id: string;
  title: string;
  instructor: string;
  category: string;
  type: 'Workshop' | 'Webinar' | 'Course' | 'Seminar';
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  capacity: number;
  enrolled: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  description: string;
  isEnrolled?: boolean;
}

export const TrainingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const trainingSessions: TrainingSession[] = [
    {
      id: 'TS001',
      title: 'Leadership Fundamentals Workshop',
      instructor: 'Dr. Emily Roberts',
      category: 'Management',
      type: 'Workshop',
      date: '2025-11-15',
      startTime: '09:00',
      endTime: '17:00',
      duration: '8 hours',
      location: 'Conference Room A',
      capacity: 25,
      enrolled: 18,
      status: 'Upcoming',
      description: 'Comprehensive workshop on leadership principles and team management.',
      isEnrolled: true,
    },
    {
      id: 'TS002',
      title: 'Excel Advanced Training',
      instructor: 'Mark Anderson',
      category: 'Technical',
      type: 'Course',
      date: '2025-11-20',
      startTime: '10:00',
      endTime: '16:00',
      duration: '6 hours',
      location: 'Training Lab B',
      capacity: 30,
      enrolled: 30,
      status: 'Upcoming',
      description: 'Advanced Excel techniques for data analysis and reporting.',
      isEnrolled: false,
    },
    {
      id: 'TS003',
      title: 'Communication Skills Webinar',
      instructor: 'Lisa Chen',
      category: 'Soft Skills',
      type: 'Webinar',
      date: '2025-11-18',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2 hours',
      location: 'Online',
      capacity: 100,
      enrolled: 67,
      status: 'Upcoming',
      description: 'Enhance professional communication and presentation skills.',
      isEnrolled: true,
    },
    {
      id: 'TS004',
      title: 'Project Management Seminar',
      instructor: 'John Williams',
      category: 'Management',
      type: 'Seminar',
      date: '2025-11-22',
      startTime: '09:00',
      endTime: '12:00',
      duration: '3 hours',
      location: 'Main Auditorium',
      capacity: 50,
      enrolled: 42,
      status: 'Upcoming',
      description: 'Essential project management methodologies and best practices.',
      isEnrolled: false,
    },
    {
      id: 'TS005',
      title: 'Data Analysis with Python',
      instructor: 'Sarah Martinez',
      category: 'Technical',
      type: 'Course',
      date: '2025-11-25',
      startTime: '10:00',
      endTime: '18:00',
      duration: '8 hours',
      location: 'Tech Lab',
      capacity: 20,
      enrolled: 15,
      status: 'Upcoming',
      description: 'Learn data analysis using Python and popular libraries.',
      isEnrolled: true,
    },
    {
      id: 'TS006',
      title: 'Cybersecurity Awareness',
      instructor: 'David Kim',
      category: 'Security',
      type: 'Workshop',
      date: '2025-11-28',
      startTime: '13:00',
      endTime: '17:00',
      duration: '4 hours',
      location: 'Conference Room C',
      capacity: 35,
      enrolled: 28,
      status: 'Upcoming',
      description: 'Understanding cybersecurity threats and protection strategies.',
      isEnrolled: false,
    },
  ];

  const totalSessions = trainingSessions.length;
  const upcomingSessions = trainingSessions.filter(s => s.status === 'Upcoming').length;
  const enrolledSessions = trainingSessions.filter(s => s.isEnrolled).length;
  const totalCapacity = trainingSessions.reduce((sum, s) => sum + s.capacity, 0);
  const totalEnrolled = trainingSessions.reduce((sum, s) => sum + s.enrolled, 0);

  const sessionsByType = [
    { name: 'Workshop', value: trainingSessions.filter(s => s.type === 'Workshop').length, color: '#00A4EF' },
    { name: 'Webinar', value: trainingSessions.filter(s => s.type === 'Webinar').length, color: '#7FBA00' },
    { name: 'Course', value: trainingSessions.filter(s => s.type === 'Course').length, color: '#FFB900' },
    { name: 'Seminar', value: trainingSessions.filter(s => s.type === 'Seminar').length, color: '#F25022' },
  ];

  const enrollmentData = [
    { day: 'Mon', enrolled: 12 },
    { day: 'Tue', enrolled: 15 },
    { day: 'Wed', enrolled: 18 },
    { day: 'Thu', enrolled: 20 },
    { day: 'Fri', enrolled: 16 },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getSessionsForDate = (day: number) => {
    const dateStr = `2025-11-${day.toString().padStart(2, '0')}`;
    return trainingSessions.filter(s => s.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleViewSession = (session: TrainingSession) => {
    setSelectedSession(session);
    setShowDetailsDialog(true);
  };

  const handleEnroll = (session: TrainingSession) => {
    setSelectedSession(session);
    setShowEnrollDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CalendarIcon size={32} className="text-[#00A4EF]" />
            My Training Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage your training schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}>
            {viewMode === 'calendar' ? 'List View' : 'Calendar View'}
          </Button>
          <Button variant="primary" onClick={() => setShowCreateDialog(true)}>
            <PlusIcon size={16} />
            <span>Schedule Training</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalSessions}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">This month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CalendarIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{upcomingSessions}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Next 30 days</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">My Enrollments</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{enrolledSessions}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Registered</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Attendees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalEnrolled}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Across all sessions</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <UsersIcon size={24} className="text-[#8764B8]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Capacity Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.round((totalEnrolled / totalCapacity) * 100)}%
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Utilization</p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <BookIcon size={24} className="text-[#00BCF2]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Weekly Enrollment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Daily registration trends</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="enrolled" fill="#00A4EF" name="Enrollments" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Session Types</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution by format</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sessionsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {viewMode === 'calendar' ? (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeftIcon size={16} />
              </Button>
              <Button variant="secondary" size="sm" onClick={handleNextMonth}>
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}

            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 min-h-[100px] bg-gray-50 dark:bg-gray-800/30" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const sessions = getSessionsForDate(day);
              const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

              return (
                <div
                  key={day}
                  className={`p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 ${
                    isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {sessions.map(session => (
                      <div
                        key={session.id}
                        onClick={() => handleViewSession(session)}
                        className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50"
                      >
                        <div className="font-medium truncate">{session.title}</div>
                        <div className="text-[10px]">{session.startTime}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Training Sessions</h2>
            <Button variant="secondary">
              <FilterIcon size={16} />
              <span>Filter</span>
            </Button>
          </div>

          <div className="space-y-4">
            {trainingSessions.map(session => (
              <div
                key={session.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                      <Badge variant={session.isEnrolled ? 'success' : 'default'} size="sm">
                        {session.isEnrolled ? 'Enrolled' : session.enrolled >= session.capacity ? 'Full' : 'Available'}
                      </Badge>
                      <Badge variant="info" size="sm">{session.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{session.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LocationIcon size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {session.enrolled}/{session.capacity} enrolled
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="primary" size="sm" onClick={() => handleViewSession(session)}>
                      <EyeIcon size={14} />
                      <span>View</span>
                    </Button>
                    {!session.isEnrolled && session.enrolled < session.capacity && (
                      <Button variant="primary" size="sm" onClick={() => handleEnroll(session)}>
                        <PlusIcon size={14} />
                        <span>Enroll</span>
                      </Button>
                    )}
                    {session.isEnrolled && (
                      <Button variant="secondary" size="sm">
                        <PlayIcon size={14} />
                        <span>Join</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Training Session Details</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedSession.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="info" size="sm">{selectedSession.type}</Badge>
                  <Badge variant={selectedSession.isEnrolled ? 'success' : 'default'} size="sm">
                    {selectedSession.isEnrolled ? 'Enrolled' : 'Not Enrolled'}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{selectedSession.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedSession.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedSession.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedSession.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedSession.startTime} - {selectedSession.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedSession.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedSession.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedSession.enrolled}/{selectedSession.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <Badge variant={selectedSession.status === 'Upcoming' ? 'warning' : 'success'} size="sm">
                    {selectedSession.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedSession && !selectedSession.isEnrolled && selectedSession.enrolled < selectedSession.capacity && (
              <Button variant="primary" onClick={() => {
                setShowDetailsDialog(false);
                handleEnroll(selectedSession);
              }}>
                <PlusIcon size={16} />
                <span>Enroll Now</span>
              </Button>
            )}
            {selectedSession?.isEnrolled && (
              <Button variant="primary">
                <PlayIcon size={16} />
                <span>Join Session</span>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Enroll in Training</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to enroll in <span className="font-semibold">{selectedSession.title}</span>?
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedSession.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedSession.startTime} - {selectedSession.endTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedSession.location}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowEnrollDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowEnrollDialog(false)}>
              <CheckCircleIcon size={16} />
              <span>Confirm Enrollment</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Training</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Training Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter training title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Workshop</option>
                  <option>Webinar</option>
                  <option>Course</option>
                  <option>Seminar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Technical</option>
                  <option>Management</option>
                  <option>Soft Skills</option>
                  <option>Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Max attendees"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Room or online link"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Training description"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowCreateDialog(false)}>
              <PlusIcon size={16} />
              <span>Create Training</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingCalendar;
