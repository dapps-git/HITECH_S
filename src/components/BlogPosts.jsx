'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogPosts.module.css';

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

export default function BlogPosts() {
  const [blogs, setBlogs] = useState(seedBlogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      const urlsToTry = [
        'http://localhost:5000/api/blogs',
        '/api/blogs',
        `${process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin'}/api/blogs`
      ];

      for (const url of urlsToTry) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          const data = await res.json();
          if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
            setBlogs(data.blogs.slice(0, 4));
            break;
          }
        } catch (err) {}
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return null;
  }

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
          {blogs.map(post => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
