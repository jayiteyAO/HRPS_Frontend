import { useState, useEffect, useRef } from 'react';
import { getModuleComponent } from './moduleComponents';
import { subtleCard } from '@/components/ui';

type ModuleSpec = { name: string; actions: string[] };

const FieldRow: React.FC<{ label: string; value?: string; onChange?: (v: string) => void; id: string }> = ({ label, value = '', onChange, id }) => (
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
 <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
 {label}
 </label>
 <input
 id={id}
 aria-label={label}
 className="sm:col-span-2 p-2 border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm"
 value={value}
 onChange={(e) => onChange && onChange(e.target.value)}
 />
 </div>
);

const ModuleActionPanel: React.FC<{ moduleSpec: ModuleSpec; action: string; onBack?: () => void }> = ({ moduleSpec, action, onBack }) => {
 const name = moduleSpec.name.replace(/^[0-9]+\.\s*/, '');
 const [items, setItems] = useState<Array<{ id: string; title: string; description?: string }>>(() => [
 { id: '1', title: `${name} item A`, description: 'Sample item A' },
 { id: '2', title: `${name} item B`, description: 'Sample item B' },
 ]);
 const [title, setTitle] = useState('');
 const [desc, setDesc] = useState('');
 const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

 const headingRef = useRef<HTMLHeadingElement | null>(null);
 const [successMessage, setSuccessMessage] = useState<string | null>(null);

 useEffect(() => {
 headingRef.current?.focus();
 }, [action]);

 const handleSuccess = (msg: string) => {
 setSuccessMessage(msg);
 window.setTimeout(() => setSuccessMessage(null), 3000);
 };

 const create = () => {
 if (!title.trim()) return;
 const id = String(Date.now());
 setItems((s) => [{ id, title, description: desc }, ...s]);
 setTitle('');
 setDesc('');
 handleSuccess('Created successfully');
 };

 const update = () => {
 if (!selectedId) return;
 setItems((s) => s.map((it) => (it.id === selectedId ? { ...it, title: title || it.title, description: desc || it.description } : it)));
 handleSuccess('Updated successfully');
 };

 const remove = (id: string) => {
 setItems((s) => s.filter((it) => it.id !== id));
 handleSuccess('Deleted successfully');
 };

 const saveSettings = () => {
 handleSuccess('Settings saved');
 };

 const ModuleSpecific = getModuleComponent(moduleSpec.name);

 const Header = () => (
 <div className="flex items-center justify-between">
 <div>
 <h2 id="module-action-heading" ref={headingRef} tabIndex={-1} className="text-xl font-semibold">{name} — {action}</h2>
 <p className="text-sm text-gray-500 mt-1">Contextual tools and settings for {name}</p>
 </div>
 <div className="flex items-center gap-2">
 {onBack && (
 <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">Back</button>
 )}
 </div>
 </div>
 );

 if (ModuleSpecific) {
 return (
 <section aria-labelledby="module-action-heading" className="mt-4">
 <Header />
 <div aria-live="polite" className="sr-only" role="status">{successMessage}</div>

 <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2">
 <div className={subtleCard}>
 <ModuleSpecific action={action} name={moduleSpec.name} onBack={onBack} onSuccess={handleSuccess} />
 </div>
 </div>

 <aside className={subtleCard}>
 <div className="text-sm text-gray-500">Module</div>
 <div className="font-semibold mt-1">{name}</div>
 <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">Quick actions</div>
 <div className="mt-3 flex flex-col gap-2">
 <button onClick={() => { /* focus main create */ }} className="px-3 py-2 rounded bg-microsoft-blue text-white text-sm">New</button>
 <button onClick={() => { /* focus search */ }} className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm">Search</button>
 <button onClick={saveSettings} className="px-3 py-2 rounded bg-gray-700 text-white text-sm">Save settings</button>
 </div>

 <div className="mt-6">
 <div className="text-sm text-gray-500">Status</div>
 <div className="mt-2 text-sm">{items.length} items • last update just now</div>
 </div>
 </aside>
 </div>
 </section>
 );
 }

 return (
 <section aria-labelledby="module-action-heading" className="mt-4">
 <Header />
 <div aria-live="polite" className="sr-only" role="status">{successMessage}</div>

 <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2">
 <div className={subtleCard}>
 {action === 'view' && (
 <div>
 <label htmlFor="search" className="sr-only">Search</label>
 <input id="search" placeholder={`Search ${name}`} aria-label={`Search ${name}`} className="p-2 border rounded w-full mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />

 <div role="region" aria-label={`${name} list`} className={subtleCard + ' overflow-x-auto'}>
 <table className="w-full text-left">
 <thead>
 <tr>
 <th className="px-4 py-2 text-sm font-medium">Title</th>
 <th className="px-4 py-2 text-sm font-medium">Description</th>
 <th className="px-4 py-2 text-sm font-medium">Actions</th>
 </tr>
 </thead>
 <tbody>
 {items.map((it) => (
 <tr key={it.id} className="border-t border-gray-100 dark:border-gray-700">
 <td className="px-4 py-3 text-sm">{it.title}</td>
 <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{it.description}</td>
 <td className="px-4 py-3 text-sm">
 <button onClick={() => setSelectedId(it.id)} className="mr-2 px-2 py-1 rounded bg-microsoft-blue text-white text-sm">Select</button>
 <button onClick={() => remove(it.id)} className="px-2 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {action === 'create' && (
 <form onSubmit={(e) => { e.preventDefault(); create(); }} aria-label={`Create ${name}`} className="grid gap-4">
 <FieldRow label="Title" id="title" value={title} onChange={setTitle} />
 <FieldRow label="Description" id="desc" value={desc} onChange={setDesc} />
 <div>
 <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Create</button>
 </div>
 </form>
 )}

 {action === 'update' && (
 <div role="region" aria-label={`Update ${name}`}>
 <label className="text-sm font-medium">Select item to update</label>
 <select aria-label="Select item" value={selectedId ?? ''} onChange={(e) => setSelectedId(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full mb-4">
 {items.map((it) => (
 <option key={it.id} value={it.id}>{it.title}</option>
 ))}
 </select>

 <FieldRow label="Title" id="u-title" value={title} onChange={setTitle} />
 <FieldRow label="Description" id="u-desc" value={desc} onChange={setDesc} />

 <div className="flex gap-2 mt-3">
 <button onClick={update} className="px-4 py-2 rounded bg-yellow-600 text-white">Apply Update</button>
 <button onClick={() => { if (selectedId) remove(selectedId); }} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
 </div>
 </div>
 )}

 {action === 'approve' && (
 <div>
 <p className="text-sm text-gray-600 dark:text-gray-300">Pending items for approval</p>
 <ul className="mt-3 space-y-2">
 {items.map((it) => (
 <li key={it.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded">
 <div>
 <div className="font-medium">{it.title}</div>
 <div className="text-sm text-gray-600 dark:text-gray-300">{it.description}</div>
 </div>
 <div className="flex gap-2">
 <button className="px-3 py-1 rounded bg-indigo-600 text-white">Approve</button>
 <button className="px-3 py-1 rounded bg-gray-700 text-white">Reject</button>
 </div>
 </li>
 ))}
 </ul>
 </div>
 )}

 {action === 'manage' && (
 <div className="grid gap-4">
 <p className="text-sm text-gray-600 dark:text-gray-300">Module settings</p>
 <div className="grid gap-2">
 <label className="flex items-center gap-2">
 <input type="checkbox" aria-label="Enable notifications" />
 <span className="text-sm">Enable notifications</span>
 </label>
 <label className="flex items-center gap-2">
 <input type="checkbox" aria-label="Require approvals" />
 <span className="text-sm">Require approvals</span>
 </label>
 <button onClick={saveSettings} className="px-3 py-2 rounded bg-gray-700 text-white">Save settings</button>
 </div>
 </div>
 )}
 </div>
 </div>

 <aside className={subtleCard}>
 <div className="text-sm text-gray-500">Module</div>
 <div className="font-semibold mt-1">{name}</div>
 <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">Quick actions</div>
 <div className="mt-3 flex flex-col gap-2">
 <button onClick={() => { /* focus main create */ }} className="px-3 py-2 rounded bg-microsoft-blue text-white text-sm">New</button>
 <button onClick={() => { /* focus search */ }} className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm">Search</button>
 <button onClick={saveSettings} className="px-3 py-2 rounded bg-gray-700 text-white text-sm">Save settings</button>
 </div>

 <div className="mt-6">
 <div className="text-sm text-gray-500">Status</div>
 <div className="mt-2 text-sm">{items.length} items • last update just now</div>
 </div>
 </aside>
 </div>
 </section>
 );
};

export default ModuleActionPanel;
