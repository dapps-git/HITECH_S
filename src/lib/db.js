import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;

// Global cache for Mongoose connection in development
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    // Return null to trigger fallback JSON database storage when live MongoDB URI is pending
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

// Fallback JSON DB helper for offline/local storage
const fallbackDbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

export function getJsonDb() {
  try {
    if (!fs.existsSync(fallbackDbPath)) {
      return { products: [], enquiries: [], bookings: [], blogs: [] };
    }
    const content = fs.readFileSync(fallbackDbPath, 'utf8');
    const parsed = JSON.parse(content);
    if (!parsed.blogs) parsed.blogs = [];
    return parsed;
  } catch (err) {
    return { products: [], enquiries: [], bookings: [], blogs: [] };
  }
}

export function saveJsonDb(data) {
  try {
    fs.writeFileSync(fallbackDbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
}
