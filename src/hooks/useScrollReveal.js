'use client';
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements || revealElements.length === 0) return;

    // Immediately activate elements already visible in viewport
    const checkImmediately = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
        }
      });
    };

    checkImmediately();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    revealElements.forEach((el) => observer.observe(el));

    // Fallback timer: ensure all elements become active after 1 second so nothing stays hidden
    const fallbackTimer = setTimeout(() => {
      revealElements.forEach(el => el.classList.add('active'));
    }, 1000);

    return () => {
      clearTimeout(fallbackTimer);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
