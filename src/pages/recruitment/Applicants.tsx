import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  UserIcon, 
  EmailIcon, 
  PhoneIcon, 
  DownloadIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  UsersIcon,
  FilterIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/Button';

interface Applicant {
  id: string;
  name: string;
  position: string;
  jobId: string;
  email: string;
  phone: string;
  status: 'Under Review' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected' | 'Shortlisted';
  score: number;
  appliedDate: string;
  experience: string;
  education: string;
  skills: string[];
  resumeUrl: string;
}

export const Applicants: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'under-review' | 'shortlisted' | 'interview' | 'rejected'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const applicants: Applicant[] = [
    { 
      id: '1', 
      name: 'Alice Johnson', 
      position: 'Senior Full Stack Developer', 
      jobId: '1',
      email: 'alice.johnson@email.com', 
      phone: '+233 24 567 8901', 
      status: 'Under Review', 
      score: 85, 
      appliedDate: '2025-02-20',
      experience: '5 years',
      education: 'BS Computer Science, University of Ghana',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      resumeUrl: '/resumes/alice-johnson.pdf'
    },
    { 
      id: '2', 
      name: 'Bob Smith', 
      position: 'Senior Full Stack Developer', 
      jobId: '1',
      email: 'bob.smith@email.com', 
      phone: '+233 24 567 8902', 
      status: 'Interview Scheduled', 
      score: 92, 
      appliedDate: '2025-02-18',
      experience: '7 years',
      education: 'MS Software Engineering, KNUST',
      skills: ['React', 'Python', 'Docker', 'Kubernetes'],
      resumeUrl: '/resumes/bob-smith.pdf'
    },
    { 
      id: '3', 
      name: 'Carol Williams', 
      position: 'UX/UI Designer', 
      jobId: '3',
      email: 'carol.williams@email.com', 
      phone: '+233 24 567 8903', 
      status: 'Offer Extended', 
      score: 88, 
      appliedDate: '2025-02-15',
      experience: '4 years',
      education: 'BA Graphic Design, Ashesi University',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
      resumeUrl: '/resumes/carol-williams.pdf'
    },
    { 
      id: '4', 
      name: 'David Brown', 
      position: 'Data Analyst', 
      jobId: '4',
      email: 'david.brown@email.com', 
      phone: '+233 24 567 8904', 
      status: 'Rejected', 
      score: 65, 
      appliedDate: '2025-02-10',
      experience: '2 years',
      education: 'BS Statistics, University of Cape Coast',
      skills: ['SQL', 'Python', 'Excel', 'Tableau'],
      resumeUrl: '/resumes/david-brown.pdf'
    },
    { 
      id: '5', 
      name: 'Emma Davis', 
      position: 'Product Manager', 
      jobId: '2',
      email: 'emma.davis@email.com', 
      phone: '+233 24 567 8905', 
      status: 'Shortlisted', 
      score: 90, 
      appliedDate: '2025-02-12',
      experience: '6 years',
      education: 'MBA, University of Ghana Business School',
      skills: ['Product Strategy', 'Agile', 'Roadmapping', 'Analytics'],
      resumeUrl: '/resumes/emma-davis.pdf'
    },
    { 
      id: '6', 
      name: 'Frank Miller', 
      position: 'Product Manager', 
      jobId: '2',
      email: 'frank.miller@email.com', 
      phone: '+233 24 567 8906', 
      status: 'Under Review', 
      score: 78, 
      appliedDate: '2025-02-19',
      experience: '4 years',
      education: 'BS Business Administration, KNUST',
      skills: ['Product Management', 'Jira', 'SQL', 'User Stories'],
      resumeUrl: '/resumes/frank-miller.pdf'
    },
    { 
      id: '7', 
      name: 'Grace Wilson', 
      position: 'UX/UI Designer', 
      jobId: '3',
      email: 'grace.wilson@email.com', 
      phone: '+233 24 567 8907', 
      status: 'Interview Scheduled', 
      score: 86, 
      appliedDate: '2025-02-17',
      experience: '3 years',
      education: 'BA Design, University of Ghana',
      skills: ['Figma', 'Prototyping', 'Wireframing', 'UI Design'],
      resumeUrl: '/resumes/grace-wilson.pdf'
    },
    { 
      id: '8', 
      name: 'Henry Taylor', 
      position: 'HR Coordinator', 
      jobId: '5',
      email: 'henry.taylor@email.com', 
      phone: '+233 24 567 8908', 
      status: 'Under Review', 
      score: 82, 
      appliedDate: '2025-02-21',
      experience: '3 years',
      education: 'BS Human Resource Management, UCC',
      skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Onboarding'],
      resumeUrl: '/resumes/henry-taylor.pdf'
    },
    { 
      id: '9', 
      name: 'Isabel Martinez', 
      position: 'Senior Full Stack Developer', 
      jobId: '1',
      email: 'isabel.martinez@email.com', 
      phone: '+233 24 567 8909', 
      status: 'Shortlisted', 
      score: 89, 
      appliedDate: '2025-02-16',
      experience: '6 years',
      education: 'MS Computer Science, Ashesi University',
      skills: ['Vue.js', 'Node.js', 'MongoDB', 'GraphQL'],
      resumeUrl: '/resumes/isabel-martinez.pdf'
    },
    { 
      id: '10', 
      name: 'Jack Anderson', 
      position: 'DevOps Engineer', 
      jobId: '6',
      email: 'jack.anderson@email.com', 
      phone: '+233 24 567 8910', 
      status: 'Under Review', 
      score: 84, 
      appliedDate: '2025-02-14',
      experience: '5 years',
      education: 'BS Computer Engineering, KNUST',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      resumeUrl: '/resumes/jack-anderson.pdf'
    },
  ];

  const summaryCards = [
    { 
      label: 'Total Applicants', 
      value: applicants.length, 
      icon: UsersIcon,
      color: '#00A4EF',
      bgColor: '#00A4EF20'
    },
    { 
      label: 'Under Review', 
      value: applicants.filter(a => a.status === 'Under Review').length, 
      icon: ClockIcon,
      color: '#FFB900',
      bgColor: '#FFB90020'
    },
    { 
      label: 'Interviews Scheduled', 
      value: applicants.filter(a => a.status === 'Interview Scheduled').length, 
      icon: UserIcon,
      color: '#7FBA00',
      bgColor: '#7FBA0020'
    },
    { 
      label: 'Offers Extended', 
      value: applicants.filter(a => a.status === 'Offer Extended').length, 
      icon: CheckCircleIcon,
      color: '#F25022',
      bgColor: '#F2502220'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
        return { bg: 'bg-[#FFB900]/20', text: 'text-[#FFB900]' };
      case 'Interview Scheduled':
        return { bg: 'bg-[#00A4EF]/20', text: 'text-[#00A4EF]' };
      case 'Offer Extended':
        return { bg: 'bg-[#7FBA00]/20', text: 'text-[#7FBA00]' };
      case 'Shortlisted':
        return { bg: 'bg-[#00A4EF]/20', text: 'text-[#00A4EF]' };
      case 'Rejected':
        return { bg: 'bg-[#F25022]/20', text: 'text-[#F25022]' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-500' };
    }
  };

  const handleViewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsViewOpen(true);
  };

  const handleApproveApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsApproveOpen(true);
  };

  const handleRejectApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsRejectOpen(true);
  };

  const filteredApplicants = applicants.filter(applicant => {
    if (activeTab === 'all') return true;
    if (activeTab === 'under-review') return applicant.status === 'Under Review';
    if (activeTab === 'shortlisted') return applicant.status === 'Shortlisted';
    if (activeTab === 'interview') return applicant.status === 'Interview Scheduled';
    if (activeTab === 'rejected') return applicant.status === 'Rejected';
    return true;
  });

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Applicants
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 text-sm bg-gray-500/20 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 hover:bg-gray-500/30 transition-colors"
          >
            <FilterIcon size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        {summaryCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`
                ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}
                p-6 shadow-sm border
                ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {[
          { key: 'all', label: 'All Applicants', count: applicants.length },
          { key: 'under-review', label: 'Under Review', count: applicants.filter(a => a.status === 'Under Review').length },
          { key: 'shortlisted', label: 'Shortlisted', count: applicants.filter(a => a.status === 'Shortlisted').length },
          { key: 'interview', label: 'Interview', count: applicants.filter(a => a.status === 'Interview Scheduled').length },
          { key: 'rejected', label: 'Rejected', count: applicants.filter(a => a.status === 'Rejected').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as any);
              setCurrentPage(1);
            }}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? `border-b-2 border-[#00A4EF] ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Applicant
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Position
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Contact
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Score
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Applied
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {paginatedApplicants.map((applicant) => {
                const statusColor = getStatusColor(applicant.status);
                return (
                  <tr key={applicant.id} className={`${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00A4EF]/20 flex items-center justify-center" style={{ color: '#00A4EF' }}>
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {applicant.name}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {applicant.experience} exp.
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {applicant.position}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <EmailIcon size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {applicant.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {applicant.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 w-16">
                          <div
                            className="h-2"
                            style={{
                              width: `${applicant.score}%`,
                              backgroundColor: applicant.score >= 80 ? '#7FBA00' : applicant.score >= 60 ? '#FFB900' : '#F25022'
                            }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {applicant.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {applicant.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewApplicant(applicant)}
                          className="p-1.5 text-[#00A4EF] hover:bg-[#00A4EF]/10 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon size={16} />
                        </button>
                        <button
                          onClick={() => window.open(applicant.resumeUrl, '_blank')}
                          className="p-1.5 text-[#FFB900] hover:bg-[#FFB900]/10 transition-colors"
                          title="Download Resume"
                        >
                          <DownloadIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleApproveApplicant(applicant)}
                          className="p-1.5 text-[#7FBA00] hover:bg-[#7FBA00]/10 transition-colors"
                          title="Approve"
                        >
                          <CheckCircleIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleRejectApplicant(applicant)}
                          className="p-1.5 text-[#F25022] hover:bg-[#F25022]/10 transition-colors"
                          title="Reject"
                        >
                          <XCircleIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`px-6 py-4 flex items-center justify-between border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredApplicants.length)} of {filteredApplicants.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm flex items-center gap-1 border ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                <ChevronLeftIcon size={16} />
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border ${
                      currentPage === page
                        ? 'bg-[#00A4EF] text-white border-[#00A4EF]'
                        : `${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm flex items-center gap-1 border ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Next
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Filter Applicants</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Refine applicant list by status, position, and score
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Statuses</option>
                <option value="under-review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview Scheduled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Position
              </label>
              <select
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Positions</option>
                <option value="developer">Senior Full Stack Developer</option>
                <option value="pm">Product Manager</option>
                <option value="designer">UX/UI Designer</option>
                <option value="analyst">Data Analyst</option>
                <option value="hr">HR Coordinator</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Minimum Score
              </label>
              <select
                className={`w-full px-4 py-2 border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="0">All Scores</option>
                <option value="60">60+</option>
                <option value="70">70+</option>
                <option value="80">80+</option>
                <option value="90">90+</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen(false)}
              className="text-sm"
            >
              Clear
            </Button>
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="bg-[#00A4EF] text-white hover:bg-[#0078D4] text-sm"
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Applicant Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className={`max-w-3xl ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              {selectedApplicant?.name}
            </DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Complete applicant profile and details
            </DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Position Applied</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.position}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Application Date</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.appliedDate}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.email}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.phone}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience</p>
                  <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.experience}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2">
                      <div
                        className="h-2"
                        style={{
                          width: `${selectedApplicant.score}%`,
                          backgroundColor: selectedApplicant.score >= 80 ? '#7FBA00' : selectedApplicant.score >= 60 ? '#FFB900' : '#F25022'
                        }}
                      />
                    </div>
                    <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedApplicant.score}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Education</p>
                <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.education}</p>
              </div>

              <div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill, idx) => (
                    <span key={idx} className={`px-3 py-1 text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                    <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium ${getStatusColor(selectedApplicant.status).bg} ${getStatusColor(selectedApplicant.status).text}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <Button
                    onClick={() => window.open(selectedApplicant.resumeUrl, '_blank')}
                    className="bg-[#00A4EF] text-white hover:bg-[#0078D4] text-sm flex items-center gap-2"
                  >
                    <DownloadIcon size={16} />
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsViewOpen(false)}
              className="text-sm"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approve Applicant Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Approve Applicant</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Move applicant to the next stage
            </DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4">
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedApplicant.position}
                </p>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Score: <span className="font-bold">{selectedApplicant.score}</span>
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Move to Stage
                </label>
                <select
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option>Shortlisted</option>
                  <option>Interview Scheduled</option>
                  <option>Offer Extended</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Add any notes about this decision..."
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsApproveOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsApproveOpen(false)}
              className="bg-[#7FBA00] text-white hover:bg-[#6AA000] text-sm"
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Applicant Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Reject Applicant</DialogTitle>
            <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Are you sure you want to reject this applicant?
            </DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4">
              <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedApplicant.position}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rejection Reason
                </label>
                <select
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option>Qualifications not met</option>
                  <option>Position filled</option>
                  <option>Better candidates available</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Provide feedback for the applicant..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="sendEmail" className="w-4 h-4" />
                <label htmlFor="sendEmail" className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Send rejection email to applicant
                </label>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsRejectOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsRejectOpen(false)}
              className="bg-[#F25022] text-white hover:bg-[#D13F1A] text-sm"
            >
              Reject Applicant
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};
