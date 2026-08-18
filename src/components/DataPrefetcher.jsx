'use client';
import { useEffect } from 'react';
import { prefetchHomeData } from '@/lib/apiPrefetch';

export default function DataPrefetcher() {
  useEffect(() => {
    prefetchHomeData();
  }, []);

  return null;
}
