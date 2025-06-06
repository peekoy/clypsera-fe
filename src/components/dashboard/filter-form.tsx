'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

type FilterField = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
};

type FilterFormProps = {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onApply: () => void;
  onClear: () => void;
  isLoading?: boolean;
  showClear?: boolean;
};

export default function FilterForm({
  fields,
  values,
  onChange,
  onApply,
  onClear,
  isLoading,
  showClear,
}: FilterFormProps) {
  return (
    <div className='space-y-2'>
      <p className='text-lg font-medium primary-color flex items-center gap-2'>
        <Search className='h-5 w-5' />
        Search Filters
      </p>
      <div className='flex gap-4 flex-wrap'>
        {fields.map((field) => (
          <div key={field.key} className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              {field.label}
            </label>
            {field.type === 'select' && field.options ? (
              <Select
                value={values[field.key]}
                onValueChange={(value) => onChange(field.key, value)}
              >
                <SelectTrigger className='cursor-pointer min-w-[180px]'>
                  <SelectValue placeholder={field.placeholder || 'Select'} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className='cursor-pointer'
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                className='min-w-[180px]'
              />
            )}
          </div>
        ))}

        <div className='flex items-end gap-2'>
          <Button
            onClick={onApply}
            disabled={isLoading}
            className='bg-secondary hover:bg-[#4F959D]/90 cursor-pointer text-white'
          >
            {isLoading ? 'Applying...' : 'Apply Filters'}
          </Button>
          {showClear && (
            <Button
              variant='outline'
              onClick={onClear}
              className='flex items-center cursor-pointer gap-1'
            >
              <X className='h-4 w-4' />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
