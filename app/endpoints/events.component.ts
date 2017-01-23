import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {Event} from "../model/Event";

@Component({
  selector: 'events',
  template: `
<form>
  <p>Creates an event.</p>
  <div class="form-group">
    <label>Type</label>
    <input name="type" [(ngModel)]="type" type="text" class="form-control" placeholder="Type of event">
  </div>
  <div class="form-group">
    <label>Username</label>
    <input name="username" [(ngModel)]="username" type="text" class="form-control" placeholder="Username">
  </div>
  <button (click)="addEvent()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class EventsComponent  {

  type: string;
  username: string;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  addEvent() {
    let event: Event = {
      type: this.type,
      username: this.username
    };
    this.apiCallsService.eventsPost(event).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }
}
