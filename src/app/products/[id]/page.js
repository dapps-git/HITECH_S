import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';
import { FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

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

      <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '4rem' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .prod-detail-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 2.5rem;
            background-color: #ffffff;
            border-radius: 16px;
            padding: 2.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
          }
          @media (max-width: 900px) {
            .prod-detail-grid {
              grid-template-columns: 1fr;
              padding: 1.5rem;
              gap: 1.75rem;
            }
          }
          @media (max-width: 600px) {
            .prod-detail-title {
              font-size: 1.5rem !important;
            }
            .prod-detail-grid {
              padding: 1.15rem;
            }
          }
        `}} />

        {/* Hero Breadcrumb Header */}
        <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2rem 1.25rem' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Link href="/products" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ef4444',
              fontSize: '0.8rem',
              fontWeight: '700',
              textDecoration: 'none',
              marginBottom: '0.85rem'
            }}>
              <FaArrowLeft /> Back to All Products
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '0.7rem',
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
                  color: '#cbd5e1',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {product.spec}
                </span>
              )}
            </div>
            <h1 className="prod-detail-title" style={{
              fontSize: '2rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0.65rem 0 0 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.01em'
            }}>
              {product.title}
            </h1>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="container" style={{ maxWidth: '1100px', margin: '2rem auto 0', padding: '0 1rem' }}>
          <div className="prod-detail-grid">
            {/* Left Box: Product Image Showcase */}
            <div>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '2rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
              }}>
                <img
                  src={product.image || '/images/prod_passenger_car.png'}
                  alt={product.title}
                  style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>

              {/* Technical Spec Box */}
              <div style={{
                marginTop: '1.25rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.15rem'
              }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.65rem 0', textTransform: 'uppercase' }}>
                  Technical Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" size={14} /> ISO Certified OEM Precision Fitment
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" size={14} /> Heavy-duty Galvanised &amp; Stainless Steel
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaShieldAlt color="#dc2626" size={14} /> 15-Month Manufacturer Warranty Included
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Box: Product Overview & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.85rem 0', fontFamily: 'var(--font-heading)' }}>
                  PRODUCT OVERVIEW
                </h2>

                {product.shortDesc && (
                  <p style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#dc2626',
                    marginBottom: '1rem',
                    lineHeight: '1.5',
                    borderLeft: '3px solid #dc2626',
                    paddingLeft: '0.75rem'
                  }}>
                    {product.shortDesc}
                  </p>
                )}

                <div style={{
                  fontSize: '0.88rem',
                  lineHeight: '1.75',
                  color: '#475569',
                  whiteSpace: 'pre-line',
                  marginBottom: '1.75rem'
                }}>
                  {product.fullDesc || product.desc || 'High performance OEM specification silencer engineered with precision acoustic dampening and corrosion-resistant stainless steel alloys. Designed to deliver optimal backpressure reduction, enhanced engine efficiency, and quiet exhaust notes.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Interested in bulk OEM order or silencer replacement for this model?
                </div>
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Quality%20Silencers,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      minWidth: '160px',
                      backgroundColor: '#22c55e',
                      color: '#ffffff',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.82rem',
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
                      minWidth: '160px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FaPhoneAlt size={15} /> Call Sales Team
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
