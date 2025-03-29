import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId!: number;  // Define postId as a number
  postData: any;
  commentForm!: FormGroup;
  comments: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    // Convert postId to a number properly
    this.postId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    
    if (isNaN(this.postId)) {
      console.error("Invalid postId:", this.activatedRoute.snapshot.params['id']);
      this.matSnackBar.open("Invalid Post ID", "Ok", { duration: 3000 });
      return;
    }

    this.getPostById();

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  // Implement getImagePath() to prepend the backend's base URL
  getImagePath(relativePath: string): string {
    // Adjust 'http://localhost:3000/' as needed for your backend environment
    return `http://localhost:3000/${relativePath}`;
  }

  publishComment() {
    if (this.commentForm.invalid) {
      this.matSnackBar.open("Please fill all fields", "Ok");
      return;
    }

    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe(
      res => {
        this.matSnackBar.open("Comment Published Successfully", "Ok");
        this.commentForm.reset();
        this.getCommentsByPost();
      },
      error => {
        console.error("Error publishing comment:", error);
        this.matSnackBar.open("Something Went Wrong!", "Ok");
      }
    );
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      res => {
        this.postData = res;
        console.log("Post image path:", this.postData.img); // Debug: Verify image path
        this.getCommentsByPost();
      },
      error => {
        console.error("Error fetching post:", error);
        this.matSnackBar.open("Something Went Wrong!", "Ok");
      }
    );
  }

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      res => {
        this.comments = res;
      },
      error => {
        console.error("Error fetching comments:", error);
        this.matSnackBar.open("Something Went Wrong!", "Ok");
      }
    );
  }

  likePost(){
    this.postService.likePost(this.postId).subscribe(
      res => {
        this.matSnackBar.open("Post Liked Successfully", "Ok");
        this.getPostById();
      },
      error => {
        this.matSnackBar.open("Something Went Wrong!!!!", "Ok");
      }
    );
  }
}
