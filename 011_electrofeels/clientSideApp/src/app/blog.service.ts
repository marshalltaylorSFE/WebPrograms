import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost, BlogIndexEntry, BlogIndex } from './blog-data-types';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) { }
  
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
	  console.log(JSON.stringify(_blogPost.date));
	  console.log(_blogPost.date);
	  _blogPost.body = [];
	  _blogPost.body.push("<h4>Some Heading</h4>");
	  _blogPost.body.push("<p>This is the first paragraph.</p>");
	  _blogPost.body.push("<p>This is the second paragraph.</p>");
	  return _blogPost;
	  
  }
  
  //Get the index
  async getIndex( src: string ): Promise<BlogIndex> {
	return new Promise<BlogIndex>(resolve => {
		let _blogIndex: BlogIndex = new BlogIndex;
		_blogIndex.posts = [];
		let _data: any;
		this.http.get('assets/blog-posts/' + src).subscribe(data => {
			_data = data;
			for (let _post of _data.posts) {
				let _blogIndexEntry: BlogIndexEntry = new BlogIndexEntry;
				_blogIndexEntry.file = _post.file;
				_blogIndexEntry.dateStr = _post.dateStr;
				_blogIndex.posts.push(_blogIndexEntry);
			}
			resolve(_blogIndex);
		});
	});
  }
  
  
  //This takes a file name string, and returns a directory listing.
  async getPost( src: string ): Promise<BlogPost> {
	return new Promise<BlogPost>(resolve => {
		let _post: BlogPost = this.createEmptyPost();
		let _data: any;
		this.http.get('assets/blog-posts/' + src).subscribe(data => {
			_data = data;
			_post.title = _data.title;
			_post.date = _data.date;
			for (let _line of _data.body) {
				_post.body.push(_line);
			}
			resolve(_post);
		});
	});
  }
}
