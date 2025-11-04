/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions, react-refresh/only-export-components */
import React, { useState } from 'react';
import { validateGrievance, validateEmployee, validatePayroll, validateTravel, validateAppraisalGoal, validateLearningCourse, validateESSRequest, validateTimeRecord, validateRequisition, validateWelfareEvent, validateCompensationBand } from '../schemas/moduleSchemas';
import { saveToStorage, loadFromStorage } from '@/utils/storage';
import { cardClass, primaryBtn, ghostBtn } from '@/components/ui';
import GenericModuleEditor from './GenericModuleEditor';

// Module UI Props interface
interface ModuleUIProps {
  action: string;
  name?: string;
  onBack?: () => void;
  onSuccess?: (message: string) => void;
}

// Use Tailwind + shared CSS vars for consistent look & feel (no direct login stylesheet import)

const stripName = (n: string) => n.replace(/^[0-9]+\.\s*/, '').toLowerCase();

/*
 Expanded field-level UIs for each module. These are front-end only, keep simple
 local state, perform lightweight validation, and include ARIA/keyboard support.
*/

// ---------- Utility helpers ----------
const dateToday = () => new Date().toISOString().slice(0, 10);

// Tiny accessible text input wrapper
const TextInput = ({ label, id, value, onChange, required, type = 'text', placeholder }: any) => (
 <label className="text-sm block">
 <span className="inline-block mb-1">{label}{required ? ' *' : ''}</span>
 <input id={id} aria-required={required} aria-label={label} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" />
 </label>
);

// Simple validation error block
const ErrorMsg = ({ message }: { message?: string }) => message ? (<div className="text-sm text-red-600 mt-1" role="alert">{message}</div>) : null;

// Reusable fallback UI used when a specific action UI is not implemented.
// @ts-ignore
const _ModuleFallback: React.FC<{ moduleName: string; action: string; storageKey?: string; onBack?: () => void; onSuccess?: (m: string) => void }> = ({ moduleName, action, storageKey, onBack, onSuccess }) => {
 const key = storageKey || moduleName.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
 const [items, setItems] = useState<any[]>(() => loadFromStorage<any[]>(key) || []);
 const [editor, setEditor] = useState<string>('');
 const [error, setError] = useState<string | null>(null);

 // Prefill editor with a compact preview of items
 React.useEffect(() => {
 if (items.length > 0) setEditor(JSON.stringify(items.slice(0, 5), null, 2));
 else setEditor(`{\n"id": "${key}-${Date.now().toString().slice(-4)}",\n "title": "Sample ${moduleName}",\n "created": "${dateToday()}"\n}`);
 }, []);

 const handleSave = () => {
 try {
 const parsed = JSON.parse(editor);
 const newItems = Array.isArray(parsed) ? parsed : [parsed];
 const merged = [...newItems, ...items];
 saveToStorage(key, merged);
 setItems(merged);
 setError(null);
 onSuccess && onSuccess('Saved');
 } catch (err: any) {
 setError('Invalid JSON — please fix and try again');
 }
 };

 const handleClear = () => {
 if (!confirm('Clear saved items for this module?')) return;
 saveToStorage(key, []);
 setItems([]);
 onSuccess && onSuccess('Cleared');
 };

 return (
 <section aria-labelledby={`${key}-fallback`} className={cardClass}>
 <h3 id={`${key}-fallback`} className="text-lg font-semibold">{moduleName} — {action}</h3>
 <p className="text-sm text-gray-500 mt-1">This action does not have a specialized UI yet; use this editor to create sample items or inspect persisted entries for this module.</p>

 <label className="block mt-3 text-sm">JSON editor (sample item or array)
 <textarea aria-label={`${moduleName} editor`} value={editor} onChange={(e) => setEditor(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={8} />
 </label>
 <ErrorMsg message={error ?? undefined} />

 <div className="flex gap-2 mt-3">
 <button type="button" onClick={handleSave} className={primaryBtn}>Save</button>
 <button type="button" onClick={() => { setEditor(''); }} className={ghostBtn}>Clear editor</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Close</button>}
 <button type="button" onClick={handleClear} className="ml-auto px-3 py-2 rounded bg-red-600 text-white">Clear storage</button>
 </div>

 <div className="mt-4">
 <div className="text-sm text-gray-500">Saved items ({items.length})</div>
 <ul className="mt-2 space-y-2">
 {items.map((it: any, i: number) => (
 <li key={i} className="p-3 bg-white dark:bg-gray-800 rounded">
 <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(it, null, 2)}</pre>
 </li>
 ))}
 </ul>
 </div>
 </section>
 );
};

// ---------- Grievance Management ----------
export const GrievanceModule: React.FC<ModuleUIProps> = ({ action, onBack, onSuccess }) => {
 const [cases, setCases] = useState(() => [
 { id: 'G-1001', employee: 'Alice', title: 'Workplace safety', status: 'Open', created: '2025-09-12' },
 { id: 'G-1002', employee: 'Bob', title: 'Harassment claim', status: 'Under Investigation', created: '2025-10-02' },
 ]);

 // create form state
 const [title, setTitle] = useState('');
 const [category, setCategory] = useState('General');
 const [priority, setPriority] = useState('Normal');
 const [incidentDate, setIncidentDate] = useState(dateToday());
 const [location, setLocation] = useState('');
 const [description, setDescription] = useState('');
 const [error, setError] = useState<string | null>(null);

 const submit = (e?: React.FormEvent) => {
 e?.preventDefault();
 // build object and validate via Zod
 const payload = {
 title: title.trim(),
 category,
 priority,
 incidentDate,
 location,
 description: description.trim(),
 severity: 'Medium',
 attachmentName: undefined,
 created: new Date().toISOString().slice(0, 10),
 employee: 'You',
 };

 try {
 const parsed = validateGrievance(payload as any);
 const id = `G-${Date.now().toString().slice(-6)}`;
 const entry = { id, ...parsed };
 // persist to local storage (append)
 const existing = loadFromStorage<any[]>('grievances') || [];
 saveToStorage('grievances', [entry, ...existing]);

 // update local UI state
 setCases((s) => [{ id, ...parsed } as any, ...s]);
 setTitle(''); setCategory('General'); setPriority('Normal'); setIncidentDate(dateToday()); setLocation(''); setDescription('');
 setError(null);
 onSuccess && onSuccess('Grievance submitted');
 } catch (err: any) {
 setError(err?.message ?? String(err));
 }
 };

 if (action === 'view') {
 return (
 <section aria-labelledby="grievance-heading">
 <h2 id="grievance-heading" className="sr-only">Grievance cases</h2>
 <p className="text-sm text-gray-600 dark:text-gray-300">Browse recent grievance cases and their status.</p>
 <div className="mt-4 space-y-3">
 {cases.map((c: any) => (
 <article key={c.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow" aria-labelledby={`case-${c.id}`} tabIndex={0}>
 <h3 id={`case-${c.id}`} className="font-semibold">{c.title} <span className="text-xs text-gray-500">({c.id})</span></h3>
 <div className="text-sm text-gray-600 dark:text-gray-300">Submitted by {c.employee} • {c.created}</div>
 <div className="mt-2 text-sm"><strong>Status:</strong> <span className="ml-2">{c.status}</span></div>
 {c.category && <div className="text-sm text-gray-500">Category: {c.category}</div>}
 {c.priority && <div className="text-sm text-gray-500">Priority: {c.priority}</div>}
 </article>
 ))}
 </div>
 </section>
 );
 }

 if (action === 'create') {
 return (
 <form onSubmit={submit} aria-label="Create grievance" className="grid gap-3" onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') { /* allow Enter to submit from inputs */ } }}>
 <TextInput label="Title" id="grv-title" value={title} onChange={setTitle} required />
 <label className="text-sm block">Category
 <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>General</option>
 <option>Safety</option>
 <option>Harassment</option>
 <option>Policy</option>
 </select>
 </label>
 <label className="text-sm block">Priority
 <select aria-label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>Low</option>
 <option>Normal</option>
 <option>High</option>
 <option>Critical</option>
 </select>
 </label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <TextInput label="Incident date" id="grv-date" type="date" value={incidentDate} onChange={setIncidentDate} />
 <TextInput label="Location" id="grv-location" value={location} onChange={setLocation} />
 </div>
 <label className="text-sm block">Description
 <textarea aria-label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full p-2 border rounded bg-white dark:bg-gray-800" />
 </label>
 <ErrorMsg message={error ?? undefined} />
 <div className="flex gap-2">
 <button type="submit" className="px-3 py-2 rounded bg-green-600 text-white">Submit</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Cancel</button>}
 </div>
 </form>
 );
 }

 // approve / update / manage
 if (action === 'approve') {
 return (
 <div>
 <p className="text-sm">Cases awaiting approval/triage</p>
 <ul className="mt-3 space-y-2">
 {cases.filter((c: any) => c.status !== 'Closed').map((c: any) => (
 <li key={c.id} className="p-3 bg-white dark:bg-gray-800 rounded flex items-center justify-between">
 <div>
 <div className="font-medium">{c.title} <span className="text-xs text-gray-500">{c.id}</span></div>
 <div className="text-sm text-gray-500">Submitted by {c.employee}</div>
 </div>
 <div className="flex gap-2">
 <button onClick={() => { setCases((s) => s.map((it: any) => it.id === c.id ? { ...it, status: 'Closed' } : it)); onSuccess && onSuccess('Case approved'); }} className="px-3 py-1 rounded bg-indigo-600 text-white">Approve</button>
 <button onClick={() => { setCases((s) => s.map((it: any) => it.id === c.id ? { ...it, status: 'Rejected' } : it)); onSuccess && onSuccess('Case rejected'); }} className="px-3 py-1 rounded bg-gray-700 text-white">Reject</button>
 </div>
 </li>
 ))}
 </ul>
 </div>
 );
 }

 return (
 <div>
 <p className="text-sm">{action} UI for Grievance Management</p>
 <div className="mt-3">
 <label className="text-sm">Admin notes
 <textarea aria-label="Admin notes" className="w-full p-2 border rounded bg-white dark:bg-gray-800" />
 </label>
 <div className="mt-2">
 <button onClick={() => onSuccess && onSuccess('Saved')} className="px-3 py-2 rounded bg-gray-700 text-white">Save</button>
 </div>
 </div>
 </div>
 );
};

// ---------- Welfare Management ----------
export const WelfareModule: React.FC<ModuleUIProps> = ({ action, onBack, onSuccess }) => {
 const [funds, setFunds] = useState(() => [{ id: 'WF-1', name: 'Employee Welfare Fund', balance: 12500 }]);
 const [events, setEvents] = useState(() => [{ id: 'WE-1', title: 'Annual Gala', date: '2025-12-15' }]);

 // create event
 const [eventTitle, setEventTitle] = useState('');
 const [eventDate, setEventDate] = useState(dateToday());
 const [eventDesc, setEventDesc] = useState('');
 const [allocAmount, setAllocAmount] = useState('');
 const [selectedFund, setSelectedFund] = useState(funds[0].id);
 const [error, setError] = useState<string | null>(null);

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Welfare funds and upcoming events.</p>
 <div className="mt-3 space-y-3">
 {funds.map((f: any) => (
 <div key={f.id} className="p-3 bg-white dark:bg-gray-800 rounded">{f.name} • <strong>${f.balance}</strong></div>
 ))}
 {events.map((e: any) => (
 <div key={e.id} className="p-3 bg-white dark:bg-gray-800 rounded">{e.title} • <span className="text-sm">{e.date}</span></div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const createEvent = (ev: React.FormEvent) => {
 ev.preventDefault();
 try {
 const parsed = validateWelfareEvent({ title: eventTitle, date: eventDate, description: eventDesc });
 const id = `WE-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setEvents((s) => [entry as any, ...s]);
 const existing = loadFromStorage<any[]>('welfare_events') || [];
 saveToStorage('welfare_events', [entry, ...existing]);
 setEventTitle(''); setEventDate(dateToday()); setEventDesc(''); onSuccess && onSuccess('Event created');
 } catch (err: any) { setError(err?.message || String(err)); }
 };

 return (
 <div className={cardClass}>
 <form onSubmit={createEvent} className="grid gap-3">
 <TextInput label="Event title" id="w-evt-title" value={eventTitle} onChange={setEventTitle} required />
 <TextInput label="Date" id="w-evt-date" type="date" value={eventDate} onChange={setEventDate} />
 <label className="text-sm block">Description
 <textarea aria-label="Event description" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} />
 </label>
 <ErrorMsg message={error ?? undefined} />
 <div className="flex gap-2">
 <button type="submit" className={primaryBtn}>Create event</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Cancel</button>}
 </div>
 </form>
 </div>
 );
 }

 if (action === 'manage') {
 return (
 <div>
 <p className="text-sm">Adjust fund allocations</p>
 <div className="grid gap-2 mt-2">
 <label className="text-sm block">Fund
 <select aria-label="Select fund" value={selectedFund} onChange={(e) => setSelectedFund(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 {funds.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
 </select>
 </label>
 <TextInput label="Amount to allocate" id="wf-amount" value={allocAmount} onChange={setAllocAmount} />
 <div className="flex gap-2">
 <button onClick={() => {
 const amt = Number(allocAmount || 0);
 if (Number.isNaN(amt) || amt <= 0) return setError('Enter a valid amount');
 setFunds((s) => s.map((f: any) => f.id === selectedFund ? { ...f, balance: f.balance + amt } : f));
 setAllocAmount(''); setError(null); onSuccess && onSuccess('Allocation saved');
 }} className="px-3 py-2 rounded bg-gray-700 text-white">Allocate</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Close</button>}
 </div>
 <ErrorMsg message={error ?? undefined} />
 </div>
 </div>
 );
 }

 return (
 <GenericModuleEditor moduleName="Welfare Management" action={action} storageKey="welfare_events" onSuccess={onSuccess} />
 );
};

// ---------- Appraisal / Performance Management ----------
export const AppraisalModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [goals, setGoals] = useState<any[]>(() => [
 { id: 'G-1', name: 'Improve code quality', owner: 'Alice', status: 'In progress' },
 { id: 'G-2', name: 'Reduce incidents', owner: 'Bob', status: 'Planned' },
 ]);

 const [title, setTitle] = useState('');
 const [owner, setOwner] = useState('');
 const [dueDate, setDueDate] = useState(dateToday());
 const [weight, setWeight] = useState('');
 const [score, setScore] = useState('');
 const [comments, setComments] = useState('');
 const [error, setError] = useState<string | null>(null);

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Team objectives and appraisal items.</p>
 <div className="mt-3 space-y-2">
 {goals.map((g) => (
 <div key={g.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{g.name}</div>
 <div className="text-sm text-gray-500">Owner: {g.owner} • {g.status}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const add = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateAppraisalGoal({ name: title, owner, dueDate, weight });
 const id = `G-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setGoals((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('appraisal_goals') || [];
 saveToStorage('appraisal_goals', [entry, ...existing]);
 setTitle(''); setOwner(''); setDueDate(dateToday()); setWeight(''); setError(null);
 onSuccess && onSuccess('Goal created');
 } catch (err: any) { setError(err?.message || String(err)); }
 };
 return (
 <div className={cardClass}>
 <form onSubmit={add} className="grid gap-3">
 <TextInput label="Goal title" id="ap-title" value={title} onChange={setTitle} required />
 <TextInput label="Owner" id="ap-owner" value={owner} onChange={setOwner} />
 <TextInput label="Due date" id="ap-due" type="date" value={dueDate} onChange={setDueDate} />
 <TextInput label="Weight (0-100)" id="ap-weight" value={weight} onChange={setWeight} />
 <ErrorMsg message={error ?? undefined} />
 <div>
 <button type="submit" className={primaryBtn}>Add goal</button>
 </div>
 </form>
 </div>
 );
 }

 if (action === 'approve') {
 return (
 <div>
 <p className="text-sm">Approve completed appraisals</p>
 <div className="mt-3 grid gap-2">
 <label className="text-sm">Score
 <input aria-label="Score" value={score} onChange={(e) => setScore(e.target.value)} className="w-32 p-2 border rounded bg-white dark:bg-gray-800" />
 </label>
 <label className="text-sm">Comments
 <textarea aria-label="Comments" value={comments} onChange={(e) => setComments(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={3} />
 </label>
 <button onClick={() => onSuccess && onSuccess('Appraisals approved')} className="px-3 py-2 rounded bg-indigo-600 text-white">Approve</button>
 </div>
 </div>
 );
 }

 if (action === 'manage') {
 return (
 <GenericModuleEditor moduleName="Appraisal / Performance Management" action={action} storageKey="appraisal_goals" onSuccess={onSuccess} />
 );
 }

 return (
 <GenericModuleEditor moduleName="Appraisal / Performance Management" action={action} storageKey="appraisal_goals" onSuccess={onSuccess} />
 );
};

// ---------- Recruitment Management ----------
export const RecruitmentModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [jobs, setJobs] = useState<any[]>(() => [
 { id: 'JR-001', title: 'Frontend Engineer', status: 'Open' },
 { id: 'JR-002', title: 'Product Manager', status: 'Closed' },
 ]);

 const [title, setTitle] = useState('');
 const [dept, setDept] = useState('');
 const [location, setLocation] = useState('');
 const [hiringManager, setHiringManager] = useState('');
 const [salaryRange, setSalaryRange] = useState('');
 const [desc, setDesc] = useState('');
 const [error, setError] = useState<string | null>(null);

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Open job requisitions.</p>
 <div className="mt-3 space-y-2">
 {jobs.map((j) => (
 <div key={j.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{j.title}</div>
 <div className="text-sm text-gray-500">{j.id} • {j.status}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const create = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateRequisition({ title, dept, location, hiringManager, salaryRange, description: desc });
 const id = `JR-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed, status: 'Open' };
 setJobs((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('requisitions') || [];
 saveToStorage('requisitions', [entry, ...existing]);
 setTitle(''); setDept(''); setLocation(''); setHiringManager(''); setSalaryRange(''); setDesc(''); setError(null); onSuccess && onSuccess('Requisition created');
 } catch (err: any) { setError(err?.message || String(err)); }
 };
 return (
 <div className={cardClass}>
 <form onSubmit={create} className="grid gap-3">
 <TextInput label="Role title" id="rec-title" value={title} onChange={setTitle} required />
 <TextInput label="Department" id="rec-dept" value={dept} onChange={setDept} />
 <TextInput label="Location" id="rec-loc" value={location} onChange={setLocation} />
 <TextInput label="Hiring manager" id="rec-hm" value={hiringManager} onChange={setHiringManager} />
 <TextInput label="Salary range" id="rec-sal" value={salaryRange} onChange={setSalaryRange} placeholder="e.g. 40k-60k" />
 <label className="text-sm block">Description
 <textarea aria-label="Role description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} />
 </label>
 <ErrorMsg message={error ?? undefined} />
 <div>
 <button type="submit" className={primaryBtn}>Create requisition</button>
 </div>
 </form>
 </div>
 );
 }

 if (action === 'update') {
 return (
 <div>
 <p className="text-sm">Manage job requisitions</p>
 <div className="mt-3 space-y-2">
 {jobs.map((j) => (
 <div key={j.id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between">
 <div>
 <div className="font-medium">{j.title}</div>
 <div className="text-sm text-gray-500">{j.id}</div>
 </div>
 <div className="flex gap-2">
 <button onClick={() => { setJobs((s) => s.map((it) => it.id === j.id ? { ...it, status: it.status === 'Open' ? 'Closed' : 'Open' } : it)); onSuccess && onSuccess('Status toggled'); }} className="px-3 py-1 rounded bg-yellow-600 text-white">Toggle</button>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 return (
 <GenericModuleEditor moduleName="Recruitment Management" action={action} storageKey="requisitions" onSuccess={onSuccess} />
 );
};

// ---------- Leave Management ----------
export const LeaveModule: React.FC<ModuleUIProps> = ({ action, onBack, onSuccess }) => {
 const [requests, setRequests] = useState<any[]>(() => [
 { id: 'LR-201', employee: 'Alice', type: 'Annual', from: '2025-11-01', to: '2025-11-05', status: 'Approved' },
 { id: 'LR-202', employee: 'Charlie', type: 'Sick', from: '2025-11-10', to: '2025-11-12', status: 'Pending' },
 ]);
 const [type, setType] = useState('Annual');
 const [from, setFrom] = useState('');
 const [to, setTo] = useState('');
 const [approver, setApprover] = useState('');
 const [reason, setReason] = useState('');
 const [error, setError] = useState<string | null>(null);

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Your leave requests.</p>
 <div className="mt-3 space-y-2">
 {requests.map((r) => (
 <div key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{r.id} — {r.employee}</div>
 <div className="text-sm text-gray-500">{r.type} • {r.from} to {r.to} • {r.status}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const create = (e: React.FormEvent) => {
 e.preventDefault();
 if (!from || !to) return setError('Start and end dates are required');
 if (new Date(to) < new Date(from)) return setError('End date must be after start date');
 const id = `LR-${Date.now().toString().slice(-4)}`;
 const entry = { id, employee: 'You', type, from, to, status: 'Pending', approver, reason };
 setRequests((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('leaves') || [];
 saveToStorage('leaves', [entry, ...existing]);
 setType('Annual'); setFrom(''); setTo(''); setApprover(''); setReason(''); setError(null);
 onSuccess && onSuccess('Leave requested');
 };
 return (
 <form onSubmit={create} className="grid gap-3">
 <label className="text-sm block">Type
 <select aria-label="Leave type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>Annual</option>
 <option>Sick</option>
 <option>Unpaid</option>
 <option>Maternity</option>
 </select>
 </label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <TextInput label="From" id="leave-from" type="date" value={from} onChange={setFrom} />
 <TextInput label="To" id="leave-to" type="date" value={to} onChange={setTo} />
 </div>
 <TextInput label="Approver email" id="leave-approver" type="email" value={approver} onChange={setApprover} />
 <label className="text-sm">Reason<textarea aria-label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} /></label>
 <ErrorMsg message={error ?? undefined} />
 <div className="flex gap-2">
 <button type="submit" className="px-3 py-2 rounded bg-green-600 text-white">Request</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Cancel</button>}
 </div>
 </form>
 );
 }

 if (action === 'approve') {
 return (
 <div>
 <p className="text-sm">Leave pending approvals</p>
 <ul className="mt-3 space-y-2">
 {requests.filter((r) => r.status === 'Pending').map((r) => (
 <li key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between">
 <div>
 <div className="font-medium">{r.id} — {r.employee}</div>
 <div className="text-sm text-gray-500">{r.type} • {r.from} to {r.to}</div>
 </div>
 <div className="flex gap-2">
 <button onClick={() => { setRequests((s) => s.map((it) => it.id === r.id ? { ...it, status: 'Approved' } : it)); onSuccess && onSuccess('Leave approved'); }} className="px-3 py-1 rounded bg-indigo-600 text-white">Approve</button>
 <button onClick={() => { setRequests((s) => s.map((it) => it.id === r.id ? { ...it, status: 'Rejected' } : it)); onSuccess && onSuccess('Leave rejected'); }} className="px-3 py-1 rounded bg-gray-700 text-white">Reject</button>
 </div>
 </li>
 ))}
 </ul>
 </div>
 );
 }

 // Fallback for other actions
 return <GenericModuleEditor moduleName="Leave Management" action={action} storageKey="leaves" onBack={onBack} onSuccess={onSuccess} />;
};

// ---------- Learning Management ----------
export const LearningModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [courses, setCourses] = useState<any[]>(() => [
 { id: 'C-101', title: 'React Basics', seats: 30, provider: 'LC' },
 { id: 'C-102', title: 'Advanced TypeScript', seats: 20, provider: 'LC' },
 ]);
 const [title, setTitle] = useState('');
 const [provider, setProvider] = useState('');
 const [duration, setDuration] = useState('');
 const [seats, setSeats] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Learning catalog</p>
 <div className="mt-3 space-y-2">
 {courses.map((c) => (
 <div key={c.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{c.title}</div>
 <div className="text-sm text-gray-500">{c.provider} • Seats: {c.seats}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const create = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateLearningCourse({ title, provider, duration, seats: Number(seats || 0) });
 const id = `C-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setCourses((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('learning_courses') || [];
 saveToStorage('learning_courses', [entry, ...existing]);
 setTitle(''); setProvider(''); setSeats(''); setDuration(''); onSuccess && onSuccess('Course created');
 } catch (err: any) { alert(err?.message || String(err)); }
 };
 return (
 <div className={cardClass}>
 <form onSubmit={create} className="grid gap-3">
 <TextInput label="Course title" id="lr-title" value={title} onChange={setTitle} required />
 <TextInput label="Provider" id="lr-provider" value={provider} onChange={setProvider} />
 <TextInput label="Duration (days)" id="lr-duration" value={duration} onChange={setDuration} />
 <TextInput label="Seats" id="lr-seats" value={seats} onChange={setSeats} type="number" />
 <button type="submit" className={primaryBtn}>Create course</button>
 </form>
 </div>
 );
 }

 // fallback
 return (
 <GenericModuleEditor moduleName="Learning Management" action={action} storageKey="learning_courses" onSuccess={onSuccess} />
 );
};

// ---------- Employee Management ----------
export const EmployeeModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [employees, setEmployees] = useState<any[]>(() => [
 { id: 'EMP-1', name: 'Alice', dept: 'HR' },
 { id: 'EMP-2', name: 'Bob', dept: 'Engineering' },
 ]);
 const [nameVal, setNameVal] = useState('');
 const [empId, setEmpId] = useState('');
 const [dept, setDept] = useState('');
 const [role, setRole] = useState('');
 const [start, setStart] = useState(dateToday());
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [dob, setDob] = useState('');
 const [address, setAddress] = useState('');
 const [emergencyContact, setEmergencyContact] = useState('');
 const [bankAccount, setBankAccount] = useState('');
 const [taxId, setTaxId] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Employee directory</p>
 <div className="mt-3 space-y-2">
 {employees.map((e) => (
 <div key={e.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{e.name}</div>
 <div className="text-sm text-gray-500">{e.id} • {e.dept}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'update') {
 const add = (ev: React.FormEvent) => {
 ev.preventDefault();
 try {
 const parsed = validateEmployee({ id: empId || undefined, name: nameVal, dept, role, start, email, phone, dob, address, emergencyContact, bankAccount, taxId });
 const id = parsed.id || `EMP-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setEmployees((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('employees') || [];
 saveToStorage('employees', [entry, ...existing]);
 setNameVal(''); setEmpId(''); setDept(''); setRole(''); setStart(dateToday()); setEmail(''); setPhone(''); setDob(''); setAddress(''); setEmergencyContact(''); setBankAccount(''); setTaxId('');
 onSuccess && onSuccess('Employee added');
 } catch (err: any) {
 alert(err?.message || String(err));
 }
 };
 return (
 <form onSubmit={add} className="grid gap-3">
 <TextInput label="Full name" id="emp-name" value={nameVal} onChange={setNameVal} required />
 <TextInput label="Employee ID (optional)" id="emp-id" value={empId} onChange={setEmpId} />
 <TextInput label="Department" id="emp-dept" value={dept} onChange={setDept} />
 <TextInput label="Role" id="emp-role" value={role} onChange={setRole} />
 <TextInput label="Start date" id="emp-start" type="date" value={start} onChange={setStart} />
 <TextInput label="Email" id="emp-email" type="email" value={email} onChange={setEmail} />
 <TextInput label="Phone" id="emp-phone" value={phone} onChange={setPhone} />
 {/* Additional employee fields from schema */}
 <TextInput label="Date of birth" id="emp-dob" type="date" value={dob} onChange={setDob} />
 <label className="text-sm block">Address
 <textarea aria-label="Address" id="emp-address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={3} />
 </label>
 <TextInput label="Emergency contact" id="emp-emergency" value={emergencyContact} onChange={setEmergencyContact} />
 <TextInput label="Bank account" id="emp-bank" value={bankAccount} onChange={setBankAccount} />
 <TextInput label="Tax ID" id="emp-tax" value={taxId} onChange={setTaxId} />
 <button type="submit" className="px-3 py-2 rounded bg-yellow-600 text-white">Add/Update</button>
 </form>
 );
 }

 // fallback
 return (
 <GenericModuleEditor moduleName="Employee Management" action={action} storageKey="employees" onSuccess={onSuccess} />
 );
 };

// ---------- Succession Planning ----------
export const SuccessionModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [pool, setPool] = useState<any[]>(() => [
 { id: 'T-1', name: 'Alice', role: 'Team Lead', readiness: 'Ready' },
 { id: 'T-2', name: 'Charlie', role: 'Senior Eng', readiness: 'Development needed' },
 ]);
 const [nameVal, setNameVal] = useState('');
 const [currentRole, setCurrentRole] = useState('');
 const [targetRole, setTargetRole] = useState('');
 const [readiness, setReadiness] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Talent pool and succession readiness.</p>
 <div className="mt-3 space-y-2">
 {pool.map((p) => (
 <div key={p.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{p.name}</div>
 <div className="text-sm text-gray-500">{p.role} • {p.readiness}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'manage') {
 return (
 <form onSubmit={(e) => { e.preventDefault(); const id = `T-${Date.now().toString().slice(-4)}`; setPool((s) => [{ id, name: nameVal, role: targetRole, readiness }, ...s]); setNameVal(''); setCurrentRole(''); setTargetRole(''); setReadiness(''); onSuccess && onSuccess('Succession candidate added'); }} className="grid gap-3">
 <TextInput label="Candidate name" id="sc-name" value={nameVal} onChange={setNameVal} required />
 <TextInput label="Current role" id="sc-current" value={currentRole} onChange={setCurrentRole} />
 <TextInput label="Target role" id="sc-target" value={targetRole} onChange={setTargetRole} />
 <label className="text-sm">Readiness
 <select aria-label="Readiness" value={readiness} onChange={(e) => setReadiness(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option value="">Select</option>
 <option>Ready</option>
 <option>Development needed</option>
 <option>Not ready</option>
 </select>
 </label>
 <button type="submit" className="px-3 py-2 rounded bg-gray-700 text-white">Save mappings</button>
 </form>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Succession Planning" action={action} storageKey="succession_pool" onSuccess={onSuccess} />;
};

// ---------- Disciplinary Actions Management ----------
export const DisciplinaryModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [cases, setCases] = useState<any[]>(() => [{ id: 'D-1', title: 'Attendance breach', employee: 'Eve', status: 'Open' }]);
 const [title, setTitle] = useState('');
 const [employeeId, setEmployeeId] = useState('');
 const [incidentDate, setIncidentDate] = useState(dateToday());
 const [severity, setSeverity] = useState('Medium');
 const [notes, setNotes] = useState('');

 const create = (e: React.FormEvent) => {
 e.preventDefault();
 const id = `D-${Date.now().toString().slice(-4)}`;
 setCases((s) => [{ id, title, employee: employeeId || 'Unknown', status: 'Open', incidentDate, severity, notes }, ...s]);
 setTitle(''); setEmployeeId(''); setIncidentDate(dateToday()); setSeverity('Medium'); setNotes(''); onSuccess && onSuccess('Disciplinary case created');
 };

 if (action === 'create') {
 return (
 <div className={cardClass}>
 <form onSubmit={create} className="grid gap-3">
 <TextInput label="Case title" id="d-title" value={title} onChange={setTitle} required />
 <TextInput label="Employee ID" id="d-emp" value={employeeId} onChange={setEmployeeId} />
 <TextInput label="Incident date" id="d-date" type="date" value={incidentDate} onChange={setIncidentDate} />
 <label className="text-sm">Severity
 <select aria-label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>Low</option>
 <option>Medium</option>
 <option>High</option>
 </select>
 </label>
 <label className="text-sm">Notes<textarea aria-label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} /></label>
 <button type="submit" className={primaryBtn}>Create case</button>
 </form>
 </div>
 );
 }

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Disciplinary cases</p>
 <div className="mt-3 space-y-2">
 {cases.map((c) => (
 <div key={c.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{c.title}</div>
 <div className="text-sm text-gray-500">{c.id} • {c.employee} • {c.status}</div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Disciplinary Actions Management" action={action} storageKey="disciplinary_cases" onSuccess={onSuccess} />;
};

// ---------- Employee Self-Service (ESS) ----------
export const ESSModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [requests, setRequests] = useState<any[]>(() => [{ id: 'REQ-1', title: 'Update bank details', status: 'Pending' }]);
 const [title, setTitle] = useState('');
 const [type, setType] = useState('General');
 const [details, setDetails] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Your self-service requests</p>
 <div className="mt-3 space-y-2">
 {requests.map((r) => (
 <div key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded">{r.title} • <span className="text-sm">{r.status}</span></div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const createESS = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateESSRequest({ title, type, details });
 const id = `REQ-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setRequests((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('ess_requests') || [];
 saveToStorage('ess_requests', [entry, ...existing]);
 setTitle(''); setType('General'); setDetails(''); onSuccess && onSuccess('Request created');
 } catch (err: any) { alert(err?.message || String(err)); }
 };
 return (
 <div className={cardClass}>
 <form onSubmit={createESS} className="grid gap-3">
 <TextInput label="Request title" id="ess-title" value={title} onChange={setTitle} required />
 <label className="text-sm">Type
 <select aria-label="Request type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>General</option>
 <option>Bank details</option>
 <option>Documents</option>
 <option>Other</option>
 </select>
 </label>
 <label className="text-sm">Details<textarea aria-label="Details" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} /></label>
 <button type="submit" className={primaryBtn}>Create request</button>
 </form>
 </div>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Employee Self-Service" action={action} storageKey="ess_requests" onSuccess={onSuccess} />;
};

// ---------- Time and Attendance ----------
export const TimeAttendanceModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [records, setRecords] = useState<any[]>(() => [{ id: 'AT-1', name: 'Alice', time: '08:00 - 17:00', date: '2025-10-30' }]);
 const [date, setDate] = useState(dateToday());
 const [clockIn, setClockIn] = useState('09:00');
 const [clockOut, setClockOut] = useState('17:00');
 const [reason, setReason] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Time & attendance records</p>
 <div className="mt-3 space-y-2">
 {records.map((r) => (
 <div key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded">{r.name} • {r.time} • {r.date}</div>
 ))}
 </div>
 </div>
 );
 }

 if (action === 'update') {
 const submitTime = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateTimeRecord({ date, time: `${clockIn} - ${clockOut}`, reason, name: 'You' });
 const id = `AT-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setRecords((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('time_records') || [];
 saveToStorage('time_records', [entry, ...existing]);
 setReason(''); onSuccess && onSuccess('Time adjusted');
 } catch (err: any) { alert(err?.message || String(err)); }
 };
 return (
 <div className={cardClass}>
 <form onSubmit={submitTime} className="grid gap-3">
 <TextInput label="Date" id="ta-date" type="date" value={date} onChange={setDate} />
 <div className="grid grid-cols-2 gap-2">
 <TextInput label="Clock in" id="ta-in" value={clockIn} onChange={setClockIn} />
 <TextInput label="Clock out" id="ta-out" value={clockOut} onChange={setClockOut} />
 </div>
 <label className="text-sm">Reason<textarea aria-label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={3} /></label>
 <button type="submit" className={primaryBtn}>Apply</button>
 </form>
 </div>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Time and Attendance" action={action} storageKey="time_records" onSuccess={onSuccess} />;
};

// ---------- Payroll & Loan Management ----------
export const PayrollModule: React.FC<ModuleUIProps> = ({ action, onSuccess }) => {
 const [runs, setRuns] = useState<any[]>(() => [{ id: 'PR-202510', period: 'Oct 2025', status: 'Completed' }]);
 const [period, setPeriod] = useState('');
 const [basicSalary, setBasicSalary] = useState('');
 const [allowances, setAllowances] = useState('');
 const [deductions, setDeductions] = useState('');
 const [bankName, setBankName] = useState('');
 const [bankAccount, setBankAccount] = useState('');
 const [taxNumber, setTaxNumber] = useState('');
 const [loans, setLoans] = useState<any[]>(() => [{ id: 'LN-100', employee: 'Alice', amount: 1500, status: 'Active' }]);
 const [loanAmount, setLoanAmount] = useState('');
 const [loanEmployee, setLoanEmployee] = useState('');
 const [createTab, setCreateTab] = useState<'payroll' | 'loan'>('payroll');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Payroll runs</p>
 <div className="mt-3 space-y-2">
 {runs.map((r) => (
 <div key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded">{r.period} • {r.status}</div>
 ))}
 </div>

 <div className="mt-6">
 <h3 className="text-sm font-semibold mb-2">Employee loans</h3>
 <div className="mt-2 space-y-2">
 {loans.map((l) => (
 <div key={l.id} className="p-3 bg-white dark:bg-gray-800 rounded">{l.employee} • ${l.amount} • {l.status}</div>
 ))}
 </div>
 </div>
 </div>
 );
 }

 if (action === 'manage') {
 const runPayroll = () => { const id = `PR-${Date.now().toString().slice(-6)}`; setRuns((s) => [{ id, period, status: 'Processing' }, ...s]); setPeriod(''); onSuccess && onSuccess('Payroll started'); };
 return (
 <div>
 <label className="text-sm">Payroll period<input aria-label="Payroll period" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Nov 2025" className="w-full p-2 border rounded bg-white dark:bg-gray-800" /></label>
 <button onClick={runPayroll} className="px-3 py-2 rounded bg-gray-700 text-white mt-2">Run payroll</button>
 </div>
 );
 }

 if (action === 'update') {
 return (
 <div>
 <p className="text-sm">Update payroll settings</p>
 <button onClick={() => onSuccess && onSuccess('Payroll settings saved')} className="px-3 py-2 rounded bg-yellow-600 text-white mt-2">Save</button>
 </div>
 );
 }

 if (action === 'create') {
 const createPayroll = (e?: React.FormEvent) => {
 e?.preventDefault();
 try {
 const parsed = validatePayroll({ period, basicSalary: basicSalary || undefined, allowances: allowances || undefined, deductions: deductions || undefined, bankName: bankName || undefined, bankAccount: bankAccount || undefined, taxNumber: taxNumber || undefined });
 const id = `PR-${Date.now().toString().slice(-6)}`;
 const entry = { id, ...parsed, status: 'Processing' };
 setRuns((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('payroll_runs') || [];
 saveToStorage('payroll_runs', [entry, ...existing]);
 setPeriod(''); setBasicSalary(''); setAllowances(''); setDeductions(''); setBankName(''); setBankAccount(''); setTaxNumber('');
 onSuccess && onSuccess('Payroll started');
 } catch (err: any) { alert(err?.message || String(err)); }
 };
 const submitLoan = (e?: React.FormEvent) => { e?.preventDefault(); const id = `LN-${Date.now().toString().slice(-4)}`; const entry = { id, employee: loanEmployee || 'Unknown', amount: Number(loanAmount || 0), status: 'Requested' }; setLoans((s) => [entry, ...s]); const existing = loadFromStorage<any[]>('loans') || []; saveToStorage('loans', [entry, ...existing]); setLoanAmount(''); setLoanEmployee(''); onSuccess && onSuccess('Loan request created'); };
 return (
 <div>
 <div role="tablist" aria-label="Create options" className="flex gap-2">
 <button role="tab" aria-selected={createTab === 'payroll'} onClick={() => setCreateTab('payroll')} className={`px-3 py-1 rounded ${createTab === 'payroll' ? 'bg-microsoft-blue text-white' : 'bg-gray-100'}`}>Payroll run</button>
 <button role="tab" aria-selected={createTab === 'loan'} onClick={() => setCreateTab('loan')} className={`px-3 py-1 rounded ${createTab === 'loan' ? 'bg-microsoft-blue text-white' : 'bg-gray-100'}`}>Loan request</button>
 </div>
 <div className="mt-4">
 {createTab === 'payroll' ? (
 <form onSubmit={createPayroll} className="grid gap-3">
 <TextInput label="Payroll period" id="pr-period" value={period} onChange={setPeriod} required />
 <TextInput label="Basic salary" id="pr-basic" value={basicSalary} onChange={setBasicSalary} />
 <TextInput label="Allowances" id="pr-allowances" value={allowances} onChange={setAllowances} />
 <TextInput label="Deductions" id="pr-deductions" value={deductions} onChange={setDeductions} />
 <TextInput label="Bank name" id="pr-bank" value={bankName} onChange={setBankName} />
 <TextInput label="Bank account" id="pr-bank-acc" value={bankAccount} onChange={setBankAccount} />
 <TextInput label="Tax number" id="pr-tax" value={taxNumber} onChange={setTaxNumber} />
 <div>
 <button type="submit" className={primaryBtn}>Run payroll</button>
 </div>
 </form>
 ) : (
 <form onSubmit={submitLoan} className="grid gap-3">
 <TextInput label="Employee" id="ln-emp" value={loanEmployee} onChange={setLoanEmployee} />
 <TextInput label="Amount" id="ln-amt" value={loanAmount} onChange={setLoanAmount} />
 <button type="submit" className="px-3 py-2 rounded bg-green-600 text-white">Request loan</button>
 </form>
 )}
 </div>
 </div>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Payroll & Loan Management" action={action} storageKey="payroll_runs" onSuccess={onSuccess} />;
};

// ---------- Workflow Management ----------
export const WorkflowModule: React.FC<ModuleUIProps> = ({ action }) => {
 if (action === 'manage') {
 const [name, setName] = React.useState('');
 const [steps, setSteps] = React.useState<string[]>(['Submit', 'Approve']);
 const addStep = () => { if (name.trim()) { setSteps((s) => [...s, name.trim()]); setName(''); } };

 return (
 <div>
 <p className="text-sm">Workflow builder (mock) — define steps and approvals.</p>
 <div className="mt-3 grid gap-3">
 <TextInput label="Step name" id="wf-name" value={name} onChange={setName} />
 <div className="flex gap-2">
 <button onClick={addStep} className="px-3 py-2 rounded bg-microsoft-blue text-white">Add step</button>
 <button onClick={() => { setSteps([]); }} className="px-3 py-2 rounded bg-red-600 text-white">Clear</button>
 </div>

 <div className="mt-3">
 <div className="text-sm text-gray-500">Workflow steps</div>
 <ol className="mt-2 space-y-2">
 {steps.map((s, i) => (
 <li key={i} className="p-2 bg-white dark:bg-gray-800 rounded flex justify-between items-center">
 <div>{i + 1}. {s}</div>
 <div className="flex gap-2">
 <button onClick={() => setSteps((prev) => prev.filter((_, idx) => idx !== i))} className="px-2 py-1 rounded bg-red-600 text-white text-sm">Remove</button>
 </div>
 </li>
 ))}
 </ol>
 </div>
 </div>
 </div>
 );
 }
 // fallback
 return <GenericModuleEditor moduleName="Workflow and Approvals" action={action} storageKey="workflows" />;
};

// ---------- Reports Management ----------
export const ReportsModule: React.FC<ModuleUIProps> = ({ action }) => {
 if (action === 'view') {
 // Simple dashboard grid with metric cards and a placeholder chart area
 return (
 <div>
 <p className="text-sm">Reports and dashboards</p>
 <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
 <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
 <div className="text-sm text-gray-500">Payroll processed</div>
 <div className="text-2xl font-semibold mt-1">1,245</div>
 </div>
 <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
 <div className="text-sm text-gray-500">Open leave requests</div>
 <div className="text-2xl font-semibold mt-1">23</div>
 </div>
 <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
 <div className="text-sm text-gray-500">Pending approvals</div>
 <div className="text-2xl font-semibold mt-1">7</div>
 </div>
 </div>

 <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
 <div className="lg:col-span-2 p-4 bg-white dark:bg-gray-800 rounded shadow">
 <div className="text-sm text-gray-500">Organization-wide trends (placeholder)</div>
 <div className="mt-3 h-56 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded flex items-center justify-center text-gray-400">Chart placeholder</div>
 </div>

 <aside className="p-4 bg-white dark:bg-gray-800 rounded shadow">
 <div className="text-sm text-gray-500">Quick filters</div>
 <div className="mt-3 flex flex-col gap-2">
 <button className="px-3 py-2 rounded bg-microsoft-blue text-white">Last 7 days</button>
 <button className="px-3 py-2 rounded bg-gray-100">Last 30 days</button>
 </div>
 </aside>
 </div>
 </div>
 );
 }
 // fallback
 return <GenericModuleEditor moduleName="Reports and Dashboards" action={action} storageKey="reports" />;
};

// ---------- Travel & Expense ----------
export const TravelExpenseModule: React.FC<ModuleUIProps> = ({ action }) => {
 const [trips, setTrips] = useState<any[]>(() => []);
 const [purpose, setPurpose] = useState('');
 const [start, setStart] = useState(dateToday());
 const [end, setEnd] = useState(dateToday());
 const [destination, setDestination] = useState('');
 const [estCost, setEstCost] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Travel requests and expense claims</p>
 <div className="mt-3 space-y-2">
 {trips.length === 0 ? <div className="p-3 bg-white dark:bg-gray-800 rounded">No travel requests</div> : trips.map(t => <div key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded">{t.purpose} • {t.destination} • {t.start} - {t.end}</div>)}
 </div>
 </div>
 );
 }

 if (action === 'create') {
 const submitTravel = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateTravel({ purpose, start, end, destination, estCost, expenseLines: [] });
 const id = `TR-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setTrips((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('travel_requests') || [];
 saveToStorage('travel_requests', [entry, ...existing]);
 setPurpose(''); setStart(dateToday()); setEnd(dateToday()); setDestination(''); setEstCost('');
 } catch (err: any) {
 // show simple error
 alert(err?.message || String(err));
 }
 };

 return (
 <form onSubmit={submitTravel} className="grid gap-3">
 <TextInput label="Trip purpose" id="tr-purpose" value={purpose} onChange={setPurpose} required />
 <div className="grid grid-cols-2 gap-2"><TextInput label="Start" id="tr-start" type="date" value={start} onChange={setStart} /><TextInput label="End" id="tr-end" type="date" value={end} onChange={setEnd} /></div>
 <TextInput label="Destination" id="tr-dest" value={destination} onChange={setDestination} />
 <TextInput label="Estimated cost" id="tr-cost" value={estCost} onChange={setEstCost} />
 <button type="submit" className="px-3 py-2 rounded bg-green-600 text-white">Create travel request</button>
 </form>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Travel and Expense Tracking" action={action} storageKey="travel_requests" />;
};

// ---------- Compensation & Benefits ----------
export const CompensationModule: React.FC<ModuleUIProps> = ({ action }) => {
 const [bands, setBands] = useState<any[]>(() => [{ id: 'CB-1', band: 'B1', grade: 'G1', min: 30000, max: 40000 }]);
 const [band, setBand] = useState('');
 const [grade, setGrade] = useState('');
 const [min, setMin] = useState('');
 const [max, setMax] = useState('');

 if (action === 'view') {
 return (
 <div>
 <p className="text-sm">Compensation and benefits overview</p>
 <div className="mt-3 space-y-2">
 {bands.map(b => <div key={b.id} className="p-3 bg-white dark:bg-gray-800 rounded">{b.band} • {b.grade} • ${b.min}-${b.max}</div>)}
 </div>
 </div>
 );
 }

 if (action === 'manage') {
 const submitBand = (e: React.FormEvent) => {
 e.preventDefault();
 try {
 const parsed = validateCompensationBand({ band, grade, min: Number(min || 0), max: Number(max || 0) });
 const id = `CB-${Date.now().toString().slice(-4)}`;
 const entry = { id, ...parsed };
 setBands((s) => [entry, ...s]);
 const existing = loadFromStorage<any[]>('compensation_bands') || [];
 saveToStorage('compensation_bands', [entry, ...existing]);
 setBand(''); setGrade(''); setMin(''); setMax('');
 } catch (err: any) {
 alert(err?.message || String(err));
 }
 };

 return (
 <div className={cardClass}>
 <form onSubmit={submitBand} className="grid gap-3">
 <TextInput label="Band" id="cb-band" value={band} onChange={setBand} />
 <TextInput label="Grade" id="cb-grade" value={grade} onChange={setGrade} />
 <TextInput label="Min" id="cb-min" value={min} onChange={setMin} type="number" />
 <TextInput label="Max" id="cb-max" value={max} onChange={setMax} type="number" />
 <div>
 <button type="submit" className={primaryBtn}>Save band</button>
 </div>
 </form>
 </div>
 );
 }

 // fallback
 return <GenericModuleEditor moduleName="Compensation & Benefits Management" action={action} storageKey="compensation_bands" />;
};

export function getModuleComponent(moduleName: string) {
 const key = stripName(moduleName);
 switch (true) {
 case /grievance/.test(key): return GrievanceModule;
 case /welfare/.test(key): return WelfareModule;
 case /appraisal|performance/.test(key): return AppraisalModule;
 case /recruitment/.test(key): return RecruitmentModule;
 case /leave/.test(key): return LeaveModule;
 case /learning/.test(key): return LearningModule;
 case /employee/.test(key): return EmployeeModule;
 case /succession/.test(key): return SuccessionModule;
 case /disciplinary/.test(key): return DisciplinaryModule;
 case /self[- ]?service|employee self[- ]?service|selfservice/.test(key): return ESSModule;
 case /time|attendance|time and attendance/.test(key): return TimeAttendanceModule;
 case /payroll|loan/.test(key): return PayrollModule;
 case /travel|expense/.test(key): return TravelExpenseModule;
 case /compensation|benefits/.test(key): return CompensationModule;
 case /workflow/.test(key): return WorkflowModule;
 case /report|dashboard/.test(key): return ReportsModule;
 default: return null;
 }
}
