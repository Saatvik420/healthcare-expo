import { useState, useEffect, useMemo, useRef } from 'react';
import { getBlogSlug } from '../../services/blogService';
import BlogContentRenderer from '../BlogContentRenderer';

const SAMPLE_COVERS = [
  { label: 'Pharma & Lab', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Automation & Cleanroom', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Medical Devices', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cold-Chain Logistics', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Hospital Infra', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'B2B Summit & Expo', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
];

const PRESET_TAGS = ['APIs', 'Pharma Machinery', 'Medical Devices', 'Cold Chain', 'Hospital Infra', 'ASEAN Confluence', 'Supply Chain', 'CDSCO Regulations'];

export default function BlogModal({ isOpen, onClose, onSave, editingBlog }) {
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Healthcare Insights',
    author: 'IndiGlobal Healthcare Expo',
    authorRole: 'Secretariat Contributor',
    coverImage: SAMPLE_COVERS[0].url,
    readTime: '5 min read',
    tags: '',
    excerpt: '',
    content: '',
    featured: false,
    textAlign: 'left',
  });
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        category: editingBlog.category || 'Healthcare Insights',
        author: editingBlog.author || 'IndiGlobal Healthcare Expo',
        authorRole: editingBlog.authorRole || 'Secretariat Contributor',
        coverImage: editingBlog.coverImage || SAMPLE_COVERS[0].url,
        readTime: editingBlog.readTime || '5 min read',
        tags: Array.isArray(editingBlog.tags)
          ? editingBlog.tags.join(', ')
          : editingBlog.tags || '',
        excerpt: editingBlog.excerpt || '',
        content: editingBlog.content || '',
        featured: Boolean(editingBlog.featured),
        textAlign: editingBlog.textAlign || 'left',
      });
    } else {
      setFormData({
        title: '',
        category: 'Healthcare Insights',
        author: 'IndiGlobal Healthcare Expo',
        authorRole: 'Secretariat Contributor',
        coverImage: SAMPLE_COVERS[0].url,
        readTime: '5 min read',
        tags: 'Healthcare, Pharma, Expo 2027',
        excerpt: '',
        content: '',
        featured: false,
        textAlign: 'left',
      });
    }
    setActiveTab('write');
    setError('');
  }, [editingBlog, isOpen]);

  // Live slug preview calculation
  const liveSlug = useMemo(() => {
    return getBlogSlug({ title: formData.title || 'article-title' });
  }, [formData.title]);

  if (!isOpen) return null;

  // Auto calculate estimated read time when content changes if readTime isn't manually customized
  const handleContentChange = (val) => {
    const wordCount = val.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    setFormData((prev) => ({
      ...prev,
      content: val,
      readTime: `${minutes} min read`,
    }));
  };

  const handleAddTag = (tag) => {
    const currentTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!currentTags.includes(tag)) {
      currentTags.push(tag);
      setFormData({ ...formData, tags: currentTags.join(', ') });
    }
  };

  // Insert markdown hyperlink at cursor position or wrap selection
  const handleInsertLink = () => {
    const textarea = document.getElementById('blog-content');
    const start = textarea ? textarea.selectionStart : formData.content.length;
    const end = textarea ? textarea.selectionEnd : formData.content.length;
    const selectedText = formData.content.substring(start, end).trim();

    const linkText = window.prompt('Enter link text to display:', selectedText || 'Click here');
    if (!linkText) return;

    const url = window.prompt('Enter link URL (e.g. https://example.com or /register):', 'https://');
    if (!url || !url.trim()) return;

    const cleanUrl = url.trim();
    const markdownLink = `[${linkText}](${cleanUrl})`;
    const before = formData.content.substring(0, start);
    const after = formData.content.substring(end);
    const newContent = `${before}${markdownLink}${after}`;

    setFormData((prev) => ({ ...prev, content: newContent }));
    handleContentChange(newContent);

    if (textarea) {
      setTimeout(() => {
        textarea.focus();
        const cursor = start + markdownLink.length;
        textarea.setSelectionRange(cursor, cursor);
      }, 50);
    }
  };

  // Quick formatting insert (bold, headings, bullet list)
  const handleInsertSnippet = (prefix, suffix = '', defaultText = '') => {
    const textarea = document.getElementById('blog-content');
    const start = textarea ? textarea.selectionStart : formData.content.length;
    const end = textarea ? textarea.selectionEnd : formData.content.length;
    const selectedText = formData.content.substring(start, end);
    const textToWrap = selectedText || defaultText;

    const insertion = `${prefix}${textToWrap}${suffix}`;
    const before = formData.content.substring(0, start);
    const after = formData.content.substring(end);
    const newContent = `${before}${insertion}${after}`;

    setFormData((prev) => ({ ...prev, content: newContent }));
    handleContentChange(newContent);

    if (textarea) {
      setTimeout(() => {
        textarea.focus();
        const cursor = start + insertion.length;
        textarea.setSelectionRange(cursor, cursor);
      }, 50);
    }
  };

  // Change overall alignment or wrap selection with alignment markup
  const handleAlignmentSelect = (alignMode) => {
    const textarea = document.getElementById('blog-content');
    const start = textarea ? textarea.selectionStart : 0;
    const end = textarea ? textarea.selectionEnd : 0;
    const selectedText = formData.content.substring(start, end).trim();

    if (selectedText) {
      // Wrap highlighted block with alignment div
      const insertion = `<div align="${alignMode}">\n${selectedText}\n</div>`;
      const before = formData.content.substring(0, start);
      const after = formData.content.substring(end);
      const newContent = `${before}${insertion}${after}`;

      setFormData((prev) => ({ ...prev, content: newContent }));
      handleContentChange(newContent);

      if (textarea) {
        setTimeout(() => {
          textarea.focus();
          const cursor = start + insertion.length;
          textarea.setSelectionRange(cursor, cursor);
        }, 50);
      }
    } else {
      // Switch overall article text alignment
      setFormData((prev) => ({ ...prev, textAlign: alignMode }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide an article title.');
      return;
    }
    if (!formData.excerpt.trim()) {
      setError('Please provide a brief executive summary / excerpt.');
      return;
    }
    if (!formData.content.trim()) {
      setError('Please provide full article content.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const tagsArray = (formData.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        title: String(formData.title || '').trim(),
        category: String(formData.category || 'Healthcare Insights').trim(),
        author: String(formData.author || 'IndiGlobal Healthcare Expo').trim(),
        authorRole: String(formData.authorRole || 'Secretariat Contributor').trim(),
        coverImage: String(formData.coverImage || SAMPLE_COVERS[0].url).trim(),
        readTime: String(formData.readTime || '5 min read').trim(),
        excerpt: String(formData.excerpt || '').trim(),
        content: String(formData.content || '').trim(),
        textAlign: formData.textAlign || 'left',
        tags: tagsArray,
        slug: String(liveSlug || '').trim(),
        publishedDate: editingBlog?.publishedDate || undefined,
      };

      if (onSave) {
        await onSave(payload);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message || 'Failed to save blog article. Please check input and try again.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="admin-modal admin-modal-lg admin-modal-scrollable admin-blog-modal-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="admin-modal-form-wrap">
          <div className="admin-modal-header">
            <div className="admin-modal-title-group">
              <span className="badge-preview-tag">
                <i className="fa-solid fa-pen-nib"></i> Secretariat Editorial Console
              </span>
              <h3>{editingBlog ? 'Edit Healthcare Article' : 'Publish New Blog Article'}</h3>
              <p className="admin-modal-sub">
                Publish high-impact technical briefings, regulatory updates, or exhibition news directly to the portal.
              </p>
            </div>
            <button
              type="button"
              className="admin-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="admin-modal-body admin-blog-modal-body">
            {error && (
              <div className="admin-alert-error mb-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Title & Live Slug */}
            <div className="form-group mb-3">
              <label htmlFor="blog-title" className="form-label-required">
                Article Title
              </label>
              <input
                type="text"
                id="blog-title"
                required
                placeholder="e.g. Breakthroughs in Active Pharmaceutical Ingredients: Sourcing Resilience in 2026-2027"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-control"
              />
              <div className="admin-slug-preview mt-1">
                <i className="fa-solid fa-link text-muted"></i>
                <span className="slug-preview-text">
                  Live URL: <code>/blogs/{liveSlug}</code>
                </span>
              </div>
            </div>

            {/* Author & Role Row */}
            <div className="form-row-2 mb-3">
              <div className="form-group">
                <label htmlFor="blog-author">Author Full Name</label>
                <input
                  type="text"
                  id="blog-author"
                  placeholder="e.g. Dr. Sarah Jenkins or IndiGlobal Editorial Desk"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="blog-author-role">Author Role / Designation</label>
                <input
                  type="text"
                  id="blog-author-role"
                  placeholder="e.g. Senior Formulation Scientist / Secretariat Lead"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  className="form-control"
                />
              </div>
            </div>

            {/* Read Time Row */}
            <div className="form-group mb-3">
              <label htmlFor="blog-read-time">Estimated Read Time</label>
              <input
                type="text"
                id="blog-read-time"
                placeholder="e.g. 5 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="form-control"
              />
            </div>

            {/* Cover Image URL & Presets */}
            <div className="form-group mb-3">
              <label htmlFor="blog-cover">Cover Image URL</label>
              <input
                type="text"
                id="blog-cover"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="form-control"
              />

              <div className="blog-cover-presets mt-2">
                <span className="preset-label">Quick Cover Selection:</span>
                <div className="preset-chips">
                  {SAMPLE_COVERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-chip-btn ${formData.coverImage === preset.url ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.coverImage && (
                <div className="blog-cover-preview mt-2">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="blog-cover-preview-meta">
                    <span className="blog-cover-preview-label">Live Visual Preview</span>
                    <small className="text-muted">High-resolution 16:9 banner preview</small>
                  </div>
                </div>
              )}
            </div>

            {/* Tags with Quick Presets */}
            <div className="form-group mb-3">
              <label htmlFor="blog-tags">Article Tags (Comma-separated)</label>
              <input
                type="text"
                id="blog-tags"
                placeholder="e.g. APIs, Cleanrooms, Medical Devices, Supply Chain"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="form-control"
              />
              <div className="preset-tags-row mt-2">
                <span className="preset-label">Tap to Add Tags:</span>
                <div className="preset-tags-chips">
                  {PRESET_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="tag-suggest-chip"
                      onClick={() => handleAddTag(tag)}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary / Excerpt */}
            <div className="form-group mb-3">
              <label htmlFor="blog-excerpt" className="form-label-required">
                Article Summary / Excerpt (Displayed on Cards & Search)
              </label>
              <textarea
                id="blog-excerpt"
                rows="2"
                required
                placeholder="Brief 2-3 line executive summary of key takeaways and industry significance..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="form-control"
              ></textarea>
              <small className="text-muted">Recommended: 120 - 220 characters for crisp card layouts.</small>
            </div>

            {/* Article Text Alignment Option */}
            <div className="form-group mb-3 blog-align-control-card">
              <div className="blog-align-label-row">
                <label className="form-label-bold mb-0">
                  <i className="fa-solid fa-align-left text-primary me-1"></i> Article Text Alignment
                </label>
                <span className="blog-align-current-badge">
                  Active Mode: <strong className="text-capitalize">{formData.textAlign || 'left'}</strong>
                </span>
              </div>
              <p className="blog-align-desc">
                Choose the default reading alignment for your article. Readers can view the content cleanly formatted in your selected alignment.
              </p>
              <div className="blog-align-btn-group" role="radiogroup" aria-label="Text Alignment Options">
                <button
                  type="button"
                  className={`blog-align-opt-btn ${formData.textAlign === 'left' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, textAlign: 'left' }))}
                  title="Standard left-aligned reading"
                >
                  <i className="fa-solid fa-align-left"></i>
                  <span>Left (Default)</span>
                </button>
                <button
                  type="button"
                  className={`blog-align-opt-btn ${formData.textAlign === 'justify' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, textAlign: 'justify' }))}
                  title="Even margins on left and right borders"
                >
                  <i className="fa-solid fa-align-justify"></i>
                  <span>Justify (Editorial)</span>
                </button>
                <button
                  type="button"
                  className={`blog-align-opt-btn ${formData.textAlign === 'center' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, textAlign: 'center' }))}
                  title="Centered headline and paragraph layout"
                >
                  <i className="fa-solid fa-align-center"></i>
                  <span>Center</span>
                </button>
                <button
                  type="button"
                  className={`blog-align-opt-btn ${formData.textAlign === 'right' ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, textAlign: 'right' }))}
                  title="Right-aligned text presentation"
                >
                  <i className="fa-solid fa-align-right"></i>
                  <span>Right</span>
                </button>
              </div>
            </div>

            {/* Full Content with Rich Formatting & Alignment Toolbar */}
            <div className="form-group mb-3">
              <div className="content-label-row">
                <label htmlFor="blog-content" className="form-label-required mb-0">
                  Full Article Content
                </label>
                <div className="editor-view-tabs">
                  <button
                    type="button"
                    className={`editor-tab-btn ${activeTab === 'write' ? 'active' : ''}`}
                    onClick={() => setActiveTab('write')}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Editor
                  </button>
                  <button
                    type="button"
                    className={`editor-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                  >
                    <i className="fa-solid fa-eye"></i> Live Preview ({formData.textAlign})
                  </button>
                </div>
              </div>

              {activeTab === 'write' ? (
                <>
                  {/* Quick Formatting & Hyperlink Toolbar */}
                  <div className="blog-editor-toolbar">
                    <button
                      type="button"
                      className="blog-toolbar-btn blog-toolbar-btn-link"
                      onClick={handleInsertLink}
                      title="Insert Hyperlink"
                    >
                      <i className="fa-solid fa-link"></i> Add Hyperlink
                    </button>
                    <button
                      type="button"
                      className="blog-toolbar-btn"
                      onClick={() => handleInsertSnippet('**', '**', 'bold text')}
                      title="Bold (**text**)"
                    >
                      <i className="fa-solid fa-bold"></i> Bold
                    </button>
                    <button
                      type="button"
                      className="blog-toolbar-btn"
                      onClick={() => handleInsertSnippet('\n## ', '\n', 'Section Title')}
                      title="Section Heading (##)"
                    >
                      <i className="fa-solid fa-heading"></i> H2
                    </button>
                    <button
                      type="button"
                      className="blog-toolbar-btn"
                      onClick={() => handleInsertSnippet('\n### ', '\n', 'Subsection Title')}
                      title="Subsection Heading (###)"
                    >
                      <i className="fa-solid fa-heading" style={{ fontSize: '0.75rem' }}></i> H3
                    </button>
                    <button
                      type="button"
                      className="blog-toolbar-btn"
                      onClick={() => handleInsertSnippet('\n* ', '\n', 'Key takeaway item')}
                      title="Bullet list item (*)"
                    >
                      <i className="fa-solid fa-list-ul"></i> Bullet
                    </button>

                    <div className="blog-toolbar-divider" aria-hidden="true"></div>

                    {/* Text Alignment Toolbar Actions */}
                    <div className="blog-toolbar-align-group">
                      <span className="toolbar-inline-label">Align:</span>
                      <button
                        type="button"
                        className={`blog-toolbar-btn blog-toolbar-align-btn ${formData.textAlign === 'left' ? 'active' : ''}`}
                        onClick={() => handleAlignmentSelect('left')}
                        title="Align Left (or wrap selection in left-aligned block)"
                      >
                        <i className="fa-solid fa-align-left"></i>
                      </button>
                      <button
                        type="button"
                        className={`blog-toolbar-btn blog-toolbar-align-btn ${formData.textAlign === 'justify' ? 'active' : ''}`}
                        onClick={() => handleAlignmentSelect('justify')}
                        title="Justify (or wrap selection in justified block)"
                      >
                        <i className="fa-solid fa-align-justify"></i>
                      </button>
                      <button
                        type="button"
                        className={`blog-toolbar-btn blog-toolbar-align-btn ${formData.textAlign === 'center' ? 'active' : ''}`}
                        onClick={() => handleAlignmentSelect('center')}
                        title="Align Center (or wrap selection in centered block)"
                      >
                        <i className="fa-solid fa-align-center"></i>
                      </button>
                      <button
                        type="button"
                        className={`blog-toolbar-btn blog-toolbar-align-btn ${formData.textAlign === 'right' ? 'active' : ''}`}
                        onClick={() => handleAlignmentSelect('right')}
                        title="Align Right (or wrap selection in right-aligned block)"
                      >
                        <i className="fa-solid fa-align-right"></i>
                      </button>
                    </div>

                    <span className="toolbar-tip ms-auto">
                      <i className="fa-solid fa-circle-info"></i> Alignment: <code>{formData.textAlign}</code>
                    </span>
                  </div>

                  <textarea
                    id="blog-content"
                    rows="11"
                    required
                    placeholder="Write or paste your article content here...

Tip: Use the Text Alignment options to align whole article or specific blocks.

### Executive Overview
Enter section overview...

### Key Industry Catalysts
* Point one on supply chain diversification
* Point two on regulatory harmonization

### Concluding Recommendations
Summary and recommendations for trade delegates..."
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    style={{ textAlign: formData.textAlign || 'left' }}
                    className="form-control font-mono-text blog-content-textarea"
                  ></textarea>
                </>
              ) : (
                <div className="blog-modal-preview-box">
                  <div className="preview-box-header">
                    <span className="preview-badge">
                      <i className="fa-solid fa-eye text-primary"></i> Live Reader Simulation
                    </span>
                    <span className="preview-align-indicator">
                      Text Alignment: <strong className="text-capitalize">{formData.textAlign}</strong>
                    </span>
                  </div>
                  <div className="preview-box-body">
                    <BlogContentRenderer
                      content={
                        (formData.content || '').trim() ||
                        '*No article content written yet. Switch to the Editor tab to start typing.*'
                      }
                      textAlign={formData.textAlign}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Featured Article Toggle */}
            <div className="form-group blog-featured-toggle mb-2">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  <i className="fa-solid fa-star text-warning"></i> Mark as Featured Article (Highlighted prominently across the website)
                </span>
              </label>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-publish-action"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Saving Article...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>{' '}
                  {editingBlog ? 'Update Article' : 'Publish Article'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
