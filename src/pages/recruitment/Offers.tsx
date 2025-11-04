import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/Button';
import { 
  PlusIcon, 
  TrashIcon,
  EditIcon,
  EyeIcon,
  FilterIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  SendIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DollarIcon
} from '@/components/Icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Offer {
  id: string;
  candidate: string;
  position: string;
  department: string;
  salary: string;
  startDate: string;
  status: 'pending' | 'accepted' | 'declined' | 'draft';
  sentDate: string;
  benefits?: string;
  bonusStructure?: string;
  jobId: string;
  offerDate: string;
  expiryDate: string;
  responseDate?: string;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    candidate: 'Alice Martinez',
    position: 'Senior Full Stack Developer',
    department: 'Engineering',
    salary: '95000',
    startDate: '2025-12-01',
    status: 'pending',
    sentDate: '2025-11-01',
    benefits: 'Health, Dental, 401k, Stock Options',
    bonusStructure: '10% annual',
    jobId: '1',
    offerDate: '2025-11-01',
    expiryDate: '2025-11-15',
  },
  {
    id: '2',
    candidate: 'David Lee',
    position: 'UX/UI Designer',
    department: 'Design',
    salary: '85000',
    startDate: '2025-11-15',
    status: 'accepted',
    sentDate: '2025-10-25',
    benefits: 'Health, Dental, Vision, 401k',
    bonusStructure: '8% annual',
    jobId: '3',
    offerDate: '2025-10-25',
    expiryDate: '2025-11-08',
    responseDate: '2025-11-02',
  },
  {
    id: '3',
    candidate: 'Emily Chen',
    position: 'Product Manager',
    department: 'Product',
    salary: '105000',
    startDate: '2025-12-15',
    status: 'declined',
    sentDate: '2025-10-28',
    benefits: 'Health, Dental, Vision, 401k, Stock Options',
    bonusStructure: '15% annual',
    jobId: '2',
    offerDate: '2025-10-28',
    expiryDate: '2025-11-11',
    responseDate: '2025-11-05',
  },
  {
    id: '4',
    candidate: 'Michael Brown',
    position: 'Senior Full Stack Developer',
    department: 'Engineering',
    salary: '98000',
    startDate: '2025-11-25',
    status: 'draft',
    sentDate: '2025-11-03',
    benefits: 'Health, Dental, 401k',
    bonusStructure: '12% annual',
    jobId: '1',
    offerDate: '2025-11-03',
    expiryDate: '2025-11-17',
  },
  {
    id: '5',
    candidate: 'Sarah Johnson',
    position: 'DevOps Engineer',
    department: 'Engineering',
    salary: '92000',
    startDate: '2025-12-01',
    status: 'accepted',
    sentDate: '2025-10-30',
    benefits: 'Health, Dental, Vision, 401k',
    bonusStructure: '10% annual',
    jobId: '4',
    offerDate: '2025-10-30',
    expiryDate: '2025-11-13',
    responseDate: '2025-11-08',
  },
  {
    id: '6',
    candidate: 'Robert Wilson',
    position: 'Marketing Manager',
    department: 'Marketing',
    salary: '78000',
    startDate: '2025-11-20',
    status: 'pending',
    sentDate: '2025-11-02',
    benefits: 'Health, Dental, 401k',
    bonusStructure: '8% annual',
    jobId: '5',
    offerDate: '2025-11-02',
    expiryDate: '2025-11-16',
  },
];

const offerTrendData = [
  { month: 'Jul', sent: 8, accepted: 5, declined: 2 },
  { month: 'Aug', sent: 12, accepted: 8, declined: 3 },
  { month: 'Sep', sent: 10, accepted: 7, declined: 2 },
  { month: 'Oct', sent: 15, accepted: 11, declined: 3 },
  { month: 'Nov', sent: 6, accepted: 2, declined: 1 },
];

export const Offers: React.FC = () => {
  const { theme } = useTheme();
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [viewingOffer, setViewingOffer] = useState<Offer | null>(null);
  const [deletingOffer, setDeletingOffer] = useState<Offer | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'declined' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [formData, setFormData] = useState<Partial<Offer>>({
    candidate: '',
    position: '',
    department: '',
    salary: '',
    startDate: '',
    status: 'draft',
    benefits: '',
    bonusStructure: '',
    jobId: '',
    offerDate: '',
    expiryDate: '',
  });

  const [filterData, setFilterData] = useState({
    status: '',
    department: '',
    dateFrom: '',
    dateTo: '',
  });

  // Summary calculations
  const totalOffers = offers.length;
  const pendingOffers = offers.filter(o => o.status === 'pending').length;
  const acceptedOffers = offers.filter(o => o.status === 'accepted').length;
  const declinedOffers = offers.filter(o => o.status === 'declined').length;
  const draftOffers = offers.filter(o => o.status === 'draft').length;
  const acceptanceRate = totalOffers > 0 ? ((acceptedOffers / (totalOffers - draftOffers)) * 100).toFixed(1) : '0';

  const handleOpenCreateDialog = () => {
    setFormData({
      candidate: '',
      position: '',
      department: '',
      salary: '',
      startDate: '',
      status: 'draft',
      benefits: '',
      bonusStructure: '',
      jobId: '',
      offerDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
    });
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setIsEditDialogOpen(true);
  };

  const handleOpenViewDialog = (offer: Offer) => {
    setViewingOffer(offer);
    setIsViewDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsFilterDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setEditingOffer(null);
    setViewingOffer(null);
    setDeletingOffer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...formData, id: editingOffer.id } as Offer : o));
    } else {
      const newOffer: Offer = {
        ...formData,
        id: `offer-${Date.now()}`,
        sentDate: new Date().toISOString().split('T')[0],
      } as Offer;
      setOffers([...offers, newOffer]);
    }
    handleCloseDialogs();
  };

  const handleDelete = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
    handleCloseDialogs();
  };

  const handleOpenDeleteDialog = (offer: Offer) => {
    setDeletingOffer(offer);
    setIsDeleteDialogOpen(true);
  };

  const handleSendOffer = (id: string) => {
    setOffers(offers.map(o => 
      o.id === id ? { ...o, status: 'pending' as const, sentDate: new Date().toISOString().split('T')[0] } : o
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-[#7FBA00]/10 text-[#7FBA00] border-[#7FBA00]/20';
      case 'pending':
        return 'bg-[#FFB900]/10 text-[#FFB900] border-[#FFB900]/20';
      case 'declined':
        return 'bg-[#F25022]/10 text-[#F25022] border-[#F25022]/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600';
    }
  };

  // Filter offers based on active tab
  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'all') return true;
    return offer.status === activeTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOffers = filteredOffers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Job Offers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage job offers and candidate responses
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
            onClick={handleOpenCreateDialog}
          >
            <PlusIcon size={16} className="mr-1" />
            Create Offer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Offers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalOffers}</p>
            </div>
            <div className="bg-[#00A4EF]/10 p-2">
              <FileTextIcon size={20} className="text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{pendingOffers}</p>
            </div>
            <div className="bg-[#FFB900]/10 p-2">
              <ClockIcon size={20} className="text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{acceptedOffers}</p>
            </div>
            <div className="bg-[#7FBA00]/10 p-2">
              <CheckCircleIcon size={20} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{acceptanceRate}%</p>
            </div>
            <div className="bg-[#7FBA00]/10 p-2">
              <DollarIcon size={20} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Offer Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={offerTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="month" 
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
                borderRadius: '2px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#00A4EF" strokeWidth={2} name="Sent" />
            <Line type="monotone" dataKey="accepted" stroke="#7FBA00" strokeWidth={2} name="Accepted" />
            <Line type="monotone" dataKey="declined" stroke="#F25022" strokeWidth={2} name="Declined" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          {[
            { key: 'all', label: 'All Offers', count: totalOffers },
            { key: 'pending', label: 'Pending', count: pendingOffers },
            { key: 'accepted', label: 'Accepted', count: acceptedOffers },
            { key: 'declined', label: 'Declined', count: declinedOffers },
            { key: 'draft', label: 'Drafts', count: draftOffers },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                setCurrentPage(1);
              }}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-[#0078D4] text-[#0078D4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sent Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {offer.candidate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{offer.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{offer.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      ${Number(offer.salary).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{offer.sentDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium border ${getStatusColor(offer.status)}`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenViewDialog(offer)}
                        className="text-[#0078D4] hover:text-[#00A4EF]"
                        title="View"
                      >
                        <EyeIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleOpenEditDialog(offer)}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                        title="Edit"
                      >
                        <EditIcon size={16} />
                      </button>
                      {offer.status === 'draft' && (
                        <button
                          onClick={() => handleSendOffer(offer.id)}
                          className="text-[#7FBA00] hover:text-[#7FBA00]/80"
                          title="Send Offer"
                        >
                          <SendIcon size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenDeleteDialog(offer)}
                        className="text-[#F25022] hover:text-[#F25022]/80"
                        title="Delete"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOffers.length)} of {filteredOffers.length} offers
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
                    className={`px-3 py-1 text-sm border ${
                      currentPage === page
                        ? 'bg-[#0078D4] text-white border-[#0078D4]'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
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
      </div>

      {/* Create/Edit Dialog */}
      {(isCreateDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditDialogOpen ? 'Edit Offer' : 'Create New Offer'}
              </h2>
              <button 
                onClick={handleCloseDialogs} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XCircleIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.candidate}
                  onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Offer Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.offerDate}
                    onChange={(e) => setFormData({ ...formData, offerDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits Package
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  placeholder="e.g., Health, Dental, Vision, 401k"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bonus Structure
                </label>
                <input
                  type="text"
                  value={formData.bonusStructure}
                  onChange={(e) => setFormData({ ...formData, bonusStructure: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  placeholder="e.g., 10% annual performance bonus"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="sm" className="flex-1">
                  {isEditDialogOpen ? 'Update Offer' : 'Create Offer'}
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={handleCloseDialogs} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Dialog */}
      {isViewDialogOpen && viewingOffer && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Offer Details
              </h2>
              <button 
                onClick={handleCloseDialogs} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XCircleIcon size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {viewingOffer.candidate}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{viewingOffer.position}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium border ${getStatusColor(viewingOffer.status)}`}>
                  {viewingOffer.status.charAt(0).toUpperCase() + viewingOffer.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    {viewingOffer.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Annual Salary</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    ${Number(viewingOffer.salary).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    {viewingOffer.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Offer Date</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    {viewingOffer.offerDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    {viewingOffer.expiryDate}
                  </p>
                </div>
                {viewingOffer.responseDate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Response Date</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                      {viewingOffer.responseDate}
                    </p>
                  </div>
                )}
              </div>

              {viewingOffer.benefits && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Benefits Package</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {viewingOffer.benefits}
                  </p>
                </div>
              )}

              {viewingOffer.bonusStructure && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bonus Structure</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {viewingOffer.bonusStructure}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => {
                    handleCloseDialogs();
                    handleOpenEditDialog(viewingOffer);
                  }}
                  className="flex-1"
                >
                  Edit Offer
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleCloseDialogs} 
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Dialog */}
      {isFilterDialogOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filter Offers
              </h2>
              <button 
                onClick={handleCloseDialogs} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XCircleIcon size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filterData.status}
                  onChange={(e) => setFilterData({ ...filterData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                <select
                  value={filterData.department}
                  onChange={(e) => setFilterData({ ...filterData, department: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                >
                  <option value="">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filterData.dateFrom}
                    onChange={(e) => setFilterData({ ...filterData, dateFrom: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filterData.dateTo}
                    onChange={(e) => setFilterData({ ...filterData, dateTo: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00A4EF] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleCloseDialogs}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => {
                    setFilterData({ status: '', department: '', dateFrom: '', dateTo: '' });
                    handleCloseDialogs();
                  }}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && deletingOffer && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete Offer
              </h2>
              <button 
                onClick={handleCloseDialogs} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XCircleIcon size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F25022]/10 flex items-center justify-center">
                  <TrashIcon size={24} className="text-[#F25022]" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium mb-2">
                    Are you sure you want to delete this offer?
                  </p>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Candidate:</strong> {deletingOffer.candidate}</p>
                    <p><strong>Position:</strong> {deletingOffer.position}</p>
                    <p><strong>Department:</strong> {deletingOffer.department}</p>
                  </div>
                  <p className="text-sm text-[#F25022] mt-3">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleCloseDialogs}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => handleDelete(deletingOffer.id)}
                  className="flex-1 bg-[#F25022] hover:bg-[#F25022]/90 border-[#F25022]"
                >
                  Delete Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
