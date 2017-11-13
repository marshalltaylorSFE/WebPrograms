import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-esp32',
  templateUrl: './settings-esp32.component.html',
  styleUrls: ['./settings-esp32.component.css',
  '../settings-common.css'
  ]
})
export class SettingsEsp32Component implements OnInit {
  expanded: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  
  toggle() {
	this.expanded = !this.expanded;
  }

}
