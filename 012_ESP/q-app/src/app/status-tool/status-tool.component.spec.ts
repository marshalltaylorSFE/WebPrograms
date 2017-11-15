import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusToolComponent } from './status-tool.component';

describe('StatusToolComponent', () => {
  let component: StatusToolComponent;
  let fixture: ComponentFixture<StatusToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
