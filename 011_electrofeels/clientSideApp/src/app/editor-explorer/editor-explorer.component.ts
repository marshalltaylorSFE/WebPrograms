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
  
  loadIndex() {
	  this.sourceIndex = this.newIndex;
  }

}
