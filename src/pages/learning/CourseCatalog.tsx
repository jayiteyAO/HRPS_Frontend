import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  BookIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
  CheckCircleIcon,
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  EyeIcon,
  TrophyIcon,
  DownloadIcon,
  ShareIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
  enrolledDate: string;
  dueDate: string;
  description: string;
  rating: number;
  thumbnail: string;
  lessons: number;
  completedLessons: number;
  certificate?: boolean;
}

export const CourseCatalog = () => {
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const myCourses: Course[] = [
    {
      id: 'MC001',
      title: 'Leadership Fundamentals',
      instructor: 'Dr. Emily Roberts',
      category: 'Management',
      duration: '8 hours',
      progress: 75,
      status: 'In Progress',
      enrolledDate: '2025-10-15',
      dueDate: '2025-11-30',
      description: 'Learn the core principles of effective leadership and team management.',
      rating: 4.8,
      thumbnail: '👔',
      lessons: 12,
      completedLessons: 9,
    },
    {
      id: 'MC002',
      title: 'Advanced Excel for Finance',
      instructor: 'Mark Anderson',
      category: 'Finance',
      duration: '12 hours',
      progress: 100,
      status: 'Completed',
      enrolledDate: '2025-09-01',
      dueDate: '2025-10-15',
      description: 'Master advanced Excel techniques for financial analysis and reporting.',
      rating: 4.9,
      thumbnail: '📊',
      lessons: 15,
      completedLessons: 15,
      certificate: true,
    },
    {
      id: 'MC003',
      title: 'Communication Skills Workshop',
      instructor: 'Lisa Chen',
      category: 'Soft Skills',
      duration: '6 hours',
      progress: 45,
      status: 'In Progress',
      enrolledDate: '2025-10-20',
      dueDate: '2025-12-01',
      description: 'Enhance your professional communication and presentation skills.',
      rating: 4.7,
      thumbnail: '💬',
      lessons: 8,
      completedLessons: 4,
    },
    {
      id: 'MC004',
      title: 'Project Management Essentials',
      instructor: 'John Williams',
      category: 'Management',
      duration: '10 hours',
      progress: 0,
      status: 'Not Started',
      enrolledDate: '2025-11-01',
      dueDate: '2025-12-15',
      description: 'Learn essential project management methodologies and tools.',
      rating: 4.6,
      thumbnail: '📋',
      lessons: 10,
      completedLessons: 0,
    },
    {
      id: 'MC005',
      title: 'Data Analysis with Python',
      instructor: 'Sarah Martinez',
      category: 'Technical',
      duration: '20 hours',
      progress: 60,
      status: 'In Progress',
      enrolledDate: '2025-09-15',
      dueDate: '2025-11-30',
      description: 'Master data analysis techniques using Python and popular libraries.',
      rating: 4.9,
      thumbnail: '🐍',
      lessons: 20,
      completedLessons: 12,
    },
    {
      id: 'MC006',
      title: 'Cybersecurity Basics',
      instructor: 'David Kim',
      category: 'Technical',
      duration: '8 hours',
      progress: 100,
      status: 'Completed',
      enrolledDate: '2025-08-01',
      dueDate: '2025-09-15',
      description: 'Understand fundamental cybersecurity concepts and best practices.',
      rating: 4.7,
      thumbnail: '🔒',
      lessons: 10,
      completedLessons: 10,
      certificate: true,
    },
  ];

  const totalCourses = myCourses.length;
  const completedCourses = myCourses.filter(c => c.status === 'Completed').length;
  const inProgressCourses = myCourses.filter(c => c.status === 'In Progress').length;
  const totalHours = myCourses.reduce((sum, c) => sum + parseInt(c.duration), 0);
  const avgProgress = Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses);

  const progressData = [
    { month: 'Jun', completed: 1, inProgress: 0 },
    { month: 'Jul', completed: 1, inProgress: 1 },
    { month: 'Aug', completed: 2, inProgress: 1 },
    { month: 'Sep', completed: 2, inProgress: 2 },
    { month: 'Oct', completed: 2, inProgress: 3 },
    { month: 'Nov', completed: 2, inProgress: 3 },
  ];

  const categoryData = [
    { name: 'Technical', value: 2, color: '#00A4EF' },
    { name: 'Management', value: 2, color: '#7FBA00' },
    { name: 'Finance', value: 1, color: '#FFB900' },
    { name: 'Soft Skills', value: 1, color: '#F25022' },
  ];

  const timeSpentData = [
    { week: 'Week 1', hours: 4 },
    { week: 'Week 2', hours: 6 },
    { week: 'Week 3', hours: 5 },
    { week: 'Week 4', hours: 8 },
  ];

  const filteredCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDialog(true);
  };

  const handleViewCertificate = (course: Course) => {
    setSelectedCourse(course);
    setShowCertificateDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BookIcon size={32} className="text-[#00A4EF]" />
            My Catalog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning progress and access enrolled courses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <DownloadIcon size={16} />
            <span>Export Progress</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalCourses}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Enrolled</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedCourses}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {Math.round((completedCourses / totalCourses) * 100)}% complete
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{inProgressCourses}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Active learning</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <PlayIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalHours}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Learning time</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <ClockIcon size={24} className="text-[#8764B8]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{avgProgress}%</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Overall</p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <TrophyIcon size={24} className="text-[#00BCF2]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Learning Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly course activity</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#7FBA00" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="inProgress" stroke="#FFB900" strokeWidth={2} name="In Progress" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Course Categories</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution by type</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Time Spent</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Weekly learning hours</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#00A4EF" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Not Started</option>
            </select>
            <Button variant="secondary">
              <FilterIcon size={16} />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="h-32 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center text-6xl">
                {course.thumbnail}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={
                      course.status === 'Completed' ? 'success' :
                      course.status === 'In Progress' ? 'warning' : 'default'
                    }
                    size="sm"
                  >
                    {course.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <StarIcon size={14} className="text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.instructor}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>{course.progress}% Complete</span>
                    <span>{course.completedLessons}/{course.lessons} lessons</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#7FBA00] h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={14} />
                    <span>Due: {new Date(course.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {course.status === 'Completed' && course.certificate ? (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewCertificate(course)}
                    >
                      <TrophyIcon size={14} />
                      <span>Certificate</span>
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewCourse(course)}
                    >
                      <PlayIcon size={14} />
                      <span>{course.status === 'Not Started' ? 'Start' : 'Continue'}</span>
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewCourse(course)}
                  >
                    <EyeIcon size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No courses found</p>
          </div>
        )}
      </Card>

      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{selectedCourse.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    by {selectedCourse.instructor}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">{selectedCourse.category}</Badge>
                    <Badge
                      variant={
                        selectedCourse.status === 'Completed' ? 'success' :
                        selectedCourse.status === 'In Progress' ? 'warning' : 'default'
                      }
                      size="sm"
                    >
                      {selectedCourse.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <StarIcon size={16} className="text-yellow-500" />
                    <span className="font-medium">{selectedCourse.rating}</span>
                    <span className="text-gray-500">rating</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedCourse.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedCourse.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-[#7FBA00] h-3 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Lessons: {selectedCourse.completedLessons}/{selectedCourse.lessons}</span>
                    <span>Duration: {selectedCourse.duration}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCourse.enrolledDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCourse.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCourseDialog(false)}>
              Close
            </Button>
            {selectedCourse && selectedCourse.status !== 'Completed' && (
              <Button variant="primary">
                <PlayIcon size={16} />
                <span>{selectedCourse.status === 'Not Started' ? 'Start Course' : 'Continue Learning'}</span>
              </Button>
            )}
            {selectedCourse && selectedCourse.certificate && (
              <Button variant="primary" onClick={() => {
                setShowCourseDialog(false);
                handleViewCertificate(selectedCourse);
              }}>
                <TrophyIcon size={16} />
                <span>View Certificate</span>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Course Certificate</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="py-4">
              <div className="border-8 border-double border-[#00A4EF] p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏆</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Certificate of Completion
                  </h2>
                  <div className="py-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">This certifies that</p>
                    <p className="text-2xl font-bold text-[#00A4EF] mb-2">John Doe</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">has successfully completed</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {selectedCourse.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Instructed by {selectedCourse.instructor}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      Completed on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-center gap-8 pt-4">
                    <div>
                      <div className="h-px bg-gray-400 w-32 mb-1"></div>
                      <p className="text-xs text-gray-500">Instructor Signature</p>
                    </div>
                    <div>
                      <div className="h-px bg-gray-400 w-32 mb-1"></div>
                      <p className="text-xs text-gray-500">Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCertificateDialog(false)}>
              Close
            </Button>
            <Button variant="primary">
              <DownloadIcon size={16} />
              <span>Download PDF</span>
            </Button>
            <Button variant="secondary">
              <ShareIcon size={16} />
              <span>Share</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseCatalog;
