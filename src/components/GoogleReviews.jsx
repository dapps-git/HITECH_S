'use client';

import React, { useState, useEffect } from 'react';
import styles from './GoogleReviews.module.css';

export default function GoogleReviews() {
  const [data, setData] = useState({
    businessName: 'Hi-Quality Silencers',
    rating: 4.8,
    user_ratings_total: 45,
    googleReviewUrl: 'https://www.google.com/search?hl=en-IN&gl=in&q=Hi+Quality+Silencers,+Cross+Road,+behind+Ambika+Hotel,+Passport+Office,+East+Nadakkave,+Nadakkave,+Kozhikode,+Kerala+673006&ludocid=11199802823282393819&lsig=AB86z5Vtm5x1ryatQXnDIqYArUw9#lrd=0x3ba65ec90c5bbccd:0x9b6db154242a02db,3,,,,',
    reviews: [
      {
        author_name: 'Sahil Mo',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'last month',
        text: 'fast service good service'
      },
      {
        author_name: 'Dnyaneshwar Pawar',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'last month',
        text: 'Very good service'
      },
      {
        author_name: 'Pankaj Borole',
        profile_photo_url: '',
        rating: 4,
        relative_time_description: '2 months ago',
        text: 'Good quality silencer and quick response from staff.'
      },
      {
        author_name: 'JIBIN M',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'a week ago',
        text: 'good product & Super quality'
      },
      {
        author_name: 'PRAVEEN C V',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: '2 weeks ago',
        text: 'Excellent service and genuine quality products.'
      }
    ]
  });

  const [mounted, setMounted] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchReviews() {
      try {
        const res = await fetch('/api/google-reviews');
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error('Failed to load Google reviews:', err);
      }
    }
    fetchReviews();

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth <= 640) {
          setItemsPerPage(1);
        } else if (window.innerWidth <= 1024) {
          setItemsPerPage(2);
        } else {
          setItemsPerPage(3);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reviews = data.reviews || [];
  const currentItemsPerPage = mounted ? itemsPerPage : 3;

  // Auto-slide every 2.5 seconds (paused on hover)
  useEffect(() => {
    if (!mounted || isHovered || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [mounted, isHovered, reviews.length]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, reviews.length - currentItemsPerPage) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + currentItemsPerPage);
  if (visibleReviews.length < currentItemsPerPage && reviews.length >= currentItemsPerPage) {
    visibleReviews.push(...reviews.slice(0, currentItemsPerPage - visibleReviews.length));
  }

  // Google profile avatar fallback color generator
  const getAvatarDetails = (name = '') => {
    const initial = name.trim().charAt(0).toUpperCase() || 'U';
    const googleColors = [
      '#9c27b0', // Purple (Sahil Mo, Swati)
      '#e65100', // Orange (Dnyaneshwar Pawar)
      '#0d47a1', // Dark Blue (Pankaj Borole)
      '#1a73e8', // Blue (Jibin M)
      '#2e7d32', // Green
      '#c62828', // Red
      '#00838f', // Teal
      '#ad1457'  // Magenta
    ];
    const charCode = initial.charCodeAt(0) || 65;
    const bg = googleColors[charCode % googleColors.length];
    return { initial, bg };
  };

  const renderStars = (rating = 5) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Calculate pagination dots count
  const totalPages = Math.ceil(reviews.length / currentItemsPerPage) || 1;
  const currentPage = Math.floor(startIndex / currentItemsPerPage);

  return (
    <section className={styles.reviewsSection} id="customer-reviews">
      <div className={styles.container}>
        <div className={styles.flexLayout}>

          {/* Left Business Card */}
          <div className={styles.headerCard}>
            <div className={styles.businessHeaderRow}>
              <div className={styles.businessAvatar}>
                <img
                  src="/images/logo_hq.png"
                  alt="Hi-Quality Silencers Logo"
                  className={styles.businessLogoImg}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.ratingScore}>{data.rating}</span>
              <div className={styles.stars}>{renderStars(Math.round(data.rating))}</div>
            </div>

            <p className={styles.reviewCountText}>
              Based on {data.user_ratings_total} reviews
            </p>

            <div className={styles.poweredBy}>
              powered by{' '}
              <span className={styles.googleText}>
                <span className={styles.googleG}>G</span>
                <span className={styles.googleO1}>o</span>
                <span className={styles.googleO2}>o</span>
                <span className={styles.googleG2}>g</span>
                <span className={styles.googleL}>l</span>
                <span className={styles.googleE}>e</span>
              </span>
            </div>

            <a
              href="https://search.google.com/local/writereview?placeid=ChIJzbxbD1lepjsR2wIqJFSxbZs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviewUsBtn}
              title="Click to write a review on Google"
            >
              review us on <img src="/google.webp" alt="G" className={styles.gBtnIconWebp} />
            </a>
          </div>

          {/* Right Cards Track */}
          <div
            className={styles.sliderArea}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {reviews.length > 0 && (
              <>
                <button
                  onClick={handlePrev}
                  className={styles.navBtnPrev}
                  aria-label="Previous reviews"
                >
                  &#10094;
                </button>

                <div className={styles.cardsTrack}>
                  {visibleReviews.map((rev, idx) => {
                    const avatar = getAvatarDetails(rev.author_name);
                    return (
                      <div key={idx} className={styles.reviewCard}>
                        {/* Top Right Google webp Badge */}
                        <span className={styles.googleCardIcon}>
                          <img src="/google.webp" alt="Google" className={styles.googleWebpIcon} />
                        </span>

                        <div className={styles.cardHeader}>
                          <div
                            className={styles.reviewerAvatar}
                            style={{ backgroundColor: avatar.bg }}
                          >
                            {rev.profile_photo_url ? (
                              <img
                                src={rev.profile_photo_url}
                                alt={rev.author_name}
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                              />
                            ) : (
                              avatar.initial
                            )}
                          </div>

                          <div className={styles.reviewerMeta}>
                            <h4 className={styles.reviewerName}>{rev.author_name}</h4>
                            <span className={styles.reviewTime}>
                              {rev.relative_time_description || 'recently'}
                            </span>
                          </div>
                        </div>

                        <div className={styles.cardStars}>
                          {renderStars(rev.rating)}
                        </div>

                        <p className={styles.reviewText}>{rev.text}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  className={styles.navBtnNext}
                  aria-label="Next reviews"
                >
                  &#10095;
                </button>

                {/* Pagination Dots */}
                <div className={styles.dotsRow}>
                  {Array.from({ length: totalPages }).map((_, pIdx) => (
                    <span
                      key={pIdx}
                      onClick={() => setStartIndex(pIdx * currentItemsPerPage)}
                      className={`${styles.dot} ${pIdx === currentPage ? styles.activeDot : ''
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
