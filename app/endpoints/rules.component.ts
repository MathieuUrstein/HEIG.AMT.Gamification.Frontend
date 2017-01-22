import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'rules',
  template: `rules`,
})
export class RulesComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
