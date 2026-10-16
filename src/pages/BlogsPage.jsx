import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getBlogSlug, getBlogTimestamp, formatBlogPublishedDate } from '../services/blogService';
import BlogQuickReadModal from '../components/BlogQuickReadModal';

export default function BlogsPage() {
  const { blogs = [] } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, readTime
  const [quickReadBlog, setQuickReadBlog] = useState(null);

  // Clear any lingering scroll lock on mount
  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const cleanList = (Array.isArray(blogs) ? blogs : []).filter(Boolean);
    let result = cleanList.filter((blog) => {
      if (!blog) return false;
      if (!query) return true;
      const title = String(blog.title || '').toLowerCase();
      const excerpt = String(blog.excerpt || '').toLowerCase();
      const content = String(blog.content || '').toLowerCase();
      const author = String(blog.author || '').toLowerCase();
      const tagsStr = Array.isArray(blog.tags)
        ? blog.tags.join(' ').toLowerCase()
        : String(blog.tags || '').toLowerCase();

      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        content.includes(query) ||
        author.includes(query) ||
        tagsStr.includes(query)
      );
    });

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return getBlogTimestamp(b) - getBlogTimestamp(a);
      } else if (sortBy === 'oldest') {
        return getBlogTimestamp(a) - getBlogTimestamp(b);
      } else if (sortBy === 'readTime') {
        const timeA = parseInt(a.readTime || '0', 10) || 0;
        const timeB = parseInt(b.readTime || '0', 10) || 0;
        return timeA - timeB;
      }
      return 0;
    });

    return result;
  }, [blogs, searchQuery, sortBy]);

  // Featured story: Prioritize newest featured editorial; fallback to freshest article overall
  const featuredBlog = useMemo(() => {
    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) return null;
    const cleanList = blogs.filter(Boolean);
    const featuredList = cleanList
      .filter((b) => Boolean(b.featured))
      .sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
    if (featuredList.length > 0) {
      return featuredList[0];
    }
    const sortedAll = [...cleanList].sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
    return sortedAll[0] || null;
  }, [blogs]);

  // Other blogs excluding the featured one if showing all and no search query
  const gridBlogs = useMemo(() => {
    if (!searchQuery.trim() && featuredBlog) {
      const featId = featuredBlog.id || featuredBlog.slug;
      return filteredBlogs.filter((b) => b && (b.id || b.slug) !== featId);
    }
    return filteredBlogs.filter(Boolean);
  }, [filteredBlogs, searchQuery, featuredBlog]);

  const handleQuickRead = (e, blog) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickReadBlog(blog);
  };

  return (
    <div className="page-wrapper blogs-page">
      {/* Hero Header */}
      <section className="blogs-hero-section">
        <div className="container">
          <div className="blogs-hero-content">
            <h1 className="blogs-hero-title">
              Our <span className="text-gradient">Blogs</span>
            </h1>
            <p className="blogs-hero-subtitle">
              Expert articles, regulatory blueprints, and bilateral trade intelligence for the international healthcare community.
            </p>
          </div>
        </div>
      </section>

      <section className="section py-5">
        <div className="container">
          {/* Controls Bar: Search & Sorting */}
          <div className="blogs-controls-bar">
            {/* Search Box */}
            <div className="blogs-search-wrapper">
              <i className="fa-solid fa-magnifying-glass blogs-search-icon"></i>
              <input
                type="text"
                placeholder="Search by keywords, author, topic, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogs-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="blogs-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="blogs-sort-wrapper">
              <label htmlFor="blogs-sort" className="blogs-sort-label">
                <i className="fa-solid fa-arrow-down-short-wide"></i> Sort:
              </label>
              <select
                id="blogs-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="blogs-sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="readTime">Quickest Read</option>
              </select>
            </div>
          </div>

          {/* FEATURED STORY SPOTLIGHT (Only when not actively searching) */}
          {!searchQuery.trim() && featuredBlog && (
            <div className="blogs-featured-spotlight">
              <div className="featured-spotlight-card">
                <Link
                  to={`/blogs/${featuredBlog.slug || getBlogSlug(featuredBlog)}`}
                  className="featured-spotlight-img-wrap"
                >
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="featured-spotlight-img"
                  />
                  <div className="featured-spotlight-tag">
                    <i className="fa-solid fa-star"></i> Featured Editorial
                  </div>
                </Link>

                <div className="featured-spotlight-info">
                  <div className="featured-spotlight-meta">
                    <span>{featuredBlog.publishedDate || formatBlogPublishedDate(featuredBlog)}</span>
                    <span className="meta-sep">&bull;</span>
                    <span>
                      <i className="fa-regular fa-clock"></i> {featuredBlog.readTime || '5 min read'}
                    </span>
                  </div>

                  <h2 className="featured-spotlight-title">
                    <Link
                      to={`/blogs/${featuredBlog.slug || getBlogSlug(featuredBlog)}`}
                      className="featured-spotlight-title-link"
                    >
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="featured-spotlight-excerpt">{featuredBlog.excerpt}</p>

                  <div className="featured-spotlight-footer">
                    <div className="featured-author-box">
                      <div className="featured-author-avatar">
                        <i className="fa-solid fa-user-doctor"></i>
                      </div>
                      <div>
                        <strong className="featured-author-name">{featuredBlog.author}</strong>
                        <span className="featured-author-role">{featuredBlog.authorRole}</span>
                      </div>
                    </div>

                    <div className="featured-spotlight-actions">
                      <button
                        type="button"
                        className="blog-btn-quick"
                        onClick={(e) => handleQuickRead(e, featuredBlog)}
                      >
                        <i className="fa-solid fa-book-open"></i> Quick Read
                      </button>
                      <Link
                        to={`/blogs/${featuredBlog.slug || getBlogSlug(featuredBlog)}`}
                        className="featured-read-btn"
                      >
                        <span>Full Article</span> <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GRID OF ARTICLES */}
          {gridBlogs.length > 0 ? (
            <div className="blogs-grid">
              {gridBlogs.map((blog) => {
                const slug = blog.slug || getBlogSlug(blog);
                return (
                  <article key={blog.id || slug} className="blog-card">
                    <div className="blog-card-link">
                      <Link to={`/blogs/${slug}`} className="blog-card-cover-wrap">
                        <img
                          src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'}
                          alt={blog.title}
                          className="blog-card-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                        {blog.featured && (
                          <span className="blog-card-star-badge" title="Featured Article">
                            <i className="fa-solid fa-star"></i>
                          </span>
                        )}
                        <button
                          type="button"
                          className="blog-card-quick-btn"
                          onClick={(e) => handleQuickRead(e, blog)}
                          title="Quick preview without leaving page"
                        >
                          <i className="fa-solid fa-book-open"></i> Quick Read
                        </button>
                      </Link>

                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span className="blog-date">{blog.publishedDate || formatBlogPublishedDate(blog)}</span>
                          <span className="meta-sep">&bull;</span>
                          <span className="blog-read-time">
                            <i className="fa-regular fa-clock"></i> {blog.readTime || '5 min read'}
                          </span>
                        </div>

                        <h3 className="blog-card-title">
                          <Link to={`/blogs/${slug}`} className="blog-card-title-link">
                            {blog.title}
                          </Link>
                        </h3>

                        <p className="blog-card-excerpt">{blog.excerpt}</p>
                      </div>

                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <div className="author-dot">
                            <i className="fa-solid fa-user"></i>
                          </div>
                          <div>
                            <span className="author-name">{blog.author}</span>
                            {blog.authorRole && (
                              <small className="author-role">{blog.authorRole}</small>
                            )}
                          </div>
                        </div>

                        <div className="blog-card-actions">
                          <button
                            type="button"
                            className="blog-btn-quick"
                            onClick={(e) => handleQuickRead(e, blog)}
                          >
                            <i className="fa-solid fa-book-open"></i> Preview
                          </button>
                          <Link to={`/blogs/${slug}`} className="blog-card-read-more">
                            Read <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blogs-empty-state">
              <div className="empty-icon-wrap">
                <i className="fa-solid fa-newspaper"></i>
              </div>
              <h3>No articles found</h3>
              <p>
                We could not find any articles matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                className="btn btn-outline mt-3"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Exhibition Register CTA Banner */}
          <div className="blogs-cta-banner mt-5">
            <div className="cta-banner-content">
              <span className="cta-banner-badge">Official Trade Fair 2027</span>
              <h3>Meet the Authors and Global Healthcare Leaders in Person</h3>
              <p>
                IndiGlobal Healthcare Expo 2027 brings together 15,000+ trade visitors, 450+ exhibitors, and ministerial delegations across 40+ countries.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/visitor-registration" className="btn btn-primary">
                <i className="fa-solid fa-id-card"></i> Register as Visitor
              </Link>
              <Link to="/exhibitor-registration" className="btn btn-outline-white">
                <i className="fa-solid fa-store"></i> Book Exhibitor Stall
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reader Modal */}
      <BlogQuickReadModal
        isOpen={Boolean(quickReadBlog)}
        blog={quickReadBlog}
        onClose={() => setQuickReadBlog(null)}
      />
    </div>
  );
}
