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
    featuredImage: '/images/dpf_fault_codes_guide_v2.jpg',
    excerpt: 'Diagnostic guide to common Diesel Particulate Filter (DPF) fault codes. Learn which soot, ash, and pressure error codes can be resolved through professional restoration, and which require sensor or mechanical repairs.',
    publishDate: '2026-08-01T12:00:00.000Z',
    visibility: 'visible',
    author: 'Hi Quality Silencers Technical Team',
    seoTitle: 'Common DPF Fault Codes & Professional DPF Restoration Guide',
    seoDescription: 'Learn which DPF error codes (P2463, P242F, P2458, P24A4, P244B) are resolvable with professional DPF restoration and which indicate sensor or structural faults.',
    keywords: 'DPF fault codes, P2463 soot accumulation, P242F ash accumulation, P2458 regeneration duration, P24A4 excessive soot, P244B pressure high, DPF restoration Calicut',
    content: `<p>When the DPF or Check Engine warning light illuminates on your diesel vehicle dashboard, diagnostic OBD-II scanners report specific fault codes. Understanding these error codes is essential to determine whether your Diesel Particulate Filter can be fully restored to OEM performance through 5-stage scientific cleaning, or if underlying sensor or mechanical repairs are required first.</p>

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
<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 1.25rem; margin-top: 1.5rem;">
  <p style="margin-bottom: 0.75rem; color: #991b1b;"><strong>Note:</strong> Final diagnosis should always be confirmed using live diagnostic data, differential pressure testing, and a physical DPF inspection before recommending DPF restoration, repair, or replacement.</p>
  <p style="margin: 0; color: #991b1b;">DPF restoration is recommended only for structurally serviceable DPFs. Any underlying engine, sensor, or exhaust system faults (such as faulty injectors or EGR valves) should be diagnosed and repaired to prevent repeat DPF blockage.</p>
</div>`,
    faqs: [
      {
        question: "Can P2463 DPF Soot Accumulation code be cleared by DPF restoration?",
        answer: "Yes. Code P2463 is directly caused by high soot loading inside the filter. Professional 5-stage DPF restoration removes 98%+ of soot deposits and restores original exhaust backpressure, allowing the ECU to clear the error."
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
    const db = await connectDB();
    if (db) {
      const query = { $or: [{ slug: cleanSlug }, { id: cleanSlug }, { _id: cleanSlug }] };
      if (!isPreview) query.visibility = 'visible';
      const post = await BlogPost.findOne(query).lean();
      if (post) return JSON.parse(JSON.stringify(post));
    }
  } catch (err) {}

  try {
    const data = getJsonDb();
    let post = (data.blogs || []).find(b =>
      (b.slug === cleanSlug || b.id === cleanSlug || b._id === cleanSlug || b.slug?.includes(cleanSlug) || cleanSlug.includes(b.slug)) &&
      (isPreview || b.visibility === 'visible' || !b.visibility)
    );
    if (post) return post;
  } catch (err) {}

  try {
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

  if (!post) notFound();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '96px', paddingBottom: '4rem' }}>

        {/* Article Header */}
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '2rem 1.25rem 1.5rem' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <Link href="/" className="blog-post-back-link" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              color: '#dc2626', fontSize: '0.72rem', fontWeight: '600',
              textDecoration: 'none', marginBottom: '1.1rem',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <FaArrowLeft size={9} /> Back to Home
            </Link>

            <style dangerouslySetInnerHTML={{__html: `
              .blog-post-title {
                font-size: 1.55rem;
                font-weight: 800;
                line-height: 1.2;
                margin: 0 0 1.1rem 0;
                font-family: var(--font-heading), sans-serif;
                text-transform: uppercase;
                letter-spacing: -0.01em;
                color: #0f172a;
              }
              @media (max-width: 640px) {
                .blog-post-title {
                  font-size: 1rem !important;
                  line-height: 1.25 !important;
                  letter-spacing: 0em !important;
                  margin-bottom: 0.85rem !important;
                }
                .blog-post-back-link {
                  font-size: 0.65rem !important;
                  margin-bottom: 0.85rem !important;
                }
                .blog-post-meta {
                  font-size: 0.66rem !important;
                  gap: 0.5rem 0.85rem !important;
                }
                .blog-post-category-tag {
                  font-size: 0.6rem !important;
                }
              }
            `}} />
            <h1 className="blog-post-title">
              {post.title}
            </h1>

            <div className="blog-post-meta" style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              gap: '0.75rem 1.25rem', fontSize: '0.73rem', color: '#64748b',
              borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaUser color="#dc2626" size={10} /> {post.author || 'Hi Quality Silencers Technical Team'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaCalendarAlt color="#dc2626" size={10} /> {new Date(post.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="blog-post-category-tag" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: '700',
                padding: '2px 8px', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.06em'
              }}>
                <FaTag size={9} /> {post.category || 'DPF & Silencer Guide'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Article */}
        <article style={{ maxWidth: '780px', margin: '0 auto', padding: '1.75rem 1.25rem 0' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .blog-article-content {
              font-size: 0.88rem;
              line-height: 1.78;
              color: #374151;
            }
            .blog-article-content p {
              margin-bottom: 1.1rem;
              line-height: 1.78;
              font-size: 0.88rem;
            }
            .blog-article-content h2 {
              font-size: 1.05rem;
              color: #0f172a;
              margin-top: 1.75rem;
              margin-bottom: 0.7rem;
              font-weight: 800;
              font-family: var(--font-heading), sans-serif;
              border-left: 3px solid #dc2626;
              padding-left: 0.6rem;
              line-height: 1.3;
              text-transform: uppercase;
              letter-spacing: 0.01em;
            }
            .blog-article-content h3 {
              font-size: 0.92rem;
              color: #111827;
              margin-top: 1.35rem;
              margin-bottom: 0.5rem;
              font-weight: 700;
              font-family: var(--font-heading), sans-serif;
              line-height: 1.35;
            }
            .blog-article-content ul, .blog-article-content ol {
              margin-bottom: 1.1rem;
              padding-left: 1.25rem;
            }
            .blog-article-content ul li {
              margin-bottom: 0.4rem;
              line-height: 1.6;
              font-size: 0.88rem;
              list-style-type: disc;
            }
            .blog-article-content ol li {
              margin-bottom: 0.4rem;
              line-height: 1.6;
              font-size: 0.88rem;
            }
            .blog-article-content strong {
              color: #0f172a;
              font-weight: 700;
            }
            .blog-article-content div, .blog-article-content blockquote {
              background: #f8fafc !important;
              border-left: 3px solid #dc2626 !important;
              padding: 0.85rem 1rem !important;
              border-radius: 0 !important;
              margin: 1.25rem 0 !important;
            }
            .blog-article-content div p, .blog-article-content blockquote p {
              color: #475569 !important;
              margin: 0 !important;
              font-size: 0.84rem !important;
              line-height: 1.6 !important;
            }
            .faq-card { transition: border-color 0.2s ease; }
            .faq-card:hover { border-color: #fecaca !important; }
            @media (max-width: 640px) {
              .blog-article-content { font-size: 0.82rem !important; line-height: 1.7 !important; }
              .blog-article-content h2 { font-size: 0.92rem !important; margin-top: 1.4rem !important; }
              .blog-article-content h3 { font-size: 0.85rem !important; }
              .blog-article-content p,
              .blog-article-content ul li,
              .blog-article-content ol li { font-size: 0.82rem !important; }
            }
          `}} />

          {/* Featured Image */}
          {post.featuredImage && (
            <div style={{ marginBottom: '1.75rem', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
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
          />

          {/* Reference Images */}
          {post.referenceImages && post.referenceImages.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Reference Images &amp; Technical Diagrams
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.85rem' }}>
                {post.referenceImages.map((imgUrl, idx) => (
                  <div key={idx} style={{ overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={imgUrl} alt={`Reference ${idx + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
                <FaQuestionCircle size={14} color="#dc2626" />
                <h2 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {post.faqs.map((faq, i) => (
                  <div key={i} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    padding: '0.9rem 1.1rem',
                  }} className="faq-card">
                    <h3 style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.35rem 0', display: 'flex', gap: '0.4rem' }}>
                      <span style={{ color: '#dc2626', flexShrink: 0 }}>Q:</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p style={{ fontSize: '0.81rem', color: '#4b5563', margin: 0, lineHeight: '1.55', paddingLeft: '1rem' }}>
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
