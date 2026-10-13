import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getBlogSlug, getBlogTimestamp, formatBlogPublishedDate } from '../services/blogService';

export default function BlogPreviewSection() {
  const { blogs = [] } = useData();

  if (!blogs || blogs.length === 0) return null;

  // Take top 3 blogs (newest published/created articles displayed first)
  const displayBlogs = [...blogs]
    .sort((a, b) => {
      const diff = getBlogTimestamp(b) - getBlogTimestamp(a);
      if (diff !== 0) return diff;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    })
    .slice(0, 3);

  return (
    <section className="section bg-surface-alt blog-preview-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <span className="section-badge">
            <i className="fa-solid fa-newspaper"></i> Our Blogs
          </span>
          <h2 className="section-title">
            Latest Insights <span className="text-gradient">&amp; Chronicles</span>
          </h2>
          <p className="section-subtitle">
            Executive briefings on active pharmaceutical ingredients, cleanroom automation, India-ASEAN trade corridors, and next-gen healthcare delivery.
          </p>
        </div>

        <div className="blogs-grid">
          {displayBlogs.map((blog) => {
            const slug = blog.slug || getBlogSlug(blog);
            return (
              <article key={blog.id || slug} className="blog-card">
                <Link to={`/blogs/${slug}`} className="blog-card-link">
                  <div className="blog-card-cover-wrap">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="blog-card-cover"
                      loading="lazy"
                    />
                    <span className="blog-card-cat-badge">{blog.category}</span>
                    {blog.featured && (
                      <span className="blog-card-star-badge" title="Featured Article">
                        <i className="fa-solid fa-star"></i>
                      </span>
                    )}
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-date">{blog.publishedDate || formatBlogPublishedDate(blog)}</span>
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

        <div className="text-center mt-5">
          <Link to="/blogs" className="btn btn-outline btn-lg">
            <span>Explore All Articles &amp; Insights</span>{' '}
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
