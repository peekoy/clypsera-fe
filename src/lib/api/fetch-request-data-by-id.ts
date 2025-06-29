import { RequestDataById } from '@/types/check-request-data';

export async function getRequestDataById(
  token: string,
  requestId: number
): Promise<RequestDataById | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan/find/${requestId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to fetch users:', res.status, text);
      return null;
    }

    if (!contentType?.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON but got:', text);
      return null;
    }

    let data = await res.json();
    data = data.data;
    console.log('data user', data);
    return {
      name: data.nama_pemohon,
      email: data.email_pemohon,
      nik: data.nik_pemohon,
      phoneNumber: data.no_telepon,
      category: data.kategori.kategori,
      purpose: data.alasan_permohonan,
      status: data.status_permohonan,
      createdAt: data.created_at,
      requestOperationId: data.operasi_id,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
