import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { 
  SearchIcon, 
  FilterIcon, 
  BriefcaseIcon, 
  LocationIcon, 
  XIcon, 
  PlusIcon, 
  TrashIcon, 
  EditIcon,
  UsersIcon,
  UserIcon,
  CheckCircleIcon,
  StarIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  PhoneIcon
} from '@/components/Icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface TalentProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  status: 'active' | 'passive' | 'hired';
  appliedFor?: string;
  email?: string;
  phone?: string;
  rating?: number;
  source?: string;
  addedDate?: string;
  lastContact?: string;
  notes?: string;
}

const mockTalentPool: TalentProfile[] = [
  {
    id: '1',
    name: 'Robert Garcia',
    title: 'Senior Backend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    status: 'active',
    appliedFor: 'Backend Engineer',
    email: 'robert.garcia@email.com',
    phone: '+1 (555) 123-4567',
    rating: 4.5,
    source: 'LinkedIn',
    addedDate: '2025-09-15',
    lastContact: '2025-10-28',
    notes: 'Strong technical background, excellent communication skills',
  },
  {
    id: '2',
    name: 'Lisa Anderson',
    title: 'Product Designer',
    location: 'New York, NY',
    experience: '5 years',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
    status: 'passive',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 234-5678',
    rating: 4.8,
    source: 'Referral',
    addedDate: '2025-08-20',
    lastContact: '2025-10-15',
    notes: 'Portfolio shows great attention to detail',
  },
  {
    id: '3',
    name: 'Chris Taylor',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    experience: '6 years',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    status: 'active',
    appliedFor: 'Senior Data Scientist',
    email: 'chris.taylor@email.com',
    phone: '+1 (555) 345-6789',
    rating: 4.7,
    source: 'Indeed',
    addedDate: '2025-10-01',
    lastContact: '2025-11-02',
    notes: 'PhD in Computer Science, published researcher',
  },
  {
    id: '4',
    name: 'Jennifer Kim',
    title: 'DevOps Engineer',
    location: 'Austin, TX',
    experience: '7 years',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
    status: 'active',
    appliedFor: 'DevOps Engineer',
    email: 'jennifer.kim@email.com',
    phone: '+1 (555) 456-7890',
    rating: 4.9,
    source: 'LinkedIn',
    addedDate: '2025-10-10',
    lastContact: '2025-11-01',
    notes: 'AWS certified, strong automation skills',
  },
  {
    id: '5',
    name: 'Michael Chen',
    title: 'Full Stack Developer',
    location: 'Boston, MA',
    experience: '4 years',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    status: 'hired',
    appliedFor: 'Senior Full Stack Developer',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 567-8901',
    rating: 4.6,
    source: 'Glassdoor',
    addedDate: '2025-09-05',
    lastContact: '2025-10-25',
    notes: 'Hired for Q4 2025 start',
  },
  {
    id: '6',
    name: 'Sarah Martinez',
    title: 'Marketing Manager',
    location: 'Denver, CO',
    experience: '6 years',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    status: 'passive',
    email: 'sarah.martinez@email.com',
    phone: '+1 (555) 678-9012',
    rating: 4.3,
    source: 'Career Fair',
    addedDate: '2025-08-12',
    lastContact: '2025-09-30',
    notes: 'Interested in future opportunities',
  },
];

const talentByStatusData = [
  { name: 'Active', value: 3, color: '#7FBA00' },
  { name: 'Passive', value: 2, color: '#FFB900' },
  { name: 'Hired', value: 1, color: '#00A4EF' },
];

const talentBySourceData = [
  { source: 'LinkedIn', count: 2 },
  { source: 'Referral', count: 1 },
  { source: 'Indeed', count: 1 },
  { source: 'Glassdoor', count: 1 },
  { source: 'Career Fair', count: 1 },
];

export const TalentPool: React.FC = () => {
  const { theme } = useTheme();
  const [talents, setTalents] = useState<TalentProfile[]>(mockTalentPool);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTalent, setEditingTalent] = useState<TalentProfile | null>(null);
  const [viewingTalent, setViewingTalent] = useState<TalentProfile | null>(null);
  const [deletingTalent, setDeletingTalent] = useState<TalentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'passive' | 'hired'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const [formData, setFormData] = useState<Partial<TalentProfile>>({
    name: '',
    title: '',
    location: '',
    experience: '',
    skills: [],
    status: 'active',
    appliedFor: '',
    email: '',
    phone: '',
    rating: 0,
    source: '',
    notes: '',
  });
  const [skillInput, setSkillInput] = useState('');

  const [filterData, setFilterData] = useState({
    status: '',
    source: '',
    minRating: '',
    skills: '',
  });

  // Summary calculations
  const totalCandidates = talents.length;
  const activeCandidates = talents.filter(t => t.status === 'active').length;
  const hiredCandidates = talents.filter(t => t.status === 'hired').length;
  const avgRating = talents.length > 0 
    ? (talents.reduce((sum, t) => sum + (t.rating || 0), 0) / talents.length).toFixed(1) 
    : '0.0';

  const handleOpenDialog = (talent?: TalentProfile) => {
    if (talent) {
      setEditingTalent(talent);
      setFormData(talent);
      setIsEditDialogOpen(true);
    } else {
      setEditingTalent(null);
      setFormData({
        name: '',
        title: '',
        location: '',
        experience: '',
        skills: [],
        status: 'active',
        appliedFor: '',
        email: '',
        phone: '',
        rating: 0,
        source: '',
        notes: '',
      });
      setIsAddDialogOpen(true);
    }
  };

  const handleOpenViewDialog = (talent: TalentProfile) => {
    setViewingTalent(talent);
    setIsViewDialogOpen(true);
  };

  const handleOpenDeleteDialog = (talent: TalentProfile) => {
    setDeletingTalent(talent);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsFilterDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setEditingTalent(null);
    setViewingTalent(null);
    setDeletingTalent(null);
    setSkillInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTalent) {
      setTalents(talents.map(t => t.id === editingTalent.id ? { ...formData, id: editingTalent.id } as TalentProfile : t));
    } else {
      const newTalent: TalentProfile = {
        ...formData,
        id: `talent-${Date.now()}`,
        addedDate: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      } as TalentProfile;
      setTalents([...talents, newTalent]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (deletingTalent) {
      setTalents(talents.filter(t => t.id !== deletingTalent.id));
      handleCloseDialog();
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter((_, i) => i !== index) || []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#7FBA00]/10 text-[#7FBA00] border border-[#7FBA00]/20';
      case 'passive':
        return 'bg-[#FFB900]/10 text-[#FFB900] border border-[#FFB900]/20';
      case 'hired':
        return 'bg-[#00A4EF]/10 text-[#00A4EF] border border-[#00A4EF]/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600';
    }
  };

  // Filter and search
  const filteredTalents = talents.filter(talent => {
    const matchesSearch = !searchTerm || 
      talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || talent.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTalents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTalents = filteredTalents.slice(startIndex, startIndex + itemsPerPage);

  const applyFilter = () => {
    // Filter logic can be expanded here
    handleCloseDialog();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Talent Pool
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage your candidate database
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <FilterIcon size={16} className="mr-1" />
            Filter
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => handleOpenDialog()}
          >
            <PlusIcon size={16} className="mr-1" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCandidates}</p>
            </div>
            <div className="bg-[#00A4EF]/10 p-2">
              <UsersIcon size={20} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeCandidates}</p>
            </div>
            <div className="bg-[#7FBA00]/10 p-2">
              <CheckCircleIcon size={20} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hired</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{hiredCandidates}</p>
            </div>
            <div className="bg-[#00A4EF]/10 p-2">
              <UserIcon size={20} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{avgRating}</p>
            </div>
            <div className="bg-[#FFB900]/10 p-2">
              <StarIcon size={20} className="text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Candidates by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={talentByStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {talentByStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Candidates by Source</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={talentBySourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="source" 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '0.125rem',
                }}
              />
              <Bar dataKey="count" fill="#00A4EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, skills, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          {[
            { key: 'all', label: 'All Candidates' },
            { key: 'active', label: 'Active' },
            { key: 'passive', label: 'Passive' },
            { key: 'hired', label: 'Hired' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-[#00A4EF] text-[#00A4EF]'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Talent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedTalents.map((talent) => (
          <div
            key={talent.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white font-bold">
                  {talent.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{talent.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{talent.title}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(talent.status)}`}>
                {talent.status}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <LocationIcon size={14} className="text-[#00A4EF]" />
                <span>{talent.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <BriefcaseIcon size={14} className="text-[#7FBA00]" />
                <span>{talent.experience}</span>
              </div>
              {talent.rating && (
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <StarIcon size={14} className="text-[#FFB900]" />
                  <span>{talent.rating} / 5.0</span>
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Skills</div>
              <div className="flex flex-wrap gap-1">
                {talent.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#00A4EF]/10 text-[#00A4EF] text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {talent.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs">
                    +{talent.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {talent.appliedFor && (
              <div className="mb-3 p-2 bg-[#FFB900]/10">
                <div className="text-xs text-gray-600 dark:text-gray-400">Applied for</div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">{talent.appliedFor}</div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleOpenViewDialog(talent)}>
                <EyeIcon size={14} className="mr-1" />
                View
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleOpenDialog(talent)}>
                <EditIcon size={14} />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleOpenDeleteDialog(talent)}>
                <TrashIcon size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTalents.length)} of {filteredTalents.length} candidates
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm ${
                    currentPage === page
                      ? 'bg-[#00A4EF] text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      {(isAddDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingTalent ? 'Edit Candidate' : 'Add Candidate'}
              </h2>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 5 years"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Source
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., LinkedIn"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Applied For
                </label>
                <input
                  type="text"
                  value={formData.appliedFor}
                  onChange={(e) => setFormData({ ...formData, appliedFor: e.target.value })}
                  placeholder="Position applied for (optional)"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                  />
                  <Button type="button" variant="secondary" size="sm" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#00A4EF]/10 text-[#00A4EF] text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="hover:text-[#F25022]"
                      >
                        <XIcon size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary" size="sm" className="flex-1">
                  {editingTalent ? 'Update Candidate' : 'Add Candidate'}
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={handleCloseDialog} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Dialog */}
      {isViewDialogOpen && viewingTalent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Candidate Details</h2>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white font-bold text-xl">
                  {viewingTalent.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{viewingTalent.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{viewingTalent.title}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium mt-2 ${getStatusColor(viewingTalent.status)}`}>
                    {viewingTalent.status}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MailIcon size={16} className="text-[#00A4EF]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.email || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneIcon size={16} className="text-[#7FBA00]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.phone || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LocationIcon size={16} className="text-[#00A4EF]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.location}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BriefcaseIcon size={16} className="text-[#7FBA00]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.experience}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {viewingTalent.rating && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</div>
                    <div className="flex items-center gap-1">
                      <StarIcon size={16} className="text-[#FFB900]" />
                      <span className="text-sm text-gray-900 dark:text-white">{viewingTalent.rating} / 5.0</span>
                    </div>
                  </div>
                )}

                {viewingTalent.source && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</div>
                    <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.source}</p>
                  </div>
                )}

                {viewingTalent.addedDate && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Added Date</div>
                    <p className="text-sm text-gray-900 dark:text-white">{viewingTalent.addedDate}</p>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingTalent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#00A4EF]/10 text-[#00A4EF] text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {viewingTalent.appliedFor && (
                <div className="bg-[#FFB900]/10 p-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applied For</div>
                  <p className="text-gray-900 dark:text-white">{viewingTalent.appliedFor}</p>
                </div>
              )}

              {viewingTalent.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{viewingTalent.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="primary" size="sm" className="flex-1" onClick={() => {
                  handleCloseDialog();
                  handleOpenDialog(viewingTalent);
                }}>
                  <EditIcon size={16} className="mr-1" />
                  Edit Candidate
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCloseDialog}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Dialog */}
      {isFilterDialogOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filter Candidates</h2>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filterData.status}
                  onChange={(e) => setFilterData({ ...filterData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="passive">Passive</option>
                  <option value="hired">Hired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Source
                </label>
                <input
                  type="text"
                  value={filterData.source}
                  onChange={(e) => setFilterData({ ...filterData, source: e.target.value })}
                  placeholder="e.g., LinkedIn, Indeed"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Rating
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filterData.minRating}
                  onChange={(e) => setFilterData({ ...filterData, minRating: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={filterData.skills}
                  onChange={(e) => setFilterData({ ...filterData, skills: e.target.value })}
                  placeholder="e.g., Python, React"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="primary" size="sm" className="flex-1" onClick={applyFilter}>
                  Apply Filters
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && deletingTalent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Delete</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to remove <strong>{deletingTalent.name}</strong> from the talent pool? This action cannot be undone.
              </p>

              <div className="flex gap-2">
                <Button variant="danger" size="sm" className="flex-1" onClick={handleDelete}>
                  Delete Candidate
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPool;
