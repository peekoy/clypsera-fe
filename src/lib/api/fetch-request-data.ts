import { CheckRequestData } from '@/types/check-request-data';

export async function getAllRequestData(
  token: string
): Promise<CheckRequestData[] | null> {
  try {
    const res = await fetch(
      'https://dd13-118-99-106-123.ngrok-free.app/api/permohonan',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    console.log('tes', token);

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
    data = data.data.map((item: any) => ({
      id: item.id,
      name: item.nama_pemohon,
      email: item.email_pemohon,
      category: item.kategori.kategori,
      status: item.status_permohonan,
      createdAt: item.created_at,
    }));
    console.log('yaya', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
