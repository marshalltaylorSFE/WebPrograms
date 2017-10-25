import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Prog.RefComponent } from './prog.ref.component';

describe('Prog.RefComponent', () => {
  let component: Prog.RefComponent;
  let fixture: ComponentFixture<Prog.RefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Prog.RefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Prog.RefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
