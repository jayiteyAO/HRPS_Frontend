import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { UserIcon, MailIcon, PhoneIcon, CalendarIcon, BriefcaseIcon, BuildingIcon, EditIcon, CameraIcon } from '@/components/Icons';

interface ProfileSection {
 title: string;
 items: { label: string; value: string; icon: React.FC<any> }[];
}

export const Profile = () => {
 const { user } = useAuth();
 const [isEditing, setIsEditing] = useState(false);
 
 const personalInfo: ProfileSection = {
 title: 'Personal Information',
 items: [
 { label: 'Full Name', value: user?.name || 'John Doe', icon: UserIcon },
 { label: 'Email', value: user?.email || 'john.doe@company.com', icon: MailIcon },
 { label: 'Phone', value: '+1 (555) 123-4567', icon: PhoneIcon },
 { label: 'Date of Birth', value: 'January 15, 1990', icon: CalendarIcon },
 { label: 'Address', value: '123 Main St, Seattle, WA 98101', icon: BuildingIcon },
 ],
 };

 const employmentInfo: ProfileSection = {
 title: 'Employment Information',
 items: [
 { label: 'Employee ID', value: 'EMP-' + (user?.id || '001'), icon: BriefcaseIcon },
 { label: 'Department', value: 'Engineering', icon: BuildingIcon },
 { label: 'Position', value: user?.role || 'Software Engineer', icon: BriefcaseIcon },
 { label: 'Employment Type', value: 'Full-time', icon: BriefcaseIcon },
 { label: 'Join Date', value: 'March 1, 2023', icon: CalendarIcon },
 { label: 'Reporting Manager', value: 'Jane Smith', icon: UserIcon },
 ],
 };

 const statsData = [
 { label: 'Years of Service', value: '2.7', color: 'from-[#00A4EF] to-[#0078D4]', icon: '🏆' },
 { label: 'Leave Balance', value: '15', color: 'from-[#7FBA00] to-[#5A8800]', icon: '🌴' },
 { label: 'Projects Completed', value: '24', color: 'from-[#FFB900] to-[#D89800]', icon: '✅' },
 { label: 'Performance Rating', value: '4.8', color: 'from-[#F25022] to-[#D63E12]', icon: '⭐' },
 ];

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
 <div className="max-w-7xl mx-auto">
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent mb-2">
 My Profile
 </h1>
 <p className="text-gray-600 dark:text-gray-400 text-lg">
 View and manage your personal and employment information
 </p>
 </div>

 {/* Profile Card */}
 <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50">
 <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
 {/* Profile Picture */}
 <div className="relative group">
 <div className="w-32 h-32 rounded bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] p-1 shadow-sm">
 <div className="w-full h-full rounded bg-white dark:bg-gray-800 flex items-center justify-center">
 <span className="text-5xl font-bold text-gray-700 dark:text-gray-300">
 {user?.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
 </span>
 </div>
 </div>
 <button className="absolute bottom-0 right-0 p-2 bg-[#00A4EF] rounded text-white shadow-sm hover:bg-[#0078D4] transform ">
 <CameraIcon size={20} />
 </button>
 </div>

 {/* Profile Summary */}
 <div className="flex-1">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
 {user?.name || 'John Doe'}
 </h2>
 <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">
 {user?.role || 'Software Engineer'} • Engineering Department
 </p>
 <div className="flex flex-wrap gap-2">
 <span className="px-3 py-1 bg-[#00A4EF]/10 text-[#00A4EF] rounded text-sm font-medium">
 Full-time
 </span>
 <span className="px-3 py-1 bg-[#7FBA00]/10 text-[#7FBA00] rounded text-sm font-medium">
 Active
 </span>
 <span className="px-3 py-1 bg-[#FFB900]/10 text-[#FFB900] rounded text-sm font-medium">
 2.7 years
 </span>
 </div>
 </div>

 {/* Edit Button */}
 <Button
 onClick={() => setIsEditing(!isEditing)}
 variant={isEditing ? 'secondary' : 'primary'}
 className="flex items-center gap-2"
 >
 <EditIcon size={18} />
 {isEditing ? 'Cancel' : 'Edit Profile'}
 </Button>
 </div>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
 {statsData.map((stat) => (
 <div
 key={stat.label}
 className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-sm"
 >
 <div className="flex items-center justify-between mb-3">
 <span className="text-4xl">{stat.icon}</span>
 <div className={`h-12 w-12 rounded-sm bg-gradient-to-br ${stat.color} opacity-20`}></div>
 </div>
 <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
 {stat.value}
 </div>
 <div className="text-sm text-gray-600 dark:text-gray-400">
 {stat.label}
 </div>
 </div>
 ))}
 </div>

 {/* Information Sections */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {/* Personal Information */}
 <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 ">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 <div className="p-2 bg-[#00A4EF]/10 rounded-sm">
 <UserIcon size={24} className="text-[#00A4EF]" />
 </div>
 {personalInfo.title}
 </h3>
 <div className="space-y-4">
 {personalInfo.items.map((item) => {
 const Icon = item.icon;
 return (
 <div
 key={item.label}
 className="flex items-center gap-4 p-4 rounded-sm bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"
 >
 <div className="p-2 bg-[#00A4EF]/10 rounded-sm">
 <Icon size={20} className="text-[#00A4EF]" />
 </div>
 <div className="flex-1">
 <div className="text-sm text-gray-500 dark:text-gray-400">
 {item.label}
 </div>
 <div className="text-gray-900 dark:text-white font-medium">
 {item.value}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Employment Information */}
 <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 ">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 <div className="p-2 bg-[#7FBA00]/10 rounded-sm">
 <BriefcaseIcon size={24} className="text-[#7FBA00]" />
 </div>
 {employmentInfo.title}
 </h3>
 <div className="space-y-4">
 {employmentInfo.items.map((item) => {
 const Icon = item.icon;
 return (
 <div
 key={item.label}
 className="flex items-center gap-4 p-4 rounded-sm bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"
 >
 <div className="p-2 bg-[#7FBA00]/10 rounded-sm">
 <Icon size={20} className="text-[#7FBA00]" />
 </div>
 <div className="flex-1">
 <div className="text-sm text-gray-500 dark:text-gray-400">
 {item.label}
 </div>
 <div className="text-gray-900 dark:text-white font-medium">
 {item.value}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* Recent Activity */}
 <div className="mt-8 bg-white/80 dark:bg-gray-800/80 shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Recent Activity
 </h3>
 <div className="space-y-4">
 {[
 { action: 'Updated profile picture', time: '2 hours ago', icon: '📸', color: 'bg-[#00A4EF]/10 text-[#00A4EF]' },
 { action: 'Completed training module', time: '1 day ago', icon: '🎓', color: 'bg-[#7FBA00]/10 text-[#7FBA00]' },
 { action: 'Submitted leave request', time: '3 days ago', icon: '🏖️', color: 'bg-[#FFB900]/10 text-[#FFB900]' },
 { action: 'Updated contact information', time: '1 week ago', icon: '📞', color: 'bg-[#F25022]/10 text-[#F25022]' },
 ].map((activity) => (
 <div
 key={activity.action}
 className="flex items-center gap-4 p-4 rounded-sm bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"
 >
 <div className={`p-3 rounded ${activity.color} text-2xl`}>
 {activity.icon}
 </div>
 <div className="flex-1">
 <div className="text-gray-900 dark:text-white font-medium">
 {activity.action}
 </div>
 <div className="text-sm text-gray-500 dark:text-gray-400">
 {activity.time}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};

export default Profile;
