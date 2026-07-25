'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough, 
  FaListUl, 
  FaListOl, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaLink, 
  FaImage, 
  FaCode, 
  FaPlus, 
  FaTrash,
  FaSearch,
  FaHeading
} from 'react-icons/fa';
import { LuSparkles } from 'react-icons/lu';

export default function AddBlogPost() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [visibility, setVisibility] = useState('visible');
  const [featuredImage, setFeaturedImage] = useState('/images/bg.webp');
  const [category, setCategory] = useState('DPF & Silencer Guides');
  
  // SEO Metadata
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [showSeoEditor, setShowSeoEditor] = useState(true);

  // Blog Specific FAQs
  const [faqs, setFaqs] = useState([
    { question: 'Why should a DPF be cleaned regularly?', answer: 'Regular DPF cleaning prevents soot blockage, engine power loss, and expensive turbocharger damage.' }
  ]);

  const [saving, setSaving] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // WYSIWYG Refs
  const editorRef = useRef(null);
  const editorFileInputRef = useRef(null);
  const [editorUploading, setEditorUploading] = useState(false);

  // Featured Cover Image Refs/State
  const featuredFileInputRef = useRef(null);
  const [featuredUploading, setFeaturedUploading] = useState(false);

  const triggerFeaturedImageUpload = () => {
    if (featuredFileInputRef.current) {
      featuredFileInputRef.current.click();
    }
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFeaturedUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFeaturedImage(data.url);
      } else {
        alert(data.error || 'Failed to upload featured image');
      }
    } catch (err) {
      alert('Error uploading featured image');
    } finally {
      setFeaturedUploading(false);
    }
  };

  // Sync content state to editable div when changing mode
  useEffect(() => {
    if (!isHtmlMode && editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [isHtmlMode]);

  // Add FAQ Item
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  // Remove FAQ Item
  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Update FAQ Item
  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  // Unified Formatting Action Handler
  const handleToolbarAction = (action, value = null, tagOpen = '', tagClose = '') => {
    if (isHtmlMode) {
      const textarea = document.getElementById('content-editor');
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const replacement = `${tagOpen}${selectedText}${tagClose}`;

      const newContent = content.substring(0, start) + replacement + content.substring(end);
      setContent(newContent);
      textarea.focus();
    } else {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();

      if (action === 'formatBlock' || action === 'createLink' || action === 'insertHTML') {
        document.execCommand(action, false, value);
      } else {
        document.execCommand(action, false, null);
      }
      setContent(editor.innerHTML);
    }
  };

  // Trigger file picker
  const triggerImageUpload = () => {
    if (editorFileInputRef.current) {
      editorFileInputRef.current.click();
    }
  };

  // Upload inline images
  const handleEditorImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setEditorUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.url) {
        const imgHtml = `<img src="${data.url}" alt="Uploaded Image" style="max-width: 100%; border-radius: 8px; margin: 1rem 0; display: block;" />`;
        
        if (isHtmlMode) {
          handleToolbarAction('insertHTML', imgHtml, imgHtml, '');
        } else {
          const editor = editorRef.current;
          if (editor) {
            editor.focus();
            document.execCommand('insertHTML', false, imgHtml);
            setContent(editor.innerHTML);
          }
        }
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setEditorUploading(false);
      e.target.value = ''; // Clear file input
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in both the blog title and content.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || title,
          visibility,
          featuredImage: featuredImage || '/images/bg.webp',
          category,
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || excerpt || title,
          keywords,
          faqs: faqs.filter(f => f.question.trim() !== '')
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Blog post published successfully!');
        router.push('/admin/dashboard');
      } else {
        alert(data.error || 'Failed to publish blog post');
      }
    } catch (err) {
      alert('Error publishing blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'var(--font-sans), sans-serif', paddingBottom: '4rem' }}>
      {/* Top Admin Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#475569',
            fontSize: '0.85rem',
            fontWeight: '700',
            textDecoration: 'none'
          }}>
            <FaArrowLeft /> Add blog post
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/admin/dashboard" style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#334155',
            fontSize: '0.82rem',
            fontWeight: '600'
          }}>
            Cancel
          </Link>

          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
            }}
          >
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </header>

      {/* Main Form Content Split */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '1140px', margin: '2rem auto', padding: '0 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
          
          {/* LEFT COLUMN: Main Title, Editor, Excerpt, SEO, FAQs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Title & Rich Content Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              {/* Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>Title</label>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <LuSparkles size={11} color="#3b82f6" /> AI Title Assist
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Complete Guide to DPF Cleaning & OEM Silencer Maintenance"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (!seoTitle) setSeoTitle(e.target.value);
                  }}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Content / Editor */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                  Content
                </label>

                {/* Editor Toolbar */}
                <div style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px 6px 0 0',
                  backgroundColor: '#f8fafc',
                  padding: '0.45rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.35rem',
                  borderBottom: 'none'
                }}>
                  <button type="button" onClick={() => handleToolbarAction('formatBlock', '<h2>', '<h2>', '</h2>')} title="Heading 2" style={toolbarBtnStyle}><FaHeading size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('bold', null, '<strong>', '</strong>')} title="Bold" style={toolbarBtnStyle}><FaBold size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('italic', null, '<em>', '</em>')} title="Italic" style={toolbarBtnStyle}><FaItalic size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('underline', null, '<u>', '</u>')} title="Underline" style={toolbarBtnStyle}><FaUnderline size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('strikeThrough', null, '<del>', '</del>')} title="Strikethrough" style={toolbarBtnStyle}><FaStrikethrough size={12} /></button>

                  <div style={{ width: '1px', height: '18px', backgroundColor: '#cbd5e1', margin: '0 0.2rem' }} />

                  <button type="button" onClick={() => handleToolbarAction('insertUnorderedList', null, '<ul>\n  <li>', '</li>\n</ul>')} title="Bullet List" style={toolbarBtnStyle}><FaListUl size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('insertOrderedList', null, '<ol>\n  <li>', '</li>\n</ol>')} title="Numbered List" style={toolbarBtnStyle}><FaListOl size={12} /></button>

                  <div style={{ width: '1px', height: '18px', backgroundColor: '#cbd5e1', margin: '0 0.2rem' }} />

                  <button type="button" onClick={() => handleToolbarAction('justifyLeft', null, '<div style="text-align: left;">', '</div>')} title="Align Left" style={toolbarBtnStyle}><FaAlignLeft size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('justifyCenter', null, '<div style="text-align: center;">', '</div>')} title="Align Center" style={toolbarBtnStyle}><FaAlignCenter size={12} /></button>
                  <button type="button" onClick={() => handleToolbarAction('justifyRight', null, '<div style="text-align: right;">', '</div>')} title="Align Right" style={toolbarBtnStyle}><FaAlignRight size={12} /></button>

                  <div style={{ width: '1px', height: '18px', backgroundColor: '#cbd5e1', margin: '0 0.2rem' }} />

                  <button type="button" onClick={triggerImageUpload} title="Insert Image from Computer" style={toolbarBtnStyle}>
                    <FaImage size={12} />
                  </button>
                  <input
                    type="file"
                    ref={editorFileInputRef}
                    onChange={handleEditorImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />

                  <button type="button" onClick={() => {
                    const link = prompt('Enter Link URL:');
                    if (link) handleToolbarAction('createLink', link, `<a href="${link}" target="_blank" rel="noopener noreferrer">`, '</a>');
                  }} title="Insert Link" style={toolbarBtnStyle}><FaLink size={12} /></button>

                  <button
                    type="button"
                    onClick={() => setIsHtmlMode(!isHtmlMode)}
                    title="Toggle HTML View"
                    style={{ ...toolbarBtnStyle, backgroundColor: isHtmlMode ? '#e2e8f0' : 'transparent' }}
                  >
                    <FaCode size={12} />
                  </button>

                  {editorUploading && <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '600', marginLeft: 'auto' }}>Uploading image...</span>}
                </div>

                {/* CSS placeholder support for contentEditable */}
                <style dangerouslySetInnerHTML={{__html: `
                  #wysiwyg-editor:empty::before {
                    content: attr(placeholder);
                    color: #94a3b8;
                    cursor: text;
                  }
                `}} />

                {/* Main Editor */}
                {isHtmlMode ? (
                  <textarea
                    id="content-editor"
                    placeholder="Write your detailed blog post content here... You can use HTML tags or the toolbar above for formatting, bullet points, headers & images."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={14}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0 0 6px 6px',
                      fontSize: '0.88rem',
                      fontFamily: 'monospace',
                      color: '#0f172a',
                      lineHeight: '1.6',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '350px'
                    }}
                  />
                ) : (
                  <div
                    id="wysiwyg-editor"
                    ref={editorRef}
                    contentEditable
                    onInput={e => setContent(e.currentTarget.innerHTML)}
                    onBlur={e => setContent(e.currentTarget.innerHTML)}
                    placeholder="Write your detailed blog post content here... Use the toolbar above to style your text and upload images directly."
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0 0 6px 6px',
                      fontSize: '0.88rem',
                      color: '#0f172a',
                      lineHeight: '1.6',
                      outline: 'none',
                      minHeight: '350px',
                      backgroundColor: '#ffffff',
                      overflowY: 'auto',
                      maxHeight: '600px'
                    }}
                  />
                )}
              </div>
            </div>

            {/* Excerpt Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>Excerpt</label>
                <span style={{ fontSize: '0.72rem', color: '#0284c7', cursor: 'pointer' }} onClick={() => setExcerpt(content.replace(/<[^>]*>/g, '').substring(0, 150) + '...')}>
                  Auto Extract Excerpt
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
                Add a summary of the post to appear on your homepage or blog listing page.
              </p>
              <textarea
                placeholder="Short 2-line summary of the blog post..."
                value={excerpt}
                onChange={e => {
                  setExcerpt(e.target.value);
                  if (!seoDescription) setSeoDescription(e.target.value);
                }}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>

            {/* Search Engine Listing Preview (SEO Metadata) */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>Search Engine Listing Preview (SEO)</label>
                <button
                  type="button"
                  onClick={() => setShowSeoEditor(!showSeoEditor)}
                  style={{ fontSize: '0.76rem', color: '#0284c7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  {showSeoEditor ? 'Hide SEO' : 'Edit Website SEO'}
                </button>
              </div>

              {/* Google Search Snippet Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '0.85rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#15803d', marginBottom: '0.1rem' }}>
                  https://hiqualitysilencers.com › blog › {title ? title.toLowerCase().replace(/\s+/g, '-') : 'page-slug'}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#1a0dab', fontWeight: '600', marginBottom: '0.2rem' }}>
                  {seoTitle || title || 'Blog Post Title Preview'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
                  {seoDescription || excerpt || 'Add a meta title and description to see how this blog post will appear in Google search engine results.'}
                </div>
              </div>

              {showSeoEditor && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>
                      Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Meta title for Google search..."
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        color: '#0f172a'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>
                      Meta Description
                    </label>
                    <textarea
                      placeholder="Meta description for search engines..."
                      value={seoDescription}
                      onChange={e => setSeoDescription(e.target.value)}
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        color: '#0f172a'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Blog Specific FAQs */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', display: 'block' }}>
                    Blog Article FAQs (Questions &amp; Answers)
                  </label>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    Add specific questions and answers to render in an interactive FAQ accordion below this article.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.08)',
                    color: '#dc2626',
                    border: '1px solid rgba(220, 38, 38, 0.25)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '4px',
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FaPlus size={11} /> Add FAQ
                </button>
              </div>

              {/* FAQ Repeater Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {faqs.map((faq, index) => (
                  <div key={index} style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '1rem',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#dc2626' }}>FAQ #{index + 1}</span>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <input
                        type="text"
                        placeholder="Question (e.g. How long does professional DPF cleaning take?)"
                        value={faq.question}
                        onChange={e => handleFaqChange(index, 'question', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.82rem',
                          color: '#0f172a',
                          fontWeight: '600'
                        }}
                      />
                      <textarea
                        placeholder="Answer (e.g. DPF cleaning takes 1-2 working days including soaking and testing.)"
                        value={faq.answer}
                        onChange={e => handleFaqChange(index, 'answer', e.target.value)}
                        rows={2}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.82rem',
                          color: '#0f172a'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Visibility, Featured Image, Organization */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Visibility Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.25rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.75rem' }}>
                Visibility
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="visibility"
                    value="visible"
                    checked={visibility === 'visible'}
                    onChange={() => setVisibility('visible')}
                  />
                  <span>Visible (Public)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="visibility"
                    value="hidden"
                    checked={visibility === 'hidden'}
                    onChange={() => setVisibility('hidden')}
                  />
                  <span>Hidden (Draft)</span>
                </label>
              </div>
            </div>

            {/* Featured Image Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.25rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.75rem' }}>
                Featured Main Image
              </label>

              <div 
                onClick={triggerFeaturedImageUpload}
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  marginBottom: '0.85rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {featuredImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={featuredImage}
                    alt="Featured Blog Cover"
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                ) : (
                  <div style={{ padding: '1.5rem 0', color: '#94a3b8' }}>
                    <FaImage size={28} />
                    <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>No image selected</p>
                  </div>
                )}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    color: '#ffffff',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    transition: 'opacity 0.2s ease',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                >
                  Click to Upload / Change Image
                </div>
              </div>

              <input
                type="file"
                ref={featuredFileInputRef}
                onChange={handleFeaturedImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              {featuredUploading && (
                <p style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '-0.5rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '600' }}>
                  Uploading &amp; compressing featured image...
                </p>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: '700', color: '#475569', marginBottom: '0.25rem' }}>
                  Or Direct Image URL / Path
                </label>
                <input
                  type="text"
                  placeholder="/images/bg.webp"
                  value={featuredImage}
                  onChange={e => setFeaturedImage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.65rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#0f172a'
                  }}
                />
              </div>
            </div>

            {/* Category / Organization */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '1.25rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.75rem' }}>
                Category &amp; Organization
              </label>

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: '#0f172a'
                }}
              >
                <option value="DPF & Silencer Guides">DPF &amp; Silencer Guides</option>
                <option value="OEM Manufacturing">OEM Manufacturing</option>
                <option value="Emission Control Technology">Emission Control Technology</option>
                <option value="Maintenance Tips">Maintenance Tips</option>
              </select>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
}

const toolbarBtnStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0.35rem 0.45rem',
  borderRadius: '4px',
  color: '#334155',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};
