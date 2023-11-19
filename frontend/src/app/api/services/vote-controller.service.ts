/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { index } from '../fn/vote-controller/index';
import { Index$Params } from '../fn/vote-controller/index';

@Injectable({ providedIn: 'root' })
export class VoteControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `index()` */
  static readonly IndexPath = '/vote/';

  /**
   * Returns the string "Vote".
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `index()` instead.
   *
   * This method doesn't expect any request body.
   */
  index$Response(params?: Index$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return index(this.http, this.rootUrl, params, context);
  }

  /**
   * Returns the string "Vote".
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `index$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  index(params?: Index$Params, context?: HttpContext): Observable<string> {
    return this.index$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}