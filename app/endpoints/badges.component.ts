import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'badges',
  template: `badges`,
})
export class BadgesComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
