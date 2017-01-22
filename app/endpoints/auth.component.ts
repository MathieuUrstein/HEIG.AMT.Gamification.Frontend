import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'auth',
  template: `auth`,
})
export class AuthComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
