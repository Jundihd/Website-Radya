import React from 'react';
import { getDuePosts, postToInsightArticle } from '@/lib/posts';
import { HomePageClient } from '@/components/HomePageClient';

export const revalidate = 300; // ISR 5 menit (sekaligus motor scheduling artikel)

export default function Home() {
  // Hanya artikel yang sudah due (termasuk yang terjadwal dan waktunya tiba).
  const articles = getDuePosts().map(postToInsightArticle);

  return <HomePageClient initialArticles={articles} />;
}
