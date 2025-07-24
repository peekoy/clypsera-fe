import { RequestDataById } from '@/types/check-request-data';

export async function getRequestDataById(
  token: string,
  requestId: number
): Promise<RequestDataById | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/permohonan`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to fetch request list:', res.status, text);
      return null;
    }

    const result = await res.json();
    if (!result || !Array.isArray(result.data)) {
      console.error('Expected an array of requests, but got:', result);
      return null;
    }

    const data = result.data.find((item: any) => item.id === requestId);

    if (!data) {
      console.error(`Request with ID ${requestId} not found in the list.`);
      return null;
    }

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
    console.error('Error in getRequestDataById:', error);
    return null;
  }
}
