'use client';

import { useState } from 'react';
import { FaEye, FaDownload, FaTimes } from 'react-icons/fa';

export default function DpfChartViewer() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="dpf-card-section" style={{
      background: '#ffffff',
      borderRadius: '0',
      border: '1px solid #e2e8f0',
      padding: '1rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    }}>
      {/* Compact Single-Row Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h2 className="dpf-section-title" style={{
          fontSize: '1.05rem',
          fontWeight: '800',
          color: '#0f172a',
          margin: 0,
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: '1.3'
        }}>
          DPF Fault Code Reference Chart
        </h2>

        {/* Clean Eye and Download Symbol Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, alignItems: 'center' }}>
          <button
            onClick={() => setIsZoomed(true)}
            title="View Fullscreen"
            aria-label="View Fullscreen"
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
          >
            <FaEye size={15} />
          </button>
          <a
            href="/images/dpf.webp"
            download="DPF_Fault_Code_Reference_Chart.webp"
            title="Download Chart"
            aria-label="Download Chart"
            style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'background 0.2s ease'
            }}
          >
            <FaDownload size={14} />
          </a>
        </div>
      </div>

      {/* Image Container */}
      <div
        onClick={() => setIsZoomed(true)}
        style={{
          position: 'relative',
          border: '1px solid #cbd5e1',
          borderRadius: '0',
          overflow: 'hidden',
          background: '#ffffff',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <img
          src="/images/dpf.webp"
          alt="DPF Fault Code Reference Chart"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '700px',
            objectFit: 'contain',
            display: 'block'
          }}
        />

        {/* Floating Hint Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: '0',
          fontSize: '0.68rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <FaEye size={12} /> Click to View
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflow: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              background: '#ffffff',
              borderRadius: '0',
              padding: '6px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Modal Bar */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 10px',
              background: '#0f172a',
              color: '#ffffff',
              marginBottom: '6px'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800' }}>
                DPF Fault Code Reference Chart
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <a
                  href="/images/dpf.webp"
                  download="DPF_Fault_Code_Reference_Chart.webp"
                  title="Download Chart"
                  style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '5px 9px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    textDecoration: 'none',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <FaDownload size={11} /> Download
                </a>
                <button
                  onClick={() => setIsZoomed(false)}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '5px 9px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <FaTimes size={12} /> Close
                </button>
              </div>
            </div>

            {/* Image */}
            <div style={{ overflow: 'auto', maxHeight: '85vh', textAlign: 'center' }}>
              <img
                src="/images/dpf.webp"
                alt="DPF Fault Code Reference Chart Full Resolution"
                style={{
                  maxWidth: '100%',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
