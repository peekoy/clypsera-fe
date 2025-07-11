import { News } from '@/types/news';

export async function getPublishedNews(): Promise<News[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/page/berita`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch news:', res.statusText);
      return null;
    }

    const result = await res.json();
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || '';

    const newsItems: News[] = result.data
      .map((item: any) => {
        let imageUrl = '/artikel1.svg'; // Gambar fallback
        if (item.gambar) {
          // 1. Membersihkan base URL dari slash di akhir
          const cleanedBaseUrl = baseUrl.endsWith('/')
            ? baseUrl.slice(0, -1)
            : baseUrl;

          // 2. Membersihkan path gambar dari slash di awal
          const cleanedImagePath = item.gambar.startsWith('/')
            ? item.gambar.slice(1)
            : item.gambar;

          let finalUrl = `${cleanedBaseUrl}/${cleanedImagePath}`;

          // 3. Memperbaiki masalah ekstensi ganda (.jpg.jpg)
          const extensions = ['.jpg', '.jpeg', '.png', '.svg'];
          for (const ext of extensions) {
            if (finalUrl.endsWith(ext + ext)) {
              finalUrl = finalUrl.slice(0, -ext.length);
              break;
            }
          }
          imageUrl = finalUrl;
        }

        return {
          id: item.id,
          title: item.judul,
          image: imageUrl,
          source: item.sumber,
          status: item.status,
          content: item.content,
        };
      })
      .filter((news: News) => news.status === 'published');

    return newsItems;
  } catch (error) {
    console.error('Error fetching published news:', error);
    return null;
  }
}
