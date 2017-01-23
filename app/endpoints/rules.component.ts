import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {EventRule} from "../model/EventRule";
import {TriggerRule} from "../model/TriggerRule";

@Component({
  selector: 'rules',
  template: `
<form>
  <p>Retrieves all event rules for the current application.</p>
  <button (click)="getEventRules()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Creates a new event rule.</p>
  <div class="form-group">
    <label>Name</label>
    <input name="name" [(ngModel)]="name" type="text" class="form-control" placeholder="Name">
  </div>
  <div class="form-group">
    <label>Event</label>
    <input name="event" [(ngModel)]="event" type="text" class="form-control" placeholder="Event">
  </div>
  <div class="form-group">
    <label>PointScale</label>
    <input name="pointScale" [(ngModel)]="pointScale" type="text" class="form-control" placeholder="Point scale">
  </div>
  <div class="form-group">
    <label>PointsGiven</label>
    <input name="pointsGiven" [(ngModel)]="pointsGiven" type="text" class="form-control" placeholder="Points given">
  </div>
  <button (click)="addEventRule()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Retrieves a given event rule.</p>
  <div class="form-group">
    <label>Name</label>
    <input name="name" [(ngModel)]="name" type="text" class="form-control" placeholder="Name">
  </div>
  <button (click)="getRulesName()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Retrieves all trigger rules for the current application.</p>
  <button (click)="getTrigerRules()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Creates a new trigger rule.</p>
  <div class="form-group">
    <label>Name</label>
    <input name="name" [(ngModel)]="name" type="text" class="form-control" placeholder="Name">
  </div>
  <div class="form-group">
    <label>Badge Awarded</label>
    <input name="badgeAwarded" [(ngModel)]="badgeAwarded" type="text" class="form-control" placeholder="Badge Awarded">
  </div>
  <div class="form-group">
    <label>Point Scale</label>
    <input name="pointScale" [(ngModel)]="pointScale" type="text" class="form-control" placeholder="Point Scale">
  </div>
  <div class="form-group">
    <label>Limit</label>
    <input name="limit" [(ngModel)]="limit" type="text" class="form-control" placeholder="Limit">
  </div>
  <div class="form-group">
    <label>AboveLimit</label>
    <input name="aboveLimit" [(ngModel)]="aboveLimit" type="text" class="form-control" placeholder="Above Limit">
  </div>
  <button (click)="addTriggerRule()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Retrieves a given trigger rule.</p>
  <button (click)="geTriggertRule()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class RulesComponent  {

  name: string;
  event: string;
  pointScale: string;
  pointsGiven: number;
  badgeAwarded: string;
  limit: number;
  aboveLimit: boolean;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  geTriggertRule() {
    this.apiCallsService.rulesTriggersGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getEventRules() {
    this.apiCallsService.rulesEventsGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  addEventRule() {
    let rule: EventRule = {
      name: this.name,
      event: this.event,
      pointScale: this.pointScale,
      pointsGiven: this.pointsGiven
    };
    this.apiCallsService.rulesEventsPost(rule).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getRulesName() {
    this.apiCallsService.rulesEventsNameGet(this.name).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getTrigerRules() {
    this.apiCallsService.rulesTriggersGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  addTriggerRule() {
    let rule: TriggerRule = {
      name: this.name,
      badgeAwarded: this.badgeAwarded,
      pointScale: this.pointScale,
      limit: this.limit,
      aboveLimit: this.aboveLimit
    };
    this.apiCallsService.rulesTriggersPost(rule).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }
}
