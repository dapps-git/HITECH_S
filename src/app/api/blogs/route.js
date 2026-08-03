import { NextResponse } from 'next/server';
import { connectDB, getJsonDb, saveJsonDb } from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHidden = searchParams.get('all') === 'true';

    // 1. Try local Express backend
    try {
      const localRes = await fetch(`http://localhost:5000/api/blogs${includeHidden ? '?all=true' : ''}`, { cache: 'no-store' });
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          return NextResponse.json({ success: true, count: data.blogs.length, blogs: data.blogs });
        }
      }
    } catch (err) {}

    // 2. Try remote Express backend
    const remoteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    try {
      const remoteRes = await fetch(`${remoteUrl}/api/blogs${includeHidden ? '?all=true' : ''}`, { cache: 'no-store' });
      if (remoteRes.ok) {
        const data = await remoteRes.json();
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          return NextResponse.json({ success: true, count: data.blogs.length, blogs: data.blogs });
        }
      }
    } catch (err) {}

    // 3. Fallback MongoDB or JSON db
    const db = await connectDB();
    if (db) {
      const query = includeHidden ? {} : { visibility: 'visible' };
      const blogs = await BlogPost.find(query).sort({ publishDate: -1 }).lean();
      return NextResponse.json({ success: true, count: blogs.length, blogs: JSON.parse(JSON.stringify(blogs)) });
    } else {
      const data = getJsonDb();
      let blogs = data.blogs || [];
      if (!includeHidden) {
        blogs = blogs.filter(b => b.visibility === 'visible' || !b.visibility);
      }
      return NextResponse.json({ success: true, count: blogs.length, blogs });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      title, 
      content, 
      excerpt, 
      featuredImage, 
      visibility, 
      seoTitle, 
      seoDescription, 
      keywords, 
      category, 
      faqs 
    } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const generatedSlug = slugify(title) + '-' + Math.floor(Math.random() * 1000);
    const data = getJsonDb();
    if (!data.blogs) data.blogs = [];

    const newPost = {
      id: `blog-${Date.now()}`,
      _id: `blog-${Date.now()}`,
      title,
      slug: generatedSlug,
      content,
      excerpt: excerpt || title,
      featuredImage: featuredImage || '/images/bg.webp',
      visibility: visibility || 'visible',
      publishDate: new Date().toISOString(),
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || title,
      keywords: keywords || '',
      category: category || 'DPF & Silencer Guides',
      faqs: Array.isArray(faqs) ? faqs : []
    };

    data.blogs.unshift(newPost);
    saveJsonDb(data);

    return NextResponse.json({ success: true, message: 'Blog post created successfully!', blog: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create blog post' }, { status: 500 });
  }
}
