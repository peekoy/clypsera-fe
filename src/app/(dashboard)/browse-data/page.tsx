'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
// import { patientData } from '@/data/data';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { useRouter } from 'next/navigation';
import { FilterBrowse } from '@/types/filter';
import { PatientData } from '@/types/patient';
import { getAllPatient } from '@/lib/api/fetch-patient';
// import { patientData } from '@/data/data';

export default function BrowseDataPage() {
  const [allPatient, setAllPatient] = useState<PatientData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      let patient = (await getAllPatient(token)) || [];

      if (patient) {
        setAllPatient(patient);
      }
      setIsLoading(false);
    };

    fetchPatient();
  }, []);

  const handleViewOperation = (patientId: number) => {
    router.push(`/operations/${patientId}`);
  };

  const [tempFilters, setTempFilters] = useState<FilterBrowse>({
    foundation: '',
    operationTechnique: '',
    gender: '',
    age: '',
    patientName: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterBrowse>({
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
    return allPatient.filter((patient) => {
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
        patient.patientName
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
  }, [appliedFilters, allPatient]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTempFilterChange = (key: keyof FilterBrowse, value: string) => {
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
    const emptyFilters: FilterBrowse = {
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
      key: 'foundation',
      label: 'Foundation/Uploader',
      type: 'select' as const,
      placeholder: 'Select foundation',
      options: [
        { label: 'RS Elizabeth', value: 'rs-elizabeth' },
        { label: 'RS Bunda Halimah', value: 'rs-bunda' },
        { label: 'X Foundation', value: 'x-foundation' },
        { label: 'RS Al-Ikhlas', value: 'rs-al-ikhlas' },
      ],
    },
    {
      key: 'operationTechnique',
      label: 'Operation Technique',
      type: 'select' as const,
      placeholder: 'Select technique',
      options: [
        { label: 'Method A', value: 'method-a' },
        { label: 'Method B', value: 'method-b' },
        { label: 'Method C', value: 'method-c' },
      ],
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'select' as const,
      placeholder: 'Select gender',
      options: [
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
      ],
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number' as const,
      placeholder: 'Enter age',
    },
    {
      key: 'patientName',
      label: 'Patient Name',
      type: 'text' as const,
      placeholder: 'Enter patient name',
    },
  ];

  return (
    <>
      {allPatient ? (
        <div className='p-6 space-y-4'>
          <div className='relative'>
            <FilterForm
              fields={filterFields}
              values={tempFilters}
              onChange={(key, value) =>
                handleTempFilterChange(key as keyof FilterBrowse, value)
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
              { key: 'patientName', label: 'Patient Name' },
              { key: 'age', label: 'Age' },
              { key: 'gender', label: 'Gender' },
              { key: 'dateOfBirth', label: 'Date of Birth' },
              { key: 'operationDate', label: 'Operation Date' },
              { key: 'organizer', label: 'Organizer' },
              { key: 'operationalTechniques', label: 'Operational Techniques' },
              { key: 'uploadedBy', label: 'Uploaded By' },
            ]}
            loading={isLoading}
            actions={(item) => (
              <div className='flex'>
                <Button
                  size='sm'
                  className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white'
                  onClick={() => {
                    handleViewOperation(item.id);
                  }}
                >
                  View
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
            <Button className='bg-secondary hover:bg-[#4F959D]/90 cursor-pointer text-white flex items-center gap-2'>
              <Download className='h-4 w-4' />
              Download All Data
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-full p-6'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Patient Data Not Found
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
