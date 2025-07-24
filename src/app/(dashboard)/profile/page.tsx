'use client';

import { useState, type FormEvent, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Pencil, Calendar as CalendarIcon } from 'lucide-react';
import { getUserProfile } from '@/lib/api/fetch-profile';
import { editProfile } from '@/lib/api/edit-profile';
import { UserProfile, UserAuth } from '@/types/user';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [role, setRole] = useState('');
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    age: 0,
    birthDate: '',
    phone: '',
    job: '',
    nik: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let photo = `${process.env.NEXT_PUBLIC_API_PHOTO_URL}${userData?.photo}`;

  console.log(userData?.photo);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: UserAuth = JSON.parse(storedUser);
        setRole(parsedUser.role);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setIsFetchingData(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        setIsFetchingData(false);
        return;
      }
      try {
        const user = await getUserProfile(token);
        if (user) {
          setUserData(user);
        } else {
          console.log('User tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        gender: userData.gender || '',
        password: '',
        age: userData.age,
        birthDate: userData.birthDate || '',
        phone: userData.phone || '',
        job: userData.job || '',
        nik: userData.nik || '',
        address: userData.address || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender || '',
        password: formData.password,
        age: formData.age,
        birthDate: formData.birthDate || '',
        phone: formData.phone || '',
        job: formData.job || '',
        nik: formData.nik || '',
        address: formData.address || '',
      };

      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Error!', 'Token not found. Please log in again.', 'error');
        setLoading(false);
        return;
      }

      await editProfile(payload, token, profileImage);

      window.dispatchEvent(new Event('profileUpdated'));

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your profile has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setIsEditing(false);
        router.refresh();
      });
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
      Swal.fire(
        'Error!',
        error.message || 'Failed to upload data. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (isFetchingData) {
    return (
      <div className='relative flex justify-center p-4 z-10'>
        <Card className='w-200 p-0'>
          <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 h-20 gap-0'>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-24 w-24 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-40' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          </CardHeader>
          <CardContent className='px-6 pb-6 pt-10 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='relative flex justify-center p-4 z-10'>
      <Card className='w-200 p-0'>
        <form onSubmit={handleSubmit}>
          <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 h-20 gap-0'>
            <div className='flex gap-4 '>
              <div className='relative'>
                <Image
                  src={previewImage || photo}
                  alt=''
                  width={100}
                  height={100}
                  className='rounded-full object-cover h-24 w-24'
                />
                {isEditing && (
                  <label
                    htmlFor='profile-image-upload'
                    className='absolute bottom-0 right-0 cursor-pointer'
                  >
                    <div className='bg-blue-500 hover:bg-blue-600 rounded-full p-2'>
                      <Pencil className='h-4 w-4 text-white' />
                    </div>
                    <input
                      id='profile-image-upload'
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <div className='flex flex-col justify-end'>
                <CardTitle className='text-md text-black font-bold'>
                  {formData.name}
                </CardTitle>
                <p className='text-sm font-medium text-black capitalize'>
                  {role}
                </p>
              </div>
              <div className='flex-grow' />
              {isEditing ? (
                <div className='flex gap-2'>
                  <Button
                    type='button'
                    className='bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer'
                    onClick={toggleEditing}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    className=' hover:bg-[#4971A9]/90 cursor-pointer'
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              ) : (
                <Button
                  type='button'
                  className=' hover:bg-[#4971A9]/90 cursor-pointer'
                  onClick={toggleEditing}
                >
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className='px-6 pb-6 pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='name'
                  className='text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <Input
                  type='text'
                  name='name'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <Input
                  type='text'
                  name='email'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <Input
                  type='password'
                  name='password'
                  placeholder='Enter new password to update'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='gender'
                  className='text-sm font-medium text-gray-700'
                >
                  Gender
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                  name='gender'
                  value={formData.gender}
                  disabled={!isEditing}
                >
                  <SelectTrigger className='bg-gray-100 border-0 disabled:opacity-100 w-full cursor-pointer'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='P'>Female</SelectItem>
                    <SelectItem value='L'>Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='birthDate'
                  className='text-sm font-medium text-gray-700'
                >
                  Birthdate
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      disabled={!isEditing}
                      className={cn(
                        'w-full justify-start text-left font-normal bg-gray-100 border-0 disabled:opacity-100 disabled:cursor-not-allowed',
                        !formData.birthDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {formData.birthDate ? (
                        format(new Date(formData.birthDate), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={
                        formData.birthDate
                          ? new Date(formData.birthDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          birthDate: date ? format(date, 'yyyy-MM-dd') : '',
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='age'
                  className='text-sm font-medium text-gray-700'
                >
                  Age
                </label>
                <Input
                  type='number'
                  name='age'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.age}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <p className='mb-0 primary-color font-bold'>More info</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='job'
                  className='text-sm font-medium text-gray-700'
                >
                  Job
                </label>
                <Input
                  type='text'
                  name='job'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.job}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='nik'
                  className='text-sm font-medium text-gray-700'
                >
                  NIK
                </label>
                <Input
                  type='text'
                  name='nik'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='address'
                  className='text-sm font-medium text-gray-700'
                >
                  Address
                </label>
                <Input
                  type='text'
                  name='address'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='phone'
                  className='text-sm font-medium text-gray-700'
                >
                  Phone
                </label>
                <Input
                  type='text'
                  name='phone'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
