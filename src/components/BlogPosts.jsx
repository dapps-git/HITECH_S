'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './BlogPosts.module.css';
import { FaPhone, FaTruck } from 'react-icons/fa';

const guides = [
  {
    id: 1,
    date: 'TECHNICAL GUIDE',
    title: 'What Are the Warning Signs Your DPF Needs Cleaning?',
    excerpt: 'DPF light on, excessive black smoke, loss of pulling power and high exhaust temperatures are all indicators your DPF urgently needs professional attention.',
    image: '/feature-wheels.png',
  },
  {
    id: 2,
    date: 'DIAGNOSTIC GUIDE',
    title: 'How to Read OBD Scanner Values Before Sending Your DPF',
    excerpt: 'Using an OBD diagnostic scanner to record Soot Value, Clogging % and fault codes before cleaning helps verify restoration effectiveness.',
    image: '/blog-cockpit.png',
  },
  {
    id: 3,
    date: 'MAINTENANCE GUIDE',
    title: 'Why Simple Heat Treatment or Pressure Washing Is Not Enough',
    excerpt: 'Ash residue cannot be removed by heat or pressure alone. Only chemical soaking + hydro-pneumatic flushing guarantees complete DPF restoration.',
    image: '/feature-cockpit.png',
  },
  {
    id: 4,
    date: 'TROUBLESHOOTING',
    title: "Warning Light Still ON After DPF Cleaning? Here's Why",
    excerpt: 'ECU fault codes stored, ash counter not reset, sensor faults or incomplete cleaning are common causes. Step-by-step diagnostic solutions inside.',
    image: '/feature-leather.png',
  },
];

export default function BlogPosts() {

  return (
    <section className={styles.section} id="journal">
      {/* TECHNICAL GUIDES */}
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">DPF TECHNICAL GUIDES</h2>
          <p className={styles.subtitle}>Expert articles to help vehicle owners understand DPF maintenance, warning signs & professional restoration.</p>
        </div>
        <div className={styles.grid}>
          {guides.map(post => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageBox}>
                <Image src={post.image} alt={post.title} fill className={styles.image} />
                <span className={styles.guideBadge}>{post.date}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA BOTTOM STRIP */}
      <div className={styles.ctaStrip}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>READY TO RESTORE YOUR EXHAUST SYSTEM?</h3>
              <p className={styles.ctaDesc}>Get in touch with Hi Quality Silencers for TUNEX® silencers & professional DPF cleaning starting from ₹6,000.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href="https://wa.me/919645888250" target="_blank" rel="noreferrer" className={styles.ctaRed}>
                <FaPhone /> Contact via WhatsApp
              </a>
              <a href="#about" className={styles.ctaOutline}>
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
