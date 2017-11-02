import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogArchiveComponent } from '../blog-archive/blog-archive.component';
import { ApiExplorerComponent } from '../api-explorer/api-explorer.component';
import { ProjectsComponent } from '../projects/projects.component';
import { LibrariesComponent } from '../libraries/libraries.component';
import { ProgrammingInfoComponent } from '../programming-info/programming-info.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'blog',  component: BlogComponent },
  { path: 'apiexplorer', component: ApiExplorerComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'libraries', component: LibrariesComponent },
  { path: 'programminginfo', component: ProgrammingInfoComponent },
  { path: 'about',  component: AboutComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
