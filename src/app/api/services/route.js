import { NextResponse } from 'next/server';
import { getJsonDb, saveJsonDb } from '@/lib/db';

export async function GET(request) {
  try {
    // 1. Try local Express backend if running
    try {
      const localRes = await fetch('http://localhost:5000/api/services', { cache: 'no-store' });
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          return NextResponse.json({ success: true, services: data.services });
        }
      }
    } catch (err) {}

    // 2. Try remote Namecheap Express backend
    const remoteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    try {
      const remoteRes = await fetch(`${remoteUrl}/api/services`, { cache: 'no-store' });
      if (remoteRes.ok) {
        const data = await remoteRes.json();
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          return NextResponse.json({ success: true, services: data.services });
        }
      }
    } catch (err) {}

    // 3. Fallback to local JSON DB
    const jsonDb = getJsonDb();
    const services = jsonDb.services || [];
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, desc, icon, link, order, visible } = body;

    if (!title || !desc) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }

    const data = getJsonDb();
    if (!data.services) data.services = [];

    const newService = {
      id: `svc-${Date.now()}`,
      title,
      desc,
      icon: icon || 'FaWrench',
      link: link || '#contact',
      order: Number(order) || (data.services.length + 1),
      visible: visible !== undefined ? Boolean(visible) : true
    };

    data.services.push(newService);
    saveJsonDb(data);

    return NextResponse.json({
      success: true,
      message: 'Service added successfully!',
      service: newService
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add service' }, { status: 500 });
  }
}
