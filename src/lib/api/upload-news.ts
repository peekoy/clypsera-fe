import { NewsPayload } from '@/types/news';

export async function uploadNews(
  token: string | null,
  payload: NewsPayload,
  image: File[]
) {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const operatorId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('judul', payload.title);
    formData.append('sumber', payload.source);
    formData.append('status', 'draft');
    formData.append('content', payload.content);
    formData.append('user_id', operatorId ?? '');

    if (image[0]) {
      formData.append('gambar', image[0]);
    }

    // console.log('Data yang dikirim:', dataToSend);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/page/berita`,
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('API Error Response:', result);
      throw new Error(result.message || 'Gagal upload data');
    }

    console.log('Upload successful:', result);
    return result;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Terjadi kesalahan saat mengupload data.');
  }
}
