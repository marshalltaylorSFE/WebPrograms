import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EspService {

  constructor(private http: HttpClient) { }
  
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
}
