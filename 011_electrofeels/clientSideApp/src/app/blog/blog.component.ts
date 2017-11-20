import { Component, OnInit, ApplicationRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost, BlogIndexEntry, BlogIndex } from '../blog-data-types';
import { BlogEntryComponent } from '../blog-entry/blog-entry.component';
import { BlogTimelineComponent } from '../blog-timeline/blog-timeline.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
	posts: BlogPost[] = [];
	index: BlogIndex;
  constructor(
	private blogService: BlogService,
	private applicationRef: ApplicationRef
	){}

  async ngOnInit() {
	  //this.index = new BlogIndex;
	  //this.index.posts = [];
	  this.index = await this.blogService.getIndex("index.json");
	  for( let _post of this.index.posts ){
		  let _tempPost = await this.blogService.getPost(_post.file);
		  this.posts.push(_tempPost);
	  }
  }

}
