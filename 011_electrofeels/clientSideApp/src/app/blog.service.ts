import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './blog-data-types';

@Injectable()
export class BlogService {

  constructor() { }
  
  //getPostByID( _id: number ): Promise<BlogPost> {
//	  
  //}

  createEmptyPost(): BlogPost {
	  let _blogPost: BlogPost = new BlogPost;
	  _blogPost.title = "";
	  _blogPost.date = new Date();
	  _blogPost.body = [];
	  return _blogPost;
	  
  }

  createTestPost(): BlogPost {
	  let _blogPost: BlogPost = new BlogPost;
	  _blogPost.title = "Test post";
	  _blogPost.date = new Date();
	  _blogPost.body = [];
	  _blogPost.body.push("<h4>Some Heading</h4>");
	  _blogPost.body.push("<p>This is the first paragraph.</p>");
	  _blogPost.body.push("<p>This is the first paragraph.</p>");
	  return _blogPost;
	  
  }
}
