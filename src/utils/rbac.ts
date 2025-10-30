import specRaw from '../../rbac_specification.json';

type RoleSpec = {
  modules?: Record<string, string[]>;
  views?: string[];
};

type Spec = {
  access_levels?: string[];
  roles?: Record<string, RoleSpec>;
};

const spec = specRaw as unknown as Spec;

export function getRoles(): string[] {
  return Object.keys(spec.roles || {});
}

export function getModulesForRole(role: string) {
  const roleSpec = spec.roles ? spec.roles[role] : undefined;
  if (!roleSpec) return [] as { name: string; actions: string[] }[];
  const modules = roleSpec.modules || {};
  return Object.keys(modules).map((k) => ({ name: k, actions: modules[k] }));
}

export function getAllModules() {
  const roles = spec.roles || {};
  const set = new Set<string>();
  Object.keys(roles).forEach((r) => {
    const modules = roles[r].modules || {};
    Object.keys(modules).forEach((m) => set.add(m));
  });
  return Array.from(set);
}

export default spec;
