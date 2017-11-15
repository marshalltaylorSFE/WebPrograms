import { Component, OnInit, ApplicationRef, Input, Output } from '@angular/core';
import { EspService } from '../esp.service';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {
	collectedData: String = "";
  constructor(
	private espService: EspService,
	private applicationRef: ApplicationRef,
	){}

  ngOnInit() {
  }
  
  async viewData() {
	  //this.collectedData = await this.espService.getFile();
	  //this.applicationRef.tick();
  }

  async requestPath(_str: String ) {
	  await this.espService.requestPath(_str);
	  this.viewData();
  }

}
