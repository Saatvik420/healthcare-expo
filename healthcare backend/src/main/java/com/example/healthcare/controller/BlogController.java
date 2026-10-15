package com.example.healthcare.controller;

import com.example.healthcare.model.Blog;
import com.example.healthcare.repository.BlogRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    private final BlogRepository blogRepository;

    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q) {
        List<Blog> list;
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            list = blogRepository.findByCategoryIgnoreCase(category);
        } else {
            list = blogRepository.findAllByOrderByCreatedAtDesc();
        }

        if (q != null && !q.trim().isEmpty()) {
            String query = q.trim().toLowerCase();
            list = list.stream().filter(b ->
                (b.getTitle() != null && b.getTitle().toLowerCase().contains(query)) ||
                (b.getExcerpt() != null && b.getExcerpt().toLowerCase().contains(query)) ||
                (b.getAuthor() != null && b.getAuthor().toLowerCase().contains(query)) ||
                (b.getTags() != null && b.getTags().toLowerCase().contains(query))
            ).toList();
        }

        return ResponseEntity.ok(list);
    }

    private Optional<Blog> findBlog(String idOrSlug) {
        if (idOrSlug == null || idOrSlug.trim().isEmpty()) {
            return Optional.empty();
        }
        String target = idOrSlug.trim();
        Optional<Blog> existing = blogRepository.findBySlug(target);
        if (existing.isPresent()) return existing;

        existing = blogRepository.findByBlogId(target);
        if (existing.isPresent()) return existing;

        try {
            Long id = Long.parseLong(target);
            existing = blogRepository.findById(id);
            if (existing.isPresent()) return existing;
        } catch (NumberFormatException ignored) {}

        if (target.startsWith("blog_")) {
            try {
                Long id = Long.parseLong(target.substring(5));
                existing = blogRepository.findById(id);
                if (existing.isPresent()) return existing;
            } catch (NumberFormatException ignored) {}
        }
        return Optional.empty();
    }

    @GetMapping("/{idOrSlug}")
    public ResponseEntity<Blog> getBlogByIdOrSlug(@PathVariable String idOrSlug) {
        return findBlog(idOrSlug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return blogRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        if (blog.getBlogId() == null || blog.getBlogId().isEmpty()) {
            blog.setBlogId("blog_" + System.currentTimeMillis());
        }
        if (blog.getCreatedAt() == null) {
            blog.setCreatedAt(LocalDateTime.now());
        }
        if (blog.getAuthor() == null || blog.getAuthor().trim().isEmpty()) {
            blog.setAuthor("indiglobal healthcare Expo");
        }
        if (blog.getAuthorRole() == null || blog.getAuthorRole().trim().isEmpty()) {
            blog.setAuthorRole("admin");
        }
        if (blog.getCategory() == null || blog.getCategory().trim().isEmpty()) {
            blog.setCategory("Our Blogs");
        }
        if (blog.getTextAlign() == null || blog.getTextAlign().trim().isEmpty()) {
            blog.setTextAlign("left");
        }
        blog.setUpdatedAt(LocalDateTime.now());
        Blog saved = blogRepository.save(blog);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{idOrSlug}")
    public ResponseEntity<Blog> updateBlog(@PathVariable String idOrSlug, @RequestBody Blog updatedData) {
        Optional<Blog> existing = findBlog(idOrSlug);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Blog current = existing.get();
        if (updatedData.getTitle() != null) current.setTitle(updatedData.getTitle());
        if (updatedData.getSlug() != null) current.setSlug(updatedData.getSlug());
        if (updatedData.getExcerpt() != null) current.setExcerpt(updatedData.getExcerpt());
        if (updatedData.getContent() != null) current.setContent(updatedData.getContent());
        if (updatedData.getCategory() != null) current.setCategory(updatedData.getCategory());
        if (updatedData.getTags() != null) current.setTags(updatedData.getTags());
        if (updatedData.getAuthor() != null) current.setAuthor(updatedData.getAuthor());
        if (updatedData.getAuthorRole() != null) current.setAuthorRole(updatedData.getAuthorRole());
        if (updatedData.getCoverImage() != null) current.setCoverImage(updatedData.getCoverImage());
        if (updatedData.getReadTime() != null) current.setReadTime(updatedData.getReadTime());
        if (updatedData.getPublishedDate() != null) current.setPublishedDate(updatedData.getPublishedDate());
        if (updatedData.getTextAlign() != null && !updatedData.getTextAlign().trim().isEmpty()) {
            current.setTextAlign(updatedData.getTextAlign());
        }
        current.setFeatured(updatedData.isFeatured());
        current.setUpdatedAt(LocalDateTime.now());

        Blog saved = blogRepository.save(current);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{idOrSlug}")
    public ResponseEntity<?> deleteBlog(@PathVariable String idOrSlug) {
        Optional<Blog> existing = findBlog(idOrSlug);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        blogRepository.delete(existing.get());
        return ResponseEntity.ok().body("{\"message\":\"Blog deleted successfully\"}");
    }
}
