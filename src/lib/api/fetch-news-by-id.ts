import { News } from '@/types/news';
import { getAllNews } from './fetch-news';

export async function getNewsById(
  token: string,
  newsId: number
): Promise<News | null> {
  try {
    const allNews = await getAllNews(token);
    if (!allNews) {
      return null;
    }

    const news = allNews.find((n) => n.id === newsId);
    return news || null;
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return null;
  }
}
