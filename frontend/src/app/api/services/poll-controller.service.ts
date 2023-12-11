/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deletePoll } from '../fn/poll-controller/delete-poll';
import { DeletePoll$Params } from '../fn/poll-controller/delete-poll';
import { getPoll } from '../fn/poll-controller/get-poll';
import { GetPoll$Params } from '../fn/poll-controller/get-poll';
import { getPolls } from '../fn/poll-controller/get-polls';
import { GetPolls$Params } from '../fn/poll-controller/get-polls';
import { PollOutput } from '../models/poll-output';
import { putPoll } from '../fn/poll-controller/put-poll';
import { PutPoll$Params } from '../fn/poll-controller/put-poll';

@Injectable({ providedIn: 'root' })
export class PollControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPolls()` */
  static readonly GetPollsPath = '/polls/';

  /**
   * Get all poll objects.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPolls()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPolls$Response(params?: GetPolls$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PollOutput>>> {
    return getPolls(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all poll objects.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPolls$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPolls(params?: GetPolls$Params, context?: HttpContext): Observable<Array<PollOutput>> {
    return this.getPolls$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PollOutput>>): Array<PollOutput> => r.body)
    );
  }

  /** Path part for operation `putPoll()` */
  static readonly PutPollPath = '/polls/';

  /**
   * Update or insert a poll object into database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putPoll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putPoll$Response(params: PutPoll$Params, context?: HttpContext): Observable<StrictHttpResponse<PollOutput>> {
    return putPoll(this.http, this.rootUrl, params, context);
  }

  /**
   * Update or insert a poll object into database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putPoll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putPoll(params: PutPoll$Params, context?: HttpContext): Observable<PollOutput> {
    return this.putPoll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PollOutput>): PollOutput => r.body)
    );
  }

  /** Path part for operation `getPoll()` */
  static readonly GetPollPath = '/polls/{id}';

  /**
   * Get a single poll object by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPoll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPoll$Response(params: GetPoll$Params, context?: HttpContext): Observable<StrictHttpResponse<PollOutput>> {
    return getPoll(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a single poll object by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPoll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPoll(params: GetPoll$Params, context?: HttpContext): Observable<PollOutput> {
    return this.getPoll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PollOutput>): PollOutput => r.body)
    );
  }

  /** Path part for operation `deletePoll()` */
  static readonly DeletePollPath = '/polls/{id}';

  /**
   * Delete a poll object by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePoll()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePoll$Response(params: DeletePoll$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deletePoll(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a poll object by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePoll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePoll(params: DeletePoll$Params, context?: HttpContext): Observable<string> {
    return this.deletePoll$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
