package com.bubblebooks.bubblebooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bubblebooks.bubblebooks.models.MyPosting;

import java.util.List;
import java.util.UUID;


public interface MyPostingRepos 
    extends JpaRepository<MyPosting, UUID>{

    @Query("""
            SELECT DISTINCT p
            FROM book_postings p, books b
            WHERE p.book_id = b.book_id
              AND LOWER(TRIM(b.book_name)) = LOWER(TRIM(:title))
              AND LOWER(TRIM(CONCAT(
                    COALESCE(b.author_first_name, ''),
                    ' ',
                    COALESCE(b.author_last_name, '')
                  ))) = LOWER(TRIM(:author))
            """)
    List<MyPosting> findPostingsByBookAndAuthor(
            @Param("title") String title,
            @Param("author") String author);
}
