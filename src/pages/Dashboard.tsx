
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/StatCard';
import { Card, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { 
 EmployeeIcon, 
 LeaveIcon, 
 GrievanceIcon, 
 PerformanceIcon,
 BellIcon 
} from '@/components/Icons';
import { dashboardStats, leaveRequests, grievances, performanceReviews } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
 const { user } = useAuth();

 const recentLeaveRequests = leaveRequests.slice(0, 5);
 const recentGrievances = grievances.slice(0, 3);
 const upcomingReviews = performanceReviews.slice(0, 3);

 const getStatusColor = (status: string): 'success' | 'warning' | 'danger' | 'info' => {
 switch (status.toLowerCase()) {
 case 'approved':
 case 'completed':
 case 'resolved':
 return 'success';
 case 'pending':
 return 'warning';
 case 'rejected':
 return 'danger';
 default:
 return 'info';
 }
 };

 return (
 <div className="space-y-6">
 {/* Welcome Header */}
 <div className="bg-[#00A4EF] p-6 text-white border-b-4 border-[#0078D4]">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-2xl font-semibold mb-1">Welcome back, {user?.name}!</h1>
 <p className="text-blue-100 text-sm">Here's what's happening with your workforce today.</p>
 </div>
 <div className="hidden md:block">
 <div className="bg-white/20 px-4 py-2 border border-white/30">
 <div className="text-xs text-blue-100">Current Role</div>
 <div className="text-lg font-semibold">{user?.role}</div>
 </div>
 </div>
 </div>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 <StatCard
 title="Total Employees"
 value={dashboardStats.totalEmployees}
 icon={<EmployeeIcon size={20} />}
 color="blue"
 trend={{ value: 5.2, isPositive: true }}
 />
 <StatCard
 title="On Leave Today"
 value={dashboardStats.onLeave}
 icon={<LeaveIcon size={20} />}
 color="yellow"
 />
 <StatCard
 title="Pending Approvals"
 value={dashboardStats.pendingApprovals}
 icon={<BellIcon size={20} />}
 color="red"
 />
 <StatCard
 title="Upcoming Reviews"
 value={dashboardStats.upcomingReviews}
 icon={<PerformanceIcon size={20} />}
 color="green"
 />
 </div>

 {/* Main Content Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Recent Leave Requests */}
 <Card>
 <CardHeader
 title="Recent Leave Requests"
 subtitle="Latest employee leave applications"
 action={
 <Link to="/leave">
 <Button variant="ghost" size="sm">View All</Button>
 </Link>
 }
 />
 <div className="space-y-2">
 {recentLeaveRequests.map((leave) => (
 <div key={leave.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-sm">
 <div className="flex-1">
 <p className="font-medium text-gray-900 dark:text-white text-sm">{leave.employeeName}</p>
 <p className="text-xs text-gray-600 dark:text-gray-400">
 {leave.type} • {leave.days} days
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 {leave.startDate} to {leave.endDate}
 </p>
 </div>
 <Badge variant={getStatusColor(leave.status)} size="sm">{leave.status}</Badge>
 </div>
 ))}
 </div>
 </Card>

 {/* Active Grievances */}
 <Card>
 <CardHeader
 title="Active Grievances"
 subtitle="Issues requiring attention"
 action={
 <Link to="/grievances">
 <Button variant="ghost" size="sm">View All</Button>
 </Link>
 }
 />
 <div className="space-y-2">
 {recentGrievances.map((grievance) => (
 <div key={grievance.id} className="p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-sm">
 <div className="flex items-start justify-between mb-2">
 <div className="flex-1">
 <p className="font-medium text-gray-900 dark:text-white text-sm">{grievance.subject}</p>
 <p className="text-xs text-gray-600 dark:text-gray-400">{grievance.employeeName}</p>
 </div>
 <Badge variant={getStatusColor(grievance.status)} size="sm">
 {grievance.status}
 </Badge>
 </div>
 <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
 <span className={`px-2 py-0.5 border font-medium rounded-sm ${
 grievance.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
 grievance.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800' :
 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
 }`}>
 {grievance.priority}
 </span>
 <span>•</span>
 <span>{grievance.category}</span>
 </div>
 </div>
 ))}
 </div>
 </Card>
 </div>

 {/* Performance Reviews Table */}
 <Card>
 <CardHeader
 title="Upcoming Performance Reviews"
 subtitle="Scheduled employee evaluations"
 action={
 <Link to="/performance">
 <Button variant="ghost" size="sm">View All</Button>
 </Link>
 }
 />
 <Table
 data={upcomingReviews}
 columns={[
 {
 key: 'employeeName',
 header: 'Employee',
 render: (row) => (
 <div>
 <p className="font-medium">{row.employeeName}</p>
 <p className="text-xs text-gray-500">{row.employeeId}</p>
 </div>
 ),
 },
 {
 key: 'reviewPeriod',
 header: 'Period',
 },
 {
 key: 'reviewerName',
 header: 'Reviewer',
 },
 {
 key: 'overallRating',
 header: 'Rating',
 render: (row) => (
 <div className="flex items-center">
 <span className="font-semibold text-[#00A4EF]">{row.overallRating}</span>
 <span className="text-gray-400 ml-1">/5.0</span>
 </div>
 ),
 },
 {
 key: 'status',
 header: 'Status',
 render: (row) => <Badge variant={getStatusColor(row.status)} size="sm">{row.status}</Badge>,
 },
 ]}
 />
 </Card>

 {/* Quick Actions */}
 <Card>
 <CardHeader title="Quick Actions" subtitle="Common tasks and shortcuts" />
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <Link to="/leave">
 <button className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00A4EF] dark:hover:border-[#00A4EF] transition-colors">
 <div className="p-2 bg-[#00A4EF]/10 text-[#00A4EF]">
 <LeaveIcon size={20} />
 </div>
 <span className="text-xs font-medium text-gray-900 dark:text-white">Apply Leave</span>
 </button>
 </Link>
 <Link to="/attendance">
 <button className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#7FBA00] dark:hover:border-[#7FBA00] transition-colors">
 <div className="p-2 bg-[#7FBA00]/10 text-[#7FBA00]">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
 <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
 </svg>
 </div>
 <span className="text-xs font-medium text-gray-900 dark:text-white">Clock In/Out</span>
 </button>
 </Link>
 <Link to="/grievances">
 <button className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#F25022] dark:hover:border-[#F25022] transition-colors">
 <div className="p-2 bg-[#F25022]/10 text-[#F25022]">
 <GrievanceIcon size={20} />
 </div>
 <span className="text-xs font-medium text-gray-900 dark:text-white">Report Issue</span>
 </button>
 </Link>
 <Link to="/reports">
 <button className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#FFB900] dark:hover:border-[#FFB900] transition-colors">
 <div className="p-2 bg-[#FFB900]/10 text-[#FFB900]">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
 <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
 </svg>
 </div>
 <span className="text-xs font-medium text-gray-900 dark:text-white">View Reports</span>
 </button>
 </Link>
 </div>
 </Card>
 </div>
 );
};

export default Dashboard;