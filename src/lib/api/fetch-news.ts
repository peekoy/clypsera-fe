import { News } from '@/types/news';

type ApiNewsItem = {
  id: number;
  judul: string;
  gambar: string;
  sumber: string;
  status: string;
  content: string;
};

type ApiResponse = {
  data: ApiNewsItem[];
};

export async function getAllNews(token: string): Promise<News[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/page/berita`,
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
    const mappedData = apiResponse.data.map((item: ApiNewsItem) => ({
      id: item.id,
      title: item.judul,
      image: item.gambar,
      source: item.sumber,
      status: item.status,
      content: item.content,
    }));

    console.log('yaya', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
