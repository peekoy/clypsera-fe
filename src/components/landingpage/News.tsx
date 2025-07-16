'use client';

import { useState, useEffect } from 'react';
import CardNews from '../cards/Card-News';
import { getPublishedNews } from '@/lib/api/fetch-published-news';
import type { News as NewsType } from '@/types/news';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articlesPerPage, setArticlesPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setArticlesPerPage(1);
      } else if (screenWidth <= 1024) {
        setArticlesPerPage(2);
      } else {
        setArticlesPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const fetchedNews = await getPublishedNews();
        if (fetchedNews) {
          setNews(fetchedNews);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : news.length - articlesPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < news.length - articlesPerPage ? prev + 1 : prev
    );
  };

  const NewsSkeleton = () => (
    <div className='flex gap-6 justify-center pb-4 items-center w-full'>
      {[...Array(articlesPerPage)].map((_, i) => (
        <div
          key={i}
          className='md:h-100 lg:h-120 xl:h-140 bg-white w-full md:w-1/2 lg:w-1/3 py-0 shadow-md flex flex-col gap-4 p-4 border rounded-lg'
        >
          <Skeleton className='h-60 w-full' />
          <div className='flex flex-col gap-4 px-6 pt-4'>
            <Skeleton className='h-6 w-3/4' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='flex flex-col items-center md:mb-10 lg:mb-20 2xs:gap-2 md:gap-4 lg:gap-8 xl:gap-12 z-10 w-full'>
      <p className='4xs:text-[16px] 2xs:text-lg md:text-3xl lg:text-4xl xl:text-5xl primary-color font-bold'>
        Latest News
      </p>
      <p className='4xs:text-[14px] 2xs:text-[12px] md:text-[16px] lg:text-[24px] xl:text-[32px] font-semibold text-center'>
        Explore the latest research and updates related to cleft lip and palate.
      </p>

      <div
        className='relative w-full flex items-center justify-center'
        style={{ maxWidth: '1200px' }}
      >
        {loading ? (
          <NewsSkeleton />
        ) : news.length > 0 ? (
          <>
            <Button
              onClick={handlePrev}
              variant='outline'
              size='icon'
              className='absolute left-0 2xs:-translate-x-4 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 z-20 bg-white/80 hover:bg-white shadow-md'
              disabled={currentIndex === 0}
            >
              <ChevronLeft className='h-6 w-6' />
            </Button>

            <div className='w-full overflow-hidden'>
              <div
                className='flex transition-transform duration-500 ease-in-out'
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / articlesPerPage)
                  }%)`,
                }}
              >
                {news.map((article) => (
                  <div
                    key={article.id}
                    className='h-full'
                    style={{
                      flex: `0 0 ${100 / articlesPerPage}%`,
                    }}
                  >
                    <div className='px-3 h-full'>
                      <CardNews
                        id={article.id}
                        image={article.image || '/artikel1.svg'}
                        title={article.title}
                        source={article.source}
                        description={article.content}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNext}
              variant='outline'
              size='icon'
              className='absolute right-0 2xs:translate-x-4 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 z-20 bg-white/80 hover:bg-white shadow-md'
              disabled={currentIndex >= news.length - articlesPerPage}
            >
              <ChevronRight className='h-6 w-6' />
            </Button>
          </>
        ) : (
          <div className='my-20 flex items-center'>
            <p>No published news available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
