import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEsp32Component } from './settings-esp32.component';

describe('SettingsEsp32Component', () => {
  let component: SettingsEsp32Component;
  let fixture: ComponentFixture<SettingsEsp32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEsp32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEsp32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
