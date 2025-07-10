'use client';

import { useState, type FormEvent, useEffect, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { uploadNews } from '@/lib/api/upload-news';
import { NewsPayload } from '@/types/news';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';

export default function CleftLipPatientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsPayload>({
    title: '',
    image: '',
    source: '',
    content: '',
    status: 'draft', // Default value
  });
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    if (files && files[0]) {
      const file = files[0];
      const isImage = file.type.startsWith('image/');
      if (isImage) {
        setNewsImage(file);
        setPreviewImage(URL.createObjectURL(file));
        setError('');
      } else {
        setError('Hanya file gambar yang diperbolehkan');
        setNewsImage(null);
        setPreviewImage(null);
      }
    }
  };

  const removeFile = () => {
    setNewsImage(null);
    setPreviewImage(null);
  };

  const handleDragEvents = (
    e: DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (
      !formData.title ||
      !formData.source ||
      !formData.content ||
      !newsImage
    ) {
      Swal.fire(
        'Error!',
        'Please fill out all fields and upload an image.',
        'error'
      );
      setLoading(false);
      return;
    }

    try {
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      await uploadNews(token, formData, [newsImage]);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'News has been uploaded successfully.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push('/browse-news');
      });
    } catch (error: any) {
      setError(error.message || 'Gagal mengupload data. Silakan coba lagi.');
      Swal.fire('Error!', error.message || 'Something went wrong.', 'error');
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
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className='px-6 pb-6'>
          <form id='cleft-lip-form' onSubmit={onSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label
                htmlFor='title'
                className='text-sm font-medium text-gray-700'
              >
                Title
              </label>
              <Input
                type='text'
                id='title'
                name='title'
                className='bg-gray-100 border-0'
                value={formData.title}
                onChange={handleChange}
                placeholder='Enter news title'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='source'
                    className='text-sm font-medium text-gray-700'
                  >
                    Source
                  </label>
                  <Input
                    type='text'
                    id='source'
                    name='source'
                    className='bg-gray-100 border-0'
                    value={formData.source}
                    onChange={handleChange}
                    placeholder='Enter news source'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='status'
                    className='text-sm font-medium text-gray-700'
                  >
                    Status
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                    name='status'
                    value={formData.status}
                  >
                    <SelectTrigger className='bg-gray-100 border-0 w-full cursor-pointer'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>
                  News Image
                </label>
                <div
                  className={cn(
                    'relative border-2 border-dashed border-[#4971A9] bg-[#4971A9]/11 rounded-lg p-4 h-28 flex justify-center items-center transition-colors',
                    isDragging && 'bg-blue-200 border-blue-500'
                  )}
                  onDragEnter={(e) => handleDragEvents(e, true)}
                  onDragLeave={(e) => handleDragEvents(e, false)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className='hidden'
                    id='news-image'
                  />
                  {previewImage ? (
                    <div className='relative w-full h-full'>
                      <Image
                        src={previewImage}
                        alt='News preview'
                        layout='fill'
                        className='object-contain rounded-lg'
                      />
                      <Button
                        type='button'
                        size='sm'
                        variant='destructive'
                        onClick={removeFile}
                        className='absolute top-2 right-2 h-7 w-auto px-2 z-10 cursor-pointer'
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor='news-image'
                      className='flex items-center justify-center gap-2 cursor-pointer w-full h-full'
                    >
                      <Plus className='h-6 w-6 primary-color' />
                      <p className='primary-color text-sm'>
                        Add file{' '}
                        <span className='text-[#868686]'>
                          or drop file here
                        </span>
                      </p>
                    </label>
                  )}
                </div>
                {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
              </div>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='content'
                className='text-sm font-medium text-gray-700'
              >
                Content
              </label>
              <Textarea
                id='content'
                name='content'
                placeholder='Please fill in the content'
                className='bg-gray-100 border-0 min-h-[150px] text-sm'
                value={formData.content}
                onChange={handleTextAreaChange}
                required
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
