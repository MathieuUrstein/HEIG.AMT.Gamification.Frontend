import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';
import {PointScale} from "../model/PointScale";

@Component({
  selector: 'pointscales',
  template: `
<div class="container">
  <ul class="nav nav-tabs second-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#pointscales-get-pointscales" role="tab">GET PointScales</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#pointscales-get-pointscale" role="tab">GET PointScale</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#pointscales-post-pointscale" role="tab">POST PointScale</a>
    </li>
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane active" id="pointscales-get-pointscales" role="tabpanel">
      <form>
        <p>Get point scales of the current application</p>
        <button (click)="getPointScales()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="tab-pane" id="pointscales-get-pointscale" role="tabpanel">
      <form>
        <p>Get a point scale of the current application</p>
        <div class="form-group">
          <label>Name</label>
          <input name="pointscalename" [(ngModel)]="name" type="text" class="form-control" placeholder="Point scale to retrieve">
        </div>
        <button (click)="getPointScale()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="tab-pane" id="pointscales-post-pointscale" role="tabpanel">
      <form>
        <p>Create a point scale for the current application</p>
        <div class="form-group">
          <label>Name</label>
          <input name="pointscalename" [(ngModel)]="name" type="text" class="form-control" placeholder="Point scale to create">
        </div>
        <button (click)="addPointScale()" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
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
