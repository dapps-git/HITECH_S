import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { FaArrowLeft, FaPhoneAlt, FaWhatsapp, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultProducts = [
  {
    id: 'prod-1',
    title: 'CAR SILENCERS',
    category: 'PASSENGER CARS',
    image: '/images/prod_passenger_car.png',
    shortDesc: 'High performance OEM specification silencers for all passenger cars.',
    fullDesc: 'High performance OEM specification silencer engineered for passenger cars. Features heavy-duty galvanised & stainless steel construction, precision acoustic tuning, and minimum 10-year service life under normal operating conditions.',
    spec: 'Galvanised / Stainless Steel 1.6mm'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    category: 'SUV & PICKUP',
    image: '/images/prod_suv_pickup.png',
    shortDesc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance.',
    fullDesc: 'Robust silencers specially engineered for SUVs and 4x4 pickup trucks. Designed for high exhaust flow, maximum backpressure reduction, and durable performance under extreme driving conditions.',
    spec: 'Heavy Duty 2.0mm Steel'
  },
  {
    id: 'prod-3',
    title: 'COMMERCIAL VEHICLE SILENCERS',
    category: 'COMMERCIAL LCV',
    image: '/images/prod_truck_bus.png',
    shortDesc: 'Heavy duty silencers for LCVs, trucks, and commercial fleet vehicles.',
    fullDesc: 'Heavy-duty commercial silencers built for LCVs, trucks, and buses. Engineered to handle high thermal stress and continuous long-distance fleet operations with OEM precision fitment.',
    spec: 'OEM Grade Flange Fitment'
  },
  {
    id: 'prod-4',
    title: 'GENERATED SILENCERS',
    category: 'SPECIALIZED SILENCERS',
    image: '/images/prod_lcv.png',
    shortDesc: 'Precision generated silencers for consistent flow dynamics and low back pressure.',
    fullDesc: 'Precision generated silencers engineered for stationary generators, industrial engines, and heavy-duty machinery. Provides superior acoustic dampening and low backpressure flow dynamics.',
    spec: 'Industrial Heavy Drum Assembly'
  },
  {
    id: 'prod-5',
    title: 'CUSTOM SILENCERS',
    category: 'CUSTOM FABRICATION',
    image: '/images/prod_catalytic.png',
    shortDesc: 'Bespoke custom-built silencers tailored to exact vehicle specifications.',
    fullDesc: 'Custom-engineered silencers built to exact client specifications, custom vehicle dimensions, and specialized noise control requirements. Crafted using premium corrosion-resistant alloys with precision baffle tuning.',
    spec: 'Custom Flange & Baffle Assembly'
  }
];

async function getProduct(id) {
  // 1. Check static defaults first
  const staticMatch = defaultProducts.find(p => p.id === id || String(p._id) === id);
  if (staticMatch) return staticMatch;

  // 2. Fetch from live backend API
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.products) {
        return data.products.find(p => (p.id === id || String(p._id) === id)) || null;
      }
    }
  } catch (err) {}

  return null;
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
          .prod-img-box {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 280px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
          }
          .prod-img-box img {
            max-width: 100%;
            max-height: 260px;
            object-fit: contain;
          }
          @media (max-width: 900px) {
            .prod-detail-grid {
              grid-template-columns: 1fr;
              padding: 1.5rem;
              gap: 1.5rem;
            }
          }
          @media (max-width: 768px) {
            .prod-detail-header {
              padding: 0.75rem 1rem 0.65rem !important;
            }
            .prod-detail-title {
              font-size: 1.2rem !important;
              margin-top: 0.2rem !important;
            }
            .prod-detail-grid {
              padding: 1rem !important;
              gap: 1rem !important;
              border-radius: 12px !important;
            }
            .prod-img-box {
              min-height: 170px !important;
              padding: 0.75rem !important;
              border-radius: 10px !important;
            }
            .prod-img-box img {
              max-height: 160px !important;
            }
          }
        `}} />

        {/* Light Hero Breadcrumb Header */}
        <div className="prod-detail-header" style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '1.75rem 1.25rem 1.25rem', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Link href="/products" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#dc2626',
              fontSize: '0.78rem',
              fontWeight: '600',
              textDecoration: 'none',
              marginBottom: '0.5rem'
            }}>
              <FaArrowLeft size={11} /> BACK TO ALL PRODUCTS
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {product.category || 'SILENCER MODEL'}
              </span>
              {product.spec && (
                <span style={{
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0'
                }}>
                  {product.spec}
                </span>
              )}
            </div>
            <h1 className="prod-detail-title" style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0.35rem 0 0 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.01em',
              color: '#0f172a'
            }}>
              {product.title}
            </h1>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="container" style={{ maxWidth: '1100px', margin: '1.5rem auto 0', padding: '0 0.85rem' }}>
          <div className="prod-detail-grid">
            {/* Left: Image */}
            <div>
              <div className="prod-img-box">
                <img
                  src={product.image || '/images/prod_passenger_car.png'}
                  alt={product.title}
                />
              </div>

              <div style={{
                marginTop: '1.25rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.15rem'
              }}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.65rem 0', textTransform: 'uppercase' }}>
                  Technical Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" size={13} /> ISO Certified OEM Precision Fitment
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle color="#dc2626" size={13} /> Heavy-duty Galvanised &amp; Stainless Steel
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaShieldAlt color="#dc2626" size={13} /> 15-Month Manufacturer Warranty Included
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Description & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.85rem 0', fontFamily: 'var(--font-heading)' }}>
                  PRODUCT OVERVIEW
                </h2>

                {product.shortDesc && (
                  <p style={{
                    fontSize: '0.85rem',
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
                  fontSize: '0.85rem',
                  lineHeight: '1.75',
                  color: '#475569',
                  whiteSpace: 'pre-line',
                  marginBottom: '1.75rem'
                }}>
                  {product.fullDesc || product.desc || 'High performance OEM specification silencer engineered with precision acoustic dampening and corrosion-resistant stainless steel alloys. Designed to deliver optimal backpressure reduction, enhanced engine efficiency, and quiet exhaust notes.'}
                </div>
              </div>

              {/* Premium Light Action Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '500' }}>
                  Interested in bulk OEM order or silencer replacement for this model?
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Quality%20Silencers,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, minWidth: '150px',
                      backgroundColor: '#22c55e', color: '#ffffff',
                      padding: '0.7rem 1rem', borderRadius: '8px',
                      fontWeight: '600', fontSize: '0.8rem',
                      textDecoration: 'none', display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    <FaWhatsapp size={16} /> WhatsApp Inquiry
                  </a>
                  <a
                    href="tel:+919876543210"
                    style={{
                      flex: 1, minWidth: '150px',
                      backgroundColor: '#dc2626', color: '#ffffff',
                      padding: '0.7rem 1rem', borderRadius: '8px',
                      fontWeight: '600', fontSize: '0.8rem',
                      textDecoration: 'none', display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)'
                    }}
                  >
                    <FaPhoneAlt size={13} /> Call Sales Team
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
