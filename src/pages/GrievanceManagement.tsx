
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { GrievanceIcon } from '@/components/Icons';
import { grievances } from '@/data/mockData';

const GrievanceManagement: React.FC = () => {
 const getPriorityColor = (priority: string) => {
 switch (priority) {
 case 'High': return 'danger';
 case 'Medium': return 'warning';
 case 'Low': return 'info';
 default: return 'default';
 }
 };

 const getStatusColor = (status: string) => {
 switch (status) {
 case 'Resolved': return 'success';
 case 'Under Investigation': return 'warning';
 case 'New': return 'info';
 default: return 'default';
 }
 };

 return (
 <div className="space-y-6">
 {/* Page Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
 <GrievanceIcon size={32} className="text-[#F25022]" />
 Grievance Management
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-1">
 Manage and resolve employee grievances
 </p>
 </div>
 <Button variant="primary">
 + Report Grievance
 </Button>
 </div>

 {/* Stats Cards */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Total Cases</p>
 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{grievances.length}</p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
 <p className="text-2xl font-bold text-[#FFB900] mt-1">
 {grievances.filter(g => g.status === 'Under Investigation').length}
 </p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
 <p className="text-2xl font-bold text-[#7FBA00] mt-1">
 {grievances.filter(g => g.status === 'Resolved').length}
 </p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
 <p className="text-2xl font-bold text-[#F25022] mt-1">
 {grievances.filter(g => g.priority === 'High').length}
 </p>
 </Card>
 </div>

 {/* Grievances Table */}
 <Card>
 <CardHeader
 title="Grievance Cases"
 subtitle="All employee grievances and issues"
 />
 <Table
 data={grievances}
 columns={[
 {
 key: 'id',
 header: 'Case ID',
 render: (row) => (
 <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{row.id}</span>
 ),
 },
 {
 key: 'employeeName',
 header: 'Submitted By',
 render: (row) => (
 <div>
 <p className="font-medium text-gray-900 dark:text-white">{row.employeeName}</p>
 <p className="text-sm text-gray-500 dark:text-gray-400">{row.employeeId}</p>
 </div>
 ),
 },
 {
 key: 'category',
 header: 'Category',
 render: (row) => (
 <Badge variant="info">{row.category}</Badge>
 ),
 },
 {
 key: 'subject',
 header: 'Subject',
 render: (row) => (
 <div className="max-w-xs">
 <p className="font-medium text-gray-900 dark:text-white truncate">{row.subject}</p>
 <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{row.description}</p>
 </div>
 ),
 },
 {
 key: 'priority',
 header: 'Priority',
 render: (row) => (
 <Badge variant={getPriorityColor(row.priority) as any}>{row.priority}</Badge>
 ),
 },
 {
 key: 'status',
 header: 'Status',
 render: (row) => (
 <Badge variant={getStatusColor(row.status) as any}>{row.status}</Badge>
 ),
 },
 {
 key: 'assignedTo',
 header: 'Assigned To',
 },
 {
 key: 'submittedDate',
 header: 'Date',
 },
 {
 key: 'actions',
 header: 'Actions',
 render: () => (
 <div className="flex space-x-2">
 <Button variant="ghost" size="sm">View</Button>
 <Button variant="ghost" size="sm">Update</Button>
 </div>
 ),
 },
 ]}
 />
 </Card>

 {/* Category Breakdown */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card>
 <CardHeader title="Grievance by Category" subtitle="Distribution by type" />
 <div className="space-y-3">
 {['Workplace Environment', 'Compensation', 'Management', 'Harassment', 'Others'].map((category) => {
 const count = category === 'Workplace Environment' ? 1 : category === 'Compensation' ? 1 : 0;
 return (
 <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <span className="text-gray-700 dark:text-gray-300">{category}</span>
 <span className="font-bold text-gray-900 dark:text-white">{count}</span>
 </div>
 );
 })}
 </div>
 </Card>

 <Card>
 <CardHeader title="Resolution Timeline" subtitle="Average resolution time" />
 <div className="space-y-4">
 <div className="text-center p-6 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] rounded-sm text-white">
 <p className="text-sm text-blue-100">Average Resolution Time</p>
 <p className="text-4xl font-bold mt-2">5.2</p>
 <p className="text-blue-100 mt-1">days</p>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-sm">
 <p className="text-sm text-gray-600 dark:text-gray-400">Fastest</p>
 <p className="text-2xl font-bold text-green-600">2d</p>
 </div>
 <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-sm">
 <p className="text-sm text-gray-600 dark:text-gray-400">Slowest</p>
 <p className="text-2xl font-bold text-red-600">12d</p>
 </div>
 </div>
 </div>
 </Card>
 </div>
 </div>
 );
};

export default GrievanceManagement;
