import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'zkgbtcke',
  api_key: process.env.CLOUDINARY_API_KEY || '976169123815675',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'C2xiAGARCxSJTImhnoKwNAr_PR8'
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with WebP conversion & auto-quality optimization
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'hitech_products',
          format: 'webp',
          quality: 'auto',
          fetch_format: 'webp'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      message: 'Image uploaded and converted to WebP successfully!',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload image to Cloudinary' }, { status: 500 });
  }
}
