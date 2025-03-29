package com.CoderDot.BloggingServer.service;

import com.CoderDot.BloggingServer.entity.Post;
import com.CoderDot.BloggingServer.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post savePost(Post post) {
        post.setLikeCount(0);
        post.setViewCount(0); // Ensuring correct initialization
        post.setDate(new Date()); // Ensure the 'date' field in Post is of type Date

        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setViewCount(post.getViewCount() + 1);
            postRepository.save(post); // Save the updated view count
            return post;
        } else {
            throw new EntityNotFoundException("Post not found");
        }
    }

    @Override
    public void likePost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);
        } else {
            throw new EntityNotFoundException("Post not found");
        }
    }

    @Override
    public List<Post> searchByName(String name) {
        return postRepository.findAllByNameContaining(name);
    }
}
