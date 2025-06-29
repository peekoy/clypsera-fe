'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { FilterRequestData } from '@/types/filter';
import { CheckRequestData } from '@/types/check-request-data';
import { getAllRequestData } from '@/lib/api/fetch-request-data';
import { deleteRequest } from '@/lib/api/delete-request';
import { useRouter } from 'next/navigation';

export default function CheckDataRequestPage() {
  const router = useRouter();
  const [requestData, setRequestData] = useState<CheckRequestData[]>([]);
  const [isDataRequested, setIsDataRequested] = useState(false);
  const [requestId, setRequestId] = useState<number | null>(null);

  console.log(requestData);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      let request = (await getAllRequestData(token)) || [];

      if (request) {
        setRequestData(request);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleGoToCheckRequestUser = (requestId: number) => {
    router.push(`/requests/${requestId}`);
  };

  const [tempFilters, setTempFilters] = useState<FilterRequestData>({
    category: '',
    status: '',
    email: '',
    name: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterRequestData>({
    category: '',
    status: '',
    email: '',
    name: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 7;

  const filteredData = useMemo(() => {
    return requestData.filter((data) => {
      const matchesCategory =
        !appliedFilters.category ||
        data.category
          .toLowerCase()
          .includes(appliedFilters.category.toLowerCase());

      const matchesStatus =
        !appliedFilters.status ||
        data.status.toLowerCase().includes(appliedFilters.status.toLowerCase());

      const matchesEmail =
        !appliedFilters.email ||
        data.email.toLowerCase() === appliedFilters.email.toLowerCase();

      const matchesName =
        !appliedFilters.name ||
        data.name.toLowerCase().includes(appliedFilters.name.toLowerCase());

      return matchesCategory && matchesStatus && matchesEmail && matchesName;
    });
  }, [appliedFilters, requestData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTempFilterChange = (
    key: keyof FilterRequestData,
    value: string
  ) => {
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
    const emptyFilters: FilterRequestData = {
      category: '',
      status: '',
      email: '',
      name: '',
    };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(appliedFilters).some((v) => v !== '');

  const filterFields = [
    {
      key: 'categories',
      label: 'Categories',
      type: 'select' as const,
      placeholder: 'Select categories',
      options: [
        { label: 'Riset', value: 'riset' },
        { label: 'Komersil', value: 'komersil' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      placeholder: 'Select status',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
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

  const handleDeleteRequest = async (requestId: number) => {
    try {
      const token = localStorage.getItem('token');
      await deleteRequest(token!, requestId);
      setIsDataRequested(false);
      setRequestId(null);
      alert('Permohonan berhasil dibatalkan.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {requestData ? (
        <div className='p-6 space-y-4'>
          <div className='relative'>
            <FilterForm
              fields={filterFields}
              values={tempFilters}
              onChange={(key, value) =>
                handleTempFilterChange(key as keyof FilterRequestData, value)
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
              { key: 'id', label: 'Request ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'category', label: 'Category' },
              { key: 'status', label: 'Status' },
              { key: 'createdAt', label: 'Created At' },
            ]}
            loading={isLoading}
            actions={(item) => (
              <div className='flex'>
                <Button
                  size='sm'
                  className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white'
                  onClick={() => handleGoToCheckRequestUser(item.id)}
                >
                  View
                </Button>
                <Button
                  size='sm'
                  className='bg-[#CE6872] hover:bg-[#CE6872]/90 cursor-pointer text-white ml-1'
                  onClick={() => {
                    handleDeleteRequest(item.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className='flex justify-center items-center h-full p-6'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Check Request Data Not Found
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
