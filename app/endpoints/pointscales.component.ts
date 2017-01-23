import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {PointScale} from "../model/PointScale";

@Component({
  selector: 'pointscales',
  template: `
<form>
  <p>Get point scales of the current application</p>
  <button (click)="getPointScales()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Get a point scale of the current application</p>
  <div class="form-group">
    <label>Name</label>
    <input name="pointscalename" [(ngModel)]="name" type="text" class="form-control" placeholder="Point scale to retrieve">
  </div>
  <button (click)="getPointScale()" type="submit" class="btn btn-primary">Submit</button>
</form>
<hr>
<form>
  <p>Create a point scale for the current application</p>
  <div class="form-group">
    <label>Name</label>
    <input name="pointscalename" [(ngModel)]="name" type="text" class="form-control" placeholder="Point scale to create">
  </div>
  <button (click)="addPointScale()" type="submit" class="btn btn-primary">Submit</button>
</form>
`,
})
export class PointScalesComponent {

  name: string;

  constructor(
    private apiCallsService: ApiCallsService
  ) {}

  getPointScales() {
    this.apiCallsService.pointScalesGet().subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  getPointScale() {
    this.apiCallsService.pointScalesNameGet(this.name).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }

  addPointScale() {
    let pointScale: PointScale = {
      name: this.name
    };
    this.apiCallsService.pointScalesPost(pointScale).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.apiCallsService.logResponse(err);
      }
    );
  }
}
