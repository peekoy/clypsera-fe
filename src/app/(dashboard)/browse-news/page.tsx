'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import DataTable from '@/components/dashboard/data-table';
import FilterForm from '@/components/dashboard/filter-form';
import Pagination from '@/components/dashboard/pagination';
import { useRouter } from 'next/navigation';
import { FilterNews } from '@/types/filter';
import { News } from '@/types/news';
import { getAllNews } from '@/lib/api/fetch-news';
import { deleteNews } from '@/lib/api/delete-news';
import Swal from 'sweetalert2';

export default function BrowseDataPage() {
  const [allNews, setAllNews] = useState<News[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      setIsLoading(true);
      const news = (await getAllNews(token)) || [];

      if (news) {
        setAllNews(news);
      }
      setIsLoading(false);
    };

    fetchPatient();
  }, []);

  const handleEditNews = (newsId: number) => {
    console.log(newsId);
    router.push(`/news/${newsId}/edit`);
  };

  const [tempFilters, setTempFilters] = useState<FilterNews>({
    title: '',
    source: '',
    status: '',
    content: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterNews>({
    title: '',
    source: '',
    status: '',
    content: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 7;

  const filteredData = useMemo(() => {
    return allNews.filter((news) => {
      const matchesTitle =
        !appliedFilters.title ||
        news.title.toLowerCase().includes(appliedFilters.title.toLowerCase());

      const matchesSource =
        !appliedFilters.source ||
        news.source.toLowerCase().includes(appliedFilters.source.toLowerCase());

      const matchesContent =
        !appliedFilters.content ||
        news.content.toLowerCase() === appliedFilters.content.toLowerCase();

      const matchesStatus =
        !appliedFilters.status ||
        news.status.toString() === appliedFilters.status.toLowerCase();

      return matchesTitle && matchesSource && matchesContent && matchesStatus;
    });
  }, [appliedFilters, allNews]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTempFilterChange = (key: keyof FilterNews, value: string) => {
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
    const emptyFilters: FilterNews = {
      title: '',
      source: '',
      status: '',
      content: '',
    };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(appliedFilters).some((v) => v !== '');

  const filterFields = [
    {
      key: 'title',
      label: 'Title',
      type: 'text' as const,
      placeholder: 'Enter title',
    },
    {
      key: 'source',
      label: 'Source',
      type: 'text' as const,
      placeholder: 'Enter source',
    },
    {
      key: 'content',
      label: 'Content',
      type: 'text' as const,
      placeholder: 'Enter content',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      placeholder: 'Select gender',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'Published' },
      ],
    },
  ];

  const handleDeleteNews = async (newsId: number) => {
    try {
      const token = localStorage.getItem('token');
      await deleteNews(token!, newsId);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'News has been deleted.',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error: unknown) {
      const err = error as Error;
      Swal.fire('Error!', err.message || 'Failed to delete news.', 'error');
    }
  };

  return (
    <>
      {allNews ? (
        <div className='p-6 space-y-4'>
          <div className='relative'>
            <FilterForm
              fields={filterFields}
              values={tempFilters}
              onChange={(key, value) =>
                handleTempFilterChange(key as keyof FilterNews, value)
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
              { key: 'title', label: 'Title' },
              { key: 'source', label: 'Source' },
              { key: 'content', label: 'Content' },
              { key: 'status', label: 'Status' },
            ]}
            loading={isLoading}
            actions={(item: News) => (
              <div className='flex'>
                <Button
                  size='sm'
                  className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white'
                  onClick={() => {
                    handleEditNews(item.id);
                  }}
                >
                  View
                </Button>
                <Button
                  size='sm'
                  className='bg-[#CE6872] hover:bg-[#CE6872]/90 cursor-pointer text-white ml-1'
                  onClick={() => handleDeleteNews(item.id)}
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
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-full p-6'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Patient Data Not Found
            </h1>
            <p className='text-gray-600 mb-4'>
              The data you&apos;re looking for doesn&apos;t exist. Please try
              again later!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
