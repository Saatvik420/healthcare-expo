import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogService, { getBlogSlug, formatBlogPublishedDate, isSameBlog } from '../services/blogService';
import { useData } from '../context/DataContext';
import BlogContentRenderer from '../components/BlogContentRenderer';

export default function BlogDetailPage({ onNotify }) {
  const { id } = useParams();
  const { blogs = [] } = useData();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [readerAlign, setReaderAlign] = useState(null); // overrides blog.textAlign if user changes it

  // Always ensure body overflow is unlocked when viewing a blog
  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = (window.scrollY / scrollHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, pct)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    const loadBlog = async () => {
      setIsLoading(true);
      try {
        // 1. Instant in-memory lookup
        let found = (blogs || []).find(
          (b) =>
            b.id === id ||
            String(b.id) === String(id) ||
            b.slug === id ||
            b.blogId === id ||
            getBlogSlug(b) === id ||
            getBlogSlug(b)?.toLowerCase() === id?.toLowerCase()
        );

        // 2. Instant local storage cache lookup
        if (!found) {
          try {
            const cached = JSON.parse(
              localStorage.getItem('ghe_blogs') ||
                localStorage.getItem('ighe_blogs_cache') ||
                '[]'
            );
            if (Array.isArray(cached)) {
              found = cached.find(
                (b) =>
                  b.id === id ||
                  String(b.id) === String(id) ||
                  b.slug === id ||
                  b.blogId === id ||
                  getBlogSlug(b) === id ||
                  getBlogSlug(b)?.toLowerCase() === id?.toLowerCase()
              );
            }
          } catch {
            // ignore cache parse error
          }
        }

        // 3. Fallback to API if still not found
        if (!found) {
          try {
            found = await blogService.getBlogByIdOrSlug(id);
          } catch {
            // ignore
          }
        }

        if (!active) return;
        setBlog(found || null);

        // Canonical URL update: If opened by raw ID, replace URL with SEO-friendly slug
        if (found) {
          const cleanSlug = getBlogSlug(found);
          if (cleanSlug && id !== cleanSlug) {
            window.history.replaceState(null, '', `/blogs/${cleanSlug}`);
          }
        }

        // Related blogs
        const allBlogs = blogs.length > 0 ? blogs : await blogService.getAllBlogs();
        if (!active) return;
        const related = (allBlogs || [])
          .filter((b) => !isSameBlog(b, found))
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (err) {
        console.error('Failed to load blog:', err);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadBlog();
    window.scrollTo(0, 0);

    return () => {
      active = false;
    };
  }, [id, blogs]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    if (onNotify) {
      onNotify('Link Copied', 'Article URL copied to your clipboard.');
    }
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || 'IndiGlobal Healthcare Expo Article');

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper py-5">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="page-wrapper py-5">
        <div className="container text-center py-5">
          <div className="blogs-empty-state">
            <i className="fa-solid fa-file-circle-question text-muted" style={{ fontSize: '3rem' }}></i>
            <h2 className="mt-3">Article Not Found</h2>
            <p className="text-muted">The article you requested could not be found or has been moved.</p>
            <Link to="/blogs" className="btn btn-primary mt-3">
              <i className="fa-solid fa-arrow-left"></i> Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper blog-detail-page">
      {/* Realtime Reading Progress Indicator */}
      <div className="blog-reading-progress-track" aria-hidden="true">
        <div
          className="blog-reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Top Breadcrumb & Return Ribbon */}
      <section className="blog-detail-topbar">
        <div className="container">
          <div className="blog-detail-breadcrumbs">
            <Link to="/" className="breadcrumb-link">
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/blogs" className="breadcrumb-link">
              Our Blogs
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" title={blog.title}>
              {blog.title}
            </span>
          </div>

          <Link to="/blogs" className="blog-back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Articles
          </Link>
        </div>
      </section>

      {/* Main Article Container */}
      <article className="section py-4 blog-article-section">
        <div className="container article-container">
          {/* Header */}
          <header className="article-header">
            {blog.category && (
              <span className="article-category-badge">
                {blog.category}
              </span>
            )}

            <h1 className="article-headline">{blog.title}</h1>

            <div className="article-meta-bar">
              <div className="article-author-card">
                <div className="author-avatar">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <strong className="author-name">{blog.author}</strong>
                  <span className="author-role">{blog.authorRole || 'Secretariat Contributor'}</span>
                </div>
              </div>

              <div className="article-stats">
                <span className="article-date">
                  <i className="fa-regular fa-calendar"></i> {blog.publishedDate || formatBlogPublishedDate(blog)}
                </span>
                <span className="meta-sep">&bull;</span>
                <span className="article-read-time">
                  <i className="fa-regular fa-clock"></i> {blog.readTime || '5 min read'}
                </span>
              </div>
            </div>

            {/* Reader Utilities & Social Share Strip */}
            <div className="article-toolbar-strip">
              {/* Text Size Accessibility Controls */}
              <div className="article-text-resizer">
                <span className="resizer-label">
                  <i className="fa-solid fa-text-height"></i> Text Size:
                </span>
                <div className="resizer-buttons">
                  <button
                    type="button"
                    className={`resizer-btn ${fontSize === 'small' ? 'active' : ''}`}
                    onClick={() => setFontSize('small')}
                    title="Small text"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    className={`resizer-btn ${fontSize === 'normal' ? 'active' : ''}`}
                    onClick={() => setFontSize('normal')}
                    title="Default text"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    className={`resizer-btn ${fontSize === 'large' ? 'active' : ''}`}
                    onClick={() => setFontSize('large')}
                    title="Large text"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Text Alignment Reader Controls */}
              <div className="article-text-resizer article-align-resizer">
                <span className="resizer-label">
                  <i className="fa-solid fa-align-left"></i> Align:
                </span>
                <div className="resizer-buttons">
                  <button
                    type="button"
                    className={`resizer-btn ${(readerAlign || blog.textAlign || 'left') === 'left' ? 'active' : ''}`}
                    onClick={() => setReaderAlign('left')}
                    title="Align Left"
                  >
                    <i className="fa-solid fa-align-left"></i>
                  </button>
                  <button
                    type="button"
                    className={`resizer-btn ${(readerAlign || blog.textAlign || 'left') === 'justify' ? 'active' : ''}`}
                    onClick={() => setReaderAlign('justify')}
                    title="Justify"
                  >
                    <i className="fa-solid fa-align-justify"></i>
                  </button>
                  <button
                    type="button"
                    className={`resizer-btn ${(readerAlign || blog.textAlign || 'left') === 'center' ? 'active' : ''}`}
                    onClick={() => setReaderAlign('center')}
                    title="Align Center"
                  >
                    <i className="fa-solid fa-align-center"></i>
                  </button>
                </div>
              </div>

              {/* Share Actions */}
              <div className="article-share-group">
                <span className="share-strip-label">
                  <i className="fa-solid fa-share-nodes"></i> Share:
                </span>
                <div className="share-buttons-row">
                  <button
                    type="button"
                    className="share-btn share-btn-copy"
                    onClick={handleCopyLink}
                    title="Copy link to clipboard"
                  >
                    <i className={`fa-solid ${copySuccess ? 'fa-check' : 'fa-link'}`}></i>
                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <button
                    type="button"
                    className="share-btn share-btn-linkedin"
                    onClick={() => handleShare('linkedin')}
                    title="Share on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </button>
                  <button
                    type="button"
                    className="share-btn share-btn-twitter"
                    onClick={() => handleShare('twitter')}
                    title="Share on X / Twitter"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </button>
                  <button
                    type="button"
                    className="share-btn share-btn-whatsapp"
                    onClick={() => handleShare('whatsapp')}
                    title="Share via WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          {blog.coverImage && (
            <div className="article-cover-box">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="article-cover-img"
              />
              <figcaption className="article-cover-caption">
                IndiGlobal Healthcare Expo 2027 &bull; Official Industry Briefing
              </figcaption>
            </div>
          )}

          {/* Article Excerpt Callout */}
          {blog.excerpt && (
            <div className="article-lead-callout">
              <p>{blog.excerpt}</p>
            </div>
          )}

          {/* Body Content with fluid responsive text & custom font size */}
          <div className={`article-body-content font-size-${fontSize}`}>
            <BlogContentRenderer content={blog.content} textAlign={readerAlign || blog.textAlign || 'left'} />
          </div>

          {/* Tags */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="article-tags-wrap">
              <span className="tags-label">
                <i className="fa-solid fa-tags"></i> Topics:
              </span>
              <div className="tags-list">
                {blog.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="article-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio Box */}
          <div className="article-author-bio-card">
            <div className="author-bio-avatar">
              <i className="fa-solid fa-id-card-clip"></i>
            </div>
            <div className="author-bio-info">
              <h4>{blog.author}</h4>
              <p className="author-bio-role">{blog.authorRole || 'Healthcare Industry Expert'}</p>
              <p className="author-bio-text">
                Contributing analyst for the official IndiGlobal Healthcare Expo editorial desk, covering cross-border pharmaceuticals, cold-chain compliance, and bilateral healthcare technology transfers across South Asia and ASEAN.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="article-related-section">
              <div className="related-header">
                <h3>Recommended Chronicles &amp; Insights</h3>
                <Link to="/blogs" className="related-view-all">
                  All Articles <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>

              <div className="related-grid">
                {relatedBlogs.map((rel) => {
                  const relSlug = rel.slug || getBlogSlug(rel);
                  return (
                    <Link key={rel.id || relSlug} to={`/blogs/${relSlug}`} className="related-card">
                      <div className="related-thumb-wrap">
                        <img src={rel.coverImage} alt={rel.title} className="related-thumb" />
                      </div>
                      <div className="related-info">
                        <small className="related-date">{rel.publishedDate}</small>
                        <h4 className="related-title">{rel.title}</h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
