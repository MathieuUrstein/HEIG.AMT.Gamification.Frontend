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
  ) {}
}
