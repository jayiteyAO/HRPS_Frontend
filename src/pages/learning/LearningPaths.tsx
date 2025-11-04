import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  TargetIcon,
  BookIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  EyeIcon,
  TrophyIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalCourses: number;
  completedCourses: number;
  duration: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  thumbnail: string;
  estimatedWeeks: number;
  skills: string[];
  courses: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    order: number;
  }[];
  enrolledDate?: string;
  targetDate?: string;
}

export const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const learningPaths: LearningPath[] = [
    {
      id: 'LP001',
      title: 'Full Stack Developer Path',
      description: 'Master front-end and back-end development with modern technologies',
      category: 'Development',
      level: 'Intermediate',
      totalCourses: 8,
      completedCourses: 5,
      duration: '120 hours',
      progress: 62,
      status: 'In Progress',
      thumbnail: '💻',
      estimatedWeeks: 16,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      courses: [
        { id: 'C1', title: 'HTML & CSS Fundamentals', duration: '10h', completed: true, order: 1 },
        { id: 'C2', title: 'JavaScript Advanced', duration: '15h', completed: true, order: 2 },
        { id: 'C3', title: 'React.js Complete Guide', duration: '20h', completed: true, order: 3 },
        { id: 'C4', title: 'Node.js & Express', duration: '18h', completed: true, order: 4 },
        { id: 'C5', title: 'MongoDB Database', duration: '12h', completed: true, order: 5 },
        { id: 'C6', title: 'REST API Development', duration: '15h', completed: false, order: 6 },
        { id: 'C7', title: 'TypeScript Mastery', duration: '15h', completed: false, order: 7 },
        { id: 'C8', title: 'Full Stack Project', duration: '15h', completed: false, order: 8 },
      ],
      enrolledDate: '2024-08-01',
      targetDate: '2024-12-01',
    },
    {
      id: 'LP002',
      title: 'Data Science Professional',
      description: 'Learn data analysis, machine learning, and AI fundamentals',
      category: 'Data Science',
      level: 'Advanced',
      totalCourses: 10,
      completedCourses: 10,
      duration: '150 hours',
      progress: 100,
      status: 'Completed',
      thumbnail: '📊',
      estimatedWeeks: 20,
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      courses: [
        { id: 'C9', title: 'Python for Data Science', duration: '15h', completed: true, order: 1 },
        { id: 'C10', title: 'Statistics & Probability', duration: '12h', completed: true, order: 2 },
        { id: 'C11', title: 'SQL Database Mastery', duration: '10h', completed: true, order: 3 },
        { id: 'C12', title: 'Data Visualization', duration: '15h', completed: true, order: 4 },
        { id: 'C13', title: 'Machine Learning Basics', duration: '20h', completed: true, order: 5 },
        { id: 'C14', title: 'Deep Learning', duration: '25h', completed: true, order: 6 },
        { id: 'C15', title: 'Natural Language Processing', duration: '18h', completed: true, order: 7 },
        { id: 'C16', title: 'Computer Vision', duration: '15h', completed: true, order: 8 },
        { id: 'C17', title: 'AI Model Deployment', duration: '10h', completed: true, order: 9 },
        { id: 'C18', title: 'Capstone Project', duration: '10h', completed: true, order: 10 },
      ],
      enrolledDate: '2023-10-01',
      targetDate: '2024-03-01',
    },
    {
      id: 'LP003',
      title: 'Cloud Architecture Expert',
      description: 'Become proficient in cloud infrastructure and services',
      category: 'Cloud',
      level: 'Advanced',
      totalCourses: 6,
      completedCourses: 3,
      duration: '90 hours',
      progress: 50,
      status: 'In Progress',
      thumbnail: '☁️',
      estimatedWeeks: 12,
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
      courses: [
        { id: 'C19', title: 'Cloud Computing Basics', duration: '10h', completed: true, order: 1 },
        { id: 'C20', title: 'AWS Fundamentals', duration: '20h', completed: true, order: 2 },
        { id: 'C21', title: 'Azure Services', duration: '15h', completed: true, order: 3 },
        { id: 'C22', title: 'Docker & Containers', duration: '15h', completed: false, order: 4 },
        { id: 'C23', title: 'Kubernetes Orchestration', duration: '20h', completed: false, order: 5 },
        { id: 'C24', title: 'Cloud Security', duration: '10h', completed: false, order: 6 },
      ],
      enrolledDate: '2024-09-01',
      targetDate: '2024-12-15',
    },
    {
      id: 'LP004',
      title: 'Digital Marketing Specialist',
      description: 'Master SEO, social media, content marketing, and analytics',
      category: 'Marketing',
      level: 'Beginner',
      totalCourses: 7,
      completedCourses: 0,
      duration: '70 hours',
      progress: 0,
      status: 'Not Started',
      thumbnail: '📱',
      estimatedWeeks: 10,
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
      courses: [
        { id: 'C25', title: 'Marketing Fundamentals', duration: '8h', completed: false, order: 1 },
        { id: 'C26', title: 'SEO Optimization', duration: '12h', completed: false, order: 2 },
        { id: 'C27', title: 'Content Strategy', duration: '10h', completed: false, order: 3 },
        { id: 'C28', title: 'Social Media Marketing', duration: '12h', completed: false, order: 4 },
        { id: 'C29', title: 'Email Marketing', duration: '8h', completed: false, order: 5 },
        { id: 'C30', title: 'Google Analytics', duration: '10h', completed: false, order: 6 },
        { id: 'C31', title: 'Marketing Campaign Project', duration: '10h', completed: false, order: 7 },
      ],
    },
    {
      id: 'LP005',
      title: 'Cybersecurity Professional',
      description: 'Learn security fundamentals, ethical hacking, and threat detection',
      category: 'Security',
      level: 'Intermediate',
      totalCourses: 8,
      completedCourses: 2,
      duration: '100 hours',
      progress: 25,
      status: 'In Progress',
      thumbnail: '🔒',
      estimatedWeeks: 14,
      skills: ['Network Security', 'Penetration Testing', 'Cryptography'],
      courses: [
        { id: 'C32', title: 'Security Fundamentals', duration: '10h', completed: true, order: 1 },
        { id: 'C33', title: 'Network Security', duration: '15h', completed: true, order: 2 },
        { id: 'C34', title: 'Cryptography', duration: '12h', completed: false, order: 3 },
        { id: 'C35', title: 'Ethical Hacking', duration: '18h', completed: false, order: 4 },
        { id: 'C36', title: 'Penetration Testing', duration: '15h', completed: false, order: 5 },
        { id: 'C37', title: 'Incident Response', duration: '10h', completed: false, order: 6 },
        { id: 'C38', title: 'Security Auditing', duration: '12h', completed: false, order: 7 },
        { id: 'C39', title: 'Security Project', duration: '8h', completed: false, order: 8 },
      ],
      enrolledDate: '2024-10-01',
      targetDate: '2025-01-15',
    },
  ];

  const totalPaths = learningPaths.length;
  const inProgressPaths = learningPaths.filter(p => p.status === 'In Progress').length;
  const completedPaths = learningPaths.filter(p => p.status === 'Completed').length;
  const totalCourses = learningPaths.reduce((sum, p) => sum + p.totalCourses, 0);
  const completedCourses = learningPaths.reduce((sum, p) => sum + p.completedCourses, 0);

  const pathsByCategory = [
    { name: 'Development', value: learningPaths.filter(p => p.category === 'Development').length, color: '#00A4EF' },
    { name: 'Data Science', value: learningPaths.filter(p => p.category === 'Data Science').length, color: '#7FBA00' },
    { name: 'Cloud', value: learningPaths.filter(p => p.category === 'Cloud').length, color: '#FFB900' },
    { name: 'Marketing', value: learningPaths.filter(p => p.category === 'Marketing').length, color: '#F25022' },
    { name: 'Security', value: learningPaths.filter(p => p.category === 'Security').length, color: '#8764B8' },
  ].filter(c => c.value > 0);

  const progressData = [
    { month: 'Jul', completed: 0, started: 1 },
    { month: 'Aug', completed: 0, started: 2 },
    { month: 'Sep', completed: 0, started: 3 },
    { month: 'Oct', completed: 1, started: 4 },
    { month: 'Nov', completed: 1, started: 3 },
  ];

  const completionRateData = learningPaths
    .filter(p => p.status !== 'Not Started')
    .map(p => ({
      name: p.title.substring(0, 20) + '...',
      completion: p.progress,
      fill: p.status === 'Completed' ? '#7FBA00' : '#00A4EF',
    }));

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || path.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (path: LearningPath) => {
    setSelectedPath(path);
    setShowDetailsDialog(true);
  };

  const handleEnroll = (path: LearningPath) => {
    setSelectedPath(path);
    setShowEnrollDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TargetIcon size={32} className="text-[#00A4EF]" />
            My Learning Paths
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Follow structured paths to master new skills
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setShowCreateDialog(true)}>
            <PlusIcon size={16} />
            <span>Create Path</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Paths</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalPaths}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Available</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TargetIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{inProgressPaths}</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedPaths}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Finished</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrophyIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalCourses}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">In all paths</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BookIcon size={24} className="text-[#8764B8]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Courses Done</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedCourses}</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                {Math.round((completedCourses / totalCourses) * 100)}% complete
              </p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <CheckCircleIcon size={24} className="text-[#00BCF2]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">By Category</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Paths by domain</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pathsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pathsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Progress Trend</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly activity</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#7FBA00" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="started" stroke="#00A4EF" strokeWidth={2} name="Started" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Completion Rates</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Path progress</p>
          <div className="space-y-3">
            {completionRateData.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${item.completion}%`, backgroundColor: item.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search learning paths..."
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
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className={`h-32 flex items-center justify-center text-6xl ${
                path.status === 'Completed' ? 'bg-gradient-to-br from-[#7FBA00] to-[#5a8700]' :
                path.status === 'In Progress' ? 'bg-gradient-to-br from-[#00A4EF] to-[#0078D4]' :
                'bg-gradient-to-br from-gray-400 to-gray-600'
              }`}>
                {path.thumbnail}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={
                      path.status === 'Completed' ? 'success' :
                      path.status === 'In Progress' ? 'warning' : 'default'
                    }
                    size="sm"
                  >
                    {path.status}
                  </Badge>
                  <Badge variant="info" size="sm">{path.level}</Badge>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {path.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {path.description}
                </p>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>{path.progress}% Complete</span>
                    <span>{path.completedCourses}/{path.totalCourses} courses</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#7FBA00] h-2 rounded-full transition-all"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon size={14} />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookIcon size={14} />
                    <span>{path.totalCourses} courses</span>
                  </div>
                </div>

                <div className="mb-3">
                  <Badge variant="info" size="sm">{path.category}</Badge>
                </div>

                <div className="flex gap-2">
                  {path.status === 'Not Started' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEnroll(path)}
                    >
                      <PlusIcon size={14} />
                      <span>Enroll</span>
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetails(path)}
                    >
                      <PlayIcon size={14} />
                      <span>Continue</span>
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewDetails(path)}
                  >
                    <EyeIcon size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-12">
            <TargetIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No learning paths found</p>
          </div>
        )}
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Learning Path Details</DialogTitle>
          </DialogHeader>
          {selectedPath && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{selectedPath.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedPath.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {selectedPath.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">{selectedPath.category}</Badge>
                    <Badge variant="default" size="sm">{selectedPath.level}</Badge>
                    <Badge
                      variant={
                        selectedPath.status === 'Completed' ? 'success' :
                        selectedPath.status === 'In Progress' ? 'warning' : 'default'
                      }
                      size="sm"
                    >
                      {selectedPath.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedPath.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-[#7FBA00] h-3 rounded-full"
                      style={{ width: `${selectedPath.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Courses: {selectedPath.completedCourses}/{selectedPath.totalCourses}</span>
                    <span>Duration: {selectedPath.duration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills You'll Learn</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.skills.map((skill, idx) => (
                    <Badge key={idx} variant="default" size="sm">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Course Modules</h4>
                <div className="space-y-2">
                  {selectedPath.courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          course.completed 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {course.completed && <CheckCircleIcon size={16} className="text-[#7FBA00]" />}
                          {!course.completed && <span className="text-xs text-gray-500">{course.order}</span>}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            course.completed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {course.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{course.duration}</p>
                        </div>
                      </div>
                      {course.completed ? (
                        <Badge variant="success" size="sm">Completed</Badge>
                      ) : course.order === selectedPath.completedCourses + 1 ? (
                        <Button variant="primary" size="sm">
                          <PlayIcon size={12} />
                          <span>Start</span>
                        </Button>
                      ) : (
                        <Badge variant="default" size="sm">Locked</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {selectedPath.enrolledDate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(selectedPath.enrolledDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {selectedPath.targetDate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Target Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(selectedPath.targetDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPath.estimatedWeeks} weeks</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                  <Badge variant="info" size="sm">{selectedPath.level}</Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            {selectedPath && selectedPath.status !== 'Completed' && (
              <Button variant="primary">
                <PlayIcon size={16} />
                <span>{selectedPath.status === 'Not Started' ? 'Start Learning' : 'Continue Learning'}</span>
              </Button>
            )}
            {selectedPath && selectedPath.status === 'Completed' && (
              <Button variant="primary">
                <TrophyIcon size={16} />
                <span>View Certificate</span>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Enroll in Learning Path</DialogTitle>
          </DialogHeader>
          {selectedPath && (
            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ready to start <span className="font-semibold">{selectedPath.title}</span>?
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Courses:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPath.totalCourses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Duration:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPath.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPath.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completion Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">~{selectedPath.estimatedWeeks} weeks</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowEnrollDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowEnrollDialog(false)}>
              <PlusIcon size={16} />
              <span>Enroll Now</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Learning Path</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Path Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., AI Engineering Path"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Development</option>
                  <option>Data Science</option>
                  <option>Cloud</option>
                  <option>Security</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Completion (weeks)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., 12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Python, ML, AI"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Describe your learning path"
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
              <span>Create Path</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningPaths;
