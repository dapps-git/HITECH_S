'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaSignOutAlt, 
  FaNewspaper,
  FaSearch,
  FaGlobe
} from 'react-icons/fa';

const YELLOW = '#E5A300';
const YELLOW_DARK = '#C68A00';
const YELLOW_BG = '#FFF8E6';
const YELLOW_BORDER = '#F5D68A';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?all=true');
      const data = await res.json();
      if (data.success) setBlogs(data.blogs || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        const markedSeed = (data.seedProducts || []).map(p => ({ ...p, isSeed: true }));
        setProducts([...(data.products || []), ...markedSeed]);
      }
    } catch (err) { console.error(err); }
    finally { setProductsLoading(false); }
  };

  useEffect(() => { fetchBlogs(); fetchProducts(); }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleToggleVisibility = async (id, currentVis) => {
    const nextVis = currentVis === 'visible' ? 'hidden' : 'visible';
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: nextVis })
      });
      const data = await res.json();
      if (data.success) setBlogs(blogs.map(b => (b._id === id || b.id === id) ? { ...b, visibility: nextVis } : b));
    } catch { alert('Failed to update visibility'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setBlogs(blogs.filter(b => b._id !== id && b.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const handleProductDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setProducts(products.filter(p => p._id !== id && p.id !== id));
      else alert(data.error || 'Failed to delete product');
    } catch { alert('Failed to delete product'); }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), sans-serif' }}>
      <style>{`
        @media (max-width: 640px) {
          .admin-header { padding: 0.7rem 1rem !important; flex-wrap: wrap !important; gap: 0.5rem !important; }
          .admin-brand { font-size: 0.88rem !important; }
          .admin-actions { gap: 0.5rem !important; }
          .admin-logout { padding: 0.35rem 0.6rem !important; font-size: 0.72rem !important; }
          .admin-main { padding: 0 0.85rem !important; margin: 1rem auto !important; }
          .admin-top-row { flex-direction: column !important; align-items: flex-start !important; }
          .admin-btn-group { flex-direction: column !important; width: 100% !important; }
          .admin-btn-group a { width: 100% !important; justify-content: center !important; }
          .admin-table th:nth-child(3), .admin-table th:nth-child(4),
          .admin-table td:nth-child(3), .admin-table td:nth-child(4) { display: none !important; }
          .admin-table { font-size: 0.78rem !important; }
          .admin-card { padding: 0.75rem !important; border-radius: 8px !important; }
        }
        .admin-table tr:hover { background-color: #FFFBF0; }
        .admin-tab-btn:hover { color: #0f172a !important; }
      `}</style>

      {/* Top Navbar */}
      <header className="admin-header" style={{
        backgroundColor: '#1a1207',
        color: '#ffffff',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: `0 4px 14px rgba(0,0,0,0.2)`,
        borderBottom: `3px solid ${YELLOW}`
      }}>
        <div className="admin-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <FaNewspaper size={20} color={YELLOW} />
          <span style={{ fontSize: '1.05rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em', color: '#ffffff' }}>
            HI QUALITY <span style={{ color: YELLOW }}>SILENCERS</span>{' '}
            <span style={{ color: '#94a3b8', fontWeight: '600' }}>ADMIN</span>
          </span>
        </div>

        <div className="admin-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" target="_blank" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
            <FaGlobe /> <span style={{ display: 'none' }} className="show-sm">View Site</span>
          </Link>
          <button onClick={handleLogout} className="admin-logout" style={{
            backgroundColor: `rgba(229, 163, 0, 0.15)`,
            color: YELLOW,
            border: `1px solid rgba(229, 163, 0, 0.4)`,
            padding: '0.45rem 0.85rem',
            borderRadius: '4px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="admin-main" style={{ maxWidth: '1240px', margin: '2rem auto', padding: '0 1.5rem' }}>
        
        {/* Top Row */}
        <div className="admin-top-row" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.25rem 0', fontFamily: 'var(--font-heading)' }}>
              Content &amp; Product Management
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              Manage articles, silencer products &amp; MongoDB database
            </p>
          </div>

          <div className="admin-btn-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/admin/products/new" style={{
              backgroundColor: '#1a1207', color: '#ffffff',
              padding: '0.65rem 1.15rem', borderRadius: '6px',
              fontSize: '0.82rem', fontWeight: '700',
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              border: `1px solid ${YELLOW}`, textDecoration: 'none'
            }}>
              <FaPlus /> Add Product
            </Link>
            <Link href="/admin/blogs/new" style={{
              backgroundColor: YELLOW, color: '#1a1207',
              padding: '0.65rem 1.15rem', borderRadius: '6px',
              fontSize: '0.82rem', fontWeight: '800',
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              boxShadow: `0 4px 14px rgba(229,163,0,0.4)`, textDecoration: 'none'
            }}>
              <FaPlus /> Add Blog Post
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: `2px solid #e2e8f0`, marginBottom: '1.5rem', overflowX: 'auto' }}>
          {['blogs', 'products'].map(tab => (
            <button key={tab} className="admin-tab-btn"
              onClick={() => { setActiveTab(tab); setSearch(''); }}
              style={{
                padding: '0.7rem 1.1rem', border: 'none', cursor: 'pointer',
                borderBottom: activeTab === tab ? `3px solid ${YELLOW}` : '3px solid transparent',
                marginBottom: '-2px',
                backgroundColor: 'transparent',
                color: activeTab === tab ? '#0f172a' : '#64748b',
                fontWeight: activeTab === tab ? '800' : '600',
                fontSize: '0.88rem', whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}>
              {tab === 'blogs' ? `Blog Articles (${blogs.length})` : `Products (${products.length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '1.25rem', position: 'relative', maxWidth: '380px' }}>
          <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder={activeTab === 'blogs' ? 'Search blog posts...' : 'Search products...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem',
              border: `1px solid #e2e8f0`, borderRadius: '6px',
              fontSize: '0.84rem', outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = YELLOW}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* Table Card */}
        <div className="admin-card" style={{
          backgroundColor: '#ffffff', borderRadius: '10px',
          border: `1px solid #e2e8f0`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden'
        }}>
          {activeTab === 'blogs' ? (
            loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading blog posts...</div>
            ) : filteredBlogs.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                <p>No blog posts found.</p>
                <Link href="/admin/blogs/new" style={{ color: YELLOW_DARK, fontWeight: '700' }}>Create your first blog post →</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: YELLOW_BG, borderBottom: `2px solid ${YELLOW_BORDER}`, color: '#334155' }}>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Article Title</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Visibility</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Date</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>FAQs</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((b) => {
                      const bId = b._id || b.id;
                      return (
                        <tr key={bId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span>{b.title}</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '400' }}>/blog/{b.slug}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                              padding: '0.2rem 0.55rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '700',
                              backgroundColor: b.visibility === 'visible' ? '#dcfce7' : '#f1f5f9',
                              color: b.visibility === 'visible' ? '#166534' : '#64748b'
                            }}>
                              {b.visibility === 'visible' ? <FaEye size={9} /> : <FaEyeSlash size={9} />}
                              {b.visibility === 'visible' ? 'Visible' : 'Hidden'}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                            {new Date(b.publishDate || Date.now()).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                            {b.faqs ? b.faqs.length : 0}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              <button onClick={() => handleToggleVisibility(bId, b.visibility)} title="Toggle"
                                style={{ padding: '0.35rem 0.55rem', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: '#fff', color: '#334155', cursor: 'pointer' }}>
                                {b.visibility === 'visible' ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                              </button>
                              <Link href={`/blog/${b.slug}${b.visibility === 'hidden' ? '?preview=true' : ''}`} target="_blank" title="View"
                                style={{ padding: '0.35rem 0.55rem', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: '#fff', color: '#0284c7', display: 'inline-flex', alignItems: 'center' }}>
                                <FaGlobe size={12} />
                              </Link>
                              <button onClick={() => handleDelete(bId)} title="Delete"
                                style={{ padding: '0.35rem 0.55rem', border: `1px solid ${YELLOW_BORDER}`, borderRadius: '4px', backgroundColor: YELLOW_BG, color: YELLOW_DARK, cursor: 'pointer' }}>
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            productsLoading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                <p>No products found.</p>
                <Link href="/admin/products/new" style={{ color: YELLOW_DARK, fontWeight: '700' }}>Add your first product →</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: YELLOW_BG, borderBottom: `2px solid ${YELLOW_BORDER}`, color: '#334155' }}>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Image</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Product Title</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Category</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Spec</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: '700', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => {
                      const pId = p._id || p.id;
                      return (
                        <tr key={pId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.title}
                              style={{ width: '50px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: `1px solid ${YELLOW_BORDER}`, backgroundColor: YELLOW_BG }} />
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span>{p.title}</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '400' }}>Badge: {p.iconType || 'car'}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', color: '#475569', fontWeight: '600' }}>{p.category}</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{p.spec || 'N/A'}</td>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              {p.isSeed ? (
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>Seed</span>
                              ) : (
                                <>
                                  <Link href={`/admin/products/edit/${pId}`} title="Edit"
                                    style={{ padding: '0.35rem 0.55rem', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: '#fff', color: '#334155', display: 'inline-flex', alignItems: 'center' }}>
                                    <FaEdit size={12} />
                                  </Link>
                                  <button onClick={() => handleProductDelete(pId)} title="Delete"
                                    style={{ padding: '0.35rem 0.55rem', border: `1px solid ${YELLOW_BORDER}`, borderRadius: '4px', backgroundColor: YELLOW_BG, color: YELLOW_DARK, cursor: 'pointer' }}>
                                    <FaTrash size={12} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
