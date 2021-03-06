import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';

import { ExplorerComponent } from './explorer/explorer.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgrammingInfoComponent } from './programming-info/programming-info.component';
import { BlogComponent } from './blog/blog.component';
import { BlogArchiveComponent } from './blog-archive/blog-archive.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { ExplorerEntryComponent } from './explorer-entry/explorer-entry.component';

import { DomSanitizer } from '@angular/platform-browser';
import { EditorExplorerComponent } from './editor-explorer/editor-explorer.component';
import { EditorBlogComponent } from './editor-blog/editor-blog.component';
import { BlogTimelineComponent } from './blog-timeline/blog-timeline.component'
import { BlogService } from './blog.service';

@Pipe({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgrammingInfoComponent,
    BlogComponent,
    BlogArchiveComponent,
    AboutComponent,
    ProjectsComponent,
    LibrariesComponent,
    ExplorerComponent,
    BlogEntryComponent,
    ExplorerEntryComponent,
	SafeHtmlPipe,
	EditorExplorerComponent,
	EditorBlogComponent,
	BlogTimelineComponent,
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	HttpClientModule,
	FormsModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
