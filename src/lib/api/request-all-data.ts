import { RequestDataPayload } from '@/types/check-request-data';

type ApiCategory = {
  id: number;
  kategori: string;
};

type CategoryApiResponse = {
  data: ApiCategory[];
};

export async function requestAllData(
  token: string | null,
  payload: RequestDataPayload
) {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori_permohonan`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const categoryData: CategoryApiResponse = await categoryResponse.json();
    const matchedCategory = categoryData.data.find(
      (item: ApiCategory) =>
        item.kategori.toLowerCase() === payload.category.toLowerCase()
    );

    if (!matchedCategory) {
      throw new Error(`Category '${payload.category}' not found.`);
    }

    const categoryId = matchedCategory.id;
    const status = 'pending';
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('kategori_id', categoryId.toString());
    formData.append('nama_pemohon', payload.name);
    formData.append('email_pemohon', payload.email);
    formData.append('no_telepon', payload.phoneNumber);
    formData.append('nik_pemohon', payload.nik);
    formData.append('status_permohonan', status);
    formData.append('alasan_permohonan', payload.purpose);
    formData.append('scope', 'semua');
    formData.append('user_id', userId || '');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/store`,
      {
        method: 'POST',
        headers: {
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
      throw new Error(result.message || 'Gagal mengirim permintaan');
    }

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Request error:', err);
    throw new Error(
      err.message || 'Terjadi kesalahan saat mengirim permintaan.'
    );
  }
}
