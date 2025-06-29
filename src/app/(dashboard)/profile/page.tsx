'use client';

import { useState, type FormEvent, useEffect } from 'react';
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
import { Pencil } from 'lucide-react';
import { getUserProfile } from '@/lib/api/fetch-profile';
import { editProfile } from '@/lib/api/edit-profile';
import { UserProfile } from '@/types/user';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
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

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
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

  console.log(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const token = localStorage.getItem('token'); // Pastikan token juga dikirim jika API membutuhkannya
      if (!token) {
        alert('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      await editProfile(payload, token); // Sesuaikan dengan signature editUser Anda
      alert('Edit User successfully!');

      router.refresh;

      // Reset form
      // resetForm();
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='relative flex justify-center p-4 z-10'>
      <Card className='w-200 p-0'>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 h-20 gap-0'>
          <div className='flex gap-4'>
            <Avatar className='h-24 w-24 border-2 bg-black border-white/20 relative'>
              <AvatarImage src={'/placeholder.svg'} alt='' />
              <AvatarFallback className='bg-white/10 text-white text-3xl font-semibold'>
                {'fwafwaef'
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              variant='secondary'
              size='icon'
              className='absolute mt-16 ml-16 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer'
            >
              <Pencil className='h-4 w-4' />
            </Button>
            <div className='flex flex-col justify-end'>
              <CardTitle className='text-md text-black font-bold'>
                owanfdewbao
              </CardTitle>
              <p className='text-sm font-medium text-black capitalize'>role</p>
            </div>
            {isEditing ? (
              <div className='flex gap-2'>
                <Button
                  className='ml-89 bg-[#93BBF3] hover:bg-[#93BBF3]/90 cursor-pointer'
                  onClick={toggleEditing}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  onClick={handleSubmit}
                  className=' hover:bg-[#4971A9]/90 cursor-pointer'
                >
                  Submit
                </Button>
              </div>
            ) : (
              <Button
                className='ml-115 hover:bg-[#4971A9]/90 cursor-pointer'
                onClick={toggleEditing}
              >
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className='px-6 pb-6 pt-6'>
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
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
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
                type='text'
                name='password'
                className='bg-gray-100 border-0 disabled:opacity-100'
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isEditing ? false : true}
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
                value={
                  formData?.gender === 'L'
                    ? 'male'
                    : formData?.gender === 'P'
                    ? 'female'
                    : ''
                }
                disabled={isEditing ? false : true}
              >
                <SelectTrigger className='bg-gray-100 border-0 disabled:opacity-100 w-full cursor-pointer'>
                  <SelectValue placeholder='Female' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='female'>Female</SelectItem>
                  <SelectItem value='male'>Male</SelectItem>
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
              <Input
                type='date'
                name='birthDate'
                className='bg-gray-100 border-0 disabled:opacity-100'
                value={formData.birthDate}
                onChange={handleChange}
                required
                disabled={isEditing ? false : true}
              />
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
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
