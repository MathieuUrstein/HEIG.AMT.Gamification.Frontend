import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {Badge} from "../model/Badge";

@Component({
  selector: 'badges',
  template: `
<form>
  <p>Get badges of the current application</p>
  <button (click)="getBadges()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Get a badge of the current application</p>
  <div class="form-group">
    <label>Name</label>
    <input name="badgename" [(ngModel)]="name" type="text" class="form-control" placeholder="Badge to retrieve">
  </div>
  <button (click)="getBadge()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Create a badge for the current application</p>
  <div class="form-group">
    <label>Name</label>
    <input name="badgename" [(ngModel)]="name" type="text" class="form-control" placeholder="Badge to create">
  </div>
  <button (click)="addBadge()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class BadgesComponent {

  name: string;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  getBadges() {
    this.apiCallsService.badgesGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getBadge() {
    this.apiCallsService.badgesNameGet(this.name).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  addBadge() {
    let badge: Badge = {
      name: this.name
    };
    this.apiCallsService.badgesPost(badge).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }
}
