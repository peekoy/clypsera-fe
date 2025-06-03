'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getMenuForRole } from '@/lib/menu-config';
import type { User } from '@/types/user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoleBasedSidebarProps {
  user: User;
}

export function RoleBasedSidebar({ user }: RoleBasedSidebarProps) {
  const pathname = usePathname();
  const menuSections = getMenuForRole(user.role);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'operator':
        return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'user':
        return 'bg-green-500 text-white hover:bg-green-600';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600';
    }
  };

  return (
    <Sidebar className='rounded-br-full border-none bg-primary'>
      <SidebarHeader className='p-6 rounded-tr-2xl bg-primary'>
        <div className='flex flex-col items-center space-y-3'>
          <Avatar className='h-16 w-16 border-2 border-white/20'>
            <AvatarImage
              src={user.avatar || '/placeholder.svg'}
              alt={user.name}
            />
            <AvatarFallback className='bg-white/10 text-white text-lg font-semibold'>
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='text-center'>
            <h3 className='font-semibold text-lg text-white'>{user.name}</h3>
            <Badge
              variant='secondary'
              className={`mt-1 capitalize ${getRoleBadgeColor(user.role)}`}
            >
              {user.role}
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <div className='h-screen overflow-y-auto custom-scrollbar bg-primary'>
        <SidebarContent className='px-4 bg-primary'>
          {menuSections.map((section) => (
            <SidebarGroup key={section.title} className='bg-primary'>
              <SidebarGroupLabel className='text-white/70 font-medium text-sm mb-2 bg-primary'>
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent className='bg-primary'>
                <SidebarMenu className='bg-primary'>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title} className='bg-primary'>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`
                            text-white/90 hover:text-white hover:bg-white/10 
                            data-[active=true]:bg-white/20 data-[active=true]:text-white
                            transition-all duration-200 bg-primary border-none
                            ${isActive ? 'bg-white/20 text-white' : ''}
                          `}
                        >
                          <Link
                            href={item.url}
                            className='flex items-center gap-3 w-full'
                          >
                            <Icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
