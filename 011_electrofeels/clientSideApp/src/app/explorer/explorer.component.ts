import { Component, OnInit, ApplicationRef, Input} from '@angular/core';
import { ExplorerService } from '../explorer.service';
import { Directory, File, DataBodyElement } from '../explorer-data-types';
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
  dataBody: DataBodyElement[] = [];
  selectedTopic: number = 0;
  selectedSection: number = 0;
  
  constructor( 
	private explorerService: ExplorerService,
	private applicationRef: ApplicationRef
	){}

  async ngOnInit() {
	this.directory = await this.explorerService.getDirectory(this.tocSrc);
	//console.log(this.directory);

	this.files = await this.explorerService.getFiles(this.directory);
	console.log(this.files);
	
	this.buildIndex();
	//console.log(this.index);

	//this.explorerService.getFiles(this.directory).then(_directory =>
	//{
	//	console.log(_directory);
	//});
  }
  
  buildIndex(){
	this.index.indexElements = [];
	let _topicRef: number = 0;
	for( let _file of this.files ) { //get files from the file array for 'topic' level
		let _sectionRef: number = 0;
		let _topicElement: IndexElement = new IndexElement;
		_topicElement.name = _file.topic;
		_topicElement.topicRef = _topicRef;
		_topicElement.sectionRef = 0;
		if( _file.sections.length > 0 ){ //If file has more than 1 section
			_topicElement.subElements = []; //Create subElements
			_topicElement.expandable = true;
			for( let _section of _file.sections ) {
				let _sectionElement: IndexElement = new IndexElement; //create new section
				_sectionElement.name = _section.section;
				_sectionElement.topicRef = _topicRef;
				_sectionElement.sectionRef = _sectionRef;
				if( _section.entries.length > 0 ){ //If file has more than 1 entry
					_sectionElement.subElements = []; //Create subElements
					_sectionElement.expandable = true;
					for( let _entry of _section.entries ) {
						let _entryElement: IndexElement = new IndexElement; //create new entry
						_entryElement.name = _entry.entry;
						_sectionElement.subElements.push(_entryElement); //push entry to section
					}
				}
				_topicElement.subElements.push(_sectionElement); //push sections to topic
				_sectionRef++;
			}
		this.index.indexElements.push(_topicElement); //push topic to index
	  }
	  _topicRef++;
	}
  }
  
	//twist( inputPath: string ){
	//  for( let item of this.index.indexElements )
	//  {
	//	  if( inputPath == item.name ){
	//		  if(item.expanded){
	//			  item.expanded = false;
	//		  } else {
	//			  item.expanded = true;
	//		  }
	//		  console.log( item.name );
	//		  this.applicationRef.tick();
	//	  }
	//  }
	//}
	
	twist( inputElement: IndexElement ){
		if( inputElement.expanded ){
			inputElement.expanded = false;
		} else {
			if( inputElement.expandable ) inputElement.expanded = true;
		}
		this.applicationRef.tick();
	}
	
	buildBody( inputElement: IndexElement ) {
	  this.dataBody = [];
	  let _dataBodyElement: DataBodyElement;
	  //access the correct _data stuff
	  this.selectedTopic = inputElement.topicRef;
	  this.selectedSection = inputElement.sectionRef;
	  for( let _item of this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries ){
		  _dataBodyElement = new DataBodyElement;
		  _dataBodyElement.data = _item.data;
		  _dataBodyElement.entry = _item.entry;
		  this.dataBody.push(_dataBodyElement);
	  }
	  this.applicationRef.tick();
	}
}
