import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getBlogSlug } from '../services/blogService';

export default function BlogsPage() {
  const { blogs = [] } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, readTime

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result = (blogs || []).filter((blog) => {
      if (!query) return true;
      return (
        blog.title?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.content?.toLowerCase().includes(query) ||
        blog.author?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        (Array.isArray(blog.tags) && blog.tags.some((t) => t.toLowerCase().includes(query))) ||
        (typeof blog.tags === 'string' && blog.tags.toLowerCase().includes(query))
      );
    });

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || b.publishedDate || 0) - new Date(a.createdAt || a.publishedDate || 0);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt || a.publishedDate || 0) - new Date(b.createdAt || b.publishedDate || 0);
      } else if (sortBy === 'readTime') {
        const timeA = parseInt(a.readTime || '0', 10) || 0;
        const timeB = parseInt(b.readTime || '0', 10) || 0;
        return timeA - timeB;
      }
      return 0;
    });

    return result;
  }, [blogs, searchQuery, sortBy]);

  // Featured story
  const featuredBlog = useMemo(() => {
    return (blogs || []).find((b) => b.featured) || blogs[0] || null;
  }, [blogs]);

  // Other blogs excluding the featured one if showing all and no search query
  const gridBlogs = useMemo(() => {
    if (!searchQuery.trim() && featuredBlog) {
      return filteredBlogs.filter((b) => (b.id || b.slug) !== (featuredBlog.id || featuredBlog.slug));
    }
    return filteredBlogs;
  }, [filteredBlogs, searchQuery, featuredBlog]);

  return (
    <div className="page-wrapper blogs-page">
      {/* Hero Header */}
      <section className="blogs-hero-section">
        <div className="container">
          <div className="blogs-hero-content">
            <h1 className="blogs-hero-title">
              Our <span className="text-gradient">Blogs</span>
            </h1>
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
              <Link
                to={`/blogs/${featuredBlog.slug || getBlogSlug(featuredBlog)}`}
                className="featured-spotlight-card"
              >
                <div className="featured-spotlight-img-wrap">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="featured-spotlight-img"
                  />
                  <div className="featured-spotlight-tag">
                    <i className="fa-solid fa-star"></i> Featured Editorial
                  </div>
                </div>

                <div className="featured-spotlight-info">
                  <div className="featured-spotlight-meta">
                    <span className="featured-cat-badge">{featuredBlog.category}</span>
                    <span className="meta-sep">&bull;</span>
                    <span>{featuredBlog.publishedDate}</span>
                    <span className="meta-sep">&bull;</span>
                    <span>
                      <i className="fa-regular fa-clock"></i> {featuredBlog.readTime || '5 min read'}
                    </span>
                  </div>

                  <h2 className="featured-spotlight-title">{featuredBlog.title}</h2>

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

                    <span className="featured-read-btn">
                      Read Full Article <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* GRID OF ARTICLES */}
          {gridBlogs.length > 0 ? (
            <div className="blogs-grid">
              {gridBlogs.map((blog) => {
                const slug = blog.slug || getBlogSlug(blog);
                return (
                  <article key={blog.id || slug} className="blog-card">
                    <Link to={`/blogs/${slug}`} className="blog-card-link">
                      <div className="blog-card-cover-wrap">
                        <img
                          src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'}
                          alt={blog.title}
                          className="blog-card-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                        <span className="blog-card-cat-badge">{blog.category || 'Our Blogs'}</span>
                        {blog.featured && (
                          <span className="blog-card-star-badge" title="Featured Article">
                            <i className="fa-solid fa-star"></i>
                          </span>
                        )}
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span className="blog-date">{blog.publishedDate}</span>
                          <span className="meta-sep">&bull;</span>
                          <span className="blog-read-time">
                            <i className="fa-regular fa-clock"></i> {blog.readTime || '5 min read'}
                          </span>
                        </div>

                        <h3 className="blog-card-title">{blog.title}</h3>

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

                        <span className="blog-card-read-more">
                          Read <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
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
    </div>
  );
}
