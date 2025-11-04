import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { UserIcon, BellIcon, ShieldIcon, PaletteIcon, SaveIcon, ClockIcon, FileTextIcon } from '@/components/Icons';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
 const { user } = useAuth();
 const { theme, toggle } = useTheme();
 const navigate = useNavigate();
 
 const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance' | 'admin'>('profile');
 
 const [profileData, setProfileData] = useState({
 firstName: user?.username?.split(' ')[0] || 'John',
 lastName: user?.username?.split(' ')[1] || 'Doe',
 email: user?.email || 'john.doe@company.com',
 phone: '+1 234 567 8900',
 department: 'Engineering',
 position: 'Senior Developer',
 bio: 'Passionate software developer with 5 years of experience.',
 });

 const [notificationSettings, setNotificationSettings] = useState({
 emailNotifications: true,
 pushNotifications: true,
 leaveApprovals: true,
 payrollUpdates: true,
 performanceReviews: true,
 teamAnnouncements: false,
 systemUpdates: true,
 });

 const [securitySettings, setSecuritySettings] = useState({
 twoFactorAuth: false,
 sessionTimeout: '30',
 passwordExpiry: '90',
 });

 const [appearanceSettings, setAppearanceSettings] = useState({
 language: 'en',
 dateFormat: 'MM/DD/YYYY',
 timeFormat: '12',
 compactMode: false,
 });

 const tabs = [
 { id: 'profile', label: 'Profile', icon: UserIcon },
 { id: 'notifications', label: 'Notifications', icon: BellIcon },
 { id: 'security', label: 'Security', icon: ShieldIcon },
 { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
 ...(user?.role === 'hradmin' ? [{ id: 'admin', label: 'Admin Settings', icon: ShieldIcon }] : []),
 ];

 const handleSave = () => {
 console.log('Settings saved');
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
 <div className="max-w-6xl mx-auto">
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
 Settings
 </h1>
 <p className="text-gray-600 dark:text-gray-400">
 Manage your account settings and preferences
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
 {/* Tabs Sidebar */}
 <div className="lg:col-span-1">
 <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-4 border border-gray-200/50 dark:border-gray-700/50 ">
 <div className="space-y-2">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id as any)}
 className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm ${
 activeTab === tab.id
 ? 'bg-[#00A4EF] text-white shadow-sm'
 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
 }`}
 >
 <Icon size={20} />
 <span className="font-medium">{tab.label}</span>
 </button>
 );
 })}
 </div>
 </div>
 </div>

 {/* Content Area */}
 <div className="lg:col-span-3">
 <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 ">
 {/* Profile Tab */}
 {activeTab === 'profile' && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Profile Information
 </h2>
 <p className="text-gray-600 dark:text-gray-400 mb-6">
 Update your personal information and profile details
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 First Name
 </label>
 <input
 type="text"
 value={profileData.firstName}
 onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Last Name
 </label>
 <input
 type="text"
 value={profileData.lastName}
 onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Email
 </label>
 <input
 type="email"
 value={profileData.email}
 onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Phone
 </label>
 <input
 type="tel"
 value={profileData.phone}
 onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Department
 </label>
 <input
 type="text"
 value={profileData.department}
 onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Position
 </label>
 <input
 type="text"
 value={profileData.position}
 onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Bio
 </label>
 <textarea
 value={profileData.bio}
 onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
 rows={4}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 />
 </div>
 </div>
 )}

 {/* Notifications Tab */}
 {activeTab === 'notifications' && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Notification Preferences
 </h2>
 <p className="text-gray-600 dark:text-gray-400 mb-6">
 Choose how you want to receive notifications
 </p>
 </div>

 <div className="space-y-4">
 {Object.entries(notificationSettings).map(([key, value]) => (
 <div key={key} className="flex items-center justify-between p-4 rounded-sm bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700">
 <span className="text-gray-900 dark:text-white font-medium capitalize">
 {key.replace(/([A-Z])/g, ' $1').trim()}
 </span>
 <label className="relative inline-flex items-center cursor-pointer">
 <input
 type="checkbox"
 checked={value}
 onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
 className="sr-only peer"
 />
 <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A4EF]/20 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-5 after:w-5 after: peer-checked:bg-[#00A4EF]"></div>
 </label>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Security Tab */}
 {activeTab === 'security' && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Security Settings
 </h2>
 <p className="text-gray-600 dark:text-gray-400 mb-6">
 Manage your account security preferences
 </p>
 </div>

 <div className="space-y-6">
 <div className="flex items-center justify-between p-4 rounded-sm bg-gray-50 dark:bg-gray-700/50">
 <div>
 <span className="text-gray-900 dark:text-white font-medium block mb-1">
 Two-Factor Authentication
 </span>
 <span className="text-sm text-gray-600 dark:text-gray-400">
 Add an extra layer of security to your account
 </span>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input
 type="checkbox"
 checked={securitySettings.twoFactorAuth}
 onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
 className="sr-only peer"
 />
 <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A4EF]/20 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-5 after:w-5 after: peer-checked:bg-[#00A4EF]"></div>
 </label>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Session Timeout (minutes)
 </label>
 <select
 value={securitySettings.sessionTimeout}
 onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 >
 <option value="15">15 minutes</option>
 <option value="30">30 minutes</option>
 <option value="60">1 hour</option>
 <option value="120">2 hours</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Password Expiry (days)
 </label>
 <select
 value={securitySettings.passwordExpiry}
 onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 >
 <option value="30">30 days</option>
 <option value="60">60 days</option>
 <option value="90">90 days</option>
 <option value="never">Never</option>
 </select>
 </div>

 <div>
 <button className="w-full px-4 py-3 bg-[#F25022] text-white rounded-sm hover:bg-[#E04012] shadow-sm hover:shadow-sm font-medium">
 Change Password
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Appearance Tab */}
 {activeTab === 'appearance' && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Appearance Settings
 </h2>
 <p className="text-gray-600 dark:text-gray-400 mb-6">
 Customize how the application looks and feels
 </p>
 </div>

 <div className="space-y-6">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Theme
 </label>
 <div className="grid grid-cols-2 gap-4">
 <button
 onClick={() => theme === 'dark' && toggle()}
 className={`p-4 rounded-sm border-2 ${
 theme === 'light'
 ? 'border-[#00A4EF] bg-[#00A4EF]/10'
 : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
 }`}
 >
 <div className="w-full h-20 bg-white rounded mb-2 border border-gray-200"></div>
 <span className="text-gray-900 dark:text-white font-medium">Light</span>
 </button>
 <button
 onClick={() => theme === 'light' && toggle()}
 className={`p-4 rounded-sm border-2 ${
 theme === 'dark'
 ? 'border-[#00A4EF] bg-[#00A4EF]/10'
 : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
 }`}
 >
 <div className="w-full h-20 bg-gray-800 rounded mb-2"></div>
 <span className="text-gray-900 dark:text-white font-medium">Dark</span>
 </button>
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Language
 </label>
 <select
 value={appearanceSettings.language}
 onChange={(e) => setAppearanceSettings({ ...appearanceSettings, language: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 >
 <option value="en">English</option>
 <option value="es">Spanish</option>
 <option value="fr">French</option>
 <option value="de">German</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Date Format
 </label>
 <select
 value={appearanceSettings.dateFormat}
 onChange={(e) => setAppearanceSettings({ ...appearanceSettings, dateFormat: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 >
 <option value="MM/DD/YYYY">MM/DD/YYYY</option>
 <option value="DD/MM/YYYY">DD/MM/YYYY</option>
 <option value="YYYY-MM-DD">YYYY-MM-DD</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 Time Format
 </label>
 <select
 value={appearanceSettings.timeFormat}
 onChange={(e) => setAppearanceSettings({ ...appearanceSettings, timeFormat: e.target.value })}
 className="w-full px-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
 >
 <option value="12">12-hour</option>
 <option value="24">24-hour</option>
 </select>
 </div>

 <div className="flex items-center justify-between p-4 rounded-sm bg-gray-50 dark:bg-gray-700/50">
 <div>
 <span className="text-gray-900 dark:text-white font-medium block mb-1">
 Compact Mode
 </span>
 <span className="text-sm text-gray-600 dark:text-gray-400">
 Reduce spacing for a more condensed view
 </span>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input
 type="checkbox"
 checked={appearanceSettings.compactMode}
 onChange={(e) => setAppearanceSettings({ ...appearanceSettings, compactMode: e.target.checked })}
 className="sr-only peer"
 />
 <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A4EF]/20 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-5 after:w-5 after: peer-checked:bg-[#00A4EF]"></div>
 </label>
 </div>
 </div>
 </div>
 )}

 {/* Admin Settings Tab */}
 {activeTab === 'admin' && user?.role === 'hradmin' && (
 <div className="space-y-6">
 <div>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
 System Administration
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
 Configure system-wide settings and access administrative tools
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <button
 onClick={() => navigate('/settings/escalation')}
 className="p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#00A4EF] dark:hover:border-[#00A4EF] text-left group"
 >
 <div className="flex items-start gap-4">
 <div className="p-3 bg-[#00A4EF]/10 text-[#00A4EF] group-hover:bg-[#00A4EF] group-hover:text-white">
 <ClockIcon size={24} />
 </div>
 <div>
 <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
 Escalation Time Settings
 </h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 Configure automatic escalation rules for pending actions and approvals
 </p>
 </div>
 </div>
 </button>

 <button
 onClick={() => navigate('/settings/audit')}
 className="p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#7FBA00] dark:hover:border-[#7FBA00] text-left group"
 >
 <div className="flex items-start gap-4">
 <div className="p-3 bg-[#7FBA00]/10 text-[#7FBA00] group-hover:bg-[#7FBA00] group-hover:text-white">
 <FileTextIcon size={24} />
 </div>
 <div>
 <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
 Audit Trail
 </h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 View complete history of all system activities and changes
 </p>
 </div>
 </div>
 </button>
 </div>
 </div>
 )}

 {/* Save Button */}
 <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
 <button
 onClick={handleSave}
 className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#00A4EF] text-white rounded-sm hover:bg-[#0078D4] shadow-sm hover:shadow-sm font-medium"
 >
 <SaveIcon size={20} />
 Save Changes
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default Settings;
