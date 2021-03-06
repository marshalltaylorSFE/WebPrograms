import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blog-data-types';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css',
  '../standard.css'
  ]
})
export class BlogEntryComponent implements OnInit {
  @Input() blogPost: BlogPost;
  editing: boolean = false;
  @Input() editable: boolean = false;
  postString: string;
  constructor() { }

  ngOnInit() {
  }
  
  edit() {
	  this.getBody();
	  this.editing = true;
  }

	downloadFile(){
		this.setBody();
		var blob = new Blob([JSON.stringify(this.blogPost)], { type: 'text/plain' });
		var url= window.URL.createObjectURL(blob);
		var wOR = window.open(url);
		setTimeout(function(){
			window.URL.revokeObjectURL(url);  
		}, 2000);  
	}
	
  save() {
	  this.setBody();
	  this.blogPost.date = new Date(this.blogPost.date);
	  console.log(this.blogPost.date);
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
 	  if( this.blogPost.body[this.blogPost.body.length - 1] == "" ) this.blogPost.body.splice(this.blogPost.body.length - 1, 1);
 }
}
