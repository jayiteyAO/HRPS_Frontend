import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  TrophyIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
  ShareIcon,
  EyeIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  AlertIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  credentialId: string;
  verificationUrl?: string;
  description: string;
  thumbnail: string;
  skills: string[];
  renewalRequired: boolean;
}

export const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const certifications: Certification[] = [
    {
      id: 'CERT001',
      name: 'Project Management Professional (PMP)',
      issuer: 'Project Management Institute',
      category: 'Management',
      issueDate: '2023-06-15',
      expiryDate: '2026-06-15',
      status: 'Active',
      credentialId: 'PMP-2023-45678',
      verificationUrl: 'https://verify.pmi.org',
      description: 'Global standard for project management professionals',
      thumbnail: '📋',
      skills: ['Project Planning', 'Risk Management', 'Team Leadership'],
      renewalRequired: false,
    },
    {
      id: 'CERT002',
      name: 'Certified ScrumMaster (CSM)',
      issuer: 'Scrum Alliance',
      category: 'Agile',
      issueDate: '2023-03-20',
      expiryDate: '2025-03-20',
      status: 'Expiring Soon',
      credentialId: 'CSM-2023-12345',
      verificationUrl: 'https://verify.scrumalliance.org',
      description: 'Scrum framework and Agile methodology certification',
      thumbnail: '🔄',
      skills: ['Scrum', 'Agile', 'Sprint Planning'],
      renewalRequired: true,
    },
    {
      id: 'CERT003',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      category: 'Cloud',
      issueDate: '2022-09-10',
      expiryDate: '2025-09-10',
      status: 'Active',
      credentialId: 'AWS-SA-2022-98765',
      verificationUrl: 'https://aws.amazon.com/verification',
      description: 'Expertise in designing distributed systems on AWS',
      thumbnail: '☁️',
      skills: ['AWS', 'Cloud Architecture', 'System Design'],
      renewalRequired: false,
    },
    {
      id: 'CERT004',
      name: 'Certified Information Systems Security Professional',
      issuer: 'ISC²',
      category: 'Security',
      issueDate: '2021-11-05',
      expiryDate: '2024-11-05',
      status: 'Expiring Soon',
      credentialId: 'CISSP-2021-55555',
      verificationUrl: 'https://isc2.org/verify',
      description: 'Advanced cybersecurity certification',
      thumbnail: '🔒',
      skills: ['Security', 'Risk Assessment', 'Compliance'],
      renewalRequired: true,
    },
    {
      id: 'CERT005',
      name: 'Microsoft Certified: Azure Administrator',
      issuer: 'Microsoft',
      category: 'Cloud',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      status: 'Active',
      credentialId: 'AZ-104-2024-11111',
      verificationUrl: 'https://learn.microsoft.com/verify',
      description: 'Azure cloud platform administration',
      thumbnail: '⚡',
      skills: ['Azure', 'Cloud Management', 'DevOps'],
      renewalRequired: false,
    },
    {
      id: 'CERT006',
      name: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      category: 'Data',
      issueDate: '2023-08-20',
      expiryDate: '2025-08-20',
      status: 'Active',
      credentialId: 'GCP-DE-2023-77777',
      verificationUrl: 'https://cloud.google.com/verify',
      description: 'Data engineering and analytics on Google Cloud',
      thumbnail: '📊',
      skills: ['Data Engineering', 'BigQuery', 'ML'],
      renewalRequired: false,
    },
    {
      id: 'CERT007',
      name: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      category: 'Security',
      issueDate: '2020-05-10',
      expiryDate: '2023-05-10',
      status: 'Expired',
      credentialId: 'CEH-2020-33333',
      description: 'Ethical hacking and penetration testing',
      thumbnail: '🛡️',
      skills: ['Penetration Testing', 'Ethical Hacking', 'Security Assessment'],
      renewalRequired: true,
    },
  ];

  const totalCerts = certifications.length;
  const activeCerts = certifications.filter(c => c.status === 'Active').length;
  const expiringSoon = certifications.filter(c => c.status === 'Expiring Soon').length;
  const expiredCerts = certifications.filter(c => c.status === 'Expired').length;

  const certsByCategory = [
    { name: 'Management', value: certifications.filter(c => c.category === 'Management').length, color: '#00A4EF' },
    { name: 'Cloud', value: certifications.filter(c => c.category === 'Cloud').length, color: '#7FBA00' },
    { name: 'Security', value: certifications.filter(c => c.category === 'Security').length, color: '#F25022' },
    { name: 'Agile', value: certifications.filter(c => c.category === 'Agile').length, color: '#FFB900' },
    { name: 'Data', value: certifications.filter(c => c.category === 'Data').length, color: '#8764B8' },
  ].filter(c => c.value > 0);

  const certificationTimeline = [
    { year: '2020', earned: 1 },
    { year: '2021', earned: 1 },
    { year: '2022', earned: 1 },
    { year: '2023', earned: 3 },
    { year: '2024', earned: 1 },
  ];

  const expiryTrend = [
    { month: 'Jan', expiring: 0 },
    { month: 'Feb', expiring: 0 },
    { month: 'Mar', expiring: 1 },
    { month: 'Apr', expiring: 0 },
    { month: 'May', expiring: 1 },
    { month: 'Jun', expiring: 0 },
  ];

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (cert: Certification) => {
    setSelectedCert(cert);
    setShowDetailsDialog(true);
  };

  const handleViewCertificate = (cert: Certification) => {
    setSelectedCert(cert);
    setShowCertificateDialog(true);
  };

  const handleRenew = (cert: Certification) => {
    setSelectedCert(cert);
    setShowRenewDialog(true);
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TrophyIcon size={32} className="text-[#FFB900]" />
            My Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your professional certifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <DownloadIcon size={16} />
            <span>Export All</span>
          </Button>
          <Button variant="primary" onClick={() => setShowAddDialog(true)}>
            <PlusIcon size={16} />
            <span>Add Certification</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Certifications</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalCerts}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Lifetime earned</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrophyIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{activeCerts}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {Math.round((activeCerts / totalCerts) * 100)}% of total
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{expiringSoon}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Action required</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expired</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{expiredCerts}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Needs renewal</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertIcon size={24} className="text-[#F25022]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">By Category</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution by type</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={certsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {certsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Earned Over Time</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Yearly acquisition</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={certificationTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earned" fill="#7FBA00" name="Certifications" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Expiry Timeline</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Next 6 months</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={expiryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expiring" stroke="#F25022" strokeWidth={2} name="Expiring" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>All</option>
              <option>Active</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
            <Button variant="secondary">
              <FilterIcon size={16} />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate);
            
            return (
              <div
                key={cert.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <div className={`h-32 flex items-center justify-center text-6xl ${
                  cert.status === 'Active' ? 'bg-gradient-to-br from-[#7FBA00] to-[#5a8700]' :
                  cert.status === 'Expiring Soon' ? 'bg-gradient-to-br from-[#FFB900] to-[#e0a500]' :
                  'bg-gradient-to-br from-[#F25022] to-[#d84315]'
                }`}>
                  {cert.thumbnail}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant={
                        cert.status === 'Active' ? 'success' :
                        cert.status === 'Expiring Soon' ? 'warning' : 'danger'
                      }
                      size="sm"
                    >
                      {cert.status}
                    </Badge>
                    {cert.status === 'Expiring Soon' && (
                      <span className="text-xs text-orange-600 dark:text-orange-400">
                        {daysUntilExpiry} days left
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={14} />
                      <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <ClockIcon size={14} />
                      <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Badge variant="info" size="sm">{cert.category}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewCertificate(cert)}
                    >
                      <TrophyIcon size={14} />
                      <span>View</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewDetails(cert)}
                    >
                      <EyeIcon size={14} />
                    </Button>
                    {cert.renewalRequired && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleRenew(cert)}
                      >
                        Renew
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-12">
            <TrophyIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No certifications found</p>
          </div>
        )}
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Certification Details</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{selectedCert.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedCert.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Issued by {selectedCert.issuer}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">{selectedCert.category}</Badge>
                    <Badge
                      variant={
                        selectedCert.status === 'Active' ? 'success' :
                        selectedCert.status === 'Expiring Soon' ? 'warning' : 'danger'
                      }
                      size="sm"
                    >
                      {selectedCert.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedCert.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <Badge key={idx} variant="default" size="sm">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Credential ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedCert.credentialId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCert.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                {selectedCert.verificationUrl && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verification</p>
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              setShowDetailsDialog(false);
              if (selectedCert) handleViewCertificate(selectedCert);
            }}>
              <TrophyIcon size={16} />
              <span>View Certificate</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="py-4">
              <div className="border-8 border-double border-[#FFB900] p-8 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="text-center space-y-4">
                  <div className="text-6xl">{selectedCert.thumbnail}</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Certificate of Achievement
                  </h2>
                  <div className="py-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">This certifies that</p>
                    <p className="text-2xl font-bold text-[#FFB900] mb-2">John Doe</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">has successfully earned</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {selectedCert.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Issued by {selectedCert.issuer}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Issue Date</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(selectedCert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Credential ID</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedCert.credentialId}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8 pt-4">
                    <div>
                      <div className="h-px bg-gray-400 w-32 mb-1"></div>
                      <p className="text-xs text-gray-500">Authorized Signature</p>
                    </div>
                    <div>
                      <div className="h-px bg-gray-400 w-32 mb-1"></div>
                      <p className="text-xs text-gray-500">Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCertificateDialog(false)}>
              Close
            </Button>
            <Button variant="primary">
              <DownloadIcon size={16} />
              <span>Download PDF</span>
            </Button>
            <Button variant="secondary">
              <ShareIcon size={16} />
              <span>Share</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Certification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., AWS Certified Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuer</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Cloud</option>
                  <option>Security</option>
                  <option>Management</option>
                  <option>Agile</option>
                  <option>Data</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter credential ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Verification URL (optional)
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Brief description of the certification"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowAddDialog(false)}>
              <PlusIcon size={16} />
              <span>Add Certification</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRenewDialog} onOpenChange={setShowRenewDialog}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Renew Certification</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="py-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Would you like to start the renewal process for{' '}
                <span className="font-semibold">{selectedCert.name}</span>?
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Current Expiry:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCert.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Days Remaining:</span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    {getDaysUntilExpiry(selectedCert.expiryDate)} days
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowRenewDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowRenewDialog(false)}>
              <CheckCircleIcon size={16} />
              <span>Start Renewal</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certifications;
