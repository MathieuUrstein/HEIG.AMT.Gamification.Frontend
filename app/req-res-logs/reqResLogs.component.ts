import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'req-res-log',
  template: `<table class="table">
  <tr>
    <td *ngIf="lastRequest" style="width: 50%; display: inline-block" id="reqCol">
      <h3>Last request :</h3>
      <div><b>Path : </b>{{lastRequest.path}}</div>
      <div *ngIf="lastRequest.method === 0"><b>Method : </b>Get</div>
      <div *ngIf="lastRequest.method === 1"><b>Method : </b>Post</div>
      <div *ngIf="lastRequest.method === 2"><b>Method : </b>Put</div>
      <div *ngIf="lastRequest.method === 3"><b>Method : </b>Delete</div>
      <div *ngIf="lastRequest.method === 6"><b>Method : </b>Patch</div>
      <div><b>Headers : </b><pre>{{lastRequest.headers | json}}</pre></div>
      <div><b>Body : </b><pre>{{lastRequest.body | json}}</pre></div>
    </td>
    <td *ngIf="lastResponse" style="width: 50%; display: inline-block" id="resCol">
      <h3>Last response :</h3>
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
      let body: string;
      if (req.requestOptions.body == "" || req.requestOptions.body == null || req.requestOptions.body == "undefined") {
        body = "{}";
      } else {
        body = req.requestOptions.body;
      }
      this.lastRequest = {
        path: req.path,
        method: req.requestOptions.method,
        headers: req.requestOptions.headers ? req.requestOptions.headers.toJSON() : {},
        body: JSON.parse(body)
      };
    });
    this.apiCallsService.lastResponse.subscribe(res => {
      let body: string;
      if ((<any> res)._body == "" || (<any> res)._body == null || (<any> res)._body == "undefined") {
        body = "{}";
      } else {
        body = (<any> res)._body;
      }
      this.lastResponse = {
        url: res.url,
        status: res.status + "(" + res.statusText + ")",
        headers: res.headers ? res.headers.toJSON() : {},
        body: JSON.parse(body)
      };
    });
  }
}
