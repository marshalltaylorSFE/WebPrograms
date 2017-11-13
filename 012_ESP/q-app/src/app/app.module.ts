import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { SettingsBme280Component } from './settings-bme280/settings-bme280.component';
import { SettingsEsp32Component } from './settings-esp32/settings-esp32.component';

@NgModule({
  declarations: [
    AppComponent,
    DataViewerComponent,
    SettingsContainerComponent,
    SettingsBme280Component,
    SettingsEsp32Component
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
