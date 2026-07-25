import { NextResponse } from 'next/server';
import { connectDB, getJsonDb, saveJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';

// GET /api/products/[id] -> Fetch single product by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (db) {
      const prod = await Product.findById(id);
      if (!prod) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, product: prod });
    } else {
      const data = getJsonDb();
      const prod = (data.products || []).find(p => p.id === id || p._id === id);
      if (!prod) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, product: prod });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id] -> Update product
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Convert title to uppercase if provided to match POST behavior
    if (body.title) {
      body.title = body.title.toUpperCase();
    }

    const db = await connectDB();

    if (db) {
      const updated = await Product.findByIdAndUpdate(id, body, { new: true });
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Product updated successfully!', product: updated });
    } else {
      const data = getJsonDb();
      const idx = (data.products || []).findIndex(p => p.id === id || p._id === id);
      if (idx === -1) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }

      data.products[idx] = { ...data.products[idx], ...body, updatedAt: new Date().toISOString() };
      saveJsonDb(data);
      return NextResponse.json({ success: true, message: 'Product updated successfully!', product: data.products[idx] });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] -> Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (db) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Product deleted successfully!' });
    } else {
      const data = getJsonDb();
      const originalLength = (data.products || []).length;
      data.products = (data.products || []).filter(p => p.id !== id && p._id !== id);
      
      if (data.products.length === originalLength) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }

      saveJsonDb(data);
      return NextResponse.json({ success: true, message: 'Product deleted successfully!' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
