import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'req-res-log',
  template: `<table class="table">
  <tr>
    <td *ngIf="lastRequest">
      <h2>Last request :</h2>
      <div><b>Path : </b>{{lastRequest.path}}</div>
      <div *ngIf="lastRequest.method === 0"><b>Method : </b>Get</div>
      <div *ngIf="lastRequest.method === 1"><b>Method : </b>Post</div>
      <div *ngIf="lastRequest.method === 2"><b>Method : </b>Put</div>
      <div *ngIf="lastRequest.method === 3"><b>Method : </b>Delete</div>
      <div *ngIf="lastRequest.method === 6"><b>Method : </b>Patch</div>
      <div><b>Headers : </b><pre>{{lastRequest.headers | json}}</pre></div>
      <div><b>Body : </b><pre>{{lastRequest.body | json}}</pre></div>
    </td>
    <td *ngIf="lastResponse">
      <h2>Last response :</h2>
      <div><b>Path : </b>{{lastResponse.url}}</div>
      <div><b>Status : </b>{{lastResponse.status}}</div>
      <div><b>Headers : </b><pre>{{lastResponse.headers | json}}</pre></div>
      <div><b>Body : </b><pre>{{lastResponse.body | json}}</pre></div>
    </td>
  </tr>
</table>`,
})
export class ReqResLogsComponent  {

  private lastRequest: any;
  private lastResponse: any;

  constructor(
    private apiCallsService: ApiCallsService
  ) {
    this.apiCallsService.lastRequest.subscribe(req => {
      this.lastRequest = {
        path: req.path,
        method: req.requestOptions.method,
        headers: req.requestOptions.headers.toJSON(),
        body: JSON.parse(req.requestOptions.body)
      };
    });
    this.apiCallsService.lastResponse.subscribe(res => {
      this.lastResponse = {
        url: res.url,
        status: res.status + "(" + res.statusText + ")",
        headers: res.headers.toJSON(),
        body: JSON.parse(res.text())
      };
    });
  }
}
