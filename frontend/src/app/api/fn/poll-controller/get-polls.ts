/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PollOutput } from '../../models/poll-output';

export interface GetPolls$Params {
}

export function getPolls(http: HttpClient, rootUrl: string, params?: GetPolls$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PollOutput>>> {
  const rb = new RequestBuilder(rootUrl, getPolls.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PollOutput>>;
    })
  );
}

getPolls.PATH = '/polls/';
