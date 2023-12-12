/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OptionOutput } from '../../models/option-output';

export interface GetOption$Params {
  id: string;
}

export function getOption(http: HttpClient, rootUrl: string, params: GetOption$Params, context?: HttpContext): Observable<StrictHttpResponse<OptionOutput>> {
  const rb = new RequestBuilder(rootUrl, getOption.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getOption.PATH = '/options/{id}';
