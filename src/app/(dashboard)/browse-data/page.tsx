'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { useRouter } from 'next/navigation';
import { FilterBrowse } from '@/types/filter';
import { PatientData } from '@/types/patient';
import { getAllPatient } from '@/lib/api/fetch-patient';
import Link from 'next/link';
import { generateDownloadToken } from '@/lib/api/generate-download-token';
import { checkAllDataRequest } from '@/lib/api/check-all-request-data';
import { exportAllData } from '@/lib/api/export-all-data';
import Swal from 'sweetalert2';

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export default function BrowseDataPage() {
  const [allPatient, setAllPatient] = useState<PatientData[]>([]);
  const [filterOptions, setFilterOptions] = useState<{
    foundation: { label: string; value: string }[];
    operationTechnique: { label: string; value: string }[];
  }>({ foundation: [], operationTechnique: [] });
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const [allDataRequestStatus, setAllDataRequestStatus] = useState<
    string | null
  >(null);
  const [allDataRequestId, setAllDataRequestId] = useState<number | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const fetchPatientAndRequestStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      setIsCheckingStatus(true);

      const [patients, requestStatus] = await Promise.all([
        getAllPatient(token),
        checkAllDataRequest(token),
      ]);

      if (patients) {
        setAllPatient(patients);
        const uniqueFoundations = [
          ...new Set(patients.map((p) => p.organizer)),
        ];
        const uniqueTechniques = [
          ...new Set(patients.map((p) => p.operationalTechniques)),
        ];
        setFilterOptions({
          foundation: uniqueFoundations.map((f) => ({
            label: f,
            value: toSlug(f),
          })),
          operationTechnique: uniqueTechniques.map((t) => ({
            label: t,
            value: toSlug(t),
          })),
        });
      }

      if (requestStatus) {
        setAllDataRequestStatus(requestStatus.status);
        setAllDataRequestId(requestStatus.requestId);
      }

      setIsLoading(false);
      setIsCheckingStatus(false);
    };

    fetchPatientAndRequestStatus();
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
        toSlug(patient.organizer) === appliedFilters.foundation;

      const matchesTechnique =
        !appliedFilters.operationTechnique ||
        toSlug(patient.operationalTechniques) ===
          appliedFilters.operationTechnique;

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
      options: filterOptions.foundation,
    },
    {
      key: 'operationTechnique',
      label: 'Operation Technique',
      type: 'select' as const,
      placeholder: 'Select technique',
      options: filterOptions.operationTechnique,
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

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    if (!allDataRequestId) {
      Swal.fire('Error!', 'Request ID for all data not found.', 'error');
      setIsDownloading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const downloadToken = await generateDownloadToken(
        token,
        allDataRequestId
      );
      const response = await exportAllData(downloadToken);
      const blob = await response.blob();
      const fileNameHeader = response.headers.get('Content-Disposition');
      const fileName =
        fileNameHeader?.match(/filename="(.+)"/)?.[1] ||
        'all_patient_data.xlsx';

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      Swal.fire('Download Error!', err.message, 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  console.log(allDataRequestStatus);

  const renderRequestButton = () => {
    if (isCheckingStatus) {
      return (
        <Button disabled className='bg-gray-400 cursor-not-allowed'>
          Checking Status...
        </Button>
      );
    }

    if (allDataRequestStatus === 'approved') {
      return (
        <Button
          className='bg-secondary hover:bg-[#4F959D]/90 cursor-pointer text-white flex items-center gap-2'
          onClick={handleDownloadAll}
          disabled={isDownloading}
        >
          <Download className='h-4 w-4' />
          {isDownloading ? 'Downloading...' : 'Download All Data'}
        </Button>
      );
    }

    if (allDataRequestStatus === 'pending') {
      return (
        <Button
          className='bg-yellow-500 hover:bg-yellow-600 cursor-not-allowed text-white'
          disabled
        >
          Request Pending
        </Button>
      );
    }

    return (
      <Link href='/requests/all'>
        <Button className='bg-secondary hover:bg-[#4F959D]/90 cursor-pointer text-white flex items-center gap-2'>
          Request All Data
        </Button>
      </Link>
    );
  };

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
            {renderRequestButton()}
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
