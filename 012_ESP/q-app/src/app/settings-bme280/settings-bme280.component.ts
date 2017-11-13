import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-bme280',
  templateUrl: './settings-bme280.component.html',
  styleUrls: ['./settings-bme280.component.css',
  '../settings-common.css'
  ]
})
export class SettingsBme280Component implements OnInit {
  expanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
	this.expanded = !this.expanded;
  }

}
