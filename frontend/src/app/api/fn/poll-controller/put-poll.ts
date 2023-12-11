/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PollInput } from '../../models/poll-input';
import { PollOutput } from '../../models/poll-output';

export interface PutPoll$Params {
      body: PollInput
}

export function putPoll(http: HttpClient, rootUrl: string, params: PutPoll$Params, context?: HttpContext): Observable<StrictHttpResponse<PollOutput>> {
  const rb = new RequestBuilder(rootUrl, putPoll.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
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

putPoll.PATH = '/polls/';
