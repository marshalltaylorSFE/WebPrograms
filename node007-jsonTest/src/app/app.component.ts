import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sparky';
  results: string[];
  myData: any;
  
  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    // Make the HTTP request:
	console.log("Hello World!");
    this.http.get('assets/data.json').subscribe(data => {
      // Read the result field from the JSON response.
	  this.myData = data;
	  console.log(this.myData);
	  console.log(this.myData.files[0].name);
	  console.log(this.myData.files[1].functions[0].description);
    });
  }
}
