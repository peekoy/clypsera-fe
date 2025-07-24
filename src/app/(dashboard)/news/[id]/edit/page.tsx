'use client';

import { useEffect, useState, type DragEvent } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import type { News, EditNewsPayload } from '@/types/news';
import { getNewsById } from '@/lib/api/fetch-news-by-id';
import { useParams, useRouter } from 'next/navigation';
import { editNews } from '@/lib/api/edit-news';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';

export default function EditNewsForm() {
  const params = useParams();
  const router = useRouter();
  const [newsData, setNewsData] = useState<News | null>(null);
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EditNewsPayload>({
    title: '',
    source: '',
    content: '',
    status: '',
    image: '',
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || '';

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
        setIsLoading(false);
        return;
      }
      try {
        const news = await getNewsById(
          token,
          Number.parseInt(params.id as string)
        );
        if (news) {
          setNewsData(news);
          setFormData({
            title: news.title,
            source: news.source,
            content: news.content,
            status: news.status,
            image: news.image,
          });
          if (news.image) {
            let imageUrl = isValidUrl(news.image)
              ? news.image
              : `${baseUrl}/${news.image.replace(/^\//, '')}`;

            const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif'];
            for (const ext of extensions) {
              if (imageUrl.endsWith(ext + ext)) {
                imageUrl = imageUrl.slice(0, -ext.length);
                break;
              }
            }

            setPreviewImage(imageUrl);
          }
        } else {
          Swal.fire('Error!', 'News data not found.', 'error');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        Swal.fire('Error!', 'Failed to fetch news data.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [params.id, baseUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setNewsImage(file);
        setPreviewImage(URL.createObjectURL(file));
      } else {
        Swal.fire('Error!', 'Please upload a valid image file.', 'error');
      }
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      await editNews(
        formData,
        Number.parseInt(params.id as string),
        token,
        newsImage ? [newsImage] : []
      );

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'News has been updated successfully.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push('/browse-news');
      });
    } catch (error: any) {
      setError(error.message);
      Swal.fire('Error!', error.message || 'Something went wrong.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className='p-6 text-center'>Loading news data...</div>;
  }

  return (
    <div className='relative flex justify-center p-4 z-10'>
      <Card className='w-200 p-0'>
        <CardHeader className='bg-gradient-to-r from-[#4F959D]/78 to-[#4971A9]/78 text-white rounded-lg p-6 gap-0'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-xl font-medium'>
              Edit Cleft Lip News
            </CardTitle>
            <Button
              type='submit'
              form='cleft-lip-form'
              className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className='px-6 pb-6 pt-6'>
          <form
            id='cleft-lip-form'
            onSubmit={handleSubmit}
            className='space-y-6'
          >
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
                    onValueChange={handleSelectChange}
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
                      <label
                        htmlFor='news-image'
                        className='absolute top-2 right-2 z-10'
                      >
                        <Button
                          type='button'
                          size='sm'
                          className='cursor-pointer bg-red-500 hover:bg-red-600 text-white'
                          asChild
                        >
                          <span>Change</span>
                        </Button>
                      </label>
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
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
