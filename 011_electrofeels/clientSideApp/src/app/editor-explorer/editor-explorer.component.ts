import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ExplorerComponent } from '../explorer/explorer.component';

@Component({
  selector: 'app-editor-explorer',
  templateUrl: './editor-explorer.component.html',
  styleUrls: ['./editor-explorer.component.css']
})
export class EditorExplorerComponent implements OnInit {
  sourceIndex: string = "explorer-generic/directory.json";
  newIndex: string = "explorer-generic/directory.json";
  constructor(private applicationRef: ApplicationRef) { }

  ngOnInit() {
  }
  
  loadLibraries() {
	  this.sourceIndex = "explorer-libraries/libraries.json"
  }

  loadProjects() {
	  this.sourceIndex = "explorer-projects/projects.json"
  }

  loadScratch() {
	  this.sourceIndex = "explorer-generic/directory.json"
  }

  loadIndex() {
	  this.sourceIndex = this.newIndex;
  }
}
