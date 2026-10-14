/**
 * Blog Content Renderer Component
 * Parses headings, bullet/numbered lists, bold text, markdown hyperlinks [text](url), and raw URLs.
 * Renders inline elements with proper wrapping so layouts never overflow or get clipped.
 */
export default function BlogContentRenderer({ content, className = '' }) {
  if (!content) return null;

  // Inline parser supporting markdown hyperlinks [text](url), raw URLs, and **bold**
  const renderInlineContent = (text) => {
    if (!text) return null;

    // Pattern matches:
    // 1. Markdown link: [Anchor text](https://example.com)
    // 2. Bold text: **bold**
    // 3. Raw URL: https://example.com or http://example.com
    const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s<)]+)/g;
    const parts = text.split(regex);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Markdown link [text](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const anchorText = match[1];
          const href = match[2].trim();
          const isExternal = href.startsWith('http://') || href.startsWith('https://');
          return (
            <a
              key={pIdx}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="blog-inline-link"
            >
              <span>{anchorText}</span>
              {isExternal && <i className="fa-solid fa-arrow-up-right-from-square inline-link-icon"></i>}
            </a>
          );
        }
      }

      // Bold text **bold**
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
      }

      // Raw URL https://...
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return (
          <a
            key={pIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-inline-link"
          >
            <span>{part}</span>
            <i className="fa-solid fa-arrow-up-right-from-square inline-link-icon"></i>
          </a>
        );
      }

      return part;
    });
  };

  const sections = content.split('\n\n');

  return (
    <div className={`blog-content-rendered ${className}`}>
      {sections.map((section, idx) => {
        const trimmed = section.trim();
        if (!trimmed) return null;

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="blog-article-h3">
              {renderInlineContent(trimmed.replace('### ', ''))}
            </h3>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="blog-article-h2">
              {renderInlineContent(trimmed.replace('## ', ''))}
            </h2>
          );
        }

        // List Block (Numbered or Bullet)
        if (
          trimmed.includes('\n1.') ||
          trimmed.startsWith('1.') ||
          trimmed.includes('\n*') ||
          trimmed.startsWith('*') ||
          trimmed.includes('\n-') ||
          trimmed.startsWith('-')
        ) {
          const lines = trimmed.split('\n');
          return (
            <div key={idx} className="blog-article-list-block">
              {lines.map((line, lineIdx) => {
                const cleanLine = line.trim();
                if (!cleanLine) return null;

                if (cleanLine.startsWith('* ') || cleanLine.startsWith('- ')) {
                  return (
                    <div key={lineIdx} className="blog-list-item">
                      <span className="blog-list-bullet">&bull;</span>
                      <span className="blog-list-text">{renderInlineContent(cleanLine.slice(2))}</span>
                    </div>
                  );
                } else if (/^\d+\./.test(cleanLine)) {
                  const match = cleanLine.match(/^(\d+\.)\s*(.*)$/);
                  return (
                    <div key={lineIdx} className="blog-list-item">
                      <span className="blog-list-num">{match ? match[1] : `${lineIdx + 1}.`}</span>
                      <span className="blog-list-text">
                        {renderInlineContent(match ? match[2] : cleanLine)}
                      </span>
                    </div>
                  );
                }
                return (
                  <p key={lineIdx} className="blog-list-text">
                    {renderInlineContent(cleanLine)}
                  </p>
                );
              })}
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="blog-article-paragraph">
            {renderInlineContent(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
