import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { InfoComponent } from './info/info.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Prog } from './prog.ref/prog.ref.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiComponent,
    InfoComponent,
    Prog.RefComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
