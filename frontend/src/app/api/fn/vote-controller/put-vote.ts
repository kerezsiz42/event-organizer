/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VoteInput } from '../../models/vote-input';
import { VoteOutput } from '../../models/vote-output';

export interface PutVote$Params {
      body: VoteInput
}

export function putVote(http: HttpClient, rootUrl: string, params: PutVote$Params, context?: HttpContext): Observable<StrictHttpResponse<VoteOutput>> {
  const rb = new RequestBuilder(rootUrl, putVote.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<VoteOutput>;
    })
  );
}

putVote.PATH = '/votes';
