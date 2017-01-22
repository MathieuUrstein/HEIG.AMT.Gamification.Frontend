import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ApiCallsService } from './api/ApiCalls.service';
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent ],
  providers:    [ ApiCallsService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
