type RoleSample = {
  welcome: string;
  notifications?: number;
  payslips?: Array<{ month: string; year: number; net: string }>;
  approvals?: number;
  team?: Array<{ name: string; pendingLeaves: number }>;
  tasks?: number;
  reportsReady?: number;
  systemAlerts?: number;
  users?: number;
  payrollBatches?: number;
  pendingApprovals?: number;
  incidents?: number;
  backupsOk?: boolean;
  kpis?: Record<string, string>;
  [key: string]: unknown;
};

const sampleData: Record<string, RoleSample> = {
  'Employee': {
    welcome: 'Welcome, valued employee! Here are your recent requests and payslips.',
    notifications: 3,
    payslips: [
      { month: 'September', year: 2025, net: '₦250,000' },
      { month: 'August', year: 2025, net: '₦245,000' }
    ]
  },
  'Manager/HOD': {
    welcome: 'Manager dashboard — quick approvals and team overview.',
    approvals: 5,
    team: [ { name: 'Alice', pendingLeaves: 1 }, { name: 'Bob', pendingLeaves: 0 } ]
  },
  'HR Officer': {
    welcome: 'HR Officer dashboard — workflows and reports at a glance.',
    tasks: 8,
    reportsReady: 2
  },
  'HR Admin': {
    welcome: 'Admin view — system-wide settings and management tools.',
    systemAlerts: 1,
    users: 1298
  },
  'Finance Officer': {
    welcome: 'Finance dashboard — payroll pipeline and reconciliations.',
    payrollBatches: 2,
    pendingApprovals: 4
  },
  'System Admin': {
    welcome: 'System admin — health, logs, and configuration.',
    incidents: 0,
    backupsOk: true
  },
  'Executive/Auditor': {
    welcome: 'Executive snapshot — KPIs and audit summaries.',
    kpis: { turnover: '1.2%', payrollCost: '₦1.9M' }
  }
};

export default sampleData;
