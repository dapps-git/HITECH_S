import { NextResponse } from 'next/server';
import { connectDB, getJsonDb, saveJsonDb } from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

// GET /api/blogs/[id] -> Fetch single blog post by ID or Slug
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (db) {
      const post = await BlogPost.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }]
      });

      if (!post) {
        return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, blog: post });
    } else {
      const data = getJsonDb();
      const post = (data.blogs || []).find(b => b.id === id || b._id === id || b.slug === id);
      if (!post) {
        return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog: post });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// PUT /api/blogs/[id] -> Update blog post
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await connectDB();

    if (db) {
      const updated = await BlogPost.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ success: true, message: 'Blog post updated', blog: updated });
    } else {
      const data = getJsonDb();
      const idx = (data.blogs || []).findIndex(b => b.id === id || b._id === id);
      if (idx === -1) {
        return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
      }

      data.blogs[idx] = { ...data.blogs[idx], ...body, updatedAt: new Date().toISOString() };
      saveJsonDb(data);
      return NextResponse.json({ success: true, message: 'Blog post updated', blog: data.blogs[idx] });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] -> Delete blog post
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (db) {
      await BlogPost.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Blog post deleted' });
    } else {
      const data = getJsonDb();
      data.blogs = (data.blogs || []).filter(b => b.id !== id && b._id !== id);
      saveJsonDb(data);
      return NextResponse.json({ success: true, message: 'Blog post deleted' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete blog post' }, { status: 500 });
  }
}
