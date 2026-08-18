'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogPosts.module.css';

import { FaArrowRight } from 'react-icons/fa';

const seedBlogs = [
  {
    id: 'blog-dpf-fault-codes',
    _id: 'blog-dpf-fault-codes',
    title: 'Common DPF Fault Codes That Can Often Be Resolved by Professional DPF Restoration',
    slug: 'common-dpf-fault-codes-resolved-by-professional-restoration',
    category: 'DPF DIAGNOSTICS',
    featuredImage: '/images/dpf_fault_codes_guide_v2.jpg',
    excerpt: 'Diagnostic guide to common Diesel Particulate Filter (DPF) fault codes. Learn which soot, ash, and pressure error codes can be resolved through professional restoration, and which require sensor or mechanical repairs.'
  },
  {
    id: 'blog-dpf-sensor-pressure-pipe-cleaning',
    _id: 'blog-dpf-sensor-pressure-pipe-cleaning',
    title: 'DPF Sensor & Pressure Pipe Cleaning Guidelines',
    slug: 'dpf-sensor-pressure-pipe-cleaning-guidelines',
    category: 'DPF MAINTENANCE',
    featuredImage: '/images/dpf_sensors_pipes_cleaning_guide.jpg',
    excerpt: 'Complete cleaning guidelines for DPF sensors (EGT, Oxygen/Lambda) and pressure pipes. Learn safe cleaning procedures, precautions, and how to avoid sensor damage.'
  }
];

import { fetchBlogsApi } from '@/lib/apiPrefetch';
import { BlogSkeleton } from './SkeletonLoader';

export default function BlogPosts() {
  const [blogs, setBlogs] = useState(seedBlogs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogsApi().then(apiBlogs => {
      if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
        setBlogs(apiBlogs);
      }
    });
  }, []);

  if (blogs.length === 0) {
    return null;
  }

  const displayedBlogs = blogs.slice(0, 4);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerLine} />
            <h2 className={styles.headerTitle}>
              OUR <span className={styles.titleRed}>BLOG</span>
            </h2>
            <span className={styles.headerLine} />
          </div>
          <p className={styles.headerSub}>
            Expert articles to help vehicle owners understand DPF maintenance, warning signs &amp; professional restoration.
          </p>
        </div>
        <div className={styles.grid}>
          {loading ? (
            <BlogSkeleton count={3} />
          ) : (
            displayedBlogs.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.id || post._id} className={styles.card} style={{ textDecoration: 'none' }}>
                <div className={styles.imageBox}>
                  <Image src={post.featuredImage || '/images/bg.webp'} alt={post.title} fill className={styles.image} />
                  <span className={styles.guideBadge}>{post.category || 'GUIDE'}</span>
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.excerpt}>{post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').substring(0, 110) + '...' : '')}</p>
                  <span className={styles.readMore}>Read Full Article</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* VIEW ALL BLOGS BUTTON — Only show when there are more than 4 blogs */}
        {blogs.length > 4 && (
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <Link href="/blog" className={styles.viewAllBtn}>
              VIEW ALL BLOGS <FaArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
