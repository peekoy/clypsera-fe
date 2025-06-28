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

export default function EditUserForm() {
  const params = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '', // Inisialisasi kosong, akan diisi dari userData
    email: '', // Inisialisasi kosong, akan diisi dari userData
    password: '',
    confirmPassword: '',
    role: '', // Inisialisasi kosong, akan diisi dari userData
  });

  console.log(formData);

  // Effect untuk mengambil data pengguna
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        return;
      }
      try {
        const user = await getUserById(
          token,
          Number.parseInt(params.id as string)
        );
        if (user) {
          setUserData(user); // Set userData
        } else {
          console.log('User tidak ditemukan');
          // Opsional: Redirect atau tampilkan pesan error
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // Opsional: Handle error loading user data
      }
    };

    fetchUser();
  }, [params.id]); // Tambahkan params.id sebagai dependency

  // Effect untuk memperbarui formData ketika userData berubah
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '', // Jangan mengisi password lama ke form
        confirmPassword: '', // Jangan mengisi confirmPassword lama ke form
        role: userData.role || '',
      });
    }
  }, [userData]); // Bergantung pada userData

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
      // Pastikan Anda mengirimkan data yang benar ke editUser
      // Anda mungkin perlu menyesuaikan argumen editUser tergantung pada API Anda
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Kirim password (meskipun kosong)
        confirmPassword: formData.confirmPassword, // Kirim confirmPassword
        role: formData.role,
      };

      const token = localStorage.getItem('token'); // Pastikan token juga dikirim jika API membutuhkannya
      if (!token) {
        alert('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      await editUser(payload, Number.parseInt(params.id as string), token); // Sesuaikan dengan signature editUser Anda
      alert('Edit User successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
      router.push('/administrator');
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Something went wrong.'}`);
    }
  };

  return (
    <Card className='mx-34 p-0'>
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
            value={formData.name} // Gunakan formData.name
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
            value={formData.email} // Gunakan formData.email
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <Input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            className='bg-gray-100 border-0 '
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <Select
            onValueChange={handleSelectChange}
            value={formData.role} // Gunakan formData.role
            name='role' // Tambahkan atribut name jika diperlukan oleh API Anda
          >
            <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
              <SelectValue placeholder='Select Role' />{' '}
              {/* Perbaiki placeholder */}
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
            onClick={handleSubmit}
            className='mt-4 hover:bg-[#4971A9]/90 cursor-pointer w-50'
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
