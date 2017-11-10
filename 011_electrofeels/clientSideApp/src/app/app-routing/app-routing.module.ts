import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogArchiveComponent } from '../blog-archive/blog-archive.component';
import { ProjectsComponent } from '../projects/projects.component';
import { LibrariesComponent } from '../libraries/libraries.component';
import { ProgrammingInfoComponent } from '../programming-info/programming-info.component';
import { AboutComponent } from '../about/about.component';
import { EditorExplorerComponent } from '../editor-explorer/editor-explorer.component';
import { EditorBlogComponent } from '../editor-blog/editor-blog.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'blog',  component: BlogComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'libraries', component: LibrariesComponent },
  { path: 'programminginfo', component: ProgrammingInfoComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'editorexplorer', component: EditorExplorerComponent },
  { path: 'editorblog',  component: EditorBlogComponent },
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
