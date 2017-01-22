import { Component } from '@angular/core';
import { ApiCallsService } from '../api/ApiCalls.service';

@Component({
  selector: 'register',
  template: `
<form>
  <div class="form-group">
    <label for="formGroupExampleInput">Name</label>
    <input type="text" class="form-control" placeholder="Name of the app">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Password</label>
    <input type="text" class="form-control" placeholder="Password of the app">
  </div>
</form>
`,
})
export class RegisterComponent  {
  constructor(
    private apiCallsService: ApiCallsService
  ) {}
}
