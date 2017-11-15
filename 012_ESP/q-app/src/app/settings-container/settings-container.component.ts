import { Component, OnInit } from '@angular/core';
import { EspService } from '../esp.service';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.css'],
  providers: [ EspService ]
})
export class SettingsContainerComponent implements OnInit {

  constructor(
	private espService: EspService
  ) { }

  ngOnInit() {
  }
  
}
