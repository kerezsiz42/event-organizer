/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OptionInput } from '../../models/option-input';
import { OptionOutput } from '../../models/option-output';

export interface PutOption$Params {
      body: OptionInput
}

export function putOption(http: HttpClient, rootUrl: string, params: PutOption$Params, context?: HttpContext): Observable<StrictHttpResponse<OptionOutput>> {
  const rb = new RequestBuilder(rootUrl, putOption.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OptionOutput>;
    })
  );
}

putOption.PATH = '/options';
