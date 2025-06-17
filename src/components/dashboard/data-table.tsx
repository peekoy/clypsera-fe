'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type DataTableProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
  loading?: boolean;
  actions?: (item: any) => React.ReactNode;
};

export default function DataTable<T>({
  data,
  columns,
  loading,
  actions,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='flex items-center gap-3'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-[#4971A9]'></div>
          <span className='text-gray-600'>Loading data...</span>
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className='overflow-hidden rounded-lg shadow-lg'>
      <div className='overflow-x-auto'>
        <Table className='border-collapse'>
          <TableHeader>
            <TableRow className='bg-primary hover:bg-[#4971A9]'>
              {columns.map((col, i) => (
                <TableHead
                  key={String(col.key)}
                  className={`text-white font-medium ${
                    i === 0 ? 'rounded-tl-lg' : ''
                  } ${
                    i === columns.length - 1 && !actions ? 'rounded-tr-lg' : ''
                  }`}
                >
                  {col.label}
                </TableHead>
              ))}
              {actions && (
                <TableHead className='text-white font-medium rounded-tr-lg'>
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className='text-center py-8 text-gray-500 rounded-b-lg'
                >
                  No data found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={(item as any).id || index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {String(item[col.key])}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(item)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
