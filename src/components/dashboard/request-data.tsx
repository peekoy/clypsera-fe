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
import { requestAllData } from '@/lib/api/request-all-data';
import {
  RequestDataById,
  RequestDataPayload,
} from '@/types/check-request-data';
import { getRequestDataById } from '@/lib/api/fetch-request-data-by-id';
import { updateRequestData } from '@/lib/api/update-status';
import Swal from 'sweetalert2';
import { UserAuth } from '@/types/user';

const formatDateTime = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('sv-SE');
};

export default function RequestData() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const isCreateMode =
    pathname.includes('/operations/') || pathname.includes('/request-all');

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!isCreateMode);
  const [error, setError] = useState('');
  const [requestData, setRequestData] = useState<RequestDataById | null>(null);
  const [currentUser, setCurrentUser] = useState<UserAuth | null>(null);
  const [formData, setFormData] = useState<RequestDataPayload>({
    name: '',
    email: '',
    nik: '',
    phoneNumber: '',
    category: '',
    purpose: '',
  });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setToken(storedToken);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchRequestDataById = async () => {
      if (!token || !params.id) {
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      try {
        const data = await getRequestDataById(
          token,
          Number.parseInt(params.id as string)
        );
        setRequestData(data);
      } catch (error) {
        console.error('Error fetching request data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (!isCreateMode) {
      fetchRequestDataById();
    }
  }, [params.id, isCreateMode, token]);

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
      confirmButtonText: `Yes, ${actionText} it!`,
      customClass: {
        icon: 'no-border',
        cancelButton: 'swal-cancel-button-outline',
      },
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
            showConfirmButton: false,
            timer: 2000,
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
      const isRequestAll = pathname.includes('/request-all');
      const result = isRequestAll
        ? await requestAllData(token, formData)
        : await singleRequestData(
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
      {isCreateMode ? (
        <Card className='gap-4'>
          {/* Form untuk membuat request (tidak diubah) */}
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
                    <SelectItem value='Riset/Penelitian'>
                      Riset/Penelitian
                    </SelectItem>
                    <SelectItem value='Komersial'>Komersial</SelectItem>
                    <SelectItem value='Lainya'>Lainya</SelectItem>
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
                placeholder='Name'
                className='bg-gray-100 border-0'
                value={requestData?.name || ''}
                disabled
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                placeholder='Email'
                className='bg-gray-100 border-0'
                value={requestData?.email || ''}
                disabled
              />
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Mobile Phone number</label>
                <Input
                  placeholder='Number'
                  className='bg-gray-100 border-0 w-100'
                  value={requestData?.phoneNumber || ''}
                  disabled
                />
              </div>
              <div>
                <label>NIK</label>
                <Input
                  placeholder='NIK'
                  className='bg-gray-100 border-0 w-100'
                  value={requestData?.nik || ''}
                  disabled
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <label>Submission Categories</label>
                <Input
                  placeholder='Research'
                  className='bg-gray-100 border-0 w-100'
                  value={requestData?.category || ''}
                  disabled
                />
              </div>
              <div>
                <label>Purpose of application</label>
                <Input
                  placeholder=''
                  className='bg-gray-100 border-0 w-100'
                  value={requestData?.purpose || ''}
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
                {requestData?.requestOperationId || 'All Data'}
              </p>
            </Card>
            <div className='space-x-4'>
              {/* DIUBAH: Tambahkan pengecekan peran admin DI SINI */}
              {currentUser?.role === 'admin' &&
                requestData?.status.toLowerCase() === 'pending' && (
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
