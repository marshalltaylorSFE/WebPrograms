import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBlogComponent } from './editor-blog.component';

describe('EditorBlogComponent', () => {
  let component: EditorBlogComponent;
  let fixture: ComponentFixture<EditorBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
