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
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getUserProfile } from '@/lib/api/fetch-profile';
import { uploadNews } from '@/lib/api/upload-news';
import { News } from '@/types/news';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    source: '',
    content: '',
  });
  const [newsImage, setNewsImage] = useState<File[]>([]);
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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);

      // Validate file types
      const validFiles = fileArray.filter((file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          setError('Hanya file gambar yang diperbolehkan');
          return false;
        }
        return true;
      });

      setNewsImage((prev) => [...prev, ...validFiles]);
    }
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!token) {
        alert('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      await uploadNews(token, formData, newsImage); // Sesuaikan dengan signature editUser Anda
      alert('upload data successfully!');

      router.refresh;

      // Reset form
      // resetForm();
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative flex justify-center p-4 z-10'>
      <Card className='w-200 p-0'>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-xl font-medium'>
              Upload Cleft Lip News
            </CardTitle>
            <Button
              type='submit'
              form='cleft-lip-form'
              className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
            >
              Post
            </Button>
          </div>
        </CardHeader>
        <CardContent className='px-6 pb-6'>
          <form id='cleft-lip-form' onSubmit={onSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='title'
                  className='text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <Input
                  type='text'
                  name='title'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='source'
                  className='text-sm font-medium text-gray-700'
                >
                  Source
                </label>
                <Input
                  type='text'
                  name='source'
                  className='bg-gray-100 border-0 disabled:opacity-100'
                  value={formData.source}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>
                    News Image
                  </label>
                  <div className='border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-8 text-center'>
                    <input
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className='hidden'
                      id='before-surgery'
                      name='beforeSurgery'
                    />
                    <label
                      htmlFor='before-surgery'
                      className='flex items-center justify-center gap-2 cursor-pointer'
                    >
                      <Plus className='h-6 w-6 primary-color' />
                      <p className='primary-color text-sm'>
                        Add files{' '}
                        <span className='text-[#868686]'>
                          or drop files here
                        </span>
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-1 gap-4 mb-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='content'
                  className='text-sm font-medium text-gray-700'
                >
                  Content
                </label>
                <Textarea
                  name='content'
                  placeholder='Please fill in the content'
                  className='bg-gray-100 border-0 min-h-[100px] text-sm'
                  value={formData.content}
                  onChange={handleTextAreaChange}
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
