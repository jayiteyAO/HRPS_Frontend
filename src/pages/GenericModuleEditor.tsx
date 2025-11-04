import { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '@/utils/storage';
import { cardClass, primaryBtn } from '@/components/ui';

type Props = {
 moduleName: string;
 action: string;
 storageKey?: string;
 onBack?: () => void;
 onSuccess?: (msg: string) => void;
};

const keyFor = (moduleName: string, storageKey?: string) => storageKey || moduleName.replace(/[^a-z0-9]+/gi, '_').toLowerCase();

const GenericModuleEditor: React.FC<Props> = ({ moduleName, action, storageKey, onBack, onSuccess }) => {
 const key = keyFor(moduleName, storageKey);
 const [items, setItems] = useState<any[]>(() => loadFromStorage<any[]>(key) || []);
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [employee, setEmployee] = useState('');
 const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
 const [status, setStatus] = useState('Open');

 useEffect(() => {
 // load sample if empty
 if (items.length === 0) {
 setItems([{ id: `${key}-sample`, title: `${moduleName} sample`, description: '', employee: 'System', date, status: 'Open' }]);
 }
 }, []);

 const save = () => {
 const id = `${key}-${Date.now().toString().slice(-6)}`;
 const entry = { id, title, description, employee, date, status };
 const merged = [entry, ...items];
 saveToStorage(key, merged);
 setItems(merged);
 setTitle(''); setDescription(''); setEmployee(''); setDate(new Date().toISOString().slice(0,10)); setStatus('Open');
 onSuccess && onSuccess('Saved');
 };

 if (action === 'view') {
 return (
 <section aria-labelledby={`${key}-view`} className={cardClass}>
 <h3 id={`${key}-view`} className="text-lg font-semibold">{moduleName} — Overview</h3>
 <p className="text-sm text-gray-500 mt-1">A quick overview of {moduleName} items.</p>
 <div className="mt-3 space-y-2">
 {items.map((it) => (
 <div key={it.id} className="p-3 bg-white dark:bg-gray-800 rounded">
 <div className="font-medium">{it.title}</div>
 <div className="text-sm text-gray-500">{it.employee} • {it.date} • {it.status}</div>
 {it.description && <div className="text-sm mt-2">{it.description}</div>}
 </div>
 ))}
 </div>
 </section>
 );
 }

 // default: allow create/update/manage actions to edit entries
 return (
 <section aria-labelledby={`${key}-editor`} className={cardClass}>
 <h3 id={`${key}-editor`} className="text-lg font-semibold">{moduleName} — {action}</h3>
 <form onSubmit={(e) => { e.preventDefault(); save(); }} className="grid gap-3 mt-3">
 <label className="text-sm block">Title<input aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" /></label>
 <label className="text-sm block">Description<textarea aria-label="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" rows={4} /></label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <label className="text-sm block">Employee<input aria-label="Employee" value={employee} onChange={(e) => setEmployee(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" /></label>
 <label className="text-sm block">Date<input aria-label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800" /></label>
 </div>
 <label className="text-sm block">Status
 <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800">
 <option>Open</option>
 <option>Pending</option>
 <option>Closed</option>
 <option>Approved</option>
 </select>
 </label>

 <div className="flex gap-2">
 <button type="submit" className={primaryBtn}>Save</button>
 {onBack && <button type="button" onClick={onBack} className="px-3 py-2 rounded bg-gray-100">Close</button>}
 </div>
 </form>
 </section>
 );
};

export default GenericModuleEditor;

