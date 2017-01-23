import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {Badge} from "../model/Badge";

@Component({
  selector: 'badges',
  template: `
<div class="container">
  <ul class="nav nav-tabs second-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#badges-get-badges" role="tab">GET Badges</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#badges-get-badge" role="tab">GET Badge</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#badges-post-badge" role="tab">POST Badge</a>
    </li>
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane active" id="badges-get-badges" role="tabpanel">
      <form>
        <p>Get badges of the current application</p>
        <button (click)="getBadges()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="tab-pane" id="badges-get-badge" role="tabpanel">
      <form>
        <p>Get a badge of the current application</p>
        <div class="form-group">
          <label>Name</label>
          <input name="badgename" [(ngModel)]="name" type="text" class="form-control" placeholder="Badge to retrieve">
        </div>
        <button (click)="getBadge()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="tab-pane" id="badges-post-badge" role="tabpanel">
      <form>
        <p>Create a badge for the current application</p>
        <div class="form-group">
          <label>Name</label>
          <input name="badgename" [(ngModel)]="name" type="text" class="form-control" placeholder="Badge to create">
        </div>
        <button (click)="addBadge()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
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
