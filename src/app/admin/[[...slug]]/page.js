import { redirect } from 'next/navigation';

export default async function AdminFallbackPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? resolvedParams.slug.join('/') : '';
  
  const backendUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '') + '/admin'
    : 'http://localhost:5000/admin';

  const targetUrl = slug ? `${backendUrl}/${slug}` : backendUrl;
  redirect(targetUrl);
}
