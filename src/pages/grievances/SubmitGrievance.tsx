import { useState } from 'react';
import { Button } from '@/components/Button';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';

export const SubmitGrievance = () => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'Medium',
    anonymous: false
  });
  const { addToast } = useToast();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.subject || !formData.description) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    addToast('Grievance submitted successfully', 'success');
    setFormData({ category: '', subject: '', description: '', priority: 'Medium', anonymous: false });
  };

 return (
 <div className="p-8">
 <div className="mb-8">
 <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
 Submit Grievance
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">File a formal complaint or concern</p>
 </div>

 <div className={`p-8 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
   <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         Category *
       </label>
       <select
         value={formData.category}
         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         required
       >
         <option value="">Select category</option>
         <option value="Harassment">Harassment</option>
         <option value="Discrimination">Discrimination</option>
         <option value="Workplace Safety">Workplace Safety</option>
         <option value="Pay & Benefits">Pay & Benefits</option>
         <option value="Work Environment">Work Environment</option>
         <option value="Management">Management Issue</option>
         <option value="Other">Other</option>
       </select>
     </div>

     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         Subject *
       </label>
       <input
         type="text"
         value={formData.subject}
         onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
         placeholder="Brief summary of your grievance"
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         required
       />
     </div>

     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         Description *
       </label>
       <textarea
         value={formData.description}
         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
         placeholder="Please provide detailed information about your grievance..."
         rows={6}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
         required
       />
     </div>

     <div>
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         Priority *
       </label>
       <select
         value={formData.priority}
         onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
         className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
       >
         <option value="Low">Low</option>
         <option value="Medium">Medium</option>
         <option value="High">High</option>
         <option value="Critical">Critical</option>
       </select>
     </div>

     <div className="flex items-center gap-3">
       <input
         type="checkbox"
         id="anonymous"
         checked={formData.anonymous}
         onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
         className="w-4 h-4"
       />
       <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
         Submit anonymously
       </label>
     </div>

     <div className={`p-4 border-l-4 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-400' : 'bg-blue-50 border-blue-400'}`}>
       <p className="text-sm text-gray-700 dark:text-gray-300">
         <strong>Note:</strong> All grievances are treated confidentially and will be investigated thoroughly. 
         You will receive updates on the status of your grievance via email.
       </p>
     </div>

     <div className="flex gap-4 pt-4">
       <Button type="submit" variant="primary" size="lg">
         Submit Grievance
       </Button>
       <Button 
         type="button" 
         variant="ghost" 
         size="lg"
         onClick={() => setFormData({ category: '', subject: '', description: '', priority: 'Medium', anonymous: false })}
       >
         Clear Form
       </Button>
     </div>
   </form>
 </div>
 </div>
 );
};

export default SubmitGrievance;
