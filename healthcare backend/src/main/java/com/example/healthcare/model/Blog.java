package com.example.healthcare.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
