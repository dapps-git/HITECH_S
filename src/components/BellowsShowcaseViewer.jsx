'use client';

import { useState } from 'react';
import { FaEye, FaDownload, FaTimes } from 'react-icons/fa';

export default function BellowsShowcaseViewer({ images = ['/images/bellows.webp', '/images/bellows1.webp'], title = 'EXHAUST FLEXIBLE BELLOWS' }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ marginTop: '1.5rem', border: '1px solid #e2e8f0', padding: '1.25rem', backgroundColor: '#ffffff' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .bellows-showcase-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .bellows-showcase-card {
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          height: 360px;
        }
        .bellows-showcase-card:hover {
          border-color: #dc2626;
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.15);
        }
        .bellows-showcase-img {
          max-width: 100%;
          max-height: 340px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .bellows-showcase-grid {
            grid-template-columns: 1fr;
          }
          .bellows-showcase-card {
            height: auto;
            min-height: 200px;
            padding: 0.35rem;
          }
          .bellows-showcase-img {
            max-height: 500px;
            width: 100%;
          }
        }
      `}} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.65rem' }}>
        <div>
          <span style={{ fontSize: '0.62rem', fontWeight: '800', color: '#dc2626', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block' }}>
            TECHNICAL DIAGRAMS &amp; SPECIFICATIONS
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', margin: 0, letterSpacing: '0.02em', fontFamily: 'var(--font-heading)' }}>
            BELLOWS PRODUCT &amp; FABRICATION SHOWCASE
          </h3>
        </div>
        <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>
          Click or tap image to expand full screen
        </span>
      </div>

      <div className="bellows-showcase-grid">
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className="bellows-showcase-card"
            onClick={() => setSelectedImage(imgSrc)}
          >
            <img
              src={imgSrc}
              alt={`${title} Specification Chart ${idx + 1}`}
              className="bellows-showcase-img"
            />
            {/* Click to expand overlay button */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(15, 23, 42, 0.85)',
              color: '#ffffff',
              padding: '4px 9px',
              fontSize: '0.68rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <FaEye size={11} /> Expand
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem',
            overflow: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '98vw',
              maxHeight: '98vh',
              background: '#ffffff',
              padding: '6px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {/* Header bar in Modal */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#0f172a',
              color: '#ffffff',
              marginBottom: '6px'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>
                Bellows Technical Specification Chart
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <a
                  href={selectedImage}
                  download="Bellows_Specification_Chart.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '6px 10px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    textDecoration: 'none',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FaDownload size={11} /> Download
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 10px',
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FaTimes size={13} /> Close
                </button>
              </div>
            </div>

            {/* Modal Image */}
            <div style={{ overflow: 'auto', width: '100%', maxHeight: '88vh', textAlign: 'center' }}>
              <img
                src={selectedImage}
                alt="Full Resolution Specification Chart"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'inline-block'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
