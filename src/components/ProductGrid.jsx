'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProductGrid.module.css';
import {
  FaCar,
  FaTruck,
  FaBus,
  FaCogs,
  FaWrench,
  FaCheckCircle,
  FaChartLine,
  FaLeaf,
  FaArrowRight,
  FaShuttleVan,
  FaLink,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

const defaultProducts = [
  {
    id: 'prod-1',
    title: 'CAR SILENCERS',
    image: '/images/prod_passenger_car.png',
    icon: <FaCar />,
    desc: 'High performance OEM specification silencers for all passenger cars. Built for durability.'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    image: '/images/prod_suv_pickup.png',
    icon: <FaShuttleVan />,
    desc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance.'
  },
  {
    id: 'prod-3',
    title: 'COMMERCIAL VEHICLE SILENCERS',
    image: '/images/prod_truck_bus.png',
    icon: <FaTruck />,
    desc: 'Heavy duty silencers for LCVs, trucks, and commercial fleet vehicles.'
  },
  {
    id: 'prod-4',
    title: 'GENERATOR SILENCERS',
    image: '/images/prod_lcv.png',
    icon: <FaCogs />,
    desc: 'Precision generator silencers engineered for consistent flow dynamics and low back pressure.'
  },
  {
    id: 'prod-5',
    title: 'CUSTOM SILENCERS',
    image: '/images/prod_catalytic.png',
    icon: <FaWrench />,
    desc: 'Bespoke custom-built silencers tailored to exact vehicle specifications and customer requirements.'
  },
  {
    id: 'prod-6',
    title: 'EXHAUST FLEXIBLE BELLOWS',
    image: '/images/prod_bellows.png',
    icon: <FaLink />,
    desc: 'Premium Stainless Steel Flexible Bellows for Automotive & Industrial Applications.'
  }
];

const dpfSteps = [
  {
    step: '01',
    title: 'PRE INSPECTION',
    image: '/images/dpf_step1.png',
    desc: 'DPF condition check using advanced diagnostic equipment and visual inspection.'
  },
  {
    step: '02',
    title: 'CHEMICAL SOAKING',
    image: '/images/dpf_step2.png',
    desc: 'Specialized cleaning chemicals are used to break down tough soot, ash and contaminants.'
  },
  {
    step: '03',
    title: 'HYDRO-PNEUMATIC CLEANING',
    image: '/images/dpf_step3.png',
    desc: 'High pressure water & air pulses remove all loosened particles from the DPF cell structure.'
  },
  {
    step: '04',
    title: 'THERMAL REGENERATION',
    image: '/images/dpf_step4.png',
    desc: 'Thermal process eliminates remaining soot particles and restores filter to optimal condition.'
  },
  {
    step: '05',
    title: 'FINAL FLOW & PRESSURE TEST',
    image: '/images/dpf_step5.png',
    desc: 'Final testing ensures proper flow, back pressure and 100% performance before delivery.'
  }
];

import { fetchProductsApi } from '@/lib/apiPrefetch';
import { ProductSkeleton } from './SkeletonLoader';

export default function ProductGrid() {
  const [productList, setProductList] = useState(defaultProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch dynamic products from Backend API (pre-triggered on home mount)
  useEffect(() => {
    const getIcon = (type, title = '') => {
      const t = title.toUpperCase();
      if (type === 'car' || t.includes('CAR')) return <FaCar />;
      if (type === 'suv' || t.includes('SUV')) return <FaShuttleVan />;
      if (type === 'lcv' || t.includes('LCV')) return <FaTruck />;
      if (type === 'truck' || t.includes('TRUCK') || t.includes('BUS')) return <FaBus />;
      if (type === 'catalytic' || t.includes('CATALYTIC')) return <FaCogs />;
      return <FaWrench />;
    };

    fetchProductsApi().then(apiProducts => {
      if (apiProducts && Array.isArray(apiProducts) && apiProducts.length > 0) {
        const apiMap = new Map();
        apiProducts.forEach(p => {
          const pid = p.id || String(p._id);
          if (pid) apiMap.set(pid, p);
        });

        // Merge backend updates over default products
        const mergedDefaults = defaultProducts.map(def => {
          const apiProd = apiMap.get(def.id);
          if (!apiProd) return def;
          return {
            ...def,
            ...apiProd,
            title: apiProd.title || def.title,
            image: apiProd.image || def.image,
            desc: apiProd.shortDesc || apiProd.desc || def.desc,
            icon: getIcon(apiProd.category || def.category, apiProd.title || def.title)
          };
        });

        // Collect new dynamic products created in admin panel that aren't in defaults
        const defaultIds = new Set(defaultProducts.map(d => d.id));
        const extraFromBackend = apiProducts
          .filter(p => !defaultIds.has(p.id || String(p._id)))
          .map(p => ({
            ...p,
            icon: getIcon(p.category, p.title)
          }));

        setProductList([...mergedDefaults, ...extraFromBackend]);
      }
    });
  }, []);

  // Handle Add Product via Backend API POST /api/products
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          desc: newDesc,
          image: '/images/prod_passenger_car.png',
          category: 'Custom Product'
        })
      });

      const data = await res.json();
      if (data.success && data.product) {
        const newProdFormatted = {
          ...data.product,
          icon: <FaWrench />
        };
        setProductList(prev => [...prev, newProdFormatted]);
        setNewTitle('');
        setNewDesc('');
        setShowAddModal(false);
      }
    } catch (err) {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.productSectionWrapper} id="products">
      {/* SECTION 1: OUR PRODUCTS */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitleRow}>
              <span className={styles.headerLine} />
              <h2 className={styles.headerTitle}>
                OUR <span className={styles.titleRed}>PRODUCTS</span>
              </h2>
              <span className={styles.headerLine} />
            </div>
            <p className={styles.headerSub}>
              Wide Range of OEM Specification Silencers &amp; Exhaust Components
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className={styles.productGrid}>
            {loading ? (
              <ProductSkeleton count={6} />
            ) : (
              productList.map((p, i) => (
              <a key={`prod-card-${p.id || p._id || i}-${i}`} href={`/products/${p.id || p._id || i}`} className={styles.productCard} style={{ textDecoration: 'none' }}>
                {/* Card Top: White Box with Image */}
                <div className={styles.cardTop}>
                  <div className={styles.imgWrapper}>
                    <Image
                      src={p.image || '/images/prod_passenger_car.png'}
                      alt={p.title}
                      width={220}
                      height={140}
                      className={styles.productImg}
                    />
                  </div>
                  {/* Overlapping Red Icon Badge */}
                  <div className={styles.iconBadge}>
                    {p.icon}
                  </div>
                </div>

                {/* Card Bottom: Dark Box with Text */}
                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.shortDesc || p.desc}</p>
                  <div className={styles.cardCta}>
                    VIEW DETAILS <FaArrowRight size={10} />
                  </div>
                </div>
              </a>
              ))
            )}
          </div>

          {/* VIEW ALL PRODUCTS BUTTON */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <a href="/products" className={styles.viewAllBtn}>
              VIEW ALL PRODUCTS <FaArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROFESSIONAL DPF RESTORATION PROCESS */}
      <section className={styles.processSection} id="dpf-cleaning">
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitleRow}>
              <span className={styles.headerLine} />
              <h2 className={styles.headerTitle}>
                PROFESSIONAL <span className={styles.titleRed}>DPF RESTORATION</span> PROCESS
              </h2>
              <span className={styles.headerLine} />
            </div>
            <p className={styles.headerSub}>
              Advanced Technology. Expert Care. Maximum Performance.
            </p>
          </div>

          {/* 5 Step Process Timeline */}
          <div className={styles.processTimeline}>
            {dpfSteps.map((s, i) => (
              <div key={i} className={styles.stepWrapper}>
                <div className={styles.stepCard}>
                  {/* Step Number Badge */}
                  <div className={styles.stepBadge}>{s.step}</div>

                  {/* Step Title */}
                  <h4 className={styles.stepTitle}>{s.title}</h4>

                  {/* Step Image */}
                  <div className={styles.stepImgWrap}>
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={200}
                      height={120}
                      className={styles.stepImg}
                    />
                  </div>

                  {/* Step Description */}
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>

                {/* Arrow Connector (between steps) */}
                {i < dpfSteps.length - 1 && (
                  <div className={styles.arrowConnector}>
                    <FaArrowRight size={18} color="#dc2626" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Trust Strip */}
          <div className={styles.processTrustBanner}>
            <div className={styles.trustBannerGrid}>
              <div className={styles.trustBannerItem}>
                <FaCheckCircle size={18} color="#dc2626" />
                <div className={styles.trustText}>
                  <span className={styles.trustTitle}>RESTORED TO OEM</span>
                  <span className={styles.trustSub}>PERFORMANCE</span>
                </div>
              </div>

              <div className={styles.trustBannerItem}>
                <FaChartLine size={18} color="#dc2626" />
                <div className={styles.trustText}>
                  <span className={styles.trustTitle}>BETTER MILEAGE</span>
                  <span className={styles.trustSub}>&amp; POWER</span>
                </div>
              </div>

              <div className={styles.trustBannerItem}>
                <FaLeaf size={18} color="#dc2626" />
                <div className={styles.trustText}>
                  <span className={styles.trustTitle}>REDUCED EMISSIONS</span>
                  <span className={styles.trustSub}>&amp; POLLUTION</span>
                </div>
              </div>

              <div className={styles.trustBannerItem}>
                <FaCheckCircle size={18} color="#dc2626" />
                <div className={styles.trustText}>
                  <span className={styles.trustTitle}>COST EFFECTIVE</span>
                  <span className={styles.trustSub}>SOLUTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
