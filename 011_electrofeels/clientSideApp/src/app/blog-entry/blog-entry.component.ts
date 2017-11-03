import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blog-data-types';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {
  @Input() blogPost: BlogPost;
  editing: boolean = false;
  postString: string;
  constructor() { }

  ngOnInit() {
  }
  
  edit() {
	  this.getBody();
	  this.editing = true;
  }
  
  save() {
	  this.setBody();
	  this.blogPost.date = new Date();
	  this.editing = false;
  }

  getBody() {
	  this.postString = ""
	  for( let line of this.blogPost.body ){
		  this.postString += line;
		  this.postString += "\n"
	  }
  }
  
  setBody() {
	  this.blogPost.body = this.postString.split("\n");
  }
}
