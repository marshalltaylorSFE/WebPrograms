import { Component, OnInit, ApplicationRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-data-types';
import { BlogEntryComponent } from '../blog-entry/blog-entry.component';

@Component({
  selector: 'app-editor-blog',
  templateUrl: './editor-blog.component.html',
  styleUrls: ['./editor-blog.component.css'],
  providers: [BlogService]
})
export class EditorBlogComponent implements OnInit {
	editingData: BlogPost = new BlogPost;
  constructor(
	private blogService: BlogService,
	private applicationRef: ApplicationRef
	){}

  ngOnInit() {
	  this.editingData = this.blogService.createTestPost();
  }
}
