import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'users',
  template: `
<form>
  <p>Get users of the current application</p>
  <button (click)="getUsers()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <div class="form-group">
    <label>Username</label>
    <input name="username" [(ngModel)]="username" type="text" class="form-control" placeholder="User to retrieve">
  </div>
  <button (click)="getUser()" type="submit" class="btn btn-primary">Submit</button>
</form>
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
