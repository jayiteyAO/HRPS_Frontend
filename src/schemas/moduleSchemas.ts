// Lightweight validators for module forms (fallback to avoid external zod dependency)
// Provides small runtime checks and returns a normalized object or throws an Error.

export type Grievance = {
  id?: string;
  title: string;
  category?: string;
  priority?: 'Low'|'Normal'|'High'|'Critical';
  incidentDate?: string;
  location?: string;
  description: string;
  severity?: 'Low'|'Medium'|'High'|'Critical';
  attachmentName?: string;
  created?: string;
  employee?: string;
};

function ensureString(v: unknown) { return v === undefined || v === null ? '' : String(v); }
function ensureNumber(v: unknown) { const n = Number(String(v ?? '')); return Number.isFinite(n) ? n : 0; }
function pickEnum<T extends string>(v: unknown, allowed: readonly T[], fallback: T): T {
  const str = typeof v === 'string' ? v : (v === undefined || v === null ? '' : String(v));
  return (allowed as readonly string[]).includes(str) ? (str as T) : fallback;
}

export function validateGrievance(input: unknown): Grievance {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const title = ensureString(o['title']).trim();
  if (!title || title.length < 3) throw new Error('Grievance title is required and must be at least 3 characters');
  const description = ensureString(o['description']).trim();
  if (!description || description.length < 3) throw new Error('Grievance description is required');
  return {
    id: o['id'] as string | undefined,
    title,
    category: (o['category'] as string) ?? 'General',
    priority: pickEnum(o['priority'], ['Low','Normal','High','Critical'] as const, 'Normal'),
    incidentDate: o['incidentDate'] as string | undefined,
    location: o['location'] as string | undefined,
    description,
    severity: pickEnum(o['severity'], ['Low','Medium','High','Critical'] as const, 'Medium'),
    attachmentName: o['attachmentName'] as string | undefined,
    created: (o['created'] as string) ?? new Date().toISOString().slice(0,10),
    employee: o['employee'] as string | undefined,
  };
}

export type Employee = {
  id?: string;
  name: string;
  dept?: string;
  role?: string;
  start?: string;
  email?: string;
  phone?: string;
  dob?: string;
  address?: string;
  emergencyContact?: string;
  bankAccount?: string;
  taxId?: string;
};
export function validateEmployee(input: unknown): Employee {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const name = ensureString(o['name']).trim();
  if (!name) throw new Error('Employee name is required');
  return {
    id: o['id'] as string | undefined,
    name,
    dept: o['dept'] as string | undefined,
    role: o['role'] as string | undefined,
    start: o['start'] as string | undefined,
    email: o['email'] as string | undefined,
    phone: o['phone'] as string | undefined,
    dob: o['dob'] as string | undefined,
    address: o['address'] as string | undefined,
    emergencyContact: o['emergencyContact'] as string | undefined,
    bankAccount: o['bankAccount'] as string | undefined,
    taxId: o['taxId'] as string | undefined,
  };
}

export type Payroll = { id?: string; period: string; basicSalary?: string; allowances?: string; deductions?: string; bankName?: string; bankAccount?: string; taxNumber?: string };
export function validatePayroll(input: unknown): Payroll {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const period = ensureString(o['period']).trim();
  if (!period) throw new Error('Payroll period is required');
  return { id: o['id'] as string | undefined, period, basicSalary: o['basicSalary'] as string | undefined, allowances: o['allowances'] as string | undefined, deductions: o['deductions'] as string | undefined, bankName: o['bankName'] as string | undefined, bankAccount: o['bankAccount'] as string | undefined, taxNumber: o['taxNumber'] as string | undefined };
}

export type TravelRequest = { id?: string; purpose: string; start?: string; end?: string; destination?: string; estCost?: string; expenseLines?: unknown[] };
export function validateTravel(input: unknown): TravelRequest {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const purpose = ensureString(o['purpose']).trim();
  if (!purpose) throw new Error('Travel purpose is required');
  return { id: o['id'] as string | undefined, purpose, start: o['start'] as string | undefined, end: o['end'] as string | undefined, destination: o['destination'] as string | undefined, estCost: o['estCost'] as string | undefined, expenseLines: Array.isArray(o['expenseLines']) ? (o['expenseLines'] as unknown[]) : [] };
}

export type LeaveRequest = { id?: string; employee?: string; type: string; from: string; to: string; approver?: string; reason?: string; status?: string };
export function validateLeave(input: unknown): LeaveRequest {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const type = ensureString(o['type']).trim();
  const from = ensureString(o['from']).trim();
  const to = ensureString(o['to']).trim();
  if (!type) throw new Error('Leave type is required');
  if (!from || !to) throw new Error('Leave from and to dates are required');
  if (new Date(to) < new Date(from)) throw new Error('End date must be after start date');
  return { id: o['id'] as string | undefined, employee: o['employee'] as string | undefined, type, from, to, approver: o['approver'] as string | undefined, reason: o['reason'] as string | undefined, status: o['status'] as string | undefined ?? 'Pending' };
}

export type Requisition = { id?: string; title: string; dept?: string; location?: string; hiringManager?: string; salaryRange?: string; description?: string; status?: string };
export function validateRequisition(input: unknown): Requisition {
  const obj = input || {};
  const o = obj as Record<string, unknown>;
  const title = ensureString(o['title']).trim();
  if (!title) throw new Error('Requisition title is required');
  return { id: o['id'] as string | undefined, title, dept: o['dept'] as string | undefined, location: o['location'] as string | undefined, hiringManager: o['hiringManager'] as string | undefined, salaryRange: o['salaryRange'] as string | undefined, description: o['description'] as string | undefined, status: o['status'] as string | undefined };
}

export type LearningCourse = { id?: string; title: string; provider?: string; duration?: string; seats?: number };
export function validateLearningCourse(input: unknown): LearningCourse { const obj = input || {}; const o = obj as Record<string, unknown>; const title = ensureString(o['title']).trim(); if (!title) throw new Error('Course title is required'); const seats = typeof o['seats'] === 'number' ? (o['seats'] as number) : Number(o['seats'] ?? 0); return { id: o['id'] as string | undefined, title, provider: o['provider'] as string | undefined, duration: o['duration'] as string | undefined, seats } }
export type DisciplinaryCase = { id?: string; title: string; employee?: string; incidentDate?: string; severity?: string; notes?: string; status?: string };
export function validateDisciplinary(input: unknown): DisciplinaryCase { const obj = input || {}; const o = obj as Record<string, unknown>; const title = ensureString(o['title']).trim(); if (!title) throw new Error('Case title is required'); return { id: o['id'] as string | undefined, title, employee: o['employee'] as string | undefined, incidentDate: o['incidentDate'] as string | undefined, severity: (o['severity'] as string) ?? 'Medium', notes: o['notes'] as string | undefined, status: (o['status'] as string) ?? 'Open' } }
export type AppraisalGoal = { id?: string; name: string; owner?: string; dueDate?: string; weight?: string };
export function validateAppraisalGoal(input: unknown): AppraisalGoal { const obj = input || {}; const o = obj as Record<string, unknown>; const name = ensureString(o['name']).trim(); if (!name) throw new Error('Goal name is required'); return { id: o['id'] as string | undefined, name, owner: o['owner'] as string | undefined, dueDate: o['dueDate'] as string | undefined, weight: o['weight'] as string | undefined } }
export type ESSRequest = { id?: string; title: string; type?: string; details?: string; status?: string };
export function validateESSRequest(input: unknown): ESSRequest { const obj = input || {}; const o = obj as Record<string, unknown>; const title = ensureString(o['title']).trim(); if (!title) throw new Error('Request title is required'); return { id: o['id'] as string | undefined, title, type: o['type'] as string | undefined, details: o['details'] as string | undefined, status: (o['status'] as string) ?? 'Pending' } }
export type TimeRecord = { id?: string; name?: string; date: string; time?: string; reason?: string };
export function validateTimeRecord(input: unknown): TimeRecord { const obj = input || {}; const o = obj as Record<string, unknown>; const date = ensureString(o['date']).trim(); if (!date) throw new Error('Date is required'); return { id: o['id'] as string | undefined, name: o['name'] as string | undefined, date, time: o['time'] as string | undefined, reason: o['reason'] as string | undefined } }
export type WelfareEvent = { id?: string; title: string; date?: string; description?: string };
export function validateWelfareEvent(input: unknown): WelfareEvent { const obj = input || {}; const o = obj as Record<string, unknown>; const title = ensureString(o['title']).trim(); if (!title) throw new Error('Event title is required'); return { id: o['id'] as string | undefined, title, date: o['date'] as string | undefined, description: o['description'] as string | undefined } }
export type CompensationBand = { id?: string; band: string; grade?: string; min?: number; max?: number };
export function validateCompensationBand(input: unknown): CompensationBand { const obj = input || {}; const o = obj as Record<string, unknown>; const band = ensureString(o['band']).trim(); if (!band) throw new Error('Band is required'); const min = ensureNumber(o['min']); const max = ensureNumber(o['max']); if (max < min) throw new Error('max must be >= min'); return { id: o['id'] as string | undefined, band, grade: o['grade'] as string | undefined, min, max } }

// keep default shape for compatibility
export default {
  validateGrievance,
  validateEmployee,
  validatePayroll,
  validateTravel,
  validateAppraisalGoal,
  validateLearningCourse,
  validateDisciplinary,
  validateESSRequest,
  validateTimeRecord,
  validateLeave,
  validateRequisition,
  validateWelfareEvent,
  validateCompensationBand,
};
