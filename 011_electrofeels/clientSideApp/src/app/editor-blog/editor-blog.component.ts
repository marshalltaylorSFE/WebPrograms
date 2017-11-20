import { Component, OnInit, ApplicationRef } from '@angular/core';
import { BlogPost } from '../blog-data-types';
import { BlogEntryComponent } from '../blog-entry/blog-entry.component';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-editor-blog',
  templateUrl: './editor-blog.component.html',
  styleUrls: ['./editor-blog.component.css']
})

export class EditorBlogComponent implements OnInit {
	editingData: BlogPost = new BlogPost;
	sourcePost: string = "post001.json";
  constructor(
	private blogService: BlogService,
	private applicationRef: ApplicationRef
	){}

  ngOnInit() {
	  this.editingData = this.blogService.createTestPost();
  }
  
  async loadPost() {
	  this.editingData = await this.blogService.getPost(this.sourcePost);
  }
}
