import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "All Blog Articles & DPF Diagnostic Guides | Hi Quality Silencers",
  description: "Read technical articles, DPF diagnostic fault code guides, sensor cleaning tutorials, and maintenance advice from Hi Quality Silencers technical team.",
};

const defaultSeedBlogs = [
  {
    id: 'blog-dpf-fault-codes',
    _id: 'blog-dpf-fault-codes',
    title: 'Common DPF Fault Codes That Can Often Be Resolved by Professional DPF Restoration',
    slug: 'common-dpf-fault-codes-resolved-by-professional-restoration',
    category: 'DPF DIAGNOSTICS',
    featuredImage: '/images/dpf_fault_codes_guide_v2.jpg',
    excerpt: 'Diagnostic guide to common Diesel Particulate Filter (DPF) fault codes. Learn which soot, ash, and pressure error codes can be resolved through professional restoration, and which require sensor or mechanical repairs.',
    publishDate: '2026-08-01T12:00:00.000Z',
    author: 'Hi Quality Silencers Technical Team',
  },
  {
    id: 'blog-dpf-sensor-pressure-pipe-cleaning',
    _id: 'blog-dpf-sensor-pressure-pipe-cleaning',
    title: 'DPF Sensor & Pressure Pipe Cleaning Guidelines',
    slug: 'dpf-sensor-pressure-pipe-cleaning-guidelines',
    category: 'DPF MAINTENANCE',
    featuredImage: '/images/dpf_sensors_pipes_cleaning_guide.jpg',
    excerpt: 'Complete cleaning guidelines for DPF sensors (EGT, Oxygen/Lambda) and pressure pipes. Learn safe cleaning procedures, precautions, and how to avoid sensor damage.',
    publishDate: '2026-08-01T13:00:00.000Z',
    author: 'Hi Quality Silencers Technical Team',
  }
];

async function getAllBlogs() {
  const urlsToTry = [
    'http://localhost:5000/api/blogs',
    `${process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin'}/api/blogs`
  ];

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const apiData = await res.json();
      if (apiData.success && Array.isArray(apiData.blogs) && apiData.blogs.length > 0) {
        return apiData.blogs;
      }
    } catch (err) {}
  }

  try {
    const data = getJsonDb();
    if (data.blogs && data.blogs.length > 0) {
      const visible = data.blogs.filter(b => b.visibility === 'visible' || !b.visibility);
      if (visible.length > 0) return visible;
    }
  } catch (err) {}

  return defaultSeedBlogs;
}

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

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
            <span className="blog-hero-badge" style={{
              fontSize: '0.68rem',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
              display: 'block'
            }}>
              TECHNICAL BLOG &amp; DPF KNOWLEDGE BASE
            </span>
            <h1 className="blog-hero-title" style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem 0',
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              letterSpacing: '0.02em',
              color: '#0f172a'
            }}>
              ARTICLES &amp; <span style={{ color: '#dc2626' }}>DIAGNOSTIC GUIDES</span>
            </h1>
            <p className="blog-hero-sub" style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '400', lineHeight: '1.5' }}>
              Expert insights, OBD-II fault code resolutions, and DPF maintenance guides written by Hi Quality Silencers technical experts.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <section style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '0 1.25rem' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .blog-list-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.75rem;
            }
            .blog-list-card {
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
            .blog-list-card:hover {
              transform: translateY(-5px);
              border-color: #dc2626;
              box-shadow: 0 12px 32px rgba(220, 38, 38, 0.14);
            }
            .blog-list-img-wrap {
              position: relative;
              width: 100%;
              height: 220px;
              overflow: hidden;
              background: #0f172a;
            }
            .blog-list-img-wrap img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            }
            .blog-list-card:hover .blog-list-img-wrap img {
              transform: scale(1.05);
            }
            .blog-list-badge {
              position: absolute;
              top: 12px;
              left: 12px;
              background: #dc2626;
              color: #ffffff;
              font-size: 0.64rem;
              font-weight: 800;
              padding: 3px 10px;
              border-radius: 0;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
            .blog-list-body {
              padding: 1.35rem;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: #ffffff;
            }
            .blog-list-meta {
              display: flex;
              align-items: center;
              gap: 1rem;
              font-size: 0.72rem;
              color: #64748b;
              margin-bottom: 0.65rem;
            }
            .blog-list-title {
              font-size: 1.05rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 0.5rem 0;
              line-height: 1.35;
              font-family: var(--font-heading), Montserrat, sans-serif;
            }
            .blog-list-excerpt {
              font-size: 0.82rem;
              color: #475569;
              margin: 0 0 1.25rem 0;
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .blog-list-btn {
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
            .blog-list-card:hover .blog-list-btn {
              background: #dc2626;
              color: #ffffff;
              border-color: #dc2626;
            }

            @media (max-width: 768px) {
              .blog-hero-title { font-size: 1.15rem !important; margin-bottom: 0.15rem !important; }
              .blog-hero-sub { font-size: 0.72rem !important; line-height: 1.35 !important; }
              .blog-hero-badge { font-size: 0.6rem !important; }
              .blog-list-grid { grid-template-columns: 1fr; gap: 0.85rem; }
              .blog-list-img-wrap { height: 160px; }
              .blog-list-body { padding: 0.85rem; }
              .blog-list-title { font-size: 0.88rem; line-height: 1.3; }
              .blog-list-excerpt { font-size: 0.74rem; margin-bottom: 0.75rem; -webkit-line-clamp: 2; }
              .blog-list-meta { font-size: 0.65rem; gap: 0.65rem; margin-bottom: 0.4rem; }
              .blog-list-btn { padding: 0.6rem 0.75rem; font-size: 0.66rem; }
            }
          `}} />

          <div className="blog-list-grid">
            {blogs.map((post, idx) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id || post._id || idx}
                className="blog-list-card"
              >
                <div className="blog-list-img-wrap">
                  <span className="blog-list-badge">{post.category || 'DPF GUIDE'}</span>
                  <img
                    src={post.featuredImage || '/images/bg.webp'}
                    alt={post.title}
                  />
                </div>
                <div className="blog-list-body">
                  <div>
                    <div className="blog-list-meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FaUser color="#dc2626" size={10} /> {post.author || 'Technical Team'}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FaCalendarAlt color="#dc2626" size={10} /> {new Date(post.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="blog-list-title">{post.title}</h2>
                    <p className="blog-list-excerpt">
                      {post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').substring(0, 140) + '...' : '')}
                    </p>
                  </div>
                  <div className="blog-list-btn">
                    <span>READ FULL ARTICLE</span>
                    <FaArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
