import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApiExplorerComponent,
    ProgrammingInfoComponent,
    BlogComponent,
    BlogArchiveComponent,
    AboutComponent,
    ProjectsComponent,
    LibrariesComponent,
    ExplorerComponent,
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
