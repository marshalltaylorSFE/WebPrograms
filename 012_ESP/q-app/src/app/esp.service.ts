import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusList, StatusPacket, CommandPacket } from './esp32-data-types';
import {Observable, Subscription} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
//import {Subscription} from '@reactivex/rxjs/es6/Subscription.js'

@Injectable()
export class EspService {
	consoleLog: string[] = [];
	consoleLogStr: string = "";
	lastStatus: StatusPacket;
	connecting: boolean = false;
	connected: boolean = false;
	running: boolean = false;
	waitingForStatus: boolean = false;
	statusString: string = "disconnected";
	
	timer: Observable<number>;
	timerSub = new Subscription();
	
	constructor(private http: HttpClient) {
	}
	beatHeart() {
		this.logAppMessage("Heartbeat");
		if( this.waitingForStatus ){
			//request already in progress.
			this.logAppMessage("Unserviced request, disconnecting.");
			this.disconnect();
		}
		else
		{
			this.waitingForStatus = true;
			this.logAppMessage("Requesting status.");
			this.getStatusAsync()
				.subscribe(n => {
					this.waitingForStatus = false;
					this.connecting = false;
					this.logAppMessage("Status came back.");
					this.connected = true;
				});
		}
//		console.log("Tick");
//		setTimeout(()=>{
//			console.log("Tock");
//			//this.logAppMessage("Heartbeat Delayed");
//		}, 5000);
	}

	connect() {
		this.connected = false;
		this.connecting = true;
		this.logAppMessage("Connecting...");
		//this.fetchStatus();
		this.timerSub = new Subscription();
		this.timer = Observable.timer(1000,10000);
		this.timerSub.add(this.timer.subscribe(t=> {
			this.beatHeart();
		}));
	};
	
	disconnect() {
		this.logAppMessage("Disconnected.");
		this.statusString = "disconnected";
		this.connected = false;
		this.timerSub.unsubscribe();
	};

	clear() {
		
	};

	start() {
		this.running = true;
	};

	stop() {
		this.running = false;
	};
	
	logAppMessage( _str: string ){
		_str = "app -> " + _str;
		this.consoleLog.push(_str);
		while(this.consoleLog.length > 100){
			this.consoleLog.splice(0,1);
		}
		this.consoleLogStr = "";
		for( let line of this.consoleLog ){
			this.consoleLogStr += "\n";
			this.consoleLogStr += line;
		}
	}
	
	async getFile( ): Promise<String> {
		return new Promise<String>(resolve => {
			let _str: String = "";
			let _data: any;
			this.http.get('datalog.csv', { responseType: 'text' }).subscribe(data => {
				_data = data;
				console.log(_data)
				_str = _data;
				resolve(_str);
			});
		});
	}

	async requestPath(_path: String ): Promise<String> {
		return new Promise<String>(resolve => {
			let _str: String = "";
			let _data: any;
			this.http.get(""+_path, { responseType: 'text' }).subscribe(data => {
				_data = data;
				console.log(_data)
				_str = _data;
				resolve(_str);
			});
		});
	}

	async fetchStatus() {
		this.lastStatus = await this.readRemoteStatus();
		this.consoleLog.push("Requested new status");
		for( let line of this.lastStatus.console ){
			this.consoleLog.push(line);
		}
		while(this.consoleLog.length > 100){
			this.consoleLog.splice(0,1);
		}
		this.consoleLogStr = "";
		for( let line of this.consoleLog ){
			this.consoleLogStr += "\n";
			this.consoleLogStr += line;
		}

		this.statusString = "";
		this.statusString += "card: ";
		if(this.lastStatus.status.card)this.statusString += "Yes"; else this.statusString += "No";
		this.statusString += ", i2c: ";
		if(this.lastStatus.status.i2c)this.statusString += "Yes"; else this.statusString += "No";
		if(this.lastStatus.status.card)this.statusString += ", Running"; else this.statusString += ", Stopped";
	}

	getStatusAsync(): Observable<number> {
		this.fetchStatus();
		return of(0);
	}

	async readRemoteStatus(): Promise<StatusPacket> {
		return new Promise<StatusPacket>(resolve => {
			let _status: StatusPacket = new StatusPacket;
			let _data: any;
			//Use this line to debug from /assets:
			//this.http.get("/assets/test-status.json", { responseType: 'json' }).subscribe(data => {
			//Use this line to target backend
			this.http.get("/dev/status", { responseType: 'json' }).subscribe(data => {
				_data = data;
				console.log(_data)
				_status.seqNum = _data.seqNum;
				_status.status = new StatusList;
				_status.status.card = _data.status.card;
				_status.status.i2c = _data.status.i2c;
				_status.status.running = _data.status.running;
				_status.console = [];
				for( let line of _data.console ){
					_status.console.push(line);
				}
			
				resolve(_status);
			});
		});
	}

	sendCommand(_command: number){
		let _data: any;
		let _cP: CommandPacket = new CommandPacket;
		_cP.command = _command;
		this.http
		.post('/dev/command', JSON.stringify(_cP))
		.subscribe(data => {
			_data = data;
			console.log(_data)
		});
	}
}
