import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBme280Component } from './settings-bme280.component';

describe('SettingsBme280Component', () => {
  let component: SettingsBme280Component;
  let fixture: ComponentFixture<SettingsBme280Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsBme280Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsBme280Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
