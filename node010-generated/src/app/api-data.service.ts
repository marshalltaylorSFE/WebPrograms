import { Injectable } from '@angular/core';
import { Index, IndexElement, fakeIndex, DataBody, fakeDataBody } from './api-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiDataService {
  fullData: any;
  constructor(private http: HttpClient) { }
  getIndex(): Index {
	  this.getFullData();
//	tempIndex: Index;
//	tempIndexElement: IndexElement;
//	tempIndexElement.name = "Hello!";
//	tempIndex[0] = tempIndexElement;
    return fakeIndex;
  }
  
  getDataBody(): DataBody {
	  this.getFullData();
	return fakeDataBody;
  }
  
  getFullData(): void {
    // Make the HTTP request:
    console.log("Getting json data.");
    this.http.get('assets/data.json').subscribe(data => {
    // Read the result field from the JSON response.
    this.fullData = data;
    console.log(this.fullData);
    });
  }
}
