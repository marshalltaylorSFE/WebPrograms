import { Component, OnInit, ApplicationRef, Input} from '@angular/core';
import { ExplorerService } from '../explorer.service';
import { Directory, File } from '../explorer-data-types';

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
  constructor( 
	private explorerService: ExplorerService,
	private applicationRef: ApplicationRef
	){}

  async ngOnInit() {
	this.directory = await this.explorerService.getDirectory(this.tocSrc);
	//console.log(this.directory);

	this.files = await this.explorerService.getFiles(this.directory);
	//console.log(this.files);

	//this.explorerService.getFiles(this.directory).then(_directory =>
	//{
	//	console.log(_directory);
	//});
  }

}
