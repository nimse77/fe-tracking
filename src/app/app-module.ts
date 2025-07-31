import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
// import { Menu } from './component/item/menu';
// import { ScanMenu } from './component/scan-menu/scan-menu';
import { HttpClientModule } from '@angular/common/http';
import {MenuComponent } from '../app/component/menu/menu';


@NgModule({
  declarations: [
    App,
    MenuComponent
    //  Menu,
    // ScanMenu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [App]
})
export class AppModule { }
