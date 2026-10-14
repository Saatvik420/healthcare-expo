import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContentRenderer from './BlogContentRenderer';
import { getBlogSlug, formatBlogPublishedDate } from '../services/blogService';

export default function BlogQuickReadModal({ isOpen, blog, onClose, onNotify }) {
  const navigate = useNavigate();

  // Escape key handler & body overflow lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  const slug = blog.slug || getBlogSlug(blog);

  const handleOpenFullPage = () => {
    onClose();
    navigate(`/blogs/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/blogs/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    if (onNotify) {
      onNotify('Link Copied', 'Article link copied to clipboard.');
    }
  };

  const handleShare = (platform) => {
    const fullUrl = encodeURIComponent(`${window.location.origin}/blogs/${slug}`);
    const title = encodeURIComponent(blog.title || 'IndiGlobal Healthcare Expo Article');

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${fullUrl}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${fullUrl}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div
      className="blog-quick-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-read-title"
    >
      <div className="blog-quick-modal">
        {/* Modal Header */}
        <div className="blog-quick-modal-header">
          <div className="quick-modal-header-meta">
            <span className="quick-modal-badge">
              <i className="fa-solid fa-book-open"></i> Quick Reader
            </span>
            <span className="quick-modal-date">
              {blog.publishedDate || formatBlogPublishedDate(blog)}
            </span>
            <span className="meta-sep">&bull;</span>
            <span className="quick-modal-time">
              <i className="fa-regular fa-clock"></i> {blog.readTime || '5 min read'}
            </span>
          </div>

          <div className="quick-modal-header-actions">
            <button
              type="button"
              className="btn btn-sm btn-outline quick-modal-fullpage-btn"
              onClick={handleOpenFullPage}
              title="Open full dedicated page"
            >
              <span>Full Page</span> <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button
              type="button"
              className="quick-modal-close-btn"
              onClick={onClose}
              aria-label="Close reader"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="blog-quick-modal-body">
          <h2 id="quick-read-title" className="quick-modal-title">
            {blog.title}
          </h2>

          <div className="quick-modal-author-strip">
            <div className="quick-modal-author-avatar">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <strong className="quick-modal-author-name">{blog.author}</strong>
              <span className="quick-modal-author-role">
                {blog.authorRole || 'Secretariat Contributor'}
              </span>
            </div>
          </div>

          {blog.coverImage && (
            <div className="quick-modal-cover-wrap">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="quick-modal-cover-img"
              />
            </div>
          )}

          {blog.excerpt && (
            <div className="quick-modal-excerpt-box">
              <p>{blog.excerpt}</p>
            </div>
          )}

          {/* Formatted Content */}
          <div className="quick-modal-article-body">
            <BlogContentRenderer content={blog.content} textAlign={blog.textAlign || 'left'} />
          </div>

          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="quick-modal-tags">
              <span className="tags-label">Topics:</span>
              <div className="tags-list">
                {blog.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="article-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="blog-quick-modal-footer">
          <div className="quick-modal-share-row">
            <span className="quick-share-text">Share:</span>
            <button
              type="button"
              className="quick-share-icon"
              onClick={handleCopyLink}
              title="Copy link"
            >
              <i className="fa-solid fa-link"></i>
            </button>
            <button
              type="button"
              className="quick-share-icon icon-linkedin"
              onClick={() => handleShare('linkedin')}
              title="Share on LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </button>
            <button
              type="button"
              className="quick-share-icon icon-twitter"
              onClick={() => handleShare('twitter')}
              title="Share on X"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </button>
            <button
              type="button"
              className="quick-share-icon icon-whatsapp"
              onClick={() => handleShare('whatsapp')}
              title="Share on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </button>
          </div>

          <div className="quick-modal-footer-btns">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleOpenFullPage}
            >
              <span>Read in Full Page</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
