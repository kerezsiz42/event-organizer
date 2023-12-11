/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PollOutput } from '../../models/poll-output';

export interface GetPoll$Params {
  id: string;
}

export function getPoll(http: HttpClient, rootUrl: string, params: GetPoll$Params, context?: HttpContext): Observable<StrictHttpResponse<PollOutput>> {
  const rb = new RequestBuilder(rootUrl, getPoll.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PollOutput>;
    })
  );
}

getPoll.PATH = '/polls/{id}';
