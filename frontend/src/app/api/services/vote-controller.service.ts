/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteVote } from '../fn/vote-controller/delete-vote';
import { DeleteVote$Params } from '../fn/vote-controller/delete-vote';
import { getVote } from '../fn/vote-controller/get-vote';
import { GetVote$Params } from '../fn/vote-controller/get-vote';
import { putVote } from '../fn/vote-controller/put-vote';
import { PutVote$Params } from '../fn/vote-controller/put-vote';
import { VoteOutput } from '../models/vote-output';

@Injectable({ providedIn: 'root' })
export class VoteControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `putVote()` */
  static readonly PutVotePath = '/votes';

  /**
   * Frissít vagy beilleszt egy vote objektumot az adatbázisba.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putVote()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putVote$Response(params: PutVote$Params, context?: HttpContext): Observable<StrictHttpResponse<VoteOutput>> {
    return putVote(this.http, this.rootUrl, params, context);
  }

  /**
   * Frissít vagy beilleszt egy vote objektumot az adatbázisba.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putVote$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putVote(params: PutVote$Params, context?: HttpContext): Observable<VoteOutput> {
    return this.putVote$Response(params, context).pipe(
      map((r: StrictHttpResponse<VoteOutput>): VoteOutput => r.body)
    );
  }

  /** Path part for operation `getVote()` */
  static readonly GetVotePath = '/votes/{id}';

  /**
   * Lekérdez egy poll objektumot id alapján.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVote()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVote$Response(params: GetVote$Params, context?: HttpContext): Observable<StrictHttpResponse<VoteOutput>> {
    return getVote(this.http, this.rootUrl, params, context);
  }

  /**
   * Lekérdez egy poll objektumot id alapján.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVote(params: GetVote$Params, context?: HttpContext): Observable<VoteOutput> {
    return this.getVote$Response(params, context).pipe(
      map((r: StrictHttpResponse<VoteOutput>): VoteOutput => r.body)
    );
  }

  /** Path part for operation `deleteVote()` */
  static readonly DeleteVotePath = '/votes/{id}';

  /**
   * Kitöröl egy vote objektumot id alapján idempotens módon.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteVote()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVote$Response(params: DeleteVote$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteVote(this.http, this.rootUrl, params, context);
  }

  /**
   * Kitöröl egy vote objektumot id alapján idempotens módon.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteVote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVote(params: DeleteVote$Params, context?: HttpContext): Observable<string> {
    return this.deleteVote$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
