import {
  Home,
  Upload,
  Database,
  Settings,
  FileCheck,
  LayoutDashboard,
} from 'lucide-react';
import type { MenuSection, UserRole } from '@/types/user';
import Image from 'next/image';

export const menuSections: MenuSection[] = [
  {
    title: 'Home',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
        roles: ['admin', 'operator', 'user'],
      },
    ],
  },
  {
    title: 'Navigation',
    items: [
      {
        title: 'Browse Data',
        url: '/browse-data',
        icon: LayoutDashboard,
        roles: ['admin', 'operator', 'user'],
      },
      {
        title: 'Upload Data',
        url: '/upload-data',
        icon: Upload,
        roles: ['admin', 'operator'],
      },
      {
        title: 'MyData',
        url: '/my-data',
        icon: Database,
        roles: ['admin', 'operator'],
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Administrator',
        url: '/administrator',
        icon: Settings,
        roles: ['admin'],
      },
      {
        title: 'Check Data Requests',
        url: '/check-data-requests',
        icon: FileCheck,
        roles: ['admin'],
      },
    ],
  },
];

export function getMenuForRole(role: UserRole): MenuSection[] {
  return menuSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((section) => section.items.length > 0);
}
