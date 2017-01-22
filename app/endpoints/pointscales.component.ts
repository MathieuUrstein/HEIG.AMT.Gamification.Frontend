import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'pointscales',
  template: `pointscales`,
})
export class PointScalesComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
