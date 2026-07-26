import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { FaCalendarAlt, FaArrowLeft, FaQuestionCircle, FaUser, FaTag } from 'react-icons/fa';

async function getBlogPost(slug, isPreview = false) {
  try {
    const db = await connectDB();
    if (db) {
      const query = { slug };
      if (!isPreview) {
        query.visibility = 'visible';
      }
      const post = await BlogPost.findOne(query).lean();
      return post ? JSON.parse(JSON.stringify(post)) : null;
    } else {
      const data = getJsonDb();
      const post = (data.blogs || []).find(b => b.slug === slug && (isPreview || b.visibility === 'visible'));
      return post || null;
    }
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const isPreview = sParams?.preview === 'true';
  const post = await getBlogPost(slug, isPreview);

  if (!post) {
    return {
      title: 'Blog Article Not Found | Hi Quality Silencers',
      description: 'The requested blog article could not be found.',
    };
  }

  return {
    title: `${post.seoTitle || post.title} | Hi Quality Silencers`,
    description: post.seoDescription || post.excerpt || post.title,
    keywords: post.keywords || 'DPF cleaning, silencer manufacturer, OEM silencers',
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage || '/images/bg.webp'],
    }
  };
}

export default async function BlogPostDetail({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const isPreview = sParams?.preview === 'true';
  const post = await getBlogPost(slug, isPreview);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '96px', paddingBottom: '5rem' }}>
        {/* Article Banner */}
        <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4rem 1.5rem 3.5rem' }}>
          <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ef4444',
              fontSize: '0.8rem',
              fontWeight: '700',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              transition: 'color 0.2s'
            }}>
              <FaArrowLeft /> Back to Technical Guides
            </Link>

            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: '800',
              lineHeight: '1.25',
              margin: '0 0 1.5rem 0',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}>
              {post.title}
            </h1>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.8rem',
              color: '#94a3b8',
              borderTop: '1px solid #334155',
              paddingTop: '1.25rem'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaUser color="#dc2626" /> {post.author || 'Hi Quality Silencers Editorial'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaCalendarAlt color="#dc2626" /> {new Date(post.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaTag color="#dc2626" /> {post.category || 'DPF & Silencer Guide'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Article Content */}
        <article className="container" style={{ maxWidth: '860px', margin: '2.5rem auto 0', padding: '0 1.25rem' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '3rem 2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0'
          }}>
            <style dangerouslySetInnerHTML={{__html: `
              .blog-article-content img {
                max-width: 480px !important;
                width: 100% !important;
                height: auto !important;
                margin: 2.5rem auto !important;
                display: block !important;
                border-radius: 8px !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;
              }
              .blog-article-content p {
                margin-bottom: 1.5rem;
                line-height: 1.8;
                color: #334155;
              }
              .blog-article-content h2, .blog-article-content h3 {
                color: #0f172a;
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-weight: 700;
              }
            `}} />
            {/* Featured Main Image */}
            {post.featuredImage && (
              <div style={{ marginBottom: '2rem', borderRadius: '10px', overflow: 'hidden', maxHeight: '420px', position: 'relative' }}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-article-content"
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.8',
                color: '#334155',
                fontFamily: 'var(--font-sans)',
              }}
            />

            {/* Reference Images Gallery */}
            {post.referenceImages && post.referenceImages.length > 0 && (
              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                  Reference Images &amp; Technical Diagrams
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {post.referenceImages.map((imgUrl, idx) => (
                    <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <img src={imgUrl} alt={`Reference ${idx + 1}`} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BLOG SPECIFIC FAQs (Rendered as interactive accordion if present) */}
          {post.faqs && post.faqs.length > 0 && (
            <section style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '2rem',
              marginTop: '3rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <FaQuestionCircle size={22} color="#dc2626" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  FREQUENTLY ASKED QUESTIONS ABOUT THIS ARTICLE
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {post.faqs.map((faq, i) => (
                  <div key={i} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '1.1rem 1.25rem'
                  }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
            }}>
              <FaArrowLeft /> View All Technical Guides
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
