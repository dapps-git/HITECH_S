const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';

export const globalCache = {
  products: null,
  services: null,
  blogs: null,
  promises: {}
};

export async function fetchProductsApi() {
  if (globalCache.products) return globalCache.products;
  if (globalCache.promises.products) return globalCache.promises.products;

  const urlsToTry = [
    'http://localhost:5000/api/products',
    '/api/products',
    `${API_URL}/api/products`
  ];

  globalCache.promises.products = (async () => {
    for (const url of urlsToTry) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
        clearTimeout(tid);
        if (!res.ok) continue;

        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          globalCache.products = data.products;
          return data.products;
        }
      } catch (err) {}
    }
    return null;
  })();

  return globalCache.promises.products;
}

export async function fetchServicesApi() {
  if (globalCache.services) return globalCache.services;
  if (globalCache.promises.services) return globalCache.promises.services;

  const urlsToTry = [
    'http://localhost:5000/api/services',
    '/api/services',
    `${API_URL}/api/services`
  ];

  globalCache.promises.services = (async () => {
    for (const url of urlsToTry) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
        clearTimeout(tid);
        if (!res.ok) continue;

        const data = await res.json();
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          globalCache.services = data.services;
          return data.services;
        }
      } catch (err) {}
    }
    return null;
  })();

  return globalCache.promises.services;
}

export async function fetchBlogsApi() {
  if (globalCache.blogs) return globalCache.blogs;
  if (globalCache.promises.blogs) return globalCache.promises.blogs;

  const urlsToTry = [
    'http://localhost:5000/api/blogs',
    '/api/blogs',
    `${API_URL}/api/blogs`
  ];

  globalCache.promises.blogs = (async () => {
    for (const url of urlsToTry) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
        clearTimeout(tid);
        if (!res.ok) continue;

        const data = await res.json();
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          globalCache.blogs = data.blogs;
          return data.blogs;
        }
      } catch (err) {}
    }
    return null;
  })();

  return globalCache.promises.blogs;
}

export function prefetchHomeData() {
  if (typeof window === 'undefined') return;
  // Trigger all 3 API calls in parallel immediately when page loads
  fetchProductsApi();
  fetchServicesApi();
  fetchBlogsApi();
}
