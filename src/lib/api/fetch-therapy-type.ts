import type { TherapyType } from '@/types/therapy';

export async function getTherapyType(
  token: string
): Promise<TherapyType[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/jenis-terapi`,
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
    console.log(data);
    data = data.data.map((item: any) => ({
      id: item.id,
      therapyName: item.nama_terapi,
      therapyDesc: item.deskripsi_terapi,
    }));
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
