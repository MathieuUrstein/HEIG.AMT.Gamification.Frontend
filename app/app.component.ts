import { Component } from '@angular/core';
import { ApiCallsService } from './api/ApiCalls.service';
import {GamifiedApplication} from "./model/GamifiedApplication";

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent  {
  name = 'Angular';

  constructor(
    private apiCallsService: ApiCallsService
  ) {
    let gameApp: GamifiedApplication = {
      name: "testtest7",
      password: "testtest4"
    };
    this.apiCallsService.registerPost(gameApp).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
