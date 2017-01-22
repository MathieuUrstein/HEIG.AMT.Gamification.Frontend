import { Component } from '@angular/core';
import { ApiCallsService } from './api/ApiCalls.service';
import {GamifiedApplication} from "./model/GamifiedApplication";

@Component({
  selector: 'my-app',
  template: `
<req-res-log></req-res-log>
<endpoints></endpoints>
`,
})
export class AppComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {

    let gameApp: GamifiedApplication = {
      name: "testtest1111",
      password: "testtest4"
    };
    this.apiCallsService.registerPost(gameApp);

    this.apiCallsService.badgesGet().subscribe();
  }
}
