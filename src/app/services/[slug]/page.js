import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaArrowLeft, FaWhatsapp, FaPhoneAlt, FaCheckCircle, FaFilter, FaIndustry, FaLeaf, FaLink, FaWrench } from 'react-icons/fa';

const SERVICES = [
  {
    slug: 'dpf-restoration',
    title: 'Professional DPF Restoration',
    category: 'EMISSION SERVICES',
    shortDesc: '4-stage scientific DPF cleaning restoring original exhaust flow & back pressure.',
    fullDesc: `Our 4-stage scientific DPF (Diesel Particulate Filter) restoration process removes 98%+ of accumulated soot, ash, and oil residue from inside the DPF honeycomb channels.

Using advanced pneumatic flushing and thermal regeneration technology, we restore your DPF to near-original flow capacity — without damaging the fragile substrate.

This process restores engine horsepower, improves fuel efficiency, eliminates DPF warning lights, and prevents expensive filter replacement costs.`,
    highlights: [
      '4-Stage Scientific Cleaning Process',
      'Removes 98%+ Soot & Ash Buildup',
      'Restores Original Exhaust Backpressure',
      'Eliminates DPF Warning Lights',
      'Improves Fuel Efficiency',
      'Prevents Costly Filter Replacement',
    ],
    heroImage: '/images/service-dpf-machine.jpg',
    beforeAfterImage: '/images/service-dpf-before-after.jpg',
    iconName: 'FaFilter',
  },
  {
    slug: 'oem-silencer-manufacturing',
    title: 'OEM Silencer Manufacturing',
    category: 'MANUFACTURING',
    shortDesc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience.',
    fullDesc: `Hi Quality Silencers is an ISO 9001:2015 certified manufacturer of OEM Specification Silencers under the TUNEX® brand.

Every silencer is precision engineered using 1.6mm & 2.0mm heavy-duty galvanised and stainless steel sheets for exceptional durability and corrosion resistance.

Each unit undergoes stringent quality inspection before dispatch and comes with a 15-month warranty. Designed for precise OEM fitment across all passenger cars, SUVs, LCVs, and commercial vehicles.`,
    highlights: [
      'ISO 9001:2015 Certified Manufacturing',
      'TUNEX® Brand — OEM Specification',
      '1.6mm & 2.0mm Galvanised Steel Sheets',
      '250+ Vehicle Models Covered',
      '15-Month Manufacturer Warranty',
      'Stringent Pre-dispatch Quality Checks',
    ],
    heroImage: '/images/aboutus.webp',
    beforeAfterImage: null,
    iconName: 'FaIndustry',
  },
  {
    slug: 'catalytic-converter-service',
    title: 'Catalytic Converter Service',
    category: 'EMISSION SERVICES',
    shortDesc: 'Complete diagnostic, cleaning & replacement for optimum emission control.',
    fullDesc: `Our comprehensive catalytic converter service covers everything from inspection and cleaning to full replacement.

Using advanced chemical channel flushing and substrate testing, we assess the health of your catalytic converter and determine the best course of action — restoring emission performance without unnecessary replacement costs.

Covers all vehicle types including passenger cars, SUVs, LCVs, and commercial vehicles. Our technicians ensure your vehicle meets emission standards and operates at peak performance.`,
    highlights: [
      'Full Substrate Inspection & Diagnostics',
      'Chemical Channel Flushing',
      'Emission Level Testing',
      'OEM Spec Replacement if Required',
      'Covers All Vehicle Categories',
      'Emission Compliance Guaranteed',
    ],
    heroImage: '/images/service-catalytic-collage.jpg',
    beforeAfterImage: null,
    iconName: 'FaLeaf',
  },
  {
    slug: 'flex-pipe-replacement',
    title: 'Flex Pipe Replacement',
    category: 'EXHAUST REPAIR',
    shortDesc: 'Precision flex pipe welding, replacement & vibration dampening exhaust repair.',
    fullDesc: `Flex pipes are critical components that absorb engine vibrations and thermal expansion within the exhaust system.

A damaged or cracked flex pipe causes exhaust gas leaks, unusual rattling sounds, and long-term damage to the exhaust manifold and catalytic converter.

Our team uses precision TIG welding and heavy-duty stainless steel flex pipes to deliver lasting repairs that restore exhaust integrity, eliminate gas leaks, and prevent downstream component damage.`,
    highlights: [
      'Precision TIG Welding by Experts',
      'Heavy-duty Stainless Steel Flex Pipes',
      'Eliminates Exhaust Gas Leaks',
      'Stops Rattling & Vibration',
      'Prevents Manifold Cracking',
      'Fast Turnaround — Same Day Service',
    ],
    heroImage: '/images/service-flex-before-after.jpg',
    beforeAfterImage: null,
    iconName: 'FaLink',
  },
  {
    slug: 'exhaust-repair',
    title: 'Exhaust Repair',
    category: 'EXHAUST REPAIR',
    shortDesc: 'Complete exhaust system diagnostics, leak repair, and component restoration.',
    fullDesc: `Our exhaust repair service covers the full exhaust system — from the manifold to the tailpipe.

Whether it's a hairline exhaust leak, a cracked pipe, worn gaskets, or a damaged resonator, our experienced technicians diagnose and repair the issue accurately.

We service all makes and models of passenger cars, SUVs, LCVs, and heavy commercial vehicles. Every repair is carried out using quality materials to ensure long-lasting results.`,
    highlights: [
      'Full System Diagnosis & Inspection',
      'Exhaust Leak Repair & Sealing',
      'Pipe, Flange & Gasket Replacement',
      'Covers All Makes & Models',
      'Commercial Vehicles Welcome',
      'Quality Materials & Fast Service',
    ],
    heroImage: '/images/service-exhaust-repair.jpg',
    beforeAfterImage: null,
    iconName: 'FaWrench',
  },
];

const iconMap = { FaFilter, FaIndustry, FaLeaf, FaLink, FaWrench };

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) notFound();
  const IconComponent = iconMap[service.iconName] || FaWrench;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f9fafb' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 999, background: '#ffffff' }}>
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: 0 }}>
        {/* Light Header Bar */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.85rem 1rem 0.85rem',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Link href="/#dpf-cleaning" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              color: '#dc2626', fontSize: '0.72rem', fontWeight: '700',
              textDecoration: 'none', marginBottom: '0.5rem', textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <FaArrowLeft size={10} /> BACK TO SERVICES
            </Link>
            <div>
              <span style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                fontSize: '0.62rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'inline-block',
                marginBottom: '0.35rem'
              }}>
                {service.category}
              </span>
              <h1 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#0f172a',
                margin: 0,
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.02em'
              }}>
                {service.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1000px', margin: '1rem auto 2.5rem', padding: '0 1rem' }}>

          {/* Hero Image */}
          {service.heroImage && (
            <div style={{
              borderRadius: '12px', overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              marginBottom: '1.5rem',
              background: '#fff'
            }}>
              <img
                src={service.heroImage}
                alt={service.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Two Column Layout */}
          <div className="svc-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start' }}>

            {/* Left: Description */}
            <div style={{
              background: '#ffffff', borderRadius: '12px',
              border: '1px solid #e2e8f0', padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <h2 style={{ fontSize: '0.72rem', fontWeight: '700', color: '#dc2626', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.6rem 0' }}>
                OVERVIEW
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: '1.75', whiteSpace: 'pre-line', fontWeight: '400' }}>
                {service.fullDesc}
              </div>
            </div>

            {/* Right: Highlights + Before/After + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Highlights */}
              <div style={{
                background: '#ffffff', borderRadius: '12px',
                border: '1px solid #e2e8f0', padding: '1.25rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 0.85rem 0' }}>
                  KEY HIGHLIGHTS
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {service.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: '#374151' }}>
                      <FaCheckCircle color="#dc2626" size={13} style={{ marginTop: '2px', flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before/After Image */}
              {service.beforeAfterImage && (
                <div style={{
                  borderRadius: '10px', overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                  <img
                    src={service.beforeAfterImage}
                    alt="Before and After"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* CTA Box */}
              <div style={{
                background: '#ffffff', borderRadius: '12px',
                border: '1px solid #e2e8f0', padding: '1.15rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '0 0 0.85rem 0', fontWeight: '500' }}>
                  Interested in this service? Get a quick quote now.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <a
                    href={`https://wa.me/919645888250?text=Hi%20Quality%20Silencers,%20I%20need%20${encodeURIComponent(service.title)}%20service`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: '#22c55e', color: '#fff', padding: '0.7rem 1rem',
                      borderRadius: '8px', fontWeight: '700', fontSize: '0.8rem',
                      textDecoration: 'none', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '0.5rem'
                    }}
                  >
                    <FaWhatsapp size={15} /> WhatsApp Inquiry
                  </a>
                  <a
                    href="tel:+919645888250"
                    style={{
                      background: '#dc2626', color: '#fff', padding: '0.7rem 1rem',
                      borderRadius: '8px', fontWeight: '700', fontSize: '0.8rem',
                      textDecoration: 'none', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '0.5rem'
                    }}
                  >
                    <FaPhoneAlt size={13} /> Call: 9645 888 250
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Responsive Style */}
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 680px) {
              .svc-content-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}} />

        </div>
      </main>

      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}
