import { NextResponse } from 'next/server';
import { connectDB, getJsonDb, saveJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';

const defaultCatalogProducts = [
  {
    id: 'prod-1',
    title: 'CAR SILENCERS',
    category: 'PASSENGER CARS',
    image: '/images/prod_passenger_car.png',
    shortDesc: 'High performance OEM specification silencers for all passenger cars. Built for maximum durability.',
    spec: '1.6mm Galvanised Sheets or Pipe'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    category: 'SUV & PICKUP',
    image: '/images/prod_suv_pickup.png',
    shortDesc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance and acoustic dampening.',
    spec: '2.0mm Galvanised Sheets or Pipe'
  },
  {
    id: 'prod-3',
    title: 'COMMERCIAL VEHICLE SILENCERS',
    category: 'COMMERCIAL LCV',
    image: '/images/prod_truck_bus.png',
    shortDesc: 'Heavy duty silencers for LCVs, trucks, and commercial fleet vehicles with OEM precision fitment.',
    spec: 'OEM Grade Flange Fitment'
  },
  {
    id: 'prod-4',
    title: 'GENERATOR SILENCERS',
    category: 'SPECIALIZED SILENCERS',
    image: '/images/prod_lcv.png',
    shortDesc: 'Precision generator silencers engineered for consistent flow dynamics, low backpressure and long service life.',
    spec: 'Industrial Heavy Drum Assembly'
  },
  {
    id: 'prod-5',
    title: 'CUSTOM SILENCERS',
    category: 'CUSTOM FABRICATION',
    image: '/images/prod_catalytic.png',
    shortDesc: 'Bespoke custom-built silencers tailored to exact vehicle specifications and customer performance requirements.',
    spec: 'Custom Flange & Baffle Tuning'
  },
  {
    id: 'prod-6',
    title: 'EXHAUST FLEXIBLE BELLOWS',
    category: 'FLEXIBLE COMPONENTS',
    image: '/images/prod_bellows.png',
    shortDesc: 'Premium Stainless Steel Flexible Bellows for Automotive & Industrial Applications.',
    spec: 'High-Grade Stainless Steel'
  }
];

export async function GET() {
  try {
    // 1. Try local Express backend
    try {
      const localRes = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          return NextResponse.json({ success: true, products: data.products, defaultCatalogProducts });
        }
      }
    } catch (err) {}

    // 2. Try remote Express backend
    const remoteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    try {
      const remoteRes = await fetch(`${remoteUrl}/api/products`, { cache: 'no-store' });
      if (remoteRes.ok) {
        const data = await remoteRes.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          return NextResponse.json({ success: true, products: data.products, defaultCatalogProducts });
        }
      }
    } catch (err) {}

    // 3. Try MongoDB or JSON DB
    const db = await connectDB();
    let dynamicProducts = [];
    if (db) {
      dynamicProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
      dynamicProducts = JSON.parse(JSON.stringify(dynamicProducts));
    } else {
      const jsonDb = getJsonDb();
      dynamicProducts = jsonDb.products || [];
    }

    return NextResponse.json({
      success: true,
      products: dynamicProducts.length > 0 ? dynamicProducts : defaultCatalogProducts,
      defaultCatalogProducts
    });
  } catch (error) {
    return NextResponse.json({ success: true, products: defaultCatalogProducts });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, desc, shortDesc, fullDesc, image, spec } = body;

    if (!title || (!desc && !shortDesc)) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }

    const data = getJsonDb();
    if (!data.products) data.products = [];

    const newProd = {
      id: `prod-${Date.now()}`,
      _id: `prod-${Date.now()}`,
      title: title.toUpperCase(),
      category: category || 'General Silencer',
      image: image || '/images/prod_passenger_car.png',
      spec: spec || 'OEM Specification',
      shortDesc: shortDesc || desc || 'High performance OEM specification silencer built for maximum durability.',
      fullDesc: fullDesc || desc || shortDesc || 'High performance OEM specification silencer engineered with precision.',
      desc: desc || shortDesc || 'High performance OEM specification silencer.'
    };

    data.products.unshift(newProd);
    saveJsonDb(data);

    return NextResponse.json({ success: true, message: 'Product created', product: newProd }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
