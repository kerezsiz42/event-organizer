/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteOption } from '../fn/option-controller/delete-option';
import { DeleteOption$Params } from '../fn/option-controller/delete-option';
import { getOption } from '../fn/option-controller/get-option';
import { GetOption$Params } from '../fn/option-controller/get-option';
import { putOption } from '../fn/option-controller/put-option';
import { PutOption$Params } from '../fn/option-controller/put-option';

@Injectable({ providedIn: 'root' })
export class OptionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `putOption()` */
  static readonly PutOptionPath = '/options/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putOption()` instead.
   *
   * This method doesn't expect any request body.
   */
  putOption$Response(params?: PutOption$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return putOption(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putOption$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  putOption(params?: PutOption$Params, context?: HttpContext): Observable<string> {
    return this.putOption$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getOption()` */
  static readonly GetOptionPath = '/options/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOption()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOption$Response(params?: GetOption$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getOption(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOption$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOption(params?: GetOption$Params, context?: HttpContext): Observable<string> {
    return this.getOption$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deleteOption()` */
  static readonly DeleteOptionPath = '/options/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOption()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOption$Response(params?: DeleteOption$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteOption(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOption$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOption(params?: DeleteOption$Params, context?: HttpContext): Observable<string> {
    return this.deleteOption$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
