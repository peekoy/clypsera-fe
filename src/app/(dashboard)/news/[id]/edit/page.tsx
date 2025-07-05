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
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import type { News, EditNewsPayload } from '@/types/news';
import { getNewsById } from '@/lib/api/fetch-news-by-id';
import { useParams, useRouter } from 'next/navigation';
import { editNews } from '@/lib/api/edit-news';

export default function EditNewsForm() {
  const params = useParams();
  const router = useRouter();
  const [newsData, setNewsData] = useState<News | null>(null);
  const [newsImage, setNewsImage] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EditNewsPayload>({
    title: '',
    source: '',
    content: '',
    status: '',
    image: '',
  });

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan');
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
        } else {
          console.log('Berita tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      await editNews(
        formData,
        Number.parseInt(params.id as string),
        token,
        newsImage
      );
      alert('Edit Berita berhasil!');
      router.push('/browse-news');
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Terjadi kesalahan.'}`);
    }
  };

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
              onClick={handleSubmit}
              className='bg-primary hover:bg-[#4971A9]/90 cursor-pointer text-white px-6'
            >
              Update
            </Button>
          </div>
        </CardHeader>
        <CardContent className='px-6 pb-6'>
          <form
            id='cleft-lip-form'
            onSubmit={handleSubmit}
            className='space-y-6'
          >
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
                      <SelectValue placeholder='Draft' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      id='news-image'
                      name='newsImage'
                    />
                    <label
                      htmlFor='news-image'
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
