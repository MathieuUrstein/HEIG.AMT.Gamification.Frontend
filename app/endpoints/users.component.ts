import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'users',
  template: `users`,
})
export class UsersComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
