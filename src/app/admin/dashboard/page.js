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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'products'
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
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        const dynamic = data.products || [];
        const seed = data.seedProducts || [];
        // Mark seed products so we know they are read-only
        const markedSeed = seed.map(p => ({ ...p, isSeed: true }));
        setProducts([...dynamic, ...markedSeed]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProducts();
  }, []);

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
      if (data.success) {
        setBlogs(blogs.map(b => (b._id === id || b.id === id) ? { ...b, visibility: nextVis } : b));
      }
    } catch (err) {
      alert('Failed to update visibility');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter(b => b._id !== id && b.id !== id));
      }
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  const handleProductDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter(p => p._id !== id && p.id !== id));
      } else {
        alert(data.error || 'Failed to delete product');
      }
    } catch (err) {
      alert('Failed to delete product');
    }
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
      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaNewspaper size={20} color="#dc2626" />
          <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}>
            HI QUALITY SILENCERS <span style={{ color: '#dc2626' }}>ADMIN</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" target="_blank" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FaGlobe /> View Live Website
          </Link>
          <button onClick={handleLogout} style={{
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
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

      {/* Main Dashboard Container */}
      <main style={{ maxWidth: '1240px', margin: '2rem auto', padding: '0 1.5rem' }}>
        {/* Action Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.25rem 0', fontFamily: 'var(--font-heading)' }}>
              Content &amp; Product Management CMS
            </h1>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              Manage articles, silencer products, Cloudinary WebP images &amp; MongoDB database
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/admin/products/new" style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '0.65rem 1.15rem',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              border: '1px solid #334155'
            }}>
              <FaPlus /> Add New Product
            </Link>

            <Link href="/admin/blogs/new" style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.65rem 1.15rem',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)'
            }}>
              <FaPlus /> Add New Blog Post
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => {
              setActiveTab('blogs');
              setSearch('');
            }}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'blogs' ? '3px solid #dc2626' : '3px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === 'blogs' ? '#0f172a' : '#64748b',
              fontWeight: activeTab === 'blogs' ? '800' : '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Blog Articles ({blogs.length})
          </button>
          <button 
            onClick={() => {
              setActiveTab('products');
              setSearch('');
            }}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'products' ? '3px solid #dc2626' : '3px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === 'products' ? '#0f172a' : '#64748b',
              fontWeight: activeTab === 'products' ? '800' : '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Products Catalog ({products.length})
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
          <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder={activeTab === 'blogs' ? "Search blog posts..." : "Search products..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 1rem 0.6rem 2.4rem',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '0.84rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Table View */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}>
          {activeTab === 'blogs' ? (
            loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading blog posts...</div>
            ) : filteredBlogs.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                <p>No blog posts found.</p>
                <Link href="/admin/blogs/new" style={{ color: '#dc2626', fontWeight: '700' }}>Create your first blog post</Link>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Article Title</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Visibility</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Publish Date</th>
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
                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '400' }}>/blog/{b.slug}</span>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '50px',
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            backgroundColor: b.visibility === 'visible' ? '#dcfce7' : '#f1f5f9',
                            color: b.visibility === 'visible' ? '#166534' : '#64748b'
                          }}>
                            {b.visibility === 'visible' ? <FaEye size={10} /> : <FaEyeSlash size={10} />}
                            {b.visibility === 'visible' ? 'Visible' : 'Hidden'}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                          {new Date(b.publishDate || Date.now()).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                          {b.faqs ? b.faqs.length : 0} FAQs
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleToggleVisibility(bId, b.visibility)}
                              title="Toggle Visibility"
                              style={{
                                padding: '0.35rem 0.6rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                backgroundColor: '#ffffff',
                                color: '#334155',
                                cursor: 'pointer'
                              }}
                            >
                              {b.visibility === 'visible' ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                            </button>

                            <Link
                              href={`/blog/${b.slug}${b.visibility === 'hidden' ? '?preview=true' : ''}`}
                              target="_blank"
                              title="View Live Article"
                              style={{
                                padding: '0.35rem 0.6rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                backgroundColor: '#ffffff',
                                color: '#0284c7',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              <FaGlobe size={13} />
                            </Link>

                            <button
                              onClick={() => handleDelete(bId)}
                              title="Delete Article"
                              style={{
                                padding: '0.35rem 0.6rem',
                                border: '1px solid #fecaca',
                                borderRadius: '4px',
                                backgroundColor: '#fef2f2',
                                color: '#dc2626',
                                cursor: 'pointer'
                              }}
                            >
                              <FaTrash size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
          ) : (
            productsLoading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                <p>No products found.</p>
                <Link href="/admin/products/new" style={{ color: '#dc2626', fontWeight: '700' }}>Add your first product</Link>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Product Image</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Product Title</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>Specification</th>
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
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            style={{ width: '50px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }} 
                          />
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>{p.title}</span>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '400' }}>Icon Badge: {p.iconType || 'car'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#475569', fontWeight: '600' }}>
                          {p.category}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                          {p.spec || 'N/A'}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            {p.isSeed ? (
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600', paddingRight: '0.5rem' }}>
                                Static Seed Item
                              </span>
                            ) : (
                              <>
                                <Link
                                  href={`/admin/products/edit/${pId}`}
                                  title="Edit Product"
                                  style={{
                                    padding: '0.35rem 0.6rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '4px',
                                    backgroundColor: '#ffffff',
                                    color: '#334155',
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <FaEdit size={13} />
                                </Link>

                                <button
                                  onClick={() => handleProductDelete(pId)}
                                  title="Delete Product"
                                  style={{
                                    padding: '0.35rem 0.6rem',
                                    border: '1px solid #fecaca',
                                    borderRadius: '4px',
                                    backgroundColor: '#fef2f2',
                                    color: '#dc2626',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <FaTrash size={13} />
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
            )
          )}
        </div>
      </main>
    </div>
  );
}
