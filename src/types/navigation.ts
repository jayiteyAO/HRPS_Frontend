import { ReactNode } from 'react';

export interface SubMenuItem {
  name: string;
  path: string;
  description?: string;
  icon?: ReactNode;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon: ReactNode;
  subMenu?: SubMenuItem[];
}
