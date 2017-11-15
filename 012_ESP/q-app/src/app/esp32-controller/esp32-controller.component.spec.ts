import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Esp32ControllerComponent } from './esp32-controller.component';

describe('Esp32ControllerComponent', () => {
  let component: Esp32ControllerComponent;
  let fixture: ComponentFixture<Esp32ControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Esp32ControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Esp32ControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
