import { RequestDataPayload } from '@/types/check-request-data';

export async function singleRequestData(
  token: string | null,
  payload: RequestDataPayload
) {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const categoryResponse = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/kategori_permohonan',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const categoryData = await categoryResponse.json();
    const matchedCategory = categoryData.data.find(
      (item: any) =>
        item.kategori.toLowerCase() === payload.category.toLowerCase()
    );

    const categoryId = matchedCategory.id;
    const operatorId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('nama_pemohon', payload.name);
    formData.append('email_pemohon', payload.email);
    formData.append('nik_pemohon', payload.nik);
    formData.append('no_telepon', payload.phoneNumber);
    formData.append('alasan_permohonan', payload.purpose);
    formData.append('status_permohonan', 'pending');
    formData.append('katergori_id', categoryId);
    formData.append('operator_id', operatorId ?? '');

    const response = await fetch(
      'https://0b2d-118-99-106-123.ngrok-free.app/api/permohonan/store',
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
