'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogPosts.module.css';

export default function BlogPosts() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
        const res = await fetch(`${apiUrl}/api/blogs`);
        const data = await res.json();
        if (data.success && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs.slice(0, 4));
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} id="journal">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">OUR BLOG</h2>
          <p className={styles.subtitle}>Expert articles to help vehicle owners understand DPF maintenance, warning signs & professional restoration.</p>
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
