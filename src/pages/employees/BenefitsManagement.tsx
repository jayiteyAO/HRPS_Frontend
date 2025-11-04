import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusIcon, EditIcon, TrashIcon } from '@/components/Icons';

interface Benefit {
  id: string;
  name: string;
  category: string;
  provider: string;
  cost: number;
  enrolled: number;
  eligibility: string;
  status: 'active' | 'inactive';
}

interface Enrollment {
  id: string;
  employeeName: string;
  benefit: string;
  startDate: string;
  endDate: string;
  premium: number;
  status: 'active' | 'pending' | 'cancelled';
}

const BenefitsManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'benefits' | 'enrollments'>('benefits');

  const benefits: Benefit[] = [
    { id: '1', name: 'Health Insurance', category: 'Medical', provider: 'GHS Health', cost: 250, enrolled: 120, eligibility: 'All Employees', status: 'active' },
    { id: '2', name: 'Life Insurance', category: 'Insurance', provider: 'Life Guard', cost: 50, enrolled: 95, eligibility: 'Full-time', status: 'active' },
    { id: '3', name: 'Dental Coverage', category: 'Medical', provider: 'Dental Plus', cost: 75, enrolled: 80, eligibility: 'All Employees', status: 'active' },
    { id: '4', name: 'Pension Plan', category: 'Retirement', provider: 'SSNIT', cost: 200, enrolled: 140, eligibility: 'All Employees', status: 'active' },
    { id: '5', name: 'Gym Membership', category: 'Wellness', provider: 'Fitness First', cost: 30, enrolled: 45, eligibility: 'Optional', status: 'active' },
  ];

  const enrollments: Enrollment[] = [
    { id: '1', employeeName: 'John Doe', benefit: 'Health Insurance', startDate: '2025-01-01', endDate: '2025-12-31', premium: 250, status: 'active' },
    { id: '2', employeeName: 'Jane Smith', benefit: 'Life Insurance', startDate: '2025-01-01', endDate: '2025-12-31', premium: 50, status: 'active' },
    { id: '3', employeeName: 'Mike Johnson', benefit: 'Dental Coverage', startDate: '2025-02-01', endDate: '2026-01-31', premium: 75, status: 'pending' },
    { id: '4', employeeName: 'Sarah Williams', benefit: 'Pension Plan', startDate: '2024-06-01', endDate: '2050-12-31', premium: 200, status: 'active' },
  ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Benefits Management
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage employee benefits and enrollments
            </p>
          </div>
          <button
            onClick={() => setShowBenefitModal(true)}
            className="px-4 py-2 text-white flex items-center"
            style={{ backgroundColor: '#00A4EF' }}
          >
            <PlusIcon size={18} className="mr-2" />
            <span>Add Benefit</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-sm font-medium" style={{ color: '#00A4EF' }}>Total Benefits</div>
            <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-sm font-medium" style={{ color: '#7FBA00' }}>Active Enrollments</div>
            <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>480</div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-sm font-medium" style={{ color: '#FFB900' }}>Monthly Cost</div>
            <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GH₵ 52,800</div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-sm font-medium" style={{ color: '#F25022' }}>Pending Requests</div>
            <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>8</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b" style={{ borderColor: isDarkMode ? '#404040' : '#e5e7eb' }}>
          <button
            onClick={() => setSelectedTab('benefits')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'benefits'
                ? 'text-white border-b-2'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            style={selectedTab === 'benefits' ? { borderColor: '#00A4EF', color: '#00A4EF' } : {}}
          >
            Benefits Catalog
          </button>
          <button
            onClick={() => setSelectedTab('enrollments')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'enrollments'
                ? 'text-white border-b-2'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            style={selectedTab === 'enrollments' ? { borderColor: '#00A4EF', color: '#00A4EF' } : {}}
          >
            Enrollments
          </button>
        </div>

        {/* Benefits Table */}
        {selectedTab === 'benefits' && (
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Benefit Name</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Provider</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cost (GH₵)</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enrolled</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Eligibility</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {benefits.map((benefit) => (
                    <tr key={benefit.id} className={isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-50'}>
                      <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{benefit.name}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{benefit.category}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{benefit.provider}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{benefit.cost.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{benefit.enrolled}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{benefit.eligibility}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 text-xs font-medium ${benefit.status === 'active' ? 'bg-[#7FBA00]' : 'bg-[#737373]'} text-white`}>
                          {benefit.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-[#00A4EF] hover:text-[#0078D4] mr-3">
                          <EditIcon size={16} />
                        </button>
                        <button className="text-[#F25022] hover:text-[#D13F00]">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enrollments Table */}
        {selectedTab === 'enrollments' && (
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Employee</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Benefit</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Start Date</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>End Date</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Premium (GH₵)</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className={isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-50'}>
                      <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{enrollment.employeeName}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{enrollment.benefit}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{enrollment.startDate}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{enrollment.endDate}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{enrollment.premium.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">
                        <span 
                          className="px-2 py-1 text-xs font-medium text-white"
                          style={{ 
                            backgroundColor: enrollment.status === 'active' ? '#7FBA00' : enrollment.status === 'pending' ? '#FFB900' : '#F25022' 
                          }}
                        >
                          {enrollment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-[#00A4EF] hover:text-[#0078D4] mr-3">
                          View
                        </button>
                        <button className="text-[#F25022] hover:text-[#D13F00]">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showBenefitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'} p-6 w-full max-w-2xl`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Benefit
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Benefit Name</label>
                  <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                  <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <option>Medical</option>
                    <option>Insurance</option>
                    <option>Retirement</option>
                    <option>Wellness</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Provider</label>
                  <input type="text" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Cost (GH₵)</label>
                  <input type="number" className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Eligibility</label>
                <select className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <option>All Employees</option>
                  <option>Full-time Only</option>
                  <option>Management Only</option>
                  <option>Optional</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowBenefitModal(false)}
                className={`px-4 py-2 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-[#333]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBenefitModal(false)}
                className="px-4 py-2 text-white"
                style={{ backgroundColor: '#00A4EF' }}
              >
                Create Benefit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitsManagement;
