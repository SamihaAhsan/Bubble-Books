package com.bubblebooks.bubblebooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bubblebooks.bubblebooks.models.MyPosting;
import java.util.UUID;


public interface MyPostingRepos 
    extends JpaRepository<MyPosting, UUID>{

    
}
