import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  allPosts: any[] = [];  
  filteredPosts: any[] = [];
  searchKeyword: string = '';  

  commentForm: FormGroup;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = new FormGroup({
      content: new FormControl('', Validators.required), 
      postedBy: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.allPosts = res;
          this.filteredPosts = res;
        } else {
          console.error("Invalid response format:", res);
        }
      },
      error: (err) => {
        console.error("Error fetching posts:", err);
        this.snackBar.open("Something went wrong while fetching posts!", "Ok", {
          duration: 3000,
        });
      }
    });
  }

  searchByName() {
    if (this.searchKeyword.trim()) {
      this.postService.searchByName(this.searchKeyword).subscribe({
        next: (res) => {
          this.filteredPosts = res;
        },
        error: (err) => {
          console.error("Error searching posts:", err);
          this.snackBar.open("Something went wrong while searching!", "Ok", { duration: 3000 });
        }
      });
    } else {
      this.filteredPosts = this.allPosts; // Reset when search is cleared
    }
  }

  publishComment() {
    if (this.commentForm.valid) {
      console.log('Comment Submitted:', this.commentForm.value);
      this.snackBar.open("Comment submitted successfully!", "Ok", { duration: 3000 });
      this.commentForm.reset();
    } else {
      this.snackBar.open("Please fill all required fields!", "Ok", { duration: 3000 });
    }
  }
}
