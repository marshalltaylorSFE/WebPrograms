import { Component, OnInit } from '@angular/core';
import { EspService } from '../esp.service';

@Component({
  selector: 'app-esp32-controller',
  templateUrl: './esp32-controller.component.html',
  styleUrls: ['./esp32-controller.component.css']
})
export class Esp32ControllerComponent implements OnInit {

  constructor(public espService: EspService) { }

  ngOnInit() {
	  this.espService.logAppMessage("Controller Started!");
  }
  
}
