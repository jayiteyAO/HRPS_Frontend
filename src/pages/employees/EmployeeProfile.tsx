import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { employeeDatabase, type Employee } from '@/data/employees';
import { useToast } from '@/components/ToastContainer';
import { 
  UserIcon, 
  EmailIcon, 
  PhoneIcon, 
  CalendarIcon, 
  BriefcaseIcon, 
  LocationIcon, 
  MoneyIcon,
  EditIcon,
  ArrowLeftIcon,
  DocumentIcon,
  StarIcon,
  SaveIcon,
  XIcon
} from '@/components/Icons';

export const EmployeeProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState('personal');
  const [editFormData, setEditFormData] = useState<Employee | null>(null);

  // Find employee by ID
  const employee = useMemo(() => {
    return employeeDatabase.find(emp => emp.id === Number(id));
  }, [id]);

  // If employee not found, show error
  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-12 text-center border border-gray-200/50 dark:border-gray-700/50">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Employee Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The employee with ID "{id}" could not be found.</p>
            <Button variant="primary" onClick={() => navigate('/employees')}>
              Back to Employee List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditFormData({ ...employee });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      // In a real app, this would call an API to update the employee
      addToast('Employee updated successfully!', 'success');
      setShowEditModal(false);
    }
  };

  const handleEditFormChange = (field: keyof Employee, value: string | number) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const editTabs = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'employment', label: 'Employment', icon: BriefcaseIcon },
    { id: 'compensation', label: 'Compensation', icon: MoneyIcon },
    { id: 'address', label: 'Address', icon: LocationIcon },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'personal', label: 'Personal Info', icon: DocumentIcon },
    { id: 'employment', label: 'Employment', icon: BriefcaseIcon },
    { id: 'compensation', label: 'Compensation', icon: MoneyIcon },
    { id: 'performance', label: 'Performance', icon: StarIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/employees')}
          className="mb-6 flex items-center"
        >
          <ArrowLeftIcon size={20} className="mr-2" />
          <span>Back to Employees</span>
        </Button>

        {/* Header Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-8 border border-gray-200/50 dark:border-gray-700/50 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-sm bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Employee Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent mb-2">
                    {employee.name}
                  </h1>
                  <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">{employee.position}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {employee.employeeId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-sm text-sm font-medium ${
                    employee.status === 'Active' 
                      ? 'bg-[#7FBA00]/20 text-[#7FBA00]' 
                      : 'bg-[#FFB900]/20 text-[#FFB900]'
                  }`}>
                    {employee.status}
                  </span>
                  <Button variant="primary" size="sm" className="flex items-center" onClick={handleEdit}>
                    <EditIcon size={16} className="mr-1" />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-sm">
                  <EmailIcon size={20} className="text-[#00A4EF]" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-sm">
                  <PhoneIcon size={20} className="text-[#7FBA00]" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-sm">
                  <LocationIcon size={20} className="text-[#FFB900]" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#00A4EF] text-[#00A4EF]'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoCard 
                    icon={<BriefcaseIcon size={24} className="text-[#00A4EF]" />}
                    title="Department" 
                    value={employee.department} 
                  />
                  <InfoCard 
                    icon={<UserIcon size={24} className="text-[#7FBA00]" />}
                    title="Manager" 
                    value={employee.manager} 
                  />
                  <InfoCard 
                    icon={<CalendarIcon size={24} className="text-[#FFB900]" />}
                    title="Join Date" 
                    value={employee.joinDate} 
                  />
                  <InfoCard 
                    icon={<MoneyIcon size={24} className="text-[#0078D4]" />}
                    title="Salary" 
                    value={`GH₵${employee.salary.toLocaleString()}`} 
                  />
                  <InfoCard 
                    icon={<BriefcaseIcon size={24} className="text-[#F25022]" />}
                    title="Employment Type" 
                    value={employee.employmentType} 
                  />
                  <InfoCard 
                    icon={<LocationIcon size={24} className="text-[#00A4EF]" />}
                    title="City" 
                    value={employee.city} 
                  />
                </div>
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailRow label="Full Name" value={employee.name} />
                  <DetailRow label="Date of Birth" value={employee.dateOfBirth} />
                  <DetailRow label="Gender" value={employee.gender} />
                  <DetailRow label="Nationality" value={employee.nationality} />
                  <DetailRow label="Marital Status" value={employee.maritalStatus} />
                  <DetailRow label="Email" value={employee.email} />
                  <DetailRow label="Phone" value={employee.phone} />
                  <DetailRow label="Address" value={employee.address} className="md:col-span-2" />
                </div>
              </div>
            )}

            {/* Employment Tab */}
            {activeTab === 'employment' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Employment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailRow label="Employee ID" value={employee.employeeId} />
                  <DetailRow label="Position" value={employee.position} />
                  <DetailRow label="Department" value={employee.department} />
                  <DetailRow label="Employment Type" value={employee.employmentType} />
                  <DetailRow label="Join Date" value={employee.joinDate} />
                  <DetailRow label="Reporting Manager" value={employee.manager} />
                  <DetailRow label="Work Location" value={employee.location} />
                  <DetailRow label="Status" value={employee.status} />
                </div>
              </div>
            )}

            {/* Compensation Tab */}
            {activeTab === 'compensation' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compensation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailRow label="Base Salary" value={`GH₵${employee.salary.toLocaleString()}/month`} />
                  <DetailRow label="Currency" value="GHS - Ghanaian Cedi" />
                  <DetailRow label="Bank Name" value={employee.bankName} />
                  <DetailRow label="Bank Account" value={employee.bankAccount} />
                  <DetailRow 
                    label="Annual Salary" 
                    value={`GH₵${(employee.salary * 12).toLocaleString()}`} 
                    className="md:col-span-2"
                  />
                </div>

                {/* Salary Breakdown */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary Breakdown</h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Base Salary</span>
                      <span className="font-semibold text-gray-900 dark:text-white">GH₵{employee.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Benefits</span>
                      <span className="font-semibold text-gray-900 dark:text-white">GH₵2,000</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">Total Compensation</span>
                      <span className="font-bold text-xl text-[#00A4EF]">GH₵{(employee.salary + 2000).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Overview</h2>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[#00A4EF]/10 to-[#0078D4]/10 rounded-sm p-6 border border-[#00A4EF]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Overall Rating</span>
                      <StarIcon size={20} className="text-[#FFB900]" />
                    </div>
                    <p className="text-3xl font-bold text-[#00A4EF]">4.5/5</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Excellent Performance</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#7FBA00]/10 to-[#7FBA00]/10 rounded-sm p-6 border border-[#7FBA00]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</span>
                      <BriefcaseIcon size={20} className="text-[#7FBA00]" />
                    </div>
                    <p className="text-3xl font-bold text-[#7FBA00]">24</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 12 months</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FFB900]/10 to-[#FFB900]/10 rounded-sm p-6 border border-[#FFB900]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</span>
                      <StarIcon size={20} className="text-[#FFB900]" />
                    </div>
                    <p className="text-3xl font-bold text-[#FFB900]">85%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Above target</p>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    <ReviewCard 
                      date="2024-12-01"
                      rating={4.5}
                      reviewer={employee.manager}
                      comment="Excellent performance throughout the quarter. Shows great initiative and technical skills."
                    />
                    <ReviewCard 
                      date="2024-09-01"
                      rating={4.0}
                      reviewer="Jane Doe"
                      comment="Good work on project deliverables. Room for improvement in communication."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Employee</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{editFormData.name} - {editFormData.employeeId}</p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XIcon size={24} />
                </button>
              </div>
            </div>

            {/* Edit Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
              {editTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setEditTab(tab.id)}
                    className={`px-4 py-3 font-medium flex items-center gap-2 transition-all ${
                      editTab === tab.id
                        ? 'border-b-2 border-[#00A4EF] text-[#00A4EF]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Personal Info Tab */}
              {editTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={editFormData.name.split(' ')[0] || ''}
                      onChange={(e) => {
                        const lastName = editFormData.name.split(' ').slice(1).join(' ');
                        handleEditFormChange('name', `${e.target.value} ${lastName}`.trim());
                      }}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={editFormData.name.split(' ').slice(1).join(' ') || ''}
                      onChange={(e) => {
                        const firstName = editFormData.name.split(' ')[0];
                        handleEditFormChange('name', `${firstName} ${e.target.value}`.trim());
                      }}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => handleEditFormChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) => handleEditFormChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={editFormData.dateOfBirth}
                      onChange={(e) => handleEditFormChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender *
                    </label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) => handleEditFormChange('gender', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Marital Status
                    </label>
                    <select
                      value={editFormData.maritalStatus}
                      onChange={(e) => handleEditFormChange('maritalStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={editFormData.nationality}
                      onChange={(e) => handleEditFormChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Employment Tab */}
              {editTab === 'employment' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employee ID *
                    </label>
                    <input
                      type="text"
                      value={editFormData.employeeId}
                      onChange={(e) => handleEditFormChange('employeeId', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department *
                    </label>
                    <select
                      value={editFormData.department}
                      onChange={(e) => handleEditFormChange('department', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Customer Service">Customer Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={editFormData.position}
                      onChange={(e) => handleEditFormChange('position', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Join Date *
                    </label>
                    <input
                      type="date"
                      value={editFormData.joinDate}
                      onChange={(e) => handleEditFormChange('joinDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employment Type *
                    </label>
                    <select
                      value={editFormData.employmentType}
                      onChange={(e) => handleEditFormChange('employmentType', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reporting Manager
                    </label>
                    <input
                      type="text"
                      value={editFormData.manager}
                      onChange={(e) => handleEditFormChange('manager', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status *
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => handleEditFormChange('status', e.target.value as 'Active' | 'On Leave' | 'Terminated')}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Compensation Tab */}
              {editTab === 'compensation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Base Salary (GHS) *
                    </label>
                    <input
                      type="number"
                      value={editFormData.salary}
                      onChange={(e) => handleEditFormChange('salary', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.bankName}
                      onChange={(e) => handleEditFormChange('bankName', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      value={editFormData.bankAccount}
                      onChange={(e) => handleEditFormChange('bankAccount', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {editTab === 'address' && (
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <textarea
                      value={editFormData.address}
                      onChange={(e) => handleEditFormChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={editFormData.city}
                        onChange={(e) => handleEditFormChange('city', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editFormData.location}
                        onChange={(e) => handleEditFormChange('location', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="ghost" size="lg" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleSaveEdit} className="flex items-center">
                <SaveIcon size={20} className="mr-2" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = '' }) => (
  <div className={`${className}`}>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base text-gray-900 dark:text-white">{value}</p>
  </div>
);

const ReviewCard: React.FC<{ date: string; rating: number; reviewer: string; comment: string }> = ({ 
  date, 
  rating, 
  reviewer, 
  comment 
}) => (
  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-sm p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-start justify-between mb-3">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{reviewer}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      </div>
      <div className="flex items-center gap-1">
        <StarIcon size={16} className="text-[#FFB900]" />
        <span className="font-semibold text-gray-900 dark:text-white">{rating}</span>
      </div>
    </div>
    <p className="text-gray-700 dark:text-gray-300">{comment}</p>
  </div>
);

export default EmployeeProfile;
