import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { SettingsBme280Component } from './settings-bme280/settings-bme280.component';
import { SettingsEsp32Component } from './settings-esp32/settings-esp32.component';
import { StatusToolComponent } from './status-tool/status-tool.component';
import { Esp32ControllerComponent } from './esp32-controller/esp32-controller.component';

import { EspService } from './esp.service';


@NgModule({
  declarations: [
    AppComponent,
    DataViewerComponent,
    SettingsContainerComponent,
    SettingsBme280Component,
    SettingsEsp32Component,
    StatusToolComponent,
    Esp32ControllerComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule
  ],
  providers: [EspService],
  bootstrap: [AppComponent]
})
export class AppModule { }
