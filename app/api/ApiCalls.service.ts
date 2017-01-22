import { Injectable }                                         from '@angular/core';
import { Http, Headers, Response }                            from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs }  from '@angular/http';
import { Observable }                                         from 'rxjs/Observable';
import { Subject }                                            from "rxjs/Subject";
import { EmitRequest }                                        from "../model/EmitRequest";
import { ReplaySubject }                                      from "rxjs/ReplaySubject";
import * as models                                            from '../model/models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiCallsService {
  protected basePath = 'http://localhost:3000/api';
  private apiKey: string = null;
  private defaultHeaders: Headers = new Headers();

  lastRequest: ReplaySubject<EmitRequest> = new ReplaySubject();
  lastResponse: Subject<Response> = new Subject();

  constructor(
    protected http: Http
  ) {}

  public addApiKey(apiKey: string) {
    this.apiKey = 'Bearer '+apiKey;
    console.log("New api key");
    console.log(this.apiKey);
  }

  private getResponseData(response$: Observable<Response>): Observable<any> {
    return response$.map((response: Response) => {
      if (response.status === 204) {
        return undefined;
      } else {
        return response.json();
      }
    })
  }

  private headersWithApiKey(headers: Headers): Headers {
    // authentication (JWT) required
    if (this.apiKey) {
      headers.set('Authorization', this.apiKey);
    }
    return headers;
  }

  private static verifyNotNullOrUndefined(variables: Array<any>, variablesNames: Array<string>, methodName: string) {
    for(let i = 0; i < variables.length; i++) {
      if (variables[i] === null || variables[i] === undefined) {
        throw new Error('Required parameter '+variablesNames[i]+' was null or undefined when calling '+methodName+'.');
      }
    }
  }

  private logAndSend(path: string, requestOptions: RequestOptionsArgs): Observable<Response> {
    this.logRequest(path, requestOptions);
    return this.http.request(path, requestOptions)
      .map((res: Response) => {
        this.logResponse(res);
        return res;
      })
      .catch((res: Response) => {
        this.logResponse(res);
        return [];
      });
  }

  private static createOptionsArgs(method: RequestMethod, headers: Headers, body?: any) {
    return new RequestOptions({
      method: method,
      headers: headers,
      body: body == null ? null : JSON.stringify(body), // https://github.com/angular/angular/issues/10612
    });
  }

  private logRequest(path: string, requestOptions: RequestOptionsArgs) {
    this.lastRequest.next({
      path: path,
      requestOptions: requestOptions
    });
  }

  private logResponse(response: Response) {
    this.lastResponse.next(response);
  }

  /**
   * Logs an application in.
   *
   * @param body The credentials of the application.
   */
  public authPost(body: models.Credentials) {
    this.authPostWithHttpInfo(body).subscribe(
      res => {
        let headers: Headers = res.headers;
        this.addApiKey(headers.get('Authorization'));
      }
    );
  }

  /**
   * Retrieves all badges for the current application.
   *
   */
  public badgesGet(): Observable<Array<models.Badge>> {
    return this.getResponseData(this.badgesGetWithHttpInfo());
  }

  /**
   * Deletes a given badge.
   *
   * @param name The name of the badge.
   */
  public badgesNameDelete(name: string): Observable<{}> {
    return this.getResponseData(this.badgesNameDeleteWithHttpInfo(name));
  }

  /**
   * Retrieves a given badge.
   *
   * @param name The name of the badge.
   */
  public badgesNameGet(name: string): Observable<models.Badge> {
    return this.getResponseData(this.badgesNameGetWithHttpInfo(name));
  }

  /**
   * Partially updates a given badge.
   *
   * @param name The name of the badge.
   * @param body The new info of the badge.
   */
  public badgesNamePatch(name: string, body?: models.Badge): Observable<{}> {
    return this.getResponseData(this.badgesNamePatchWithHttpInfo(name, body));
  }

  /**
   * Updates a given badge.
   *
   * @param name The name of the badge.
   * @param body The new info of the badge.
   */
  public badgesNamePut(name: string, body: models.Badge): Observable<{}> {
    return this.getResponseData(this.badgesNamePutWithHttpInfo(name, body));
  }

  /**
   * Creates a new badge.
   *
   * @param body The info needed to create the badge.
   */
  public badgesPost(body: models.Badge): Observable<{}> {
    return this.getResponseData(this.badgesPostWithHttpInfo(body));
  }

  /**
   * Creates an event.
   * Creates an event triggered by an action made by an user of the application. If the user does not exist in the platform, he will be created.
   * @param body The info of the event.
   */
  public eventsPost(body: models.Event): Observable<{}> {
    return this.getResponseData(this.eventsPostWithHttpInfo(body));
  }

  /**
   * Retrieves all the point scales of the current application.
   *
   */
  public pointScalesGet(): Observable<Array<models.PointScale>> {
    return this.getResponseData(this.pointScalesGetWithHttpInfo());
  }

  /**
   * Deletes the given point scale.
   *
   * @param name The name of the point scale.
   */
  public pointScalesNameDelete(name: string): Observable<{}> {
    return this.getResponseData(this.pointScalesNameDeleteWithHttpInfo(name));
  }

  /**
   * Retrieves the given point scale.
   *
   * @param name The name of the point scale.
   */
  public pointScalesNameGet(name: string): Observable<Array<models.PointScale>> {
    return this.getResponseData(this.pointScalesNameGetWithHttpInfo(name));
  }

  /**
   * Partially updates the given point scale.
   *
   * @param name The name of the point scale.
   * @param body The new info of the point scale.
   */
  public pointScalesNamePatch(name: string, body?: models.PointScale): Observable<{}> {
    return this.getResponseData(this.pointScalesNamePatchWithHttpInfo(name, body));
  }

  /**
   * Updates the given point scale.
   *
   * @param name The name of the point scale.
   * @param body The new info of the point scale.
   */
  public pointScalesNamePut(name: string, body: models.PointScale): Observable<{}> {
    return this.getResponseData(this.pointScalesNamePutWithHttpInfo(name, body));
  }

  /**
   * Creates a point scale.
   *
   * @param body The info needed to create a point scale.
   */
  public pointScalesPost(body: models.PointScale): Observable<{}> {
    return this.getResponseData(this.pointScalesPostWithHttpInfo(body));
  }

  /**
   * Registers a gamified application.
   *
   * @param body The info needed to create a gamified application.
   */
  public registerPost(body: models.GamifiedApplication) {
    this.registerPostWithHttpInfo(body).subscribe(
      res => {
        let headers: Headers = res.headers;
        this.addApiKey(headers.get('Authorization'));
      }
    );
  }

  /**
   * Retrieves all event rules for the current application.
   *
   */
  public rulesEventsGet(): Observable<Array<models.EventRule>> {
    return this.getResponseData(this.rulesEventsGetWithHttpInfo());
  }

  /**
   * Deletes the given event rule.
   *
   * @param name The name of the given event rule.
   */
  public rulesEventsNameDelete(name: string): Observable<{}> {
    return this.getResponseData(this.rulesEventsNameDeleteWithHttpInfo(name));
  }

  /**
   * Retrieves a given event rule.
   *
   * @param name The name of the event rule.
   */
  public rulesEventsNameGet(name: string): Observable<models.EventRule> {
    return this.getResponseData(this.rulesEventsNameGetWithHttpInfo(name));
  }

  /**
   * Partially updates the given event rule.
   *
   * @param name The name of the given event rule.
   * @param body The modified fields of the event rule.
   */
  public rulesEventsNamePatch(name: string, body?: models.EventRule): Observable<{}> {
    return this.getResponseData(this.rulesEventsNamePatchWithHttpInfo(name, body));
  }

  /**
   * Updates the given event rule.
   *
   * @param name The name of the given event rule.
   * @param body The modified event rule.
   */
  public rulesEventsNamePut(name: string, body: models.EventRule): Observable<{}> {
    return this.getResponseData(this.rulesEventsNamePutWithHttpInfo(name, body));
  }

  /**
   * Creates a new event rule.
   *
   * @param body The info needed to create a new event rule.
   */
  public rulesEventsPost(body: models.EventRule): Observable<{}> {
    return this.getResponseData(this.rulesEventsPostWithHttpInfo(body));
  }

  /**
   * Retrieves all trigger rules for the current application.
   *
   */
  public rulesTriggersGet(): Observable<Array<models.TriggerRule>> {
    return this.getResponseData(this.rulesTriggersGetWithHttpInfo());
  }

  /**
   * Deletes the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   */
  public rulesTriggersNameDelete(name: string): Observable<{}> {
    return this.getResponseData(this.rulesTriggersNameDeleteWithHttpInfo(name));
  }

  /**
   * Retrieves a given trigger rule.
   *
   * @param name The name of the trigger rule.
   */
  public rulesTriggersNameGet(name: string): Observable<models.TriggerRule> {
    return this.getResponseData(this.rulesTriggersNameGetWithHttpInfo(name));
  }

  /**
   * Partially updates the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   * @param body The modified fields of the trigger rule.
   */
  public rulesTriggersNamePatch(name: string, body?: models.TriggerRule): Observable<{}> {
    return this.getResponseData(this.rulesTriggersNamePatchWithHttpInfo(name, body));
  }

  /**
   * Updates the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   * @param body The modified trigger rule.
   */
  public rulesTriggersNamePut(name: string, body: models.TriggerRule): Observable<{}> {
    return this.getResponseData(this.rulesTriggersNamePutWithHttpInfo(name, body));
  }

  /**
   * Creates a new trigger rule.
   *
   * @param body The info needed to create a new trigger rule.
   */
  public rulesTriggersPost(body: models.TriggerRule): Observable<{}> {
    return this.getResponseData(this.rulesTriggersPostWithHttpInfo(body));
  }

  /**
   * Retrieves all the users of the current application.
   * Get all the users of the current application with their badges and points awarded.
   */
  public usersGet(): Observable<Array<models.User>> {
    return this.getResponseData(this.usersGetWithHttpInfo());
  }

  /**
   * Retrieves a specified user.
   *
   * @param username The username of the user.
   */
  public usersUsernameGet(username: string): Observable<models.User> {
    return this.getResponseData(this.usersUsernameGetWithHttpInfo(username));
  }

  /**
   * Logs an application in.
   *
   * @param body The credentials of the application.
   */
  public authPostWithHttpInfo(body: models.Credentials): Observable<Response> {
    const path = this.basePath + "/auth/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'authPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves all badges for the current application.
   *
   */
  public badgesGetWithHttpInfo(): Observable<Response> {
    const path = this.basePath + "/badges/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Deletes a given badge.
   *
   * @param name The name of the badge.
   */
  public badgesNameDeleteWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/badges/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'badgesNameDelete');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Delete, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves a given badge.
   *
   * @param name The name of the badge.
   */
  public badgesNameGetWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/badges/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'badgesNameGet');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Partially updates a given badge.
   *
   * @param name The name of the badge.
   * @param body The new info of the badge.
   */
  public badgesNamePatchWithHttpInfo(name: string, body?: models.Badge): Observable<Response> {
    const path = this.basePath + "/badges/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'badgesNamePatch');
    headers.set('Content-Type', 'application/json');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Patch, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Updates a given badge.
   *
   * @param name The name of the badge.
   * @param body The new info of the badge.
   */
  public badgesNamePutWithHttpInfo(name: string, body: models.Badge): Observable<Response> {
    const path = this.basePath + "/badges/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name, body], ['name', 'body'], 'badgesNamePut');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Put, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Creates a new badge.
   *
   * @param body The info needed to create the badge.
   */
  public badgesPostWithHttpInfo(body: models.Badge): Observable<Response> {
    const path = this.basePath + "/badges/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'badgesPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Creates an event.
   * Creates an event triggered by an action made by an user of the application. If the user does not exist in the platform, he will be created.
   * @param body The info of the event.
   */
  public eventsPostWithHttpInfo(body: models.Event): Observable<Response> {
    const path = this.basePath + "/events/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'eventsPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves all the point scales of the current application.
   *
   */
  public pointScalesGetWithHttpInfo(): Observable<Response> {
    const path = this.basePath + "/pointScales/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Deletes the given point scale.
   *
   * @param name The name of the point scale.
   */
  public pointScalesNameDeleteWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/pointScales/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'pointScalesNameDelete');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Delete, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves the given point scale.
   *
   * @param name The name of the point scale.
   */
  public pointScalesNameGetWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/pointScales/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'pointScalesNameGet');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Partially updates the given point scale.
   *
   * @param name The name of the point scale.
   * @param body The new info of the point scale.
   */
  public pointScalesNamePatchWithHttpInfo(name: string, body?: models.PointScale): Observable<Response> {
    const path = this.basePath + "/pointScales/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'pointScalesNamePatch');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Patch, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Updates the given point scale.
   *
   * @param name The name of the point scale.
   * @param body The new info of the point scale.
   */
  public pointScalesNamePutWithHttpInfo(name: string, body: models.PointScale): Observable<Response> {
    const path = this.basePath + "/pointScales/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name, body], ['name', 'body'], 'pointScalesNamePut');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Put, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Creates a point scale.
   *
   * @param body The info needed to create a point scale.
   */
  public pointScalesPostWithHttpInfo(body: models.PointScale): Observable<Response> {
    const path = this.basePath + "/pointScales/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'pointScalesPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Registers a gamified application.
   *
   * @param body The info needed to create a gamified application.
   */
  public registerPostWithHttpInfo(body: models.GamifiedApplication): Observable<Response> {
    const path = this.basePath + "/register/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'registerPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves all event rules for the current application.
   *
   */
  public rulesEventsGetWithHttpInfo(): Observable<Response> {
    const path = this.basePath + "/rules/events/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Deletes the given event rule.
   *
   * @param name The name of the given event rule.
   */
  public rulesEventsNameDeleteWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/rules/events/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesEventsNameDelete');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Delete, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves a given event rule.
   *
   * @param name The name of the event rule.
   */
  public rulesEventsNameGetWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/rules/events/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesEventsNameGet');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Partially updates the given event rule.
   *
   * @param name The name of the given event rule.
   * @param body The modified fields of the event rule.
   */
  public rulesEventsNamePatchWithHttpInfo(name: string, body?: models.EventRule): Observable<Response> {
    const path = this.basePath + "/rules/events/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesEventsNamePatch');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Patch, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Updates the given event rule.
   *
   * @param name The name of the given event rule.
   * @param body The modified event rule.
   */
  public rulesEventsNamePutWithHttpInfo(name: string, body: models.EventRule): Observable<Response> {
    const path = this.basePath + "/rules/events/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name, body], ['name', 'body'], 'rulesEventsNamePut');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Put, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Creates a new event rule.
   *
   * @param body The info needed to create a new event rule.
   */
  public rulesEventsPostWithHttpInfo(body: models.EventRule): Observable<Response> {
    const path = this.basePath + "/rules/events/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'rulesEventsPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves all trigger rules for the current application.
   *
   */
  public rulesTriggersGetWithHttpInfo(): Observable<Response> {
    const path = this.basePath + "/rules/triggers/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Deletes the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   */
  public rulesTriggersNameDeleteWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/rules/triggers/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesTriggersNameDelete');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Delete, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves a given trigger rule.
   *
   * @param name The name of the trigger rule.
   */
  public rulesTriggersNameGetWithHttpInfo(name: string): Observable<Response> {
    const path = this.basePath + "/rules/triggers/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesTriggersNameGet');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Partially updates the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   * @param body The modified fields of the trigger rule.
   */
  public rulesTriggersNamePatchWithHttpInfo(name: string, body?: models.TriggerRule): Observable<Response> {
    const path = this.basePath + "/rules/triggers/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name], ['name'], 'rulesTriggersNamePatch');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Patch, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Updates the given trigger rule.
   *
   * @param name The name of the given trigger rule.
   * @param body The modified trigger rule.
   */
  public rulesTriggersNamePutWithHttpInfo(name: string, body: models.TriggerRule): Observable<Response> {
    const path = this.basePath + "/rules/triggers/"+name+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([name, body], ['name', 'body'], 'rulesTriggersNamePut');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Put, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Creates a new trigger rule.
   *
   * @param body The info needed to create a new trigger rule.
   */
  public rulesTriggersPostWithHttpInfo(body: models.TriggerRule): Observable<Response> {
    const path = this.basePath + "/rules/triggers/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    headers.set('Content-Type', 'application/json');
    ApiCallsService.verifyNotNullOrUndefined([body], ['body'], 'rulesTriggerPost');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Post, headers, body);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves all the users of the current application.
   * Get all the users of the current application with their badges and points awarded.
   */
  public usersGetWithHttpInfo(): Observable<Response> {
    const path = this.basePath + "/users/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }

  /**
   * Retrieves a specified user.
   *
   * @param username The username of the user.
   */
  public usersUsernameGetWithHttpInfo(username: string): Observable<Response> {
    const path = this.basePath + "/users/"+username+"/";
    let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
    headers = this.headersWithApiKey(headers);
    ApiCallsService.verifyNotNullOrUndefined([username], ['username'], 'usersUsernameGet');
    let requestOptions: RequestOptionsArgs = ApiCallsService.createOptionsArgs(RequestMethod.Get, headers);
    return this.logAndSend(path, requestOptions);
  }
}
