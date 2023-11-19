/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { index1 } from '../fn/poll-controller/index-1';
import { Index1$Params } from '../fn/poll-controller/index-1';

@Injectable({ providedIn: 'root' })
export class PollControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `index1()` */
  static readonly Index1Path = '/poll/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `index1()` instead.
   *
   * This method doesn't expect any request body.
   */
  index1$Response(params?: Index1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return index1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `index1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  index1(params?: Index1$Params, context?: HttpContext): Observable<string> {
    return this.index1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
