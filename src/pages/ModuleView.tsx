import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getModulesForRole } from '@/utils/rbac';
import { useLocation, Link } from 'react-router-dom';
import ModuleActionPanel from './ModuleActionPanel';

const ModuleView: React.FC = () => {
 const { user, hasAccess } = useAuth();
 const location = useLocation();
 const params = new URLSearchParams(location.search);
 const moduleName = params.get('name') || '';
 const requestedAction = params.get('action') || '';
 const modules = user ? getModulesForRole(user.role as string) : [];
 // Only include modules where the user has at least one permitted action
 const accessibleModules = modules.filter((m) => m.actions.some((a) => hasAccess(m.name, a)));
 const moduleSpec = modules.find((m) => m.name === moduleName) || modules.find((m) => m.name.toLowerCase().includes(moduleName.toLowerCase())) || null;
 // Normalize matching: try to match by stripped name (remove leading number and dot)
 const strip = (s: string) => s.replace(/^[0-9]+\.\s*/, '').toLowerCase();
 const moduleSpecNormalized = moduleSpec || modules.find((m) => strip(m.name) === strip(moduleName)) || null;

 // Only set the initial active action if the user actually has permission for it
 const [activeAction, setActiveAction] = useState<string | null>(null);
 const [deniedAction, setDeniedAction] = useState<string | null>(null);

 // Helper to decide sensible default action for a module (prefer view)
 type ModuleDef = { name: string; actions: string[] };
 const defaultActionFor = useCallback((m: ModuleDef | null) => {
 if (!m || !m.actions) return null;
 if (m.actions.includes('view') && hasAccess(m.name, 'view')) return 'view';
 const allowed = m.actions.find((a: string) => hasAccess(m.name, a));
 if (allowed) return allowed;
 return m.actions[0] || null;
 }, [hasAccess]);

 useEffect(() => {
 if (!requestedAction || !moduleSpecNormalized) return;
 // if user lacks access for the requested action, show denied state
 if (!hasAccess(moduleSpecNormalized.name, requestedAction)) {
 setDeniedAction(requestedAction);
 setActiveAction(null);
 return;
 }
 setActiveAction(requestedAction);
 setDeniedAction(null);
 }, [requestedAction, moduleSpecNormalized, hasAccess]);

 // If there's no action in the URL, pick a default action for the module and update the URL + state
 useEffect(() => {
 if (!moduleSpecNormalized) return;
 const q = new URLSearchParams(location.search);
 const actionInUrl = q.get('action');
 if (actionInUrl) return; // already handled by previous effect
 const def = defaultActionFor(moduleSpecNormalized);
 if (!def) return;
 // only set if user has permission (defaultActionFor already checks permission)
 setActiveAction(def);
 q.set('name', moduleSpecNormalized.name);
 q.set('action', def);
 window.history.replaceState({}, '', `${location.pathname}?${q.toString()}`);
 }, [moduleSpecNormalized, location.pathname, location.search, hasAccess, defaultActionFor]);

 const openAction = (action: string) => {
 if (!moduleSpecNormalized) return;
 // validate permission
 if (!hasAccess(moduleSpecNormalized.name, action)) {
 setDeniedAction(action);
 setActiveAction(null);
 return;
 }

 setActiveAction(action);
 setDeniedAction(null);
 // update URL for shareability
 const q = new URLSearchParams(location.search);
 q.set('name', moduleSpecNormalized?.name || moduleName);
 q.set('action', action);
 window.history.replaceState({}, '', `${location.pathname}?${q.toString()}`);
 };

 // Focus management for module title
 const titleRef = useRef<HTMLHeadingElement | null>(null);
 useEffect(() => {
 if (activeAction && titleRef.current) {
 titleRef.current.focus();
 }
 }, [activeAction]);

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-150">
 <main className="max-w-7xl mx-auto p-6">
 <h1 className="text-2xl font-bold mb-4">Module Explorer</h1>
 {!user && <div className="p-6 bg-white dark:bg-gray-800 rounded-sm shadow">Please sign in to view modules.</div>}

 {user && (
 <div>
 {moduleSpecNormalized ? (
 <div className="p-6 bg-white dark:bg-gray-800 rounded-sm shadow">
 <h2 ref={titleRef} tabIndex={-1} className="text-xl font-semibold">{moduleSpecNormalized.name.replace(/^[0-9]+\.\s*/, '')}</h2>
 <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Allowed actions for your role: {moduleSpecNormalized.actions.join(', ')}</p>
 {/* If the user cannot view this module, show a clear 403 banner */}
 {!hasAccess(moduleSpecNormalized.name, 'view') && (
 <div className="mt-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-900/30 p-4 rounded" role="alert" aria-atomic="true">
 <strong className="text-red-700 dark:text-red-300">403 — Access denied</strong>
 <div className="text-sm text-red-600 dark:text-red-200 mt-2">You do not have permission to view this module. Contact your administrator if you believe this is an error.</div>
 </div>
 )}
 {hasAccess(moduleSpecNormalized.name, 'view') && (
 <div>
 <div className="mt-4 flex gap-3" role="toolbar" aria-label={`${moduleSpecNormalized.name} actions`}>
 {moduleSpecNormalized.actions.includes('view') && (
 <button onClick={() => openAction('view')} aria-pressed={activeAction === 'view'} className="px-3 py-2 rounded bg-microsoft-blue text-white">View</button>
 )}
 {moduleSpecNormalized.actions.includes('create') && hasAccess(moduleSpecNormalized.name, 'create') && (
 <button onClick={() => openAction('create')} aria-pressed={activeAction === 'create'} className="px-3 py-2 rounded bg-green-600 text-white">Create</button>
 )}
 {moduleSpecNormalized.actions.includes('update') && hasAccess(moduleSpecNormalized.name, 'update') && (
 <button onClick={() => openAction('update')} aria-pressed={activeAction === 'update'} className="px-3 py-2 rounded bg-yellow-600 text-white">Update</button>
 )}
 {moduleSpecNormalized.actions.includes('approve') && hasAccess(moduleSpecNormalized.name, 'approve') && (
 <button onClick={() => openAction('approve')} aria-pressed={activeAction === 'approve'} className="px-3 py-2 rounded bg-indigo-600 text-white">Approve</button>
 )}
 {moduleSpecNormalized.actions.includes('manage') && hasAccess(moduleSpecNormalized.name, 'manage') && (
 <button onClick={() => openAction('manage')} aria-pressed={activeAction === 'manage'} className="px-3 py-2 rounded bg-gray-700 text-white">Manage</button>
 )}
 </div>

 {/* Denied action feedback */}
 {deniedAction && (
 <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded" role="status" aria-live="polite">
 <strong className="text-yellow-700 dark:text-yellow-300">Insufficient permissions</strong>
 <div className="text-sm text-yellow-600 dark:text-yellow-200 mt-2">You do not have permission to perform the '{deniedAction}' action on this module.</div>
 </div>
 )}

 {activeAction && (
 <ModuleActionPanel moduleSpec={moduleSpecNormalized} action={activeAction} onBack={() => { setActiveAction(null); const q = new URLSearchParams(location.search); q.delete('action'); window.history.replaceState({}, '', `${location.pathname}?${q.toString()}`); }} />
 )}
 </div>
 )}
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {(accessibleModules.length ? accessibleModules : [{ name: 'No modules available', actions: [] }]).map((m) => {
 const def = defaultActionFor(m) || '';
 const to = `/modules?name=${encodeURIComponent(m.name)}${def ? `&action=${encodeURIComponent(def)}` : ''}`;
 return (
 <Link key={m.name} to={to} className="rounded-sm bg-white dark:bg-gray-800 shadow p-4 block">
 <h3 className="font-semibold">{m.name.replace(/^[0-9]+\.\s*/, '')}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Actions: {m.actions.join(', ')}</p>
 </Link>
 );
 })}
 </div>
 )}
 </div>
 )}
 </main>
 </div>
 );
};

export default ModuleView;
