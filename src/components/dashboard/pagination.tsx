'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  const goToPrevious = () => currentPage > 1 && onPageChange(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className='cursor-pointer'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className='px-2 text-gray-500'>...</span>
            ) : (
              <Button
                size='sm'
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => onPageChange(page as number)}
                className={
                  currentPage === page
                    ? 'bg-primary hover:bg-[#4971A9] text-white'
                    : 'cursor-pointer'
                }
              >
                {page}
              </Button>
            )}
          </div>
        ))}
        <Button
          variant='outline'
          size='sm'
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className='cursor-pointer'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
