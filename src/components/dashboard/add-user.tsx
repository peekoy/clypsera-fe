'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Lock, User, EyeOff, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addUser } from '@/lib/api/add-user';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AddNewUserForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all fields!',
        });
        setIsLoading(false);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirm Password do not match',
      });
      setIsLoading(false);
      return;
    }

    try {
      await addUser(formData);
      setIsLoading(true); // Menonaktifkan input setelah sukses
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User registered successfully!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push('/administrator');
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Something went wrong.',
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-34 p-0'>
      <form onSubmit={handleSubmit}>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <CardTitle className='text-2xl font-bold'>
                New User Registration
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-2 py-6'>
          <div>
            <label htmlFor='name'>Applicant's full name</label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
              className='bg-gray-100 border-0'
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Input
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className='bg-gray-100 border-0'
              required
              disabled={isLoading}
            />
          </div>
          <div className='relative'>
            <label htmlFor='password'>Password</label>
            <div className='flex items-center'>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='bg-gray-100 border-0'
                required
                disabled={isLoading}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 px-3 py-2 text-muted-foreground cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
                <span className='sr-only'>
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
          </div>
          <div className='relative'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className='flex items-center'>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm Password'
                className='bg-gray-100 border-0'
                required
                disabled={isLoading}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 px-3 py-2 text-muted-foreground cursor-pointer'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
                <span className='sr-only'>
                  {showConfirmPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
          </div>
          <div>
            <label>Role</label>
            <Select
              onValueChange={handleSelectChange}
              name='role'
              disabled={isLoading}
            >
              <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className='cursor-pointer' value='user'>
                  User
                </SelectItem>
                <SelectItem className='cursor-pointer' value='operator'>
                  Operator
                </SelectItem>
                <SelectItem className='cursor-pointer' value='admin'>
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-center'>
            <Button
              type='submit'
              className='mt-4 hover:bg-[#4971A9]/90 cursor-pointer w-50'
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
