import { CheckRequestData } from '@/types/check-request-data';

type ApiRequestItem = {
  id: number;
  nama_pemohon: string;
  email_pemohon: string;
  kategori: {
    kategori: string;
  };
  status_permohonan: string;
  created_at: string;
};

type ApiResponse = {
  data: ApiRequestItem[];
};

export async function getAllRequestData(
  token: string
): Promise<CheckRequestData[] | null> {
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

    const apiResponse: ApiResponse = await res.json();
    const mappedData = apiResponse.data.map((item: ApiRequestItem) => ({
      id: item.id,
      name: item.nama_pemohon,
      email: item.email_pemohon,
      category: item.kategori.kategori,
      status: item.status_permohonan,
      createdAt: item.created_at,
    }));

    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
