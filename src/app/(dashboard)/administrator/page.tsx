'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { useRouter } from 'next/navigation';
import type { AllUsers } from '@/types/user';
import { getAllUsers } from '@/lib/api/fetch-user';
import { FilterAdmin } from '@/types/filter';
import { deleteUser } from '@/lib/api/delete-user';

export default function AdministratorPage() {
  const router = useRouter();

  const [allUsersData, setAllUsersData] = useState<AllUsers[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      let users = (await getAllUsers(token)) || [];

      if (users) {
        setAllUsersData(users);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleGoToAddNewUser = () => {
    router.push('/add-new-user');
  };

  const [tempFilters, setTempFilters] = useState<FilterAdmin>({
    name: '',
    email: '',
    role: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterAdmin>({
    name: '',
    email: '',
    role: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 7;

  const filteredData = useMemo(() => {
    return allUsersData.filter((user) => {
      const matchesRole =
        !appliedFilters.role ||
        user.role.toLowerCase().includes(appliedFilters.role.toLowerCase()) ||
        user.role.toLowerCase().includes(appliedFilters.role.toLowerCase());

      const matchesEmail =
        !appliedFilters.email ||
        user.email.toLowerCase().includes(appliedFilters.email.toLowerCase());

      const matchesName =
        !appliedFilters.name ||
        user.name.toLowerCase().includes(appliedFilters.name.toLowerCase());

      return matchesRole && matchesEmail && matchesName;
    });
  }, [appliedFilters, allUsersData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTempFilterChange = (key: keyof FilterAdmin, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAppliedFilters(tempFilters);
    setCurrentPage(1);
    setIsLoading(false);
  };

  const clearFilters = () => {
    const emptyFilters: FilterAdmin = {
      name: '',
      email: '',
      role: '',
    };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(appliedFilters).some((v) => v !== '');

  const filterFields = [
    {
      key: 'role',
      label: 'User Role',
      type: 'select' as const,
      placeholder: 'Select role',
      options: [
        { label: 'Administrator', value: 'administrator' },
        { label: 'Operator', value: 'operator' },
        { label: 'Doctor', value: 'doctor' },
        { label: 'Oral Surgeon', value: 'oral-surgeon' },
        { label: 'Researcher', value: 'researcher' },
        { label: 'Nurse', value: 'nurse' },
      ],
    },
    {
      key: 'userEmail',
      label: 'Email',
      type: 'text' as const,
      placeholder: 'Enter email',
    },
    {
      key: 'userName',
      label: 'Name',
      type: 'text' as const,
      placeholder: 'Enter name',
    },
  ];

  const handleDeleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      await deleteUser(token!, userId);
      alert('User berhasil dihapus.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {allUsersData ? (
        <div className='p-6 space-y-4'>
          <div className='relative'>
            <FilterForm
              fields={filterFields}
              values={tempFilters}
              onChange={(key, value) =>
                handleTempFilterChange(key as keyof FilterAdmin, value)
              }
              onApply={applyFilters}
              onClear={clearFilters}
              isLoading={isLoading}
              showClear={hasActiveFilters}
            />
          </div>

          <DataTable
            data={currentData}
            columns={[
              { key: 'id', label: 'User ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'userCreationDate', label: 'User Creation Date' },
              { key: 'role', label: 'Role' },
            ]}
            loading={isLoading}
            actions={(item) => (
              <div className='flex'>
                <Button
                  size='sm'
                  className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white'
                >
                  View
                </Button>
                <Button
                  size='sm'
                  className='bg-[#CE6872] hover:bg-[#CE6872]/90 cursor-pointer text-white ml-1'
                  onClick={() => handleDeleteUser(item.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          />

          <div className='flex justify-between'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <Button
              className='bg-secondary hover:bg-[#4F959D]/90 cursor-pointer text-white flex items-center gap-2'
              onClick={handleGoToAddNewUser}
            >
              Add New User
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-full p-6'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              User Data Not Found
            </h1>
            <p className='text-gray-600 mb-4'>
              The data you're looking for doesn't exist. Please try again later!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
