import { useState, useEffect } from 'react';
import blogService from '../../services/blogService';

export default function BlogModal({ isOpen, onClose, onSave, editingBlog }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pharma & APIs',
    author: 'IndiGlobal Secretariat',
    authorRole: 'Healthcare Policy Analyst',
    coverImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    tags: '',
    excerpt: '',
    content: '',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = blogService.getCategories().filter((c) => c !== 'All');

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        category: editingBlog.category || 'Pharma & APIs',
        author: editingBlog.author || 'IndiGlobal Secretariat',
        authorRole: editingBlog.authorRole || 'Healthcare Policy Analyst',
        coverImage:
          editingBlog.coverImage ||
          'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
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
        category: 'Pharma & APIs',
        author: 'IndiGlobal Secretariat',
        authorRole: 'Healthcare Policy Analyst',
        coverImage:
          'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        tags: '',
        excerpt: '',
        content: '',
        featured: false,
      });
    }
    setError('');
  }, [editingBlog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide an article title');
      return;
    }
    if (!formData.excerpt.trim()) {
      setError('Please provide a brief excerpt / summary');
      return;
    }
    if (!formData.content.trim()) {
      setError('Please provide article content');
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
        tags: tagsArray,
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save blog article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal-card admin-blog-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div className="admin-modal-title-wrap">
            <span className="admin-modal-badge">
              <i className="fa-solid fa-newspaper"></i> Secretariat Editorial
            </span>
            <h3>{editingBlog ? 'Edit Healthcare Article' : 'Publish New Blog Article'}</h3>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            {error && (
              <div className="admin-alert-error mb-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group mb-3">
              <label htmlFor="blog-title" className="form-label-required">
                Article Title
              </label>
              <input
                type="text"
                id="blog-title"
                required
                placeholder="e.g. Breakthroughs in Active Pharmaceutical Ingredients..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-row-2 mb-3">
              <div className="form-group">
                <label htmlFor="blog-category" className="form-label-required">
                  Pavilion / Category
                </label>
                <select
                  id="blog-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-control"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="blog-read-time">Read Time</label>
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

            <div className="form-row-2 mb-3">
              <div className="form-group">
                <label htmlFor="blog-author">Author Name</label>
                <input
                  type="text"
                  id="blog-author"
                  placeholder="e.g. Dr. Sarah Jenkins"
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
                  placeholder="e.g. Senior Formulation Scientist"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blog-cover">Cover Image URL</label>
              <input
                type="url"
                id="blog-cover"
                placeholder="https://images.unsplash.com/..."
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="form-control"
              />
              {formData.coverImage && (
                <div className="blog-cover-preview mt-2">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="blog-cover-preview-label">Live Cover Preview</span>
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blog-tags">Tags (Comma-separated)</label>
              <input
                type="text"
                id="blog-tags"
                placeholder="e.g. APIs, Pharma, Medical Devices, Supply Chain"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blog-excerpt" className="form-label-required">
                Article Summary / Excerpt (displayed in cards and search)
              </label>
              <textarea
                id="blog-excerpt"
                rows="2"
                required
                placeholder="Brief 2-3 line executive summary of the article..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blog-content" className="form-label-required">
                Full Article Content (Markdown headings and paragraphs supported)
              </label>
              <textarea
                id="blog-content"
                rows="8"
                required
                placeholder="Write or paste your article content here. Use ### for subheadings, bullet points with * or 1. for lists..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-control font-mono-text"
              ></textarea>
            </div>

            <div className="form-group blog-featured-toggle">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  <i className="fa-solid fa-star text-warning"></i> Mark as Featured Article (prominently highlighted on Blog and Home pages)
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
              className="btn btn-primary"
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
