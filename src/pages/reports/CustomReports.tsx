
import { Button } from '@/components/Button';

export const CustomReports = () => {
 return (
 <div className="p-8">
 <div className="mb-8">
 <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
 Custom Reports
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage and view custom reports</p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
 <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-sm">
 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Items</div>
 <div className="text-3xl font-bold text-gray-900 dark:text-white">124</div>
 <div className="text-sm text-[#7FBA00] mt-2">↑ 12% from last month</div>
 </div>
 <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-sm">
 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</div>
 <div className="text-3xl font-bold text-gray-900 dark:text-white">89</div>
 <div className="text-sm text-[#00A4EF] mt-2">72% active rate</div>
 </div>
 <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-sm">
 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
 <div className="text-3xl font-bold text-gray-900 dark:text-white">35</div>
 <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
 </div>
 </div>

 <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
 <div className="flex justify-between items-center mb-6">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Reports List</h2>
 <Button variant="primary">+ Add New</Button>
 </div>
 <div className="text-center py-12 text-gray-500 dark:text-gray-400">
 Content for Custom Reports will appear here
 </div>
 </div>
 </div>
 );
};

export default CustomReports;
