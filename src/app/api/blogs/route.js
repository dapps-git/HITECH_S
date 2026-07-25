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

// GET /api/blogs -> Fetch all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHidden = searchParams.get('all') === 'true';

    const db = await connectDB();

    if (db) {
      const query = includeHidden ? {} : { visibility: 'visible' };
      const blogs = await BlogPost.find(query).sort({ publishDate: -1 });
      return NextResponse.json({ success: true, count: blogs.length, blogs });
    } else {
      // Fallback JSON Storage
      const data = getJsonDb();
      let blogs = data.blogs || [];
      if (!includeHidden) {
        blogs = blogs.filter(b => b.visibility === 'visible');
      }
      return NextResponse.json({ success: true, count: blogs.length, blogs });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blogs -> Create new blog post
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
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const generatedSlug = slugify(title) + '-' + Math.floor(Math.random() * 1000);

    const db = await connectDB();

    if (db) {
      const newPost = await BlogPost.create({
        title,
        slug: generatedSlug,
        content,
        excerpt: excerpt || title,
        featuredImage: featuredImage || '/images/bg.webp',
        visibility: visibility || 'visible',
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || title,
        keywords: keywords || '',
        category: category || 'DPF & Silencer Guides',
        faqs: Array.isArray(faqs) ? faqs : []
      });

      return NextResponse.json({ success: true, message: 'Blog post created successfully!', blog: newPost }, { status: 201 });
    } else {
      // Fallback JSON Storage
      const data = getJsonDb();
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
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create blog post' }, { status: 500 });
  }
}
