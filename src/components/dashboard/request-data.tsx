'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { singleRequestData } from '@/lib/api/single-request-data';

function convertPathToTitle(path: string) {
  return path
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function RequestData() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nik: '',
    phoneNumber: '',
    category: '',
    purpose: '',
  });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      (await singleRequestData(
        token,
        formData,
        Number.parseInt(params.id as string)
      )) || [];

      alert('request Data pasien berhasil! Ditunggu ya');

      // Reset form
      // resetForm();
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const path = convertPathToTitle(usePathname());

  console.log(path);

  return (
    <>
      {path.includes('Operations') ? (
        <Card className='gap-4'>
          <CardHeader className='text-center primary-color gap-0 font-bold text-3xl'>
            Data Use Request Form
          </CardHeader>
          <CardContent className='space-y-2'>
            <form id='cleft-lip-form' onSubmit={onSubmit} className='space-y-6'>
              <div>
                <label>Applicant's full name</label>
                <Input
                  name='name'
                  placeholder='Name'
                  className='bg-gray-100 border-0'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <Input
                  name='email'
                  placeholder='Email'
                  className='bg-gray-100 border-0'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex justify-between'>
                <div>
                  <label>Mobile Phone number</label>
                  <Input
                    name='phoneNumber'
                    placeholder='Number'
                    className='bg-gray-100 border-0 w-100'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>NIK</label>
                  <Input
                    name='nik'
                    placeholder='NIK'
                    className='bg-gray-100 border-0 w-100'
                    value={formData.nik}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Submission Categories</label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  name='category'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Research' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='KTP'>KTP</SelectItem>
                    <SelectItem value='KK'>KK</SelectItem>
                    <SelectItem value='Akta Kelahiran'>
                      Akta Kelahiran
                    </SelectItem>
                    <SelectItem value='Akta Kematian'>Akta Kematian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Purpose of application</label>
                <Textarea
                  name='purpose'
                  placeholder='Please fill in the purpose'
                  className='bg-gray-100 border-0 min-h-[120px] text-sm'
                  value={formData.purpose}
                  onChange={handleTextAreaChange}
                  required
                />
              </div>
              <div className='flex justify-center'>
                <Button className='mt-4 hover:bg-[#4971a9]/90 cursor-pointer w-50'>
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className='gap-4'>
          <CardHeader className='text-center primary-color gap-0 font-bold text-3xl'>
            Data Use Request Form
          </CardHeader>
          <CardContent className='space-y-2'>
            <div>
              <label>Applicant's full name</label>
              <Input
                id=''
                name=''
                placeholder='Name'
                className='bg-gray-100 border-0'
                disabled
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                id=''
                name=''
                placeholder='Email'
                className='bg-gray-100 border-0'
                disabled
              />
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Mobile Phone number</label>
                <Input
                  id=''
                  name=''
                  placeholder='Number'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
              <div>
                <label>NIK</label>
                <Input
                  id=''
                  name=''
                  placeholder='NIK'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Submission Categories</label>
                <Input
                  id=''
                  name=''
                  placeholder='Research'
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
              <div>
                <label>Purpose of application</label>
                <Input
                  id=''
                  name=''
                  placeholder=''
                  className='bg-gray-100 border-0 w-100'
                  disabled
                />
              </div>
            </div>
            <Card className='bg-[#4F959D]/11 border-none shadow-none p-4 gap-2 mt-6 w-100 text-sm'>
              <p>Status: Pending</p>
              <p>Submission Date: 11 Jul 205 20:31:31</p>
              {/* tetep id user */}
              <p>Requested Operation ID: Data ID-16</p>
            </Card>
            <div className='space-x-4'>
              <Button className='mt-4 bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer w-50'>
                Approve Request
              </Button>
              <Button className='hover:bg-[#4971A9]/90 cursor-pointer w-50'>
                Reject Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
