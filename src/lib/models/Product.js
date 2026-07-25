import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General Silencer' },
  image: { type: String, required: true },
  iconType: { type: String, enum: ['car', 'suv', 'lcv', 'truck', 'catalytic', 'service'], default: 'car' },
  desc: { type: String, required: true },
  spec: { type: String, default: 'OEM Specification' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
