import { Component, OnInit, ApplicationRef, Input} from '@angular/core';
import { ExplorerService } from '../explorer.service';
import { Directory, File } from '../explorer-data-types';
import { Index, IndexElement, Data, DataElement } from '../source-data-types';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
  providers: [ExplorerService]
})
export class ExplorerComponent implements OnInit {
  @Input() tocSrc: string;
  directory: Directory;
  files: File[] = [];
  index: Index = new Index;
  constructor( 
	private explorerService: ExplorerService,
	private applicationRef: ApplicationRef
	){}

  async ngOnInit() {
	this.directory = await this.explorerService.getDirectory(this.tocSrc);
	//console.log(this.directory);

	this.files = await this.explorerService.getFiles(this.directory);
	//console.log(this.files);
	this.buildIndex();
	

	//this.explorerService.getFiles(this.directory).then(_directory =>
	//{
	//	console.log(_directory);
	//});
  }
  
  buildIndex(){
	  console.log(this.files);
	  this.index.indexElements = [];
	  let filePtr: number = 0;
	  for( let _file of this.files ) {
		  let _topicElement: IndexElement = new IndexElement;
		  _topicElement.name = _file.topic;
		  if( _file.sections ){
			_topicElement.subElements = [];
			  console.log(_topicElement);
			  console.log(this.index);
		    this.index.indexElements.push(_topicElement);
//		    this.index.indexElements[filePtr].subElements = [];
//		    for( let _section of _file.sections ) {
//		  	  let _sectionElement: IndexElement = new IndexElement;
//		  	  _sectionElement.name = _section.section;
////	  	  	for( let _entry of _section.entries ) {
////	  	  		let _entryElement: IndexElement = new IndexElement;
////	  	  		_entryElement.name = _entry.entry;
////	  	  	}
//		  	  this.index.indexElements[filePtr].subElements.push(_sectionElement);
//		    }
		  }
		  filePtr++;
	  }
//	  console.log(this.index);
  }

}
