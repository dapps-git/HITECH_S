import { NextResponse } from 'next/server';
import { connectDB, getJsonDb, saveJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';

// Default static products seed list
const seedProducts = [
  {
    id: 'prod-1',
    title: 'PASSENGER CAR SILENCERS',
    image: '/images/prod_passenger_car.png',
    iconType: 'car',
    category: 'Passenger Cars',
    desc: 'High performance silencers for all passenger cars. Built for durability and perfect fit.',
    spec: 'Galvanised / Stainless Steel 1.6mm'
  },
  {
    id: 'prod-2',
    title: 'SUV & PICKUP SILENCERS',
    image: '/images/prod_suv_pickup.png',
    iconType: 'suv',
    category: 'SUV & Pickup',
    desc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance.',
    spec: 'Heavy Duty 2.0mm Steel'
  },
  {
    id: 'prod-3',
    title: 'LCV SILENCERS',
    image: '/images/prod_lcv.png',
    iconType: 'lcv',
    category: 'Commercial LCV',
    desc: 'OEM specification silencers for Light Commercial Vehicles. Strong. Reliable. Long lasting.',
    spec: 'OEM Grade Flange Fitment'
  },
  {
    id: 'prod-4',
    title: 'TRUCK & BUS SILENCERS',
    image: '/images/prod_truck_bus.png',
    iconType: 'truck',
    category: 'Heavy Commercial',
    desc: 'Heavy duty silencers for trucks and buses. Built for high performance and extended life.',
    spec: 'Industrial Heavy Drum Assembly'
  },
  {
    id: 'prod-5',
    title: 'CATALYTIC CONVERTERS',
    image: '/images/prod_catalytic.png',
    iconType: 'catalytic',
    category: 'Emission Control',
    desc: 'High quality catalytic converters for reduced emissions and better engine performance.',
    spec: 'Metallic Honeycomb Core'
  },
  {
    id: 'prod-6',
    title: 'DPF / DOC / SCR SERVICES',
    image: '/images/prod_dpf_service.png',
    iconType: 'service',
    category: 'DPF Restoration',
    desc: 'Professional DPF cleaning, restoration & replacement services with advanced technology.',
    spec: '98%+ Soot & Ash Removal'
  }
];

// GET /api/products -> Get list of products (combines default + dynamic MongoDB items)
export async function GET() {
  try {
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
      count: seedProducts.length + dynamicProducts.length,
      products: dynamicProducts,
      seedProducts
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products -> Add new product
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, desc, image, iconType, spec } = body;

    if (!title || !desc || !image) {
      return NextResponse.json(
        { success: false, error: 'Title, description and product image are required' },
        { status: 400 }
      );
    }

    const db = await connectDB();

    if (db) {
      const newProd = await Product.create({
        title: title.toUpperCase(),
        category: category || 'OEM Silencers',
        image,
        iconType: iconType || 'car',
        desc,
        spec: spec || 'OEM Specification'
      });

      return NextResponse.json({
        success: true,
        message: 'Product created successfully in MongoDB!',
        product: newProd
      }, { status: 201 });
    } else {
      const data = getJsonDb();
      const newProd = {
        id: `prod-${Date.now()}`,
        _id: `prod-${Date.now()}`,
        title: title.toUpperCase(),
        category: category || 'OEM Silencers',
        image,
        iconType: iconType || 'car',
        desc,
        spec: spec || 'OEM Specification',
        createdAt: new Date().toISOString()
      };

      data.products.unshift(newProd);
      saveJsonDb(data);

      return NextResponse.json({
        success: true,
        message: 'Product created successfully in local database!',
        product: newProd
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
