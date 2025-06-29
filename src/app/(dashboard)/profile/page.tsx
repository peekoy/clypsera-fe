'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { uploadPatientData } from '@/lib/api/upload-patient';
import { useRouter } from 'next/navigation';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    congenitalComorbidities: '',
    whichChild: 0,
    dateOfBirth: '',
    patientGender: '',
    dateOfSurgery: '',
    patientAge: 0,
    operationTechnique: '',
    patientAddress: '',
    providerName: '',
    ethnicity: '',
    surgeryLocation: '',
    motherPregnancyHistory: '',
    familyHistory: '',
    residentsMaritalHistory: '',
    previousMedicalHistory: '',
    followUp: '',
    cleftPalateType: '',
    therapyType: '',
    diagnosis: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // await uploadPatientData(
      //   token,
      //   formData,
      // );

      alert('Data pasien berhasil diupload!');
      router.push('/my-data');

      // Reset form
      // resetForm();
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative p-4 z-10'>
      <Card className='w-full p-0'>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'></CardHeader>
        <CardContent className='px-6 pb-6'>
          <form id='cleft-lip-form' onSubmit={onSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                  className='bg-gray-100 border-0'
                  value={formData.patientName}
                  onChange={handleChange}
                  required
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
                  className='bg-gray-100 border-0'
                  value={formData.congenitalComorbidities}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-6'>
                <Button>Edit</Button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='patientGender'
                  className='text-sm font-medium text-gray-700'
                >
                  Gender
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, patientGender: value })
                  }
                  name='patientGender'
                >
                  <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                    <SelectValue placeholder='Female' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='P'>Female</SelectItem>
                    <SelectItem value='L'>Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='dateOfSurgery'
                  className='text-sm font-medium text-gray-700'
                >
                  Birthdate
                </label>
                <Input
                  type='date'
                  name='dateOfSurgery'
                  className='bg-gray-100 border-0'
                  value={formData.dateOfSurgery}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                  className='bg-gray-100 border-0'
                  value={formData.patientAge}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                  className='bg-gray-100 border-0'
                  value={formData.patientAge}
                  onChange={handleChange}
                  required
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
                  className='bg-gray-100 border-0'
                  value={formData.patientAge}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-6'>
                <Button>Edit</Button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='alamat'
                  className='text-sm font-medium text-gray-700'
                >
                  Alamat
                </label>
                <Input
                  type='text'
                  name='alamat'
                  className='bg-gray-100 border-0'
                  value={formData.patientAge}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
