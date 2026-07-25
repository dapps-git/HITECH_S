'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaCar, 
  FaTruck, 
  FaBus, 
  FaCogs, 
  FaWrench, 
  FaShuttleVan, 
  FaCloudUploadAlt,
  FaCheckCircle,
  FaBoxOpen
} from 'react-icons/fa';

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Passenger Cars');
  const [iconType, setIconType] = useState('car');
  const [desc, setDesc] = useState('');
  const [spec, setSpec] = useState('OEM Specification Galvanised Steel');
  const [image, setImage] = useState('');
  
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch product on mount
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success && data.product) {
          setTitle(data.product.title);
          setCategory(data.product.category);
          setIconType(data.product.iconType || 'car');
          setDesc(data.product.desc);
          setSpec(data.product.spec || 'OEM Specification');
          setImage(data.product.image);
        } else {
          alert('Product not found or failed to load');
          router.push('/admin/dashboard');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        alert('Error loading product');
        router.push('/admin/dashboard');
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  // Cloudinary File Upload Handler (Auto WebP Conversion)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImage(data.url);
      } else {
        alert(data.error || 'Failed to upload image to Cloudinary');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  // Submit Product Changes (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !image) {
      alert('Please provide product title, description, and upload a product image.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          iconType,
          desc,
          spec,
          image
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Product updated successfully!');
        router.push('/admin/dashboard');
      } else {
        alert(data.error || 'Failed to update product');
      }
    } catch (err) {
      alert('Error updating product');
    } finally {
      setSaving(false);
    }
  };

  if (loadingProduct) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), sans-serif' }}>
        <p style={{ color: '#475569', fontWeight: '600' }}>Loading product details...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), sans-serif', paddingBottom: '4rem' }}>
      {/* Top Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Link href="/admin/dashboard" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#475569',
          fontSize: '0.85rem',
          fontWeight: '700',
          textDecoration: 'none'
        }}>
          <FaArrowLeft /> Back to Admin Dashboard
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            style={{
              padding: '0.55rem 1.35rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)'
            }}
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '860px', margin: '2rem auto', padding: '0 1.25rem' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <FaBoxOpen size={24} color="#dc2626" />
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: 0, fontFamily: 'var(--font-heading)' }}>
              Edit Product ({title})
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                Product Title (e.g. SEDAN &amp; HATCHBACK DUAL SILENCER)
              </label>
              <input
                type="text"
                placeholder="PASSENGER CAR SILENCERS"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category & Icon Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: '#0f172a'
                  }}
                >
                  <option value="Passenger Cars">Passenger Cars</option>
                  <option value="SUV & Pickup">SUV &amp; Pickup</option>
                  <option value="Commercial LCV">Commercial LCV</option>
                  <option value="Heavy Commercial">Heavy Commercial</option>
                  <option value="Emission Control">Emission Control</option>
                  <option value="DPF Restoration">DPF Restoration</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  Vehicle Icon Badge
                </label>
                <select
                  value={iconType}
                  onChange={e => setIconType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: '#0f172a'
                  }}
                >
                  <option value="car">Passenger Car (Car Icon)</option>
                  <option value="suv">SUV &amp; Pickup (Van Icon)</option>
                  <option value="lcv">LCV Commercial (Truck Icon)</option>
                  <option value="truck">Heavy Truck/Bus (Bus Icon)</option>
                  <option value="catalytic">Catalytic Converter (Cogs Icon)</option>
                  <option value="service">DPF Service (Wrench Icon)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                Description
              </label>
              <textarea
                placeholder="High performance silencers for all passenger cars. Built for durability and perfect fit."
                value={desc}
                onChange={e => setDesc(e.target.value)}
                rows={3}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>

            {/* Specification */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                OEM Specification Note
              </label>
              <input
                type="text"
                placeholder="e.g. Heavy Duty 2.00mm & 1.60mm Galvanised Steel"
                value={spec}
                onChange={e => setSpec(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: '#0f172a'
                }}
              />
            </div>

            {/* Cloudinary Image Upload (Auto WebP Format) */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                Product Image (Upload to Cloudinary - Converts to WebP)
              </label>

              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                marginBottom: '0.75rem'
              }}>
                {image ? (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt="Product Preview"
                      style={{ height: '140px', objectFit: 'contain', margin: '0 auto 0.75rem' }}
                    />
                    <div style={{ fontSize: '0.74rem', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                      <FaCheckCircle /> Stored on Cloudinary in optimized WebP format!
                    </div>
                  </div>
                ) : (
                  <div>
                    <FaCloudUploadAlt size={36} color="#94a3b8" />
                    <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0.5rem 0 0.75rem 0' }}>
                      Upload product image (PNG, JPG, WebP)
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ fontSize: '0.8rem', color: '#475569' }}
                />
                {uploading && <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.5rem' }}>Uploading &amp; compressing to WebP...</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#64748b', marginBottom: '0.2rem' }}>
                  Or Direct Image URL / Path
                </label>
                <input
                  type="text"
                  placeholder="/images/prod_passenger_car.png"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#0f172a'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || uploading}
              style={{
                marginTop: '1rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)'
              }}
            >
              {saving ? 'Saving...' : 'Save Product Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
