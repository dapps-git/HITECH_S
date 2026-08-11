import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import headerStyles from '@/components/Header.module.css';
import { FaArrowRight, FaCheckCircle, FaFilter, FaIndustry, FaLeaf, FaLink, FaWrench } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "All Services | Silencer Manufacturing & 5-Stage DPF Restoration | Hi Quality Silencers",
  description: "Explore our specialized OEM silencer manufacturing, 5-stage scientific DPF restoration, catalytic converter service, flex pipe replacement, and exhaust repair.",
};

const allServices = [
  {
    slug: 'dpf-restoration',
    title: 'Professional DPF Restoration',
    category: 'EMISSION RESTORATION',
    shortDesc: '5-stage scientific DPF cleaning restoring 98%+ original exhaust flow and backpressure.',
    highlights: [
      '5-Stage Scientific Cleaning Process',
      'Removes 98%+ Soot & Ash Buildup',
      'Restores Original Exhaust Backpressure',
      'Eliminates DPF & Engine Warning Lights',
    ],
    iconComponent: FaFilter,
    badgeColor: '#dc2626',
    bgColor: '#fef2f2',
  },
  {
    slug: 'oem-silencer-manufacturing',
    title: 'OEM Silencer Manufacturing',
    category: 'MANUFACTURING',
    shortDesc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience.',
    highlights: [
      'ISO 9001:2015 Certified Quality',
      '1.6mm or 2.0mm Galvanised Sheets or Pipe',
      '1000+ Vehicle Models Covered',
      '15-Month Manufacturer Warranty',
    ],
    iconComponent: FaIndustry,
    badgeColor: '#0f172a',
    bgColor: '#f1f5f9',
  },
  {
    slug: 'catalytic-converter-service',
    title: 'Catalytic Converter Service',
    category: 'EMISSION CONTROL',
    shortDesc: 'Complete diagnostic, chemical channel flushing & replacement for optimum emission control.',
    highlights: [
      'Full Substrate Inspection & Diagnostics',
      'Chemical Channel Flushing',
      'Emission Level Testing',
      'OEM Spec Replacement Options',
    ],
    iconComponent: FaLeaf,
    badgeColor: '#16a34a',
    bgColor: '#f0fdf4',
  },
  {
    slug: 'flex-pipe-replacement',
    title: 'Flex Pipe Replacement',
    category: 'EXHAUST REPAIR',
    shortDesc: 'Precision TIG flex pipe welding, replacement & vibration dampening exhaust repair.',
    highlights: [
      'Precision TIG Welding Experts',
      'Heavy-duty Stainless Steel Flex Pipes',
      'Eliminates Exhaust Gas Leaks',
      'Stops Rattling & Vibration',
    ],
    iconComponent: FaLink,
    badgeColor: '#2563eb',
    bgColor: '#eff6ff',
  },
  {
    slug: 'exhaust-repair',
    title: 'Exhaust Repair',
    category: 'EXHAUST REPAIR',
    shortDesc: 'Complete exhaust system diagnostics, pipe sealing, flange welding & component restoration.',
    highlights: [
      'Full Exhaust System Diagnostics',
      'Pipe, Flange & Gasket Sealing',
      'Covers Cars, SUVs & Commercial Fleets',
      'Fast Turnaround Service',
    ],
    iconComponent: FaWrench,
    badgeColor: '#d97706',
    bgColor: '#fffbeb',
  },
];

async function getServices() {
  const isDev = process.env.NODE_ENV === 'development';
  const urlsToTry = [
    ...(isDev ? ['http://localhost:5000/api/services'] : []),
    `${process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin'}/api/services`
  ];

  const iconMap = {
    FaFilter, FaIndustry, FaLeaf, FaLink, FaWrench
  };

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800);
      const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        const apiMap = new Map();
        data.services.forEach((s, idx) => {
          const key = s.id || `svc-${idx + 1}`;
          apiMap.set(key, s);
          if (s.title) apiMap.set(s.title.toLowerCase(), s);
        });

        // Merge backend updates over default services
        const mergedDefaults = allServices
          .map((def, idx) => {
            const apiSvc = apiMap.get(`svc-${idx + 1}`) || apiMap.get(def.title.toLowerCase());
            if (!apiSvc) return def;
            if (apiSvc.visible === false) return null;

            const iconComp = apiSvc.icon ? (iconMap[apiSvc.icon] || FaWrench) : def.iconComponent;
            return {
              ...def,
              title: apiSvc.title || def.title,
              shortDesc: apiSvc.desc || apiSvc.shortDesc || def.shortDesc,
              fullDesc: apiSvc.fullDesc || def.fullDesc,
              iconComponent: iconComp
            };
          })
          .filter(Boolean);

        // Collect new dynamic services created in admin panel
        const defaultKeys = new Set(allServices.map((d, i) => `svc-${i + 1}`));
        const defaultTitles = new Set(allServices.map(d => d.title.toLowerCase()));

        const extraFromBackend = data.services
          .filter(s => s.visible !== false && !defaultKeys.has(s.id) && !defaultTitles.has((s.title || '').toLowerCase()))
          .map(s => ({
            slug: s.slug || s.link?.replace('/services/', '').replace('/#', '') || `service-${s.id}`,
            title: s.title,
            category: 'SPECIALIZED SERVICE',
            shortDesc: s.desc || s.fullDesc || 'Specialized service engineered for maximum performance.',
            highlights: [
              '100% Quality Inspected & Tested',
              'OEM Specification Guaranteed',
              'Experienced Technicians & Warranty'
            ],
            iconComponent: s.icon ? (iconMap[s.icon] || FaWrench) : FaWrench,
            badgeColor: '#dc2626',
            bgColor: '#fef2f2'
          }));

        return [...mergedDefaults, ...extraFromBackend];
      }
    } catch (err) { }
  }
  return allServices;
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '4rem' }}>
        {/* Hero Header */}
        <div style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          padding: '1.5rem 1.25rem 1.25rem',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', padding: '0 0.5rem 0.5rem' }}>
            <BackButton />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="srv-hero-badge" style={{
              fontSize: '0.68rem',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
              display: 'block'
            }}>
              EXHAUST &amp; EMISSION SERVICES
            </span>
            <h1 className="srv-hero-title" style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem 0',
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              letterSpacing: '0.02em',
              color: '#0f172a'
            }}>
              OUR SPECIALIZED <span style={{ color: '#dc2626' }}>SERVICES</span>
            </h1>
            <p className="srv-hero-sub" style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '400', lineHeight: '1.5' }}>
              ISO 9001:2015 certified silencer manufacturing and 5-stage scientific DPF restoration for all passenger and commercial vehicles.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <section style={{ maxWidth: '1240px', margin: '2.5rem auto 0', padding: '0 1.25rem' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
            .srv-page-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
            }
            .srv-page-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 0;
              overflow: hidden;
              box-shadow: 0 4px 16px rgba(0,0,0,0.04);
              transition: all 0.25s ease;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              color: inherit;
            }
            .srv-page-card:hover {
              transform: translateY(-5px);
              border-color: #dc2626;
              box-shadow: 0 12px 32px rgba(220, 38, 38, 0.14);
            }
            .srv-page-header {
              padding: 1.5rem 1.25rem 1rem;
              display: flex;
              align-items: center;
              gap: 1rem;
              border-bottom: 1px solid #f1f5f9;
            }
            .srv-page-icon-wrap {
              width: 52px;
              height: 52px;
              border-radius: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.35rem;
              flex-shrink: 0;
              transition: transform 0.25s ease;
            }
            .srv-page-card:hover .srv-page-icon-wrap {
              transform: scale(1.08);
            }
            .srv-page-title {
              font-size: 0.95rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 0.25rem 0;
              text-transform: uppercase;
              letter-spacing: 0.01em;
              line-height: 1.25;
            }
            .srv-page-category {
              font-size: 0.62rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              display: inline-block;
            }
            .srv-page-body {
              padding: 1.25rem;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: #ffffff;
            }
            .srv-page-desc {
              font-size: 0.82rem;
              color: #475569;
              margin: 0 0 1rem 0;
              line-height: 1.6;
            }
            .srv-page-list {
              display: flex;
              flex-direction: column;
              gap: 0.45rem;
              margin-bottom: 1.25rem;
            }
            .srv-page-item {
              font-size: 0.76rem;
              color: #334155;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 0.45rem;
            }
            .srv-page-btn {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0.75rem 1rem;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 0;
              font-size: 0.74rem;
              font-weight: 800;
              color: #dc2626;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              transition: all 0.2s ease;
            }
            .srv-page-card:hover .srv-page-btn {
              background: #dc2626;
              color: #ffffff;
              border-color: #dc2626;
            }

            @media (max-width: 1024px) {
              .srv-page-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 640px) {
              .srv-hero-title { font-size: 1.15rem !important; margin-bottom: 0.15rem !important; }
              .srv-hero-sub { font-size: 0.72rem !important; line-height: 1.35 !important; }
              .srv-hero-badge { font-size: 0.6rem !important; }
              .srv-page-grid { grid-template-columns: 1fr; gap: 0.85rem; }
              .srv-page-header { padding: 0.9rem 0.85rem 0.75rem; gap: 0.75rem; }
              .srv-page-icon-wrap { width: 40px; height: 40px; font-size: 1.1rem; }
              .srv-page-title { font-size: 0.82rem; }
              .srv-page-category { font-size: 0.56rem; }
              .srv-page-body { padding: 0.85rem; }
              .srv-page-desc { font-size: 0.74rem; margin-bottom: 0.75rem; }
              .srv-page-item { font-size: 0.68rem; gap: 0.35rem; }
              .srv-page-btn { padding: 0.6rem 0.75rem; font-size: 0.66rem; }
            }
          `}} />

          <div className="srv-page-grid">
            {services.map((srv, idx) => {
              const IconComp = srv.iconComponent;
              return (
                <Link
                  href={`/services/${srv.slug}`}
                  key={srv.slug}
                  className="srv-page-card"
                >
                  <div className="srv-page-header">
                    <div className="srv-page-icon-wrap" style={{ backgroundColor: srv.bgColor, color: srv.badgeColor }}>
                      <IconComp />
                    </div>
                    <div>
                      <span className="srv-page-category" style={{ color: srv.badgeColor }}>{srv.category}</span>
                      <h3 className="srv-page-title">{srv.title}</h3>
                    </div>
                  </div>
                  <div className="srv-page-body">
                    <div>
                      <p className="srv-page-desc">{srv.shortDesc}</p>
                      <div className="srv-page-list">
                        {srv.highlights.map((h, i) => (
                          <div key={i} className="srv-page-item">
                            <FaCheckCircle color={srv.badgeColor} size={12} style={{ flexShrink: 0 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="srv-page-btn">
                      <span>VIEW FULL DETAILS &amp; GALLERY</span>
                      <FaArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
