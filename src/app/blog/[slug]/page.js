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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultSeedBlogs = [
  {
    id: 'blog-dpf-fault-codes',
    _id: 'blog-dpf-fault-codes',
    title: 'Common DPF Fault Codes That Can Often Be Resolved by Professional DPF Restoration',
    slug: 'common-dpf-fault-codes-resolved-by-professional-restoration',
    category: 'DPF DIAGNOSTICS',
    featuredImage: '/images/dpf_fault_codes_guide.png',
    excerpt: 'Diagnostic guide to common Diesel Particulate Filter (DPF) fault codes. Learn which soot, ash, and pressure error codes can be resolved through professional restoration, and which require sensor or mechanical repairs.',
    publishDate: '2026-08-01T12:00:00.000Z',
    visibility: 'visible',
    author: 'Hi Quality Silencers Technical Team',
    seoTitle: 'Common DPF Fault Codes & Professional DPF Restoration Guide',
    seoDescription: 'Learn which DPF error codes (P2463, P242F, P2458, P24A4, P244B) are resolvable with professional DPF restoration and which indicate sensor or structural faults.',
    keywords: 'DPF fault codes, P2463 soot accumulation, P242F ash accumulation, P2458 regeneration duration, P24A4 excessive soot, P244B pressure high, DPF restoration Calicut',
    content: `<p>When the DPF or Check Engine warning light illuminates on your diesel vehicle dashboard, diagnostic OBD-II scanners report specific fault codes. Understanding these error codes is essential to determine whether your Diesel Particulate Filter can be fully restored to OEM performance through 4-stage scientific cleaning, or if underlying sensor or mechanical repairs are required first.</p>

<h2>✅ Fault Codes Resolved by Professional DPF Restoration</h2>
<p>The following fault codes indicate heavy soot, ash, or flow restriction within the filter channels. These issues are directly addressed and typically resolved by our professional hydro-pneumatic restoration and thermal regeneration process:</p>

<ul>
  <li><strong>✅ P2463 – DPF Soot Accumulation:</strong> Triggered when soot loading exceeds normal passive and active regeneration limits. Restored completely after pneumatic flushing and soot removal.</li>
  <li><strong>✅ P242F – Excessive Ash Accumulation:</strong> Occurs due to non-combustible lubricant ash build-up over time. Resolvable if ash accumulation is within a restorable level and the DPF is not physically damaged.</li>
  <li><strong>✅ P2458 – DPF Regeneration Duration Too Long:</strong> Caused by severe exhaust flow restriction preventing successful regeneration cycles. Restored once normal flow dynamics are re-established.</li>
  <li><strong>✅ P24A4 – Excessive Soot Load:</strong> Indicates high soot volume inside the filter channels. Easily cleared after deep chemical soaking and flushing.</li>
  <li><strong>✅ P244B – DPF Differential Pressure Too High:</strong> Triggered by excessive pressure drop across the filter due to DPF blockage. Resolved once backpressure is normalized.</li>
</ul>

<h2>⚠️ Professional DPF Restoration May Not Resolve These Codes</h2>
<p>Certain fault codes stem from physical substrate damage, catalyst degradation, sensor failures, or external exhaust leaks. DPF cleaning alone will not fix these issues without addressing the root cause:</p>

<ul>
  <li><strong>❌ P2002 / P2003 – DPF Efficiency Below Threshold:</strong> May be caused by physical DPF damage, catalyst degradation, exhaust leaks, or sensor-related faults. DPF restoration alone may not resolve these codes.</li>
  <li><strong>❌ P244A – DPF Differential Pressure Too Low:</strong> Often caused by a faulty differential pressure sensor, blocked pressure pipes/hoses, or an internally damaged DPF.</li>
  <li><strong>❌ P2452 / P2453 / P2454 / P2455 – Differential Pressure Sensor Circuit Faults:</strong> Differential pressure sensor or wiring faults; DPF cleaning/restoration will not resolve these.</li>
</ul>

<h2>🔍 Important Technical Recommendation & Final Inspection</h2>
<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 1.25rem; border-radius: 8px; margin-top: 1.5rem;">
  <p style="margin-bottom: 0.75rem; color: #991b1b;"><strong>Note:</strong> Final diagnosis should always be confirmed using live diagnostic data, differential pressure testing, and a physical DPF inspection before recommending DPF restoration, repair, or replacement.</p>
  <p style="margin: 0; color: #991b1b;">DPF restoration is recommended only for structurally serviceable DPFs. Any underlying engine, sensor, or exhaust system faults (such as faulty injectors or EGR valves) should be diagnosed and repaired to prevent repeat DPF blockage.</p>
</div>`,
    faqs: [
      {
        question: "Can P2463 DPF Soot Accumulation code be cleared by DPF restoration?",
        answer: "Yes. Code P2463 is directly caused by high soot loading inside the filter. Professional 4-stage DPF restoration removes 98%+ of soot deposits and restores original exhaust backpressure, allowing the ECU to clear the error."
      },
      {
        question: "Will DPF restoration fix P2452 or P2453 differential pressure sensor codes?",
        answer: "No. P2452, P2453, P2454, and P2455 are electrical or sensor circuit faults. The differential pressure sensor or its wiring harness must be diagnosed and replaced by a technician."
      },
      {
        question: "Is ash accumulation (P242F) cleanable?",
        answer: "Yes, provided the ash accumulation is within a restorable level and the ceramic honeycomb filter core is structurally intact without melted or cracked channels."
      }
    ]
  }
];

async function getBlogPost(slug, isPreview = false) {
  const cleanSlug = slug ? decodeURIComponent(slug).toLowerCase().trim() : '';

  try {
    // 1. Try DB / MongoDB first
    const db = await connectDB();
    if (db) {
      const query = { $or: [{ slug: cleanSlug }, { id: cleanSlug }, { _id: cleanSlug }] };
      if (!isPreview) {
        query.visibility = 'visible';
      }
      const post = await BlogPost.findOne(query).lean();
      if (post) return JSON.parse(JSON.stringify(post));
    }
  } catch (err) {}

  try {
    // 2. Try JSON DB
    const data = getJsonDb();
    let post = (data.blogs || []).find(b => 
      (b.slug === cleanSlug || b.id === cleanSlug || b._id === cleanSlug || b.slug?.includes(cleanSlug) || cleanSlug.includes(b.slug)) &&
      (isPreview || b.visibility === 'visible' || !b.visibility)
    );
    if (post) return post;
  } catch (err) {}

  try {
    // 3. Fallback to Live Backend API endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
    const res = await fetch(`${apiUrl}/api/blogs?all=true`, { cache: 'no-store' });
    if (res.ok) {
      const apiData = await res.json();
      if (apiData.success && Array.isArray(apiData.blogs)) {
        const found = apiData.blogs.find(b => 
          (b.slug === cleanSlug || b.id === cleanSlug || b._id === cleanSlug) &&
          (isPreview || b.visibility === 'visible' || !b.visibility)
        );
        if (found) return found;
      }
    }
  } catch (err) {}

  // 4. Ultimate seed fallback
  const seedMatch = defaultSeedBlogs.find(b => 
    b.slug === cleanSlug || b.id === cleanSlug || cleanSlug.includes('fault-codes') || cleanSlug.includes('dpf')
  );
  if (seedMatch) return seedMatch;

  return null;
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
        {/* Article Header */}
        <div style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '2.5rem 1.5rem 2rem', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#dc2626',
              fontSize: '0.8rem',
              fontWeight: '600',
              textDecoration: 'none',
              marginBottom: '1rem',
              transition: 'color 0.2s'
            }}>
              <FaArrowLeft size={12} /> BACK TO TECHNICAL GUIDES
            </Link>

            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              lineHeight: '1.25',
              margin: '0 0 1.25rem 0',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color: '#0f172a'
            }}>
              {post.title}
            </h1>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.78rem',
              color: '#64748b',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1rem'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaUser color="#dc2626" size={12} /> {post.author || 'Hi Quality Silencers Editorial'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaCalendarAlt color="#dc2626" size={12} /> {new Date(post.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaTag color="#dc2626" size={12} /> {post.category || 'DPF & Silencer Guide'}
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
              dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/<img[^>]*>/gi, '').replace(/<p>\s*<\/p>/gi, '') }}
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
        </article>
      </main>

      <Footer />
    </div>
  );
}
