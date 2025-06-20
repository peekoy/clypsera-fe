import type React from 'react';
export type UserRole = 'admin' | 'operator' | 'user' | '';

export interface UserAuth {
  id: number;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AllUsers {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  userCreationDate: string;
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
