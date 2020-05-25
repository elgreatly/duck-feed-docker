import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuckFeedRequestModel } from './../models/duck-feed-request.model';
import { Observable } from 'rxjs';

@Injectable()
export class DuckFeedService {

  constructor(private http: HttpClient) { }

  sendDuckFeedData(duckFeedRequest: DuckFeedRequestModel): Observable<any> {
    return this.http.post(`/api/v1/duck-feed`, duckFeedRequest);
  }

}
