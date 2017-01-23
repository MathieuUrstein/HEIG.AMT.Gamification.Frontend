import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'endpoints',
  template: `
<div class="container">
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#register" role="tab">register</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#auth" role="tab">auth</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#events" role="tab">events</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#users" role="tab">users</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#badges" role="tab">badges</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#pointScales" role="tab">pointscales</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#rules" role="tab">rules</a>
    </li>
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane active" id="register" role="tabpanel"><register></register></div>
    <div class="tab-pane" id="auth" role="tabpanel"><auth></auth></div>
    <div class="tab-pane" id="events" role="tabpanel"><events></events></div>
    <div class="tab-pane" id="users" role="tabpanel"><users></users></div>
    <div class="tab-pane" id="badges" role="tabpanel"><badges></badges></div>
    <div class="tab-pane" id="pointScales" role="tabpanel"><pointscales></pointscales></div>
    <div class="tab-pane" id="rules" role="tabpanel"><rules></rules></div>
  </div>
</div>
`,
})
export class EndpointsComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
