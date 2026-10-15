package com.example.healthcare.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String blogId; // e.g. blog_1

    @Column(nullable = false)
    private String title;

    @Column(unique = true)
    private String slug;

    @Column(length = 1000)
    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String category;
    private String tags; // Comma-separated tags
    private String author;
    private String authorRole;

    @Column(length = 1000)
    private String coverImage;

    private String readTime;
    private String publishedDate;
    private boolean featured;
    
    @Builder.Default
    private String textAlign = "left";

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Blog(Long id, String blogId, String title, String slug, String excerpt,
                String content, String category, String tags, String author,
                String authorRole, String coverImage, String readTime, String publishedDate,
                boolean featured, String textAlign, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.blogId = blogId;
        this.title = title;
        this.slug = slug;
        this.excerpt = excerpt;
        this.content = content;
        this.category = category;
        this.tags = tags;
        this.author = author;
        this.authorRole = authorRole;
        this.coverImage = coverImage;
        this.readTime = readTime;
        this.publishedDate = publishedDate;
        this.featured = featured;
        this.textAlign = textAlign;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
        if (blogId == null || blogId.isEmpty()) {
            blogId = "blog_" + System.currentTimeMillis();
        }
        if (slug == null || slug.isEmpty()) {
            slug = generateSlug(title);
        }
        if (textAlign == null || textAlign.trim().isEmpty()) {
            textAlign = "left";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    private String generateSlug(String text) {
        if (text == null) return "blog-" + System.currentTimeMillis();
        return text.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
    }
}
