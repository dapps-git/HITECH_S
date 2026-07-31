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
    heroVideo: {
      src: "/dpf/optimized/IMG_8229.mp4",
      poster: "/dpf/optimized/IMG_8229_poster.webp"
    },
    heroImage: null,
    beforeAfterImage: null,
    iconName: 'FaFilter',
    media: [
      { type: 'video', src: "/dpf/optimized/20260722_095443.mp4", poster: "/dpf/optimized/20260722_095443_poster.webp" },
      { type: 'video', src: "/dpf/optimized/20260727_121622_1.mp4", poster: "/dpf/optimized/20260727_121622_1_poster.webp" },
      { type: 'video', src: "/dpf/optimized/IMG_0648.mp4", poster: "/dpf/optimized/IMG_0648_poster.webp" },
      { type: 'video', src: "/dpf/optimized/IMG_0895.mp4", poster: "/dpf/optimized/IMG_0895_poster.webp" },
      { type: 'video', src: "/dpf/optimized/km_20260711_1080p_60f_20260711_195534_2.mp4", poster: "/dpf/optimized/km_20260711_1080p_60f_20260711_195534_2_poster.webp" },
      { type: 'image', src: "/images/service-dpf-before-after.jpg" },
      { type: 'image', src: "/images/service-dpf-machine.jpg" },
      { type: 'image', src: "/dpf/optimized/20260713_132457.webp" },
      { type: 'image', src: "/dpf/optimized/file_0000000077a47209a6d2b72c7688b760.webp" },
      { type: 'image', src: "/dpf/optimized/file_00000000e23c8207b5f5b8889d4ae494.webp" },
      { type: 'image', src: "/dpf/optimized/IMG_20260713_WA0001.webp" },
      { type: 'image', src: "/dpf/optimized/IMG_20260714_WA0003.webp" },
      { type: 'image', src: "/dpf/optimized/Screenshot_20260713_091246_Gallery.webp" },
      { type: 'image', src: "/dpf/optimized/Screenshot_20260726_182322_Gallery.webp" }
    ]
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
    heroImage: null,
    beforeAfterImage: null,
    iconName: 'FaIndustry',
    gallery: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23].map(i => `/images/dpf${i}.webp`),
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

  const isDpfRestoration = slug === 'dpf-restoration';

  // All DPF videos and photos combined for media section at the end
  const dpfMediaItems = [
    { type: 'video', src: "/dpf/optimized/IMG_8229.mp4", poster: "/dpf/optimized/IMG_8229_poster.webp" },
    { type: 'video', src: "/dpf/optimized/20260722_095443.mp4", poster: "/dpf/optimized/20260722_095443_poster.webp" },
    { type: 'video', src: "/dpf/optimized/20260727_121622_1.mp4", poster: "/dpf/optimized/20260727_121622_1_poster.webp" },
    { type: 'video', src: "/dpf/optimized/IMG_0648.mp4", poster: "/dpf/optimized/IMG_0648_poster.webp" },
    { type: 'video', src: "/dpf/optimized/IMG_0895.mp4", poster: "/dpf/optimized/IMG_0895_poster.webp" },
    { type: 'video', src: "/dpf/optimized/km_20260711_1080p_60f_20260711_195534_2.mp4", poster: "/dpf/optimized/km_20260711_1080p_60f_20260711_195534_2_poster.webp" },
    { type: 'image', src: "/images/service-dpf-before-after.jpg" },
    { type: 'image', src: "/images/service-dpf-machine.jpg" },
    { type: 'image', src: "/dpf/optimized/20260713_132457.webp" },
    { type: 'image', src: "/dpf/optimized/file_0000000077a47209a6d2b72c7688b760.webp" },
    { type: 'image', src: "/dpf/optimized/file_00000000e23c8207b5f5b8889d4ae494.webp" },
    { type: 'image', src: "/dpf/optimized/IMG_20260713_WA0001.webp" },
    { type: 'image', src: "/dpf/optimized/IMG_20260714_WA0003.webp" },
    { type: 'image', src: "/dpf/optimized/Screenshot_20260713_091246_Gallery.webp" },
    { type: 'image', src: "/dpf/optimized/Screenshot_20260726_182322_Gallery.webp" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 999, background: '#ffffff' }}>
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: 0 }}>
        {/* Navigation Bar */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.85rem 1rem',
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
                borderRadius: '0',
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

        {/* Main Content Area */}
        <div style={{ maxWidth: '1000px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>

          {isDpfRestoration ? (
            <div>
              {/* 1. Hero Section */}
              <section className="dpf-hero-section" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff',
                borderRadius: '0',
                padding: '2.5rem 1.75rem',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                textAlign: 'center'
              }}>
                <span style={{
                  backgroundColor: 'rgba(220,38,38,0.2)',
                  color: '#f87171',
                  border: '1px solid rgba(239,68,68,0.3)',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  EMISSION RESTORATION SERVICES
                </span>
                <h1 className="dpf-hero-title" style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  margin: '0 0 1rem 0',
                  lineHeight: '1.25',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Professional DPF Restoration Service
                </h1>
                <p className="dpf-hero-sub" style={{
                  fontSize: '0.98rem',
                  color: '#cbd5e1',
                  maxWidth: '750px',
                  margin: '0 auto 1.75rem',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
                  Restore Your Diesel Particulate Filter to OEM Performance Standards Without Unnecessary Replacement.
                </p>
                <div className="dpf-btn-group" style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <a href="tel:+919645888250" style={{
                    background: '#dc2626', color: '#ffffff', padding: '0.8rem 1.6rem',
                    borderRadius: '0', fontWeight: '700', fontSize: '0.88rem',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    boxShadow: '0 4px 16px rgba(220,38,38,0.4)', transition: 'all 0.2s ease',
                    letterSpacing: '0.03em'
                  }}>
                    <FaPhoneAlt size={14} /> Call Now
                  </a>
                  <a href="https://wa.me/919645888250?text=Hi%20Quality%20Silencers,%20I%20need%20Professional%20DPF%20Restoration%20service" target="_blank" rel="noopener noreferrer" style={{
                    background: '#22c55e', color: '#ffffff', padding: '0.8rem 1.6rem',
                    borderRadius: '0', fontWeight: '700', fontSize: '0.88rem',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    boxShadow: '0 4px 16px rgba(34,197,94,0.4)', transition: 'all 0.2s ease',
                    letterSpacing: '0.03em'
                  }}>
                    <FaWhatsapp size={16} /> WhatsApp Us
                  </a>
                </div>
              </section>

              {/* 2. What is DPF Restoration? */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  What is DPF Restoration?
                </h2>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.7', marginBottom: '1rem' }}>
                  The Diesel Particulate Filter (DPF) is designed to capture harmful soot particles produced by diesel engines. Over time, soot and ash accumulate inside the filter, restricting exhaust flow and reducing engine performance.
                </p>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.7', margin: 0 }}>
                  Our Professional DPF Restoration Process is designed to restore the DPF using OEM-standard procedures instead of simply replacing it.
                </p>
              </section>

              {/* 3. Signs Your DPF Needs Restoration */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Signs Your DPF Needs Restoration
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  If you notice any of the following symptoms, your DPF may require professional inspection:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.85rem' }}>
                  {[
                    'DPF Warning Light', 'Check Engine Light', 'Engine Power Loss', 'Frequent Regeneration',
                    'High Fuel Consumption', 'Limp Mode', 'Poor Acceleration', 'Increased Exhaust Back Pressure'
                  ].map((symptom, i) => (
                    <div key={i} style={{
                      background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0',
                      padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem',
                      fontSize: '0.86rem', fontWeight: '700', color: '#991b1b'
                    }}>
                      <span style={{ color: '#dc2626' }}>⚠️</span> {symptom}
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Common Causes of DPF Blockage */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Common Causes of DPF Blockage
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  DPF blockage can occur due to:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.75rem' }}>
                  {[
                    'Short-distance driving', 'Excessive idling', 'Interrupted regeneration cycles',
                    'Injector problems', 'Turbocharger issues', 'EGR system faults', 'Excessive ash accumulation'
                  ].map((cause, i) => (
                    <div key={i} style={{
                      background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0',
                      padding: '0.75rem 1rem', fontSize: '0.86rem', color: '#334155', fontWeight: '600',
                      display: 'flex', alignItems: 'center', gap: '0.55rem'
                    }}>
                      <span style={{ color: '#dc2626', fontWeight: 'bold' }}>•</span> {cause}
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Our Professional Restoration Process */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Our Professional Restoration Process
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      step: 'Step 1',
                      title: 'Inspection & Initial Testing',
                      desc: 'Endoscope camera Inspection, Flow Test, Pressure Test'
                    },
                    {
                      step: 'Step 2',
                      title: 'Chemical Soaking',
                      desc: 'Professional DPF cleaning chemicals loosen carbon, soot and ash deposits before deep cleaning.'
                    },
                    {
                      step: 'Step 3',
                      title: 'Hydro-Pneumatic Cleaning',
                      desc: 'High-pressure water and compressed air are used to remove trapped contaminants deep inside the DPF channels.'
                    },
                    {
                      step: 'Step 4',
                      title: 'Thermal Regeneration',
                      desc: 'Controlled heating removes remaining carbon deposits and dries the filter before testing.'
                    },
                    {
                      step: 'Step 5',
                      title: 'Final Flow & Pressure Test',
                      desc: 'The restored DPF is tested again to verify proper exhaust flow and pressure before installation.'
                    }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0',
                      borderRadius: '0', padding: '1.1rem 1.25rem', alignItems: 'flex-start'
                    }}>
                      <span style={{
                        background: '#dc2626', color: '#fff', fontWeight: '800', fontSize: '0.78rem',
                        padding: '5px 12px', borderRadius: '0', whiteSpace: 'nowrap', flexShrink: 0
                      }}>
                        {item.step}
                      </span>
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.35rem 0' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Benefits of Professional DPF Restoration */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1.25rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Benefits of Professional DPF Restoration
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.85rem' }}>
                  {[
                    'Restores Exhaust Flow', 'Reduces Back Pressure', 'Improves Engine Performance',
                    'Better Fuel Economy', 'Extends DPF Life', 'Reduces Emissions', 'Helps Avoid Unnecessary Replacement Costs'
                  ].map((benefit, i) => (
                    <div key={i} style={{
                      background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0',
                      padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem',
                      fontSize: '0.86rem', fontWeight: '700', color: '#166534'
                    }}>
                      <FaCheckCircle color="#22c55e" size={15} /> {benefit}
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Supported Vehicles */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Supported Vehicles
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  We provide DPF Restoration services for:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '0.6rem',
                  marginBottom: '1.25rem'
                }}>
                  {[
                    'Hyundai', 'Kia', 'Toyota', 'Tata Motors', 'Mahindra', 'MG', 'Isuzu',
                    'Force Motors', 'Ashok Leyland', 'BharatBenz', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Skoda', 'Jeep'
                  ].map((brand, i) => (
                    <div key={i} style={{
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0',
                      padding: '10px 8px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: '#0f172a',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {brand}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
                  and many other BS6 diesel vehicles.
                </p>
              </section>

              {/* 8. Common DPF Fault Codes */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Common DPF Fault Codes
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
                  Professional inspection is recommended if your vehicle shows fault codes such as:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {['P2002', 'P2463', 'P2452', 'P244A', 'P24A5'].map((code, i) => (
                    <span key={i} style={{
                      background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '0',
                      padding: '8px 18px', fontSize: '0.92rem', fontWeight: '800', color: '#92400e',
                      fontFamily: 'monospace', textAlign: 'center', display: 'flex',
                      alignItems: 'center', justifyContent: 'center'
                    }}>
                      {code}
                    </span>
                  ))}
                </div>
              </section>

              {/* 9. Why Choose Hi Quality Silencers? */}
              <section className="dpf-card-section" style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <h2 className="dpf-section-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1.25rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Why Choose Hi Quality Silencers?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  {[
                    '15+ Years of Engineering Experience', 'Professional DPF Restoration Equipment',
                    'OEM Standard Cleaning Process', 'Experienced Technicians', 'Flow & Pressure Testing',
                    'Transparent Inspection', 'Customer-Focused Service'
                  ].map((reason, i) => (
                    <div key={i} style={{
                      background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0',
                      padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem',
                      fontSize: '0.86rem', fontWeight: '700', color: '#0f172a'
                    }}>
                      <span style={{ color: '#dc2626' }}>★</span> {reason}
                    </div>
                  ))}
                </div>
              </section>

              {/* 10. Final Call To Action */}
              <section className="dpf-hero-section" style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: '#ffffff', borderRadius: '0', padding: '2.5rem 1.75rem',
                marginBottom: '2rem', boxShadow: '0 10px 30px rgba(220,38,38,0.25)',
                textAlign: 'center'
              }}>
                <h2 className="dpf-cta-title" style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0', fontFamily: 'Montserrat, sans-serif' }}>
                  Don't Replace Your DPF Without Inspection
                </h2>
                <p className="dpf-cta-sub" style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fecaca', margin: '0 0 1rem 0' }}>
                  A blocked DPF doesn't always need replacement.
                </p>
                <p style={{ fontSize: '0.92rem', color: '#ffffff', maxWidth: '650px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
                  Book a Professional DPF Inspection today and let our experts determine the most suitable solution for your vehicle.
                </p>
                <div className="dpf-btn-group" style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <a href="tel:+919645888250" style={{
                    background: '#ffffff', color: '#dc2626', padding: '0.8rem 1.6rem',
                    borderRadius: '0', fontWeight: '800', fontSize: '0.88rem',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transition: 'all 0.2s ease',
                    letterSpacing: '0.03em'
                  }}>
                    <FaPhoneAlt size={14} /> Call Now
                  </a>
                  <a href="https://wa.me/919645888250?text=Hi%20Quality%20Silencers,%20I%20want%20to%20book%20a%20DPF%20Inspection" target="_blank" rel="noopener noreferrer" style={{
                    background: '#22c55e', color: '#ffffff', padding: '0.8rem 1.6rem',
                    borderRadius: '0', fontWeight: '800', fontSize: '0.88rem',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transition: 'all 0.2s ease',
                    letterSpacing: '0.03em'
                  }}>
                    <FaWhatsapp size={16} /> WhatsApp Us
                  </a>
                </div>
              </section>

              {/* ALL VIDEOS & PHOTOS (PLACED AT THE VERY END AFTER SECTION 10) */}
              <section style={{
                background: '#ffffff', borderRadius: '0', border: '1px solid #e2e8f0',
                padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '0.85rem'
                }}>
                  {dpfMediaItems.map((item, idx) => (
                    item.type === 'video' ? (
                      <div key={idx} style={{
                        borderRadius: '0', overflow: 'hidden', border: '1px solid #e2e8f0',
                        background: '#000', aspectRatio: '4 / 3', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}>
                        <video
                          src={item.src}
                          poster={item.poster}
                          controls
                          preload="metadata"
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    ) : (
                      <a
                        key={idx} href={item.src} target="_blank" rel="noopener noreferrer"
                        style={{
                          borderRadius: '0', overflow: 'hidden', border: '1px solid #e2e8f0',
                          display: 'block', aspectRatio: '4 / 3', background: '#f8fafc',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="gallery-item-card"
                      >
                        <img
                          src={item.src} alt={`DPF media item ${idx + 1}`} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                        />
                      </a>
                    )
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div>
              {/* Standard Service Layout for other services */}
              {service.heroVideo ? (
                <div style={{
                  borderRadius: '0', overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  marginBottom: '1.5rem',
                  background: '#000'
                }}>
                  <video
                    src={service.heroVideo.src}
                    poster={service.heroVideo.poster}
                    controls
                    preload="metadata"
                    playsInline
                    style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ) : service.heroImage ? (
                <div style={{
                  borderRadius: '0', overflow: 'hidden',
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
              ) : null}

              {/* Two Column Layout */}
              <div className="svc-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start', marginBottom: '2rem' }}>

                {/* Left: Description */}
                <div style={{
                  background: '#ffffff', borderRadius: '0',
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
                    background: '#ffffff', borderRadius: '0',
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
                      borderRadius: '0', overflow: 'hidden',
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
                    background: '#ffffff', borderRadius: '0',
                    border: '1px solid #e2e8f0', padding: '1.15rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                  }}>
                    <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '0 0 0.85rem 0', fontWeight: '500' }}>
                      Interested in this service? Get a quick quote now.
                    </p>
                    <div className="dpf-btn-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      <a
                        href={`https://wa.me/919645888250?text=Hi%20Quality%20Silencers,%20I%20need%20${encodeURIComponent(service.title)}%20service`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          background: '#22c55e', color: '#fff', padding: '0.7rem 1rem',
                          borderRadius: '0', fontWeight: '700', fontSize: '0.8rem',
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
                          borderRadius: '0', fontWeight: '700', fontSize: '0.8rem',
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

              {/* Gallery for other services */}
              {service.gallery && service.gallery.length > 0 && (
                <div style={{
                  background: '#ffffff',
                  borderRadius: '0',
                  border: '1px solid #e2e8f0',
                  padding: '1.25rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '0.85rem'
                  }}>
                    {service.gallery.map((imgSrc, idx) => (
                      <a
                        key={idx}
                        href={imgSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          borderRadius: '0',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0',
                          display: 'block',
                          aspectRatio: '4 / 3',
                          background: '#f8fafc',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="gallery-item-card"
                      >
                        <img
                          src={imgSrc}
                          alt={`Gallery image ${idx + 1}`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Responsive Style */}
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 680px) {
              .svc-content-grid {
                grid-template-columns: 1fr !important;
              }
              .dpf-hero-section {
                padding: 1.5rem 0.85rem !important;
              }
              .dpf-hero-title {
                font-size: 1.2rem !important;
              }
              .dpf-hero-sub {
                font-size: 0.8rem !important;
                margin-bottom: 1.2rem !important;
              }
              .dpf-section-title {
                font-size: 0.98rem !important;
              }
              .dpf-cta-title {
                font-size: 1.15rem !important;
              }
              .dpf-cta-sub {
                font-size: 0.82rem !important;
              }
              .dpf-card-section {
                padding: 1rem 0.75rem !important;
              }
              /* Single Row Button Layout on Mobile Phones */
              .dpf-btn-group {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                gap: 0.4rem !important;
                width: 100% !important;
                justify-content: space-between !important;
              }
              .dpf-btn-group a {
                flex: 1 1 50% !important;
                padding: 0.6rem 0.35rem !important;
                font-size: 0.76rem !important;
                justify-content: center !important;
                white-space: nowrap !important;
                gap: 0.35rem !important;
                letter-spacing: 0 !important;
                box-shadow: none !important;
              }
              .dpf-btn-group a svg {
                width: 12px !important;
                height: 12px !important;
              }
            }
            .gallery-item-card:hover {
              transform: translateY(-3px) !important;
              box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important;
            }
            .gallery-item-card:hover img {
              transform: scale(1.05) !important;
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
