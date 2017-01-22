import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ApiCallsService } from './api/ApiCalls.service';
import {HttpModule} from "@angular/http";
import {ReqResLogsComponent} from "./req-res-logs/reqResLogs.component";
import {EndpointsComponent} from "./endpoints/endpoints.component";
import {AuthComponent} from "./endpoints/auth.component";
import {BadgesComponent} from "./endpoints/badges.component";
import {EventsComponent} from "./endpoints/events.component";
import {PointScalesComponent} from "./endpoints/pointscales.component";
import {RegisterComponent} from "./endpoints/register.component";
import {RulesComponent} from "./endpoints/rules.component";
import {UsersComponent} from "./endpoints/users.component";

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [
    AppComponent,
    ReqResLogsComponent,
    EndpointsComponent,
    AuthComponent,
    BadgesComponent,
    EventsComponent,
    PointScalesComponent,
    RegisterComponent,
    RulesComponent,
    UsersComponent
  ],
  providers:    [ ApiCallsService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
