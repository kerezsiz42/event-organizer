/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { pollIndex } from '../fn/poll-controller/poll-index';
import { PollIndex$Params } from '../fn/poll-controller/poll-index';

@Injectable({ providedIn: 'root' })
export class PollControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `pollIndex()` */
  static readonly PollIndexPath = '/poll/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pollIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  pollIndex$Response(params?: PollIndex$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return pollIndex(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pollIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pollIndex(params?: PollIndex$Params, context?: HttpContext): Observable<string> {
    return this.pollIndex$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
