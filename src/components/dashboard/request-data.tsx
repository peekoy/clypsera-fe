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
import { RequestDataById } from '@/types/check-request-data';
import { getRequestDataById } from '@/lib/api/fetch-request-data-by-id';
import { updateRequestData } from '@/lib/api/update-status';
import Swal from 'sweetalert2';

function convertPathToTitle(path: string) {
  return path
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Fungsi untuk memformat tanggal dan waktu
const formatDateTime = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  // Menggunakan lokal Swedia untuk format YYYY-MM-DD HH:mm:ss
  return date.toLocaleString('sv-SE');
};

export default function RequestData() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const path = convertPathToTitle(pathname);

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [requestData, setRequestData] = useState<RequestDataById | null>(null);
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

  useEffect(() => {
    const fetchRequestDataById = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      try {
        const user = await getRequestDataById(
          token,
          Number.parseInt(params.id as string)
        );
        if (user) {
          setRequestData(user);
        } else {
          console.log('User tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (!path.includes('Operations')) {
      fetchRequestDataById();
    } else {
      setIsFetching(false);
    }
  }, [params.id, path]);

  const submitStatus = async (status: string) => {
    if (!token) {
      alert('Token tidak ditemukan. Silakan login kembali.');
      return;
    }

    const isApproving = status === 'approved';
    const actionText = isApproving ? 'approve' : 'reject';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText} this request?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isApproving ? '#3085d6' : '#d33',
      cancelButtonColor: '#6e7881',
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRequestData(
            token,
            status,
            Number.parseInt(params.id as string)
          );
          Swal.fire({
            title: isApproving ? 'Approved!' : 'Rejected!',
            text: `The request has been successfully ${status}.`,
            icon: 'success',
          }).then(() => {
            router.back();
          });
        } catch (error) {
          Swal.fire('Error!', `Failed to ${actionText} the request.`, 'error');
          console.log(error);
        }
      }
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await singleRequestData(
        token,
        formData,
        Number.parseInt(params.id as string)
      );

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted!',
        text: 'Your request has been sent and will be reviewed.',
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        router.back();
      });
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed!',
        text:
          error.message || 'Failed to submit your request. Please try again.',
      });
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

  if (isFetching) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Loading request data...</p>
      </div>
    );
  }

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
                  disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                  disabled={loading}
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Select a category' />
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
                  disabled={loading}
                />
              </div>
              <div className='flex justify-center'>
                <Button
                  className='mt-4 hover:bg-[#4971a9]/90 cursor-pointer w-50'
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
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
                value={requestData?.name}
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
                value={requestData?.email}
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
                  value={requestData?.phoneNumber}
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
                  value={requestData?.nik}
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
                  value={requestData?.category}
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
                  value={requestData?.purpose}
                  disabled
                />
              </div>
            </div>
            <Card className='bg-[#4F959D]/11 border-none shadow-none p-4 gap-2 mt-6 w-100 text-sm'>
              <p>Status: {requestData?.status}</p>
              <p>
                Submission Date: {formatDateTime(requestData?.createdAt || '')}
              </p>
              <p>
                Requested Operation ID: Data ID-
                {requestData?.requestOperationId}
              </p>
            </Card>
            <div className='space-x-4'>
              {requestData?.status.toLowerCase() === 'pending' && (
                <>
                  <Button
                    className='mt-4 bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer w-50'
                    onClick={() => submitStatus('approved')}
                  >
                    Approve Request
                  </Button>
                  <Button
                    className='hover:bg-[#4971A9]/90 cursor-pointer w-50'
                    onClick={() => submitStatus('rejected')}
                  >
                    Reject Request
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
