import React from 'react';
import { getAllPosts, postToInsightArticle } from '@/lib/posts';
import { HomePageClient } from '@/components/HomePageClient';

export const revalidate = 300; // ISR 5 menit

export default function Home() {
  const articles = getAllPosts().map(postToInsightArticle);

  return <HomePageClient initialArticles={articles} />;
}
