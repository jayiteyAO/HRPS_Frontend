
import { useState } from 'react';
import { Button } from '@/components/Button';
import { MessageSquare, TrendingUp, Clock, CheckCircle, XCircle, Eye, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface Feedback {
  id: number;
  from: string;
  to: string;
  type: string;
  category: string;
  date: string;
  status: string;
  rating: number;
  comment: string;
}

const feedbackData: Feedback[] = [
  { id: 1, from: 'Sarah Johnson', to: 'John Doe', type: '360 Feedback', category: 'Leadership', date: '2024-01-15', status: 'Completed', rating: 4, comment: 'Excellent leadership skills demonstrated during Q4 project.' },
  { id: 2, from: 'Michael Brown', to: 'Jane Smith', type: 'Peer Review', category: 'Teamwork', date: '2024-01-12', status: 'Completed', rating: 5, comment: 'Great collaboration and team spirit.' },
  { id: 3, from: 'Emily Davis', to: 'John Doe', type: 'Manager Feedback', category: 'Technical Skills', date: '2024-01-10', status: 'Pending', rating: 0, comment: '' },
  { id: 4, from: 'Robert Wilson', to: 'Jane Smith', type: 'Self Assessment', category: 'Communication', date: '2024-01-08', status: 'Completed', rating: 4, comment: 'Strong communication across all departments.' },
  { id: 5, from: 'Lisa Anderson', to: 'Michael Brown', type: '360 Feedback', category: 'Problem Solving', date: '2024-01-05', status: 'Completed', rating: 5, comment: 'Exceptional problem-solving abilities.' },
  { id: 6, from: 'John Doe', to: 'Sarah Johnson', type: 'Peer Review', category: 'Innovation', date: '2024-01-03', status: 'Pending', rating: 0, comment: '' },
];

const feedbackTypeData = [
  { name: '360 Feedback', value: 35 },
  { name: 'Peer Review', value: 28 },
  { name: 'Manager Feedback', value: 25 },
  { name: 'Self Assessment', value: 12 },
];

const feedbackTrendData = [
  { month: 'Jul', count: 45 },
  { month: 'Aug', count: 52 },
  { month: 'Sep', count: 48 },
  { month: 'Oct', count: 61 },
  { month: 'Nov', count: 58 },
  { month: 'Dec', count: 67 },
];

const COLORS = ['#00A4EF', '#7FBA00', '#FFB900', '#F25022'];

export const Feedback = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const handleView = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsViewOpen(true);
  };

  const handleEdit = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsEditOpen(true);
  };

  const handleDelete = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Feedback Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage and track performance feedback</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Feedback</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">124</div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 12% from last month</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">89</div>
              <div className="text-sm text-[#7FBA00] mt-2">72% completion rate</div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">35</div>
              <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <Clock className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Rating</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.2</div>
              <div className="text-sm text-[#00A4EF] mt-2">Out of 5.0</div>
            </div>
            <div className="p-3 bg-[#F25022]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#F25022]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feedback Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00A4EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feedback by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feedbackTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {feedbackTypeData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback List</h2>
          <Button variant="primary" onClick={() => setIsAddOpen(true)}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Request Feedback</span>
            </div>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {feedbackData.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold ${
                        feedback.status === 'Completed'
                          ? 'bg-[#7FBA00]/10 text-[#7FBA00]'
                          : 'bg-[#FFB900]/10 text-[#FFB900]'
                      }`}
                    >
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.rating > 0 ? `${feedback.rating}/5` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(feedback)}
                      >
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </div>
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(feedback)}
                      >
                        <div className="flex items-center gap-1.5">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(feedback)}
                      >
                        <div className="flex items-center gap-1.5">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Feedback Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Request Feedback</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Request feedback from team members
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="from" className="text-gray-900 dark:text-white">From</Label>
              <Input id="from" placeholder="Select employee" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to" className="text-gray-900 dark:text-white">To</Label>
              <Input id="to" placeholder="Select recipient" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-gray-900 dark:text-white">Feedback Type</Label>
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360">360 Feedback</SelectItem>
                  <SelectItem value="peer">Peer Review</SelectItem>
                  <SelectItem value="manager">Manager Feedback</SelectItem>
                  <SelectItem value="self">Self Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-gray-900 dark:text-white">Category</Label>
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="teamwork">Teamwork</SelectItem>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="problem-solving">Problem Solving</SelectItem>
                  <SelectItem value="innovation">Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message" className="text-gray-900 dark:text-white">Message (Optional)</Label>
              <Textarea id="message" placeholder="Add a message..." className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </div>
            </Button>
            <Button variant="primary" onClick={() => setIsAddOpen(false)}>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Send Request</span>
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Feedback Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Feedback Details</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              View complete feedback information
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">From</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.from}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">To</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.to}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Type</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.type}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Category</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Date</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.date}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Status</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedFeedback.status}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-600 dark:text-gray-400">Rating</Label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedFeedback.rating > 0 ? `${selectedFeedback.rating}/5` : 'Not rated yet'}
                </p>
              </div>
              {selectedFeedback.comment && (
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Comment</Label>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedFeedback.comment}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsViewOpen(false)}>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Close</span>
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Feedback Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Edit Feedback</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update feedback information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-rating" className="text-gray-900 dark:text-white">Rating</Label>
              <Select defaultValue={selectedFeedback?.rating.toString()}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Needs Improvement</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-comment" className="text-gray-900 dark:text-white">Comment</Label>
              <Textarea
                id="edit-comment"
                defaultValue={selectedFeedback?.comment}
                placeholder="Add your feedback..."
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status" className="text-gray-900 dark:text-white">Status</Label>
              <Select defaultValue={selectedFeedback?.status}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </div>
            </Button>
            <Button variant="primary" onClick={() => setIsEditOpen(false)}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Save Changes</span>
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Feedback Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delete Feedback</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this feedback? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="py-4">
              <p className="text-sm text-gray-900 dark:text-white">
                <strong>From:</strong> {selectedFeedback.from}
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                <strong>To:</strong> {selectedFeedback.to}
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                <strong>Type:</strong> {selectedFeedback.type}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </div>
            </Button>
            <Button variant="danger" onClick={() => setIsDeleteOpen(false)}>
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feedback;
