import { EditNewsPayload } from '@/types/news';

export async function editNews(
  payload: EditNewsPayload,
  newsId: number,
  token: string,
  image: File[]
) {
  const operatorId = localStorage.getItem('userId');
  const formData = new FormData();
  formData.append('judul', payload.title);
  formData.append('sumber', payload.source);
  formData.append('status', payload.status);
  formData.append('content', payload.content);
  formData.append('user_id', operatorId ?? '');

  if (image[0]) {
    formData.append('gambar', image[0]);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/page/berita/${newsId}?_method=PATCH`,
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Gagal mengedit berita');
  }

  return data;
}
