import { Component, OnInit, ApplicationRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-data-types';
import { BlogEntryComponent } from '../blog-entry/blog-entry.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
	post1: BlogPost = new BlogPost;
	post2: BlogPost = new BlogPost;
	post3: BlogPost = new BlogPost;
	post4: BlogPost = new BlogPost;
	pos: number = 100;
	mousex: number;
	mousey: number;
  constructor(
	private blogService: BlogService,
	private applicationRef: ApplicationRef
	){}

  ngOnInit() {
	  this.post1 = this.blogService.createTestPost();
	  this.post2 = this.blogService.createTestPost();
	  this.post3 = this.blogService.createTestPost();
	  this.post4 = this.blogService.createTestPost();
  }
  getMouse(event) {
	  this.mousex = event.clientX;
	  this.mousey = event.clientY;
  }
}
