
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { BookIcon, PlayIcon, CheckCircleIcon, ClockIcon, TrendingUpIcon, PlusIcon, EyeIcon, TrashIcon, XIcon } from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  enrolled: number;
  completed: number;
  progress: number;
  category: string;
  level: string;
  rating: number;
  description: string;
  modules: number;
  startDate: string;
  completionDate: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
}

export const Courses: React.FC = () => {
  const { theme } = useTheme();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    { 
      id: 1, 
      title: 'Advanced React Development', 
      instructor: 'John Smith', 
      duration: '8 hours', 
      enrolled: 45, 
      completed: 32, 
      progress: 71,
      category: 'Technical',
      level: 'Advanced',
      rating: 4.5,
      description: 'Master advanced React patterns, hooks, and performance optimization techniques.',
      modules: 12,
      startDate: '2024-01-15',
      completionDate: '2024-02-15',
      status: 'In Progress'
    },
    { 
      id: 2, 
      title: 'Leadership & Management', 
      instructor: 'Jane Doe', 
      duration: '12 hours', 
      enrolled: 28, 
      completed: 18, 
      progress: 64,
      category: 'Soft Skills',
      level: 'Intermediate',
      rating: 4.8,
      description: 'Develop essential leadership skills and team management strategies.',
      modules: 15,
      startDate: '2024-01-10',
      completionDate: '2024-02-20',
      status: 'In Progress'
    },
    { 
      id: 3, 
      title: 'Data Analytics Fundamentals', 
      instructor: 'Mike Johnson', 
      duration: '10 hours', 
      enrolled: 35, 
      completed: 25, 
      progress: 71,
      category: 'Technical',
      level: 'Beginner',
      rating: 4.3,
      description: 'Learn the fundamentals of data analysis and visualization.',
      modules: 10,
      startDate: '2024-01-20',
      completionDate: '2024-02-25',
      status: 'In Progress'
    },
    { 
      id: 4, 
      title: 'Effective Communication', 
      instructor: 'Sarah Williams', 
      duration: '6 hours', 
      enrolled: 52, 
      completed: 45, 
      progress: 87,
      category: 'Soft Skills',
      level: 'Beginner',
      rating: 4.9,
      description: 'Improve your communication skills for professional success.',
      modules: 8,
      startDate: '2024-01-05',
      completionDate: '2024-01-30',
      status: 'Completed'
    },
    { 
      id: 5, 
      title: 'Project Management Basics', 
      instructor: 'David Brown', 
      duration: '14 hours', 
      enrolled: 38, 
      completed: 12, 
      progress: 32,
      category: 'Management',
      level: 'Beginner',
      rating: 4.6,
      description: 'Master the fundamentals of project management and delivery.',
      modules: 16,
      startDate: '2024-02-01',
      completionDate: '2024-03-15',
      status: 'In Progress'
    },
    { 
      id: 6, 
      title: 'Cybersecurity Essentials', 
      instructor: 'Lisa Anderson', 
      duration: '16 hours', 
      enrolled: 42, 
      completed: 0, 
      progress: 0,
      category: 'Technical',
      level: 'Intermediate',
      rating: 4.7,
      description: 'Learn essential cybersecurity practices and threat mitigation.',
      modules: 18,
      startDate: '2024-03-01',
      completionDate: '2024-04-15',
      status: 'Not Started'
    },
  ];

  const progressData = [
    { month: 'Jan', courses: 12 },
    { month: 'Feb', courses: 18 },
    { month: 'Mar', courses: 25 },
    { month: 'Apr', courses: 32 },
    { month: 'May', courses: 38 },
    { month: 'Jun', courses: 45 },
  ];

  const categoryData = [
    { name: 'Technical', value: 45, color: '#00A4EF' },
    { name: 'Soft Skills', value: 30, color: '#7FBA00' },
    { name: 'Management', value: 25, color: '#FFB900' },
  ];



  const totalEnrolled = courses.reduce((sum, course) => sum + course.enrolled, 0);
  const totalCompleted = courses.reduce((sum, course) => sum + course.completed, 0);
  const avgProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
  const activeCourses = courses.filter(c => c.status === 'In Progress').length;

  const handleView = (course: Course) => {
    setSelectedCourse(course);
    setViewDialogOpen(true);
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          My Courses
        </h1>
        <button
          className="bg-[#00A4EF] hover:bg-[#0078D4] text-white px-4 py-2 flex items-center gap-2"
          onClick={() => setEnrollDialogOpen(true)}
        >
          <PlusIcon size={18} />
          <span>Enroll in Course</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Enrolled</p>
              <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalEnrolled}</p>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/10 flex items-center justify-center">
              <BookIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/10 flex items-center justify-center">
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>In Progress</p>
              <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{activeCourses}</p>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/10 flex items-center justify-center">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Progress</p>
              <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{avgProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-[#F25022]/10 flex items-center justify-center">
              <TrendingUpIcon size={24} className="text-[#F25022]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Course Completion Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                  color: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="courses" stroke="#00A4EF" strokeWidth={2} name="Courses Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Courses by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`
              ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
              p-6 shadow-sm border
              ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              hover:shadow-md transition-shadow
            `}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center flex-shrink-0">
                <BookIcon size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {course.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  By {course.instructor}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {course.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {course.level}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    course.status === 'Completed' ? 'bg-[#7FBA00] text-white' :
                    course.status === 'In Progress' ? 'bg-[#00A4EF] text-white' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className={`
                p-3 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                text-center 
              `}>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.enrolled}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Enrolled
                </p>
              </div>

              <div className={`
                p-3 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                text-center 
              `}>
                <p className="text-2xl font-bold text-[#7FBA00]">
                  {course.completed}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Completed
                </p>
              </div>

              <div className={`
                p-3 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                text-center 
              `}>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.duration}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Duration
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completion Rate
                </span>
                <span className="text-[#7FBA00] font-bold">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
                <div
                  className="bg-[#7FBA00] h-2"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-[#00A4EF] hover:bg-[#0078D4] text-white px-4 py-2 flex items-center justify-center gap-2"
                onClick={() => handleView(course)}
              >
                <PlayIcon size={16} />
                <span>Continue</span>
              </button>
              <button
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center gap-2`}
                onClick={() => handleView(course)}
              >
                <EyeIcon size={16} />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Course Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} max-w-2xl`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {selectedCourse?.title}
            </DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Course Details
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Instructor</p>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.instructor}</p>
              </div>
              
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Description</p>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{selectedCourse.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Duration</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Modules</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.modules}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Level</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.level}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Rating</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.rating} / 5.0</p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Start Date</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.startDate}</p>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Completion Date</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedCourse.completionDate}</p>
                </div>
              </div>

              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2">
                    <div
                      className="bg-[#7FBA00] h-2"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                  <span className="text-[#7FBA00] font-bold">{selectedCourse.progress}%</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center gap-2`}
              onClick={() => setViewDialogOpen(false)}
            >
              <XIcon size={16} />
              <span>Close</span>
            </button>
            <button className="bg-[#00A4EF] hover:bg-[#0078D4] text-white px-4 py-2 flex items-center gap-2">
              <PlayIcon size={16} />
              <span>Continue Learning</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enroll Dialog */}
      <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              Enroll in Course
            </DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Browse available courses and enroll in new learning opportunities.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Search Courses
              </label>
              <input
                type="text"
                placeholder="Search by title, instructor, or category..."
                className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              />
            </div>
          </div>

          <DialogFooter>
            <button
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center gap-2`}
              onClick={() => setEnrollDialogOpen(false)}
            >
              <XIcon size={16} />
              <span>Cancel</span>
            </button>
            <button className="bg-[#00A4EF] hover:bg-[#0078D4] text-white px-4 py-2 flex items-center gap-2">
              <CheckCircleIcon size={16} />
              <span>Enroll</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unenroll Dialog */}
      <Dialog open={unenrollDialogOpen} onOpenChange={setUnenrollDialogOpen}>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              Unenroll from Course
            </DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Are you sure you want to unenroll from "{selectedCourse?.title}"? Your progress will be saved.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <button
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center gap-2`}
              onClick={() => setUnenrollDialogOpen(false)}
            >
              <XIcon size={16} />
              <span>Cancel</span>
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 flex items-center gap-2">
              <TrashIcon size={16} />
              <span>Unenroll</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
