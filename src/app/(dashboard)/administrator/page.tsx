'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { patientData } from '@/data/data';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { useRouter } from 'next/navigation';

type FilterState = {
  foundation: string;
  operationTechnique: string;
  gender: string;
  age: string;
  patientName: string;
};

export default function AdministratorPage() {
  const router = useRouter();

  const handleGoToAddNewUser = () => {
    router.push('/add-new-user');
  };

  const [tempFilters, setTempFilters] = useState<FilterState>({
    foundation: '',
    operationTechnique: '',
    gender: '',
    age: '',
    patientName: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    foundation: '',
    operationTechnique: '',
    gender: '',
    age: '',
    patientName: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 7;

  const filteredData = useMemo(() => {
    return patientData.filter((patient) => {
      const matchesFoundation =
        !appliedFilters.foundation ||
        patient.organizer
          .toLowerCase()
          .includes(appliedFilters.foundation.toLowerCase()) ||
        patient.uploadedBy
          .toLowerCase()
          .includes(appliedFilters.foundation.toLowerCase());

      const matchesTechnique =
        !appliedFilters.operationTechnique ||
        patient.operationalTechniques
          .toLowerCase()
          .includes(appliedFilters.operationTechnique.toLowerCase());

      const matchesGender =
        !appliedFilters.gender ||
        patient.gender.toLowerCase() === appliedFilters.gender.toLowerCase();

      const matchesAge =
        !appliedFilters.age || patient.age.toString() === appliedFilters.age;

      const matchesName =
        !appliedFilters.patientName ||
        patient.name
          .toLowerCase()
          .includes(appliedFilters.patientName.toLowerCase());

      return (
        matchesFoundation &&
        matchesTechnique &&
        matchesGender &&
        matchesAge &&
        matchesName
      );
    });
  }, [appliedFilters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTempFilterChange = (key: keyof FilterState, value: string) => {
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
    const emptyFilters: FilterState = {
      foundation: '',
      operationTechnique: '',
      gender: '',
      age: '',
      patientName: '',
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

  const columns = [
    { key: 'id', label: 'User ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'userCreationDate', label: 'User Creation Date' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <div className='p-6 space-y-4'>
      <div className='relative'>
        <FilterForm
          fields={filterFields}
          values={tempFilters}
          onChange={(key, value) =>
            handleTempFilterChange(key as keyof FilterState, value)
          }
          onApply={applyFilters}
          onClear={clearFilters}
          isLoading={isLoading}
          showClear={hasActiveFilters}
        />
      </div>

      <DataTable
        data={currentData}
        columns={columns}
        loading={isLoading}
        actions={(item) => (
          <div className='flex'>
            <Button
              size='sm'
              className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white'
            >
              View
            </Button>
            <Button size='sm' className='bg-[#CE6872] text-white ml-1'>
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
  );
}
