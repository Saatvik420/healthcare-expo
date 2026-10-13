/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from 'react';
import { getBlogSlug } from '../../services/blogService';

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
  });
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
      });
    }
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
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        title: formData.title.trim(),
        category: formData.category?.trim() || 'Healthcare Insights',
        author: formData.author?.trim() || 'IndiGlobal Healthcare Expo',
        authorRole: formData.authorRole?.trim() || 'Secretariat Contributor',
        coverImage: formData.coverImage?.trim() || SAMPLE_COVERS[0].url,
        readTime: formData.readTime?.trim() || '5 min read',
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        tags: tagsArray,
        slug: liveSlug,
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save blog article. Please check input and try again.');
    } finally {
      setIsSubmitting(false);
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

            {/* Category & Read Time Row */}
            <div className="form-row-2 mb-3">
              <div className="form-group">
                <label htmlFor="blog-category">Category / Pillar</label>
                <input
                  type="text"
                  id="blog-category"
                  placeholder="e.g. Healthcare Insights, Pharma & APIs, Medical Tech..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-control"
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  <option value="Healthcare Insights" />
                  <option value="Pharma & APIs" />
                  <option value="Pharma Machinery" />
                  <option value="Medical Devices" />
                  <option value="Cold Chain & Logistics" />
                  <option value="Hospital Infrastructure" />
                  <option value="Healthcare Policies" />
                  <option value="Exhibition Strategy" />
                </datalist>
              </div>

              <div className="form-group">
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

            {/* Full Content */}
            <div className="form-group mb-3">
              <div className="content-label-row">
                <label htmlFor="blog-content" className="form-label-required">
                  Full Article Content
                </label>
                <span className="markdown-hint">
                  <i className="fa-brands fa-markdown"></i> Headings (###), bold (**text**), lists (*) supported
                </span>
              </div>
              <textarea
                id="blog-content"
                rows="9"
                required
                placeholder="Write or paste your article content here...

### Executive Overview
Enter section overview...

### Key Industry Catalysts
* Point one on supply chain diversification
* Point two on regulatory harmonization

### Concluding Recommendations
Summary and recommendations for trade delegates..."
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="form-control font-mono-text blog-content-textarea"
              ></textarea>
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
