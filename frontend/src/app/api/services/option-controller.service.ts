/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { index2 } from '../fn/option-controller/index-2';
import { Index2$Params } from '../fn/option-controller/index-2';

@Injectable({ providedIn: 'root' })
export class OptionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `index2()` */
  static readonly Index2Path = '/option/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `index2()` instead.
   *
   * This method doesn't expect any request body.
   */
  index2$Response(params?: Index2$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return index2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `index2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  index2(params?: Index2$Params, context?: HttpContext): Observable<string> {
    return this.index2$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
