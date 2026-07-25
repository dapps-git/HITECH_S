import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

function getDbData() {
  try {
    const fileContent = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], enquiries: [], bookings: [] };
  }
}

function saveDbData(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    return false;
  }
}

// GET /api/enquiries -> Get all enquiry submissions
export async function GET() {
  const data = getDbData();
  return NextResponse.json({
    success: true,
    count: data.enquiries.length,
    enquiries: data.enquiries
  });
}

// POST /api/enquiries -> Submit new customer enquiry
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, product } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const data = getDbData();
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      name: name || 'Customer',
      phone,
      email: email || '',
      message: message || '',
      product: product || 'General Enquiry',
      createdAt: new Date().toISOString()
    };

    data.enquiries.push(newEnquiry);
    saveDbData(data);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! Our team will contact you shortly.',
      enquiry: newEnquiry
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
