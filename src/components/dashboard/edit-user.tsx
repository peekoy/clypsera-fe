'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';
import { getUserById } from '@/lib/api/fetch-user-by-id';
import { useParams, useRouter } from 'next/navigation';
import { editUser } from '@/lib/api/edit-user';
import Swal from 'sweetalert2';

export default function EditUserForm() {
  const params = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        setIsLoading(false);
        return;
      }
      try {
        const user = await getUserById(
          token,
          Number.parseInt(params.id as string)
        );
        if (user) {
          setUserData(user);
        } else {
          console.log('User tidak ditemukan');
          Swal.fire('Error!', 'User data not found.', 'error');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Swal.fire('Error!', 'Failed to fetch user data.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
        role: userData.role || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirm Password do not match',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token tidak ditemukan. Silakan login kembali.');
        setIsSubmitting(false);
        return;
      }
      await editUser(formData, Number.parseInt(params.id as string), token);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User data has been updated successfully.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push('/administrator');
      });
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'Something went wrong.';
      Swal.fire('Error!', message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <Card className='mx-34 p-0'>
      <form onSubmit={handleSubmit}>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <CardTitle className='text-2xl font-bold'>Edit User</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-2 pb-6'>
          <div>
            <label>Username</label>
            <Input
              name='name'
              placeholder='Name'
              className='bg-gray-100 border-0'
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type='password'
              name='password'
              placeholder='Password'
              className='bg-gray-100 border-0'
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <Input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              className='bg-gray-100 border-0'
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Role</label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.role}
              name='role'
              disabled={isSubmitting}
            >
              <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                <SelectValue placeholder='Select Role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='user'>User</SelectItem>
                <SelectItem value='operator'>Operator</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-center'>
            <Button
              type='submit'
              onClick={handleSubmit}
              className='mt-4 hover:bg-[#4971A9]/90 cursor-pointer w-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
