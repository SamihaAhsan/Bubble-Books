package com.bubblebooks.bubblebooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bubblebooks.bubblebooks.models.MyPosting;
import java.util.UUID;


public interface MyPostingRepos 
    extends JpaRepository<MyPosting, UUID>{

//         @Query("""
//                 SELECT p FROM MyPosting p
//                 JOIN Book b ON p.book_id = b.book_id
//                 WHERE b.book_name = :bookName
//                 AND b.author = :author
//                 AND p.status = 'available'
//                 """)
                
//         List<MyPosting> findAvailablePostingsByBookAndAuthor(
//                 @Param("bookName") String bookName,
//                 @Param("author") String author
// );
        

    
}
