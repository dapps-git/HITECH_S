import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';
import { FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

async function getProduct(id) {
  try {
    const db = await connectDB();
    if (db) {
      const product = await Product.findOne({ $or: [{ id }, { _id: id }] }).lean();
      if (product) return JSON.parse(JSON.stringify(product));
    }
    const data = getJsonDb();
    const product = (data.products || []).find(p => p.id === id || p._id === id);
    return product || null;
  } catch (err) {
    const data = getJsonDb();
    return (data.products || []).find(p => p.id === id || p._id === id) || null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found | Hi Quality Silencers',
      description: 'The requested silencer product could not be found.',
    };
  }

  return {
    title: `${product.title} | OEM Silencers | Hi Quality Silencers`,
    description: product.shortDesc || product.desc || product.title,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '5rem' }}>
        {/* Breadcrumb Header */}
        <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2.5rem 1.5rem' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Link href="/products" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ef4444',
              fontSize: '0.82rem',
              fontWeight: '700',
              textDecoration: 'none',
              marginBottom: '1rem'
            }}>
              <FaArrowLeft /> Back to All Products
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {product.category || 'SILENCER MODEL'}
              </span>
              {product.spec && (
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid #334155'
                }}>
                  {product.spec}
                </span>
              )}
            </div>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0.75rem 0 0 0',
              fontFamily: 'var(--font-heading)'
            }}>
              {product.title}
            </h1>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="container" style={{ maxWidth: '1100px', margin: '3rem auto 0', padding: '0 1.25rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Left Column: Image Box */}
            <div>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '340px'
              }}>
                <img
                  src={product.image || '/images/prod_passenger_car.png'}
                  alt={product.title}
                  style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                />
              </div>

              {/* Specification Card */}
              <div style={{
                marginTop: '1.5rem',
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '1.25rem'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.75rem 0', textTransform: 'uppercase' }}>
                  Technical Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.84rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" /> ISO Certified OEM Precision Standard
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" /> Heavy-duty Aluminised &amp; Stainless Steel Construction
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" /> Acoustically Tuned for Superior Noise Suppression
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Full Big Description & Contact Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)' }}>
                  PRODUCT OVERVIEW
                </h2>
                
                {/* Short Summary Highlight */}
                {product.shortDesc && (
                  <p style={{
                    fontSize: '0.98rem',
                    fontWeight: '600',
                    color: '#dc2626',
                    marginBottom: '1.25rem',
                    lineHeight: '1.6',
                    borderLeft: '3px solid #dc2626',
                    paddingLeft: '0.75rem'
                  }}>
                    {product.shortDesc}
                  </p>
                )}

                {/* Big Full Description */}
                <div style={{
                  fontSize: '0.92rem',
                  lineHeight: '1.8',
                  color: '#475569',
                  whiteSpace: 'pre-line',
                  marginBottom: '2rem'
                }}>
                  {product.fullDesc || product.desc || 'High performance OEM specification silencer engineered with precision acoustic dampening and corrosion-resistant stainless steel alloys. Designed to deliver optimal backpressure reduction, enhanced engine efficiency, and quiet exhaust notes for demanding driving conditions.'}
                </div>
              </div>

              {/* Inquiry Action Buttons */}
              <div style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Interested in bulk OEM order or silencer replacement for this model?
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Quality%20Silencers,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      backgroundColor: '#22c55e',
                      color: '#ffffff',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FaWhatsapp size={18} /> WhatsApp Inquiry
                  </a>
                  <a
                    href="tel:+919876543210"
                    style={{
                      flex: 1,
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FaPhoneAlt size={16} /> Call Sales Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
