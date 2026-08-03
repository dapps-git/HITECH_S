'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './AboutSection.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from 'react-icons/fa';

export default function AboutSection() {
  useScrollReveal();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const videoElem = videoRef.current;
    if (!videoElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElem.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElem.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoElem);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.aboutGrid}>

          {/* Left: Text */}
          <div className={`${styles.aboutText} reveal-left`}>
            <div className={styles.badgeRow}>
              <div className={styles.redBar} />
              <span className={styles.badgeText}>About Us</span>
            </div>

            <div className={styles.headingBlock}>
              <h2 className={styles.aboutH2}>COMPLETE EXHAUST SYSTEM SOLUTIONS</h2>
              <h3 className={styles.aboutH3}>OEM Specification Silencer Manufacturing &amp; Professional DPF, DOC, SCR &amp; ASC Cleaning Services</h3>
            </div>

            <div className={styles.parasWrap}>
              <p className={styles.para}>
                Hi Quality Silencers is an ISO Certified company and the proud manufacturer of the{' '}
                TUNEX®️ brand, specializing in OEM Specification Silencers and Professional DPF, DOC, SCR & ASC Cleaning Services for passenger and commercial vehicles.
              </p>
              <p className={styles.para}>
                Our TUNEX®️ OEM Specification Silencers are engineered for precise OEM fitment, superior noise reduction, and reliable long-term performance. Each silencer is manufactured using high-quality tube pipes and 1.60 mm or 2.00 mm galvanised sheets or pipe, ensuring exceptional strength, corrosion resistance, and durability.
              </p>
              <p className={styles.para}>
                Designed to deliver a minimum service life of 10 years under normal operating conditions, every product undergoes stringent quality inspections before dispatch. In addition, we provide professional DPF, DOC, SCR & ASC cleaning services using advanced cleaning technology to restore exhaust system efficiency without damaging the substrate.
              </p>
              <p className={styles.para}>
                Backed by 15 years of manufacturing excellence, every TUNEX®️ silencer comes with a{' '}
                15-month warranty, reflecting our unwavering commitment to quality, reliability, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Right: High-Clarity Autoplay MP4 Video Player */}
          <div className={`${styles.aboutRight} reveal-right`}>
            <div className={styles.imgCard} style={{ position: 'relative', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                src="/images/hi_quality_about_video.mp4"
                poster="/images/about_video_poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className={styles.aboutVideoIframe}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                onClick={togglePlay}
              />

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 10,
              }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} style={{ marginLeft: '1px' }} />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  style={{
                    backgroundColor: isMuted ? 'rgba(220, 38, 38, 0.9)' : 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isMuted ? <FaVolumeMute size={11} /> : <FaVolumeUp size={11} />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
