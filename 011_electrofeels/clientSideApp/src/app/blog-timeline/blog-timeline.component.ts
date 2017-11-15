import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-timeline',
  templateUrl: './blog-timeline.component.html',
  styleUrls: ['./blog-timeline.component.css']
})
export class BlogTimelineComponent implements OnInit {
	pos: number = 100;
	mousex: number;
	mousey: number;
	clicklockx: number;
	xOffset: number = 100;
	dragging: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onPress(event) {
	  this.clicklockx = event.clientX - this.xOffset;
		  let thing: number = this.mousex - this.clicklockx;
		  if( thing > 200 ) thing = 200;
		  if( thing < 0 ) thing = 0;
		  this.xOffset = thing;
		  this.dragging = true;
  }
  
  onRelease(event) {
	  this.dragging = false;
  }
  mouseEnter(event) {
  }
  
  mouseLeave(event) {
	  this.dragging = false;
  }
  getMouse(event) {
	  this.mousex = event.clientX;
	  if(this.dragging) {
		  let thing: number = this.mousex - this.clicklockx;
		  if( thing > 200 ) thing = 200;
		  if( thing < 0 ) thing = 0;
		  this.xOffset = thing;
	  }
//	  this.mousey = event.clientY;
  }
}
