import type React from 'react';
export type UserRole = 'admin' | 'operator' | 'user';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType;
  roles: UserRole[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}
