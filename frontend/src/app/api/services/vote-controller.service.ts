/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { voteIndex } from '../fn/vote-controller/vote-index';
import { VoteIndex$Params } from '../fn/vote-controller/vote-index';

@Injectable({ providedIn: 'root' })
export class VoteControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `voteIndex()` */
  static readonly VoteIndexPath = '/vote/';

  /**
   * Returns the string "Vote".
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `voteIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  voteIndex$Response(params?: VoteIndex$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return voteIndex(this.http, this.rootUrl, params, context);
  }

  /**
   * Returns the string "Vote".
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `voteIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  voteIndex(params?: VoteIndex$Params, context?: HttpContext): Observable<string> {
    return this.voteIndex$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
