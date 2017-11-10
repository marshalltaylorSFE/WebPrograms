import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorExplorerComponent } from './editor-explorer.component';

describe('EditorExplorerComponent', () => {
  let component: EditorExplorerComponent;
  let fixture: ComponentFixture<EditorExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
