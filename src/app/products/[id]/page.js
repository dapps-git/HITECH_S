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
    fullDesc: 'High performance OEM specification silencer engineered for passenger cars. Features heavy-duty galvanised sheets or pipe construction, precision acoustic tuning, and minimum 10-year service life under normal operating conditions.',
    spec: '1.6mm Galvanised Sheets or Pipe'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    category: 'SUV & PICKUP',
    image: '/images/prod_suv_pickup.png',
    shortDesc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance.',
    fullDesc: 'Robust silencers specially engineered for SUVs and 4x4 pickup trucks. Designed for high exhaust flow, maximum backpressure reduction, and durable performance under extreme driving conditions.',
    spec: '2.0mm Galvanised Sheets or Pipe'
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
    title: 'GENERATOR SILENCERS',
    category: 'SPECIALIZED SILENCERS',
    image: '/images/prod_lcv.png',
    workImage: '/images/prod_generator_silencer.jpg',
    shortDesc: 'Precision generator silencers for consistent flow dynamics and low back pressure.',
    fullDesc: 'Precision generator silencers engineered for stationary generators, industrial engines, and heavy-duty machinery. Provides superior acoustic dampening and low backpressure flow dynamics.',
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
  const staticMatch = defaultProducts.find(p => p.id === id || String(p._id) === id);
  if (staticMatch) return staticMatch;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.products) {
        return data.products.find(p => (p.id === id || String(p._id) === id)) || null;
      }
    }
  } catch (err) { }

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

import BackButton from '@/components/BackButton';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '96px', paddingBottom: '3rem' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          .prod-detail-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 2rem;
            align-items: start;
            background-color: #ffffff;
            border-radius: 0px !important;
            padding: 1.75rem;
            border: 1px solid #e2e8f0;
          }
          .prod-img-box {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 0px !important;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 220px;
          }
          .prod-img-box img {
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
          }
          @media (max-width: 900px) {
            .prod-detail-grid {
              grid-template-columns: 1fr;
              padding: 1.25rem;
              gap: 1.25rem;
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
            }
            .prod-img-box {
              height: 160px !important;
              padding: 0.5rem !important;
            }
            .prod-img-box img {
              max-height: 150px !important;
            }
          }
        `}} />

        {/* Light Breadcrumb Header */}
        <div className="prod-detail-header" style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '0.65rem' }}>
              <BackButton />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '0px',
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
                  borderRadius: '0px',
                  border: '1px solid #e2e8f0'
                }}>
                  {product.spec}
                </span>
              )}
            </div>
            <h1 className="prod-detail-title" style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0.25rem 0 0 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.01em',
              color: '#0f172a'
            }}>
              {product.title}
            </h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container" style={{ maxWidth: '1100px', margin: '1.25rem auto 0', padding: '0 0.85rem' }}>
          <div className="prod-detail-grid">
            {/* Left: Product Image & Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="prod-img-box">
                <img
                  src={product.image || '/images/prod_passenger_car.png'}
                  alt={product.title}
                />
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0px',
                padding: '1rem'
              }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                  Technical Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.76rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FaCheckCircle color="#dc2626" size={12} /> ISO Certified OEM Precision Fitment
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FaCheckCircle color="#dc2626" size={12} /> Heavy-duty Galvanised Sheets or Pipe
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FaShieldAlt color="#dc2626" size={12} /> 15-Month Manufacturer Warranty Included
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Description & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.65rem 0', fontFamily: 'var(--font-heading)' }}>
                  PRODUCT OVERVIEW
                </h2>

                {product.shortDesc && (
                  <p style={{
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: '#dc2626',
                    marginBottom: '0.75rem',
                    lineHeight: '1.45',
                    borderLeft: '3px solid #dc2626',
                    paddingLeft: '0.65rem'
                  }}>
                    {product.shortDesc}
                  </p>
                )}

                <div style={{
                  fontSize: '0.84rem',
                  lineHeight: '1.65',
                  color: '#475569',
                  whiteSpace: 'pre-line',
                  marginBottom: '0.5rem'
                }}>
                  {product.fullDesc || product.desc || 'High performance OEM specification silencer engineered with precision acoustic dampening and corrosion-resistant galvanised sheets or pipe. Designed to deliver optimal backpressure reduction, enhanced engine efficiency, and quiet exhaust notes.'}
                </div>
              </div>

              {/* Action Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                  Interested in bulk OEM order or silencer replacement for this model?
                </div>
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/919645888250?text=Hi%20Quality%20Silencers,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, minWidth: '140px',
                      backgroundColor: '#22c55e', color: '#ffffff',
                      padding: '0.65rem 0.85rem', borderRadius: '0px',
                      fontWeight: '600', fontSize: '0.78rem',
                      textDecoration: 'none', display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                    }}
                  >
                    <FaWhatsapp size={15} /> WhatsApp Inquiry
                  </a>
                  <a
                    href="tel:+919645888253"
                    style={{
                      flex: 1, minWidth: '140px',
                      backgroundColor: '#dc2626', color: '#ffffff',
                      padding: '0.65rem 0.85rem', borderRadius: '0px',
                      fontWeight: '600', fontSize: '0.78rem',
                      textDecoration: 'none', display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                    }}
                  >
                    <FaPhoneAlt size={12} /> Call Sales Team
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Manufacturing Showcase (if workImage exists) */}
          {product.workImage && (
            <div style={{ marginTop: '1.25rem', border: '1px solid #e2e8f0', padding: '1rem', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', margin: '0 0 0.75rem 0', letterSpacing: '0.04em' }}>
                Factory Manufacturing Work &amp; Custom Fabrication Showcase
              </h3>
              <div style={{ maxHeight: '420px', overflow: 'hidden', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                <img
                  src={product.workImage}
                  alt={`${product.title} Factory Manufacturing Work`}
                  style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
