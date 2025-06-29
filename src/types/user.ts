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

export interface UserProfile {
  name: string;
  email: string;
  gender: string;
  password?: string;
  age: number;
  birthDate: string;
  phone: string;
  job: string;
  nik: string;
  address: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface EditUserPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface AddUserPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
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
