import Link from 'next/link';
import Image from 'next/image';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { FaCalendarAlt, FaArrowRight, FaTag, FaArrowLeft } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "DPF Maintenance & Silencer Technical Guides | Hi Quality Silencers",
  description: "Expert articles, technical guides, DPF troubleshooting, and OEM silencer manufacturing insights from Hi Quality Silencers.",
};

async function getPublishedBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    const res = await fetch(`${apiUrl}/api/blogs`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blogs) {
        return data.blogs.filter(b => b.visibility === 'visible' || !b.visibility);
      }
    }
  } catch (err) {}
  return [];
}

export default async function BlogIndexPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .blog-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06) !important;
        }
        .blog-card-img-container {
          overflow: hidden;
        }
        .blog-card-img-container img {
          transition: transform 0.3s ease !important;
        }
        .blog-card-img-container:hover img {
          transform: scale(1.04);
        }
        .blog-title-link {
          color: #0f172a;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .blog-title-link:hover {
          color: #dc2626;
        }
      `}} />
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '96px', paddingBottom: '5rem' }}>
        {/* Light Hero Header */}
        <div style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          padding: '2.5rem 1.5rem 2rem',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', padding: '0 0.5rem 1rem' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#dc2626',
              fontSize: '0.8rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}>
              <FaArrowLeft size={12} /> BACK TO HOME
            </Link>
          </div>

          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              color: '#dc2626',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              display: 'block'
            }}>
              TECHNICAL KNOWLEDGE BASE
            </span>
            <h1 style={{
              fontSize: '1.85rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem 0',
              fontFamily: 'var(--font-heading)',
              color: '#0f172a'
            }}>
              DPF &amp; SILENCER <span style={{ color: '#dc2626' }}>TECHNICAL GUIDES</span>
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, fontWeight: '400' }}>
              Expert articles to help vehicle owners understand DPF maintenance, warning signs, scanner values, and professional restoration.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="container" style={{ maxWidth: '1240px', margin: '3rem auto 0', padding: '0 1.25rem' }}>
          {blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
              <h2>No Published Blog Posts Yet</h2>
              <p>Check back soon for latest technical guides and maintenance tips.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.75rem'
            }}>
              {blogs.map((b) => (
                <article key={b._id || b.id} className="blog-card" style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Featured Cover Image */}
                  <Link href={`/blog/${b.slug}`}>
                    <div className="blog-card-img-container" style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#0f172a', cursor: 'pointer' }}>
                      <Image
                        src={b.featuredImage || '/images/bg.webp'}
                        alt={b.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#dc2626',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        zIndex: 1
                      }}>
                        {b.category || 'GUIDE'}
                      </div>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.74rem',
                      color: '#64748b',
                      marginBottom: '0.5rem'
                    }}>
                      <FaCalendarAlt size={11} color="#dc2626" />
                      <span>{new Date(b.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h2 style={{
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      lineHeight: '1.35',
                      margin: '0 0 0.65rem 0',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      <Link href={`/blog/${b.slug}`} className="blog-title-link">
                        {b.title}
                      </Link>
                    </h2>

                    <p style={{
                      fontSize: '0.8rem',
                      color: '#475569',
                      lineHeight: '1.45',
                      margin: '0 0 1.25rem 0',
                      flex: 1
                    }}>
                      {b.excerpt || (b.content ? b.content.replace(/<[^>]+>/g, '').substring(0, 110) + '...' : '')}
                    </p>

                    <Link href={`/blog/${b.slug}`} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#dc2626',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      textDecoration: 'none'
                    }}>
                      Read Full Article <FaArrowRight size={11} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
