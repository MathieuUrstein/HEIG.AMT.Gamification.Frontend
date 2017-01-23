import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {GamifiedApplication} from "../model/GamifiedApplication";

@Component({
  selector: 'register',
  template: `
<form>
  <div class="form-group">
    <label>Name</label>
    <input name="name" [(ngModel)]="name" type="text" class="form-control" placeholder="Name of the app">
  </div>
  <div class="form-group">
    <label>Password</label>
    <input name="password" [(ngModel)]="password" type="text" class="form-control" placeholder="Password of the app">
  </div>
  <button (click)="registerNewApp()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class RegisterComponent  {

  name: string;
  password: string;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  registerNewApp() {
    let gameApp: GamifiedApplication = {
      name: this.name,
      password: this.password
    };
    this.apiCallsService.registerPost(gameApp);
  }
}
