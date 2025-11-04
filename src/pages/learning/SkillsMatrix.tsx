import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  StarIcon,
  TrendingUpIcon,
  TargetIcon,
  CheckCircleIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  EyeIcon,
  BookIcon,
  TrophyIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';

interface Skill {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  endorsements: number;
  lastAssessed: string;
  description: string;
  relatedCourses: string[];
  certifications: string[];
  yearsOfExperience: number;
  projects: string[];
}

export const SkillsMatrix = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAssessDialog, setShowAssessDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const skills: Skill[] = [
    {
      id: 'SKL001',
      name: 'React.js',
      category: 'Frontend',
      currentLevel: 4,
      targetLevel: 5,
      progress: 80,
      endorsements: 12,
      lastAssessed: '2024-10-15',
      description: 'Modern frontend framework for building user interfaces',
      relatedCourses: ['React Complete Guide', 'Advanced React Patterns'],
      certifications: ['React Developer Certification'],
      yearsOfExperience: 3,
      projects: ['HR Portal', 'E-commerce Platform', 'Dashboard App'],
    },
    {
      id: 'SKL002',
      name: 'Node.js',
      category: 'Backend',
      currentLevel: 4,
      targetLevel: 5,
      progress: 80,
      endorsements: 10,
      lastAssessed: '2024-10-01',
      description: 'Server-side JavaScript runtime environment',
      relatedCourses: ['Node.js Mastery', 'RESTful API Development'],
      certifications: [],
      yearsOfExperience: 3,
      projects: ['API Gateway', 'Microservices Backend'],
    },
    {
      id: 'SKL003',
      name: 'Python',
      category: 'Programming',
      currentLevel: 5,
      targetLevel: 5,
      progress: 100,
      endorsements: 15,
      lastAssessed: '2024-09-20',
      description: 'High-level programming language for various applications',
      relatedCourses: ['Python for Data Science', 'Advanced Python'],
      certifications: ['Python Developer Certification'],
      yearsOfExperience: 4,
      projects: ['Data Analysis Tool', 'ML Pipeline', 'Automation Scripts'],
    },
    {
      id: 'SKL004',
      name: 'AWS',
      category: 'Cloud',
      currentLevel: 3,
      targetLevel: 4,
      progress: 75,
      endorsements: 8,
      lastAssessed: '2024-10-10',
      description: 'Amazon Web Services cloud platform',
      relatedCourses: ['AWS Solutions Architect', 'AWS DevOps'],
      certifications: ['AWS Certified Solutions Architect'],
      yearsOfExperience: 2,
      projects: ['Cloud Migration', 'Serverless Application'],
    },
    {
      id: 'SKL005',
      name: 'SQL',
      category: 'Database',
      currentLevel: 4,
      targetLevel: 5,
      progress: 80,
      endorsements: 14,
      lastAssessed: '2024-09-15',
      description: 'Structured Query Language for database management',
      relatedCourses: ['SQL Mastery', 'Database Design'],
      certifications: [],
      yearsOfExperience: 5,
      projects: ['Database Optimization', 'Data Warehouse'],
    },
    {
      id: 'SKL006',
      name: 'Docker',
      category: 'DevOps',
      currentLevel: 3,
      targetLevel: 4,
      progress: 75,
      endorsements: 9,
      lastAssessed: '2024-10-05',
      description: 'Container platform for application deployment',
      relatedCourses: ['Docker & Kubernetes', 'Container Orchestration'],
      certifications: [],
      yearsOfExperience: 2,
      projects: ['Container Migration', 'CI/CD Pipeline'],
    },
    {
      id: 'SKL007',
      name: 'Project Management',
      category: 'Management',
      currentLevel: 4,
      targetLevel: 5,
      progress: 80,
      endorsements: 11,
      lastAssessed: '2024-09-25',
      description: 'Planning, executing, and managing projects',
      relatedCourses: ['PMP Preparation', 'Agile Project Management'],
      certifications: ['PMP Certified'],
      yearsOfExperience: 4,
      projects: ['Digital Transformation', 'Product Launch'],
    },
    {
      id: 'SKL008',
      name: 'Machine Learning',
      category: 'AI/ML',
      currentLevel: 3,
      targetLevel: 5,
      progress: 60,
      endorsements: 7,
      lastAssessed: '2024-10-20',
      description: 'Building and deploying ML models',
      relatedCourses: ['Machine Learning Basics', 'Deep Learning'],
      certifications: [],
      yearsOfExperience: 1.5,
      projects: ['Recommendation System', 'Predictive Analytics'],
    },
    {
      id: 'SKL009',
      name: 'TypeScript',
      category: 'Programming',
      currentLevel: 4,
      targetLevel: 5,
      progress: 80,
      endorsements: 10,
      lastAssessed: '2024-10-12',
      description: 'Typed superset of JavaScript',
      relatedCourses: ['TypeScript Complete', 'Advanced TypeScript'],
      certifications: [],
      yearsOfExperience: 2.5,
      projects: ['Type-safe API', 'React TypeScript App'],
    },
    {
      id: 'SKL010',
      name: 'UI/UX Design',
      category: 'Design',
      currentLevel: 3,
      targetLevel: 4,
      progress: 75,
      endorsements: 8,
      lastAssessed: '2024-09-30',
      description: 'User interface and experience design',
      relatedCourses: ['UI/UX Fundamentals', 'Design Systems'],
      certifications: [],
      yearsOfExperience: 2,
      projects: ['Design System', 'Mobile App Redesign'],
    },
  ];

  const totalSkills = skills.length;
  const masterSkills = skills.filter(s => s.currentLevel === 5).length;
  const advancedSkills = skills.filter(s => s.currentLevel === 4).length;
  const avgLevel = skills.reduce((sum, s) => sum + s.currentLevel, 0) / totalSkills;
  const totalEndorsements = skills.reduce((sum, s) => sum + s.endorsements, 0);

  const skillsByCategory = [
    { name: 'Frontend', value: skills.filter(s => s.category === 'Frontend').length, color: '#00A4EF' },
    { name: 'Backend', value: skills.filter(s => s.category === 'Backend').length, color: '#7FBA00' },
    { name: 'Programming', value: skills.filter(s => s.category === 'Programming').length, color: '#FFB900' },
    { name: 'Cloud', value: skills.filter(s => s.category === 'Cloud').length, color: '#F25022' },
    { name: 'Database', value: skills.filter(s => s.category === 'Database').length, color: '#8764B8' },
    { name: 'DevOps', value: skills.filter(s => s.category === 'DevOps').length, color: '#00BCF2' },
    { name: 'Management', value: skills.filter(s => s.category === 'Management').length, color: '#E74856' },
    { name: 'AI/ML', value: skills.filter(s => s.category === 'AI/ML').length, color: '#0078D4' },
    { name: 'Design', value: skills.filter(s => s.category === 'Design').length, color: '#10893E' },
  ].filter(c => c.value > 0);

  const levelDistribution = [
    { level: 'Expert (5)', count: skills.filter(s => s.currentLevel === 5).length },
    { level: 'Advanced (4)', count: skills.filter(s => s.currentLevel === 4).length },
    { level: 'Intermediate (3)', count: skills.filter(s => s.currentLevel === 3).length },
    { level: 'Beginner (2)', count: skills.filter(s => s.currentLevel === 2).length },
    { level: 'Novice (1)', count: skills.filter(s => s.currentLevel === 1).length },
  ].filter(l => l.count > 0);

  const radarData = skillsByCategory.map(cat => ({
    category: cat.name,
    current: skills
      .filter(s => s.category === cat.name)
      .reduce((sum, s) => sum + s.currentLevel, 0) / cat.value || 0,
    target: skills
      .filter(s => s.category === cat.name)
      .reduce((sum, s) => sum + s.targetLevel, 0) / cat.value || 0,
  }));

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'All' || skill.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleViewDetails = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowDetailsDialog(true);
  };

  const handleAssess = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowAssessDialog(true);
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Novice';
      case 2: return 'Beginner';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Unknown';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return '#E74856';
      case 2: return '#FFB900';
      case 3: return '#00BCF2';
      case 4: return '#0078D4';
      case 5: return '#7FBA00';
      default: return '#666666';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <StarIcon size={32} className="text-[#FFB900]" />
            My Skills Matrix
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and develop your professional skills
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setShowAddDialog(true)}>
            <PlusIcon size={16} />
            <span>Add Skill</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalSkills}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Tracked</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <StarIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expert Level</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{masterSkills}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Mastered</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrophyIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{advancedSkills}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Proficient</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TargetIcon size={24} className="text-[#8764B8]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Level</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{avgLevel.toFixed(1)}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Out of 5.0</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUpIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Endorsements</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalEndorsements}</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Total received</p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <CheckCircleIcon size={24} className="text-[#00BCF2]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Skill Radar</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Current vs target levels by category</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="Current" dataKey="current" stroke="#00A4EF" fill="#00A4EF" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#7FBA00" fill="#7FBA00" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Skill Categories</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution by domain</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {skillsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card padding={false} className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Level Distribution</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Skills by proficiency level</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={levelDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#00A4EF" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>All</option>
              {skillsByCategory.map(cat => (
                <option key={cat.name}>{cat.name}</option>
              ))}
            </select>
            <Button variant="secondary">
              <FilterIcon size={16} />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress to Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Endorsements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" size="sm">{skill.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <div
                            key={level}
                            className="w-4 h-4 rounded-sm"
                            style={{
                              backgroundColor: level <= skill.currentLevel 
                                ? getLevelColor(skill.currentLevel) 
                                : '#e5e7eb'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {getLevelName(skill.currentLevel)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Level {skill.currentLevel} → {skill.targetLevel}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#7FBA00] h-2 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {skill.yearsOfExperience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon size={16} className="text-green-600" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {skill.endorsements}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewDetails(skill)}
                      >
                        <EyeIcon size={14} />
                        <span>View</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAssess(skill)}
                      >
                        Assess
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <StarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No skills found</p>
          </div>
        )}

        {filteredSkills.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredSkills.length)} of {filteredSkills.length} skills
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-sm rounded-sm ${
                        currentPage === page
                          ? 'bg-[#00A4EF] text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="text-gray-500">...</span>;
                }
                return null;
              })}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Skill Details</DialogTitle>
          </DialogHeader>
          {selectedSkill && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedSkill.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {selectedSkill.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="info" size="sm">{selectedSkill.category}</Badge>
                  <Badge variant="success" size="sm">
                    {getLevelName(selectedSkill.currentLevel)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Level</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className="w-5 h-5 rounded-sm"
                          style={{
                            backgroundColor: level <= selectedSkill.currentLevel 
                              ? getLevelColor(selectedSkill.currentLevel) 
                              : '#e5e7eb'
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedSkill.currentLevel}/5
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Target Level</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    Level {selectedSkill.targetLevel} - {getLevelName(selectedSkill.targetLevel)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedSkill.yearsOfExperience} years
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Endorsements</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedSkill.endorsements} received
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Assessed</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {new Date(selectedSkill.lastAssessed).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedSkill.progress}% to target
                  </p>
                </div>
              </div>

              {selectedSkill.projects.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.projects.map((project, idx) => (
                      <Badge key={idx} variant="default" size="sm">{project}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedSkill.relatedCourses.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Related Courses</h4>
                  <div className="space-y-2">
                    {selectedSkill.relatedCourses.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookIcon size={14} />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSkill.certifications.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                  <div className="space-y-2">
                    {selectedSkill.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TrophyIcon size={14} className="text-yellow-500" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              setShowDetailsDialog(false);
              if (selectedSkill) handleAssess(selectedSkill);
            }}>
              <TargetIcon size={16} />
              <span>Assess Skill</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAssessDialog} onOpenChange={setShowAssessDialog}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Assess Skill Level</DialogTitle>
          </DialogHeader>
          {selectedSkill && (
            <div className="py-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Update your proficiency level for <span className="font-semibold">{selectedSkill.name}</span>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Level: {getLevelName(selectedSkill.currentLevel)}
                </label>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <label key={level} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <input
                        type="radio"
                        name="skillLevel"
                        value={level}
                        defaultChecked={level === selectedSkill.currentLevel}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">
                            Level {level} - {getLevelName(level)}
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(dot => (
                              <div
                                key={dot}
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: dot <= level ? getLevelColor(level) : '#e5e7eb'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Add any notes about your assessment..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowAssessDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowAssessDialog(false)}>
              <CheckCircleIcon size={16} />
              <span>Save Assessment</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Kubernetes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  {skillsByCategory.map(cat => (
                    <option key={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="1">1 - Novice</option>
                  <option value="2">2 - Beginner</option>
                  <option value="3">3 - Intermediate</option>
                  <option value="4">4 - Advanced</option>
                  <option value="5">5 - Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="1">1 - Novice</option>
                  <option value="2">2 - Beginner</option>
                  <option value="3">3 - Intermediate</option>
                  <option value="4">4 - Advanced</option>
                  <option value="5">5 - Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., 2.5"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Brief description of the skill"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowAddDialog(false)}>
              <PlusIcon size={16} />
              <span>Add Skill</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsMatrix;
