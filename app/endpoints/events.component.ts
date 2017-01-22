import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'events',
  template: `events`,
})
export class EventsComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
