import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      img: ['', Validators.required],
      postedBy: ['', Validators.required]
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  submitForm() {
    if (this.postForm.valid) {
      const postData = { ...this.postForm.value, tags: this.tags };

      this.postService.createNewPost(postData).subscribe({
        next: () => {
          this.snackBar.open('Post Created Successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/view-all']);
        },
        error: (err) => {
          console.error('Error creating post:', err);
          this.snackBar.open('Failed to create post!', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields!', 'Close', { duration: 3000 });
    }
  }
}
