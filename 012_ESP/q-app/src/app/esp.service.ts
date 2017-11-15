import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusList, StatusPacket, CommandPacket } from './esp32-data-types';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class EspService {
	consoleLog: string[] = [];
	consoleLogStr: string = "";
	lastStatus: StatusPacket;
	connecting: boolean = false;
	connected: boolean = false;
	running: boolean = false;
	intervalID: any;
	
	constructor(private http: HttpClient) { }
	beatHeart() {
		this.logAppMessage("Heartbeat");
		console.log("Tick");
	}

	connect() {
			Observable.interval(2000 * 60).subscribe(x => {
		this.beatHeart();
	});
		this.connecting = true;
		this.logAppMessage("Connecting...");
		this.fetchStatus();
		this.connecting = false;
		this.connected = true;
	};
	
	disconnect() {
		this.logAppMessage("Disconnected.");
		this.connected = false;
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
	}

	async readRemoteStatus(): Promise<StatusPacket> {
		return new Promise<StatusPacket>(resolve => {
			let _status: StatusPacket = new StatusPacket;
			let _data: any;
			//Use this line to debug from /assets:
			this.http.get("/assets/test-status.json", { responseType: 'json' }).subscribe(data => {
			//Use this line to target backend
			//this.http.get("/dev/status", { responseType: 'json' }).subscribe(data => {
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
