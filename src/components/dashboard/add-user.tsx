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

export default function AddNewUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    try {
      const res = await fetch(
        'https://7abe-118-99-81-224.ngrok-free.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            role: formData.role,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('User registered successfully!');
        // Optional: reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
      } else {
        alert(`Error: ${data.message || 'Failed to register'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
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
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 px-3 py-2 text-muted-foreground cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
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
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 px-3 py-2 text-muted-foreground cursor-pointer'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          <div>
            <label>Role</label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='nurse'>Nurse</SelectItem>
                <SelectItem value='doctor'>Doctor</SelectItem>
                <SelectItem value='oralSurgeon'>Oral Surgeon</SelectItem>
                <SelectItem value='research'>Research</SelectItem>
                <SelectItem value='operator'>Operator</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-center'>
            <Button
              type='submit'
              className='mt-4 hover:bg-[#4971A9]/90 cursor-pointer w-50'
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
