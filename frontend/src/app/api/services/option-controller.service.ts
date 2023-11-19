/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { optionIndex } from '../fn/option-controller/option-index';
import { OptionIndex$Params } from '../fn/option-controller/option-index';

@Injectable({ providedIn: 'root' })
export class OptionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `optionIndex()` */
  static readonly OptionIndexPath = '/option/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `optionIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  optionIndex$Response(params?: OptionIndex$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return optionIndex(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `optionIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  optionIndex(params?: OptionIndex$Params, context?: HttpContext): Observable<string> {
    return this.optionIndex$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
