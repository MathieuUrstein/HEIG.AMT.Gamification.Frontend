import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'users',
  template: `
<div class="container">
  <ul class="nav nav-tabs second-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#users-get-users" role="tab">GET users</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#users-get-user" role="tab">GET User</a>
    </li>
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane active" id="users-get-users" role="tabpanel">
      <form>
        <p>Get users of the current application</p>
        <button (click)="getUsers()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="tab-pane" id="users-get-user" role="tabpanel">
      <form>
        <p>Retrieves a specified user.</p>
        <div class="form-group">
          <label>Username</label>
          <input name="username" [(ngModel)]="username" type="text" class="form-control" placeholder="User to retrieve">
        </div>
        <button (click)="getUser()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
`,
})
export class UsersComponent  {

  username: string;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  getUsers() {
    this.apiCallsService.usersGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getUser() {
    this.apiCallsService.usersUsernameGet(this.username).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }
}
