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

const testimonials = [
  {
    quote: "Hi Quality Silencers restored our truck DPF perfectly. Fuel consumption reduced noticeably and the DPF warning light has not come back. The parcel service from our location was very convenient.",
    author: "FLEET MANAGER — KERALA LOGISTICS",
    role: "Heavy Commercial Vehicles",
  },
  {
    quote: "After trying local cleaning services with no result, Hi Quality Silencers used their 4-stage process. Within 2 days the DPF was clean, pressure tested and returned. Excellent service.",
    author: "AUTHORIZED WORKSHOP — KOCHI",
    role: "Passenger Vehicle Service Center",
  },
];

export default function BlogPosts() {
  const [active, setActive] = useState(0);

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
                <a href="#faq" className={styles.readMore}>Read Full Guide →</a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL SLIDER */}
      <div className={styles.testimonialBlock}>
        <div className={styles.innerContainer}>
          <span className={styles.quoteMark}>"</span>
          <p className={styles.quoteText}>{testimonials[active].quote}</p>
          <span className={styles.author}>{testimonials[active].author}</span>
          <span className={styles.role}>{testimonials[active].role}</span>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA BOTTOM STRIP */}
      <div className={styles.ctaStrip}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>READY TO RESTORE YOUR DPF?</h3>
              <p className={styles.ctaDesc}>Send your DPF unit via parcel to our workshop anywhere in India. Starting from ₹6,000.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href="tel:+919876543210" className={styles.ctaRed}>
                <FaPhone /> Call for Booking
              </a>
              <a href="#faq" className={styles.ctaOutline}>
                Read FAQ Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
