import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators/';

export interface Result {
  username: String,
  time: Number,
  date: Date,
  level: Number,
  points: Number
}

export interface User {
  username: String
}

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  constructor(private http: HttpClient) { }

  private request(method: 'post', type: 'result', user?: User): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } 

    const request = base.pipe(
      map((data: User) => {
        return data;
      })
    );
    return request;
  }

  public getTopResults(): Observable<any> {
    return this.http.get<any>('/api/setup');
  }

  public getOwnResults(user: User): Observable<any> {
    return this.request('post', 'result', user);
  }

  public addResult(result: Result): Observable<Result> {
    return this.http.post<Result>('/api/game', result);
  }

}
