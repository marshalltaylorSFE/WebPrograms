import { Component, OnInit, ApplicationRef } from '@angular/core';
import { StatusList, StatusPacket } from '../esp32-data-types';
import { EspService } from '../esp.service';
//import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-status-tool',
templateUrl: './status-tool.component.html',
styleUrls: ['./status-tool.component.css']
})

export class StatusToolComponent implements OnInit {
consoleLog: string[] = [];
consoleLogStr: string = "";
lastStatus: StatusPacket;
ourHeight: string = "35px"
expanded: boolean = false;

	constructor(
	private espService: EspService,
	private applicationRef: ApplicationRef
	) { }

	ngOnInit() {
		this.expandChanged()
	}

	getStatus() {}
//	async getStatus() {
//		if(!this.consoleLog)this.consoleLog = [];
//		this.consoleLog.push("Requested new status");
//		
//		this.lastStatus = await this.espService.getStatus();
//		for( let line of this.lastStatus.console ){
//			this.consoleLog.push(line);
//		}
//		while(this.consoleLog.length > 100){
//			this.consoleLog.splice(0,1);
//		}
//		this.consoleLogStr = ""
//		if(this.expanded) {
//			for( let line of this.consoleLog ){
//				this.consoleLogStr += "\n";
//				this.consoleLogStr += line;
//			}
//		}else{
//			this.consoleLogStr += this.consoleLog[this.consoleLog.length - 2];
//			this.consoleLogStr += "\n";
//			this.consoleLogStr += this.consoleLog[this.consoleLog.length - 1];
//		}
//		console.log(this.consoleLogStr);
//		this.applicationRef.tick();
//	}

	expandChanged() {
		console.log("Clickyclick!");
		if(this.expanded) {
			this.expanded = false;
			this.ourHeight = "35px";
		}else{
			this.expanded = true;
			this.ourHeight = "400px";
		}
		console.log(this.expanded);
		//this.applicationRef.tick();
	}
}
