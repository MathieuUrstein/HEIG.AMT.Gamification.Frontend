import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'users',
  template: `
<form>
  Get users of the current application
  <button (click)="getUsers()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class UsersComponent  {
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
}
